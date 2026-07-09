// pages/Auth/LanguageSelectorPage.jsx
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import DOBNA_LOGO from '/assets/images/logo.png';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Francais' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ar', name: 'Arabic', nativeName: 'عربی' },
  { code: 'tr', name: 'Turkish', nativeName: 'Turkce' },
  { code: 'zh', name: 'Chinese', nativeName: 'Chinese' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa' },
  { code: 'ko', name: 'Korean', nativeName: 'Korean' },
  { code: 'ru', name: 'Russian', nativeName: 'Russian' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'cs', name: 'Czech', nativeName: 'Czech' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'pt', name: 'Brazil', nativeName: 'Portugues' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Ozbek' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Vietnamese' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
];

const LanguageSelectorPage = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-12 px-4">
      {/* لوگو */}
      <img src={DOBNA_LOGO} alt="DOBNA" className="w-24 h-24 mb-8" />
      
      <h1 className="text-2xl font-bold text-white mb-6">Language</h1>
      
      {/* لیست زبان‌ها */}
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-4 max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedLang === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="text-sm font-medium">{lang.nativeName}</div>
              <div className="text-xs opacity-60">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* پایین صفحه */}
      <p className="text-gray-500 text-xs mt-8 text-center px-4">
        By selecting the login option, you agree to the <br />
        <span className="text-blue-400">Terms of Use</span> and{' '}
        <span className="text-blue-400">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default LanguageSelectorPage;