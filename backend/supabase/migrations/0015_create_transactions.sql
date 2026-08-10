-- ======================================================
-- 0015_create_transactions.sql
-- جدول تراکنش‌ها (نسخه نهایی با همه ستون‌های مورد نیاز)
-- 
-- این جدول مرکز ثبت تمام تراکنش‌های مالی دوبنا است:
-- - واریز و برداشت رمزارز
-- - تبدیل (سوآپ) ارزها
-- - انتقال داخلی بین کاربران
-- - جوایز بازی، دوئل و چالش
-- - کارمزدها
-- - تراکنش‌های سیستمی
-- ======================================================

CREATE TABLE IF NOT EXISTS public.transactions (
    -- ======================================================
    -- ۱. شناسه‌ها و کلیدهای اصلی
    -- ======================================================
    id BIGSERIAL PRIMARY KEY,
    tx_id VARCHAR(100) UNIQUE,                     -- ✅ شناسه یکتا (برای Idempotency)
    
    -- ======================================================
    -- ۲. کاربر و نوع تراکنش
    -- ======================================================
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,                     -- deposit, withdraw, swap, transfer, game_win, duel_win, challenge_win, game_purchase, community_create, community_refund, lottery_burn, platform_fee, etc.
    
    -- ======================================================
    -- ۳. اطلاعات مالی
    -- ======================================================
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    fee DECIMAL(20,8) DEFAULT 0,
    balance_after DECIMAL(20,8),                   -- موجودی پس از تراکنش (برای ممیزی)
    usd_amount DECIMAL(20,4),                      -- ارزش دلاری (برای گزارش‌ها)
    
    -- ======================================================
    -- ۴. اطلاعات ارز مقصد (برای Swap و Transfer)
    -- ======================================================
    target_currency VARCHAR(20),
    target_amount DECIMAL(20,8),
    
    -- ======================================================
    -- ۵. اطلاعات شبکه و آدرس (برای واریز/برداشت)
    -- ======================================================
    network VARCHAR(30),                           -- BSC, TRC20, ERC20, Solana, ...
    address VARCHAR(255),                          -- آدرس مبدأ یا مقصد
    tx_hash VARCHAR(255),                          -- هش تراکنش در بلاک‌چین
    
    -- ======================================================
    -- ۶. اطلاعات گیرنده (برای Transfer داخلی)
    -- ======================================================
    recipient_did VARCHAR(100),                    -- DID گیرنده
    
    -- ======================================================
    -- ۷. ارجاع به رکوردهای دیگر
    -- ======================================================
    reference_id BIGINT,                           -- آیدی دوئل، چالش، گروه، یا سایر
    
    -- ======================================================
    -- ۸. وضعیت و توضیحات
    -- ======================================================
    status VARCHAR(20) DEFAULT 'pending',          -- pending, confirmed, failed, cancelled, completed
    description TEXT,                               -- توضیحات اختیاری (برای دیباگ)
    
    -- ======================================================
    -- ۹. زمان‌ها
    -- ======================================================
    created_at TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,                      -- زمان تأیید نهایی (برای واریز/برداشت)
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- ایندکس‌ها برای بهبود عملکرد
-- ======================================================
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_currency ON public.transactions(currency);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_tx_id ON public.transactions(tx_id);
CREATE INDEX IF NOT EXISTS idx_transactions_tx_hash ON public.transactions(tx_hash);
CREATE INDEX IF NOT EXISTS idx_transactions_reference_id ON public.transactions(reference_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_created ON public.transactions(user_id, created_at DESC);

-- ======================================================
-- کامنت‌های توضیحی (فقط برای توسعه‌دهندگان)
-- ======================================================
COMMENT ON TABLE public.transactions IS 'مرکز ثبت تمام تراکنش‌های مالی دوبنا';
COMMENT ON COLUMN public.transactions.tx_id IS 'شناسه یکتا (برای Idempotency و جلوگیری از واریز تکراری)';
COMMENT ON COLUMN public.transactions.type IS 'نوع تراکنش: deposit, withdraw, swap, transfer, game_win, duel_win, challenge_win, game_purchase, community_create, community_refund, lottery_burn, platform_fee, etc.';
COMMENT ON COLUMN public.transactions.currency IS 'ارز تراکنش (BTC, USDT, DUS, STARS, ...)';
COMMENT ON COLUMN public.transactions.amount IS 'مبلغ تراکنش (مثبت برای واریز، منفی برای برداشت)';
COMMENT ON COLUMN public.transactions.fee IS 'کارمزد تراکنش';
COMMENT ON COLUMN public.transactions.balance_after IS 'موجودی کاربر پس از تراکنش (برای ممیزی)';
COMMENT ON COLUMN public.transactions.usd_amount IS 'ارزش دلاری (برای گزارش‌ها و آمار)';
COMMENT ON COLUMN public.transactions.target_currency IS 'ارز مقصد (برای Swap و Transfer)';
COMMENT ON COLUMN public.transactions.target_amount IS 'مبلغ ارز مقصد (برای Swap و Transfer)';
COMMENT ON COLUMN public.transactions.network IS 'شبکه بلاک‌چین (BSC, TRC20, ERC20, Solana, ...)';
COMMENT ON COLUMN public.transactions.address IS 'آدرس مبدأ یا مقصد (برای واریز/برداشت)';
COMMENT ON COLUMN public.transactions.tx_hash IS 'هش تراکنش در بلاک‌چین (برای واریز/برداشت)';
COMMENT ON COLUMN public.transactions.recipient_did IS 'DID گیرنده (برای Transfer داخلی)';
COMMENT ON COLUMN public.transactions.reference_id IS 'ارجاع به رکورد دیگر (دوئل، چالش، گروه، ...)';
COMMENT ON COLUMN public.transactions.status IS 'وضعیت: pending, confirmed, failed, cancelled, completed';
COMMENT ON COLUMN public.transactions.description IS 'توضیحات اختیاری (برای دیباگ)';
COMMENT ON COLUMN public.transactions.confirmed_at IS 'زمان تأیید نهایی (برای واریز/برداشت)';

-- ======================================================
-- قیدهای اضافی برای یکپارچگی داده‌ها
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
-- تریگر برای به‌روزرسانی خودکار updated_at
-- ======================================================
CREATE OR REPLACE FUNCTION public.trg_update_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_transactions_updated_at ON public.transactions;
CREATE TRIGGER trg_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.trg_update_transactions_updated_at();

-- ======================================================
-- RLS (Row Level Security) ✅ اصلاح‌شده
-- ======================================================
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ۱. کاربران فقط می‌توانند تراکنش‌های خود را ببینند
CREATE POLICY "Users can view their own transactions" ON public.transactions
    FOR SELECT
    USING (auth.uid() = user_id);

-- ۲. ادمین می‌تواند همه تراکنش‌ها را ببیند
CREATE POLICY "Admins can view all transactions" ON public.transactions
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND is_admin = TRUE
        )
    );

-- ۳. ✅ اصلاح‌شده: فقط سیستم (از طریق توابع SECURITY DEFINER) می‌تواند تراکنش ایجاد کند
-- WITH CHECK (false) یعنی هیچ کاربری نمی‌تواند مستقیماً INSERT کند.
-- توابع SECURITY DEFINER با سطح دسترسی OWNER اجرا می‌شوند و این RLS را دور می‌زنند.
CREATE POLICY "System can insert transactions" ON public.transactions
    FOR INSERT
    WITH CHECK (false);   -- ✅ اصلاح: فقط توابع SECURITY DEFINER مجاز به INSERT هستند

-- ۴. کاربران نمی‌توانند تراکنش‌ها را حذف یا ویرایش کنند
CREATE POLICY "No one can delete transactions" ON public.transactions
    FOR DELETE
    USING (false);

CREATE POLICY "No one can update transactions" ON public.transactions
    FOR UPDATE
    USING (false);