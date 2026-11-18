'use strict';
const test = require('node:test'); const assert = require('node:assert');
const { toCents, format } = require('../src/money');
test('toCents', () => { assert.strictEqual(toCents(1.1), 110); assert.strictEqual(toCents('2.05'), 205); assert.throws(() => toCents('abc')); });
test('format', () => { assert.strictEqual(format(1234), 'USD 12.34'); assert.strictEqual(format(-5), '-USD 0.05'); });
