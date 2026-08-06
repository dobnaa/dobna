-- ======================================================
-- fn_start_room_game.sql
-- شروع بازی در یک اتاق تالار گروه
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_start_room_game(
    p_room_id BIGINT
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.rooms
    SET status = 'active',
        started_at = NOW()
    WHERE id = p_room_id AND status = 'waiting';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_start_room_game IS '
شروع بازی در یک اتاق تالار گروه (تغییر وضعیت به active).
ورودی‌ها:
- p_room_id: شناسه اتاق

این تابع توسط fn_purchase_cards (زمانی که ۶۰ کارت پر می‌شود) و fn_check_room_timer (زمانی که تایمر ۱۵۰ ثانیه تمام می‌شود) فراخوانی می‌شود.
';