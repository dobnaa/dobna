// pages/ChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useChatStore } from '../stores/chatStore';
import { useStoryStore } from '../stores/storyStore';
import { ArrowLeft, Users, User, Trophy, Sword, Bell } from 'lucide-react';

// کامپوننت‌ها
import AdminStatus from '../components/chat/AdminStatus';
import StoryRow from '../components/duel/StoryRow';
import ChatList from '../components/chat/ChatList';

const ChatPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { 
    conversations, 
    unreadCount, 
    fetchConversations,
    markAllAsRead 
  } = useChatStore();
  const { stories, fetchStories } = useStoryStore();
  
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'personal', 'groups', 'duels', 'challenges'
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchConversations(user?.id),
        fetchStories(),
      ]);
      setIsLoading(false);
    };
    if (user) loadData();
  }, [user]);

  // فیلتر مکالمات بر اساس تب فعال
  const filteredConversations = conversations.filter(conv => {
    if (activeTab === 'all') return true;
    if (activeTab === 'personal') return conv.type === 'private';
    if (activeTab === 'groups') return conv.type === 'group';
    if (activeTab === 'duels') return conv.type === 'duel';
    if (activeTab === 'challenges') return conv.type === 'challenge';
    return true;
  });

  const tabs = [
    { key: 'all', label: t('chat.all'), icon: null },
    { key: 'personal', label: t('chat.personal'), icon: <User className="w-4 h-4" /> },
    { key: 'groups', label: t('chat.groups'), icon: <Users className="w-4 h-4" /> },
    { key: 'duels', label: t('chat.duels'), icon: <Sword className="w-4 h-4" /> },
    { key: 'challenges', label: t('chat.challenges'), icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* فلش برگشت */}
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* جداکننده */}
          <div className="w-px h-8 bg-gray-600"></div>
          
          {/* دایره وضعیت ادمین */}
          <AdminStatus />
          
          {/* جداکننده */}
          <div className="w-px h-8 bg-gray-600"></div>
          
          {/* استوری‌های چالش و دوئل */}
          <div className="flex-1 overflow-hidden">
            <StoryRow 
              stories={stories} 
              onStoryPress={(story) => {
                if (story.type === 'duel') navigate(`/duel/${story.id}`);
                else navigate(`/challenge/${story.id}`);
              }}
              horizontal
              showLabels={false}
            />
          </div>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="border-b border-gray-700 overflow-x-auto">
        <div className="flex px-4 gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-all relative flex items-center gap-1.5 ${
                activeTab === tab.key 
                  ? 'text-purple-400' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* لیست مکالمات */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <ChatList 
            conversations={filteredConversations}
            onConversationPress={(conv) => {
              if (conv.type === 'group') navigate(`/chat/group/${conv.id}`);
              else if (conv.type === 'private') navigate(`/chat/private/${conv.id}`);
              else if (conv.type === 'duel') navigate(`/duel/${conv.id}`);
              else if (conv.type === 'challenge') navigate(`/challenge/${conv.id}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;