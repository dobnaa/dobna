// frontend-web/src/services/gameService.js
import { supabase } from '../api/supabaseClient';

// خرید کارت در تالار گروه
export const purchaseCards = async (roomId, cardNumbers) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  if (cardNumbers.length > 6) throw new Error('Maximum 6 cards per user');

  // دریافت قیمت هر کارت
  const { data: room } = await supabase
    .from('rooms')
    .select('card_price, currency, community_id')
    .eq('id', roomId)
    .single();

  const totalAmount = room.card_price * cardNumbers.length;

  // کسر مبلغ از کاربر و واریز به حساب گروه
  await supabase.rpc('transfer_to_group', {
    p_user_id: userId,
    p_community_id: room.community_id,
    p_currency: room.currency,
    p_amount: totalAmount,
    p_reference: 'game_purchase'
  });

  // ثبت کارت‌های خریداری‌شده
  for (const cardNumber of cardNumbers) {
    await supabase.from('game_cards').insert({
      room_id: roomId,
      user_id: userId,
      card_number: cardNumber,
      status: 'active',
    });
  }

  // بررسی پر شدن اتاق
  const { count } = await supabase
    .from('game_cards')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId);

  if (count >= 60) {
    // شروع بازی
    await supabase.rpc('fn_start_game', { p_room_id: roomId });
  }

  return { success: true };
};

// فراخوانی عدد
export const callNumber = async (roomId) => {
  const { data: number } = await supabase.rpc('fn_call_number', { p_room_id: roomId });
  return number;
};

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