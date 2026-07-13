// components/wallet/TotalValue.jsx
const TotalValue = ({ totalValue, dailyInterest, onWithdrawInterest }) => {
  const { t } = useTranslation();
  
  return (
    <div className="p-4">
      <p className="text-gray-400 text-sm">{t('wallet.total_assets')}</p>
      <p className="text-3xl font-bold text-white">${totalValue.toFixed(4)}</p>
      
      <div className="mt-2 bg-gray-800/50 rounded-lg p-3 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs">{t('wallet.daily_interest')} (10% APY)</p>
          <p className="text-green-400 font-medium">${dailyInterest.toFixed(6)}</p>
        </div>
        <button 
          onClick={onWithdrawInterest}
          className="bg-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
        >
          {t('wallet.withdraw')}
        </button>
      </div>
    </div>
  );
};