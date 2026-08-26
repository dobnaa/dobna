```
dobna/                                    ← ریشه پروژه
│
├── apps/                                 ← 🚀 اپلیکیشن‌های نهایی (Presentation Layer)
│   └── dobna-web/                        ← وب‌اپ (Next.js App Router)
│       ├── public/
│       │   ├── favicon.ico
│       │   ├── robots.txt
│       │   ├── manifest.json
│       │   └── sitemap.xml
│       │
│       ├── src/
│       │   ├── app/                     ← 📍 Routing & Pages (Grouped by Feature)
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx            ← Home
│       │   │   ├── loading.tsx
│       │   │   ├── error.tsx
│       │   │   ├── not-found.tsx
│       │   │   ├── global-error.tsx
│       │   │   │
│       │   │   ├── (auth)/             ← صفحات احراز هویت
│       │   │   │   ├── layout.tsx
│       │   │   │   ├── login/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── register/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── otp/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── forgot-password/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── reset-password/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── verify-email/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── callback/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── unauthorized/
│       │   │   │       └── page.tsx
│       │   │   │
│       │   │   ├── (dashboard)/        ← صفحات اصلی (داشبورد)
│       │   │   │   ├── layout.tsx
│       │   │   │   ├── page.tsx       ← Home
│       │   │   │   │
│       │   │   │   ├── wallet/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── deposit/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── withdraw/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── transfer/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── swap/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── transactions/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   ├── communities/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── create/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── [communityId]/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   ├── chat/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [chatId]/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   ├── profile/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── settings/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── notifications/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   └── order/
│       │   │   │       ├── page.tsx
│       │   │   │       └── [id]/
│       │   │   │           └── page.tsx
│       │   │   │
│       │   │   ├── (game)/             ← صفحات بازی
│       │   │   │   ├── layout.tsx
│       │   │   │   │
│       │   │   │   ├── rooms/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [roomId]/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   ├── duel/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── create/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── [duelId]/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   ├── challenge/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── create/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── [challengeId]/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   └── watch/
│       │   │   │       ├── duel/
│       │   │   │       │   └── [id]/
│       │   │   │       │       └── page.tsx
│       │   │   │       ├── challenge/
│       │   │   │       │   └── [id]/
│       │   │   │       │       └── page.tsx
│       │   │   │       └── room/
│       │   │   │           └── [id]/
│       │   │   │               └── page.tsx
│       │   │   │
│       │   │   └── api/                ← Route Handlers (Next.js API Routes)
│       │   │       ├── auth/
│       │   │       │   ├── login/
│       │   │       │   │   └── route.ts
│       │   │       │   ├── logout/
│       │   │       │   │   └── route.ts
│       │   │       │   └── refresh/
│       │   │       │       └── route.ts
│       │   │       ├── payment/
│       │   │       │   ├── callback/
│       │   │       │   │   └── route.ts
│       │   │       │   └── webhook/
│       │   │       │       └── route.ts
│       │   │       ├── upload/
│       │   │       │   └── route.ts
│       │   │       ├── health/
│       │   │       │   └── route.ts
│       │   │       └── version/
│       │   │           └── route.ts
│       │   │
│       │   ├── components/             ← 🎨 UI Components (Presentation Layer)
│       │   │   ├── ui/                 ← کامپوننت‌های پایه (Button, Input, ...)
│       │   │   ├── layout/             ← Layoutهای اصلی
│       │   │   │   ├── RootLayout.tsx
│       │   │   │   ├── DashboardLayout.tsx
│       │   │   │   ├── AuthLayout.tsx
│       │   │   │   ├── GameLayout.tsx
│       │   │   │   ├── Header.tsx
│       │   │   │   ├── Footer.tsx
│       │   │   │   ├── Sidebar.tsx
│       │   │   │   ├── BottomBar.tsx
│       │   │   │   └── index.ts
│       │   │   ├── navigation/         ← ناوبری
│       │   │   │   ├── Navbar.tsx
│       │   │   │   ├── BottomNavigation.tsx
│       │   │   │   ├── Breadcrumb.tsx
│       │   │   │   ├── LanguageSwitcher.tsx
│       │   │   │   ├── ThemeSwitcher.tsx
│       │   │   │   └── index.ts
│       │   │   ├── dialogs/            ← Modalها
│       │   │   │   ├── ConfirmDialog.tsx
│       │   │   │   ├── AlertDialog.tsx
│       │   │   │   ├── ErrorDialog.tsx
│       │   │   │   ├── SuccessDialog.tsx
│       │   │   │   ├── QRDialog.tsx
│       │   │   │   ├── ShareDialog.tsx
│       │   │   │   └── index.ts
│       │   │   ├── forms/              ← فرم‌ها
│       │   │   │   ├── LoginForm.tsx
│       │   │   │   ├── RegisterForm.tsx
│       │   │   │   ├── OTPForm.tsx
│       │   │   │   ├── DepositForm.tsx
│       │   │   │   ├── WithdrawForm.tsx
│       │   │   │   ├── SwapForm.tsx
│       │   │   │   ├── TransferForm.tsx
│       │   │   │   ├── CreateCommunityForm.tsx
│       │   │   │   ├── CreateDuelForm.tsx
│       │   │   │   ├── CreateChallengeForm.tsx
│       │   │   │   └── index.ts
│       │   │   ├── charts/             ← نمودارها
│       │   │   │   ├── BalanceChart.tsx
│       │   │   │   ├── PriceChart.tsx
│       │   │   │   ├── PortfolioChart.tsx
│       │   │   │   └── index.ts
│       │   │   ├── pages/              ← کامپوننت‌های صفحات
│       │   │   │   ├── HomePage.tsx
│       │   │   │   ├── WalletPage.tsx
│       │   │   │   ├── CommunityPage.tsx
│       │   │   │   ├── DuelPage.tsx
│       │   │   │   ├── ChallengePage.tsx
│       │   │   │   ├── ChatPage.tsx
│       │   │   │   ├── ProfilePage.tsx
│       │   │   │   └── index.ts
│       │   │   ├── game/               ← کامپوننت‌های بازی
│       │   │   │   ├── BingoCard.tsx
│       │   │   │   ├── NumberBall.tsx
│       │   │   │   ├── WinnerBanner.tsx
│       │   │   │   ├── GameTimer.tsx
│       │   │   │   └── index.ts
│       │   │   ├── wallet/             ← کامپوننت‌های کیف پول
│       │   │   │   ├── WalletCard.tsx
│       │   │   │   ├── AssetCard.tsx
│       │   │   │   ├── TransactionItem.tsx
│       │   │   │   ├── QRCode.tsx
│       │   │   │   └── index.ts
│       │   │   ├── community/          ← کامپوننت‌های انجمن
│       │   │   │   ├── CommunityCard.tsx
│       │   │   │   ├── MemberCard.tsx
│       │   │   │   ├── RankBadge.tsx
│       │   │   │   └── index.ts
│       │   │   ├── chat/               ← کامپوننت‌های چت
│       │   │   │   ├── ChatList.tsx
│       │   │   │   ├── MessageBubble.tsx
│       │   │   │   ├── MessageInput.tsx
│       │   │   │   ├── TypingIndicator.tsx
│       │   │   │   └── index.ts
│       │   │   ├── duel/               ← کامپوننت‌های دوئل
│       │   │   │   ├── DuelCard.tsx
│       │   │   │   ├── DuelStatus.tsx
│       │   │   │   ├── DuelPrize.tsx
│       │   │   │   └── index.ts
│       │   │   ├── challenge/          ← کامپوننت‌های چالش
│       │   │   │   ├── ChallengeCard.tsx
│       │   │   │   ├── ChallengeStatus.tsx
│       │   │   │   ├── ChallengePrize.tsx
│       │   │   │   └── index.ts
│       │   │   ├── profile/            ← کامپوننت‌های پروفایل
│       │   │   │   ├── Avatar.tsx
│       │   │   │   ├── UserCard.tsx
│       │   │   │   ├── UserStats.tsx
│       │   │   │   └── index.ts
│       │   │   └── shared/             ← کامپوننت‌های عمومی
│       │   │       ├── EmptyState.tsx
│       │   │       ├── Loading.tsx
│       │   │       ├── Spinner.tsx
│       │   │       ├── ErrorState.tsx
│       │   │       ├── SearchBar.tsx
│       │   │       ├── Skeleton.tsx
│       │   │       ├── Badge.tsx
│       │   │       ├── Chip.tsx
│       │   │       ├── Tooltip.tsx
│       │   │       ├── CopyButton.tsx
│       │   │       ├── Countdown.tsx
│       │   │       └── index.ts
│       │   │
│       │   ├── providers/              ← 🔌 React Providers
│       │   │   ├── AppProvider.tsx
│       │   │   ├── ThemeProvider.tsx
│       │   │   ├── QueryProvider.tsx
│       │   │   ├── AuthProvider.tsx
│       │   │   ├── I18nProvider.tsx
│       │   │   ├── WalletProvider.tsx
│       │   │   ├── SocketProvider.tsx
│       │   │   ├── NotificationProvider.tsx
│       │   │   └── index.ts
│       │   │
│       │   ├── lib/                    ← 📚 Web-Specific Utilities
│       │   │   ├── api/
│       │   │   │   ├── client.ts
│       │   │   │   ├── endpoints.ts
│       │   │   │   └── interceptors.ts
│       │   │   ├── auth/
│       │   │   │   ├── auth-client.ts
│       │   │   │   └── session.ts
│       │   │   ├── router/
│       │   │   │   └── routes.ts
│       │   │   ├── storage/
│       │   │   │   ├── localStorage.ts
│       │   │   │   └── cookies.ts
│       │   │   ├── guards/
│       │   │   │   ├── authGuard.ts
│       │   │   │   └── roleGuard.ts
│       │   │   ├── analytics/
│       │   │   │   └── events.ts
│       │   │   └── index.ts
│       │   │
│       │   ├── styles/                 ← 🎨 Web-Specific Styles
│       │   │   ├── globals.css
│       │   │   ├── variables.css
│       │   │   ├── themes.css
│       │   │   ├── animations.css
│       │   │   ├── rtl.css
│       │   │   ├── scrollbar.css
│       │   │   └── components/
│       │   │       ├── buttons.css
│       │   │       ├── cards.css
│       │   │       └── forms.css
│       │   │
│       │   ├── middleware.ts
│       │   └── instrumentation.ts
│       │
│       ├── package.json
│       ├── next.config.ts
│       ├── tsconfig.json
│       ├── postcss.config.js
│       ├── tailwind.config.ts
│       ├── eslint.config.js
│       └── .env.local
│
├── packages/                             ← 📦 Shared Packages (Business Logic)
│   ├── shared-resources/                 ← فایل‌های استاتیک
│   ├── shared-finance/                   ← اطلاعات مالی، Registry ارزها
│   ├── shared-i18n/                      ← ترجمه‌ها (۱۷ زبان)
│   ├── shared-types/                     ← TypeScript Types
│   ├── shared-utils/                     ← Utility Functions
│   ├── shared-constants/                 ← مقادیر ثابت
│   ├── shared-config/                    ← تنظیمات (Env, API, Feature Flags)
│   ├── shared-auth/                      ← احراز هویت
│   ├── shared-wallet/                    ← مدیریت کیف پول
│   ├── shared-payment/                   ← درگاه پرداخت
│   ├── shared-community/                 ← مدیریت انجمن‌ها
│   ├── shared-chat/                      ← منطق چت
│   ├── shared-game/                      ← منطق بازی
│   ├── shared-duel/                      ← مدیریت دوئل‌ها
│   ├── shared-challenge/                 ← مدیریت چالش‌ها
│   ├── shared-services/                  ← سرویس‌های عمومی
│   ├── shared-database/                  ← Supabase Client + Repository‌ها
│   ├── shared-validators/                ← Zod Schemas
│   ├── shared-errors/                    ← مدیریت خطاها
│   ├── shared-logger/                    ← Logger
│   ├── shared-telemetry/                 ← مشاهده‌پذیری
│   └── shared-hooks/                     ← React Hooks
│
├── supabase/                             ← 🗄️ Supabase (در ریشه)
│   ├── migrations/
│   ├── functions/
│   ├── seed.sql
│   └── config.toml
│
├── backend/                              ← 🖥️ Backend (اختیاری)
├── docs/
├── scripts/
└── ...