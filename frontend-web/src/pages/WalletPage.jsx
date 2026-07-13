// pages/WalletPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../stores/walletStore';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/currencyFormatter';
import { calculateDailyInterest } from '../utils/interestCalculator';

// کامپوننت‌ها
import WalletHeader from '../components/wallet/WalletHeader';
import TotalValue from '../components/wallet/TotalValue';
import ActionButtons from '../components/wallet/ActionButtons';
import AssetsSection from '../components/wallet/AssetsSection';

const WalletPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  // بارگذاری داده‌ها
  useEffect(() => {
    if (user) {
      fetchWalletData(user.id);
    }
  }, [user, fetchWalletData]);

  // هدایت به صفحات
  const handleBack = () => navigate(-1);
  const handleOrder = () => navigate('/order');
  const handleScan = () => navigate('/scan-qr');
  const handleShare = () => {
    // اشتراک‌گذاری لینک دعوت
    const link = `http://dobna.com/invite/${user?.did}`;
    if (navigator.share) {
      navigator.share({ title: 'DOBNA', text: 'Join me on DOBNA!', url: link });
    } else {
      navigator.clipboard.writeText(link);
      alert(t('wallet.link_copied'));
    }
  };
  const handleCopyDID = () => {
    navigator.clipboard.writeText(user?.did || '');
    alert(t('wallet.did_copied'));
  };

  const handleDeposit = () => navigate('/deposit');
  const handleWithdraw = () => navigate('/withdraw');
  const handleSwap = () => navigate('/swap');
  const handleTransfer = () => navigate('/transfer');

  const handleAssetPress = (currency) => {
    navigate(`/coin/${currency}`);
  };

  const handleWithdrawInterest = async () => {
    try {
      await withdrawInterest();
      alert(t('wallet.interest_withdrawn'));
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <WalletHeader
        did={user?.did || '---'}
        onBack={handleBack}
        onCopy={handleCopyDID}
        onOrder={handleOrder}
        onScan={handleScan}
        onShare={handleShare}
        showBalance={showBalance}
        onToggleBalance={() => setShowBalance(!showBalance)}
      />

      {/* ارزش کل و سود */}
      <TotalValue
        totalValue={totalValue}
        dailyInterest={dailyInterest}
        showBalance={showBalance}
        onWithdrawInterest={handleWithdrawInterest}
      />

      {/* دکمه‌های عملیاتی */}
      <ActionButtons
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        onSwap={handleSwap}
        onTransfer={handleTransfer}
      />

      {/* بخش دارایی‌ها */}
      <AssetsSection
        assets={balances}
        onAssetPress={handleAssetPress}
        transactions={transactions}
      />
    </div>
  );
};

