-- علامت‌گذاری پیام‌ها به عنوان خوانده‌شده
CREATE OR REPLACE FUNCTION fn_mark_messages_read(
    p_user_id UUID,
    p_chat_id BIGINT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    IF p_chat_id IS NOT NULL THEN
        UPDATE public.chat_messages
        SET is_read = TRUE
        WHERE receiver_id = p_user_id AND id = p_chat_id;
    ELSE
        UPDATE public.chat_messages
        SET is_read = TRUE
        WHERE receiver_id = p_user_id AND is_read = FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;