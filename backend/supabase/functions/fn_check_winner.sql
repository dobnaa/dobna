-- بررسی برنده در یک اتاق
CREATE OR REPLACE FUNCTION fn_check_winner(p_room_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
    called_nums INTEGER[];
    card_record RECORD;
    matched_count INTEGER;
BEGIN
    SELECT called_numbers INTO called_nums FROM public.rooms WHERE id = p_room_id;
    
    FOR card_record IN 
        SELECT id, row1, row2, row3 
        FROM public.game_cards 
        WHERE room_id = p_room_id AND status = 'active'
    LOOP
        SELECT COUNT(*) INTO matched_count
        FROM unnest(card_record.row1 || card_record.row2 || card_record.row3) AS num
        WHERE num != 0 AND num = ANY(called_nums);
        
        IF matched_count = 15 THEN
            RETURN card_record.id;
        END IF;
    END LOOP;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;