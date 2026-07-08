import React, { useEffect, useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useNavigate } from 'react-router-dom';

const FloatingChatButton = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { getUnreadMessages } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    // دریافت تعداد پیام‌های نخوانده (هر ۵ ثانیه یا از طریق Realtime)
    const fetchUnread = async () => {
      const count = await getUnreadMessages();
      setUnreadCount(count);
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-20 right-4 z-50 bg-blue-600 rounded-full p-4 shadow-2xl hover:bg-blue-700 transition-all"
    >
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
};
export default FloatingChatButton;