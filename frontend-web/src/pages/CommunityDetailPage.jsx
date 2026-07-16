// pages/CommunityDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCommunityStore } from '../stores/communityStore';
import { useAuth } from '../hooks/useAuth';
import { 
  ArrowLeft, 
  MoreVertical, 
  Star, 
  Flag, 
  LogOut, 
  Copy, 
  Share2, 
  MessageCircle, 
  Search,
  Plus,
  Sword,
  Users,
  User,
  Crown
} from 'lucide-react';
import { getAvatarUrl, getCryptoIcon } from '../utils/assetMapper';
import { formatCurrency, formatCompactNumber } from '../utils/currencyFormatter';

// کامپوننت‌ها
import CommunityStats from '../components/community/CommunityStats';
import CommunityMembers from '../components/community/CommunityMembers';
import CommunityActions from '../components/community/CommunityActions';

const CommunityDetailPage = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { 
    currentCommunity, 
    members, 
    isLoading,
    fetchCommunityDetail,
    fetchMembers,
    toggleFavorite,
    joinCommunity,
    leaveCommunity
  } = useCommunityStore();

  const [showMenu, setShowMenu] = useState(false);
  const [searchMember, setSearchMember] = useState('');
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'online', 'mutual'
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';
  const isOwner = user?.id === currentCommunity?.owner_id;

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchCommunityDetail(communityId),
        fetchMembers(communityId),
      ]);
    };
    loadData();
  }, [communityId]);

  if (isLoading || !currentCommunity) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const filteredMembers = members.filter(m => 
    m.username.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={currentCommunity.avatar || getAvatarUrl(currentCommunity.id)}
                alt={currentCommunity.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-medium">{currentCommunity.name}</p>
                  {currentCommunity.isVerified && (
                    <span className="text-blue-400 text-xs">✓</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white relative"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* منوی عمودی (۴ نقطه) */}
        {showMenu && (
          <div className="absolute right-4 mt-2 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-20 min-w-[200px]">
            {isOwner ? (
              // منوی مالک
              <>
                <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700">
                  <Star className="w-4 h-4" /> {t('community.edit_avatar')}
                </button>
                <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700">
                  <Star className="w-4 h-4" /> {t('community.edit_name')}
                </button>
                <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700">
                  <Star className="w-4 h-4" /> {t('community.edit_username')}
                </button>
                <button className="w-full px-4 py-3 text-left text-blue-400 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700">
                  <Award className="w-4 h-4" /> {t('community.create_lottery')}
                </button>
                <button className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> {t('community.delete_group')}
                </button>
                <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-700">
                  {t('community.total_bmc')}: {formatCurrency(currentCommunity.bmcAmount)} {currentCommunity.currency}
                </div>
              </>
            ) : (
              // منوی کاربر عادی
              <>
                <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700">
                  <Star className="w-4 h-4" /> {t('community.favorite_group')}
                </button>
                <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700">
                  <Flag className="w-4 h-4" /> {t('community.report_group')}
                </button>
                <button className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> {t('community.leave_group')}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* اطلاعات گروه */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-400 text-sm">
              {currentCommunity.memberCount} {t('community.members')}
              <span className="mx-2">•</span>
              {currentCommunity.onlineCount} {t('community.online')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white">
              <Copy className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate(`/chat/group/${currentCommunity.id}`)}
              className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 hover:bg-purple-700 transition"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3">@{currentCommunity.username}-{currentCommunity.currency}</p>
        <p className="text-gray-500 text-xs mb-4">GP: {currentCommunity.gpId}</p>

        {/* ۴ باکس آمار */}
        <CommunityStats community={currentCommunity} />

        {/* تب‌ها */}
        <div className="flex gap-4 mt-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-2 text-sm font-medium transition relative ${
              activeTab === 'members' ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {t('community.members')}
            {activeTab === 'members' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('online')}
            className={`pb-2 text-sm font-medium transition relative ${
              activeTab === 'online' ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {t('community.online_members')}
            {activeTab === 'online' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('mutual')}
            className={`pb-2 text-sm font-medium transition relative ${
              activeTab === 'mutual' ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {t('community.mutual_friends')}
            {activeTab === 'mutual' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
            )}
          </button>
        </div>

        {/* نوار جستجو و افزودن عضو */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              placeholder={t('community.search_members')}
              className="w-full bg-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" /> {t('community.add_member')}
          </button>
        </div>
      </div>

      {/* لیست اعضا */}
      <CommunityMembers 
        members={filteredMembers}
        currentUserId={user?.id}
        onMemberPress={(memberId) => navigate(`/profile/${memberId}`)}
        onFollow={(memberId) => {/* دنبال کردن */}}
        onDuel={(memberId) => navigate(`/duel/private/${memberId}`)}
        isRTL={isRTL}
      />

      {/* فوتر: + دوئل در گروه */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <button
          onClick={() => navigate('/duel/create')}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition"
        >
          <Sword className="w-5 h-5" /> + {t('community.duel_in_group')}
        </button>
      </div>
    </div>
  );
};

export default CommunityDetailPage;