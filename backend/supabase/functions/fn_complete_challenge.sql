-- ======================================================
-- fn_complete_challenge.sql
-- اتمام چالش و توزیع جوایز بر اساس قوانین دوبنا
-- 
-- قوانین توزیع:
-- - ۲۰٪ از کل مبلغ به سازنده چالش (Creator)
-- - ۵٪ کارمزد به حساب پلتفرم (00000006)
-- - ۷۵٪ به برنده چالش (Winner)
-- 
-- پیش‌شرط‌ها:
-- 1. چالش باید حداقل ۵ شرکت‌کننده داشته باشد
-- 2. برنده باید توسط تابع fn_check_winner مشخص شده باشد
-- 3. اتاق بازی مربوط به چالش باید فعال باشد
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
    v_creator_balance DECIMAL(20,8);
    v_winner_balance DECIMAL(20,8);
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی اولیه
    -- ======================================================

    -- دریافت اطلاعات چالش
    SELECT * INTO v_challenge
    FROM public.challenges
    WHERE id = p_challenge_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION '❌ چالش با شناسه % یافت نشد', p_challenge_id;
    END IF;

    -- بررسی وضعیت چالش (فقط چالش‌های فعال یا در انتظار قابل تکمیل هستند)
    IF v_challenge.status NOT IN ('active', 'waiting') THEN
        RAISE EXCEPTION '❌ چالش با شناسه % در وضعیت قابل تکمیل نیست (وضعیت فعلی: %)', 
            p_challenge_id, v_challenge.status;
    END IF;

    -- بررسی تعداد شرکت‌کنندگان (حداقل ۵ نفر)
    IF v_challenge.current_participants < v_challenge.min_participants THEN
        RAISE EXCEPTION '❌ چالش کمتر از % شرکت‌کننده دارد، قابل تکمیل نیست', 
            v_challenge.min_participants;
    END IF;

    -- ======================================================
    -- ۲. پیدا کردن اتاق بازی و برنده
    -- ======================================================

    -- پیدا کردن اتاق مربوط به این چالش
    SELECT id INTO v_room_id
    FROM public.rooms
    WHERE challenge_id = p_challenge_id
    ORDER BY id DESC
    LIMIT 1;

    IF v_room_id IS NULL THEN
        RAISE EXCEPTION '❌ اتاقی برای چالش شناسه % یافت نشد', p_challenge_id;
    END IF;

    -- پیدا کردن برنده از کارت‌های بازی (کارتی که is_winner = TRUE است)
    SELECT user_id INTO v_winner_id
    FROM public.game_cards
    WHERE room_id = v_room_id
      AND is_winner = TRUE
    LIMIT 1;

    IF v_winner_id IS NULL THEN
        RAISE EXCEPTION '❌ برنده‌ای برای چالش شناسه % یافت نشد', p_challenge_id;
    END IF;

    -- ======================================================
    -- ۳. محاسبه مبالغ
    -- ======================================================

    -- کل مبلغ چالش = قیمت هر کارت × تعداد شرکت‌کنندگان
    v_total_pool := v_challenge.amount * v_challenge.current_participants;

    -- سهم هر بخش
    v_creator_share := v_total_pool * 0.20;   -- ۲۰٪ به سازنده
    v_platform_share := v_total_pool * 0.05;  -- ۵٪ کارمزد پلتفرم
    v_winner_share := v_total_pool - v_creator_share - v_platform_share; -- ۷۵٪ به برنده

    -- ======================================================
    -- ۴. واریز مبالغ به حساب‌های مربوطه
    -- ======================================================

    -- ۴.۱ واریز سهم سازنده (۲۰٪)
    UPDATE public.user_balances
    SET amount = amount + v_creator_share
    WHERE user_id = v_challenge.creator_id
      AND currency = v_challenge.currency;

    -- ۴.۲ واریز کارمزد پلتفرم به حساب ۰۰۰۰۰۰۰۶
    PERFORM fn_deposit_fee('00000006', v_challenge.currency, v_platform_share);

    -- ۴.۳ واریز جایزه به برنده (۷۵٪)
    UPDATE public.user_balances
    SET amount = amount + v_winner_share
    WHERE user_id = v_winner_id
      AND currency = v_challenge.currency;

    -- ======================================================
    -- ۵. به‌روزرسانی وضعیت چالش
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
    -- ۶. ثبت تراکنش‌ها
    -- ======================================================

    -- ۶.۱ تراکنش برنده
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description
    ) VALUES (
        v_winner_id,
        'challenge_win',
        v_challenge.currency,
        v_winner_share,
        p_challenge_id,
        'completed',
        '🏆 جایزه برنده چالش - ' || v_challenge.challenge_id
    );

    -- ۶.۲ تراکنش سازنده
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description
    ) VALUES (
        v_challenge.creator_id,
        'challenge_creator_fee',
        v_challenge.currency,
        v_creator_share,
        p_challenge_id,
        'completed',
        '👑 سهم سازنده چالش - ' || v_challenge.challenge_id
    );

    -- ۶.۳ تراکنش کارمزد پلتفرم
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description
    ) VALUES (
        '00000006',
        'platform_fee',
        v_challenge.currency,
        v_platform_share,
        p_challenge_id,
        'completed',
        '⚡ کارمزد پلتفرم چالش - ' || v_challenge.challenge_id
    );

    -- ======================================================
    -- ۷. به‌روزرسانی آمار کاربران (اختیاری)
    -- ======================================================

    -- اگر جدول user_stats وجود دارد، آمار را به‌روز کن
    BEGIN
        -- آمار برنده
        INSERT INTO public.user_stats (user_id, total_wins, total_score)
        VALUES (v_winner_id, 1, v_winner_share)
        ON CONFLICT (user_id)
        DO UPDATE SET 
            total_wins = user_stats.total_wins + 1,
            total_score = user_stats.total_score + v_winner_share;

        -- آمار سازنده
        INSERT INTO public.user_stats (user_id, total_challenges_created)
        VALUES (v_challenge.creator_id, 1)
        ON CONFLICT (user_id)
        DO UPDATE SET 
            total_challenges_created = user_stats.total_challenges_created + 1;
    EXCEPTION
        WHEN undefined_table THEN
            RAISE NOTICE 'ℹ️ جدول user_stats وجود ندارد، از به‌روزرسانی آمار صرف‌نظر شد';
    END;

    -- ======================================================
    -- ۸. ثبت لاگ موفقیت
    -- ======================================================

    RAISE NOTICE '✅ چالش % با موفقیت تکمیل شد. برنده: %، مبلغ جایزه: % %', 
        v_challenge.challenge_id, 
        v_winner_id, 
        v_winner_share, 
        v_challenge.currency;

EXCEPTION
    -- مدیریت خطاها و بازگرداندن تراکنش در صورت بروز مشکل
    WHEN OTHERS THEN
        RAISE EXCEPTION '❌ خطا در تکمیل چالش %: %', p_challenge_id, SQLERRM;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_complete_challenge IS '
اتمام چالش و توزیع جوایز بر اساس قوانین دوبنا:
- ۲۰٪ از کل مبلغ به سازنده چالش
- ۵٪ کارمزد به حساب پلتفرم (00000006)
- ۷۵٪ به برنده چالش

پیش‌شرط‌ها:
- چالش باید حداقل ۵ شرکت‌کننده داشته باشد
- برنده باید توسط fn_check_winner مشخص شده باشد
- اتاق بازی مربوط به چالش باید فعال باشد
';