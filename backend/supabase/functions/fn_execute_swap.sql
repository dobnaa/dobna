-- ======================================================
-- fn_execute_swap.sql
-- اجرای تبدیل (سوآپ) بین دو ارز در سیستم داخلی دوبنا
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_execute_swap(
    p_user_id UUID,
    p_from_currency VARCHAR(20),
    p_to_currency VARCHAR(20),
    p_from_amount DECIMAL(20, 8),
    p_to_amount DECIMAL(20, 8),
    p_usd_value DECIMAL(20, 4) DEFAULT 0
)
RETURNS JSONB AS $$
DECLARE
    v_balance DECIMAL(20, 8);
    v_from_upper VARCHAR(20);
    v_to_upper VARCHAR(20);
    v_tx_id VARCHAR(100);
    v_sequence BIGINT;
    v_exchange_rate DECIMAL(20, 8);
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی ورودی‌ها
    -- ======================================================
    v_from_upper := UPPER(TRIM(p_from_currency));
    v_to_upper := UPPER(TRIM(p_to_currency));

    IF p_from_amount <= 0 OR p_to_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;

    IF v_from_upper = v_to_upper THEN
        RAISE EXCEPTION 'SAME_CURRENCY';
    END IF;

    -- ======================================================
    -- ۲. دریافت موجودی کاربر با قفل
    -- ======================================================
    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = v_from_upper
    FOR UPDATE;

    IF v_balance IS NULL THEN
        RAISE EXCEPTION 'BALANCE_NOT_FOUND';
    END IF;

    IF v_balance < p_from_amount THEN
        RAISE EXCEPTION 'INSUFFICIENT_BALANCE';
    END IF;

    -- ======================================================
    -- ۳. محاسبه نرخ تبدیل (در صورت عدم ارائه p_to_amount)
    -- ======================================================
    IF p_to_amount <= 0 THEN
        v_exchange_rate := fn_get_exchange_rate(v_from_upper, v_to_upper);
        IF v_exchange_rate IS NULL THEN
            RAISE EXCEPTION 'EXCHANGE_RATE_UNAVAILABLE';
        END IF;
        p_to_amount := p_from_amount * v_exchange_rate;
    END IF;

    -- ======================================================
    -- ۴. کسر از ارز مبدأ
    -- ======================================================
    UPDATE public.user_balances
    SET amount = amount - p_from_amount,
        usd_value = usd_value - COALESCE(p_usd_value, 0),
        last_updated = NOW()
    WHERE user_id = p_user_id AND currency = v_from_upper;

    -- ======================================================
    -- ۵. اضافه کردن به ارز مقصد
    -- ======================================================
    INSERT INTO public.user_balances (user_id, currency, amount, usd_value, is_crypto, last_updated)
    VALUES (p_user_id, v_to_upper, p_to_amount, COALESCE(p_usd_value, 0), TRUE, NOW())
    ON CONFLICT (user_id, currency)
    DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount,
                  usd_value = public.user_balances.usd_value + EXCLUDED.usd_value,
                  last_updated = NOW();

    -- ======================================================
    -- ۶. تولید شناسه تراکنش یکتا
    -- ======================================================
    SELECT COALESCE(MAX(CAST(SUBSTRING(transaction_id FROM '[0-9]+$') AS BIGINT)), 0) + 1
    INTO v_sequence
    FROM public.transactions
    WHERE transaction_id LIKE 'SWAP-%';

    v_tx_id := 'SWAP-' || v_from_upper || '-' || v_to_upper || '-' || LPAD(v_sequence::TEXT, 6, '0');

    -- ======================================================
    -- ۷. ثبت تراکنش
    -- ======================================================
    INSERT INTO public.transactions (
        transaction_id,
        user_id,
        type,
        amount,
        currency,
        target_currency,
        target_amount,
        usd_amount,
        description,
        status
    ) VALUES (
        v_tx_id,
        p_user_id,
        'swap',
        p_from_amount,
        v_from_upper,
        v_to_upper,
        p_to_amount,
        COALESCE(p_usd_value, 0),
        'Swap ' || v_from_upper || ' → ' || v_to_upper || ' (Rate: ' || COALESCE(v_exchange_rate::TEXT, 'N/A') || ')',
        'completed'
    );

    -- ======================================================
    -- ۸. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'transaction_id', v_tx_id,
        'from_currency', v_from_upper,
        'to_currency', v_to_upper,
        'from_amount', p_from_amount,
        'to_amount', p_to_amount,
        'exchange_rate', v_exchange_rate,
        'usd_value', COALESCE(p_usd_value, 0)
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'from_currency', v_from_upper,
            'to_currency', v_to_upper
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_execute_swap IS '
اجرای تبدیل ارز در سیستم داخلی دوبنا.
ورودی‌ها:
- p_user_id: شناسه کاربر
- p_from_currency: ارز مبدأ
- p_to_currency: ارز مقصد
- p_from_amount: مقدار ارز مبدأ برای تبدیل
- p_to_amount: مقدار ارز مقصد دریافتی (اختیاری، در صورت عدم ارائه محاسبه می‌شود)
- p_usd_value: ارزش دلاری معادل (اختیاری)

خروجی: JSONB شامل اطلاعات تراکنش

خطاهای احتمالی:
- INVALID_AMOUNT: مبلغ نامعتبر است
- SAME_CURRENCY: ارز مبدأ و مقصد یکسان است
- BALANCE_NOT_FOUND: کاربر موجودی ندارد
- INSUFFICIENT_BALANCE: موجودی کافی نیست
- EXCHANGE_RATE_UNAVAILABLE: نرخ تبدیل در دسترس نیست
';