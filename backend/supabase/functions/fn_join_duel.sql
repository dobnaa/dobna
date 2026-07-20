-- پیوستن به دوئل
CREATE OR REPLACE FUNCTION fn_join_duel(p_duel_id BIGINT, p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
BEGIN
    SELECT * INTO v_duel FROM public.duels WHERE id = p_duel_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'دوئل پیدا نشد';
    END IF;

    IF v_duel.status != 'waiting' THEN
        RAISE EXCEPTION 'دوئل در حال انتظار نیست';
    END IF;

    IF NOW() > v_duel.expires_at THEN
        RAISE EXCEPTION 'زمان دوئل به پایان رسیده است';
    END IF;

    IF v_duel.duel_type = 'private' AND v_duel.opponent_id != p_user_id THEN
        RAISE EXCEPTION 'این دوئل خصوصی است';
    END IF;

    -- بررسی موجودی
    IF NOT fn_check_balance(p_user_id, v_duel.currency, v_duel.amount) THEN
        RAISE EXCEPTION 'موجودی کافی نیست';
    END IF;

    -- انتقال به حساب مرکزی
    PERFORM fn_transfer_to_escrow(p_user_id, v_duel.currency, v_duel.amount, 'duel_join');

    -- به‌روزرسانی دوئل
    UPDATE public.duels
    SET opponent_id = p_user_id,
        status = 'active',
        started_at = NOW()
    WHERE id = p_duel_id;

    -- تخصیص کارت به هر دو نفر
    PERFORM fn_assign_duel_cards(p_duel_id);
END;
$$ LANGUAGE plpgsql;