// components/chat/AdminStatus.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStoryStore } from '../../stores/storyStore';

const AdminStatus = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { adminStories, fetchAdminStories } = useStoryStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    fetchAdminStories();
  }, []);

  // چرخش خودکار تصاویر وضعیت (در حالت نمایش)
  useEffect(() => {
    if (!isViewing || adminStories.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adminStories.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isViewing, adminStories.length]);

  const handleStatusClick = () => {
    if (adminStories.length === 0) return;
    setIsViewing(true);
    setCurrentIndex(0);
  };

  const handleClose = () => {
    setIsViewing(false);
  };

  if (adminStories.length === 0) {
    return (
      <button className="relative w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center bg-gray-700">
        <span className="text-xs text-gray-400">{t('chat.admin')}</span>
      </button>
    );
  }

  return (
    <>
      {/* دایره وضعیت */}
      <button
        onClick={handleStatusClick}
        className="relative w-12 h-12 rounded-full border-2 border-purple-500 p-0.5 flex-shrink-0 hover:scale-105 transition"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
          <img 
            src={adminStories[0]?.thumbnail || '/assets/images/logo.png'} 
            alt="Admin Status"
            className="w-full h-full object-cover"
          />
        </div>
        {/* نشانگر آنلاین */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
      </button>

      {/* مودال نمایش تصاویر وضعیت */}
      {isViewing && adminStories.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="relative max-w-md w-full h-[80vh] bg-gray-800 rounded-2xl overflow-hidden">
            {/* تصویر */}
            <img 
              src={adminStories[currentIndex]?.image} 
              alt={`Status ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            
            {/* شمارنده */}
            <div className="absolute top-4 left-0 right-0 flex gap-1 px-2">
              {adminStories.map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 h-1 rounded-full transition ${
                    idx === currentIndex ? 'bg-purple-500' : 'bg-gray-500/50'
                  }`}
                />
              ))}
            </div>
            
            {/* دکمه بستن */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              ✕
            </button>
            
            {/* دکمه‌های قبلی/بعدی */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + adminStories.length) % adminStories.length);
                }}
                className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition"
              >
                ‹
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % adminStories.length);
                }}
                className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition"
              >
                ›
              </button>
            </div>
            
            {/* شماره */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
              {currentIndex + 1} / {adminStories.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminStatus;