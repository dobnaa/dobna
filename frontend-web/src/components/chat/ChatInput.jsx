// components/ChatInput.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Paperclip, Smile, X, Image, File, Mic } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';
import { useAuth } from '../hooks/useAuth';
import { useAudioManager } from '../hooks/useAudioManager';

const ChatInput = ({
  chatId,
  chatType = 'group', // 'group' | 'private'
  onMessageSent,
  placeholder,
  isDisabled = false,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { sendMessage, isSending } = useChatStore();
  const { playUISound } = useAudioManager();
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const isRTL = useTranslation().i18n.language === 'fa' || useTranslation().i18n.language === 'ar';

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [message]);

  // Typing indicator
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      // emit typing event via WebSocket/Realtime
      // (implement with Supabase Realtime presence or broadcast)
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      // emit stop typing event
    }, 2000);
  };

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage && attachments.length === 0) return;

    playUISound('click');

    try {
      const messageData = {
        content: trimmedMessage,
        type: 'text',
        attachments: attachments.length > 0 ? attachments : null,
        sender_id: user.id,
        chat_id: chatId,
        chat_type: chatType,
      };

      await sendMessage(chatId, messageData, chatType);
      
      setMessage('');
      setAttachments([]);
      setIsTyping(false);
      
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error toast
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    const filePreviews = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    setAttachments(prev => [...prev, ...filePreviews]);
    e.target.value = '';
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="border-t border-gray-700 bg-gray-800/50 p-3">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="relative bg-gray-700 rounded-lg p-2 flex items-center gap-2 max-w-[200px]"
            >
              {att.preview ? (
                <img
                  src={att.preview}
                  alt={att.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <File className="w-8 h-8 text-gray-400" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white truncate">{att.name}</p>
                <p className="text-[10px] text-gray-400">{formatFileSize(att.size)}</p>
              </div>
              <button
                onClick={() => removeAttachment(att.id)}
                className="absolute -top-2 -right-2 bg-red-600 rounded-full p-0.5 hover:bg-red-700 transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2">
        {/* Attach button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-700"
          disabled={isDisabled}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || t('chat.write_message')}
            disabled={isDisabled || isSending}
            className="w-full bg-gray-700 rounded-2xl px-4 py-2.5 text-white text-sm placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 min-h-[44px] max-h-[150px]"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            rows={1}
          />
          
          {/* Typing indicator */}
          {isTyping && (
            <span className="absolute -top-6 left-4 text-[10px] text-gray-400 animate-pulse">
              {t('chat.typing')}
            </span>
          )}
        </div>

        {/* Emoji button (placeholder) */}
        <button
          className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-700"
          disabled={isDisabled}
          onClick={() => {/* open emoji picker */}}
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={(!message.trim() && attachments.length === 0) || isDisabled || isSending}
          className={`p-2.5 rounded-full transition ${
            message.trim() || attachments.length > 0
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Voice recording button (optional) */}
      <button
        className="mt-1 text-gray-500 hover:text-gray-300 transition text-xs flex items-center gap-1"
        onClick={() => {/* start voice recording */}}
      >
        <Mic className="w-3 h-3" />
        {t('chat.voice_message')}
      </button>
    </div>
  );
};

export default ChatInput;