-- شروع چالش
CREATE OR REPLACE FUNCTION fn_start_challenge(p_challenge_id BIGINT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.challenges
    SET status = 'active', started_at = NOW()
    WHERE id = p_challenge_id AND status = 'waiting';
END;
$$ LANGUAGE plpgsql;