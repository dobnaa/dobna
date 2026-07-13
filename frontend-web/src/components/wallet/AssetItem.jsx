// components/wallet/AssetItem.jsx
import { ChevronRight } from 'lucide-react';

const AssetItem = ({ asset, onPress }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  const getLocalizedName = (currency) => {
    const names = {
      BTC: { en: 'Bitcoin', fa: 'بیت‌کوین' },
      ETH: { en: 'Ethereum', fa: 'اتریوم' },
      USDT: { en: 'Tether', fa: 'تتر' },
      USD: { en: 'US Dollar', fa: 'دلار آمریکا' },
      IRT: { en: 'Iranian Toman', fa: 'تومان ایران' },
      // ... بقیه ارزها
    };
    return names[currency]?.[isRTL ? 'fa' : 'en'] || currency;
  };

  return (
    <button
      onClick={onPress}
      className="w-full bg-gray-800/30 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/30 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
          {asset.icon || '💱'}
        </div>
        <div className="text-left">
          <p className="text-white font-medium">{asset.currency}</p>
          <p className="text-gray-400 text-xs">{getLocalizedName(asset.currency)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{asset.amount.toFixed(6)}</p>
        <p className="text-blue-400 text-xs">${asset.usdValue.toFixed(2)}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-500" />
    </button>
  );
};