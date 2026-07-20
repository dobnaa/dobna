-- تولید DID ۱۶ رقمی
CREATE OR REPLACE FUNCTION fn_generate_did(p_prefix VARCHAR(1) DEFAULT '9')
RETURNS VARCHAR(16) AS $$
DECLARE
    v_timestamp VARCHAR(15);
BEGIN
    v_timestamp := to_char(NOW(), 'YYMMDDHH24MISSMS');
    RETURN p_prefix || v_timestamp;
END;
$$ LANGUAGE plpgsql;