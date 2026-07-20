-- سنجاق کردن پیام توسط مالک/مدیر گروه
CREATE OR REPLACE FUNCTION fn_pin_message(
    p_message_id BIGINT,
    p_user_id UUID,
    p_community_id BIGINT
)
RETURNS VOID AS $$
DECLARE
    v_is_owner BOOLEAN;
BEGIN
    -- بررسی اینکه کاربر مالک یا ادمین گروه است
    SELECT EXISTS (
        SELECT 1 FROM public.community_members
        WHERE community_id = p_community_id
          AND user_id = p_user_id
          AND role IN ('owner', 'admin')
    ) INTO v_is_owner;

    IF NOT v_is_owner THEN
        RAISE EXCEPTION 'فقط مالک یا ادمین گروه می‌تواند پیام را سنجاق کند';
    END IF;

    UPDATE public.chat_messages
    SET is_pinned = TRUE
    WHERE id = p_message_id AND community_id = p_community_id;
END;
$$ LANGUAGE plpgsql;