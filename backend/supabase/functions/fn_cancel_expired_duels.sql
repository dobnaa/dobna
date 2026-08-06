-- ======================================================
-- fn_cancel_expired_duels.sql
-- لغو خودکار دوئل‌های منقضی‌شده (کرون‌جاب)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_cancel_expired_duels()
RETURNS JSONB AS $$
DECLARE
    v_duel RECORD;
    v_count INTEGER := 0;
    v_result JSONB;
BEGIN
    FOR v_duel IN 
        SELECT * FROM public.duels
        WHERE status = 'waiting' AND NOW() > expires_at
    LOOP
        v_result := fn_cancel_duel(v_duel.id);
        IF (v_result->>'success')::BOOLEAN THEN
            v_count := v_count + 1;
        END IF;
    END LOOP;

    RETURN jsonb_build_object(
        'success', true,
        'cancelled_count', v_count,
        'timestamp', NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;