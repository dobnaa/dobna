-- اتمام چالش و پرداخت جوایز
CREATE OR REPLACE FUNCTION fn_complete_challenge(p_challenge_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
    v_winner_id UUID;
    v_total_pool DECIMAL(20,8);
    v_creator_fee DECIMAL(20,8);
    v_platform_fee DECIMAL(20,8);
    v_winner_amount DECIMAL(20,8);
BEGIN
    -- دریافت اطلاعات چالش
    SELECT * INTO v_challenge
    FROM challenges
    WHERE id = p_challenge_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Challenge not found';
    END IF;

    -- پیدا کردن برنده
    SELECT winner_id INTO v_winner_id
    FROM game_cards
    WHERE room_id = (
        SELECT id FROM rooms WHERE challenge_id = p_challenge_id
    )
    AND status = 'winner'
    LIMIT 1;

    IF v_winner_id IS NULL THEN
        RAISE EXCEPTION 'No winner found';
    END IF;

    -- محاسبه مبالغ
    v_total_pool := v_challenge.amount * v_challenge.current_participants;
    v_creator_fee := v_total_pool * 0.20;
    v_platform_fee := v_total_pool * 0.05;
    v_winner_amount := v_total_pool - v_creator_fee - v_platform_fee;

    -- به‌روزرسانی چالش
    UPDATE challenges
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = v_winner_id,
        total_pool = v_total_pool,
        creator_fee = v_creator_fee,
        platform_fee = v_platform_fee
    WHERE id = p_challenge_id;

    -- واریز جایزه به برنده
    PERFORM fn_update_balance(v_winner_id, v_challenge.currency, v_winner_amount);

    -- واریز کارمزد سازنده
    PERFORM fn_update_balance(v_challenge.creator_id, v_challenge.currency, v_creator_fee);

    -- ثبت تراکنش‌ها
    INSERT INTO transactions (
        tx_id,
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status,
        description,
        created_at
    ) VALUES 
    (
        'WIN-' || v_challenge.challenge_id,
        v_winner_id,
        'challenge_win',
        v_challenge.currency,
        v_winner_amount,
        p_challenge_id,
        'completed',
        'Challenge win - ' || v_challenge.challenge_id,
        NOW()
    ),
    (
        'FEE-' || v_challenge.challenge_id,
        v_challenge.creator_id,
        'challenge_fee',
        v_challenge.currency,
        v_creator_fee,
        p_challenge_id,
        'completed',
        'Challenge creator fee - ' || v_challenge.challenge_id,
        NOW()
    );

    -- به‌روزرسانی آمار کاربران
    UPDATE user_stats
    SET total_wins = total_wins + 1,
        total_score = total_score + v_winner_amount
    WHERE user_id = v_winner_id;

    UPDATE user_stats
    SET total_challenges_created = total_challenges_created + 1
    WHERE user_id = v_challenge.creator_id;
END;
$$ LANGUAGE plpgsql;