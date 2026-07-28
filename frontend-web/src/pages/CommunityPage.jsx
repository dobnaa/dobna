// pages/CommunityPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useCommunityStore } from '../stores/communityStore';
import { useAuth } from '../hooks/useAuth';
import { useGameStore } from '../stores/gameStore';
import {
  ArrowLeft,
  Users,
  User,
  Crown,
  Share2,
  MessageCircle,
  Star,
  LogOut,
  MoreVertical,
  Plus,
  ChevronRight,
  Shield,
  Zap,
  Gift,
  Building2,
  Gamepad2,
} from 'lucide-react';
import { getAvatarUrl } from '../utils/avatarGenerator';
import { getCryptoIcon, getFlagEmoji } from '../utils/assetMapper';
import { formatCurrency, formatCompactNumber } from '../utils/currencyFormatter';

// ======================================================
// لیست رمزارزها (برای تشخیص آیکون SVG)
// ======================================================
const CRYPTO_CURRENCIES = [
  'BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON',
  'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI',
];

// ======================================================
// کامپوننت کارت سطح (Level Card)
// ======================================================
const LevelCard = ({ level, currency, onPress }) => {
  const { t } = useTranslation();
  const isCrypto = CRYPTO_CURRENCIES.includes(currency);

  // شماره‌ی واقعی سطح (عدد ۱ تا ۴)؛ prop به اسم `level` خودِ آبجکت کامل سطح است
  // (شامل roomCount, cardPrice, ...)، پس برای لوکاپ رنگ‌ها و نمایش عدد باید از
  // level.level استفاده شود، نه از خودِ آبجکت.
  const levelNumber = level.level;

  const levelColors = {
    1: 'border-blue-500/30 hover:border-blue-500',
    2: 'border-green-500/30 hover:border-green-500',
    3: 'border-purple-500/30 hover:border-purple-500',
    4: 'border-yellow-500/30 hover:border-yellow-500',
  };

  const levelGradients = {
    1: 'from-blue-600/20 to-blue-800/20',
    2: 'from-green-600/20 to-green-800/20',
    3: 'from-purple-600/20 to-purple-800/20',
    4: 'from-yellow-600/20 to-yellow-800/20',
  };

  const levelBadgeColors = {
    1: 'bg-blue-600',
    2: 'bg-green-600',
    3: 'bg-purple-600',
    4: 'bg-yellow-600',
  };

  return (
    <button
      onClick={onPress}
      className={`w-full bg-gray-800/50 rounded-2xl p-4 border ${levelColors[levelNumber] || 'border-gray-700/30'} hover:bg-gray-700/50 transition-all group`}
    >
      <div className="flex items-center gap-4">
        {/* آیکون سطح */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${levelGradients[levelNumber] || 'from-gray-600/20 to-gray-800/20'} flex items-center justify-center flex-shrink-0`}>
          <span className={`text-xl font-bold ${levelBadgeColors[levelNumber] || 'bg-gray-600'} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>
            {levelNumber}
          </span>
        </div>

        {/* اطلاعات سطح */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">
              {t('game.level')} {levelNumber}
            </span>
            <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
              {t('game.rooms')}: {level.roomCount || 0}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              {isCrypto ? (
                <img
                  src={getCryptoIcon(currency)}
                  alt={currency}
                  className="w-4 h-4"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.textContent = '💱';
                  }}
                />
              ) : (
                <span className="text-base">{getFlagEmoji(currency)}</span>
              )}
              <span className="text-white font-medium text-sm" dir="ltr">
                {formatCurrency(level.cardPrice || 0, currency)} {currency}
              </span>
            </div>
            <span className="text-gray-400 text-xs" dir="ltr">
              ≈ ${formatCurrency(level.cardPriceUsd || 0, 'USD')}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Users className="w-3 h-3" />
              <span>{level.activePlayers || 0}</span>
            </div>
          </div>
        </div>

        {/* فلش */}
        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition flex-shrink-0" />
      </div>

      {/* نوار پیشرفت اتاق‌ها */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 bg-gray-700 rounded-full h-1 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${levelGradients[levelNumber] || 'from-gray-500 to-gray-400'} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min((level.roomCount || 0) / 999 * 100, 100)}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-500 flex-shrink-0">
          {level.roomCount || 0}/{999}
        </span>
      </div>
    </button>
  );
};

