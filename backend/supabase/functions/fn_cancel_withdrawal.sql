-- ======================================================
-- fn_cancel_withdrawal.sql
-- لغو برداشت (در صورت شکست broadcast)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_cancel_withdrawal(
    p_transaction_id BIGINT
)
RETURNS JSONB AS $$
DECLARE
    v_tx RECORD;
BEGIN
    -- ======================================================
    -- ۱. دریافت تراکنش (با قفل سطری)
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
    -- ۲. بازگرداندن مبلغ قفل‌شده
    -- ======================================================
    UPDATE public.user_balances
    SET amount = amount + (ABS(v_tx.amount) + COALESCE(v_tx.fee, 0)),
        locked_amount = locked_amount - (ABS(v_tx.amount) + COALESCE(v_tx.fee, 0))
    WHERE user_id = v_tx.user_id AND currency = v_tx.currency;

    -- ======================================================
    -- ۳. به‌روزرسانی وضعیت تراکنش
    -- ======================================================
    UPDATE public.transactions
    SET status = 'failed'
    WHERE id = p_transaction_id;

    -- ======================================================
    -- ۴. خروجی
    -- ======================================================
    RETURN jsonb_build_object(
        'success', TRUE,
        'transaction_id', p_transaction_id,
        'refunded', TRUE,
        'status', 'failed'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_cancel_withdrawal IS '
لغو برداشت و بازگرداندن مبلغ قفل‌شده به موجودی قابل‌استفاده.
خطاها: TRANSACTION_NOT_FOUND, WITHDRAWAL_NOT_PENDING
';