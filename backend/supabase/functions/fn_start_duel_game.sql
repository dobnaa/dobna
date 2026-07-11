-- شروع بازی دوئل
CREATE OR REPLACE FUNCTION fn_start_duel_game(p_duel_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_participants RECORD;
    v_card_data RECORD;
    v_room_id BIGINT;
BEGIN
    -- ایجاد اتاق بازی جدید
    INSERT INTO rooms (duel_id, status, created_at)
    VALUES (p_duel_id, 'active', NOW())
    RETURNING id INTO v_room_id;

    -- تخصیص کارت‌ها به شرکت‌کنندگان
    FOR v_participants IN 
        SELECT user_id, card_number 
        FROM duel_participants 
        WHERE duel_id = p_duel_id
    LOOP
        -- دریافت داده‌های کارت از جدول dobna_cards
        SELECT * INTO v_card_data
        FROM dobna_cards
        WHERE card_number = v_participants.card_number;
        
        -- ایجاد کارت بازی برای کاربر
        INSERT INTO game_cards (
            room_id,
            user_id,
            card_number,
            row1, row2, row3,
            status
        ) VALUES (
            v_room_id,
            v_participants.user_id,
            v_participants.card_number,
            v_card_data.row1,
            v_card_data.row2,
            v_card_data.row3,
            'active'
        );
    END LOOP;

    -- به‌روزرسانی وضعیت دوئل
    UPDATE duels
    SET status = 'active',
        started_at = NOW()
    WHERE id = p_duel_id;

    -- شروع بازی (فراخوانی تابع شروع بازی)
    PERFORM fn_start_game(v_room_id);
END;
$$ LANGUAGE plpgsql;