-- دریافت دوستان مشترک بین دو کاربر
CREATE OR REPLACE FUNCTION fn_get_mutual_friends(
    p_user1_id UUID,
    p_user2_id UUID
)
RETURNS TABLE(user_id UUID, username VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT f1.following_id AS user_id, p.username
    FROM public.followers f1
    INNER JOIN public.followers f2 ON f2.following_id = f1.following_id
    INNER JOIN public.profiles p ON p.id = f1.following_id
    WHERE f1.follower_id = p_user1_id
      AND f2.follower_id = p_user2_id;
END;
$$ LANGUAGE plpgsql;