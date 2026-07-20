-- تولید شماره حساب ۸ رقمی
CREATE OR REPLACE FUNCTION fn_generate_account_number()
RETURNS VARCHAR(8) AS $$
DECLARE
    v_last_number BIGINT;
    v_new_number VARCHAR(8);
BEGIN
    SELECT COALESCE(MAX(CAST(account_number AS BIGINT)), 0) INTO v_last_number
    FROM public.profiles;
    
    v_new_number := LPAD((v_last_number + 1)::TEXT, 8, '0');
    RETURN v_new_number;
END;
$$ LANGUAGE plpgsql;