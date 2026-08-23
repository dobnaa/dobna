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
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── not-found.tsx
│   │   │   │   ├── global-error.tsx
│   │   │   │   ├── (auth)/
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
│   │   │   │   ├── (dashboard)/
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
│   │   │   │   ├── (game)/
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
│   │   │   │   └── api/
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
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── layout/
│   │   │   │   │   ├── RootLayout.tsx
│   │   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   │   ├── AuthLayout.tsx
│   │   │   │   │   ├── GameLayout.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── BottomBar.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── navigation/
│   │   │   │   │   ├── Navbar.tsx
│   │   │   │   │   ├── BottomNavigation.tsx
│   │   │   │   │   ├── Breadcrumb.tsx
│   │   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   │   ├── ThemeSwitcher.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dialogs/
│   │   │   │   │   ├── ConfirmDialog.tsx
│   │   │   │   │   ├── AlertDialog.tsx
│   │   │   │   │   ├── ErrorDialog.tsx
│   │   │   │   │   ├── SuccessDialog.tsx
│   │   │   │   │   ├── QRDialog.tsx
│   │   │   │   │   ├── ShareDialog.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── forms/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   ├── OTPForm.tsx
│   │   │   │   │   ├── DepositForm.tsx
│   │   │   │   │   ├── WithdrawForm.tsx
│   │   │   │   │   ├── SwapForm.tsx
│   │   │   │   │   ├── TransferForm.tsx
│   │   │   │   │   ├── CreateCommunityForm.tsx
│   │   │   │   │   ├── CreateDuelForm.tsx
│   │   │   │   │   ├── CreateChallengeForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── charts/
│   │   │   │   │   ├── BalanceChart.tsx
│   │   │   │   │   ├── PriceChart.tsx
│   │   │   │   │   ├── PortfolioChart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── HomePage.tsx
│   │   │   │   │   ├── WalletPage.tsx
│   │   │   │   │   ├── CommunityPage.tsx
│   │   │   │   │   ├── DuelPage.tsx
│   │   │   │   │   ├── ChallengePage.tsx
│   │   │   │   │   ├── ChatPage.tsx
│   │   │   │   │   ├── ProfilePage.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── game/
│   │   │   │   │   ├── BingoCard.tsx
│   │   │   │   │   ├── NumberBall.tsx
│   │   │   │   │   ├── WinnerBanner.tsx
│   │   │   │   │   ├── GameTimer.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── wallet/
│   │   │   │   │   ├── WalletCard.tsx
│   │   │   │   │   ├── AssetCard.tsx
│   │   │   │   │   ├── TransactionItem.tsx
│   │   │   │   │   ├── QRCode.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── community/
│   │   │   │   │   ├── CommunityCard.tsx
│   │   │   │   │   ├── MemberCard.tsx
│   │   │   │   │   ├── RankBadge.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── chat/
│   │   │   │   │   ├── ChatList.tsx
│   │   │   │   │   ├── MessageBubble.tsx
│   │   │   │   │   ├── MessageInput.tsx
│   │   │   │   │   ├── TypingIndicator.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── duel/
│   │   │   │   │   ├── DuelCard.tsx
│   │   │   │   │   ├── DuelStatus.tsx
│   │   │   │   │   ├── DuelPrize.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── challenge/
│   │   │   │   │   ├── ChallengeCard.tsx
│   │   │   │   │   ├── ChallengeStatus.tsx
│   │   │   │   │   ├── ChallengePrize.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── profile/
│   │   │   │   │   ├── Avatar.tsx
│   │   │   │   │   ├── UserCard.tsx
│   │   │   │   │   ├── UserStats.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── shared/
│   │   │   │       ├── EmptyState.tsx
│   │   │   │       ├── Loading.tsx
│   │   │   │       ├── Spinner.tsx
│   │   │   │       ├── ErrorState.tsx
│   │   │   │       ├── SearchBar.tsx
│   │   │   │       ├── Skeleton.tsx
│   │   │   │       ├── Badge.tsx
│   │   │   │       ├── Chip.tsx
│   │   │   │       ├── Tooltip.tsx
│   │   │   │       ├── CopyButton.tsx
│   │   │   │       ├── Countdown.tsx
│   │   │   │       └── index.ts
│   │   │   ├── providers/
│   │   │   │   ├── AppProvider.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   ├── QueryProvider.tsx
│   │   │   │   ├── AuthProvider.tsx
│   │   │   │   ├── I18nProvider.tsx
│   │   │   │   ├── WalletProvider.tsx
│   │   │   │   ├── SocketProvider.tsx
│   │   │   │   ├── NotificationProvider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── lib/
│   │   │   │   ├── api/
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── endpoints.ts
│   │   │   │   │   └── interceptors.ts
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth-client.ts
│   │   │   │   │   └── session.ts
│   │   │   │   ├── router/
│   │   │   │   │   └── routes.ts
│   │   │   │   ├── storage/
│   │   │   │   │   ├── localStorage.ts
│   │   │   │   │   └── cookies.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── authGuard.ts
│   │   │   │   │   └── roleGuard.ts
│   │   │   │   ├── analytics/
│   │   │   │   │   └── events.ts
│   │   │   │   └── index.ts
│   │   │   ├── styles/
│   │   │   │   ├── globals.css
│   │   │   │   ├── variables.css
│   │   │   │   ├── themes.css
│   │   │   │   ├── animations.css
│   │   │   │   ├── rtl.css
│   │   │   │   ├── scrollbar.css
│   │   │   │   └── components/
│   │   │   │       ├── buttons.css
│   │   │   │       ├── cards.css
│   │   │   │       └── forms.css
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
│   ├── dobna-mobile/                        ← اپ موبایل (React Native)
│   │   ├── android/
│   │   │   ├── app/
│   │   │   │   ├── build.gradle
│   │   │   │   ├── proguard-rules.pro
│   │   │   │   └── src/
│   │   │   │       ├── main/
│   │   │   │       │   ├── AndroidManifest.xml
│   │   │   │       │   ├── java/
│   │   │   │       │   │   └── com/
│   │   │   │       │   │       └── dobna/
│   │   │   │       │   │           ├── MainActivity.kt
│   │   │   │       │   │           ├── MainApplication.kt
│   │   │   │       │   │           ├── modules/
│   │   │   │       │   │           │   ├── biometric/
│   │   │   │       │   │           │   │   ├── BiometricModule.kt
│   │   │   │       │   │           │   │   └── BiometricPackage.kt
│   │   │   │       │   │           │   ├── securestorage/
│   │   │   │       │   │           │   │   ├── SecureStorageModule.kt
│   │   │   │       │   │           │   │   └── SecureStoragePackage.kt
│   │   │   │       │   │           │   ├── camera/
│   │   │   │       │   │           │   │   ├── CameraModule.kt
│   │   │   │       │   │           │   │   └── CameraPackage.kt
│   │   │   │       │   │           │   ├── qr/
│   │   │   │       │   │           │   │   ├── QRScannerModule.kt
│   │   │   │       │   │           │   │   └── QRScannerPackage.kt
│   │   │   │       │   │           │   ├── notifications/
│   │   │   │       │   │           │   │   ├── NotificationModule.kt
│   │   │   │       │   │           │   │   └── NotificationPackage.kt
│   │   │   │       │   │           │   └── deeplink/
│   │   │   │       │   │           │       ├── DeepLinkModule.kt
│   │   │   │       │   │           │       └── DeepLinkPackage.kt
│   │   │   │       │   │           ├── services/
│   │   │   │       │   │           │   ├── FirebaseService.kt
│   │   │   │       │   │           │   ├── PushNotificationService.kt
│   │   │   │       │   │           │   └── BackgroundService.kt
│   │   │   │       │   │           ├── receivers/
│   │   │   │       │   │           │   ├── BootReceiver.kt
│   │   │   │       │   │           │   └── NotificationReceiver.kt
│   │   │   │       │   │           ├── utils/
│   │   │   │       │   │           │   ├── DeviceUtils.kt
│   │   │   │       │   │           │   ├── SecurityUtils.kt
│   │   │   │       │   │           │   └── PermissionUtils.kt
│   │   │   │       │   │           └── config/
│   │   │   │       │   │               ├── BuildConfig.kt
│   │   │   │       │   │               └── AppConfig.kt
│   │   │   │       │   ├── res/
│   │   │   │       │   │   ├── drawable/
│   │   │   │       │   │   │   ├── splash.xml
│   │   │   │       │   │   │   └── backgrounds.xml
│   │   │   │       │   │   ├── mipmap-hdpi/
│   │   │   │       │   │   ├── mipmap-mdpi/
│   │   │   │       │   │   ├── mipmap-xhdpi/
│   │   │   │       │   │   ├── mipmap-xxhdpi/
│   │   │   │       │   │   ├── mipmap-xxxhdpi/
│   │   │   │       │   │   ├── values/
│   │   │   │       │   │   │   ├── colors.xml
│   │   │   │       │   │   │   ├── strings.xml
│   │   │   │       │   │   │   ├── styles.xml
│   │   │   │       │   │   │   └── themes.xml
│   │   │   │       │   │   └── xml/
│   │   │   │       │   │       ├── network_security_config.xml
│   │   │   │       │   │       └── file_paths.xml
│   │   │   │       │   ├── debug/
│   │   │   │       │   │   └── AndroidManifest.xml
│   │   │   │       │   └── release/
│   │   │   │       │       └── AndroidManifest.xml
│   │   │   │       └── google-services.json
│   │   │   ├── gradle/
│   │   │   │   └── wrapper/
│   │   │   │       └── gradle-wrapper.properties
│   │   │   ├── build.gradle
│   │   │   ├── settings.gradle
│   │   │   ├── gradle.properties
│   │   │   ├── gradlew
│   │   │   ├── gradlew.bat
│   │   │   ├── keystore/
│   │   │   │   └── dobna-release.keystore
│   │   │   └── local.properties
│   │   ├── ios/
│   │   │   ├── Dobna/
│   │   │   │   ├── AppDelegate.swift
│   │   │   │   ├── SceneDelegate.swift
│   │   │   │   ├── Info.plist
│   │   │   │   ├── LaunchScreen.storyboard
│   │   │   │   ├── Assets.xcassets/
│   │   │   │   │   ├── AppIcon.appiconset/
│   │   │   │   │   ├── Splash.imageset/
│   │   │   │   │   └── Contents.json
│   │   │   │   ├── Fonts/
│   │   │   │   │   └── *.ttf
│   │   │   │   ├── Config/
│   │   │   │   │   ├── GoogleService-Info.plist
│   │   │   │   │   ├── Environment.swift
│   │   │   │   │   └── BuildConfig.swift
│   │   │   │   ├── Native/
│   │   │   │   │   ├── Auth/
│   │   │   │   │   │   ├── BiometricAuth.swift
│   │   │   │   │   │   └── KeychainManager.swift
│   │   │   │   │   ├── Wallet/
│   │   │   │   │   │   ├── SecureStorage.swift
│   │   │   │   │   │   └── WalletBridge.swift
│   │   │   │   │   ├── Payment/
│   │   │   │   │   │   ├── PaymentBridge.swift
│   │   │   │   │   │   └── OneXGateBridge.swift
│   │   │   │   │   ├── Camera/
│   │   │   │   │   │   └── QRScannerBridge.swift
│   │   │   │   │   ├── Notifications/
│   │   │   │   │   │   ├── NotificationManager.swift
│   │   │   │   │   │   └── PushNotification.swift
│   │   │   │   │   ├── Audio/
│   │   │   │   │   │   └── AudioManager.swift
│   │   │   │   │   └── Device/
│   │   │   │   │       ├── DeviceInfo.swift
│   │   │   │   │       └── NetworkMonitor.swift
│   │   │   │   └── Extensions/
│   │   │   │       ├── UIColor+Extension.swift
│   │   │   │       ├── UIView+Extension.swift
│   │   │   │       └── String+Extension.swift
│   │   │   ├── Dobna.xcodeproj/
│   │   │   ├── Dobna.xcworkspace/
│   │   │   ├── DobnaTests/
│   │   │   │   ├── AuthTests.swift
│   │   │   │   ├── WalletTests.swift
│   │   │   │   └── PaymentTests.swift
│   │   │   ├── DobnaUITests/
│   │   │   │   └── LaunchTests.swift
│   │   │   ├── Podfile
│   │   │   ├── Podfile.lock
│   │   │   ├── fastlane/
│   │   │   │   ├── Appfile
│   │   │   │   ├── Fastfile
│   │   │   │   └── Matchfile
│   │   │   └── .gitignore
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── App.tsx
│   │   │   │   ├── navigation/
│   │   │   │   │   ├── RootNavigator.tsx
│   │   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   │   ├── MainNavigator.tsx
│   │   │   │   │   ├── GameNavigator.tsx
│   │   │   │   │   ├── WalletNavigator.tsx
│   │   │   │   │   ├── CommunityNavigator.tsx
│   │   │   │   │   ├── ChatNavigator.tsx
│   │   │   │   │   ├── ProfileNavigator.tsx
│   │   │   │   │   └── routes.ts
│   │   │   │   └── index.ts
│   │   │   ├── screens/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginScreen.tsx
│   │   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   │   ├── OTPScreen.tsx
│   │   │   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   │   │   ├── ResetPasswordScreen.tsx
│   │   │   │   │   ├── VerifyEmailScreen.tsx
│   │   │   │   │   ├── CallbackScreen.tsx
│   │   │   │   │   └── UnauthorizedScreen.tsx
│   │   │   │   ├── home/
│   │   │   │   │   └── HomeScreen.tsx
│   │   │   │   ├── wallet/
│   │   │   │   │   ├── WalletScreen.tsx
│   │   │   │   │   ├── DepositScreen.tsx
│   │   │   │   │   ├── WithdrawScreen.tsx
│   │   │   │   │   ├── TransferScreen.tsx
│   │   │   │   │   ├── SwapScreen.tsx
│   │   │   │   │   └── TransactionHistoryScreen.tsx
│   │   │   │   ├── game/
│   │   │   │   │   ├── GameRoomScreen.tsx
│   │   │   │   │   ├── GamePlayScreen.tsx
│   │   │   │   │   ├── GameResultScreen.tsx
│   │   │   │   │   └── GameRoomListScreen.tsx
│   │   │   │   ├── duel/
│   │   │   │   │   ├── DuelListScreen.tsx
│   │   │   │   │   ├── CreateDuelScreen.tsx
│   │   │   │   │   ├── DuelDetailScreen.tsx
│   │   │   │   │   ├── DuelWatchScreen.tsx
│   │   │   │   │   └── DuelResultScreen.tsx
│   │   │   │   ├── challenge/
│   │   │   │   │   ├── ChallengeListScreen.tsx
│   │   │   │   │   ├── CreateChallengeScreen.tsx
│   │   │   │   │   ├── ChallengeDetailScreen.tsx
│   │   │   │   │   ├── ChallengeWatchScreen.tsx
│   │   │   │   │   └── ChallengeResultScreen.tsx
│   │   │   │   ├── community/
│   │   │   │   │   ├── CommunityListScreen.tsx
│   │   │   │   │   ├── CommunityDetailScreen.tsx
│   │   │   │   │   ├── CreateCommunityScreen.tsx
│   │   │   │   │   ├── CommunityMembersScreen.tsx
│   │   │   │   │   └── CommunitySettingsScreen.tsx
│   │   │   │   ├── chat/
│   │   │   │   │   ├── ChatListScreen.tsx
│   │   │   │   │   ├── ChatRoomScreen.tsx
│   │   │   │   │   └── ChatSettingsScreen.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   ├── ProfileScreen.tsx
│   │   │   │   │   ├── EditProfileScreen.tsx
│   │   │   │   │   ├── NotificationSettingsScreen.tsx
│   │   │   │   │   ├── SecuritySettingsScreen.tsx
│   │   │   │   │   ├── PrivacySettingsScreen.tsx
│   │   │   │   │   └── LanguageSettingsScreen.tsx
│   │   │   │   └── settings/
│   │   │   │       ├── SettingsScreen.tsx
│   │   │   │       ├── AboutScreen.tsx
│   │   │   │       └── HelpScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   ├── Loader.tsx
│   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   ├── Spinner.tsx
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Avatar.tsx
│   │   │   │   │   ├── Badge.tsx
│   │   │   │   │   ├── Chip.tsx
│   │   │   │   │   ├── Tabs.tsx
│   │   │   │   │   ├── BottomSheet.tsx
│   │   │   │   │   ├── Toast.tsx
│   │   │   │   │   ├── SearchBar.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── layout/
│   │   │   │   │   ├── MainLayout.tsx
│   │   │   │   │   ├── AuthLayout.tsx
│   │   │   │   │   ├── GameLayout.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── navigation/
│   │   │   │   │   ├── BottomTabBar.tsx
│   │   │   │   │   ├── TopTabBar.tsx
│   │   │   │   │   ├── DrawerMenu.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── wallet/
│   │   │   │   │   ├── AssetCard.tsx
│   │   │   │   │   ├── BalanceCard.tsx
│   │   │   │   │   ├── TransactionItem.tsx
│   │   │   │   │   ├── QRCodeDisplay.tsx
│   │   │   │   │   ├── NetworkSelector.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── game/
│   │   │   │   │   ├── BingoCard.tsx
│   │   │   │   │   ├── NumberBoard.tsx
│   │   │   │   │   ├── NumberBall.tsx
│   │   │   │   │   ├── WinnerModal.tsx
│   │   │   │   │   ├── GameTimer.tsx
│   │   │   │   │   ├── CardSelector.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── duel/
│   │   │   │   │   ├── DuelCard.tsx
│   │   │   │   │   ├── DuelStatus.tsx
│   │   │   │   │   ├── DuelPrize.tsx
│   │   │   │   │   ├── DuelPlayers.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── challenge/
│   │   │   │   │   ├── ChallengeCard.tsx
│   │   │   │   │   ├── ChallengeStatus.tsx
│   │   │   │   │   ├── ChallengePrize.tsx
│   │   │   │   │   ├── ChallengeParticipants.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── community/
│   │   │   │   │   ├── CommunityCard.tsx
│   │   │   │   │   ├── MemberCard.tsx
│   │   │   │   │   ├── RankBadge.tsx
│   │   │   │   │   ├── CommunityHeader.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── chat/
│   │   │   │   │   ├── MessageBubble.tsx
│   │   │   │   │   ├── MessageInput.tsx
│   │   │   │   │   ├── TypingIndicator.tsx
│   │   │   │   │   ├── VoiceMessage.tsx
│   │   │   │   │   ├── ChatListItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── profile/
│   │   │   │       ├── UserCard.tsx
│   │   │   │       ├── UserStats.tsx
│   │   │   │       ├── AchievementCard.tsx
│   │   │   │       ├── LanguageSelector.tsx
│   │   │   │       ├── ThemeSelector.tsx
│   │   │   │       └── index.ts
│   │   │   ├── providers/
│   │   │   │   ├── AppProvider.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   ├── QueryProvider.tsx
│   │   │   │   ├── AuthProvider.tsx
│   │   │   │   ├── I18nProvider.tsx
│   │   │   │   ├── WalletProvider.tsx
│   │   │   │   ├── SocketProvider.tsx
│   │   │   │   ├── NotificationProvider.tsx
│   │   │   │   ├── BiometricProvider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useWallet.ts
│   │   │   │   ├── useSocket.ts
│   │   │   │   ├── useBiometric.ts
│   │   │   │   ├── usePermissions.ts
│   │   │   │   ├── useCamera.ts
│   │   │   │   ├── usePushNotification.ts
│   │   │   │   ├── useDeepLink.ts
│   │   │   │   ├── useDeviceInfo.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── biometric/
│   │   │   │   │   ├── biometricService.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── camera/
│   │   │   │   │   ├── cameraService.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── pushNotification.ts
│   │   │   │   │   ├── inAppNotification.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── storage/
│   │   │   │   │   ├── secureStorage.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── deepLink/
│   │   │   │   │   ├── deepLinkService.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── fileSystem/
│   │   │   │   │   ├── fileService.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── theme/
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   ├── spacing.ts
│   │   │   │   ├── darkTheme.ts
│   │   │   │   ├── lightTheme.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── device.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   ├── platform.ts
│   │   │   │   ├── dimensions.ts
│   │   │   │   ├── haptics.ts
│   │   │   │   ├── clipboard.ts
│   │   │   │   └── index.ts
│   │   │   ├── config/
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── navigation.config.ts
│   │   │   │   ├── api.config.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── routes.ts
│   │   │   │   ├── storageKeys.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── navigation.ts
│   │   │   │   ├── screen.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── animations/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── metro.config.js
│   │   ├── babel.config.js
│   │   ├── react-native.config.js
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── app.json
│   │   ├── README.md
│   │   └── Gemfile
│   │
│   └── dobna-admin/                        ← پنل مدیریت (Next.js)
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   ├── error.tsx
│       │   ├── not-found.tsx
│       │   ├── global-error.tsx
│       │   ├── (auth)/
│       │   │   ├── layout.tsx
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   └── forgot-password/
│       │   │       └── page.tsx
│       │   ├── (dashboard)/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── users/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [id]/
│       │   │   │       └── page.tsx
│       │   │   ├── wallets/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [address]/
│       │   │   │       └── page.tsx
│       │   │   ├── transactions/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [id]/
│       │   │   │       └── page.tsx
│       │   │   ├── payments/
│       │   │   │   └── page.tsx
│       │   │   ├── deposits/
│       │   │   │   └── page.tsx
│       │   │   ├── withdrawals/
│       │   │   │   └── page.tsx
│       │   │   ├── duels/
│       │   │   │   └── page.tsx
│       │   │   ├── challenges/
│       │   │   │   └── page.tsx
│       │   │   ├── games/
│       │   │   │   └── page.tsx
│       │   │   ├── communities/
│       │   │   │   └── page.tsx
│       │   │   ├── chat/
│       │   │   │   └── page.tsx
│       │   │   ├── notifications/
│       │   │   │   └── page.tsx
│       │   │   ├── reports/
│       │   │   │   └── page.tsx
│       │   │   ├── settings/
│       │   │   │   └── page.tsx
│       │   │   └── audit-log/
│       │   │       └── page.tsx
│       │   └── api/
│       │       ├── health/
│       │       │   └── route.ts
│       │       └── admin/
│       │           └── route.ts
│       ├── components/
│       │   ├── layout/
│       │   │   ├── AdminSidebar.tsx
│       │   │   ├── AdminHeader.tsx
│       │   │   ├── AdminBreadcrumb.tsx
│       │   │   ├── AdminFooter.tsx
│       │   │   ├── AdminNavigation.tsx
│       │   │   ├── AdminMobileMenu.tsx
│       │   │   └── index.ts
│       │   ├── users/
│       │   │   ├── UserTable.tsx
│       │   │   ├── UserCard.tsx
│       │   │   ├── UserStatusBadge.tsx
│       │   │   ├── UserRoleSelector.tsx
│       │   │   └── index.ts
│       │   ├── wallet/
│       │   │   ├── WalletTable.tsx
│       │   │   ├── BalanceCard.tsx
│       │   │   ├── AssetBalanceCard.tsx
│       │   │   └── index.ts
│       │   ├── transaction/
│       │   │   ├── TransactionTable.tsx
│       │   │   ├── TransactionStatus.tsx
│       │   │   ├── TransactionFilters.tsx
│       │   │   └── index.ts
│       │   ├── payment/
│       │   │   ├── PaymentTable.tsx
│       │   │   ├── GatewayStatus.tsx
│       │   │   ├── PaymentHistory.tsx
│       │   │   └── index.ts
│       │   ├── game/
│       │   │   ├── GameStats.tsx
│       │   │   ├── DuelManagement.tsx
│       │   │   ├── ChallengeManagement.tsx
│       │   │   └── index.ts
│       │   ├── community/
│       │   │   ├── CommunityTable.tsx
│       │   │   ├── CommunityStatus.tsx
│       │   │   ├── RankManagement.tsx
│       │   │   └── index.ts
│       │   ├── charts/
│       │   │   ├── RevenueChart.tsx
│       │   │   ├── UsersChart.tsx
│       │   │   ├── GameChart.tsx
│       │   │   ├── TransactionChart.tsx
│       │   │   └── index.ts
│       │   ├── audit/
│       │   │   ├── AuditLogTable.tsx
│       │   │   ├── AuditLogFilter.tsx
│       │   │   └── index.ts
│       │   └── common/
│       │       ├── DataTable.tsx
│       │       ├── SearchBox.tsx
│       │       ├── Filter.tsx
│       │       ├── ConfirmDialog.tsx
│       │       ├── ExportButton.tsx
│       │       ├── StatsCard.tsx
│       │       ├── StatusBadge.tsx
│       │       └── index.ts
│       ├── features/
│       │   ├── user-management/
│       │   │   ├── hooks.ts
│       │   │   ├── actions.ts
│       │   │   ├── permissions.ts
│       │   │   └── index.ts
│       │   ├── wallet-management/
│       │   │   ├── hooks.ts
│       │   │   ├── actions.ts
│       │   │   └── index.ts
│       │   ├── finance/
│       │   │   ├── reports.ts
│       │   │   ├── analytics.ts
│       │   │   ├── reconciliation.ts
│       │   │   └── index.ts
│       │   ├── moderation/
│       │   │   ├── reports.ts
│       │   │   ├── bans.ts
│       │   │   ├── contentFilter.ts
│       │   │   └── index.ts
│       │   └── system/
│       │       ├── settings.ts
│       │       ├── featureFlags.ts
│       │       ├── maintenance.ts
│       │       └── index.ts
│       ├── providers/
│       │   ├── AdminAuthProvider.tsx
│       │   ├── AdminProvider.tsx
│       │   ├── QueryProvider.tsx
│       │   ├── ThemeProvider.tsx
│       │   ├── I18nProvider.tsx
│       │   ├── NotificationProvider.tsx
│       │   └── index.ts
│       ├── hooks/
│       │   ├── useAdminAuth.ts
│       │   ├── usePermission.ts
│       │   ├── useAuditLog.ts
│       │   ├── useAdminTable.ts
│       │   ├── useAdminFilters.ts
│       │   └── index.ts
│       ├── lib/
│       │   ├── adminRoutes.ts
│       │   ├── permissions.ts
│       │   ├── constants.ts
│       │   ├── formatters.ts
│       │   └── index.ts
│       ├── styles/
│       │   ├── globals.css
│       │   ├── admin.css
│       │   ├── variables.css
│       │   └── components/
│       │       ├── tables.css
│       │       └── forms.css
│       ├── middleware.ts
│       ├── instrumentation.ts
│       ├── next.config.js
│       ├── package.json
│       ├── tsconfig.json
│       ├── postcss.config.js
│       ├── tailwind.config.ts
│       ├── eslint.config.js
│       └── .env
│
├── backend/                                 ← 🖥️ Backend اصلی
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   ├── queue.ts
│   │   │   ├── storage.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── wallet.routes.ts
│   │   │   │   ├── payment.routes.ts
│   │   │   │   ├── transaction.routes.ts
│   │   │   │   ├── deposit.routes.ts
│   │   │   │   ├── withdraw.routes.ts
│   │   │   │   ├── transfer.routes.ts
│   │   │   │   ├── swap.routes.ts
│   │   │   │   ├── duel.routes.ts
│   │   │   │   ├── challenge.routes.ts
│   │   │   │   ├── game.routes.ts
│   │   │   │   ├── community.routes.ts
│   │   │   │   ├── chat.routes.ts
│   │   │   │   ├── notification.routes.ts
│   │   │   │   └── admin.routes.ts
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── wallet.controller.ts
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── deposit.controller.ts
│   │   │   │   ├── withdraw.controller.ts
│   │   │   │   ├── transfer.controller.ts
│   │   │   │   ├── swap.controller.ts
│   │   │   │   ├── duel.controller.ts
│   │   │   │   ├── challenge.controller.ts
│   │   │   │   ├── game.controller.ts
│   │   │   │   ├── community.controller.ts
│   │   │   │   ├── chat.controller.ts
│   │   │   │   └── admin.controller.ts
│   │   │   └── middleware/
│   │   │       ├── auth.middleware.ts
│   │   │       ├── role.middleware.ts
│   │   │       ├── rateLimit.middleware.ts
│   │   │       ├── validation.middleware.ts
│   │   │       ├── logging.middleware.ts
│   │   │       └── error.middleware.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── session.service.ts
│   │   │   │   ├── otp.service.ts
│   │   │   │   ├── oauth.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── users/
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.mapper.ts
│   │   │   │   └── index.ts
│   │   │   ├── wallet/
│   │   │   │   ├── wallet.service.ts
│   │   │   │   ├── balance.service.ts
│   │   │   │   ├── asset.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── deposit/
│   │   │   │   ├── deposit.service.ts
│   │   │   │   ├── deposit.processor.ts
│   │   │   │   └── index.ts
│   │   │   ├── withdraw/
│   │   │   │   ├── withdraw.service.ts
│   │   │   │   ├── withdraw.processor.ts
│   │   │   │   └── index.ts
│   │   │   ├── transfer/
│   │   │   │   ├── transfer.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── swap/
│   │   │   │   ├── swap.service.ts
│   │   │   │   ├── rate.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── payment/
│   │   │   │   ├── payment.service.ts
│   │   │   │   ├── gateway.service.ts
│   │   │   │   ├── webhook.service.ts
│   │   │   │   └── gateways/
│   │   │   │       ├── onexgate/
│   │   │   │       │   ├── client.ts
│   │   │   │       │   ├── webhook.ts
│   │   │   │       │   ├── mapper.ts
│   │   │   │       │   └── validator.ts
│   │   │   │       ├── stripe/
│   │   │   │       └── index.ts
│   │   │   ├── transaction/
│   │   │   │   ├── transaction.service.ts
│   │   │   │   ├── ledger.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── game/
│   │   │   │   ├── bingo.service.ts
│   │   │   │   ├── card.service.ts
│   │   │   │   ├── winner.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── duel/
│   │   │   │   ├── duel.service.ts
│   │   │   │   ├── duel.matchmaker.ts
│   │   │   │   ├── duel.validator.ts
│   │   │   │   └── index.ts
│   │   │   ├── challenge/
│   │   │   │   ├── challenge.service.ts
│   │   │   │   ├── reward.service.ts
│   │   │   │   ├── level.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── community/
│   │   │   │   ├── community.service.ts
│   │   │   │   ├── ranking.service.ts
│   │   │   │   ├── member.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── chat/
│   │   │   │   ├── chat.service.ts
│   │   │   │   ├── message.service.ts
│   │   │   │   ├── room.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── notification/
│   │   │   │   ├── notification.service.ts
│   │   │   │   ├── push.service.ts
│   │   │   │   ├── email.service.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── repositories/
│   │   │   ├── user.repository.ts
│   │   │   ├── wallet.repository.ts
│   │   │   ├── asset.repository.ts
│   │   │   ├── balance.repository.ts
│   │   │   ├── transaction.repository.ts
│   │   │   ├── deposit.repository.ts
│   │   │   ├── withdraw.repository.ts
│   │   │   ├── payment.repository.ts
│   │   │   ├── swap.repository.ts
│   │   │   ├── duel.repository.ts
│   │   │   ├── challenge.repository.ts
│   │   │   ├── game.repository.ts
│   │   │   ├── community.repository.ts
│   │   │   ├── chat.repository.ts
│   │   │   ├── notification.repository.ts
│   │   │   └── index.ts
│   │   ├── dto/
│   │   │   ├── auth/
│   │   │   │   ├── Login.dto.ts
│   │   │   │   ├── Register.dto.ts
│   │   │   │   ├── OTP.dto.ts
│   │   │   │   └── RefreshToken.dto.ts
│   │   │   ├── user/
│   │   │   │   ├── CreateUser.dto.ts
│   │   │   │   ├── UpdateProfile.dto.ts
│   │   │   │   └── UserResponse.dto.ts
│   │   │   ├── wallet/
│   │   │   │   ├── Deposit.dto.ts
│   │   │   │   ├── Withdraw.dto.ts
│   │   │   │   ├── Transfer.dto.ts
│   │   │   │   ├── Swap.dto.ts
│   │   │   │   └── BalanceResponse.dto.ts
│   │   │   ├── payment/
│   │   │   │   ├── CreatePayment.dto.ts
│   │   │   │   ├── GatewayWebhook.dto.ts
│   │   │   │   └── PaymentResponse.dto.ts
│   │   │   ├── duel/
│   │   │   │   ├── CreateDuel.dto.ts
│   │   │   │   ├── JoinDuel.dto.ts
│   │   │   │   └── DuelResponse.dto.ts
│   │   │   ├── challenge/
│   │   │   │   ├── CreateChallenge.dto.ts
│   │   │   │   ├── JoinChallenge.dto.ts
│   │   │   │   └── ChallengeResponse.dto.ts
│   │   │   ├── game/
│   │   │   │   ├── StartGame.dto.ts
│   │   │   │   └── GameResponse.dto.ts
│   │   │   ├── community/
│   │   │   │   ├── CreateCommunity.dto.ts
│   │   │   │   └── CommunityResponse.dto.ts
│   │   │   └── index.ts
│   │   ├── events/
│   │   │   ├── bus.ts
│   │   │   ├── handlers/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── UserRegistered.handler.ts
│   │   │   │   │   └── LoginSuccess.handler.ts
│   │   │   │   ├── wallet/
│   │   │   │   │   ├── DepositCreated.handler.ts
│   │   │   │   │   ├── BalanceUpdated.handler.ts
│   │   │   │   │   └── WithdrawCompleted.handler.ts
│   │   │   │   ├── payment/
│   │   │   │   │   ├── PaymentCreated.handler.ts
│   │   │   │   │   ├── PaymentCompleted.handler.ts
│   │   │   │   │   └── PaymentFailed.handler.ts
│   │   │   │   ├── game/
│   │   │   │   │   ├── GameStarted.handler.ts
│   │   │   │   │   └── WinnerDeclared.handler.ts
│   │   │   │   ├── duel/
│   │   │   │   │   ├── DuelCreated.handler.ts
│   │   │   │   │   └── DuelFinished.handler.ts
│   │   │   │   ├── challenge/
│   │   │   │   │   └── ChallengeCompleted.handler.ts
│   │   │   │   └── index.ts
│   │   │   └── events/
│   │   │       ├── auth.events.ts
│   │   │       ├── wallet.events.ts
│   │   │       ├── payment.events.ts
│   │   │       ├── game.events.ts
│   │   │       ├── duel.events.ts
│   │   │       ├── challenge.events.ts
│   │   │       └── index.ts
│   │   ├── providers/
│   │   │   ├── database.provider.ts
│   │   │   ├── redis.provider.ts
│   │   │   ├── queue.provider.ts
│   │   │   ├── storage.provider.ts
│   │   │   ├── payment/
│   │   │   │   ├── onexgate.provider.ts
│   │   │   │   └── payment.provider.ts
│   │   │   ├── notification/
│   │   │   │   ├── firebase.provider.ts
│   │   │   │   └── onesignal.provider.ts
│   │   │   ├── blockchain/
│   │   │   │   ├── bitcoin.provider.ts
│   │   │   │   ├── ethereum.provider.ts
│   │   │   │   └── ton.provider.ts
│   │   │   ├── email.provider.ts
│   │   │   ├── sms.provider.ts
│   │   │   └── index.ts
│   │   ├── database/
│   │   │   ├── client.ts
│   │   │   ├── connection.ts
│   │   │   └── index.ts
│   │   ├── jobs/
│   │   │   ├── cron/
│   │   │   │   ├── interest.job.ts
│   │   │   │   ├── cleanup.job.ts
│   │   │   │   ├── notification.job.ts
│   │   │   │   ├── duel.expiry.job.ts
│   │   │   │   ├── challenge.expiry.job.ts
│   │   │   │   └── index.ts
│   │   │   └── queues/
│   │   │       ├── payment.queue.ts
│   │   │       ├── withdraw.queue.ts
│   │   │       ├── game.queue.ts
│   │   │       ├── notification.queue.ts
│   │   │       └── index.ts
│   │   ├── websocket/
│   │   │   ├── socket.server.ts
│   │   │   ├── duel.socket.ts
│   │   │   ├── game.socket.ts
│   │   │   ├── chat.socket.ts
│   │   │   ├── notification.socket.ts
│   │   │   └── index.ts
│   │   ├── security/
│   │   │   ├── encryption.ts
│   │   │   ├── hashing.ts
│   │   │   ├── signature.ts
│   │   │   ├── jwt.ts
│   │   │   ├── permissions.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── index.ts
│   │   ├── telemetry/
│   │   │   ├── metrics.ts
│   │   │   ├── tracing.ts
│   │   │   ├── monitoring.ts
│   │   │   ├── audit.ts
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── ErrorCodes.ts
│   │   │   ├── handler.ts
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── logger.ts
│   │       ├── response.ts
│   │       ├── pagination.ts
│   │       ├── validator.ts
│   │       ├── formatter.ts
│   │       └── index.ts
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── auth.test.ts
│   │   │   ├── wallet.test.ts
│   │   │   └── payment.test.ts
│   │   ├── integration/
│   │   │   ├── duel.test.ts
│   │   │   └── challenge.test.ts
│   │   └── e2e/
│   │       └── game.test.ts
│   ├── scripts/
│   │   ├── migrate.ts
│   │   ├── seed.ts
│   │   ├── backup.ts
│   │   └── healthcheck.ts
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── packages/                                 ← 📦 Shared Packages (Business Logic)
│   │
│   ├── shared-resources/                     ← فایل‌های استاتیک
│   │   ├── src/
│   │   │   ├── animations/ (فایل‌های Lottie JSON)
│   │   │   ├── fonts/ (فونت‌های TTF)
│   │   │   ├── icons/
│   │   │   │   ├── crypto/ (آیکون‌های رمزارزها)
│   │   │   │   ├── flags/ (پرچم‌ها)
│   │   │   │   ├── ui/ (آیکون‌های رابط کاربری)
│   │   │   │   └── social/ (آیکون‌های شبکه‌های اجتماعی)
│   │   │   ├── images/
│   │   │   │   ├── (فایل‌های اصلی: icon.png, splash.png, logo.png, ...)
│   │   │   │   ├── avatars/
│   │   │   │   ├── badges/
│   │   │   │   ├── backgrounds/
│   │   │   │   ├── cards/
│   │   │   │   └── notes/
│   │   │   │       ├── crypto/ (BTC, ETH, USDT, ...)
│   │   │   │       ├── fiat/ (USD, EUR, IRT, ...)
│   │   │   │       └── DUS/
│   │   │   ├── audio/
│   │   │   │   ├── ui/
│   │   │   │   ├── game/
│   │   │   │   ├── transaction/
│   │   │   │   ├── notification/
│   │   │   │   ├── auth/
│   │   │   │   ├── effects/
│   │   │   │   └── ambient/
│   │   │   ├── lottie/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-finance/                       ← اطلاعات مالی
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   ├── registry.ts
│   │   │   │   ├── helpers.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── currencies/
│   │   │   │   ├── currencyConfigs.ts
│   │   │   │   └── index.ts
│   │   │   ├── networks/
│   │   │   │   ├── networkConfigs.ts
│   │   │   │   └── index.ts
│   │   │   ├── fees/
│   │   │   │   ├── feeConfigs.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-i18n/                           ← ترجمه‌ها (۱۷ زبان)
│   │   ├── src/
│   │   │   ├── locales/
│   │   │   │   ├── en/ (۲۱ فایل JSON)
│   │   │   │   ├── fa/ (۲۱ فایل JSON)
│   │   │   │   ├── tr/ (۲۱ فایل JSON)
│   │   │   │   ├── ar/ (۲۱ فایل JSON)
│   │   │   │   ├── ru/ (۲۱ فایل JSON)
│   │   │   │   ├── hi/ (۲۱ فایل JSON)
│   │   │   │   ├── fr/ (۲۱ فایل JSON)
│   │   │   │   ├── zh/ (۲۱ فایل JSON)
│   │   │   │   ├── id/ (۲۱ فایل JSON)
│   │   │   │   ├── ko/ (۲۱ فایل JSON)
│   │   │   │   ├── es/ (۲۱ فایل JSON)
│   │   │   │   ├── cs/ (۲۱ فایل JSON)
│   │   │   │   ├── fi/ (۲۱ فایل JSON)
│   │   │   │   ├── pt/ (۲۱ فایل JSON)
│   │   │   │   ├── uz/ (۲۱ فایل JSON)
│   │   │   │   ├── vi/ (۲۱ فایل JSON)
│   │   │   │   └── sv/ (۲۱ فایل JSON)
│   │   │   ├── i18n.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-types/                         ← TypeScript Types
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── User.ts
│   │   │   │   ├── Session.ts
│   │   │   │   └── Permission.ts
│   │   │   ├── wallet/
│   │   │   │   ├── Wallet.ts
│   │   │   │   ├── Balance.ts
│   │   │   │   ├── Deposit.ts
│   │   │   │   ├── Withdraw.ts
│   │   │   │   ├── Transaction.ts
│   │   │   │   └── Interest.ts
│   │   │   ├── game/
│   │   │   │   ├── Game.ts
│   │   │   │   ├── Card.ts
│   │   │   │   └── Level.ts
│   │   │   ├── duel/
│   │   │   │   ├── Duel.ts
│   │   │   │   └── DuelParticipant.ts
│   │   │   ├── challenge/
│   │   │   │   ├── Challenge.ts
│   │   │   │   └── ChallengeParticipant.ts
│   │   │   ├── community/
│   │   │   │   ├── Community.ts
│   │   │   │   └── CommunityMember.ts
│   │   │   ├── chat/
│   │   │   │   ├── Message.ts
│   │   │   │   └── Room.ts
│   │   │   ├── payment/
│   │   │   │   └── Payment.ts
│   │   │   ├── common/
│   │   │   │   ├── Asset.ts
│   │   │   │   ├── Currency.ts
│   │   │   │   ├── Network.ts
│   │   │   │   └── Address.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-utils/                         ← Utility Functions
│   │   ├── src/
│   │   │   ├── format/
│   │   │   │   ├── currencyFormatter.ts
│   │   │   │   ├── paymentFormatter.ts
│   │   │   │   ├── priceFormatter.ts
│   │   │   │   └── timeFormatter.ts
│   │   │   ├── game/
│   │   │   │   ├── winnerChecker.ts
│   │   │   │   ├── duelHelper.ts
│   │   │   │   ├── cardValidator.ts
│   │   │   │   └── matrixEffects.ts
│   │   │   ├── crypto/
│   │   │   │   ├── qrGenerator.ts
│   │   │   │   ├── networkMapper.ts
│   │   │   │   └── assetMapper.ts
│   │   │   ├── avatar/
│   │   │   │   ├── avatarGenerator.ts
│   │   │   │   └── emojiMap.ts
│   │   │   ├── share/
│   │   │   │   └── shareHelper.ts
│   │   │   ├── finance/
│   │   │   │   └── interestCalculator.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-constants/                     ← مقادیر کاملاً ثابت
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
│   ├── shared-config/                        ← تنظیمات
│   │   ├── src/
│   │   │   ├── env.ts
│   │   │   ├── api.ts
│   │   │   ├── featureFlags.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-auth/                          ← احراز هویت
│   │   ├── src/
│   │   │   ├── auth/ (login, logout, register, refreshToken, verifyOtp, ...)
│   │   │   ├── session/ (sessionManager, tokenManager, storage, permissions)
│   │   │   ├── oauth/ (google, apple, telegram, github)
│   │   │   ├── validators/ (email, phone, username, password, otp, did)
│   │   │   ├── types/ (AuthUser, AuthSession, LoginRequest, ...)
│   │   │   ├── interfaces/ (IAuthProvider, ITokenStorage, ...)
│   │   │   ├── utils/ (jwt, token, otp, hash, crypto, device, authHeaders)
│   │   │   ├── constants/ (auth, roles, permissions, scopes)
│   │   │   ├── errors/ (AuthError, SessionError, TokenError)
│   │   │   ├── hooks/ (useSession, useCurrentUser, useAuthState)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-wallet/                        ← مدیریت کیف پول
│   │   ├── src/
│   │   │   ├── balances/ (getBalances, refreshBalance)
│   │   │   ├── deposit/ (createAddress, confirmDeposit)
│   │   │   ├── withdraw/ (createWithdraw, cancelWithdraw)
│   │   │   ├── transfer/ (transfer, transferByDid)
│   │   │   ├── swap/ (quote, swap)
│   │   │   ├── transaction/ (history, detail)
│   │   │   ├── assets/ (registry, helpers, types)
│   │   │   ├── hooks/ (useWallet)
│   │   │   ├── providers/ (WalletProvider, WalletContext)
│   │   │   ├── types/ (wallet.types)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-payment/                       ← درگاه پرداخت
│   │   ├── src/
│   │   │   ├── core/ (PaymentGateway, PaymentFactory, PaymentManager, types, constants, errors)
│   │   │   ├── onexgate/
│   │   │   │   ├── auth/ (auth.api, auth.service, auth.mapper, auth.types, auth.interfaces)
│   │   │   │   ├── wallet/ (wallet.api, wallet.service, wallet.mapper, wallet.types, wallet.interfaces)
│   │   │   │   ├── deposit/
│   │   │   │   ├── withdraw/
│   │   │   │   ├── transfer/
│   │   │   │   ├── swap/
│   │   │   │   ├── order/
│   │   │   │   ├── transaction/
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/ (IAuthService, IWalletService, ...)
│   │   │   ├── types/ (Auth, Wallet, Balance, Deposit, Withdraw, Transfer, Swap, Order, Transaction)
│   │   │   ├── utils/ (amount, currency, network, address, validator, signer, qr)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-community/                     ← مدیریت انجمن‌ها
│   │   ├── src/
│   │   │   ├── types/ (Community, CommunityMember, CommunityRole, CommunityRank, GroupSettings, GroupStats)
│   │   │   ├── interfaces/ (CommunityRepository, CommunityService, MemberService)
│   │   │   ├── constants/ (communityRoles, communityLimits, rankLevels)
│   │   │   ├── services/ (communityService, memberService, rankingService, groupStatsService)
│   │   │   ├── validators/ (communityValidator, groupNameValidator, usernameValidator)
│   │   │   ├── mappers/ (communityMapper, memberMapper)
│   │   │   ├── permissions/ (communityPermissions, rolePermissions)
│   │   │   ├── events/ (communityEvents, memberEvents)
│   │   │   ├── utils/ (communityFormatter, rankCalculator, memberCounter)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-chat/                          ← منطق چت
│   │   ├── src/
│   │   │   ├── messages/ (sendMessage, editMessage, deleteMessage, replyMessage, forwardMessage, pinMessage, unpinMessage, markAsRead)
│   │   │   ├── conversations/ (createConversation, getConversation, listConversations, archiveConversation, muteConversation)
│   │   │   ├── groups/ (createGroupChat, addMember, removeMember, promoteAdmin, leaveGroup)
│   │   │   ├── realtime/ (subscribeMessages, subscribeTyping, subscribePresence, realtimeEvents)
│   │   │   ├── presence/ (onlineStatus, lastSeen)
│   │   │   ├── media/ (uploadImage, uploadAudio, voiceMessage)
│   │   │   ├── moderation/ (reportMessage, blockUser, filterContent)
│   │   │   ├── notifications/ (chatNotification, mentionNotification)
│   │   │   ├── types/ (Message, Conversation, ChatMember, ChatRoom, Attachment, Reaction, Presence)
│   │   │   ├── interfaces/ (IChatProvider, IMessageRepository, IRealtimeProvider, IMediaStorage)
│   │   │   ├── constants/ (messageTypes, chatTypes, limits)
│   │   │   ├── validators/ (messageValidator, attachmentValidator)
│   │   │   ├── errors/ (ChatError, MessageError)
│   │   │   ├── utils/ (messageFormatter, mentionParser, emojiParser, timeGrouping)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-game/                          ← منطق بازی
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
│   ├── shared-duel/                          ← مدیریت دوئل‌ها
│   │   ├── src/
│   │   │   ├── types/ (Duel, DuelStatus, DuelType, DuelParticipant, DuelResult, DuelPrize, DuelSettings, DuelCard)
│   │   │   ├── interfaces/ (DuelRepository, DuelService, DuelEngine)
│   │   │   ├── constants/ (duelLimits, duelStatus, duelFees, duelLevels)
│   │   │   ├── services/ (duelService, duelCreationService, duelJoinService, duelCancelService, duelResultService, duelRewardService)
│   │   │   ├── engine/ (duelEngine, winnerCalculator, cardMatcher, numberChecker)
│   │   │   ├── validators/ (duelValidator, createDuelValidator, joinDuelValidator)
│   │   │   ├── mappers/ (duelMapper, participantMapper)
│   │   │   ├── permissions/ (duelPermissions)
│   │   │   ├── events/ (duelEvents)
│   │   │   ├── utils/ (duelFormatter, duelTimer, prizeCalculator)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-challenge/                     ← مدیریت چالش‌ها
│   │   ├── src/
│   │   │   ├── types/ (Challenge, ChallengeStatus, ChallengeParticipant, ChallengeLevel, ChallengePrize, ChallengePool, ChallengeSettings, ChallengeCard)
│   │   │   ├── interfaces/ (ChallengeRepository, ChallengeService, ChallengeEngine)
│   │   │   ├── constants/ (challengeLimits, challengeLevels, challengeFees, challengeCooldown)
│   │   │   ├── services/ (challengeService, challengeCreationService, challengeJoinService, challengeCancelService, challengeParticipantService, challengeRewardService, challengeLevelService)
│   │   │   ├── engine/ (challengeEngine, winnerCalculator, rankingCalculator, cardMatcher)
│   │   │   ├── validators/ (challengeValidator, createChallengeValidator, joinChallengeValidator, participantValidator)
│   │   │   ├── mappers/ (challengeMapper, participantMapper)
│   │   │   ├── permissions/ (challengePermissions)
│   │   │   ├── events/ (challengeEvents)
│   │   │   ├── utils/ (challengeFormatter, challengeTimer, poolCalculator, participantCounter)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-services/                     ← سرویس‌های عمومی
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
│   ├── shared-database/                     ← Supabase Client
│   │   ├── src/
│   │   │   ├── supabase/ (client, types)
│   │   │   ├── repositories/ (UserRepository, WalletRepository, TransactionRepository, ...)
│   │   │   ├── queries/ (users, wallets, transactions)
│   │   │   ├── mutations/ (createWallet, createTransaction)
│   │   │   ├── types/ (Database, Tables)
│   │   │   ├── generated/ (database.types.ts)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-validators/                   ← Zod Schemas
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
│   ├── shared-errors/                       ← مدیریت خطاها
│   │   ├── src/
│   │   │   ├── codes/ (authErrors, walletErrors, paymentErrors, transactionErrors, duelErrors, challengeErrors, gameErrors, communityErrors, chatErrors, systemErrors)
│   │   │   ├── classes/ (AppError, ValidationError, AuthenticationError, AuthorizationError, NotFoundError, PaymentError, WalletError, TransactionError)
│   │   │   ├── formatters/ (errorFormatter, apiErrorFormatter, i18nErrorMapper)
│   │   │   ├── handlers/ (errorHandler, asyncErrorHandler)
│   │   │   ├── types/ (ErrorCode, ErrorResponse, ErrorMetadata)
│   │   │   ├── utils/ (isAppError, getErrorCode, normalizeError)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-logger/                       ← Logger
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
│   ├── shared-telemetry/                    ← مشاهده‌پذیری
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
│   └── shared-hooks/                        ← React Hooks
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
├── supabase/                                 ← 🗄️ Supabase (در ریشه)
│   ├── migrations/
│   │   ├── shared/ (Migration‌های عمومی)
│   │   ├── dobna/ (Migration‌های مختص دوبنا)
│   │   └── poplan/ (Migration‌های مختص پاپلان – آینده)
│   ├── functions/
│   │   ├── shared/ (توابع عمومی)
│   │   ├── dobna/ (توابع مختص دوبنا)
│   │   └── poplan/ (توابع مختص پاپلان – آینده)
│   ├── seed.sql
│   └── config.toml
│
├── docs/                                     ← 📄 مستندات
│   ├── api.md
│   ├── architecture.md
│   ├── database-schema.md
│   ├── game-rules.md
│   ├── deployment.md
│   └── assets-guide.md
│
├── scripts/                                  ← 📜 اسکریپت‌ها
│   ├── copy-assets.sh
│   ├── deploy-web.sh
│   ├── deploy-mobile.sh
│   ├── seed-database.js
│   ├── migrate-all.sh
│   ├── healthcheck.sh
│   └── backup.sh
│
├── .github/                                  ← 🔄 GitHub Actions
│   └── workflows/
│       ├── deploy-assets.yml
│       ├── deploy-web.yml
│       ├── deploy-mobile.yml
│       ├── deploy-backend.yml
│       ├── deploy-supabase.yml
│       └── test.yml
│
├── .env.example
├── .gitignore
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md

```