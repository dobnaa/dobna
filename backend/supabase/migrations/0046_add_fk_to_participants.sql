-- ======================================================
-- 0046_add_fk_to_participants.sql
-- اضافه کردن Foreign Key به dobna_cards
-- ======================================================

-- ۱. اضافه کردن FK به duel_participants
ALTER TABLE public.duel_participants
ADD CONSTRAINT fk_duel_participants_card_number
FOREIGN KEY (card_number) REFERENCES public.dobna_cards(card_number);

-- ۲. اضافه کردن FK به challenge_participants
ALTER TABLE public.challenge_participants
ADD CONSTRAINT fk_challenge_participants_card_number
FOREIGN KEY (card_number) REFERENCES public.dobna_cards(card_number);

-- ۳. ایجاد ایندکس برای بهینه‌سازی
CREATE INDEX IF NOT EXISTS idx_duel_participants_card_number 
ON public.duel_participants (card_number);

CREATE INDEX IF NOT EXISTS idx_challenge_participants_card_number 
ON public.challenge_participants (card_number);