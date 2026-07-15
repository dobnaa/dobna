// pages/CommunitiesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCommunityStore } from '../stores/communityStore';
import { ArrowLeft, Share2, Plus, Star, ChevronRight } from 'lucide-react';
import { getCryptoIcon } from '../utils/assetMapper';
import { formatCurrency } from '../utils/currencyFormatter';

const CommunitiesPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { communities, fetchCommunities, toggleFavorite } = useCommunityStore();
  const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'crypto', 'currency'
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  // لیست ارزها برای تب‌ها
  const cryptoCurrencies = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON'];
  const fiatCurrencies = ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CAD', 'CHF', 'AUD', 'INR', 'CNY'];
  const allCurrencies = [...cryptoCurrencies, ...fiatCurrencies];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCommunities();
      setIsLoading(false);
    };
    loadData();
  }, []);

  // فیلتر گروه‌ها
  const filteredCommunities = communities.filter(community => {
    const matchSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        community.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCurrency = selectedCurrency === 'all' || community.currency === selectedCurrency;
    const matchType = selectedTab === 'all' || 
                     (selectedTab === 'crypto' && cryptoCurrencies.includes(community.currency)) ||
                     (selectedTab === 'currency' && fiatCurrencies.includes(community.currency));
    return matchSearch && matchCurrency && matchType;
  });

  // مرتب‌سازی بر اساس رنک
  const sortedCommunities = [...filteredCommunities].sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">DOBNA</h1>
            <p className="text-xs text-gray-400">{t('communities.title')}</p>
          </div>
        </div>
        <button onClick={() => {/* اشتراک لینک دعوت */}} className="text-gray-400 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* تب‌های ارزها */}
      <div className="border-b border-gray-700 overflow-x-auto">
        <div className="flex px-4 py-2 gap-1 min-w-max">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              selectedTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            ALL Community & Groups
          </button>
          
          {/* تب Crypto */}
          <div className="flex items-center gap-1 border-l border-gray-700 pl-2">
            <button
              onClick={() => setSelectedTab('crypto')}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                selectedTab === 'crypto' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Crypto
            </button>
            <div className="flex gap-1 overflow-x-auto max-w-[200px]">
              {cryptoCurrencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    selectedCurrency === curr ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* تب Currency */}
          <div className="flex items-center gap-1 border-l border-gray-700 pl-2">
            <button
              onClick={() => setSelectedTab('currency')}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                selectedTab === 'currency' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Currency
            </button>
            <div className="flex gap-1 overflow-x-auto max-w-[200px]">
              {fiatCurrencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    selectedCurrency === curr ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* لیست گروه‌ها */}
      <div className="p-4 space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedCommunities.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl p-8 text-center text-gray-500">
            <p className="text-lg mb-2">🏗️</p>
            <p>{t('communities.no_communities')}</p>
          </div>
        ) : (
          sortedCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onPress={() => navigate(`/community/${community.id}`)}
              onFavorite={() => toggleFavorite(community.id)}
              isRTL={isRTL}
            />
          ))
        )}
      </div>

      {/* دکمه ساخت گروه جدید */}
      <div className="fixed bottom-24 left-0 right-0 px-4">
        <button
          onClick={() => navigate('/create-community')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" />
          <span className="font-bold">{t('communities.create_community')}</span>
        </button>
        <p className="text-center text-xs text-gray-500 mt-1">{t('communities.create_hint')}</p>
      </div>
    </div>
  );
};

export default CommunitiesPage;