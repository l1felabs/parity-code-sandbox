'use strict';
const { makeItem } = require('./items');
const discounts = require('./discounts');
const { taxFor } = require('./tax');
const { format } = require('./money');
function Ledger(state) { this.state = state || 'TX'; this.items = []; this.discount = null; }
Ledger.prototype.add = function (name, price, qty) { const it = makeItem(name, price, qty); this.items.push(it); return it; };
Ledger.prototype.remove = function (id) { const n = this.items.length; this.items = this.items.filter(function (i) { return i.id !== id; }); return this.items.length < n; };
Ledger.prototype.setDiscount = function (d) { this.discount = d; };
Ledger.prototype.subtotal = function () { return this.items.reduce(function (s, i) { return s + i.priceCents * i.qty; }, 0); };
Ledger.prototype.totals = function () {
  const sub = this.subtotal();
  const afterDiscount = discounts.apply(sub, this.discount);
  const tax = taxFor(afterDiscount, this.state);
  return { subtotal: sub, discounted: afterDiscount, tax: tax, total: afterDiscount + tax };
};
Ledger.prototype.receipt = function () {
  const t = this.totals();
  const lines = this.items.map(function (i) { return i.qty + ' x ' + i.name + '  ' + format(i.priceCents * i.qty); });
  lines.push('Subtotal ' + format(t.subtotal), 'Tax ' + format(t.tax), 'Total ' + format(t.total));
  return lines.join('\n');
};
module.exports = { Ledger };
