```

apps/
└── dobna-admin/
    │
    ├── app/                                    ← 📍 Next.js App Router
    │   │
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── loading.tsx
    │   ├── error.tsx
    │   ├── not-found.tsx
    │   ├── global-error.tsx
    │   │
    │   ├── (auth)/                             ← صفحات احراز هویت Admin
    │   │   ├── layout.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── forgot-password/
    │   │       └── page.tsx
    │   │
    │   ├── (dashboard)/                        ← صفحات اصلی داشبورد مدیریت
    │   │   ├── layout.tsx
    │   │   ├── page.tsx                        ← داشبورد اصلی
    │   │   │
    │   │   ├── users/                          ← مدیریت کاربران
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── wallets/                        ← مدیریت کیف‌پول‌ها
    │   │   │   ├── page.tsx
    │   │   │   └── [address]/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── transactions/                   ← مدیریت تراکنش‌ها
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── payments/                       ← مدیریت پرداخت‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── deposits/                       ← مدیریت واریزها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── withdrawals/                    ← مدیریت برداشت‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── duels/                          ← مدیریت دوئل‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── challenges/                     ← مدیریت چالش‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── games/                          ← مدیریت بازی‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── communities/                    ← مدیریت انجمن‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── chat/                           ← مدیریت چت
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── notifications/                  ← مدیریت اعلان‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── reports/                        ← گزارش‌ها
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── settings/                       ← تنظیمات سیستم
    │   │   │   └── page.tsx
    │   │   │
    │   │   └── audit-log/                      ← لاگ‌های حسابرسی (مالی)
    │   │       └── page.tsx
    │   │
    │   └── api/                                ← Route Handlers (Admin API)
    │       ├── health/
    │       │   └── route.ts
    │       └── admin/
    │           └── route.ts
    │
    ├── components/                             ← 🎨 Admin UI Components
    │   │
    │   ├── layout/                             ← اسکلت صفحات Admin
    │   │   ├── AdminSidebar.tsx
    │   │   ├── AdminHeader.tsx
    │   │   ├── AdminBreadcrumb.tsx
    │   │   ├── AdminFooter.tsx
    │   │   ├── AdminNavigation.tsx
    │   │   ├── AdminMobileMenu.tsx
    │   │   └── index.ts
    │   │
    │   ├── users/                              ← کامپوننت‌های مدیریت کاربران
    │   │   ├── UserTable.tsx
    │   │   ├── UserCard.tsx
    │   │   ├── UserStatusBadge.tsx
    │   │   ├── UserRoleSelector.tsx
    │   │   └── index.ts
    │   │
    │   ├── wallet/                             ← کامپوننت‌های مدیریت کیف‌پول
    │   │   ├── WalletTable.tsx
    │   │   ├── BalanceCard.tsx
    │   │   ├── AssetBalanceCard.tsx
    │   │   └── index.ts
    │   │
    │   ├── transaction/                        ← کامپوننت‌های تراکنش
    │   │   ├── TransactionTable.tsx
    │   │   ├── TransactionStatus.tsx
    │   │   ├── TransactionFilters.tsx
    │   │   └── index.ts
    │   │
    │   ├── payment/                            ← کامپوننت‌های پرداخت
    │   │   ├── PaymentTable.tsx
    │   │   ├── GatewayStatus.tsx
    │   │   ├── PaymentHistory.tsx
    │   │   └── index.ts
    │   │
    │   ├── game/                               ← کامپوننت‌های مدیریت بازی
    │   │   ├── GameStats.tsx
    │   │   ├── DuelManagement.tsx
    │   │   ├── ChallengeManagement.tsx
    │   │   └── index.ts
    │   │
    │   ├── community/                          ← کامپوننت‌های مدیریت انجمن
    │   │   ├── CommunityTable.tsx
    │   │   ├── CommunityStatus.tsx
    │   │   ├── RankManagement.tsx
    │   │   └── index.ts
    │   │
    │   ├── charts/                             ← نمودارهای مدیریتی
    │   │   ├── RevenueChart.tsx
    │   │   ├── UsersChart.tsx
    │   │   ├── GameChart.tsx
    │   │   ├── TransactionChart.tsx
    │   │   └── index.ts
    │   │
    │   ├── audit/                              ← کامپوننت‌های Audit Log
    │   │   ├── AuditLogTable.tsx
    │   │   ├── AuditLogFilter.tsx
    │   │   └── index.ts
    │   │
    │   └── common/                             ← کامپوننت‌های عمومی Admin
    │       ├── DataTable.tsx
    │       ├── SearchBox.tsx
    │       ├── Filter.tsx
    │       ├── ConfirmDialog.tsx
    │       ├── ExportButton.tsx
    │       ├── StatsCard.tsx
    │       ├── StatusBadge.tsx
    │       └── index.ts
    │
    ├── features/                               ← 🧩 Admin Feature Modules
    │   │
    │   ├── user-management/                    ← مدیریت کاربران
    │   │   ├── hooks.ts
    │   │   ├── actions.ts
    │   │   ├── permissions.ts
    │   │   └── index.ts
    │   │
    │   ├── wallet-management/                  ← مدیریت کیف‌پول
    │   │   ├── hooks.ts
    │   │   ├── actions.ts
    │   │   └── index.ts
    │   │
    │   ├── finance/                            ← مدیریت مالی
    │   │   ├── reports.ts
    │   │   ├── analytics.ts
    │   │   ├── reconciliation.ts
    │   │   └── index.ts
    │   │
    │   ├── moderation/                         ← مدیریت محتوا
    │   │   ├── reports.ts
    │   │   ├── bans.ts
    │   │   ├── contentFilter.ts
    │   │   └── index.ts
    │   │
    │   └── system/                             ← مدیریت سیستم
    │       ├── settings.ts
    │       ├── featureFlags.ts
    │       ├── maintenance.ts
    │       └── index.ts
    │
    ├── providers/                              ← 🔌 React Providers
    │   ├── AdminAuthProvider.tsx
    │   ├── AdminProvider.tsx
    │   ├── QueryProvider.tsx
    │   ├── ThemeProvider.tsx
    │   ├── I18nProvider.tsx
    │   ├── NotificationProvider.tsx
    │   └── index.ts
    │
    ├── hooks/                                  ← 🪝 Admin Hooks
    │   ├── useAdminAuth.ts
    │   ├── usePermission.ts
    │   ├── useAuditLog.ts
    │   ├── useAdminTable.ts
    │   ├── useAdminFilters.ts
    │   └── index.ts
    │
    ├── lib/                                    ← 📚 Admin Utilities
    │   ├── adminRoutes.ts
    │   ├── permissions.ts
    │   ├── constants.ts
    │   ├── formatters.ts
    │   └── index.ts
    │
    ├── styles/                                 ← 🎨 Admin Styles
    │   ├── globals.css
    │   ├── admin.css
    │   ├── variables.css
    │   └── components/
    │       ├── tables.css
    │       └── forms.css
    │
    ├── middleware.ts                           ← 🔒 Admin Middleware
    ├── instrumentation.ts
    │
    ├── next.config.js
    ├── package.json
    ├── tsconfig.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    ├── eslint.config.js
    └── .env

```