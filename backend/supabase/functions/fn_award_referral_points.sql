-- ======================================================
-- fn_award_referral_points.sql
-- اعطای امتیاز به‌ازای هر دعوت موفق
-- (باید از fn_process_referral_reward صدا زده شود تا پاداش مالی احتمالی و
-- امتیاز هر دو یکجا مدیریت شوند)
--
-- مقدار نهایی‌شده: ۱۰ امتیاز به‌ازای هر دعوت موفق.
-- منطق: سقف روزانه‌ی امتیاز ری‌اکشن ۱۰ است و رسیدن به آن سقف نیازمند ۱۰ کاربر
-- واقعی متفاوت است؛ آوردن یک کاربر واقعی جدید به پلتفرم (دعوت موفق) معادل یک
-- روز کامل فعالیت حداکثری در نظر گرفته شده است.
-- ⚠️ این عدد یک تصمیم منطقی برای شروع است، نه نتیجه‌ی تحلیل اقتصادی/توکنومیکس
-- قطعی؛ پیش از انتشار توکن واقعی در سولانا بهتر است با بررسی مالی/حقوقی
-- بازبینی شود. برای تغییر، فقط کافی‌ست points_per_referral را ویرایش کنید.
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_award_referral_points(
  p_referrer_id UUID,
  p_referred_user_id UUID
)
RETURNS void AS $$
DECLARE
  points_per_referral INTEGER := 10;
  new_balance INTEGER;
BEGIN
  UPDATE public.profiles
  SET dobna_points_balance = dobna_points_balance + points_per_referral
  WHERE id = p_referrer_id
  RETURNING dobna_points_balance INTO new_balance;

  INSERT INTO public.dobna_points_ledger (user_id, amount, reason, reference_id, balance_after)
  VALUES (p_referrer_id, points_per_referral, 'referral', p_referred_user_id::TEXT, new_balance);
END;
$$ LANGUAGE plpgsql;
