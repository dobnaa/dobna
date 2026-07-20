-- ======================================================
-- 9. DUELS TABLE (Public, Private, and Group duels)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.duels (
    id BIGSERIAL PRIMARY KEY,
    duel_id VARCHAR(20) UNIQUE NOT NULL,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opponent_id UUID REFERENCES public.profiles(id),
    community_id BIGINT REFERENCES public.communities(id),
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
    duel_type VARCHAR(20) NOT NULL CHECK (duel_type IN ('public', 'private', 'group')),
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
    expires_at TIMESTAMPTZ NOT NULL,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    winner_id UUID REFERENCES public.profiles(id),
    fee DECIMAL(20,8) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.duels IS 'Duel system with 5-minute expiry timer';
COMMENT ON COLUMN public.duels.duel_id IS 'Unique duel identifier (DUL-XXXXXX)';
COMMENT ON COLUMN public.duels.duel_type IS 'public, private (user-to-user), or group';
COMMENT ON COLUMN public.duels.expires_at IS '5 minutes from creation';

CREATE INDEX idx_duels_status ON public.duels(status);
CREATE INDEX idx_duels_creator_id ON public.duels(creator_id);
CREATE INDEX idx_duels_opponent_id ON public.duels(opponent_id);
CREATE INDEX idx_duels_community_id ON public.duels(community_id);
CREATE INDEX idx_duels_expires_at ON public.duels(expires_at);