// pages/DuelPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { useDuel } from '../hooks/useDuel';
import { useWallet } from '../hooks/useWallet';
import { usePoints } from '../hooks/usePoints';
import { supabase } from '../api/supabaseClient';
import { getLevels, getCurrenciesForCategory } from '../config/levels';
import { getCryptoIcon, getFlagEmoji } from '../utils/assetMapper';
import { formatCurrency } from '../utils/currencyFormatter';
import {
  ArrowLeft,
  Sword,
  Clock,
  Trophy,
  Plus,
  RefreshCw,
  X,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hourglass,
  Flame,
  Coins,
} from 'lucide-react';

// ======================================================
// لیست ارزهای پشتیبانی‌شده برای دوئل (از config/levels.js)
// ======================================================
const SUPPORTED_CURRENCIES = getCurrenciesForCategory('duel');

const CRYPTO_CURRENCIES = [
  'BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON',
  'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI',
];

// ======================================================
// نگاشت کدهای خطای پایدار (از SQL) به کلیدهای ترجمه
// این تابع تضمین می‌کند خطاهای بک‌اند همیشه به زبان انتخابی کاربر نمایش داده
// شوند، نه به‌صورت کد خام (مثل "INSUFFICIENT_POINTS") روی صفحه.
// ======================================================
const mapErrorToMessage = (err, t) => {
  const code = err?.message;
  const knownCodes = ['INSUFFICIENT_POINTS', 'DUEL_NOT_FOUND', 'NOT_DUEL_CREATOR'];
  if (code && knownCodes.includes(code)) {
    return t(`points.errors.${code}`, { defaultValue: t('duel.points_redeem_error') });
  }
  return t('duel.points_redeem_error');
};

