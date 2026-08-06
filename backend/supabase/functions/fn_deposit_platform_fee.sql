-- ======================================================
-- fn_deposit_platform_fee.sql
-- واریز کارمزد سهم پلتفرم دوبنا به حساب‌های مربوطه
-- 
-- پشتیبانی از:
-- - تالارهای گروه (سطح ۱ تا ۴) → حساب‌های ۰۰۰۰۰۰۰۱ تا ۰۰۰۰۰۰۰۴
-- - دوئل → حساب ۰۰۰۰۰۰۰۵
-- - چالش → حساب ۰۰۰۰۰۰۰۶
-- - سوآپ → حساب ۰۰۰۰۰۰۰۷
-- - انتقال داخلی → حساب ۰۰۰۰۰۰۰۸
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_deposit_platform_fee(
    p_type VARCHAR(20),     -- 'room', 'duel', 'challenge', 'swap', 'transfer'
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER DEFAULT NULL  -- فقط برای 'room' استفاده می‌شود
)
RETURNS BOOLEAN AS $$
DECLARE
    v_account VARCHAR(20);
BEGIN
    -- ======================================================
    -- ۱. تعیین شماره حساب بر اساس نوع
    -- ======================================================
    CASE p_type
        -- تالارهای گروه (بر اساس سطح)
        WHEN 'room' THEN
            IF p_level IS NULL OR p_level NOT BETWEEN 1 AND 4 THEN
                RAISE EXCEPTION 'INVALID_LEVEL';
            END IF;
            
            CASE p_level
                WHEN 1 THEN v_account := '00000001';
                WHEN 2 THEN v_account := '00000002';
                WHEN 3 THEN v_account := '00000003';
                WHEN 4 THEN v_account := '00000004';
            END CASE;
            
        -- دوئل
        WHEN 'duel' THEN
            v_account := '00000005';
            
        -- چالش
        WHEN 'challenge' THEN
            v_account := '00000006';
            
        -- سوآپ
        WHEN 'swap' THEN
            v_account := '00000007';
            
        -- انتقال داخلی
        WHEN 'transfer' THEN
            v_account := '00000008';
            
        ELSE
            RAISE EXCEPTION 'INVALID_FEE_TYPE';
    END CASE;

    -- ======================================================
    -- ۲. واریز به حساب سیستمی
    -- ======================================================
    UPDATE public.system_accounts
    SET balance = balance + p_amount
    WHERE account_number = v_account AND currency = p_currency;

    -- در صورتی که حساب وجود نداشته باشد، خطا
    IF NOT FOUND THEN
        RAISE EXCEPTION 'SYSTEM_ACCOUNT_NOT_FOUND';
    END IF;

    -- ======================================================
    -- ۳. ثبت تراکنش کارمزد (با user_id = NULL و description = NULL)
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        description,
        status
    ) VALUES (
        NULL,  -- تراکنش سیستمی
        'platform_fee',
        p_currency,
        p_amount,
        NULL,
        NULL,  -- بدون متن هاردکد؛ ترجمه در فرانت‌اند با type
        'completed'
    );

    RETURN TRUE;

EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error depositing fee: %', SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_deposit_platform_fee IS '
واریز کارمزد سهم پلتفرم دوبنا به حساب‌های مربوطه.

ورودی‌ها:
- p_type: نوع کارمزد (room, duel, challenge, swap, transfer)
- p_currency: ارز کارمزد (مثلاً USD, BTC)
- p_amount: مبلغ کارمزد
- p_level: سطح تالار (فقط برای نوع room)

حساب‌های مقصد:
- room (سطح ۱) → ۰۰۰۰۰۰۰۱
- room (سطح ۲) → ۰۰۰۰۰۰۰۲
- room (سطح ۳) → ۰۰۰۰۰۰۰۳
- room (سطح ۴) → ۰۰۰۰۰۰۰۴
- duel → ۰۰۰۰۰۰۰۵
- challenge → ۰۰۰۰۰۰۰۶
- swap → ۰۰۰۰۰۰۰۷
- transfer → ۰۰۰۰۰۰۰۸

خطاهای احتمالی (کدهای ثابت برای ترجمه در فرانت‌اند):
- INVALID_LEVEL: سطح تالار نامعتبر است
- INVALID_FEE_TYPE: نوع کارمزد نامعتبر است
- SYSTEM_ACCOUNT_NOT_FOUND: حساب سیستمی یافت نشد
';