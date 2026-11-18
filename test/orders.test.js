'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { Inventory } = require('../src/inventory'); const { Order } = require('../src/orders'); const { lookup } = require('../src/coupons');
function inv() { const i = new Inventory(); i.receive('MUG', 5); return i; }
test('place commits stock', () => { const i = inv(); const o = new Order(i, 'OR'); assert.ok(o.addLine('MUG', 'mug', '12.50', 2)); assert.strictEqual(o.place().total, 2500); assert.strictEqual(i.available('MUG'), 3); });
test('cancel releases stock', () => { const i = inv(); const o = new Order(i, 'OR'); o.addLine('MUG', 'mug', 1, 4); assert.ok(o.cancel()); assert.strictEqual(i.available('MUG'), 5); assert.throws(() => o.addLine('MUG', 'mug', 1, 1)); });
test('coupon min spend and expiry', () => { assert.strictEqual(lookup('save5', 1000).why, 'min_spend'); assert.strictEqual(lookup('SPRING20', 9000, '2026-07-01').why, 'expired'); assert.ok(lookup('welcome10', 0).ok); });
test('coupon applies to order', () => { const o = new Order(inv(), 'OR'); o.addLine('MUG', 'mug', 10, 3); assert.ok(o.applyCoupon('SAVE5').ok); assert.strictEqual(o.place().total, 2500); });
