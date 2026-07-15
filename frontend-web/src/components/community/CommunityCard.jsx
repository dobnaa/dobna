// components/community/CommunityCard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Share2, ChevronRight, Users, Award } from 'lucide-react';
import { getAvatarUrl, getCryptoIcon } from '../../utils/assetMapper';
import { formatCurrency } from '../../utils/currencyFormatter';

const CommunityCard = ({ community, onPress, onFavorite, isRTL }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onPress}
      className="w-full bg-gray-800/50 rounded-2xl p-4 flex flex-col hover:bg-gray-700/50 transition border border-gray-700/30"
    >
      <div className="flex items-start justify-between">
        {/* ستاره (فavorite) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className="text-gray-500 hover:text-yellow-400 transition"
        >
          <Star className={`w-5 h-5 ${community.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        </button>

        {/* آواتار و نام */}
        <div className="flex-1 flex items-center gap-3 px-3">
          <img
            src={community.avatar || getAvatarUrl(community.id)}
            alt={community.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-white font-medium text-sm">{community.name}</p>
            <p className="text-gray-400 text-xs">@{community.username}</p>
          </div>
        </div>

        {/* Community و ارز */}
        <div className="text-right">
          <p className="text-gray-400 text-xs">{t('communities.community')}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-lg">{getCryptoIcon(community.currency) || '💱'}</span>
            <span className="text-white text-sm font-medium">{community.currency}</span>
          </div>
        </div>
      </div>

      {/* ردیف دوم: آمار */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/30">
        {/* Save Lottery */}
        <div className="text-center">
          <p className="text-gray-400 text-[10px]">{t('communities.save_lottery')}</p>
          <p className="text-green-400 text-sm font-medium">{formatCurrency(community.lotteryAmount)} {community.currency}</p>
          <p className="text-gray-500 text-[10px]">${formatCurrency(community.lotteryUsd)}</p>
        </div>

        {/* Total BMC */}
        <div className="text-center">
          <p className="text-gray-400 text-[10px]">{t('communities.total_bmc')}</p>
          <p className="text-blue-400 text-sm font-medium">{formatCurrency(community.bmcAmount)} {community.currency}</p>
          <p className="text-gray-500 text-[10px]">${formatCurrency(community.bmcUsd)}</p>
        </div>

        {/* Rank */}
        <div className="text-center">
          <p className="text-gray-400 text-[10px]">{t('communities.rank')}</p>
          <p className="text-yellow-400 text-sm font-bold">#{community.rank}</p>
          <p className="text-gray-500 text-[10px]">{community.currency} {t('communities.community')}</p>
        </div>

        {/* دکمه پیوستن */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPress();
          }}
          className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>

      {/* پایین کارت: آیکون‌های اشتراک و فلش */}
      <div className="flex items-center justify-end gap-3 mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // اشتراک لینک گروه
          }}
          className="text-gray-500 hover:text-white transition"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </div>
    </button>
  );
};

export default CommunityCard;