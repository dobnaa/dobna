// stores/chatStore.js
import { create } from 'zustand';
import { supabase } from '../api/supabaseClient';

export const useChatStore = create((set, get) => ({
  // ===== STATE =====
  conversations: [],
  messages: [],
  currentChat: null,
  currentChatType: null, // 'group' | 'private' | 'duel' | 'challenge'
  groupInfo: null,
  groupStories: [],
  unreadCount: 0,
  isLoading: false,
  isSending: false,
  error: null,
  typingUsers: [],
  pinnedMessages: [],

  // ===== RESET =====
  resetChat: () => {
    set({ 
      messages: [], 
      currentChat: null, 
      currentChatType: null,
      groupInfo: null,
      groupStories: [],
      typingUsers: [],
      pinnedMessages: [],
    });
  },

  // ===== ۱. دریافت تعداد پیام‌های نخوانده =====
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

  // ===== ۲. دریافت لیست مکالمات =====
  fetchConversations: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // ۲.۱ دریافت چت‌های گروهی
      const { data: groupMemberships, error: groupError } = await supabase
        .from('community_members')
        .select(`
          community_id,
          communities:community_id (
            id,
            name,
            username,
            avatar,
            gp_id,
            member_count
          )
        `)
        .eq('user_id', userId);

      if (groupError) throw groupError;

      // دریافت آخرین پیام هر گروه
      const groupConversations = await Promise.all(
        (groupMemberships || []).map(async (gm) => {
          const { data: lastMsg, error: msgError } = await supabase
            .from('chat_messages')
            .select('content, created_at, sender_id, is_read')
            .eq('community_id', gm.community_id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (msgError) throw msgError;

          const msg = lastMsg?.[0] || null;
          return {
            id: gm.community_id,
            type: 'group',
            name: gm.communities.name,
            username: gm.communities.username,
            avatar: gm.communities.avatar,
            gpId: gm.communities.gp_id,
            memberCount: gm.communities.member_count,
            lastMessage: msg?.content || '',
            lastMessageTime: msg?.created_at || gm.communities.created_at,
            unreadCount: msg?.is_read === false ? 1 : 0,
            status: 'active',
          };
        })
      );

      // ۲.۲ دریافت چت‌های خصوصی
      const { data: privateChats, error: privateError } = await supabase
        .from('chat_messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          created_at,
          is_read,
          sender:sender_id (id, username, avatar, full_name),
          receiver:receiver_id (id, username, avatar, full_name)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (privateError) throw privateError;

      // گروه‌بندی چت‌های خصوصی بر اساس کاربر دیگر
      const privateMap = {};
      (privateChats || []).forEach(msg => {
        const otherId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
        const otherUser = msg.sender_id === userId ? msg.receiver : msg.sender;
        
        if (!privateMap[otherId]) {
          privateMap[otherId] = {
            id: otherId,
            type: 'private',
            name: otherUser?.full_name || otherUser?.username || 'Unknown',
            username: otherUser?.username || 'unknown',
            avatar: otherUser?.avatar,
            lastMessage: msg.content,
            lastMessageTime: msg.created_at,
            unreadCount: msg.receiver_id === userId && !msg.is_read ? 1 : 0,
            status: 'active',
            sender_id: msg.sender_id,
          };
        } else {
          // اگر پیام جدیدتر است، به‌روزرسانی کن
          if (new Date(msg.created_at) > new Date(privateMap[otherId].lastMessageTime)) {
            privateMap[otherId].lastMessage = msg.content;
            privateMap[otherId].lastMessageTime = msg.created_at;
          }
          // جمع‌آوری تعداد پیام‌های نخوانده
          if (msg.receiver_id === userId && !msg.is_read) {
            privateMap[otherId].unreadCount += 1;
          }
        }
      });

      const privateConversations = Object.values(privateMap);

      // ۲.۳ دریافت دوئل‌های فعال
      const { data: duels, error: duelError } = await supabase
        .from('duels')
        .select(`
          id,
          duel_id,
          creator_id,
          opponent_id,
          currency,
          amount,
          level,
          status,
          expires_at,
          creator:creator_id (id, username, avatar),
          opponent:opponent_id (id, username, avatar)
        `)
        .or(`creator_id.eq.${userId},opponent_id.eq.${userId}`)
        .in('status', ['waiting', 'active']);

      if (duelError) throw duelError;

      const duelConversations = (duels || []).map(d => {
        const isCreator = d.creator_id === userId;
        const otherUser = isCreator ? d.opponent : d.creator;
        return {
          id: d.id,
          type: 'duel',
          name: `${d.currency} ${d.amount} (Level ${d.level})`,
          username: otherUser?.username || 'unknown',
          avatar: otherUser?.avatar,
          lastMessage: `⚔️ ${isCreator ? 'Duel with' : 'Duel from'} ${otherUser?.username || 'unknown'}`,
          lastMessageTime: d.created_at,
          unreadCount: 0,
          status: d.status,
          remainingTime: d.expires_at,
          duelId: d.duel_id,
          creator: d.creator,
          opponent: d.opponent,
          currency: d.currency,
          amount: d.amount,
          level: d.level,
        };
      });

      // ۲.۴ دریافت چالش‌های فعال
      const { data: challenges, error: challengeError } = await supabase
        .from('challenges')
        .select(`
          id,
          challenge_id,
          creator_id,
          currency,
          amount,
          level,
          status,
          expires_at,
          current_participants,
          max_participants,
          creator:creator_id (id, username, avatar)
        `)
        .in('status', ['waiting', 'active']);

      if (challengeError) throw challengeError;

      const challengeConversations = (challenges || []).map(c => ({
        id: c.id,
        type: 'challenge',
        name: `${c.currency} ${c.amount} (Level ${c.level})`,
        username: c.creator?.username || 'unknown',
        avatar: c.creator?.avatar,
        lastMessage: `🏆 Challenge by ${c.creator?.username || 'unknown'}`,
        lastMessageTime: c.created_at,
        unreadCount: 0,
        status: c.status,
        participants: `${c.current_participants}/${c.max_participants}`,
        remainingTime: c.expires_at,
        challengeId: c.challenge_id,
        creator: c.creator,
        currency: c.currency,
        amount: c.amount,
        level: c.level,
      }));

      // ۲.۵ ترکیب و مرتب‌سازی همه مکالمات
      const allConversations = [
        ...groupConversations,
        ...privateConversations,
        ...duelConversations,
        ...challengeConversations,
      ];

      // مرتب‌سازی بر اساس زمان آخرین پیام (جدیدترین در بالا)
      allConversations.sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );

      set({ conversations: allConversations, isLoading: false });
    } catch (error) {
      console.error('Error fetching conversations:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  // ===== ۳. دریافت پیام‌های یک چت خاص =====
  fetchMessages: async (chatId, chatType, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      let query = supabase
        .from('chat_messages')
        .select(`
          *,
          sender:sender_id (id, username, avatar, full_name),
          receiver:receiver_id (id, username, avatar, full_name)
        `)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (chatType === 'group') {
        query = query.eq('community_id', chatId);
      } else if (chatType === 'private') {
        const { data: user } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');
        query = query
          .or(`sender_id.eq.${user.user.id},receiver_id.eq.${user.user.id}`)
          .or(`sender_id.eq.${chatId},receiver_id.eq.${chatId}`);
      } else if (chatType === 'duel' || chatType === 'challenge') {
        // برای دوئل و چالش، پیام‌های مرتبط با آن رویداد را دریافت کن
        query = query.eq('reference_id', chatId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // فرمت کردن پیام‌ها
      const formattedMessages = (data || []).map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        sender_name: msg.sender?.full_name || msg.sender?.username || 'Unknown',
        sender_username: msg.sender?.username || 'unknown',
        sender_avatar: msg.sender?.avatar,
        receiver_id: msg.receiver_id,
        receiver_name: msg.receiver?.full_name || msg.receiver?.username,
        content: msg.content,
        attachments: msg.attachments || [],
        is_read: msg.is_read || false,
        is_pinned: msg.is_pinned || false,
        reply_to_id: msg.reply_to_id,
        reply_to: msg.reply_to,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
      }));

      // دریافت پیام‌های سنجاق‌شده
      const pinned = formattedMessages.filter(m => m.is_pinned);

      set({ 
        messages: formattedMessages, 
        currentChat: chatId,
        currentChatType: chatType,
        pinnedMessages: pinned,
        isLoading: false 
      });

      // علامت‌گذاری پیام‌ها به عنوان خوانده‌شده
      await get().markMessagesAsRead(chatId, chatType);

      return formattedMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // ===== ۴. ارسال پیام جدید =====
  sendMessage: async (chatId, messageData, chatType) => {
    set({ isSending: true, error: null });
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const payload = {
        sender_id: user.user.id,
        content: messageData.content || '',
        attachments: messageData.attachments || [],
        is_read: false,
        is_pinned: false,
        created_at: new Date().toISOString(),
      };

      if (chatType === 'group') {
        payload.community_id = chatId;
      } else if (chatType === 'private') {
        payload.receiver_id = chatId;
      } else if (chatType === 'duel' || chatType === 'challenge') {
        payload.reference_id = chatId;
        payload.type = chatType;
      }

      if (messageData.reply_to_id) {
        payload.reply_to_id = messageData.reply_to_id;
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .insert(payload)
        .select(`
          *,
          sender:sender_id (id, username, avatar, full_name)
        `)
        .single();

      if (error) throw error;

      // اضافه کردن پیام به لیست محلی
      const newMessage = {
        id: data.id,
        sender_id: data.sender_id,
        sender_name: data.sender?.full_name || data.sender?.username || 'Unknown',
        sender_username: data.sender?.username || 'unknown',
        sender_avatar: data.sender?.avatar,
        receiver_id: data.receiver_id,
        content: data.content,
        attachments: data.attachments || [],
        is_read: false,
        is_pinned: false,
        reply_to_id: data.reply_to_id,
        created_at: data.created_at,
      };

      set(state => ({ 
        messages: [...state.messages, newMessage],
        isSending: false 
      }));

      // به‌روزرسانی لیست مکالمات
      await get().fetchConversations(user.user.id);

      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      set({ error: error.message, isSending: false });
      throw error;
    }
  },

  // ===== ۵. علامت‌گذاری پیام‌ها به عنوان خوانده‌شده =====
  markMessagesAsRead: async (chatId, chatType) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('is_read', false);

      if (chatType === 'group') {
        query = query.eq('community_id', chatId);
        // در چت گروهی، فقط پیام‌هایی که گیرنده‌شان کاربر فعلی است
        query = query.eq('receiver_id', user.user.id);
      } else if (chatType === 'private') {
        query = query
          .eq('receiver_id', user.user.id)
          .eq('sender_id', chatId);
      } else {
        // برای دوئل و چالش
        query = query.eq('reference_id', chatId);
      }

      const { error } = await query;
      if (error) throw error;

      // به‌روزرسانی تعداد پیام‌های نخوانده
      await get().fetchUnreadCount();

      // به‌روزرسانی وضعیت خوانده‌شدن در لیست محلی
      set(state => ({
        messages: state.messages.map(msg => 
          msg.receiver_id === user.user.id && !msg.is_read 
            ? { ...msg, is_read: true } 
            : msg
        )
      }));

    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  },

  // ===== ۶. سنجاق کردن پیام =====
  pinMessage: async (messageId, chatId, chatType) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // بررسی اینکه کاربر مجاز به سنجاق کردن است (مالک یا ادمین گروه)
      if (chatType === 'group') {
        const { data: member, error: memberError } = await supabase
          .from('community_members')
          .select('role')
          .eq('community_id', chatId)
          .eq('user_id', user.user.id)
          .single();

        if (memberError || !member || !['owner', 'admin'].includes(member.role)) {
          throw new Error('Only group owner or admin can pin messages');
        }
      }

      const { error } = await supabase
        .from('chat_messages')
        .update({ is_pinned: true })
        .eq('id', messageId);

      if (error) throw error;

      // به‌روزرسانی لیست محلی
      set(state => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, is_pinned: true } : msg
        ),
        pinnedMessages: [...state.pinnedMessages, messageId],
      }));

      return true;
    } catch (error) {
      console.error('Error pinning message:', error);
      throw error;
    }
  },

  // ===== ۷. لغو سنجاق پیام =====
  unpinMessage: async (messageId) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_pinned: false })
        .eq('id', messageId);

      if (error) throw error;

      set(state => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, is_pinned: false } : msg
        ),
        pinnedMessages: state.pinnedMessages.filter(id => id !== messageId),
      }));

      return true;
    } catch (error) {
      console.error('Error unpinning message:', error);
      throw error;
    }
  },

  // ===== ۸. حذف پیام =====
  deleteMessage: async (messageId) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // فقط خود کاربر می‌تواند پیام خود را حذف کند
      const { data: message, error: fetchError } = await supabase
        .from('chat_messages')
        .select('sender_id')
        .eq('id', messageId)
        .single();

      if (fetchError) throw fetchError;
      if (message.sender_id !== user.user.id) {
        throw new Error('You can only delete your own messages');
      }

      const { error } = await supabase
        .from('chat_messages')
        .update({ 
          content: '[Deleted]', 
          attachments: [], 
          is_deleted: true 
        })
        .eq('id', messageId);

      if (error) throw error;

      set(state => ({
        messages: state.messages.map(msg =>
          msg.id === messageId 
            ? { ...msg, content: '[Deleted]', attachments: [], is_deleted: true } 
            : msg
        )
      }));

      return true;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  // ===== ۹. گزارش تخلف پیام =====
  reportMessage: async (messageId, reason) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reports')
        .insert({
          reporter_id: user.user.id,
          reported_id: messageId,
          type: 'message',
          reason: reason,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error reporting message:', error);
      throw error;
    }
  },

  // ===== ۱۰. دریافت اطلاعات گروه =====
  fetchGroupInfo: async (groupId) => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          owner:owner_id (id, username, avatar, full_name),
          member_count,
          online_count
        `)
        .eq('id', groupId)
        .single();

      if (error) throw error;
      set({ groupInfo: data });
      return data;
    } catch (error) {
      console.error('Error fetching group info:', error);
      throw error;
    }
  },

  // ===== ۱۱. دریافت استوری‌های گروه =====
  fetchGroupStories: async (groupId) => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select(`
          id,
          challenge_id,
          creator_id,
          creator:creator_id (id, username, avatar),
          currency,
          amount,
          level,
          status,
          expires_at
        `)
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString())
        .limit(10);

      if (error) throw error;

      const stories = (data || []).map(item => ({
        id: item.id,
        type: 'challenge',
        creatorId: item.creator_id,
        creatorUsername: item.creator?.username,
        creatorAvatar: item.creator?.avatar,
        level: item.level,
        currency: item.currency,
        amount: item.amount,
        expiresAt: item.expires_at,
        remainingTime: item.expires_at,
      }));

      set({ groupStories: stories });
      return stories;
    } catch (error) {
      console.error('Error fetching group stories:', error);
      return [];
    }
  },

  // ===== ۱۲. راه‌اندازی Realtime Subscription =====
  subscribeToChat: (chatId, chatType, onNewMessage) => {
    let channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: 
            chatType === 'group' ? `community_id=eq.${chatId}` :
            chatType === 'private' ? `receiver_id=eq.${chatId}` :
            `reference_id=eq.${chatId}`,
        },
        async (payload) => {
          // دریافت اطلاعات کامل پیام با sender
          const { data: msg, error } = await supabase
            .from('chat_messages')
            .select(`
              *,
              sender:sender_id (id, username, avatar, full_name)
            `)
            .eq('id', payload.new.id)
            .single();

          if (error || !msg) return;

          const newMessage = {
            id: msg.id,
            sender_id: msg.sender_id,
            sender_name: msg.sender?.full_name || msg.sender?.username || 'Unknown',
            sender_username: msg.sender?.username || 'unknown',
            sender_avatar: msg.sender?.avatar,
            receiver_id: msg.receiver_id,
            content: msg.content,
            attachments: msg.attachments || [],
            is_read: msg.is_read || false,
            is_pinned: msg.is_pinned || false,
            reply_to_id: msg.reply_to_id,
            created_at: msg.created_at,
          };

          // به‌روزرسانی لیست پیام‌ها
          set(state => ({ 
            messages: [...state.messages, newMessage] 
          }));

          // فراخوانی callback
          if (onNewMessage) onNewMessage(newMessage);

          // به‌روزرسانی تعداد پیام‌های نخوانده
          await get().fetchUnreadCount();
        }
      )
      .subscribe();

    return channel;
  },

  // ===== ۱۳. لغو اشتراک Realtime =====
  unsubscribeFromChat: (channel) => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  },

  // ===== ۱۴. تایپ‌اندیکیتور (Broadcast) =====
  sendTypingIndicator: (chatId, isTyping) => {
    const channel = supabase.channel(`chat:${chatId}:typing`);
    channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: { 
        user_id: supabase.auth.getUser().then(res => res.data.user?.id),
        is_typing: isTyping,
        timestamp: new Date().toISOString(),
      },
    });
  },

  // ===== ۱۵. دریافت کاربران تایپ‌کننده =====
  subscribeToTyping: (chatId, onTypingUpdate) => {
    const channel = supabase
      .channel(`chat:${chatId}:typing`)
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (onTypingUpdate) onTypingUpdate(payload.payload);
      })
      .subscribe();

    return channel;
  },
}));