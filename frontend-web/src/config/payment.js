// config/payment.js
// تمام تنظیمات مربوط به درگاه پرداخت در یک فایل متمرکز شده است.
// برای تغییر Provider، فقط کافی است PAYMENT_PROVIDER را تغییر دهید.

export const PAYMENT_PROVIDER = '1xgate';

export const PAYMENT_CONFIG = {
    provider: PAYMENT_PROVIDER,
    qrSize: 240,
    refreshInterval: 10000,           // هر ۱۰ ثانیه وضعیت واریز چک شود
    confirmationCheckInterval: 30000,  // هر ۳۰ ثانیه تأیید برداشت
    defaultNetwork: 'TRC20',
    minConfirmations: 2,
    maxRetries: 3,
};