// frontend-web/src/services/challengeService.js
import { supabase } from '../api/supabaseClient';
import { generateChallengeId } from '../utils/idGenerator';

// ایجاد چالش
export const createChallenge = async ({ currency, amount, level }) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // بررسی موجودی
  const { data: balance } = await supabase
    .from('user_balances')
    .select('amount')
    .eq('user_id', userId)
    .eq('currency', currency)
    .single();

  if (balance.amount < amount) throw new Error('Insufficient balance');

  // کسر مبلغ و واریز به حساب مرکزی
  await supabase.rpc('transfer_to_escrow', {
    p_user_id: userId,
    p_currency: currency,
    p_amount: amount,
    p_account: '11111111',
    p_reference: 'challenge_create'
  });

  // ایجاد چالش
  const { data: challenge, error } = await supabase
    .from('challenges')
    .insert({
      challenge_id: generateChallengeId(),
      creator_id: userId,
      currency,
      amount,
      level,
      status: 'waiting',
      max_participants: 100,
      current_participants: 1,
      min_participants: 5,
      expires_at: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  // تخصیص کارت به سازنده (رندوم از ۱ تا ۱۰۰)
  const cardNumber = Math.floor(Math.random() * 100) + 1;
  await supabase.from('challenge_participants').insert({
    challenge_id: challenge.id,
    user_id: userId,
    card_number: cardNumber,
  });

  return challenge;
};

// پیوستن به چالش
export const joinChallenge = async (challengeId) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  const { data: challenge } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (challenge.status !== 'waiting') throw new Error('Challenge not available');
  if (challenge.current_participants >= challenge.max_participants) throw new Error('Challenge is full');
  if (new Date(challenge.expires_at) < new Date()) throw new Error('Challenge expired');

  // کسر مبلغ از کاربر
  await supabase.rpc('transfer_to_escrow', {
    p_user_id: userId,
    p_currency: challenge.currency,
    p_amount: challenge.amount,
    p_account: '11111111',
    p_reference: 'challenge_join'
  });

  // افزایش تعداد شرکت‌کنندگان
  const newCount = challenge.current_participants + 1;
  await supabase
    .from('challenges')
    .update({
      current_participants: newCount,
      status: newCount >= challenge.min_participants ? 'active' : 'waiting',
    })
    .eq('id', challengeId);

  // تخصیص کارت رندوم
  const cardNumber = Math.floor(Math.random() * 100) + 1;
  await supabase.from('challenge_participants').insert({
    challenge_id: challengeId,
    user_id: userId,
    card_number: cardNumber,
  });

  // اگر ۱۰۰ نفر پر شد، شروع کن
  if (newCount >= challenge.max_participants) {
    await supabase.rpc('fn_start_challenge_game', { p_challenge_id: challengeId });
  }

  return { success: true };
};

import { supabase } from './supabaseClient';
import { generateChallengeId, generateTransactionId } from '../utils/idGenerator';

/**
 * دریافت سطوح آزاد شده برای کاربر بر اساس فعالیت‌ها
 */
export const getUnlockedLevels = async (userId) => {
  try {
    // محاسبه سطح بر اساس تعداد بازی‌های انجام شده یا امتیاز کاربر
    const { data: userStats, error } = await supabase
      .from('user_stats')
      .select('total_games_played, total_wins, total_score')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    const levels = [1]; // سطح ۱ همیشه آزاد است
    if (userStats.total_games_played >= 10) levels.push(2);
    if (userStats.total_games_played >= 50) levels.push(3);
    if (userStats.total_games_played >= 100) levels.push(4);

    return levels;
  } catch (error) {
    console.error('Error fetching unlocked levels:', error);
    return [1]; // در صورت خطا، فقط سطح ۱
  }
};

/**
 * ایجاد چالش جدید
 */
