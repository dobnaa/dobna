-- ======================================================
-- 4. COMMUNITIES TABLE (Groups with 4-level game rooms)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.communities (
    id BIGSERIAL PRIMARY KEY,
    gp_id VARCHAR(8) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    description TEXT,
    currency VARCHAR(10) NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    bmc_amount DECIMAL(20,8) DEFAULT 0,
    bmc_initial DECIMAL(20,8) DEFAULT 0,
    bmc_added DECIMAL(20,8) DEFAULT 0,
    lottery_amount DECIMAL(20,8) DEFAULT 0,
    total_games_played INTEGER DEFAULT 0,
    total_cards_used INTEGER DEFAULT 0,
    total_fees_collected DECIMAL(20,8) DEFAULT 0,
    member_count INTEGER DEFAULT 0,
    online_count INTEGER DEFAULT 0,
    rank INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    invite_link VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.communities IS 'Communities/groups with 4-level game rooms';
COMMENT ON COLUMN public.communities.gp_id IS '6-digit GP account number (GP000001)';
COMMENT ON COLUMN public.communities.username IS 'Group username with currency suffix (e.g., irancoin-BTC)';
COMMENT ON COLUMN public.communities.bmc_amount IS 'Total Building Management Capital (BMC)';
COMMENT ON COLUMN public.communities.lottery_amount IS 'Lottery fund amount (0.5% of game fees)';

CREATE INDEX idx_communities_username ON public.communities(username);
CREATE INDEX idx_communities_currency ON public.communities(currency);
CREATE INDEX idx_communities_owner_id ON public.communities(owner_id);
CREATE INDEX idx_communities_rank ON public.communities(rank);
CREATE INDEX idx_communities_is_active ON public.communities(is_active);