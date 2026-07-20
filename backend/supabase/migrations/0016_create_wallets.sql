-- ======================================================
-- 16. WALLETS TABLE (User wallet overview)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.wallets (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    total_balance_usd DECIMAL(20,8) DEFAULT 0,
    daily_interest DECIMAL(10,2) DEFAULT 0,
    interest_accrued DECIMAL(20,8) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.wallets IS 'User wallet with total USD value and daily interest';
COMMENT ON COLUMN public.wallets.daily_interest IS 'Daily interest (10% APY)';
COMMENT ON COLUMN public.wallets.interest_accrued IS 'Total accrued interest (can be withdrawn)';

CREATE INDEX idx_wallets_user_id ON public.wallets(user_id);