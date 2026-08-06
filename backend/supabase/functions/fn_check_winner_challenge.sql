-- ======================================================
-- fn_check_winner_challenge.sql
-- بررسی برنده در چالش (با JOIN به dobna_cards)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_check_winner_challenge(
    p_challenge_id BIGINT
)
RETURNS UUID AS $$
DECLARE
    called_nums INTEGER[];
    participant_record RECORD;
    card_record RECORD;
    matched_count INTEGER;
BEGIN
    -- دریافت اعداد فراخوانی‌شده
    SELECT called_numbers INTO called_nums
    FROM public.challenges
    WHERE id = p_challenge_id;

    IF called_nums IS NULL OR array_length(called_nums, 1) IS NULL THEN
        RETURN NULL;
    END IF;

    -- بررسی هر شرکت‌کننده (با JOIN به dobna_cards)
    FOR participant_record IN
        SELECT 
            cp.user_id,
            cp.card_number,
            dc.row1,
            dc.row2,
            dc.row3
        FROM public.challenge_participants cp
        JOIN public.dobna_cards dc ON dc.card_number = cp.card_number
        WHERE cp.challenge_id = p_challenge_id
    LOOP
        -- شمارش تعداد اعداد غیرصفر کارت که در called_nums وجود دارند
        SELECT COUNT(*) INTO matched_count
        FROM unnest(
            participant_record.row1 || 
            participant_record.row2 || 
            participant_record.row3
        ) AS num
        WHERE num != 0 AND num = ANY(called_nums);

        -- اگر هر ۱۵ عدد کارت خوانده شده باشد → برنده
        IF matched_count = 15 THEN
            RETURN participant_record.user_id;
        END IF;
    END LOOP;

    RETURN NULL; -- هنوز برنده‌ای نیست
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_check_winner_challenge IS '
بررسی برنده در چالش با JOIN به dobna_cards.
کارت‌های شرکت‌کنندگان در dobna_cards ذخیره شده‌اند و با card_number جوین می‌شوند.
';