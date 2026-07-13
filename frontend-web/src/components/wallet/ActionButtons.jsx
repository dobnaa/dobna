// components/wallet/ActionButtons.jsx
import { ArrowUp, ArrowDown, RefreshCw, Send } from 'lucide-react';

const ActionButtons = ({ onDeposit, onWithdraw, onSwap, onTransfer }) => {
  const { t } = useTranslation();
  
  const actions = [
    { key: 'deposit', icon: ArrowUp, label: t('wallet.deposit'), onClick: onDeposit },
    { key: 'withdraw', icon: ArrowDown, label: t('wallet.withdraw'), onClick: onWithdraw },
    { key: 'swap', icon: RefreshCw, label: t('wallet.swap'), onClick: onSwap },
    { key: 'transfer', icon: Send, label: t('wallet.transfer'), onClick: onTransfer },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 px-4">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={action.onClick}
          className="bg-gray-800/50 rounded-xl py-3 flex flex-col items-center hover:bg-gray-700/50 transition"
        >
          <action.icon className="w-5 h-5 text-white" />
          <span className="text-xs text-gray-300 mt-1">{action.label}</span>
        </button>
      ))}
    </div>
  );
};