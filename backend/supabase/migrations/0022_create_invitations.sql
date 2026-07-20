-- ======================================================
-- 22. INVITATIONS TABLE (Referral system)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.invitations (
    id BIGSERIAL PRIMARY KEY,
    inviter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    invitee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    invite_code VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
    reward_amount DECIMAL(20,8) DEFAULT 0,
    reward_currency VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    UNIQUE (inviter_id, invitee_id)
);

COMMENT ON TABLE public.invitations IS 'Referral/invitation system with rewards';

CREATE INDEX idx_invitations_inviter_id ON public.invitations(inviter_id);
CREATE INDEX idx_invitations_invitee_id ON public.invitations(invitee_id);
CREATE INDEX idx_invitations_invite_code ON public.invitations(invite_code);
CREATE INDEX idx_invitations_status ON public.invitations(status);