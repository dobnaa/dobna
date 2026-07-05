-- تابع برای فراخوانی عدد تصادفی
CREATE OR REPLACE FUNCTION fn_call_number(room_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
  new_number INTEGER;
  current_numbers INTEGER[];
BEGIN
  -- دریافت اعداد قبلی
  SELECT numbers_called INTO current_numbers FROM public.rooms WHERE id = room_id;
  
  -- پیدا کردن عدد جدیدی که قبلاً نخوانده شده
  LOOP
    new_number := floor(random() * 90 + 1)::INT;
    EXIT WHEN NOT (new_number = ANY(current_numbers));
  END LOOP;
  
  -- بروزرسانی آرایه اعداد
  UPDATE public.rooms 
  SET numbers_called = array_append(numbers_called, new_number)
  WHERE id = room_id;
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- تابع بررسی برنده (چک می‌کند کدام کارت تمام ۱۵ عددش خوانده شده)
CREATE OR REPLACE FUNCTION fn_check_winner(room_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
  called_nums INTEGER[];
  card_record RECORD;
BEGIN
  SELECT numbers_called INTO called_nums FROM public.rooms WHERE id = room_id;
  
  FOR card_record IN 
    SELECT id, row1, row2, row3 FROM public.dobna_cards 
    WHERE room_id = room_id AND status = 'active'
  LOOP
    -- اگر همه ۱۵ عدد غیرصفر در آرایه called_nums وجود داشته باشد
    IF (SELECT COUNT(*) FROM unnest(card_record.row1 || card_record.row2 || card_record.row3) AS num
        WHERE num != 0 AND num = ANY(called_nums)) = 15 THEN
      RETURN card_record.id;
    END IF;
  END LOOP;
  RETURN NULL; -- هنوز برنده‌ای نیست
END;
$$ LANGUAGE plpgsql;