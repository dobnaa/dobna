-- انتقال به حساب مرکزی (Escrow)
CREATE OR REPLACE FUNCTION fn_transfer_to_escrow(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_reference TEXT
)
RETURNS VOID AS $$
BEGIN
    -- کسر از کاربر
    UPDATE public.user_balances
    SET amount = amount - p_amount
    WHERE user_id = p_user_id AND currency = p_currency;

    -- واریز به حساب مرکزی
    UPDATE public.system_accounts
    SET balance = balance + p_amount
    WHERE account_number = '11111111' AND currency = p_currency;
END;
$$ LANGUAGE plpgsql;