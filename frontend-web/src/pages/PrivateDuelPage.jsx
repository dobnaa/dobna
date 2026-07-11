// pages/PrivateDuelPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import { duelService } from '../services/duelService';
import { formatNumber } from '../utils/currencyFormatter';

const PrivateDuelPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { balance, refreshBalance } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [opponentUsername, setOpponentUsername] = useState('');
  const [amount, setAmount] = useState(0.05);
  const [duels, setDuels] = useState([]);

  // سطوح دوئل
  const duelLevels = {
    1: { USDT: 0.05, BTC: 0.000002, ETH: 0.00001, SOL: 0.001 },
    2: { USDT: 0.25, BTC: 0.000005, ETH: 0.00005, SOL: 0.005 },
    3: { USDT: 0.50, BTC: 0.00001, ETH: 0.0001, SOL: 0.01 },
    4: { USDT: 1.00, BTC: 0.00005, ETH: 0.0002, SOL: 0.02 },
  };

  useEffect(() => {
    fetchPrivateDuels();
    const interval = setInterval(fetchPrivateDuels, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrivateDuels = async () => {
    try {
      const data = await duelService.getPrivateDuels();
      setDuels(data);
    } catch (error) {
      console.error('Error fetching private duels:', error);
    }
  };

  const handleCreateDuel = async () => {
    if (!opponentUsername.trim()) {
      alert('Please enter opponent username');
      return;
    }

    setIsLoading(true);
    try {
      await duelService.createPrivateDuel({
        currency: selectedCurrency,
        amount: duelLevels[selectedLevel]?.[selectedCurrency] || 0.05,
        level: selectedLevel,
        opponentUsername: opponentUsername.trim(),
      });
      await refreshBalance();
      await fetchPrivateDuels();
      alert('Private duel created successfully!');
    } catch (error) {
      console.error('Error creating private duel:', error);
      alert(error.message || 'Failed to create private duel');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinDuel = async (duelId) => {
    try {
      await duelService.joinDuel(duelId);
      await refreshBalance();
      await fetchPrivateDuels();
      alert('Successfully joined the duel!');
    } catch (error) {
      console.error('Error joining duel:', error);
      alert(error.message || 'Failed to join duel');
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
          <h1 className="text-xl font-bold">{t('duel.private_title')}</h1>
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

        {/* نام کاربری حریف */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            {t('duel.opponent_username')}
          </label>
          <input
            type="text"
            value={opponentUsername}
            onChange={(e) => setOpponentUsername(e.target.value)}
            placeholder="@username"
            className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* انتخاب ارز */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="flex gap-2 mb-3">
            {['Crypto', 'Currency'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm"
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
          <p className="text-gray-400 text-sm mb-3">{t('duel.select_level')}</p>
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
                <p className="text-xs">{duelLevels[level]?.[selectedCurrency] || '--'}</p>
              </button>
            ))}
          </div>
        </div>

        {/* دکمه ساخت دوئل خصوصی */}
        <button
          onClick={handleCreateDuel}
          disabled={isLoading || !opponentUsername.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? t('common.loading') : t('duel.create_private')}
        </button>

        {/* لیست دوئل‌های خصوصی */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">{t('duel.your_private_duels')}</h3>
          {duels.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center text-gray-500">
              {t('duel.no_private_duels')}
            </div>
          ) : (
            duels.map((duel) => (
              <div
                key={duel.id}
                className="bg-gray-800 rounded-xl p-4 mb-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold">
                    {duel.currency} {duel.amount}
                    <span className="text-sm text-gray-400 ml-2">Level {duel.level}</span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    vs {duel.opponent?.username || 'Waiting...'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {duel.creator?.username} • {duel.status === 'waiting' ? 'Waiting' : 'Active'}
                  </p>
                </div>
                <div className="text-right">
                  {duel.status === 'waiting' && duel.creator_id !== user.id && (
                    <button
                      onClick={() => handleJoinDuel(duel.id)}
                      className="bg-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                    >
                      {t('duel.join')}
                    </button>
                  )}
                  {duel.status === 'waiting' && duel.creator_id === user.id && (
                    <span className="text-yellow-400 text-sm">{t('duel.waiting_for_opponent')}</span>
                  )}
                  {duel.status === 'active' && (
                    <span className="text-green-400 text-sm">{t('duel.in_progress')}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateDuelPage;