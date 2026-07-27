// pages/ChallengePage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { useChallenge } from '../hooks/useChallenge';
import { useWallet } from '../hooks/useWallet';
import { formatCompactNumber, formatCurrency } from '../utils/currencyFormatter';
import { getCryptoIcon, getFlagEmoji } from '../utils/assetMapper';
import { 
  ArrowLeft, 
  Plus, 
  Clock, 
  Users, 
  Trophy, 
  ChevronRight,
  RefreshCw,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hourglass,
  Flame,
} from 'lucide-react';

// ======================================================
// لیست ارزهای کریپتو و فیات (برای نمایش آیکون مناسب)
// ======================================================
const CRYPTO_CURRENCIES = [
  'BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 
  'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI'
];

// ======================================================
// کامپوننت نمایش کارت چالش
// ======================================================
const ChallengeCard = ({ challenge, onJoin, isLoading, isRTL }) => {
  const { t } = useTranslation();
  const isCrypto = CRYPTO_CURRENCIES.includes(challenge.currency);

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-500/20 text-yellow-400';
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'waiting': return t('challenge.waiting');
      case 'active': return t('challenge.active');
      case 'completed': return t('challenge.completed');
      case 'cancelled': return t('challenge.cancelled');
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'waiting': return <Hourglass className="w-3 h-3" />;
      case 'active': return <Flame className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'cancelled': return <XCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  // محاسبه درصد پیشرفت برای نمایش نوار
  const progress = (challenge.current_participants / challenge.max_participants) * 100;

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 hover:border-purple-500/30 transition">
      {/* هدر کارت: آیکون ارز + اطلاعات اصلی */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* آیکون ارز */}
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg flex-shrink-0">
            {isCrypto ? (
              <img
                src={getCryptoIcon(challenge.currency)}
                alt={challenge.currency}
                className="w-6 h-6"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.textContent = '💱';
                }}
              />
            ) : (
              <span>{getFlagEmoji(challenge.currency)}</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-bold text-lg">
                {formatCompactNumber(challenge.amount).value} {challenge.currency}
              </p>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
                {t('challenge.level')} {challenge.level}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('challenge.by')} @{challenge.creator?.username || 'Unknown'}
            </p>
          </div>
        </div>

        {/* وضعیت */}
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(challenge.status)}`}>
          {getStatusIcon(challenge.status)}
          {getStatusLabel(challenge.status)}
        </span>
      </div>

      {/* آمار شرکت‌کنندگان و زمان */}
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>
            {challenge.current_participants} / {challenge.max_participants} {t('challenge.participants')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {challenge.remainingTime || t('challenge.expired')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5" />
          <span>
            {formatCurrency(challenge.amount * challenge.current_participants, challenge.currency)} {t('challenge.total_pool')}
          </span>
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* دکمه‌های اقدام */}
      <div className="mt-3 flex items-center justify-between">
        {/* پیش‌نمایش کارت‌های شرکت‌کنندگان */}
        <div className="flex items-center gap-1">
          <span className="text-gray-500 text-xs">{t('challenge.cards')}:</span>
          <div className="flex -space-x-2">
            {challenge.participants?.slice(0, 5).map((p, idx) => (
              <div 
                key={idx}
                className="w-6 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-[8px] text-gray-400"
              >
                #{p.card_number}
              </div>
            ))}
            {challenge.current_participants > 5 && (
              <div className="w-6 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-[8px] text-gray-400">
                +{challenge.current_participants - 5}
              </div>
            )}
          </div>
        </div>

        {/* دکمه پیوستن */}
        {challenge.status === 'waiting' && challenge.current_participants < challenge.max_participants ? (
          <button
            onClick={() => onJoin(challenge.id)}
            disabled={isLoading}
            className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-1"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{t('challenge.join')}</span>
            )}
          </button>
        ) : challenge.status === 'active' ? (
          <span className="text-green-400 text-sm flex items-center gap-1">
            <Flame className="w-4 h-4" /> {t('challenge.in_progress')}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">{t('challenge.ended')}</span>
        )}
      </div>
    </div>
  );
};

// ======================================================
// صفحه اصلی چالش‌ها
// ======================================================
const ChallengePage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  const { user } = useAuth();
  const { 
    activeChallenges, 
    userChallenges,
    unlockedLevels,
    cooldownRemaining,
    isLoading,
    createChallenge,
    joinChallenge,
    fetchActiveChallenges,
  } = useChallenge();
  const { balances } = useWallet();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const isRTL = currentLanguage?.dir === 'rtl';

  // ======================================================
  // بارگذاری اولیه
  // ======================================================
  useEffect(() => {
    fetchActiveChallenges();
    const interval = setInterval(fetchActiveChallenges, 5000);
    return () => clearInterval(interval);
  }, [fetchActiveChallenges]);

  // ======================================================
  // فیلتر چالش‌ها
  // ======================================================
  const filteredChallenges = useMemo(() => {
    let result = activeChallenges || [];

    // فیلتر بر اساس وضعیت
    if (selectedFilter !== 'all') {
      result = result.filter(c => c.status === selectedFilter);
    }

    // فیلتر بر اساس ارز
    if (selectedCurrency !== 'all') {
      result = result.filter(c => c.currency === selectedCurrency);
    }

    // مرتب‌سازی: چالش‌های در حال انتظار اول
    result.sort((a, b) => {
      if (a.status === 'waiting' && b.status !== 'waiting') return -1;
      if (a.status !== 'waiting' && b.status === 'waiting') return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return result;
  }, [activeChallenges, selectedFilter, selectedCurrency]);

  // ======================================================
  // دریافت لیست ارزهای قابل استفاده برای چالش
  // ======================================================
  const availableCurrencies = useMemo(() => {
    if (!balances) return [];
    return balances
      .filter(b => b.amount > 0)
      .map(b => b.currency);
  }, [balances]);

  // ======================================================
  // هندلر پیوستن به چالش
  // ======================================================
  const handleJoinChallenge = async (challengeId) => {
    setIsJoining(true);
    try {
      await joinChallenge(challengeId);
      await fetchActiveChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
    } finally {
      setIsJoining(false);
    }
  };

  // ======================================================
  // هندلر ایجاد چالش جدید
  // ======================================================
  const handleCreateChallenge = () => {
    navigate('/create-challenge');
  };

  // ======================================================
  // رندر لودینگ
  // ======================================================
  if (isLoading) {
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
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-md mx-auto p-4">
        {/* ===== هدر ===== */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            {t('challenge.title')}
          </h1>
          <button
            onClick={handleCreateChallenge}
            disabled={isCreating || availableCurrencies.length === 0}
            className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            {t('challenge.create')}
          </button>
        </div>

        {/* ===== کولدان ۶ ساعته ===== */}
        {cooldownRemaining > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-4 flex items-center gap-3">
            <Hourglass className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-yellow-400 text-sm font-medium">{t('challenge.cooldown')}</p>
              <p className="text-yellow-400/70 text-xs">{cooldownRemaining}</p>
            </div>
          </div>
        )}

        {/* ===== سطوح آزاد شده ===== */}
        <div className="bg-gray-800/30 rounded-xl p-3 mb-4">
          <p className="text-gray-400 text-xs mb-2">{t('challenge.unlocked_levels')}</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  unlockedLevels?.includes(level)
                    ? 'bg-green-600/30 text-green-400 border border-green-500/30'
                    : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                }`}
              >
                {unlockedLevels?.includes(level) ? '✓' : '🔒'} {t('challenge.level')} {level}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-[10px] mt-1">{t('challenge.level_hint')}</p>
        </div>

        {/* ===== فیلترها ===== */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            {t('challenge.filter_all')}
          </button>
          <button
            onClick={() => setSelectedFilter('waiting')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedFilter === 'waiting'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            {t('challenge.filter_waiting')}
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedFilter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            {t('challenge.filter_active')}
          </button>

          {/* فیلتر ارز */}
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="ml-auto bg-gray-700 rounded-lg px-3 py-1.5 text-xs text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">{t('challenge.all_currencies')}</option>
            {availableCurrencies.map((curr) => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        {/* ===== تعداد چالش‌ها ===== */}
        <p className="text-gray-500 text-xs mb-3">
          {filteredChallenges.length} {t('challenge.active_challenges')}
        </p>

        {/* ===== لیست چالش‌ها ===== */}
        {filteredChallenges.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl p-8 text-center">
            <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">{t('challenge.no_challenges')}</p>
            <p className="text-gray-500 text-sm mt-1">{t('challenge.create_first')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                isLoading={isJoining}
                isRTL={isRTL}
              />
            ))}
          </div>
        )}

        {/* ===== دکمه بارگذاری مجدد ===== */}
        <button
          onClick={fetchActiveChallenges}
          className="w-full mt-4 text-gray-400 text-sm hover:text-white transition flex items-center justify-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          {t('common.refresh')}
        </button>
      </div>
    </div>
  );
};

export default ChallengePage;