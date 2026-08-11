// components/wallet/AssetItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../hooks/useTranslation';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getAssetDisplay } from '../../utils/assetMapper';

const AssetItem = ({ asset, onPress }) => {
  const { t } = useTranslation();

  // محافظت در برابر داده نامعتبر یا ناقص
  if (!asset || !asset.currency) {
    return null;
  }

  // نرمال‌سازی کد ارز برای استفاده یکسان در تمام سیستم
  const currency = String(asset.currency).toUpperCase();

  // دریافت تمام اطلاعات نمایشی Asset از Utility مرکزی
  const display = getAssetDisplay(currency);

  // نام قابل نمایش فقط از i18n دریافت می‌شود
  // هیچ نام زبان‌محور یا hardcode شده‌ای در این کامپوننت وجود ندارد
  const currencyName = t(`currencies.${currency}`, {
    defaultValue: currency,
  });

  // طبق قرارداد assets.js:
  // SVG → فایل تصویری
  // FLAG → Emoji
  const isImageIcon = display.iconType === 'svg';

  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full bg-gray-800/30 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/30 transition border border-gray-700/20"
    >
      {/* ======================================================
          اطلاعات Asset
          ====================================================== */}
      <div className="flex items-center gap-3 min-w-0">
        {/* آیکون Asset */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {isImageIcon && display.icon ? (
            <img
              src={display.icon}
              alt={currency}
              className="w-6 h-6 object-contain"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span
              className="text-2xl leading-none"
              role="img"
              aria-label={currency}
            >
              {display.icon || '🏳️'}
            </span>
          )}
        </div>

        {/* نام Asset */}
        <div className="text-left min-w-0">
          <p className="text-white font-medium">
            {currency}
          </p>

          <p className="text-gray-400 text-xs truncate">
            {currencyName}
          </p>
        </div>
      </div>

      {/* ======================================================
          موجودی Asset
          ====================================================== */}
      <div className="text-right flex-shrink-0">
        <p className="text-white font-medium">
          {formatCurrency(asset.amount, currency)}
        </p>
      </div>
    </button>
  );
};

// ======================================================
// PropTypes
// ======================================================
AssetItem.propTypes = {
  asset: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,

  onPress: PropTypes.func,
};

// ======================================================
// Defaults
// ======================================================
AssetItem.defaultProps = {
  onPress: () => {},
};

export default AssetItem;