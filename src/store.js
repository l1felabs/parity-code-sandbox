'use strict';
const fs = require('fs');
// Saves and loads inventory as JSON (file path given by the caller).
function save(inventory, path) {
  const data = { stock: Object.fromEntries(inventory.stock), reserved: Object.fromEntries(inventory.reserved) };
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
function load(Inventory, path) {
  const inv = new Inventory();
  if (!fs.existsSync(path)) return inv;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const k of Object.keys(data.stock || {})) inv.stock.set(k, data.stock[k]);
  for (const k of Object.keys(data.reserved || {})) inv.reserved.set(k, data.reserved[k]);
  return inv;
}
module.exports = { save, load };
