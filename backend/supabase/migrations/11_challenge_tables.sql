-- جدول چالش‌ها
CREATE TABLE IF NOT EXISTS public.challenges (
    id BIGSERIAL PRIMARY KEY,
    challenge_id VARCHAR(20) UNIQUE NOT NULL,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
    max_participants INTEGER DEFAULT 100,
    current_participants INTEGER DEFAULT 1,
    min_participants INTEGER DEFAULT 5,
    expires_at TIMESTAMPTZ NOT NULL,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    winner_id UUID REFERENCES public.profiles(id),
    total_pool DECIMAL(20,8) DEFAULT 0,
    creator_fee DECIMAL(20,8) DEFAULT 0,
    platform_fee DECIMAL(20,8) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول شرکت‌کنندگان در چالش
CREATE TABLE IF NOT EXISTS public.challenge_participants (
    id BIGSERIAL PRIMARY KEY,
    challenge_id BIGINT REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_number INTEGER NOT NULL CHECK (card_number BETWEEN 1 AND 100),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (challenge_id, user_id)
);

-- جدول دوئل‌ها (به‌روز شده)
CREATE TABLE IF NOT EXISTS public.duels (
    id BIGSERIAL PRIMARY KEY,
    duel_id VARCHAR(20) UNIQUE NOT NULL,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opponent_id UUID REFERENCES public.profiles(id),
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
    type VARCHAR(20) NOT NULL CHECK (type IN ('public', 'private')),
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
    expires_at TIMESTAMPTZ NOT NULL,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    winner_id UUID REFERENCES public.profiles(id),
    fee DECIMAL(20,8) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول شرکت‌کنندگان در دوئل
CREATE TABLE IF NOT EXISTS public.duel_participants (
    id BIGSERIAL PRIMARY KEY,
    duel_id BIGINT REFERENCES public.duels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_number INTEGER NOT NULL CHECK (card_number BETWEEN 1 AND 30),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (duel_id, user_id)
);

-- جدول آمار کاربران (برای محاسبه سطوح آزاد شده)
CREATE TABLE IF NOT EXISTS public.user_stats (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    total_games_played INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_score DECIMAL(20,8) DEFAULT 0,
    total_challenges_created INTEGER DEFAULT 0,
    total_challenges_won INTEGER DEFAULT 0,
    total_duels_created INTEGER DEFAULT 0,
    total_duels_won INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ایندکس‌ها
CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_challenges_expires_at ON public.challenges(expires_at);
CREATE INDEX idx_challenges_creator_id ON public.challenges(creator_id);
CREATE INDEX idx_duels_status ON public.duels(status);
CREATE INDEX idx_duels_expires_at ON public.duels(expires_at);
CREATE INDEX idx_duels_creator_id ON public.duels(creator_id);
CREATE INDEX idx_duels_opponent_id ON public.duels(opponent_id);

-- RLS Policies
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duel_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Policy برای چالش‌ها
CREATE POLICY "Users can view all challenges" ON public.challenges
    FOR SELECT USING (true);

CREATE POLICY "Users can create challenges" ON public.challenges
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own challenges" ON public.challenges
    FOR UPDATE USING (auth.uid() = creator_id);

-- Policy برای دوئل‌ها
CREATE POLICY "Users can view all duels" ON public.duels
    FOR SELECT USING (true);

CREATE POLICY "Users can create duels" ON public.duels
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own duels" ON public.duels
    FOR UPDATE USING (auth.uid() = creator_id OR auth.uid() = opponent_id);