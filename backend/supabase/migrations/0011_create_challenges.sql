-- ======================================================
-- 11. CHALLENGES TABLE (Challenges with 20-min timer, 6-hour cooldown)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.challenges (
    id BIGSERIAL PRIMARY KEY,
    challenge_id VARCHAR(20) UNIQUE NOT NULL,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
    max_participants INTEGER DEFAULT 100,
    min_participants INTEGER DEFAULT 5,
    current_participants INTEGER DEFAULT 1,
    expires_at TIMESTAMPTZ NOT NULL,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    winner_id UUID REFERENCES public.profiles(id),
    total_pool DECIMAL(20,8) DEFAULT 0,
    creator_fee DECIMAL(20,8) DEFAULT 0,
    platform_fee DECIMAL(20,8) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.challenges IS 'Challenges with 20-min timer, 5-100 participants';
COMMENT ON COLUMN public.challenges.challenge_id IS 'Unique challenge identifier (CHL-XXXXXX)';
COMMENT ON COLUMN public.challenges.expires_at IS '20 minutes from creation';
COMMENT ON COLUMN public.challenges.creator_fee IS '20% of total pool to creator';
COMMENT ON COLUMN public.challenges.platform_fee IS '5% of total pool to platform';

CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_challenges_creator_id ON public.challenges(creator_id);
CREATE INDEX idx_challenges_expires_at ON public.challenges(expires_at);
CREATE INDEX idx_challenges_level ON public.challenges(level);