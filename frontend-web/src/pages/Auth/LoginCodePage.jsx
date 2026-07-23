// pages/Auth/LoginCodePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import { useRTL } from '../../hooks/useTranslation';

const LoginCodePage = () => {
  const navigate = useNavigate();
  const { t, translateWithParams } = useTranslation();
  const isRTL = useRTL();
  const { verifyCode, resendCode, isLoading } = useAuth();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(50);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRefs = useRef([]);

  // دریافت شماره ذخیره‌شده
  useEffect(() => {
    const savedPhone = localStorage.getItem('loginPhone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // تایمر
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // حرکت خودکار به فیلد بعدی
  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value.replace(/\D/g, '').slice(0, 1);
    setCode(newCode);

    // حرکت به فیلد بعدی
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // حرکت به فیلد قبلی با Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ارسال مجدد کد
  const handleResendCode = async () => {
    if (timer > 0) return;
    setError('');
    try {
      await resendCode(phoneNumber);
      setTimer(50);
    } catch (err) {
      setError(err.message || t('auth.errors.resend_failed'));
    }
  };

  // تأیید کد
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError(t('auth.errors.invalid_code'));
      return;
    }

    setError('');
    try {
      await verifyCode(phoneNumber, fullCode);
      navigate('/');
    } catch (err) {
      setError(err.message || t('auth.errors.verification_failed'));
    }
  };

  // ویرایش شماره
  const handleEditNumber = () => {
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {t('auth.verify_code')}
        </h1>
        <p className="text-gray-400 text-center text-sm mb-2">
          {t('auth.code_sent_to')}
        </p>
        <p className="text-white text-center font-medium mb-4">
          {phoneNumber}
          <button
            onClick={handleEditNumber}
            className="text-blue-400 ml-2 text-sm hover:underline"
          >
            {t('auth.edit_number')}
          </button>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ورودی کد ۶ رقمی */}
          <div className={`flex justify-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={code[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-gray-800 text-white text-2xl text-center rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* تایمر / ارسال مجدد */}
          <p className="text-gray-400 text-center text-sm">
            {timer > 0 ? (
              <span>
                {translateWithParams('auth.resend_timer', { seconds: timer })}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-blue-400 hover:underline"
              >
                {t('auth.resend_code')}
              </button>
            )}
          </p>

          {/* خطا */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* دکمه تأیید */}
          <button
            type="submit"
            disabled={isLoading || code.some((digit) => digit === '')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('common.loading') : t('auth.confirm')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCodePage;