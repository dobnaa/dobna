-- ======================================================
-- 27. ADMIN STATUS STORIES TABLE (Admin story images)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.admin_stories (
    id BIGSERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

COMMENT ON TABLE public.admin_stories IS 'Admin status stories (up to 20 images)';

CREATE INDEX idx_admin_stories_is_active ON public.admin_stories(is_active);
CREATE INDEX idx_admin_stories_display_order ON public.admin_stories(display_order);