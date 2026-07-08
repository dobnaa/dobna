// services/depositService.js
import { supabase } from './supabaseClient';

export const getDepositAddress = async (currency, network) => {
  const { data, error } = await supabase
    .from('deposit_addresses')
    .select('*')
    .eq('currency', currency)
    .eq('network', network)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data;
};

export const generateNewDepositAddress = async (currency, network) => {
  // در صورت نبود آدرس، یک آدرس جدید تولید کنید (با اتصال به API شبکه یا تولید داخلی)
  const { data, error } = await supabase.rpc('fn_generate_deposit_address', {
    p_currency: currency,
    p_network: network,
  });
  return data;
};

export const checkDepositStatus = async (txId) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('status, confirmed_at')
    .eq('tx_id', txId)
    .single();
  return data;
};