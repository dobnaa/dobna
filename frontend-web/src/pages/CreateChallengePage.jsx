import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import { challengeService } from '../services/challengeService';
import { formatNumber, formatTime } from '../utils';

const CreateChallengePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { balance, refreshBalance } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [amount, setAmount] = useState(0.000005);
  const [timer, setTimer] = useState(1200); // 20 دقیقه
  const [unlockedLevels, setUnlockedLevels] = useState([1, 2, 3, 4]);

  // سطوح چالش با مقادیر مختلف
  const challengeLevels = {
    1: { amounts: [0.000005, 0.00001, 0.00002, 0.00005] },
    2: { amounts: [0.00001, 0.00005, 0.0001, 0.0002] },
    3: { amounts: [0.0001, 0.0005, 0.001, 0.002] },
    4: { amounts: [0.001, 0.005, 0.01, 0.02] },
  };

  useEffect(() => {
    // دریافت سطوح آزاد شده برای کاربر
    const fetchUnlockedLevels = async () => {
      try {
        const levels = await challengeService.getUnlockedLevels(user.id);
        setUnlockedLevels(levels);
      } catch (error) {
        console.error('Error fetching unlocked levels:', error);
      }
    };
    fetchUnlockedLevels();
  }, [user]);

  const handleCreateChallenge = async () => {
    setIsLoading(true);
    try {
      await challengeService.createChallenge({
        currency: selectedCurrency,
        amount: amount,
        level: selectedLevel,
      });
      await refreshBalance();
      alert('چالش با موفقیت ایجاد شد');
      navigate('/');
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert(error.message || 'خطا در ایجاد چالش');
    } finally {
      setIsLoading(false);
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
          <h1 className="text-xl font-bold">{t('challenge.create_title')}</h1>
          <div className="w-8" />
        </div>

        {/* تایمر */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 text-center">
          <p className="text-4xl font-bold text-yellow-400 font-mono">
            {formatTime(timer)}
          </p>
          <p className="text-gray-400 text-sm">{t('challenge.time_remaining')}</p>
        </div>

        {/* سطوح آزاد شده */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <p className="text-gray-400 text-sm mb-2">{t('challenge.unlocked_levels')}</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={`px-3 py-1 rounded-lg text-sm ${
                  unlockedLevels.includes(level)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                Level {level} {unlockedLevels.includes(level) ? '✓' : '🔒'}
              </span>
            ))}
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

        {/* موجودی */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 flex items-center justify-between">
          <span className="text-gray-400">{t('wallet.balance')}</span>
          <span className="text-white font-bold">
            {formatNumber(balance)} {selectedCurrency}
          </span>
        </div>

        {/* انتخاب سطح و مبلغ */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <p className="text-gray-400 text-sm mb-3">{t('challenge.select_amount')}</p>
          
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[1, 2, 3, 4].map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setAmount(challengeLevels[level]?.amounts[0] || 0);
                }}
                className={`p-2 rounded-lg text-center transition ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                <p className="font-bold">Level {level}</p>
                <p className="text-xs">{challengeLevels[level]?.amounts[0]}</p>
              </button>
            ))}
          </div>

          {/* مقادیر مختلف برای سطح انتخاب شده */}
          <div className="flex gap-2">
            {challengeLevels[selectedLevel]?.amounts.map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`flex-1 py-2 rounded-lg text-center transition ${
                  amount === val
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* کارمزد */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">{t('challenge.creator_fee')} (20%)</span>
            <span className="text-green-400">{(amount * 0.2).toFixed(8)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t('challenge.platform_fee')} (5%)</span>
            <span className="text-yellow-400">{(amount * 0.05).toFixed(8)}</span>
          </div>
        </div>

        {/* دکمه ساخت */}
        <button
          onClick={handleCreateChallenge}
          disabled={isLoading || !unlockedLevels.includes(selectedLevel)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('common.loading') : t('challenge.create_button')}
        </button>

        <p className="text-gray-500 text-xs text-center mt-4">
          {t('challenge.rules')}
        </p>
      </div>
    </div>
  );
};

export default CreateChallengePage;