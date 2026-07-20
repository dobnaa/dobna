-- ======================================================
-- 12. CHALLENGE PARTICIPANTS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS public.challenge_participants (
    id BIGSERIAL PRIMARY KEY,
    challenge_id BIGINT REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_number INTEGER NOT NULL CHECK (card_number BETWEEN 1 AND 100),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (challenge_id, user_id)
);

COMMENT ON TABLE public.challenge_participants IS 'Participants in challenges (1 card each, 1-100)';
COMMENT ON COLUMN public.challenge_participants.card_number IS '1-100 (for challenges)';

CREATE INDEX idx_challenge_participants_challenge_id ON public.challenge_participants(challenge_id);
CREATE INDEX idx_challenge_participants_user_id ON public.challenge_participants(user_id);