-- ======================================================
-- 0042_community_management_and_bmc.sql
-- نسخه اصلاح و بهینه‌شده توابع مدیریت گروه
-- ======================================================

-- ۱. ساخت Sequence برای شماره‌گذاری امن gp_id
CREATE SEQUENCE IF NOT EXISTS public.community_gp_seq START WITH 1;

-- ======================================================
-- ۲. تابع ساخت گروه/کامونیتی جدید
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_create_community_group(
    p_creator_id UUID,
    p_name TEXT,
    p_currency VARCHAR(10),
    p_handle VARCHAR(100),
    p_avatar TEXT,
    p_bmc_amount DECIMAL(20, 8)
)
RETURNS BIGINT AS $$
DECLARE
    v_balance DECIMAL(20, 8) := 0;
    v_community_id BIGINT;
    v_full_handle TEXT;
    v_gp_id VARCHAR(8);
    v_gp_number BIGINT;
BEGIN
    -- ۱. اعتبارسنجی ورودی‌ها
    IF p_handle IS NULL OR LENGTH(TRIM(p_handle)) < 3 THEN
        RAISE EXCEPTION 'INVALID_HANDLE';
    END IF;

    IF p_bmc_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_BMC_AMOUNT';
    END IF;

    -- ۲. تولید شناسه یکتا (handle)
    v_full_handle := LOWER(TRIM(p_handle)) || '-' || UPPER(TRIM(p_currency));

    IF EXISTS (SELECT 1 FROM public.communities WHERE group_handle = v_full_handle) THEN
        RAISE EXCEPTION 'DUPLICATE_HANDLE';
    END IF;

    -- ۳. تولید gp_id با استفاده از Sequence جهت جلوگیری از Race Condition
    v_gp_number := nextval('public.community_gp_seq');
    v_gp_id := 'GP' || LPAD(v_gp_number::TEXT, 6, '0');

    -- ۴. بررسی موجودی کاربر با قفل سطر
    SELECT COALESCE(amount, 0) INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_creator_id AND currency = UPPER(TRIM(p_currency))
    FOR UPDATE;

    IF v_balance < p_bmc_amount THEN
        RAISE EXCEPTION 'INSUFFICIENT_BALANCE';
    END IF;

    -- ۵. کسر هزینه BMC از موجودی کاربر
    UPDATE public.user_balances
    SET amount = amount - p_bmc_amount
    WHERE user_id = p_creator_id AND currency = UPPER(TRIM(p_currency));

    -- ۶. ساخت گروه در جدول communities
    INSERT INTO public.communities (
        gp_id,
        owner_id,
        name,
        currency,
        group_handle,
        avatar,
        initial_bmc,
        generated_bmc,
        lottery_pool,
        created_at,
        updated_at
    ) VALUES (
        v_gp_id,
        p_creator_id,
        p_name,
        UPPER(TRIM(p_currency)),
        v_full_handle,
        p_avatar,
        p_bmc_amount,
        0,
        0,
        NOW(),
        NOW()
    ) RETURNING id INTO v_community_id;

    -- ۷. افزودن سازنده به‌عنوان مالک گروه (owner)
    INSERT INTO public.community_members (community_id, user_id, role)
    VALUES (v_community_id, p_creator_id, 'owner');

    -- ۸. ثبت تراکنش کسر BMC
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        description,
        status
    ) VALUES (
        p_creator_id,
        'community_create',
        UPPER(TRIM(p_currency)),
        -p_bmc_amount,
        v_community_id,
        'BMC for creating community: ' || v_full_handle,
        'completed'
    );

    -- ۹. ثبت اولیه آماری
    INSERT INTO public.community_stats (community_id, total_bmc, total_lottery, total_rank_score)
    VALUES (v_community_id, p_bmc_amount, 0, p_bmc_amount)
    ON CONFLICT (community_id) DO NOTHING;

    RETURN v_community_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'COMMUNITY_CREATE_FAILED: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ======================================================
-- ۳. تابع حذف کامل گروه و بازگرداندن BMC
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
BEGIN
    -- ۱. دریافت اطلاعات گروه با قفل
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

    -- ۲. اعتبارسنجی سطح دسترسی
    IF v_owner_id IS NULL THEN
        RAISE EXCEPTION 'COMMUNITY_NOT_FOUND';
    END IF;

    IF v_owner_id != p_user_id THEN
        RAISE EXCEPTION 'NOT_AUTHORIZED';
    END IF;

    -- ۳. محاسبه مبالغ
    v_total_bmc := COALESCE(v_initial, 0) + COALESCE(v_generated, 0);
    v_lottery := COALESCE(v_lottery, 0);

    -- ۴. بازگرداندن کل BMC به حساب کاربر
    IF v_total_bmc > 0 THEN
        INSERT INTO public.user_balances (user_id, currency, amount)
        VALUES (p_user_id, v_currency, v_total_bmc)
        ON CONFLICT (user_id, currency)
        DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount;

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

    -- ۵. ثبت تراکنش سوزاندن لاتاری (استفاده از NULL به عنوان user_id سیستمی)
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
            NULL, -- یا UUID واقعی کاربر سیستم
            'lottery_burn',
            v_currency,
            -v_lottery,
            p_community_id,
            'Lottery pool burned on community deletion: ' || v_group_handle,
            'completed'
        );
    END IF;

    -- ۶. حذف گروه (وابستگی‌ها با CASCADE حذف می‌شوند)
    DELETE FROM public.communities WHERE id = p_community_id;

    -- ۷. خروجی موفقیت
    RETURN jsonb_build_object(
        'success', true,
        'community_id', p_community_id,
        'community_name', v_group_name,
        'refunded_bmc', v_total_bmc,
        'burned_lottery', v_lottery,
        'currency', v_currency
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'community_id', p_community_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
