-- ======================================================
-- 3. PROFILES TABLE (User profiles with all personal info)
-- ======================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    did VARCHAR(16) UNIQUE NOT NULL,
    account_number VARCHAR(8) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    display_name VARCHAR(100),
    avatar VARCHAR(255),
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    national_id VARCHAR(20),
    bank_account_number VARCHAR(30),
    bank_card_number VARCHAR(20),
    bank_name VARCHAR(100),
    password_hash VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    is_support BOOLEAN DEFAULT FALSE,
    referred_by UUID REFERENCES public.profiles(id),
    referral_code VARCHAR(20) UNIQUE,
    total_referrals INTEGER DEFAULT 0,
    total_commission DECIMAL(20,8) DEFAULT 0,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'User profiles with all personal and bank information';
COMMENT ON COLUMN public.profiles.did IS '16-digit unique identifier (DID)';
COMMENT ON COLUMN public.profiles.account_number IS '8-digit account number';
COMMENT ON COLUMN public.profiles.is_verified IS 'Blue checkmark for verified users';

CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_phone ON public.profiles(phone);
CREATE INDEX idx_profiles_did ON public.profiles(did);
CREATE INDEX idx_profiles_account_number ON public.profiles(account_number);
CREATE INDEX idx_profiles_referred_by ON public.profiles(referred_by);
CREATE INDEX idx_profiles_is_verified ON public.profiles(is_verified);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);