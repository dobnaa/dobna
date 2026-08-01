-- ======================================================
-- fn_redeem_points_for_fee_discount.sql
-- خرج امتیاز برای تخفیف کارمزد
--
-- نرخ نهایی‌شده: هر ۱ امتیاز = ۱٪ تخفیف، سقف ۵۰٪ (یعنی حداکثر ۵۰ امتیاز مصرف
-- می‌شود). با سقف روزانه‌ی ۱۰ امتیاز، رسیدن به حداکثر تخفیف حدود ۵ روز فعالیت
-- پیوسته لازم دارد.
-- ⚠️ همانند تابع fn_award_referral_points، این نرخ یک پیش‌فرض منطقی است و
-- پیش از نهایی‌سازی توکنومیکس واقعی باید بازبینی شود. برای تغییر، فقط کافی‌ست
-- points_to_percent یا max_discount_percent را ویرایش کنید.
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_redeem_points_for_fee_discount(
  p_user_id UUID,
  p_original_fee NUMERIC,
  p_points_to_use INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
  current_balance INTEGER;
  max_discount_percent NUMERIC := 50;
  points_to_percent NUMERIC := 1;
  discount_percent NUMERIC;
  final_fee NUMERIC;
  new_balance INTEGER;
BEGIN
  SELECT dobna_points_balance INTO current_balance
  FROM public.profiles WHERE id = p_user_id;

  IF current_balance IS NULL OR current_balance < p_points_to_use THEN
    RAISE EXCEPTION 'INSUFFICIENT_POINTS';
  END IF;

  discount_percent := LEAST(p_points_to_use * points_to_percent, max_discount_percent);
  final_fee := p_original_fee * (1 - discount_percent / 100.0);

  UPDATE public.profiles
  SET dobna_points_balance = dobna_points_balance - p_points_to_use
  WHERE id = p_user_id
  RETURNING dobna_points_balance INTO new_balance;

  INSERT INTO public.dobna_points_ledger (user_id, amount, reason, balance_after)
  VALUES (p_user_id, -p_points_to_use, 'fee_discount_redeem', new_balance);

  RETURN final_fee;
END;
$$ LANGUAGE plpgsql;
