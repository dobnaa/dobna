-- ======================================================
-- 7. ROOMS TABLE (Game rooms in community levels)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.rooms (
    id BIGSERIAL PRIMARY KEY,
    community_id BIGINT REFERENCES public.communities(id) ON DELETE CASCADE,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
    card_price DECIMAL(20,8) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    total_cards INTEGER DEFAULT 0,
    max_cards INTEGER DEFAULT 60,
    called_numbers INTEGER[] DEFAULT '{}',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    winner_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.rooms IS 'Game rooms in community levels (up to 999 rooms per level)';
COMMENT ON COLUMN public.rooms.level IS '1-4 (game levels)';
COMMENT ON COLUMN public.rooms.called_numbers IS 'Array of called numbers (1-90)';
COMMENT ON COLUMN public.rooms.max_cards IS 'Maximum 60 cards per room';

CREATE INDEX idx_rooms_community_id ON public.rooms(community_id);
CREATE INDEX idx_rooms_level ON public.rooms(level);
CREATE INDEX idx_rooms_status ON public.rooms(status);
CREATE INDEX idx_rooms_created_at ON public.rooms(created_at);