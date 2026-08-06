-- ======================================================
-- fn_cancel_duel.sql
-- لغو دوئل منقضی‌شده و بازگشت وجه
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_cancel_duel(p_duel_id BIGINT)
RETURNS JSONB AS $$
DECLARE
    v_duel RECORD;
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات دوئل با قفل
    -- ======================================================
    SELECT * INTO v_duel
    FROM public.duels
    WHERE id = p_duel_id
    FOR UPDATE;

    IF NOT FOUND OR v_duel.status != 'waiting' THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUEL_NOT_CANCELLABLE');
    END IF;

    -- ======================================================
    -- ۲. بازگرداندن مبلغ به سازنده
    -- ======================================================
    PERFORM fn_refund_from_escrow(
        v_duel.creator_id,
        v_duel.currency,
        v_duel.amount
    );

    -- ======================================================
    -- ۳. به‌روزرسانی وضعیت دوئل
    -- ======================================================
    UPDATE public.duels
    SET status = 'cancelled',
        completed_at = NOW()
    WHERE id = p_duel_id;

    -- ======================================================
    -- ۴. ثبت تراکنش برگشت
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status
    ) VALUES (
        v_duel.creator_id,
        'duel_refund',
        v_duel.currency,
        v_duel.amount,
        p_duel_id,
        'completed'
    );

    -- ======================================================
    -- ۵. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'duel_id', p_duel_id,
        'refund_amount', v_duel.amount,
        'creator_id', v_duel.creator_id
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'duel_id', p_duel_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;