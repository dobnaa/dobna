// components/shared/LanguageSwitcher.jsx
import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguages } from '../../hooks/useTranslation';
import { ChevronDown, Check } from 'lucide-react';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useTranslation();
  const languages = useLanguages();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = async (langCode) => {
    await changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition"
      >
        <span className="text-xl">{currentLanguage?.flag || '🌐'}</span>
        <span className="text-sm text-white">{currentLanguage?.nativeName}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl min-w-[180px] max-h-60 overflow-y-auto z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-700 transition text-left ${
                currentLanguage?.code === lang.code ? 'bg-gray-700' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm text-white flex-1">{lang.nativeName}</span>
              {currentLanguage?.code === lang.code && (
                <Check className="w-4 h-4 text-purple-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;