// components/game/LevelGrid.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getNoteImage } from '../../utils/assetMapper';
import { Users, DoorOpen } from 'lucide-react';

const LevelGrid = ({ levels, communityId, onLevelPress }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {levels?.map((level) => (
        <button
          key={level.level}
          onClick={() => onLevelPress(level.level)}
          className="w-full bg-gray-800/70 rounded-2xl p-3 flex items-center gap-3 hover:bg-gray-700/70 transition border border-gray-700"
        >
          {/* تصویر اسکناس (سمت راست) */}
          <div className="flex-shrink-0 w-1/3">
            <img
              src={getNoteImage(level.currency, level.level)}
              alt={`${level.currency} Level ${level.level}`}
              className="w-full h-10 object-contain rounded-md"
              loading="lazy"
            />
          </div>

          {/* اطلاعات (سمت چپ) */}
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">
                  {level.price} {level.currency}
                </p>
                <p className="text-gray-400 text-xs">${level.priceUsd}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Users className="w-3 h-3 text-red-400" />
                  <span className="text-green-400">{level.onlinePlayers}</span>
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <DoorOpen className="w-3 h-3 text-blue-400" />
                  <span>{level.rooms} {t('game.rooms')}</span>
                </p>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[10px] bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full">
                Level {level.level}
              </span>
              <span className="text-[10px] text-gray-500">{t('game.click_to_join')}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
export default LevelGrid;