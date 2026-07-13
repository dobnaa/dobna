// stores/chatStore.js
import { create } from 'zustand';
import { supabase } from '../api/supabaseClient';

export const useChatStore = create((set, get) => ({
  conversations: [],
  messages: [],
  groupInfo: null,
  groupStories: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  // دریافت تعداد پیام‌های نخوانده
  fetchUnreadCount: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { count, error } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.user.id)
        .eq('is_read', false);

      if (error) throw error;
      set({ unreadCount: count || 0 });
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  },

  // دریافت لیست مکالمات
  fetchConversations: async (userId) => {
    set({ isLoading: true });
    try {
      // دریافت چت‌های گروهی
      const { data: groups, error: groupError } = await supabase
        .from('user_groups')
        .select(`
          group_id,
          groups:group_id (
            id,
            name,
            avatar,
            last_message,
            last_message_time,
            member_count
          )
        `)
        .eq('user_id', userId);

      if (groupError) throw groupError;

      // دریافت چت‌های خصوصی
      const { data: privates, error: privateError } = await supabase
        .from('private_chats')
        .select(`
          id,
          other_user:user_id (
            id,
            username,
            avatar,
            full_name
          ),
          last_message,
          last_message_time,
          unread_count
        `)
        .eq('user_id', userId);

      if (privateError) throw privateError;

      // دریافت دوئل‌های فعال
      const { data: duels, error: duelError } = await supabase
        .from('duels')
        .select(`
          id,
          creator:creator_id (id, username, avatar),
          opponent:opponent_id (id, username, avatar),
          currency,
          amount,
          level,
          status,
          expires_at,
          remaining_time
        `)
        .or(`creator_id.eq.${userId},opponent_id.eq.${userId}`)
        .in('status', ['waiting', 'active']);

      if (duelError) throw duelError;

      // دریافت چالش‌های فعال
      const { data: challenges, error: challengeError } = await supabase
        .from('challenges')
        .select(`
          id,
          creator:creator_id (id, username, avatar),
          currency,
          amount,
          level,
          status,
          expires_at,
          current_participants,
          max_participants
        `)
        .in('status', ['waiting', 'active']);

      if (challengeError) throw challengeError;

      // ترکیب همه مکالمات
      const conversations = [
        ...(groups || []).map(g => ({
          id: g.group_id,
          type: 'group',
          name: g.groups.name,
          avatar: g.groups.avatar,
          lastMessage: g.groups.last_message,
          lastMessageTime: g.groups.last_message_time,
          unreadCount: g.groups.unread_count || 0,
          memberCount: g.groups.member_count,
          status: 'active',
        })),
        ...(privates || []).map(p => ({
          id: p.id,
          type: 'private',
          name: p.other_user.full_name || p.other_user.username,
          avatar: p.other_user.avatar,
          lastMessage: p.last_message,
          lastMessageTime: p.last_message_time,
          unreadCount: p.unread_count || 0,
          status: p.other_user.online ? 'active' : 'offline',
        })),
        ...(duels || []).map(d => ({
          id: d.id,
          type: 'duel',
          name: `${d.currency} ${d.amount} (Level ${d.level})`,
          avatar: d.creator.avatar,
          lastMessage: `Duel with ${d.creator.username}`,
          lastMessageTime: d.created_at,
          unreadCount: 0,
          status: d.status,
          remainingTime: d.remaining_time,
          creator: d.creator,
          opponent: d.opponent,
        })),
        ...(challenges || []).map(c => ({
          id: c.id,
          type: 'challenge',
          name: `${c.currency} ${c.amount} (Level ${c.level})`,
          avatar: c.creator.avatar,
          lastMessage: `Challenge by ${c.creator.username}`,
          lastMessageTime: c.created_at,
          unreadCount: 0,
          status: c.status,
          participants: `${c.current_participants}/${c.max_participants}`,
          creator: c.creator,
        })),
      ];

      // مرتب‌سازی بر اساس زمان آخرین پیام
      conversations.sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );

      set({ conversations, isLoading: false });
    } catch (error) {
      console.error('Error fetching conversations:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  // ارسال پیام
  sendMessage: async (chatId, content, type) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const message = {
        sender_id: user.user.id,
        content,
        created_at: new Date().toISOString(),
      };

      if (type === 'group') {
        message.group_id = chatId;
      } else if (type === 'private') {
        message.chat_id = chatId;
        message.receiver_id = chatId; // باید از استور دریافت شود
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .insert(message)
        .select()
        .single();

      if (error) throw error;

      // به‌روزرسانی لیست مکالمات
      await get().fetchConversations(user.user.id);
      
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // دریافت پیام‌های گروه
  fetchGroupMessages: async (groupId) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender:sender_id (
            id,
            username,
            avatar,
            full_name
          )
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      const messages = data.map(msg => ({
        id: msg.id,
        senderId: msg.sender_id,
        senderName: msg.sender.full_name || msg.sender.username,
        senderAvatar: msg.sender.avatar,
        content: msg.content,
        createdAt: msg.created_at,
        isPinned: msg.is_pinned || false,
        isRead: msg.is_read,
      }));

      set({ messages });
    } catch (error) {
      console.error('Error fetching group messages:', error);
    }
  },

  // سنجاق کردن پیام
  pinMessage: async (groupId, messageId) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_pinned: true })
        .eq('id', messageId);

      if (error) throw error;

      // به‌روزرسانی پیام‌ها
      await get().fetchGroupMessages(groupId);
    } catch (error) {
      console.error('Error pinning message:', error);
    }
  },

  // علامت‌گذاری پیام‌ها به عنوان خوانده‌شده
  markMessagesAsRead: async (chatId) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('receiver_id', user.user.id)
        .eq('chat_id', chatId)
        .eq('is_read', false);

      if (error) throw error;

      // به‌روزرسانی تعداد پیام‌های نخوانده
      await get().fetchUnreadCount();
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  },
}));