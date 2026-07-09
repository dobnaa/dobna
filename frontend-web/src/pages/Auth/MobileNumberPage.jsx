// pages/Auth/MobileNumberPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CountrySelector from '../../components/shared/CountrySelector';
import { authService } from '../../services/authService';

const MobileNumberPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('US');
  const [dialCode, setDialCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 6) {
      setError('Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // ارسال کد تأیید به شماره موبایل
      const fullNumber = `${dialCode}${mobileNumber}`;
      await authService.sendLoginCode(fullNumber);
      
      // ذخیره شماره در localStorage برای صفحه کد تأیید
      localStorage.setItem('loginPhone', fullNumber);
      localStorage.setItem('loginCountry', countryCode);
      
      navigate('/verify');
    } catch (err) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Mobile number
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Please enter your country and mobile number.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* انتخاب کشور */}
          <CountrySelector
            value={countryCode}
            onChange={(code, dial) => {
              setCountryCode(code);
              setDialCode(dial);
            }}
          />

          {/* ورودی شماره موبایل */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-medium">
              {dialCode}
            </div>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="1234567890"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-4 pl-20 border border-gray-700 focus:border-blue-500 focus:outline-none"
              maxLength={15}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || mobileNumber.length < 6}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Confirm and continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileNumberPage;