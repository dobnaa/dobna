// utils/phoneUtils.js
export const getCountryCode = (phoneNumber) => {
  // حذف فاصله و کاراکترهای اضافی
  const clean = phoneNumber.replace(/\s/g, '');
  
  if (clean.startsWith('+98') || clean.startsWith('0098')) return 'IR';
  if (clean.startsWith('+1') || clean.startsWith('001')) return 'US';
  if (clean.startsWith('+44') || clean.startsWith('0044')) return 'GB';
  if (clean.startsWith('+90') || clean.startsWith('0090')) return 'TR';
  if (clean.startsWith('+49') || clean.startsWith('0049')) return 'DE';
  if (clean.startsWith('+33') || clean.startsWith('0033')) return 'FR';
  // ... ادامه برای سایر کشورها
  
  return 'US'; // پیش‌فرض
};