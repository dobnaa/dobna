-- بررسی انقضای تایمر ۱۵۰ ثانیه و شروع خودکار بازی
CREATE OR REPLACE FUNCTION fn_check_room_timer(p_room_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_room RECORD;
BEGIN
    SELECT * INTO v_room FROM public.rooms WHERE id = p_room_id;
    
    IF v_room.status != 'waiting' THEN
        RETURN;
    END IF;
    
    -- اگر ۱۵۰ ثانیه از ایجاد اتاق گذشته باشد، بازی را شروع کن
    IF EXTRACT(EPOCH FROM (NOW() - v_room.created_at)) >= 150 THEN
        PERFORM fn_start_room_game(p_room_id);
    END IF;
END;
$$ LANGUAGE plpgsql;