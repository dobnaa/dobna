// frontend-web/src/services/duelService.js
import { supabase } from '../api/supabaseClient';
import { generateDuelId, generateTransactionId } from '../utils/idGenerator';

// ایجاد دوئل عمومی
export const createPublicDuel = async ({ currency, amount, level }) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // 1. بررسی موجودی
  const { data: balance } = await supabase
    .from('user_balances')
    .select('amount')
    .eq('user_id', userId)
    .eq('currency', currency)
    .single();

  if (balance.amount < amount) throw new Error('Insufficient balance');

  // 2. کسر مبلغ از کاربر و واریز به حساب مرکزی 11111111
  await supabase.rpc('transfer_to_escrow', {
    p_user_id: userId,
    p_currency: currency,
    p_amount: amount,
    p_account: '11111111',
    p_reference: 'duel_create'
  });

  // 3. ایجاد دوئل
  const { data: duel, error } = await supabase
    .from('duels')
    .insert({
      duel_id: generateDuelId(),
      creator_id: userId,
      currency,
      amount,
      level,
      type: 'public',
      status: 'waiting',
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  // 4. ثبت تراکنش
  await supabase.from('transactions').insert({
    tx_id: generateTransactionId('DUL', currency, '11111111', 1),
    user_id: userId,
    type: 'duel_create',
    currency,
    amount: -amount,
    reference_id: duel.id,
    description: `Duel creation (Level ${level})`,
  });

  return duel;
};

// پیوستن به دوئل
export const joinDuel = async (duelId) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // دریافت اطلاعات دوئل
  const { data: duel } = await supabase
    .from('duels')
    .select('*')
    .eq('id', duelId)
    .single();

  if (duel.status !== 'waiting') throw new Error('Duel is not available');
  if (new Date(duel.expires_at) < new Date()) throw new Error('Duel expired');

  // کسر مبلغ از کاربر دوم
  await supabase.rpc('transfer_to_escrow', {
    p_user_id: userId,
    p_currency: duel.currency,
    p_amount: duel.amount,
    p_account: '11111111',
    p_reference: 'duel_join'
  });

  // به‌روزرسانی دوئل
  await supabase
    .from('duels')
    .update({
      opponent_id: userId,
      status: 'active',
      started_at: new Date().toISOString(),
    })
    .eq('id', duelId);

  // شروع بازی دوئل
  await supabase.rpc('fn_start_duel_game', { p_duel_id: duelId });

  return { success: true };
};

import { supabase } from './supabaseClient';
import { generateDuelId, generateTransactionId } from '../utils/idGenerator';

/**
 * ایجاد دوئل عمومی
 */
export const createPublicDuel = async ({ currency, amount, level }) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // بررسی موجودی
  const { data: balance, error: balanceError } = await supabase
    .from('user_balances')
    .select('amount, locked_amount')
    .eq('user_id', userId)
    .eq('currency', currency)
    .single();

  if (balanceError) throw new Error('Failed to check balance');
  if (balance.amount - balance.locked_amount < amount) {
    throw new Error('Insufficient balance');
  }

  // دریافت آخرین شماره دوئل
  const { data: lastDuel, error: seqError } = await supabase
    .from('duels')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  const sequence = lastDuel && lastDuel.length > 0 ? lastDuel[0].id + 1 : 1;

  // قفل کردن مبلغ
  await supabase
    .from('user_balances')
    .update({ locked_amount: (balance.locked_amount || 0) + amount })
    .eq('user_id', userId)
    .eq('currency', currency);

  // ایجاد دوئل
  const duelData = {
    duel_id: generateDuelId(sequence),
    creator_id: userId,
    currency,
    amount,
    level,
    type: 'public',
    status: 'waiting',
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('duels')
    .insert(duelData)
    .select()
    .single();

  if (error) throw error;

  // ثبت تراکنش
  const accountNumber = await getAccountNumber(userId);
  const { data: lastTx } = await supabase
    .from('transactions')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);
  const txSeq = lastTx && lastTx.length > 0 ? lastTx[0].id + 1 : 1;

  await supabase.from('transactions').insert({
    tx_id: generateTransactionId('DUL', currency, accountNumber, txSeq),
    user_id: userId,
    type: 'duel_create',
    currency,
    amount: -amount,
    reference_id: data.id,
    status: 'pending',
    description: `Duel creation (Level ${level})`,
    created_at: new Date().toISOString(),
  });

  return data;
};

