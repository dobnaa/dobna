-- ======================================================
-- fn_call_number_challenge.sql
-- فراخوانی عدد تصادفی برای چالش
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_call_number_challenge(
    p_challenge_id BIGINT
)
RETURNS INTEGER AS $$
DECLARE
    new_number INTEGER;
    current_numbers INTEGER[];
BEGIN
    SELECT called_numbers INTO current_numbers
    FROM public.challenges
    WHERE id = p_challenge_id
    FOR UPDATE;

    LOOP
        new_number := floor(random() * 90 + 1)::INT;
        EXIT WHEN NOT (new_number = ANY(current_numbers));
    END LOOP;

    UPDATE public.challenges
    SET called_numbers = array_append(called_numbers, new_number)
    WHERE id = p_challenge_id;

    RETURN new_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;