-- ======================================================
-- 32. ENABLE REALTIME FOR REQUIRED TABLES
-- ======================================================
-- این فایل بعد از ایجاد همه جداول اجرا می‌شود
-- (شماره 0032 بالاتر از همه فایل‌های ایجاد جدول)

-- 1. چت گروهی و خصوصی (ارسال و دریافت پیام‌ها)
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- 2. کارت‌های بازی (بروزرسانی بی‌درنگ وضعیت بازی)
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_cards;

-- 3. نوتیفیکیشن‌ها (دریافت بی‌درنگ نوتیفیکیشن‌ها)
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 4. دوئل‌ها (تغییرات وضعیت دوئل، درخواست‌ها)
ALTER PUBLICATION supabase_realtime ADD TABLE public.duels;

-- 5. چالش‌ها (تغییرات وضعیت چالش، شرکت‌کنندگان)
ALTER PUBLICATION supabase_realtime ADD TABLE public.challenges;

-- 6. اعضای گروه (برای نمایش آنلاین بودن کاربران)
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_members;

-- 7. تراکنش‌ها (برای نمایش بی‌درنگ تغییرات موجودی)
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- 8. استوری‌های ادمین (برای نمایش بی‌درنگ تصاویر جدید)
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_stories;