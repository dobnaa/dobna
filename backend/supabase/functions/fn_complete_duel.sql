-- ======================================================
-- fn_complete_duel.sql
-- اتمام دوئل و توزیع جایزه از حساب مرکزی (۱۱۱۱۱۱۱۱)
-- 
-- قوانین توزیع:
-- - ۵٪ کارمزد به حساب ۰۰۰۰۰۰۰۵
-- - ۹۵٪ به برنده دوئل
-- 
-- جریان مالی:
-- ۱. بررسی موجودی کافی در حساب مرکزی (۱۱۱۱۱۱۱۱)
-- ۲. کسر کل مبلغ دوئل از حساب مرکزی
-- ۳. واریز ۵٪ کارمزد به حساب ۰۰۰۰۰۰۰۵
-- ۴. واریز ۹۵٪ به برنده
-- ۵. ثبت تراکنش‌ها
-- ======================================================

CREATE OR REPLACE FUNCTION fn_complete_duel(
    p_duel_id BIGINT,
    p_winner_id UUID
)
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
    v_total_amount DECIMAL(20,8);
    v_fee DECIMAL(20,8);
    v_winner_amount DECIMAL(20,8);
    v_escrow_balance DECIMAL(20,8);
BEGIN
    -- ۱. دریافت اطلاعات دوئل
    SELECT * INTO v_duel
    FROM public.duels
    WHERE id = p_duel_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION '❌ دوئل با شناسه % یافت نشد', p_duel_id;
    END IF;

    -- بررسی وضعیت دوئل
    IF v_duel.status NOT IN ('active') THEN
        RAISE EXCEPTION '❌ دوئل در وضعیت فعال نیست (وضعیت فعلی: %)', v_duel.status;
    END IF;

    -- ۲. محاسبه مبالغ
    v_total_amount := v_duel.amount * 2; -- مبلغ دو نفر
    v_fee := v_total_amount * 0.05; -- ۵٪ کارمزد
    v_winner_amount := v_total_amount - v_fee; -- ۹۵٪ به برنده

    -- ۳. بررسی و کسر از حساب مرکزی (۱۱۱۱۱۱۱۱)
    SELECT balance INTO v_escrow_balance
    FROM public.system_accounts
    WHERE account_number = '11111111'
      AND currency = v_duel.currency;

    IF v_escrow_balance < v_total_amount THEN
        RAISE EXCEPTION '❌ موجودی حساب مرکزی (۱۱۱۱۱۱۱۱) برای ارز % کافی نیست (موجودی: %، موردنیاز: %)',
            v_duel.currency, v_escrow_balance, v_total_amount;
    END IF;

    -- کسر کل مبلغ از حساب مرکزی
    UPDATE public.system_accounts
    SET balance = balance - v_total_amount
    WHERE account_number = '11111111'
      AND currency = v_duel.currency;

    -- ۴. توزیع وجوه
    -- ۴.۱ واریز کارمزد به حساب ۰۰۰۰۰۰۰۵
    PERFORM fn_deposit_fee('00000005', v_duel.currency, v_fee);

    -- ۴.۲ واریز جایزه به برنده (۹۵٪)
    UPDATE public.user_balances
    SET amount = amount + v_winner_amount
    WHERE user_id = p_winner_id
      AND currency = v_duel.currency;

    -- ۵. به‌روزرسانی وضعیت دوئل
    UPDATE public.duels
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = p_winner_id,
        fee = v_fee
    WHERE id = p_duel_id;

    -- ۶. ثبت تراکنش‌ها
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description
    ) VALUES 
    (
        '11111111',
        'escrow_debit',
        v_duel.currency,
        -v_total_amount,
        p_duel_id,
        'completed',
        '🔻 کسر کل مبلغ دوئل از حساب مرکزی - ' || v_duel.duel_id
    ),
    (
        p_winner_id,
        'duel_win',
        v_duel.currency,
        v_winner_amount,
        p_duel_id,
        'completed',
        '🏆 جایزه برنده دوئل - ' || v_duel.duel_id
    ),
    (
        '00000005',
        'platform_fee',
        v_duel.currency,
        v_fee,
        p_duel_id,
        'completed',
        '⚡ کارمزد پلتفرم دوئل - ' || v_duel.duel_id
    );

    RAISE NOTICE '✅ دوئل % با موفقیت تکمیل شد. برنده: %، مبلغ جایزه: % %',
        v_duel.duel_id, p_winner_id, v_winner_amount, v_duel.currency;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_complete_duel IS '
اتمام دوئل و توزیع جایزه از حساب مرکزی:
- ۵٪ کارمزد به حساب ۰۰۰۰۰۰۰۵
- ۹۵٪ به برنده
';