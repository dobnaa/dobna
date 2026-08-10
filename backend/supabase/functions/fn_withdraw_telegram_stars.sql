-- ======================================================
-- fn_withdraw_telegram_stars.sql (نسخه نهایی، اصلاح‌شده)
-- description حذف شد؛ شناسه تلگرام گیرنده در tx_id ذخیره می‌شود (نه در
-- ستون recipient_did که در schema واقعی وجود ندارد).
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_withdraw_telegram_stars(
    p_user_id UUID,
    p_amount INTEGER,
    p_telegram_id VARCHAR(100)
)
RETURNS JSONB AS $$
DECLARE
    v_balance DECIMAL(20, 8);
    v_new_balance DECIMAL(20, 8);
BEGIN
    IF p_amount <= 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'INVALID_AMOUNT');
    END IF;

    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = 'STARS'
    FOR UPDATE;

    IF v_balance IS NULL OR v_balance < p_amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_BALANCE');
    END IF;

    UPDATE public.user_balances
    SET amount = amount - p_amount
    WHERE user_id = p_user_id AND currency = 'STARS'
    RETURNING amount INTO v_new_balance;

    INSERT INTO public.transactions (user_id, type, currency, amount, tx_id, status)
    VALUES (p_user_id, 'withdraw', 'STARS', -p_amount, p_telegram_id, 'pending');

    RETURN jsonb_build_object(
        'success', true,
        'user_id', p_user_id,
        'amount', p_amount,
        'telegram_id', p_telegram_id,
        'new_balance', v_new_balance
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
