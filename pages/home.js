function getHomePage() {
    return heroSection() +
        statsSection() +
        whySection() +
        marketSplitSection() +
        stepsSection() +
        instrumentsSection() +
        ctaSection();
}

/* ── Hero ── */

/* Big Indian companies cycled in the platform mockup (one shows at a time). */
var HERO_THEMES = ['tk-blue', 'tk-cyan', 'tk-red', 'tk-indigo', 'tk-saffron', 'tk-amber', 'tk-purple'];

var HERO_STOCKS = [
    { ico: 'RIL', dom: 'ril.com', nm: 'Reliance', sub: 'NSE &middot; RELIANCE', pv: '2,945.60', pc: '+1.24%', dir: 'up' },
    { ico: 'TCS', dom: 'tcs.com', nm: 'Tata Consultancy', sub: 'NSE &middot; TCS', pv: '4,102.85', pc: '+0.78%', dir: 'up' },
    { ico: 'HDB', dom: 'hdfcbank.com', nm: 'HDFC Bank', sub: 'NSE &middot; HDFCBANK', pv: '1,678.40', pc: '-0.42%', dir: 'down' },
    { ico: 'INF', dom: 'infosys.com', nm: 'Infosys', sub: 'NSE &middot; INFY', pv: '1,856.20', pc: '+0.95%', dir: 'up' },
    { ico: 'ICI', dom: 'icicibank.com', nm: 'ICICI Bank', sub: 'NSE &middot; ICICIBANK', pv: '1,234.75', pc: '+0.66%', dir: 'up' },
    { ico: 'TM', dom: 'tatamotors.com', nm: 'Tata Motors', sub: 'NSE &middot; TATAMOTORS', pv: '985.30', pc: '+2.10%', dir: 'up' },
    { ico: 'SBI', dom: 'sbi.co.in', nm: 'State Bank of India', sub: 'NSE &middot; SBIN', pv: '842.15', pc: '+1.48%', dir: 'up' },
    { ico: 'BRT', dom: 'airtel.in', nm: 'Bharti Airtel', sub: 'NSE &middot; BHARTIARTL', pv: '1,512.90', pc: '+0.84%', dir: 'up' },
    { ico: 'ITC', dom: 'itcportal.com', nm: 'ITC', sub: 'NSE &middot; ITC', pv: '478.55', pc: '-0.31%', dir: 'down' },
    { ico: 'LT', dom: 'larsentoubro.com', nm: 'Larsen &amp; Toubro', sub: 'NSE &middot; LT', pv: '3,624.10', pc: '+1.05%', dir: 'up' },
    { ico: 'HUL', dom: 'hul.co.in', nm: 'Hindustan Unilever', sub: 'NSE &middot; HINDUNILVR', pv: '2,398.70', pc: '-0.58%', dir: 'down' },
    { ico: 'KMB', dom: 'kotak.com', nm: 'Kotak Mahindra', sub: 'NSE &middot; KOTAKBANK', pv: '1,789.25', pc: '+0.40%', dir: 'up' },
    { ico: 'AXB', dom: 'axisbank.com', nm: 'Axis Bank', sub: 'NSE &middot; AXISBANK', pv: '1,156.80', pc: '+0.92%', dir: 'up' },
    { ico: 'BJF', dom: 'bajajfinserv.in', nm: 'Bajaj Finance', sub: 'NSE &middot; BAJFINANCE', pv: '7,245.60', pc: '+1.66%', dir: 'up' },
    { ico: 'ASP', dom: 'asianpaints.com', nm: 'Asian Paints', sub: 'NSE &middot; ASIANPAINT', pv: '2,890.45', pc: '-0.74%', dir: 'down' },
    { ico: 'MRT', dom: 'marutisuzuki.com', nm: 'Maruti Suzuki', sub: 'NSE &middot; MARUTI', pv: '12,540.30', pc: '+0.55%', dir: 'up' },
    { ico: 'SUN', dom: 'sunpharma.com', nm: 'Sun Pharma', sub: 'NSE &middot; SUNPHARMA', pv: '1,712.20', pc: '+1.12%', dir: 'up' },
    { ico: 'TTN', dom: 'titancompany.in', nm: 'Titan', sub: 'NSE &middot; TITAN', pv: '3,420.85', pc: '+0.48%', dir: 'up' },
    { ico: 'WIP', dom: 'wipro.com', nm: 'Wipro', sub: 'NSE &middot; WIPRO', pv: '545.60', pc: '-0.36%', dir: 'down' },
    { ico: 'HCL', dom: 'hcltech.com', nm: 'HCL Technologies', sub: 'NSE &middot; HCLTECH', pv: '1,634.90', pc: '+0.71%', dir: 'up' },
    { ico: 'NTP', dom: 'ntpc.co.in', nm: 'NTPC', sub: 'NSE &middot; NTPC', pv: '362.40', pc: '+1.34%', dir: 'up' },
    { ico: 'PWG', dom: 'powergrid.in', nm: 'Power Grid', sub: 'NSE &middot; POWERGRID', pv: '318.75', pc: '+0.62%', dir: 'up' },
    { ico: 'ULT', dom: 'ultratechcement.com', nm: 'UltraTech Cement', sub: 'NSE &middot; ULTRACEMCO', pv: '11,280.50', pc: '+0.89%', dir: 'up' },
    { ico: 'NES', dom: 'nestle.in', nm: 'Nestle India', sub: 'NSE &middot; NESTLEIND', pv: '2,510.30', pc: '-0.28%', dir: 'down' },
    { ico: 'ADP', dom: 'adaniports.com', nm: 'Adani Ports', sub: 'NSE &middot; ADANIPORTS', pv: '1,398.65', pc: '+1.92%', dir: 'up' },
    { ico: 'ONG', dom: 'ongcindia.com', nm: 'ONGC', sub: 'NSE &middot; ONGC', pv: '268.90', pc: '-0.44%', dir: 'down' },
    { ico: 'COL', dom: 'coalindia.in', nm: 'Coal India', sub: 'NSE &middot; COALINDIA', pv: '412.35', pc: '+0.77%', dir: 'up' },
    { ico: 'JSW', dom: 'jsw.in', nm: 'JSW Steel', sub: 'NSE &middot; JSWSTEEL', pv: '945.20', pc: '+1.18%', dir: 'up' },
    { ico: 'TSL', dom: 'tatasteel.com', nm: 'Tata Steel', sub: 'NSE &middot; TATASTEEL', pv: '152.80', pc: '+2.34%', dir: 'up' },
    { ico: 'MM', dom: 'mahindra.com', nm: 'Mahindra &amp; Mahindra', sub: 'NSE &middot; M&amp;M', pv: '2,876.40', pc: '+1.07%', dir: 'up' },
    { ico: 'BJA', dom: 'bajajauto.com', nm: 'Bajaj Auto', sub: 'NSE &middot; BAJAJ-AUTO', pv: '9,120.75', pc: '+0.66%', dir: 'up' },
    { ico: 'HND', dom: 'hindalco.com', nm: 'Hindalco', sub: 'NSE &middot; HINDALCO', pv: '678.50', pc: '+1.45%', dir: 'up' }
];

