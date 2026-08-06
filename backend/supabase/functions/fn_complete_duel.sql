-- ======================================================
-- fn_complete_duel.sql
-- اتمام دوئل و توزیع جایزه (با قفل سطری)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_complete_duel(
    p_duel_id BIGINT,
    p_winner_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_duel RECORD;
    v_total_amount DECIMAL(20,8);
    v_fee DECIMAL(20,8);
    v_winner_amount DECIMAL(20,8);
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات دوئل با قفل (✅ اصلاح شد)
    -- ======================================================
    SELECT * INTO v_duel
    FROM public.duels
    WHERE id = p_duel_id
    FOR UPDATE;  -- ✅ قفل سطری برای جلوگیری از دوبار پرداخت

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'DUEL_NOT_FOUND');
    END IF;

    -- بررسی وضعیت دوئل (فقط دوئل‌های فعال قابل تکمیل هستند)
    IF v_duel.status != 'active' THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'DUEL_NOT_ACTIVE',
            'current_status', v_duel.status
        );
    END IF;

    -- بررسی اینکه آیا برنده یکی از شرکت‌کنندگان است
    IF v_duel.creator_id != p_winner_id AND v_duel.opponent_id != p_winner_id THEN
        RETURN jsonb_build_object('success', false, 'error', 'WINNER_NOT_IN_DUEL');
    END IF;

    -- ======================================================
    -- ۲. محاسبه مبالغ
    -- ======================================================
    v_total_amount := v_duel.amount * 2;
    v_fee := v_total_amount * 0.05;
    v_winner_amount := v_total_amount - v_fee;

    -- ======================================================
    -- ۳. برداشت از حساب مرکزی با قفل و بررسی موجودی
    -- ======================================================
    PERFORM fn_withdraw_from_escrow('11111111', v_duel.currency, v_total_amount);

    -- ======================================================
    -- ۴. توزیع وجوه
    -- ======================================================
    -- واریز به برنده (۹۵٪)
    UPDATE public.user_balances
    SET amount = amount + v_winner_amount
    WHERE user_id = p_winner_id AND currency = v_duel.currency;

    -- واریز کارمزد به ۰۰۰۰۰۰۰۵ (۵٪)
    PERFORM fn_deposit_fee('00000005', v_duel.currency, v_fee);

    -- ======================================================
    -- ۵. به‌روزرسانی وضعیت دوئل (اتمیک)
    -- ======================================================
    UPDATE public.duels
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = p_winner_id,
        fee = v_fee
    WHERE id = p_duel_id;

    -- ======================================================
    -- ۶. ثبت تراکنش‌ها
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status
    ) VALUES
        (p_winner_id, 'duel_win', v_duel.currency, v_winner_amount, p_duel_id, 'completed'),
        (NULL, 'duel_fee', v_duel.currency, v_fee, p_duel_id, 'completed');

    -- ======================================================
    -- ۷. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'duel_id', p_duel_id,
        'winner_id', p_winner_id,
        'total_amount', v_total_amount,
        'fee', v_fee,
        'winner_amount', v_winner_amount
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

COMMENT ON FUNCTION public.fn_complete_duel IS '
اتمام دوئل و توزیع جایزه با قفل سطری.
ورودی‌ها:
- p_duel_id: شناسه دوئل
- p_winner_id: شناسه کاربر برنده

خروجی: JSONB شامل اطلاعات توزیع وجوه

قوانین:
- ۹۵٪ به برنده
- ۵٪ کارمزد به حساب ۰۰۰۰۰۰۰۵

خطاهای احتمالی:
- DUEL_NOT_FOUND: دوئل یافت نشد
- DUEL_NOT_ACTIVE: دوئل در وضعیت فعال نیست
- WINNER_NOT_IN_DUEL: برنده در دوئل شرکت نداشته است
- ESCROW_ACCOUNT_NOT_FOUND: حساب مرکزی یافت نشد
- ESCROW_INSUFFICIENT_BALANCE: موجودی حساب مرکزی کافی نیست
';