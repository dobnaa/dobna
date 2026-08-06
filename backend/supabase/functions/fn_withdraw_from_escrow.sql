-- ======================================================
-- fn_withdraw_from_escrow.sql
-- برداشت از حساب مرکزی (۱۱۱۱۱۱۱۱) با قفل و بررسی موجودی
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_withdraw_from_escrow(
    p_account VARCHAR(20),
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8)
)
RETURNS BOOLEAN AS $$
DECLARE
    v_balance DECIMAL(20,8);
BEGIN
    -- ۱. دریافت موجودی با قفل
    SELECT balance INTO v_balance
    FROM public.system_accounts
    WHERE account_number = p_account AND currency = p_currency
    FOR UPDATE;

    IF v_balance IS NULL THEN
        RAISE EXCEPTION 'ESCROW_ACCOUNT_NOT_FOUND';
    END IF;

    IF v_balance < p_amount THEN
        RAISE EXCEPTION 'ESCROW_INSUFFICIENT_BALANCE';
    END IF;

    -- ۲. کسر از حساب
    UPDATE public.system_accounts
    SET balance = balance - p_amount
    WHERE account_number = p_account AND currency = p_currency;

    RETURN TRUE;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'ESCROW_WITHDRAW_FAILED: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_withdraw_from_escrow IS '
برداشت از حساب مرکزی (۱۱۱۱۱۱۱۱) با قفل و بررسی موجودی.
ورودی‌ها:
- p_account: شماره حساب (۱۱۱۱۱۱۱۱)
- p_currency: ارز
- p_amount: مبلغ

خطاهای احتمالی:
- ESCROW_ACCOUNT_NOT_FOUND: حساب یافت نشد
- ESCROW_INSUFFICIENT_BALANCE: موجودی کافی نیست
- ESCROW_WITHDRAW_FAILED: خطای عمومی
';