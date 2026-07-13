// components/wallet/WalletHeader.jsx
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