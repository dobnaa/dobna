// utils/assetMapper.js
import {
  getAssetConfig,
  usesCryptoIcon,
  usesFlagIcon,
  getAssetFlag,
  ASSET_ICON_TYPES,
} from '../config/assets';

// ======================================================
// FLAG EMOJI MAP
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
// دریافت آیکون Crypto / Internal
// ======================================================
export const getCryptoIcon = (currency) => {
  if (!currency) return null;

  const code = String(currency).toUpperCase();

  return `/assets/icons/crypto/${code.toLowerCase()}.svg`;
};

// ======================================================
// دریافت ایموجی پرچم
// ======================================================
export const getFlagEmoji = (currency) => {
  const flagKey = getAssetFlag(currency);

  return FLAG_EMOJI[flagKey] || '🏳️';
};

// ======================================================
// دریافت آیکون مناسب Asset
// ======================================================
export const getAssetIcon = (currency) => {
  if (!currency) return null;

  if (usesCryptoIcon(currency)) {
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

export default {
  getCryptoIcon,
  getFlagEmoji,
  getAssetIcon,
  getAssetDisplay,
};