/**
 * ایجاد دوئل خصوصی (کاربر به کاربر)
 */
export const createPrivateDuel = async ({ currency, amount, level, opponentUsername }) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // پیدا کردن کاربر مقابل
  const { data: opponent, error: oppError } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', opponentUsername)
    .single();

  if (oppError || !opponent) throw new Error('User not found');

  if (opponent.id === userId) throw new Error('You cannot duel yourself');

  // بررسی موجودی
  const { data: balance, error: balanceError } = await supabase
    .from('user_balances')
    .select('amount, locked_amount')
    .eq('user_id', userId)
    .eq('currency', currency)
    .single();

  if (balanceError) throw new Error('Failed to check balance');
  if (balance.amount - balance.locked_amount < amount) {
    throw new Error('Insufficient balance');
  }

  // قفل کردن مبلغ
  await supabase
    .from('user_balances')
    .update({ locked_amount: (balance.locked_amount || 0) + amount })
    .eq('user_id', userId)
    .eq('currency', currency);

  // دریافت آخرین شماره دوئل
  const { data: lastDuel, error: seqError } = await supabase
    .from('duels')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  const sequence = lastDuel && lastDuel.length > 0 ? lastDuel[0].id + 1 : 1;

  // ایجاد دوئل خصوصی
  const duelData = {
    duel_id: generateDuelId(sequence),
    creator_id: userId,
    opponent_id: opponent.id,
    currency,
    amount,
    level,
    type: 'private',
    status: 'waiting',
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('duels')
    .insert(duelData)
    .select()
    .single();

  if (error) throw error;

  // تخصیص کارت به سازنده (از کارت‌های ۱ تا ۳۰ مخصوص دوئل)
  const cardNumber = Math.floor(Math.random() * 30) + 1;
  await assignDuelCard(userId, data.id, cardNumber);

  // ثبت تراکنش
  const accountNumber = await getAccountNumber(userId);
  const { data: lastTx } = await supabase
    .from('transactions')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);
  const txSeq = lastTx && lastTx.length > 0 ? lastTx[0].id + 1 : 1;

  await supabase.from('transactions').insert({
    tx_id: generateTransactionId('DUL', currency, accountNumber, txSeq),
    user_id: userId,
    type: 'duel_create',
    currency,
    amount: -amount,
    reference_id: data.id,
    status: 'pending',
    description: `Private duel vs ${opponent.username} (Level ${level})`,
    created_at: new Date().toISOString(),
  });

  // ارسال نوتیفیکیشن به حریف
  await sendDuelNotification(opponent.id, data.id, userId);

  return data;
};

/**
 * پیوستن به دوئل (عمومی یا خصوصی)
 */
export const joinDuel = async (duelId) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // دریافت اطلاعات دوئل
  const { data: duel, error: duelError } = await supabase
    .from('duels')
    .select('*')
    .eq('id', duelId)
    .single();

  if (duelError) throw duelError;

  // بررسی شرایط
  if (duel.status !== 'waiting') throw new Error('Duel is not available');
  if (duel.creator_id === userId) throw new Error('You cannot join your own duel');
  if (duel.type === 'private' && duel.opponent_id !== userId) {
    throw new Error('This is a private duel');
  }
  if (new Date(duel.expires_at) < new Date()) {
    throw new Error('Duel has expired');
  }

  // بررسی موجودی
  const { data: balance, error: balanceError } = await supabase
    .from('user_balances')
    .select('amount, locked_amount')
    .eq('user_id', userId)
    .eq('currency', duel.currency)
    .single();

  if (balanceError) throw new Error('Failed to check balance');
  if (balance.amount - balance.locked_amount < duel.amount) {
    throw new Error('Insufficient balance');
  }

  // قفل کردن مبلغ
  await supabase
    .from('user_balances')
    .update({ locked_amount: (balance.locked_amount || 0) + duel.amount })
    .eq('user_id', userId)
    .eq('currency', duel.currency);

  // به‌روزرسانی وضعیت دوئل
  const { data, error } = await supabase
    .from('duels')
    .update({
      opponent_id: userId,
      status: 'active',
      started_at: new Date().toISOString(),
    })
    .eq('id', duelId)
    .select()
    .single();

  if (error) throw error;

  // تخصیص کارت به شرکت‌کننده (از کارت‌های ۱ تا ۳۰)
  const cardNumber = Math.floor(Math.random() * 30) + 1;
  await assignDuelCard(userId, duelId, cardNumber);

  // ثبت تراکنش
  const accountNumber = await getAccountNumber(userId);
  const { data: lastTx } = await supabase
    .from('transactions')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);
  const txSeq = lastTx && lastTx.length > 0 ? lastTx[0].id + 1 : 1;

  await supabase.from('transactions').insert({
    tx_id: generateTransactionId('DUL', duel.currency, accountNumber, txSeq),
    user_id: userId,
    type: 'duel_join',
    currency: duel.currency,
    amount: -duel.amount,
    reference_id: duelId,
    status: 'pending',
    description: `Joined duel (Level ${duel.level})`,
    created_at: new Date().toISOString(),
  });

  // شروع بازی دوئل
  await startDuelGame(duelId);

  return data;
};

