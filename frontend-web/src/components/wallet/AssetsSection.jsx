// components/wallet/AssetsSection.jsx
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AssetItem from './AssetItem';
import TransactionItem from './TransactionItem';
import { Search } from 'lucide-react';

const AssetsSection = ({ assets = [], onAssetPress, transactions = [] }) => {
  const { t } = useTranslation();
  const [showCrypto, setShowCrypto] = useState(true);
  const [showCurrency, setShowCurrency] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActivity, setShowActivity] = useState(false);

  // لیست ارزهای کریپتو و فیات
  const cryptoList = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE', 'HMSTR'];
  const currencyList = ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CAD', 'CHF', 'AUD', 'INR', 'CNY'];

  // فیلتر دارایی‌ها
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const isCrypto = cryptoList.includes(asset.currency);
      const isCurrency = currencyList.includes(asset.currency);
      
      const matchType = (showCrypto && isCrypto) || (showCurrency && isCurrency);
      const matchSearch = asset.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (asset.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchType && matchSearch;
    });
  }, [assets, showCrypto, showCurrency, searchTerm]);

  // فیلتر تراکنش‌ها
  const filteredTransactions = useMemo(() => {
    if (!showActivity) return [];
    return transactions.slice(0, 10);
  }, [transactions, showActivity]);

  return (
    <div className="px-4 mt-6">
      {/* هدر Assets */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm font-medium">{t('wallet.assets')}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setShowCrypto(!showCrypto)}
            className={`px-3 py-1 rounded-lg text-xs transition ${
              showCrypto ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            Crypto
          </button>
          <button
            onClick={() => setShowCurrency(!showCurrency)}
            className={`px-3 py-1 rounded-lg text-xs transition ${
              showCurrency ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            Currency
          </button>
        </div>
      </div>

      {/* نوار جستجو و Activity */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setShowActivity(!showActivity)}
          className={`px-3 py-1 rounded-lg text-xs transition ${
            showActivity ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
          }`}
        >
          {t('wallet.activity')}
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('wallet.search')}
            className="w-full bg-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* لیست دارایی‌ها */}
      <div className="space-y-2">
        {filteredAssets.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl p-6 text-center text-gray-500 text-sm">
            {t('wallet.no_assets')}
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <AssetItem
              key={asset.currency}
              asset={asset}
              onPress={() => onAssetPress(asset.currency)}
            />
          ))
        )}
      </div>

      {/* لیست فعالیت‌ها */}
      {showActivity && (
        <div className="mt-4">
          <h3 className="text-gray-400 text-sm mb-2">{t('wallet.recent_activity')}</h3>
          <div className="space-y-1">
            {filteredTransactions.length === 0 ? (
              <div className="bg-gray-800/30 rounded-xl p-4 text-center text-gray-500 text-sm">
                {t('wallet.no_transactions')}
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <TransactionItem key={tx.id || tx.tx_id} tx={tx} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetsSection;