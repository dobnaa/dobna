// pages/CoinDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowUp, ArrowDown, RefreshCw, Send } from 'lucide-react';
import { useWalletStore } from '../stores/walletStore';
import { formatCurrency } from '../utils/currencyFormatter';
import PriceChart from '../components/wallet/PriceChart';
import TransactionItem from '../components/wallet/TransactionItem';

const CoinDetailPage = () => {
  const { currency } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { balances, transactions, fetchCoinData } = useWalletStore();
  
  const [coinData, setCoinData] = useState(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCoinData(currency, timeframe);
        setCoinData(data.coin);
        setPriceHistory(data.history);
      } catch (error) {
        console.error('Error loading coin data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [currency, timeframe]);

  const filteredTransactions = transactions.filter(tx => tx.currency === currency);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pb-24">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{currency}</h1>
        <div className="w-8" />
      </div>

      {/* قیمت و تغییرات */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">${formatCurrency(coinData?.price || 0)}</p>
          <p className={`text-sm ${(coinData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(coinData?.change24h || 0) >= 0 ? '+' : ''}{coinData?.change24h?.toFixed(2)}% 
            <span className="text-gray-400 text-xs ml-2">24h</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">{t('wallet.balance')}</p>
          <p className="text-white font-bold">{formatCurrency(coinData?.balance || 0)}</p>
          <p className="text-blue-400 text-xs">${formatCurrency(coinData?.usdValue || 0)}</p>
        </div>
      </div>

      {/* چارت */}
      <div className="mt-4 bg-gray-800/50 rounded-xl p-4">
        <PriceChart data={priceHistory} timeframe={timeframe} />
        <div className="flex gap-2 mt-3 justify-center">
          {['1H', '1D', '1W', '1M', 'YTD', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs transition ${
                timeframe === tf ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* دکمه‌های عملیاتی */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <button onClick={() => navigate('/deposit')} className="bg-blue-600 rounded-xl py-3 flex flex-col items-center hover:bg-blue-700 transition">
          <ArrowUp className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.deposit')}</span>
        </button>
        <button onClick={() => navigate('/withdraw')} className="bg-red-600 rounded-xl py-3 flex flex-col items-center hover:bg-red-700 transition">
          <ArrowDown className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.withdraw')}</span>
        </button>
        <button onClick={() => navigate('/swap')} className="bg-purple-600 rounded-xl py-3 flex flex-col items-center hover:bg-purple-700 transition">
          <RefreshCw className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.swap')}</span>
        </button>
        <button onClick={() => navigate('/transfer')} className="bg-yellow-600 rounded-xl py-3 flex flex-col items-center hover:bg-yellow-700 transition">
          <Send className="w-5 h-5" />
          <span className="text-xs mt-1">{t('wallet.transfer')}</span>
        </button>
      </div>

      {/* فعالیت‌ها */}
      <div className="mt-6">
        <h3 className="text-gray-400 text-sm mb-2">{t('wallet.activity')}</h3>
        <div className="space-y-1">
          {filteredTransactions.length === 0 ? (
            <div className="bg-gray-800/30 rounded-xl p-4 text-center text-gray-500 text-sm">
              {t('wallet.no_transactions')}
            </div>
          ) : (
            filteredTransactions.slice(0, 10).map((tx) => (
              <TransactionItem key={tx.id || tx.tx_id} tx={tx} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetailPage;