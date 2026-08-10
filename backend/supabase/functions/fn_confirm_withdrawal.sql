-- ======================================================
-- fn_confirm_withdrawal.sql
-- تأیید نهایی برداشت (پس از broadcast موفق)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_confirm_withdrawal(
    p_transaction_id BIGINT,
    p_tx_hash VARCHAR(255)
)
RETURNS JSONB AS $$
DECLARE
    v_tx RECORD;
BEGIN
    -- ======================================================
    -- ۱. اعتبارسنجی
    -- ======================================================
    IF p_tx_hash IS NULL OR p_tx_hash = '' THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'INVALID_TX_HASH');
    END IF;

    -- ======================================================
    -- ۲. دریافت تراکنش (با قفل سطری)
    -- ======================================================
    SELECT * INTO v_tx
    FROM public.transactions
    WHERE id = p_transaction_id AND type = 'withdraw'
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'TRANSACTION_NOT_FOUND');
    END IF;

    IF v_tx.status != 'pending' THEN
        RETURN jsonb_build_object(
            'success', FALSE,
            'error', 'WITHDRAWAL_NOT_PENDING',
            'current_status', v_tx.status
        );
    END IF;

    -- ======================================================
    -- ۳. کسر قطعی از locked_amount
    -- ======================================================
    UPDATE public.user_balances
    SET locked_amount = locked_amount - (ABS(v_tx.amount) + COALESCE(v_tx.fee, 0))
    WHERE user_id = v_tx.user_id AND currency = v_tx.currency;

    -- ======================================================
    -- ۴. به‌روزرسانی وضعیت تراکنش
    -- ======================================================
    UPDATE public.transactions
    SET status = 'confirmed',
        tx_hash = p_tx_hash,
        tx_id = p_tx_hash,
        confirmed_at = NOW()
    WHERE id = p_transaction_id;

    -- ======================================================
    -- ۵. خروجی
    -- ======================================================
    RETURN jsonb_build_object(
        'success', TRUE,
        'transaction_id', p_transaction_id,
        'tx_hash', p_tx_hash,
        'status', 'confirmed'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_confirm_withdrawal IS '
تأیید نهایی برداشت پس از broadcast موفق در بلاک‌چین.
خطاها: INVALID_TX_HASH, TRANSACTION_NOT_FOUND, WITHDRAWAL_NOT_PENDING
';