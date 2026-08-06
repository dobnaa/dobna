-- ======================================================
-- fn_deposit_room_fee.sql
-- واریز کارمزد تالارهای گروه (سطح ۱ تا ۴)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_deposit_room_fee(
    p_level INTEGER,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN fn_deposit_platform_fee('room', p_currency, p_amount, p_level);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_deposit_room_fee IS '
واریز کارمزد تالارهای گروه به حساب‌های مربوطه (۰۰۰۰۰۰۰۱ تا ۰۰۰۰۰۰۰۴).

ورودی‌ها:
- p_level: سطح تالار (۱ تا ۴)
- p_currency: ارز کارمزد
- p_amount: مبلغ کارمزد

مقصد:
- سطح ۱ → ۰۰۰۰۰۰۰۱
- سطح ۲ → ۰۰۰۰۰۰۰۲
- سطح ۳ → ۰۰۰۰۰۰۰۳
- سطح ۴ → ۰۰۰۰۰۰۰۴

خطاها: از تابع fn_deposit_platform_fee به ارث می‌برد.
';