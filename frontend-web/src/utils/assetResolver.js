// utils/assetResolver.js
import { getAssetInfo, isCryptoType, isFiatType, getAssetFlag, getAssetIconName } from '../config/assets';
import { getCryptoIcon, getFlagEmoji } from './assetMapper';

/**
 * دریافت اطلاعات نمایشی یک Asset (آیکون و نوع)
 * @param {string} currency - کد ارز (BTC, USD, DUS, ...)
 * @returns {{ type: string, icon: string | null, isCrypto: boolean, isFiat: boolean }}
 */
export const getAssetDisplay = (currency) => {
  const asset = getAssetInfo(currency);

  if (!asset) {
    return {
      type: 'unknown',
      icon: null,
      isCrypto: false,
      isFiat: false,
    };
  }

  const isCrypto = isCryptoType(currency);
  const isFiat = isFiatType(currency);

  let icon = null;

  if (isCrypto) {
    // برای Crypto و Internal از آیکون SVG استفاده می‌شود
    const iconName = getAssetIconName(currency);
    icon = iconName ? getCryptoIcon(currency) : null;
  } else if (isFiat) {
    // برای فیات از ایموجی پرچم استفاده می‌شود
    const flagKey = getAssetFlag(currency);
    icon = getFlagEmoji(currency);
  }

  return {
    type: asset.type,
    icon,
    isCrypto,
    isFiat,
  };
};

/**
 * دریافت تعداد اعشار یک Asset
 */
export const getAssetDecimals = (currency) => {
  const asset = getAssetInfo(currency);
  return asset?.decimals ?? 2;
};

/**
 * بررسی اینکه Asset Crypto یا Internal است
 */
export const isCryptoAsset = (currency) => {
  return isCryptoType(currency);
};

/**
 * بررسی اینکه Asset Fiat است
 */
export const isFiatAsset = (currency) => {
  return isFiatType(currency);
};

export default {
  getAssetDisplay,
  getAssetDecimals,
  isCryptoAsset,
  isFiatAsset,
};