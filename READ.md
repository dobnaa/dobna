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
│   │   │   │   ├── ETH/                  # سایر رمزارزها
│   │   │   │   ├── USDT/
│   │   │   │   ├── SOL/
│   │   │   │   ├── BNB/
│   │   │   │   ├── DOGE/
│   │   │   │   ├── TON/
│   │   │   │   ├── BONK/
│   │   │   │   ├── PEPE/
│   │   │   │   └── HMSTR/
│   │   │   └── fiat/                     # فیات‌ها
│   │   │       ├── USD/
│   │   │       ├── IRT/
│   │   │       ├── EUR/
│   │   │       ├── TRY/
│   │   │       ├── GBP/
│   │   │       ├── AED/
│   │   │       ├── CNY/
│   │   │       ├── INR/
│   │   │       ├── CAD/
│   │   │       ├── CHF/
│   │   │       └── AUD/
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





```