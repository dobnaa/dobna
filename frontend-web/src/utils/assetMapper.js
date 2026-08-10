// utils/assetMapper.js

// ======================================================
// نکته‌ی مهم درباره‌ی هماهنگی با config/levels.js
// ======================================================
// این فایل شامل یک نگاشت جدا (CURRENCY_CONFIG.levels) برای نام دقیق فایل
// تصویر اسکناس هر سطح است (رشته‌های ثابت مثل '0.0000005' یا '1.00' که باید
// دقیقاً با نام فایل روی دیسک یکی باشند).
//
// در config/levels.js هم مقادیر سطوح (به‌صورت عدد، برای محاسبات مالی/کارمزد)
// نگه‌داری می‌شود. این دو، به‌عمد، در دو فایل جدا مانده‌اند زیرا ادغام مستقیم
// آن‌ها خطرناک است: تبدیل عدد به رشته (مثلاً با toFixed) تعداد اعشار متفاوتی
// از نام فایل واقعی تولید می‌کند (مثال: BTC سطح ۴ برابر عدد 0.00001 است، ولی
// toFixed(8) رشته‌ی '0.00001000' می‌سازد که با نام فایل '0.00001.webp' یکی نیست).
//
// بنابراین: مقادیر عددی این دو فایل باید همیشه دستی هم‌گام نگه داشته شوند.
// اگر یک سطح در config/levels.js تغییر کرد، همان سطح باید اینجا هم به‌روزرسانی شود.

const CURRENCY_CONFIG = {
  // ===== فیات (Fiat) =====
  USD: { folder: 'fiat/USD', levels: ['0.05', '0.25', '0.50', '1.00'] },
  EUR: { folder: 'fiat/EUR', levels: ['0.025', '0.10', '0.25', '0.50'] },
  IRT: { folder: 'fiat/IRT', levels: ['5000', '20000', '50000', '100000'] },
  TRY: { folder: 'fiat/TRY', levels: ['0.5', '2', '5', '10'] },
  GBP: { folder: 'fiat/GBP', levels: ['0.02', '0.10', '0.25', '0.50'] },
  AED: { folder: 'fiat/AED', levels: ['0.2', '1', '2', '3'] },
  CNY: { folder: 'fiat/CNY', levels: ['0.5', '2', '5', '10'] },
  INR: { folder: 'fiat/INR', levels: ['5', '20', '50', '100'] },
  CAD: { folder: 'fiat/CAD', levels: ['0.05', '0.25', '0.50', '1.00'] },
  CHF: { folder: 'fiat/CHF', levels: ['0.05', '0.10', '0.50', '1.00'] },
  AUD: { folder: 'fiat/AUD', levels: ['0.05', '0.25', '0.50', '1.00'] },

  // ===== کریپتو (Crypto) =====
  BTC: { folder: 'crypto/BTC', levels: ['0.0000005', '0.000002', '0.000005', '0.00001'] },
  ETH: { folder: 'crypto/ETH', levels: ['0.00001', '0.00005', '0.0001', '0.0002'] },
  SOL: { folder: 'crypto/SOL', levels: ['0.001', '0.005', '0.01', '0.02'] },
  USDT: { folder: 'crypto/USDT', levels: ['0.05', '0.25', '0.50', '1.00'] },
  BNB: { folder: 'crypto/BNB', levels: ['0.00004', '0.00016', '0.0004', '0.0008'] },
  DOGE: { folder: 'crypto/DOGE', levels: ['0.25', '1.00', '2.50', '5.00'] },
  TON: { folder: 'crypto/TON', levels: ['0.015', '0.060', '0.150', '0.30'] },
  BONK: { folder: 'crypto/BONK', levels: ['5', '20', '50', '100'] },
  PEPE: { folder: 'crypto/PEPE', levels: ['1000', '4000', '10000', '20000'] },
  HMSTR: { folder: 'crypto/HMSTR', levels: ['200', '800', '2000', '4000'] },

  // ===== واحدهای داخلی دوبنا =====
  DUS: { folder: 'dus/DUS', levels: ['0.05', '0.25', '0.50', '1.00'] },
  STARS: { folder: 'crypto/STARS', levels: ['5', '25', '50', '100'] },
};

// ======================================================
// ایموجی پرچم‌ها (برای ارزهای فیات)
// ======================================================
const FLAG_EMOJI = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  IRT: '🇮🇷',
  TRY: '🇹🇷',
  GBP: '🇬🇧',
  AED: '🇦🇪',
  CNY: '🇨🇳',
  INR: '🇮🇳',
  CAD: '🇨🇦',
  CHF: '🇨🇭',
  AUD: '🇦🇺',
};

// ======================================================
// آیکون SVG رمزارز (برای نمایش در کنار موجودی و گروه)
// ======================================================
export const getCryptoIcon = (currency) => {
  // ✅ Stars آیکون مخصوص دارد
  if (currency === 'STARS') {
    return '/assets/icons/crypto/stars.svg';
  }
  return `/assets/icons/crypto/${currency.toLowerCase()}.svg`;
};

// ======================================================
// مسیر تصویر اسکناس بر اساس ارز و سطح (۱ تا ۴)
// ======================================================
export const getNoteImage = (currency, level) => {
  const config = CURRENCY_CONFIG[currency];
  if (!config) return '/assets/images/notes/default.webp';

  const numericLevel = Number(level) || 1;
  const levelIndex = Math.min(Math.max(numericLevel - 1, 0), 3); // 1->0 ... 4->3
  const fileName = config.levels[levelIndex];

  return `/assets/images/notes/${config.folder}/${fileName}.webp`;
};

// ======================================================
// ایموجی پرچم بر اساس ارز (جایگزین فایل‌های SVG پرچم)
// ======================================================
export const getFlagEmoji = (currency) => FLAG_EMOJI[currency] || '🏳️';

// ======================================================
// لیست همه‌ی ارزهای پشتیبانی‌شده که تصویر اسکناس (folder+levels) برایشان تعریف شده
// ======================================================
export const getSupportedCurrencies = () => Object.keys(CURRENCY_CONFIG);