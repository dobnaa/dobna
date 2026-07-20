CREATE OR REPLACE FUNCTION fn_deposit_platform_fee(
    p_level INTEGER,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS VOID AS $$
DECLARE
    v_account VARCHAR(20);
BEGIN
    CASE p_level
        WHEN 1 THEN v_account := '00000001';
        WHEN 2 THEN v_account := '00000002';
        WHEN 3 THEN v_account := '00000003';
        WHEN 4 THEN v_account := '00000004';
        ELSE RAISE EXCEPTION 'سطح نامعتبر است';
    END CASE;
    
    PERFORM fn_deposit_fee(v_account, p_currency, p_amount);
END;
$$ LANGUAGE plpgsql;