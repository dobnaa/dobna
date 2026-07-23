// pages/Auth/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import LoginForm from '../../components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-2xl font-bold text-center mt-4">{t('auth.login_title')}</h1>
      <p className="text-gray-400 text-center text-sm mt-1">{t('auth.login_subtitle')}</p>
      
      <div className="max-w-sm mx-auto mt-8">
        <LoginForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
};

export default LoginPage;