-- ======================================================
-- fn_redeem_dus_to_currency.sql
-- تبدیل DUS (Dobna Unit) به ارزهای دیگر در سیستم داخلی دوبنا
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_redeem_dus_to_currency(
    p_user_id UUID,
    p_target_currency VARCHAR(10),
    p_dus_amount INTEGER
)
RETURNS JSONB AS $$
DECLARE
    v_current_balance INTEGER;
    v_target_rate DECIMAL(20,8);
    v_target_amount DECIMAL(20,8);
    v_new_balance INTEGER;
    v_tx_id VARCHAR(100);
    v_sequence BIGINT;
    v_currency_exists BOOLEAN;
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی ورودی‌ها
    -- ======================================================
    IF p_dus_amount <= 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'INVALID_DUS_AMOUNT');
    END IF;

    -- بررسی وجود ارز مقصد
    SELECT EXISTS (
        SELECT 1 FROM public.currencies
        WHERE code = UPPER(p_target_currency) AND is_active = true
    ) INTO v_currency_exists;

    IF NOT v_currency_exists THEN
        RETURN jsonb_build_object('success', false, 'error', 'CURRENCY_NOT_SUPPORTED');
    END IF;

    -- ======================================================
    -- ۲. بررسی موجودی DUS کاربر
    -- ======================================================
    SELECT dobna_points_balance INTO v_current_balance
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF v_current_balance IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'USER_NOT_FOUND');
    END IF;

    IF v_current_balance < p_dus_amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_DUS');
    END IF;

    -- ======================================================
    -- ۳. محاسبه نرخ تبدیل DUS → هدف
    -- ======================================================
    IF UPPER(p_target_currency) = 'USD' THEN
        v_target_rate := 1.0;
        v_target_amount := p_dus_amount;
    ELSE
        -- دریافت نرخ USD به ارز مقصد (چند واحد ارز مقصد به ازای ۱ USD)
        SELECT fn_get_exchange_rate('USD', p_target_currency) INTO v_target_rate;

        IF v_target_rate IS NULL OR v_target_rate <= 0 THEN
            RETURN jsonb_build_object('success', false, 'error', 'EXCHANGE_RATE_UNAVAILABLE');
        END IF;

        -- هر DUS = ۱ USD، پس مقدار هدف = DUS * (نرخ USD → هدف)
        v_target_amount := p_dus_amount * v_target_rate;
    END IF;

    -- ======================================================
    -- ۴. کسر DUS از کاربر
    -- ======================================================
    UPDATE public.profiles
    SET dobna_points_balance = dobna_points_balance - p_dus_amount
    WHERE id = p_user_id
    RETURNING dobna_points_balance INTO v_new_balance;

    -- ======================================================
    -- ۵. واریز مبلغ به کیف پول کاربر
    -- ======================================================
    INSERT INTO public.user_balances (user_id, currency, amount)
    VALUES (p_user_id, UPPER(p_target_currency), v_target_amount)
    ON CONFLICT (user_id, currency)
    DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount;

    -- ======================================================
    -- ۶. ثبت در دفتر امتیازات (ledger)
    -- ======================================================
    INSERT INTO public.dobna_points_ledger (
        user_id,
        amount,
        reason,
        reference_id,
        balance_after
    ) VALUES (
        p_user_id,
        -p_dus_amount,
        'dus_redemption',
        UPPER(p_target_currency),
        v_new_balance
    );

    -- ======================================================
    -- ۷. تولید شناسه تراکنش یکتا
    -- ======================================================
    SELECT COALESCE(MAX(CAST(SUBSTRING(transaction_id FROM '[0-9]+$') AS BIGINT)), 0) + 1
    INTO v_sequence
    FROM public.transactions
    WHERE transaction_id LIKE 'DUS-%';

    v_tx_id := 'DUS-' || UPPER(p_target_currency) || '-' || LPAD(v_sequence::TEXT, 6, '0');

    -- ======================================================
    -- ۸. ثبت تراکنش
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
        'dus_redemption',
        -p_dus_amount,
        'DUS',
        UPPER(p_target_currency),
        v_target_amount,
        v_target_amount,
        'Redeemed ' || p_dus_amount || ' DUS to ' || UPPER(p_target_currency) || ' (Rate: ' || v_target_rate::TEXT || ')',
        'completed'
    );

    -- ======================================================
    -- ۹. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'dus_used', p_dus_amount,
        'target_currency', UPPER(p_target_currency),
        'target_amount', v_target_amount,
        'exchange_rate', v_target_rate,
        'new_balance', v_new_balance,
        'transaction_id', v_tx_id
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'dus_used', p_dus_amount,
            'target_currency', UPPER(p_target_currency)
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_redeem_dus_to_currency IS '
تبدیل DUS (Dobna Unit) به ارزهای دیگر در سیستم داخلی دوبنا.
ورودی‌ها:
- p_user_id: شناسه کاربر
- p_target_currency: ارز مقصد (مثلاً USD, BTC, IRT)
- p_dus_amount: تعداد DUS برای تبدیل (عدد صحیح)

خروجی: JSONB شامل اطلاعات تبدیل

قوانین:
- ۱ DUS = ۱ USD (ثابت)
- تبدیل با استفاده از نرخ لحظه‌ای انجام می‌شود
- فقط DUS کامل (عدد صحیح) قابل تبدیل است

خطاهای احتمالی:
- INVALID_DUS_AMOUNT: مقدار DUS نامعتبر است
- CURRENCY_NOT_SUPPORTED: ارز مقصد پشتیبانی نمی‌شود
- USER_NOT_FOUND: کاربر یافت نشد
- INSUFFICIENT_DUS: موجودی DUS کافی نیست
- EXCHANGE_RATE_UNAVAILABLE: نرخ تبدیل در دسترس نیست
';