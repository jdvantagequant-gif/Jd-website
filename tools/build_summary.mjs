/* Builds assets/summary.js — the handful of headline figures the marketing
   pages quote (home, brochure, services). Those pages must not pull the full
   648 KB assets/data.js just to print six numbers, and hand-typing the numbers
   into the HTML is how a site ends up contradicting its own performance page.
   Regenerate after every assets/data.js refresh:

     node tools/build_summary.mjs
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

globalThis.window = {};
new Function(readFileSync(join(ROOT, 'assets/data.js'), 'utf8'))();
const D = globalThis.window.JD_DATA;

const pick = m => {
  const W = m.windows.full;
  return {
    label: m.label, cap_label: m.cap_label.replace('Rs ', '₹'), capital: m.capital,
    leverage: m.leverage, risk: m.risk,
    net_pct: W.net_pct, net: W.net, mdd: W.mdd, pf: W.pf, win: W.win,
    trades: W.trades, months: W.months, pos_months: W.pos_months, days: W.days,
    window: W.window, best_month: W.best_month, worst_month: W.worst_month,
    sharpe: m.stats.sharpe,
  };
};

const OUT = {
  generated: D.generated,
  live_from: D.live_from,
  modes: Object.fromEntries(Object.entries(D.modes).map(([k, m]) => [k, pick(m)])),
};

/* the same guard the dataset itself carries: no internal strategy identifier
   may ever reach a public file */
const json = JSON.stringify(OUT);
for (const bad of ['"st"', 'S1', 'S2', 'S3', 'sleeve']) {
  if (json.includes(bad)) throw new Error(`refusing to write: ${bad} reached summary.js`);
}

writeFileSync(join(ROOT, 'assets/summary.js'), `window.JD_SUM=${json};\n`);
console.log(`assets/summary.js written — ${json.length} bytes, modes: ${Object.keys(OUT.modes).join(', ')}`);
