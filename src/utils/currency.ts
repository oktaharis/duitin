
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseCurrency = (value: string): number => {
  // Remove all non-digit characters except dots and commas
  const cleaned = value.replace(/[^\d.,]/g, '');
  
  // Replace dots used as thousand separators with empty string
  // and commas used as decimal separators with dots
  const normalized = cleaned.replace(/\./g, '').replace(/,/g, '.');
  
  return parseFloat(normalized) || 0;
};

export const formatCurrencyInput = (value: string): string => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');
  
  if (!digitsOnly) return '';
  
  // Format with thousand separators
  const number = parseInt(digitsOnly);
  return new Intl.NumberFormat('id-ID').format(number);
};

// Created by DevOktaharis
