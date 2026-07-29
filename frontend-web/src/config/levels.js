// config/levels.js

// ======================================================
// ۱. تعریف سطوح برای تالار گروه (Game Rooms)
// ======================================================
export const GAME_LEVELS = {
  // بیت‌کوین (BTC)
  BTC: {
    1: { amount: 0.0000005, label: '0.0000005 BTC' },
    2: { amount: 0.000002, label: '0.000002 BTC' },
    3: { amount: 0.000005, label: '0.000005 BTC' },
    4: { amount: 0.00001, label: '0.00001 BTC' },
  },
  // اتریوم (ETH)
  ETH: {
    1: { amount: 0.00001, label: '0.00001 ETH' },
    2: { amount: 0.00005, label: '0.00005 ETH' },
    3: { amount: 0.0001, label: '0.0001 ETH' },
    4: { amount: 0.0002, label: '0.0002 ETH' },
  },
  // تتر (USDT)
  USDT: {
    1: { amount: 0.05, label: '0.05 USDT' },
    2: { amount: 0.25, label: '0.25 USDT' },
    3: { amount: 0.50, label: '0.50 USDT' },
    4: { amount: 1.00, label: '1.00 USDT' },
  },
  // سولانا (SOL)
  SOL: {
    1: { amount: 0.001, label: '0.001 SOL' },
    2: { amount: 0.005, label: '0.005 SOL' },
    3: { amount: 0.01, label: '0.01 SOL' },
    4: { amount: 0.02, label: '0.02 SOL' },
  },
  // بایننس کوین (BNB)
  BNB: {
    1: { amount: 0.00004, label: '0.00004 BNB' },
    2: { amount: 0.00016, label: '0.00016 BNB' },
    3: { amount: 0.0004, label: '0.0004 BNB' },
    4: { amount: 0.0008, label: '0.0008 BNB' },
  },
  // دوج‌کوین (DOGE)
  DOGE: {
    1: { amount: 0.25, label: '0.25 DOGE' },
    2: { amount: 1.00, label: '1.00 DOGE' },
    3: { amount: 2.50, label: '2.50 DOGE' },
    4: { amount: 5.00, label: '5.00 DOGE' },
  },
  // تون‌کوین (TON)
  TON: {
    1: { amount: 0.015, label: '0.015 TON' },
    2: { amount: 0.060, label: '0.060 TON' },
    3: { amount: 0.150, label: '0.150 TON' },
    4: { amount: 0.30, label: '0.30 TON' },
  },
  // بونک (BONK)
  BONK: {
    1: { amount: 5, label: '5 BONK' },
    2: { amount: 20, label: '20 BONK' },
    3: { amount: 50, label: '50 BONK' },
    4: { amount: 100, label: '100 BONK' },
  },
  // پپه (PEPE)
  PEPE: {
    1: { amount: 1000, label: '1000 PEPE' },
    2: { amount: 4000, label: '4000 PEPE' },
    3: { amount: 10000, label: '10000 PEPE' },
    4: { amount: 20000, label: '20000 PEPE' },
  },
  // همستر (HMSTR)
  HMSTR: {
    1: { amount: 200, label: '200 HMSTR' },
    2: { amount: 800, label: '800 HMSTR' },
    3: { amount: 2000, label: '2000 HMSTR' },
    4: { amount: 4000, label: '4000 HMSTR' },
  },
  // دلار آمریکا (USD)
  USD: {
    1: { amount: 0.05, label: '$0.05 USD' },
    2: { amount: 0.25, label: '$0.25 USD' },
    3: { amount: 0.50, label: '$0.50 USD' },
    4: { amount: 1.00, label: '$1.00 USD' },
  },
  // تومان ایران (IRT)
  IRT: {
    1: { amount: 5000, label: '۵,۰۰۰ IRT' },
    2: { amount: 20000, label: '۲۰,۰۰۰ IRT' },
    3: { amount: 50000, label: '۵۰,۰۰۰ IRT' },
    4: { amount: 100000, label: '۱۰۰,۰۰۰ IRT' },
  },
  // یورو (EUR)
  EUR: {
    1: { amount: 0.025, label: '€0.025 EUR' },
    2: { amount: 0.10, label: '€0.10 EUR' },
    3: { amount: 0.25, label: '€0.25 EUR' },
    4: { amount: 0.50, label: '€0.50 EUR' },
  },
  // لیر ترکیه (TRY)
  TRY: {
    1: { amount: 0.5, label: '₺0.5 TRY' },
    2: { amount: 2, label: '₺2 TRY' },
    3: { amount: 5, label: '₺5 TRY' },
    4: { amount: 10, label: '₺10 TRY' },
  },
  // پوند (GBP)
  GBP: {
    1: { amount: 0.02, label: '£0.02 GBP' },
    2: { amount: 0.10, label: '£0.10 GBP' },
    3: { amount: 0.25, label: '£0.25 GBP' },
    4: { amount: 0.50, label: '£0.50 GBP' },
  },
  // درهم (AED)
  AED: {
    1: { amount: 0.2, label: 'د.إ0.2 AED' },
    2: { amount: 1, label: 'د.إ1 AED' },
    3: { amount: 2, label: 'د.إ2 AED' },
    4: { amount: 3, label: 'د.إ3 AED' },
  },
  // یوان (CNY)
  CNY: {
    1: { amount: 0.5, label: '¥0.5 CNY' },
    2: { amount: 2, label: '¥2 CNY' },
    3: { amount: 5, label: '¥5 CNY' },
    4: { amount: 10, label: '¥10 CNY' },
  },
  // روپیه (INR)
  INR: {
    1: { amount: 5, label: '₹5 INR' },
    2: { amount: 20, label: '₹20 INR' },
    3: { amount: 50, label: '₹50 INR' },
    4: { amount: 100, label: '₹100 INR' },
  },
  // دلار کانادا (CAD)
  CAD: {
    1: { amount: 0.05, label: 'C$0.05 CAD' },
    2: { amount: 0.25, label: 'C$0.25 CAD' },
    3: { amount: 0.50, label: 'C$0.50 CAD' },
    4: { amount: 1.00, label: 'C$1.00 CAD' },
  },
  // فرانک سوئیس (CHF)
  CHF: {
    1: { amount: 0.05, label: 'Fr.0.05 CHF' },
    2: { amount: 0.10, label: 'Fr.0.10 CHF' },
    3: { amount: 0.50, label: 'Fr.0.50 CHF' },
    4: { amount: 1.00, label: 'Fr.1.00 CHF' },
  },
  // دلار استرالیا (AUD)
  AUD: {
    1: { amount: 0.05, label: 'A$0.05 AUD' },
    2: { amount: 0.25, label: 'A$0.25 AUD' },
    3: { amount: 0.50, label: 'A$0.50 AUD' },
    4: { amount: 1.00, label: 'A$1.00 AUD' },
  },
};

