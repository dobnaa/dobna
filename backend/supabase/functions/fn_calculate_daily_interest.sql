-- محاسبه سود روزانه (۱۰٪ سالانه) برای همه کاربران
CREATE OR REPLACE FUNCTION fn_calculate_daily_interest()
RETURNS VOID AS $$
DECLARE
    v_user RECORD;
    v_interest DECIMAL(20,8);
BEGIN
    FOR v_user IN 
        SELECT user_id, total_balance_usd 
        FROM public.wallets
        WHERE total_balance_usd > 0
    LOOP
        -- سود روزانه = (ارزش کل × ۰.۱۰) / ۳۶۵
        v_interest := (v_user.total_balance_usd * 0.10) / 365;
        
        -- به‌روزرسانی سود انباشته
        UPDATE public.wallets
        SET interest_accrued = interest_accrued + v_interest,
            daily_interest = daily_interest + v_interest
        WHERE user_id = v_user.user_id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;