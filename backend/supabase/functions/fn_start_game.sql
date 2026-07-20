-- شروع بازی عمومی
CREATE OR REPLACE FUNCTION fn_start_game(p_room_id BIGINT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.rooms
    SET status = 'active', started_at = NOW()
    WHERE id = p_room_id AND status = 'waiting';
END;
$$ LANGUAGE plpgsql;