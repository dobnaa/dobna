-- ======================================================
-- fn_request_withdrawal.sql
-- درخواست برداشت (قفل موجودی و ثبت pending)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_request_withdrawal(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20, 8),
    p_address VARCHAR(255),
    p_network VARCHAR(30)
)
RETURNS JSONB AS $$
DECLARE
    v_balance DECIMAL(20, 8);
    v_locked DECIMAL(20, 8);
    v_min_withdraw DECIMAL(20, 8);
    v_withdraw_fee DECIMAL(20, 8);
    v_currency_info RECORD;
    v_transaction_id BIGINT;
    v_total_deduction DECIMAL(20, 8);
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی ورودی‌ها
    -- ======================================================
    IF p_amount <= 0 THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'INVALID_AMOUNT');
    END IF;

    IF p_address IS NULL OR p_address = '' THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'INVALID_ADDRESS');
    END IF;

    -- ======================================================
    -- ۲. دریافت اطلاعات ارز
    -- ======================================================
    SELECT * INTO v_currency_info
    FROM public.currencies
    WHERE code = UPPER(p_currency)
      AND is_withdraw_enabled = TRUE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'WITHDRAWAL_NOT_SUPPORTED');
    END IF;

    v_min_withdraw := COALESCE(v_currency_info.min_withdraw, 0);
    v_withdraw_fee := COALESCE(v_currency_info.withdraw_fee, 0);

    IF p_amount < v_min_withdraw THEN
        RETURN jsonb_build_object(
            'success', FALSE,
            'error', 'BELOW_MIN_WITHDRAW',
            'min_withdraw', v_min_withdraw
        );
    END IF;

    -- ======================================================
    -- ۳. بررسی موجودی کاربر (با قفل سطری)
    -- ======================================================
    SELECT amount, locked_amount INTO v_balance, v_locked
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = UPPER(p_currency)
    FOR UPDATE;

    IF v_balance IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'BALANCE_NOT_FOUND');
    END IF;

    v_total_deduction := p_amount + v_withdraw_fee;

    IF v_balance < v_total_deduction THEN
        RETURN jsonb_build_object(
            'success', FALSE,
            'error', 'INSUFFICIENT_BALANCE',
            'available', v_balance,
            'required', v_total_deduction
        );
    END IF;

    -- ======================================================
    -- ۴. قفل موجودی (انتقال از amount به locked_amount)
    -- ======================================================
    UPDATE public.user_balances
    SET amount = amount - v_total_deduction,
        locked_amount = locked_amount + v_total_deduction
    WHERE user_id = p_user_id AND currency = UPPER(p_currency);

    -- ======================================================
    -- ۵. ثبت تراکنش pending
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        fee,
        network,
        address,
        status,
        created_at
    ) VALUES (
        p_user_id,
        'withdraw',
        UPPER(p_currency),
        -p_amount,
        v_withdraw_fee,
        p_network,
        p_address,
        'pending',
        NOW()
    ) RETURNING id INTO v_transaction_id;

    -- ======================================================
    -- ۶. خروجی (شناسه تراکنش برای Edge Function)
    -- ======================================================
    RETURN jsonb_build_object(
        'success', TRUE,
        'transaction_id', v_transaction_id,
        'amount', p_amount,
        'fee', v_withdraw_fee,
        'total_deduction', v_total_deduction,
        'address', p_address,
        'network', p_network,
        'status', 'pending'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_request_withdrawal IS '
درخواست برداشت با قفل موجودی و ثبت pending.
خطاها: INVALID_AMOUNT, INVALID_ADDRESS, WITHDRAWAL_NOT_SUPPORTED,
BELOW_MIN_WITHDRAW, BALANCE_NOT_FOUND, INSUFFICIENT_BALANCE
';