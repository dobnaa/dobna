```

dobna/                                    ← ریشه پروژه (ریپازیتوری اصلی)
│
├── assets/                               ← 🔵 Assets مشترک بین تمام پلتفرم‌ها (یک بار برای همیشه)
│   ├── animations/                       ← انیمیشن‌های Lottie (JSON)
│   │   ├── empty-wallet.json
│   │   ├── loading_main.json
│   │   ├── network_error.json
│   │   ├── pulse_loader.json
│   │   ├── scanning_line.json
│   │   ├── security-scan.json
│   │   ├── success-check.json
│   │   ├── success_burst.json
│   │   └── transaction-sending.json
│   ├── fonts/                            ← فونت‌های پروژه
│   │   ├── Vazirmatn-Regular.ttf
│   │   ├── Vazirmatn-Bold.ttf
│   │   ├── Vazirmatn-ExtraBold.ttf
│   │   ├── Cairo-Regular.ttf
│   │   ├── Cairo-Bold.ttf
│   │   ├── Orbitron-Regular.ttf
│   │   └── Orbitron-Bold.ttf
│   ├── images/                           ← تصاویر اصلی
│   │   ├── icon.png
│   │   ├── splash.png
│   │   ├── adaptive-icon.png
│   │   ├── favicon.png
│   │   ├── logo.png
│   │   ├── notes/                        ← تصاویر اسکناس‌های ارزها (WebP)
│   │   │   ├── crypto/                   # رمزارزها
│   │   │   │   ├── BTC/
│   │   │   │   │   ├── 0.0000005.webp
│   │   │   │   │   ├── 0.000002.webp
│   │   │   │   │   ├── 0.000005.webp
│   │   │   │   │   └── 0.00001.webp
│   │   │   │   ├── ETH/
│   │   │   │   │   ├── 0.00001.webp
│   │   │   │   │   ├── 0.00005.webp
│   │   │   │   │   ├── 0.0001.webp
│   │   │   │   │   └── 0.0002.webp
│   │   │   │   ├── USDT/
│   │   │   │   │   ├── 0.05.webp
│   │   │   │   │   ├── 0.25.webp
│   │   │   │   │   ├── 0.50.webp
│   │   │   │   │   └── 1.00.webp
│   │   │   │   ├── SOL/
│   │   │   │   │   ├── 0.001.webp
│   │   │   │   │   ├── 0.005.webp
│   │   │   │   │   ├── 0.01.webp
│   │   │   │   │   └── 0.02.webp
│   │   │   │   ├── BNB/
│   │   │   │   │   ├── 0.00004.webp
│   │   │   │   │   ├── 0.00016.webp
│   │   │   │   │   ├── 0.0004.webp
│   │   │   │   │   └── 0.0008.webp
│   │   │   │   ├── DOGE/
│   │   │   │   │   ├── 0.25.webp
│   │   │   │   │   ├── 1.00.webp
│   │   │   │   │   ├── 2.50.webp
│   │   │   │   │   └── 5.00.webp
│   │   │   │   ├── TON/
│   │   │   │   │   ├── 0.015.webp
│   │   │   │   │   ├── 0.060.webp
│   │   │   │   │   ├── 0.150.webp
│   │   │   │   │   └── 0.30.webp
│   │   │   │   ├── BONK/
│   │   │   │   │   ├── 5.webp
│   │   │   │   │   ├── 20.webp
│   │   │   │   │   ├── 50.webp
│   │   │   │   │   └── 100.webp
│   │   │   │   ├── PEPE/
│   │   │   │   │   ├── 1000.webp
│   │   │   │   │   ├── 4000.webp
│   │   │   │   │   ├── 10000.webp
│   │   │   │   │   └── 20000.webp
│   │   │   │   ├── HMSTR/
│   │   │   │   │   ├── 200.webp
│   │   │   │   │   ├── 800.webp
│   │   │   │   │   ├── 2000.webp
│   │   │   │   │   └── 4000.webp
│   │   │   │   ├── USDC/
│   │   │   │   │   ├── 0.05.webp
│   │   │   │   │   ├── 0.25.webp
│   │   │   │   │   ├── 0.50.webp
│   │   │   │   │   └── 1.00.webp
│   │   │   │   └── STARS/
│   │   │   │       ├── 5.webp
│   │   │   │       ├── 25.webp
│   │   │   │       ├── 50.webp
│   │   │   │       └── 100.webp
│   │   │   └── fiat/                     # فیات‌ها
│   │   │       ├── USD/
│   │   │       │   ├── 0.05.webp
│   │   │       │   ├── 0.25.webp
│   │   │       │   ├── 0.50.webp
│   │   │       │   └── 1.00.webp
│   │   │       ├── IRT/
│   │   │       │   ├── 5000.webp
│   │   │       │   ├── 20000.webp
│   │   │       │   ├── 50000.webp
│   │   │       │   └── 100000.webp
│   │   │       ├── EUR/
│   │   │       │   ├── 0.025.webp
│   │   │       │   ├── 0.10.webp
│   │   │       │   ├── 0.25.webp
│   │   │       │   └── 0.50.webp
│   │   │       ├── TRY/
│   │   │       │   ├── 0.5.webp
│   │   │       │   ├── 2.webp
│   │   │       │   ├── 5.webp
│   │   │       │   └── 10.webp
│   │   │       ├── GBP/
│   │   │       │   ├── 0.02.webp
│   │   │       │   ├── 0.10.webp
│   │   │       │   ├── 0.25.webp
│   │   │       │   └── 0.50.webp
│   │   │       ├── AED/
│   │   │       │   ├── 0.2.webp
│   │   │       │   ├── 1.webp
│   │   │       │   ├── 2.webp
│   │   │       │   └── 3.webp
│   │   │       ├── CNY/
│   │   │       │   ├── 0.5.webp
│   │   │       │   ├── 2.webp
│   │   │       │   ├── 5.webp
│   │   │       │   └── 10.webp
│   │   │       ├── INR/
│   │   │       │   ├── 5.webp
│   │   │       │   ├── 20.webp
│   │   │       │   ├── 50.webp
│   │   │       │   └── 100.webp
│   │   │       ├── CAD/
│   │   │       │   ├── 0.05.webp
│   │   │       │   ├── 0.25.webp
│   │   │       │   ├── 0.50.webp
│   │   │       │   └── 1.00.webp
│   │   │       ├── CHF/
│   │   │       │   ├── 0.05.webp
│   │   │       │   ├── 0.10.webp
│   │   │       │   ├── 0.50.webp
│   │   │       │   └── 1.00.webp
│   │   │       └── AUD/
│   │   │           ├── 0.05.webp
│   │   │           ├── 0.25.webp
│   │   │           ├── 0.50.webp
│   │   │           └── 1.00.webp
│   │   ├── backgrounds/                  # (قابل حذف با CSS)
│   │   └── cards/                        # تصاویر کارت‌های بینگو
│   ├── icons/                            # آیکون‌های SVG (بیشتر با Lucide جایگزین شده)
│   │   ├── crypto/
│   │   └── flags/                        # (با ایموجی جایگزین شده)
│   ├── lottie/                           # انیمیشن‌های اضافی
│   └── sounds/                           # افکت‌های صوتی
│       ├── ui/
│       ├── game/
│       ├── transaction/
│       ├── notification/
│       └── ambient/
│
├── backend/                              ← 🔵 بک‌اند Supabase
│   └── supabase/
│       ├── migrations/                   ← ✅ تمام فایل‌های migration (۳۶+ فایل)
│       │   ├── 0001_create_extensions.sql
│       │   ├── 0002_create_currencies.sql
│       │   ├── 0003_create_profiles.sql
│       │   ├── 0004_create_communities.sql
│       │   ├── 0005_create_community_members.sql
│       │   ├── 0006_create_followers.sql
│       │   ├── 0007_create_rooms.sql
│       │   ├── 0008_create_game_cards.sql
│       │   ├── 0009_create_duels.sql
│       │   ├── 0010_create_duel_participants.sql
│       │   ├── 0011_create_challenges.sql
│       │   ├── 0012_create_challenge_participants.sql
│       │   ├── 0013_create_chat_messages.sql
│       │   ├── 0014_create_notifications.sql
│       │   ├── 0015_create_transactions.sql
│       │   ├── 0016_create_wallets.sql
│       │   ├── 0017_create_user_balances.sql
│       │   ├── 0018_create_price_history.sql
│       │   ├── 0019_create_deposit_addresses.sql
│       │   ├── 0020_create_dobna_cards.sql
│       │   ├── 0021_create_system_accounts.sql
│       │   ├── 0022_create_invitations.sql
│       │   ├── 0023_create_user_settings.sql
│       │   ├── 0024_create_reports.sql
│       │   ├── 0025_create_community_stats.sql
│       │   ├── 0026_create_challenge_cooldowns.sql
│       │   ├── 0027_create_admin_stories.sql
│       │   ├── 0028_create_system_notifications.sql
│       │   ├── 0029_add_foreign_key_constraints.sql
│       │   ├── 0030_seed_currencies.sql
│       │   ├── 0031_enable_rls_policies.sql
│       │   ├── 0032_enable_realtime.sql
│       │   ├── 0033_seed_dobna_cards.sql
│       │   ├── 0034_create_game_functions.sql
│       │   ├── 0035_complete_business_logic.sql
│       │   └── 0036_setup_cancel_expired_cron.sql
│       ├── functions/                     ← ✅ تمام توابع PostgreSQL (۴۰+ فایل)
│       │   ├── fn_add_member_to_group.sql
│       │   ├── fn_calculate_daily_interest.sql
│       │   ├── fn_call_number.sql
│       │   ├── fn_cancel_challenge.sql
│       │   ├── fn_cancel_duel.sql
│       │   ├── fn_check_challenge_cooldown.sql
│       │   ├── fn_check_room_timer.sql
│       │   ├── fn_check_winner.sql
│       │   ├── fn_complete_challenge.sql
│       │   ├── fn_complete_duel.sql
│       │   ├── fn_complete_room_game.sql
│       │   ├── fn_create_challenge.sql
│       │   ├── fn_create_duel.sql
│       │   ├── fn_create_room.sql
│       │   ├── fn_deactivate_user.sql
│       │   ├── fn_follow_user.sql
│       │   ├── fn_generate_account_number.sql
│       │   ├── fn_generate_did.sql
│       │   ├── fn_generate_gp_id.sql
│       │   ├── fn_get_exchange_rate.sql
│       │   ├── fn_get_mutual_friends.sql
│       │   ├── fn_get_stories.sql
│       │   ├── fn_get_unread_count.sql
│       │   ├── fn_join_challenge.sql
│       │   ├── fn_join_duel.sql
│       │   ├── fn_join_room.sql
│       │   ├── fn_mark_messages_read.sql
│       │   ├── fn_pin_message.sql
│       │   ├── fn_process_referral_reward.sql
│       │   ├── fn_purchase_card.sql
│       │   ├── fn_remove_member_from_group.sql
│       │   ├── fn_send_message.sql
│       │   ├── fn_start_challenge.sql
│       │   ├── fn_start_challenge_game.sql
│       │   ├── fn_start_duel_game.sql
│       │   ├── fn_start_game.sql
│       │   ├── fn_start_room_game.sql
│       │   ├── fn_submit_report.sql
│       │   ├── fn_transfer_to_escrow.sql
│       │   ├── fn_unfollow_user.sql
│       │   ├── fn_update_balance.sql
│       │   └── fn_update_group_rank.sql
│       └── seed.sql
│
├── frontend-web/                          ← 🔵 پروژه وب (React + Vite)
│   ├── public/
│   │   └── assets/ -> ../../assets
│   ├── src/
│   │   ├── api/
│   │   │   └── supabaseClient.js
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── OTPInput.jsx
│   │   │   │   └── AuthLayout.jsx
│   │   │   ├── chat/
│   │   │   │   ├── ChatMessage.jsx
│   │   │   │   ├── ChatInput.jsx
│   │   │   │   └── ChatList.jsx
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── ToastNotification.jsx
│   │   │   │   ├── WelcomeMessage.jsx
│   │   │   │   └── MessageCount.jsx
│   │   │   ├── duel/
│   │   │   │   ├── DuelRequestCard.jsx
│   │   │   │   ├── DuelTimer.jsx
│   │   │   │   ├── ChallengeCard.jsx
│   │   │   │   └── StoryRow.jsx
│   │   │   ├── game/
│   │   │   │   ├── BingoCard.jsx
│   │   │   │   ├── LevelCard.jsx
│   │   │   │   ├── Timer.jsx
│   │   │   │   ├── CardSelector.jsx
│   │   │   │   └── WinnerModal.jsx
│   │   │   ├── layout/
│   │   │   │   ├── MainLayout.jsx
│   │   │   │   ├── AuthLayout.jsx
│   │   │   │   └── GameLayout.jsx
│   │   │   ├── navigation/
│   │   │   │   ├── BottomNav.jsx
│   │   │   │   ├── TopNav.jsx
│   │   │   │   └── FloatingChatButton.jsx
│   │   │   ├── shared/
│   │   │   │   ├── DobnaLogo.jsx
│   │   │   │   ├── ShareButton.jsx
│   │   │   │   ├── BalanceBox.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── CountrySelector.jsx
│   │   │   │   └── LanguageSwitcher.jsx
│   │   │   └── wallet/
│   │   │       ├── AssetItem.jsx
│   │   │       ├── PriceChart.jsx
│   │   │       ├── TransactionItem.jsx
│   │   │       ├── NetworkSelector.jsx
│   │   │       └── QRCodeDisplay.jsx
│   │   ├── config/
│   │   │   ├── constants.js
│   │   │   ├── i18n.js
│   │   │   └── theme.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCommunity.js
│   │   │   ├── useGame.js
│   │   │   ├── useDuel.js
│   │   │   ├── useChallenge.js
│   │   │   ├── useWallet.js
│   │   │   ├── useChat.js
│   │   │   ├── useRealtime.js
│   │   │   ├── useTimer.js
│   │   │   ├── usePriceChart.js
│   │   │   ├── useMatrix.js
│   │   │   ├── useAudioManager.js
│   │   │   ├── useNotification.js
│   │   │   ├── useOTP.js
│   │   │   └── useTranslation.js
│   │   ├── locales/                       ← ۱۷ زبان
│   │   │   ├── en.json
│   │   │   ├── fa.json
│   │   │   ├── tr.json
│   │   │   ├── ar.json
│   │   │   ├── ru.json
│   │   │   ├── hi.json
│   │   │   ├── fr.json
│   │   │   ├── zh.json
│   │   │   ├── id.json
│   │   │   ├── ko.json
│   │   │   ├── es.json
│   │   │   ├── cs.json
│   │   │   ├── fi.json
│   │   │   ├── pt.json
│   │   │   ├── uz.json
│   │   │   ├── vi.json
│   │   │   └── sv.json
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── LanguageSelectorPage.jsx
│   │   │   │   ├── MobileNumberPage.jsx
│   │   │   │   ├── LoginCodePage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── CommunityPage.jsx
│   │   │   ├── GameRoomPage.jsx
│   │   │   ├── DuelPage.jsx
│   │   │   ├── ChallengePage.jsx
│   │   │   ├── WalletPage.jsx
│   │   │   ├── DepositPage.jsx
│   │   │   ├── WithdrawPage.jsx
│   │   │   ├── SwapPage.jsx
│   │   │   ├── TransferPage.jsx
│   │   │   ├── CoinDetailPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── MatrixPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── CommunitiesPage.jsx
│   │   │   ├── CreateCommunityPage.jsx
│   │   │   ├── DeleteCommunityPage.jsx
│   │   │   ├── PublicDuelPage.jsx
│   │   │   ├── PrivateDuelPage.jsx
│   │   │   └── CreateChallengePage.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── communityService.js
│   │   │   ├── gameService.js
│   │   │   ├── roomService.js
│   │   │   ├── duelService.js
│   │   │   ├── challengeService.js
│   │   │   ├── walletService.js
│   │   │   ├── depositService.js
│   │   │   ├── withdrawService.js
│   │   │   ├── swapService.js
│   │   │   ├── transferService.js
│   │   │   ├── chatService.js
│   │   │   ├── notificationService.js
│   │   │   ├── priceService.js
│   │   │   └── paymentService.js
│   │   ├── stores/                        ← Zustand (جمع)
│   │   │   ├── authStore.js
│   │   │   ├── communityStore.js
│   │   │   ├── gameStore.js
│   │   │   ├── walletStore.js
│   │   │   ├── chatStore.js
│   │   │   ├── duelStore.js
│   │   │   ├── storyStore.js
│   │   │   ├── matrixStore.js
│   │   │   └── uiStore.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── rtl.css
│   │   │   └── animations.css
│   │   ├── utils/
│   │   │   ├── assetMapper.js
│   │   │   ├── currencyFormatter.js
│   │   │   ├── timeFormatter.js
│   │   │   ├── cardValidator.js
│   │   │   ├── winnerChecker.js
│   │   │   ├── shareHelper.js
│   │   │   ├── matrixEffects.js
│   │   │   ├── duelHelper.js
│   │   │   ├── networkMapper.js
│   │   │   ├── qrGenerator.js
│   │   │   ├── priceFormatter.js
│   │   │   ├── validators.js
│   │   │   ├── idGenerator.js
│   │   │   └── interestCalculator.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
├── frontend-mobile/                       ← 🔵 پروژه موبایل (React Native / Flutter)
│   ├── android/
│   ├── ios/
│   ├── lib/ (Flutter) یا src/ (RN)
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── services/
│   │   ├── models/
│   │   ├── providers/
│   │   ├── utils/
│   │   └── l10n/
│   ├── assets/ -> ../assets
│   ├── pubspec.yaml (یا package.json)
│   └── README.md
│
├── docs/                                  ← مستندات
│   ├── api.md
│   ├── architecture.md
│   ├── database-schema.md
│   ├── game-rules.md
│   ├── deployment.md
│   └── assets-guide.md
│
├── scripts/                               ← اسکریپت‌های کمکی
│   ├── copy-assets.sh
│   ├── deploy-web.sh
│   └── seed-database.js
│
├── .github/                               ← GitHub Actions
│   └── workflows/
│       ├── deploy-assets.yml
│       ├── deploy-web.yml
│       └── test.yml
│
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
└── package.json








assets/icons/crypto/
├── btc.svg
├── eth.svg
├── usdt.svg
├── sol.svg
├── ...
├── stars.svg          ← ✅ آیکون Stars (طراحی یک ستاره تلگرامی)
└── dus.svg            ← ✅ آیکون DUS (در صورت نیاز)









assets/images/notes/
├── fiat/
│   ├── USD/
│   ├── IRT/
│   └── ...
├── crypto/
│   ├── BTC/
│   ├── ETH/
│   ├── USDT/
│   ├── SOL/
│   ├── ...
│   └── STARS/               ← ✅ جدید
│       ├── 5.webp
│       ├── 25.webp
│       ├── 50.webp
│       └── 100.webp
└── dus/
    └── DUS/                 ← ✅ موجود
        ├── 0.05.webp
        ├── 0.25.webp
        ├── 0.50.webp
        └── 1.00.webp









dobna/
│
├── frontend-web/
│   └── src/
│       │
│       ├── config/
│       │   ├── assets.js
│       │   ├── payment.js              ⭐ جدید
│       │   └── i18n.js
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── walletService.js
│       │   ├── payment/
│       │   │     ├── index.js
│       │   │     ├── paymentProvider.js
│       │   │     ├── oneXGateProvider.js
│       │   │     └── paymentMapper.js
│       │
│       ├── hooks/
│       │     └── usePayment.js
│       │
│       ├── stores/
│       │     └── paymentStore.js
│       │
│       ├── utils/
│       │     ├── assetMapper.js
│       │     ├── currencyFormatter.js
│       │     ├── networkMapper.js      ⭐ جدید
│       │     └── paymentFormatter.js   ⭐ جدید
│       │
│       ├── components/
│       │     └── wallet/
│       │           ├── DepositAddress.jsx
│       │           ├── DepositQRCode.jsx
│       │           ├── NetworkSelector.jsx
│       │           ├── WithdrawForm.jsx
│       │           ├── FeeInfo.jsx
│       │           ├── PaymentStatus.jsx
│       │           └── TransactionNetwork.jsx
│       │
│       └── pages/
│             ├── DepositPage.jsx
│             ├── WithdrawPage.jsx
│             ├── TransferPage.jsx
│             └── CoinDetailPage.jsx
│
│
├── backend/
│
│   ├── config/
│   │      payment.py
│   │
│   ├── providers/
│   │      payment/
│   │          __init__.py
│   │          base.py
│   │          onexgate.py
│   │
│   ├── services/
│   │      payment_service.py
│   │
│   ├── api/
│   │      payment.py
│   │
│   ├── webhooks/
│   │      onexgate.py
│   │
│   ├── models/
│   │      deposit.py
│   │      withdraw.py
│   │
│   └── tasks/
│          payment_sync.py
│
└── .env




Backend
--------
api
domain
services
repositories
providers
models
dto
events
notifications
tasks
utils
config

Frontend Web
-------------
api
services
repositories
stores
hooks
models
dto
events
notifications
utils
config

Frontend Mobile
----------------
api
services
repositories
stores
hooks
models
dto
events
notifications
utils
config










# backend/
│
├── app.py
├── main.py
├── requirements.txt
├── .env
├── .env.example
│
├── api/
│   ├── __init__.py
│   ├── auth.py
│   ├── users.py
│   ├── wallets.py
│   ├── assets.py
│   ├── currencies.py
│   ├── networks.py
│   ├── balances.py
│   ├── transactions.py
│   ├── deposits.py
│   ├── withdrawals.py
│   ├── transfers.py
│   ├── swaps.py
│   ├── exchange.py
│   ├── payments.py
│   ├── cards.py
│   ├── notifications.py
│   ├── settings.py
│   ├── security.py
│   ├── kyc.py
│   ├── admin.py
│   ├── health.py
│   └── webhooks.py
│
├── domain/
│   ├── assets/
│   │   ├── asset_registry.py
│   │   ├── asset_validator.py
│   │   └── asset_rules.py
│   │
│   ├── currencies/
│   │   ├── currency_registry.py
│   │   ├── currency_rules.py
│   │   └── currency_validator.py
│   │
│   ├── networks/
│   │   ├── network_registry.py
│   │   ├── network_mapper.py
│   │   ├── network_rules.py
│   │   └── network_validator.py
│   │
│   ├── payment/
│   │   ├── payment_rules.py
│   │   ├── payment_validator.py
│   │   ├── fee_engine.py
│   │   ├── confirmation_engine.py
│   │   └── payment_policy.py
│   │
│   ├── wallet/
│   │   ├── wallet_rules.py
│   │   ├── balance_engine.py
│   │   └── address_allocator.py
│   │
│   └── swap/
│       ├── swap_engine.py
│       ├── swap_rules.py
│       └── rate_engine.py
│
├── services/
│   ├── auth_service.py
│   ├── user_service.py
│   ├── wallet_service.py
│   ├── balance_service.py
│   ├── payment_service.py
│   ├── deposit_service.py
│   ├── withdrawal_service.py
│   ├── transfer_service.py
│   ├── swap_service.py
│   ├── exchange_service.py
│   ├── notification_service.py
│   ├── audit_service.py
│   ├── blockchain_service.py
│   └── webhook_service.py
│
├── repositories/
│   ├── user_repository.py
│   ├── wallet_repository.py
│   ├── asset_repository.py
│   ├── balance_repository.py
│   ├── transaction_repository.py
│   ├── payment_repository.py
│   ├── deposit_repository.py
│   ├── withdrawal_repository.py
│   ├── transfer_repository.py
│   ├── swap_repository.py
│   ├── notification_repository.py
│   └── audit_repository.py
│
├── providers/
│   ├── payment/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── factory.py
│   │   ├── onexgate.py
│   │   ├── nowpayments.py
│   │   ├── coinpayments.py
│   │   └── mock.py
│   │
│   ├── exchange/
│   │   ├── base.py
│   │   ├── binance.py
│   │   ├── bybit.py
│   │   └── mock.py
│   │
│   ├── sms/
│   │   ├── base.py
│   │   ├── twilio.py
│   │   └── mock.py
│   │
│   ├── email/
│   │   ├── base.py
│   │   ├── resend.py
│   │   └── smtp.py
│   │
│   └── push/
│       ├── firebase.py
│       └── onesignal.py
│
├── webhooks/
│   ├── onexgate.py
│   ├── nowpayments.py
│   ├── binance.py
│   ├── stripe.py
│   └── telegram.py
│
├── tasks/
│   ├── payment_sync.py
│   ├── confirmation_checker.py
│   ├── expired_deposit.py
│   ├── reconcile.py
│   ├── wallet_balance_sync.py
│   ├── exchange_rate_sync.py
│   ├── notification_retry.py
│   └── cleanup.py
│
├── models/
│   ├── user.py
│   ├── wallet.py
│   ├── asset.py
│   ├── currency.py
│   ├── network.py
│   ├── wallet_address.py
│   ├── balance.py
│   ├── payment.py
│   ├── transaction.py
│   ├── deposit.py
│   ├── withdrawal.py
│   ├── transfer.py
│   ├── swap.py
│   ├── exchange_rate.py
│   ├── payment_event.py
│   ├── notification.py
│   ├── audit_log.py
│   └── kyc.py
│
├── dto/
│   ├── auth/
│   ├── wallet/
│   ├── payment/
│   │   ├── deposit_request.py
│   │   ├── deposit_response.py
│   │   ├── withdraw_request.py
│   │   ├── withdraw_response.py
│   │   ├── payment_status.py
│   │   └── estimate_fee.py
│   ├── swap/
│   └── transfer/
│
├── config/
│   ├── app.py
│   ├── database.py
│   ├── auth.py
│   ├── payment.py
│   ├── providers.py
│   ├── assets.py
│   ├── currencies.py
│   ├── networks.py
│   ├── fees.py
│   ├── limits.py
│   ├── confirmations.py
│   ├── notifications.py
│   └── security.py
│
├── utils/
│   ├── asset_mapper.py
│   ├── currency_formatter.py
│   ├── network_mapper.py
│   ├── address_validator.py
│   ├── crypto.py
│   ├── qr.py
│   ├── hash.py
│   ├── datetime.py
│   ├── pagination.py
│   ├── validator.py
│   ├── logger.py
│   └── response.py
│
├── events/
│   ├── event_bus.py
│   ├── payment_events.py
│   ├── wallet_events.py
│   ├── notification_events.py
│   ├── audit_events.py
│   └── handlers/
│       ├── payment_handler.py
│       ├── wallet_handler.py
│       ├── notification_handler.py
│       └── audit_handler.py
│
└── notifications/
    ├── email_templates/
    │   ├── deposit_success.html
    │   ├── withdraw_success.html
    │   ├── swap_completed.html
    │   └── verification.html
    │
    ├── push_templates/
    │   ├── deposit.json
    │   ├── withdraw.json
    │   └── transfer.json
    │
    ├── sms_templates/
    │   ├── otp.txt
    │   └── payment.txt
    │
    └── telegram_templates/
        ├── deposit.txt
        └── withdraw.txt





# frontend-web/
src/
│
├── api/
│   ├── client.js
│   ├── authApi.js
│   ├── walletApi.js
│   ├── paymentApi.js
│   ├── transactionApi.js
│   ├── marketApi.js
│   ├── notificationApi.js
│   └── userApi.js
│
├── config/
│   ├── api.js
│   ├── assets.js
│   ├── payment.js
│   ├── networks.js
│   ├── routes.js
│   ├── constants.js
│   ├── environment.js
│   └── i18n.js
│
├── services/
│   ├── authService.js
│   ├── walletService.js
│   ├── paymentService.js
│   ├── marketService.js
│   ├── notificationService.js
│   │
│   └── payment/
│       ├── paymentProvider.js
│       ├── oneXGateProvider.js
│       ├── providerFactory.js
│       └── index.js
│
├── repositories/
│   ├── authRepository.js
│   ├── walletRepository.js
│   ├── paymentRepository.js
│   ├── transactionRepository.js
│   └── marketRepository.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useWallet.js
│   ├── usePayment.js
│   ├── useMarket.js
│   ├── useTransactions.js
│   └── useTranslation.js
│
├── stores/
│   ├── authStore.js
│   ├── walletStore.js
│   ├── paymentStore.js
│   ├── marketStore.js
│   ├── notificationStore.js
│   └── settingsStore.js
│
├── models/
│   ├── Asset.js
│   ├── Network.js
│   ├── Deposit.js
│   ├── Withdraw.js
│   ├── Transaction.js
│   ├── Wallet.js
│   └── User.js
│
├── dto/
│   ├── CreateDepositDto.js
│   ├── CreateWithdrawDto.js
│   ├── DepositResponseDto.js
│   ├── WithdrawResponseDto.js
│   ├── WalletDto.js
│   └── TransactionDto.js
│
├── utils/
│   ├── assetMapper.js
│   ├── networkMapper.js
│   ├── currencyFormatter.js
│   ├── paymentFormatter.js
│   ├── validation.js
│   ├── qr.js
│   ├── clipboard.js
│   ├── date.js
│   └── helpers.js
│
├── events/
│   ├── paymentEvents.js
│   ├── walletEvents.js
│   └── notificationEvents.js
│
├── notifications/
│   ├── notificationService.js
│   ├── toast.js
│   └── push.js
│
├── components/
│
├── pages/
│
├── layouts/
│
├── routes/
│
├── styles/
│
└── public/
    └── assets/ -> ../../assets  // استفاده از سمبلیک لینک 
   



# frontend-mobile/
src/
│
├── api/
│
├── config/
│
├── services/
│   └── payment/
│       ├── paymentProvider.js
│       ├── oneXGateProvider.js
│       ├── providerFactory.js
│       └── index.js
│
├── repositories/
│
├── hooks/
│
├── stores/
│
├── models/
│
├── dto/
│
├── utils/
│
├── events/
│
├── notifications/
│
├── navigation/
│
├── screens/
│
├── components/
│
├── assets/
│
└── localization/










```