// ======================================================
// صفحه اصلی گروه (Community Page)
// ======================================================
const CommunityPage = () => {
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
    leaveCommunity,
  } = useCommunityStore();
  const { levels, fetchLevels, isLoading: isLevelsLoading } = useGameStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);

  const isOwner = user?.id === currentCommunity?.owner_id;
  const isMember = members?.some((m) => m.id === user?.id);

  // ======================================================
  // بارگذاری داده‌ها
  // ======================================================
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchCommunityDetail(communityId),
          fetchMembers(communityId),
          fetchLevels(communityId),
        ]);
      } catch (error) {
        console.error('Error loading community data:', error);
      }
    };
    if (communityId) loadData();
  }, [communityId, fetchCommunityDetail, fetchMembers, fetchLevels]);

  // ======================================================
  // هندلرها
  // ======================================================
  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleCopyLink = useCallback(() => {
    const link = `${window.location.origin}/community/${communityId}`;
    navigator.clipboard.writeText(link);
  }, [communityId]);

  const handleShareGroup = useCallback(() => {
    const link = `${window.location.origin}/community/${communityId}`;
    if (navigator.share) {
      navigator.share({ title: currentCommunity?.name, url: link });
    } else {
      navigator.clipboard.writeText(link);
    }
  }, [communityId, currentCommunity]);

  const handleToggleFavorite = useCallback(async () => {
    try {
      await toggleFavorite(communityId);
      await fetchCommunityDetail(communityId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [communityId, toggleFavorite, fetchCommunityDetail]);

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

  const handleLevelPress = useCallback((level) => {
    navigate(`/game-room/${communityId}/${level}`);
  }, [communityId, navigate]);

  const handleChatPress = useCallback(() => {
    navigate(`/chat/group/${communityId}`);
  }, [communityId, navigate]);

  // ======================================================
  // اعضای نمایش داده شده (۵ نفر اول یا همه)
  // ======================================================
  const displayedMembers = useMemo(() => {
    return showAllMembers ? members : members?.slice(0, 5) || [];
  }, [members, showAllMembers]);

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

  // فرمت فشرده‌ی BMC و لاتاری، هرکدام فقط یک‌بار محاسبه می‌شود
  const bmcCompact = formatCompactNumber(currentCommunity.bmcAmount || 0);
  const lotteryCompact = formatCompactNumber(currentCommunity.lotteryAmount || 0);

  // ======================================================
  // رندر اصلی
  // ======================================================
  return (
    <div
      className="min-h-screen bg-gray-900 text-white pb-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ===== هدر ===== */}
      <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-b border-gray-700 p-4 sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentCommunity.avatar || getAvatarUrl(currentCommunity.id, 'avataaars')}
                  alt={currentCommunity.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                />
                {currentCommunity.isVerified && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                    <Shield className="w-4 h-4 text-white" />
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-bold text-lg">{currentCommunity.name}</p>
                  {currentCommunity.isVerified && (
                    <span className="text-blue-400 text-xs" title={t('community.verified')}>
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>@{currentCommunity.username}-{currentCommunity.currency}</span>
                  <span className="w-px h-3 bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {currentCommunity.memberCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-green-400" />
                    {currentCommunity.onlineCount || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleChatPress}
              className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-700"
              title={t('community.chat')}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleShareGroup}
              className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-700"
              title={t('community.share_group')}
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-700 relative"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ===== منوی عمودی ===== */}
        {showMenu && (
          <div className="absolute right-4 mt-2 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-20 min-w-[200px]">
            {isOwner ? (
              <>
                <button
                  onClick={() => { setShowMenu(false); navigate(`/edit-community/${communityId}`); }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <User className="w-4 h-4" /> {t('community.edit_group')}
                </button>
                <button
                  onClick={() => { setShowMenu(false); navigate(`/community/${communityId}/lottery`); }}
                  className="w-full px-4 py-3 text-left text-blue-400 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Gift className="w-4 h-4" /> {t('community.create_lottery')}
                </button>
                <button
                  onClick={() => { setShowMenu(false); handleToggleFavorite(); }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Star className="w-4 h-4" /> {t('community.favorite_group')}
                </button>
                <button
                  onClick={() => { setShowMenu(false); handleLeaveGroup(); }}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" /> {t('community.leave_group')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setShowMenu(false); handleToggleFavorite(); }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Star className="w-4 h-4" />{' '}
                  {currentCommunity.isFavorite ? t('community.unfavorite_group') : t('community.favorite_group')}
                </button>
                <button
                  onClick={() => { setShowMenu(false); navigate(`/community/${communityId}/report`); }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 border-b border-gray-700 transition"
                >
                  <Shield className="w-4 h-4" /> {t('community.report_group')}
                </button>
                <button
                  onClick={() => { setShowMenu(false); handleLeaveGroup(); }}
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
        {/* آمار سریع */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-gray-800/30 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-[10px]">{t('community.members')}</p>
            <p className="text-white font-bold text-lg">{currentCommunity.memberCount || 0}</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-[10px]">{t('community.online')}</p>
            <p className="text-green-400 font-bold text-lg">{currentCommunity.onlineCount || 0}</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-[10px]">{t('community.rank')}</p>
            <p className="text-yellow-400 font-bold text-lg">#{currentCommunity.rank || 0}</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-[10px]">{t('community.gp_id')}</p>
            <p className="text-blue-400 font-mono text-sm">{currentCommunity.gpId}</p>
          </div>
        </div>

        {/* BMC و لاتاری */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 rounded-xl p-3 border border-blue-500/20">
            <p className="text-gray-400 text-[10px] flex items-center gap-1">
              <Building2 className="w-3 h-3" /> {t('community.building_management')}
            </p>
            <p className="text-blue-400 font-bold text-lg" dir="ltr">
              {bmcCompact.value}{bmcCompact.unit} {currentCommunity.currency}
            </p>
            <p className="text-gray-500 text-[10px]" dir="ltr">
              ${formatCurrency(currentCommunity.bmcUsd || 0, 'USD')}
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-900/20 to-green-700/20 rounded-xl p-3 border border-green-500/20">
            <p className="text-gray-400 text-[10px] flex items-center gap-1">
              <Gift className="w-3 h-3" /> {t('community.lottery_savings')}
            </p>
            <p className="text-green-400 font-bold text-lg" dir="ltr">
              {lotteryCompact.value}{lotteryCompact.unit} {currentCommunity.currency}
            </p>
            <p className="text-gray-500 text-[10px]" dir="ltr">
              ${formatCurrency(currentCommunity.lotteryUsd || 0, 'USD')}
            </p>
          </div>
        </div>

        {/* ===== تالارهای ۴ سطحی ===== */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-400 text-sm font-medium flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              {t('game.game_rooms')}
            </h2>
            <span className="text-gray-500 text-xs">{t('game.click_to_join')}</span>
          </div>

          {isLevelsLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500" />
            </div>
          ) : (
            <div className="space-y-3">
              {levels?.map((level) => (
                <LevelCard
                  key={level.level}
                  level={level}
                  currency={currentCommunity.currency}
                  onPress={() => handleLevelPress(level.level)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ===== اعضای گروه ===== */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-400 text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t('community.members')}
              <span className="text-xs text-gray-500">({members?.length || 0})</span>
            </h2>
            {members?.length > 5 && (
              <button
                onClick={() => setShowAllMembers(!showAllMembers)}
                className="text-blue-400 text-xs hover:text-blue-300 transition"
              >
                {showAllMembers ? t('common.show_less') : t('common.show_more')}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {displayedMembers?.map((member) => (
              <button
                key={member.id}
                onClick={() => navigate(`/profile/${member.id}`)}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="relative">
                  <img
                    src={member.avatar || getAvatarUrl(member.id, 'avataaars')}
                    alt={member.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-purple-500 transition"
                  />
                  {member.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                  )}
                  {member.id === currentCommunity.owner_id && (
                    <span className="absolute -top-1 -right-1">
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 truncate max-w-[50px]">
                  {member.username}
                </span>
              </button>
            ))}
          </div>

          {!isMember && (
            <button
              onClick={() => navigate(`/community/${communityId}/join`)}
              className="w-full mt-3 bg-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4 inline mr-1" /> {t('community.join_group')}
            </button>
          )}
        </div>
      </div>

      {/* ===== دکمه سریع: ایجاد دوئل در گروه ===== */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <button
          onClick={() => navigate('/duel/create')}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition shadow-lg shadow-orange-500/20"
        >
          <Zap className="w-5 h-5" /> + {t('community.duel_in_group')}
        </button>
      </div>
    </div>
  );
};

export default CommunityPage;
