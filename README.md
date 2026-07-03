dobna/
│
├── .github/                              # تنظیمات GitHub Actions (CI/CD)
│   └── workflows/
│       ├── deploy-assets.yml             # آپلود خودکار Assets روی CDN
│       ├── deploy-web.yml                # استقرار خودکار وب روی Vercel/Netlify
│       └── test.yml                      # اجرای تست‌های خودکار
│
├── assets/                               # 🔵 Assets مشترک بین وب و موبایل (در روت)
│   ├── animations/                       # انیمیشن‌های Lottie (JSON)
│   │   ├── empty-wallet.json             # انیمیشن کیف پول خالی
│   │   ├── loading_main.json             # لودینگ اصلی
│   │   ├── network_error.json            # خطای شبکه
│   │   ├── pulse_loader.json             # لودینگ ضربان‌دار
│   │   ├── scanning_line.json            # اسکن خطی
│   │   ├── security-scan.json            # اسکن امنیتی
│   │   ├── success-check.json            # تیک موفقیت
│   │   ├── success_burst.json            # انفجار موفقیت
│   │   └── transaction-sending.json      # ارسال تراکنش
│   │
│   ├── fonts/                            # فونت‌های پروژه
│   │   ├── Vazirmatn-Regular.ttf         # فارسی معمولی
│   │   ├── Vazirmatn-Bold.ttf            # فارسی پررنگ
│   │   ├── Vazirmatn-ExtraBold.ttf       # فارسی فوق‌پررنگ
│   │   ├── Cairo-Regular.ttf             # انگلیسی معمولی
│   │   ├── Cairo-Bold.ttf                # انگلیسی پررنگ
│   │   ├── Orbitron-Regular.ttf          # اعداد معمولی
│   │   └── Orbitron-Bold.ttf             # اعداد پررنگ
│   │
│   ├── images/                           # تصاویر اصلی
│   │   ├── icon.png                      # آیکون اصلی (512x512)
│   │   ├── splash.png                    # صفحه اسپلش (1242x2436)
│   │   ├── adaptive-icon.png             # آیکون تطبیقی اندروید
│   │   ├── favicon.png                   # آیکون مرورگر
│   │   ├── logo.png                      # لوگوی دوبنا
│   │   │
│   │   ├── notes/                        # اسکناس‌ها (برای هر ارز و سطح)
│   │   │   ├── crypto/                   # رمزارزها
│   │   │   │   ├── BTC/                  # بیت‌کوین (۴ سطح)
│   │   │   │   │   ├── 0.0000005.png
│   │   │   │   │   ├── 0.000002.png
│   │   │   │   │   ├── 0.000005.png
│   │   │   │   │   └── 0.00001.png
│   │   │   │   ├── ETH/                  # اتریوم
│   │   │   │   │   ├── 0.00001.png
│   │   │   │   │   ├── 0.00005.png
│   │   │   │   │   ├── 0.0001.png
│   │   │   │   │   └── 0.0002.png
│   │   │   │   ├── USDT/                 # تتر
│   │   │   │   │   ├── 0.05.png
│   │   │   │   │   ├── 0.25.png
│   │   │   │   │   ├── 0.50.png
│   │   │   │   │   └── 1.00.png
│   │   │   │   ├── SOL/                  # سولانا
│   │   │   │   ├── BNB/                  # بایننس
│   │   │   │   ├── DOGE/                 # دوج‌کوین
│   │   │   │   ├── TON/                  # تون‌کوین
│   │   │   │   ├── BONK/                 # بونک
│   │   │   │   ├── PEPE/                 # پپه
│   │   │   │   └── HMSTR/                # همستر
│   │   │   │
│   │   │   └── fiat/                     # ارزهای فیات
│   │   │       ├── USD/                  # دلار آمریکا
│   │   │       │   ├── 0.05.png
│   │   │       │   ├── 0.25.png
│   │   │       │   ├── 0.50.png
│   │   │       │   └── 1.00.png
│   │   │       ├── IRT/                  # تومان ایران
│   │   │       │   ├── 5000.png
│   │   │       │   ├── 20000.png
│   │   │       │   ├── 50000.png
│   │   │       │   └── 100000.png
│   │   │       ├── EUR/                  # یورو
│   │   │       ├── TRY/                  # لیر ترکیه
│   │   │       ├── GBP/                  # پوند
│   │   │       ├── AED/                  # درهم
│   │   │       ├── CNY/                  # یوان
│   │   │       ├── INR/                  # روپیه
│   │   │       ├── CAD/                  # دلار کانادا
│   │   │       ├── CHF/                  # فرانک سوئیس
│   │   │       └── AUD/                  # دلار استرالیا
│   │   │
│   │   ├── backgrounds/                  # پس‌زمینه‌ها
│   │   │   ├── background-neon.webp
│   │   │   ├── onboarding.webp
│   │   │   └── dark-bg.png
│   │   │
│   │   ├── avatars/                      # آواتارهای پیش‌فرض (۲۰+ عدد)
│   │   │   ├── default-avatar.png
│   │   │   ├── avatar-1.png ... avatar-19.png
│   │   │   ├── avatar-guest.png
│   │   │   ├── avatar-winner.png
│   │   │   └── avatar-vip.png
│   │   │
│   │   ├── badges/                       # نشان‌های کاربران
│   │   │   ├── verified-badge.png
│   │   │   ├── winner-badge.png
│   │   │   ├── vip-badge.png
│   │   │   └── admin-badge.png
│   │   │
│   │   └── cards/                        # تصاویر کارت‌های بینگو
│   │       ├── card-back.png
│   │       ├── card-frame.png
│   │       └── card-glow.png
│   │
│   ├── icons/                            # آیکون‌های SVG
│   │   ├── ui/                           # آیکون‌های رابط کاربری
│   │   │   ├── logo-dobna.svg
│   │   │   ├── back-arrow.svg
│   │   │   ├── chat.svg
│   │   │   ├── home.svg
│   │   │   ├── wallet.svg
│   │   │   ├── trophy.svg
│   │   │   ├── users.svg
│   │   │   ├── gift.svg
│   │   │   ├── share.svg
│   │   │   └── ...
│   │   ├── flags/                        # پرچم کشورها (برای گروه‌ها)
│   │   │   ├── IR.svg, US.svg, GB.svg, CA.svg, ...
│   │   ├── crypto/                       # آیکون‌های رمزارزها
│   │   │   ├── bitcoin.svg
│   │   │   ├── ethereum.svg
│   │   │   ├── usdt.svg
│   │   │   ├── solana.svg
│   │   │   └── ...
│   │   └── social/                       # آیکون شبکه‌های اجتماعی
│   │       ├── instagram.svg
│   │       ├── telegram.svg
│   │       └── whatsapp.svg
│   │
│   ├── lottie/                           # انیمیشن‌های Lottie اضافی
│   │   ├── background_flow.json
│   │   ├── loading-chart.json
│   │   ├── matrix_glitch.json
│   │   ├── success-neon.json
│   │   ├── coin-flip.json
│   │   ├── cards-shuffle.json
│   │   ├── winner-celebration.json
│   │   └── confetti.json
│   │
│   └── sounds/                           # افکت‌های صوتی
│       ├── ui/                           # صداهای رابط کاربری
│       │   ├── click.mp3
│       │   ├── dark-click.mp3
│       │   ├── digital_click.mp3
│       │   ├── light-tap.mp3
│       │   └── unlock.mp3
│       ├── game/                         # صداهای بازی
│       │   ├── number-called.mp3
│       │   ├── line-win.mp3
│       │   ├── full-house.mp3
│       │   ├── bingo.mp3
│       │   ├── card-mark.mp3
│       │   └── countdown.mp3
│       ├── transaction/                  # صداهای تراکنش
│       │   ├── tx_charge.mp3
│       │   ├── tx_success.mp3
│       │   ├── tx_failed.mp3
│       │   ├── coin-drop.mp3
│       │   └── cash-register.mp3
│       ├── notification/                 # صداهای نوتیفیکیشن
│       │   ├── notification.mp3
│       │   ├── notify_beep.mp3
│       │   ├── msg_send.mp3
│       │   └── msg_receive.mp3
│       ├── auth/                         # صداهای احراز هویت
│       │   ├── auth_pass.mp3
│       │   ├── login-success.mp3
│       │   └── login-failed.mp3
│       ├── effects/                      # افکت‌های ویژه
│       │   ├── heartbeat_fast.mp3
│       │   ├── refresh_glitch.mp3
│       │   ├── scan_beep.mp3
│       │   ├── matrix-glitch.mp3
│       │   └── sword_clash.wav
│       └── ambient/                      # صداهای محیطی
│           ├── casino-ambient.mp3
│           ├── game-start.mp3
│           ├── game-end.mp3
│           └── waiting-room.mp3
│
├── backend/                              # 🔵 بک‌اند (Supabase + توابع)
│   └── supabase/
│       ├── migrations/                   # فایل‌های SQL برای ایجاد جداول
│       │   ├── 01_initial.sql            # کاربران، پروفایل‌ها
│       │   ├── 02_communities.sql        # گروه‌ها و کامونیتی‌ها
│       │   ├── 03_rooms.sql              # تالارها و اتاق‌های بازی
│       │   ├── 04_cards.sql              # کارت‌های بینگو (۱۰۰ کارت)
│       │   ├── 05_transactions.sql       # تراکنش‌ها
│       │   ├── 06_chat.sql               # چت گروهی و خصوصی
│       │   ├── 07_duels.sql              # دوئل‌ها و چالش‌ها
│       │   ├── 08_wallets.sql            # کیف پول و موجودی
│       │   ├── 09_price_feeds.sql        # کش قیمت‌ها
│       │   └── 10_rls_policies.sql       # سیاست‌های امنیتی (RLS)
│       │
│       ├── functions/                    # توابع PostgreSQL (Edge Functions)
│       │   ├── fn_start_game.sql         # شروع بازی
│       │   ├── fn_call_number.sql        # فراخوانی عدد تصادفی
│       │   ├── fn_check_winner.sql       # بررسی برنده
│       │   ├── fn_purchase_card.sql      # خرید کارت
│       │   ├── fn_create_room.sql        # ایجاد اتاق جدید
│       │   ├── fn_create_duel.sql        # ایجاد دوئل
│       │   ├── fn_join_duel.sql          # پیوستن به دوئل
│       │   ├── fn_check_duel_expiry.sql  # بررسی انقضای دوئل
│       │   ├── fn_complete_duel.sql      # اتمام دوئل و پرداخت
│       │   ├── fn_get_stories.sql        # دریافت استوری‌ها
│       │   ├── fn_update_balance.sql     # به‌روزرسانی موجودی
│       │   └── fn_get_exchange_rate.sql  # دریافت نرخ تبدیل
│       │
│       ├── seed.sql                      # داده‌های اولیه (۱۰۰ کارت استاندارد)
│       └── config.toml                   # تنظیمات Supabase
│
├── frontend-web/                         # 🔵 پروژه وب (React + Vite)
│   ├── public/                           # فایل‌های عمومی (لینک سمبلیک به assets)
│   │   └── assets/ -> ../../assets       # لینک به پوشه Assets روت
│   │
│   ├── src/
│   │   ├── api/                          # ارتباط با Supabase
│   │   │   ├── supabaseClient.js         # کلاینت Supabase با Realtime
│   │   │   └── index.js                  # خروجی یکپارچه
│   │   │
│   │   ├── components/                   # کامپوننت‌های قابل استفاده مجدد
│   │   │   ├── common/                   # کامپوننت‌های عمومی
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── ToastNotification.jsx
│   │   │   │
│   │   │   ├── layout/                   # قالب‌های ساختاری
│   │   │   │   ├── MainLayout.jsx        # قالب اصلی (با هدر و منو)
│   │   │   │   ├── AuthLayout.jsx        # قالب صفحات احراز هویت
│   │   │   │   └── GameLayout.jsx        # قالب صفحات بازی
│   │   │   │
│   │   │   ├── navigation/               # نویگیشن
│   │   │   │   ├── BottomNav.jsx         # منوی پایین (۵ گزینه اصلی)
│   │   │   │   ├── TopNav.jsx            # نوار بالای صفحه
│   │   │   │   └── FloatingChatButton.jsx # دکمه شناور چت
│   │   │   │
│   │   │   ├── wallet/                   # کامپوننت‌های کیف پول و صرافی
│   │   │   │   ├── AssetItem.jsx         # هر آیتم دارایی
│   │   │   │   ├── PriceChart.jsx        # چارت قیمت (با فیلترهای زمانی)
│   │   │   │   ├── TransactionItem.jsx   # هر تراکنش
│   │   │   │   ├── NetworkSelector.jsx   # انتخاب شبکه (BSC, TRC20, ...)
│   │   │   │   └── QRCodeDisplay.jsx     # نمایش و ذخیره QR Code
│   │   │   │
│   │   │   ├── game/                     # کامپوننت‌های بازی
│   │   │   │   ├── BingoCard.jsx         # کارت ۳×۹ بینگو
│   │   │   │   ├── LevelCard.jsx         # کارت نمایش هر سطح تالار
│   │   │   │   ├── Timer.jsx             # تایمر معکوس (۱۵۰ ثانیه)
│   │   │   │   ├── CardSelector.jsx      # انتخاب کارت برای خرید
│   │   │   │   └── WinnerModal.jsx       # مودال اعلام برنده
│   │   │   │
│   │   │   ├── duel/                     # کامپوننت‌های دوئل و چالش
│   │   │   │   ├── DuelRequestCard.jsx   # کارت درخواست دوئل
│   │   │   │   ├── DuelTimer.jsx         # تایمر ۵ دقیقه‌ای دوئل
│   │   │   │   ├── ChallengeCard.jsx     # کارت چالش
│   │   │   │   └── StoryRow.jsx          # ردیف استوری‌ها (زرد و بنفش)
│   │   │   │
│   │   │   ├── chat/                     # کامپوننت‌های چت
│   │   │   │   ├── ChatMessage.jsx       # هر پیام
│   │   │   │   ├── ChatInput.jsx         # ورودی پیام
│   │   │   │   └── ChatList.jsx          # لیست مکالمات
│   │   │   │
│   │   │   └── shared/                   # کامپوننت‌های اشتراکی
│   │   │       ├── DobnaLogo.jsx         # لوگو با قابلیت ۵ ضربه
│   │   │       ├── ShareButton.jsx       # دکمه اشتراک‌گذاری لینک
│   │   │       ├── BalanceBox.jsx        # باکس موجودی با تغییر ارز
│   │   │       ├── SearchBar.jsx         # نوار جستجو
│   │   │       ├── CountrySelector.jsx   # انتخاب کشور با پرچم
│   │   │       └── LanguageSwitcher.jsx  # تغییر زبان
│   │   │
│   │   ├── pages/                        # صفحات اصلی
│   │   │   ├── Auth/                     # صفحات احراز هویت
│   │   │   │   ├── LanguageSelectorPage.jsx  # انتخاب زبان
│   │   │   │   ├── MobileNumberPage.jsx      # ورود شماره موبایل
│   │   │   │   ├── LoginCodePage.jsx         # تأیید کد
│   │   │   │   ├── LoginPage.jsx             # ورود (اختیاری)
│   │   │   │   └── RegisterPage.jsx          # ثبت‌نام (اختیاری)
│   │   │   │
│   │   │   ├── HomePage.jsx              # صفحه اصلی لابی
│   │   │   ├── CommunityPage.jsx         # صفحه داخلی گروه (۴ سطح)
│   │   │   ├── GameRoomPage.jsx          # صفحه بازی (کارت‌ها و تایمر)
│   │   │   ├── DuelPage.jsx              # صفحه دوئل (با تایمر ۵ دقیقه)
│   │   │   ├── ChallengePage.jsx         # صفحه چالش‌ها
│   │   │   ├── WalletPage.jsx            # داشبورد کیف پول
│   │   │   ├── DepositPage.jsx           # صفحه واریز (انتخاب شبکه)
│   │   │   ├── WithdrawPage.jsx          # صفحه برداشت
│   │   │   ├── SwapPage.jsx              # صفحه تبدیل ارز
│   │   │   ├── TransferPage.jsx          # صفحه انتقال به DID
│   │   │   ├── CoinDetailPage.jsx        # جزئیات هر ارز (چارت و فعالیت)
│   │   │   ├── ChatPage.jsx              # صفحه چت (گروهی و خصوصی)
│   │   │   ├── ProfilePage.jsx           # پروفایل کاربر
│   │   │   ├── MatrixPage.jsx            # صفحه مخفی Matrix
│   │   │   └── SettingsPage.jsx          # تنظیمات کاربر
│   │   │
│   │   ├── services/                     # سرویس‌های ارتباط با بک‌اند
│   │   │   ├── authService.js            # احراز هویت
│   │   │   ├── communityService.js       # مدیریت گروه‌ها
│   │   │   ├── gameService.js            # مدیریت بازی
│   │   │   ├── roomService.js            # مدیریت اتاق‌ها
│   │   │   ├── duelService.js            # مدیریت دوئل (با تایمر ۵ دقیقه)
│   │   │   ├── challengeService.js       # مدیریت چالش‌ها
│   │   │   ├── walletService.js          # کیف پول و موجودی
│   │   │   ├── depositService.js         # واریز (شبکه، آدرس، QR)
│   │   │   ├── withdrawService.js        # برداشت
│   │   │   ├── swapService.js            # تبدیل ارز
│   │   │   ├── transferService.js        # انتقال به DID
│   │   │   ├── chatService.js            # چت (ارسال/دریافت پیام)
│   │   │   ├── notificationService.js    # نوتیفیکیشن‌ها
│   │   │   ├── priceService.js           # قیمت لحظه‌ای و چارت
│   │   │   ├── paymentService.js         # درگاه پرداخت
│   │   │   └── inviteService.js          # لینک دعوت و پاداش
│   │   │
│   │   ├── hooks/                        # هوک‌های سفارشی
│   │   │   ├── useAuth.js                # وضعیت احراز هویت
│   │   │   ├── useCommunity.js           # اطلاعات گروه فعال
│   │   │   ├── useGame.js                # وضعیت بازی (تایمر، کارت‌ها)
│   │   │   ├── useDuel.js                # مدیریت دوئل
│   │   │   ├── useWallet.js              # مدیریت کیف پول
│   │   │   ├── useChat.js                # مدیریت چت (پیام‌ها، تعداد نخوانده)
│   │   │   ├── useRealtime.js            # اتصال به Supabase Realtime
│   │   │   ├── useTimer.js               # تایمر معکوس (۱۵۰ ثانیه و ۵ دقیقه)
│   │   │   ├── usePriceChart.js          # داده‌های چارت قیمت
│   │   │   ├── useMatrix.js              # تشخیص ۵ ضربه روی لوگو
│   │   │   ├── useAudioManager.js        # پخش افکت‌های صوتی
│   │   │   ├── useNotification.js        # مدیریت نوتیفیکیشن‌ها
│   │   │   ├── useOTP.js                 # مدیریت کد یک‌بارمصرف
│   │   │   └── useTranslation.js         # مدیریت زبان (i18n)
│   │   │
│   │   ├── store/                        # مدیریت وضعیت (Zustand)
│   │   │   ├── authStore.js              # وضعیت کاربر
│   │   │   ├── communityStore.js         # وضعیت گروه فعال
│   │   │   ├── gameStore.js              # وضعیت بازی جاری
│   │   │   ├── walletStore.js            # وضعیت کیف پول
│   │   │   ├── chatStore.js              # وضعیت چت
│   │   │   ├── duelStore.js              # وضعیت دوئل‌ها
│   │   │   ├── storyStore.js             # استوری‌های لحظه‌ای
│   │   │   ├── matrixStore.js            # وضعیت نمایش Matrix
│   │   │   └── uiStore.js                # وضعیت رابط کاربری
│   │   │
│   │   ├── utils/                        # ابزارهای کمکی
│   │   │   ├── assetMapper.js            # اتصال ارز/سطح به تصویر اسکناس
│   │   │   ├── emojiMap.js               # دیتای کامل کشورها با پرچم و پیش‌شماره
│   │   │   ├── avatarGenerator.js        # تولید آواتار با DiceBear
│   │   │   ├── currencyFormatter.js      # فرمت اعداد (تومان، دلار)
│   │   │   ├── timeFormatter.js          # تبدیل ثانیه به دقیقه:ثانیه
│   │   │   ├── cardValidator.js          # اعتبارسنجی کارت‌ها
│   │   │   ├── winnerChecker.js          # بررسی برنده در سمت کلاینت
│   │   │   ├── shareHelper.js            # تولید لینک دعوت و اشتراک‌گذاری
│   │   │   ├── matrixEffects.js          # افکت‌های صفحه Matrix
│   │   │   ├── duelHelper.js             # محاسبه کارمزد دوئل و زمان‌بندی
│   │   │   ├── networkMapper.js          # اتصال نام شبکه به آیکون
│   │   │   ├── qrGenerator.js            # تولید QR Code
│   │   │   ├── priceFormatter.js         # فرمت قیمت‌ها با توجه به زبان
│   │   │   ├── validators.js             # اعتبارسنجی ورودی‌ها
│   │   │   └── i18n.js                   # پیکربندی i18n
│   │   │
│   │   ├── locales/                      # فایل‌های زبان (برای i18n)
│   │   │   ├── en.json                   # انگلیسی
│   │   │   ├── fa.json                   # فارسی
│   │   │   ├── tr.json                   # ترکی
│   │   │   └── ar.json                   # عربی
│   │   │
│   │   ├── styles/                       # استایل‌های سراسری
│   │   │   ├── index.css                 # استایل اصلی (با Tailwind)
│   │   │   ├── rtl.css                   # تنظیمات RTL برای فارسی/عربی
│   │   │   └── animations.css            # انیمیشن‌های سفارشی
│   │   │
│   │   ├── routes/                       # تنظیمات مسیرها
│   │   │   ├── AppRoutes.jsx             # تعریف همه مسیرها
│   │   │   └── PrivateRoute.jsx          # محافظت از مسیرهای نیازمند احراز هویت
│   │   │
│   │   ├── config/                       # فایل‌های پیکربندی
│   │   │   ├── constants.js              # ثابت‌های پروژه (لیست ارزها، شبکه‌ها)
│   │   │   ├── i18n.js                   # پیکربندی i18next
│   │   │   └── theme.js                  # تم‌های رنگی (تاریک/روشن)
│   │   │
│   │   ├── App.jsx                       # کامپوننت اصلی اپلیکیشن
│   │   ├── main.jsx                      # نقطه ورود (ReactDOM.render)
│   │   └── index.css                     # (فایل استایل اصلی)
│   │
│   ├── .env                              # متغیرهای محیطی
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
├── frontend-mobile/                      # 🔵 پروژه موبایل (Flutter)
│   ├── android/                          # فایل‌های مخصوص اندروید
│   ├── ios/                              # فایل‌های مخصوص iOS
│   ├── lib/                              # کد اصلی Flutter
│   │   ├── main.dart                     # نقطه ورود
│   │   ├── app.dart                      # کامپوننت اصلی
│   │   ├── screens/                      # صفحات (معادل pages در وب)
│   │   │   ├── auth/                     # صفحات احراز هویت
│   │   │   ├── home_screen.dart
│   │   │   ├── community_screen.dart
│   │   │   ├── game_room_screen.dart
│   │   │   ├── duel_screen.dart
│   │   │   ├── wallet_screen.dart
│   │   │   └── ...
│   │   ├── widgets/                      # ویجت‌های قابل استفاده (معادل components)
│   │   ├── services/                     # سرویس‌ها (معادل services)
│   │   ├── models/                       # مدل‌های داده
│   │   ├── providers/                    # مدیریت وضعیت (با Provider/Riverpod)
│   │   ├── utils/                        # ابزارهای کمکی (معادل utils)
│   │   └── l10n/                         # فایل‌های زبان (i18n)
│   │       ├── app_en.arb
│   │       ├── app_fa.arb
│   │       └── ...
│   ├── assets/ -> ../assets              # لینک به پوشه Assets روت
│   ├── pubspec.yaml                      # وابستگی‌های Flutter
│   └── README.md
│
├── docs/                                 # مستندات پروژه
│   ├── api.md                            # مستندات API (Supabase Functions)
│   ├── architecture.md                   # معماری کلی پروژه
│   ├── database-schema.md                # دیاگرام و توضیحات دیتابیس
│   ├── game-rules.md                     # قوانین بازی بینگو و دوئل
│   ├── deployment.md                     # راهنمای استقرار روی سرور
│   └── assets-guide.md                   # راهنمای استفاده از Assets
│
├── scripts/                              # اسکریپت‌های کمکی
│   ├── copy-assets.sh                    # کپی Assets از روت به پروژه‌های فرعی
│   ├── deploy-web.sh                     # اسکریپت استقرار وب
│   └── seed-database.js                  # پر کردن دیتابیس با داده‌های اولیه
│
├── .env.example                          # نمونه متغیرهای محیطی
├── .gitignore
├── LICENSE
├── README.md                             # توضیحات کلی پروژه
└── package.json                          # (برای اسکریپت‌های یکپارچه‌سازی)


_