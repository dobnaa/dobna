-- اضافه کردن کاربر به گروه
CREATE OR REPLACE FUNCTION fn_add_member_to_group(
    p_community_id BIGINT,
    p_user_id UUID,
    p_role VARCHAR(20) DEFAULT 'member'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.community_members (community_id, user_id, role, joined_at)
    VALUES (p_community_id, p_user_id, p_role, NOW())
    ON CONFLICT (community_id, user_id) DO NOTHING;

    -- افزایش تعداد اعضای گروه
    UPDATE public.communities
    SET member_count = member_count + 1
    WHERE id = p_community_id;
END;
$$ LANGUAGE plpgsql;