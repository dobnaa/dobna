// components/wallet/AssetItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getCryptoIcon, getFlagEmoji } from '../../utils/assetMapper';

// ارزهایی که آیکون SVG رمزارز دارند؛ بقیه فیات محسوب شده و پرچم می‌گیرند
const CRYPTO_CURRENCIES = [
  'BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI',
];

const AssetItem = ({ asset, onPress }) => {
  // isRTL مستقیماً از هوک گرفته می‌شود (منبع واحد حقیقت)، نه محاسبه‌ی دستی مجدد
  const { t, isRTL } = useTranslation();

  // محافظت در برابر داده‌ی نامعتبر یا ناقص
  if (!asset || !asset.currency) {
    return null;
  }

  const isCrypto = CRYPTO_CURRENCIES.includes(asset.currency);

  // نام ارز از فایل ترجمه (پشتیبانی خودکار از هر ۱۷ زبان)
  const currencyName = t(`currencies.${asset.currency}`, { defaultValue: asset.currency });

  // تبدیل امن change24h به عدد (ممکن است از API به‌صورت string بیاید)
  const change = Number(asset.change24h);
  const hasChange = asset.change24h !== undefined && asset.change24h !== null && !Number.isNaN(change);

  return (
    <button
      onClick={onPress}
      className="w-full bg-gray-800/30 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/30 transition border border-gray-700/20"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* آیکون ارز: تصویر SVG برای کریپتو، ایموجی پرچم برای فیات */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
          {isCrypto ? (
            <img
              src={getCryptoIcon(asset.currency)}
              alt={asset.currency}
              className="w-6 h-6"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.textContent = '💱';
              }}
            />
          ) : (
            <span>{getFlagEmoji(asset.currency)}</span>
          )}
        </div>

        <div className="text-left min-w-0">
          <p className="text-white font-medium">{asset.currency}</p>
          <p className="text-gray-400 text-xs truncate">{currencyName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-right">
          {/* نکته: currency باید پاس داده شود تا تعداد اعشار درست (مثلاً ۸ رقم برای BTC، ۰ رقم برای IRT) اعمال شود */}
          <p className="text-white font-medium">{formatCurrency(asset.amount, asset.currency)}</p>
          <p className="text-blue-400 text-xs" dir="ltr">
            ${formatCurrency(asset.usdValue || 0, 'USD')}
          </p>
          {hasChange && (
            <span className={`text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}
              {change.toFixed(2)}%
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </div>
    </button>
  );
};

AssetItem.propTypes = {
  asset: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    usdValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    change24h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onPress: PropTypes.func,
};

AssetItem.defaultProps = {
  onPress: () => {},
};

export default AssetItem;