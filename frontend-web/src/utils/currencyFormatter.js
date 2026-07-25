// utils/currencyFormatter.js
import i18n from '../config/i18n';

// ======================================================
// ۱. تنظیمات تعداد اعشار برای هر ارز
// ======================================================
const CURRENCY_DECIMALS = {
  // رمزارزها (Crypto)
  BTC: 8,
  ETH: 8,
  SOL: 8,
  BNB: 8,
  DOGE: 8,
  TON: 8,
  BONK: 8,
  PEPE: 8,
  HMSTR: 8,
  USDC: 2,
  USDT: 2,
  SUI: 8,

  // فیات‌ها (Fiat)
  USD: 2,
  EUR: 2,
  GBP: 2,
  TRY: 2,
  AED: 2,
  CAD: 2,
  CHF: 2,
  AUD: 2,
  INR: 2,
  CNY: 2,
  IRT: 0,
};

// ======================================================
// ۲. دریافت تعداد اعشار ارز
// ======================================================
export const getCurrencyDecimals = (currency) => {
  return CURRENCY_DECIMALS[currency] ?? 2;
};

// ======================================================
// ۳. دریافت لوکال فعلی
// ======================================================
// نکته: این نگاشت باید دقیقاً با کلیدهای SUPPORTED_LANGUAGES در config/i18n.js هماهنگ باشد
const getCurrentLocale = () => {
  const lang = i18n.language || 'en';
  const localeMap = {
    fa: 'fa-IR',
    ar: 'ar-SA',
    en: 'en-US',
    tr: 'tr-TR',
    ru: 'ru-RU',
    hi: 'hi-IN',
    fr: 'fr-FR',
    zh: 'zh-CN',
    id: 'id-ID',
    ko: 'ko-KR',
    es: 'es-ES',
    cs: 'cs-CZ',
    fi: 'fi-FI',
    pt: 'pt-BR',
    uz: 'uz-UZ',
    vi: 'vi-VN',
    sv: 'sv-SE',
  };
  return localeMap[lang] || 'en-US';
};

// ======================================================
// ۴. فرمت‌کننده اصلی اعداد (با locale و اعشار)
// ======================================================
export const formatNumber = (value, decimals = 2, locale = null) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const finalLocale = locale || getCurrentLocale();

  try {
    return new Intl.NumberFormat(finalLocale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  } catch (error) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  }
};

// ======================================================
// ۵. فرمت‌کننده ارز (با نام ارز و اعشار مناسب)
// ======================================================
// نکته مهم: همیشه پارامتر currency را صراحتاً پاس دهید (مثلاً formatCurrency(amount, asset.currency))
// در غیر این صورت پیش‌فرض 'USD' اعمال می‌شود و تعداد اعشار برای ارزهایی مثل BTC (۸ رقم) یا IRT (۰ رقم) غلط خواهد بود.
export const formatCurrency = (amount, currency = 'USD', locale = null) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0';
  }

  const decimals = getCurrencyDecimals(currency);
  return formatNumber(amount, decimals, locale);
};

// ======================================================
// ۶. فرمت فشرده (Compact) برای اعداد بزرگ - بدون هاردکد
// ======================================================
export const formatCompactNumber = (value, locale = null) => {
  if (value === undefined || value === null || isNaN(value)) {
    return { value: 0, unit: '' };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const absNum = Math.abs(num);
  const sign = num < 0 ? -1 : 1;
  const finalNum = Math.abs(num);

  let formattedValue = 0;
  let unit = '';

  if (absNum >= 1_000_000_000_000) {
    formattedValue = finalNum / 1_000_000_000_000;
    unit = 'T';
  } else if (absNum >= 1_000_000_000) {
    formattedValue = finalNum / 1_000_000_000;
    unit = 'B';
  } else if (absNum >= 1_000_000) {
    formattedValue = finalNum / 1_000_000;
    unit = 'M';
  } else if (absNum >= 1_000) {
    formattedValue = finalNum / 1_000;
    unit = 'K';
  } else {
    // اعداد کوچک بدون واحد
    return {
      value: num,
      unit: '',
    };
  }

  // گرد کردن به ۱ اعشار
  const rounded = Number(formattedValue.toFixed(1));

  return {
    value: sign * rounded,
    unit: unit,
  };
};

// ======================================================
// ۷. فرمت فشرده به صورت رشته (با استفاده از تابع بالا)
// ======================================================
export const formatCompactString = (value, locale = null) => {
  const result = formatCompactNumber(value, locale);
  if (result.unit) {
    return `${formatNumber(result.value, 1, locale)} ${result.unit}`;
  }
  return formatNumber(result.value, 2, locale);
};

// ======================================================
// ۸. فرمت با نماد دلار (برای نمایش سریع)
// ======================================================
export const formatUSD = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '$0.00';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const locale = getCurrentLocale();

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  } catch (error) {
    return `$${formatNumber(num, decimals, 'en-US')}`;
  }
};

// ======================================================
// ۹. فرمت با نماد ارز (با پشتیبانی از ارزهای مختلف)
// ======================================================
// نکته: برای کدهای غیر ISO-4217 (مثل BTC, PEPE, IRT) Intl.NumberFormat خطا می‌دهد
// و به‌صورت خودکار fallback به فرمت ساده‌ی "CODE مقدار" می‌افتد.
export const formatCurrencyWithSymbol = (amount, currency = 'USD', locale = null) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${currency} 0`;
  }

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  const finalLocale = locale || getCurrentLocale();

  try {
    return new Intl.NumberFormat(finalLocale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: getCurrencyDecimals(currency),
      maximumFractionDigits: getCurrencyDecimals(currency),
    }).format(num);
  } catch (error) {
    const formatted = formatNumber(num, getCurrencyDecimals(currency), 'en-US');
    return `${currency} ${formatted}`;
  }
};

// ======================================================
// ۱۰. فرمت درصد
// ======================================================
export const formatPercent = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0%';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const locale = getCurrentLocale();

  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num / 100);
  } catch (error) {
    return `${formatNumber(num, decimals, 'en-US')}%`;
  }
};

// ======================================================
// ۱۱. خروجی پیش‌فرض
// ======================================================
export default {
  formatNumber,
  formatCurrency,
  formatCompactNumber,
  formatCompactString,
  formatUSD,
  formatCurrencyWithSymbol,
  formatPercent,
  getCurrencyDecimals,
};