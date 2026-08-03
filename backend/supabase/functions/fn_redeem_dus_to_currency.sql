-- ======================================================
-- fn_redeem_dus_to_currency.sql
-- تبدیل DUS (Dobna Unit) به ارزهای دیگر در سیستم داخلی دوبنا
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_redeem_dus_to_currency(
  p_user_id UUID,
  p_target_currency VARCHAR(10),
  p_dus_amount INTEGER
)
RETURNS JSONB AS $$
DECLARE
  v_current_balance INTEGER;
  v_target_rate DECIMAL(20,8);
  v_target_amount DECIMAL(20,8);
  v_new_balance INTEGER;
BEGIN
  -- ======================================================
  -- ۱. بررسی موجودی DUS
  -- ======================================================
  SELECT dobna_points_balance INTO v_current_balance
  FROM public.profiles WHERE id = p_user_id;

  IF v_current_balance IS NULL OR v_current_balance < p_dus_amount THEN
    RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_DUS');
  END IF;

  -- ======================================================
  -- ۲. دریافت نرخ تبدیل (DUS → USD → target)
  -- ======================================================
  IF p_target_currency = 'USD' THEN
    v_target_rate := 1.0;
  ELSE
    -- دریافت price_usd ارز مقصد (مثلاً EUR price_usd = 1.08)
    SELECT fn_get_exchange_rate(p_target_currency, 'USD') INTO v_target_rate;
    
    IF v_target_rate IS NULL OR v_target_rate <= 0 THEN
      RETURN jsonb_build_object('success', false, 'error', 'EXCHANGE_RATE_UNAVAILABLE');
    END IF;
  END IF;

  -- محاسبه مبلغ نهایی: DUS / price_usd_هدف
  v_target_amount := p_dus_amount / v_target_rate;

  -- ======================================================
  -- ۳. کسر DUS از کاربر
  -- ======================================================
  UPDATE public.profiles
  SET dobna_points_balance = dobna_points_balance - p_dus_amount
  WHERE id = p_user_id
  RETURNING dobna_points_balance INTO v_new_balance;

  -- ======================================================
  -- ۴. واریز مبلغ به کیف پول کاربر (در ارز مقصد)
  -- ======================================================
  INSERT INTO public.user_balances (user_id, currency, amount)
  VALUES (p_user_id, p_target_currency, v_target_amount)
  ON CONFLICT (user_id, currency)
  DO UPDATE SET amount = user_balances.amount + v_target_amount;

  -- ======================================================
  -- ۵. ثبت در دفتر امتیازات (ledger)
  -- ======================================================
  INSERT INTO public.dobna_points_ledger (
    user_id,
    amount,
    reason,
    reference_id,
    balance_after
  ) VALUES (
    p_user_id,
    -p_dus_amount,
    'dus_redemption',
    p_target_currency,
    v_new_balance
  );

  -- ======================================================
  -- ۶. ثبت تراکنش با کد پایدار (برای ترجمه در فرانت‌اند)
  -- ======================================================
  INSERT INTO public.transactions (
    user_id,
    type,
    currency,
    amount,
    description,
    status
  ) VALUES (
    p_user_id,
    'dus_redemption',  -- ✅ کد پایدار، نه متن هاردکد
    p_target_currency,
    v_target_amount,
    'DUS to ' || p_target_currency,
    'completed'
  );

  -- ======================================================
  -- ۷. خروجی موفقیت
  -- ======================================================
  RETURN jsonb_build_object(
    'success', true,
    'dus_used', p_dus_amount,
    'target_currency', p_target_currency,
    'target_amount', v_target_amount,
    'exchange_rate', v_target_rate
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql;