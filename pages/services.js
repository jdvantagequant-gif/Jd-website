function getServicesPage() {
    return '<div class="section-header">' +
        '<span class="section-badge">What We Offer</span>' +
        '<h2 class="section-title">Our <span class="text-gradient">Services</span></h2>' +
        '<p class="section-sub">Comprehensive algorithmic trading solutions tailored for Indian markets</p>' +
        '</div>' +

        '<div class="grid grid-2">' +
        '<div class="service-card sc-orange">' +
        '<div class="service-num">01</div>' +
        '<div class="svc-icon" style="background:rgba(15,185,163,0.1);color:var(--color-primary-light);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>' +
        '<h4>Custom Algo Strategy Development</h4>' +
        '<p>Bespoke algorithmic trading strategies tailored to your risk appetite and goals for Indian equities, futures, options, and commodities.</p>' +
        '<div class="service-tags"><span class="tag tag-orange">Equity</span><span class="tag tag-orange">F&amp;O</span><span class="tag tag-orange">Index</span><span class="tag tag-orange">MCX</span></div>' +
        '<ul><li>Equity intraday and positional strategies</li><li>F&amp;O options writing and hedging algos</li><li>Index-based strategies (Nifty, Bank Nifty)</li><li>Commodity trading algorithms (MCX)</li></ul>' +
        '</div>' +
        '<div class="service-card sc-cyan">' +
        '<div class="service-num">02</div>' +
        '<div class="svc-icon" style="background:rgba(34,211,238,0.1);color:var(--color-cyan);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg></div>' +
        '<h4>Quantitative Research &amp; Backtesting</h4>' +
        '<p>In-depth quantitative analysis using historical Indian market data. Statistically significant patterns through rigorous backtesting.</p>' +
        '<div class="service-tags"><span class="tag tag-cyan">Data Analysis</span><span class="tag tag-cyan">Backtesting</span><span class="tag tag-cyan">Monte Carlo</span></div>' +
        '<ul><li>Historical data analysis (10+ years NSE)</li><li>Walk-forward optimisation</li><li>Monte Carlo simulations</li><li>Strategy performance attribution</li></ul>' +
        '</div>' +
        '<div class="service-card sc-green">' +
        '<div class="service-num">03</div>' +
        '<div class="svc-icon" style="background:rgba(52,211,153,0.1);color:var(--color-green);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>' +
        '<h4>Risk Management Frameworks</h4>' +
        '<p>Comprehensive risk management systems built into every algorithm to ensure capital preservation and controlled drawdowns.</p>' +
        '<div class="service-tags"><span class="tag tag-green">Stop-Loss</span><span class="tag tag-green">Drawdown</span><span class="tag tag-green">Monitoring</span></div>' +
        '<ul><li>Automated stop-loss and position sizing</li><li>Portfolio-level drawdown controls</li><li>Real-time risk monitoring dashboards</li><li>Circuit limit and volatility safeguards</li></ul>' +
        '</div>' +
        '<div class="service-card sc-amber">' +
        '<div class="service-num">04</div>' +
        '<div class="svc-icon" style="background:rgba(251,191,36,0.1);color:var(--color-amber);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>' +
        '<h4>Consultation &amp; Advisory</h4>' +
        '<p>One-on-one sessions to discuss trading goals, review strategies, or explore algorithmic trading for Indian markets.</p>' +
        '<div class="service-tags"><span class="tag tag-amber">Strategy Review</span><span class="tag tag-amber">Education</span><span class="tag tag-amber">SEBI</span></div>' +
        '<ul><li>Strategy review and performance audit</li><li>Market microstructure education</li><li>Algo trading infrastructure guidance</li><li>SEBI compliance consultation</li></ul>' +
        '</div>' +
        '</div>' +

        '<div class="disclaimer-box" style="margin-top:var(--space-6);">' +
        '<h4>SEBI Disclaimer</h4>' +
        '<p>J&amp;D Vantage Quant provides technology and research services only. We are SEBI compliant but not SEBI registered. We do not manage client funds or provide PMS. All trading decisions are made by the client. Past performance is not indicative of future results.</p>' +
        '<p style="margin-top:var(--space-2);"><a href="#" onclick="navigateTo(\'legal\'); return false;" style="color:var(--color-primary);font-size:var(--text-xs);">Read Complete SEBI Disclaimers &rarr;</a></p>' +
        '</div>';
}