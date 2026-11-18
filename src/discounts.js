'use strict';
// A discount is { kind: 'percent', value } or { kind: 'fixed', cents }.
function apply(subtotalCents, discount) {
  if (!discount) return subtotalCents;
  if (discount.kind === 'percent') {
    if (discount.value < 0 || discount.value > 100) throw new RangeError('percent out of range');
    return Math.round(subtotalCents * (100 - discount.value) / 100);
  }
  if (discount.kind === 'fixed') return Math.max(0, subtotalCents - discount.cents);
  throw new TypeError('unknown discount kind');
}
module.exports = { apply };
