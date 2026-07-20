-- دریافت نرخ تبدیل لحظه‌ای
CREATE OR REPLACE FUNCTION fn_get_exchange_rate(
    p_from_currency VARCHAR(10),
    p_to_currency VARCHAR(10)
)
RETURNS DECIMAL(20,8) AS $$
DECLARE
    v_rate DECIMAL(20,8);
BEGIN
    -- اگر هر دو یکسان باشند
    IF p_from_currency = p_to_currency THEN
        RETURN 1;
    END IF;

    -- دریافت از جدول قیمت‌ها
    SELECT (price_usd) INTO v_rate
    FROM public.currencies
    WHERE code = p_from_currency;

    IF v_rate IS NULL THEN
        RAISE EXCEPTION 'ارز مبدأ یافت نشد';
    END IF;

    RETURN v_rate;
END;
$$ LANGUAGE plpgsql;