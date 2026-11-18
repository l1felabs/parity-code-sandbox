'use strict';
// Stock levels per SKU; reservations hold stock for an open order.
function Inventory() { this.stock = new Map(); this.reserved = new Map(); }
Inventory.prototype.receive = function (sku, qty) {
  if (!sku) throw new TypeError('sku required');
  if (!Number.isInteger(qty) || qty < 1) throw new RangeError('qty must be a positive integer');
  this.stock.set(sku, (this.stock.get(sku) || 0) + qty);
  return this.available(sku);
};
Inventory.prototype.available = function (sku) { return (this.stock.get(sku) || 0) - (this.reserved.get(sku) || 0); };
Inventory.prototype.reserve = function (sku, qty) {
  if (this.available(sku) < qty) return false;
  this.reserved.set(sku, (this.reserved.get(sku) || 0) + qty);
  return true;
};
Inventory.prototype.release = function (sku, qty) {
  const r = this.reserved.get(sku) || 0;
  this.reserved.set(sku, Math.max(0, r - qty));
};
Inventory.prototype.commit = function (sku, qty) {
  const r = this.reserved.get(sku) || 0;
  if (r < qty) throw new RangeError('not reserved');
  this.reserved.set(sku, r - qty);
  this.stock.set(sku, (this.stock.get(sku) || 0) - qty);
};
Inventory.prototype.lowStock = function (threshold) {
  const out = [];
  for (const sku of this.stock.keys()) if (this.available(sku) <= threshold) out.push(sku);
  return out.sort();
};
module.exports = { Inventory };
