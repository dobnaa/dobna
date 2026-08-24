backend/
│
├── src/
│   │
│   ├── main.ts                                 ← نقطه‌ی ورود
│   ├── app.ts                                  ← تنظیمات اصلی Express/Fastify
│   ├── server.ts                               ← راه‌اندازی سرور
│   │
│   ├── config/                                 ← ⚙️ تنظیمات
│   │   ├── env.ts
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── queue.ts
│   │   ├── storage.ts
│   │   └── index.ts
│   │
│   ├── api/                                    ← 📍 لایه‌ی API
│   │   ├── routes/                             ← مسیرها
│   │   │   ├── auth.routes.ts
│   │   │   ├── wallet.routes.ts
│   │   │   ├── payment.routes.ts
│   │   │   ├── transaction.routes.ts
│   │   │   ├── deposit.routes.ts
│   │   │   ├── withdraw.routes.ts
│   │   │   ├── transfer.routes.ts
│   │   │   ├── swap.routes.ts
│   │   │   ├── duel.routes.ts
│   │   │   ├── challenge.routes.ts
│   │   │   ├── game.routes.ts
│   │   │   ├── community.routes.ts
│   │   │   ├── chat.routes.ts
│   │   │   ├── notification.routes.ts
│   │   │   └── admin.routes.ts
│   │   ├── controllers/                        ← کنترلرها
│   │   │   ├── auth.controller.ts
│   │   │   ├── wallet.controller.ts
│   │   │   ├── payment.controller.ts
│   │   │   ├── deposit.controller.ts
│   │   │   ├── withdraw.controller.ts
│   │   │   ├── transfer.controller.ts
│   │   │   ├── swap.controller.ts
│   │   │   ├── duel.controller.ts
│   │   │   ├── challenge.controller.ts
│   │   │   ├── game.controller.ts
│   │   │   ├── community.controller.ts
│   │   │   ├── chat.controller.ts
│   │   │   └── admin.controller.ts
│   │   └── middleware/                          ← میان‌افزارها
│   │       ├── auth.middleware.ts
│   │       ├── role.middleware.ts
│   │       ├── rateLimit.middleware.ts
│   │       ├── validation.middleware.ts
│   │       ├── logging.middleware.ts
│   │       └── error.middleware.ts
│   │
│   ├── modules/                                ← 🧩 لایه‌ی منطق کسب‌وکار (Business Logic)
│   │   ├── auth/                               ← احراز هویت
│   │   │   ├── auth.service.ts
│   │   │   ├── session.service.ts
│   │   │   ├── otp.service.ts
│   │   │   ├── oauth.service.ts
│   │   │   └── index.ts
│   │   ├── users/                              ← مدیریت کاربران
│   │   │   ├── user.service.ts
│   │   │   ├── user.mapper.ts
│   │   │   └── index.ts
│   │   ├── wallet/                             ← کیف پول
│   │   │   ├── wallet.service.ts
│   │   │   ├── balance.service.ts
│   │   │   ├── asset.service.ts
│   │   │   └── index.ts
│   │   ├── deposit/                            ← واریز
│   │   │   ├── deposit.service.ts
│   │   │   ├── deposit.processor.ts
│   │   │   └── index.ts
│   │   ├── withdraw/                           ← برداشت
│   │   │   ├── withdraw.service.ts
│   │   │   ├── withdraw.processor.ts
│   │   │   └── index.ts
│   │   ├── transfer/                           ← انتقال
│   │   │   ├── transfer.service.ts
│   │   │   └── index.ts
│   │   ├── swap/                               ← تبدیل ارز
│   │   │   ├── swap.service.ts
│   │   │   ├── rate.service.ts
│   │   │   └── index.ts
│   │   ├── payment/                            ← پرداخت (درگاه‌ها)
│   │   │   ├── payment.service.ts
│   │   │   ├── gateway.service.ts
│   │   │   ├── webhook.service.ts
│   │   │   └── gateways/
│   │   │       ├── onexgate/
│   │   │       │   ├── client.ts
│   │   │       │   ├── webhook.ts
│   │   │       │   ├── mapper.ts
│   │   │       │   └── validator.ts
│   │   │       ├── stripe/                    (برای آینده)
│   │   │       ├── nowpayments/               (برای آینده)
│   │   │       └── index.ts
│   │   ├── transaction/                        ← تراکنش‌ها
│   │   │   ├── transaction.service.ts
│   │   │   ├── ledger.service.ts
│   │   │   └── index.ts
│   │   ├── game/                               ← منطق بازی (سمت سرور)
│   │   │   ├── bingo.service.ts
│   │   │   ├── card.service.ts
│   │   │   ├── winner.service.ts
│   │   │   └── index.ts
│   │   ├── duel/                               ← دوئل‌ها
│   │   │   ├── duel.service.ts
│   │   │   ├── duel.matchmaker.ts
│   │   │   ├── duel.validator.ts
│   │   │   └── index.ts
│   │   ├── challenge/                          ← چالش‌ها
│   │   │   ├── challenge.service.ts
│   │   │   ├── reward.service.ts
│   │   │   ├── level.service.ts
│   │   │   └── index.ts
│   │   ├── community/                          ← انجمن‌ها
│   │   │   ├── community.service.ts
│   │   │   ├── ranking.service.ts
│   │   │   ├── member.service.ts
│   │   │   └── index.ts
│   │   ├── chat/                               ← چت
│   │   │   ├── chat.service.ts
│   │   │   ├── message.service.ts
│   │   │   ├── room.service.ts
│   │   │   └── index.ts
│   │   ├── notification/                       ← اعلان‌ها
│   │   │   ├── notification.service.ts
│   │   │   ├── push.service.ts
│   │   │   ├── email.service.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── repositories/                           ← 🗄️ لایه‌ی دسترسی به داده
│   │   ├── user.repository.ts
│   │   ├── wallet.repository.ts
│   │   ├── asset.repository.ts
│   │   ├── balance.repository.ts
│   │   ├── transaction.repository.ts
│   │   ├── deposit.repository.ts
│   │   ├── withdraw.repository.ts
│   │   ├── payment.repository.ts
│   │   ├── swap.repository.ts
│   │   ├── duel.repository.ts
│   │   ├── challenge.repository.ts
│   │   ├── game.repository.ts
│   │   ├── community.repository.ts
│   │   ├── chat.repository.ts
│   │   ├── notification.repository.ts
│   │   └── index.ts
│   │
│   ├── dto/                                    ← 📦 Data Transfer Objects
│   │   ├── auth/
│   │   │   ├── Login.dto.ts
│   │   │   ├── Register.dto.ts
│   │   │   ├── OTP.dto.ts
│   │   │   └── RefreshToken.dto.ts
│   │   ├── user/
│   │   │   ├── CreateUser.dto.ts
│   │   │   ├── UpdateProfile.dto.ts
│   │   │   └── UserResponse.dto.ts
│   │   ├── wallet/
│   │   │   ├── Deposit.dto.ts
│   │   │   ├── Withdraw.dto.ts
│   │   │   ├── Transfer.dto.ts
│   │   │   ├── Swap.dto.ts
│   │   │   └── BalanceResponse.dto.ts
│   │   ├── payment/
│   │   │   ├── CreatePayment.dto.ts
│   │   │   ├── GatewayWebhook.dto.ts
│   │   │   └── PaymentResponse.dto.ts
│   │   ├── duel/
│   │   │   ├── CreateDuel.dto.ts
│   │   │   ├── JoinDuel.dto.ts
│   │   │   └── DuelResponse.dto.ts
│   │   ├── challenge/
│   │   │   ├── CreateChallenge.dto.ts
│   │   │   ├── JoinChallenge.dto.ts
│   │   │   └── ChallengeResponse.dto.ts
│   │   ├── game/
│   │   │   ├── StartGame.dto.ts
│   │   │   └── GameResponse.dto.ts
│   │   ├── community/
│   │   │   ├── CreateCommunity.dto.ts
│   │   │   └── CommunityResponse.dto.ts
│   │   └── index.ts
│   │
│   ├── events/                                 ← 📡 رویدادها (Event-Driven Architecture)
│   │   ├── bus.ts                              ← Event Bus
│   │   ├── handlers/                           ← پردازشگرهای رویداد
│   │   │   ├── auth/
│   │   │   │   ├── UserRegistered.handler.ts
│   │   │   │   └── LoginSuccess.handler.ts
│   │   │   ├── wallet/
│   │   │   │   ├── DepositCreated.handler.ts
│   │   │   │   ├── BalanceUpdated.handler.ts
│   │   │   │   └── WithdrawCompleted.handler.ts
│   │   │   ├── payment/
│   │   │   │   ├── PaymentCreated.handler.ts
│   │   │   │   ├── PaymentCompleted.handler.ts
│   │   │   │   └── PaymentFailed.handler.ts
│   │   │   ├── game/
│   │   │   │   ├── GameStarted.handler.ts
│   │   │   │   └── WinnerDeclared.handler.ts
│   │   │   ├── duel/
│   │   │   │   ├── DuelCreated.handler.ts
│   │   │   │   └── DuelFinished.handler.ts
│   │   │   ├── challenge/
│   │   │   │   └── ChallengeCompleted.handler.ts
│   │   │   └── index.ts
│   │   └── events/                             ← تعریف رویدادها
│   │       ├── auth.events.ts
│   │       ├── wallet.events.ts
│   │       ├── payment.events.ts
│   │       ├── game.events.ts
│   │       ├── duel.events.ts
│   │       ├── challenge.events.ts
│   │       └── index.ts
│   │
│   ├── providers/                              ← 🔌 سرویس‌های خارجی (Dependency Injection)
│   │   ├── database.provider.ts
│   │   ├── redis.provider.ts
│   │   ├── queue.provider.ts
│   │   ├── storage.provider.ts
│   │   ├── payment/
│   │   │   ├── onexgate.provider.ts
│   │   │   └── payment.provider.ts
│   │   ├── notification/
│   │   │   ├── firebase.provider.ts
│   │   │   └── onesignal.provider.ts
│   │   ├── blockchain/
│   │   │   ├── bitcoin.provider.ts
│   │   │   ├── ethereum.provider.ts
│   │   │   └── ton.provider.ts
│   │   ├── email.provider.ts
│   │   ├── sms.provider.ts
│   │   └── index.ts
│   │
│   ├── database/                               ← 🗄️ اتصال به دیتابیس
│   │   ├── client.ts                           ← Supabase / Prisma Client
│   │   ├── connection.ts
│   │   └── index.ts
│   │
│   ├── jobs/                                   ← ⏰ تسک‌های زمان‌بندی‌شده
│   │   ├── cron/
│   │   │   ├── interest.job.ts                 ← محاسبه سود روزانه
│   │   │   ├── cleanup.job.ts                  ← پاک‌سازی داده‌های قدیمی
│   │   │   ├── notification.job.ts             ← ارسال اعلان‌های زمان‌بندی‌شده
│   │   │   ├── duel.expiry.job.ts              ← انقضای دوئل‌ها
│   │   │   ├── challenge.expiry.job.ts         ← انقضای چالش‌ها
│   │   │   └── index.ts
│   │   └── queues/
│   │       ├── payment.queue.ts                ← پردازش پرداخت‌ها
│   │       ├── withdraw.queue.ts               ← پردازش برداشت‌ها
│   │       ├── game.queue.ts                   ← پردازش بازی‌ها
│   │       ├── notification.queue.ts           ← صف اعلان‌ها
│   │       └── index.ts
│   │
│   ├── websocket/                              ← 🔌 WebSocket Server
│   │   ├── socket.server.ts
│   │   ├── duel.socket.ts                      ← رویدادهای دوئل
│   │   ├── game.socket.ts                      ← رویدادهای بازی
│   │   ├── chat.socket.ts                      ← رویدادهای چت
│   │   ├── notification.socket.ts              ← رویدادهای اعلان
│   │   └── index.ts
│   │
│   ├── security/                               ← 🔒 امنیت
│   │   ├── encryption.ts
│   │   ├── hashing.ts
│   │   ├── signature.ts
│   │   ├── jwt.ts
│   │   ├── permissions.ts
│   │   ├── rateLimiter.ts
│   │   └── index.ts
│   │
│   ├── telemetry/                              ← 📊 مشاهده‌پذیری
│   │   ├── metrics.ts
│   │   ├── tracing.ts
│   │   ├── monitoring.ts
│   │   ├── audit.ts                            ← ثبت رویدادهای حسابرسی
│   │   └── index.ts
│   │
│   ├── errors/                                 ← ❌ مدیریت خطاها
│   │   ├── AppError.ts
│   │   ├── ErrorCodes.ts
│   │   ├── handler.ts
│   │   └── index.ts
│   │
│   └── utils/                                  ← 🛠️ ابزارهای عمومی
│       ├── logger.ts
│       ├── response.ts
│       ├── pagination.ts
│       ├── validator.ts
│       ├── formatter.ts
│       └── index.ts
│
├── tests/                                      ← 🧪 تست‌ها
│   ├── unit/
│   │   ├── auth.test.ts
│   │   ├── wallet.test.ts
│   │   └── payment.test.ts
│   ├── integration/
│   │   ├── duel.test.ts
│   │   └── challenge.test.ts
│   └── e2e/
│       └── game.test.ts
│
├── scripts/                                    ← 📜 اسکریپت‌ها
│   ├── migrate.ts
│   ├── seed.ts
│   ├── backup.ts
│   └── healthcheck.ts
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
└── README.md