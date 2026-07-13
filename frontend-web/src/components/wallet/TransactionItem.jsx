// components/wallet/TransactionItem.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyFormatter';

const TransactionItem = ({ tx }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  const getTypeLabel = (type) => {
    const labels = {
      deposit: { en: 'Deposit', fa: 'واریز' },
      withdraw: { en: 'Withdraw', fa: 'برداشت' },
      swap: { en: 'Swap', fa: 'تبدیل' },
      transfer: { en: 'Transfer', fa: 'انتقال' },
      duel_win: { en: 'Duel Win', fa: 'برد دوئل' },
      challenge_win: { en: 'Challenge Win', fa: 'برد چالش' },
      game_win: { en: 'Game Win', fa: 'برد بازی' },
      duel_create: { en: 'Duel Create', fa: 'ایجاد دوئل' },
      challenge_create: { en: 'Challenge Create', fa: 'ایجاد چالش' },
      duel_refund: { en: 'Duel Refund', fa: 'بازگشت دوئل' },
      interest: { en: 'Interest', fa: 'سود' },
    };
    return labels[type]?.[isRTL ? 'fa' : 'en'] || type;
  };

  const isPositive = ['deposit', 'duel_win', 'challenge_win', 'game_win', 'duel_refund', 'interest'].includes(tx.type);
  const isNegative = ['withdraw', 'swap', 'transfer', 'duel_create', 'challenge_create'].includes(tx.type);

  return (
    <div className="bg-gray-800/30 rounded-xl p-3 flex items-center justify-between border-b border-gray-700/20">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isPositive ? 'bg-green-500/20' : isNegative ? 'bg-red-500/20' : 'bg-gray-500/20'
        }`}>
          {isPositive ? <ArrowUp className="w-4 h-4 text-green-400" /> : 
           isNegative ? <ArrowDown className="w-4 h-4 text-red-400" /> : 
           <Clock className="w-4 h-4 text-gray-400" />}
        </div>
        <div className="text-left">
          <p className="text-white text-sm font-medium">{getTypeLabel(tx.type)}</p>
          <p className="text-gray-500 text-xs">{tx.description || tx.tx_id?.slice(0, 12)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-white'}`}>
          {isPositive ? '+' : ''}{formatCurrency(tx.amount)} {tx.currency}
        </p>
        <p className="text-gray-500 text-[10px]">
          {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : ''}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;