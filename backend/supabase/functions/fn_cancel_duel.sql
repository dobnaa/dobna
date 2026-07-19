-- لغو دوئل منقضی‌شده (پس از ۵ دقیقه)
CREATE OR REPLACE FUNCTION fn_cancel_duel(p_duel_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
BEGIN
    SELECT * INTO v_duel FROM public.duels WHERE id = p_duel_id;
    
    IF NOT FOUND OR v_duel.status != 'waiting' THEN
        RAISE EXCEPTION 'دوئل قابل لغو نیست';
    END IF;

    -- بازگرداندن مبلغ به سازنده
    PERFORM fn_refund_from_escrow(
        v_duel.creator_id,
        v_duel.currency,
        v_duel.amount
    );
    
    -- به‌روزرسانی وضعیت
    UPDATE public.duels
    SET status = 'cancelled', completed_at = NOW()
    WHERE id = p_duel_id;
END;
$$ LANGUAGE plpgsql;