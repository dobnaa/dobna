import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { getAvatarUrl } from '../utils/avatarGenerator';
import { formatNumber } from '../utils/currencyFormatter';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // اطلاعات ساختگی برای نمایش (در تولید از API دریافت می‌شود)
  const profileData = {
    did: '9202605192045123',
    accountNumber: '00000001',
    username: 'mohmazd',
    fullName: 'محمد زمانی',
    avatar: 'avatar-1',
    events: 178,
    questionHour: '00000098',
    groups: ['@irancoin-BTC', '@etherium-ETH', '@sevensol-SOL'],
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* هدر */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-400">
          ←
        </button>
        <h1 className="text-lg font-bold">{t('profile.title')}</h1>
        <button onClick={handleLogout} className="text-red-400 text-sm">
          {t('profile.logout')}
        </button>
      </div>

      {/* اطلاعات کاربر */}
      <div className="p-4">
        <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-4">
          <img
            src={getAvatarUrl(profileData.avatar)}
            alt="avatar"
            className="w-20 h-20 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-bold">{profileData.fullName}</h2>
            <p className="text-gray-400">@{profileData.username}</p>
            <p className="text-gray-500 text-sm">DID: {profileData.did}</p>
          </div>
        </div>

        {/* آمار */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{profileData.events}</p>
            <p className="text-gray-400 text-sm">{t('profile.events')}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{profileData.questionHour}</p>
            <p className="text-gray-400 text-sm">{t('profile.question_hour')}</p>
          </div>
        </div>

        {/* گروه‌ها */}
        <div className="mt-4">
          <h3 className="text-gray-400 mb-2">{t('profile.groups')}</h3>
          <div className="bg-gray-800 rounded-xl p-4 space-y-2">
            {profileData.groups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-blue-400">{group}</span>
                <span className="text-gray-500">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* تنظیمات */}
        <div className="mt-6 space-y-2">
          <button className="w-full bg-gray-800 rounded-xl p-4 text-left flex items-center justify-between hover:bg-gray-700 transition">
            <span>{t('profile.language_settings')}</span>
            <span className="text-gray-500">›</span>
          </button>
          <button className="w-full bg-gray-800 rounded-xl p-4 text-left flex items-center justify-between hover:bg-gray-700 transition">
            <span>{t('profile.support')}</span>
            <span className="text-gray-500">›</span>
          </button>
          <button className="w-full bg-gray-800 rounded-xl p-4 text-left flex items-center justify-between hover:bg-gray-700 transition">
            <span>{t('profile.privacy_security')}</span>
            <span className="text-gray-500">›</span>
          </button>
          <button className="w-full bg-gray-800 rounded-xl p-4 text-left flex items-center justify-between hover:bg-gray-700 transition">
            <span>{t('profile.contact')}</span>
            <span className="text-gray-500">›</span>
          </button>
        </div>

        {/* دکمه ساخت گروه جدید */}
        <button
          onClick={() => navigate('/create-community')}
          className="w-full mt-6 bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          + {t('profile.create_group')}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

// pages/ProfilePage.jsx
import { generateAvatar } from '../../utils/avatarGenerator';

const ProfilePage = ({ user }) => {
  const avatarSvg = generateAvatar(user.id || 'guest');
  
  return (
    <div 
      className="w-16 h-16 rounded-full bg-gray-700"
      dangerouslySetInnerHTML={{ __html: avatarSvg }} 
    />
  );
};