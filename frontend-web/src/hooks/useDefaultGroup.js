// hooks/useDefaultGroup.js
import { useEffect } from 'react';
import { useNavigate } useLocation } from 'react-router-dom';
import { useCommunityStore } from '../stores/communityStore';
import { parsePhoneNumber, getCountryCode } from '../utils/phoneUtils';

export const useDefaultGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentCommunity, communities } = useCommunityStore();

  useEffect(() => {
    // فقط اگر در صفحه اصلی هستیم و هنوز گروهی انتخاب نشده
    if (location.pathname !== '/' || communities.length === 0) return;

    const userPhone = localStorage.getItem('userPhone');
    if (!userPhone) return;

    // دریافت کد کشور (مثلاً +1 برای آمریکا، +98 برای ایران)
    const countryCode = getCountryCode(userPhone); // 'US', 'IR', etc.

    let targetCurrency = 'USDT'; // پیش‌فرض جهانی

    // منطق هدایت
    if (countryCode === 'IR') {
      targetCurrency = 'IRT'; // ایران → تومان
    } else if (countryCode === 'US' || countryCode === 'CA') {
      targetCurrency = 'USD'; // آمریکا/کانادا → دلار
    } else {
      // سایر کشورها: اگر گروه ارز کشورشان وجود داشت برو آن، وگرنه USDT/BTC
      const communityExist = communities.find(c => c.currency === countryCode);
      targetCurrency = communityExist ? countryCode : 'USDT';
    }

    // پیدا کردن گروه مناسب
    const targetCommunity = communities.find(c => c.currency === targetCurrency);
    if (targetCommunity) {
      setCurrentCommunity(targetCommunity);
      navigate(`/community/${targetCommunity.id}`, { replace: true });
    }
  }, [communities, location.pathname, navigate, setCurrentCommunity]);
};