-- ======================================================
-- fn_create_community_group.sql
-- ساخت گروه/کامونیتی جدید و کسر هزینه اولیه BMC
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
    -- ======================================================
    -- ۱. اعتبارسنجی ورودی‌ها
    -- ======================================================
    IF p_handle IS NULL OR LENGTH(p_handle) < 3 THEN
        RAISE EXCEPTION 'INVALID_HANDLE';
    END IF;

    IF p_bmc_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_BMC_AMOUNT';
    END IF;

    -- ======================================================
    -- ۲. تولید شناسه گروه (GP + ۶ رقم)
    -- ======================================================
    SELECT COALESCE(MAX(CAST(SUBSTRING(gp_id FROM 3) AS BIGINT)), 0) + 1
    INTO v_gp_number
    FROM public.communities;

    v_gp_id := 'GP' || LPAD(v_gp_number::TEXT, 6, '0');

    -- ======================================================
    -- ۳. تولید شناسه یکتا (handle)
    -- ======================================================
    v_full_handle := LOWER(p_handle) || '-' || UPPER(p_currency);

    IF EXISTS (SELECT 1 FROM public.communities WHERE group_handle = v_full_handle) THEN
        RAISE EXCEPTION 'DUPLICATE_HANDLE';
    END IF;

    -- ======================================================
    -- ۴. بررسی موجودی کاربر
    -- ======================================================
    SELECT COALESCE(amount, 0) INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_creator_id AND currency = UPPER(p_currency)
    FOR UPDATE;

    IF v_balance < p_bmc_amount THEN
        RAISE EXCEPTION 'INSUFFICIENT_BALANCE';
    END IF;

    -- ======================================================
    -- ۵. کسر هزینه BMC از موجودی کاربر
    -- ======================================================
    UPDATE public.user_balances
    SET amount = amount - p_bmc_amount
    WHERE user_id = p_creator_id AND currency = UPPER(p_currency);

    -- ======================================================
    -- ۶. ساخت گروه در جدول communities
    -- ======================================================
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
        UPPER(p_currency),
        v_full_handle,
        p_avatar,
        p_bmc_amount,
        0,
        0,
        NOW(),
        NOW()
    ) RETURNING id INTO v_community_id;

    -- ======================================================
    -- ۷. افزودن سازنده به‌عنوان ادمین گروه
    -- ======================================================
    INSERT INTO public.community_members (community_id, user_id, role)
    VALUES (v_community_id, p_creator_id, 'owner');

    -- ======================================================
    -- ۸. ثبت تراکنش برای کسر BMC
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
        p_creator_id,
        'community_create',
        UPPER(p_currency),
        -p_bmc_amount,
        v_community_id,
        'BMC for creating community: ' || v_full_handle,
        'completed'
    );

    -- ======================================================
    -- ۹. ثبت در جدول statistics (اختیاری)
    -- ======================================================
    INSERT INTO public.community_stats (community_id, total_bmc, total_lottery, total_rank_score)
    VALUES (v_community_id, p_bmc_amount, 0, p_bmc_amount)
    ON CONFLICT (community_id) DO NOTHING;

    -- ======================================================
    -- ۱۰. خروجی موفقیت
    -- ======================================================
    RETURN v_community_id;

EXCEPTION
    WHEN OTHERS THEN
        -- بازگرداندن تراکنش در صورت خطا
        RAISE EXCEPTION 'COMMUNITY_CREATE_FAILED: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_create_community_group IS '
ساخت گروه/کامونیتی جدید با کسر هزینه BMC از کاربر.
ورودی‌ها:
- p_creator_id: شناسه کاربر سازنده
- p_name: نام گروه
- p_currency: ارز پایه گروه (مثلاً USD, BTC)
- p_handle: شناسه منحصربه‌فرد گروه (قسمت قبل از -)
- p_avatar: آدرس آواتار گروه
- p_bmc_amount: مبلغ BMC (معادل ۱۰۰ دلار)

خروجی: شناسه گروه (BIGINT)

خطاهای احتمالی:
- INVALID_HANDLE: شناسه نامعتبر است
- DUPLICATE_HANDLE: شناسه قبلاً ثبت شده است
- INVALID_BMC_AMOUNT: مبلغ BMC نامعتبر است
- INSUFFICIENT_BALANCE: موجودی کاربر کافی نیست
- COMMUNITY_CREATE_FAILED: خطای عمومی در ساخت گروه
';