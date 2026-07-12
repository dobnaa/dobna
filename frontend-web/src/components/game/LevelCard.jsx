// components/game/LevelCard.jsx
import { getNoteImage } from '../../utils/assetMapper';

const LevelCard = ({ level, currency, cardPrice, roomNumber, onPress }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-700 transition">
      {/* تصویر اسکناس با اندازه مناسب */}
      <img
        src={getNoteImage(currency, level)}
        alt={`${currency} Level ${level}`}
        className="w-[120px] h-[30px] object-contain rounded-md flex-shrink-0"
        loading="lazy" // بارگذاری تدریجی
      />
      
      {/* اطلاعات کارت */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold">{cardPrice} {currency}</p>
            <p className="text-gray-400 text-sm">${cardPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">Room: {roomNumber}</p>
            <p className="text-blue-400 text-xs">Level: {level}</p>
          </div>
        </div>
      </div>
      
      {/* دکمه ورود */}
      <button
        onClick={onPress}
        className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        ورود
      </button>
    </div>
  );
};

export default LevelCard;

// در کامپوننت LevelCard
<img
  src={getNoteImage(currency, level)}
  alt={`${currency} note`}
  className="w-[110px] h-[28px] object-cover rounded-md flex-shrink-0"
  loading="lazy"
/>