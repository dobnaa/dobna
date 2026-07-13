// frontend-web/src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCommunityStore } from '../stores/communityStore';
import { useStoryStore } from '../stores/storyStore';
import { useGameStore } from '../stores/gameStore';
import HeaderLeft from '../components/home/HeaderLeft';
import SearchBar from '../components/shared/SearchBar';
import BalanceBox from '../components/shared/BalanceBox';
import HeaderRight from '../components/home/HeaderRight';
import StoryRow from '../components/duel/StoryRow';
import LevelGrid from '../components/game/LevelGrid';
import FloatingChatButton from '../components/navigation/FloatingChatButton';
import BottomNav from '../components/navigation/BottomNav';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentCommunity, fetchCommunity } = useCommunityStore();
  const { stories, fetchStories } = useStoryStore();
  const { levels, fetchLevels } = useGameStore();

  useEffect(() => {
    if (user) {
      fetchCommunity(user.currentCommunityId);
      fetchStories();
      fetchLevels(user.currentCommunityId);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* هدر */}
      <div className="flex items-start justify-between p-3 bg-gray-800/50 border-b border-gray-700">
        <HeaderLeft community={currentCommunity} />
        <div className="flex-1 mx-2 space-y-1">
          <SearchBar onPress={() => navigate('/communities')} />
          <BalanceBox 
            balances={user?.balances} 
            currentCurrency={currentCommunity?.currency}
            onCurrencyChange={(currency) => navigate(`/community/${currency}`)}
          />
        </div>
        <HeaderRight 
          onLogoClick={() => navigate('/matrix')}
          onShare={() => {/* اشتراک لینک */}}
          onMenuClick={() => navigate('/profile')}
        />
      </div>

      {/* استوری‌ها */}
      <StoryRow stories={stories} onStoryPress={(story) => navigate(`/${story.type}/${story.id}`)} />

      {/* تالارهای ۴ سطحی */}
      <LevelGrid levels={levels} onLevelPress={(level) => navigate(`/game-room/${currentCommunity.id}/${level}`)} />

      {/* دکمه شناور چت */}
      <FloatingChatButton unreadCount={5} onPress={() => navigate('/chat')} />

      {/* فوتر */}
      <BottomNav />
    </div>
  );
};
export default HomePage;