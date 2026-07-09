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