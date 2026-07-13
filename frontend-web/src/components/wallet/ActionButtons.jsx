// components/wallet/ActionButtons.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown, RefreshCw, Send } from 'lucide-react';

const ActionButtons = ({ onDeposit, onWithdraw, onSwap, onTransfer }) => {
  const { t } = useTranslation();

  const actions = [
    { key: 'deposit', icon: ArrowUp, label: t('wallet.deposit'), onClick: onDeposit, color: 'bg-blue-600' },
    { key: 'withdraw', icon: ArrowDown, label: t('wallet.withdraw'), onClick: onWithdraw, color: 'bg-red-600' },
    { key: 'swap', icon: RefreshCw, label: t('wallet.swap'), onClick: onSwap, color: 'bg-purple-600' },
    { key: 'transfer', icon: Send, label: t('wallet.transfer'), onClick: onTransfer, color: 'bg-yellow-600' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 px-4">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={action.onClick}
          className={`${action.color} rounded-xl py-3 flex flex-col items-center hover:opacity-90 transition`}
        >
          <action.icon className="w-5 h-5" />
          <span className="text-xs mt-1">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;