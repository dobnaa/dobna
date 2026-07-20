-- ======================================================
-- 15. TRANSACTIONS TABLE (Complete transaction history)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    fee DECIMAL(20,8) DEFAULT 0,
    balance_after DECIMAL(20,8),
    network VARCHAR(30),
    address VARCHAR(255),
    tx_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed', 'cancelled')),
    reference_id BIGINT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ
);

COMMENT ON TABLE public.transactions IS 'Complete transaction history for all operations';
COMMENT ON COLUMN public.transactions.type IS 'deposit, withdraw, swap, transfer, game_win, duel_win, etc.';
COMMENT ON COLUMN public.transactions.balance_after IS 'Balance after transaction (for auditing)';

CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(type);
CREATE INDEX idx_transactions_currency ON public.transactions(currency);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_reference_id ON public.transactions(reference_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);