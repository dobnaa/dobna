-- ======================================================
-- 0041_add_dus_redemption.sql
-- اضافه کردن 'dus_redemption' به لیست مجاز reason
-- ======================================================
ALTER TABLE public.dobna_points_ledger
DROP CONSTRAINT IF EXISTS dobna_points_ledger_reason_check;

ALTER TABLE public.dobna_points_ledger
ADD CONSTRAINT dobna_points_ledger_reason_check
CHECK (reason IN ('reaction', 'referral', 'fee_discount_redeem', 'dus_redemption'));

COMMENT ON COLUMN public.profiles.dobna_points_balance IS 
'موجودی امتیاز دوبنا (DUS). هر واحد DUS معادل ۱ دلار است و می‌تواند برای تخفیف کارمزد یا تبدیل به ارزهای دیگر استفاده شود.';