-- فراخوانی عدد تصادفی برای یک اتاق
CREATE OR REPLACE FUNCTION fn_call_number(p_room_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
    new_number INTEGER;
    current_numbers INTEGER[];
BEGIN
    -- دریافت اعداد قبلی
    SELECT called_numbers INTO current_numbers FROM public.rooms WHERE id = p_room_id;
    
    -- پیدا کردن عدد جدید (۱ تا ۹۰) که قبلاً نخوانده شده
    LOOP
        new_number := floor(random() * 90 + 1)::INT;
        EXIT WHEN NOT (new_number = ANY(current_numbers));
    END LOOP;
    
    -- بروزرسانی آرایه اعداد
    UPDATE public.rooms 
    SET called_numbers = array_append(called_numbers, new_number)
    WHERE id = p_room_id;
    
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;