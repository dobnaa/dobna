-- ======================================================
-- fn_redeem_points_for_duel_fee.sql
-- اعمال تخفیف امتیاز روی کارمزد یک دوئل که از قبل ساخته شده است
--
-- چرا این تابع لازم است (به‌جای فراخوانی fn_redeem_points_for_fee_discount
-- قبل از ساخت دوئل): اگر امتیاز قبل از ساخت دوئل مصرف شود ولی ساخت دوئل به هر
-- دلیلی (خطای شبکه، اعتبارسنجی بک‌اند و...) شکست بخورد، امتیاز کاربر بدون
-- اینکه دوئلی ساخته شده باشد از دست می‌رود. با این طراحی، ترتیب درست است:
-- ۱) دوئل با کارمزد پایه (بدون تخفیف) ساخته می‌شود
-- ۲) فقط پس از تأیید ساخت موفق دوئل، این تابع صدا زده می‌شود تا هم امتیاز
--    کسر شود و هم کارمزد ذخیره‌شده‌ی همان دوئل به‌روزرسانی شود — هر دو در یک
--    تراکنش اتمی. اگر این مرحله شکست بخورد، دوئل با کارمزد پایه باقی می‌ماند
--    و امتیاز کاربر خرج نشده است (بدون ضرر برای کاربر).
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_redeem_points_for_duel_fee(
  p_user_id UUID,
  p_duel_id BIGINT,
  p_points_to_use INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
  current_balance INTEGER;
  original_fee NUMERIC;
  duel_creator_id UUID;
  max_discount_percent NUMERIC := 50;
  points_to_percent NUMERIC := 1;
  discount_percent NUMERIC;
  final_fee NUMERIC;
  new_balance INTEGER;
BEGIN
  SELECT creator_id, fee INTO duel_creator_id, original_fee
  FROM public.duels WHERE id = p_duel_id;

  IF duel_creator_id IS NULL THEN
    RAISE EXCEPTION 'DUEL_NOT_FOUND';
  END IF;

  IF duel_creator_id != p_user_id THEN
    RAISE EXCEPTION 'NOT_DUEL_CREATOR';
  END IF;

  SELECT dobna_points_balance INTO current_balance
  FROM public.profiles WHERE id = p_user_id;

  IF current_balance IS NULL OR current_balance < p_points_to_use THEN
    RAISE EXCEPTION 'INSUFFICIENT_POINTS';
  END IF;

  discount_percent := LEAST(p_points_to_use * points_to_percent, max_discount_percent);
  final_fee := original_fee * (1 - discount_percent / 100.0);

  UPDATE public.profiles
  SET dobna_points_balance = dobna_points_balance - p_points_to_use
  WHERE id = p_user_id
  RETURNING dobna_points_balance INTO new_balance;

  UPDATE public.duels SET fee = final_fee WHERE id = p_duel_id;

  INSERT INTO public.dobna_points_ledger (user_id, amount, reason, reference_id, balance_after)
  VALUES (p_user_id, -p_points_to_use, 'fee_discount_redeem', p_duel_id::TEXT, new_balance);

  RETURN final_fee;
END;
$$ LANGUAGE plpgsql;
