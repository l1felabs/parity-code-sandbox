'use strict';
// Money is kept in integer cents to avoid float drift.
function toCents(amount) {
  if (typeof amount === 'number') return Math.round(amount * 100);
  if (typeof amount === 'string' && /^-?\d+(\.\d{1,2})?$/.test(amount.trim())) return Math.round(Number(amount.trim()) * 100);
  throw new TypeError('amount must be a number or a decimal string');
}
function format(cents, currency) {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return sign + (currency || 'USD') + ' ' + Math.floor(abs / 100) + '.' + String(abs % 100).padStart(2, '0');
}
module.exports = { toCents, format };
