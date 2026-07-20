-- لغو دنبال کردن یک کاربر
CREATE OR REPLACE FUNCTION fn_unfollow_user(
    p_follower_id UUID,
    p_following_id UUID
)
RETURNS VOID AS $$
BEGIN
    DELETE FROM public.followers
    WHERE follower_id = p_follower_id AND following_id = p_following_id;
END;
$$ LANGUAGE plpgsql;