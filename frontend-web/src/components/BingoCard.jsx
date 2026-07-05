// frontend-web/src/components/BingoCard.jsx
import React from 'react';

const BingoCard = ({ cardNumber, row1, row2, row3, calledNumbers = [], isWinner = false }) => {
  const isMarked = (num) => num !== 0 && calledNumbers.includes(num);

  const renderRow = (row) => (
    <div className="grid grid-cols-9 gap-1">
      {row.map((num, idx) => (
        <div key={idx} className={`aspect-square flex items-center justify-center text-xs md:text-sm font-bold rounded-md transition-all
          ${num === 0 ? 'bg-gray-800/30 border border-dashed border-gray-600' : 
            isMarked(num) ? 'bg-green-500/80 text-white shadow-lg shadow-green-500/30 scale-95' : 
            'bg-gray-700/50 text-white border border-gray-500'}
          ${isWinner ? 'ring-2 ring-yellow-400 animate-pulse' : ''}
        `}>
          {num !== 0 ? num : ''}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-2 rounded-xl shadow-2xl border border-gray-700">
      <div className="absolute -top-2 left-3 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">#{cardNumber}</div>
      <div className="flex flex-col gap-1 mt-3">
        {renderRow(row1)}
        {renderRow(row2)}
        {renderRow(row3)}
      </div>
    </div>
  );
};
export default BingoCard;