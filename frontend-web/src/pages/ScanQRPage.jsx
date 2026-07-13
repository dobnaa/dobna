// pages/ScanQRPage.jsx
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const ScanQRPage = () => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setIsScanning(false);
      // هدایت به صفحه انتقال با داده‌های QR
      navigate(`/transfer?data=${encodeURIComponent(data)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-4">{t('scan.title')}</h1>
      
      <div className="bg-gray-800 rounded-xl p-4">
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: 'environment' }}
          scanDelay={300}
        />
      </div>
      
      <button
        onClick={() => document.getElementById('fileInput').click()}
        className="w-full mt-4 bg-gray-700 py-3 rounded-xl"
      >
        {t('scan.select_from_gallery')}
      </button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          // پردازش تصویر انتخاب‌شده
        }}
      />
    </div>
  );
};