// pages/OrderPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const OrderPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [targetDid, setTargetDid] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState('');

  const currencies = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CAD', 'CHF', 'AUD', 'INR', 'CNY'];

  const generateOrder = () => {
    if (!targetDid || !amount || parseFloat(amount) <= 0) {
      alert(t('order.fill_all_fields'));
      return;
    }
    const link = `http://dobna.com/Transfer?did=${targetDid}&currency=${currency}&amount=${amount}`;
    setGeneratedLink(link);
    setGeneratedQR(link);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert(t('order.link_copied'));
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: 'DOBNA Payment Request', text: generatedLink, url: generatedLink });
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4" dir="ltr">
      {/* هدر */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{t('order.title')}</h1>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* DID مقصد */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('order.did')}</label>
          <input
            type="text"
            value={targetDid}
            onChange={(e) => setTargetDid(e.target.value)}
            placeholder={t('order.did_placeholder')}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* انتخاب ارز */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('order.currency')}</label>
          <div className="grid grid-cols-4 gap-2">
            {currencies.slice(0, 8).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`p-2 rounded-lg text-center text-sm transition ${
                  currency === c ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* مبلغ */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">{t('order.amount')}</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.00000001"
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {currency}
            </span>
          </div>
        </div>

        {/* دکمه ساخت */}
        <button
          onClick={generateOrder}
          className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          {t('order.generate')}
        </button>

        {/* خروجی QR و لینک */}
        {generatedQR && (
          <div className="bg-gray-800 rounded-xl p-6 mt-4 space-y-4">
            <div className="flex justify-center">
              <QRCodeSVG value={generatedQR} size={200} bgColor="#1a1a2e" fgColor="#ffffff" />
            </div>

            <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
              />
              <button onClick={copyLink} className="text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <button onClick={shareLink} className="text-gray-400 hover:text-white p-1">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-500 text-xs text-center">{t('order.qr_hint')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;