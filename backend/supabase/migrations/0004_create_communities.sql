-- ======================================================
-- 0004_create_communities.sql
-- ======================================================
CREATE TABLE IF NOT EXISTS public.communities (
    id BIGSERIAL PRIMARY KEY,
    gp_id VARCHAR(8) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    description TEXT,
    currency VARCHAR(10) NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- ✅ ستون جدید (به‌جای escrow_balance)
    group_balance DECIMAL(20,8) DEFAULT 0,
    
    bmc_amount DECIMAL(20,8) DEFAULT 0,
    bmc_initial DECIMAL(20,8) DEFAULT 0,
    bmc_added DECIMAL(20,8) DEFAULT 0,
    lottery_amount DECIMAL(20,8) DEFAULT 0,
    total_games_played INTEGER DEFAULT 0,
    total_cards_used INTEGER DEFAULT 0,
    total_fees_collected DECIMAL(20,8) DEFAULT 0,
    member_count INTEGER DEFAULT 0,
    online_count INTEGER DEFAULT 0,
    rank INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    invite_link VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON COLUMN public.communities.group_balance IS 
'موجودی حساب GP گروه (استخر نقدینگی موقت تالارهای بازی). 
مبالغ کارت‌های خریداری‌شده توسط کاربران در این حساب جمع‌آوری می‌شود 
و پس از پایان هر بازی، توزیع می‌گردد.';