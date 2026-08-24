dobna/                                    ← ریشه پروژه
│
├── .github/                              ← 🔄 مدیریت پروژه و اتوماسیون GitHub
│   └── ...
│
├── docker/                               ← 🐳 تنظیمات Docker و سرویس‌های جانبی
│   └── ...
│
├── docs/                                 ← 📄 مستندات جامع پروژه
│   └── ...
│
├── supabase/                             ← 🗄️ زیرساخت Supabase (در ریشه)
│   │
│   ├── config.toml                       ← تنظیمات Supabase CLI
│   ├── seed.sql                          ← داده‌های اولیه (Seed)
│   ├── .gitignore                        ← نادیده‌گرفته‌های Supabase
│   │
│   ├── migrations/                       ← ✅ Migrationهای دیتابیس
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
│   │
│   ├── functions/                        ← ✅ Edge Functions (Deno/TypeScript)
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
│   │
│   ├── sql/                              ← ✅ PostgreSQL Functions, Triggers, Views, Policies, Indexes
│   │   ├── functions/                    ← توابع PostgreSQL
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
│   │   │
│   │   ├── triggers/                     ← Triggerهای دیتابیس
│   │   │   ├── trg_update_timestamp.sql
│   │   │   ├── trg_balance_update.sql
│   │   │   ├── trg_audit_log.sql
│   │   │   └── ...
│   │   │
│   │   ├── views/                        ← Viewهای دیتابیس
│   │   │   ├── vw_leaderboard.sql
│   │   │   ├── vw_user_stats.sql
│   │   │   ├── vw_community_rank.sql
│   │   │   ├── vw_transaction_summary.sql
│   │   │   └── ...
│   │   │
│   │   ├── policies/                     ← RLS Policies
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
│   │   │
│   │   ├── indexes/                      ← Indexهای بهینه‌سازی
│   │   │   ├── profiles.sql
│   │   │   ├── rooms.sql
│   │   │   ├── wallets.sql
│   │   │   ├── transactions.sql
│   │   │   └── ...
│   │   │
│   │   ├── types/                        ← انواع سفارشی PostgreSQL
│   │   │   ├── enums.sql                 ← Enumها (GameStatus, DuelStatus, ChallengeStatus, ...)
│   │   │   ├── domains.sql               ← Domainهای سفارشی
│   │   │   └── composite_types.sql       ← انواع ترکیبی
│   │   │
│   │   ├── extensions/                   ← Extensionهای PostgreSQL
│   │   │   ├── pgcrypto.sql
│   │   │   ├── pg_cron.sql
│   │   │   ├── pgjwt.sql
│   │   │   ├── pg_net.sql
│   │   │   └── ...
│   │   │
│   │   └── helpers/                      ← کمکی‌های SQL
│   │       ├── constants.sql
│   │       ├── utilities.sql
│   │       └── permissions.sql
│   │
│   ├── tests/                            ← 🧪 تست‌های دیتابیس
│   │   ├── pgTAP/                        ← تست‌های با pgTAP
│   │   │   ├── test_functions.sql
│   │   │   ├── test_triggers.sql
│   │   │   └── test_policies.sql
│   │   ├── integration/                  ← تست‌های یکپارچه‌سازی
│   │   │   ├── auth.test.sql
│   │   │   ├── wallet.test.sql
│   │   │   └── game.test.sql
│   │   └── fixtures/                     ← داده‌های ثابت برای تست
│   │       └── data.sql
│   │
│   ├── types/                            ← 📝 تایپ‌های TypeScript تولیدشده
│   │   └── database.types.ts             ← خروجی `supabase gen types --lang=typescript`
│   │
│   ├── scripts/                          ← 📜 اسکریپت‌های Supabase
│   │   ├── reset.sh                      ← بازنشانی دیتابیس
│   │   ├── generate-types.sh             ← تولید تایپ‌های TypeScript
│   │   ├── backup.sh                     ← پشتیبان‌گیری
│   │   └── restore.sh                    ← بازیابی
│   │
│   └── README.md                         ← راهنمای Supabase
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