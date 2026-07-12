// stores/walletStore.js
import { create } from 'zustand';
import { supabase } from '../api/supabaseClient';

export const useWalletStore = create((set, get) => ({
  balances: [],
  totalValue: 0,
  dailyInterest: 0,
  transactions: [],
  isLoading: false,
  error: null,
  showBalance: true,

  fetchWalletData: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // دریافت موجودی‌ها
      const { data: balances, error: balanceError } = await supabase
        .from('user_balances')
        .select('*')
        .eq('user_id', userId);

      if (balanceError) throw balanceError;

      // دریافت قیمت‌های لحظه‌ای
      const { data: prices, error: priceError } = await supabase
        .from('price_feeds')
        .select('*');

      if (priceError) throw priceError;

      // محاسبه ارزش هر دارایی به دلار
      const priceMap = {};
      prices.forEach(p => {
        priceMap[p.currency] = p.price_usd;
      });

      const balancesWithValue = balances.map(b => ({
        ...b,
        usdValue: (b.amount || 0) * (priceMap[b.currency] || 0),
        change24h: b.change_24h || 0,
        icon: b.icon || null,
      }));

      const totalValue = balancesWithValue.reduce((sum, b) => sum + (b.usdValue || 0), 0);

      // دریافت تاریخچه تراکنش‌ها
      const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (txError) throw txError;

      set({
        balances: balancesWithValue,
        totalValue,
        dailyInterest: totalValue * 0.01 / 30, // سود روزانه
        transactions: transactions || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  toggleBalanceVisibility: () => {
    set((state) => ({ showBalance: !state.showBalance }));
  },
}));