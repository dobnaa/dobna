// config/levels.js

// ======================================================
// ۱. منبع واحد مبالغ سطوح (BASE) بر اساس ارز
// ======================================================
// این مقادیر پایه برای هر سه دسته (تالار گروه، دوئل، چالش) استفاده می‌شود تا
// اعداد در چند فایل مختلف تکرار/واگرا نشوند. اگر در آینده نیاز شد مبالغ یک
// دسته با بقیه فرق کند، آن دسته را جدا از BASE_LEVEL_AMOUNTS تعریف کنید.
//
// نکته: مقادیر USDC و SUI فعلاً PLACEHOLDER هستند (USDC از روی USDT و SUI از
// روی مقیاس SOL تخمین زده شده‌اند) و باید با اعداد واقعی جایگزین شوند.
const BASE_LEVEL_AMOUNTS = {
  BTC: { 1: 5e-07, 2: 2e-06, 3: 5e-06, 4: 1e-05 },
  ETH: { 1: 1e-05, 2: 5e-05, 3: 0.0001, 4: 0.0002 },
  USDT: { 1: 0.05, 2: 0.25, 3: 0.5, 4: 1.0 },
  SOL: { 1: 0.001, 2: 0.005, 3: 0.01, 4: 0.02 },
  BNB: { 1: 4e-05, 2: 0.00016, 3: 0.0004, 4: 0.0008 },
  DOGE: { 1: 0.25, 2: 1.0, 3: 2.5, 4: 5.0 },
  TON: { 1: 0.015, 2: 0.06, 3: 0.15, 4: 0.3 },
  BONK: { 1: 5, 2: 20, 3: 50, 4: 100 },
  PEPE: { 1: 1000, 2: 4000, 3: 10000, 4: 20000 },
  HMSTR: { 1: 200, 2: 800, 3: 2000, 4: 4000 },
  USDC: { 1: 0.05, 2: 0.25, 3: 0.5, 4: 1.0 },
  SUI: { 1: 0.001, 2: 0.005, 3: 0.01, 4: 0.02 },
  USD: { 1: 0.05, 2: 0.25, 3: 0.5, 4: 1.0 },
  IRT: { 1: 5000, 2: 20000, 3: 50000, 4: 100000 },
  EUR: { 1: 0.025, 2: 0.1, 3: 0.25, 4: 0.5 },
  TRY: { 1: 0.5, 2: 2, 3: 5, 4: 10 },
  GBP: { 1: 0.02, 2: 0.1, 3: 0.25, 4: 0.5 },
  AED: { 1: 0.2, 2: 1, 3: 2, 4: 3 },
  CNY: { 1: 0.5, 2: 2, 3: 5, 4: 10 },
  INR: { 1: 5, 2: 20, 3: 50, 4: 100 },
  CAD: { 1: 0.05, 2: 0.25, 3: 0.5, 4: 1.0 },
  CHF: { 1: 0.05, 2: 0.1, 3: 0.5, 4: 1.0 },
  AUD: { 1: 0.05, 2: 0.25, 3: 0.5, 4: 1.0 },
};

// ======================================================
// ۲. ساخت آبجکت سطوح برای هر دسته از روی BASE_LEVEL_AMOUNTS
// ======================================================
const buildLevelsFromBase = () => {
  const result = {};
  Object.entries(BASE_LEVEL_AMOUNTS).forEach(([currency, amounts]) => {
    result[currency] = {
      1: { amount: amounts[0] },
      2: { amount: amounts[1] },
      3: { amount: amounts[2] },
      4: { amount: amounts[3] },
    };
  });
  return result;
};

// هر دسته یک کپی مستقل می‌گیرد (نه رفرنس مشترک) تا در آینده بتوانند از هم جدا شوند
export const GAME_LEVELS = buildLevelsFromBase();
export const DUEL_LEVELS = buildLevelsFromBase();
export const CHALLENGE_LEVELS = buildLevelsFromBase();

// ======================================================
// ۳. توابع کمکی برای دریافت سطوح
// ======================================================

const LEVEL_MAP = {
  game_room: GAME_LEVELS,
  duel: DUEL_LEVELS,
  challenge: CHALLENGE_LEVELS,
};

/**
 * دریافت سطوح یک ارز برای یک دسته‌بندی خاص
 * @param {string} currency - کد ارز (مثلاً 'BTC')
 * @param {string} category - دسته‌بندی ('game_room', 'duel', 'challenge')
 * @returns {Array<{level: number, amount: number}>} آرایه‌ای از سطوح مرتب‌شده
 */
export const getLevels = (currency, category) => {
  const levels = LEVEL_MAP[category]?.[currency];
  if (!levels) return [];

  return Object.entries(levels)
    .map(([level, data]) => ({
      level: parseInt(level, 10),
      ...data,
    }))
    .sort((a, b) => a.level - b.level);
};

/**
 * دریافت یک سطح خاص.
 * ورودی `level` می‌تواند عدد یا رشته باشد (مثلاً وقتی از useParams می‌آید)؛
 * مقایسه با Number() انجام می‌شود تا "2" === 2 هم درست کار کند.
 * @param {string} currency - کد ارز
 * @param {number|string} level - شماره سطح (۱ تا ۴)
 * @param {string} category - دسته‌بندی
 * @returns {{level: number, amount: number}|null} اطلاعات سطح یا null
 */
export const getLevel = (currency, level, category) => {
  const levels = getLevels(currency, category);
  const target = Number(level);
  return levels.find((l) => l.level === target) || null;
};

/**
 * دریافت مقدار (amount) یک سطح خاص
 * @param {string} currency - کد ارز
 * @param {number|string} level - شماره سطح (۱ تا ۴)
 * @param {string} category - دسته‌بندی
 * @returns {number} مقدار سطح (۰ اگر یافت نشد)
 */
export const getLevelAmount = (currency, level, category) => {
  const levelData = getLevel(currency, level, category);
  return levelData?.amount || 0;
};

/**
 * دریافت لیست ارزهای پشتیبانی‌شده برای یک دسته‌بندی.
 * نکته: این تابع عمداً `getCurrenciesForCategory` نام‌گذاری شده (نه
 * `getSupportedCurrencies`) چون utils/assetMapper.js از قبل تابعی دقیقاً با
 * همین نام export می‌کند؛ نام یکسان در دو ماژول مختلف باعث تداخل import می‌شود.
 * @param {string} category - دسته‌بندی
 * @returns {string[]} لیست کد ارزها
 */
export const getCurrenciesForCategory = (category) => {
  const levels = LEVEL_MAP[category];
  if (!levels) return [];
  return Object.keys(levels);
};

// ======================================================
// ۴. خروجی پیش‌فرض
// ======================================================
export default {
  GAME_LEVELS,
  DUEL_LEVELS,
  CHALLENGE_LEVELS,
  getLevels,
  getLevel,
  getLevelAmount,
  getCurrenciesForCategory,
};



const BASE_LEVEL_AMOUNTS = {
  // ... سایر ارزها
  DUS: { 1: 0.05, 2: 0.25, 3: 0.5, 4: 1.0 },
};