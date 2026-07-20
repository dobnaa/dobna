CREATE OR REPLACE FUNCTION fn_check_balance(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS BOOLEAN AS $$
DECLARE
    v_balance DECIMAL(20,8);
BEGIN
    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = p_currency;
    
    RETURN COALESCE(v_balance, 0) >= p_amount;
END;
$$ LANGUAGE plpgsql;