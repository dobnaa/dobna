
// utils/emojiMap.js
import countryData from 'country-flag-emoji-json'; // npm install country-flag-emoji-json

// داده‌های کامل کشورها با پیش‌شماره
const COUNTRY_DIAL_CODES = {
  'US': '+1', 'GB': '+44', 'DE': '+49', 'FR': '+33', 'IT': '+39',
  'ES': '+34', 'PT': '+351', 'NL': '+31', 'BE': '+32', 'CH': '+41',
  'AT': '+43', 'SE': '+46', 'NO': '+47', 'DK': '+45', 'FI': '+358',
  'PL': '+48', 'CZ': '+420', 'SK': '+421', 'HU': '+36', 'RO': '+40',
  'BG': '+359', 'GR': '+30', 'TR': '+90', 'IR': '+98', 'AE': '+971',
  'SA': '+966', 'IQ': '+964', 'SY': '+963', 'LB': '+961', 'JO': '+962',
  'IL': '+972', 'KW': '+965', 'QA': '+974', 'BH': '+973', 'OM': '+968',
  'YE': '+967', 'EG': '+20', 'DZ': '+213', 'MA': '+212', 'TN': '+216',
  'LY': '+218', 'KE': '+254', 'NG': '+234', 'ZA': '+27', 'GH': '+233',
  'IN': '+91', 'PK': '+92', 'BD': '+880', 'LK': '+94', 'NP': '+977',
  'CN': '+86', 'JP': '+81', 'KR': '+82', 'ID': '+62', 'MY': '+60',
  'SG': '+65', 'PH': '+63', 'VN': '+84', 'TH': '+66', 'AU': '+61',
  'NZ': '+64', 'RU': '+7', 'UA': '+380', 'BY': '+375', 'KZ': '+7',
  'CA': '+1', 'MX': '+52', 'BR': '+55', 'AR': '+54', 'CL': '+56',
  'PE': '+51', 'CO': '+57', 'VE': '+58', 'EG': '+20', 'NG': '+234',
};

// دریافت داده‌های کامل کشورها
export const getCountryData = () => {
  return countryData.map(country => ({
    ...country,
    dialCode: COUNTRY_DIAL_CODES[country.code] || '+' + country.code,
  }));
};

// دریافت Emoji بر اساس کد کشور
export const getEmojiByCode = (code) => {
  const country = countryData.find(c => c.code === code);
  return country?.emoji || '🏳️';
};

// دریافت پیش‌شماره بر اساس کد کشور
export const getDialCode = (code) => {
  return COUNTRY_DIAL_CODES[code] || '+1';
};







// src/utils/emojiMap.js
import countryList from 'country-flag-emoji-json'; // یا از CDN دریافت کنید

// اگر از country-flag-kit استفاده می‌کنید، آن را هم ایمپورت کنید
// import flagKit from 'country-flag-kit';

// تولید map نهایی
export const emojiMap = countryList.reduce((map, country) => {
  // ترکیب داده‌ها از دو سورس مختلف
  map[country.code] = {
    emoji: country.emoji,
    name: country.name,
    dialCode: country.dialCode || null, // اگر از country-flag-kit آمده باشد
    // ... سایر داده‌ها
  };
  return map;
}, {});

// تابع کمکی برای دریافت Emoji بر اساس کد کشور
export const getEmojiByCode = (code) => {
  return emojiMap[code]?.emoji || '🏳️'; // پرچم سفید به عنوان پیش‌فرض
};
// utils/emojiMap.js
export const getEmojiFlag = (countryCode) => {
  const flags = {
    'US': '🇺🇸', 'IR': '🇮🇷', 'DE': '🇩🇪', 'GB': '🇬🇧', 
    'TR': '🇹🇷', 'AE': '🇦🇪', 'CA': '🇨🇦', 'AU': '🇦🇺',
    // ... بقیه
  };
  return flags[countryCode] || '🏳️';
};