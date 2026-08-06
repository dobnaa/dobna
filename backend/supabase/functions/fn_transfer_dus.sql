-- ======================================================
-- fn_transfer_dus.sql
-- انتقال DUS بین دو کاربر (فقط داخلی)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_transfer_dus(
    p_sender_id UUID,
    p_receiver_id UUID,
    p_amount INTEGER
)
RETURNS JSONB AS $$
DECLARE
    v_sender_balance INTEGER;
    v_receiver_balance INTEGER;
BEGIN
    -- ۱. اعتبارسنجی
    IF p_sender_id = p_receiver_id THEN
        RETURN jsonb_build_object('success', false, 'error', 'SAME_USER');
    END IF;

    IF p_amount <= 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'INVALID_AMOUNT');
    END IF;

    -- ۲. بررسی موجودی فرستنده (با قفل سطری)
    SELECT dobna_points_balance INTO v_sender_balance
    FROM public.profiles
    WHERE id = p_sender_id
    FOR UPDATE;

    IF v_sender_balance IS NULL OR v_sender_balance < p_amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_BALANCE');
    END IF;

    -- ۳. انتقال (اتمیک)
    UPDATE public.profiles
    SET dobna_points_balance = dobna_points_balance - p_amount
    WHERE id = p_sender_id;

    UPDATE public.profiles
    SET dobna_points_balance = dobna_points_balance + p_amount
    WHERE id = p_receiver_id;

    -- ۴. ثبت در دفتر لجر (برای فرستنده و گیرنده)
    INSERT INTO public.dobna_points_ledger (user_id, amount, reason, reference_id, balance_after)
    VALUES 
        (p_sender_id, -p_amount, 'dus_transfer', p_receiver_id::TEXT, 
         (SELECT dobna_points_balance FROM public.profiles WHERE id = p_sender_id)),
        (p_receiver_id, p_amount, 'dus_transfer', p_sender_id::TEXT,
         (SELECT dobna_points_balance FROM public.profiles WHERE id = p_receiver_id));

    -- ۵. خروجی
    RETURN jsonb_build_object(
        'success', true,
        'sender_balance', (SELECT dobna_points_balance FROM public.profiles WHERE id = p_sender_id),
        'receiver_balance', (SELECT dobna_points_balance FROM public.profiles WHERE id = p_receiver_id)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;