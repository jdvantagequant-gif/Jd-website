/* J&D Vantage Quant — shared front-end for every page.
   Formatters, a canvas line chart that draws itself when it scrolls into view,
   scroll reveals, count-up numbers, the header menus, and the DUO / TRIO / APEX
   switch the data pages hang their redraws off.

   Charts show one programme at a time, in rupees: the three sit at ₹5 lakh,
   ₹20 lakh and ₹1 crore, so a shared axis would say nothing useful. */
(function (global) {
  'use strict';

  const D = global.JD_DATA || { modes: {} };   // contact page ships no dataset
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const COL = { duo: '#0FB9A3', trio: '#4F46E5', apex: '#8B5CF6', neg: '#DC2626',
                grid: 'rgba(11,18,32,.07)', axis: '#78849A' };
  /* soft wash under the equity line, tinted to the programme on show */
  const FILL = { duo: ['rgba(15,185,163,.22)', 'rgba(15,185,163,.015)'],
                 trio: ['rgba(79,70,229,.22)', 'rgba(79,70,229,.015)'],
                 apex: ['rgba(139,92,246,.22)', 'rgba(139,92,246,.015)'] };
  const STILL = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');   // arms the scroll-reveal CSS

  /* ---------------------------------------------------------------- format */
  function inr(n) {                       // Indian digit grouping
    n = Math.round(n);
    const neg = n < 0;
    let s = String(Math.abs(n));
    if (s.length > 3) {
      let head = s.slice(0, -3), tail = s.slice(-3), parts = [];
      while (head.length > 2) { parts.unshift(head.slice(-2)); head = head.slice(0, -2); }
      if (head) parts.unshift(head);
      s = parts.join(',') + ',' + tail;
    }
    return (neg ? '−' : '') + s;
  }
  const cr = n => (n / 1e7 >= 100 ? Math.round(n / 1e7).toLocaleString('en-IN') : (n / 1e7).toFixed(2)) + ' Cr';
  const lakh = n => (n / 1e5).toFixed(n / 1e5 >= 100 ? 0 : 1) + ' L';
  const rs = n => Math.abs(n) >= 1e7 ? cr(n) : lakh(n);      // whichever reads shorter
  const pct = (n, d = 2) => (n > 0 ? '+' : '') + n.toFixed(d).replace('-', '−') + '%';
  const dd = (n, d = 2) => n.toFixed(d).replace('-', '−') + '%';   // no leading +
  const cls = v => v > 0 ? 'pos' : (v < 0 ? 'neg' : '');
  const sign = v => (v > 0 ? '+' : '') + inr(v);
  const n0 = v => Math.round(v).toLocaleString('en-IN');
  const px = v => Number(v).toFixed(2);
  const fmtDate = iso => { const [y, m, d] = iso.split('-'); return d + ' ' + MO[+m - 1] + ' ' + y.slice(2); };
  const fmtMonth = ym => { const [y, m] = ym.split('-'); return MO[+m - 1] + ' ' + y; };
  /* "2017-04-07 to 2026-07-21" -> "07 Apr 17 → 21 Jul 26"; raw ISO never
     reaches the page, it reads as a different notation from every other date */
  const range = w => w.split(' to ').map(fmtDate).join(' → ');

  /* ------------------------------------------------------- scroll plumbing */
  /* Fires fn the first time el is on screen. The timeout is a backstop, not a
     nicety: in a document the browser never renders (background tab, occluded
     window) IntersectionObserver reports nothing, and without it a chart would
     sit blank forever rather than merely un-animated. */
  const FALLBACK = 2200;
  function whenVisible(el, fn) {
    let done = false;
    const run = () => { if (!done) { done = true; fn(); } };
    if (STILL || !global.IntersectionObserver) { run(); return; }
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { io.disconnect(); run(); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    io.observe(el);
    setTimeout(() => { if (!done) { io.disconnect(); run(); } }, FALLBACK);
  }

  /* Staggered fade-and-rise for anything tagged .rv, including nodes added
     later (tables and card rows are rendered by the mode switch). Same backstop:
     content must never be left stuck at opacity 0. */
  function reveal(root) {
    const items = $$('.rv:not(.rv-in)', root);
    if (!items.length) return;
    const show = e => {
      // switching programme re-renders whole tables, so a node captured by the
      // observer or the fallback timer may already be detached by the time it
      // fires — reading .parentElement on it throws
      if (!e.parentElement) return;
      const sibs = Array.from(e.parentElement.children).filter(n => n.classList.contains('rv'));
      e.style.transitionDelay = Math.min(Math.max(sibs.indexOf(e), 0), 7) * 55 + 'ms';
      e.classList.add('rv-in');
    };
    if (STILL || !global.IntersectionObserver) { items.forEach(show); return; }
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); show(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(e => io.observe(e));
    setTimeout(() => items.forEach(e => { if (!e.classList.contains('rv-in')) show(e); }), FALLBACK);
  }

  /* "swipe sideways" only belongs on a table that actually overflows — the
     stacked mobile layout does not, so measure rather than guess. */
  function syncHints() {
    $$('.scroll-hint').forEach(h => {
      const box = h.parentElement.querySelector('.tbl-scroll');
      const over = box && box.scrollWidth > box.clientWidth + 2;
      h.style.display = over ? 'block' : 'none';
    });
  }

  const ease = t => 1 - Math.pow(1 - t, 3);
  function tween(ms, step) {
    if (STILL) { step(1); return; }
    let t0 = null, ran = false, done = false;
    function frame(ts) {
      if (done) return;
      ran = true;
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / ms);
      step(ease(p));
      if (p < 1) requestAnimationFrame(frame); else done = true;
    }
    requestAnimationFrame(frame);
    // rAF is suspended in documents the browser is not painting; land on the
    // finished state rather than leaving a half-drawn chart behind
    setTimeout(() => { if (!ran && !done) { done = true; step(1); } }, ms + 400);
  }

  /* Counts a KPI up to its value, formatting every frame through the same
     formatter so the width does not jitter. The final value is written FIRST:
     if requestAnimationFrame never runs the number still reads correctly. */
  function countUp(el, to, fmt, ms) {
    if (!el) return;
    el.textContent = fmt(to);
    if (STILL) return;
    tween(ms || 700, p => { el.textContent = fmt(to * p); });
  }

  /* ------------------------------------------------------------ line chart */
  /* opts: h, hMobile, log, zero, fmt(v), tip(i, series), xlabel(pt), xticks
     series: [{key, pts:[[iso,val]..], color, fill:[c0,c1], width, dash}]      */
  function chart(cv, series, opts) {
    const c = cv.getContext('2d');
    let logScale = opts.log ?? false;
    let all = series, view = series, prog = STILL ? 1 : 0, played = false;
    let lo = 0, hi = 1, geo = null;
    let hover = -1;
    const tip = $('#tip');

    const narrow = () => cv.getBoundingClientRect().width < 560;
    const height = () => narrow() ? (opts.hMobile || Math.round((opts.h || 340) * 0.72)) : (opts.h || 340);

    function draw() {
      const rect = cv.getBoundingClientRect();
      if (!rect.width) return;
      const dpr = Math.min(global.devicePixelRatio || 1, 2);
      const H = height(), W = rect.width;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.height = H + 'px';
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const L = narrow() ? 46 : 68, R = narrow() ? 10 : 18, T = 14, B = 26;
      const val = v => logScale ? Math.log(Math.max(v, 1e-9)) : v;
      lo = Infinity; hi = -Infinity;
      view.forEach(s => s.pts.forEach(p => { if (p[1] < lo) lo = p[1]; if (p[1] > hi) hi = p[1]; }));
      if (!isFinite(lo)) { lo = 0; hi = 1; }
      if (opts.zero) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
      if (lo === hi) { hi = lo + 1; }
      const pad = (val(hi) - val(lo)) * 0.06 || 1;
      const vlo = val(lo) - pad * (opts.zero ? 0.3 : 1), vhi = val(hi) + pad;
      const n = view[0].pts.length;
      const X = (i, m) => L + (W - L - R) * i / ((m || n) - 1 || 1);
      const Y = v => T + (H - T - B) * (1 - (val(v) - vlo) / (vhi - vlo));
      c.clearRect(0, 0, W, H);

      /* grid + y labels */
      c.font = (narrow() ? '9.5px' : '10.5px') + ' "JetBrains Mono",monospace';
      c.textAlign = 'right'; c.textBaseline = 'middle';
      const ticks = narrow() ? 4 : 5;
      for (let i = 0; i <= ticks; i++) {
        const vv = vlo + (vhi - vlo) * i / ticks;
        const y = T + (H - T - B) * (1 - i / ticks);
        c.strokeStyle = COL.grid; c.beginPath(); c.moveTo(L, y); c.lineTo(W - R, y); c.stroke();
        c.fillStyle = COL.axis;
        c.fillText(opts.fmt(logScale ? Math.exp(vv) : vv), L - 8, y);
      }
      /* x labels */
      c.textAlign = 'center'; c.textBaseline = 'top';
      const axis = view[0].pts, want = narrow() ? 5 : (opts.xticks || 22);
      let last = '';
      for (let i = 0; i < axis.length; i += Math.max(1, Math.ceil(axis.length / want))) {
        const lbl = (opts.xlabel || (p => p[0].slice(0, 4)))(axis[i]);
        if (lbl === last) continue;
        last = lbl; c.fillStyle = COL.axis; c.fillText(lbl, X(i, axis.length), H - B + 6);
      }

      /* series, clipped to the animation progress */
      view.forEach(s => {
        const m = s.pts.length, upto = Math.max(1, Math.round(m * prog));
        if (upto < 2) return;
        const pts = s.pts.slice(0, upto);
        if (s.fill) {
          const g = c.createLinearGradient(0, T, 0, H - B);
          g.addColorStop(0, s.fill[0]); g.addColorStop(1, s.fill[1]);
          c.beginPath();
          pts.forEach((p, i) => { const x = X(i, m), y = Y(p[1]); i ? c.lineTo(x, y) : c.moveTo(x, y); });
          const base = opts.zero ? Y(0) : H - B;
          c.lineTo(X(upto - 1, m), base); c.lineTo(X(0, m), base); c.closePath();
          c.fillStyle = g; c.fill();
        }
        c.beginPath();
        pts.forEach((p, i) => { const x = X(i, m), y = Y(p[1]); i ? c.lineTo(x, y) : c.moveTo(x, y); });
        c.strokeStyle = s.color; c.lineWidth = s.width || 1.7;
        c.setLineDash(s.dash || []);
        c.stroke(); c.setLineDash([]);
        c.beginPath(); c.arc(X(upto - 1, m), Y(pts[upto - 1][1]), 3.2, 0, 7);
        c.fillStyle = s.color; c.fill();
      });

      /* crosshair */
      if (hover >= 0 && prog === 1) {
        const x = X(Math.min(hover, axis.length - 1), axis.length);
        c.strokeStyle = 'rgba(79,70,229,.35)'; c.lineWidth = 1;
        c.setLineDash([3, 3]); c.beginPath(); c.moveTo(x, T); c.lineTo(x, H - B); c.stroke(); c.setLineDash([]);
        view.forEach(s => {
          const p = s.pts[Math.min(hover, s.pts.length - 1)];
          if (!p) return;
          c.beginPath(); c.arc(x, Y(p[1]), 4, 0, 7);
          c.fillStyle = '#fff'; c.fill();
          c.strokeStyle = s.color; c.lineWidth = 2; c.stroke();
        });
      }
      geo = { X, L, R, W, n: axis.length };
    }

    function play() {
      prog = 0;
      tween(950, p => { prog = p; draw(); });
    }

    function at(clientX) {
      if (!geo) return -1;
      const rect = cv.getBoundingClientRect();
      const f = (clientX - rect.left - geo.L) / (geo.W - geo.L - geo.R);
      return Math.max(0, Math.min(geo.n - 1, Math.round(f * (geo.n - 1))));
    }
    function showTip(clientX, clientY) {
      const i = at(clientX);
      if (i < 0) return;
      hover = i; draw();
      tip.innerHTML = opts.tip(i, view);
      tip.style.opacity = 1;
      const w = tip.offsetWidth || 180;
      tip.style.left = Math.max(8, Math.min(global.innerWidth - w - 8, clientX + 14)) + 'px';
      tip.style.top = Math.max(8, clientY - 14) + 'px';
    }
    function hide() { hover = -1; tip.style.opacity = 0; draw(); }

    cv.addEventListener('mousemove', e => showTip(e.clientX, e.clientY));
    cv.addEventListener('mouseleave', hide);
    cv.addEventListener('touchstart', e => {
      const t = e.touches[0]; showTip(t.clientX, t.clientY);
    }, { passive: true });
    cv.addEventListener('touchmove', e => {
      const t = e.touches[0]; showTip(t.clientX, t.clientY);
      e.preventDefault();                    // pan the crosshair, not the page
    }, { passive: false });
    cv.addEventListener('touchend', hide, { passive: true });

    let rt;
    global.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(draw, 120); });
    draw();
    whenVisible(cv, () => { if (!played) { played = true; play(); } });

    return {
      setLog(v) { logScale = v; draw(); },
      setSeries(s) { all = view = s; draw(); },
      /* narrows every series to [from, to], both inclusive and both optional */
      setRange(from, to) {
        view = all.map(s => ({
          ...s,
          pts: (from || to)
            ? s.pts.filter(p => (!from || p[0] >= from) && (!to || p[0] <= to))
            : s.pts,
        }));
        if (view.some(s => s.pts.length < 2)) view = all;   // never blank the panel
        hover = -1; draw();
      },
      replay: play,
      redraw: draw,
    };
  }

  /* -------------------------------------------------------------- heatmap */
  function hmColor(v) {
    if (v === null) return 'var(--bg2)';
    if (v >= 0) { const a = Math.min(1, v / 22); return `rgba(14,124,99,${(.08 + .52 * a).toFixed(3)})`; }
    const a = Math.min(1, -v / 12); return `rgba(194,64,79,${(.10 + .50 * a).toFixed(3)})`;
  }
  function heatmap(rows) {
    const byYear = {};
    rows.forEach(m => { const [y, mm] = m.m.split('-'); (byYear[y] = byYear[y] || {})[+mm] = m; });
    let hm = '<tr><th></th>' + MO.map(m => '<th>' + m + '</th>').join('') + '<th>YR</th></tr>';
    Object.keys(byYear).sort().forEach(y => {
      let yr = 0;
      hm += `<tr><td class="y">${y}</td>`;
      for (let i = 1; i <= 12; i++) {
        const m = byYear[y][i];
        if (!m) { hm += '<td class="empty"></td>'; continue; }
        yr += m.roc;
        hm += `<td tabindex="0" data-m="${m.m}" data-roc="${m.roc}" data-pnl="${m.pnl}" data-tr="${m.trades}" data-win="${m.win}" style="background:${hmColor(m.roc)}">${m.roc.toFixed(1)}</td>`;
      }
      hm += `<td class="tot ${cls(yr)}" data-yr="${y}" data-roc="${yr.toFixed(1)}" style="background:${hmColor(yr / 6)}">${yr.toFixed(1)}</td></tr>`;
    });
    return hm;
  }
  /* hover/tap a heatmap cell for the month behind the number */
  function heatmapTips(table, capital) {
    const tip = $('#tip');
    const show = (el, x, y) => {
      const d = el.dataset;
      tip.innerHTML = d.m
        ? `<b>${fmtMonth(d.m)}</b><br>${pct(+d.roc)} · ₹${inr(+d.pnl)}<br>` +
          `<span style="color:#7A8A92">${d.tr} trades · ${d.win}% won</span>`
        : `<b>${d.yr}</b><br>${pct(+d.roc)} for the year`;
      tip.style.opacity = 1;
      const w = tip.offsetWidth || 160;
      tip.style.left = Math.max(8, Math.min(global.innerWidth - w - 8, x + 14)) + 'px';
      tip.style.top = Math.max(8, y - 14) + 'px';
    };
    const hide = () => { tip.style.opacity = 0; };
    table.addEventListener('mousemove', e => {
      const td = e.target.closest('td[data-m],td[data-yr]');
      td ? show(td, e.clientX, e.clientY) : hide();
    });
    table.addEventListener('mouseleave', hide);
    table.addEventListener('click', e => {
      const td = e.target.closest('td[data-m],td[data-yr]');
      if (td) show(td, e.clientX || 0, e.clientY || 0);
    });
    table.addEventListener('focusin', e => {
      const td = e.target.closest('td[data-m]');
      if (!td) return;
      const r = td.getBoundingClientRect();
      show(td, r.right, r.top);
    });
    table.addEventListener('focusout', hide);
  }

  /* --------------------------------------------------------- header menu */
  /* The pill dropdowns open on hover via CSS. Touch devices never hover, so a
     tap on the parent link would navigate before the panel was ever seen —
     the first tap opens it instead, the second follows the link. */
  function dropdowns() {
    const items = $$('.nav-item');
    if (!items.length) return;
    const shut = except => items.forEach(i => { if (i !== except) i.classList.remove('open'); });
    const touch = global.matchMedia && global.matchMedia('(hover: none)').matches;
    items.forEach(item => {
      const link = item.querySelector(':scope > a');
      link.addEventListener('click', e => {
        if (!touch) return;
        if (!item.classList.contains('open')) { e.preventDefault(); shut(item); item.classList.add('open'); }
      });
      item.addEventListener('mouseleave', () => item.classList.remove('open'));
    });
    document.addEventListener('click', e => { if (!e.target.closest('.nav-item')) shut(null); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(null); });
  }

  /* Condensed bar plus a reading-progress rule along its lower edge. */
  function scrollChrome() {
    const nav = $('.nav'), bar = $('#nav-prog');
    if (!nav) return;
    // two style writes per scroll — cheap enough to do inline. Deferring to
    // requestAnimationFrame would leave the bar frozen in any document the
    // browser is not painting, which is exactly when it looks broken.
    let last = 0;
    const paint = () => {
      last = Date.now();
      nav.classList.toggle('scrolled', global.scrollY > 8);
      if (!bar) return;
      const max = document.documentElement.scrollHeight - global.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, global.scrollY / max * 100) : 0) + '%';
    };
    global.addEventListener('scroll', () => { if (Date.now() - last > 16) paint(); }, { passive: true });
    global.addEventListener('resize', paint, { passive: true });
    paint();
  }

  function menu() {
    const btn = $('#burger'), drawer = $('#nav-drawer');
    dropdowns();
    scrollChrome();
    if (!btn || !drawer) return;
    const close = () => { drawer.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    // an in-page jump leaves the drawer covering the target otherwise
    drawer.addEventListener('click', e => { if (e.target.tagName === 'A') close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    // the drawer is display:none above the breakpoint; clear the state so it
    // does not reappear mid-page when the viewport grows
    let rt;
    global.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (global.innerWidth > 620) close(); }, 150);
    });
  }

  /* ---------------------------------------------------------- mode switch */
  const Mode = {
    key: (location.hash.match(/mode=(duo|trio|apex)/) || [, 'trio'])[1],
    subs: [],
    get data() { return D.modes[this.key]; },
    on(fn) { this.subs.push(fn); return fn; },
    /* stamped on <html> so CSS can follow the programme colour the way the
       canvases do via COL — see the per-year bars */
    stamp() { document.documentElement.setAttribute('data-mode-active', this.key); },
    set(k) {
      if (k === this.key || !D.modes[k]) return;
      this.key = k;
      this.stamp();
      $$('.mode-sw button').forEach(b => {
        const on = b.dataset.mode === k;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on);
      });
      this.subs.forEach(fn => fn(D.modes[k], k));
      reveal();
      syncHints();
    },
    init() {
      this.stamp();
      $$('.mode-sw button').forEach(b => {
        const on = b.dataset.mode === this.key;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on);
        b.addEventListener('click', () => this.set(b.dataset.mode));
      });
      this.subs.forEach(fn => fn(this.data, this.key));
      menu();
      reveal();
      syncHints();
      let ht;
      global.addEventListener('resize', () => { clearTimeout(ht); ht = setTimeout(syncHints, 140); });
    },
  };

  global.JD = { D, $, $$, MO, COL, FILL, STILL, inr, cr, lakh, rs, pct, dd, cls, sign, n0, px,
                fmtDate, fmtMonth, range, chart, heatmap, heatmapTips, hmColor,
                reveal, whenVisible, tween, countUp, syncHints, menu, Mode };
})(window);
