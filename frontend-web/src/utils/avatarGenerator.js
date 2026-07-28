// utils/avatarGenerator.js

// ======================================================
// ۱. تنظیمات پایه
// ======================================================
// DiceBear یک سرویس رایگان و بدون نیاز به کلید برای تولید آواتار SVG بر اساس seed است.
// مستندات: https://www.dicebear.com/
const DICEBEAR_BASE_URL = 'https://api.dicebear.com/7.x';

// استایل‌های پشتیبانی‌شده توسط DiceBear
// مستندات: https://www.dicebear.com/styles
export const AVATAR_STYLES = {
  SHAPES: 'shapes',
  IDENTICON: 'identicon',
  BOTTTS: 'bottts',
  INITIALS: 'initials',
  AVATAAARS: 'avataaars',
  BIG_SMILE: 'big-smile',
  THUMBS: 'thumbs',
  NOTIONISTS: 'notionists',
  MICAH: 'micah',
  FUN_EMOJI: 'fun-emoji',
  LORELEI: 'lorelei',
  PERSONAS: 'personas',
};

// استایل پیش‌فرض برای تولید آواتار
export const DEFAULT_STYLE = AVATAR_STYLES.SHAPES;

// تعداد آواتارهای محلی موجود در پوشه assets/images/avatars/ (avatar-1.png تا avatar-19.png)
const LOCAL_AVATAR_COUNT = 19;

// آواتارهای ویژه (در assets/images/avatars/ موجود هستند)
export const SPECIAL_AVATARS = {
  default: '/assets/images/avatars/default-avatar.png',
  guest: '/assets/images/avatars/avatar-guest.png',
  winner: '/assets/images/avatars/avatar-winner.png',
  vip: '/assets/images/avatars/avatar-vip.png',
  admin: '/assets/images/avatars/avatar-admin.png',
};

// ======================================================
// ۲. تابع هش ساده و قطعی (برای انتخاب قطعی آواتار محلی)
// ======================================================
// از این تابع برای تبدیل هر رشته به یک عدد ثابت استفاده می‌شود.
// ورودی یکسان همیشه خروجی یکسان تولید می‌کند، بدون نیاز به ذخیره‌سازی.
const simpleHash = (str) => {
  let hash = 0;
  const text = String(str || '');
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0; // تبدیل به عدد صحیح ۳۲ بیتی
  }
  return Math.abs(hash);
};

// ======================================================
// ۳. تولید URL آواتار از DiceBear
// ======================================================
/**
 * تولید URL آواتار SVG از سرویس DiceBear بر اساس seed.
 * این تابع وابسته به شبکه است ولی بسیار سریع و قابل اعتماد است.
 *
 * @param {string|number} seed - شناسه یکتا (معمولاً id یا username کاربر/گروه)
 * @param {string} style - استایل آواتار (پیش‌فرض: 'shapes')
 * @param {object} options - تنظیمات اضافی برای شخصی‌سازی
 * @param {string} options.backgroundColor - رنگ پس‌زمینه (اختیاری)
 * @param {number} options.size - اندازه (پیش‌فرض: 256)
 * @returns {string} URL کامل آواتار
 *
 * @example
 * getAvatarUrl('user_123') // https://api.dicebear.com/7.x/shapes/svg?seed=user_123
 * getAvatarUrl('group_456', 'bottts', { backgroundColor: 'FFB6C1' })
 */
export const getAvatarUrl = (
  seed,
  style = DEFAULT_STYLE,
  options = {}
) => {
  if (!seed) return SPECIAL_AVATARS.default;

  const encodedSeed = encodeURIComponent(String(seed));
  const { backgroundColor, size = 256 } = options;

  let url = `${DICEBEAR_BASE_URL}/${style}/svg?seed=${encodedSeed}&size=${size}`;

  if (backgroundColor) {
    url += `&backgroundColor=${backgroundColor.replace('#', '')}`;
  }

  return url;
};

// ======================================================
// ۴. انتخاب قطعی از آواتارهای محلی (بدون نیاز به شبکه)
// ======================================================
/**
 * انتخاب یکی از آواتارهای محلی (avatar-1.png تا avatar-19.png) به‌صورت قطعی بر اساس seed.
 * برای مواردی که نمی‌خواهیم به سرویس خارجی (DiceBear) وابسته باشیم مناسب است.
 *
 * @param {string|number} seed - شناسه یکتا
 * @param {number} maxIndex - حداکثر شاخص (پیش‌فرض: ۱۹)
 * @returns {string} مسیر آواتار محلی
 *
 * @example
 * getLocalAvatarPath('user_123') // /assets/images/avatars/avatar-7.png
 */
