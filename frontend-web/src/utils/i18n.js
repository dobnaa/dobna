// utils/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import fa from '../locales/fa.json';
import tr from '../locales/tr.json';
import ar from '../locales/ar.json';
import ru from '../locales/ru.json';
import in from '../locales/in.json';
import fr from '../locales/fr.json';
import ch from '../locales/ch.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
  tr: { translation: tr },
  ar: { translation: ar },
  ru: { translation: ru },
  in: { translation: in },
  fr: { translation: fr },
  ch: { translation: ch },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;