-- ======================================================
-- 25. COMMUNITY STATS TABLE (For rank calculations)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.community_stats (
    id BIGSERIAL PRIMARY KEY,
    community_id BIGINT REFERENCES public.communities(id) ON DELETE CASCADE UNIQUE,
    total_bmc DECIMAL(20,8) DEFAULT 0,
    total_lottery DECIMAL(20,8) DEFAULT 0,
    total_rank_score DECIMAL(20,8) DEFAULT 0,
    games_played_today INTEGER DEFAULT 0,
    games_played_week INTEGER DEFAULT 0,
    games_played_month INTEGER DEFAULT 0,
    cards_used_today INTEGER DEFAULT 0,
    cards_used_week INTEGER DEFAULT 0,
    cards_used_month INTEGER DEFAULT 0,
    fees_collected_today DECIMAL(20,8) DEFAULT 0,
    fees_collected_week DECIMAL(20,8) DEFAULT 0,
    fees_collected_month DECIMAL(20,8) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.community_stats IS 'Community statistics for rank calculation';

CREATE INDEX idx_community_stats_community_id ON public.community_stats(community_id);
CREATE INDEX idx_community_stats_total_rank_score ON public.community_stats(total_rank_score);