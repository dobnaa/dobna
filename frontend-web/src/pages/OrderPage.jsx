// pages/OrderPage.jsx
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share2 } from 'lucide-react';

const OrderPage = () => {
  const { t } = useTranslation();
  const [did, setDid] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateOrder = () => {
    const link = `http://dobna.com/Transfer?did=${did}&currency=${currency}&amount=${amount}`;
    setGeneratedLink(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-4">{t('order.title')}</h1>
      
      <div className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm">{t('order.did')}</label>
          <input
            type="text"
            value={did}
            onChange={(e) => setDid(e.target.value)}
            placeholder="DID: 9202605211856123"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">{t('order.currency')}</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          >
            {['USD', 'IRT', 'BTC', 'ETH', 'USDT', 'SOL', 'TON'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-400 text-sm">{t('order.amount')}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <button
          onClick={generateOrder}
          className="w-full bg-blue-600 py-3 rounded-xl font-bold"
        >
          {t('order.generate')}
        </button>

        {generatedLink && (
          <div className="bg-gray-800 rounded-xl p-4 mt-4">
            <div className="flex justify-center mb-4">
              <QRCodeSVG value={generatedLink} size={200} />
            </div>
            
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-300"
              />
              <button onClick={() => navigator.clipboard.writeText(generatedLink)}>
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
              <button>
                <Share2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};