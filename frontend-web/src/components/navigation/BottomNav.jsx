// components/navigation/BottomNav.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigationTranslation } from '../../hooks/useTranslation';
import { Home, Wallet, Send, RefreshCw, Trophy, Sword } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useTranslation();
  const { getNavItem } = useNavigationTranslation();

  const iconMap = {
    home: Home,
    duel: Sword,
    challenge: Trophy,
    swap: RefreshCw,
    transfer: Send,
    wallet: Wallet,
  };

  const items = [
    { key: 'home', path: '/' },
    { key: 'duel', path: '/duel' },
    { key: 'challenge', path: '/challenge' },
    { key: 'swap', path: '/swap' },
    { key: 'transfer', path: '/transfer' },
    { key: 'wallet', path: '/wallet' },
  ];

  // دریافت ترجمه‌ها با useNavigationTranslation
  const navItems = items.map((item) => {
    const navItem = getNavItem(item.key);
    return {
      ...item,
      label: navItem.label,
    };
  });

  // بررسی مسیر فعال
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around py-2 z-50">
      {navItems.map((item) => {
        const IconComponent = iconMap[item.key];
        const active = isActive(item.path);

        return (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center transition ${
              active ? 'text-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <IconComponent 
              className={`w-5 h-5 ${active ? 'text-purple-400' : 'text-gray-400'}`} 
            />
            <span className={`text-[10px] mt-1 ${active ? 'text-purple-400' : 'text-gray-400'}`}>
              {item.label}
            </span>
            {active && (
              <span className="absolute -top-0.5 w-6 h-0.5 bg-purple-400 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;