-- ======================================================
-- 23. USER SETTINGS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS public.user_settings (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    language VARCHAR(10) DEFAULT 'en',
    theme VARCHAR(20) DEFAULT 'dark',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    sound_enabled BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    otp_secret VARCHAR(255),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.user_settings IS 'User preferences and settings';

CREATE INDEX idx_user_settings_user_id ON public.user_settings(user_id);