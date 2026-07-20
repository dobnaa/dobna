-- ارسال پیام (گروهی یا خصوصی)
CREATE OR REPLACE FUNCTION fn_send_message(
    p_sender_id UUID,
    p_content TEXT,
    p_receiver_id UUID DEFAULT NULL,
    p_community_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_message_id BIGINT;
BEGIN
    IF p_receiver_id IS NULL AND p_community_id IS NULL THEN
        RAISE EXCEPTION 'گیرنده یا گروه باید مشخص باشد';
    END IF;

    INSERT INTO public.chat_messages (
        sender_id, receiver_id, community_id, content, created_at
    ) VALUES (
        p_sender_id, p_receiver_id, p_community_id, p_content, NOW()
    ) RETURNING id INTO v_message_id;

    -- اگر خصوصی است، نوتیفیکیشن بده
    IF p_receiver_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, type, content, related_id)
        VALUES (
            p_receiver_id,
            'new_message',
            'پیام جدید از شما',
            v_message_id
        );
    END IF;

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql;