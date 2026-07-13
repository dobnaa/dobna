// components/wallet/AssetItem.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getCryptoIcon } from '../../utils/assetMapper';

const AssetItem = ({ asset, onPress }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  // نام ارز به زبان محلی
  const getLocalizedName = (currency) => {
    const names = {
      BTC: { en: 'Bitcoin', fa: 'بیت‌کوین' },
      ETH: { en: 'Ethereum', fa: 'اتریوم' },
      USDT: { en: 'Tether', fa: 'تتر' },
      SOL: { en: 'Solana', fa: 'سولانا' },
      BNB: { en: 'BNB', fa: 'بایننس کوین' },
      DOGE: { en: 'Dogecoin', fa: 'دوج‌کوین' },
      TON: { en: 'Toncoin', fa: 'تون‌کوین' },
      USD: { en: 'US Dollar', fa: 'دلار آمریکا' },
      IRT: { en: 'Iranian Toman', fa: 'تومان ایران' },
      EUR: { en: 'Euro', fa: 'یورو' },
      TRY: { en: 'Turkish Lira', fa: 'لیر ترکیه' },
      GBP: { en: 'British Pound', fa: 'پوند' },
      AED: { en: 'UAE Dirham', fa: 'درهم امارات' },
      CAD: { en: 'Canadian Dollar', fa: 'دلار کانادا' },
      CHF: { en: 'Swiss Franc', fa: 'فرانک سوئیس' },
      AUD: { en: 'Australian Dollar', fa: 'دلار استرالیا' },
      INR: { en: 'Indian Rupee', fa: 'روپیه هند' },
      CNY: { en: 'Chinese Yuan', fa: 'یوان چین' },
    };
    return names[currency]?.[isRTL ? 'fa' : 'en'] || currency;
  };

  return (
    <button
      onClick={onPress}
      className="w-full bg-gray-800/30 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/30 transition border border-gray-700/20"
    >
      <div className="flex items-center gap-3">
        {/* آیکون ارز */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg flex-shrink-0">
          {asset.icon || getCryptoIcon(asset.currency) || '💱'}
        </div>
        <div className="text-left">
          <p className="text-white font-medium">{asset.currency}</p>
          <p className="text-gray-400 text-xs">{getLocalizedName(asset.currency)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{formatCurrency(asset.amount)}</p>
        <p className="text-blue-400 text-xs">${formatCurrency(asset.usdValue || 0)}</p>
        {asset.change24h !== undefined && (
          <span className={`text-xs ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
          </span>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
    </button>
  );
};

export default AssetItem;