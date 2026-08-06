// pages/RoomWatchPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { supabase } from '../api/supabaseClient';
import { formatCurrency } from '../utils/currencyFormatter';
import { getNoteImage } from '../utils/assetMapper';
import {
  ArrowLeft,
  Trophy,
  Users,
  Clock,
  DollarSign,
  User,
  Crown,
  Medal,
  AlertCircle,
  CheckCircle,
  Flame,
  Hourglass,
  Building2,
  Coins,
  Eye,
} from 'lucide-react';

// ======================================================
// کامپوننت نمایش کارت در حالت مشاهده
// ======================================================
const WatchCard = ({ card, calledNumbers, isWinner, isLineWinner, isRTL }) => {
  const renderRow = (row) => (
    <div className="grid grid-cols-9 gap-0.5">
      {row.map((num, idx) => {
        const isMarked = num !== 0 && calledNumbers.includes(num);
        const isBingo = isWinner && isMarked;
        return (
          <div
            key={idx}
            className={`aspect-square flex items-center justify-center text-[10px] font-medium rounded transition-all ${
              num === 0
                ? 'bg-gray-800/30 border border-dashed border-gray-600'
                : isMarked
                ? isBingo
                  ? 'bg-yellow-500/80 text-white shadow-lg shadow-yellow-500/20 scale-95'
                  : 'bg-green-500/70 text-white shadow-lg shadow-green-500/20 scale-95'
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
    <div className={`bg-gray-800/50 rounded-xl p-2 border ${
      isWinner ? 'border-yellow-500/50 ring-2 ring-yellow-500/30' : 'border-gray-700/20'
    } hover:border-purple-500/30 transition`}>
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="text-[10px] text-gray-500 font-mono">
          #{card.card_number}
        </span>
        {isWinner && (
          <span className="text-[8px] bg-yellow-500/30 text-yellow-400 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <Trophy className="w-2.5 h-2.5" />
            {isLineWinner ? 'Line' : 'Full'}
          </span>
        )}
        {isLineWinner && !isWinner && (
          <span className="text-[8px] bg-green-500/30 text-green-400 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <Medal className="w-2.5 h-2.5" />
            Line
          </span>
        )}
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
// صفحه اصلی مشاهده اتاق تالار گروه
// ======================================================
const RoomWatchPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  
  const [room, setRoom] = useState(null);
  const [community, setCommunity] = useState(null);
  const [cards, setCards] = useState([]);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [timer, setTimer] = useState(150);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWatching, setIsWatching] = useState(true);
  const [winnerFull, setWinnerFull] = useState(null);
  const [winnerLines, setWinnerLines] = useState([]);
  const [players, setPlayers] = useState([]);

  // ======================================================
  // ۱. بارگذاری اولیه
  // ======================================================
  useEffect(() => {
    const loadRoom = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // ۱.۱ دریافت اطلاعات اتاق
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (roomError) throw roomError;
        setRoom(roomData);

        // ۱.۲ دریافت اطلاعات گروه
        if (roomData.community_id) {
          const { data: communityData, error: communityError } = await supabase
            .from('communities')
            .select('id, name, avatar, currency, group_balance')
            .eq('id', roomData.community_id)
            .single();

          if (!communityError) {
            setCommunity(communityData);
          }
        }

        // ۱.۳ دریافت کارت‌های بازی
        const { data: cardsData, error: cardsError } = await supabase
          .from('game_cards')
          .select(`
            *,
            user:user_id (
              id,
              username,
              avatar,
              full_name
            )
          `)
          .eq('room_id', roomId)
          .order('id');

        if (cardsError) throw cardsError;
        setCards(cardsData || []);

        // ۱.۴ دریافت برنده‌ها
        const winners = cardsData?.filter(c => c.is_winner) || [];
        if (winners.length > 0) {
          setWinnerFull(winners[0]);
        }

        const lineWinners = cardsData?.filter(c => c.is_line_winner) || [];
        if (lineWinners.length > 0) {
          setWinnerLines(lineWinners);
        }

        // ۱.۵ دریافت بازیکنان منحصر‌به‌فرد
        const uniquePlayers = [...new Set(cardsData?.map(c => c.user_id) || [])];
        setPlayers(uniquePlayers);

        // ۱.۶ تنظیم اعداد فراخوانی‌شده
        setCalledNumbers(roomData.called_numbers || []);

        // ۱.۷ محاسبه تایمر
        if (roomData.status === 'waiting' && roomData.created_at) {
          const elapsed = Math.floor((new Date() - new Date(roomData.created_at)) / 1000);
          const remaining = Math.max(0, 150 - elapsed);
          setTimer(remaining);
        } else if (roomData.status === 'active' && roomData.started_at) {
          const elapsed = Math.floor((new Date() - new Date(roomData.started_at)) / 1000);
          const remaining = Math.max(0, 300 - elapsed);
          setTimer(remaining);
        }

      } catch (err) {
        console.error('Error loading room:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      loadRoom();
    }
  }, [roomId]);

  // ======================================================
  // ۲. اشتراک‌سازی Realtime برای دریافت تغییرات لحظه‌ای
  // ======================================================
  useEffect(() => {
    if (!roomId || !isWatching) return;

    // ۲.۱ تغییرات اتاق
    const roomSubscription = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'rooms',
        filter: `id=eq.${roomId}`
      }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          const newData = payload.new;
          setRoom(prev => ({ ...prev, ...newData }));
          
          // به‌روزرسانی اعداد فراخوانی‌شده
          if (newData.called_numbers) {
            setCalledNumbers(newData.called_numbers);
          }
          
          // اگر اتاق تکمیل یا لغو شد، تایمر را متوقف کن
          if (['completed', 'cancelled'].includes(newData.status)) {
            setIsWatching(false);
          }
        }
      })
      .subscribe();

    // ۲.۲ تغییرات کارت‌های بازی
    const cardsSubscription = supabase
      .channel(`cards:room_${roomId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'game_cards',
        filter: `room_id=eq.${roomId}`
      }, async (payload) => {
        if (payload.eventType === 'INSERT') {
          // کارت جدید اضافه شده
          const { data: userData } = await supabase
            .from('profiles')
            .select('id, username, avatar, full_name')
            .eq('id', payload.new.user_id)
            .single();
          
          setCards(prev => [
            ...prev,
            {
              ...payload.new,
              user: userData
            }
          ]);
          
          // به‌روزرسانی لیست بازیکنان
          setPlayers(prev => [...new Set([...prev, payload.new.user_id])]);
          
        } else if (payload.eventType === 'UPDATE') {
          // به‌روزرسانی کارت (برنده شدن)
          setCards(prev => prev.map(c => 
            c.id === payload.new.id ? { ...c, ...payload.new } : c
          ));
          
          // بررسی برنده پر
          if (payload.new.is_winner) {
            const { data: userData } = await supabase
              .from('profiles')
              .select('id, username, avatar, full_name')
              .eq('id', payload.new.user_id)
              .single();
            setWinnerFull({ ...payload.new, user: userData });
          }
          
          // بررسی برنده خطی
          if (payload.new.is_line_winner) {
            const { data: userData } = await supabase
              .from('profiles')
              .select('id, username, avatar, full_name')
              .eq('id', payload.new.user_id)
              .single();
            setWinnerLines(prev => [
              ...prev.filter(w => w.id !== payload.new.id),
              { ...payload.new, user: userData }
            ]);
          }
        }
      })
      .subscribe();

    // ۲.۳ تایمر معکوس (هر ثانیه)
    const timerInterval = setInterval(() => {
      if (room?.status === 'waiting' && room?.created_at) {
        const elapsed = Math.floor((new Date() - new Date(room.created_at)) / 1000);
        const remaining = Math.max(0, 150 - elapsed);
        setTimer(remaining);
      } else if (room?.status === 'active' && room?.started_at) {
        // بازی در حال انجام (تایمر محدودیتی ندارد، اما برای نمایش)
        const elapsed = Math.floor((new Date() - new Date(room.started_at)) / 1000);
        setTimer(Math.max(0, 300 - elapsed));
      }
    }, 1000);

    return () => {
      roomSubscription.unsubscribe();
      cardsSubscription.unsubscribe();
      clearInterval(timerInterval);
    };
  }, [roomId, room?.status, room?.created_at, room?.started_at, isWatching]);

  // ======================================================
  // ۳. دریافت وضعیت نمایشی
  // ======================================================
  const getStatusDisplay = () => {
    if (!room) return { label: 'unknown', color: 'text-gray-400', icon: AlertCircle };
    
    switch (room.status) {
      case 'waiting':
        return { label: t('game.waiting'), color: 'text-yellow-400', icon: Hourglass };
      case 'active':
        return { label: t('game.in_progress'), color: 'text-green-400', icon: Flame };
      case 'completed':
        return { label: t('game.completed'), color: 'text-blue-400', icon: CheckCircle };
      case 'cancelled':
        return { label: t('game.cancelled'), color: 'text-red-400', icon: AlertCircle };
      default:
        return { label: t('game.unknown'), color: 'text-gray-400', icon: AlertCircle };
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
  if (error || !room) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> {t('common.back')}
        </button>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-400">{error || t('game.room_not_found')}</p>
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
            <Eye className="w-5 h-5 text-purple-400" />
            {t('game.watch_title')}
          </h1>
          <div className="w-8" />
        </div>

        {/* ===== اطلاعات اتاق ===== */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {community?.avatar && (
                <img
                  src={community.avatar}
                  alt={community.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-gray-400 text-xs">{t('game.room')} #{room.id}</p>
                <p className="text-white text-sm font-medium">{community?.name || t('game.unknown_group')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">{t('game.level')}</p>
              <p className="text-white font-bold text-sm">{room.level}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700/30">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {players.length}
              </span>
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                {room.total_cards || 0}/60
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono" dir="ltr">
                {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ===== وضعیت ===== */}
        <div className="flex items-center justify-center gap-2 bg-gray-800/20 rounded-xl p-2 mb-4 border border-gray-700/20">
          <StatusIcon className={`w-4 h-4 ${statusDisplay.color}`} />
          <span className={`text-sm font-medium ${statusDisplay.color}`}>
            {statusDisplay.label}
          </span>
          {room.status === 'waiting' && (
            <span className="text-xs text-gray-500">
              ({Math.floor(timer)}s)
            </span>
          )}
        </div>

        {/* ===== اعداد فراخوانی‌شده ===== */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 mb-4">
          <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {t('game.called_numbers')} ({calledNumbers.length}/90)
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
              <p className="text-gray-500 text-sm">{t('game.waiting_for_numbers')}</p>
            )}
          </div>
        </div>

        {/* ===== کارت‌های بازیکنان ===== */}
        <div>
          <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
            <Users className="w-4 h-4" />
            {t('game.players_cards')} ({cards.length})
          </p>
          {cards.length === 0 ? (
            <div className="bg-gray-800/30 rounded-xl p-6 text-center border border-gray-700/30">
              <p className="text-gray-500 text-sm">{t('game.no_cards_yet')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cards.map((card) => {
                const isWinner = card.is_winner || false;
                const isLineWinner = card.is_line_winner || false;
                return (
                  <div key={card.id} className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs overflow-hidden">
                        {card.user?.avatar ? (
                          <img src={card.user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>
                      <span className="text-xs text-gray-300 truncate">
                        @{card.user?.username || t('common.unknown')}
                      </span>
                      {isWinner && (
                        <span className="text-[8px] bg-yellow-500/30 text-yellow-400 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <Trophy className="w-2.5 h-2.5" /> Full
                        </span>
                      )}
                      {isLineWinner && !isWinner && (
                        <span className="text-[8px] bg-green-500/30 text-green-400 px-1.5 py-0.5 rounded-full">
                          Line
                        </span>
                      )}
                    </div>
                    <WatchCard
                      card={card}
                      calledNumbers={calledNumbers}
                      isWinner={isWinner}
                      isLineWinner={isLineWinner}
                      isRTL={isRTL}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== اطلاعات برنده ===== */}
        {room.status === 'completed' && (winnerFull || winnerLines.length > 0) && (
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">{t('game.winners')}</span>
            </div>
            {winnerFull && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{t('game.full_house')}:</span>
                <span className="text-white font-medium">
                  @{winnerFull.user?.username || t('common.unknown')}
                </span>
              </div>
            )}
            {winnerLines.length > 0 && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-300">{t('game.line_winners')}:</span>
                <span className="text-white font-medium">
                  {winnerLines.map(w => `@${w.user?.username || t('common.unknown')}`).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ===== مودال برنده پر (برای نمایش بزرگ) ===== */}
        {room.status === 'completed' && winnerFull && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-yellow-500/30 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-yellow-400">{t('game.winner_declared')}</h2>
              <p className="text-white text-lg mt-2">
                @{winnerFull.user?.username || t('common.unknown')}
              </p>
              <p className="text-gray-400 text-sm mt-1">{t('game.full_house_winner')}</p>
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

export default RoomWatchPage;