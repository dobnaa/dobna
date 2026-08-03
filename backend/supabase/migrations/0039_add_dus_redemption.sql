-- ======================================================
-- 0039_add_dus_redemption.sql
-- افزودن قابلیت تبدیل امتیاز به DUS (Dobna Unit — هر واحد = ۱ دلار)
--
-- توجه: از همان ستون profiles.dobna_points_balance به‌عنوان موجودی DUS
-- استفاده می‌شود (نیازی به ستون جدید نیست، چون این موجودی از قبل به‌صورت
-- عدد صحیح کامل انباشته می‌شود: هر ری‌اکشن واجد شرایط = ۱ واحد، هر دعوت
-- موفق = ۱۰ واحد). این یعنی همان موجودی می‌تواند یا صرف تخفیف کارمزد شود
-- (fn_redeem_points_for_*) یا صرف تبدیل مستقیم به ارز واقعی (این migration)،
-- ولی هرگز هر دو همزمان برای همان واحدها — چون هر دو مسیر از یک موجودی واحد
-- کسر می‌کنند، امکان مصرف دوباره (double-spend) وجود ندارد.
-- ======================================================

-- اضافه کردن 'dus_redemption' به دسته‌بندی‌های مجاز دفتر امتیاز
ALTER TABLE public.dobna_points_ledger DROP CONSTRAINT IF EXISTS dobna_points_ledger_reason_check;
ALTER TABLE public.dobna_points_ledger
  ADD CONSTRAINT dobna_points_ledger_reason_check
  CHECK (reason IN ('reaction', 'referral', 'fee_discount_redeem', 'dus_redemption'));

COMMENT ON COLUMN public.profiles.dobna_points_balance IS
  'موجودی DUS کاربر (Dobna Unit). هر واحد صحیح معادل ۱ دلار است. قابل استفاده
   برای تخفیف کارمزد (تا ۵۰٪) یا تبدیل مستقیم به ارز واقعی در کیف پول داخلی
   دوبنا. هر دو مسیر از همین ستون کسر می‌شوند.';
