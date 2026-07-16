// stores/communityStore.js
import { create } from 'zustand';
import { supabase } from '../api/supabaseClient';

export const useCommunityStore = create((set, get) => ({
  communities: [],
  currentCommunity: null,
  members: [],
  favoriteCommunities: [],
  isLoading: false,
  error: null,

  // دریافت همه گروه‌ها
  fetchCommunities: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          community_stats (*)
        `)
        .order('rank', { ascending: true });

      if (error) throw error;

      set({ 
        communities: data || [], 
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // دریافت جزئیات یک گروه
  fetchCommunityDetail: async (communityId) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          community_stats (*)
        `)
        .eq('id', communityId)
        .single();

      if (error) throw error;

      set({ currentCommunity: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // دریافت اعضای گروه
  fetchMembers: async (communityId) => {
    try {
      const { data, error } = await supabase
        .from('community_members')
        .select(`
          user_id,
          role,
          is_online,
          profiles:user_id (
            id,
            username,
            avatar,
            full_name,
            is_online,
            is_following
          )
        `)
        .eq('community_id', communityId);

      if (error) throw error;

      const members = data.map(item => ({
        id: item.profiles.id,
        username: item.profiles.username,
        avatar: item.profiles.avatar,
        fullName: item.profiles.full_name,
        isOnline: item.profiles.is_online || false,
        role: item.role,
        isFollowing: item.profiles.is_following || false,
      }));

      set({ members });
      return members;
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  },

  // ایجاد گروه جدید
  createCommunity: async (formData) => {
    set({ isLoading: true });
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('communities')
        .insert({
          name: formData.name,
          username: `${formData.username}-${formData.currency}`,
          currency: formData.currency,
          avatar: formData.avatar || 'default',
          owner_id: user.user.id,
          bmc_amount: formData.bmcAmount,
          gp_id: formData.gpId,
        })
        .select()
        .single();

      if (error) throw error;

      // کسر مبلغ BMC از کاربر
      await supabase.rpc('transfer_to_community_bmc', {
        p_user_id: user.user.id,
        p_community_id: data.id,
        p_currency: formData.currency,
        p_amount: formData.bmcAmount,
      });

      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // عضو شدن در گروه
  joinCommunity: async (communityId) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('community_members')
        .insert({
          community_id: communityId,
          user_id: user.user.id,
          role: 'member',
        });

      if (error) throw error;

      // به‌روزرسانی لیست اعضا
      await get().fetchMembers(communityId);
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  },

  // خروج از گروه
  leaveCommunity: async (communityId) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('community_members')
        .delete()
        .eq('community_id', communityId)
        .eq('user_id', user.user.id);

      if (error) throw error;

      // به‌روزرسانی لیست اعضا
      await get().fetchMembers(communityId);
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  },

  // ستاره‌دار کردن گروه
  toggleFavorite: async (communityId) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // بررسی وضعیت فعلی
      const { data: existing, error: checkError } = await supabase
        .from('favorite_communities')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('community_id', communityId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existing) {
        // حذف از علاقه‌مندی‌ها
        await supabase
          .from('favorite_communities')
          .delete()
          .eq('id', existing.id);
      } else {
        // افزودن به علاقه‌مندی‌ها
        await supabase
          .from('favorite_communities')
          .insert({
            user_id: user.user.id,
            community_id: communityId,
          });
      }

      // به‌روزرسانی لیست گروه‌ها
      await get().fetchCommunities();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },
}));