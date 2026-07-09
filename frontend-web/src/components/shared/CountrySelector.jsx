// components/shared/CountrySelector.jsx
import { useState, useEffect, useRef } from 'react';
import { getCountryData, getEmojiByCode } from '../../utils/emojiMap';

const CountrySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await getCountryData();
      setCountries(data);
      const selected = data.find(c => c.code === value);
      setSelectedCountry(selected || data[0]);
    };
    loadCountries();
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    onChange(country.code, country.dialCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* نمایش کشور انتخاب‌شده */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 text-white rounded-xl px-4 py-4 flex items-center justify-between border border-gray-700 hover:border-gray-500 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{selectedCountry?.emoji || '🌍'}</span>
          <span>{selectedCountry?.name || 'Select country'}</span>
          <span className="text-gray-400">{selectedCountry?.dialCode}</span>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* دراپ‌داون لیست کشورها */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-h-64 overflow-hidden">
          {/* جستجو */}
          <div className="p-3 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* لیست */}
          <div className="overflow-y-auto max-h-48">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelect(country)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700 transition-colors text-left ${
                  selectedCountry?.code === country.code ? 'bg-gray-700' : ''
                }`}
              >
                <span className="text-2xl">{country.emoji}</span>
                <span className="text-white flex-1">{country.name}</span>
                <span className="text-gray-400">{country.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;