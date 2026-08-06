// pages/ChallengeWatchPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { supabase } from '../api/supabaseClient';
import { formatCurrency } from '../utils/currencyFormatter';
import { getCryptoIcon, getFlagEmoji } from '../utils/assetMapper';
import {
  ArrowLeft,
  Trophy,
  Users,
  Clock,
  DollarSign,
  User,
  Coins,
  AlertCircle,
  CheckCircle,
  Flame,
  Hourglass,
} from 'lucide-react';

// ======================================================
// کامپوننت نمایش کارت در حالت مشاهده
// ======================================================
const WatchCard = ({ card, calledNumbers, isRTL }) => {
  const renderRow = (row) => (
    <div className="grid grid-cols-9 gap-0.5">
      {row.map((num, idx) => {
        const isMarked = num !== 0 && calledNumbers.includes(num);
        return (
          <div
            key={idx}
            className={`aspect-square flex items-center justify-center text-[10px] font-medium rounded transition-all ${
              num === 0
                ? 'bg-gray-800/30 border border-dashed border-gray-600'
                : isMarked
                ? 'bg-green-500/70 text-white shadow-lg shadow-green-500/20 scale-95'
                : 'bg-gray-700/50 text-gray-300 border border-gray-600'
            }`}
          >
            {num !== 0 ? num : ''}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-gray-800/50 rounded-xl p-2 border border-gray-700/20 hover:border-purple-500/30 transition">
      <div className="text-[10px] text-gray-500 text-center mb-1 font-mono">
        #{card.card_number}
      </div>
      <div className="space-y-0.5">
        {renderRow(card.row1)}
        {renderRow(card.row2)}
        {renderRow(card.row3)}
      </div>
    </div>
  );
};

// ======================================================
// صفحه اصلی مشاهده چالش
// ======================================================
const ChallengeWatchPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  
  const [challenge, setChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWatching, setIsWatching] = useState(true);

  // ======================================================
  // ۱. بارگذاری اولیه
  // ======================================================
  useEffect(() => {
    const loadChallenge = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // دریافت اطلاعات چالش
        const { data: challengeData, error: challengeError } = await supabase
          .from('challenges')
          .select(`
            *,
            creator:creator_id (
              id,
              username,
              avatar,
              full_name
            )
          `)
          .eq('id', challengeId)
          .single();

        if (challengeError) throw challengeError;
        setChallenge(challengeData);

        // دریافت شرکت‌کنندگان و کارت‌هایشان
        const { data: participantsData, error: participantsError } = await supabase
          .from('challenge_participants')
          .select(`
            *,
            user:user_id (
              id,
              username,
              avatar,
              full_name
            )
          `)
          .eq('challenge_id', challengeId);

        if (participantsError) throw participantsError;
        setParticipants(participantsData || []);

        // دریافت اتاق و اعداد فراخوانی‌شده
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('called_numbers, status')
          .eq('challenge_id', challengeId)
          .maybeSingle();

        if (roomError) throw roomError;
        if (roomData) {
          setCalledNumbers(roomData.called_numbers || []);
        }

        // محاسبه تایمر
        if (challengeData.expires_at) {
          const remaining = Math.max(0, Math.floor(
            (new Date(challengeData.expires_at) - new Date()) / 1000
          ));
          setTimer(remaining);
        }

      } catch (err) {
        console.error('Error loading challenge:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (challengeId) {
      loadChallenge();
    }
  }, [challengeId]);

  // ======================================================
  // ۲. اشتراک‌سازی Realtime برای دریافت تغییرات لحظه‌ای
  // ======================================================
  useEffect(() => {
    if (!challengeId || !isWatching) return;

    // ۲.۱ تغییرات وضعیت چالش
    const challengeSubscription = supabase
      .channel(`challenge:${challengeId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'challenges',
        filter: `id=eq.${challengeId}`
      }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          const newData = payload.new;
          setChallenge(prev => ({ ...prev, ...newData }));
          
          // اگر چالش تکمیل یا لغو شد، تایمر را متوقف کن
          if (['completed', 'cancelled'].includes(newData.status)) {
            setIsWatching(false);
          }
        }
      })
      .subscribe();

    // ۲.۲ تغییرات اعداد فراخوانی‌شده (از اتاق)
    const roomSubscription = supabase
      .channel(`room:challenge_${challengeId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `challenge_id=eq.${challengeId}`
      }, (payload) => {
        const newNumbers = payload.new.called_numbers || [];
        setCalledNumbers(newNumbers);
      })
      .subscribe();

    // ۲.۳ تغییرات شرکت‌کنندگان
    const participantsSubscription = supabase
      .channel(`participants:challenge_${challengeId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'challenge_participants',
        filter: `challenge_id=eq.${challengeId}`
      }, async (payload) => {
        // دریافت اطلاعات کامل کاربر جدید
        const { data: userData } = await supabase
          .from('profiles')
          .select('id, username, avatar, full_name')
          .eq('id', payload.new.user_id)
          .single();
        
        setParticipants(prev => [
          ...prev,
          {
            ...payload.new,
            user: userData
          }
        ]);
      })
      .subscribe();

    // ۲.۴ تایمر معکوس (هر ثانیه)
    const timerInterval = setInterval(() => {
      if (challenge?.expires_at && isWatching) {
        const remaining = Math.max(0, Math.floor(
          (new Date(challenge.expires_at) - new Date()) / 1000
        ));
        setTimer(remaining);
      }
    }, 1000);

    return () => {
      challengeSubscription.unsubscribe();
      roomSubscription.unsubscribe();
      participantsSubscription.unsubscribe();
      clearInterval(timerInterval);
    };
  }, [challengeId, challenge?.expires_at, isWatching]);

  // ======================================================
  // ۳. دریافت وضعیت نمایشی
  // ======================================================
  const getStatusDisplay = () => {
    if (!challenge) return { label: 'unknown', color: 'text-gray-400', icon: AlertCircle };
    
    switch (challenge.status) {
      case 'waiting':
        return { label: t('challenge.waiting'), color: 'text-yellow-400', icon: Hourglass };
      case 'active':
        return { label: t('challenge.in_progress'), color: 'text-green-400', icon: Flame };
      case 'completed':
        return { label: t('challenge.completed'), color: 'text-blue-400', icon: CheckCircle };
      case 'cancelled':
        return { label: t('challenge.cancelled'), color: 'text-red-400', icon: AlertCircle };
      default:
        return { label: t('challenge.unknown'), color: 'text-gray-400', icon: AlertCircle };
    }
  };

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  // ======================================================
  // ۴. رندر لودینگ
  // ======================================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  // ======================================================
  // ۵. رندر خطا
  // ======================================================
  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> {t('common.back')}
        </button>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-400">{error || t('challenge.not_found')}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-blue-400 hover:text-blue-300 transition"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // ۶. رندر اصلی
  // ======================================================
  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-4 pb-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-2xl mx-auto">
        {/* ===== هدر ===== */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            {t('challenge.watch_title')}
          </h1>
          <div className="w-8" />
        </div>

        {/* ===== وضعیت و تایمر ===== */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800/30 rounded-xl p-3 text-center border border-gray-700/30">
            <p className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
              <StatusIcon className="w-3 h-3" />
              {t('challenge.status')}
            </p>
            <p className={`text-sm font-bold ${statusDisplay.color}`}>
              {statusDisplay.label}
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-3 text-center border border-gray-700/30">
            <p className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              {t('challenge.time_remaining')}
            </p>
            <p className="text-yellow-400 text-sm font-bold font-mono" dir="ltr">
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* ===== اطلاعات چالش ===== */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">{t('challenge.creator')}</p>
              <p className="text-white font-medium text-sm">
                @{challenge.creator?.username || t('common.unknown')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">{t('challenge.amount')}</p>
              <p className="text-white font-bold text-sm" dir="ltr">
                {formatCurrency(challenge.amount, challenge.currency)} {challenge.currency}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">{t('challenge.level')}</p>
              <p className="text-white font-bold text-sm">{challenge.level}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700/30">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400">
                {challenge.current_participants}/{challenge.max_participants}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400" dir="ltr">
                {formatCurrency(challenge.total_pool || 0, challenge.currency)} {challenge.currency}
              </span>
            </div>
          </div>
        </div>

        {/* ===== اعداد فراخوانی‌شده ===== */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 mb-4">
          <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {t('game.called_numbers')} ({calledNumbers.length})
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {calledNumbers.length > 0 ? (
              calledNumbers.map((num) => (
                <span
                  key={num}
                  className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                >
                  {num}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">{t('challenge.waiting_for_numbers')}</p>
            )}
          </div>
        </div>

        {/* ===== کارت‌های شرکت‌کنندگان ===== */}
        <div>
          <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
            <Users className="w-4 h-4" />
            {t('challenge.participants_cards')} ({participants.length})
          </p>
          {participants.length === 0 ? (
            <div className="bg-gray-800/30 rounded-xl p-6 text-center border border-gray-700/30">
              <p className="text-gray-500 text-sm">{t('challenge.no_participants')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {participants.map((participant) => (
                <div key={participant.id} className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs overflow-hidden">
                      {participant.user?.avatar ? (
                        <img src={participant.user.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-300 truncate">
                      @{participant.user?.username || t('common.unknown')}
                    </span>
                    {participant.user_id === challenge.creator_id && (
                      <span className="text-[8px] bg-purple-600/30 text-purple-400 px-1.5 py-0.5 rounded-full">
                        {t('challenge.creator')}
                      </span>
                    )}
                  </div>
                  <WatchCard
                    card={participant}
                    calledNumbers={calledNumbers}
                    isRTL={isRTL}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== مودال برنده ===== */}
        {challenge.status === 'completed' && challenge.winner_id && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-yellow-500/30 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-yellow-400">{t('challenge.winner_declared')}</h2>
              <p className="text-white text-lg mt-2">
                @{participants.find(p => p.user_id === challenge.winner_id)?.user?.username || t('common.unknown')}
              </p>
              <p className="text-gray-400 text-sm mt-1" dir="ltr">
                {t('challenge.prize')}: {formatCurrency(challenge.total_pool || 0, challenge.currency)} {challenge.currency}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition"
              >
                {t('common.back')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeWatchPage;

// اصلاح دریافت کارت‌ها در ChallengeWatchPage.jsx
const { data: participantsData, error: participantsError } = await supabase
  .from('challenge_participants')
  .select(`
    *,
    user:user_id (
      id,
      username,
      avatar,
      full_name
    ),
    card:card_number (
      row1,
      row2,
      row3
    )
  `)
  .eq('challenge_id', challengeId);