-- ======================================================
-- fn_get_unlocked_challenge_levels.sql
-- محاسبه سطوح آزاد شده برای چالش بر اساس آخرین بازی کاربر
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_get_unlocked_challenge_levels(
    p_user_id UUID
)
RETURNS INTEGER[] AS $$
DECLARE
    v_max_level INTEGER := 0;
BEGIN
    -- پیدا کردن بالاترین سطحی که کاربر در ۶ ساعت گذشته در تالار گروه بازی کرده
    SELECT COALESCE(MAX(r.level), 0) INTO v_max_level
    FROM public.game_cards gc
    JOIN public.rooms r ON r.id = gc.room_id
    WHERE gc.user_id = p_user_id
      AND gc.created_at > NOW() - INTERVAL '6 hours'
      AND r.status = 'completed';

    -- اگر کاربر هیچ بازی در ۶ ساعت گذشته نداشته باشد، آرایه خالی برمی‌گرداند
    IF v_max_level = 0 THEN
        RETURN '{}';
    END IF;

    -- تولید لیست سطوح آزاد شده (از ۱ تا v_max_level)
    RETURN array_agg(i) FROM generate_series(1, v_max_level) i;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION public.fn_get_unlocked_challenge_levels IS '
محاسبه سطوح آزاد شده برای چالش بر اساس آخرین بازی کاربر در تالار گروه.
- اگر کاربر در ۶ ساعت گذشته سطح ۴ بازی کرده باشد → [1,2,3,4] برمی‌گرداند
- اگر سطح ۲ بازی کرده باشد → [1,2] برمی‌گرداند
- اگر هیچ بازی نکرده باشد → [] برمی‌گرداند
';