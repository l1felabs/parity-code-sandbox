'use strict';
// Coupon codes map to discounts with an optional minimum spend and expiry.
const CODES = {
  WELCOME10: { discount: { kind: 'percent', value: 10 }, minCents: 0, expires: null },
  SAVE5: { discount: { kind: 'fixed', cents: 500 }, minCents: 2500, expires: null },
  SPRING20: { discount: { kind: 'percent', value: 20 }, minCents: 5000, expires: '2026-06-01' }
};
function lookup(code, subtotalCents, today) {
  const c = CODES[String(code || '').trim().toUpperCase()];
  if (!c) return { ok: false, why: 'unknown' };
  if (c.expires && (today || new Date().toISOString().slice(0, 10)) >= c.expires) return { ok: false, why: 'expired' };
  if (subtotalCents < c.minCents) return { ok: false, why: 'min_spend' };
  return { ok: true, discount: c.discount };
}
module.exports = { lookup, CODES };
