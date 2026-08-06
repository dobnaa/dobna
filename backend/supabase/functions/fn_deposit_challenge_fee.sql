-- ======================================================
-- fn_deposit_challenge_fee.sql
-- واریز کارمزد چالش‌ها به حساب ۰۰۰۰۰۰۰۶
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_deposit_challenge_fee(
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN fn_deposit_platform_fee('challenge', p_currency, p_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_deposit_challenge_fee IS '
واریز کارمزد چالش‌ها به حساب ۰۰۰۰۰۰۰۶.

ورودی‌ها:
- p_currency: ارز کارمزد
- p_amount: مبلغ کارمزد

مقصد:
- حساب ۰۰۰۰۰۰۰۶

خطاها: از تابع fn_deposit_platform_fee به ارث می‌برد.
';