// pages/GroupChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useChatStore } from '../stores/chatStore';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Send, Pin, MoreVertical, Users } from 'lucide-react';
import { getAvatarUrl } from '../../utils/avatarGenerator';
import StoryRow from '../components/duel/StoryRow';
import { formatTimeAgo } from '../../utils/timeFormatter';

const GroupChatPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { 
    messages, 
    groupInfo, 
    groupStories,
    sendMessage,
    fetchGroupMessages,
    fetchGroupInfo,
    fetchGroupStories,
    pinMessage,
    markMessagesAsRead
  } = useChatStore();
  
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchGroupInfo(groupId),
        fetchGroupMessages(groupId),
        fetchGroupStories(groupId),
      ]);
      markMessagesAsRead(groupId);
      setIsLoading(false);
    };
    loadData();
    
    // اتصال به Realtime برای دریافت پیام‌های جدید
    const subscription = subscribeToGroupMessages(groupId);
    return () => subscription.unsubscribe();
  }, [groupId]);

  // اسکرول به پایین با هر پیام جدید
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(groupId, newMessage, 'group');
    setNewMessage('');
  };

  const handlePinMessage = async (messageId) => {
    await pinMessage(groupId, messageId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const pinnedMessages = messages.filter(m => m.isPinned);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={groupInfo?.avatar || getAvatarUrl('group')}
          alt={groupInfo?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-medium text-sm">{groupInfo?.name}</p>
          <p className="text-xs text-gray-400">
            {groupInfo?.memberCount} {t('chat.members')} • {groupInfo?.onlineCount} {t('chat.online')}
          </p>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Users className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* استوری‌های دوئل و چالش داخل گروه */}
      {groupStories.length > 0 && (
        <div className="bg-gray-800/30 p-2 border-b border-gray-700">
          <StoryRow 
            stories={groupStories}
            onStoryPress={(story) => {
              if (story.type === 'duel') navigate(`/duel/${story.id}`);
              else navigate(`/challenge/${story.id}`);
            }}
            compact
          />
        </div>
      )}

      {/* پیام‌های سنجاق‌شده */}
      {pinnedMessages.length > 0 && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-2">
          <p className="text-xs text-yellow-400 flex items-center gap-1">
            <Pin className="w-3 h-3" /> {t('chat.pinned_messages')}
          </p>
          {pinnedMessages.map((msg) => (
            <div key={msg.id} className="text-sm text-gray-300 truncate">
              {msg.senderName}: {msg.content}
            </div>
          ))}
        </div>
      )}

      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isOwn = msg.senderId === user?.id;
          const isPinned = msg.isPinned;

          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${isOwn ? 'order-2' : 'order-1'}`}>
                {!isOwn && (
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={msg.senderAvatar || getAvatarUrl(msg.senderId)}
                      alt={msg.senderName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-gray-400">{msg.senderName}</span>
                  </div>
                )}
                <div
                  className={`rounded-2xl p-3 ${
                    isOwn
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-white rounded-bl-none'
                  } ${isPinned ? 'border-2 border-yellow-400/50' : ''}`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-[10px] opacity-70">
                      {formatTimeAgo(msg.createdAt)}
                    </span>
                    {isPinned && <Pin className="w-3 h-3 text-yellow-400" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ورودی پیام */}
      <div className="bg-gray-800/50 border-t border-gray-700 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('chat.write_message')}
            className="flex-1 bg-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-purple-600 rounded-full p-2.5 hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatPage;