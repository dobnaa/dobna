-- ======================================================
-- 5. COMMUNITY MEMBERS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS public.community_members (
    id BIGSERIAL PRIMARY KEY,
    community_id BIGINT REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
    is_online BOOLEAN DEFAULT FALSE,
    is_following BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (community_id, user_id)
);

COMMENT ON TABLE public.community_members IS 'Members of each community with roles';

CREATE INDEX idx_community_members_community_id ON public.community_members(community_id);
CREATE INDEX idx_community_members_user_id ON public.community_members(user_id);
CREATE INDEX idx_community_members_role ON public.community_members(role);