-- ======================================================
-- fn_create_challenge.sql
-- ایجاد چالش جدید (بدون تنظیم کولدان)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_create_challenge(
    p_creator_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER
)
RETURNS BIGINT AS $$
DECLARE
    v_challenge_id BIGINT;
    v_unlocked_levels INTEGER[];
    v_waiting_count INTEGER;
    v_balance DECIMAL(20,8);
BEGIN
    -- ======================================================
    -- ۱. بررسی سطوح آزاد شده (بر اساس بازی‌های ۶ ساعت گذشته)
    -- ======================================================
    v_unlocked_levels := fn_get_unlocked_challenge_levels(p_creator_id);
    
    IF NOT (p_level = ANY(v_unlocked_levels)) THEN
        RAISE EXCEPTION 'LEVEL_LOCKED';
    END IF;

    -- ======================================================
    -- ۲. بررسی چالش‌های در انتظار (حداکثر ۱ چالش هم‌زمان)
    -- ======================================================
    SELECT COUNT(*) INTO v_waiting_count
    FROM public.challenges
    WHERE creator_id = p_creator_id AND status = 'waiting';

    IF v_waiting_count > 0 THEN
        RAISE EXCEPTION 'ACTIVE_CHALLENGE_EXISTS';
    END IF;

    -- ======================================================
    -- ۳. بررسی موجودی کاربر
    -- ======================================================
    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_creator_id AND currency = p_currency
    FOR UPDATE;

    IF v_balance IS NULL OR v_balance < p_amount THEN
        RAISE EXCEPTION 'INSUFFICIENT_BALANCE';
    END IF;

    -- ======================================================
    -- ۴. انتقال به حساب مرکزی (۱۱۱۱۱۱۱۱)
    -- ======================================================
    PERFORM fn_transfer_to_escrow(p_creator_id, p_currency, p_amount, 'challenge_create');

    -- ======================================================
    -- ۵. ایجاد چالش (بدون تنظیم کولدان)
    -- ======================================================
    INSERT INTO public.challenges (
        challenge_id,
        creator_id,
        currency,
        amount,
        level,
        expires_at,
        current_participants
    ) VALUES (
        'CHL-' || LPAD(nextval('seq_challenge_id')::TEXT, 6, '0'),
        p_creator_id,
        p_currency,
        p_amount,
        p_level,
        NOW() + INTERVAL '20 minutes',
        1
    ) RETURNING id INTO v_challenge_id;

    -- ======================================================
    -- ۶. تخصیص کارت به سازنده (رندوم از ۱ تا ۱۰۰)
    -- ======================================================
    PERFORM fn_assign_challenge_card(v_challenge_id, p_creator_id);

    -- ======================================================
    -- ۷. ثبت تراکنش
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status
    ) VALUES (
        p_creator_id,
        'challenge_create',
        p_currency,
        -p_amount,
        v_challenge_id,
        'completed'
    );

    RETURN v_challenge_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'CHALLENGE_CREATE_FAILED: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_create_challenge IS '
ایجاد چالش جدید (بدون تنظیم کولدان – کولدان فقط پس از برگزاری موفق تنظیم می‌شود).
ورودی‌ها:
- p_creator_id: شناسه کاربر سازنده
- p_currency: ارز چالش
- p_amount: مبلغ هر کارت
- p_level: سطح چالش (۱ تا ۴)

خطاهای احتمالی:
- LEVEL_LOCKED: سطح قفل است
- ACTIVE_CHALLENGE_EXISTS: کاربر قبلاً یک چالش در انتظار دارد
- INSUFFICIENT_BALANCE: موجودی کافی نیست
- CHALLENGE_CREATE_FAILED: خطای عمومی
';