// ======================================================
// ۲. تعریف سطوح برای دوئل (Duel)
// ======================================================
export const DUEL_LEVELS = {
  // بیت‌کوین (BTC)
  BTC: {
    1: { amount: 0.0000005, label: '0.0000005 BTC' },
    2: { amount: 0.000002, label: '0.000002 BTC' },
    3: { amount: 0.000005, label: '0.000005 BTC' },
    4: { amount: 0.00001, label: '0.00001 BTC' },
  },
  // اتریوم (ETH)
  ETH: {
    1: { amount: 0.00001, label: '0.00001 ETH' },
    2: { amount: 0.00005, label: '0.00005 ETH' },
    3: { amount: 0.0001, label: '0.0001 ETH' },
    4: { amount: 0.0002, label: '0.0002 ETH' },
  },
  // تتر (USDT)
  USDT: {
    1: { amount: 0.05, label: '0.05 USDT' },
    2: { amount: 0.25, label: '0.25 USDT' },
    3: { amount: 0.50, label: '0.50 USDT' },
    4: { amount: 1.00, label: '1.00 USDT' },
  },
  // سولانا (SOL)
  SOL: {
    1: { amount: 0.001, label: '0.001 SOL' },
    2: { amount: 0.005, label: '0.005 SOL' },
    3: { amount: 0.01, label: '0.01 SOL' },
    4: { amount: 0.02, label: '0.02 SOL' },
  },
  // بایننس کوین (BNB)
  BNB: {
    1: { amount: 0.00004, label: '0.00004 BNB' },
    2: { amount: 0.00016, label: '0.00016 BNB' },
    3: { amount: 0.0004, label: '0.0004 BNB' },
    4: { amount: 0.0008, label: '0.0008 BNB' },
  },
  // دوج‌کوین (DOGE)
  DOGE: {
    1: { amount: 0.25, label: '0.25 DOGE' },
    2: { amount: 1.00, label: '1.00 DOGE' },
    3: { amount: 2.50, label: '2.50 DOGE' },
    4: { amount: 5.00, label: '5.00 DOGE' },
  },
  // تون‌کوین (TON)
  TON: {
    1: { amount: 0.015, label: '0.015 TON' },
    2: { amount: 0.060, label: '0.060 TON' },
    3: { amount: 0.150, label: '0.150 TON' },
    4: { amount: 0.30, label: '0.30 TON' },
  },
  // بونک (BONK)
  BONK: {
    1: { amount: 5, label: '5 BONK' },
    2: { amount: 20, label: '20 BONK' },
    3: { amount: 50, label: '50 BONK' },
    4: { amount: 100, label: '100 BONK' },
  },
  // پپه (PEPE)
  PEPE: {
    1: { amount: 1000, label: '1000 PEPE' },
    2: { amount: 4000, label: '4000 PEPE' },
    3: { amount: 10000, label: '10000 PEPE' },
    4: { amount: 20000, label: '20000 PEPE' },
  },
  // همستر (HMSTR)
  HMSTR: {
    1: { amount: 200, label: '200 HMSTR' },
    2: { amount: 800, label: '800 HMSTR' },
    3: { amount: 2000, label: '2000 HMSTR' },
    4: { amount: 4000, label: '4000 HMSTR' },
  },
  // دلار آمریکا (USD)
  USD: {
    1: { amount: 0.05, label: '$0.05 USD' },
    2: { amount: 0.25, label: '$0.25 USD' },
    3: { amount: 0.50, label: '$0.50 USD' },
    4: { amount: 1.00, label: '$1.00 USD' },
  },
  // تومان ایران (IRT)
  IRT: {
    1: { amount: 5000, label: '۵,۰۰۰ IRT' },
    2: { amount: 20000, label: '۲۰,۰۰۰ IRT' },
    3: { amount: 50000, label: '۵۰,۰۰۰ IRT' },
    4: { amount: 100000, label: '۱۰۰,۰۰۰ IRT' },
  },
  // یورو (EUR)
  EUR: {
    1: { amount: 0.025, label: '€0.025 EUR' },
    2: { amount: 0.10, label: '€0.10 EUR' },
    3: { amount: 0.25, label: '€0.25 EUR' },
    4: { amount: 0.50, label: '€0.50 EUR' },
  },
  // لیر ترکیه (TRY)
  TRY: {
    1: { amount: 0.5, label: '₺0.5 TRY' },
    2: { amount: 2, label: '₺2 TRY' },
    3: { amount: 5, label: '₺5 TRY' },
    4: { amount: 10, label: '₺10 TRY' },
  },
  // پوند (GBP)
  GBP: {
    1: { amount: 0.02, label: '£0.02 GBP' },
    2: { amount: 0.10, label: '£0.10 GBP' },
    3: { amount: 0.25, label: '£0.25 GBP' },
    4: { amount: 0.50, label: '£0.50 GBP' },
  },
  // درهم (AED)
  AED: {
    1: { amount: 0.2, label: 'د.إ0.2 AED' },
    2: { amount: 1, label: 'د.إ1 AED' },
    3: { amount: 2, label: 'د.إ2 AED' },
    4: { amount: 3, label: 'د.إ3 AED' },
  },
  // یوان (CNY)
  CNY: {
    1: { amount: 0.5, label: '¥0.5 CNY' },
    2: { amount: 2, label: '¥2 CNY' },
    3: { amount: 5, label: '¥5 CNY' },
    4: { amount: 10, label: '¥10 CNY' },
  },
  // روپیه (INR)
  INR: {
    1: { amount: 5, label: '₹5 INR' },
    2: { amount: 20, label: '₹20 INR' },
    3: { amount: 50, label: '₹50 INR' },
    4: { amount: 100, label: '₹100 INR' },
  },
  // دلار کانادا (CAD)
  CAD: {
    1: { amount: 0.05, label: 'C$0.05 CAD' },
    2: { amount: 0.25, label: 'C$0.25 CAD' },
    3: { amount: 0.50, label: 'C$0.50 CAD' },
    4: { amount: 1.00, label: 'C$1.00 CAD' },
  },
  // فرانک سوئیس (CHF)
  CHF: {
    1: { amount: 0.05, label: 'Fr.0.05 CHF' },
    2: { amount: 0.10, label: 'Fr.0.10 CHF' },
    3: { amount: 0.50, label: 'Fr.0.50 CHF' },
    4: { amount: 1.00, label: 'Fr.1.00 CHF' },
  },
  // دلار استرالیا (AUD)
  AUD: {
    1: { amount: 0.05, label: 'A$0.05 AUD' },
    2: { amount: 0.25, label: 'A$0.25 AUD' },
    3: { amount: 0.50, label: 'A$0.50 AUD' },
    4: { amount: 1.00, label: 'A$1.00 AUD' },
  },
};

