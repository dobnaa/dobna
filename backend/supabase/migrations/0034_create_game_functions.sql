-- ======================================================
-- 0034_create_game_functions.sql
-- توابع مورد نیاز برای منطق بازی (فراخوانی اعداد، بررسی برنده، و ...)
-- ======================================================

-- ======================================================
-- ۱. تابع فراخوانی عدد تصادفی
-- ======================================================
CREATE OR REPLACE FUNCTION fn_call_number(room_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
  new_number INTEGER;
  current_numbers INTEGER[];
BEGIN
  -- دریافت اعداد قبلی فراخوانی‌شده برای این اتاق
  SELECT numbers_called INTO current_numbers FROM public.rooms WHERE id = room_id;
  
  -- پیدا کردن عدد جدید (۱ تا ۹۰) که قبلاً خوانده نشده باشد
  LOOP
    new_number := floor(random() * 90 + 1)::INT;
    EXIT WHEN NOT (new_number = ANY(current_numbers));
  END LOOP;
  
  -- بروزرسانی آرایه اعداد فراخوانی‌شده
  UPDATE public.rooms 
  SET numbers_called = array_append(numbers_called, new_number)
  WHERE id = room_id;
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_call_number IS 'فراخوانی یک عدد تصادفی جدید برای اتاق بازی و بروزرسانی آرایه اعداد';

-- ======================================================
-- ۲. تابع بررسی برنده (کارتی که هر ۱۵ عددش خوانده شده)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_check_winner(room_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
  called_nums INTEGER[];
  card_record RECORD;
  matched_count INTEGER;
BEGIN
  -- دریافت اعداد فراخوانی‌شده
  SELECT numbers_called INTO called_nums FROM public.rooms WHERE id = room_id;
  
  -- بررسی تمام کارت‌های فعال این اتاق
  FOR card_record IN 
    SELECT id, row1, row2, row3 
    FROM public.game_cards 
    WHERE room_id = room_id AND status = 'active'
  LOOP
    -- شمارش تعداد اعداد غیرصفر کارت که در called_nums وجود دارند
    SELECT COUNT(*) INTO matched_count
    FROM unnest(card_record.row1 || card_record.row2 || card_record.row3) AS num
    WHERE num != 0 AND num = ANY(called_nums);
    
    -- اگر هر ۱۵ عدد کارت خوانده شده باشد → برنده
    IF matched_count = 15 THEN
      RETURN card_record.id;
    END IF;
  END LOOP;
  
  RETURN NULL; -- هنوز برنده‌ای نیست
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_check_winner IS 'بررسی می‌کند کدام کارت در اتاق تمام ۱۵ عددش فراخوانی شده است';

-- ======================================================
-- ۳. تابع شروع بازی (اختیاری ولی توصیه‌شده)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_start_game(room_id BIGINT)
RETURNS VOID AS $$
BEGIN
  -- بروزرسانی وضعیت اتاق به 'active'
  UPDATE public.rooms
  SET status = 'active',
      started_at = NOW()
  WHERE id = room_id;
  
  -- در صورت نیاز، سایر عملیات اولیه (مثل reset کردن کارت‌ها) را انجام دهید
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_start_game IS 'شروع بازی در یک اتاق (تغییر وضعیت به active)';

-- ======================================================
-- ۴. تابع اتمام بازی و اعلام برنده (اختیاری)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_complete_game(room_id BIGINT, winner_card_id INTEGER)
RETURNS VOID AS $$
BEGIN
  -- بروزرسانی وضعیت اتاق به 'completed'
  UPDATE public.rooms
  SET status = 'completed',
      completed_at = NOW(),
      winner_id = (SELECT user_id FROM public.game_cards WHERE id = winner_card_id)
  WHERE id = room_id;
  
  -- بروزرسانی کارت برنده
  UPDATE public.game_cards
  SET is_winner = TRUE
  WHERE id = winner_card_id;
  
  -- در صورت نیاز، توزیع جوایز را اینجا فراخوانی کنید
  -- PERFORM fn_distribute_prize(room_id, winner_card_id);
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_complete_game IS 'پایان بازی و ثبت کارت برنده';

-- ======================================================
-- ۵. تابع اضافه کردن کاربر به اتاق و خرید کارت (نمونه)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_purchase_card(
  p_room_id BIGINT,
  p_user_id UUID,
  p_card_number INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_card_data RECORD;
BEGIN
  -- دریافت داده‌های کارت از جدول استاندارد
  SELECT row1, row2, row3 INTO v_card_data
  FROM public.dobna_cards
  WHERE card_number = p_card_number;
  
  -- درج کارت در جدول بازی
  INSERT INTO public.game_cards (
    room_id,
    user_id,
    card_number,
    row1,
    row2,
    row3,
    status
  ) VALUES (
    p_room_id,
    p_user_id,
    p_card_number,
    v_card_data.row1,
    v_card_data.row2,
    v_card_data.row3,
    'active'
  );
  
  -- افزایش تعداد کارت‌های اتاق
  UPDATE public.rooms
  SET total_cards = total_cards + 1
  WHERE id = p_room_id;
  
  -- اگر تعداد کارت‌ها به ۶۰ رسید، بازی را شروع کن
  IF (SELECT total_cards FROM public.rooms WHERE id = p_room_id) >= 60 THEN
    PERFORM fn_start_game(p_room_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_purchase_card IS 'خرید کارت توسط کاربر و درج در اتاق بازی';