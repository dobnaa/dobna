// components/wallet/WalletHeader.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Copy, FileText, Camera, Share2, Eye, EyeOff } from 'lucide-react';

const WalletHeader = ({
  did,
  onBack,
  onCopy,
  onOrder,
  onScan,
  onShare,
  showBalance,
  onToggleBalance,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex items-center justify-between">
      {/* فلش برگشت */}
      <button onClick={onBack} className="text-gray-400 hover:text-white transition">
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* DID + کپی */}
      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-mono">
          {did}
        </span>
        <button onClick={onCopy} className="text-gray-400 hover:text-white transition">
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* آیکون‌های سمت راست */}
      <div className="flex items-center gap-3">
        {/* نمایش/مخفی کردن موجودی */}
        <button onClick={onToggleBalance} className="text-gray-400 hover:text-white transition">
          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        {/* Order (درخواست پرداخت) */}
        <button onClick={onOrder} className="text-gray-400 hover:text-white transition">
          <FileText className="w-5 h-5" />
        </button>

        {/* دوربین (اسکن QR) */}
        <button onClick={onScan} className="text-gray-400 hover:text-white transition">
          <Camera className="w-5 h-5" />
        </button>

        {/* اشتراک‌گذاری */}
        <button onClick={onShare} className="text-gray-400 hover:text-white transition">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WalletHeader;

import { ArrowLeft, Copy, FileText, Camera, Share2 } from 'lucide-react';

const WalletHeader = ({ did, onCopy, onOrder, onScan, onShare, onBack }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700">
      <button onClick={onBack} className="text-gray-400">
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-mono">{did}</span>
        <button onClick={onCopy} className="text-gray-400 hover:text-white">
          <Copy className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <button onClick={onOrder} className="text-gray-400 hover:text-white">
          <FileText className="w-5 h-5" />
        </button>
        <button onClick={onScan} className="text-gray-400 hover:text-white">
          <Camera className="w-5 h-5" />
        </button>
        <button onClick={onShare} className="text-gray-400 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};