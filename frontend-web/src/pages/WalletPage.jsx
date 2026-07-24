// pages/WalletPage.jsx (نسخه استاندارد - بدون هاردکد زبان)
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { useWalletStore } from '../stores/walletStore';
import { formatCompactNumber } from '../utils/currencyFormatter';
import { getCryptoIcon } from '../utils/assetMapper';
import { 
  ArrowDown, 
  ArrowUp, 
  RefreshCw, 
  Send, 
  Eye, 
  EyeOff,
  ChevronRight,
  TrendingUp,
  Clock,
  Share2,
  Copy,
} from 'lucide-react';

// ======================================================
// لیست ارزهای کریپتو و فیات (برای فیلتر کردن)
// ======================================================
const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI'];
const FIAT_CURRENCIES = ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CNY', 'INR', 'CAD', 'CHF', 'AUD'];

// ======================================================
// کامپوننت فرعی: نمایش هر دارایی
// ======================================================
const AssetItem = ({ asset, onClick }) => {
  const { t, currentLanguage } = useTranslation();
  const isRTL = currentLanguage?.dir === 'rtl';
  
  // ✅ استفاده از i18n برای نام ارز
  const getLocalizedName = (currency) => {
    // از فایل‌های locales/*.json استفاده می‌کند
    return t(`currencies.${currency}`, { defaultValue: currency });
  };

  return (
    <button
      onClick={() => onClick(asset)}
      className="w-full bg-gray-800/50 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/50 transition border border-gray-700/30"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
          {asset.icon || getCryptoIcon(asset.currency) || '💱'}
        </div>
        <div className="text-left">
          <p className="text-white font-medium">{asset.currency}</p>
          {/* ✅ ترجمه با i18n */}
          <p className="text-gray-400 text-xs">{getLocalizedName(asset.currency)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">
          {formatCompactNumber(asset.amount)} {asset.currency}
        </p>
        <p className="text-gray-400 text-xs">${formatCompactNumber(asset.usdValue)}</p>
        {asset.change24h !== undefined && (
          <span className={`text-xs ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
          </span>
        )}
      </div>
    </button>
  );
};

// ======================================================
// کامپوننت فرعی: نمایش هر تراکنش
// ======================================================
const TransactionItem = ({ tx }) => {
  const { t, currentLanguage } = useTranslation();
  const isRTL = currentLanguage?.dir === 'rtl';
  
  // ✅ استفاده از i18n برای نوع تراکنش
  const getTypeLabel = (type) => {
    // از فایل‌های locales/*.json استفاده می‌کند
    return t(`transaction_types.${type}`, { defaultValue: type });
  };

  const isPositive = ['deposit', 'duel_win', 'challenge_win', 'game_win', 'duel_refund', 'interest'].includes(tx.type);
  const isNegative = ['withdraw', 'swap', 'transfer', 'duel_create', 'challenge_create'].includes(tx.type);

  return (
    <div className="bg-gray-800/30 rounded-xl p-3 flex items-center justify-between border-b border-gray-700/20">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isPositive ? 'bg-green-500/20' : isNegative ? 'bg-red-500/20' : 'bg-gray-500/20'
        }`}>
          {isPositive ? <ArrowUp className="w-4 h-4 text-green-400" /> : 
           isNegative ? <ArrowDown className="w-4 h-4 text-red-400" /> : 
           <Clock className="w-4 h-4 text-gray-400" />}
        </div>
        <div className="text-left">
          <p className="text-white text-sm font-medium">{getTypeLabel(tx.type)}</p>
          <p className="text-gray-500 text-xs">{tx.description || tx.tx_id?.slice(0, 12)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-white'}`}>
          {isPositive ? '+' : ''}{formatCompactNumber(tx.amount)} {tx.currency}
        </p>
        <p className="text-gray-500 text-[10px]">{tx.created_at ? new Date(tx.created_at).toLocaleDateString() : ''}</p>
      </div>
    </div>
  );
};

// ======================================================
// صفحه اصلی کیف پول
// ======================================================
const WalletPage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const { user } = useAuth();
  const { 
    balances, 
    totalValue, 
    dailyInterest, 
    transactions, 
    isLoading,
    fetchWalletData,
    withdrawInterest,
  } = useWalletStore();
  
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('crypto');
  const [toastMessage, setToastMessage] = useState(null);

  const isRTL = currentLanguage?.dir === 'rtl';

  useEffect(() => {
    if (user) {
      fetchWalletData(user.id);
    }
  }, [user, fetchWalletData]);

  const filteredBalances = useMemo(() => {
    if (!balances) return [];
    const currencyList = activeTab === 'crypto' ? CRYPTO_CURRENCIES : FIAT_CURRENCIES;
    return balances.filter(b => currencyList.includes(b.currency));
  }, [balances, activeTab]);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    const currencyList = activeTab === 'crypto' ? CRYPTO_CURRENCIES : FIAT_CURRENCIES;
    return transactions.filter(tx => currencyList.includes(tx.currency));
  }, [transactions, activeTab]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleOrder = useCallback(() => navigate('/order'), [navigate]);
  const handleScan = useCallback(() => navigate('/scan-qr'), [navigate]);
  const handleDeposit = useCallback(() => navigate('/deposit'), [navigate]);
  const handleWithdraw = useCallback(() => navigate('/withdraw'), [navigate]);
  const handleSwap = useCallback(() => navigate('/swap'), [navigate]);
  const handleTransfer = useCallback(() => navigate('/transfer'), [navigate]);
  const handleAssetPress = useCallback((currency) => navigate(`/coin/${currency}`), [navigate]);

  const handleShare = useCallback(() => {
    const link = `http://dobna.com/invite/${user?.did}`;
    if (navigator.share) {
      navigator.share({ title: 'DOBNA', text: 'Join me on DOBNA!', url: link });
    } else {
      navigator.clipboard.writeText(link);
      setToastMessage(t('wallet.link_copied'));
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [user, t]);

  const handleCopyDID = useCallback(() => {
    navigator.clipboard.writeText(user?.did || '');
    setToastMessage(t('wallet.did_copied'));
    setTimeout(() => setToastMessage(null), 3000);
  }, [user, t]);

  const handleWithdrawInterest = useCallback(async () => {
    try {
      await withdrawInterest();
      setToastMessage(t('wallet.interest_withdrawn'));
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      setToastMessage(error.message);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [withdrawInterest, t]);

  const dailyInterestAmount = (totalValue * 0.01).toFixed(2);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 border border-green-500/30 rounded-xl px-6 py-3 shadow-2xl animate-slide-down">
          <p className="text-white text-sm">{toastMessage}</p>
        </div>
      )}

      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex items-center justify-between">
        <button onClick={handleBack} className="text-gray-400 hover:text-white transition">
          <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
        <h1 className="text-lg font-bold">{t('wallet.title')}</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="text-gray-400 hover:text-white transition">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={handleCopyDID} className="text-gray-400 hover:text-white transition">
            <Copy className="w-5 h-5" />
          </button>
          <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-white transition">
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ارزش کل دارایی */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-4 border border-blue-500/20">
          <p className="text-gray-400 text-sm">{t('wallet.total_assets')}</p>
          <p className="text-3xl font-bold text-white">
            {showBalance ? `$${formatCompactNumber(totalValue)}` : '••••••'}
          </p>
          
          <div className="mt-3 flex items-center justify-between bg-blue-500/10 rounded-lg p-2 border border-blue-500/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">{t('wallet.daily_interest')}</span>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-medium">
                {showBalance ? `$${dailyInterestAmount}` : '••••'}
              </p>
              <p className="text-gray-500 text-[10px]">1% {t('wallet.monthly')}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            <button onClick={handleDeposit} className="bg-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex flex-col items-center">
              <ArrowUp className="w-4 h-4" />
              <span>{t('wallet.deposit')}</span>
            </button>
            <button onClick={handleWithdraw} className="bg-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition flex flex-col items-center">
              <ArrowDown className="w-4 h-4" />
              <span>{t('wallet.withdraw')}</span>
            </button>
            <button onClick={handleSwap} className="bg-purple-600 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition flex flex-col items-center">
              <RefreshCw className="w-4 h-4" />
              <span>{t('wallet.swap')}</span>
            </button>
            <button onClick={handleTransfer} className="bg-yellow-600 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition flex flex-col items-center">
              <Send className="w-4 h-4" />
              <span>{t('wallet.transfer')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="px-4 mb-3">
        <div className="bg-gray-800 rounded-xl p-1 flex">
          <button onClick={() => setActiveTab('crypto')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'crypto' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
            {t('wallet.crypto')}
          </button>
          <button onClick={() => setActiveTab('currency')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'currency' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
            {t('wallet.currency')}
          </button>
        </div>
      </div>

      {/* لیست دارایی‌ها */}
      <div className="px-4 mb-4">
        <h2 className="text-gray-400 text-sm mb-2 flex items-center justify-between">
          <span>{t('wallet.assets')}</span>
          <span className="text-gray-500 text-xs">{filteredBalances.length} {t('wallet.items')}</span>
        </h2>
        <div className="space-y-2">
          {filteredBalances.length > 0 ? (
            filteredBalances.map((asset) => (
              <AssetItem key={asset.currency} asset={asset} onClick={handleAssetPress} />
            ))
          ) : (
            <div className="bg-gray-800/30 rounded-xl p-6 text-center text-gray-500">
              <p>{t('wallet.no_assets')}</p>
            </div>
          )}
        </div>
      </div>

      {/* تاریخچه تراکنش‌ها */}
      <div className="px-4">
        <h2 className="text-gray-400 text-sm mb-2 flex items-center justify-between">
          <span>{t('wallet.activity')}</span>
          <span className="text-gray-500 text-xs">{filteredTransactions.length} {t('wallet.transactions')}</span>
        </h2>
        <div className="space-y-1">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.slice(0, 10).map((tx) => (
              <TransactionItem key={tx.id || tx.tx_id} tx={tx} />
            ))
          ) : (
            <div className="bg-gray-800/30 rounded-xl p-6 text-center text-gray-500">
              <p>{t('wallet.no_transactions')}</p>
            </div>
          )}
        </div>
        {filteredTransactions.length > 10 && (
          <button onClick={() => navigate('/activity')} className="w-full mt-3 text-center text-blue-400 text-sm hover:text-blue-300 transition">
            {t('wallet.view_all')} <ChevronRight className="w-4 h-4 inline" />
          </button>
        )}
      </div>

      {/* انتخاب زبان */}
      <div className="px-4 mt-6 pb-4 flex flex-wrap justify-center gap-1">
        <span className="text-gray-500 text-xs flex items-center mr-1">{t('common.language')}:</span>
        {['en', 'fa', 'tr', 'ar', 'ru', 'es', 'fr', 'de', 'id', 'ko', 'zh'].map((lang) => (
          <button key={lang} onClick={() => changeLanguage(lang)} className={`text-xs px-2 py-1 rounded ${currentLanguage?.code === lang ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;