// ======================================================
// ۳. تعریف سطوح برای چالش (Challenge)
// ======================================================
export const CHALLENGE_LEVELS = {
  // بیت‌کوین (BTC)
  BTC: {
    1: { amount: 0.0000005, label: '0.0000005 BTC' },
    2: { amount: 0.000002, label: '0.000002 BTC' },
    3: { amount: 0.000005, label: '0.000005 BTC' },
    4: { amount: 0.00001, label: '0.00001 BTC' },
  },
  // اتریوم (ETH)
  ETH: {
    1: { amount: 0.00001, label: '0.00001 ETH' },
    2: { amount: 0.00005, label: '0.00005 ETH' },
    3: { amount: 0.0001, label: '0.0001 ETH' },
    4: { amount: 0.0002, label: '0.0002 ETH' },
  },
  // تتر (USDT)
  USDT: {
    1: { amount: 0.05, label: '0.05 USDT' },
    2: { amount: 0.25, label: '0.25 USDT' },
    3: { amount: 0.50, label: '0.50 USDT' },
    4: { amount: 1.00, label: '1.00 USDT' },
  },
  // سولانا (SOL)
  SOL: {
    1: { amount: 0.001, label: '0.001 SOL' },
    2: { amount: 0.005, label: '0.005 SOL' },
    3: { amount: 0.01, label: '0.01 SOL' },
    4: { amount: 0.02, label: '0.02 SOL' },
  },
  // بایننس کوین (BNB)
  BNB: {
    1: { amount: 0.00004, label: '0.00004 BNB' },
    2: { amount: 0.00016, label: '0.00016 BNB' },
    3: { amount: 0.0004, label: '0.0004 BNB' },
    4: { amount: 0.0008, label: '0.0008 BNB' },
  },
  // دوج‌کوین (DOGE)
  DOGE: {
    1: { amount: 0.25, label: '0.25 DOGE' },
    2: { amount: 1.00, label: '1.00 DOGE' },
    3: { amount: 2.50, label: '2.50 DOGE' },
    4: { amount: 5.00, label: '5.00 DOGE' },
  },
  // تون‌کوین (TON)
  TON: {
    1: { amount: 0.015, label: '0.015 TON' },
    2: { amount: 0.060, label: '0.060 TON' },
    3: { amount: 0.150, label: '0.150 TON' },
    4: { amount: 0.30, label: '0.30 TON' },
  },
  // بونک (BONK)
  BONK: {
    1: { amount: 5, label: '5 BONK' },
    2: { amount: 20, label: '20 BONK' },
    3: { amount: 50, label: '50 BONK' },
    4: { amount: 100, label: '100 BONK' },
  },
  // پپه (PEPE)
  PEPE: {
    1: { amount: 1000, label: '1000 PEPE' },
    2: { amount: 4000, label: '4000 PEPE' },
    3: { amount: 10000, label: '10000 PEPE' },
    4: { amount: 20000, label: '20000 PEPE' },
  },
  // همستر (HMSTR)
  HMSTR: {
    1: { amount: 200, label: '200 HMSTR' },
    2: { amount: 800, label: '800 HMSTR' },
    3: { amount: 2000, label: '2000 HMSTR' },
    4: { amount: 4000, label: '4000 HMSTR' },
  },
  // دلار آمریکا (USD)
  USD: {
    1: { amount: 0.05, label: '$0.05 USD' },
    2: { amount: 0.25, label: '$0.25 USD' },
    3: { amount: 0.50, label: '$0.50 USD' },
    4: { amount: 1.00, label: '$1.00 USD' },
  },
  // تومان ایران (IRT)
  IRT: {
    1: { amount: 5000, label: '۵,۰۰۰ IRT' },
    2: { amount: 20000, label: '۲۰,۰۰۰ IRT' },
    3: { amount: 50000, label: '۵۰,۰۰۰ IRT' },
    4: { amount: 100000, label: '۱۰۰,۰۰۰ IRT' },
  },
  // یورو (EUR)
  EUR: {
    1: { amount: 0.025, label: '€0.025 EUR' },
    2: { amount: 0.10, label: '€0.10 EUR' },
    3: { amount: 0.25, label: '€0.25 EUR' },
    4: { amount: 0.50, label: '€0.50 EUR' },
  },
  // لیر ترکیه (TRY)
  TRY: {
    1: { amount: 0.5, label: '₺0.5 TRY' },
    2: { amount: 2, label: '₺2 TRY' },
    3: { amount: 5, label: '₺5 TRY' },
    4: { amount: 10, label: '₺10 TRY' },
  },
  // پوند (GBP)
  GBP: {
    1: { amount: 0.02, label: '£0.02 GBP' },
    2: { amount: 0.10, label: '£0.10 GBP' },
    3: { amount: 0.25, label: '£0.25 GBP' },
    4: { amount: 0.50, label: '£0.50 GBP' },
  },
  // درهم (AED)
  AED: {
    1: { amount: 0.2, label: 'د.إ0.2 AED' },
    2: { amount: 1, label: 'د.إ1 AED' },
    3: { amount: 2, label: 'د.إ2 AED' },
    4: { amount: 3, label: 'د.إ3 AED' },
  },
  // یوان (CNY)
  CNY: {
    1: { amount: 0.5, label: '¥0.5 CNY' },
    2: { amount: 2, label: '¥2 CNY' },
    3: { amount: 5, label: '¥5 CNY' },
    4: { amount: 10, label: '¥10 CNY' },
  },
  // روپیه (INR)
  INR: {
    1: { amount: 5, label: '₹5 INR' },
    2: { amount: 20, label: '₹20 INR' },
    3: { amount: 50, label: '₹50 INR' },
    4: { amount: 100, label: '₹100 INR' },
  },
  // دلار کانادا (CAD)
  CAD: {
    1: { amount: 0.05, label: 'C$0.05 CAD' },
    2: { amount: 0.25, label: 'C$0.25 CAD' },
    3: { amount: 0.50, label: 'C$0.50 CAD' },
    4: { amount: 1.00, label: 'C$1.00 CAD' },
  },
  // فرانک سوئیس (CHF)
  CHF: {
    1: { amount: 0.05, label: 'Fr.0.05 CHF' },
    2: { amount: 0.10, label: 'Fr.0.10 CHF' },
    3: { amount: 0.50, label: 'Fr.0.50 CHF' },
    4: { amount: 1.00, label: 'Fr.1.00 CHF' },
  },
  // دلار استرالیا (AUD)
  AUD: {
    1: { amount: 0.05, label: 'A$0.05 AUD' },
    2: { amount: 0.25, label: 'A$0.25 AUD' },
    3: { amount: 0.50, label: 'A$0.50 AUD' },
    4: { amount: 1.00, label: 'A$1.00 AUD' },
  },
};

