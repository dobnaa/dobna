// utils/interestCalculator.js

/**
 * محاسبه سود روزانه بر اساس ارزش کل دارایی
 * نرخ سود سالانه: 10%
 * @param {number} totalValue - ارزش کل دارایی به دلار
 * @param {number} days - تعداد روزهای گذشته (پیش‌فرض: 1)
 * @returns {number} - سود روزانه به دلار
 */
export const calculateDailyInterest = (totalValue, days = 1) => {
  const annualRate = 0.10; // 10%
  const dailyRate = annualRate / 365;
  return totalValue * dailyRate * days;
};

/**
 * محاسبه سود تجمعی از تاریخ شروع
 * @param {number} totalValue - ارزش کل دارایی به دلار
 * @param {Date} startDate - تاریخ شروع محاسبه
 * @returns {number} - سود تجمعی به دلار
 */
export const calculateCumulativeInterest = (totalValue, startDate) => {
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return calculateDailyInterest(totalValue, diffDays);
};

/**
 * فرمت سود برای نمایش
 * @param {number} interest - مبلغ سود
 * @returns {string} - سود فرمت شده با ۶ رقم اعشار
 */
export const formatInterest = (interest) => {
  return interest.toFixed(6);
};