// frontend-web/src/hooks/useAudioManager.js
import { useCallback } from 'react';

export const useAudioManager = () => {
  const play = useCallback((category, fileName) => {
    try {
      const audio = new Audio(`/assets/sounds/${category}/${fileName}.mp3`);
      audio.volume = 0.4;
      audio.play().catch(e => console.log('Audio blocked:', e));
    } catch (e) { /* ignore */ }
  }, []);

  return {
    playUISound: (name) => play('ui', name), // click, tap, unlock
    playGameSound: (name) => play('game', name), // bingo, full-house, card-mark
    playTransactionSound: (name) => play('transaction', name), // tx_success
    playNotification: (name) => play('notification', name), // notify_beep
    playAmbient: (name) => play('ambient', name), // casino-ambient
  };
};