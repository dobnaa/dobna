// frontend-web/src/pages/WalletPage.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';  // ✅ اینجا
import { useWalletStore } from '../stores/walletStore';
import { formatCurrency } from '../utils/currencyFormatter';

const WalletPage = () => {
  const { t } = useTranslation();  // ✅ استفاده از i18n
  const { balances, totalValue, fetchBalances } = useWalletStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchBalances();
      setIsLoading(false);
    };
    load();
  }, []);

  if (isLoading) return <div className="text-white p-4">{t('common.loading')}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">{t('wallet.title')}</h1>
      
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <p className="text-gray-400 text-sm">{t('wallet.total_assets')}</p>
        <p className="text-3xl font-bold text-green-400">${formatCurrency(totalValue)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-blue-600 py-3 rounded-xl">{t('wallet.deposit')}</button>
        <button className="bg-red-600 py-3 rounded-xl">{t('wallet.withdraw')}</button>
        <button className="bg-purple-600 py-3 rounded-xl">{t('wallet.swap')}</button>
        <button className="bg-yellow-600 py-3 rounded-xl">{t('wallet.transfer')}</button>
      </div>

      <h2 className="text-gray-400 text-sm mb-2">{t('wallet.assets')}</h2>
      {balances.map((item) => (
        <div key={item.currency} className="bg-gray-800 rounded-xl p-3 mb-2 flex justify-between">
          <div>
            <p className="font-bold">{item.currency}</p>
            <p className="text-gray-400 text-sm">{item.name}</p>
          </div>
          <div className="text-right">
            <p className="text-white">{formatCurrency(item.amount)}</p>
            <p className="text-gray-400 text-sm">${formatCurrency(item.usdValue)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletPage;