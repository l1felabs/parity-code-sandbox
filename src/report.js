'use strict';
const { format } = require('./money');
// Daily sales report from placed orders' totals.
function summarize(totalsList) {
  const n = totalsList.length;
  const sum = totalsList.reduce(function (s, t) { return s + t.total; }, 0);
  const tax = totalsList.reduce(function (s, t) { return s + t.tax; }, 0);
  return { orders: n, revenue: sum, tax: tax, average: n ? Math.round(sum / n) : 0 };
}
function render(summary) {
  return ['Orders ' + summary.orders, 'Revenue ' + format(summary.revenue), 'Tax ' + format(summary.tax), 'Average ' + format(summary.average)].join('\n');
}
module.exports = { summarize, render };
