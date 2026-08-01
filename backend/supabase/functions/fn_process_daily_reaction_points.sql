-- ======================================================
-- fn_process_daily_reaction_points.sql
-- پردازش روزانه‌ی امتیاز ری‌اکشن‌ها (اجرا توسط Cron، هر شب برای روز قبل)
--
-- منطق تأیید شده:
-- - هر فرستنده (giver) حداکثر ۱ امتیاز در روز می‌دهد؛ رسیدن به ۱۰۰ ری‌اکشن
--   از همان فرستنده در همان روز کافی است و بیشتر از آن امتیاز اضافه نمی‌دهد.
-- - سقف کل امتیاز روزانه‌ی هر گیرنده: ۱۰ امتیاز (حداکثر ۱۰ فرستنده‌ی واجد شرایط).
-- - تکرار ری‌اکشن روی یک محتوا توسط یک فرستنده در جدول reactions با UNIQUE
--   constraint (giver_id, target_type, target_id) از قبل فقط یک‌بار شمرده می‌شود.
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_process_daily_reaction_points(
  target_date DATE DEFAULT CURRENT_DATE - INTERVAL '1 day'
)
RETURNS void AS $$
DECLARE
  rec RECORD;
  points_to_award INTEGER;
  new_balance INTEGER;
BEGIN
  FOR rec IN
    SELECT receiver_id, COUNT(DISTINCT giver_id) FILTER (WHERE giver_reaction_count >= 100) AS qualifying_givers
    FROM (
      SELECT receiver_id, giver_id, COUNT(*) AS giver_reaction_count
      FROM public.reactions
      WHERE created_at::date = target_date
      GROUP BY receiver_id, giver_id
    ) per_giver
    GROUP BY receiver_id
  LOOP
    IF rec.qualifying_givers > 0 THEN
      points_to_award := LEAST(rec.qualifying_givers, 10); -- سقف روزانه: ۱۰ امتیاز

      UPDATE public.profiles
      SET dobna_points_balance = dobna_points_balance + points_to_award
      WHERE id = rec.receiver_id
      RETURNING dobna_points_balance INTO new_balance;

      INSERT INTO public.dobna_points_ledger (user_id, amount, reason, reference_id, balance_after)
      VALUES (rec.receiver_id, points_to_award, 'reaction', target_date::TEXT, new_balance);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