// ======================================================
// ۴. توابع کمکی برای دریافت سطوح
// ======================================================

/**
 * دریافت سطوح یک ارز برای یک دسته‌بندی خاص
 * @param {string} currency - کد ارز (مثلاً 'BTC')
 * @param {string} category - دسته‌بندی ('game_room', 'duel', 'challenge')
 * @returns {Array} آرایه‌ای از سطوح مرتب‌شده
 */
export const getLevels = (currency, category) => {
  const levelMap = {
    game_room: GAME_LEVELS,
    duel: DUEL_LEVELS,
    challenge: CHALLENGE_LEVELS,
  };

  const levels = levelMap[category]?.[currency];
  if (!levels) return [];

  return Object.entries(levels).map(([level, data]) => ({
    level: parseInt(level),
    ...data,
  })).sort((a, b) => a.level - b.level);
};

/**
 * دریافت یک سطح خاص
 * @param {string} currency - کد ارز
 * @param {number} level - شماره سطح (۱ تا ۴)
 * @param {string} category - دسته‌بندی
 * @returns {Object|null} اطلاعات سطح یا null
 */
export const getLevel = (currency, level, category) => {
  const levels = getLevels(currency, category);
  return levels.find(l => l.level === level) || null;
};

/**
 * دریافت مقدار سطح
 * @param {string} currency - کد ارز
 * @param {number} level - شماره سطح (۱ تا ۴)
 * @param {string} category - دسته‌بندی
 * @returns {number} مقدار سطح
 */
export const getLevelAmount = (currency, level, category) => {
  const levelData = getLevel(currency, level, category);
  return levelData?.amount || 0;
};

/**
 * دریافت لیست ارزهای پشتیبانی‌شده برای یک دسته‌بندی
 * @param {string} category - دسته‌بندی
 * @returns {string[]} لیست کد ارزها
 */
export const getSupportedCurrencies = (category) => {
  const levelMap = {
    game_room: GAME_LEVELS,
    duel: DUEL_LEVELS,
    challenge: CHALLENGE_LEVELS,
  };

  const levels = levelMap[category];
  if (!levels) return [];

  return Object.keys(levels);
};

// ======================================================
// ۵. خروجی پیش‌فرض
// ======================================================
export default {
  GAME_LEVELS,
  DUEL_LEVELS,
  CHALLENGE_LEVELS,
  getLevels,
  getLevel,
  getLevelAmount,
  getSupportedCurrencies,
};