// frontend-web/src/pages/GameRoomPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BingoCard from '../components/BingoCard';
import { getNoteImage } from '../utils/assetMapper';
import { callNumber, checkWinner } from '../services/gameService';
import { useAudioManager } from '../hooks/useAudioManager';
import { supabase } from '../services/supabaseClient';

const GameRoomPage = () => {
  const { roomId } = useParams();
  const [cards, setCards] = useState([]);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currency, setCurrency] = useState('USDT');
  const [level, setLevel] = useState(1);
  const { playGameSound } = useAudioManager();

  useEffect(() => {
    // اشتراک‌سازی Realtime برای دریافت اعداد جدید
    const subscription = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` }, 
        (payload) => {
          const newNums = payload.new.numbers_called;
          setCalledNumbers(newNums);
          // پخش صدای اعلام عدد
          playGameSound('number-called');
        })
      .subscribe();

    // دریافت کارت‌های فعال این اتاق
    fetchCards();
    return () => subscription.unsubscribe();
  }, [roomId]);

  const fetchCards = async () => {
    const { data } = await supabase
      .from('dobna_cards')
      .select('*')
      .eq('room_id', roomId);
    setCards(data || []);
  };

  const handleCallNumber = async () => {
    const num = await callNumber(roomId);
    // عدد جدید به صورت خودکار از طریق Realtime به‌روز می‌شود
    // چک کردن برنده بعد از هر عدد
    const winnerId = await checkWinner(roomId);
    if (winnerId) {
      playGameSound('bingo');
      alert(`کارت شماره ${winnerId} برنده شد!`);
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">اتاق بازی</h1>
        <img src={getNoteImage(currency, level)} alt="prize" className="w-16 h-10 object-cover rounded" />
        <button onClick={handleCallNumber} className="bg-blue-600 px-4 py-2 rounded-lg">
          عدد بعدی
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cards.map(card => (
          <BingoCard key={card.id} {...card} calledNumbers={calledNumbers} />
        ))}
      </div>
    </div>
  );
};
export default GameRoomPage;