dobna/                                    ← ریشه پروژه
│
├── .github/                              ← 🔄 مدیریت پروژه و اتوماسیون GitHub
│   └── ...
│
├── docker/                               ← 🐳 تنظیمات Docker و سرویس‌های جانبی
│   └── ...
│
├── docs/                                 ← 📄 مستندات جامع پروژه
│   │
│   ├── README.md                         ← معرفی بخش مستندات
│   ├── index.md                          ← صفحه اصلی مستندات (برای MkDocs/Docusaurus)
│   │
│   ├── architecture/                     ← 🏗️ معماری سیستم
│   │   ├── overview.md                   ← نمای کلی معماری
│   │   ├── system-design.md              ← طراحی سیستم و اجزاء
│   │   ├── components.md                 ← توضیح کامپوننت‌های اصلی
│   │   ├── database.md                   ← طراحی دیتابیس و روابط
│   │   ├── api-flow.md                   ← جریان داده در API
│   │   └── diagrams/
│   │       ├── architecture.drawio       ← نمودار معماری کلی
│   │       ├── erd.drawio                ← نمودار Entity-Relationship
│   │       ├── sequence.drawio           ← نمودار توالی (Sequence Diagram)
│   │       └── deployment.drawio         ← نمودار استقرار
│   │
│   ├── api/                              ← 📡 مستندات API
│   │   ├── authentication.md             ← نحوه احراز هویت (JWT, OAuth)
│   │   ├── endpoints.md                  ← لیست کامل Endpointها
│   │   ├── errors.md                     ← کدهای خطا و مدیریت آن‌ها
│   │   ├── examples.md                   ← نمونه درخواست و پاسخ
│   │   ├── rate-limiting.md              ← محدودیت‌های نرخ درخواست
│   │   └── openapi.yaml                  ← مستندات OpenAPI/Swagger
│   │
│   ├── development/                      ← 🛠️ راهنمای توسعه
│   │   ├── setup.md                      ← راه‌اندازی محیط توسعه
│   │   ├── coding-style.md               ← استانداردهای کدنویسی
│   │   ├── project-structure.md          ← ساختار پروژه (Monorepo)
│   │   ├── testing.md                    ← راهنمای تست (Unit, Integration, E2E)
│   │   ├── debugging.md                  ← روش‌های دیباگ
│   │   ├── contributing.md               ← نحوه مشارکت در پروژه
│   │   └── git-workflow.md               ← فرآیند Git و Branching
│   │
│   ├── deployment/                       ← 🚀 راهنمای استقرار
│   │   ├── docker.md                     ← راهنمای Docker و Docker Compose
│   │   ├── kubernetes.md                 ← راهنمای استقرار در Kubernetes
│   │   ├── production.md                 ← تنظیمات محیط تولید
│   │   ├── staging.md                    ← تنظیمات محیط Staging
│   │   ├── backup.md                     ← راهنمای Backup و Restore
│   │   ├── monitoring.md                 ← راهنمای مانیتورینگ (Prometheus, Grafana)
│   │   └── ci-cd.md                      ← راهنمای CI/CD با GitHub Actions
│   │
│   ├── security/                         ← 🔒 مستندات امنیت
│   │   ├── authentication.md             ← سیستم احراز هویت (JWT, OAuth, Biometric)
│   │   ├── authorization.md              ← سیستم مجوزدهی (RBAC, Permissions)
│   │   ├── secrets.md                    ← مدیریت Secrets و کلیدهای API
│   │   ├── vulnerabilities.md            ← آسیب‌پذیری‌های شناخته‌شده
│   │   ├── encryption.md                 ← رمزنگاری داده‌ها
│   │   ├── security-checklist.md         ← چک‌لیست امنیتی
│   │   └── gdpr.md                       ← انطباق با GDPR (برای داده‌های کاربران)
│   │
│   ├── database/                         ← 🗄️ مستندات دیتابیس
│   │   ├── schema.md                     ← توضیح Schema دیتابیس
│   │   ├── migrations.md                 ← راهنمای Migration‌ها
│   │   ├── indexes.md                    ← Indexها و بهینه‌سازی
│   │   ├── queries.md                    ← کوئری‌های پرکاربرد
│   │   ├── seed-data.md                  ← داده‌های اولیه (Seed)
│   │   └── backup-strategy.md            ← استراتژی Backup
│   │
│   ├── guides/                           ← 📖 راهنماهای کاربری و توسعه‌دهنده
│   │   ├── getting-started.md            ← شروع سریع با پروژه
│   │   ├── faq.md                        ← سوالات متداول
│   │   ├── troubleshooting.md            ← رفع اشکالات رایج
│   │   ├── migration-guide.md            ← راهنمای مهاجرت به نسخه‌های جدید
│   │   ├── best-practices.md             ← بهترین روش‌ها
│   │   └── performance-tuning.md         ← بهینه‌سازی عملکرد
│   │
│   ├── releases/                         ← 📦 مستندات انتشار نسخه‌ها
│   │   ├── CHANGELOG.md                  ← تاریخچه تغییرات نسخه‌ها
│   │   ├── roadmap.md                    ← نقشه راه توسعه
│   │   ├── release-process.md            ← فرآیند انتشار نسخه
│   │   └── versioning.md                 ← استراتژی نسخه‌گذاری (SemVer)
│   │
│   ├── assets/                           ← 🖼️ فایل‌های رسانه‌ای مستندات
│   │   ├── images/
│   │   │   ├── architecture/
│   │   │   ├── screenshots/
│   │   │   └── diagrams/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── videos/
│   │
│   ├── templates/                        ← 📝 قالب‌های مستندات
│   │   ├── issue-template.md             ← قالب Issue
│   │   ├── pr-template.md                ← قالب Pull Request
│   │   ├── adr-template.md               ← قالب Architecture Decision Record
│   │   └── rfc-template.md               ← قالب Request For Comments
│   │
│   ├── adr/                              ← 🧠 Architecture Decision Records
│   │   ├── 0001-use-monorepo.md
│   │   ├── 0002-use-supabase.md
│   │   ├── 0003-use-react-native.md
│   │   └── index.md
│   │
│   ├── rfcs/                             ← 📬 Request For Comments
│   │   ├── 0001-duel-system.md
│   │   ├── 0002-payment-gateway.md
│   │   └── index.md
│   │
│   ├── runbooks/                         ← 📋 راهنمای عملیات و پاسخ به رخدادها
│   │   ├── database-failure.md
│   │   ├── payment-failure.md
│   │   ├── performance-issue.md
│   │   └── security-incident.md
│   │
│   ├── performance/                      ← 📊 مستندات عملکرد
│   │   ├── benchmarks.md
│   │   ├── load-testing.md
│   │   └── optimization.md
│   │
│   ├── compliance/                       ← ⚖️ مستندات انطباق
│   │   ├── iso-27001.md
│   │   ├── gdpr.md
│   │   ├── pci-dss.md                    ← (برای پرداخت‌ها)
│   │   └── audit-logs.md
│   │
│   └── localization/                     ← 🌍 مستندات چندزبانه
│       ├── en/
│       ├── fa/
│       ├── tr/
│       └── ar/
│
├── apps/                                 ← 🚀 اپلیکیشن‌های نهایی
│   ├── dobna-web/
│   ├── dobna-mobile/
│   └── dobna-admin/
│
├── backend/                              ← 🖥️ Backend اصلی
│   └── ...
│
├── packages/                             ← 📦 Shared Packages
│   └── ...
│
├── supabase/                             ← 🗄️ Supabase (در ریشه)
│   └── ...
│
├── scripts/                              ← 📜 اسکریپت‌های عمومی پروژه
│   └── ...
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
