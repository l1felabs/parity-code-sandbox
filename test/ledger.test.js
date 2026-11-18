'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { Ledger } = require('../src/ledger'); const { resetIds } = require('../src/items');
test('totals with tax', () => { resetIds(); const l = new Ledger('TX'); l.add('mug', '10.00', 2); assert.deepStrictEqual(l.totals(), { subtotal: 2000, discounted: 2000, tax: 165, total: 2165 }); });
test('percent discount', () => { const l = new Ledger('OR'); l.add('pen', 4, 5); l.setDiscount({ kind: 'percent', value: 10 }); assert.strictEqual(l.totals().total, 1800); });
test('fixed discount floors at zero', () => { const l = new Ledger('OR'); l.add('pen', 1); l.setDiscount({ kind: 'fixed', cents: 500 }); assert.strictEqual(l.totals().total, 0); });
test('remove', () => { const l = new Ledger(); const a = l.add('a', 1); assert.ok(l.remove(a.id)); assert.ok(!l.remove(a.id)); });
test('receipt', () => { const l = new Ledger('OR'); l.add('cap', '25'); assert.match(l.receipt(), /Total USD 25\.00/); });
