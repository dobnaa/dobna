-- ======================================================
-- fn_create_duel.sql
-- ایجاد دوئل با اعتبارسنجی کامل
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_create_duel(
    p_creator_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER,
    p_type VARCHAR(20),
    p_opponent_id UUID DEFAULT NULL,
    p_community_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_duel_id BIGINT;
    v_balance DECIMAL(20,8);
    v_waiting_count INTEGER;
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی ورودی‌ها
    -- ======================================================
    IF p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;

    IF p_level NOT BETWEEN 1 AND 4 THEN
        RAISE EXCEPTION 'INVALID_LEVEL';
    END IF;

    -- بررسی نوع دوئل
    IF p_type = 'private' AND p_opponent_id IS NULL THEN
        RAISE EXCEPTION 'PRIVATE_DUEL_NEEDS_OPPONENT';
    END IF;

    IF p_type = 'group' AND p_community_id IS NULL THEN
        RAISE EXCEPTION 'GROUP_DUEL_NEEDS_COMMUNITY';
    END IF;

    IF p_type NOT IN ('public', 'private', 'group') THEN
        RAISE EXCEPTION 'INVALID_DUEL_TYPE';
    END IF;

    -- جلوگیری از ساخت دوئل هم‌زمان (حداکثر ۱ دوئل waiting)
    SELECT COUNT(*) INTO v_waiting_count
    FROM public.duels
    WHERE creator_id = p_creator_id AND status = 'waiting';

    IF v_waiting_count > 0 THEN
        RAISE EXCEPTION 'ACTIVE_DUEL_EXISTS';
    END IF;

    -- ======================================================
    -- ۲. بررسی موجودی کاربر
    -- ======================================================
    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_creator_id AND currency = p_currency
    FOR UPDATE;

    IF v_balance IS NULL OR v_balance < p_amount THEN
        RAISE EXCEPTION 'INSUFFICIENT_BALANCE';
    END IF;

    -- ======================================================
    -- ۳. انتقال به حساب مرکزی
    -- ======================================================
    PERFORM fn_transfer_to_escrow(p_creator_id, p_currency, p_amount, 'duel_create');

    -- ======================================================
    -- ۴. ایجاد دوئل
    -- ======================================================
    INSERT INTO public.duels (
        duel_id,
        creator_id,
        opponent_id,
        community_id,
        currency,
        amount,
        level,
        duel_type,
        expires_at,
        status
    ) VALUES (
        'DUL-' || LPAD(nextval('seq_duel_id')::TEXT, 6, '0'),
        p_creator_id,
        p_opponent_id,
        p_community_id,
        p_currency,
        p_amount,
        p_level,
        p_type,
        NOW() + INTERVAL '5 minutes',
        'waiting'
    ) RETURNING id INTO v_duel_id;

    -- ======================================================
    -- ۵. نوتیفیکیشن (با کد پایدار، نه متن هاردکد)
    -- ======================================================
    IF p_type = 'private' AND p_opponent_id IS NOT NULL THEN
        INSERT INTO public.notifications (
            user_id,
            type,
            content,
            related_id
        ) VALUES (
            p_opponent_id,
            'duel_request',
            'DUEL_REQUEST',  -- ✅ کد پایدار برای ترجمه در فرانت‌اند
            v_duel_id
        );
    END IF;

    RETURN v_duel_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'DUEL_CREATE_FAILED: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;