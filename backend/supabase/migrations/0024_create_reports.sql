-- ======================================================
-- 24. REPORTS TABLE (User reports for violations)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.reports (
    id BIGSERIAL PRIMARY KEY,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    community_id BIGINT REFERENCES public.communities(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL CHECK (type IN ('user', 'group', 'duel', 'challenge', 'message')),
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')),
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

COMMENT ON TABLE public.reports IS 'User reports for moderation';

CREATE INDEX idx_reports_reporter_id ON public.reports(reporter_id);
CREATE INDEX idx_reports_reported_id ON public.reports(reported_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_type ON public.reports(type);