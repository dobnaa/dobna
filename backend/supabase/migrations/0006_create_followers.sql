-- ======================================================
-- 6. FOLLOWERS TABLE (Follow/Unfollow system)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.followers (
    id BIGSERIAL PRIMARY KEY,
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (follower_id, following_id)
);

COMMENT ON TABLE public.followers IS 'User following relationships';

CREATE INDEX idx_followers_follower_id ON public.followers(follower_id);
CREATE INDEX idx_followers_following_id ON public.followers(following_id);