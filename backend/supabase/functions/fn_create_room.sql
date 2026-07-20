-- ایجاد دوئل جدید
CREATE OR REPLACE FUNCTION fn_create_duel(
    p_creator_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_level INTEGER,
    p_type VARCHAR(20),
    p_opponent_id UUID DEFAULT NULL,
    p_community_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_duel_id BIGINT;
BEGIN
    -- بررسی موجودی
    IF NOT fn_check_balance(p_creator_id, p_currency, p_amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_creator_id, p_currency, p_amount, 'duel_create');

    -- ایجاد دوئل
    INSERT INTO public.duels (
        duel_id, creator_id, opponent_id, community_id, currency, amount,
        level, duel_type, expires_at, status
    ) VALUES (
        'DUL-' || LPAD(nextval('seq_duel_id')::TEXT, 6, '0'),
        p_creator_id,
        p_opponent_id,
        p_community_id,
        p_currency,
        p_amount,
        p_level,
        p_type,
        NOW() + INTERVAL '5 minutes',
        'waiting'
    ) RETURNING id INTO v_duel_id;

    -- اگر دوئل خصوصی با حریف مشخص است، به او نوتیفیکیشن بده
    IF p_type = 'private' AND p_opponent_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, type, content, related_id)
        VALUES (
            p_opponent_id,
            'duel_request',
            'درخواست دوئل از شما',
            v_duel_id
        );
    END IF;

    RETURN v_duel_id;
END;
$$ LANGUAGE plpgsql;