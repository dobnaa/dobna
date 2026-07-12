// pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCommunityStore } from '../stores/communityStore';
import { useStoryStore } from '../stores/storyStore';
import { useBalanceStore } from '../stores/balanceStore';
import { useGameStore } from '../stores/gameStore';

// کامپوننت‌ها
import HeaderLeft from '../components/home/HeaderLeft';      // آواتار گروه + نام + تیک
import SearchBar from '../components/shared/SearchBar';      // نوار جستجو
import BalanceBox from '../components/shared/BalanceBox';    // باکس قیمت/موجودی
import HeaderRight from '../components/home/HeaderRight';    // DOBNA لوگو + منو + اشتراک
import StoryRow from '../components/duel/StoryRow';          // استوری‌ها
import LevelGrid from '../components/game/LevelGrid';        // ۴ تالار سطح
import FloatingChatButton from '../components/navigation/FloatingChatButton';
import BottomNav from '../components/navigation/BottomNav';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentCommunity, fetchCommunity } = useCommunityStore();
  const { stories, fetchStories } = useStoryStore();
  const { balances, fetchBalances } = useBalanceStore();
  const { levels, fetchLevels } = useGameStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchCommunity(user?.currentCommunityId),
        fetchStories(),
        fetchBalances(user?.id),
        fetchLevels(user?.currentCommunityId),
      ]);
      setIsLoading(false);
    };
    if (user) loadData();
  }, [user]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* هدر: ترکیب ۳ بخش */}
      <div className="flex items-start justify-between p-3 bg-gray-800/50 border-b border-gray-700">
        {/* سمت چپ: آواتار + نام گروه */}
        <HeaderLeft community={currentCommunity} />
        
        {/* وسط: نوار جستجو + باکس قیمت */}
        <div className="flex-1 mx-2 space-y-1">
          <SearchBar 
            onPress={() => navigate('/communities')} 
            placeholder={t('home.search_placeholder')}
          />
          <BalanceBox 
            balances={balances}
            currentCurrency={currentCommunity?.currency}
            onCurrencyChange={(currency) => {
              // تغییر ارز و گروه
              navigate(`/community/${currency}`);
            }}
          />
        </div>
        
        {/* سمت راست: لوگو + منو */}
        <HeaderRight 
          onLogoClick={() => navigate('/matrix')}
          onShare={() => {/* اشتراک لینک */}}
          onMenuClick={() => navigate('/profile')}
        />
      </div>

      {/* استوری‌های دوئل و چالش */}
      <div className="mt-2">
        <StoryRow 
          stories={stories} 
          onStoryPress={(story) => {
            if (story.type === 'duel') navigate(`/duel/${story.id}`);
            else navigate(`/challenge/${story.id}`);
          }}
        />
      </div>

      {/* تالارهای ۴ سطحی */}
      <div className="px-3 mt-3">
        <LevelGrid 
          levels={levels}
          communityId={currentCommunity?.id}
          onLevelPress={(level) => navigate(`/game-room/${currentCommunity.id}/${level}`)}
        />
      </div>

      {/* دکمه شناور چت */}
      <FloatingChatButton unreadCount={5} onPress={() => navigate('/chat')} />

      {/* فوتر (منوی پایین) */}
      <BottomNav />
    </div>
  );
};

export default HomePage;