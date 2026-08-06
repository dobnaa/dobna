-- ======================================================
-- 0043_simplify_dus_system.sql
-- ساده‌سازی سیستم DUS و اضافه کردن مقادیر جدید به constraint
-- ======================================================

-- ======================================================
-- ۱. اضافه کردن 'dus_redemption' به لیست مجاز reason
-- ======================================================
ALTER TABLE public.dobna_points_ledger
DROP CONSTRAINT IF EXISTS dobna_points_ledger_reason_check;

ALTER TABLE public.dobna_points_ledger
ADD CONSTRAINT dobna_points_ledger_reason_check
CHECK (reason IN ('reaction', 'referral', 'fee_discount_redeem', 'dus_transfer', 'dus_redemption'));

COMMENT ON CONSTRAINT dobna_points_ledger_reason_check ON public.dobna_points_ledger IS '
مقادیر مجاز برای reason:
- reaction: دریافت DUS از ری‌اکشن
- referral: دریافت DUS از دعوت
- fee_discount_redeem: مصرف DUS برای تخفیف کارمزد
- dus_transfer: انتقال DUS به کاربر دیگر
- dus_redemption: تبدیل DUS به ارز دیگر
';

-- ======================================================
-- ۲. حذف ستون solana_wallet_address (در صورت وجود)
-- ======================================================
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS solana_wallet_address;

-- ======================================================
-- ۳. اطمینان از وجود ستون dobna_points_balance
-- ======================================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS dobna_points_balance INTEGER NOT NULL DEFAULT 0;

-- ======================================================
-- ۴. کامنت روی ستون dobna_points_balance
-- ======================================================
COMMENT ON COLUMN public.profiles.dobna_points_balance IS '
موجودی DUS (Dobna Unit System) کاربر.
هر واحد DUS معادل ۱ دلار در سیستم داخلی دوبنا است و برای خرید کارت، دوئل، چالش و تخفیف کارمزد استفاده می‌شود.
DUS هرگز به پول واقعی یا شبکه‌های بلاک‌چین متصل نمی‌شود.
';