-- ======================================================
-- fn_complete_room_game.sql
-- اتمام بازی در تالار گروه و توزیع وجوه از حساب GP گروه
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_complete_room_game(
    p_room_id BIGINT
)
RETURNS JSONB AS $$
DECLARE
    v_room RECORD;
    v_community RECORD;
    v_total_pool DECIMAL(20,8);
    v_owner_share DECIMAL(20,8);
    v_bmc_share DECIMAL(20,8);
    v_lottery_share DECIMAL(20,8);
    v_platform_share DECIMAL(20,8);
    v_line_share DECIMAL(20,8);
    v_full_share DECIMAL(20,8);
    v_winner_full UUID;
    v_winner_line UUID[];
    v_line_count INTEGER := 0;
    v_group_balance DECIMAL(20,8);
BEGIN
    -- ======================================================
    -- ۱. دریافت اطلاعات اتاق و گروه (با قفل)
    -- ======================================================
    SELECT * INTO v_room
    FROM public.rooms
    WHERE id = p_room_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'ROOM_NOT_FOUND');
    END IF;

    IF v_room.status != 'active' THEN
        RETURN jsonb_build_object('success', false, 'error', 'ROOM_NOT_ACTIVE');
    END IF;

    SELECT * INTO v_community
    FROM public.communities
    WHERE id = v_room.community_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'COMMUNITY_NOT_FOUND');
    END IF;

    -- ======================================================
    -- ۲. محاسبه کل مبلغ بر اساس تعداد کارت‌ها و قیمت هر کارت
    -- ======================================================
    v_total_pool := v_room.card_price * v_room.total_cards;

    IF v_total_pool <= 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'INVALID_POOL_AMOUNT');
    END IF;

    -- ======================================================
    -- ۳. بررسی موجودی حساب GP گروه
    -- ======================================================
    SELECT group_balance INTO v_group_balance
    FROM public.communities
    WHERE id = v_community.id;

    IF v_group_balance < v_total_pool THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'INSUFFICIENT_GROUP_BALANCE',
            'required', v_total_pool,
            'available', v_group_balance
        );
    END IF;

    -- ======================================================
    -- ۴. محاسبه سهم‌ها
    -- ======================================================
    v_owner_share := v_total_pool * 0.04;       -- ۴٪ مالک گروه
    v_bmc_share := v_total_pool * 0.005;        -- ۰.۵٪ BMC
    v_lottery_share := v_total_pool * 0.005;    -- ۰.۵٪ لاتاری
    v_platform_share := v_total_pool * 0.05;    -- ۵٪ کارمزد دوبنا
    v_line_share := v_total_pool * 0.09;        -- ۹٪ برنده‌های خطی
    v_full_share := v_total_pool * 0.81;        -- ۸۱٪ برنده پر

    -- ======================================================
    -- ۵. دریافت برنده‌ها از جدول game_cards
    -- ======================================================
    -- برنده پر (is_winner = TRUE)
    SELECT user_id INTO v_winner_full
    FROM public.game_cards
    WHERE room_id = p_room_id AND is_winner = TRUE
    LIMIT 1;

    IF v_winner_full IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'FULL_WINNER_NOT_FOUND');
    END IF;

    -- برندگان خطی (is_line_winner = TRUE)
    SELECT array_agg(user_id) INTO v_winner_line
    FROM public.game_cards
    WHERE room_id = p_room_id AND is_line_winner = TRUE;

    v_line_count := COALESCE(array_length(v_winner_line, 1), 0);

    -- ======================================================
    -- ۶. کسر کل مبلغ از حساب GP گروه
    -- ======================================================
    UPDATE public.communities
    SET group_balance = group_balance - v_total_pool
    WHERE id = v_community.id;

    -- ======================================================
    -- ۷. توزیع وجوه از حساب GP گروه به مقاصد نهایی
    -- ======================================================

    -- ۷.۱ واریز به برنده پر (۸۱٪)
    UPDATE public.user_balances
    SET amount = amount + v_full_share
    WHERE user_id = v_winner_full AND currency = v_room.currency;

    -- ۷.۲ واریز به برندگان خطی (۹٪ تقسیم بر تعداد)
    IF v_line_count > 0 THEN
        UPDATE public.user_balances
        SET amount = amount + (v_line_share / v_line_count)
        WHERE user_id = ANY(v_winner_line) AND currency = v_room.currency;
    END IF;

    -- ۷.۳ واریز به مالک گروه (۴٪)
    UPDATE public.user_balances
    SET amount = amount + v_owner_share
    WHERE user_id = v_community.owner_id AND currency = v_room.currency;

    -- ۷.۴ واریز به BMC گروه (۰.۵٪)
    UPDATE public.communities
    SET bmc_added = bmc_added + v_bmc_share
    WHERE id = v_community.id;

    -- ۷.۵ واریز به لاتاری گروه (۰.۵٪)
    UPDATE public.communities
    SET lottery_amount = lottery_amount + v_lottery_share
    WHERE id = v_community.id;

    -- ۷.۶ ✅ واریز کارمزد دوبنا (۵٪ بر اساس سطح) به حساب‌های ۰۰۰۰۰۰۰۱ تا ۰۰۰۰۰۰۰۴
    PERFORM fn_deposit_platform_fee('room', v_room.currency, v_platform_share, v_room.level);
    -- یا به‌جای خط بالا، می‌توانید از تابع کمکی استفاده کنید:
    -- PERFORM fn_deposit_room_fee(v_room.level, v_room.currency, v_platform_share);

    -- ======================================================
    -- ۸. به‌روزرسانی وضعیت اتاق و کارت‌ها
    -- ======================================================
    UPDATE public.rooms
    SET status = 'completed',
        completed_at = NOW(),
        winner_id = v_winner_full
    WHERE id = p_room_id;

    UPDATE public.game_cards
    SET status = 'completed'
    WHERE room_id = p_room_id;

    -- ======================================================
    -- ۹. ثبت تراکنش‌ها (با کدهای پایدار و user_id = NULL)
    -- ======================================================
    INSERT INTO public.transactions (
        user_id,
        type,
        currency,
        amount,
        reference_id,
        status
    ) VALUES
        (v_winner_full, 'game_win', v_room.currency, v_full_share, p_room_id, 'completed'),
        (NULL, 'game_line_win', v_room.currency, v_line_share, p_room_id, 'completed'),
        (v_community.owner_id, 'game_owner_fee', v_room.currency, v_owner_share, p_room_id, 'completed'),
        (NULL, 'game_platform_fee', v_room.currency, v_platform_share, p_room_id, 'completed');

    -- ======================================================
    -- ۱۰. خروجی موفقیت
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'room_id', p_room_id,
        'community_id', v_community.id,
        'total_pool', v_total_pool,
        'winner_full', v_winner_full,
        'winner_line_count', v_line_count,
        'owner_share', v_owner_share,
        'bmc_share', v_bmc_share,
        'lottery_share', v_lottery_share,
        'platform_share', v_platform_share
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'room_id', p_room_id
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_complete_room_game IS '
اتمام بازی در تالار گروه و توزیع وجوه از حساب GP گروه.
ورودی‌ها:
- p_room_id: شناسه اتاق بازی

خروجی: JSONB شامل اطلاعات توزیع وجوه

جریان مالی (از حساب GP گروه):
- ۸۱٪ به برنده پر
- ۹٪ به برنده‌های خطی (تقسیم بر تعداد)
- ۴٪ به مالک گروه
- ۰.۵٪ به BMC گروه
- ۰.۵٪ به لاتاری گروه
- ۵٪ کارمزد دوبنا (بر اساس سطح تالار)

خطاهای احتمالی (کدهای ثابت برای ترجمه در فرانت‌اند):
- ROOM_NOT_FOUND
- ROOM_NOT_ACTIVE
- COMMUNITY_NOT_FOUND
- INVALID_POOL_AMOUNT
- INSUFFICIENT_GROUP_BALANCE
- FULL_WINNER_NOT_FOUND
';