// utils/networkMapper.js

// ======================================================
// Network Registry
// تمام شبکه‌های پشتیبانی‌شده دوبنا
// ======================================================

export const NETWORKS = {
  BTC: {
    id: 'BTC',
    label: 'Bitcoin',
    fullName: 'Bitcoin',
    icon: 'btc',
    nativeCurrency: 'BTC',
  },

  ETH: {
    id: 'ETH',
    label: 'Ethereum (ERC20)',
    fullName: 'Ethereum',
    icon: 'eth',
    nativeCurrency: 'ETH',
  },

  TRON: {
    id: 'TRON',
    label: 'TRON (TRC20)',
    fullName: 'TRON',
    icon: 'trx',
    nativeCurrency: 'TRX',
  },

  BSC: {
    id: 'BSC',
    label: 'BNB Smart Chain (BEP20)',
    fullName: 'BNB Smart Chain',
    icon: 'bnb',
    nativeCurrency: 'BNB',
  },

  SOL: {
    id: 'SOL',
    label: 'Solana',
    fullName: 'Solana',
    icon: 'sol',
    nativeCurrency: 'SOL',
  },

  TON: {
    id: 'TON',
    label: 'TON',
    fullName: 'The Open Network',
    icon: 'ton',
    nativeCurrency: 'TON',
  },

  SUI: {
    id: 'SUI',
    label: 'Sui',
    fullName: 'Sui',
    icon: 'sui',
    nativeCurrency: 'SUI',
  },

  AVAX: {
    id: 'AVAX',
    label: 'Avalanche C-Chain',
    fullName: 'Avalanche C-Chain',
    icon: 'avax',
    nativeCurrency: 'AVAX',
  },

  POLKADOT: {
    id: 'POLKADOT',
    label: 'Polkadot Asset Hub',
    fullName: 'Polkadot',
    icon: 'dot',
    nativeCurrency: 'DOT',
  },

  PLASMA: {
    id: 'PLASMA',
    label: 'Plasma',
    fullName: 'Plasma',
    icon: 'plasma',
    nativeCurrency: null,
  },

  CSC: {
    id: 'CSC',
    label: 'CoinEx Smart Chain',
    fullName: 'CoinEx Smart Chain',
    icon: 'csc',
    nativeCurrency: 'CET',
  },
};

// ======================================================
// Currency -> Supported Networks
// ======================================================

export const CURRENCY_NETWORKS = {
  BTC: ['BTC'],

  ETH: ['ETH'],

  USDT: [
    'TRON',
    'ETH',
    'BSC',
    'SOL',
    'TON',
  ],

  USDC: [
    'ETH',
    'SOL',
    'TRON',
    'BSC',
  ],

  BNB: ['BSC'],

  SOL: ['SOL'],

  TON: ['TON'],

  DOGE: ['BTC'],

  SUI: ['SUI'],

  BONK: ['SOL'],

  PEPE: ['ETH'],

  HMSTR: ['TON'],

  DUS: [],

  STARS: [],
};

// ======================================================
// Helpers
// ======================================================

export const getNetworkInfo = (networkId) => {
  if (!networkId) return null;

  return NETWORKS[String(networkId).toUpperCase()] || null;
};

export const getSupportedNetworks = () => {
  return Object.values(NETWORKS);
};

export const getCurrencyNetworks = (currency) => {
  if (!currency) return [];

  const code = String(currency).toUpperCase();

  return (CURRENCY_NETWORKS[code] || [])
    .map((networkId) => NETWORKS[networkId])
    .filter(Boolean);
};

export const supportsNetwork = (currency, networkId) => {
  if (!currency || !networkId) return false;

  const code = String(currency).toUpperCase();
  const network = String(networkId).toUpperCase();

  return (CURRENCY_NETWORKS[code] || []).includes(network);
};

export default {
  NETWORKS,
  CURRENCY_NETWORKS,
  getNetworkInfo,
  getSupportedNetworks,
  getCurrencyNetworks,
  supportsNetwork,
};