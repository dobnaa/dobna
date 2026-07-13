// frontend-web/src/components/navigation/BottomNav.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Wallet, Send, RefreshCw, Trophy, Sword } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items = [
    { key: 'home', label: t('nav.home'), icon: Home, path: '/' },
    { key: 'duel', label: t('nav.duel'), icon: Sword, path: '/duel' },
    { key: 'challenge', label: t('nav.challenge'), icon: Trophy, path: '/challenge' },
    { key: 'swap', label: t('nav.swap'), icon: RefreshCw, path: '/swap' },
    { key: 'transfer', label: t('nav.transfer'), icon: Send, path: '/transfer' },
    { key: 'wallet', label: t('nav.wallet'), icon: Wallet, path: '/wallet' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around py-2 z-50">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center text-gray-400 hover:text-white transition"
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
export default BottomNav;