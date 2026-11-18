'use strict';
const { toCents } = require('./money');
var nextId = 1;
function makeItem(name, price, qty) {
  if (!name || typeof name !== 'string') throw new TypeError('name required');
  const q = qty === undefined ? 1 : qty;
  if (!Number.isInteger(q) || q < 1) throw new RangeError('qty must be a positive integer');
  return { id: nextId++, name: name.trim(), priceCents: toCents(price), qty: q };
}
function resetIds() { nextId = 1; }
module.exports = { makeItem, resetIds };
