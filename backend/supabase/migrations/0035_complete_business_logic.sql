-- ======================================================
-- 0035_complete_business_logic.sql
-- کلیه توابع تکمیلی برای تالار گروه، دوئل، چالش، چت، کیف پول، و سیستم
-- ======================================================

-- ======================================================
-- ۱. توابع تالار گروه (اتاق‌ها)
-- ======================================================

-- 1.1 خرید کارت توسط کاربر
CREATE OR REPLACE FUNCTION fn_purchase_card(
    p_room_id BIGINT,
    p_user_id UUID,
    p_card_number INTEGER
)
RETURNS VOID AS $$
DECLARE
    v_card_data RECORD;
    v_room RECORD;
    v_user_balance DECIMAL(20,8);
BEGIN
    -- دریافت اطلاعات اتاق
    SELECT * INTO v_room FROM public.rooms WHERE id = p_room_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'اتاق پیدا نشد';
    END IF;

    -- بررسی موجودی کاربر
    SELECT amount INTO v_user_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = v_room.currency;
    
    IF v_user_balance < v_room.card_price THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- دریافت داده‌های کارت
    SELECT row1, row2, row3 INTO v_card_data
    FROM public.dobna_cards
    WHERE card_number = p_card_number;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'کارت نامعتبر است';
    END IF;

    -- کسر مبلغ از کاربر
    UPDATE public.user_balances
    SET amount = amount - v_room.card_price
    WHERE user_id = p_user_id AND currency = v_room.currency;

    -- واریز مبلغ به حساب گروه (GP)
    UPDATE public.communities
    SET bmc_amount = bmc_amount + v_room.card_price
    WHERE id = v_room.community_id;

    -- درج کارت در اتاق
    INSERT INTO public.game_cards (room_id, user_id, card_number, row1, row2, row3)
    VALUES (p_room_id, p_user_id, p_card_number, v_card_data.row1, v_card_data.row2, v_card_data.row3);

    -- افزایش تعداد کارت‌های اتاق
    UPDATE public.rooms
    SET total_cards = total_cards + 1
    WHERE id = p_room_id;

    -- اگر اتاق پر شد (۶۰ کارت)، بازی را شروع کن
    IF (SELECT total_cards FROM public.rooms WHERE id = p_room_id) >= 60 THEN
        PERFORM fn_start_room_game(p_room_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 1.2 شروع بازی در اتاق
CREATE OR REPLACE FUNCTION fn_start_room_game(p_room_id BIGINT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.rooms
    SET status = 'active', started_at = NOW()
    WHERE id = p_room_id AND status = 'waiting';
    
    -- در صورت نیاز، تایمر ۱۵۰ ثانیه را شروع کنید (در کلاینت مدیریت می‌شود)
END;
$$ LANGUAGE plpgsql;

-- 1.3 اتمام بازی اتاق و توزیع جوایز
CREATE OR REPLACE FUNCTION fn_complete_room_game(p_room_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_room RECORD;
    v_winner_card RECORD;
    v_total_pool DECIMAL(20,8);
    v_owner_share DECIMAL(20,8);
    v_bmc_share DECIMAL(20,8);
    v_lottery_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_line_share DECIMAL(20,8);
    v_full_share DECIMAL(20,8);
    v_community RECORD;
    v_line_winners RECORD;
BEGIN
    -- دریافت اطلاعات اتاق
    SELECT * INTO v_room FROM public.rooms WHERE id = p_room_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'اتاق پیدا نشد';
    END IF;

    -- دریافت کارت برنده (پر)
    SELECT * INTO v_winner_card
    FROM public.game_cards
    WHERE room_id = p_room_id AND status = 'active'
    ORDER BY id LIMIT 1; -- ساده‌سازی: اولین کارت برنده

    -- محاسبه کل مبلغ (قیمت هر کارت × تعداد کارت‌ها)
    v_total_pool := v_room.card_price * v_room.total_cards;

    -- محاسبه سهم‌ها
    v_owner_share := v_total_pool * 0.04;      -- ۴٪ مالک
    v_bmc_share := v_total_pool * 0.005;       -- ۰.۵٪ BMC
    v_lottery_share := v_total_pool * 0.005;   -- ۰.۵٪ لاتاری
    v_platform_share := v_total_pool * 0.05;   -- ۵٪ پلتفرم
    v_line_share := v_total_pool * 0.09;       -- ۹٪ برندگان خطی
    v_full_share := v_total_pool * 0.81;       -- ۸۱٪ برنده پر

    -- دریافت اطلاعات جامعه (گروه)
    SELECT * INTO v_community
    FROM public.communities
    WHERE id = v_room.community_id;

    -- واریز به مالک گروه
    UPDATE public.user_balances
    SET amount = amount + v_owner_share
    WHERE user_id = v_community.owner_id AND currency = v_room.currency;

    -- واریز به BMC گروه
    UPDATE public.communities
    SET bmc_amount = bmc_amount + v_bmc_share,
        bmc_added = bmc_added + v_bmc_share
    WHERE id = v_community.id;

    -- واریز به لاتاری گروه
    UPDATE public.communities
    SET lottery_amount = lottery_amount + v_lottery_share
    WHERE id = v_community.id;

    -- واریز کارمزد پلتفرم (بر اساس سطح)
    PERFORM fn_deposit_platform_fee(v_room.level, v_room.currency, v_platform_share);

    -- واریز به برنده‌های خطی (۹٪) و برنده پر (۸۱٪)
    IF v_winner_card IS NOT NULL THEN
        -- واریز ۸۱٪ به برنده پر
        UPDATE public.user_balances
        SET amount = amount + v_full_share
        WHERE user_id = v_winner_card.user_id AND currency = v_room.currency;

        -- واریز ۹٪ به برندگان خطی (ساده‌سازی: همه به برنده پر داده شود)
        UPDATE public.user_balances
        SET amount = amount + v_line_share
        WHERE user_id = v_winner_card.user_id AND currency = v_room.currency;
    END IF;

    -- بروزرسانی وضعیت اتاق
    UPDATE public.rooms
    SET status = 'completed', completed_at = NOW(),
        winner_id = v_winner_card.user_id
    WHERE id = p_room_id;

    -- بروزرسانی کارت برنده
    UPDATE public.game_cards
    SET is_winner = TRUE
    WHERE room_id = p_room_id AND user_id = v_winner_card.user_id;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- ۲. توابع دوئل (تایمر ۵ دقیقه)
-- ======================================================

-- 2.1 ایجاد دوئل
CREATE OR REPLACE FUNCTION fn_create_duel(
    p_creator_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER,
    p_type VARCHAR(20),
    p_opponent_id UUID DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_duel_id BIGINT;
BEGIN
    -- بررسی موجودی سازنده
    IF NOT fn_check_balance(p_creator_id, p_currency, p_amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- کسر مبلغ و انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_creator_id, p_currency, p_amount, 'duel_create');

    -- ایجاد دوئل
    INSERT INTO public.duels (
        duel_id, creator_id, opponent_id, currency, amount, level, duel_type,
        expires_at, status
    ) VALUES (
        'DUL-' || LPAD(nextval('seq_duel_id')::TEXT, 6, '0'),
        p_creator_id,
        p_opponent_id,
        p_currency,
        p_amount,
        p_level,
        p_type,
        NOW() + INTERVAL '5 minutes',
        'waiting'
    ) RETURNING id INTO v_duel_id;

    RETURN v_duel_id;
END;
$$ LANGUAGE plpgsql;

-- 2.2 پیوستن به دوئل
CREATE OR REPLACE FUNCTION fn_join_duel(p_duel_id BIGINT, p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
BEGIN
    -- دریافت اطلاعات دوئل
    SELECT * INTO v_duel FROM public.duels WHERE id = p_duel_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'دوئل پیدا نشد';
    END IF;

    IF v_duel.status != 'waiting' THEN
        RAISE EXCEPTION 'دوئل در حال انتظار نیست';
    END IF;

    IF NOW() > v_duel.expires_at THEN
        RAISE EXCEPTION 'زمان دوئل به پایان رسیده است';
    END IF;

    -- بررسی موجودی کاربر
    IF NOT fn_check_balance(p_user_id, v_duel.currency, v_duel.amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- کسر مبلغ و انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_user_id, v_duel.currency, v_duel.amount, 'duel_join');

    -- به‌روزرسانی دوئل
    UPDATE public.duels
    SET opponent_id = p_user_id,
        status = 'active',
        started_at = NOW()
    WHERE id = p_duel_id;

    -- تخصیص کارت به هر دو نفر (۱ تا ۳۰)
    PERFORM fn_assign_duel_cards(p_duel_id);
END;
$$ LANGUAGE plpgsql;

-- 2.3 تخصیص کارت دوئل
CREATE OR REPLACE FUNCTION fn_assign_duel_cards(p_duel_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
    v_card1 INTEGER;
    v_card2 INTEGER;
    v_card_data RECORD;
BEGIN
    -- دریافت دوئل
    SELECT * INTO v_duel FROM public.duels WHERE id = p_duel_id;

    -- انتخاب دو کارت رندوم از ۱ تا ۳۰
    v_card1 := floor(random() * 30 + 1)::INT;
    v_card2 := floor(random() * 30 + 1)::INT;
    
    -- اطمینان از متفاوت بودن کارت‌ها
    WHILE v_card1 = v_card2 LOOP
        v_card2 := floor(random() * 30 + 1)::INT;
    END LOOP;

    -- دریافت داده‌های کارت‌ها
    SELECT row1, row2, row3 INTO v_card_data
    FROM public.dobna_cards WHERE card_number = v_card1;
    
    INSERT INTO public.duel_participants (duel_id, user_id, card_number, row1, row2, row3)
    VALUES (p_duel_id, v_duel.creator_id, v_card1, v_card_data.row1, v_card_data.row2, v_card_data.row3);

    SELECT row1, row2, row3 INTO v_card_data
    FROM public.dobna_cards WHERE card_number = v_card2;
    
    INSERT INTO public.duel_participants (duel_id, user_id, card_number, row1, row2, row3)
    VALUES (p_duel_id, v_duel.opponent_id, v_card2, v_card_data.row1, v_card_data.row2, v_card_data.row3);
END;
$$ LANGUAGE plpgsql;

-- 2.4 اتمام دوئل و توزیع جایزه
CREATE OR REPLACE FUNCTION fn_complete_duel(p_duel_id BIGINT, p_winner_id UUID)
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
    v_total_amount DECIMAL(20,8);
    v_fee DECIMAL(20,8);
    v_winner_amount DECIMAL(20,8);
BEGIN
    -- دریافت دوئل
    SELECT * INTO v_duel FROM public.duels WHERE id = p_duel_id;
    
    v_total_amount := v_duel.amount * 2; -- مبلغ دو نفر
    v_fee := v_total_amount * 0.05; -- ۵٪ کارمزد
    v_winner_amount := v_total_amount - v_fee;

    -- واریز کارمزد به حساب ۰۰۰۰۰۰۰۵
    PERFORM fn_deposit_fee('00000005', v_duel.currency, v_fee);

    -- واریز جایزه به برنده
    UPDATE public.user_balances
    SET amount = amount + v_winner_amount
    WHERE user_id = p_winner_id AND currency = v_duel.currency;

    -- به‌روزرسانی وضعیت دوئل
    UPDATE public.duels
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = p_winner_id,
        fee = v_fee
    WHERE id = p_duel_id;
END;
$$ LANGUAGE plpgsql;

-- 2.5 لغو دوئل منقضی‌شده (Cron Job)
CREATE OR REPLACE FUNCTION fn_cancel_expired_duels()
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
BEGIN
    FOR v_duel IN 
        SELECT * FROM public.duels
        WHERE status = 'waiting' AND NOW() > expires_at
    LOOP
        -- بازگرداندن مبلغ به سازنده
        PERFORM fn_refund_from_escrow(v_duel.creator_id, v_duel.currency, v_duel.amount);
        
        -- به‌روزرسانی وضعیت
        UPDATE public.duels
        SET status = 'cancelled'
        WHERE id = v_duel.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- ۳. توابع چالش (تایمر ۲۰ دقیقه، کولدان ۶ ساعت)
-- ======================================================

-- 3.1 ایجاد چالش
CREATE OR REPLACE FUNCTION fn_create_challenge(
    p_creator_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER
)
RETURNS BIGINT AS $$
DECLARE
    v_challenge_id BIGINT;
    v_cooldown RECORD;
BEGIN
    -- بررسی کولدان ۶ ساعته
    SELECT * INTO v_cooldown
    FROM public.challenge_cooldowns
    WHERE user_id = p_creator_id;
    
    IF v_cooldown IS NOT NULL AND NOW() < v_cooldown.cooldown_until THEN
        RAISE EXCEPTION 'شما تا % دیگر نمی‌توانید چالش بسازید', v_cooldown.cooldown_until;
    END IF;

    -- بررسی موجودی
    IF NOT fn_check_balance(p_creator_id, p_currency, p_amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- کسر مبلغ و انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_creator_id, p_currency, p_amount, 'challenge_create');

    -- ایجاد چالش
    INSERT INTO public.challenges (
        challenge_id, creator_id, currency, amount, level,
        expires_at, current_participants
    ) VALUES (
        'CHL-' || LPAD(nextval('seq_challenge_id')::TEXT, 6, '0'),
        p_creator_id,
        p_currency,
        p_amount,
        p_level,
        NOW() + INTERVAL '20 minutes',
        1
    ) RETURNING id INTO v_challenge_id;

    -- به‌روزرسانی کولدان
    INSERT INTO public.challenge_cooldowns (user_id, last_challenge_at, cooldown_until)
    VALUES (p_creator_id, NOW(), NOW() + INTERVAL '6 hours')
    ON CONFLICT (user_id)
    DO UPDATE SET last_challenge_at = NOW(), cooldown_until = NOW() + INTERVAL '6 hours';

    -- تخصیص کارت به سازنده (رندوم از ۱ تا ۱۰۰)
    PERFORM fn_assign_challenge_card(v_challenge_id, p_creator_id);

    RETURN v_challenge_id;
END;
$$ LANGUAGE plpgsql;

-- 3.2 پیوستن به چالش
CREATE OR REPLACE FUNCTION fn_join_challenge(p_challenge_id BIGINT, p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
BEGIN
    -- دریافت چالش
    SELECT * INTO v_challenge FROM public.challenges WHERE id = p_challenge_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'چالش پیدا نشد';
    END IF;

    IF v_challenge.status != 'waiting' THEN
        RAISE EXCEPTION 'چالش فعال نیست';
    END IF;

    IF NOW() > v_challenge.expires_at THEN
        RAISE EXCEPTION 'زمان چالش به پایان رسیده است';
    END IF;

    IF v_challenge.current_participants >= v_challenge.max_participants THEN
        RAISE EXCEPTION 'چالش پر شده است';
    END IF;

    -- بررسی موجودی
    IF NOT fn_check_balance(p_user_id, v_challenge.currency, v_challenge.amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- کسر مبلغ و انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_user_id, v_challenge.currency, v_challenge.amount, 'challenge_join');

    -- افزایش تعداد شرکت‌کنندگان
    UPDATE public.challenges
    SET current_participants = current_participants + 1
    WHERE id = p_challenge_id;

    -- تخصیص کارت رندوم
    PERFORM fn_assign_challenge_card(p_challenge_id, p_user_id);

    -- اگر به ۱۰۰ نفر رسید، چالش را شروع کن
    IF (SELECT current_participants FROM public.challenges WHERE id = p_challenge_id) >= 100 THEN
        PERFORM fn_start_challenge(p_challenge_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 3.3 تخصیص کارت چالش (رندوم از ۱ تا ۱۰۰)
CREATE OR REPLACE FUNCTION fn_assign_challenge_card(p_challenge_id BIGINT, p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_card_number INTEGER;
    v_card_data RECORD;
    v_used_cards INTEGER[];
BEGIN
    -- دریافت کارت‌های استفاده‌شده
    SELECT array_agg(card_number) INTO v_used_cards
    FROM public.challenge_participants
    WHERE challenge_id = p_challenge_id;

    -- پیدا کردن کارت جدید
    LOOP
        v_card_number := floor(random() * 100 + 1)::INT;
        EXIT WHEN NOT (v_card_number = ANY(v_used_cards));
    END LOOP;

    -- دریافت داده‌های کارت
    SELECT row1, row2, row3 INTO v_card_data
    FROM public.dobna_cards WHERE card_number = v_card_number;

    INSERT INTO public.challenge_participants (challenge_id, user_id, card_number)
    VALUES (p_challenge_id, p_user_id, v_card_number);
END;
$$ LANGUAGE plpgsql;

-- 3.4 شروع چالش
CREATE OR REPLACE FUNCTION fn_start_challenge(p_challenge_id BIGINT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.challenges
    SET status = 'active', started_at = NOW()
    WHERE id = p_challenge_id AND status = 'waiting';
END;
$$ LANGUAGE plpgsql;

-- 3.5 اتمام چالش و توزیع جوایز
CREATE OR REPLACE FUNCTION fn_complete_challenge(p_challenge_id BIGINT, p_winner_id UUID)
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
    v_total_pool DECIMAL(20,8);
    v_creator_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_winner_share DECIMAL(20,8);
BEGIN
    -- دریافت چالش
    SELECT * INTO v_challenge FROM public.challenges WHERE id = p_challenge_id;

    v_total_pool := v_challenge.amount * v_challenge.current_participants;
    v_creator_share := v_total_pool * 0.20; -- ۲۰٪ سازنده
    v_platform_share := v_total_pool * 0.05; -- ۵٪ پلتفرم
    v_winner_share := v_total_pool - v_creator_share - v_platform_share; -- ۷۵٪ برنده

    -- واریز به سازنده
    UPDATE public.user_balances
    SET amount = amount + v_creator_share
    WHERE user_id = v_challenge.creator_id AND currency = v_challenge.currency;

    -- واریز کارمزد پلتفرم به حساب ۰۰۰۰۰۰۰۶
    PERFORM fn_deposit_fee('00000006', v_challenge.currency, v_platform_share);

    -- واریز به برنده
    UPDATE public.user_balances
    SET amount = amount + v_winner_share
    WHERE user_id = p_winner_id AND currency = v_challenge.currency;

    -- به‌روزرسانی چالش
    UPDATE public.challenges
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = p_winner_id,
        total_pool = v_total_pool,
        creator_fee = v_creator_share,
        platform_fee = v_platform_share
    WHERE id = p_challenge_id;
END;
$$ LANGUAGE plpgsql;

-- 3.6 لغو چالش منقضی‌شده (زیر ۵ نفر)
CREATE OR REPLACE FUNCTION fn_cancel_expired_challenges()
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
    v_participant RECORD;
BEGIN
    FOR v_challenge IN 
        SELECT * FROM public.challenges
        WHERE status = 'waiting' AND NOW() > expires_at
    LOOP
        IF v_challenge.current_participants < v_challenge.min_participants THEN
            -- بازگرداندن مبلغ به همه شرکت‌کنندگان
            FOR v_participant IN 
                SELECT user_id FROM public.challenge_participants
                WHERE challenge_id = v_challenge.id
            LOOP
                PERFORM fn_refund_from_escrow(
                    v_participant.user_id,
                    v_challenge.currency,
                    v_challenge.amount
                );
            END LOOP;
            
            -- به‌روزرسانی وضعیت
            UPDATE public.challenges
            SET status = 'cancelled'
            WHERE id = v_challenge.id;
        ELSE
            -- اگر حداقل ۵ نفر بود، چالش را شروع کن
            PERFORM fn_start_challenge(v_challenge.id);
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- ۴. توابع کیف پول، حساب مرکزی و کارمزدها
-- ======================================================

-- 4.1 بررسی موجودی کاربر
CREATE OR REPLACE FUNCTION fn_check_balance(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS BOOLEAN AS $$
DECLARE
    v_balance DECIMAL(20,8);
BEGIN
    SELECT amount INTO v_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = p_currency;
    
    RETURN v_balance >= p_amount;
END;
$$ LANGUAGE plpgsql;

-- 4.2 انتقال به حساب مرکزی (Escrow)
CREATE OR REPLACE FUNCTION fn_transfer_to_escrow(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_reference TEXT
)
RETURNS VOID AS $$
BEGIN
    -- کسر از کاربر
    UPDATE public.user_balances
    SET amount = amount - p_amount
    WHERE user_id = p_user_id AND currency = p_currency;

    -- واریز به حساب مرکزی (سیستمی)
    UPDATE public.system_accounts
    SET balance = balance + p_amount
    WHERE account_number = '11111111' AND currency = p_currency;
END;
$$ LANGUAGE plpgsql;

-- 4.3 بازگرداندن از حساب مرکزی (Refund)
CREATE OR REPLACE FUNCTION fn_refund_from_escrow(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS VOID AS $$
BEGIN
    -- کسر از حساب مرکزی
    UPDATE public.system_accounts
    SET balance = balance - p_amount
    WHERE account_number = '11111111' AND currency = p_currency;

    -- واریز به کاربر
    UPDATE public.user_balances
    SET amount = amount + p_amount
    WHERE user_id = p_user_id AND currency = p_currency;
END;
$$ LANGUAGE plpgsql;

-- 4.4 واریز کارمزد به حساب‌های سیستمی
CREATE OR REPLACE FUNCTION fn_deposit_fee(
    p_account VARCHAR(20),
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.system_accounts
    SET balance = balance + p_amount
    WHERE account_number = p_account AND currency = p_currency;
END;
$$ LANGUAGE plpgsql;

-- 4.5 واریز کارمزد بر اساس سطح تالار
CREATE OR REPLACE FUNCTION fn_deposit_platform_fee(
    p_level INTEGER,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS VOID AS $$
DECLARE
    v_account VARCHAR(20);
BEGIN
    CASE p_level
        WHEN 1 THEN v_account := '00000001';
        WHEN 2 THEN v_account := '00000002';
        WHEN 3 THEN v_account := '00000003';
        WHEN 4 THEN v_account := '00000004';
        ELSE RAISE EXCEPTION 'سطح نامعتبر است';
    END CASE;
    
    PERFORM fn_deposit_fee(v_account, p_currency, p_amount);
END;
$$ LANGUAGE plpgsql;

-- 4.6 محاسبه سود روزانه (۱۰٪ سالانه) - Cron Job
CREATE OR REPLACE FUNCTION fn_calculate_daily_interest()
RETURNS VOID AS $$
DECLARE
    v_user RECORD;
    v_interest DECIMAL(20,8);
BEGIN
    FOR v_user IN 
        SELECT user_id, total_balance_usd 
        FROM public.wallets
        WHERE total_balance_usd > 0
    LOOP
        -- سود روزانه = (ارزش کل × ۰.۱۰) / ۳۶۵
        v_interest := (v_user.total_balance_usd * 0.10) / 365;
        
        -- به‌روزرسانی سود انباشته
        UPDATE public.wallets
        SET interest_accrued = interest_accrued + v_interest,
            daily_interest = daily_interest + v_interest
        WHERE user_id = v_user.user_id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4.7 پرداخت پاداش دعوت (Referral)
CREATE OR REPLACE FUNCTION fn_process_referral_reward(
    p_invitee_id UUID,
    p_amount DECIMAL(20,8),
    p_currency VARCHAR(10)
)
RETURNS VOID AS $$
DECLARE
    v_inviter_id UUID;
    v_reward DECIMAL(20,8);
BEGIN
    -- دریافت دعوت‌کننده
    SELECT referred_by INTO v_inviter_id
    FROM public.profiles
    WHERE id = p_invitee_id;

    IF v_inviter_id IS NOT NULL THEN
        -- پاداش ۱۰٪ از مبلغ
        v_reward := p_amount * 0.10;
        
        -- به‌روزرسانی موجودی دعوت‌کننده
        UPDATE public.user_balances
        SET amount = amount + v_reward
        WHERE user_id = v_inviter_id AND currency = p_currency;
        
        -- به‌روزرسانی آمار دعوت‌ها
        UPDATE public.profiles
        SET total_referrals = total_referrals + 1,
            total_commission = total_commission + v_reward
        WHERE id = v_inviter_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- ۵. توابع چت و شبکه اجتماعی
-- ======================================================

-- 5.1 ارسال پیام
CREATE OR REPLACE FUNCTION fn_send_message(
    p_sender_id UUID,
    p_receiver_id UUID DEFAULT NULL,
    p_community_id BIGINT DEFAULT NULL,
    p_content TEXT
)
RETURNS BIGINT AS $$
DECLARE
    v_message_id BIGINT;
BEGIN
    INSERT INTO public.chat_messages (
        sender_id, receiver_id, community_id, content, created_at
    ) VALUES (
        p_sender_id, p_receiver_id, p_community_id, p_content, NOW()
    ) RETURNING id INTO v_message_id;

    -- ایجاد نوتیفیکیشن برای گیرنده (اگر خصوصی باشد)
    IF p_receiver_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, type, content, related_id)
        VALUES (
            p_receiver_id,
            'new_message',
            'پیام جدید از شما',
            v_message_id
        );
    END IF;

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql;

-- 5.2 دنبال کردن کاربر
CREATE OR REPLACE FUNCTION fn_follow_user(
    p_follower_id UUID,
    p_following_id UUID
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.followers (follower_id, following_id)
    VALUES (p_follower_id, p_following_id)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 5.3 لغو دنبال کردن
CREATE OR REPLACE FUNCTION fn_unfollow_user(
    p_follower_id UUID,
    p_following_id UUID
)
RETURNS VOID AS $$
BEGIN
    DELETE FROM public.followers
    WHERE follower_id = p_follower_id AND following_id = p_following_id;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- ۶. توابع سیستمی و ابزارها
-- ======================================================

-- 6.1 تولید شماره حساب ۸ رقمی
CREATE OR REPLACE FUNCTION fn_generate_account_number()
RETURNS VARCHAR(8) AS $$
DECLARE
    v_last_number BIGINT;
    v_new_number VARCHAR(8);
BEGIN
    SELECT COALESCE(MAX(CAST(account_number AS BIGINT)), 0) INTO v_last_number
    FROM public.profiles;
    
    v_new_number := LPAD((v_last_number + 1)::TEXT, 8, '0');
    RETURN v_new_number;
END;
$$ LANGUAGE plpgsql;

-- 6.2 غیرفعال کردن کاربر (توسط پشتیبانی)
CREATE OR REPLACE FUNCTION fn_deactivate_user(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET is_active = FALSE
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- ۷. اجرای خودکار توابع منقضی‌شده (توصیه برای Cron Job)
-- ======================================================
-- این توابع باید هر دقیقه توسط یک Cron Job (Edge Function) اجرا شوند
-- SELECT fn_cancel_expired_duels();
-- SELECT fn_cancel_expired_challenges();
-- SELECT fn_calculate_daily_interest(); -- هر روز ساعت ۰۰:۰۰