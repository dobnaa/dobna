-- ======================================================
-- 0038_add_challenge_cooldown_index.sql
-- اضافه کردن ایندکس‌های بهینه‌سازی برای جدول challenge_cooldowns
-- ======================================================

-- ایندکس برای جستجوی سریع کولدان کاربر
CREATE INDEX IF NOT EXISTS idx_challenge_cooldowns_user_id 
ON public.challenge_cooldowns (user_id);

-- کامنت روی جدول
COMMENT ON TABLE public.challenge_cooldowns IS '
کولدان ۶ ساعته برای چالش‌ها.
فقط پس از برگزاری موفق چالش تنظیم می‌شود (نه در زمان ساخت).
';