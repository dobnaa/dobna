// pages/ScanQRPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QrReader } from 'react-qr-reader';
import { ArrowLeft, Upload } from 'lucide-react';

const ScanQRPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState('');

  const handleScan = (data) => {
    if (data && isScanning) {
      setScanResult(data);
      setIsScanning(false);
      
      // هدایت به صفحه انتقال با داده‌های QR
      try {
        const url = new URL(data);
        const did = url.searchParams.get('did');
        const currency = url.searchParams.get('currency');
        const amount = url.searchParams.get('amount');
        
        if (did && currency && amount) {
          navigate(`/transfer?did=${did}&currency=${currency}&amount=${amount}`);
        } else {
          setError(t('scan.invalid_qr'));
        }
      } catch {
        setError(t('scan.invalid_qr'));
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Scan Error:', err);
    setError(t('scan.camera_error'));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      // پردازش تصویر انتخاب شده برای QR
      // (اینجا باید از کتابخانه‌ای مثل jsQR استفاده کنید)
      // برای سادگی، فعلاً پیام می‌دهیم
      alert(t('scan.file_processing'));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* هدر */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{t('scan.title')}</h1>
      </div>

      <div className="max-w-md mx-auto">
        {/* دوربین */}
        <div className="bg-gray-800 rounded-xl overflow-hidden aspect-square relative">
          {isScanning ? (
            <QrReader
              onResult={handleScan}
              onError={handleError}
              constraints={{ facingMode: 'environment' }}
              scanDelay={300}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <p className="text-gray-400">{t('scan.scan_complete')}</p>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}

        {scanResult && (
          <p className="text-green-400 text-sm text-center mt-2">
            {t('scan.scan_success')}: {scanResult.slice(0, 50)}...
          </p>
        )}

        {/* دکمه انتخاب از گالری */}
        <div className="mt-4">
          <label className="w-full bg-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-600 transition cursor-pointer">
            <Upload className="w-5 h-5" />
            <span>{t('scan.select_from_gallery')}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* دکمه اسکن مجدد */}
        {!isScanning && (
          <button
            onClick={() => {
              setIsScanning(true);
              setScanResult('');
              setError('');
            }}
            className="w-full mt-3 bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {t('scan.scan_again')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanQRPage;