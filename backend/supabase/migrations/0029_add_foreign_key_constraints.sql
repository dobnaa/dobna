-- ======================================================
-- 29. ADD FOREIGN KEY CONSTRAINTS (TO currencies)
-- ======================================================

ALTER TABLE public.user_balances
ADD CONSTRAINT fk_user_balances_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.communities
ADD CONSTRAINT fk_communities_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.transactions
ADD CONSTRAINT fk_transactions_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.rooms
ADD CONSTRAINT fk_rooms_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.duels
ADD CONSTRAINT fk_duels_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.challenges
ADD CONSTRAINT fk_challenges_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.deposit_addresses
ADD CONSTRAINT fk_deposit_addresses_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);

ALTER TABLE public.system_accounts
ADD CONSTRAINT fk_system_accounts_currency
FOREIGN KEY (currency) REFERENCES public.currencies(code);