export const createChallenge = async ({ currency, amount, level }) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // بررسی موجودی کافی
  const { data: balance, error: balanceError } = await supabase
    .from('user_balances')
    .select('amount')
    .eq('user_id', userId)
    .eq('currency', currency)
    .single();

  if (balanceError) throw new Error('Failed to check balance');
  if (balance.amount < amount) throw new Error('Insufficient balance');

  // دریافت آخرین شماره چالش
  const { data: lastChallenge, error: seqError } = await supabase
    .from('challenges')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  const sequence = lastChallenge && lastChallenge.length > 0 ? lastChallenge[0].id + 1 : 1;

  // ایجاد چالش
  const challengeData = {
    challenge_id: generateChallengeId(sequence),
    creator_id: userId,
    currency,
    amount,
    level,
    status: 'waiting',
    max_participants: 100,
    current_participants: 1,
    min_participants: 5,
    expires_at: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 دقیقه
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('challenges')
    .insert(challengeData)
    .select()
    .single();

  if (error) throw error;

  // کسر مبلغ از حساب سازنده
  await supabase
    .from('user_balances')
    .update({ amount: balance.amount - amount })
    .eq('user_id', userId)
    .eq('currency', currency);

  // ثبت تراکنش
  const { data: lastTx } = await supabase
    .from('transactions')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);
  const txSeq = lastTx && lastTx.length > 0 ? lastTx[0].id + 1 : 1;
  const accountNumber = await getAccountNumber(userId);

  await supabase.from('transactions').insert({
    tx_id: generateTransactionId('CHL', currency, accountNumber, txSeq),
    user_id: userId,
    type: 'challenge_create',
    currency,
    amount: -amount,
    reference_id: data.id,
    status: 'completed',
    created_at: new Date().toISOString(),
  });

  return data;
};

/**
 * پیوستن به چالش
 */
export const joinChallenge = async (challengeId) => {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  // دریافت اطلاعات چالش
  const { data: challenge, error: challengeError } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (challengeError) throw challengeError;

  // بررسی شرایط
  if (challenge.status !== 'waiting') throw new Error('Challenge is not active');
  if (challenge.current_participants >= challenge.max_participants) {
    throw new Error('Challenge is full');
  }

  // بررسی موجودی
  const { data: balance, error: balanceError } = await supabase
    .from('user_balances')
    .select('amount')
    .eq('user_id', userId)
    .eq('currency', challenge.currency)
    .single();

  if (balanceError) throw new Error('Failed to check balance');
  if (balance.amount < challenge.amount) throw new Error('Insufficient balance');

  // کسر مبلغ
  await supabase
    .from('user_balances')
    .update({ amount: balance.amount - challenge.amount })
    .eq('user_id', userId)
    .eq('currency', challenge.currency);

  // به‌روزرسانی تعداد شرکت‌کنندگان
  const newCount = challenge.current_participants + 1;
  const { data, error } = await supabase
    .from('challenges')
    .update({
      current_participants: newCount,
      status: newCount >= challenge.min_participants ? 'active' : 'waiting',
      ...(newCount >= challenge.max_participants ? { status: 'active' } : {}),
    })
    .eq('id', challengeId)
    .select()
    .single();

  if (error) throw error;

  // تخصیص کارت رندوم به کاربر (از کارت‌های ۱ تا ۱۰۰)
  const cardNumber = Math.floor(Math.random() * 100) + 1;
  await assignCardToUser(userId, challengeId, cardNumber);

  // اگر به ۱۰۰ نفر رسید، بازی شروع می‌شود
  if (data.current_participants >= data.max_participants) {
    await startChallengeGame(challengeId);
  }

  return data;
};

/**
 * تخصیص کارت به کاربر در چالش
 */
const assignCardToUser = async (userId, challengeId, cardNumber) => {
  await supabase.from('challenge_participants').insert({
    challenge_id: challengeId,
    user_id: userId,
    card_number: cardNumber,
    joined_at: new Date().toISOString(),
  });
};

/**
 * شروع بازی چالش
 */
const startChallengeGame = async (challengeId) => {
  // شروع بازی بینگو با ۱۰۰ کارت
  await supabase.rpc('fn_start_challenge_game', { p_challenge_id: challengeId });
};

/**
 * دریافت لیست چالش‌های فعال
 */
export const getActiveChallenges = async () => {
  const { data, error } = await supabase
    .from('challenges')
    .select(`
      *,
      profiles:creator_id (
        username,
        avatar
      )
    `)
    .in('status', ['waiting', 'active'])
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * دریافت تراکنش‌های چالش برای کاربر
 */
export const getChallengeTransactions = async (userId) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .in('type', ['challenge_create', 'challenge_join', 'challenge_win'])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * دریافت شماره حساب کاربر
 */
const getAccountNumber = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('account_number')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data.account_number;
};