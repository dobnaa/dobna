-- اتمام بازی اتاق و توزیع جوایز
CREATE OR REPLACE FUNCTION fn_complete_room_game(p_room_id BIGINT)
RETURNS VOID AS $$
DECLARE
    v_room RECORD;
    v_winner_card RECORD;
    v_total_pool DECIMAL(20,8);
    v_owner_share DECIMAL(20,8);
    v_bmc_share DECIMAL(20,8);
    v_lottery_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_line_share DECIMAL(20,8);
    v_full_share DECIMAL(20,8);
    v_community RECORD;
BEGIN
    SELECT * INTO v_room FROM public.rooms WHERE id = p_room_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'اتاق پیدا نشد';
    END IF;

    -- دریافت کارت برنده (پر)
    SELECT * INTO v_winner_card
    FROM public.game_cards
    WHERE room_id = p_room_id AND status = 'active'
    ORDER BY id LIMIT 1;

    v_total_pool := v_room.card_price * v_room.total_cards;
    v_owner_share := v_total_pool * 0.04;
    v_bmc_share := v_total_pool * 0.005;
    v_lottery_share := v_total_pool * 0.005;
    v_platform_share := v_total_pool * 0.05;
    v_line_share := v_total_pool * 0.09;
    v_full_share := v_total_pool * 0.81;

    SELECT * INTO v_community
    FROM public.communities
    WHERE id = v_room.community_id;

    -- واریز به مالک گروه
    UPDATE public.user_balances
    SET amount = amount + v_owner_share
    WHERE user_id = v_community.owner_id AND currency = v_room.currency;

    -- واریز به BMC گروه
    UPDATE public.communities
    SET bmc_amount = bmc_amount + v_bmc_share,
        bmc_added = bmc_added + v_bmc_share
    WHERE id = v_community.id;

    -- واریز به لاتاری گروه
    UPDATE public.communities
    SET lottery_amount = lottery_amount + v_lottery_share
    WHERE id = v_community.id;

    -- واریز کارمزد پلتفرم
    PERFORM fn_deposit_platform_fee(v_room.level, v_room.currency, v_platform_share);

    -- واریز به برنده پر و خطی (ساده‌سازی: همه به برنده پر)
    IF v_winner_card IS NOT NULL THEN
        UPDATE public.user_balances
        SET amount = amount + v_full_share + v_line_share
        WHERE user_id = v_winner_card.user_id AND currency = v_room.currency;
    END IF;

    UPDATE public.rooms
    SET status = 'completed', completed_at = NOW(),
        winner_id = v_winner_card.user_id
    WHERE id = p_room_id;

    UPDATE public.game_cards
    SET is_winner = TRUE
    WHERE room_id = p_room_id AND user_id = v_winner_card.user_id;
END;
$$ LANGUAGE plpgsql;