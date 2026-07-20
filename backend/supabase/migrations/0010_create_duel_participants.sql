-- ======================================================
-- 10. DUEL PARTICIPANTS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS public.duel_participants (
    id BIGSERIAL PRIMARY KEY,
    duel_id BIGINT REFERENCES public.duels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_number INTEGER NOT NULL CHECK (card_number BETWEEN 1 AND 30),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (duel_id, user_id)
);

COMMENT ON TABLE public.duel_participants IS 'Participants in duels (1 card each, 1-30)';
COMMENT ON COLUMN public.duel_participants.card_number IS '1-30 (for duels)';

CREATE INDEX idx_duel_participants_duel_id ON public.duel_participants(duel_id);
CREATE INDEX idx_duel_participants_user_id ON public.duel_participants(user_id);