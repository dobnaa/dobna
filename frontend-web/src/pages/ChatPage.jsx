// pages/ChatPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { useChatStore } from '../stores/chatStore';
import { useStoryStore } from '../stores/storyStore';
import {
  ArrowLeft,
  Users,
  User,
  Trophy,
  Sword,
  Bell,
  MessageCircle,
  Search,
  X,
} from 'lucide-react';

// کامپوننت‌ها
import AdminStatus from '../components/chat/AdminStatus';
import StoryRow from '../components/duel/StoryRow';
import ChatList from '../components/chat/ChatList';

// ======================================================
// لیست تب‌ها
// ======================================================
const TABS = [
  { key: 'all', labelKey: 'chat.all', icon: null },
  { key: 'personal', labelKey: 'chat.personal', icon: User },
  { key: 'groups', labelKey: 'chat.groups', icon: Users },
  { key: 'duels', labelKey: 'chat.duels', icon: Sword },
  { key: 'challenges', labelKey: 'chat.challenges', icon: Trophy },
];

const TYPE_MAP = {
  personal: 'private',
  groups: 'group',
  duels: 'duel',
  challenges: 'challenge',
};

// ======================================================
// صفحه اصلی چت
// ======================================================
const ChatPage = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const { user } = useAuth();
  const {
    conversations,
    unreadCount,
    fetchConversations,
    markAllAsRead,
    isLoading: isChatLoading,
    error,
  } = useChatStore();
  const { stories, fetchStories, isLoading: isStoryLoading } = useStoryStore();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ======================================================
  // بارگذاری اولیه
  // ======================================================
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchConversations(user?.id),
          fetchStories(),
        ]);
      } catch (err) {
        console.error('Error loading chat data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) loadData();
  }, [user, fetchConversations, fetchStories]);

  // ======================================================
  // فیلتر مکالمات بر اساس تب و جستجو
  // ======================================================
  const filteredConversations = useMemo(() => {
    // کپی آرایه گرفته می‌شود تا state اصلی chatStore دستکاری (mutate) نشود
    let result = [...(conversations || [])];

    // فیلتر بر اساس تب
    if (activeTab !== 'all') {
      result = result.filter((conv) => conv.type === TYPE_MAP[activeTab]);
    }

    // فیلتر بر اساس جستجو
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((conv) =>
        conv.name?.toLowerCase().includes(query) ||
        conv.username?.toLowerCase().includes(query) ||
        conv.lastMessage?.toLowerCase().includes(query)
      );
    }

    // مرتب‌سازی بر اساس آخرین پیام (جدیدترین اول)
    result.sort((a, b) =>
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    return result;
  }, [conversations, activeTab, searchQuery]);

  // ======================================================
  // تعداد پیام‌های نخوانده برای هر تب
  // ======================================================
  const getUnreadCount = useCallback((tabKey) => {
    // محافظت در برابر conversations نامعتبر/undefined در اولین رندرها
    const list = conversations || [];

    if (tabKey === 'all') {
      return list.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);
    }
    return list
      .filter((conv) => conv.type === TYPE_MAP[tabKey])
      .reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);
  }, [conversations]);

  // ======================================================
  // هندلر کلیک روی مکالمه
  // ======================================================
  const handleConversationPress = useCallback((conv) => {
    switch (conv.type) {
      case 'group':
        navigate(`/chat/group/${conv.id}`);
        break;
      case 'private':
        navigate(`/chat/private/${conv.id}`);
        break;
      case 'duel':
        navigate(`/duel/${conv.id}`);
        break;
      case 'challenge':
        navigate(`/challenge/${conv.id}`);
        break;
      default:
        break;
    }
  }, [navigate]);

  // ======================================================
  // هندلر کلیک روی استوری
  // ======================================================
  const handleStoryPress = useCallback((story) => {
    if (story.type === 'duel') {
      navigate(`/duel/${story.id}`);
    } else {
      navigate(`/challenge/${story.id}`);
    }
  }, [navigate]);

  // ======================================================
  // رندر لودینگ
  // ======================================================
  if (isLoading || isChatLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // ======================================================
  // رندر اصلی
  // ======================================================
  return (
    <div
      className="min-h-screen bg-gray-900 text-white pb-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ===== هدر ===== */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* فلش برگشت */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
          >
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
              onStoryPress={handleStoryPress}
              horizontal
              showLabels={false}
              isRTL={isRTL}
            />
          </div>

          {/* دکمه جستجو */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700 flex-shrink-0"
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>

        {/* نوار جستجو (در صورت فعال بودن) */}
        {showSearch && (
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('chat.search_placeholder')}
              className="w-full bg-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===== تب‌ها ===== */}
      <div className="border-b border-gray-700 overflow-x-auto">
        <div className="flex px-4 gap-1 min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const unread = getUnreadCount(tab.key);
            const IconComponent = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium transition-all relative flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                {t(tab.labelKey)}
                {unread > 0 && (
                  <span className={`text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
                    isActive ? 'ring-2 ring-purple-400' : ''
                  }`}>
                    {unread > 99 ? '99+' : unread}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== لیست مکالمات ===== */}
      <div className="p-4">
        {filteredConversations.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {searchQuery ? t('chat.no_search_results') : t('chat.no_conversations')}
            </p>
            {!searchQuery && (
              <p className="text-gray-500 text-sm mt-1">{t('chat.start_conversation')}</p>
            )}
          </div>
        ) : (
          <ChatList
            conversations={filteredConversations}
            onConversationPress={handleConversationPress}
            isRTL={isRTL}
          />
        )}

        {/* نمایش تعداد کل پیام‌های نخوانده */}
        {unreadCount > 0 && (
          <div className="mt-4 flex items-center justify-between bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">
                {t('chat.unread_messages', { count: unreadCount })}
              </span>
            </div>
            <button
              onClick={markAllAsRead}
              className="text-purple-400 text-sm hover:text-purple-300 transition"
            >
              {t('chat.mark_all_read')}
            </button>
          </div>
        )}

        {/* خطا */}
        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