/* Build a 14-bar candlestick pattern that trends with the stock's direction. */
function heroPattern(seed, dir) {
    var r = (seed * 9301 + 49297) % 233280;

    function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
    var n = 14,
        out = [],
        prev = dir === 'up' ? 34 : 112;
    for (var i = 0; i < n; i++) {
        var t = i / (n - 1);
        var trend = dir === 'up' ? 34 + t * 80 : 112 - t * 76;
        var h = Math.round(trend + (rnd() - 0.5) * 32);
        if (h < 20) h = 20;
        if (h > 120) h = 120;
        out.push([h >= prev ? 'up' : 'down', h]);
        prev = h;
    }
    return out;
}

function heroCandles(pattern) {
    return pattern.map(function(c, i) {
        return '<span class="op-candle ' + c[0] + '" style="height:' + Math.min(c[1], 100) + '%;animation-delay:' + (i * 0.05) + 's;"></span>';
    }).join('');
}

function heroStockPanel(s, active, idx) {
    var theme = HERO_THEMES[idx % HERO_THEMES.length];
    var pat = heroPattern(idx + 1, s.dir);
    return '<div class="op-stock-panel ' + theme + (active ? ' active' : '') + '">' +
        '<div class="op-mockup-head">' +
        '<div class="op-mockup-asset"><div class="ico"><img class="is-favicon" src="https://www.google.com/s2/favicons?sz=128&domain=' + s.dom + '" alt="' + s.nm + '" width="36" height="36" decoding="async" fetchpriority="high" data-dom="' + s.dom + '" data-step="0" onerror="heroLogoFallback(this)"><span class="ico-fallback">' + s.ico + '</span></div><div><div class="nm">' + s.nm + '</div><div class="sub">' + s.sub + '</div></div></div>' +
        '<div class="op-mockup-price"><div class="pv">&#8377;' + s.pv + '</div><div class="pc ' + s.dir + '">' + (s.dir === 'up' ? '&#9650; ' : '&#9660; ') + s.pc + '</div></div>' +
        '</div>' +
        '<div class="op-chart">' + heroCandles(pat) + '</div>' +
        '</div>';
}

