-- ======================================================
-- fn_complete_challenge.sql
-- اتمام چالش و توزیع جوایز + تنظیم کولدان
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_complete_challenge(p_challenge_id BIGINT)
RETURNS JSONB AS $$
DECLARE
    v_challenge RECORD;
    v_winner_id UUID;
    v_total_pool DECIMAL(20,8);
    v_creator_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_winner_share DECIMAL(20,8);
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات چالش
    -- ======================================================
    SELECT * INTO v_challenge
    FROM public.challenges
    WHERE id = p_challenge_id;

    IF NOT FOUND OR v_challenge.status NOT IN ('active', 'waiting') THEN
        RETURN jsonb_build_object('success', false, 'error', 'CHALLENGE_NOT_ACTIVE');
    END IF;

    IF v_challenge.current_participants < v_challenge.min_participants THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_PARTICIPANTS');
    END IF;

    -- ======================================================
    -- ۲. پیدا کردن برنده
    -- ======================================================
    SELECT user_id INTO v_winner_id
    FROM public.game_cards
    WHERE room_id = (
        SELECT id FROM public.rooms WHERE challenge_id = p_challenge_id
    ) AND is_winner = TRUE
    LIMIT 1;

    IF v_winner_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'WINNER_NOT_FOUND');
    END IF;

    -- ======================================================
    -- ۳. محاسبه مبالغ
    -- ======================================================
    v_total_pool := v_challenge.amount * v_challenge.current_participants;
    v_creator_share := v_total_pool * 0.20;   -- ۲۰٪ سازنده
    v_platform_share := v_total_pool * 0.05;  -- ۵٪ کارمزد
    v_winner_share := v_total_pool - v_creator_share - v_platform_share; -- ۷۵٪ برنده

    -- ======================================================
    -- ۴. کسر از حساب مرکزی
    -- ======================================================
    PERFORM fn_withdraw_from_escrow('11111111', v_challenge.currency, v_total_pool);

    -- ======================================================
    -- ۵. توزیع وجوه
    -- ======================================================
    -- واریز به سازنده (۲۰٪)
    UPDATE public.user_balances
    SET amount = amount + v_creator_share
    WHERE user_id = v_challenge.creator_id AND currency = v_challenge.currency;

    -- واریز به برنده (۷۵٪)
    UPDATE public.user_balances
    SET amount = amount + v_winner_share
    WHERE user_id = v_winner_id AND currency = v_challenge.currency;

    -- واریز کارمزد (۵٪) به ۰۰۰۰۰۰۰۶
    PERFORM fn_deposit_fee('00000006', v_challenge.currency, v_platform_share);

    -- ======================================================
    -- ۶. به‌روزرسانی وضعیت چالش
    -- ======================================================
    UPDATE public.challenges
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = v_winner_id,
        total_pool = v_total_pool,
        creator_fee = v_creator_share,
        platform_fee = v_platform_share
    WHERE id = p_challenge_id;

    -- ======================================================
    -- ۷. ✅ تنظیم کولدان ۶ ساعته (فقط پس از برگزاری موفق)
    -- ======================================================
    INSERT INTO public.challenge_cooldowns (user_id, last_challenge_at, cooldown_until)
    VALUES (v_challenge.creator_id, NOW(), NOW() + INTERVAL '6 hours')
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        last_challenge_at = NOW(),
        cooldown_until = NOW() + INTERVAL '6 hours';

    -- ======================================================
    -- ۸. ثبت تراکنش‌ها
    -- ======================================================
    INSERT INTO public.transactions (user_id, type, currency, amount, reference_id, status)
    VALUES
        (v_winner_id, 'challenge_win', v_challenge.currency, v_winner_share, p_challenge_id, 'completed'),
        (v_challenge.creator_id, 'challenge_creator_fee', v_challenge.currency, v_creator_share, p_challenge_id, 'completed'),
        (NULL, 'challenge_platform_fee', v_challenge.currency, v_platform_share, p_challenge_id, 'completed');

    -- ======================================================
    -- ۹. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'challenge_id', p_challenge_id,
        'winner_id', v_winner_id,
        'total_pool', v_total_pool,
        'cooldown_start', NOW(),
        'cooldown_end', NOW() + INTERVAL '6 hours'
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'challenge_id', p_challenge_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;