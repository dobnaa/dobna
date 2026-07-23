// components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useFormTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const { t } = useTranslation();
  const { formTranslations } = useFormTranslation();
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  // دریافت ترجمه‌های فیلدها
  const phoneField = formTranslations('phone', 'auth');
  const passwordField = formTranslations('password', 'auth');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.phone || !formData.password) {
      setError(t('auth.errors.fill_all_fields'));
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      setError(err.message || t('auth.errors.login_failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-400 text-sm mb-1">
          {phoneField.label}
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder={phoneField.placeholder}
          className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-400 text-xs mt-1">{phoneField.error.required}</p>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-1">
          {passwordField.label}
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder={passwordField.placeholder}
          className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-400 text-xs mt-1">{passwordField.error.required}</p>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? t('common.loading') : t('auth.login')}
      </button>
    </form>
  );
};

export default LoginForm;