// components/ChatMessage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fa, enUS } from 'date-fns/locale';
import {
  Pin,
  Copy,
  Reply,
  Trash2,
  Flag,
  Check,
  CheckCheck,
  MoreVertical,
  Download,
  Eye,
} from 'lucide-react';
import { getAvatarUrl } from '../utils/avatarGenerator';

const ChatMessage = ({
  message,
  isOwn,
  isPinned,
  isRead,
  chatType,
  onPin,
  onReply,
  onDelete,
  onReport,
  onCopy,
  onUserClick,
  showAvatar = true,
  showActions = true,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

  const localeMap = {
    fa: fa,
    en: enUS,
  };
  const locale = localeMap[i18n.language] || enUS;

  const timeAgo = message.created_at
    ? formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale })
    : '';

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(message.sender_id);
    } else {
      navigate(`/profile/${message.sender_id}`);
    }
  };

  const renderAttachment = (attachment) => {
    if (attachment.preview || attachment.type?.startsWith('image/')) {
      return (
        <div className="mt-2 relative group">
          <img
            src={attachment.preview || attachment.url}
            alt={attachment.name}
            className="max-w-[300px] max-h-[300px] rounded-lg object-cover cursor-pointer hover:opacity-90 transition"
            onLoad={() => setImageLoaded(true)}
            onClick={() => window.open(attachment.preview || attachment.url, '_blank')}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-lg" />
          )}
          <button
            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
            onClick={() => window.open(attachment.preview || attachment.url, '_blank')}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <a
        href={attachment.url}
        download={attachment.name}
        className="mt-2 bg-gray-700/50 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-700 transition group"
      >
        <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
          <Download className="w-5 h-5 text-gray-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white truncate">{attachment.name}</p>
          <p className="text-xs text-gray-400">
            {(attachment.size / 1024).toFixed(1)} KB
          </p>
        </div>
        <Download className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
      </a>
    );
  };

  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 group`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} max-w-[75%] gap-2`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <button
            onClick={handleUserClick}
            className="flex-shrink-0 mt-1 focus:outline-none"
          >
            <img
              src={message.sender_avatar || getAvatarUrl(message.sender_id)}
              alt={message.sender_name}
              className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-purple-500 transition"
            />
          </button>
        )}

        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Sender name (for group chat) */}
          {chatType === 'group' && !isOwn && (
            <button
              onClick={handleUserClick}
              className="text-xs text-gray-400 hover:text-white transition mb-0.5 focus:outline-none"
            >
              {message.sender_name || message.sender_username}
            </button>
          )}

          {/* Message bubble */}
          <div
            className={`relative rounded-2xl px-4 py-2.5 break-words ${
              isOwn
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-gray-700 text-white rounded-bl-none'
            } ${isPinned ? 'border-2 border-yellow-400/50' : ''}`}
          >
            {/* Pinned badge */}
            {isPinned && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-0.5">
                <Pin className="w-3 h-3 text-gray-900" />
              </div>
            )}

            {/* Message content */}
            <div className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </div>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((att, idx) => (
                  <div key={idx}>{renderAttachment(att)}</div>
                ))}
              </div>
            )}

            {/* Reply to preview */}
            {message.reply_to && (
              <div className="mt-1.5 text-xs bg-gray-800/50 rounded p-1.5 border-l-2 border-purple-400">
                <span className="text-gray-400">{message.reply_to.sender_name}:</span>
                <span className="text-gray-300 ml-1">{message.reply_to.content}</span>
              </div>
            )}

            {/* Message footer */}
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] opacity-70">{timeAgo}</span>
              {isOwn && (
                <span className="text-[10px]">
                  {isRead ? (
                    <CheckCheck className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Check className="w-3 h-3 text-gray-400" />
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Actions menu (hidden until hover) */}
          {showActions && (
            <div className={`flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition ${isOwn ? 'flex-row' : 'flex-row-reverse'}`}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-500 hover:text-white transition p-1 rounded hover:bg-gray-700"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
              
              {/* Quick actions */}
              <button
                onClick={() => onReply?.(message.id)}
                className="text-gray-500 hover:text-white transition p-1 rounded hover:bg-gray-700"
                title={t('chat.reply')}
              >
                <Reply className="w-3.5 h-3.5" />
              </button>
              
              {!isOwn && (
                <button
                  onClick={() => onReport?.(message.id)}
                  className="text-gray-500 hover:text-red-400 transition p-1 rounded hover:bg-gray-700"
                  title={t('chat.report')}
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Dropdown menu */}
              {showMenu && (
                <div className="absolute z-20 top-0 right-0 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl min-w-[150px] p-1">
                  <button
                    onClick={() => {
                      onCopy?.(message.content);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded-lg flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> {t('chat.copy')}
                  </button>
                  
                  <button
                    onClick={() => {
                      onReply?.(message.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded-lg flex items-center gap-2"
                  >
                    <Reply className="w-4 h-4" /> {t('chat.reply')}
                  </button>
                  
                  {isOwn && (
                    <button
                      onClick={() => {
                        onDelete?.(message.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> {t('chat.delete')}
                    </button>
                  )}
                  
                  {!isOwn && (
                    <button
                      onClick={() => {
                        onReport?.(message.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Flag className="w-4 h-4" /> {t('chat.report')}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;