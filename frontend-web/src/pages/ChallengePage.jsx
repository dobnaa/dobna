// pages/ChallengePage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { challengeService } from '../services/challengeService';
import { formatNumber, formatTime } from '../utils';

const ChallengePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchChallenges();
    const interval = setInterval(fetchChallenges, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchChallenges = async () => {
    try {
      const data = await challengeService.getActiveChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    setIsLoading(true);
    try {
      await challengeService.joinChallenge(challengeId);
      await fetchChallenges();
      alert('Successfully joined the challenge!');
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert(error.message || 'Failed to join challenge');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'waiting') return challenge.status === 'waiting';
    if (selectedFilter === 'active') return challenge.status === 'active';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* هدر */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            ← {t('common.back')}
          </button>
          <h1 className="text-xl font-bold">{t('challenge.title')}</h1>
          <button
            onClick={() => navigate('/create-challenge')}
            className="bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition"
          >
            + {t('challenge.create')}
          </button>
        </div>

        {/* فیلترها */}
        <div className="flex gap-2 mb-4">
          {['all', 'waiting', 'active'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                selectedFilter === filter
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {t(`challenge.filter_${filter}`)}
            </button>
          ))}
        </div>

        {/* لیست چالش‌ها */}
        {filteredChallenges.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center text-gray-500">
            {t('challenge.no_challenges')}
          </div>
        ) : (
          filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-gray-800 rounded-xl p-4 mb-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {challenge.currency === 'BTC' ? '₿' : 
                       challenge.currency === 'ETH' ? '⟠' :
                       challenge.currency === 'USDT' ? '₮' : '$'}
                    </span>
                    <div>
                      <p className="font-bold">
                        {challenge.amount} {challenge.currency}
                      </p>
                      <p className="text-gray-400 text-sm">Level {challenge.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>
                      👤 {challenge.current_participants}/{challenge.max_participants}
                    </span>
                    <span>⏱️ {formatTime(challenge.expires_at)}</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      challenge.status === 'waiting' ? 'bg-yellow-500/20 text-yellow-400' :
                      challenge.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {challenge.status === 'waiting' ? 'Waiting' : 
                       challenge.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                </div>

                {/* دکمه پیوستن */}
                {challenge.status === 'waiting' && 
                 challenge.current_participants < challenge.max_participants && (
                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    disabled={isLoading}
                    className="bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {t('challenge.join')}
                  </button>
                )}
                {challenge.status === 'active' && (
                  <span className="text-green-400 text-sm">🔥 {t('challenge.in_progress')}</span>
                )}
              </div>

              {/* پریویو کارت (اختیاری) */}
              <div className="mt-3 bg-gray-900 rounded-lg p-3 flex items-center gap-3 overflow-x-auto">
                <span className="text-gray-500 text-xs">🎴 Cards:</span>
                {challenge.participants?.slice(0, 5).map((p, idx) => (
                  <div key={idx} className="w-8 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
                    #{p.card_number}
                  </div>
                ))}
                {challenge.current_participants > 5 && (
                  <span className="text-gray-500 text-xs">+{challenge.current_participants - 5}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChallengePage;