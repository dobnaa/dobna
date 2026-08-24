```

android/
│
├── app/
│   │
│   ├── build.gradle
│   ├── proguard-rules.pro
│   │
│   └── src/
│       │
│       ├── main/
│       │   │
│       │   ├── AndroidManifest.xml
│       │   │
│       │   ├── java/
│       │   │   └── com/
│       │   │       └── dobna/
│       │   │           │
│       │   │           ├── MainActivity.kt        ← ورودی اصلی Android
│       │   │           ├── MainApplication.kt     ← ثبت Native Modules
│       │   │           │
│       │   │           ├── modules/               ← ✅ Native Bridgeها
│       │   │           │   ├── biometric/
│       │   │           │   │   ├── BiometricModule.kt
│       │   │           │   │   └── BiometricPackage.kt
│       │   │           │   ├── securestorage/
│       │   │           │   │   ├── SecureStorageModule.kt
│       │   │           │   │   └── SecureStoragePackage.kt
│       │   │           │   ├── camera/
│       │   │           │   │   ├── CameraModule.kt
│       │   │           │   │   └── CameraPackage.kt
│       │   │           │   ├── qr/
│       │   │           │   │   ├── QRScannerModule.kt
│       │   │           │   │   └── QRScannerPackage.kt
│       │   │           │   ├── notifications/
│       │   │           │   │   ├── NotificationModule.kt
│       │   │           │   │   └── NotificationPackage.kt
│       │   │           │   └── deeplink/
│       │   │           │       ├── DeepLinkModule.kt
│       │   │           │       └── DeepLinkPackage.kt
│       │   │           │
│       │   │           ├── services/              ← ✅ سرویس‌های Native
│       │   │           │   ├── FirebaseService.kt
│       │   │           │   ├── PushNotificationService.kt
│       │   │           │   └── BackgroundService.kt
│       │   │           │
│       │   │           ├── receivers/             ← ✅ Broadcast Receivers
│       │   │           │   ├── BootReceiver.kt
│       │   │           │   └── NotificationReceiver.kt
│       │   │           │
│       │   │           ├── utils/                 ← ✅ ابزارهای Native
│       │   │           │   ├── DeviceUtils.kt
│       │   │           │   ├── SecurityUtils.kt
│       │   │           │   └── PermissionUtils.kt
│       │   │           │
│       │   │           └── config/                ← ✅ تنظیمات Native
│       │   │               ├── BuildConfig.kt
│       │   │               └── AppConfig.kt
│       │   │
│       │   ├── res/
│       │   │   ├── drawable/
│       │   │   ├── mipmap-*/
│       │   │   ├── values/
│       │   │   └── xml/
│       │   │
│       │   ├── debug/
│       │   ├── release/
│       │   └── google-services.json
│       │
│       └── build.gradle
│
├── gradle/
│   └── wrapper/
├── build.gradle
├── settings.gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
├── keystore/
│   └── dobna-release.keystore
└── local.properties





apps/
└── dobna-mobile/
    │
    ├── android/                              ← 📱 Native Android
    │   ├── app/
    │   │   ├── src/
    │   │   │   ├── main/
    │   │   │   │   ├── java/com/dobna/
    │   │   │   │   │   ├── MainActivity.kt
    │   │   │   │   │   ├── MainApplication.kt
    │   │   │   │   │   └── native/
    │   │   │   │   │       ├── BiometricModule.kt
    │   │   │   │   │       ├── CameraModule.kt
    │   │   │   │   │       └── NotificationModule.kt
    │   │   │   │   ├── res/
    │   │   │   │   │   ├── drawable/
    │   │   │   │   │   ├── mipmap/
    │   │   │   │   │   └── values/
    │   │   │   │   └── AndroidManifest.xml
    │   │   │   └── debug/
    │   │   └── build.gradle
    │   ├── build.gradle
    │   ├── settings.gradle
    │   └── gradle.properties
    │
    ├── ios/                                  ← 📱 Native iOS
    │   ├── Dobna/
    │   │   ├── AppDelegate.swift
    │   │   ├── SceneDelegate.swift
    │   │   ├── Info.plist
    │   │   ├── Native/
    │   │   │   ├── BiometricManager.swift
    │   │   │   ├── CameraManager.swift
    │   │   │   └── NotificationManager.swift
    │   │   └── Assets.xcassets/
    │   ├── Dobna.xcodeproj/
    │   ├── Podfile
    │   └── Podfile.lock
    │
    ├── src/                                  ← 📱 React Native Code
    │   │
    │   ├── app/                              ← 🚀 Application Entry
    │   │   ├── App.tsx
    │   │   ├── navigation/
    │   │   │   ├── RootNavigator.tsx
    │   │   │   ├── AuthNavigator.tsx
    │   │   │   ├── MainNavigator.tsx
    │   │   │   ├── GameNavigator.tsx
    │   │   │   ├── WalletNavigator.tsx
    │   │   │   ├── CommunityNavigator.tsx
    │   │   │   ├── ChatNavigator.tsx
    │   │   │   ├── ProfileNavigator.tsx
    │   │   │   └── routes.ts
    │   │   └── index.ts
    │   │
    │   ├── screens/                          ← 📄 Screens (Presentation Layer)
    │   │   │
    │   │   ├── auth/
    │   │   │   ├── LoginScreen.tsx
    │   │   │   ├── RegisterScreen.tsx
    │   │   │   ├── OTPScreen.tsx
    │   │   │   ├── ForgotPasswordScreen.tsx
    │   │   │   ├── ResetPasswordScreen.tsx
    │   │   │   ├── VerifyEmailScreen.tsx
    │   │   │   ├── CallbackScreen.tsx
    │   │   │   └── UnauthorizedScreen.tsx
    │   │   │
    │   │   ├── home/
    │   │   │   └── HomeScreen.tsx
    │   │   │
    │   │   ├── wallet/
    │   │   │   ├── WalletScreen.tsx
    │   │   │   ├── DepositScreen.tsx
    │   │   │   ├── WithdrawScreen.tsx
    │   │   │   ├── TransferScreen.tsx
    │   │   │   ├── SwapScreen.tsx
    │   │   │   └── TransactionHistoryScreen.tsx
    │   │   │
    │   │   ├── game/
    │   │   │   ├── GameRoomScreen.tsx
    │   │   │   ├── GamePlayScreen.tsx
    │   │   │   ├── GameResultScreen.tsx
    │   │   │   └── GameRoomListScreen.tsx
    │   │   │
    │   │   ├── duel/
    │   │   │   ├── DuelListScreen.tsx
    │   │   │   ├── CreateDuelScreen.tsx
    │   │   │   ├── DuelDetailScreen.tsx
    │   │   │   ├── DuelWatchScreen.tsx
    │   │   │   └── DuelResultScreen.tsx
    │   │   │
    │   │   ├── challenge/
    │   │   │   ├── ChallengeListScreen.tsx
    │   │   │   ├── CreateChallengeScreen.tsx
    │   │   │   ├── ChallengeDetailScreen.tsx
    │   │   │   ├── ChallengeWatchScreen.tsx
    │   │   │   └── ChallengeResultScreen.tsx
    │   │   │
    │   │   ├── community/
    │   │   │   ├── CommunityListScreen.tsx
    │   │   │   ├── CommunityDetailScreen.tsx
    │   │   │   ├── CreateCommunityScreen.tsx
    │   │   │   ├── CommunityMembersScreen.tsx
    │   │   │   └── CommunitySettingsScreen.tsx
    │   │   │
    │   │   ├── chat/
    │   │   │   ├── ChatListScreen.tsx
    │   │   │   ├── ChatRoomScreen.tsx
    │   │   │   └── ChatSettingsScreen.tsx
    │   │   │
    │   │   ├── profile/
    │   │   │   ├── ProfileScreen.tsx
    │   │   │   ├── EditProfileScreen.tsx
    │   │   │   ├── NotificationSettingsScreen.tsx
    │   │   │   ├── SecuritySettingsScreen.tsx
    │   │   │   ├── PrivacySettingsScreen.tsx
    │   │   │   └── LanguageSettingsScreen.tsx
    │   │   │
    │   │   └── settings/
    │   │       ├── SettingsScreen.tsx
    │   │       ├── AboutScreen.tsx
    │   │       └── HelpScreen.tsx
    │   │
    │   ├── components/                      ← 🎨 UI Components (Native)
    │   │   │
    │   │   ├── common/
    │   │   │   ├── Button.tsx
    │   │   │   ├── Input.tsx
    │   │   │   ├── Modal.tsx
    │   │   │   ├── Loader.tsx
    │   │   │   ├── EmptyState.tsx
    │   │   │   ├── Spinner.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Avatar.tsx
    │   │   │   ├── Badge.tsx
    │   │   │   ├── Chip.tsx
    │   │   │   ├── Tabs.tsx
    │   │   │   ├── BottomSheet.tsx
    │   │   │   ├── Toast.tsx
    │   │   │   ├── SearchBar.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── layout/
    │   │   │   ├── MainLayout.tsx
    │   │   │   ├── AuthLayout.tsx
    │   │   │   ├── GameLayout.tsx
    │   │   │   ├── Header.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── navigation/
    │   │   │   ├── BottomTabBar.tsx
    │   │   │   ├── TopTabBar.tsx
    │   │   │   ├── DrawerMenu.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── wallet/
    │   │   │   ├── AssetCard.tsx
    │   │   │   ├── BalanceCard.tsx
    │   │   │   ├── TransactionItem.tsx
    │   │   │   ├── QRCodeDisplay.tsx
    │   │   │   ├── NetworkSelector.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── game/
    │   │   │   ├── BingoCard.tsx
    │   │   │   ├── NumberBoard.tsx
    │   │   │   ├── NumberBall.tsx
    │   │   │   ├── WinnerModal.tsx
    │   │   │   ├── GameTimer.tsx
    │   │   │   ├── CardSelector.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── duel/
    │   │   │   ├── DuelCard.tsx
    │   │   │   ├── DuelStatus.tsx
    │   │   │   ├── DuelPrize.tsx
    │   │   │   ├── DuelPlayers.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── challenge/
    │   │   │   ├── ChallengeCard.tsx
    │   │   │   ├── ChallengeStatus.tsx
    │   │   │   ├── ChallengePrize.tsx
    │   │   │   ├── ChallengeParticipants.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── community/
    │   │   │   ├── CommunityCard.tsx
    │   │   │   ├── MemberCard.tsx
    │   │   │   ├── RankBadge.tsx
    │   │   │   ├── CommunityHeader.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── chat/
    │   │   │   ├── MessageBubble.tsx
    │   │   │   ├── MessageInput.tsx
    │   │   │   ├── TypingIndicator.tsx
    │   │   │   ├── VoiceMessage.tsx
    │   │   │   ├── ChatListItem.tsx
    │   │   │   └── index.ts
    │   │   │
    │   │   └── profile/
    │   │       ├── UserCard.tsx
    │   │       ├── UserStats.tsx
    │   │       ├── AchievementCard.tsx
    │   │       ├── LanguageSelector.tsx
    │   │       ├── ThemeSelector.tsx
    │   │       └── index.ts
    │   │
    │   ├── providers/                       ← 🔌 React Native Providers
    │   │   ├── AppProvider.tsx
    │   │   ├── ThemeProvider.tsx
    │   │   ├── QueryProvider.tsx
    │   │   ├── AuthProvider.tsx
    │   │   ├── I18nProvider.tsx
    │   │   ├── WalletProvider.tsx
    │   │   ├── SocketProvider.tsx
    │   │   ├── NotificationProvider.tsx
    │   │   ├── BiometricProvider.tsx
    │   │   └── index.ts
    │   │
    │   ├── hooks/                           ← 🪝 React Native Hooks
    │   │   ├── useAuth.ts
    │   │   ├── useWallet.ts
    │   │   ├── useSocket.ts
    │   │   ├── useBiometric.ts
    │   │   ├── usePermissions.ts
    │   │   ├── useCamera.ts
    │   │   ├── usePushNotification.ts
    │   │   ├── useDeepLink.ts
    │   │   ├── useDeviceInfo.ts
    │   │   └── index.ts
    │   │
    │   ├── services/                        ← Native Services
    │   │   ├── biometric/
    │   │   │   ├── biometricService.ts
    │   │   │   └── index.ts
    │   │   ├── camera/
    │   │   │   ├── cameraService.ts
    │   │   │   └── index.ts
    │   │   ├── notifications/
    │   │   │   ├── pushNotification.ts
    │   │   │   ├── inAppNotification.ts
    │   │   │   └── index.ts
    │   │   ├── storage/
    │   │   │   ├── secureStorage.ts
    │   │   │   └── index.ts
    │   │   ├── deepLink/
    │   │   │   ├── deepLinkService.ts
    │   │   │   └── index.ts
    │   │   ├── fileSystem/
    │   │   │   ├── fileService.ts
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   ├── theme/                           ← 🎨 Mobile Theme
    │   │   ├── colors.ts
    │   │   ├── typography.ts
    │   │   ├── spacing.ts
    │   │   ├── darkTheme.ts
    │   │   ├── lightTheme.ts
    │   │   └── index.ts
    │   │
    │   ├── utils/                           ← 📚 Mobile Utilities
    │   │   ├── device.ts
    │   │   ├── permissions.ts
    │   │   ├── platform.ts
    │   │   ├── dimensions.ts
    │   │   ├── haptics.ts
    │   │   ├── clipboard.ts
    │   │   └── index.ts
    │   │
    │   ├── config/                          ← ⚙️ Mobile Config
    │   │   ├── app.config.ts
    │   │   ├── navigation.config.ts
    │   │   ├── api.config.ts
    │   │   └── index.ts
    │   │
    │   ├── constants/                       ← 🏷️ Mobile Constants
    │   │   ├── routes.ts
    │   │   ├── storageKeys.ts
    │   │   └── index.ts
    │   │
    │   ├── types/                           ← 📝 Mobile Types
    │   │   ├── navigation.ts
    │   │   ├── screen.ts
    │   │   └── index.ts
    │   │
    │   └── index.ts
    │
    ├── assets/                              ← 📦 Native Assets
    │   ├── fonts/
    │   ├── images/
    │   ├── icons/
    │   └── animations/
    │
    ├── package.json
    ├── tsconfig.json
    ├── metro.config.js
    ├── babel.config.js
    ├── react-native.config.js
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── app.json
    ├── README.md
    └── Gemfile

.



```