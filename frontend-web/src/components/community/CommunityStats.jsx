// components/community/CommunityStats.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getCryptoIcon } from '../../utils/assetMapper';
import { formatCurrency } from '../../utils/currencyFormatter';

const CommunityStats = ({ community }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      {/* Lottery Savings */}
      <div className="bg-gray-800/50 rounded-xl p-3">
        <p className="text-gray-400 text-[10px]">{t('community.lottery_savings')}</p>
        <p className="text-green-400 text-sm font-bold">{formatCurrency(community.lotteryAmount)} {community.currency}</p>
        <p className="text-gray-500 text-[10px]">${formatCurrency(community.lotteryUsd)}</p>
      </div>

      {/* BMC */}
      <div className="bg-gray-800/50 rounded-xl p-3">
        <p className="text-gray-400 text-[10px]">{t('community.building_management')}</p>
        <p className="text-blue-400 text-sm font-bold">{formatCurrency(community.bmcInitial)} {community.currency}</p>
        <p className="text-green-400 text-[10px]">+{formatCurrency(community.bmcAdded)} {community.currency}</p>
        <p className="text-yellow-400 text-sm font-bold mt-1">Total: {formatCurrency(community.bmcAmount)} {community.currency}</p>
        <p className="text-gray-500 text-[10px]">${formatCurrency(community.bmcUsd)}</p>
      </div>

      {/* Community */}
      <div className="bg-gray-800/50 rounded-xl p-3">
        <p className="text-gray-400 text-[10px]">{t('community.community')}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl">{getCryptoIcon(community.currency) || '💱'}</span>
          <span className="text-white font-bold">{community.currency}</span>
        </div>
        <p className="text-gray-500 text-[10px] mt-1">{new Date(community.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-500 text-[10px]">{community.days} {t('community.days')}</p>
      </div>

      {/* Rank */}
      <div className="bg-gray-800/50 rounded-xl p-3">
        <p className="text-gray-400 text-[10px]">{t('community.group_rank')}</p>
        <p className="text-yellow-400 text-2xl font-bold">#{community.rank}</p>
        <p className="text-gray-500 text-[10px]">{community.currency} {t('community.community')}</p>
      </div>
    </div>
  );
};

export default CommunityStats;