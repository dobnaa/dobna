-- ======================================================
-- fn_purchase_cards.sql
-- خرید هم‌زمان چند کارت (حداکثر ۶ کارت) در یک اتاق
-- با قفل‌گذاری، واریز به حساب GP گروه، و پشتیبانی از تخفیف امتیاز
--
-- جریان مالی:
-- - کسر مبلغ از حساب کاربر (user_balances)
-- - واریز به حساب GP گروه (communities.group_balance)
-- - کسر امتیاز در صورت استفاده (dobna_points_balance)
-- - ثبت تراکنش در transactions
-- - شروع خودکار بازی در صورت پر شدن اتاق (۶۰ کارت)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_purchase_cards(
    p_user_id UUID,
    p_room_id BIGINT,
    p_card_numbers INTEGER[],
    p_points_to_use INTEGER DEFAULT 0
)
RETURNS JSONB AS $$
DECLARE
    v_room RECORD;
    v_community RECORD;
    v_user_balance DECIMAL(20,8);
    v_total_price DECIMAL(20,8);
    v_fee DECIMAL(20,8);
    v_discount_percent INTEGER;
    v_discount_amount DECIMAL(20,8);
    v_final_fee DECIMAL(20,8);
    v_total_cost DECIMAL(20,8);
    v_card_number INTEGER;
    v_inserted_count INTEGER := 0;
    v_card_data RECORD;
    v_available_cards INTEGER[];
    v_points_balance INTEGER;
    v_card_count INTEGER;
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی ورودی‌ها
    -- ======================================================
    v_card_count := array_length(p_card_numbers, 1);

    IF v_card_count IS NULL OR v_card_count < 1 OR v_card_count > 6 THEN
        RETURN jsonb_build_object('success', false, 'error', 'INVALID_CARD_COUNT');
    END IF;

    IF (SELECT COUNT(DISTINCT unnest) FROM unnest(p_card_numbers)) <> v_card_count THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUPLICATE_CARD');
    END IF;

    -- ======================================================
    -- ۲. دریافت اطلاعات اتاق و گروه (با قفل)
    -- ======================================================
    SELECT * INTO v_room
    FROM public.rooms
    WHERE id = p_room_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'ROOM_NOT_FOUND');
    END IF;

    IF v_room.status != 'waiting' THEN
        RETURN jsonb_build_object('success', false, 'error', 'ROOM_NOT_WAITING');
    END IF;

    IF v_room.total_cards >= 60 THEN
        RETURN jsonb_build_object('success', false, 'error', 'ROOM_IS_FULL');
    END IF;

    -- بررسی اینکه کاربر بیش از ۶ کارت نداشته باشد
    IF (SELECT COUNT(*) FROM public.game_cards WHERE room_id = p_room_id AND user_id = p_user_id) >= 6 THEN
        RETURN jsonb_build_object('success', false, 'error', 'USER_MAX_CARDS');
    END IF;

    SELECT * INTO v_community
    FROM public.communities
    WHERE id = v_room.community_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'COMMUNITY_NOT_FOUND');
    END IF;

    -- ======================================================
    -- ۳. بررسی موجود بودن کارت‌ها (عدم تکراری در اتاق)
    -- ======================================================
    SELECT array_agg(card_number) INTO v_available_cards
    FROM public.game_cards
    WHERE room_id = p_room_id;

    FOREACH v_card_number IN ARRAY p_card_numbers
    LOOP
        IF v_card_number = ANY(v_available_cards) THEN
            RETURN jsonb_build_object('success', false, 'error', 'CARD_ALREADY_TAKEN', 'card', v_card_number);
        END IF;
    END LOOP;

    -- ======================================================
    -- ۴. محاسبه مبالغ
    -- ======================================================
    v_total_price := v_room.card_price * v_card_count;
    v_fee := v_total_price * 0.05; -- کارمزد ۵٪ (برای محاسبه تخفیف امتیاز)

    -- ======================================================
    -- ۵. بررسی موجودی کاربر و امتیاز
    -- ======================================================
    SELECT amount INTO v_user_balance
    FROM public.user_balances
    WHERE user_id = p_user_id AND currency = v_room.currency
    FOR UPDATE;

    IF v_user_balance IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'BALANCE_NOT_FOUND');
    END IF;

    -- محاسبه تخفیف امتیاز
    IF p_points_to_use > 0 THEN
        SELECT dobna_points_balance INTO v_points_balance
        FROM public.profiles
        WHERE id = p_user_id
        FOR UPDATE;

        IF v_points_balance < p_points_to_use THEN
            RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_POINTS');
        END IF;

        v_discount_percent := LEAST(p_points_to_use, 50);
        v_discount_amount := v_fee * (v_discount_percent / 100.0);
        v_final_fee := v_fee - v_discount_amount;
    ELSE
        v_final_fee := v_fee;
    END IF;

    v_total_cost := v_total_price + v_final_fee;

    IF v_user_balance < v_total_cost THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_BALANCE');
    END IF;

    -- ======================================================
    -- ۶. انجام تراکنش مالی (اتمیک)
    -- ======================================================
    -- کسر از کاربر
    UPDATE public.user_balances
    SET amount = amount - v_total_cost
    WHERE user_id = p_user_id AND currency = v_room.currency;

    -- ✅ واریز به حساب GP گروه (group_balance)
    UPDATE public.communities
    SET group_balance = group_balance + v_total_price
    WHERE id = v_community.id;

    -- کسر امتیاز (در صورت استفاده)
    IF p_points_to_use > 0 THEN
        UPDATE public.profiles
        SET dobna_points_balance = dobna_points_balance - p_points_to_use
        WHERE id = p_user_id;

        INSERT INTO public.dobna_points_ledger (user_id, amount, reason, reference_id, balance_after)
        VALUES (
            p_user_id,
            -p_points_to_use,
            'fee_discount_redeem',
            p_room_id::TEXT,
            (SELECT dobna_points_balance FROM public.profiles WHERE id = p_user_id)
        );
    END IF;

    -- ======================================================
    -- ۷. درج کارت‌ها در game_cards
    -- ======================================================
    FOREACH v_card_number IN ARRAY p_card_numbers
    LOOP
        SELECT row1, row2, row3 INTO v_card_data
        FROM public.dobna_cards
        WHERE card_number = v_card_number;

        IF NOT FOUND THEN
            -- در صورت خطا، تراکنش کامل Rollback می‌شود
            RAISE EXCEPTION 'CARD_NOT_FOUND: %', v_card_number;
        END IF;

        INSERT INTO public.game_cards (room_id, user_id, card_number, row1, row2, row3)
        VALUES (p_room_id, p_user_id, v_card_number, v_card_data.row1, v_card_data.row2, v_card_data.row3)
        ON CONFLICT (room_id, card_number) DO NOTHING;

        IF FOUND THEN
            v_inserted_count := v_inserted_count + 1;
        ELSE
            RAISE EXCEPTION 'CARD_CONFLICT: %', v_card_number;
        END IF;
    END LOOP;

    -- ======================================================
    -- ۸. به‌روزرسانی total_cards اتاق
    -- ======================================================
    UPDATE public.rooms
    SET total_cards = total_cards + v_inserted_count
    WHERE id = p_room_id;

    -- ======================================================
    -- ۹. ثبت تراکنش خرید
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status
    ) VALUES (
        p_user_id,
        'game_purchase',
        v_room.currency,
        -v_total_cost,
        p_room_id,
        'completed'
    );

    -- ======================================================
    -- ۱۰. بررسی پر شدن اتاق و شروع خودکار بازی
    -- ======================================================
    IF (SELECT total_cards FROM public.rooms WHERE id = p_room_id) >= 60 THEN
        PERFORM fn_start_room_game(p_room_id);
    END IF;

    -- ======================================================
    -- ۱۱. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'inserted', v_inserted_count,
        'total_price', v_total_price,
        'fee', v_final_fee,
        'points_used', p_points_to_use,
        'total_cost', v_total_cost,
        'room_status', (SELECT status FROM public.rooms WHERE id = p_room_id)
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'room_id', p_room_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_purchase_cards IS '
خرید هم‌زمان چند کارت (حداکثر ۶ کارت) در یک اتاق تالار گروه.

