-- ======================================================
-- 20. STANDARD BINGO CARDS TABLE (100 cards)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.dobna_cards (
    id BIGSERIAL PRIMARY KEY,
    card_number INTEGER UNIQUE NOT NULL,
    row1 INTEGER[] NOT NULL,
    row2 INTEGER[] NOT NULL,
    row3 INTEGER[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.dobna_cards IS '100 standard Bingo cards (3x9)';
COMMENT ON COLUMN public.dobna_cards.card_number IS '1-100 (1-30 for duels, 1-60 for rooms, 1-100 for challenges)';

CREATE INDEX idx_dobna_cards_card_number ON public.dobna_cards(card_number);