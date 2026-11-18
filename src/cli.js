#!/usr/bin/env node
'use strict';
const { Ledger } = require('./ledger');
const args = process.argv.slice(2);
const l = new Ledger(process.env.LEDGER_STATE || 'TX');
for (const a of args) { const m = /^(.+)=(\d+(?:\.\d{1,2})?)(?:x(\d+))?$/.exec(a); if (m) l.add(m[1], m[2], m[3] ? Number(m[3]) : 1); }
console.log(l.receipt());
