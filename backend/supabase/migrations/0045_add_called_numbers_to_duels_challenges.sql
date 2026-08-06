-- ======================================================
-- 0045_add_called_numbers_to_duels_challenges.sql
-- اضافه کردن ستون called_numbers به دوئل و چالش
-- ======================================================

-- ۱. اضافه کردن به duels
ALTER TABLE public.duels 
ADD COLUMN IF NOT EXISTS called_numbers INTEGER[] DEFAULT '{}';

COMMENT ON COLUMN public.duels.called_numbers IS 
'اعداد فراخوانی‌شده در بازی دوئل (۱ تا ۹۰)';

-- ۲. اضافه کردن به challenges
ALTER TABLE public.challenges 
ADD COLUMN IF NOT EXISTS called_numbers INTEGER[] DEFAULT '{}';

COMMENT ON COLUMN public.challenges.called_numbers IS 
'اعداد فراخوانی‌شده در بازی چالش (۱ تا ۹۰)';

-- ۳. ایجاد ایندکس برای بهینه‌سازی
CREATE INDEX IF NOT EXISTS idx_duels_called_numbers ON public.duels USING GIN (called_numbers);
CREATE INDEX IF NOT EXISTS idx_challenges_called_numbers ON public.challenges USING GIN (called_numbers);