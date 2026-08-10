-- ======================================================
-- 0048_crypto_gateway_tables.sql
-- تکمیل جداول و ستون‌های مورد نیاز درگاه پرداخت رمزارزی
-- ======================================================

-- ======================================================
-- ۱. اضافه کردن ستون‌های مورد نیاز به جدول transactions
-- ======================================================
ALTER TABLE public.transactions
ADD COLUMN IF NOT EXISTS tx_hash VARCHAR(255),
ADD COLUMN IF NOT EXISTS network VARCHAR(30),
ADD COLUMN IF NOT EXISTS address VARCHAR(255),
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ;

COMMENT ON COLUMN public.transactions.tx_hash IS 'هش تراکنش در بلاک‌چین';
COMMENT ON COLUMN public.transactions.network IS 'شبکه بلاک‌چین (BSC, TRC20, ERC20, Solana)';
COMMENT ON COLUMN public.transactions.address IS 'آدرس مقصد یا مبدأ';

-- ======================================================
-- ۲. اضافه کردن ستون‌های مورد نیاز به جدول currencies
-- ======================================================
ALTER TABLE public.currencies
ADD COLUMN IF NOT EXISTS min_deposit DECIMAL(20,8) DEFAULT 0,
ADD COLUMN IF NOT EXISTS min_withdraw DECIMAL(20,8) DEFAULT 0,
ADD COLUMN IF NOT EXISTS withdraw_fee DECIMAL(20,8) DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_deposit_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS is_withdraw_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS network_list TEXT[] DEFAULT '{}';

COMMENT ON COLUMN public.currencies.min_deposit IS 'حداقل مبلغ واریز';
COMMENT ON COLUMN public.currencies.min_withdraw IS 'حداقل مبلغ برداشت';
COMMENT ON COLUMN public.currencies.withdraw_fee IS 'کارمزد برداشت';
COMMENT ON COLUMN public.currencies.network_list IS 'لیست شبکه‌های پشتیبانی‌شده';

-- ======================================================
-- ۳. اضافه کردن قید UNIQUE برای tx_id (Idempotency)
-- ======================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'transactions_tx_id_unique'
    ) THEN
        ALTER TABLE public.transactions
        ADD CONSTRAINT transactions_tx_id_unique UNIQUE (tx_id);
    END IF;
END $$;

-- ======================================================
-- ۴. اضافه کردن ایندکس‌ها برای بهینه‌سازی
-- ======================================================
CREATE INDEX IF NOT EXISTS idx_transactions_tx_hash ON public.transactions(tx_hash);
CREATE INDEX IF NOT EXISTS idx_transactions_network ON public.transactions(network);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_confirmed_at ON public.transactions(confirmed_at);
CREATE INDEX IF NOT EXISTS idx_deposit_addresses_address ON public.deposit_addresses(address);
CREATE INDEX IF NOT EXISTS idx_deposit_addresses_user_currency ON public.deposit_addresses(user_id, currency);

-- ======================================================
-- ۵. به‌روزرسانی داده‌های ارزها با تنظیمات واریز/برداشت
-- ======================================================
UPDATE public.currencies SET
    min_deposit = 0.0001,
    min_withdraw = 0.0001,
    withdraw_fee = 0.00005,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = TRUE,
    network_list = ARRAY['BTC', 'Lightning']
WHERE code = 'BTC';

UPDATE public.currencies SET
    min_deposit = 0.01,
    min_withdraw = 0.01,
    withdraw_fee = 0.005,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = TRUE,
    network_list = ARRAY['ERC20']
WHERE code = 'ETH';

UPDATE public.currencies SET
    min_deposit = 0.1,
    min_withdraw = 0.1,
    withdraw_fee = 0.05,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = TRUE,
    network_list = ARRAY['BSC(BEP20)', 'TRC20', 'ERC20', 'Solana']
WHERE code = 'USDT';

UPDATE public.currencies SET
    min_deposit = 0.01,
    min_withdraw = 0.01,
    withdraw_fee = 0.005,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = TRUE,
    network_list = ARRAY['Solana']
WHERE code = 'SOL';

UPDATE public.currencies SET
    min_deposit = 0.01,
    min_withdraw = 0.01,
    withdraw_fee = 0.005,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = TRUE,
    network_list = ARRAY['BSC(BEP20)']
WHERE code = 'BNB';

UPDATE public.currencies SET
    min_deposit = 1,
    min_withdraw = 1,
    withdraw_fee = 0.5,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = TRUE,
    network_list = ARRAY['DOGE']
WHERE code = 'DOGE';

-- Stars تلگرام (فقط واریز دارد)
UPDATE public.currencies SET
    min_deposit = 1,
    min_withdraw = NULL,
    withdraw_fee = NULL,
    is_deposit_enabled = TRUE,
    is_withdraw_enabled = FALSE,
    network_list = ARRAY['Telegram']
WHERE code = 'STARS';

-- DUS (فقط داخلی، بدون واریز/برداشت خارجی)
UPDATE public.currencies SET
    min_deposit = NULL,
    min_withdraw = NULL,
    withdraw_fee = NULL,
    is_deposit_enabled = FALSE,
    is_withdraw_enabled = FALSE,
    network_list = ARRAY['Internal']
WHERE code = 'DUS';