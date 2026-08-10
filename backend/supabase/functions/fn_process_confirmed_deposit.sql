-- ======================================================
-- fn_process_confirmed_deposit.sql
-- پردازش واریز تأییدشده (Idempotent)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_process_confirmed_deposit(
    p_address VARCHAR(255),
    p_amount DECIMAL(20, 8),
    p_tx_hash VARCHAR(255),
    p_network VARCHAR(30)
)
RETURNS JSONB AS $$
DECLARE
    v_deposit RECORD;
BEGIN
    -- اعتبارسنجی
    IF p_amount <= 0 THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'INVALID_AMOUNT');
    END IF;

    IF p_tx_hash IS NULL OR p_tx_hash = '' THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'INVALID_TX_HASH');
    END IF;

    -- یافتن آدرس واریز
    SELECT * INTO v_deposit
    FROM public.deposit_addresses
    WHERE address = p_address
      AND network = p_network
      AND is_active = TRUE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'DEPOSIT_ADDRESS_NOT_FOUND');
    END IF;

    -- واریز به موجودی کاربر (با قفل سطری)
    INSERT INTO public.user_balances (user_id, currency, amount)
    VALUES (v_deposit.user_id, v_deposit.currency, p_amount)
    ON CONFLICT (user_id, currency)
    DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount;

    -- ثبت تراکنش (Idempotent: UNIQUE(tx_id) از ورود تکراری جلوگیری می‌کند)
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        network,
        address,
        tx_id,
        tx_hash,
        status,
        confirmed_at
    ) VALUES (
        v_deposit.user_id,
        'deposit',
        v_deposit.currency,
        p_amount,
        p_network,
        p_address,
        p_tx_hash,
        p_tx_hash,
        'confirmed',
        NOW()
    );

    RETURN jsonb_build_object(
        'success', TRUE,
        'user_id', v_deposit.user_id,
        'currency', v_deposit.currency,
        'amount', p_amount,
        'tx_hash', p_tx_hash
    );

EXCEPTION
    WHEN unique_violation THEN
        -- تراکنش تکراری (وب‌هوک تکراری)
        RETURN jsonb_build_object(
            'success', FALSE,
            'error', 'DUPLICATE_DEPOSIT_TX',
            'tx_hash', p_tx_hash
        );
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', FALSE,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_process_confirmed_deposit IS '
پردازش واریز تأییدشده با قابلیت Idempotent (جلوگیری از واریز تکراری).
خطاها: INVALID_AMOUNT, INVALID_TX_HASH, DEPOSIT_ADDRESS_NOT_FOUND, DUPLICATE_DEPOSIT_TX
';