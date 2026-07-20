-- شروع بازی در اتاق
CREATE OR REPLACE FUNCTION fn_start_room_game(p_room_id BIGINT)
RETURNS VOID AS $$
BEGIN
    PERFORM fn_start_game(p_room_id);
END;
$$ LANGUAGE plpgsql;