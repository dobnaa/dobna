-- ======================================================
-- 18. PRICE HISTORY TABLE (Chart data)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.price_history (
    id BIGSERIAL PRIMARY KEY,
    currency_pair VARCHAR(20) NOT NULL,
    price DECIMAL(20,8) NOT NULL,
    volume DECIMAL(20,8),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.price_history IS 'Price history for charts (1H, 1D, 1W, 1M, YTD, ALL)';

CREATE INDEX idx_price_history_currency_pair ON public.price_history(currency_pair);
CREATE INDEX idx_price_history_timestamp ON public.price_history(timestamp);
CREATE INDEX idx_price_history_currency_pair_timestamp ON public.price_history(currency_pair, timestamp);