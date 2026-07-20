-- ======================================================
-- 8. GAME CARDS TABLE (Cards assigned to players in rooms)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.game_cards (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT REFERENCES public.rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_number INTEGER NOT NULL CHECK (card_number BETWEEN 1 AND 60),
    row1 INTEGER[] NOT NULL,
    row2 INTEGER[] NOT NULL,
    row3 INTEGER[] NOT NULL,
    is_winner BOOLEAN DEFAULT FALSE,
    is_line_winner BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (room_id, user_id, card_number)
);

COMMENT ON TABLE public.game_cards IS 'Bingo cards (3x9) assigned to players in game rooms';
COMMENT ON COLUMN public.game_cards.card_number IS '1-60 (for community games)';

CREATE INDEX idx_game_cards_room_id ON public.game_cards(room_id);
CREATE INDEX idx_game_cards_user_id ON public.game_cards(user_id);
CREATE INDEX idx_game_cards_is_winner ON public.game_cards(is_winner);