// pages/Auth/LoginCodePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../../services/authService';

const LoginCodePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // دریافت شماره ذخیره‌شده
    const savedPhone = localStorage.getItem('loginPhone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    } else {
      navigate('/login');
    }

    // شروع تایمر
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleEditNumber = () => {
    navigate('/login');
  };

  const handleResendCode = async () => {
    if (timer > 0) return;
    
    try {
      await authService.sendLoginCode(phoneNumber);
      setTimer(50);
      setError('');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const user = await authService.verifyLoginCode(phoneNumber, code);
      // ذخیره اطلاعات کاربر و ورود
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Login code
        </h1>
        <p className="text-gray-400 text-center text-sm mb-2">
          The login code for Dubna account was sent to mobile number
        </p>
        <p className="text-white text-center font-medium mb-4">
          {phoneNumber}
          <button
            onClick={handleEditNumber}
            className="text-blue-400 ml-2 text-sm hover:underline"
          >
            Edit number
          </button>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ورودی کد ۶ رقمی */}
          <div className="flex justify-center gap-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={code[index] || ''}
                onChange={(e) => {
                  const newCode = code.split('');
                  newCode[index] = e.target.value.replace(/\D/g, '');
                  setCode(newCode.join(''));
                  // حرکت خودکار به فیلد بعدی
                  if (e.target.value && index < 5) {
                    document.getElementById(`code-input-${index + 1}`)?.focus();
                  }
                }}
                id={`code-input-${index}`}
                className="w-12 h-14 bg-gray-800 text-white text-2xl text-center rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <p className="text-gray-400 text-center text-sm">
            {timer > 0 ? (
              <span>{timer} seconds to request a new code</span>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-blue-400 hover:underline"
              >
                Request new code
              </button>
            )}
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Confirm and continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCodePage;