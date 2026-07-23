
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ایمپورت تمام زبان‌ها
import en from '../locales/en.json';
import fa from '../locales/fa.json';
import tr from '../locales/tr.json';
import ar from '../locales/ar.json';
import ru from '../locales/ru.json';
import hi from '../locales/hi.json';
import fr from '../locales/fr.json';
import zh from '../locales/zh.json';
import id from '../locales/id.json';
import ko from '../locales/ko.json';
import es from '../locales/es.json';
import cs from '../locales/cs.json';
import fi from '../locales/fi.json';
import pt from '../locales/pt.json';
import uz from '../locales/uz.json';
import vi from '../locales/vi.json';
import sv from '../locales/sv.json'; 
// ======================================================
// ۱. لیست زبان‌های پشتیبانی‌شده (برای استفاده در کامپوننت‌ها)
// ======================================================
export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  fa: { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa', flag: '🇮🇩', dir: 'ltr' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  cs: { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr' },
  fi: { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  uz: { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha', flag: '🇺🇿', dir: 'ltr' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  sv: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
};

const RTL_LANGUAGES = ['fa', 'ar'];
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANG_CODES = Object.keys(SUPPORTED_LANGUAGES);

// ======================================================
// ۲. منابع ترجمه
// ======================================================
const resources = {
  en: { translation: en },
  fa: { translation: fa },
  tr: { translation: tr },
  ar: { translation: ar },
  ru: { translation: ru },
  hi: { translation: hi },
  fr: { translation: fr },
  zh: { translation: zh },
  id: { translation: id },
  ko: { translation: ko },
  es: { translation: es },
  cs: { translation: cs },
  fi: { translation: fi },
  pt: { translation: pt },
  uz: { translation: uz },
  vi: { translation: vi },
  sv: { translation: sv },
};

// ======================================================
// ۳. مقداردهی i18n
// ======================================================
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: import.meta.env.DEV, // فقط در محیط توسعه فعال باشد
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'cookie'],
      caches: ['localStorage'],
      lookupLocalStorage: 'dobna-language',
      lookupCookie: 'dobna-language',
      cookieMinutes: 10080, // 7 روز
    },
    react: {
      useSuspense: true,
      transSupportBasicHtmlNodes: true,
    },
    load: 'languageOnly',
    supportedLngs: SUPPORTED_LANG_CODES,
    nonExplicitSupportedLngs: true,
    cleanCode: true,
  });

// ======================================================
// ۴. توابع کمکی
// ======================================================

/**
 * تغییر زبان و تنظیم جهت (RTL/LTR)
 */
export const changeLanguage = (langCode, callback) => {
  if (!SUPPORTED_LANG_CODES.includes(langCode)) {
    console.warn(`زبان "${langCode}" پشتیبانی نمی‌شود. Fallback به "${DEFAULT_LANGUAGE}"`);
    langCode = DEFAULT_LANGUAGE;
  }

  i18n.changeLanguage(langCode, (err) => {
    if (err) {
      console.error('خطا در تغییر زبان:', err);
      return;
    }
    setDirection(langCode);
    localStorage.setItem('dobna-language', langCode);
    if (callback) callback();
  });
};

/**
 * دریافت زبان فعلی
 */
export const getCurrentLanguage = () => {
  return i18n.language || DEFAULT_LANGUAGE;
};

/**
 * دریافت اطلاعات کامل زبان فعلی
 */
export const getCurrentLanguageInfo = () => {
  const langCode = getCurrentLanguage();
  return SUPPORTED_LANGUAGES[langCode] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
};

/**
 * بررسی RTL بودن زبان فعلی
 */
export const isRTL = () => {
  const langCode = getCurrentLanguage();
  return RTL_LANGUAGES.includes(langCode);
};

/**
 * دریافت لیست تمام زبان‌ها
 */
export const getAllLanguages = () => {
  return Object.values(SUPPORTED_LANGUAGES);
};

/**
 * تنظیم جهت (RTL/LTR) در تگ HTML
 */
export const setDirection = (langCode) => {
  const isRTL = RTL_LANGUAGES.includes(langCode);
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = langCode;
};

/**
 * ترجمه یک کلید با پارامترها (نسخه ساده)
 */
export const translate = (key, params = {}) => {
  return i18n.t(key, params);
};

// ======================================================
// ۵. تنظیم اولیه هنگام بارگذاری
// ======================================================
const savedLang = localStorage.getItem('dobna-language');
if (savedLang && SUPPORTED_LANG_CODES.includes(savedLang)) {
  setDirection(savedLang);
} else {
  const browserLang = navigator.language?.split('-')[0] || DEFAULT_LANGUAGE;
  const detectedLang = SUPPORTED_LANG_CODES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
  setDirection(detectedLang);
}

// ======================================================
// ۶. خروجی
// ======================================================
export default i18n;