// services/authService.js (نسخه ساختگی برای تست)
export const authService = {
  sendLoginCode: async (phoneNumber) => {
    // ذخیره کد در localStorage برای تست
    const testCode = '123456';
    localStorage.setItem('testCode', testCode);
    console.log(`📱 Code sent to ${phoneNumber}: ${testCode}`);
    return { success: true };
  },

  verifyLoginCode: async (phoneNumber, code) => {
    const testCode = localStorage.getItem('testCode') || '123456';
    if (code === testCode) {
      return {
        id: 'test-user-1',
        phone: phoneNumber,
        name: 'Test User',
        email: 'test@dobna.com',
        balance: {
          USDT: 10.23,
          IRT: 1870000,
          BTC: 0.000005,
        },
      };
    }
    throw new Error('Invalid verification code');
  },
};