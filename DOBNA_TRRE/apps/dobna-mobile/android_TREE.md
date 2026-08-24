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

```