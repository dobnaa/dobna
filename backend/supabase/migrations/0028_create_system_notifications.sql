-- ======================================================
-- 28. SYSTEM NOTIFICATIONS TABLE (System messages to users)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.system_notifications (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_type VARCHAR(20) DEFAULT 'all' CHECK (target_type IN ('all', 'users', 'community', 'specific')),
    target_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

COMMENT ON TABLE public.system_notifications IS 'System notifications to all users or specific groups';

CREATE INDEX idx_system_notifications_is_active ON public.system_notifications(is_active);
CREATE INDEX idx_system_notifications_target_type ON public.system_notifications(target_type);