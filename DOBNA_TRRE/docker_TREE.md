dobna/                                    ← ریشه پروژه
│
├── .github/                              ← 🔄 مدیریت پروژه و اتوماسیون GitHub
│   └── ...
│
├── docker/                               ← 🐳 تنظیمات Docker و سرویس‌های جانبی
│   │
│   ├── nginx/                            ← تنظیمات Nginx (Proxy / Static)
│   │   ├── nginx.conf
│   │   ├── default.conf
│   │   └── ssl/
│   │       ├── cert.pem
│   │       └── key.pem
│   │
│   ├── postgres/                         ← تنظیمات PostgreSQL
│   │   ├── init.sql                      ← اسکریپت اولیه برای Supabase / Database
│   │   ├── migrations/                   ← (در صورت نیاز به Migration اضافی)
│   │   └── conf/
│   │       └── postgresql.conf
│   │
│   ├── redis/                            ← تنظیمات Redis (Queue / Cache)
│   │   └── redis.conf
│   │
│   ├── mysql/                            ← (اختیاری – برای آینده)
│   │   ├── init.sql
│   │   └── my.cnf
│   │
│   ├── mongodb/                          ← (اختیاری – برای آینده)
│   │   ├── init.js
│   │   └── mongod.conf
│   │
│   ├── scripts/                          ← اسکریپت‌های کمکی Docker
│   │   ├── wait-for-db.sh
│   │   ├── healthcheck.sh
│   │   ├── backup.sh
│   │   ├── restore.sh
│   │   └── entrypoint.sh
│   │
│   ├── env/                              ← فایل‌های محیطی برای هر محیط
│   │   ├── development.env
│   │   ├── staging.env
│   │   ├── production.env
│   │   └── testing.env
│   │
│   ├── compose/                          ← فایل‌های Compose تخصصی
│   │   ├── docker-compose.dev.yml        ← توسعه (با Hot Reload)
│   │   ├── docker-compose.test.yml       ← تست (با داده‌های جداگانه)
│   │   ├── docker-compose.prod.yml       ← تولید (با مقیاس‌پذیری)
│   │   └── docker-compose.monitoring.yml ← مانیتورینگ (Prometheus + Grafana)
│   │
│   ├── monitoring/                       ← تنظیمات مانیتورینگ
│   │   ├── prometheus.yml
│   │   ├── grafana/
│   │   │   ├── dashboards/
│   │   │   └── datasources/
│   │   └── loki/
│   │       └── loki-config.yml
│   │
│   ├── traefik/                          ← تنظیمات Traefik (Reverse Proxy)
│   │   ├── traefik.yml
│   │   └── dynamic.yml
│   │
│   ├── logs/                             ← (اختیاری) محل ذخیره لاگ‌های محلی
│   ├── volumes/                          ← (اختیاری) ساختار Volumeهای پایدار
│   └── README.md                         ← راهنمای اجرای سرویس‌ها با Docker
│
├── apps/                                 ← 🚀 اپلیکیشن‌های نهایی
│   ├── dobna-web/                        ← وب‌اپ (Next.js)
│   ├── dobna-mobile/                     ← اپ موبایل (React Native)
│   └── dobna-admin/                      ← پنل مدیریت (Next.js)
│
├── backend/                              ← 🖥️ Backend اصلی
│   ├── Dockerfile                        ← Dockerfile اختصاصی Backend
│   └── ...
│
├── packages/                             ← 📦 Shared Packages
│   └── ...
│
├── supabase/                             ← 🗄️ Supabase (در ریشه)
│   └── ...
│
├── docs/                                 ← 📄 مستندات
│   └── ...
│
├── scripts/                              ← 📜 اسکریپت‌های عمومی پروژه
│   └── ...
│
├── .env.example
├── .gitignore
├── .dockerignore                         ← 🔒 فایل‌های نادیده‌گرفته‌شده در Docker
├── Dockerfile                            ← 🐳 Dockerfile اصلی (برای Backend یا App)
├── Dockerfile.dev                        ← 🐳 Dockerfile برای توسعه (با Hot Reload)
├── Dockerfile.prod                       ← 🐳 Dockerfile برای تولید (بهینه‌شده)
├── docker-compose.yml                    ← 🐳 Compose اصلی (ترکیب همه سرویس‌ها)
├── docker-compose.override.yml           ← 🐳 Override برای محیط توسعه
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md