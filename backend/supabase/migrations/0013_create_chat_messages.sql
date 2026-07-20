-- ======================================================
-- 13. CHAT MESSAGES TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id BIGSERIAL PRIMARY KEY,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.profiles(id),
    community_id BIGINT REFERENCES public.communities(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    reply_to_id BIGINT REFERENCES public.chat_messages(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.chat_messages IS 'Chat messages (private, group, system)';
COMMENT ON COLUMN public.chat_messages.receiver_id IS 'NULL for group chats';
COMMENT ON COLUMN public.chat_messages.community_id IS 'NULL for private chats';
COMMENT ON COLUMN public.chat_messages.is_pinned IS 'Pinned by group owner/admin';

CREATE INDEX idx_chat_messages_sender_id ON public.chat_messages(sender_id);
CREATE INDEX idx_chat_messages_receiver_id ON public.chat_messages(receiver_id);
CREATE INDEX idx_chat_messages_community_id ON public.chat_messages(community_id);
CREATE INDEX idx_chat_messages_is_read ON public.chat_messages(is_read);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);