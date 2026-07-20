-- حذف کاربر از گروه
CREATE OR REPLACE FUNCTION fn_remove_member_from_group(
    p_community_id BIGINT,
    p_user_id UUID,
    p_remover_id UUID
)
RETURNS VOID AS $$
DECLARE
    v_is_owner BOOLEAN;
BEGIN
    -- بررسی اینکه کاربر حذف‌کننده مالک یا ادمین است
    SELECT EXISTS (
        SELECT 1 FROM public.community_members
        WHERE community_id = p_community_id
          AND user_id = p_remover_id
          AND role IN ('owner', 'admin')
    ) INTO v_is_owner;

    IF NOT v_is_owner THEN
        RAISE EXCEPTION 'فقط مالک یا ادمین می‌تواند عضو را حذف کند';
    END IF;

    DELETE FROM public.community_members
    WHERE community_id = p_community_id AND user_id = p_user_id;

    UPDATE public.communities
    SET member_count = member_count - 1
    WHERE id = p_community_id;
END;
$$ LANGUAGE plpgsql;