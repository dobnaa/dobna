// services/cryptoGatewayService.js
import { supabase } from '../api/supabaseClient';

export const cryptoGatewayService = {
  /**
   * دریافت یا ایجاد آدرس واریز
   */
  async getDepositAddress(userId, currency, network) {
    // بررسی آدرس موجود
    const { data: existing, error: findError } = await supabase
      .from('deposit_addresses')
      .select('address, contract_address')
      .eq('user_id', userId)
      .eq('currency', currency)
      .eq('network', network)
      .eq('is_active', true)
      .maybeSingle();

    if (findError) throw findError;

    if (existing) {
      return { address: existing.address, contractAddress: existing.contract_address, existing: true };
    }

    // دریافت آدرس جدید از Edge Function
    const { data, error } = await supabase.functions.invoke('generate-deposit-address', {
      body: { userId, currency, network },
    });

    if (error) throw error;
    if (!data.success) throw new Error(data.error);

    // ذخیره آدرس در دیتابیس
    const { data: saved, error: saveError } = await supabase.rpc(
      'fn_get_or_create_deposit_address',
      {
        p_user_id: userId,
        p_currency: currency,
        p_network: network,
        p_address: data.address,
        p_contract_address: data.contractAddress || null,
      }
    );

    if (saveError) throw saveError;
    return { address: saved.address, contractAddress: saved.contract_address, existing: false };
  },

  /**
   * درخواست برداشت
   */
  async requestWithdrawal(userId, currency, amount, address, network) {
    const { data, error } = await supabase.rpc('fn_request_withdrawal', {
      p_user_id: userId,
      p_currency: currency,
      p_amount: amount,
      p_address: address,
      p_network: network,
    });

    if (error) throw error;
    if (!data.success) throw new Error(data.error);
    return data;
  },

  /**
   * تأیید برداشت
   */
  async confirmWithdrawal(transactionId, txHash) {
    const { data, error } = await supabase.rpc('fn_confirm_withdrawal', {
      p_transaction_id: transactionId,
      p_tx_hash: txHash,
    });

    if (error) throw error;
    if (!data.success) throw new Error(data.error);
    return data;
  },

  /**
   * لغو برداشت
   */
  async cancelWithdrawal(transactionId) {
    const { data, error } = await supabase.rpc('fn_cancel_withdrawal', {
      p_transaction_id: transactionId,
    });

    if (error) throw error;
    if (!data.success) throw new Error(data.error);
    return data;
  },

  /**
   * دریافت تاریخچه تراکنش‌های واریز/برداشت
   */
  async getTransactionHistory(userId, type = null, limit = 20) {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .in('type', ['deposit', 'withdraw'])
      .order('created_at', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
};