function heroSection() {
    var panels = HERO_STOCKS.map(function(s, i) {
        return heroStockPanel(s, i === 0, i);
    }).join('');

    return '<section class="op-hero">' +
        '<div class="op-container">' +
        '<div class="op-hero-grid">' +
        '<div class="op-hero-text">' +
        '<span class="op-hero-badge"><span class="dot"></span> Algorithmic Trading Technology</span>' +
        '<h1>Trade Indian markets with <span class="hl">quant precision</span></h1>' +
        '<p class="op-hero-sub">Data-driven algo trading systems engineered exclusively for NSE, BSE &amp; MCX. Where rigorous mathematics meets real market opportunity &mdash; built compliance-first.</p>' +
        '<div class="op-hero-cta">' +
        '<button class="op-btn op-btn-primary op-btn-lg" onclick="navigateTo(\'services\')">Get Started &rarr;</button>' +
        '<button class="op-btn op-btn-ghost op-btn-lg" onclick="navigateTo(\'brochure\')">View Brochure</button>' +
        '</div>' +
        '<div class="op-pills">' +
        pill('M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3', 'Algo Strategies') +
        pill('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'SEBI Compliant') +
        pill('M16 18 22 12 16 6M8 6 2 12 8 18', 'Quant Research') +
        pill('M3 12h4l3 8 4-16 3 8h4', 'Risk Controls') +
        '</div>' +
        '</div>' +
        '<div class="op-hero-media">' +
        '<div class="op-mockup">' +
        '<div class="op-stocks" id="op-stocks">' + panels + '</div>' +
        '<div class="op-mockup-actions">' +
        '<div class="op-trade-btn buy">Long &#9650;</div>' +
        '<div class="op-trade-btn sell">Short &#9660;</div>' +
        '</div>' +
        '<div class="op-mockup-float"><div class="fi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div><div><div class="ft">Backtested</div><div class="fv">10+ yrs data</div></div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
}

/* Cycle the hero stock chart every 30s: hide current, show next (no slide). */
var heroStockTimer = null;
var heroStockIndex = 0;

function initHeroStocks() {
    stopHeroStocks();
    preloadHeroLogos();
    var panels = document.querySelectorAll('#op-stocks .op-stock-panel');
    if (!panels.length) return;
    heroStockIndex = 0;
    heroStockTimer = setInterval(function() {
        var live = document.querySelectorAll('#op-stocks .op-stock-panel');
        if (!live.length) { stopHeroStocks(); return; }
        if (live[heroStockIndex]) live[heroStockIndex].classList.remove('active');
        heroStockIndex = (heroStockIndex + 1) % live.length;
        if (live[heroStockIndex]) live[heroStockIndex].classList.add('active');
    }, 7000);
}

function stopHeroStocks() {
    if (heroStockTimer) {
        clearInterval(heroStockTimer);
        heroStockTimer = null;
    }
}

/* Warm the browser cache with every stock logo so switches are instant. */
var heroLogosPreloaded = false;

function preloadHeroLogos() {
    if (heroLogosPreloaded) return;
    heroLogosPreloaded = true;
    HERO_STOCKS.forEach(function(s) {
        var img = new Image();
        img.src = 'https://www.google.com/s2/favicons?sz=128&domain=' + s.dom;
    });
}

/* Logo source fallback: Google favicon -> DuckDuckGo -> text initials. */
function heroLogoFallback(img) {
    var step = parseInt(img.getAttribute('data-step') || '0', 10) + 1;
    var dom = img.getAttribute('data-dom');
    if (step === 1) {
        img.setAttribute('data-step', '1');
        img.src = 'https://icons.duckduckgo.com/ip3/' + dom + '.ico';
        return;
    }
    img.style.display = 'none';
    var fb = img.nextElementSibling;
    if (fb) fb.style.display = 'flex';
}

function pill(path, label) {
    return '<span class="op-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="' + path + '"/></svg>' + label + '</span>';
}

/* ── Stats band ── */
function statsSection() {
    return '<section class="op-section tight">' +
        '<div class="op-container">' +
        '<div class="op-stats">' +
        stat('3', 'Exchanges &mdash; NSE, BSE &amp; MCX') +
        stat('10+', 'Years of historical backtesting') +
        stat('24/7', 'Systematic market monitoring') +
        stat('100%', 'Compliance-first approach') +
        '</div>' +
        '</div>' +
        '</section>';
}

function stat(num, lbl) {
    return '<div class="op-stat"><div class="num">' + num + '</div><div class="lbl">' + lbl + '</div></div>';
}

/* ── Why J&D (feature cards) ── */
function whySection() {
    return '<section class="op-section">' +
        '<div class="op-container">' +
        '<div class="op-section-head">' +
        '<span class="op-eyebrow">Why J&amp;D Vantage</span>' +
        '<h2 class="op-h2">The perfect blend of <span class="hl">precision, transparency &amp; trust</span></h2>' +
        '<p class="op-lead">Everything we build is designed around the realities of Indian markets and a relentless commitment to honest, risk-aware trading.</p>' +
        '</div>' +
        '<div class="op-cards">' +
        card('', 'M16 18 22 12 16 6M8 6 2 12 8 18', 'India-First Algorithms', 'Strategies engineered specifically for NSE, BSE &amp; MCX micro-structure, liquidity and trading sessions.') +
        card('c-cyan', 'M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3', 'Quantitative Edge', 'Rigorously backtested models across 10+ years of data, validated before a single rupee is ever risked.') +
        card('c-green', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'SEBI-Compliant', 'Regulatory compliance is a core design principle, not an afterthought &mdash; transparency at every step.') +
        card('c-saffron', 'M3 12h4l3 8 4-16 3 8h4', 'Automated Risk Control', 'Built-in stop-loss, drawdown limits and volatility-adjusted position sizing protect your capital.') +
        card('c-purple', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'Full Transparency', 'Complete honesty in methods, assumptions and risk disclosure &mdash; you always know how it works.') +
        card('', 'M20 6 9 17l-5-5', 'Both Market Sides', 'Systems that adapt to bullish momentum and bearish reversals alike, with hedging overlays.') +
        '</div>' +
        '</div>' +
        '</section>';
}

function card(mod, path, title, desc) {
    return '<div class="op-card ' + mod + '">' +
        '<div class="op-card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="' + path + '"/></svg></div>' +
        '<h3>' + title + '</h3><p>' + desc + '</p></div>';
}

/* ── Built for both sides (split) ── */
function marketSplitSection() {
    return '<section class="op-section">' +
        '<div class="op-container">' +
        '<div class="op-split">' +
        '<div class="op-split-text">' +
        '<span class="op-eyebrow">Market Dynamics</span>' +
        '<h2>Built for both sides of the market</h2>' +
        '<p class="op-lead">Our systems do not just chase rallies. They are designed to perform across momentum and reversals, with disciplined risk management throughout.</p>' +
        '<ul class="op-checklist">' +
        check('<strong>Bullish strategies</strong> &mdash; trend-following &amp; momentum capture across equities and indices.') +
        check('<strong>Bearish &amp; hedging</strong> &mdash; risk-controlled shorts and options-based hedging overlays.') +
        check('<strong>Volatility-aware sizing</strong> &mdash; positions scaled to live market conditions.') +
        check('<strong>Automated stops</strong> &mdash; drawdown control that never sleeps.') +
        '</ul>' +
        '</div>' +
        '<div class="op-split-media">' +
        '<div class="op-panel">' +
        panelRow('M3 17l6-6 4 4 8-8', 'Bullish Momentum', 'Breakout &amp; trend capture', '+0.62%') +
        panelRow('M3 7l6 6 4-4 8 8', 'Bearish Hedging', 'Mean-reversion &amp; protection', '&minus;0.18%') +
        panelRow('M12 2v20M2 12h20', 'Neutral / Range', 'Options-based income models', '+0.31%') +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
}

function check(html) {
    return '<li><span class="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span><span>' + html + '</span></li>';
}

function panelRow(path, t, s, meta) {
    var down = meta.indexOf('minus') !== -1;
    return '<div class="op-panel-row"><div class="pr-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="' + path + '"/></svg></div>' +
        '<div><div class="pr-t">' + t + '</div><div class="pr-s">' + s + '</div></div>' +
        '<div class="pr-meta" style="color:' + (down ? 'var(--color-down)' : 'var(--color-up)') + '">' + meta + '</div></div>';
}

/* ── How it works steps ── */
function stepsSection() {
    return '<section class="op-section">' +
        '<div class="op-container">' +
        '<div class="op-section-head">' +
        '<span class="op-eyebrow">How it works</span>' +
        '<h2 class="op-h2">Your path to <span class="hl">systematic trading</span></h2>' +
        '<p class="op-lead">A clear, transparent process from first conversation to a live, monitored strategy.</p>' +
        '</div>' +
        '<div class="op-steps">' +
        step('1', 'Discovery', 'We understand your goals, risk appetite and the markets you want to trade.') +
        step('2', 'Strategy Design', 'We engineer and rigorously backtest a quantitative strategy on historical data.') +
        step('3', 'Risk Framework', 'Automated stop-loss, sizing and drawdown controls are built in from the start.') +
        step('4', 'Deploy &amp; Monitor', 'Your strategy goes live with continuous systematic monitoring and review.') +
        '</div>' +
        '</div>' +
        '</section>';
}

function step(n, t, d) {
    return '<div class="op-step"><div class="sn">' + n + '</div><h4>' + t + '</h4><p>' + d + '</p></div>';
}

/* ── Instruments split ── */
function instrumentsSection() {
    return '<section class="op-section">' +
        '<div class="op-container">' +
        '<div class="op-split reverse">' +
        '<div class="op-split-text">' +
        '<span class="op-eyebrow">Coverage</span>' +
        '<h2>One platform, the whole Indian market</h2>' +
        '<p class="op-lead">From large-cap equities to commodities, our quant infrastructure spans the instruments that matter to Indian traders.</p>' +
        '<ul class="op-checklist">' +
        check('<strong>Equities</strong> &mdash; NSE &amp; BSE cash segment.') +
        check('<strong>Futures &amp; Options</strong> &mdash; index and stock F&amp;O strategies.') +
        check('<strong>Commodities</strong> &mdash; MCX coverage for diversification.') +
        check('<strong>Research &amp; consultation</strong> &mdash; 1-on-1 strategy sessions.') +
        '</ul>' +
        '<button class="op-btn op-btn-primary op-btn-lg" style="margin-top:26px;" onclick="navigateTo(\'services\')">Explore Services &rarr;</button>' +
        '</div>' +
        '<div class="op-split-media">' +
        '<div class="op-panel">' +
        panelRow('M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3', 'Algo Strategy', 'Custom equity &amp; F&amp;O systems', '85%') +
        panelRow('M16 18 22 12 16 6M8 6 2 12 8 18', 'Quant Research', 'Data-driven market analysis', '80%') +
        panelRow('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'Risk Management', 'Automated risk controls', '70%') +
        panelRow('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'Consultation', '1-on-1 strategy sessions', '95%') +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
}

/* ── CTA banner ── */
function ctaSection() {
    return '<section class="op-section">' +
        '<div class="op-container">' +
        '<div class="op-cta-banner">' +
        '<span class="op-eyebrow">Start today</span>' +
        '<h2 style="margin-top:16px;">Build confidence with every single trade</h2>' +
        '<p>Partner with a quant-first team that puts transparency, compliance and Indian-market expertise at the center of everything.</p>' +
        '<div class="op-cta-actions">' +
        '<button class="op-btn op-btn-primary op-btn-lg" onclick="navigateTo(\'contact\')">Get in Touch &rarr;</button>' +
        '<button class="op-btn op-btn-ghost op-btn-lg" onclick="navigateTo(\'about\')">About Us</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
}