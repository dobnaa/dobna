// src/utils/avatarGenerator.js
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars'; // یا استایل دیگر

export const generateAvatar = (seed) => {
  // seed می‌تواند ایمیل یا نام کاربری یا ID باشد
  return createAvatar(style, {
    seed: seed,
    // آپشن‌های دیگر برای شخصی‌سازی
    // backgroundColor: ['#FFB6C1', '#87CEEB', ...],
  });
};

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avataaars';

export const generateAvatar = (seed) => {
  return createAvatar(style, {
    seed: seed || 'default',
    backgroundColor: ['#1E293B', '#334155', '#0F172A'],
    // تنظیمات دلخواه
  });
};