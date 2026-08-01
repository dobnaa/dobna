-- ======================================================
-- 0037_create_dobna_points.sql
-- سیستم امتیاز دوبنا (Dobna Points) – نسخه‌ی نهایی
-- پایه‌ی آینده برای توکن DOBNA در شبکه‌ی سولانا
-- ======================================================

-- ======================================================
-- ۱. جدول ری‌اکشن‌ها
-- ======================================================
-- target_id از نوع BIGINT است چون duels.id و challenges.id هر دو BIGSERIAL هستند
-- (تأیید شده از روی migrations 0009_create_duels.sql و 0011_create_challenges.sql)
CREATE TABLE IF NOT EXISTS public.reactions (
  id BIGSERIAL PRIMARY KEY,
  giver_id UUID REFERENCES public.profiles(id) NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('duel', 'challenge')),
  target_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (giver_id, target_type, target_id) -- هر کاربر روی هر آیتم فقط یک ری‌اکشن (idempotent)
);

CREATE INDEX IF NOT EXISTS idx_reactions_receiver_date
  ON public.reactions (receiver_id, (created_at::date));

CREATE INDEX IF NOT EXISTS idx_reactions_target
  ON public.reactions (target_type, target_id);

-- ======================================================
-- ۲. جدول دفتر امتیازها (ledger) — مستقل از کیف پول واقعی
-- ======================================================
CREATE TABLE IF NOT EXISTS public.dobna_points_ledger (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  amount INTEGER NOT NULL, -- مثبت = کسب امتیاز، منفی = خرج (تخفیف کارمزد)
  reason TEXT NOT NULL CHECK (reason IN ('reaction', 'referral', 'fee_discount_redeem')),
  reference_id TEXT,
  balance_after INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dobna_points_ledger_user
  ON public.dobna_points_ledger (user_id, created_at DESC);

-- ======================================================
-- ۳. اضافه کردن ستون‌ها به جدول profiles
-- ======================================================
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dobna_points_balance INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS solana_wallet_address TEXT;
