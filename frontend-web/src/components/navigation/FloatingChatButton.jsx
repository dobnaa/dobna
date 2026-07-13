// frontend-web/src/components/navigation/FloatingChatButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const FloatingChatButton = ({ unreadCount = 0, onPress }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-20 right-4 z-50 bg-purple-600 rounded-full p-4 shadow-2xl hover:bg-purple-700 transition"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
};
export default FloatingChatButton;