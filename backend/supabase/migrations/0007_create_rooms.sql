-- ======================================================
-- 0007_create_rooms.sql
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
-- ❌ ستون pot_amount وجود ندارد