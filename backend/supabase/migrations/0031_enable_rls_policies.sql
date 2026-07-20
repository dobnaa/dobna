-- ======================================================
-- 31. ENABLE RLS AND CREATE POLICIES
-- ======================================================
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duel_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposit_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_cooldowns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;

-- ======================================================
-- CREATE RLS POLICIES
-- ======================================================

-- profiles: Users can read their own profile, admins can read all
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- communities: Anyone can read active communities
CREATE POLICY "Anyone can read active communities" ON public.communities
    FOR SELECT USING (is_active = true);
CREATE POLICY "Owners can update their communities" ON public.communities
    FOR UPDATE USING (auth.uid() = owner_id);

-- community_members: Members can read their communities
CREATE POLICY "Members can read community members" ON public.community_members
    FOR SELECT USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM public.community_members WHERE community_id = community_members.community_id AND user_id = auth.uid()
    ));
CREATE POLICY "Users can join communities" ON public.community_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- chat_messages: Users can read messages in their communities or private chats
CREATE POLICY "Users can read their chat messages" ON public.chat_messages
    FOR SELECT USING (
        auth.uid() = sender_id OR 
        auth.uid() = receiver_id OR 
        (community_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.community_members WHERE community_id = chat_messages.community_id AND user_id = auth.uid()
        ))
    );
CREATE POLICY "Users can send chat messages" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- notifications: Users can read their own notifications
CREATE POLICY "Users can read own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

-- transactions: Users can read their own transactions
CREATE POLICY "Users can read own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

-- wallets: Users can read their own wallet
CREATE POLICY "Users can read own wallet" ON public.wallets
    FOR SELECT USING (auth.uid() = user_id);

-- user_balances: Users can read their own balances
CREATE POLICY "Users can read own balances" ON public.user_balances
    FOR SELECT USING (auth.uid() = user_id);

-- duels: Users can read all duels, join waiting duels
CREATE POLICY "Anyone can read duels" ON public.duels
    FOR SELECT USING (true);
CREATE POLICY "Users can create duels" ON public.duels
    FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their duels" ON public.duels
    FOR UPDATE USING (auth.uid() = creator_id OR auth.uid() = opponent_id);
CREATE POLICY "Users can join waiting duels" ON public.duels
    FOR UPDATE USING (auth.uid() = opponent_id AND status = 'waiting');

-- challenges: Anyone can read challenges
CREATE POLICY "Anyone can read challenges" ON public.challenges
    FOR SELECT USING (true);
CREATE POLICY "Users can create challenges" ON public.challenges
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- reports: Users can create reports
CREATE POLICY "Users can create reports" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins can read reports" ON public.reports
    FOR SELECT USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);