// ======================================================
// کامپوننت کارت دوئل
// ======================================================
const DuelCard = ({ duel, onJoin, onCancel, isJoining }) => {
  const { t } = useTranslation();
  const isCrypto = CRYPTO_CURRENCIES.includes(duel.currency);
  const isWaiting = duel.status === 'waiting';
  const isActive = duel.status === 'active';
  const isCompleted = duel.status === 'completed';
  const isCancelled = duel.status === 'cancelled';
  const isCreator = duel.creator_id === duel.currentUserId;
  const hasOpponent = !!duel.opponent_id;

  const getStatusColor = () => {
    if (isWaiting) return 'border-yellow-500/30 bg-yellow-500/5';
    if (isActive) return 'border-green-500/30 bg-green-500/5';
    if (isCompleted) return 'border-blue-500/30 bg-blue-500/5';
    if (isCancelled) return 'border-red-500/30 bg-red-500/5';
    return 'border-gray-700/30 bg-gray-800/30';
  };

  const getStatusLabel = () => {
    if (isWaiting) return t('duel.waiting');
    if (isActive) return t('duel.in_progress');
    if (isCompleted) return t('duel.completed');
    if (isCancelled) return t('duel.cancelled');
    return t('duel.unknown');
  };

  const getStatusIcon = () => {
    if (isWaiting) return <Hourglass className="w-3 h-3" />;
    if (isActive) return <Flame className="w-3 h-3" />;
    if (isCompleted) return <CheckCircle className="w-3 h-3" />;
    if (isCancelled) return <XCircle className="w-3 h-3" />;
    return <AlertCircle className="w-3 h-3" />;
  };

  const getOpponentName = () => {
    if (duel.opponent) return duel.opponent.username;
    if (duel.opponent_id) return t('common.unknown');
    return t('duel.waiting_for_opponent');
  };

  const canJoin = isWaiting && !isCreator && !hasOpponent;
  const canCancel = isWaiting && isCreator;

  return (
    <div className={`rounded-xl p-4 border ${getStatusColor()} hover:border-purple-500/30 transition`}>
      <div className="flex items-start justify-between">
        {/* اطلاعات اصلی */}
        <div className="flex items-center gap-3 min-w-0">
          {/* آیکون ارز */}
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            {isCrypto ? (
              <img
                src={getCryptoIcon(duel.currency)}
                alt={duel.currency}
                className="w-6 h-6"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.textContent = '💱';
                }}
              />
            ) : (
              <span className="text-lg">{getFlagEmoji(duel.currency)}</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-white font-bold text-sm" dir="ltr">
                {formatCurrency(duel.amount, duel.currency)} {duel.currency}
              </p>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
                {t('duel.level')} {duel.level}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
              <span>@{duel.creator?.username || t('common.unknown')}</span>
              <span className="w-px h-3 bg-gray-600" />
              <span className="flex items-center gap-1">
                <Sword className="w-3 h-3" />
                {t('duel.vs')}
              </span>
              <span>@{hasOpponent ? getOpponentName() : t('duel.waiting')}</span>
            </div>
          </div>
        </div>

        {/* وضعیت */}
        <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ${
          isWaiting ? 'text-yellow-400 bg-yellow-500/20' :
          isActive ? 'text-green-400 bg-green-500/20' :
          isCompleted ? 'text-blue-400 bg-blue-500/20' :
          'text-gray-400 bg-gray-500/20'
        }`}>
          {getStatusIcon()}
          {getStatusLabel()}
        </div>
      </div>

      {/* زمان باقیمانده */}
      {duel.expires_at && !isCompleted && !isCancelled && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{t('duel.expires_in')}: {duel.expires_in || t('duel.expired')}</span>
        </div>
      )}

      {/* دکمه‌های اقدام */}
      <div className="mt-3 flex items-center justify-end gap-2">
        {canJoin && (
          <button
            onClick={() => onJoin(duel.id)}
            disabled={isJoining}
            className="bg-purple-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-1"
          >
            {isJoining ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sword className="w-3.5 h-3.5" />
                {t('duel.join')}
              </>
            )}
          </button>
        )}

        {canCancel && (
          <button
            onClick={() => onCancel(duel.id)}
            className="bg-red-600/20 text-red-400 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600/30 transition"
          >
            {t('duel.cancel')}
          </button>
        )}

        {isCompleted && duel.winner_id && (
          <span className="text-green-400 text-sm flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            {duel.winner_id === duel.currentUserId ? t('duel.you_won') : t('duel.you_lost')}
          </span>
        )}
      </div>
    </div>
  );
};

// ======================================================
// صفحه دوئل
// ======================================================
const DuelPage = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const { user } = useAuth();
  const {
    duels,
    isLoading,
    fetchDuels,
    createDuel,
    joinDuel,
    cancelDuel,
  } = useDuel();
  const { balances, fetchBalances } = useWallet();
  const { pointsBalance, fetchPointsBalance } = usePoints();

  const [activeTab, setActiveTab] = useState('public');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [levels, setLevels] = useState([]);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joiningId, setJoiningId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [pointsToUse, setPointsToUse] = useState(0);
  const [isRedeeming, setIsRedeeming] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDuels(user.id);
      fetchBalances(user.id);
      fetchPointsBalance(user.id);
    }
  }, [user, fetchDuels, fetchBalances, fetchPointsBalance]);

  useEffect(() => {
    const duelLevels = getLevels(selectedCurrency, 'duel');
    setLevels(duelLevels);
    if (duelLevels.length > 0) {
      const firstLevel = duelLevels[0];
      setSelectedLevel(firstLevel.level);
      setSelectedAmount(firstLevel.amount);
    } else {
      setSelectedLevel(null);
      setSelectedAmount(0);
    }
  }, [selectedCurrency]);

  const selectedBalance = useMemo(() => {
    if (!balances) return 0;
    const balance = balances.find((b) => b.currency === selectedCurrency);
    return balance?.amount || 0;
  }, [balances, selectedCurrency]);

  // ======================================================
  // محاسبه‌ی کارمزد و تخفیف (فقط برای پیش‌نمایش سمت کلاینت؛
  // مقدار نهایی واقعی همیشه توسط تابع SQL محاسبه و اعمال می‌شود)
  // ======================================================
  const calculateFee = useMemo(() => {
    const baseFee = selectedAmount * 0.05;
    const maxDiscountPercent = 50;
    const discountPercent = Math.min(pointsToUse * 1, maxDiscountPercent);
    const discountAmount = baseFee * (discountPercent / 100);
    const finalFee = baseFee - discountAmount;
    return { baseFee, discountPercent, discountAmount, finalFee };
  }, [selectedAmount, pointsToUse]);

  const filteredDuels = useMemo(() => {
    let result = [...(duels || [])];

    if (activeTab !== 'all') {
      result = result.filter((d) => d.duel_type === activeTab);
    }
    if (filterStatus !== 'all') {
      result = result.filter((d) => d.status === filterStatus);
    }
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.currency.toLowerCase().includes(query) ||
          d.creator?.username?.toLowerCase().includes(query) ||
          d.opponent?.username?.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (a.status === 'waiting' && b.status !== 'waiting') return -1;
      if (a.status !== 'waiting' && b.status === 'waiting') return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return result;
  }, [duels, activeTab, filterStatus, searchTerm]);

  // ======================================================
  // ایجاد دوئل: ابتدا دوئل با کارمزد پایه ساخته می‌شود، و فقط در صورت موفقیت،
  // امتیاز مصرف شده و کارمزد همان دوئل به‌روزرسانی می‌شود. این ترتیب تضمین
  // می‌کند اگر ساخت دوئل شکست بخورد، امتیاز کاربر هرگز خرج نمی‌شود.
  // ======================================================
  const handleCreateDuel = useCallback(async () => {
    setError('');
    setIsCreating(true);

    if (!selectedLevel) {
      setError(t('duel.select_level'));
      setIsCreating(false);
      return;
    }

    if (selectedBalance < selectedAmount) {
      setError(t('duel.insufficient_balance'));
      setIsCreating(false);
      return;
    }

    const duelData = {
      currency: selectedCurrency,
      amount: selectedAmount,
      level: selectedLevel,
      type: activeTab === 'private' ? 'private' : 'public',
      fee: calculateFee.baseFee, // همیشه با کارمزد پایه ساخته می‌شود؛ تخفیف در مرحله‌ی بعد اعمال می‌شود
    };

    if (activeTab === 'private' && opponentUsername.trim()) {
      duelData.opponentUsername = opponentUsername.trim();
    }

    let createdDuel;
    try {
      createdDuel = await createDuel(duelData);
    } catch (err) {
      setError(err.message || t('duel.create_error'));
      setIsCreating(false);
      return;
    }

    // دوئل با موفقیت ساخته شد؛ حالا در صورت درخواست تخفیف، امتیاز مصرف می‌شود
    if (pointsToUse > 0) {
      setIsRedeeming(true);
      try {
        const { error: feeError } = await supabase.rpc(
          'fn_redeem_points_for_duel_fee',
          {
            p_user_id: user.id,
            p_duel_id: createdDuel.id,
            p_points_to_use: pointsToUse,
          }
        );
        if (feeError) throw feeError;
        await fetchPointsBalance(user.id);
      } catch (err) {
        // دوئل از قبل ساخته شده؛ فقط تخفیف اعمال نشد. امتیاز کاربر خرج نشده است.
        console.error('Error applying points discount:', mapErrorToMessage(err, t));
      } finally {
        setIsRedeeming(false);
      }
    }

    setShowCreateModal(false);
    setPointsToUse(0);
    setIsCreating(false);
    await fetchDuels(user.id);
    navigate(`/duel/${createdDuel.id}`);
  }, [
    selectedCurrency,
    selectedAmount,
    selectedLevel,
    selectedBalance,
    activeTab,
    opponentUsername,
    pointsToUse,
    calculateFee,
    user,
    createDuel,
    fetchDuels,
    fetchPointsBalance,
    navigate,
    t,
  ]);

  const handleJoinDuel = useCallback(async (duelId) => {
    setJoiningId(duelId);
    try {
      await joinDuel(duelId);
      await fetchDuels(user.id);
    } catch (err) {
      console.error('Error joining duel:', err);
    } finally {
      setJoiningId(null);
    }
  }, [joinDuel, fetchDuels, user]);

  const handleCancelDuel = useCallback(async (duelId) => {
    if (window.confirm(t('duel.confirm_cancel'))) {
      try {
        await cancelDuel(duelId);
        await fetchDuels(user.id);
      } catch (err) {
        console.error('Error cancelling duel:', err);
      }
    }
  }, [cancelDuel, fetchDuels, user, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        fetchDuels(user.id);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [user, fetchDuels]);

  if (isLoading && !duels) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-900 text-white pb-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
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
            <Sword className="w-5 h-5 text-yellow-400" />
            {t('duel.title')}
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            {t('duel.create')}
          </button>
        </div>

        {/* ===== نمایش موجودی امتیاز ===== */}
        <div className="bg-gray-800/30 rounded-xl p-3 mb-4 flex items-center justify-between border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">{t('points.balance')}</span>
          </div>
          <span className="text-yellow-400 font-bold">{pointsBalance || 0}</span>
        </div>

        {/* ===== تب‌ها ===== */}
        <div className="flex gap-1 mb-4 border-b border-gray-700 overflow-x-auto">
          {['public', 'private', 'group', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition relative whitespace-nowrap ${
                activeTab === tab
                  ? 'text-yellow-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {t(`duel.tab_${tab}`)}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* ===== فیلترها و جستجو ===== */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('duel.search')}
              className="w-full bg-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 rounded-lg px-3 py-2 text-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">{t('duel.filter_all')}</option>
            <option value="waiting">{t('duel.filter_waiting')}</option>
            <option value="active">{t('duel.filter_active')}</option>
            <option value="completed">{t('duel.filter_completed')}</option>
          </select>
        </div>

        {/* ===== تعداد دوئل‌ها ===== */}
        <p className="text-gray-500 text-xs mb-3">
          {filteredDuels.length} {t('duel.active_duels')}
        </p>

        {/* ===== لیست دوئل‌ها ===== */}
        {filteredDuels.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl p-8 text-center">
            <Sword className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">{t('duel.no_duels')}</p>
            <p className="text-gray-500 text-sm mt-1">{t('duel.create_first')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDuels.map((duel) => (
              <DuelCard
                key={duel.id}
                duel={{ ...duel, currentUserId: user?.id }}
                onJoin={handleJoinDuel}
                onCancel={handleCancelDuel}
                isJoining={joiningId === duel.id}
              />
            ))}
          </div>
        )}

        {/* ===== دکمه بارگذاری مجدد ===== */}
        <button
          onClick={() => fetchDuels(user?.id)}
          className="w-full mt-4 text-gray-400 text-sm hover:text-white transition flex items-center justify-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          {t('common.refresh')}
        </button>
      </div>

      {/* ===== مودال ایجاد دوئل ===== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{t('duel.create_title')}</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* انتخاب ارز */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-1">{t('duel.select_currency')}</label>
              <div className="flex flex-wrap gap-2">
                {SUPPORTED_CURRENCIES.map((curr) => {
                  const isActive = selectedCurrency === curr;
                  const isCryptoItem = CRYPTO_CURRENCIES.includes(curr);
                  return (
                    <button
                      key={curr}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setPointsToUse(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                        isActive
                          ? 'bg-yellow-500 text-gray-900'
                          : 'bg-gray-700 text-gray-400 hover:text-white'
                      }`}
                    >
                      {isCryptoItem ? (
                        <img
                          src={getCryptoIcon(curr)}
                          alt={curr}
                          className="w-4 h-4"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.textContent = '💱';
                          }}
                        />
                      ) : (
                        <span className="text-base">{getFlagEmoji(curr)}</span>
                      )}
                      {curr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* انتخاب سطح */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-1">{t('duel.select_level')}</label>
              {levels.length === 0 ? (
                <p className="text-gray-500 text-sm">{t('duel.no_levels')}</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {levels.map((level) => {
                    const isActive = selectedLevel === level.level;
                    return (
                      <button
                        key={level.level}
                        onClick={() => {
                          setSelectedLevel(level.level);
                          setSelectedAmount(level.amount);
                          setPointsToUse(0);
                        }}
                        className={`p-2 rounded-lg text-center transition ${
                          isActive
                            ? 'bg-yellow-500 text-gray-900'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        <p className="font-bold text-sm">{t('duel.level')} {level.level}</p>
                        <p className="text-[10px]" dir="ltr">
                          {formatCurrency(level.amount, selectedCurrency)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* موجودی ارز */}
            <div className="bg-gray-700/50 rounded-lg p-3 mb-4 flex justify-between">
              <span className="text-gray-400 text-sm">{t('wallet.balance')}</span>
              <span className="text-white font-medium" dir="ltr">
                {formatCurrency(selectedBalance, selectedCurrency)} {selectedCurrency}
              </span>
            </div>

            {/* نام حریف (برای دوئل خصوصی) */}
            {activeTab === 'private' && (
              <div className="mb-4">
                <label className="text-gray-400 text-sm block mb-1">{t('duel.enter_opponent')}</label>
                <input
                  type="text"
                  value={opponentUsername}
                  onChange={(e) => setOpponentUsername(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            )}

            {/* ===== بخش تخفیف امتیاز ===== */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm">{t('points.use_discount')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPointsToUse(Math.max(0, pointsToUse - 5))}
                    disabled={pointsToUse <= 0}
                    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="text-white font-bold w-10 text-center">{pointsToUse}</span>
                  <button
                    onClick={() => setPointsToUse(Math.min(50, pointsToUse + 5))}
                    disabled={pointsToUse >= 50 || pointsBalance < pointsToUse + 5}
                    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{t('points.points_to_discount')}</span>
                <span>{t('points.max_discount_50')}</span>
              </div>
              {pointsToUse > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-700/30 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('duel.original_fee')}</span>
                    <span className="text-white" dir="ltr">
                      {formatCurrency(calculateFee.baseFee, selectedCurrency)} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">{t('duel.discount')} ({calculateFee.discountPercent}%)</span>
                    <span className="text-green-400" dir="ltr">
                      -{formatCurrency(calculateFee.discountAmount, selectedCurrency)} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-gray-700/30 pt-1">
                    <span className="text-gray-300">{t('duel.final_fee')}</span>
                    <span className="text-yellow-400" dir="ltr">
                      {formatCurrency(calculateFee.finalFee, selectedCurrency)} {selectedCurrency}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* خطا */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* دکمه ایجاد */}
            <button
              onClick={handleCreateDuel}
              disabled={isCreating || isRedeeming || selectedBalance < selectedAmount || !selectedLevel}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
            >
              {isCreating || isRedeeming ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  {t('common.loading')}
                </span>
              ) : (
                t('duel.create_button')
              )}
            </button>

            <p className="text-gray-500 text-xs text-center mt-3">
              {t('duel.create_hint')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuelPage;
