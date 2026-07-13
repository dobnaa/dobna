// pages/CoinDetailPage.jsx
const CoinDetailPage = ({ currency }) => {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState('1D');
  const [priceData, setPriceData] = useState([]);

  // دریافت داده‌های قیمت از Supabase
  useEffect(() => {
    fetchPriceHistory(currency, timeframe);
  }, [currency, timeframe]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{currency}</h1>
        <div className="text-right">
          <p className="text-2xl font-bold">${currentPrice}</p>
          <p className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
            {change >= 0 ? '+' : ''}{change}% 
          </p>
        </div>
      </div>

      {/* چارت */}
      <div className="mt-4 bg-gray-800 rounded-xl p-4">
        <PriceChart data={priceData} timeframe={timeframe} />
        <div className="flex gap-2 mt-3">
          {['1H', '1D', '1W', '1M', 'YTD', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs ${
                timeframe === tf ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* دکمه‌های عملیاتی */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <ActionButton icon={ArrowUp} label={t('wallet.deposit')} />
        <ActionButton icon={ArrowDown} label={t('wallet.withdraw')} />
        <ActionButton icon={RefreshCw} label={t('wallet.swap')} />
        <ActionButton icon={Send} label={t('wallet.transfer')} />
      </div>

      {/* فعالیت‌ها */}
      <div className="mt-4">
        <h3 className="text-gray-400 text-sm mb-2">{t('wallet.activity')}</h3>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
};