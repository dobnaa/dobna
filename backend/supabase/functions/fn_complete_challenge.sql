-- ======================================================
-- fn_complete_challenge.sql
-- اتمام چالش و توزیع جوایز (۲۰٪ سازنده، ۵٪ پلتفرم، ۷۵٪ برنده)
-- ======================================================

CREATE OR REPLACE FUNCTION fn_complete_challenge(p_challenge_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
    v_winner_id UUID;
    v_room_id BIGINT;
    v_total_pool DECIMAL(20,8);
    v_creator_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_winner_share DECIMAL(20,8);
BEGIN
    -- ۱. دریافت اطلاعات چالش
    SELECT * INTO v_challenge
    FROM public.challenges
    WHERE id = p_challenge_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'چالش با شناسه % یافت نشد', p_challenge_id;
    END IF;

    -- ۲. پیدا کردن اتاق مربوط به این چالش
    SELECT id INTO v_room_id
    FROM public.rooms
    WHERE challenge_id = p_challenge_id
    LIMIT 1;

    IF v_room_id IS NULL THEN
        RAISE EXCEPTION 'اتاقی برای این چالش یافت نشد';
    END IF;

    -- ۳. پیدا کردن برنده از کارت‌های بازی
    SELECT user_id INTO v_winner_id
    FROM public.game_cards
    WHERE room_id = v_room_id
      AND is_winner = TRUE
    LIMIT 1;

    IF v_winner_id IS NULL THEN
        RAISE EXCEPTION 'برنده‌ای برای این چالش یافت نشد';
    END IF;

    -- ۴. محاسبه مبالغ
    v_total_pool := v_challenge.amount * v_challenge.current_participants;
    v_creator_share := v_total_pool * 0.20;   -- ۲۰٪ به سازنده
    v_platform_share := v_total_pool * 0.05;  -- ۵٪ کارمزد پلتفرم
    v_winner_share := v_total_pool - v_creator_share - v_platform_share; -- ۷۵٪ به برنده

    -- ۵. واریز سهم سازنده
    UPDATE public.user_balances
    SET amount = amount + v_creator_share
    WHERE user_id = v_challenge.creator_id
      AND currency = v_challenge.currency;

    -- ۶. واریز کارمزد پلتفرم به حساب ۰۰۰۰۰۰۰۶
    PERFORM fn_deposit_fee('00000006', v_challenge.currency, v_platform_share);

    -- ۷. واریز جایزه به برنده
    UPDATE public.user_balances
    SET amount = amount + v_winner_share
    WHERE user_id = v_winner_id
      AND currency = v_challenge.currency;

    -- ۸. به‌روزرسانی وضعیت چالش
    UPDATE public.challenges
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = v_winner_id,
        total_pool = v_total_pool,
        creator_fee = v_creator_share,
        platform_fee = v_platform_share
    WHERE id = p_challenge_id;

    -- ۹. ثبت تراکنش‌ها
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description,
        created_at
    ) VALUES 
    (
        v_winner_id,
        'challenge_win',
        v_challenge.currency,
        v_winner_share,
        p_challenge_id,
        'completed',
        'جایزه برنده چالش - ' || v_challenge.challenge_id,
        NOW()
    ),
    (
        v_challenge.creator_id,
        'challenge_creator_fee',
        v_challenge.currency,
        v_creator_share,
        p_challenge_id,
        'completed',
        'سهم سازنده چالش - ' || v_challenge.challenge_id,
        NOW()
    ),
    (
        '00000006',
        'platform_fee',
        v_challenge.currency,
        v_platform_share,
        p_challenge_id,
        'completed',
        'کارمزد پلتفرم چالش - ' || v_challenge.challenge_id,
        NOW()
    );

    -- ۱۰. به‌روزرسانی آمار کاربران (در صورت وجود جدول user_stats)
    -- اگر جدول user_stats وجود دارد، این بخش اجرا می‌شود
    BEGIN
        UPDATE public.user_stats
        SET total_wins = total_wins + 1,
            total_score = total_score + v_winner_share
        WHERE user_id = v_winner_id;

        UPDATE public.user_stats
        SET total_challenges_created = total_challenges_created + 1
        WHERE user_id = v_challenge.creator_id;
    EXCEPTION
        WHEN undefined_table THEN
            -- اگر جدول user_stats وجود ندارد، خطا را نادیده بگیر
            RAISE NOTICE 'جدول user_stats وجود ندارد، از به‌روزرسانی آمار صرف‌نظر شد';
    END;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_complete_challenge IS 'اتمام چالش و توزیع جوایز: ۲۰٪ به سازنده، ۵٪ کارمزد، ۷۵٪ به برنده';