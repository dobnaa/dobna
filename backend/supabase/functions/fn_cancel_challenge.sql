-- لغو چالش منقضی‌شده (زیر ۵ نفر)
CREATE OR REPLACE FUNCTION fn_cancel_challenge(p_challenge_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
    v_participant RECORD;
BEGIN
    -- دریافت چالش
    SELECT * INTO v_challenge FROM public.challenges WHERE id = p_challenge_id;
    
    IF NOT FOUND OR v_challenge.status != 'waiting' THEN
        RAISE EXCEPTION 'چالش قابل لغو نیست';
    END IF;

    -- بازگرداندن مبلغ به همه شرکت‌کنندگان
    FOR v_participant IN 
        SELECT user_id FROM public.challenge_participants
        WHERE challenge_id = p_challenge_id
    LOOP
        PERFORM fn_refund_from_escrow(
            v_participant.user_id,
            v_challenge.currency,
            v_challenge.amount
        );
    END LOOP;
    
    -- به‌روزرسانی وضعیت
    UPDATE public.challenges
    SET status = 'cancelled', completed_at = NOW()
    WHERE id = p_challenge_id;
END;
$$ LANGUAGE plpgsql;