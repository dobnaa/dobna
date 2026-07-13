// utils/interestCalculator.js
export const calculateDailyInterest = (totalValue) => {
  const annualRate = 0.10; // 10%
  const dailyRate = annualRate / 365;
  return totalValue * dailyRate;
};

// هر روز در سرور (Supabase Cron Job) اجرا شود
// یا در کلاینت هر بار که صفحه لود می‌شود محاسبه شود