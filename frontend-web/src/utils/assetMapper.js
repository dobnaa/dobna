// frontend-web/src/utils/assetMapper.js

const CURRENCY_CONFIG = {
  // فیات
  USD: { folder: 'fiat/USD', levels: ['0.05', '0.25', '0.50', '1.00'] },
  EUR: { folder: 'fiat/EUR', levels: ['0.025', '0.10', '0.25', '0.50'] },
  IRT: { folder: 'fiat/lRR', levels: ['5000', '20000', '50000', '100000'] },
  TRY: { folder: 'fiat/TRY', levels: ['0.5', '2', '5', '10'] },
  GBP: { folder: 'fiat/GBP', levels: ['0.02', '0.10', '0.25', '0.50'] },
  AED: { folder: 'fiat/AED', levels: ['0.2', '1', '2', '3'] },
  CNY: { folder: 'fiat/CNY', levels: ['0.5', '2', '5', '10'] },
  INR: { folder: 'fiat/INR', levels: ['5', '20', '50', '100'] },
  CAD: { folder: 'fiat/CAD', levels: ['0.05', '0.25', '0.50', '1.00'] },
  CHF: { folder: 'fiat/CHF', levels: ['0.05', '0.10', '0.50', '1.00'] },
  AUD: { folder: 'fiat/AUD', levels: ['0.05', '0.25', '0.50', '1.00'] },
  // کریپتو
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
};

// نقشه‌ی آیکون‌های رمزارزها (برای نمایش در کنار موجودی و گروه)
export const getCryptoIcon = (currency) => `/assets/icons/crypto/${currency.toLowerCase()}.svg`;

// تابع اصلی: دریافت مسیر اسکناس بر اساس ارز و سطح
export const getNoteImage = (currency, level) => {
  const config = CURRENCY_CONFIG[currency];
  if (!config) return '/assets/images/notes/default.png';
  const levelIndex = Math.min(Math.max(level - 1, 0), 3); // level 1->0, level 4->3
  const fileName = config.levels[levelIndex];
  return `/assets/images/notes/${config.folder}/${fileName}.png`;
};

// دریافت پرچم برای گروه (بر اساس ارز یا کشور)
export const getFlagIcon = (currency) => {
  const flagMap = { USD: 'US', EUR: 'EU', IRT: 'IR', TRY: 'TR', GBP: 'GB', 
                    AED: 'AE', CNY: 'CN', INR: 'IN', CAD: 'CA', CHF: 'CH', AUD: 'AU' };
  return `/assets/icons/flags/${flagMap[currency] || 'default'}.svg`;
};