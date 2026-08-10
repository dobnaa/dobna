// config/assets.js

// ======================================================
// انواع Asset
// ======================================================

export const ASSET_TYPES = {
  CRYPTO: 'crypto',
  FIAT: 'fiat',
  INTERNAL: 'internal',
};

// ======================================================
// انواع نمایش آیکون
// ======================================================

export const ASSET_ICON_TYPES = {
  SVG: 'svg',
  FLAG: 'flag',
};

// ======================================================
// Registry مرکزی تمام Assetها
// ======================================================
//
// این فایل فقط metadata مربوط به Asset را نگهداری می‌کند.
//
// قوانین:
// - هیچ متن قابل نمایش در این فایل وجود ندارد.
// - هیچ ترجمه‌ای در این فایل وجود ندارد.
// - نام Asset از i18n دریافت می‌شود.
// - مسیر SVG توسط assetMapper.js مدیریت می‌شود.
// - پرچم فیات از کد کشور استخراج می‌شود.
// - تعداد اعشار منبع واحد حقیقت (Single Source of Truth) است.
// ======================================================

export const ASSETS = {
  // ====================================================
  // Crypto
  // ====================================================

  BTC: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  ETH: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  SOL: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  BNB: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  DOGE: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  TON: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  BONK: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  PEPE: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  HMSTR: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  USDC: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  USDT: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  SUI: {
    type: ASSET_TYPES.CRYPTO,
    decimals: 8,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  // ====================================================
  // Internal
  // ====================================================

  DUS: {
    type: ASSET_TYPES.INTERNAL,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  STARS: {
    type: ASSET_TYPES.INTERNAL,
    decimals: 0,
    iconType: ASSET_ICON_TYPES.SVG,
  },

  // ====================================================
  // Fiat
  // ====================================================

  USD: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'US',
  },

  EUR: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'EU',
  },

  GBP: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'GB',
  },

  TRY: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'TR',
  },

  AED: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'AE',
  },

  CAD: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'CA',
  },

  CHF: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'CH',
  },

  AUD: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'AU',
  },

  INR: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'IN',
  },

  CNY: {
    type: ASSET_TYPES.FIAT,
    decimals: 2,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'CN',
  },

  IRT: {
    type: ASSET_TYPES.FIAT,
    decimals: 0,
    iconType: ASSET_ICON_TYPES.FLAG,
    flag: 'IR',
  },
};

// ======================================================
// دریافت تنظیمات Asset
// ======================================================

export const getAssetConfig = (currency) => {
  if (!currency) return null;

  const code = String(currency).toUpperCase();

  return ASSETS[code] || null;
};

// ======================================================
// بررسی پشتیبانی Asset
// ======================================================

export const isSupportedAsset = (currency) => {
  return Boolean(getAssetConfig(currency));
};

// ======================================================
// نوع Asset
// ======================================================

export const getAssetType = (currency) => {
  return getAssetConfig(currency)?.type || null;
};

export const isCryptoAsset = (currency) => {
  return getAssetType(currency) === ASSET_TYPES.CRYPTO;
};

export const isFiatAsset = (currency) => {
  return getAssetType(currency) === ASSET_TYPES.FIAT;
};

export const isInternalAsset = (currency) => {
  return getAssetType(currency) === ASSET_TYPES.INTERNAL;
};

// ======================================================
// نوع آیکون
// ======================================================

export const getAssetIconType = (currency) => {
  return getAssetConfig(currency)?.iconType || null;
};

export const usesSvgIcon = (currency) => {
  return getAssetIconType(currency) === ASSET_ICON_TYPES.SVG;
};

export const usesFlagIcon = (currency) => {
  return getAssetIconType(currency) === ASSET_ICON_TYPES.FLAG;
};

// ======================================================
// تعداد اعشار
// ======================================================

export const getAssetDecimals = (currency) => {
  return getAssetConfig(currency)?.decimals ?? 2;
};

// ======================================================
// پرچم
// ======================================================

export const getAssetFlag = (currency) => {
  return getAssetConfig(currency)?.flag || null;
};

// ======================================================
// لیست Assetها
// ======================================================

export const getSupportedAssets = () => {
  return Object.keys(ASSETS);
};

export const getAssetsByType = (type) => {
  return Object.entries(ASSETS)
    .filter(([, asset]) => asset.type === type)
    .map(([currency]) => currency);
};

// ======================================================
// لیست‌های آماده
// ======================================================

export const CRYPTO_ASSETS = getAssetsByType(ASSET_TYPES.CRYPTO);

export const FIAT_ASSETS = getAssetsByType(ASSET_TYPES.FIAT);

export const INTERNAL_ASSETS = getAssetsByType(ASSET_TYPES.INTERNAL);

export const SVG_ASSETS = Object.entries(ASSETS)
  .filter(([, asset]) => asset.iconType === ASSET_ICON_TYPES.SVG)
  .map(([currency]) => currency);

export const FLAG_ASSETS = Object.entries(ASSETS)
  .filter(([, asset]) => asset.iconType === ASSET_ICON_TYPES.FLAG)
  .map(([currency]) => currency);

// ======================================================
// خروجی پیش‌فرض
// ======================================================

export default ASSETS;