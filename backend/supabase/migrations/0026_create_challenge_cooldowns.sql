-- ======================================================
-- 26. CHALLENGE COOLDOWN TABLE (6-hour timer per user)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.challenge_cooldowns (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    last_challenge_at TIMESTAMPTZ DEFAULT NOW(),
    cooldown_until TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id)
);

COMMENT ON TABLE public.challenge_cooldowns IS '6-hour cooldown timer for challenges';

CREATE INDEX idx_challenge_cooldowns_user_id ON public.challenge_cooldowns(user_id);