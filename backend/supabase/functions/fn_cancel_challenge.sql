-- ======================================================
-- fn_cancel_challenge.sql
-- لغو چالش (زیر ۵ نفر پس از ۲۰ دقیقه)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_cancel_challenge(p_challenge_id BIGINT)
RETURNS JSONB AS $$
DECLARE
    v_challenge RECORD;
    v_participant RECORD;
    v_refund_total DECIMAL(20,8);
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات چالش
    -- ======================================================
    SELECT * INTO v_challenge
    FROM public.challenges
    WHERE id = p_challenge_id;

    IF NOT FOUND OR v_challenge.status != 'waiting' THEN
        RETURN jsonb_build_object('success', false, 'error', 'CHALLENGE_NOT_CANCELLABLE');
    END IF;

    -- ======================================================
    -- ۲. بازگرداندن مبلغ به همه شرکت‌کنندگان
    -- ======================================================
    FOR v_participant IN 
        SELECT user_id FROM public.challenge_participants
        WHERE challenge_id = p_challenge_id
    LOOP
        PERFORM fn_refund_from_escrow(
            v_participant.user_id,
            v_challenge.currency,
            v_challenge.amount
        );

        -- ثبت تراکنش برگشت
        INSERT INTO public.transactions (
            user_id,
            type,
            currency,
            amount,
            reference_id,
            status
        ) VALUES (
            v_participant.user_id,
            'challenge_refund',
            v_challenge.currency,
            v_challenge.amount,
            p_challenge_id,
            'completed'
        );
    END LOOP;

    v_refund_total := v_challenge.amount * v_challenge.current_participants;

    -- ======================================================
    -- ۳. به‌روزرسانی وضعیت چالش
    -- ======================================================
    UPDATE public.challenges
    SET status = 'cancelled', completed_at = NOW()
    WHERE id = p_challenge_id;

    -- ======================================================
    -- ۴. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'challenge_id', p_challenge_id,
        'refund_total', v_refund_total,
        'participants', v_challenge.current_participants
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'challenge_id', p_challenge_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_cancel_challenge IS '
لغو چالش (زیر ۵ نفر پس از ۲۰ دقیقه) و بازگرداندن مبالغ.
- بازگرداندن مبلغ به همه شرکت‌کنندگان
- تغییر وضعیت به cancelled
- ❌ کولدان حذف نمی‌شود (چون اصلاً تنظیم نشده بود)
';