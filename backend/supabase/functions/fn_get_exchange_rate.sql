-- ======================================================
-- fn_get_exchange_rate.sql
-- دریافت نرخ تبدیل بین دو ارز با استفاده از price_usd
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_get_exchange_rate(
    p_from_currency VARCHAR(10),
    p_to_currency VARCHAR(10)
)
RETURNS DECIMAL(20,8) AS $$
DECLARE
    v_from_price DECIMAL(20,8);
    v_to_price DECIMAL(20,8);
BEGIN
    -- اگر هر دو یکسان باشند
    IF UPPER(p_from_currency) = UPPER(p_to_currency) THEN
        RETURN 1.0;
    END IF;

    -- دریافت قیمت ارز مبدأ
    SELECT price_usd INTO v_from_price
    FROM public.currencies
    WHERE code = UPPER(p_from_currency) AND is_active = true;

    IF v_from_price IS NULL OR v_from_price <= 0 THEN
        RETURN NULL;
    END IF;

    -- دریافت قیمت ارز مقصد
    SELECT price_usd INTO v_to_price
    FROM public.currencies
    WHERE code = UPPER(p_to_currency) AND is_active = true;

    IF v_to_price IS NULL OR v_to_price <= 0 THEN
        RETURN NULL;
    END IF;

    -- نرخ تبدیل = price_usd(مبدأ) / price_usd(مقصد)
    -- مثال: BTC/USD = 65000 / 1 = 65000
    -- مثال: USD/IRT = 1 / 0.000025 = 40000
    -- مثال: DUS/USD = 1 / 1 = 1
    RETURN v_from_price / v_to_price;

EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION public.fn_get_exchange_rate IS '
دریافت نرخ تبدیل بین دو ارز.
ورودی‌ها:
- p_from_currency: کد ارز مبدأ (مثلاً BTC, USD, DUS)
- p_to_currency: کد ارز مقصد

خروجی: نرخ تبدیل (چند واحد ارز مقصد به ازای ۱ واحد ارز مبدأ)
مثال: fn_get_exchange_rate('BTC', 'USD') → 65000
مثال: fn_get_exchange_rate('USD', 'IRT') → 40000
مثال: fn_get_exchange_rate('DUS', 'USD') → 1

خطاها: در صورت عدم وجود ارز یا قیمت نامعتبر، NULL برمی‌گرداند.
';