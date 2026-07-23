// components/common/ToastMessage.jsx
import React, { useEffect, useState } from 'react';
import { useSystemMessages } from '../../hooks/useTranslation';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastMessage = ({ type, code, params = {}, onClose, duration = 3000 }) => {
  const { getSuccess, getError, getWarning, getInfo } = useSystemMessages();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  // دریافت پیام بر اساس نوع
  let message = '';
  let icon = null;
  let bgColor = '';

  switch (type) {
    case 'success':
      message = getSuccess(code, params);
      icon = <CheckCircle className="w-5 h-5 text-green-400" />;
      bgColor = 'bg-green-900/30 border-green-500/30';
      break;
    case 'error':
      message = getError(code, params);
      icon = <XCircle className="w-5 h-5 text-red-400" />;
      bgColor = 'bg-red-900/30 border-red-500/30';
      break;
    case 'warning':
      message = getWarning(code, params);
      icon = <AlertCircle className="w-5 h-5 text-yellow-400" />;
      bgColor = 'bg-yellow-900/30 border-yellow-500/30';
      break;
    case 'info':
    default:
      message = getInfo(code, params);
      icon = <Info className="w-5 h-5 text-blue-400" />;
      bgColor = 'bg-blue-900/30 border-blue-500/30';
      break;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm ${bgColor} border rounded-xl p-4 shadow-2xl animate-slide-in`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{icon}</div>
        <div className="flex-1">
          <p className="text-white text-sm">{message}</p>
        </div>
        <button onClick={() => { setVisible(false); if (onClose) onClose(); }} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ToastMessage;