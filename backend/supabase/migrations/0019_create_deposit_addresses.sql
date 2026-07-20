-- ======================================================
-- 19. DEPOSIT ADDRESSES TABLE (Crypto deposit addresses)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.deposit_addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    currency VARCHAR(10) NOT NULL,
    network VARCHAR(30) NOT NULL,
    address VARCHAR(255) NOT NULL UNIQUE,
    contract_address VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.deposit_addresses IS 'Deposit addresses for crypto (BSC, TRC20, ERC20, Solana, etc.)';
COMMENT ON COLUMN public.deposit_addresses.network IS 'BSC, TRC20, ERC20, Solana, Avalanche, TON, etc.';

CREATE INDEX idx_deposit_addresses_user_id ON public.deposit_addresses(user_id);
CREATE INDEX idx_deposit_addresses_address ON public.deposit_addresses(address);
CREATE INDEX idx_deposit_addresses_network ON public.deposit_addresses(network);