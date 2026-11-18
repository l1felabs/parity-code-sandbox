'use strict';
const RATES = { TX: 8.25, CA: 7.25, NY: 4.0, OR: 0 };
function taxFor(cents, state) {
  const rate = RATES[state];
  if (rate === undefined) throw new RangeError('unknown state ' + state);
  return Math.round(cents * rate / 100);
}
module.exports = { taxFor, RATES };
