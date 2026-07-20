-- ======================================================
-- fn_complete_challenge.sql
-- اتمام چالش و توزیع جوایز از حساب مرکزی (۱۱۱۱۱۱۱۱)
-- 
-- قوانین توزیع (بر اساس کل مبلغ جمع‌آوری‌شده):
-- - ۲۰٪ به سازنده چالش (Creator)
-- - ۵٪ کارمزد به حساب پلتفرم (00000006)
-- - ۷۵٪ به برنده چالش (Winner)
-- 
-- جریان مالی:
-- ۱. بررسی موجودی کافی در حساب مرکزی (۱۱۱۱۱۱۱۱)
-- ۲. کسر کل مبلغ از حساب مرکزی
-- ۳. واریز سهم سازنده (۲۰٪)
-- ۴. واریز کارمزد پلتفرم (۵٪) به حساب ۰۰۰۰۰۰۰۶
-- ۵. واریز جایزه به برنده (۷۵٪)
-- ۶. ثبت تراکنش‌ها و به‌روزرسانی آمار
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
    v_escrow_balance DECIMAL(20,8);
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

    -- بررسی وضعیت چالش
    IF v_challenge.status NOT IN ('active', 'waiting') THEN
        RAISE EXCEPTION '❌ چالش در وضعیت قابل تکمیل نیست (وضعیت فعلی: %)', v_challenge.status;
    END IF;

    -- بررسی تعداد شرکت‌کنندگان
    IF v_challenge.current_participants < v_challenge.min_participants THEN
        RAISE EXCEPTION '❌ چالش کمتر از % شرکت‌کننده دارد', v_challenge.min_participants;
    END IF;

    -- پیدا کردن اتاق و برنده
    SELECT id INTO v_room_id
    FROM public.rooms
    WHERE challenge_id = p_challenge_id
    ORDER BY id DESC
    LIMIT 1;

    IF v_room_id IS NULL THEN
        RAISE EXCEPTION '❌ اتاقی برای چالش یافت نشد';
    END IF;

    SELECT user_id INTO v_winner_id
    FROM public.game_cards
    WHERE room_id = v_room_id AND is_winner = TRUE
    LIMIT 1;

    IF v_winner_id IS NULL THEN
        RAISE EXCEPTION '❌ برنده‌ای برای چالش یافت نشد';
    END IF;

    -- ======================================================
    -- ۲. محاسبه مبالغ
    -- ======================================================

    v_total_pool := v_challenge.amount * v_challenge.current_participants;
    v_creator_share := v_total_pool * 0.20;   -- ۲۰٪
    v_platform_share := v_total_pool * 0.05;  -- ۵٪
    v_winner_share := v_total_pool - v_creator_share - v_platform_share; -- ۷۵٪

    -- ======================================================
    -- ۳. بررسی و کسر از حساب مرکزی (۱۱۱۱۱۱۱۱)
    -- ======================================================

    -- دریافت موجودی حساب مرکزی برای ارز مورد نظر
    SELECT balance INTO v_escrow_balance
    FROM public.system_accounts
    WHERE account_number = '11111111'
      AND currency = v_challenge.currency;

    IF v_escrow_balance < v_total_pool THEN
        RAISE EXCEPTION '❌ موجودی حساب مرکزی (۱۱۱۱۱۱۱۱) برای ارز % کافی نیست (موجودی: %، موردنیاز: %)',
            v_challenge.currency, v_escrow_balance, v_total_pool;
    END IF;

    -- کسر کل مبلغ از حساب مرکزی
    UPDATE public.system_accounts
    SET balance = balance - v_total_pool
    WHERE account_number = '11111111'
      AND currency = v_challenge.currency;

    -- ======================================================
    -- ۴. توزیع وجوه از حساب مرکزی به مقاصد نهایی
    -- ======================================================

    -- ۴.۱ واریز سهم سازنده (۲۰٪)
    UPDATE public.user_balances
    SET amount = amount + v_creator_share
    WHERE user_id = v_challenge.creator_id
      AND currency = v_challenge.currency;

    -- ۴.۲ واریز کارمزد پلتفرم (۵٪) به حساب ۰۰۰۰۰۰۰۶
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
    -- ۶. ثبت تراکنش‌های خروجی
    -- ======================================================

    -- ۶.۱ تراکنش کسر از حساب مرکزی (خروجی)
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description
    ) VALUES (
        '11111111',
        'escrow_debit',
        v_challenge.currency,
        -v_total_pool,
        p_challenge_id,
        'completed',
        '🔻 کسر کل مبلغ چالش از حساب مرکزی - ' || v_challenge.challenge_id
    );

    -- ۶.۲ تراکنش واریز به برنده
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

    -- ۶.۳ تراکنش واریز به سازنده
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

    -- ۶.۴ تراکنش واریز کارمزد پلتفرم
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
            RAISE NOTICE 'ℹ️ جدول user_stats وجود ندارد';
    END;

    -- ======================================================
    -- ۸. لاگ موفقیت
    -- ======================================================

    RAISE NOTICE '✅ چالش % تکمیل شد. کل مبلغ: % %، برنده: %، جایزه: % %',
        v_challenge.challenge_id,
        v_total_pool,
        v_challenge.currency,
        v_winner_id,
        v_winner_share,
        v_challenge.currency;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION '❌ خطا در تکمیل چالش %: %', p_challenge_id, SQLERRM;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_complete_challenge IS '
اتمام چالش و توزیع جوایز با استفاده از حساب مرکزی (۱۱۱۱۱۱۱۱):
۱. بررسی و کسر کل مبلغ از حساب مرکزی
۲. واریز ۲۰٪ به سازنده
۳. واریز ۵٪ کارمزد به حساب ۰۰۰۰۰۰۰۶
۴. واریز ۷۵٪ به برنده
';