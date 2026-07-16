// components/community/CommunityMembers.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAvatarUrl } from '../../utils/assetFormatter';
import { Crown, User, Sword, UserPlus } from 'lucide-react';

const CommunityMembers = ({ members, currentUserId, onMemberPress, onFollow, onDuel, isRTL }) => {
  const { t } = useTranslation();

  if (members.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-gray-500">
        <p>{t('community.no_members')}</p>
      </div>
    );
  }

  return (
    <div className="px-4 space-y-1 max-h-[50vh] overflow-y-auto">
      {members.map((member) => {
        const isOwner = member.role === 'owner';
        const isOnline = member.isOnline;
        const isFollowing = member.isFollowing;
        const isCurrentUser = member.id === currentUserId;

        return (
          <div
            key={member.id}
            onClick={() => onMemberPress(member.id)}
            className="bg-gray-800/30 rounded-xl p-3 flex items-center gap-3 hover:bg-gray-700/30 transition cursor-pointer"
          >
            {/* دایره وضعیت */}
            <div className="relative flex-shrink-0">
              <img
                src={member.avatar || getAvatarUrl(member.id)}
                alt={member.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                isOnline ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
            </div>

            {/* اطلاعات */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white font-medium text-sm truncate">{member.username}</p>
                {isOwner && (
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                )}
              </div>
              <p className="text-gray-400 text-xs">
                {isOwner ? t('community.owner') : t('community.member')}
              </p>
            </div>

            {/* دکمه‌ها */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!isCurrentUser && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFollow(member.id);
                    }}
                    className={`px-2 py-1 rounded-lg text-xs transition ${
                      isFollowing 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isFollowing ? t('community.following') : t('community.follow')}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuel(member.id);
                    }}
                    className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
                  >
                    <Sword className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityMembers;