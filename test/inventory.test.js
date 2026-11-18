'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { Inventory } = require('../src/inventory');
test('receive and reserve', () => { const i = new Inventory(); i.receive('A', 3); assert.ok(i.reserve('A', 2)); assert.strictEqual(i.available('A'), 1); assert.ok(!i.reserve('A', 2)); });
test('release and commit', () => { const i = new Inventory(); i.receive('A', 3); i.reserve('A', 2); i.release('A', 1); i.commit('A', 1); assert.strictEqual(i.available('A'), 2); assert.throws(() => i.commit('A', 1)); });
test('low stock sorted', () => { const i = new Inventory(); i.receive('B', 1); i.receive('A', 1); i.receive('C', 9); assert.deepStrictEqual(i.lowStock(2), ['A', 'B']); });
