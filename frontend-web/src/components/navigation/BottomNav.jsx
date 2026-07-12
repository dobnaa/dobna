// components/navigation/BottomNav.jsx
import { Home, Wallet, Send, RefreshCw, Trophy, Sword } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="flex justify-around p-4">
      <Home className="w-6 h-6 text-white" />
      <Wallet className="w-6 h-6 text-white" />
      <Send className="w-6 h-6 text-white" />
      <RefreshCw className="w-6 h-6 text-white" />
      <Trophy className="w-6 h-6 text-white" />
      <Sword className="w-6 h-6 text-white" />
    </div>
  );
};

import { useNavigate } from 'react-router-dom';
import { WalletIcon, TransferIcon, ExchangeIcon, TrophyIcon, SwordIcon } from '../icons';

const BottomNav = () => {
  const navigate = useNavigate();
  const items = [
    { key: 'wallet', label: 'کیف پول', icon: WalletIcon, path: '/wallet' },
    { key: 'transfer', label: 'انتقال', icon: TransferIcon, path: '/transfer' },
    { key: 'exchange', label: 'تبدیل', icon: ExchangeIcon, path: '/exchange' },
    { key: 'challenge', label: 'چالش', icon: TrophyIcon, path: '/challenge' },
    { key: 'duel', label: 'دوئل', icon: SwordIcon, path: '/duel' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around py-2">
      {items.map((item) => (
        <button key={item.key} onClick={() => navigate(item.path)} className="flex flex-col items-center text-gray-400 hover:text-white">
          <item.icon className="w-6 h-6" />
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};