// utils/currencyFormatter.js

import i18n from '../config/i18n';
import { getAssetDecimals } from '../config/assets';

// ======================================================
// دریافت Locale فعلی
// ======================================================

const LOCALE_MAP = {
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

const getCurrentLocale = () => {
  const language = i18n.language || 'en';

  // پشتیبانی از مواردی مثل:
  // en-US
  // fa-IR
  // pt-BR
  const baseLanguage = language.split('-')[0].toLowerCase();

  return LOCALE_MAP[baseLanguage] || 'en-US';
};

// ======================================================
// تبدیل امن مقدار به Number
// ======================================================

const toNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const number = typeof value === 'string'
    ? Number.parseFloat(value)
    : Number(value);

  return Number.isFinite(number) ? number : null;
};

// ======================================================
// فرمت‌کننده اصلی اعداد
// ======================================================

export const formatNumber = (
  value,
  decimals = 2,
  locale = null
) => {
  const number = toNumber(value);

  if (number === null) {
    return '0';
  }

  const safeDecimals = Math.max(
    0,
    Math.min(20, Number(decimals) || 0)
  );

  const finalLocale = locale || getCurrentLocale();

  try {
    return new Intl.NumberFormat(finalLocale, {
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    }).format(number);
  } catch (error) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    }).format(number);
  }
};

// ======================================================
// فرمت‌کننده Asset / Currency
// ======================================================
//
// تعداد اعشار فقط از config/assets.js گرفته می‌شود.
// این تابع هیچ Registry جداگانه‌ای از ارزها ندارد.
// ======================================================

export const formatCurrency = (
  amount,
  currency = 'USD',
  locale = null
) => {
  const number = toNumber(amount);

  if (number === null) {
    return '0';
  }

  const decimals = getAssetDecimals(currency);

  return formatNumber(
    number,
    decimals,
    locale
  );
};

// ======================================================
// فرمت Compact
// ======================================================

export const formatCompactNumber = (
  value,
  locale = null
) => {
  const number = toNumber(value);

  if (number === null) {
    return {
      value: 0,
      unit: '',
    };
  }

  const absNumber = Math.abs(number);

  let divisor = 1;
  let unit = '';

  if (absNumber >= 1_000_000_000_000) {
    divisor = 1_000_000_000_000;
    unit = 'T';
  } else if (absNumber >= 1_000_000_000) {
    divisor = 1_000_000_000;
    unit = 'B';
  } else if (absNumber >= 1_000_000) {
    divisor = 1_000_000;
    unit = 'M';
  } else if (absNumber >= 1_000) {
    divisor = 1_000;
    unit = 'K';
  }

  if (!unit) {
    return {
      value: number,
      unit: '',
    };
  }

  const formatted = number / divisor;

  return {
    value: Number(formatted.toFixed(1)),
    unit,
  };
};

// ======================================================
// Compact به صورت String
// ======================================================

export const formatCompactString = (
  value,
  locale = null
) => {
  const result = formatCompactNumber(value, locale);

  if (result.unit) {
    return `${formatNumber(result.value, 1, locale)} ${result.unit}`;
  }

  return formatNumber(result.value, 2, locale);
};

// ======================================================
// فرمت USD
// ======================================================

export const formatUSD = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  if (number === null) {
    return '$0.00';
  }

  const locale = getCurrentLocale();

  const safeDecimals = Math.max(
    0,
    Math.min(20, Number(decimals) || 0)
  );

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    }).format(number);
  } catch (error) {
    return `$${formatNumber(
      number,
      safeDecimals,
      'en-US'
    )}`;
  }
};

// ======================================================
// فرمت Currency با Symbol
// ======================================================

export const formatCurrencyWithSymbol = (
  amount,
  currency = 'USD',
  locale = null
) => {
  const number = toNumber(amount);

  if (number === null) {
    return `${currency} 0`;
  }

  const decimals = getAssetDecimals(currency);
  const finalLocale = locale || getCurrentLocale();
  const code = String(currency).toUpperCase();

  try {
    return new Intl.NumberFormat(finalLocale, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number);
  } catch (error) {
    return `${code} ${formatNumber(
      number,
      decimals,
      'en-US'
    )}`;
  }
};

// ======================================================
// فرمت درصد
// ======================================================

export const formatPercent = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  if (number === null) {
    return '0%';
  }

  const locale = getCurrentLocale();

  const safeDecimals = Math.max(
    0,
    Math.min(20, Number(decimals) || 0)
  );

  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    }).format(number / 100);
  } catch (error) {
    return `${formatNumber(
      number,
      safeDecimals,
      'en-US'
    )}%`;
  }
};

// ======================================================
// خروجی پیش‌فرض
// ======================================================

export default {
  formatNumber,
  formatCurrency,
  formatCompactNumber,
  formatCompactString,
  formatUSD,
  formatCurrencyWithSymbol,
  formatPercent,
};