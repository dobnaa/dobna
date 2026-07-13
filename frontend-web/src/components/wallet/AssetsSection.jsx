// components/wallet/AssetsSection.jsx
import { useState } from 'react';

const AssetsSection = ({ assets, onAssetPress }) => {
  const { t } = useTranslation();
  const [showCrypto, setShowCrypto] = useState(true);
  const [showCurrency, setShowCurrency] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = assets.filter(asset => {
    const matchSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        asset.currency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = (showCrypto && asset.type === 'crypto') || 
                      (showCurrency && asset.type === 'currency');
    return matchSearch && matchType;
  });

  return (
    <div className="px-4 mt-4">
      {/* هدر Assets */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{t('wallet.assets')}</span>
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
        <button className="text-gray-400 text-sm hover:text-white transition">
          {t('wallet.activity')}
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('wallet.search')}
            className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* لیست دارایی‌ها */}
      <div className="space-y-2">
        {filteredAssets.map((asset) => (
          <AssetItem 
            key={asset.currency} 
            asset={asset} 
            onPress={() => onAssetPress(asset.currency)}
          />
        ))}
      </div>
    </div>
  );
};