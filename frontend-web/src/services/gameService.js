// frontend-web/src/services/gameService.js
import { supabase } from './supabaseClient';

export const startGame = async (roomId) => {
  const { data, error } = await supabase.rpc('fn_start_game', { room_id: roomId });
  if (error) throw error;
  return data;
};

export const callNumber = async (roomId) => {
  // یک عدد جدید از ۱ تا ۹۰ برمی‌گرداند و در جدول room ذخیره می‌کند
  const { data, error } = await supabase.rpc('fn_call_number', { room_id: roomId });
  if (error) throw error;
  return data; // عدد فراخوانی شده
};

export const checkWinner = async (roomId) => {
  const { data, error } = await supabase.rpc('fn_check_winner', { room_id: roomId });
  if (error) throw error;
  return data; // برگرداندن card_id برنده
};

// خرید کارت توسط کاربر
export const purchaseCard = async (cardId, userId, roomId) => {
  const { data, error } = await supabase
    .from('dobna_cards')
    .update({ owner_id: userId, room_id: roomId, status: 'active' })
    .eq('id', cardId)
    .eq('status', 'available');
  return { data, error };
};