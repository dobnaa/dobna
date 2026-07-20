-- غیرفعال کردن کاربر توسط پشتیبانی
CREATE OR REPLACE FUNCTION fn_deactivate_user(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET is_active = FALSE
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;