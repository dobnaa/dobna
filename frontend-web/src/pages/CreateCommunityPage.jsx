import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateGroupId } from '../utils/idGenerator';
import { supabase } from '../services/supabaseClient';
import { getAvatarUrl } from '../utils/avatarGenerator';
import { SUPPORTED_CURRENCIES } from '../config/constants';

const CreateCommunityPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // فرم داده‌ها
  const [formData, setFormData] = useState({
    avatar: 'default',
    name: '',
    currency: 'USDT',
    bmcAmount: 0.0001,
    groupId: 'GP000001',
  });

  const [balance, setBalance] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  // دریافت موجودی کاربر
  useEffect(() => {
    const fetchBalance = async () => {
      // دریافت موجودی از API
      setBalance(0.0001); // مقدار تست
    };
    fetchBalance();
  }, []);

  // تولید شناسه گروه
  useEffect(() => {
    const generateId = async () => {
      // دریافت آخرین شماره گروه از دیتابیس
      const { data, error } = await supabase
        .from('communities')
        .select('gp_id')
        .order('id', { ascending: false })
        .limit(1);
      
      const lastNumber = data && data.length > 0 
        ? parseInt(data[0].gp_id.replace('GP', '')) 
        : 0;
      
      setFormData(prev => ({
        ...prev,
        groupId: generateGroupId(lastNumber),
      }));
    };
    generateId();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // بررسی موجودی کافی
      if (balance < formData.bmcAmount) {
        alert('موجودی کافی نیست');
        return;
      }

      // ایجاد گروه در دیتابیس
      const { data, error } = await supabase
        .from('communities')
        .insert({
          gp_id: formData.groupId,
          name: formData.name,
          currency: formData.currency,
          bmc_amount: formData.bmcAmount,
          owner_id: (await supabase.auth.getUser()).data.user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // انتقال به صفحه گروه جدید
      navigate(`/community/${data.id}`);
    } catch (error) {
      console.error('Error creating group:', error);
      alert('خطا در ساخت گروه');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* هدر */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            ← {t('common.back')}
          </button>
          <h1 className="text-xl font-bold">{t('community.create_title')}</h1>
          <div className="w-8" />
        </div>

        {/* انتخاب آواتار */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            {t('community.avatar')}
          </label>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {['default', '1', '2', '3', '4', '5'].map((num) => (
              <button
                key={num}
                onClick={() => setFormData(prev => ({ ...prev, avatar: num }))}
                className={`w-16 h-16 rounded-full border-2 transition ${
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

        {/* نام گروه */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            {t('community.group_name')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder={t('community.enter_group_name')}
            className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-500 text-xs mt-1">
            {t('community.name_hint')}
          </p>
        </div>

        {/* انتخاب ارز */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            {t('community.select_currency')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SUPPORTED_CURRENCIES.slice(0, 6).map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setFormData(prev => ({ ...prev, currency: currency.code }));
                  setSelectedCurrency(currency);
                }}
                className={`p-3 rounded-lg text-center transition ${
                  formData.currency === currency.code
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="text-2xl">{currency.icon}</span>
                <p className="text-xs mt-1">{currency.code}</p>
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-gray-400 text-sm">{t('community.balance')}:</span>
            <span className="text-white">
              {balance} {formData.currency}
            </span>
          </div>
        </div>

        {/* شناسه گروه */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            {t('community.group_id')}
          </label>
          <div className="bg-gray-700 rounded-lg px-4 py-3 flex items-center">
            <span className="text-gray-400">
              http://dobna.com/ ID Group-{formData.currency}
            </span>
            <span className="text-blue-400 ml-2">-{formData.currency}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            {t('community.id_hint')}
          </p>
          <p className="text-yellow-500 text-xs mt-1">
            ⚠️ {t('community.id_warning')}
          </p>
        </div>

        {/* BMC */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            {t('community.bmc_amount')}
          </label>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-yellow-400">
              {formData.bmcAmount} {formData.currency}
            </span>
            <span className="text-gray-500 text-sm">
              ${(formData.bmcAmount * (selectedCurrency?.price || 1)).toFixed(2)}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {t('community.bmc_hint')}
          </p>
        </div>

        {/* دکمه ساخت */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !formData.name || balance < formData.bmcAmount}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('common.loading') : t('community.create_button')}
        </button>

        <p className="text-center text-gray-500 text-xs mt-4">
          {t('community.id_preview')}: {formData.groupId}
        </p>
      </div>
    </div>
  );
};

export default CreateCommunityPage;