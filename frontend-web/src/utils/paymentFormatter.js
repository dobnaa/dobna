// utils/paymentFormatter.js

import { formatCurrency } from './currencyFormatter';
import { getNetworkInfo } from './networkMapper';

// ======================================================
// Format Network Fee
// ======================================================

export const formatFee = (fee, currency) => {
  return formatCurrency(fee, currency);
};

// ======================================================
// Format Network Name
// ======================================================

export const formatNetwork = (networkId) => {
  const network = getNetworkInfo(networkId);

  return network?.label || networkId || '';
};

// ======================================================
// Format Wallet Address
// ======================================================

export const formatAddress = (
  address,
  startLength = 8,
  endLength = 8
) => {
  if (!address) return '';

  const value = String(address);

  if (value.length <= startLength + endLength) {
    return value;
  }

  return `${value.slice(0, startLength)}...${value.slice(-endLength)}`;
};

// ======================================================
// Format Transaction Hash
// ======================================================

export const formatTxHash = (
  hash,
  startLength = 12,
  endLength = 8
) => {
  if (!hash) return '';

  const value = String(hash);

  if (value.length <= startLength + endLength) {
    return value;
  }

  return `${value.slice(0, startLength)}...${value.slice(-endLength)}`;
};

// ======================================================
// Format Confirmations
// ======================================================

export const formatConfirmationStatus = (
  confirmations = 0,
  required = 2
) => {
  const current = Number(confirmations);
  const target = Number(required);

  return {
    confirmed: current >= target,
    current,
    required: target,
    progress:
      target > 0
        ? Math.min((current / target) * 100, 100)
        : 100,
    text:
      current >= target
        ? 'confirmed'
        : `pending (${current}/${target})`,
  };
};

// ======================================================
// Helpers
// ======================================================

export const isConfirmed = (
  confirmations = 0,
  required = 2
) => Number(confirmations) >= Number(required);

export const formatExplorerLink = (
  txHash,
  explorerUrl
) => {
  if (!txHash || !explorerUrl) {
    return null;
  }

  return `${explorerUrl}${txHash}`;
};

// ======================================================
// Export
// ======================================================

export default {
  formatFee,
  formatNetwork,
  formatAddress,
  formatTxHash,
  formatConfirmationStatus,
  isConfirmed,
  formatExplorerLink,
};