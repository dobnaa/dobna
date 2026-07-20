-- پیوستن به چالش
CREATE OR REPLACE FUNCTION fn_join_challenge(p_challenge_id BIGINT, p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
BEGIN
    SELECT * INTO v_challenge FROM public.challenges WHERE id = p_challenge_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'چالش پیدا نشد';
    END IF;

    IF v_challenge.status != 'waiting' THEN
        RAISE EXCEPTION 'چالش فعال نیست';
    END IF;

    IF NOW() > v_challenge.expires_at THEN
        RAISE EXCEPTION 'زمان چالش به پایان رسیده است';
    END IF;

    IF v_challenge.current_participants >= v_challenge.max_participants THEN
        RAISE EXCEPTION 'چالش پر شده است';
    END IF;

    -- بررسی موجودی
    IF NOT fn_check_balance(p_user_id, v_challenge.currency, v_challenge.amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_user_id, v_challenge.currency, v_challenge.amount, 'challenge_join');

    -- افزایش تعداد شرکت‌کنندگان
    UPDATE public.challenges
    SET current_participants = current_participants + 1
    WHERE id = p_challenge_id;

    -- تخصیص کارت رندوم
    PERFORM fn_assign_challenge_card(p_challenge_id, p_user_id);

    -- اگر به ۱۰۰ نفر رسید، چالش را شروع کن
    IF (SELECT current_participants FROM public.challenges WHERE id = p_challenge_id) >= 100 THEN
        PERFORM fn_start_challenge(p_challenge_id);
    END IF;
END;
$$ LANGUAGE plpgsql;