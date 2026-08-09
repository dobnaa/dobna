-- ======================================================
-- fn_delete_community_group.sql
-- حذف کامل گروه، واریز کل BMC به حساب کاربر و سوزاندن صندوق لاتاری
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_delete_community_group(
    p_user_id UUID,
    p_community_id BIGINT
)
RETURNS JSONB AS $$
DECLARE
    v_owner_id UUID;
    v_currency VARCHAR(10);
    v_initial DECIMAL(20, 8);
    v_generated DECIMAL(20, 8);
    v_lottery DECIMAL(20, 8);
    v_total_bmc DECIMAL(20, 8);
    v_group_name TEXT;
    v_group_handle TEXT;
    v_result JSONB;
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات گروه با قفل
    -- ======================================================
    SELECT 
        owner_id, 
        currency, 
        initial_bmc, 
        generated_bmc, 
        lottery_pool,
        name,
        group_handle
    INTO 
        v_owner_id, 
        v_currency, 
        v_initial, 
        v_generated, 
        v_lottery,
        v_group_name,
        v_group_handle
    FROM public.communities
    WHERE id = p_community_id
    FOR UPDATE;

    -- ======================================================
    -- ۲. اعتبارسنجی
    -- ======================================================
    IF v_owner_id IS NULL THEN
        RAISE EXCEPTION 'COMMUNITY_NOT_FOUND';
    END IF;

    IF v_owner_id != p_user_id THEN
        RAISE EXCEPTION 'NOT_AUTHORIZED';
    END IF;

    -- ======================================================
    -- ۳. محاسبه مبالغ
    -- ======================================================
    v_total_bmc := COALESCE(v_initial, 0) + COALESCE(v_generated, 0);
    v_lottery := COALESCE(v_lottery, 0);

    -- ======================================================
    -- ۴. بازگرداندن کل BMC به حساب کاربر
    -- ======================================================
    IF v_total_bmc > 0 THEN
        INSERT INTO public.user_balances (user_id, currency, amount)
        VALUES (p_user_id, v_currency, v_total_bmc)
        ON CONFLICT (user_id, currency)
        DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount;

        -- ثبت تراکنش برای بازگرداندن BMC
        INSERT INTO public.transactions (
            user_id,
            type,
            currency,
            amount,
            reference_id,
            description,
            status
        ) VALUES (
            p_user_id,
            'community_refund',
            v_currency,
            v_total_bmc,
            p_community_id,
            'Refund BMC from deleted community: ' || v_group_handle,
            'completed'
        );
    END IF;

    -- ======================================================
    -- ۵. سوزاندن صندوق لاتاری (ثبت منفی در transactions)
    -- ======================================================
    IF v_lottery > 0 THEN
        INSERT INTO public.transactions (
            user_id,
            type,
            currency,
            amount,
            reference_id,
            description,
            status
        ) VALUES (
            '00000000-0000-0000-0000-000000000000', -- سیستم
            'lottery_burn',
            v_currency,
            -v_lottery,
            p_community_id,
            'Lottery pool burned on community deletion: ' || v_group_handle,
            'completed'
        );

        -- به‌روزرسانی آمار سیستم (در صورت وجود)
        -- UPDATE public.system_stats SET total_lottery_burned = total_lottery_burned + v_lottery;
    END IF;

    -- ======================================================
    -- ۶. حذف گروه (با CASCADE تمام وابستگی‌ها حذف می‌شوند)
    -- ======================================================
    DELETE FROM public.communities WHERE id = p_community_id;

    -- ======================================================
    -- ۷. خروجی موفقیت
    -- ======================================================
    v_result := jsonb_build_object(
        'success', true,
        'community_id', p_community_id,
        'community_name', v_group_name,
        'refunded_bmc', v_total_bmc,
        'burned_lottery', v_lottery,
        'currency', v_currency
    );

    RETURN v_result;

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'community_id', p_community_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_delete_community_group IS '
حذف کامل گروه و بازگرداندن سرمایه BMC به کاربر.
ورودی‌ها:
- p_user_id: شناسه کاربر درخواست‌دهنده (باید مالک گروه باشد)
- p_community_id: شناسه گروه

خروجی: JSONB شامل اطلاعات بازگرداندن سرمایه

خطاهای احتمالی:
- COMMUNITY_NOT_FOUND: گروه یافت نشد
- NOT_AUTHORIZED: کاربر مجاز به حذف گروه نیست

عملیات:
۱. بازگرداندن کل BMC (اولیه + اضافه‌شده) به حساب کاربر
۲. سوزاندن صندوق لاتاری (ثبت منفی)
۳. حذف گروه و تمام وابستگی‌ها (CASCADE)
';