export const getLocalAvatarPath = (seed, maxIndex = LOCAL_AVATAR_COUNT) => {
  if (!seed) return SPECIAL_AVATARS.default;
  const index = (simpleHash(seed) % maxIndex) + 1;
  return `/assets/images/avatars/avatar-${index}.png`;
};

// ======================================================
// ۵. لیست کامل آواتارهای محلی (برای صفحه انتخاب آواتار)
// ======================================================
/**
 * لیست تمام آواتارهای از پیش تعریف‌شده برای نمایش در UI انتخاب آواتار.
 *
 * @param {number} count - تعداد آواتارها (پیش‌فرض: ۱۹)
 * @returns {string[]} آرایه‌ای از مسیرهای آواتار
 *
 * @example
 * getAllLocalAvatars() // ['/assets/images/avatars/avatar-1.png', ...]
 */
export const getAllLocalAvatars = (count = LOCAL_AVATAR_COUNT) => {
  const avatars = [];
  for (let i = 1; i <= count; i += 1) {
    avatars.push(`/assets/images/avatars/avatar-${i}.png`);
  }
  return avatars;
};

// ======================================================
// ۶. آواتارهای ویژه (مهمان، برنده، VIP، ادمین)
// ======================================================
/**
 * دریافت آواتار ویژه بر اساس نوع.
 *
 * @param {'default'|'guest'|'winner'|'vip'|'admin'} type - نوع آواتار
 * @returns {string} مسیر آواتار ویژه
 *
 * @example
 * getSpecialAvatar('winner') // /assets/images/avatars/avatar-winner.png
 */
export const getSpecialAvatar = (type = 'default') => {
  return SPECIAL_AVATARS[type] || SPECIAL_AVATARS.default;
};

// ======================================================
// ۷. تابع کمکی برای تشخیص آواتار از نوع ورودی
// ======================================================
/**
 * تشخیص خودکار نوع آواتار و بازگرداندن URL مناسب.
 * این تابع ترکیبی از تمام توابع بالا است و سعی می‌کند بهترین آواتار را انتخاب کند.
 *
 * @param {string|number} seed - شناسه یکتا
 * @param {boolean} useLocal - اگر true باشد از آواتار محلی استفاده می‌کند
 * @param {string} style - استایل DiceBear (فقط در صورت useLocal=false)
 * @param {string} specialType - نوع آواتار ویژه
 * @returns {string} URL یا مسیر آواتار
 *
 * @example
 * getBestAvatar('user_123') // URL DiceBear
 * getBestAvatar('user_123', true) // مسیر محلی
 */
export const getBestAvatar = (
  seed,
  useLocal = false,
  style = DEFAULT_STYLE,
  specialType = 'default'
) => {
  if (specialType !== 'default' && SPECIAL_AVATARS[specialType]) {
    return SPECIAL_AVATARS[specialType];
  }

  if (useLocal) {
    return getLocalAvatarPath(seed);
  }

  return getAvatarUrl(seed, style);
};

// ======================================================
// ۸. استایل‌های پشتیبانی‌شده (برای نمایش در UI)
// ======================================================
/**
 * لیست تمام استایل‌های پشتیبانی‌شده توسط DiceBear با نام فارسی و انگلیسی.
 * برای استفاده در صفحه انتخاب استایل آواتار.
 *
 * @returns {Array<{key: string, name: string, nameFa: string}>}
 */
export const getAvailableStyles = () => {
  return [
    { key: 'shapes', name: 'Shapes', nameFa: 'اشکال هندسی' },
    { key: 'identicon', name: 'Identicon', nameFa: 'شناسه‌گر' },
    { key: 'bottts', name: 'Bottts', nameFa: 'ربات‌ها' },
    { key: 'initials', name: 'Initials', nameFa: 'حروف اول' },
    { key: 'avataaars', name: 'Avataaars', nameFa: 'آواتارها' },
    { key: 'big-smile', name: 'Big Smile', nameFa: 'لبخند بزرگ' },
    { key: 'thumbs', name: 'Thumbs', nameFa: 'شست‌ها' },
    { key: 'notionists', name: 'Notionists', nameFa: 'نوتیونیست‌ها' },
    { key: 'micah', name: 'Micah', nameFa: 'میکا' },
    { key: 'fun-emoji', name: 'Fun Emoji', nameFa: 'ایموجی خنده‌دار' },
    { key: 'lorelei', name: 'Lorelei', nameFa: 'لورلای' },
    { key: 'personas', name: 'Personas', nameFa: 'شخصیت‌ها' },
  ];
};

// ======================================================
// ۹. خروجی پیش‌فرض (همه توابع)
// ======================================================
export default {
  getAvatarUrl,
  getLocalAvatarPath,
  getAllLocalAvatars,
  getSpecialAvatar,
  getBestAvatar,
  getAvailableStyles,
  AVATAR_STYLES,
  DEFAULT_STYLE,
  SPECIAL_AVATARS,
};
