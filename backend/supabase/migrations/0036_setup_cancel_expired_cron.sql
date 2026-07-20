-- ======================================================
-- 0036_setup_cancel_expired_cron.sql
-- راه‌اندازی Cron Job برای لغو خودکار دوئل‌ها و چالش‌های منقضی‌شده
-- ======================================================

-- ======================================================
-- ۱. اطمینان از فعال بودن اکستنشن‌های مورد نیاز
-- ======================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ======================================================
-- ۲. ایجاد توابع کمکی در دیتابیس (اگر قبلاً ایجاد نشده‌اند)
-- ======================================================

-- تابع لغو دوئل‌های منقضی‌شده
CREATE OR REPLACE FUNCTION fn_cancel_expired_duels()
RETURNS VOID AS $$
DECLARE
    v_duel RECORD;
BEGIN
    FOR v_duel IN 
        SELECT * FROM public.duels
        WHERE status = 'waiting' 
          AND NOW() > expires_at
          AND expires_at IS NOT NULL
    LOOP
        -- بازگرداندن مبلغ به سازنده
        PERFORM fn_refund_from_escrow(
            v_duel.creator_id,
            v_duel.currency,
            v_duel.amount
        );
        
        -- به‌روزرسانی وضعیت
        UPDATE public.duels
        SET status = 'cancelled',
            completed_at = NOW()
        WHERE id = v_duel.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_cancel_expired_duels IS 'لغو خودکار دوئل‌های منقضی‌شده و بازگرداندن مبالغ';


-- تابع لغو چالش‌های منقضی‌شده (زیر ۵ نفر)
CREATE OR REPLACE FUNCTION fn_cancel_expired_challenges()
RETURNS VOID AS $$
DECLARE
    v_challenge RECORD;
    v_participant RECORD;
BEGIN
    FOR v_challenge IN 
        SELECT * FROM public.challenges
        WHERE status = 'waiting' 
          AND NOW() > expires_at
          AND expires_at IS NOT NULL
    LOOP
        -- اگر کمتر از ۵ نفر شرکت‌کننده دارد
        IF v_challenge.current_participants < v_challenge.min_participants THEN
            -- بازگرداندن مبلغ به همه شرکت‌کنندگان
            FOR v_participant IN 
                SELECT user_id FROM public.challenge_participants
                WHERE challenge_id = v_challenge.id
            LOOP
                PERFORM fn_refund_from_escrow(
                    v_participant.user_id,
                    v_challenge.currency,
                    v_challenge.amount
                );
            END LOOP;
            
            -- به‌روزرسانی وضعیت
            UPDATE public.challenges
            SET status = 'cancelled',
                completed_at = NOW()
            WHERE id = v_challenge.id;
        ELSE
            -- اگر حداقل ۵ نفر بود، چالش را شروع کن
            PERFORM fn_start_challenge(v_challenge.id);
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_cancel_expired_challenges IS 'لغو خودکار چالش‌های منقضی‌شده (زیر ۵ نفر) و شروع چالش‌های دارای ۵ نفر یا بیشتر';


-- ======================================================
-- ۳. حذف Cron Job قبلی (در صورت وجود)
-- ======================================================
SELECT cron.unschedule('cancel-expired-every-minute');


-- ======================================================
-- ۴. ایجاد Cron Job جدید
-- ======================================================
SELECT cron.schedule(
    'cancel-expired-every-minute',  -- نام Cron Job (یکتا)
    '* * * * *',                    -- زمان‌بندی: هر دقیقه
    $$
    SELECT pg_cron.schedule(
        'cancel-expired-internal',
        '*/1 * * * *',
        $$
        SELECT fn_cancel_expired_duels();
        SELECT fn_cancel_expired_challenges();
        $$
    );
    $$
);


-- ======================================================
-- ۵. روش جایگزین: فراخوانی Edge Function (در صورت نیاز)
-- ======================================================
-- اگر ترجیح می‌دهید به جای توابع دیتابیس، از Edge Function استفاده کنید
-- این بخش را در صورت نیاز فعال کنید

/*
SELECT cron.schedule(
    'cancel-expired-via-edge',
    '* * * * *',
    $$
    SELECT net.http_post(
        url := 'https://' || current_setting('app.settings.project_ref') || '.functions.supabase.co/cancel-expired',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
        ),
        body := jsonb_build_object('time', now())
    ) AS request_id;
    $$
);
*/


-- ======================================================
-- ۶. ثبت لاگ موفقیت
-- ======================================================
DO $$
BEGIN
    RAISE NOTICE '✅ Cron Job "cancel-expired-every-minute" با موفقیت تنظیم شد';
    RAISE NOTICE '⏰ این Job هر دقیقه اجرا می‌شود و دوئل‌ها و چالش‌های منقضی‌شده را بررسی می‌کند';
END;
$$;


-- ======================================================
-- ۷. دستورات کمکی برای مشاهده و مدیریت Cron Jobs
-- ======================================================

-- مشاهده همه Cron Jobs فعال
-- SELECT * FROM cron.job;

-- مشاهده تاریخچه اجرای Cron Jobs
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;

-- حذف Cron Job
-- SELECT cron.unschedule('cancel-expired-every-minute');