// routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PrivateRoute from './PrivateRoute';

// صفحات احراز هویت (با Lazy Loading)
const LanguageSelectorPage = lazy(() => import('../pages/Auth/LanguageSelectorPage'));
const MobileNumberPage = lazy(() => import('../pages/Auth/MobileNumberPage'));
const LoginCodePage = lazy(() => import('../pages/Auth/LoginCodePage'));

// صفحات اصلی
const HomePage = lazy(() => import('../pages/HomePage'));
const CommunityPage = lazy(() => import('../pages/CommunityPage'));
const GameRoomPage = lazy(() => import('../pages/GameRoomPage'));
const WalletPage = lazy(() => import('../pages/WalletPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
// ... سایر صفحات

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* صفحات احراز هویت (بدون محافظت) */}
        <Route path="/language" element={<LanguageSelectorPage />} />
        <Route path="/login" element={<MobileNumberPage />} />
        <Route path="/verify" element={<LoginCodePage />} />

        {/* صفحات اصلی (با محافظت) */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/community/:id" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
        <Route path="/game/:roomId" element={<PrivateRoute><GameRoomPage /></PrivateRoute>} />
        <Route path="/wallet" element={<PrivateRoute><WalletPage /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        {/* ... سایر مسیرها */}

        {/* مسیر پیش‌فرض */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;