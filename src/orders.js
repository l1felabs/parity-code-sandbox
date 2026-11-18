'use strict';
const { Ledger } = require('./ledger');
const coupons = require('./coupons');
var seq = 1000;
// An order = a ledger plus reserved stock; place() commits it, cancel() releases it.
function Order(inventory, state) { this.id = 'ord_' + (seq++); this.inventory = inventory; this.ledger = new Ledger(state); this.lines = []; this.status = 'open'; }
Order.prototype.addLine = function (sku, name, price, qty) {
  if (this.status !== 'open') throw new Error('order is ' + this.status);
  if (!this.inventory.reserve(sku, qty)) return false;
  this.ledger.add(name, price, qty); this.lines.push({ sku: sku, qty: qty });
  return true;
};
Order.prototype.applyCoupon = function (code, today) {
  const r = coupons.lookup(code, this.ledger.subtotal(), today);
  if (r.ok) this.ledger.setDiscount(r.discount);
  return r;
};
Order.prototype.place = function () {
  if (this.status !== 'open') throw new Error('order is ' + this.status);
  if (!this.lines.length) throw new Error('empty order');
  for (const l of this.lines) this.inventory.commit(l.sku, l.qty);
  this.status = 'placed';
  return this.ledger.totals();
};
Order.prototype.cancel = function () {
  if (this.status !== 'open') return false;
  for (const l of this.lines) this.inventory.release(l.sku, l.qty);
  this.status = 'cancelled';
  return true;
};
function resetSeq() { seq = 1000; }
module.exports = { Order, resetSeq };
