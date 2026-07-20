CREATE OR REPLACE FUNCTION fn_deposit_fee(
    p_account VARCHAR(20),
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.system_accounts
    SET balance = balance + p_amount
    WHERE account_number = p_account AND currency = p_currency;
END;
$$ LANGUAGE plpgsql;