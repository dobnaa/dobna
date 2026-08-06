// components/game/WatchCard.jsx
const WatchCard = ({ card, calledNumbers, isRTL }) => {
  const renderRow = (row) => (
    <div className="grid grid-cols-9 gap-0.5">
      {row.map((num, idx) => {
        const isMarked = num !== 0 && calledNumbers.includes(num);
        return (
          <div
            key={idx}
            className={`aspect-square flex items-center justify-center text-xs rounded ${
              num === 0 ? 'bg-gray-800/30' :
              isMarked ? 'bg-green-500/70 text-white' :
              'bg-gray-700/50 text-gray-400'
            }`}
          >
            {num !== 0 ? num : ''}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-gray-800/50 rounded-xl p-2 border border-gray-700/20">
      <div className="text-[10px] text-gray-500 text-center mb-1">
        #{card.card_number}
      </div>
      {renderRow(card.row1)}
      {renderRow(card.row2)}
      {renderRow(card.row3)}
    </div>
  );
};


// به‌جای card.row1
const cardData = card.dobna_cards;
// سپس از cardData.row1, cardData.row2, cardData.row3 استفاده کنید