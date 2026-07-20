-- خرید کارت توسط کاربر در اتاق
CREATE OR REPLACE FUNCTION fn_purchase_card(
    p_room_id BIGINT,
    p_user_id UUID,
    p_card_number INTEGER
)
RETURNS VOID AS $$
DECLARE
    v_card_data RECORD;
    v_room RECORD;
BEGIN
    SELECT * INTO v_room FROM public.rooms WHERE id = p_room_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'اتاق پیدا نشد';
    END IF;

    -- بررسی تعداد کارت‌های کاربر در این اتاق (حداکثر ۶)
    IF (SELECT COUNT(*) FROM public.game_cards WHERE room_id = p_room_id AND user_id = p_user_id) >= 6 THEN
        RAISE EXCEPTION 'شما نمی‌توانید بیش از ۶ کارت خریداری کنید';
    END IF;

    -- بررسی موجودی
    IF NOT fn_check_balance(p_user_id, v_room.currency, v_room.card_price) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- دریافت داده‌های کارت
    SELECT row1, row2, row3 INTO v_card_data
    FROM public.dobna_cards
    WHERE card_number = p_card_number;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'کارت نامعتبر است';
    END IF;

    -- کسر مبلغ
    UPDATE public.user_balances
    SET amount = amount - v_room.card_price
    WHERE user_id = p_user_id AND currency = v_room.currency;

    -- درج کارت در اتاق
    INSERT INTO public.game_cards (room_id, user_id, card_number, row1, row2, row3)
    VALUES (p_room_id, p_user_id, p_card_number, v_card_data.row1, v_card_data.row2, v_card_data.row3);

    -- افزایش تعداد کارت‌ها
    UPDATE public.rooms
    SET total_cards = total_cards + 1
    WHERE id = p_room_id;

    -- اگر اتاق پر شد، بازی را شروع کن
    IF (SELECT total_cards FROM public.rooms WHERE id = p_room_id) >= 60 THEN
        PERFORM fn_start_room_game(p_room_id);
    END IF;
END;
$$ LANGUAGE plpgsql;