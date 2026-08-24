# jdvantagequant.com

Static site for **J&D Vantage Quant**, served by GitHub Pages at the domain in `CNAME`.
No build step for the markup — what is committed is what is served.

## Pages

Every page is a folder with an `index.html`, so the URLs are clean (`/performance/`)
without needing any server rewrite rules. GitHub Pages resolves `/performance/` to
`/performance/index.html` on its own.

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Home. Positioning, the three programmes, method, process, coverage. |
| `/performance/` | `performance/index.html` | The nine-year backtest — equity curve, drawdown, per-year, monthly heat grid, risk statistics and the full cost breakdown. |
| `/report/` | `report/index.html` | Trade report from 1 Sep 2025 — window summary, month-by-month, session log and the complete per-trade ledger with filters, sorting and paging. |
| `/services/` | `services/index.html` | The four service lines. |
| `/about/` | `about/index.html` | Mission, principles, team. |
| `/brochure/` | `brochure/index.html` | The firm on one page. |
| `/legal/` | `legal/index.html` | Disclaimers, performance disclosure, terms, privacy, refunds. |
| `/contact/` | `contact/index.html` | Contact routes and a form. |

`zohoverify/` is domain verification for Zoho Mail. Do not delete it.

## Assets

| File | What it is |
|---|---|
| `assets/site.css` | The whole design system. Tokens, shared chrome, the data components, the marketing components, then the responsive tiers. There is no second stylesheet. |
| `assets/site.js` | Shared front end — formatters, the canvas line chart, scroll reveals, count-up numbers, header menus and the DUO/TRIO/APEX switch. Exposes `window.JD`. |
| `assets/data.js` | The full dataset (`window.JD_DATA`) read by `/performance/` and `/report/`. **Generated — do not hand-edit.** |
| `assets/summary.js` | ~1 KB of headline figures (`window.JD_SUM`) for the marketing pages, so they do not pull the 648 KB dataset to print six numbers. Generated. |

There is deliberately **no logo image**. The brand is the wordmark alone — `J&D` in
ink with ` Vantage` in cyan, set in the header (`.nav-brand b`) and the footer
(`.foot-brand b`). `favicon.svg` is the browser-tab icon only; it is never drawn on
the page.

### Regenerating the data

`assets/data.js` is produced by the backtest builder outside this repo and copied in.
After replacing it, always regenerate the summary or the marketing pages will quote
figures the performance page contradicts:

```bash
node tools/build_summary.mjs
```

The generator refuses to write if an internal strategy identifier ever reaches the
output — the same guard the dataset build carries. Nothing that names how a signal is
produced belongs in a public file.

### Cache busting

Asset references carry `?v=N`. Bump that number in every page whenever you change
`assets/site.css`, `assets/site.js`, `assets/data.js` or `assets/summary.js`, or
returning visitors keep the old file against the new markup.

## Previewing locally

```bash
python -m http.server 8765 --bind 127.0.0.1 -d .
```

Then open <http://localhost:8765>. `http.server` resolves `/performance/` to its
`index.html` the same way GitHub Pages does, so local URLs match production.
There is a matching `jd-site` entry in the parent project's `.claude/launch.json`.

## Editing the chrome

The header and footer are duplicated in each page rather than injected by script —
real markup means the pages are readable without JavaScript and index properly. If
you change a nav item, change it in all eight pages, and remember the `class="here"`
marker moves with the current page.

## Compliance

Every page carries, in the footer, that J&D Vantage Quant is a technology and research
firm — SEBI compliant but **not** SEBI-registered as an adviser, research analyst,
portfolio manager or broker, not managing client funds and not offering PMS — and that
published performance is backtested and simulated rather than live. `/legal/` carries
the long form, including the performance disclosure that explains exactly how the
figures are computed. Do not remove these when editing.
