-- دنبال کردن یک کاربر
CREATE OR REPLACE FUNCTION fn_follow_user(
    p_follower_id UUID,
    p_following_id UUID
)
RETURNS VOID AS $$
BEGIN
    IF p_follower_id = p_following_id THEN
        RAISE EXCEPTION 'نمی‌توانید خودتان را دنبال کنید';
    END IF;

    INSERT INTO public.followers (follower_id, following_id)
    VALUES (p_follower_id, p_following_id)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;