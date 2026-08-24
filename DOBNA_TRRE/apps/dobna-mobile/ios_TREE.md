```
dobna/                                    ← ریشه پروژه
│
├── apps/                                 ← 🚀 اپلیکیشن‌های نهایی (Presentation Layer)
│   │
│   ├── dobna-web/                        ← وب‌اپ (Next.js App Router)
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   ├── robots.txt
│   │   │   ├── manifest.json
│   │   │   └── sitemap.xml
│   │   ├── src/
│   │   │   ├── app/                     ← 📍 Routing & Pages (Grouped by Feature)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── not-found.tsx
│   │   │   │   ├── global-error.tsx
│   │   │   │   ├── (auth)/             ← صفحات احراز هویت
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── register/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── otp/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── forgot-password/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── reset-password/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── verify-email/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── callback/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── unauthorized/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── (dashboard)/        ← صفحات اصلی (داشبورد)
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── wallet/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── deposit/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── withdraw/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── transfer/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── swap/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── transactions/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── communities/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── create/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── [communityId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── chat/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [chatId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── settings/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── notifications/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── order/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── (game)/             ← صفحات بازی
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── rooms/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [roomId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── duel/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── create/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── [duelId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── challenge/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── create/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── [challengeId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── watch/
│   │   │   │   │       ├── duel/
│   │   │   │   │       │   └── [id]/
│   │   │   │   │       │       └── page.tsx
│   │   │   │   │       ├── challenge/
│   │   │   │   │       │   └── [id]/
│   │   │   │   │       │       └── page.tsx
│   │   │   │   │       └── room/
│   │   │   │   │           └── [id]/
│   │   │   │   │               └── page.tsx
│   │   │   │   └── api/                ← Route Handlers (Next.js API Routes)
│   │   │   │       ├── auth/
│   │   │   │       │   ├── login/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   ├── logout/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── refresh/
│   │   │   │       │       └── route.ts
│   │   │   │       ├── payment/
│   │   │   │       │   ├── callback/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── webhook/
│   │   │   │       │       └── route.ts
│   │   │   │       ├── upload/
│   │   │   │       │   └── route.ts
│   │   │   │       ├── health/
│   │   │   │       │   └── route.ts
│   │   │   │       └── version/
│   │   │   │           └── route.ts
│   │   │   ├── components/             ← 🎨 UI Components (Presentation Layer)
│   │   │   │   ├── ui/
│   │   │   │   ├── layout/
│   │   │   │   ├── navigation/
│   │   │   │   ├── dialogs/
│   │   │   │   ├── forms/
│   │   │   │   ├── charts/
│   │   │   │   ├── pages/
│   │   │   │   ├── game/
│   │   │   │   ├── wallet/
│   │   │   │   ├── community/
│   │   │   │   ├── chat/
│   │   │   │   ├── duel/
│   │   │   │   ├── challenge/
│   │   │   │   ├── profile/
│   │   │   │   └── shared/
│   │   │   ├── providers/             ← 🔌 React Providers
│   │   │   │   ├── AppProvider.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   ├── QueryProvider.tsx
│   │   │   │   ├── AuthProvider.tsx
│   │   │   │   ├── I18nProvider.tsx
│   │   │   │   ├── WalletProvider.tsx
│   │   │   │   ├── SocketProvider.tsx
│   │   │   │   ├── NotificationProvider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── lib/                   ← 📚 Web-Specific Utilities
│   │   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   ├── router/
│   │   │   │   ├── storage/
│   │   │   │   ├── guards/
│   │   │   │   ├── analytics/
│   │   │   │   └── index.ts
│   │   │   ├── styles/                ← 🎨 Web-Specific Styles
│   │   │   │   ├── globals.css
│   │   │   │   ├── variables.css
│   │   │   │   ├── themes.css
│   │   │   │   ├── animations.css
│   │   │   │   ├── rtl.css
│   │   │   │   ├── scrollbar.css
│   │   │   │   └── components/
│   │   │   ├── middleware.ts
│   │   │   └── instrumentation.ts
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.ts
│   │   ├── eslint.config.js
│   │   └── .env.local
│   │
│   └── dobna-mobile/                   ← اپ موبایل (React Native)
│       │
│       ├── android/                    ← 📱 Native Android Layer
│       │   ├── app/
│       │   │   ├── build.gradle
│       │   │   ├── proguard-rules.pro
│       │   │   └── src/
│       │   │       ├── main/
│       │   │       │   ├── AndroidManifest.xml
│       │   │       │   ├── java/com/dobna/
│       │   │       │   │   ├── MainActivity.kt
│       │   │       │   │   ├── MainApplication.kt
│       │   │       │   │   ├── modules/        ← Native Bridgeها
│       │   │       │   │   │   ├── biometric/
│       │   │       │   │   │   ├── securestorage/
│       │   │       │   │   │   ├── camera/
│       │   │       │   │   │   ├── qr/
│       │   │       │   │   │   ├── notifications/
│       │   │       │   │   │   └── deeplink/
│       │   │       │   │   ├── services/       ← سرویس‌های Native
│       │   │       │   │   ├── receivers/      ← Broadcast Receivers
│       │   │       │   │   ├── utils/          ← ابزارهای Native
│       │   │       │   │   └── config/         ← تنظیمات Native
│       │   │       │   ├── res/
│       │   │       │   ├── debug/
│       │   │       │   ├── release/
│       │   │       │   └── google-services.json
│       │   │       └── build.gradle
│       │   ├── gradle/
│       │   ├── build.gradle
│       │   ├── settings.gradle
│       │   ├── gradle.properties
│       │   ├── gradlew
│       │   ├── gradlew.bat
│       │   ├── keystore/
│       │   └── local.properties
│       │
│       ├── ios/                        ← 📱 Native iOS Layer
│       │   ├── Dobna/
│       │   │   ├── AppDelegate.swift
│       │   │   ├── SceneDelegate.swift
│       │   │   ├── Info.plist
│       │   │   ├── LaunchScreen.storyboard
│       │   │   ├── Assets.xcassets/
│       │   │   │   ├── AppIcon.appiconset/
│       │   │   │   ├── Splash.imageset/
│       │   │   │   └── Contents.json
│       │   │   ├── Fonts/
│       │   │   ├── Config/
│       │   │   │   ├── GoogleService-Info.plist
│       │   │   │   ├── Environment.swift
│       │   │   │   └── BuildConfig.swift
│       │   │   ├── Native/             ← Native Bridgeها
│       │   │   │   ├── Auth/
│       │   │   │   │   ├── BiometricAuth.swift
│       │   │   │   │   └── KeychainManager.swift
│       │   │   │   ├── Wallet/
│       │   │   │   │   ├── SecureStorage.swift
│       │   │   │   │   └── WalletBridge.swift
│       │   │   │   ├── Payment/
│       │   │   │   │   ├── PaymentBridge.swift
│       │   │   │   │   └── OneXGateBridge.swift
│       │   │   │   ├── Camera/
│       │   │   │   │   └── QRScannerBridge.swift
│       │   │   │   ├── Notifications/
│       │   │   │   │   ├── NotificationManager.swift
│       │   │   │   │   └── PushNotification.swift
│       │   │   │   ├── Audio/
│       │   │   │   │   └── AudioManager.swift
│       │   │   │   └── Device/
│       │   │   │       ├── DeviceInfo.swift
│       │   │   │       └── NetworkMonitor.swift
│       │   │   └── Extensions/
│       │   │       ├── UIColor+Extension.swift
│       │   │       ├── UIView+Extension.swift
│       │   │       └── String+Extension.swift
│       │   ├── Dobna.xcodeproj/
│       │   ├── Dobna.xcworkspace/
│       │   ├── DobnaTests/             ← تست‌های Native
│       │   │   ├── AuthTests.swift
│       │   │   ├── WalletTests.swift
│       │   │   └── PaymentTests.swift
│       │   ├── DobnaUITests/
│       │   ├── Podfile
│       │   ├── Podfile.lock
│       │   ├── fastlane/               ← انتشار App
│       │   │   ├── Appfile
│       │   │   ├── Fastfile
│       │   │   └── Matchfile
│       │   └── .gitignore
│       │
│       ├── src/                        ← 📱 React Native Code (Presentation Layer)
│       │   ├── app/
│       │   │   ├── App.tsx
│       │   │   └── navigation/
│       │   ├── screens/
│       │   │   ├── auth/
│       │   │   ├── home/
│       │   │   ├── wallet/
│       │   │   ├── game/
│       │   │   ├── duel/
│       │   │   ├── challenge/
│       │   │   ├── community/
│       │   │   ├── chat/
│       │   │   ├── profile/
│       │   │   └── settings/
│       │   ├── components/
│       │   │   ├── common/
│       │   │   ├── layout/
│       │   │   ├── navigation/
│       │   │   ├── wallet/
│       │   │   ├── game/
│       │   │   ├── duel/
│       │   │   ├── challenge/
│       │   │   ├── community/
│       │   │   ├── chat/
│       │   │   └── profile/
│       │   ├── providers/             ← React Native Providers
│       │   ├── hooks/                 ← React Native Hooks
│       │   ├── services/              ← Native Services (Biometric, Camera, Notification)
│       │   ├── theme/                 ← Mobile Theme
│       │   ├── utils/                 ← Mobile Utilities
│       │   ├── config/                ← Mobile Config
│       │   ├── constants/
│       │   ├── types/
│       │   └── index.ts
│       │
│       ├── assets/                    ← Native Assets (فقط فایل‌های مخصوص موبایل)
│       ├── package.json
│       ├── tsconfig.json
│       ├── metro.config.js
│       ├── babel.config.js
│       ├── react-native.config.js
│       ├── .env
│       ├── .env.example
│       ├── .gitignore
│       ├── app.json
│       └── README.md
│
├── packages/                             ← 📦 Shared Packages (Business Logic + Infrastructure)
│   │
│   ├── shared-resources/                 ← فایل‌های استاتیک (تصاویر، فونت، صدا، انیمیشن)
│   │   ├── src/
│   │   │   ├── animations/ (Lottie JSON)
│   │   │   ├── fonts/ (TTF)
│   │   │   ├── icons/ (crypto, flags, ui, social)
│   │   │   ├── images/ (logo, avatars, badges, backgrounds, cards, notes)
│   │   │   ├── audio/ (ui, game, transaction, notification, auth, effects, ambient)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-finance/                   ← اطلاعات مالی (Registry ارزها، شبکه‌ها، کارمزدها)
│   │   ├── src/
│   │   │   ├── assets/ (registry.ts, helpers.ts, types.ts)
│   │   │   ├── currencies/
│   │   │   ├── networks/
│   │   │   ├── fees/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-i18n/                      ← ترجمه‌ها (۱۷ زبان)
│   │   ├── src/
│   │   │   ├── locales/ (en, fa, tr, ar, ...)
│   │   │   ├── i18n.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-types/                     ← TypeScript Types (پوشه‌بندی حوزه‌ای)
│   │   ├── src/
│   │   │   ├── auth/ (User, Session, Permission)
│   │   │   ├── wallet/ (Wallet, Balance, Deposit, Withdraw, Transaction)
│   │   │   ├── game/ (Game, Card, Level)
│   │   │   ├── duel/ (Duel, DuelParticipant)
│   │   │   ├── challenge/ (Challenge, ChallengeParticipant)
│   │   │   ├── community/ (Community, CommunityMember)
│   │   │   ├── chat/ (Message, Room)
│   │   │   ├── payment/ (Payment)
│   │   │   ├── common/ (Asset, Currency, Network, Address)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-utils/                     ← Utility Functions (دسته‌بندی‌شده)
│   │   ├── src/
│   │   │   ├── format/ (currency, payment, price, time)
│   │   │   ├── game/ (winnerChecker, duelHelper, cardValidator)
│   │   │   ├── crypto/ (qrGenerator, networkMapper, assetMapper)
│   │   │   ├── avatar/ (avatarGenerator, emojiMap)
│   │   │   ├── share/ (shareHelper)
│   │   │   ├── finance/ (interestCalculator)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-constants/                 ← مقادیر کاملاً ثابت
│   │   ├── src/
│   │   │   ├── currencies.ts
│   │   │   ├── countries.ts
│   │   │   ├── locales.ts
│   │   │   ├── gameLevels.ts
│   │   │   ├── colors.ts
│   │   │   ├── icons.ts
│   │   │   ├── regex.ts
│   │   │   ├── numbers.ts
│   │   │   ├── dateFormats.ts
│   │   │   ├── storageKeys.ts
│   │   │   ├── networks.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-config/                    ← تنظیمات (Env, API, Feature Flags)
│   │   ├── src/
│   │   │   ├── env.ts
│   │   │   ├── api.ts
│   │   │   ├── featureFlags.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-auth/                      ← احراز هویت (Login, OTP, Session, OAuth)
│   │   ├── src/
│   │   │   ├── auth/ (login, logout, register, refreshToken, verifyOtp)
│   │   │   ├── session/ (sessionManager, tokenManager, storage, permissions)
│   │   │   ├── oauth/ (google, apple, telegram, github)
│   │   │   ├── validators/ (email, phone, username, password, otp)
│   │   │   ├── types/
│   │   │   ├── interfaces/
│   │   │   ├── utils/ (jwt, token, otp, hash, crypto, device)
│   │   │   ├── constants/
│   │   │   ├── errors/
│   │   │   ├── hooks/ (useSession, useCurrentUser, useAuthState)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-wallet/                    ← مدیریت کیف پول (موجودی، واریز، برداشت، انتقال، Swap)
│   │   ├── src/
│   │   │   ├── balances/
│   │   │   ├── deposit/
│   │   │   ├── withdraw/
│   │   │   ├── transfer/
│   │   │   ├── swap/
│   │   │   ├── transaction/
│   │   │   ├── assets/ (registry.ts, helpers.ts, types.ts)
│   │   │   ├── hooks/ (useWallet)
│   │   │   ├── providers/ (WalletProvider, WalletContext)
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-payment/                   ← درگاه پرداخت (چنددرگاهی با 1xGate)
│   │   ├── src/
│   │   │   ├── core/ (PaymentGateway, PaymentFactory, PaymentManager)
│   │   │   ├── onexgate/ (auth, wallet, deposit, withdraw, transfer, swap, order, transaction)
│   │   │   ├── interfaces/ (IAuthService, IWalletService, ...)
│   │   │   ├── types/ (مدل‌های اختصاصی API)
│   │   │   ├── utils/ (amount, currency, network, address, validator, signer, qr)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-community/                 ← مدیریت انجمن‌ها و گروه‌ها
│   │   ├── src/
│   │   │   ├── types/ (Community, CommunityMember, CommunityRole, CommunityRank)
│   │   │   ├── interfaces/ (CommunityRepository, CommunityService, MemberService)
│   │   │   ├── constants/ (communityRoles, communityLimits, rankLevels)
│   │   │   ├── services/ (communityService, memberService, rankingService)
│   │   │   ├── validators/ (communityValidator, groupNameValidator)
│   │   │   ├── mappers/ (communityMapper, memberMapper)
│   │   │   ├── permissions/ (communityPermissions, rolePermissions)
│   │   │   ├── events/ (communityEvents, memberEvents)
│   │   │   ├── utils/ (communityFormatter, rankCalculator, memberCounter)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-chat/                      ← منطق چت و پیام‌رسانی
│   │   ├── src/
│   │   │   ├── messages/ (sendMessage, editMessage, deleteMessage, replyMessage, pinMessage)
│   │   │   ├── conversations/ (createConversation, getConversation, listConversations)
│   │   │   ├── groups/ (createGroupChat, addMember, removeMember, promoteAdmin)
│   │   │   ├── realtime/ (subscribeMessages, subscribeTyping, subscribePresence)
│   │   │   ├── presence/ (onlineStatus, lastSeen)
│   │   │   ├── media/ (uploadImage, uploadAudio, voiceMessage)
│   │   │   ├── moderation/ (reportMessage, blockUser, filterContent)
│   │   │   ├── notifications/ (chatNotification, mentionNotification)
│   │   │   ├── types/ (Message, Conversation, ChatMember, ChatRoom)
│   │   │   ├── interfaces/ (IChatProvider, IMessageRepository, IRealtimeProvider)
│   │   │   ├── constants/ (messageTypes, chatTypes, limits)
│   │   │   ├── validators/ (messageValidator, attachmentValidator)
│   │   │   ├── errors/ (ChatError, MessageError)
│   │   │   ├── utils/ (messageFormatter, mentionParser, emojiParser)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-game/                      ← منطق اصلی بازی (بینگو، سطح‌بندی)
│   │   ├── src/
│   │   │   ├── card/ (generate, validate, mark)
│   │   │   ├── level/ (levels, progression)
│   │   │   ├── winner/ (checkWinner, fullHouse)
│   │   │   ├── timer/ (gameTimer)
│   │   │   ├── hooks/ (useGame)
│   │   │   ├── providers/ (GameProvider, GameContext)
│   │   │   ├── types/ (Game, Card, Level)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-duel/                      ← مدیریت دوئل‌ها (۱ به ۱)
│   │   ├── src/
│   │   │   ├── types/ (Duel, DuelStatus, DuelType, DuelParticipant, DuelResult)
│   │   │   ├── interfaces/ (DuelRepository, DuelService, DuelEngine)
│   │   │   ├── constants/ (duelLimits, duelStatus, duelFees, duelLevels)
│   │   │   ├── services/ (duelService, duelCreationService, duelJoinService)
│   │   │   ├── engine/ (duelEngine, winnerCalculator, cardMatcher)
│   │   │   ├── validators/ (duelValidator, createDuelValidator, joinDuelValidator)
│   │   │   ├── mappers/ (duelMapper, participantMapper)
│   │   │   ├── permissions/ (duelPermissions)
│   │   │   ├── events/ (duelEvents)
│   │   │   ├── utils/ (duelFormatter, duelTimer, prizeCalculator)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-challenge/                 ← مدیریت چالش‌ها (چندنفره، سطح‌بندی، استخر جایزه)
│   │   ├── src/
│   │   │   ├── types/ (Challenge, ChallengeStatus, ChallengeParticipant, ChallengeLevel)
│   │   │   ├── interfaces/ (ChallengeRepository, ChallengeService, ChallengeEngine)
│   │   │   ├── constants/ (challengeLimits, challengeLevels, challengeFees, challengeCooldown)
│   │   │   ├── services/ (challengeService, challengeCreationService, challengeJoinService)
│   │   │   ├── engine/ (challengeEngine, winnerCalculator, rankingCalculator)
│   │   │   ├── validators/ (challengeValidator, createChallengeValidator, joinChallengeValidator)
│   │   │   ├── mappers/ (challengeMapper, participantMapper)
│   │   │   ├── permissions/ (challengePermissions)
│   │   │   ├── events/ (challengeEvents)
│   │   │   ├── utils/ (challengeFormatter, challengeTimer, poolCalculator)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-services/                  ← سرویس‌های عمومی (API, WebSocket, Storage, Notification)
│   │   ├── src/
│   │   │   ├── api/ (client, authApi, walletApi)
│   │   │   ├── websocket/ (socket, realtime)
│   │   │   ├── storage/ (localStorage, asyncStorage)
│   │   │   ├── notification/ (push, inApp, toast)
│   │   │   ├── upload/ (upload)
│   │   │   ├── download/ (download)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-database/                  ← Supabase Client + Repository‌ها
│   │   ├── src/
│   │   │   ├── supabase/ (client, types)
│   │   │   ├── repositories/ (UserRepository, WalletRepository, TransactionRepository)
│   │   │   ├── queries/ (users, wallets, transactions)
│   │   │   ├── mutations/ (createWallet, createTransaction)
│   │   │   ├── types/ (Database, Tables)
│   │   │   ├── generated/ (database.types.ts)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-validators/                ← Zod Schemas + Validators
│   │   ├── src/
│   │   │   ├── auth/ (email, phone, username, password, otp, did)
│   │   │   ├── wallet/ (amount, balance, currency, network, address)
│   │   │   ├── payment/ (order, invoice, paymentLink)
│   │   │   ├── transfer/ (receiver, amount, memo)
│   │   │   ├── swap/ (pair, amount)
│   │   │   ├── game/ (card, room, level, duel, challenge)
│   │   │   ├── community/ (groupName, username, community)
│   │   │   ├── profile/ (displayName, bio, avatar)
│   │   │   ├── common/ (uuid, url, image, file, json, date, number, string)
│   │   │   ├── schemas/ (auth, wallet, payment, profile, community, game)
│   │   │   ├── errors/ (ValidationError, ErrorCodes)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-errors/                    ← مدیریت خطاهای مشترک
│   │   ├── src/
│   │   │   ├── codes/ (authErrors, walletErrors, paymentErrors, transactionErrors)
│   │   │   ├── classes/ (AppError, ValidationError, AuthenticationError)
│   │   │   ├── formatters/ (errorFormatter, apiErrorFormatter, i18nErrorMapper)
│   │   │   ├── handlers/ (errorHandler, asyncErrorHandler)
│   │   │   ├── types/ (ErrorCode, ErrorResponse, ErrorMetadata)
│   │   │   ├── utils/ (isAppError, getErrorCode, normalizeError)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-logger/                    ← Logger مشترک (Console, File, Remote)
│   │   ├── src/
│   │   │   ├── logger/ (logger, levels, formatters)
│   │   │   ├── transports/ (consoleTransport, fileTransport, remoteTransport)
│   │   │   ├── context/ (requestContext, userContext, traceContext)
│   │   │   ├── types/ (LogLevel, LogEvent, LoggerConfig)
│   │   │   ├── constants/ (logEvents)
│   │   │   ├── adapters/ (sentry, telemetry, analytics)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-telemetry/                 ← مشاهده‌پذیری (Logs, Metrics, Tracing, Events, Crash)
│   │   ├── src/
│   │   │   ├── logger/ (logger, levels, formatter, consoleTransport, remoteTransport)
│   │   │   ├── metrics/ (counter, gauge, histogram, timer)
│   │   │   ├── tracing/ (tracer, span, context)
│   │   │   ├── events/ (analyticsEvent, eventTracker, eventNames)
│   │   │   ├── crash/ (crashReporter, errorBoundary)
│   │   │   ├── providers/ (sentry, datadog, firebase)
│   │   │   ├── interfaces/ (ILogger, IMetrics, ITracer, ICrashReporter)
│   │   │   ├── types/ (LogEntry, Metric, Trace, Event)
│   │   │   ├── constants/ (environments, logLevels)
│   │   │   ├── utils/ (sanitize, maskSensitive, deviceInfo, sessionInfo)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── shared-hooks/                     ← React Hooks مشترک
│       ├── src/
│       │   ├── useAuth.ts
│       │   ├── useWallet.ts
│       │   ├── useTheme.ts
│       │   ├── useGame.ts
│       │   ├── useCommunity.ts
│       │   ├── useNotification.ts
│       │   ├── usePayment.ts
│       │   ├── useDuel.ts
│       │   ├── useChallenge.ts
│       │   ├── useTranslation.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── supabase/                             ← 🗄️ Supabase (در ریشه)
│   ├── migrations/                       ← ساخت جدول‌ها، Index، RLS
│   │   ├── 0001_shared_extensions.sql
│   │   ├── 0002_shared_profiles.sql
│   │   ├── ...
│   │   ├── dobna/                        ← migration‌های مختص بازی دوبنا
│   │   │   ├── 0100_dobna_game_cards.sql
│   │   │   ├── 0101_dobna_duels.sql
│   │   │   └── ...
│   │   └── poplan/                       ← 🆕 migration‌های مختص پاپلان (آینده)
│   ├── functions/                        ← توابع PostgreSQL
│   │   ├── shared/                       ← توابع عمومی
│   │   ├── dobna/                        ← توابع مختص دوبنا
│   │   └── poplan/                       ← 🆕 توابع مختص پاپلان
│   ├── seed.sql
│   └── config.toml
│
├── backend/                              ← 🖥️ Backend (اختیاری – برای سرویس‌های سنگین)
│   ├── src/
│   │   ├── api/
│   │   ├── services/
│   │   ├── providers/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── dto/
│   │   ├── events/
│   │   ├── tasks/
│   │   ├── utils/
│   │   └── config/
│   ├── app.py / main.py
│   ├── requirements.txt / package.json
│   └── .env
│
├── docs/                                 ← 📄 مستندات
│   ├── api.md
│   ├── architecture.md
│   ├── database-schema.md
│   ├── game-rules.md
│   ├── deployment.md
│   └── assets-guide.md
│
├── scripts/                              ← اسکریپت‌های کمکی
│   ├── copy-assets.sh
│   ├── deploy-web.sh
│   ├── seed-database.js
│   └── migrate-all.sh
│
├── .github/                              ← GitHub Actions
│   └── workflows/
│       ├── deploy-assets.yml
│       ├── deploy-web.yml
│       ├── deploy-mobile.yml
│       └── test.yml
│
├── .env.example
├── .gitignore
├── package.json                          ← Workspace root (pnpm یا npm)
├── pnpm-workspace.yaml
├── LICENSE
└── README.md


```