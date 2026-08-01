-- ======================================================
-- fn_add_reaction.sql
-- ثبت ری‌اکشن روی یک دوئل یا چالش (idempotent)
-- ======================================================
CREATE OR REPLACE FUNCTION public.fn_add_reaction(
  p_giver_id UUID,
  p_receiver_id UUID,
  p_target_type TEXT,
  p_target_id BIGINT
)
RETURNS BOOLEAN AS $$
DECLARE
  inserted BOOLEAN := FALSE;
BEGIN
  IF p_giver_id = p_receiver_id THEN
    -- کد پایدار (نه متن فارسی) تا فرانت‌اند با t('errors.SELF_REACTION_NOT_ALLOWED')
    -- آن را به زبان انتخابی کاربر نمایش دهد
    RAISE EXCEPTION 'SELF_REACTION_NOT_ALLOWED';
  END IF;

  -- ری‌اکشن تکراری روی همان محتوا بی‌سروصدا نادیده گرفته می‌شود (نه خطا)
  INSERT INTO public.reactions (giver_id, receiver_id, target_type, target_id)
  VALUES (p_giver_id, p_receiver_id, p_target_type, p_target_id)
  ON CONFLICT (giver_id, target_type, target_id) DO NOTHING;

  GET DIAGNOSTICS inserted = ROW_COUNT;
  RETURN inserted > 0;
END;
$$ LANGUAGE plpgsql;
