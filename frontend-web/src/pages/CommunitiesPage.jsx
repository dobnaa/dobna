// pages/CommunitiesPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useCommunityStore } from '../stores/communityStore';
import { useAuth } from '../hooks/useAuth';
import {
  ArrowLeft,
  Share2,
  Plus,
  Star,
  ChevronRight,
  Search,
  X,
  Users,
  TrendingUp,
} from 'lucide-react';
import { getCryptoIcon, getFlagEmoji } from '../utils/assetMapper';
import { formatCurrency, formatCompactNumber } from '../utils/currencyFormatter';

// ======================================================
// لیست ارزهای کریپتو و فیات
// ======================================================
const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI'];
const FIAT_CURRENCIES = ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CNY', 'INR', 'CAD', 'CHF', 'AUD'];

// ======================================================
// کامپوننت کارت نمایش گروه (CommunityCard)
// ======================================================
const CommunityCard = ({ community, onPress, onFavorite }) => {
  const { t } = useTranslation();
  const isCrypto = CRYPTO_CURRENCIES.includes(community.currency);

  // هر مقدار فقط یک‌بار فرمت می‌شود (نه دوبار فراخوانی برای value و unit)
  const lottery = formatCompactNumber(community.lotteryAmount || 0);
  const bmc = formatCompactNumber(community.bmcAmount || 0);

  return (
    <button
      onClick={onPress}
      className="w-full bg-gray-800/50 rounded-2xl p-4 flex flex-col hover:bg-gray-700/50 transition border border-gray-700/30 group"
    >
      {/* ردیف اول: ستاره، آواتار، نام، ارز */}
      <div className="flex items-start justify-between">
        {/* ستاره (favorite) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className="text-gray-500 hover:text-yellow-400 transition flex-shrink-0 mr-2"
        >
          <Star
            className={`w-5 h-5 ${
              community.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''
            }`}
          />
        </button>

        {/* آواتار و نام */}
        <div className="flex-1 flex items-center gap-3 px-2 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
            {isCrypto ? (
              <img
                src={getCryptoIcon(community.currency)}
                alt={community.currency}
                className="w-6 h-6"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.textContent = '💱';
                }}
              />
            ) : (
              <span>{getFlagEmoji(community.currency)}</span>
            )}
          </div>
          <div className="text-left min-w-0">
            <p className="text-white font-medium text-sm truncate">{community.name}</p>
            <p className="text-gray-400 text-xs truncate">@{community.username}</p>
          </div>
        </div>

        {/* Community و ارز */}
        <div className="text-right flex-shrink-0">
          <p className="text-gray-400 text-[10px]">{t('communities.community')}</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-sm font-medium text-white">{community.currency}</span>
          </div>
        </div>
      </div>

      {/* ردیف دوم: آمار (Lottery, BMC, Rank, +Join) */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/30">
        {/* Save Lottery */}
        <div className="text-center flex-1">
          <p className="text-gray-400 text-[10px]">{t('communities.save_lottery')}</p>
          <p className="text-green-400 text-sm font-medium">
            {lottery.value}{lottery.unit}
          </p>
          <p className="text-gray-500 text-[10px]" dir="ltr">
            ${formatCurrency(community.lotteryUsd || 0, 'USD')}
          </p>
        </div>

        {/* Total BMC */}
        <div className="text-center flex-1 border-x border-gray-700/30">
          <p className="text-gray-400 text-[10px]">{t('communities.total_bmc')}</p>
          <p className="text-blue-400 text-sm font-medium">
            {bmc.value}{bmc.unit}
          </p>
          <p className="text-gray-500 text-[10px]" dir="ltr">
            ${formatCurrency(community.bmcUsd || 0, 'USD')}
          </p>
        </div>

        {/* Rank */}
        <div className="text-center flex-1">
          <p className="text-gray-400 text-[10px]">{t('communities.rank')}</p>
          <p className="text-yellow-400 text-sm font-bold">#{community.rank || 0}</p>
          <p className="text-gray-500 text-[10px]">{community.currency}</p>
        </div>

        {/* دکمه پیوستن */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPress();
          }}
          className="bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0 ml-2"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* پایین کارت: آیکون‌های اشتراک و فلش */}
      <div className="flex items-center justify-end gap-2 mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // اشتراک لینک گروه
            const link = `${window.location.origin}/community/${community.id}`;
            if (navigator.share) {
              navigator.share({ title: community.name, url: link });
            } else {
              navigator.clipboard.writeText(link);
            }
          }}
          className="text-gray-500 hover:text-white transition p-1"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition" />
      </div>
    </button>
  );
};

// ======================================================
// صفحه اصلی جستجوی گروه‌ها
// ======================================================
const CommunitiesPage = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const { user } = useAuth();
  const { communities, fetchCommunities, toggleFavorite, isLoading: storeLoading } =
    useCommunityStore();

  const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'crypto', 'currency'
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ======================================================
  // بارگذاری اولیه
  // ======================================================
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchCommunities();
      } catch (error) {
        console.error('Error loading communities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchCommunities]);

  // ======================================================
  // هندلر تغییر تب اصلی (all / crypto / currency)
  // مهم: با تغییر تب، فیلتر ارز خاص هم ریست می‌شود؛ در غیر این صورت
  // انتخاب قبلی (مثلاً یک ارز فیات) روی تب "کریپتو" باقی می‌ماند و
  // نتیجه‌ی فیلتر بی‌دلیل خالی نشان داده می‌شود.
  // ======================================================
  const handleTabChange = useCallback((tab) => {
    setSelectedTab(tab);
    setSelectedCurrency('all');
  }, []);

  // ======================================================
  // فیلتر گروه‌ها
  // ======================================================
  const filteredCommunities = useMemo(() => {
    let result = [...(communities || [])];

    // فیلتر بر اساس تب (all / crypto / currency)
    if (selectedTab !== 'all') {
      const currencyList = selectedTab === 'crypto' ? CRYPTO_CURRENCIES : FIAT_CURRENCIES;
      result = result.filter((c) => currencyList.includes(c.currency));
    }

    // فیلتر بر اساس ارز خاص
    if (selectedCurrency !== 'all') {
      result = result.filter((c) => c.currency === selectedCurrency);
    }

    // فیلتر بر اساس جستجو
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(query) ||
          c.username?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query)
      );
    }

    // مرتب‌سازی بر اساس رنک (صعودی)
    result.sort((a, b) => (a.rank || 999) - (b.rank || 999));

    return result;
  }, [communities, selectedTab, selectedCurrency, searchTerm]);

  // ======================================================
  // هندلر تغییر favorite
  // ======================================================
  const handleToggleFavorite = useCallback(
    async (communityId) => {
      try {
        await toggleFavorite(communityId);
        // بعد از تغییر، لیست مجدداً fetch می‌شود (اگر استور این کار را نکند)
        await fetchCommunities();
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    },
    [toggleFavorite, fetchCommunities]
  );

  // ======================================================
  // هندلر اشتراک‌گذاری لینک دعوت
  // ======================================================
  const handleShareInvite = useCallback(() => {
    const link = `${window.location.origin}/invite/${user?.referralCode || 'dobna'}`;
    if (navigator.share) {
      navigator.share({ title: 'DOBNA', text: t('common.invite_text'), url: link });
    } else {
      navigator.clipboard.writeText(link);
    }
  }, [user, t]);

  // ======================================================
  // رندر لودینگ
  // ======================================================
  if (isLoading || storeLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ======================================================
  // رندر اصلی
  // ======================================================
  return (
    <div
      className="min-h-screen bg-gray-900 text-white pb-28"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ===== هدر ===== */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                DOBNA
                <span className="text-xs font-normal text-gray-400">
                  {t('communities.title')}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
            >
              {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button
              onClick={handleShareInvite}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* نوار جستجو */}
        {showSearch && (
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('communities.search_placeholder')}
              className="w-full bg-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===== تب‌های ارزها ===== */}
      <div className="border-b border-gray-700 overflow-x-auto">
        <div className="flex px-4 py-2 gap-1 min-w-max">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {t('communities.all_tab')}
          </button>

          {/* تب Crypto */}
          <div className="flex items-center gap-1 border-l border-gray-700 pl-2">
            <button
              onClick={() => handleTabChange('crypto')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedTab === 'crypto'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {t('communities.crypto')}
            </button>
            <div className="flex gap-1 overflow-x-auto max-w-[150px]">
              {CRYPTO_CURRENCIES.slice(0, 6).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setSelectedTab('crypto');
                    setSelectedCurrency(curr);
                  }}
                  className={`px-2 py-0.5 rounded text-xs transition whitespace-nowrap ${
                    selectedCurrency === curr
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
              {CRYPTO_CURRENCIES.length > 6 && (
                <span className="text-gray-500 text-xs px-1">+{CRYPTO_CURRENCIES.length - 6}</span>
              )}
            </div>
          </div>

          {/* تب Currency */}
          <div className="flex items-center gap-1 border-l border-gray-700 pl-2">
            <button
              onClick={() => handleTabChange('currency')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedTab === 'currency'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {t('communities.currency')}
            </button>
            <div className="flex gap-1 overflow-x-auto max-w-[150px]">
              {FIAT_CURRENCIES.slice(0, 6).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setSelectedTab('currency');
                    setSelectedCurrency(curr);
                  }}
                  className={`px-2 py-0.5 rounded text-xs transition whitespace-nowrap ${
                    selectedCurrency === curr
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
              {FIAT_CURRENCIES.length > 6 && (
                <span className="text-gray-500 text-xs px-1">+{FIAT_CURRENCIES.length - 6}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== تعداد گروه‌ها ===== */}
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          {filteredCommunities.length} {t('communities.groups_found')}
        </p>
        {filteredCommunities.length > 0 && (
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {t('communities.sorted_by_rank')}
          </span>
        )}
      </div>

      {/* ===== لیست گروه‌ها ===== */}
      <div className="p-4 space-y-3">
        {filteredCommunities.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl p-8 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {searchTerm ? t('communities.no_search_results') : t('communities.no_communities')}
            </p>
            {!searchTerm && (
              <p className="text-gray-500 text-sm mt-1">{t('communities.create_first')}</p>
            )}
          </div>
        ) : (
          filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onPress={() => navigate(`/community/${community.id}`)}
              onFavorite={() => handleToggleFavorite(community.id)}
            />
          ))
        )}
      </div>

      {/* ===== دکمه ساخت گروه جدید ===== */}
      <div className="fixed bottom-24 left-0 right-0 px-4">
        <button
          onClick={() => navigate('/create-community')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-purple-500/20"
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
