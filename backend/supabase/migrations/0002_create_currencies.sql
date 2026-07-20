-- ======================================================
-- 2. CURRENCIES TABLE (Master list of all currencies)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.currencies (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    name_fa VARCHAR(50),
    symbol VARCHAR(10),
    icon VARCHAR(50),
    type VARCHAR(20) NOT NULL CHECK (type IN ('crypto', 'fiat')),
    decimal_places INTEGER DEFAULT 8,
    price_usd DECIMAL(20,8) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_deposit_enabled BOOLEAN DEFAULT TRUE,
    is_withdraw_enabled BOOLEAN DEFAULT TRUE,
    is_swap_enabled BOOLEAN DEFAULT TRUE,
    min_deposit DECIMAL(20,8) DEFAULT 0,
    min_withdraw DECIMAL(20,8) DEFAULT 0,
    withdraw_fee DECIMAL(20,8) DEFAULT 0,
    network_list TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.currencies IS 'Master list of all supported currencies (crypto and fiat)';
COMMENT ON COLUMN public.currencies.code IS 'Unique currency code (BTC, USD, IRT, etc.)';
COMMENT ON COLUMN public.currencies.type IS 'crypto or fiat';
COMMENT ON COLUMN public.currencies.decimal_places IS 'Number of decimal places for display';
COMMENT ON COLUMN public.currencies.network_list IS 'Supported networks for crypto (BSC, TRC20, ERC20, Solana, etc.)';

CREATE INDEX idx_currencies_code ON public.currencies(code);
CREATE INDEX idx_currencies_type ON public.currencies(type);
CREATE INDEX idx_currencies_is_active ON public.currencies(is_active);