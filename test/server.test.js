'use strict';
const test = require('node:test'); const assert = require('node:assert'); const http = require('node:http');
const { handler } = require('../src/server');
function get(path) { return new Promise((res) => { const s = http.createServer(handler).listen(0, () => { http.get('http://127.0.0.1:' + s.address().port + path, (r) => { let b = ''; r.on('data', (c) => (b += c)); r.on('end', () => { s.close(); res({ status: r.statusCode, body: b }); }); }); }); }); }
test('healthz', async () => { const r = await get('/healthz'); assert.strictEqual(r.status, 200); });
test('quote', async () => { const r = await get('/quote?price=10&qty=1&state=OR'); assert.strictEqual(JSON.parse(r.body).total, 1000); });
test('bad qty', async () => { const r = await get('/quote?price=10&qty=0'); assert.strictEqual(r.status, 400); });
