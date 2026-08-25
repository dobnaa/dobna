```
dobna/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── test.yml
│   │   ├── lint.yml
│   │   ├── release.yml
│   │   ├── docker.yml
│   │   ├── docs.yml
│   │   └── deploy.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   ├── documentation.yml
│   │   └── config.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   ├── CODE_OF_CONDUCT.md
│   ├── dependabot.yml
│   └── FUNDING.yml
│
├── apps/
│   ├── dobna-web/
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
│   │   ├── test/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── fixtures/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.ts
│   │   ├── eslint.config.js
│   │   └── .env.local
│   │
│   ├── dobna-mobile/
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
│   │   ├── test/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── fixtures/
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
│   └── dobna-admin/
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
│       ├── test/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── fixtures/
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
├── backend/
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
│   │   ├── api/
│   │   ├── benchmark/
│   │   ├── fixtures/
│   │   └── mocks/
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
├── packages/
│   ├── shared-resources/
│   │   ├── src/
│   │   │   ├── animations/
│   │   │   │   ├── empty-wallet.json
│   │   │   │   ├── loading_main.json
│   │   │   │   ├── network_error.json
│   │   │   │   ├── pulse_loader.json
│   │   │   │   ├── scanning_line.json
│   │   │   │   ├── security-scan.json
│   │   │   │   ├── success-check.json
│   │   │   │   ├── success_burst.json
│   │   │   │   └── transaction-sending.json
│   │   │   ├── fonts/
│   │   │   │   ├── Vazirmatn-Regular.ttf
│   │   │   │   ├── Vazirmatn-Bold.ttf
│   │   │   │   ├── Vazirmatn-ExtraBold.ttf
│   │   │   │   ├── Cairo-Regular.ttf
│   │   │   │   ├── Cairo-Bold.ttf
│   │   │   │   ├── Orbitron-Regular.ttf
│   │   │   │   └── Orbitron-Bold.ttf
│   │   │   ├── icons/
│   │   │   │   ├── crypto/
│   │   │   │   │   ├── btc.svg
│   │   │   │   │   ├── eth.svg
│   │   │   │   │   ├── usdt.svg
│   │   │   │   │   ├── sol.svg
│   │   │   │   │   ├── bnb.svg
│   │   │   │   │   ├── doge.svg
│   │   │   │   │   ├── ton.svg
│   │   │   │   │   ├── pepe.svg
│   │   │   │   │   ├── bonk.svg
│   │   │   │   │   ├── hmstr.svg
│   │   │   │   │   ├── usdc.svg
│   │   │   │   │   ├── stars.svg
│   │   │   │   │   └── dus.svg
│   │   │   │   ├── flags/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── logo-dobna.svg
│   │   │   │   │   ├── back-arrow.svg
│   │   │   │   │   ├── chat.svg
│   │   │   │   │   ├── home.svg
│   │   │   │   │   ├── wallet.svg
│   │   │   │   │   ├── trophy.svg
│   │   │   │   │   ├── users.svg
│   │   │   │   │   ├── gift.svg
│   │   │   │   │   ├── share.svg
│   │   │   │   │   └── ...
│   │   │   │   └── social/
│   │   │   │       ├── instagram.svg
│   │   │   │       ├── telegram.svg
│   │   │   │       └── whatsapp.svg
│   │   │   ├── images/
│   │   │   │   ├── icon.png
│   │   │   │   ├── splash.png
│   │   │   │   ├── adaptive-icon.png
│   │   │   │   ├── favicon.png
│   │   │   │   ├── logo.png
│   │   │   │   ├── avatars/
│   │   │   │   │   ├── avatar-1.png
│   │   │   │   │   ├── avatar-2.png
│   │   │   │   │   ├── ...
│   │   │   │   │   └── avatar-default.png
│   │   │   │   ├── badges/
│   │   │   │   │   ├── verified.png
│   │   │   │   │   ├── winner.png
│   │   │   │   │   ├── vip.png
│   │   │   │   │   └── admin.png
│   │   │   │   ├── backgrounds/
│   │   │   │   ├── cards/
│   │   │   │   │   ├── card-back.png
│   │   │   │   │   ├── card-frame.png
│   │   │   │   │   └── card-glow.png
│   │   │   │   └── notes/
│   │   │   │       ├── crypto/
│   │   │   │       │   ├── BTC/
│   │   │   │       │   │   ├── 0.0000005.webp
│   │   │   │       │   │   ├── 0.000002.webp
│   │   │   │       │   │   ├── 0.000005.webp
│   │   │   │       │   │   └── 0.00001.webp
│   │   │   │       │   ├── ETH/
│   │   │   │       │   │   ├── 0.00001.webp
│   │   │   │       │   │   ├── 0.00005.webp
│   │   │   │       │   │   ├── 0.0001.webp
│   │   │   │       │   │   └── 0.0002.webp
│   │   │   │       │   ├── USDT/
│   │   │   │       │   │   ├── 0.05.webp
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   ├── 0.50.webp
│   │   │   │       │   │   └── 1.00.webp
│   │   │   │       │   ├── SOL/
│   │   │   │       │   │   ├── 0.001.webp
│   │   │   │       │   │   ├── 0.005.webp
│   │   │   │       │   │   ├── 0.01.webp
│   │   │   │       │   │   └── 0.02.webp
│   │   │   │       │   ├── BNB/
│   │   │   │       │   │   ├── 0.00004.webp
│   │   │   │       │   │   ├── 0.00016.webp
│   │   │   │       │   │   ├── 0.0004.webp
│   │   │   │       │   │   └── 0.0008.webp
│   │   │   │       │   ├── DOGE/
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   ├── 1.00.webp
│   │   │   │       │   │   ├── 2.50.webp
│   │   │   │       │   │   └── 5.00.webp
│   │   │   │       │   ├── TON/
│   │   │   │       │   │   ├── 0.015.webp
│   │   │   │       │   │   ├── 0.060.webp
│   │   │   │       │   │   ├── 0.150.webp
│   │   │   │       │   │   └── 0.30.webp
│   │   │   │       │   ├── BONK/
│   │   │   │       │   │   ├── 5.webp
│   │   │   │       │   │   ├── 20.webp
│   │   │   │       │   │   ├── 50.webp
│   │   │   │       │   │   └── 100.webp
│   │   │   │       │   ├── PEPE/
│   │   │   │       │   │   ├── 1000.webp
│   │   │   │       │   │   ├── 4000.webp
│   │   │   │       │   │   ├── 10000.webp
│   │   │   │       │   │   └── 20000.webp
│   │   │   │       │   ├── HMSTR/
│   │   │   │       │   │   ├── 200.webp
│   │   │   │       │   │   ├── 800.webp
│   │   │   │       │   │   ├── 2000.webp
│   │   │   │       │   │   └── 4000.webp
│   │   │   │       │   ├── USDC/
│   │   │   │       │   │   ├── 0.05.webp
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   ├── 0.50.webp
│   │   │   │       │   │   └── 1.00.webp
│   │   │   │       │   └── STARS/
│   │   │   │       │       ├── 5.webp
│   │   │   │       │       ├── 25.webp
│   │   │   │       │       ├── 50.webp
│   │   │   │       │       └── 100.webp
│   │   │   │       ├── fiat/
│   │   │   │       │   ├── USD/
│   │   │   │       │   │   ├── 0.05.webp
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   ├── 0.50.webp
│   │   │   │       │   │   └── 1.00.webp
│   │   │   │       │   ├── IRT/
│   │   │   │       │   │   ├── 5000.webp
│   │   │   │       │   │   ├── 20000.webp
│   │   │   │       │   │   ├── 50000.webp
│   │   │   │       │   │   └── 100000.webp
│   │   │   │       │   ├── EUR/
│   │   │   │       │   │   ├── 0.025.webp
│   │   │   │       │   │   ├── 0.10.webp
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   └── 0.50.webp
│   │   │   │       │   ├── TRY/
│   │   │   │       │   │   ├── 0.5.webp
│   │   │   │       │   │   ├── 2.webp
│   │   │   │       │   │   ├── 5.webp
│   │   │   │       │   │   └── 10.webp
│   │   │   │       │   ├── GBP/
│   │   │   │       │   │   ├── 0.02.webp
│   │   │   │       │   │   ├── 0.10.webp
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   └── 0.50.webp
│   │   │   │       │   ├── AED/
│   │   │   │       │   │   ├── 0.2.webp
│   │   │   │       │   │   ├── 1.webp
│   │   │   │       │   │   ├── 2.webp
│   │   │   │       │   │   └── 3.webp
│   │   │   │       │   ├── CNY/
│   │   │   │       │   │   ├── 0.5.webp
│   │   │   │       │   │   ├── 2.webp
│   │   │   │       │   │   ├── 5.webp
│   │   │   │       │   │   └── 10.webp
│   │   │   │       │   ├── INR/
│   │   │   │       │   │   ├── 5.webp
│   │   │   │       │   │   ├── 20.webp
│   │   │   │       │   │   ├── 50.webp
│   │   │   │       │   │   └── 100.webp
│   │   │   │       │   ├── CAD/
│   │   │   │       │   │   ├── 0.05.webp
│   │   │   │       │   │   ├── 0.25.webp
│   │   │   │       │   │   ├── 0.50.webp
│   │   │   │       │   │   └── 1.00.webp
│   │   │   │       │   ├── CHF/
│   │   │   │       │   │   ├── 0.05.webp
│   │   │   │       │   │   ├── 0.10.webp
│   │   │   │       │   │   ├── 0.50.webp
│   │   │   │       │   │   └── 1.00.webp
│   │   │   │       │   └── AUD/
│   │   │   │       │       ├── 0.05.webp
│   │   │   │       │       ├── 0.25.webp
│   │   │   │       │       ├── 0.50.webp
│   │   │   │       │       └── 1.00.webp
│   │   │   │       └── DUS/
│   │   │   │           ├── 0.05.webp
│   │   │   │           ├── 0.25.webp
│   │   │   │           ├── 0.50.webp
│   │   │   │           └── 1.00.webp
│   │   │   ├── audio/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── click.mp3
│   │   │   │   │   ├── dark-click.mp3
│   │   │   │   │   ├── digital_click.mp3
│   │   │   │   │   ├── light-tap.mp3
│   │   │   │   │   └── unlock.mp3
│   │   │   │   ├── game/
│   │   │   │   │   ├── number-called.mp3
│   │   │   │   │   ├── line-win.mp3
│   │   │   │   │   ├── full-house.mp3
│   │   │   │   │   ├── bingo.mp3
│   │   │   │   │   ├── card-mark.mp3
│   │   │   │   │   └── countdown.mp3
│   │   │   │   ├── transaction/
│   │   │   │   │   ├── tx_charge.mp3
│   │   │   │   │   ├── tx_success.mp3
│   │   │   │   │   ├── tx_failed.mp3
│   │   │   │   │   ├── coin-drop.mp3
│   │   │   │   │   └── cash-register.mp3
│   │   │   │   ├── notification/
│   │   │   │   │   ├── notification.mp3
│   │   │   │   │   ├── notify_beep.mp3
│   │   │   │   │   ├── msg_send.mp3
│   │   │   │   │   └── msg_receive.mp3
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth_pass.mp3
│   │   │   │   │   ├── login-success.mp3
│   │   │   │   │   └── login-failed.mp3
│   │   │   │   ├── effects/
│   │   │   │   │   ├── heartbeat_fast.mp3
│   │   │   │   │   ├── refresh_glitch.mp3
│   │   │   │   │   ├── scan_beep.mp3
│   │   │   │   │   ├── matrix-glitch.mp3
│   │   │   │   │   └── sword_clash.mp3
│   │   │   │   └── ambient/
│   │   │   │       ├── casino-ambient.mp3
│   │   │   │       ├── game-start.mp3
│   │   │   │       ├── game-end.mp3
│   │   │   │       └── waiting-room.mp3
│   │   │   ├── lottie/
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-finance/
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
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-i18n/
│   │   ├── src/
│   │   │   ├── locales/
│   │   │   │   ├── en/
│   │   │   │   │   ├── common.json
│   │   │   │   │   ├── auth.json
│   │   │   │   │   ├── home.json
│   │   │   │   │   ├── game.json
│   │   │   │   │   ├── duel.json
│   │   │   │   │   ├── challenge.json
│   │   │   │   │   ├── wallet.json
│   │   │   │   │   ├── payment.json
│   │   │   │   │   ├── profile.json
│   │   │   │   │   ├── community.json
│   │   │   │   │   ├── chat.json
│   │   │   │   │   ├── settings.json
│   │   │   │   │   ├── notification.json
│   │   │   │   │   ├── errors.json
│   │   │   │   │   ├── currencies.json
│   │   │   │   │   ├── transaction.json
│   │   │   │   │   ├── deposit.json
│   │   │   │   │   ├── withdraw.json
│   │   │   │   │   ├── swap.json
│   │   │   │   │   ├── transfer.json
│   │   │   │   │   └── lottery.json
│   │   │   │   ├── fa/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── tr/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── ar/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── ru/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── hi/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── fr/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── zh/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── id/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── ko/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── es/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── cs/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── fi/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── pt/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── uz/ (۲۱ فایل JSON مشابه)
│   │   │   │   ├── vi/ (۲۱ فایل JSON مشابه)
│   │   │   │   └── sv/ (۲۱ فایل JSON مشابه)
│   │   │   ├── i18n.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-types/
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
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-utils/
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
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-constants/
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
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-config/
│   │   ├── src/
│   │   │   ├── env.ts
│   │   │   ├── api.ts
│   │   │   ├── featureFlags.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-auth/
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── login.ts
│   │   │   │   ├── logout.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── refreshToken.ts
│   │   │   │   ├── verifyOtp.ts
│   │   │   │   ├── resendOtp.ts
│   │   │   │   ├── forgotPassword.ts
│   │   │   │   ├── resetPassword.ts
│   │   │   │   ├── changePassword.ts
│   │   │   │   ├── deleteAccount.ts
│   │   │   │   └── index.ts
│   │   │   ├── session/
│   │   │   │   ├── sessionManager.ts
│   │   │   │   ├── tokenManager.ts
│   │   │   │   ├── storage.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   ├── biometric.ts
│   │   │   │   └── index.ts
│   │   │   ├── oauth/
│   │   │   │   ├── google.ts
│   │   │   │   ├── apple.ts
│   │   │   │   ├── telegram.ts
│   │   │   │   ├── github.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   ├── email.ts
│   │   │   │   ├── phone.ts
│   │   │   │   ├── username.ts
│   │   │   │   ├── password.ts
│   │   │   │   ├── otp.ts
│   │   │   │   ├── did.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── AuthUser.ts
│   │   │   │   ├── AuthSession.ts
│   │   │   │   ├── LoginRequest.ts
│   │   │   │   ├── LoginResponse.ts
│   │   │   │   ├── RegisterRequest.ts
│   │   │   │   ├── RegisterResponse.ts
│   │   │   │   ├── RefreshToken.ts
│   │   │   │   ├── OtpRequest.ts
│   │   │   │   ├── PasswordReset.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── IAuthProvider.ts
│   │   │   │   ├── ITokenStorage.ts
│   │   │   │   ├── ISessionStorage.ts
│   │   │   │   ├── IBiometricProvider.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── jwt.ts
│   │   │   │   ├── token.ts
│   │   │   │   ├── otp.ts
│   │   │   │   ├── hash.ts
│   │   │   │   ├── crypto.ts
│   │   │   │   ├── device.ts
│   │   │   │   ├── authHeaders.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── roles.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   ├── scopes.ts
│   │   │   │   └── index.ts
│   │   │   ├── errors/
│   │   │   │   ├── AuthError.ts
│   │   │   │   ├── SessionError.ts
│   │   │   │   ├── TokenError.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useSession.ts
│   │   │   │   ├── useCurrentUser.ts
│   │   │   │   ├── useAuthState.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-wallet/
│   │   ├── src/
│   │   │   ├── balances/
│   │   │   │   ├── getBalances.ts
│   │   │   │   └── refreshBalance.ts
│   │   │   ├── deposit/
│   │   │   │   ├── createAddress.ts
│   │   │   │   └── confirmDeposit.ts
│   │   │   ├── withdraw/
│   │   │   │   ├── createWithdraw.ts
│   │   │   │   └── cancelWithdraw.ts
│   │   │   ├── transfer/
│   │   │   │   ├── transfer.ts
│   │   │   │   └── transferByDid.ts
│   │   │   ├── swap/
│   │   │   │   ├── quote.ts
│   │   │   │   └── swap.ts
│   │   │   ├── transaction/
│   │   │   │   ├── history.ts
│   │   │   │   └── detail.ts
│   │   │   ├── assets/
│   │   │   │   ├── registry.ts
│   │   │   │   ├── helpers.ts
│   │   │   │   └── types.ts
│   │   │   ├── hooks/
│   │   │   │   └── useWallet.ts
│   │   │   ├── providers/
│   │   │   │   ├── WalletProvider.tsx
│   │   │   │   └── WalletContext.ts
│   │   │   ├── types/
│   │   │   │   └── wallet.types.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-payment/
│   │   ├── src/
│   │   │   ├── core/
│   │   │   │   ├── PaymentGateway.ts
│   │   │   │   ├── PaymentFactory.ts
│   │   │   │   ├── PaymentManager.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── constants.ts
│   │   │   │   └── errors.ts
│   │   │   ├── onexgate/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.api.ts
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.mapper.ts
│   │   │   │   │   ├── auth.types.ts
│   │   │   │   │   ├── auth.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── wallet/
│   │   │   │   │   ├── wallet.api.ts
│   │   │   │   │   ├── wallet.service.ts
│   │   │   │   │   ├── wallet.mapper.ts
│   │   │   │   │   ├── wallet.types.ts
│   │   │   │   │   ├── wallet.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── deposit/
│   │   │   │   │   ├── deposit.api.ts
│   │   │   │   │   ├── deposit.service.ts
│   │   │   │   │   ├── deposit.mapper.ts
│   │   │   │   │   ├── deposit.types.ts
│   │   │   │   │   ├── deposit.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── withdraw/
│   │   │   │   │   ├── withdraw.api.ts
│   │   │   │   │   ├── withdraw.service.ts
│   │   │   │   │   ├── withdraw.mapper.ts
│   │   │   │   │   ├── withdraw.types.ts
│   │   │   │   │   ├── withdraw.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── transfer/
│   │   │   │   │   ├── transfer.api.ts
│   │   │   │   │   ├── transfer.service.ts
│   │   │   │   │   ├── transfer.mapper.ts
│   │   │   │   │   ├── transfer.types.ts
│   │   │   │   │   ├── transfer.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── swap/
│   │   │   │   │   ├── swap.api.ts
│   │   │   │   │   ├── swap.service.ts
│   │   │   │   │   ├── swap.mapper.ts
│   │   │   │   │   ├── swap.types.ts
│   │   │   │   │   ├── swap.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── order/
│   │   │   │   │   ├── order.api.ts
│   │   │   │   │   ├── order.service.ts
│   │   │   │   │   ├── order.mapper.ts
│   │   │   │   │   ├── order.types.ts
│   │   │   │   │   ├── order.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── transaction/
│   │   │   │   │   ├── transaction.api.ts
│   │   │   │   │   ├── transaction.service.ts
│   │   │   │   │   ├── transaction.mapper.ts
│   │   │   │   │   ├── transaction.types.ts
│   │   │   │   │   ├── transaction.interfaces.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── client.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── IAuthService.ts
│   │   │   │   ├── IWalletService.ts
│   │   │   │   ├── IDepositService.ts
│   │   │   │   ├── IWithdrawService.ts
│   │   │   │   ├── ITransferService.ts
│   │   │   │   ├── ISwapService.ts
│   │   │   │   ├── IOrderService.ts
│   │   │   │   ├── ITransactionService.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── Auth.ts
│   │   │   │   ├── Wallet.ts
│   │   │   │   ├── Balance.ts
│   │   │   │   ├── Deposit.ts
│   │   │   │   ├── Withdraw.ts
│   │   │   │   ├── Transfer.ts
│   │   │   │   ├── Swap.ts
│   │   │   │   ├── Order.ts
│   │   │   │   ├── Transaction.ts
│   │   │   │   ├── ApiResponse.ts
│   │   │   │   ├── Pagination.ts
│   │   │   │   ├── Error.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── amount.ts
│   │   │   │   ├── currency.ts
│   │   │   │   ├── network.ts
│   │   │   │   ├── address.ts
│   │   │   │   ├── validator.ts
│   │   │   │   ├── signer.ts
│   │   │   │   ├── qr.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-community/
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── Community.ts
│   │   │   │   ├── CommunityMember.ts
│   │   │   │   ├── CommunityRole.ts
│   │   │   │   ├── CommunityRank.ts
│   │   │   │   ├── GroupSettings.ts
│   │   │   │   ├── GroupStats.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── CommunityRepository.ts
│   │   │   │   ├── CommunityService.ts
│   │   │   │   ├── MemberService.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── communityRoles.ts
│   │   │   │   ├── communityLimits.ts
│   │   │   │   ├── rankLevels.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── communityService.ts
│   │   │   │   ├── memberService.ts
│   │   │   │   ├── rankingService.ts
│   │   │   │   ├── groupStatsService.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   ├── communityValidator.ts
│   │   │   │   ├── groupNameValidator.ts
│   │   │   │   ├── usernameValidator.ts
│   │   │   │   └── index.ts
│   │   │   ├── mappers/
│   │   │   │   ├── communityMapper.ts
│   │   │   │   ├── memberMapper.ts
│   │   │   │   └── index.ts
│   │   │   ├── permissions/
│   │   │   │   ├── communityPermissions.ts
│   │   │   │   ├── rolePermissions.ts
│   │   │   │   └── index.ts
│   │   │   ├── events/
│   │   │   │   ├── communityEvents.ts
│   │   │   │   ├── memberEvents.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── communityFormatter.ts
│   │   │   │   ├── rankCalculator.ts
│   │   │   │   ├── memberCounter.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-chat/
│   │   ├── src/
│   │   │   ├── messages/
│   │   │   │   ├── sendMessage.ts
│   │   │   │   ├── editMessage.ts
│   │   │   │   ├── deleteMessage.ts
│   │   │   │   ├── replyMessage.ts
│   │   │   │   ├── forwardMessage.ts
│   │   │   │   ├── pinMessage.ts
│   │   │   │   ├── unpinMessage.ts
│   │   │   │   ├── markAsRead.ts
│   │   │   │   └── index.ts
│   │   │   ├── conversations/
│   │   │   │   ├── createConversation.ts
│   │   │   │   ├── getConversation.ts
│   │   │   │   ├── listConversations.ts
│   │   │   │   ├── archiveConversation.ts
│   │   │   │   ├── muteConversation.ts
│   │   │   │   └── index.ts
│   │   │   ├── groups/
│   │   │   │   ├── createGroupChat.ts
│   │   │   │   ├── addMember.ts
│   │   │   │   ├── removeMember.ts
│   │   │   │   ├── promoteAdmin.ts
│   │   │   │   ├── leaveGroup.ts
│   │   │   │   └── index.ts
│   │   │   ├── realtime/
│   │   │   │   ├── subscribeMessages.ts
│   │   │   │   ├── subscribeTyping.ts
│   │   │   │   ├── subscribePresence.ts
│   │   │   │   ├── realtimeEvents.ts
│   │   │   │   └── index.ts
│   │   │   ├── presence/
│   │   │   │   ├── onlineStatus.ts
│   │   │   │   ├── lastSeen.ts
│   │   │   │   └── index.ts
│   │   │   ├── media/
│   │   │   │   ├── uploadImage.ts
│   │   │   │   ├── uploadAudio.ts
│   │   │   │   ├── voiceMessage.ts
│   │   │   │   └── index.ts
│   │   │   ├── moderation/
│   │   │   │   ├── reportMessage.ts
│   │   │   │   ├── blockUser.ts
│   │   │   │   ├── filterContent.ts
│   │   │   │   └── index.ts
│   │   │   ├── notifications/
│   │   │   │   ├── chatNotification.ts
│   │   │   │   ├── mentionNotification.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── Message.ts
│   │   │   │   ├── Conversation.ts
│   │   │   │   ├── ChatMember.ts
│   │   │   │   ├── ChatRoom.ts
│   │   │   │   ├── Attachment.ts
│   │   │   │   ├── Reaction.ts
│   │   │   │   ├── Presence.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── IChatProvider.ts
│   │   │   │   ├── IMessageRepository.ts
│   │   │   │   ├── IRealtimeProvider.ts
│   │   │   │   ├── IMediaStorage.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── messageTypes.ts
│   │   │   │   ├── chatTypes.ts
│   │   │   │   ├── limits.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   ├── messageValidator.ts
│   │   │   │   ├── attachmentValidator.ts
│   │   │   │   └── index.ts
│   │   │   ├── errors/
│   │   │   │   ├── ChatError.ts
│   │   │   │   ├── MessageError.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── messageFormatter.ts
│   │   │   │   ├── mentionParser.ts
│   │   │   │   ├── emojiParser.ts
│   │   │   │   ├── timeGrouping.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-game/
│   │   ├── src/
│   │   │   ├── card/
│   │   │   │   ├── generate.ts
│   │   │   │   ├── validate.ts
│   │   │   │   └── mark.ts
│   │   │   ├── level/
│   │   │   │   ├── levels.ts
│   │   │   │   └── progression.ts
│   │   │   ├── winner/
│   │   │   │   ├── checkWinner.ts
│   │   │   │   └── fullHouse.ts
│   │   │   ├── timer/
│   │   │   │   └── gameTimer.ts
│   │   │   ├── hooks/
│   │   │   │   └── useGame.ts
│   │   │   ├── providers/
│   │   │   │   ├── GameProvider.tsx
│   │   │   │   └── GameContext.ts
│   │   │   ├── types/
│   │   │   │   ├── Game.ts
│   │   │   │   ├── Card.ts
│   │   │   │   ├── Level.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-duel/
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── Duel.ts
│   │   │   │   ├── DuelStatus.ts
│   │   │   │   ├── DuelType.ts
│   │   │   │   ├── DuelParticipant.ts
│   │   │   │   ├── DuelResult.ts
│   │   │   │   ├── DuelPrize.ts
│   │   │   │   ├── DuelSettings.ts
│   │   │   │   ├── DuelCard.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── DuelRepository.ts
│   │   │   │   ├── DuelService.ts
│   │   │   │   ├── DuelEngine.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── duelLimits.ts
│   │   │   │   ├── duelStatus.ts
│   │   │   │   ├── duelFees.ts
│   │   │   │   ├── duelLevels.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── duelService.ts
│   │   │   │   ├── duelCreationService.ts
│   │   │   │   ├── duelJoinService.ts
│   │   │   │   ├── duelCancelService.ts
│   │   │   │   ├── duelResultService.ts
│   │   │   │   ├── duelRewardService.ts
│   │   │   │   └── index.ts
│   │   │   ├── engine/
│   │   │   │   ├── duelEngine.ts
│   │   │   │   ├── winnerCalculator.ts
│   │   │   │   ├── cardMatcher.ts
│   │   │   │   ├── numberChecker.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   ├── duelValidator.ts
│   │   │   │   ├── createDuelValidator.ts
│   │   │   │   ├── joinDuelValidator.ts
│   │   │   │   └── index.ts
│   │   │   ├── mappers/
│   │   │   │   ├── duelMapper.ts
│   │   │   │   ├── participantMapper.ts
│   │   │   │   └── index.ts
│   │   │   ├── permissions/
│   │   │   │   ├── duelPermissions.ts
│   │   │   │   └── index.ts
│   │   │   ├── events/
│   │   │   │   ├── duelEvents.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── duelFormatter.ts
│   │   │   │   ├── duelTimer.ts
│   │   │   │   ├── prizeCalculator.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-challenge/
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── Challenge.ts
│   │   │   │   ├── ChallengeStatus.ts
│   │   │   │   ├── ChallengeParticipant.ts
│   │   │   │   ├── ChallengeLevel.ts
│   │   │   │   ├── ChallengePrize.ts
│   │   │   │   ├── ChallengePool.ts
│   │   │   │   ├── ChallengeSettings.ts
│   │   │   │   ├── ChallengeCard.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── ChallengeRepository.ts
│   │   │   │   ├── ChallengeService.ts
│   │   │   │   ├── ChallengeEngine.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── challengeLimits.ts
│   │   │   │   ├── challengeLevels.ts
│   │   │   │   ├── challengeFees.ts
│   │   │   │   ├── challengeCooldown.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── challengeService.ts
│   │   │   │   ├── challengeCreationService.ts
│   │   │   │   ├── challengeJoinService.ts
│   │   │   │   ├── challengeCancelService.ts
│   │   │   │   ├── challengeParticipantService.ts
│   │   │   │   ├── challengeRewardService.ts
│   │   │   │   ├── challengeLevelService.ts
│   │   │   │   └── index.ts
│   │   │   ├── engine/
│   │   │   │   ├── challengeEngine.ts
│   │   │   │   ├── winnerCalculator.ts
│   │   │   │   ├── rankingCalculator.ts
│   │   │   │   ├── cardMatcher.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   ├── challengeValidator.ts
│   │   │   │   ├── createChallengeValidator.ts
│   │   │   │   ├── joinChallengeValidator.ts
│   │   │   │   ├── participantValidator.ts
│   │   │   │   └── index.ts
│   │   │   ├── mappers/
│   │   │   │   ├── challengeMapper.ts
│   │   │   │   ├── participantMapper.ts
│   │   │   │   └── index.ts
│   │   │   ├── permissions/
│   │   │   │   ├── challengePermissions.ts
│   │   │   │   └── index.ts
│   │   │   ├── events/
│   │   │   │   ├── challengeEvents.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── challengeFormatter.ts
│   │   │   │   ├── challengeTimer.ts
│   │   │   │   ├── poolCalculator.ts
│   │   │   │   ├── participantCounter.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-services/
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   ├── client.ts
│   │   │   │   ├── authApi.ts
│   │   │   │   ├── walletApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── websocket/
│   │   │   │   ├── socket.ts
│   │   │   │   └── realtime.ts
│   │   │   ├── storage/
│   │   │   │   ├── localStorage.ts
│   │   │   │   └── asyncStorage.ts
│   │   │   ├── notification/
│   │   │   │   ├── push.ts
│   │   │   │   ├── inApp.ts
│   │   │   │   └── toast.ts
│   │   │   ├── upload/
│   │   │   │   └── upload.ts
│   │   │   ├── download/
│   │   │   │   └── download.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-database/
│   │   ├── src/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts
│   │   │   │   └── types.ts
│   │   │   ├── repositories/
│   │   │   │   ├── UserRepository.ts
│   │   │   │   ├── WalletRepository.ts
│   │   │   │   ├── TransactionRepository.ts
│   │   │   │   ├── DuelRepository.ts
│   │   │   │   ├── ChallengeRepository.ts
│   │   │   │   ├── CommunityRepository.ts
│   │   │   │   └── index.ts
│   │   │   ├── queries/
│   │   │   │   ├── users.ts
│   │   │   │   ├── wallets.ts
│   │   │   │   ├── transactions.ts
│   │   │   │   ├── games.ts
│   │   │   │   └── communities.ts
│   │   │   ├── mutations/
│   │   │   │   ├── createWallet.ts
│   │   │   │   ├── createTransaction.ts
│   │   │   │   ├── joinDuel.ts
│   │   │   │   └── joinChallenge.ts
│   │   │   ├── types/
│   │   │   │   ├── Database.ts
│   │   │   │   ├── Tables.ts
│   │   │   │   └── index.ts
│   │   │   ├── generated/
│   │   │   │   └── database.types.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-validators/
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── email.ts
│   │   │   │   ├── phone.ts
│   │   │   │   ├── username.ts
│   │   │   │   ├── password.ts
│   │   │   │   ├── otp.ts
│   │   │   │   ├── did.ts
│   │   │   │   └── index.ts
│   │   │   ├── wallet/
│   │   │   │   ├── amount.ts
│   │   │   │   ├── balance.ts
│   │   │   │   ├── currency.ts
│   │   │   │   ├── network.ts
│   │   │   │   ├── address.ts
│   │   │   │   └── index.ts
│   │   │   ├── payment/
│   │   │   │   ├── order.ts
│   │   │   │   ├── invoice.ts
│   │   │   │   ├── paymentLink.ts
│   │   │   │   └── index.ts
│   │   │   ├── transfer/
│   │   │   │   ├── receiver.ts
│   │   │   │   ├── amount.ts
│   │   │   │   ├── memo.ts
│   │   │   │   └── index.ts
│   │   │   ├── swap/
│   │   │   │   ├── pair.ts
│   │   │   │   ├── amount.ts
│   │   │   │   └── index.ts
│   │   │   ├── game/
│   │   │   │   ├── card.ts
│   │   │   │   ├── room.ts
│   │   │   │   ├── level.ts
│   │   │   │   ├── duel.ts
│   │   │   │   ├── challenge.ts
│   │   │   │   └── index.ts
│   │   │   ├── community/
│   │   │   │   ├── groupName.ts
│   │   │   │   ├── username.ts
│   │   │   │   ├── community.ts
│   │   │   │   └── index.ts
│   │   │   ├── profile/
│   │   │   │   ├── displayName.ts
│   │   │   │   ├── bio.ts
│   │   │   │   ├── avatar.ts
│   │   │   │   └── index.ts
│   │   │   ├── common/
│   │   │   │   ├── uuid.ts
│   │   │   │   ├── url.ts
│   │   │   │   ├── image.ts
│   │   │   │   ├── file.ts
│   │   │   │   ├── json.ts
│   │   │   │   ├── date.ts
│   │   │   │   ├── number.ts
│   │   │   │   ├── string.ts
│   │   │   │   └── index.ts
│   │   │   ├── schemas/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── wallet.ts
│   │   │   │   ├── payment.ts
│   │   │   │   ├── profile.ts
│   │   │   │   ├── community.ts
│   │   │   │   ├── game.ts
│   │   │   │   └── index.ts
│   │   │   ├── errors/
│   │   │   │   ├── ValidationError.ts
│   │   │   │   ├── ErrorCodes.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-errors/
│   │   ├── src/
│   │   │   ├── codes/
│   │   │   │   ├── authErrors.ts
│   │   │   │   ├── walletErrors.ts
│   │   │   │   ├── paymentErrors.ts
│   │   │   │   ├── transactionErrors.ts
│   │   │   │   ├── duelErrors.ts
│   │   │   │   ├── challengeErrors.ts
│   │   │   │   ├── gameErrors.ts
│   │   │   │   ├── communityErrors.ts
│   │   │   │   ├── chatErrors.ts
│   │   │   │   ├── systemErrors.ts
│   │   │   │   └── index.ts
│   │   │   ├── classes/
│   │   │   │   ├── AppError.ts
│   │   │   │   ├── ValidationError.ts
│   │   │   │   ├── AuthenticationError.ts
│   │   │   │   ├── AuthorizationError.ts
│   │   │   │   ├── NotFoundError.ts
│   │   │   │   ├── PaymentError.ts
│   │   │   │   ├── WalletError.ts
│   │   │   │   ├── TransactionError.ts
│   │   │   │   └── index.ts
│   │   │   ├── formatters/
│   │   │   │   ├── errorFormatter.ts
│   │   │   │   ├── apiErrorFormatter.ts
│   │   │   │   ├── i18nErrorMapper.ts
│   │   │   │   └── index.ts
│   │   │   ├── handlers/
│   │   │   │   ├── errorHandler.ts
│   │   │   │   ├── asyncErrorHandler.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── ErrorCode.ts
│   │   │   │   ├── ErrorResponse.ts
│   │   │   │   ├── ErrorMetadata.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── isAppError.ts
│   │   │   │   ├── getErrorCode.ts
│   │   │   │   ├── normalizeError.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-logger/
│   │   ├── src/
│   │   │   ├── logger/
│   │   │   │   ├── logger.ts
│   │   │   │   ├── levels.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   └── index.ts
│   │   │   ├── transports/
│   │   │   │   ├── consoleTransport.ts
│   │   │   │   ├── fileTransport.ts
│   │   │   │   ├── remoteTransport.ts
│   │   │   │   └── index.ts
│   │   │   ├── context/
│   │   │   │   ├── requestContext.ts
│   │   │   │   ├── userContext.ts
│   │   │   │   ├── traceContext.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── LogLevel.ts
│   │   │   │   ├── LogEvent.ts
│   │   │   │   ├── LoggerConfig.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   └── logEvents.ts
│   │   │   ├── adapters/
│   │   │   │   ├── sentry.ts
│   │   │   │   ├── telemetry.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-telemetry/
│   │   ├── src/
│   │   │   ├── logger/
│   │   │   │   ├── logger.ts
│   │   │   │   ├── levels.ts
│   │   │   │   ├── formatter.ts
│   │   │   │   ├── consoleTransport.ts
│   │   │   │   ├── remoteTransport.ts
│   │   │   │   └── index.ts
│   │   │   ├── metrics/
│   │   │   │   ├── counter.ts
│   │   │   │   ├── gauge.ts
│   │   │   │   ├── histogram.ts
│   │   │   │   ├── timer.ts
│   │   │   │   └── index.ts
│   │   │   ├── tracing/
│   │   │   │   ├── tracer.ts
│   │   │   │   ├── span.ts
│   │   │   │   ├── context.ts
│   │   │   │   └── index.ts
│   │   │   ├── events/
│   │   │   │   ├── analyticsEvent.ts
│   │   │   │   ├── eventTracker.ts
│   │   │   │   ├── eventNames.ts
│   │   │   │   └── index.ts
│   │   │   ├── crash/
│   │   │   │   ├── crashReporter.ts
│   │   │   │   ├── errorBoundary.ts
│   │   │   │   └── index.ts
│   │   │   ├── providers/
│   │   │   │   ├── sentry.ts
│   │   │   │   ├── datadog.ts
│   │   │   │   ├── firebase.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── ILogger.ts
│   │   │   │   ├── IMetrics.ts
│   │   │   │   ├── ITracer.ts
│   │   │   │   ├── ICrashReporter.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── LogEntry.ts
│   │   │   │   ├── Metric.ts
│   │   │   │   ├── Trace.ts
│   │   │   │   ├── Event.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── environments.ts
│   │   │   │   ├── logLevels.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── sanitize.ts
│   │   │   │   ├── maskSensitive.ts
│   │   │   │   ├── deviceInfo.ts
│   │   │   │   ├── sessionInfo.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── shared-hooks/
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
│       ├── test/
│       ├── package.json
│       └── tsconfig.json
│
├── supabase/
│   ├── config.toml
│   ├── seed.sql
│   ├── .gitignore
│   ├── migrations/
│   │   ├── 0001_create_extensions.sql
│   │   ├── 0002_create_profiles.sql
│   │   ├── 0003_create_wallets.sql
│   │   ├── 0004_create_transactions.sql
│   │   ├── 0005_create_games.sql
│   │   ├── 0006_create_duels.sql
│   │   ├── 0007_create_challenges.sql
│   │   ├── 0008_create_communities.sql
│   │   ├── 0009_create_chat.sql
│   │   ├── 0010_create_notifications.sql
│   │   ├── ...
│   │   └── 0036_setup_cancel_expired_cron.sql
│   ├── functions/
│   │   ├── payment-webhook/
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   ├── notifications/
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   ├── image-upload/
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   ├── auth-webhook/
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   ├── game-processor/
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   └── _shared/
│   │       ├── cors.ts
│   │       ├── auth.ts
│   │       ├── supabase.ts
│   │       ├── utils.ts
│   │       └── types.ts
│   ├── sql/
│   │   ├── functions/
│   │   │   ├── fn_add_member_to_group.sql
│   │   │   ├── fn_calculate_daily_interest.sql
│   │   │   ├── fn_call_number.sql
│   │   │   ├── fn_cancel_challenge.sql
│   │   │   ├── fn_cancel_duel.sql
│   │   │   ├── fn_check_challenge_cooldown.sql
│   │   │   ├── fn_check_room_timer.sql
│   │   │   ├── fn_check_winner.sql
│   │   │   ├── fn_complete_challenge.sql
│   │   │   ├── fn_complete_duel.sql
│   │   │   ├── fn_complete_room_game.sql
│   │   │   ├── fn_create_challenge.sql
│   │   │   ├── fn_create_duel.sql
│   │   │   ├── fn_create_room.sql
│   │   │   ├── fn_deactivate_user.sql
│   │   │   ├── fn_follow_user.sql
│   │   │   ├── fn_generate_account_number.sql
│   │   │   ├── fn_generate_did.sql
│   │   │   ├── fn_generate_gp_id.sql
│   │   │   ├── fn_get_exchange_rate.sql
│   │   │   ├── fn_get_mutual_friends.sql
│   │   │   ├── fn_get_stories.sql
│   │   │   ├── fn_get_unread_count.sql
│   │   │   ├── fn_join_challenge.sql
│   │   │   ├── fn_join_duel.sql
│   │   │   ├── fn_join_room.sql
│   │   │   ├── fn_mark_messages_read.sql
│   │   │   ├── fn_pin_message.sql
│   │   │   ├── fn_process_referral_reward.sql
│   │   │   ├── fn_purchase_card.sql
│   │   │   ├── fn_remove_member_from_group.sql
│   │   │   ├── fn_send_message.sql
│   │   │   ├── fn_start_challenge.sql
│   │   │   ├── fn_start_challenge_game.sql
│   │   │   ├── fn_start_duel_game.sql
│   │   │   ├── fn_start_game.sql
│   │   │   ├── fn_start_room_game.sql
│   │   │   ├── fn_submit_report.sql
│   │   │   ├── fn_transfer_to_escrow.sql
│   │   │   ├── fn_unfollow_user.sql
│   │   │   ├── fn_update_balance.sql
│   │   │   └── fn_update_group_rank.sql
│   │   ├── triggers/
│   │   │   ├── trg_update_timestamp.sql
│   │   │   ├── trg_balance_update.sql
│   │   │   ├── trg_audit_log.sql
│   │   │   └── ...
│   │   ├── views/
│   │   │   ├── vw_leaderboard.sql
│   │   │   ├── vw_user_stats.sql
│   │   │   ├── vw_community_rank.sql
│   │   │   ├── vw_transaction_summary.sql
│   │   │   └── ...
│   │   ├── policies/
│   │   │   ├── profiles.sql
│   │   │   ├── rooms.sql
│   │   │   ├── wallets.sql
│   │   │   ├── transactions.sql
│   │   │   ├── games.sql
│   │   │   ├── duels.sql
│   │   │   ├── challenges.sql
│   │   │   ├── communities.sql
│   │   │   ├── chat.sql
│   │   │   └── ...
│   │   ├── indexes/
│   │   │   ├── profiles.sql
│   │   │   ├── rooms.sql
│   │   │   ├── wallets.sql
│   │   │   ├── transactions.sql
│   │   │   └── ...
│   │   ├── types/
│   │   │   ├── enums.sql
│   │   │   ├── domains.sql
│   │   │   └── composite_types.sql
│   │   ├── extensions/
│   │   │   ├── pgcrypto.sql
│   │   │   ├── pg_cron.sql
│   │   │   ├── pgjwt.sql
│   │   │   └── pg_net.sql
│   │   └── helpers/
│   │       ├── constants.sql
│   │       ├── utilities.sql
│   │       └── permissions.sql
│   ├── tests/
│   │   ├── pgtap/
│   │   │   ├── test_functions.sql
│   │   │   ├── test_triggers.sql
│   │   │   └── test_policies.sql
│   │   ├── integration/
│   │   │   ├── auth.test.sql
│   │   │   ├── wallet.test.sql
│   │   │   └── game.test.sql
│   │   └── fixtures/
│   │       └── data.sql
│   ├── types/
│   │   └── database.types.ts
│   ├── scripts/
│   │   ├── reset.sh
│   │   ├── generate-types.sh
│   │   ├── backup.sh
│   │   └── restore.sh
│   └── README.md
│
├── docker/
│   ├── nginx/
│   │   ├── nginx.conf
│   │   ├── default.conf
│   │   └── ssl/
│   │       ├── cert.pem
│   │       └── key.pem
│   ├── postgres/
│   │   ├── init.sql
│   │   ├── migrations/
│   │   └── conf/
│   │       └── postgresql.conf
│   ├── redis/
│   │   └── redis.conf
│   ├── mysql/ (اختیاری)
│   │   ├── init.sql
│   │   └── my.cnf
│   ├── mongodb/ (اختیاری)
│   │   ├── init.js
│   │   └── mongod.conf
│   ├── scripts/
│   │   ├── wait-for-db.sh
│   │   ├── healthcheck.sh
│   │   ├── backup.sh
│   │   ├── restore.sh
│   │   └── entrypoint.sh
│   ├── env/
│   │   ├── development.env
│   │   ├── staging.env
│   │   ├── production.env
│   │   └── testing.env
│   ├── compose/
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.test.yml
│   │   ├── docker-compose.prod.yml
│   │   └── docker-compose.monitoring.yml
│   ├── monitoring/
│   │   ├── prometheus.yml
│   │   ├── grafana/
│   │   │   ├── dashboards/
│   │   │   └── datasources/
│   │   └── loki/
│   │       └── loki-config.yml
│   ├── traefik/
│   │   ├── traefik.yml
│   │   └── dynamic.yml
│   ├── logs/
│   ├── volumes/
│   └── README.md
│
├── docs/
│   ├── README.md
│   ├── index.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── system-design.md
│   │   ├── components.md
│   │   ├── database.md
│   │   ├── api-flow.md
│   │   └── diagrams/
│   │       ├── architecture.drawio
│   │       ├── erd.drawio
│   │       ├── sequence.drawio
│   │       └── deployment.drawio
│   ├── api/
│   │   ├── authentication.md
│   │   ├── endpoints.md
│   │   ├── errors.md
│   │   ├── examples.md
│   │   ├── rate-limiting.md
│   │   └── openapi.yaml
│   ├── development/
│   │   ├── setup.md
│   │   ├── coding-style.md
│   │   ├── project-structure.md
│   │   ├── testing.md
│   │   ├── debugging.md
│   │   ├── contributing.md
│   │   └── git-workflow.md
│   ├── deployment/
│   │   ├── docker.md
│   │   ├── kubernetes.md
│   │   ├── production.md
│   │   ├── staging.md
│   │   ├── backup.md
│   │   ├── monitoring.md
│   │   └── ci-cd.md
│   ├── security/
│   │   ├── authentication.md
│   │   ├── authorization.md
│   │   ├── secrets.md
│   │   ├── vulnerabilities.md
│   │   ├── encryption.md
│   │   ├── security-checklist.md
│   │   └── gdpr.md
│   ├── database/
│   │   ├── schema.md
│   │   ├── migrations.md
│   │   ├── indexes.md
│   │   ├── queries.md
│   │   ├── seed-data.md
│   │   └── backup-strategy.md
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── faq.md
│   │   ├── troubleshooting.md
│   │   ├── migration-guide.md
│   │   ├── best-practices.md
│   │   └── performance-tuning.md
│   ├── releases/
│   │   ├── CHANGELOG.md
│   │   ├── roadmap.md
│   │   ├── release-process.md
│   │   └── versioning.md
│   ├── assets/
│   │   ├── images/
│   │   │   ├── architecture/
│   │   │   ├── screenshots/
│   │   │   └── diagrams/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── videos/
│   ├── templates/
│   │   ├── issue-template.md
│   │   ├── pr-template.md
│   │   ├── adr-template.md
│   │   └── rfc-template.md
│   ├── adr/
│   │   ├── 0001-use-monorepo.md
│   │   ├── 0002-use-supabase.md
│   │   ├── 0003-use-react-native.md
│   │   └── index.md
│   ├── rfcs/
│   │   ├── 0001-duel-system.md
│   │   ├── 0002-payment-gateway.md
│   │   └── index.md
│   ├── runbooks/
│   │   ├── database-failure.md
│   │   ├── payment-failure.md
│   │   ├── performance-issue.md
│   │   └── security-incident.md
│   ├── performance/
│   │   ├── benchmarks.md
│   │   ├── load-testing.md
│   │   └── optimization.md
│   ├── compliance/
│   │   ├── iso-27001.md
│   │   ├── gdpr.md
│   │   ├── pci-dss.md
│   │   └── audit-logs.md
│   └── localization/
│       ├── en/
│       ├── fa/
│       ├── tr/
│       └── ar/
│
├── scripts/
│   ├── copy-assets.sh
│   ├── deploy-web.sh
│   ├── deploy-mobile.sh
│   ├── seed-database.js
│   ├── migrate-all.sh
│   ├── healthcheck.sh
│   └── backup.sh
│
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
├── Dockerfile.dev
├── Dockerfile.prod
├── docker-compose.yml
├── docker-compose.override.yml
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

---

📊 آمار کلی ساختار

بخش تعداد پوشه‌ها تعداد فایل‌های تخمینی

.github/ 
فایل‌های تخمینی+۲۰   پوشه ها ۴

apps/dobna-web/  
فایل‌های تخمینی+۲۰۰   پوشه ها ۱۵

apps/dobna-mobile/ 
فایل‌های تخمینی+۳۰۰   پوشه ها ۲۰

apps/dobna-admin/ 
فایل‌های تخمینی+۱۵۰  پوشه ها ۱۲

backend/ 
فایل‌های تخمینی+۱۵۰   پوشه ها ۱۸
packages/ (۲۲ پکیج) 
فایل‌های تخمینی+۵۰۰   پوشه ها ۱۱۰

supabase/
 فایل‌های تخمینی+۱۰۰   پوشه ها ۱۲

docker/
فایل‌های تخمینی+۳۰   پوشه ها ۱۰ 

docs/
فایل‌های تخمینی+۵۰   پوشه ها ۱۸ 

scripts/
 فایل‌های تخمینی+۲۰   پوشه ها ۱

فایل‌های ریشه 
+۱۲ فایل

جمع کل
+۲۰۰ پوشه 
+۱۵۰۰ فایل

---

✅ تأکید نهایی

این ساختار کامل‌ترین و جامع‌ترین ساختار درختی پروژه DOBNA است که:

· ✅ تمام پوشه‌ها و زیرپوشه‌ها را شامل می‌شود
· ✅ تمام فایل‌های مشخص‌شده در طول طراحی را دارد
· ✅ بر اساس معماری Monorepo + Shared Packages + Supabase طراحی شده
· ✅ برای محیط Production و توسعه‌ی تیمی آماده است

---
