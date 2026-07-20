-- ======================================================
-- 21. SYSTEM ACCOUNTS TABLE (Platform fee accounts) + Seed Data
-- ======================================================
CREATE TABLE IF NOT EXISTS public.system_accounts (
    id BIGSERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    currency VARCHAR(10) NOT NULL,
    balance DECIMAL(20,8) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.system_accounts IS 'System accounts for fees and escrow';
COMMENT ON COLUMN public.system_accounts.account_number IS '11111111, 00000001 - 00000008';

CREATE INDEX idx_system_accounts_account_number ON public.system_accounts(account_number);

-- Insert system accounts
INSERT INTO public.system_accounts (account_number, name, description, currency) VALUES
('11111111', 'حساب مرکزی', 'نگهداری موقت وجوه دوئل و چالش', 'ALL'),
('00000001', 'کارمزد تالار سطح ۱', 'کارمزد بازی‌های سطح ۱ (5%)', 'ALL'),
('00000002', 'کارمزد تالار سطح ۲', 'کارمزد بازی‌های سطح ۲ (5%)', 'ALL'),
('00000003', 'کارمزد تالار سطح ۳', 'کارمزد بازی‌های سطح ۳ (5%)', 'ALL'),
('00000004', 'کارمزد تالار سطح ۴', 'کارمزد بازی‌های سطح ۴ (5%)', 'ALL'),
('00000005', 'کارمزد دوئل', 'کارمزد دوئل‌ها (5%)', 'ALL'),
('00000006', 'کارمزد چالش', 'کارمزد چالش‌ها (5%)', 'ALL'),
('00000007', 'کارمزد سوآپ', 'کارمزد تبدیل ارزها', 'ALL'),
('00000008', 'کارمزد انتقال', 'کارمزد انتقال داخلی', 'ALL')
ON CONFLICT (account_number) DO NOTHING;