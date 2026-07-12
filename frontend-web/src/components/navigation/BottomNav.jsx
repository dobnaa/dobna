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