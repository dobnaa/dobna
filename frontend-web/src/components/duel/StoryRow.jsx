// components/duel/StoryRow.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAvatarUrl } from '../../utils/avatarGenerator';

const StoryRow = ({ stories, onStoryPress }) => {
  const { t } = useTranslation();

  if (!stories || stories.length === 0) {
    return (
      <div className="px-3 py-2 text-gray-500 text-sm">
        {t('home.no_stories')}
      </div>
    );
  }

  return (
    <div className="flex gap-3 px-3 py-2 overflow-x-auto scrollbar-hide">
      {stories.map((story) => {
        const isDuel = story.type === 'duel';
        const borderColor = isDuel ? 'border-yellow-500' : 'border-purple-500';
        const bgColor = isDuel ? 'bg-yellow-500/20' : 'bg-purple-500/20';

        return (
          <button
            key={story.id}
            onClick={() => onStoryPress(story)}
            className={`flex-shrink-0 w-24 h-32 rounded-2xl border-2 ${borderColor} ${bgColor} p-1 relative hover:scale-105 transition`}
          >
            {/* آواتار سازنده */}
            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden mx-auto mt-1">
              <img src={getAvatarUrl(story.creatorAvatar)} alt="avatar" className="w-full h-full object-cover" />
            </div>
            
            {/* سطح و ارز */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center w-full px-1">
              <p className="text-xs font-bold text-white">
                Level {story.level}
              </p>
              <p className="text-[10px] text-gray-300">
                {story.currency} {story.amount}
              </p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDuel ? 'bg-yellow-600' : 'bg-purple-600'} text-white`}>
                {isDuel ? t('duel.title') : t('challenge.title')}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
export default StoryRow;