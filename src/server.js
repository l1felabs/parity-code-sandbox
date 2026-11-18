'use strict';
const http = require('http');
const { Ledger } = require('./ledger');
function handler(req, res) {
  if (req.url === '/healthz') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  if (req.url && req.url.indexOf('/quote') === 0) {
    const u = new URL(req.url, 'http://x');
    const l = new Ledger(u.searchParams.get('state') || 'TX');
    try { l.add('item', u.searchParams.get('price') || '0', Number(u.searchParams.get('qty') || 1)); }
    catch (e) { res.writeHead(400, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ error: e.message })); }
    res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify(l.totals()));
  }
  res.writeHead(404); res.end();
}
if (require.main === module) http.createServer(handler).listen(Number(process.env.PORT || 8080));
module.exports = { handler };
