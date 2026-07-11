// utils/idGenerator.js

/**
 * تولید DID (شناسه ۱۶ رقمی منحصربفرد)
 * فرمت: 9 + YYMMDD + HHMM + SSS (میلی‌ثانیه)
 * مثال: 9202606031801123
 */
export const generateDID = (prefix = '9') => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const millis = String(now.getMilliseconds()).padStart(3, '0');
  
  return `${prefix}${year}${month}${day}${hours}${minutes}${seconds}${millis}`;
};

/**
 * تولید DID برای اکانت جدید (با پیشوند 8)
 */
export const generateNewAccountDID = () => {
  return generateDID('8');
};

/**
 * تولید شماره حساب ۸ رقمی
 * @param {number} lastNumber - آخرین شماره حساب ثبت شده
 * @returns {string} شماره حساب ۸ رقمی با صفر‌های جلویی
 */
export const generateAccountNumber = (lastNumber = 0) => {
  const next = lastNumber + 1;
  return String(next).padStart(8, '0');
};

/**
 * تولید شناسه گروه ۶ رقمی
 * @param {number} lastNumber - آخرین شماره گروه ثبت شده
 * @returns {string} شناسه گروه با فرمت GPXXXXXX
 */
export const generateGroupId = (lastNumber = 0) => {
  const next = lastNumber + 1;
  return `GP${String(next).padStart(6, '0')}`;
};

/**
 * تولید شناسه تراکنش
 * @param {string} prefix - پیشوند تراکنش (مثلاً DEP, WTH, SWP, DUL, CHL, WIN)
 * @param {string} currency - ارز تراکنش
 * @param {string} accountNumber - شماره حساب کاربر
 * @param {number} sequence - شماره سریال تراکنش
 * @returns {string} شناسه تراکنش
 */
export const generateTransactionId = (prefix, currency, accountNumber, sequence) => {
  const now = new Date();
  const date = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  const time = String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0');
  
  return `${prefix}-${currency}-${accountNumber}-${date}-${time}-${String(sequence).padStart(6, '0')}`;
};

/**
 * تولید شناسه چالش
 */
export const generateChallengeId = (sequence) => {
  return `CHL-${String(sequence).padStart(6, '0')}`;
};

/**
 * تولید شناسه دوئل
 */
export const generateDuelId = (sequence) => {
  return `DUL-${String(sequence).padStart(6, '0')}`;
};