-- ======================================================
-- fn_call_number_duel.sql
-- فراخوانی عدد تصادفی برای دوئل
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_call_number_duel(
    p_duel_id BIGINT
)
RETURNS INTEGER AS $$
DECLARE
    new_number INTEGER;
    current_numbers INTEGER[];
BEGIN
    SELECT called_numbers INTO current_numbers
    FROM public.duels
    WHERE id = p_duel_id
    FOR UPDATE;

    LOOP
        new_number := floor(random() * 90 + 1)::INT;
        EXIT WHEN NOT (new_number = ANY(current_numbers));
    END LOOP;

    UPDATE public.duels
    SET called_numbers = array_append(called_numbers, new_number)
    WHERE id = p_duel_id;

    RETURN new_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;