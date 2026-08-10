// components/wallet/AssetItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../hooks/useTranslation';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getAssetDisplay } from '../../utils/assetMapper';

const AssetItem = ({ asset, onPress }) => {
  const { t } = useTranslation();

  if (!asset || !asset.currency) {
    return null;
  }

  const currency = String(asset.currency).toUpperCase();
  const display = getAssetDisplay(currency);

  const currencyName = t(`currencies.${currency}`, {
    defaultValue: currency,
  });

  const isImageIcon = display.iconType === 'crypto';

  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full bg-gray-800/30 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/30 transition border border-gray-700/20"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Asset Icon */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {isImageIcon && display.icon ? (
            <img
              src={display.icon}
              alt={currency}
              className="w-6 h-6"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-2xl" role="img" aria-label={currency}>
              {display.icon || '🏳️'}
            </span>
          )}
        </div>

        <div className="text-left min-w-0">
          <p className="text-white font-medium">
            {currency}
          </p>

          <p className="text-gray-400 text-xs truncate">
            {currencyName}
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-white font-medium">
          {formatCurrency(asset.amount, currency)}
        </p>
      </div>
    </button>
  );
};

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

AssetItem.defaultProps = {
  onPress: () => {},
};

export default AssetItem;