ورودی‌ها:
- p_user_id: شناسه کاربر
- p_room_id: شناسه اتاق
- p_card_numbers: آرایه‌ای از شماره کارت‌ها (۱ تا ۶۰)
- p_points_to_use: تعداد امتیاز برای تخفیف کارمزد (اختیاری)

خروجی: JSONB شامل اطلاعات خرید

جریان مالی:
- کسر از user_balances کاربر
- واریز به communities.group_balance (حساب GP گروه)

خطاهای احتمالی (کدهای ثابت برای ترجمه در فرانت‌اند):
- INVALID_CARD_COUNT: تعداد کارت‌ها نامعتبر است (باید ۱ تا ۶ باشد)
- DUPLICATE_CARD: کارت تکراری است
- ROOM_NOT_FOUND: اتاق یافت نشد
- ROOM_NOT_WAITING: اتاق در وضعیت waiting نیست
- ROOM_IS_FULL: اتاق پر شده است (۶۰ کارت)
- USER_MAX_CARDS: کاربر قبلاً ۶ کارت در این اتاق دارد
- CARD_ALREADY_TAKEN: کارت قبلاً توسط کاربر دیگری خریداری شده است
- BALANCE_NOT_FOUND: کاربر موجودی ندارد
- INSUFFICIENT_POINTS: موجودی امتیاز کافی نیست
- INSUFFICIENT_BALANCE: موجودی کاربر کافی نیست
- CARD_NOT_FOUND: شماره کارت نامعتبر است
- CARD_CONFLICT: تداخل در درج کارت
';