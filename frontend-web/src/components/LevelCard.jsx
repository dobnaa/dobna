const LevelCard = ({ level, cardPrice, roomNumber, currency, onPress }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-3 flex justify-between items-center border border-gray-700">
      <div>
        <span className="text-sm text-gray-400">Level {level}</span>
        <div className="text-white font-bold">{cardPrice} {currency}</div>
        <span className="text-xs text-gray-500">Room: {roomNumber}</span>
      </div>
      <button onClick={onPress} className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
        ورود
      </button>
    </div>
  );
};