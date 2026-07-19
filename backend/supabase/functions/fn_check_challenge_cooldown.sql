-- بررسی کولدان ۶ ساعته برای چالش
CREATE OR REPLACE FUNCTION fn_check_challenge_cooldown(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_cooldown_until TIMESTAMPTZ;
BEGIN
    SELECT cooldown_until INTO v_cooldown_until
    FROM public.challenge_cooldowns
    WHERE user_id = p_user_id;
    
    IF v_cooldown_until IS NULL THEN
        RETURN TRUE; -- بدون محدودیت
    END IF;
    
    RETURN NOW() >= v_cooldown_until;
END;
$$ LANGUAGE plpgsql;