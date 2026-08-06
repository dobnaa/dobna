-- ======================================================
-- fn_check_and_cancel_room.sql
-- بررسی اتاق‌های منقضی‌شده و لغو آن‌ها در صورت عدم وجود بازیکن کافی
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_check_and_cancel_room()
RETURNS JSONB AS $$
DECLARE
    v_room RECORD;
    v_player_count INTEGER;
    v_refund_amount DECIMAL(20,8);
    v_total_refund DECIMAL(20,8);
    v_result JSONB;
BEGIN
    v_total_refund := 0;

    -- ======================================================
    -- ۱. پیدا کردن اتاق‌های منقضی‌شده (waiting با تایمر تمام‌شده)
    -- ======================================================
    FOR v_room IN
        SELECT 
            r.id,
            r.community_id,
            r.card_price,
            r.currency,
            r.created_at,
            EXTRACT(EPOCH FROM (NOW() - r.created_at)) AS elapsed_seconds
        FROM public.rooms r
        WHERE r.status = 'waiting'
          AND EXTRACT(EPOCH FROM (NOW() - r.created_at)) >= 150  -- ۱۵۰ ثانیه
          AND r.total_cards > 0  -- حداقل یک کارت فروخته شده
    LOOP
        -- ======================================================
        -- ۲. شمارش بازیکنان منحصر‌به‌فرد در این اتاق
        -- ======================================================
        SELECT COUNT(DISTINCT user_id) INTO v_player_count
        FROM public.game_cards
        WHERE room_id = v_room.id;

        -- ======================================================
        -- ۳. اگر کمتر از ۲ بازیکن باشد → لغو اتاق
        -- ======================================================
        IF v_player_count < 2 THEN
            -- ۳.۱ محاسبه مبلغ قابل بازگشت (کل مبلغ کارت‌های فروخته‌شده)
            v_refund_amount := v_room.card_price * v_room.total_cards;

            -- ۳.۲ بازگرداندن مبلغ به هر کاربر (به‌صورت جداگانه)
            FOR v_user IN
                SELECT 
                    gc.user_id,
                    COUNT(gc.id) AS card_count
                FROM public.game_cards gc
                WHERE gc.room_id = v_room.id
                GROUP BY gc.user_id
            LOOP
                -- بازگرداندن به حساب کاربر
                UPDATE public.user_balances
                SET amount = amount + (v_room.card_price * v_user.card_count)
                WHERE user_id = v_user.user_id AND currency = v_room.currency;

                -- ثبت تراکنش برگشت
                INSERT INTO public.transactions (
                    user_id,
                    type,
                    currency,
                    amount,
                    reference_id,
                    status
                ) VALUES (
                    v_user.user_id,
                    'game_refund',
                    v_room.currency,
                    v_room.card_price * v_user.card_count,
                    v_room.id,
                    'completed'
                );
            END LOOP;

            -- ۳.۳ کسر از حساب GP گروه
            UPDATE public.communities
            SET group_balance = group_balance - v_refund_amount
            WHERE id = v_room.community_id;

            -- ۳.۴ به‌روزرسانی وضعیت اتاق به 'cancelled'
            UPDATE public.rooms
            SET status = 'cancelled',
                completed_at = NOW()
            WHERE id = v_room.id;

            -- ۳.۵ حذف کارت‌های این اتاق (اختیاری)
            DELETE FROM public.game_cards
            WHERE room_id = v_room.id;

            v_total_refund := v_total_refund + v_refund_amount;

            -- لاگ موفقیت
            RAISE NOTICE '✅ اتاق % لغو شد. تعداد بازیکنان: %، مبلغ برگشتی: % %',
                v_room.id, v_player_count, v_refund_amount, v_room.currency;
        END IF;
    END LOOP;

    -- ======================================================
    -- ۴. خروجی
    -- ======================================================
    RETURN jsonb_build_object(
        'success', true,
        'total_refund', v_total_refund,
        'timestamp', NOW()
    );

EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_check_and_cancel_room IS '
بررسی اتاق‌های منقضی‌شده (۱۵۰ ثانیه) و لغو آن‌ها در صورت داشتن کمتر از ۲ بازیکن.
- بازگرداندن مبلغ به کاربران
- کسر از حساب GP گروه
- تغییر وضعیت اتاق به cancelled
';





-- ======================================================
-- اضافه کردن fn_check_and_cancel_room به کرون‌جاب
-- ======================================================
SELECT cron.schedule(
    'check-and-cancel-room',      -- نام کرون‌جاب
    '* * * * *',                  -- هر دقیقه
    $$
    SELECT fn_check_and_cancel_room();
    $$
);
