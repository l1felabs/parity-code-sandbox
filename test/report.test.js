'use strict';
const test = require('node:test'); const assert = require('node:assert'); const os = require('node:os'); const path = require('node:path');
const { summarize, render } = require('../src/report'); const { Inventory } = require('../src/inventory'); const store = require('../src/store');
test('summarize', () => { const s = summarize([{ total: 1000, tax: 80 }, { total: 3000, tax: 240 }]); assert.deepStrictEqual(s, { orders: 2, revenue: 4000, tax: 320, average: 2000 }); assert.match(render(s), /Average USD 20\.00/); });
test('store round trip', () => { const p = path.join(os.tmpdir(), 'inv-' + process.pid + '.json'); const i = new Inventory(); i.receive('A', 4); i.reserve('A', 1); store.save(i, p); const j = store.load(Inventory, p); assert.strictEqual(j.available('A'), 3); });
