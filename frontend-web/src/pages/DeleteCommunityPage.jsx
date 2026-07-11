import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabaseClient';

const DeleteCommunityPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { communityId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // اطلاعات ساختگی گروه
  const groupData = {
    name: 'گروه ایران کوین',
    gpId: '@irancoin-BTC',
    bmcInitial: 0.00001,
    bmcBuilt: 0.7341,
    bmcTotal: 0.734501,
    lotteryFund: 0.023191,
  };

  const handleDelete = async () => {
    if (!confirm) {
      alert('لطفاً تأیید حذف را فعال کنید');
      return;
    }

    setIsLoading(true);
    try {
      // حذف گروه از دیتابیس
      const { error } = await supabase
        .from('communities')
        .delete()
        .eq('id', communityId);

      if (error) throw error;

      // بازگشت به صفحه اصلی
      navigate('/');
    } catch (error) {
      console.error('Error deleting group:', error);
      alert('خطا در حذف گروه');
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
          <h1 className="text-xl font-bold text-red-500">{t('community.delete_title')}</h1>
          <div className="w-8" />
        </div>

        {/* اطلاعات گروه */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{groupData.name}</h2>
              <p className="text-gray-400">{groupData.gpId}</p>
            </div>
            <span className="text-red-400 text-sm">⚠️ {t('community.delete_warning')}</span>
          </div>
        </div>

        {/* اطلاعات مالی */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">{t('community.bmc_initial')}</span>
            <span className="text-white">{groupData.bmcInitial} BTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t('community.bmc_built')}</span>
            <span className="text-green-400">{groupData.bmcBuilt} BTC</span>
          </div>
          <div className="flex justify-between border-t border-gray-700 pt-3">
            <span className="text-gray-400 font-bold">{t('community.bmc_total')}</span>
            <span className="text-yellow-400 font-bold">{groupData.bmcTotal} BTC</span>
          </div>
        </div>

        {/* صندوق لاتاری */}
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm">{t('community.lottery_warning')}</p>
          <div className="flex justify-between mt-2">
            <span className="text-gray-400">{t('community.lottery_fund')}</span>
            <span className="text-red-400 font-bold">{groupData.lotteryFund} BTC</span>
          </div>
        </div>

        {/* تأیید حذف */}
        <div className="flex items-center gap-3 bg-gray-800 rounded-xl p-4 mb-6">
          <input
            type="checkbox"
            id="confirm-delete"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
            className="w-5 h-5 accent-red-600"
          />
          <label htmlFor="confirm-delete" className="text-gray-300">
            {t('community.confirm_delete')}
          </label>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-700 py-4 rounded-xl font-bold hover:bg-gray-600 transition"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading || !confirm}
            className="flex-1 bg-red-600 py-4 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('common.loading') : t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommunityPage;