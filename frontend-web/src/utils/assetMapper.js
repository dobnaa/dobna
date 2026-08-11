// utils/assetMapper.js
import {
  getAssetConfig,
  usesSvgIcon,
  usesFlagIcon,
  getAssetFlag,
} from '../config/assets';

// ======================================================
// FLAG EMOJI MAP
// ======================================================
// فقط mapping فنی کد پرچم به Emoji است.
// نام یا متن قابل ترجمه در این فایل وجود ندارد.
// ======================================================
const FLAG_EMOJI = {
  US: '🇺🇸',
  EU: '🇪🇺',
  IR: '🇮🇷',
  TR: '🇹🇷',
  GB: '🇬🇧',
  AE: '🇦🇪',
  CN: '🇨🇳',
  IN: '🇮🇳',
  CA: '🇨🇦',
  CH: '🇨🇭',
  AU: '🇦🇺',
};

// ======================================================
// دریافت آیکون SVG برای Crypto / Internal
// ======================================================
export const getCryptoIcon = (currency) => {
  if (!currency) return null;

  const code = String(currency).toUpperCase();

  return `/assets/icons/crypto/${code.toLowerCase()}.svg`;
};

// ======================================================
// دریافت ایموجی پرچم برای Fiat
// ======================================================
export const getFlagEmoji = (currency) => {
  if (!currency) return '🏳️';

  const flagKey = getAssetFlag(currency);

  return FLAG_EMOJI[flagKey] || '🏳️';
};

// ======================================================
// دریافت آیکون مناسب برای هر Asset
// ======================================================
// SVG → مسیر فایل SVG
// FLAG → Emoji پرچم
// ======================================================
export const getAssetIcon = (currency) => {
  if (!currency) return null;

  if (usesSvgIcon(currency)) {
    return getCryptoIcon(currency);
  }

  if (usesFlagIcon(currency)) {
    return getFlagEmoji(currency);
  }

  return null;
};

// ======================================================
// دریافت اطلاعات کامل نمایشی Asset
// ======================================================
export const getAssetDisplay = (currency) => {
  const config = getAssetConfig(currency);

  if (!config) {
    return {
      icon: null,
      iconType: null,
      type: 'unknown',
      isCrypto: false,
      isFiat: false,
      isInternal: false,
    };
  }

  return {
    icon: getAssetIcon(currency),
    iconType: config.iconType,
    type: config.type,
    isCrypto: config.type === 'crypto',
    isFiat: config.type === 'fiat',
    isInternal: config.type === 'internal',
  };
};

// ======================================================
// خروجی
// ======================================================
export default {
  getCryptoIcon,
  getFlagEmoji,
  getAssetIcon,
  getAssetDisplay,
};