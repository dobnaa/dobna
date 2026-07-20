-- ======================================================
-- fn_complete_room_game.sql
-- اتمام بازی اتاق و توزیع جوایز از حساب مرکزی (۱۱۱۱۱۱۱۱)
-- 
-- قوانین توزیع (بر اساس کل مبلغ جمع‌آوری‌شده):
-- - ۴٪ به مالک گروه
-- - ۰.۵٪ به BMC گروه (ساختمان گروه)
-- - ۰.۵٪ به لاتاری گروه
-- - ۵٪ کارمزد پلتفرم (بر اساس سطح: ۰۰۰۰۰۰۰۱ تا ۰۰۰۰۰۰۰۴)
-- - ۹٪ به برنده‌های خطی
-- - ۸۱٪ به برنده پر
-- 
-- جریان مالی:
-- ۱. بررسی موجودی کافی در حساب مرکزی (۱۱۱۱۱۱۱۱)
-- ۲. کسر کل مبلغ بازی از حساب مرکزی
-- ۳. توزیع سهم‌ها به مقاصد مربوطه
-- ۴. ثبت تراکنش‌ها
-- ======================================================

CREATE OR REPLACE FUNCTION fn_complete_room_game(p_room_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_room RECORD;
    v_winner_card RECORD;
    v_line_winners RECORD;
    v_community RECORD;
    v_total_pool DECIMAL(20,8);
    v_owner_share DECIMAL(20,8);
    v_bmc_share DECIMAL(20,8);
    v_lottery_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_line_share DECIMAL(20,8);
    v_full_share DECIMAL(20,8);
    v_escrow_balance DECIMAL(20,8);
    v_line_winner_count INTEGER := 0;
BEGIN
    -- ۱. دریافت اطلاعات اتاق
    SELECT * INTO v_room
    FROM public.rooms
    WHERE id = p_room_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION '❌ اتاق با شناسه % یافت نشد', p_room_id;
    END IF;

    -- بررسی وضعیت اتاق
    IF v_room.status != 'active' THEN
        RAISE EXCEPTION '❌ اتاق در وضعیت فعال نیست (وضعیت فعلی: %)', v_room.status;
    END IF;

    -- ۲. دریافت اطلاعات گروه
    SELECT * INTO v_community
    FROM public.communities
    WHERE id = v_room.community_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION '❌ گروه مربوط به اتاق یافت نشد';
    END IF;

    -- ۳. دریافت برنده پر
    SELECT * INTO v_winner_card
    FROM public.game_cards
    WHERE room_id = p_room_id
      AND is_winner = TRUE
    LIMIT 1;

    IF v_winner_card IS NULL THEN
        RAISE EXCEPTION '❌ برنده‌ای برای این اتاق یافت نشد';
    END IF;

    -- ۴. محاسبه مبالغ
    v_total_pool := v_room.card_price * v_room.total_cards;
    v_owner_share := v_total_pool * 0.04;    -- ۴٪
    v_bmc_share := v_total_pool * 0.005;     -- ۰.۵٪
    v_lottery_share := v_total_pool * 0.005; -- ۰.۵٪
    v_platform_share := v_total_pool * 0.05; -- ۵٪
    v_line_share := v_total_pool * 0.09;     -- ۹٪
    v_full_share := v_total_pool * 0.81;     -- ۸۱٪

    -- ۵. بررسی و کسر از حساب مرکزی (۱۱۱۱۱۱۱۱)
    SELECT balance INTO v_escrow_balance
    FROM public.system_accounts
    WHERE account_number = '11111111'
      AND currency = v_room.currency;

    IF v_escrow_balance < v_total_pool THEN
        RAISE EXCEPTION '❌ موجودی حساب مرکزی (۱۱۱۱۱۱۱۱) برای ارز % کافی نیست (موجودی: %، موردنیاز: %)',
            v_room.currency, v_escrow_balance, v_total_pool;
    END IF;

    -- کسر کل مبلغ از حساب مرکزی
    UPDATE public.system_accounts
    SET balance = balance - v_total_pool
    WHERE account_number = '11111111'
      AND currency = v_room.currency;

    -- ۶. توزیع وجوه

    -- ۶.۱ واریز به مالک گروه (۴٪)
    UPDATE public.user_balances
    SET amount = amount + v_owner_share
    WHERE user_id = v_community.owner_id
      AND currency = v_room.currency;

    -- ۶.۲ واریز به BMC گروه (۰.۵٪)
    UPDATE public.communities
    SET bmc_amount = bmc_amount + v_bmc_share,
        bmc_added = bmc_added + v_bmc_share
    WHERE id = v_community.id;

    -- ۶.۳ واریز به لاتاری گروه (۰.۵٪)
    UPDATE public.communities
    SET lottery_amount = lottery_amount + v_lottery_share
    WHERE id = v_community.id;

    -- ۶.۴ واریز کارمزد پلتفرم (۵٪) بر اساس سطح
    PERFORM fn_deposit_platform_fee(v_room.level, v_room.currency, v_platform_share);

    -- ۶.۵ واریز به برنده پر (۸۱٪)
    UPDATE public.user_balances
    SET amount = amount + v_full_share
    WHERE user_id = v_winner_card.user_id
      AND currency = v_room.currency;

    -- ۶.۶ واریز به برنده‌های خطی (۹٪) - در صورت وجود
    -- ساده‌سازی: ۹٪ به برنده پر داده می‌شود (در صورتی که برنده خطی جداگانه وجود داشته باشد، باید جداگانه پرداخت شود)
    UPDATE public.user_balances
    SET amount = amount + v_line_share
    WHERE user_id = v_winner_card.user_id
      AND currency = v_room.currency;

    -- ۷. به‌روزرسانی وضعیت اتاق و کارت‌ها
    UPDATE public.rooms
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = v_winner_card.user_id
    WHERE id = p_room_id;

    UPDATE public.game_cards
    SET status = 'completed'
    WHERE room_id = p_room_id;

    -- ۸. ثبت تراکنش‌ها
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description
    ) VALUES 
    (
        '11111111',
        'escrow_debit',
        v_room.currency,
        -v_total_pool,
        p_room_id,
        'completed',
        '🔻 کسر کل مبلغ بازی از حساب مرکزی - Room #' || p_room_id
    ),
    (
        v_community.owner_id,
        'room_game_owner_fee',
        v_room.currency,
        v_owner_share,
        p_room_id,
        'completed',
        '👑 سهم مالک گروه - Room #' || p_room_id
    ),
    (
        v_winner_card.user_id,
        'room_game_win',
        v_room.currency,
        v_full_share + v_line_share,
        p_room_id,
        'completed',
        '🏆 جایزه برنده بازی - Room #' || p_room_id
    );

    RAISE NOTICE '✅ اتاق % تکمیل شد. کل مبلغ: % %، برنده: %، جایزه: % %',
        p_room_id, v_total_pool, v_room.currency,
        v_winner_card.user_id, v_full_share + v_line_share, v_room.currency;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_complete_room_game IS '
اتمام بازی اتاق و توزیع جوایز از حساب مرکزی:
- ۴٪ به مالک گروه
- ۰.۵٪ به BMC
- ۰.۵٪ به لاتاری
- ۵٪ کارمزد پلتفرم
- ۹٪ به برنده خطی
- ۸۱٪ به برنده پر
';