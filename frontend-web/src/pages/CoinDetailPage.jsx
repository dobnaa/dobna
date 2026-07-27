// pages/CoinDetailPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useWalletStore } from '../stores/walletStore';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency, formatUSD, formatCompactNumber } from '../utils/currencyFormatter';
import { getCryptoIcon, getFlagEmoji } from '../utils/assetMapper';
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Send,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  Info,
} from 'lucide-react';

// کامپوننت‌ها
import PriceChart from '../components/wallet/PriceChart';
import TransactionItem from '../components/wallet/TransactionItem';

// ======================================================
// لیست رمزارزها (برای تشخیص آیکون SVG)
// ======================================================
const CRYPTO_CURRENCIES = [
  'BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON',
  'BONK', 'PEPE', 'HMSTR', 'USDC', 'SUI',
];

// ======================================================
// صفحه جزئیات ارز
// ======================================================
const CoinDetailPage = () => {
  const { currency: currencyParam } = useParams();
  const navigate = useNavigate();
  const { t, i18n, isRTL } = useTranslation();
  const { user } = useAuth();
  const {
    balances,
    transactions,
    fetchCoinData,
    isLoading: isStoreLoading,
    error,
  } = useWalletStore();

  const [coinData, setCoinData] = useState(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'details'

  // نرمال‌سازی کد ارز به حروف بزرگ؛ در همه‌جای کامپوننت باید از همین نسخه استفاده شود
  // (URL ممکن است 'btc' باشد ولی دیتابیس/فایل‌های ترجمه/assetMapper با 'BTC' کار می‌کنند)
  const currencyCode = (currencyParam || '').toUpperCase();

  const isCrypto = CRYPTO_CURRENCIES.includes(currencyCode);

  // ======================================================
  // بارگذاری داده‌ها
  // ======================================================
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCoinData(currencyCode, timeframe);
        setCoinData(data.coin);
        setPriceHistory(data.history || []);
      } catch (err) {
        console.error('Error loading coin data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (currencyCode) loadData();
  }, [currencyCode, timeframe, fetchCoinData]);

  // ======================================================
  // فیلتر تراکنش‌های این ارز
  // ======================================================
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions
      .filter((tx) => tx.currency === currencyCode)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [transactions, currencyCode]);

  // ======================================================
  // آمار ارز (برای نمایش در تب جزئیات)
  // ======================================================
  const coinStats = useMemo(() => {
    if (!coinData) return null;
    return {
      marketCap: coinData.marketCap || 0,
      volume24h: coinData.volume24h || 0,
      supply: coinData.supply || 0,
      ath: coinData.ath || 0,
      atl: coinData.atl || 0,
    };
  }, [coinData]);

  // ======================================================
  // نام ارز به زبان محلی
  // ======================================================
  const getLocalizedName = useCallback(() => {
    if (!currencyCode) return '';
    return t(`currencies.${currencyCode}`, { defaultValue: currencyCode });
  }, [currencyCode, t]);

  // ======================================================
  // هندلر تغییر تایم‌فریم
  // ======================================================
  const handleTimeframeChange = useCallback((tf) => {
    setTimeframe(tf);
  }, []);

  // ======================================================
  // هندلرهای ناوبری
  // ======================================================
  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleDeposit = useCallback(() => navigate('/deposit'), [navigate]);
  const handleWithdraw = useCallback(() => navigate('/withdraw'), [navigate]);
  const handleSwap = useCallback(() => navigate('/swap'), [navigate]);
  const handleTransfer = useCallback(() => navigate('/transfer'), [navigate]);

  // ======================================================
  // رندر لودینگ
  // ======================================================
  if (isLoading || isStoreLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ======================================================
  // رندر خطا
  // ======================================================
  if (error || !coinData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <button onClick={handleBack} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> {t('common.back')}
        </button>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-400">{error || t('coin.error_loading')}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-blue-400 hover:text-blue-300 transition"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  // تبدیل امن change24h به عدد (ممکن است از API به‌صورت string بیاید)
  const change24h = Number(coinData.change24h ?? 0);
  const isPositive = change24h >= 0;

  // فرمت فشرده‌ی supply همراه با واحد (M/B/T) که قبلاً گم می‌شد
  const supplyCompact = formatCompactNumber(coinStats?.supply || 0);
  const supplyDisplay = supplyCompact.unit
    ? `${supplyCompact.value}${supplyCompact.unit}`
    : `${supplyCompact.value}`;

  // ======================================================
  // رندر اصلی
  // ======================================================
  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-4 pb-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ===== هدر ===== */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {/* آیکون ارز */}
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-lg overflow-hidden">
            {isCrypto ? (
              <img
                src={getCryptoIcon(currencyCode)}
                alt={currencyCode}
                className="w-5 h-5"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.textContent = '💱';
                }}
              />
            ) : (
              <span>{getFlagEmoji(currencyCode)}</span>
            )}
          </div>
          <h1 className="text-xl font-bold">{currencyCode}</h1>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
            {getLocalizedName()}
          </span>
        </div>
        <div className="w-8" />
      </div>

      {/* ===== قیمت و تغییرات ===== */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">
            {formatUSD(coinData.price || 0)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
            </span>
            <span className="text-gray-400 text-xs">24h</span>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">{t('wallet.balance')}</p>
          <p className="text-white font-bold">
            {formatCurrency(coinData.balance || 0, currencyCode)}
          </p>
          <p className="text-blue-400 text-xs">
            ≈ {formatUSD(coinData.usdValue || 0)}
          </p>
        </div>
      </div>

      {/* ===== چارت ===== */}
      <div className="mt-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
        <PriceChart
          data={priceHistory}
          timeframe={timeframe}
          isRTL={isRTL}
          currency={currencyCode}
        />
        <div className="flex gap-1 mt-3 justify-center flex-wrap">
          {['1H', '1D', '1W', '1M', 'YTD', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* ===== دکمه‌های عملیاتی ===== */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <button
          onClick={handleDeposit}
          className="bg-blue-600 rounded-xl py-3 flex flex-col items-center hover:bg-blue-700 transition"
        >
          <ArrowUp className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.deposit')}</span>
        </button>
        <button
          onClick={handleWithdraw}
          className="bg-red-600 rounded-xl py-3 flex flex-col items-center hover:bg-red-700 transition"
        >
          <ArrowDown className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.withdraw')}</span>
        </button>
        <button
          onClick={handleSwap}
          className="bg-purple-600 rounded-xl py-3 flex flex-col items-center hover:bg-purple-700 transition"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.swap')}</span>
        </button>
        <button
          onClick={handleTransfer}
          className="bg-yellow-600 rounded-xl py-3 flex flex-col items-center hover:bg-yellow-700 transition"
        >
          <Send className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.transfer')}</span>
        </button>
      </div>

      {/* ===== تب‌های Activity / Details ===== */}
      <div className="mt-6 border-b border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-2 text-sm font-medium transition relative ${
              activeTab === 'transactions' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t('wallet.activity')}
            {activeTab === 'transactions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 text-sm font-medium transition relative ${
              activeTab === 'details' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t('coin.details')}
            {activeTab === 'details' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* ===== محتوای تب‌ها ===== */}
      <div className="mt-4">
        {activeTab === 'transactions' ? (
          // ----- لیست تراکنش‌ها -----
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                {filteredTransactions.length} {t('wallet.transactions')}
              </span>
              {filteredTransactions.length > 0 && (
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {t('coin.recent_first')}
                </span>
              )}
            </div>
            <div className="space-y-1">
              {filteredTransactions.length === 0 ? (
                <div className="bg-gray-800/30 rounded-xl p-6 text-center text-gray-500">
                  <Info className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm">{t('wallet.no_transactions')}</p>
                  <p className="text-xs text-gray-600 mt-1">{t('coin.start_trading')}</p>
                </div>
              ) : (
                filteredTransactions.slice(0, 20).map((tx) => (
                  <TransactionItem
                    key={tx.id || tx.tx_id}
                    tx={tx}
                    isRTL={isRTL}
                  />
                ))
              )}
            </div>
            {filteredTransactions.length > 20 && (
              <button
                onClick={() => navigate('/activity')}
                className="w-full mt-3 text-center text-blue-400 text-sm hover:text-blue-300 transition"
              >
                {t('wallet.view_all')} →
              </button>
            )}
          </div>
        ) : (
          // ----- جزئیات ارز -----
          <div className="bg-gray-800/30 rounded-xl p-4 space-y-3 border border-gray-700/20">
            <div className="flex justify-between py-2 border-b border-gray-700/30">
              <span className="text-gray-400 text-sm">{t('coin.market_cap')}</span>
              <span className="text-white font-medium">{formatUSD(coinStats?.marketCap || 0)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700/30">
              <span className="text-gray-400 text-sm">{t('coin.volume_24h')}</span>
              <span className="text-white font-medium">{formatUSD(coinStats?.volume24h || 0)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700/30">
              <span className="text-gray-400 text-sm">{t('coin.supply')}</span>
              <span className="text-white font-medium">
                {supplyDisplay} {coinStats?.supply ? t('coin.units') : ''}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700/30">
              <span className="text-gray-400 text-sm">{t('coin.all_time_high')}</span>
              <span className="text-green-400 font-medium">{formatUSD(coinStats?.ath || 0)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400 text-sm">{t('coin.all_time_low')}</span>
              <span className="text-red-400 font-medium">{formatUSD(coinStats?.atl || 0)}</span>
            </div>

            {/* اطلاعات بیشتر */}
            <div className="mt-4 pt-4 border-t border-gray-700/30">
              <p className="text-xs text-gray-500">
                {t('coin.last_updated')}: {new Date(coinData.lastUpdated || Date.now()).toLocaleString(i18n.language)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ===== دکمه سریع ===== */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/swap')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {t('wallet.swap')} {currencyCode}
        </button>
      </div>
    </div>
  );
};

export default CoinDetailPage;
