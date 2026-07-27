// pages/CommunityDetailPage.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
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
  User,
  Award,
  X,
} from 'lucide-react';
import { getCryptoIcon } from '../utils/assetMapper';
// نکته: getAvatarUrl در assetMapper.js تعریف نشده بود؛ طبق ساختار پروژه، تولید آواتار
// (با DiceBear) در utils/avatarGenerator.js انجام می‌شود.
import { getAvatarUrl } from '../utils/avatarGenerator';
import { formatCurrency, formatCompactNumber } from '../utils/currencyFormatter';

// کامپوننت‌ها
import CommunityStats from '../components/community/CommunityStats';
import CommunityMembers from '../components/community/CommunityMembers';

// ======================================================
// صفحه جزئیات گروه
// ======================================================
const CommunityDetailPage = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const { user } = useAuth();
  const {
    currentCommunity,
    members,
    isLoading,
    fetchCommunityDetail,
    fetchMembers,
    toggleFavorite,
    joinCommunity,
    leaveCommunity,
  } = useCommunityStore();

  const [showMenu, setShowMenu] = useState(false);
  const [searchMember, setSearchMember] = useState('');
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'online', 'mutual'

  const menuRef = useRef(null);

  const isOwner = user?.id === currentCommunity?.owner_id;

  // ======================================================
  // بارگذاری داده‌ها
  // ======================================================
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchCommunityDetail(communityId),
          fetchMembers(communityId),
        ]);
      } catch (error) {
        console.error('Error loading community details:', error);
      }
    };
    if (communityId) loadData();
  }, [communityId, fetchCommunityDetail, fetchMembers]);

  // ======================================================
  // بستن منو با کلیک خارج از آن
  // ======================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ======================================================
  // فیلتر اعضا بر اساس جستجو و تب
  // ======================================================
  const filteredMembers = useMemo(() => {
    let result = members || [];

    // فیلتر بر اساس تب
    if (activeTab === 'online') {
      result = result.filter((m) => m.isOnline);
    } else if (activeTab === 'mutual') {
      // در صورت نیاز، منطق دوستان مشترک را پیاده‌سازی کنید
      result = result.filter((m) => m.isMutual);
    }

    // فیلتر بر اساس جستجو
    if (searchMember.trim()) {
      const query = searchMember.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.username?.toLowerCase().includes(query) ||
          m.fullName?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [members, activeTab, searchMember]);

  // ======================================================
  // هندلر کپی لینک گروه
  // ======================================================
  const handleCopyLink = useCallback(() => {
    const link = `${window.location.origin}/community/${communityId}`;
    navigator.clipboard.writeText(link);
    // نمایش پیام موفقیت (با toast)
  }, [communityId]);

  // ======================================================
  // هندلر اشتراک‌گذاری لینک گروه
  // ======================================================
  const handleShareGroup = useCallback(() => {
    const link = `${window.location.origin}/community/${communityId}`;
    if (navigator.share) {
      navigator.share({ title: currentCommunity?.name, url: link });
    } else {
      navigator.clipboard.writeText(link);
    }
  }, [communityId, currentCommunity]);

  // ======================================================
  // هندلر تغییر favorite
  // ======================================================
  const handleToggleFavorite = useCallback(async () => {
    try {
      await toggleFavorite(communityId);
      await fetchCommunityDetail(communityId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [communityId, toggleFavorite, fetchCommunityDetail]);

  // ======================================================
  // هندلر خروج از گروه
  // ======================================================
  const handleLeaveGroup = useCallback(async () => {
    if (window.confirm(t('community.confirm_leave'))) {
      try {
        await leaveCommunity(communityId);
        navigate('/communities');
      } catch (error) {
        console.error('Error leaving group:', error);
      }
    }
  }, [communityId, leaveCommunity, navigate, t]);

  // ======================================================
  // هندلر حذف گروه (فقط مالک)
  // ======================================================
  const handleDeleteGroup = useCallback(async () => {
    if (window.confirm(t('community.confirm_delete'))) {
      try {
        // TODO: فراخوانی تابع واقعی حذف گروه از استور (مثلاً deleteCommunity(communityId))
        // در حال حاضر این عملیات پیاده‌سازی نشده و فقط ناوبری انجام می‌شود.
        navigate('/communities');
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  }, [communityId, navigate, t]);

  // ======================================================
  // رندر لودینگ
  // ======================================================
  if (isLoading || !currentCommunity) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
            >
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
                    <span className="text-blue-400 text-xs" title={t('community.verified')}>
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* ===== منوی عمودی (۴ نقطه) ===== */}
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-4 mt-2 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-20 min-w-[220px]"
          >
            {isOwner ? (
              // منوی مالک
              <>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // navigate('/edit-community/avatar');
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <User className="w-4 h-4" /> {t('community.edit_avatar')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // navigate('/edit-community/name');
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Star className="w-4 h-4" /> {t('community.edit_name')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // navigate('/edit-community/username');
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Star className="w-4 h-4" /> {t('community.edit_username')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // navigate('/create-lottery');
                  }}
                  className="w-full px-4 py-3 text-left text-blue-400 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Award className="w-4 h-4" /> {t('community.create_lottery')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleDeleteGroup();
                  }}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" /> {t('community.delete_group')}
                </button>
                <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-700">
                  {t('community.total_bmc')}:{' '}
                  <span dir="ltr">
                    {formatCurrency(currentCommunity.bmcAmount || 0, currentCommunity.currency)}
                  </span>
                </div>
              </>
            ) : (
              // منوی کاربر عادی
              <>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleToggleFavorite();
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Star className="w-4 h-4" />{' '}
                  {currentCommunity.isFavorite ? t('community.unfavorite_group') : t('community.favorite_group')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // navigate('/report/community');
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Flag className="w-4 h-4" /> {t('community.report_group')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleLeaveGroup();
                  }}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" /> {t('community.leave_group')}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ===== اطلاعات گروه ===== */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-400 text-sm">
              {currentCommunity.memberCount || 0} {t('community.members')}
              <span className="mx-2">•</span>
              {currentCommunity.onlineCount || 0} {t('community.online')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
              title={t('community.copy_link')}
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareGroup}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
              title={t('community.share_group')}
            >
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

        <p className="text-gray-400 text-sm mb-3">
          @{currentCommunity.username}-{currentCommunity.currency}
        </p>
        <p className="text-gray-500 text-xs mb-4">GP: {currentCommunity.gpId}</p>

        {/* ۴ باکس آمار */}
        <CommunityStats community={currentCommunity} isRTL={isRTL} />

        {/* ===== تب‌ها ===== */}
        <div className="flex gap-4 mt-6 border-b border-gray-700">
          {['members', 'online', 'mutual'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition relative ${
                activeTab === tab ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {t(`community.tab_${tab}`)}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* ===== نوار جستجو و افزودن عضو ===== */}
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
            {searchMember && (
              <button
                onClick={() => setSearchMember('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => navigate(`/community/${communityId}/add-member`)}
            className="bg-blue-600 px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> {t('community.add_member')}
          </button>
        </div>
      </div>

      {/* ===== لیست اعضا ===== */}
      <CommunityMembers
        members={filteredMembers}
        currentUserId={user?.id}
        onMemberPress={(memberId) => navigate(`/profile/${memberId}`)}
        onFollow={(memberId) => {
          // پیاده‌سازی دنبال کردن
          console.log('Follow user:', memberId);
        }}
        onDuel={(memberId) => navigate(`/duel/private/${memberId}`)}
        isRTL={isRTL}
      />

      {/* ===== فوتر: + دوئل در گروه ===== */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <button
          onClick={() => navigate('/duel/create')}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition shadow-lg shadow-orange-500/20"
        >
          <Sword className="w-5 h-5" /> + {t('community.duel_in_group')}
        </button>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