/**
 * تخصیص کارت در دوئل
 */
const assignDuelCard = async (userId, duelId, cardNumber) => {
  await supabase.from('duel_participants').insert({
    duel_id: duelId,
    user_id: userId,
    card_number: cardNumber,
    joined_at: new Date().toISOString(),
  });
};

/**
 * شروع بازی دوئل
 */
const startDuelGame = async (duelId) => {
  await supabase.rpc('fn_start_duel_game', { p_duel_id: duelId });
};

/**
 * دریافت دوئل‌های عمومی فعال
 */
export const getPublicDuels = async () => {
  const { data, error } = await supabase
    .from('duels')
    .select(`
      *,
      profiles:creator_id (
        username,
        avatar
      )
    `)
    .eq('type', 'public')
    .eq('status', 'waiting')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;

  // محاسبه زمان باقی‌مانده
  return data.map(duel => ({
    ...duel,
    expires_in: Math.max(0, Math.floor(
      (new Date(duel.expires_at) - new Date()) / 1000
    )),
  }));
};

/**
 * دریافت دوئل‌های خصوصی کاربر
 */
export const getPrivateDuels = async () => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  const { data, error } = await supabase
    .from('duels')
    .select(`
      *,
      profiles:creator_id (
        username,
        avatar
      ),
      opponent:opponent_id (
        username,
        avatar
      )
    `)
    .eq('type', 'private')
    .or(`creator_id.eq.${userId},opponent_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * لغو دوئل منقضی شده و بازگرداندن مبلغ
 */
export const cancelExpiredDuel = async (duelId) => {
  const { data: duel, error: duelError } = await supabase
    .from('duels')
    .select('*')
    .eq('id', duelId)
    .single();

  if (duelError) throw duelError;
  if (duel.status !== 'waiting') return;

  // بازگرداندن مبلغ به سازنده
  await supabase
    .from('user_balances')
    .update({ locked_amount: 0 })
    .eq('user_id', duel.creator_id)
    .eq('currency', duel.currency);

  // به‌روزرسانی وضعیت
  await supabase
    .from('duels')
    .update({ status: 'cancelled' })
    .eq('id', duelId);

  // ثبت تراکنش برگشت
  const accountNumber = await getAccountNumber(duel.creator_id);
  const { data: lastTx } = await supabase
    .from('transactions')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);
  const txSeq = lastTx && lastTx.length > 0 ? lastTx[0].id + 1 : 1;

  await supabase.from('transactions').insert({
    tx_id: generateTransactionId('REF', duel.currency, accountNumber, txSeq),
    user_id: duel.creator_id,
    type: 'duel_refund',
    currency: duel.currency,
    amount: duel.amount,
    reference_id: duelId,
    status: 'completed',
    description: 'Duel expired - refund',
    created_at: new Date().toISOString(),
  });
};

/**
 * ارسال نوتیفیکیشن دوئل به حریف
 */
const sendDuelNotification = async (opponentId, duelId, creatorId) => {
  const { data: creator } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', creatorId)
    .single();

  await supabase.from('notifications').insert({
    user_id: opponentId,
    type: 'duel_request',
    content: `${creator.username} has challenged you to a duel!`,
    related_id: duelId,
    created_at: new Date().toISOString(),
  });
};

const getAccountNumber = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('account_number')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data.account_number;
};