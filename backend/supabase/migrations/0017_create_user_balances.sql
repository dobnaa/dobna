-- ======================================================
-- 17. USER BALANCES TABLE (Balance per currency)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.user_balances (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) DEFAULT 0,
    locked_amount DECIMAL(20,8) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, currency)
);

COMMENT ON TABLE public.user_balances IS 'User balance per currency';
COMMENT ON COLUMN public.user_balances.locked_amount IS 'Locked for duels and games in progress';

CREATE INDEX idx_user_balances_user_id ON public.user_balances(user_id);
CREATE INDEX idx_user_balances_currency ON public.user_balances(currency);