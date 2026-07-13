// components/navigation/FloatingChatButton.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { useChatStore } from '../../stores/chatStore';

const FloatingChatButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { unreadCount, fetchUnreadCount } = useChatStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // دریافت تعداد پیام‌های نخوانده هر ۵ ثانیه
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  return (
    <button
      onClick={() => navigate('/chat')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-20 right-4 z-50 bg-purple-600 rounded-full p-4 shadow-2xl hover:bg-purple-700 transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      
      {/* نشانگر تعداد پیام‌های جدید */}
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-1.5 animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
      
      {/* افکت هشدار */}
      {unreadCount > 0 && (
        <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75"></span>
      )}
    </button>
  );
};

export default FloatingChatButton;