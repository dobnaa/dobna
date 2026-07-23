// utils/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
import sv from '../locales/sv.json

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