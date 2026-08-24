scripts/
│
├── setup/
│   ├── install-dependencies.ts
│   ├── setup-env.ts
│   └── setup-project.ts
│
├── database/
│   ├── migrate.ts
│   ├── reset-db.ts
│   ├── seed-db.ts
│   ├── backup-db.ts
│   └── restore-db.ts
│
├── supabase/
│   ├── start.ts
│   ├── stop.ts
│   ├── deploy-functions.ts
│   └── generate-types.ts
│
├── i18n/
│   ├── validate-translations.ts
│   ├── sync-locales.ts
│   └── generate-types.ts
│
├── assets/
│   ├── optimize-images.ts
│   ├── generate-icons.ts
│   └── generate-app-assets.ts
│
├── mobile/
│   ├── android-build.ts
│   ├── ios-build.ts
│   ├── generate-icons.ts
│   └── clean-native.ts
│
├── web/
│   ├── build-web.ts
│   └── analyze-bundle.ts
│
├── release/
│   ├── version.ts
│   ├── changelog.ts
│   └── release.ts
│
├── security/
│   ├── audit.ts
│   ├── check-env.ts
│   └── scan-secrets.ts
│
└── utils/
    ├── logger.ts
    └── shell.ts