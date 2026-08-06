-- ======================================================
-- fn_join_duel.sql
-- پیوستن به دوئل با قفل و جلوگیری از Race Condition
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_join_duel(
    p_duel_id BIGINT,
    p_user_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_duel RECORD;
    v_balance DECIMAL(20,8);
    v_updated INTEGER;
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات دوئل با قفل
    -- ======================================================
    SELECT * INTO v_duel
    FROM public.duels
    WHERE id = p_duel_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUEL_NOT_FOUND');
    END IF;

    IF v_duel.status != 'waiting' THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUEL_NOT_AVAILABLE');
    END IF;

    IF NOW() > v_duel.expires_at THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUEL_EXPIRED');
    END IF;

    -- ======================================================
    -- ۲. اعتبارسنجی نوع دوئل
    -- ======================================================
    IF v_duel.duel_type = 'private' AND v_duel.opponent_id != p_user_id THEN
        RETURN jsonb_build_object('success', false, 'error', 'PRIVATE_DUEL_NOT_ALLOWED');
    END IF;

    IF v_duel.duel_type = 'group' AND NOT EXISTS (
        SELECT 1 FROM public.community_members 
        WHERE community_id = v_duel.community_id AND user_id = p_user_id
    ) THEN
        RETURN jsonb_build_object('success', false, 'error', 'NOT_GROUP_MEMBER');
    END IF;

    -- ======================================================
    -- ۳. بررسی موجودی کاربر
    -- ======================================================
    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = v_duel.currency
    FOR UPDATE;

    IF v_balance IS NULL OR v_balance < v_duel.amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_BALANCE');
    END IF;

    -- ======================================================
    -- ۴. 🛡️ به‌روزرسانی با شرط status='waiting' (جلوگیری از Race Condition)
    -- ======================================================
    UPDATE public.duels
    SET opponent_id = p_user_id,
        status = 'active',
        started_at = NOW()
    WHERE id = p_duel_id AND status = 'waiting';

    GET DIAGNOSTICS v_updated = ROW_COUNT;

    -- اگر کسی قبلاً پیوسته باشد، v_updated = 0 خواهد بود
    IF v_updated = 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUEL_ALREADY_TAKEN');
    END IF;

    -- ======================================================
    -- ۵. انتقال به حساب مرکزی (فقط در صورت موفقیت)
    -- ======================================================
    PERFORM fn_transfer_to_escrow(p_user_id, v_duel.currency, v_duel.amount, 'duel_join');

    -- ======================================================
    -- ۶. تخصیص کارت‌ها (۱ تا ۳۰)
    -- ======================================================
    PERFORM fn_assign_duel_cards(p_duel_id);

    -- ======================================================
    -- ۷. شروع خودکار بازی دوئل
    -- ======================================================
    PERFORM fn_start_duel_game(p_duel_id);

    -- ======================================================
    -- ۸. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'duel_id', p_duel_id,
        'opponent_id', p_user_id,
        'status', 'active'
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'duel_id', p_duel_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;