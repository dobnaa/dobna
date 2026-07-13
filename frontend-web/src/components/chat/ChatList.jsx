// components/chat/ChatList.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAvatarUrl } from '../../utils/avatarGenerator';
import { formatTimeAgo } from '../../utils/timeFormatter';

const ChatList = ({ conversations, onConversationPress }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  if (conversations.length === 0) {
    return (
      <div className="bg-gray-800/30 rounded-xl p-8 text-center text-gray-500">
        <p className="text-lg mb-2">💬</p>
        <p>{t('chat.no_conversations')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conv) => {
        const isUnread = conv.unreadCount > 0;
        const isActive = conv.status === 'active';
        const isDuelOrChallenge = ['duel', 'challenge'].includes(conv.type);

        return (
          <button
            key={conv.id}
            onClick={() => onConversationPress(conv)}
            className={`w-full bg-gray-800/30 rounded-xl p-3 flex items-center gap-3 hover:bg-gray-700/30 transition border ${
              isUnread ? 'border-purple-500/30' : 'border-transparent'
            }`}
          >
            {/* آواتار */}
            <div className="relative flex-shrink-0">
              <img
                src={conv.avatar || getAvatarUrl(conv.avatarId)}
                alt={conv.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {isActive && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
              )}
              {conv.type === 'group' && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] rounded-full px-1">
                  {conv.memberCount}
                </span>
              )}
            </div>

            {/* اطلاعات */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium truncate ${isUnread ? 'text-white' : 'text-gray-300'}`}>
                  {conv.name}
                </p>
                <span className="text-[10px] text-gray-500 flex-shrink-0">
                  {formatTimeAgo(conv.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-xs truncate ${isUnread ? 'text-gray-300' : 'text-gray-500'}`}>
                  {conv.lastMessage}
                </p>
                {isUnread && (
                  <span className="bg-green-500 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 flex-shrink-0">
                    {conv.unreadCount > 99 ? '99+' : conv.unreadCount}
                  </span>
                )}
                {isDuelOrChallenge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    conv.type === 'duel' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {conv.type === 'duel' ? '⚔️' : '🏆'}
                  </span>
                )}
              </div>
            </div>

            {/* دکمه بازدید برای دوئل/چالش */}
            {isDuelOrChallenge && conv.type === 'duel' && (
              <div className="flex-shrink-0 text-right">
                <span className="text-xs text-gray-500">{conv.remainingTime || '--:--'}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onConversationPress(conv);
                  }}
                  className="block mt-1 text-[10px] bg-purple-600 px-2 py-0.5 rounded hover:bg-purple-700 transition"
                >
                  {t('chat.view')}
                </button>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;