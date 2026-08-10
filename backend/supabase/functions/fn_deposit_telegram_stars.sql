-- ======================================================
-- fn_deposit_telegram_stars.sql (نسخه نهایی، اصلاح‌شده)
-- description حذف شد؛ type='deposit' + currency='STARS' + tx_id کافی است.
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_deposit_telegram_stars(
    p_user_id UUID,
    p_amount INTEGER,
    p_tx_id VARCHAR(100)
)
RETURNS JSONB AS $$
DECLARE
    v_new_balance DECIMAL(20, 8);
BEGIN
    IF p_amount <= 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'INVALID_AMOUNT');
    END IF;

    INSERT INTO public.user_balances (user_id, currency, amount)
    VALUES (p_user_id, 'STARS', p_amount)
    ON CONFLICT (user_id, currency)
    DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount
    RETURNING amount INTO v_new_balance;

    INSERT INTO public.transactions (user_id, type, currency, amount, tx_id, status)
    VALUES (p_user_id, 'deposit', 'STARS', p_amount, p_tx_id, 'completed');

    RETURN jsonb_build_object(
        'success', true,
        'user_id', p_user_id,
        'amount', p_amount,
        'new_balance', v_new_balance,
        'tx_id', p_tx_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