export default WalletPage;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../stores/walletStore';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency, formatCompactNumber } from '../utils/currencyFormatter';
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
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// کامپوننت فرعی: نمایش هر دارایی
const AssetItem = ({ asset, onClick }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';
  
  // نام ارز به زبان فارسی یا انگلیسی
  const getLocalizedName = (currency) => {
    const names = {
      BTC: { en: 'Bitcoin', fa: 'بیت‌کوین' },
      ETH: { en: 'Ethereum', fa: 'اتریوم' },
      USDT: { en: 'Tether', fa: 'تتر' },
      SOL: { en: 'Solana', fa: 'سولانا' },
      BNB: { en: 'BNB', fa: 'بایننس کوین' },
      DOGE: { en: 'Dogecoin', fa: 'دوج‌کوین' },
      TON: { en: 'Toncoin', fa: 'تون‌کوین' },
      IRT: { en: 'Iranian Toman', fa: 'تومان ایران' },
      USD: { en: 'US Dollar', fa: 'دلار آمریکا' },
      EUR: { en: 'Euro', fa: 'یورو' },
      GBP: { en: 'British Pound', fa: 'پوند' },
      TRY: { en: 'Turkish Lira', fa: 'لیر ترکیه' },
      AED: { en: 'UAE Dirham', fa: 'درهم امارات' },
      CAD: { en: 'Canadian Dollar', fa: 'دلار کانادا' },
      CHF: { en: 'Swiss Franc', fa: 'فرانک سوئیس' },
      AUD: { en: 'Australian Dollar', fa: 'دلار استرالیا' },
      INR: { en: 'Indian Rupee', fa: 'روپیه هند' },
      CNY: { en: 'Chinese Yuan', fa: 'یوان چین' },
    };
    return names[currency]?.[isRTL ? 'fa' : 'en'] || currency;
  };

  return (
    <button
      onClick={() => onClick(asset)}
      className="w-full bg-gray-800/50 rounded-xl p-3 flex items-center justify-between hover:bg-gray-700/50 transition border border-gray-700/30"
    >
      <div className="flex items-center gap-3">
        {/* آیکون ارز */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
          {asset.icon || getCryptoIcon(asset.currency) || '💱'}
        </div>
        <div className="text-left">
          <p className="text-white font-medium">{asset.currency}</p>
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

// کامپوننت فرعی: نمایش هر تراکنش
const TransactionItem = ({ tx }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';
  
  const getTypeLabel = (type) => {
    const labels = {
      deposit: { en: 'Deposit', fa: 'واریز' },
      withdraw: { en: 'Withdraw', fa: 'برداشت' },
      swap: { en: 'Swap', fa: 'تبدیل' },
      transfer: { en: 'Transfer', fa: 'انتقال' },
      duel_win: { en: 'Duel Win', fa: 'برد دوئل' },
      challenge_win: { en: 'Challenge Win', fa: 'برد چالش' },
      game_win: { en: 'Game Win', fa: 'برد بازی' },
      duel_create: { en: 'Duel Create', fa: 'ایجاد دوئل' },
      challenge_create: { en: 'Challenge Create', fa: 'ایجاد چالش' },
      duel_refund: { en: 'Duel Refund', fa: 'بازگشت دوئل' },
    };
    return labels[type]?.[isRTL ? 'fa' : 'en'] || type;
  };

  const isPositive = ['deposit', 'duel_win', 'challenge_win', 'game_win', 'duel_refund'].includes(tx.type);
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

// صفحه اصلی کیف پول
const WalletPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { 
    balances, 
    totalValue, 
    dailyInterest, 
    transactions, 
    isLoading,
    fetchWalletData,
    toggleBalanceVisibility
  } = useWalletStore();
  
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('crypto'); // 'crypto' | 'currency'
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  // بارگذاری داده‌ها
  useEffect(() => {
    if (user) {
      fetchWalletData(user.id);
    }
  }, [user, fetchWalletData]);

  // فیلتر تراکنش‌ها بر اساس تب
  useEffect(() => {
    if (!transactions) return;
    const filtered = transactions.filter(tx => {
      if (activeTab === 'crypto') {
        return ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE'].includes(tx.currency);
      } else {
        return ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CAD', 'CHF', 'AUD', 'INR', 'CNY'].includes(tx.currency);
      }
    });
    setFilteredTransactions(filtered);
  }, [transactions, activeTab]);

  // فیلتر دارایی‌ها بر اساس تب
  const filteredBalances = balances?.filter(b => {
    if (activeTab === 'crypto') {
      return ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE'].includes(b.currency);
    } else {
      return ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CAD', 'CHF', 'AUD', 'INR', 'CNY'].includes(b.currency);
    }
  }) || [];

  // تنظیم سود روزانه
  const dailyInterestAmount = (totalValue * 0.01).toFixed(2); // 1% ماهانه

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition">
          <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
        <h1 className="text-lg font-bold">{t('wallet.title')}</h1>
        <button 
          onClick={() => setShowBalance(!showBalance)} 
          className="text-gray-400 hover:text-white transition"
        >
          {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>

      {/* ارزش کل دارایی */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-4 border border-blue-500/20">
          <p className="text-gray-400 text-sm">{t('wallet.total_assets')}</p>
          <p className="text-3xl font-bold text-white">
            {showBalance ? `$${formatCompactNumber(totalValue)}` : '••••••'}
          </p>
          
          {/* سود روزانه */}
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

          {/* دکمه‌های عملیاتی */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <button 
              onClick={() => navigate('/deposit')}
              className="bg-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex flex-col items-center"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{t('wallet.deposit')}</span>
            </button>
            <button 
              onClick={() => navigate('/withdraw')}
              className="bg-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition flex flex-col items-center"
            >
              <ArrowDown className="w-4 h-4" />
              <span>{t('wallet.withdraw')}</span>
            </button>
            <button 
              onClick={() => navigate('/swap')}
              className="bg-purple-600 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition flex flex-col items-center"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t('wallet.swap')}</span>
            </button>
            <button 
              onClick={() => navigate('/transfer')}
              className="bg-yellow-600 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition flex flex-col items-center"
            >
              <Send className="w-4 h-4" />
              <span>{t('wallet.transfer')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* تب‌های Crypto / Currency */}
      <div className="px-4 mb-3">
        <div className="bg-gray-800 rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'crypto' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t('wallet.crypto')}
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'currency' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
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
              <AssetItem 
                key={asset.currency} 
                asset={asset} 
                onClick={() => navigate(`/coin/${asset.currency}`)}
              />
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
          <button 
            onClick={() => navigate('/activity')}
            className="w-full mt-3 text-center text-blue-400 text-sm hover:text-blue-300 transition"
          >
            {t('wallet.view_all')} <ChevronRight className="w-4 h-4 inline" />
          </button>
        )}
      </div>

      {/* لودینگ */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;