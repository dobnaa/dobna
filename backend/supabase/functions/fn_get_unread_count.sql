-- دریافت تعداد پیام‌های نخوانده برای یک کاربر
CREATE OR REPLACE FUNCTION fn_get_unread_count(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM public.chat_messages
    WHERE receiver_id = p_user_id AND is_read = FALSE;
    
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;