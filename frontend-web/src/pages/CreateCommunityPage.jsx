// pages/CreateCommunityPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCommunityStore } from '../stores/communityStore';
import { useWalletStore } from '../stores/walletStore';
import { ArrowLeft, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { getAvatarUrl, getCryptoIcon } from '../utils/assetMapper';
import { formatCurrency } from '../utils/currencyFormatter';
import { generateGroupId } from '../utils/idGenerator';
import { supabase } from '../services/supabaseClient';

const CreateCommunityPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { createCommunity, isLoading: isCommunityLoading } = useCommunityStore();
  const { balances, fetchBalances } = useWalletStore();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  // فرم داده‌ها
  const [formData, setFormData] = useState({
    avatar: 'default',
    name: '',
    username: '',
    currency: 'BTC',
    bmcAmount: 0,
  });

  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [groupGPId, setGroupGPId] = useState('GP000001');
  const [error, setError] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // لیست ارزهای پشتیبانی‌شده (با قیمت لحظه‌ای)
  const currencies = [
    { code: 'BTC', name: 'Bitcoin', icon: '₿', price: 65000 },
    { code: 'ETH', name: 'Ethereum', icon: '⟠', price: 3500 },
    { code: 'USDT', name: 'Tether', icon: '₮', price: 1 },
    { code: 'SOL', name: 'Solana', icon: '◎', price: 150 },
    { code: 'BNB', name: 'BNB', icon: '🟡', price: 600 },
    { code: 'DOGE', name: 'Dogecoin', icon: 'Ð', price: 0.15 },
    { code: 'TON', name: 'Toncoin', icon: '◆', price: 5 },
    { code: 'USD', name: 'US Dollar', icon: '$', price: 1 },
    { code: 'IRT', name: 'Iranian Toman', icon: '﷼', price: 0.000025 },
    { code: 'EUR', name: 'Euro', icon: '€', price: 1.08 },
    { code: 'TRY', name: 'Turkish Lira', icon: '₺', price: 0.033 },
    { code: 'GBP', name: 'British Pound', icon: '£', price: 1.27 },
    { code: 'AED', name: 'UAE Dirham', icon: 'د.إ', price: 0.27 },
    { code: 'CAD', name: 'Canadian Dollar', icon: 'C$', price: 0.73 },
    { code: 'CHF', name: 'Swiss Franc', icon: 'Fr', price: 1.12 },
    { code: 'AUD', name: 'Australian Dollar', icon: 'A$', price: 0.66 },
    { code: 'INR', name: 'Indian Rupee', icon: '₹', price: 0.012 },
    { code: 'CNY', name: 'Chinese Yuan', icon: '¥', price: 0.14 },
  ];

  const selectedCurrency = currencies[selectedCurrencyIndex];

  // دریافت موجودی کاربر برای ارز انتخاب‌شده
  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!user?.id || !selectedCurrency) return;
      
      try {
        const { data, error } = await supabase
          .from('user_balances')
          .select('amount')
          .eq('user_id', user.id)
          .eq('currency', selectedCurrency.code)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setUserBalance(data?.amount || 0);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setUserBalance(0);
      }
    };

    fetchUserBalance();
  }, [user?.id, selectedCurrency]);

  // محاسبه مقدار BMC معادل 100 دلار
  useEffect(() => {
    if (!selectedCurrency) return;
    const bmcValue = 100 / selectedCurrency.price;
    setFormData(prev => ({
      ...prev,
      currency: selectedCurrency.code,
      bmcAmount: bmcValue,
    }));
  }, [selectedCurrency]);

  // تولید شناسه گروه
  useEffect(() => {
    const generateId = async () => {
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('gp_id')
          .order('id', { ascending: false })
          .limit(1);

        if (error && error.code !== 'PGRST116') throw error;

        const lastNumber = data && data.length > 0 
          ? parseInt(data[0].gp_id.replace('GP', '')) 
          : 0;

        const newId = generateGroupId(lastNumber);
        setGroupGPId(newId);
      } catch (error) {
        console.error('Error generating GP ID:', error);
        setGroupGPId('GP000001');
      }
    };
    generateId();
  }, []);

  // به‌روزرسانی شناسه گروه با تغییر ارز
  useEffect(() => {
    const updateGroupId = async () => {
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('gp_id')
          .order('id', { ascending: false })
          .limit(1);

        if (error && error.code !== 'PGRST116') throw error;

        const lastNumber = data && data.length > 0 
          ? parseInt(data[0].gp_id.replace('GP', '')) 
          : 0;

        const newId = generateGroupId(lastNumber);
        setGroupGPId(newId);
      } catch (error) {
        console.error('Error updating GP ID:', error);
      }
    };
    updateGroupId();
  }, [selectedCurrencyIndex]);

  // اعتبارسنجی و ارسال فرم
  const handleSubmit = async () => {
    // اعتبارسنجی
    if (!formData.name || formData.name.length < 3) {
      setError('نام گروه باید حداقل ۳ کاراکتر باشد');
      return;
    }
    if (!formData.username || formData.username.length < 6) {
      setError('شناسه گروه باید حداقل ۶ کاراکتر باشد');
      return;
    }
    if (!formData.currency) {
      setError('لطفاً ارز گروه را انتخاب کنید');
      return;
    }

    // بررسی موجودی کافی
    if (userBalance < formData.bmcAmount) {
      setError(`موجودی کافی نیست. موجودی: ${formatCurrency(userBalance)} ${selectedCurrency.code}`);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await createCommunity({
        ...formData,
        gpId: groupGPId,
        bmcAmount: formData.bmcAmount,
        currency: selectedCurrency.code,
      });
      navigate(`/community/${formData.username}`);
    } catch (err) {
      setError(err.message || 'خطا در ساخت گروه');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* هدر */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">{t('communities.create_title')}</h1>
            <p className="text-xs text-gray-400">{t('communities.create_subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* انتخاب آواتار */}
        <div>
          <div className="flex items-center gap-3">
            <button className="w-20 h-20 rounded-full bg-gray-700 border-2 border-dashed border-gray-500 flex items-center justify-center hover:border-blue-500 transition overflow-hidden">
              <img
                src={formData.avatar === 'default' ? getAvatarUrl('default') : getAvatarUrl(formData.avatar)}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </button>
            <div>
              <p className="text-gray-400 text-sm">{t('communities.choose_avatar')}</p>
              <div className="flex gap-1 mt-1">
                {['default', '1', '2', '3', '4'].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFormData(prev => ({ ...prev, avatar: num }))}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      formData.avatar === num ? 'border-blue-500' : 'border-gray-600'
                    }`}
                  >
                    <img
                      src={getAvatarUrl(num)}
                      alt={`avatar-${num}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* نام گروه */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('communities.group_name')}</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder={t('communities.enter_group_name')}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            minLength={3}
            maxLength={30}
          />
          <p className="text-gray-500 text-xs mt-1">{t('communities.name_hint')}</p>
        </div>

        {/* انتخاب کامونیتی (ارز) */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('communities.select_community')}</label>
          <div className="relative">
            <div 
              className="bg-gray-800 rounded-lg p-3 flex items-center justify-between cursor-pointer border border-gray-700 hover:border-gray-500 transition"
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedCurrency.icon}</span>
                <span className="text-white">{selectedCurrency.name}</span>
                <span className="text-gray-400 text-sm">{selectedCurrency.code}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="text-gray-400 hover:text-white">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* دراپ‌داون ارزها */}
            {isCurrencyOpen && (
              <div className="absolute z-20 w-full mt-1 bg-gray-800 rounded-lg border border-gray-700 max-h-60 overflow-y-auto shadow-2xl">
                {currencies.map((curr, idx) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setSelectedCurrencyIndex(idx);
                      setIsCurrencyOpen(false);
                    }}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition border-b border-gray-700/30 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{curr.icon}</span>
                      <span className="text-white">{curr.name}</span>
                      <span className="text-gray-400 text-sm">{curr.code}</span>
                    </div>
                    {selectedCurrencyIndex === idx && (
                      <span className="text-blue-400 text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-xs">{t('communities.select_community_hint')}</p>
            <p className="text-gray-400 text-xs">
              {t('communities.balance')}: <span className="text-white font-medium">{formatCurrency(userBalance)} {selectedCurrency.code}</span>
            </p>
          </div>
        </div>

        {/* شناسه گروه */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('communities.group_username')}</label>
          <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 border border-gray-700">
            <span className="text-gray-400 px-3 text-sm">@</span>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder={t('communities.enter_username')}
              className="flex-1 bg-transparent px-2 py-3 text-white placeholder-gray-500 outline-none"
              minLength={6}
              maxLength={30}
            />
            <span className="text-gray-400 px-3 text-sm font-mono">-{selectedCurrency.code}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">{t('communities.username_hint')}</p>
          <p className="text-yellow-500 text-xs mt-1">⚠️ {t('communities.username_warning')}</p>
        </div>

        {/* BMC */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('communities.bmc_required')}</label>
          <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-yellow-400">
                {formData.bmcAmount.toFixed(8)} {selectedCurrency.code}
              </p>
              <p className="text-gray-400 text-sm">$100.00 USD</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-1">{t('communities.bmc_hint')}</p>
        </div>

        {/* خطا */}
        {error && (
          <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg p-2 border border-red-500/20">
            {error}
          </p>
        )}

        {/* دکمه ساخت */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || isCommunityLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isCommunityLoading ? t('common.loading') : t('communities.create_button')}
        </button>

        {/* شناسه GP */}
        <div className="text-center bg-gray-800/30 rounded-lg py-2">
          <p className="text-gray-500 text-sm">
            {t('communities.gp_id')}: <span className="text-blue-400 font-mono font-bold">{groupGPId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityPage;