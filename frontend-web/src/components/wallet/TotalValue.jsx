// components/wallet/TotalValue.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/currencyFormatter';

const TotalValue = ({ totalValue, dailyInterest, showBalance, onWithdrawInterest }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      {/* ارزش کل */}
      <p className="text-gray-400 text-sm">{t('wallet.total_assets')}</p>
      <p className="text-3xl font-bold text-white">
        {showBalance ? `$${formatCurrency(totalValue)}` : '••••••'}
      </p>

      {/* سود روزانه */}
      <div className="mt-3 bg-gray-800/50 rounded-xl p-3 flex items-center justify-between border border-green-500/20">
        <div>
          <p className="text-gray-400 text-xs">{t('wallet.daily_interest')} (10% APY)</p>
          <p className="text-green-400 font-medium">
            {showBalance ? `$${formatCurrency(dailyInterest)}` : '••••••'}
          </p>
        </div>
        <button
          onClick={onWithdrawInterest}
          className="bg-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          {t('wallet.withdraw')}
        </button>
      </div>
    </div>
  );
};

export default TotalValue;