-- ایجاد چالش جدید
CREATE OR REPLACE FUNCTION fn_create_challenge(
    p_creator_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER
)
RETURNS BIGINT AS $$
DECLARE
    v_challenge_id BIGINT;
BEGIN
    -- بررسی کولدان
    IF NOT fn_check_challenge_cooldown(p_creator_id) THEN
        RAISE EXCEPTION 'شما هنوز در دوره انتظار ۶ ساعته هستید';
    END IF;

    -- بررسی موجودی
    IF NOT fn_check_balance(p_creator_id, p_currency, p_amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_creator_id, p_currency, p_amount, 'challenge_create');

    -- ایجاد چالش
    INSERT INTO public.challenges (
        challenge_id, creator_id, currency, amount, level,
        expires_at, current_participants
    ) VALUES (
        'CHL-' || LPAD(nextval('seq_challenge_id')::TEXT, 6, '0'),
        p_creator_id,
        p_currency,
        p_amount,
        p_level,
        NOW() + INTERVAL '20 minutes',
        1
    ) RETURNING id INTO v_challenge_id;

    -- به‌روزرسانی کولدان
    INSERT INTO public.challenge_cooldowns (user_id, last_challenge_at, cooldown_until)
    VALUES (p_creator_id, NOW(), NOW() + INTERVAL '6 hours')
    ON CONFLICT (user_id)
    DO UPDATE SET last_challenge_at = NOW(), cooldown_until = NOW() + INTERVAL '6 hours';

    -- تخصیص کارت به سازنده
    PERFORM fn_assign_challenge_card(v_challenge_id, p_creator_id);

    RETURN v_challenge_id;
END;
$$ LANGUAGE plpgsql;