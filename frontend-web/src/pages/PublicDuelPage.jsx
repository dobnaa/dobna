import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import { duelService } from '../services/duelService';
import { formatNumber } from '../utils/currencyFormatter';

const PublicDuelPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { balance, refreshBalance } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [duels, setDuels] = useState([]);
  const [amount, setAmount] = useState(0.000002);

  // سطوح دوئل با مقادیر مختلف
  const duelLevels = {
    1: 0.000002,
    2: 0.000005,
    3: 0.00001,
    4: 0.00005,
  };

  useEffect(() => {
    fetchDuels();
    const interval = setInterval(fetchDuels, 5000); // آپدیت هر ۵ ثانیه
    return () => clearInterval(interval);
  }, []);

  const fetchDuels = async () => {
    try {
      const data = await duelService.getPublicDuels();
      setDuels(data);
    } catch (error) {
      console.error('Error fetching duels:', error);
    }
  };

  const handleCreateDuel = async () => {
    setIsLoading(true);
    try {
      await duelService.createPublicDuel({
        currency: selectedCurrency,
        amount: duelLevels[selectedLevel],
        level: selectedLevel,
      });
      await refreshBalance();
      await fetchDuels();
      alert('دوئل عمومی با موفقیت ایجاد شد');
    } catch (error) {
      console.error('Error creating duel:', error);
      alert(error.message || 'خطا در ایجاد دوئل');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinDuel = async (duelId) => {
    try {
      await duelService.joinDuel(duelId);
      await refreshBalance();
      await fetchDuels();
      alert('با موفقیت به دوئل پیوستید');
    } catch (error) {
      console.error('Error joining duel:', error);
      alert(error.message || 'خطا در پیوستن به دوئل');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* هدر */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            ← {t('common.back')}
          </button>
          <h1 className="text-xl font-bold">{t('duel.public_title')}</h1>
          <div className="w-8" />
        </div>

        {/* موجودی */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">{t('wallet.balance')}</p>
            <p className="text-xl font-bold">{formatNumber(balance)} USD</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">{selectedCurrency}</p>
            <p className="text-green-400">{formatNumber(balance)}</p>
          </div>
        </div>

        {/* انتخاب ارز */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="flex gap-2 mb-3">
            {['Crypto', 'Currency'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {['BTC', 'ETH', 'USDT', 'SOL'].map((curr) => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCurrency === curr
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* انتخاب سطح */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <p className="text-gray-400 text-sm mb-3">
            {t('duel.select_level')}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`p-3 rounded-lg text-center transition ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                <p className="font-bold">Level {level}</p>
                <p className="text-xs">{duelLevels[level]} {selectedCurrency}</p>
              </button>
            ))}
          </div>
        </div>

        {/* دکمه ساخت دوئل */}
        <button
          onClick={handleCreateDuel}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? t('common.loading') : t('duel.create_public')}
        </button>

        {/* لیست دوئل‌های عمومی */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm mb-3">{t('duel.active_duels')}</h3>
          {duels.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center text-gray-500">
              {t('duel.no_active_duels')}
            </div>
          ) : (
            duels.map((duel) => (
              <div key={duel.id} className="bg-gray-800 rounded-xl p-4 mb-3 flex items-center justify-between">
                <div>
                  <p className="font-bold">{duel.currency} {duel.amount}</p>
                  <p className="text-gray-400 text-sm">Level {duel.level}</p>
                  <p className="text-gray-500 text-xs">@{duel.creator_username}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {duel.expires_in} {t('common.seconds')}
                  </p>
                  <button
                    onClick={() => handleJoinDuel(duel.id)}
                    className="mt-1 bg-green-600 px-4 py-1 rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    {t('duel.join')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicDuelPage;