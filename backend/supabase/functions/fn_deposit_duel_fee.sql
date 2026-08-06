-- ======================================================
-- fn_deposit_duel_fee.sql
-- واریز کارمزد دوئل‌ها به حساب ۰۰۰۰۰۰۰۵
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_deposit_duel_fee(
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN fn_deposit_platform_fee('duel', p_currency, p_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_deposit_duel_fee IS '
واریز کارمزد دوئل‌ها به حساب ۰۰۰۰۰۰۰۵.

ورودی‌ها:
- p_currency: ارز کارمزد
- p_amount: مبلغ کارمزد

مقصد:
- حساب ۰۰۰۰۰۰۰۵

خطاها: از تابع fn_deposit_platform_fee به ارث می‌برد.
';