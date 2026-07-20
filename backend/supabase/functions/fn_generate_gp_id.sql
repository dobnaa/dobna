-- تولید شناسه گروه ۶ رقمی (GP000001)
CREATE OR REPLACE FUNCTION fn_generate_gp_id()
RETURNS VARCHAR(8) AS $$
DECLARE
    v_last_number BIGINT;
    v_new_id VARCHAR(8);
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(gp_id FROM 3) AS BIGINT)), 0) INTO v_last_number
    FROM public.communities;
    
    v_new_id := 'GP' || LPAD((v_last_number + 1)::TEXT, 6, '0');
    RETURN v_new_id;
END;
$$ LANGUAGE plpgsql;