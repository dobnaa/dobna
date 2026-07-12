// components/shared/BalanceBox.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, RefreshCw, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyFormatter';

const BalanceBox = ({ balances, currentCurrency, onCurrencyChange }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentBalance = balances?.find(b => b.currency === currentCurrency);
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  return (
    <div className="relative">
      {/* باکس اصلی */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700/50 rounded-xl px-4 py-2 flex items-center justify-between hover:bg-gray-600/50 transition"
      >
        {/* سمت چپ: آیکون تبدیل */}
        <RefreshCw className="w-4 h-4 text-gray-400" />
        
        {/* وسط: موجودی و ارز */}
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row' : 'flex-row'}`}>
          <span className="text-white font-bold">
            {formatCurrency(currentBalance?.amount || 0)}
          </span>
          <span className="text-gray-300 text-sm">{currentCurrency}</span>
          <span className="text-gray-500 text-xs">${formatCurrency(currentBalance?.usdValue || 0)}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        
        {/* سمت راست: آیکون ارز */}
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
          {currentCurrency?.slice(0, 2)}
        </div>
      </button>

      {/* دراپ‌داون لیست ارزها */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-h-60 overflow-y-auto">
          {balances?.map((item) => (
            <button
              key={item.currency}
              onClick={() => {
                onCurrencyChange(item.currency);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon || '💱'}</span>
                <span className="text-white">{item.currency}</span>
              </div>
              <div className="text-right">
                <span className="text-white">{formatCurrency(item.amount)}</span>
                <span className="text-gray-400 text-xs ml-2">${formatCurrency(item.usdValue)}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default BalanceBox;