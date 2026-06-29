/* J&D Vantage Quant - SPA Router */
var currentPage = 'home';
var isInitialLoad = true;
var pageRegistry = {};

function registerPage(name, fn) { pageRegistry[name] = fn; }

function navigateTo(pageName) {
    if (!pageRegistry[pageName]) return;
    closeMenu();
    currentPage = pageName;
    var app = document.getElementById('app-content');
    if (app) {
        if (!isInitialLoad) {
            app.style.opacity = '0';
            app.style.transform = 'translateY(6px)';
        }
        setTimeout(function() {
            var html = pageRegistry[pageName]();
            if (pageName !== 'home') {
                html = '<div class="op-page"><div class="op-container">' + html + '</div></div>';
            }
            app.innerHTML = html;
            window.scrollTo({ top: 0, behavior: isInitialLoad ? 'auto' : 'smooth' });
            void app.offsetHeight;
            app.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            app.style.opacity = '1';
            app.style.transform = 'translateY(0)';
            setTimeout(function() { app.style.transition = ''; }, 300);
            if (pageName === 'home') {
                if (typeof initHeroStocks === 'function') initHeroStocks();
            } else if (typeof stopHeroStocks === 'function') {
                stopHeroStocks();
            }
        }, isInitialLoad ? 0 : 100);
    }
    if (isInitialLoad) isInitialLoad = false;
    updateActiveNav(pageName);
    updatePageTitle(pageName);
    window.location.hash = pageName;
}

function updateActiveNav(pageName) {
    document.querySelectorAll('.op-nav-link').forEach(function(item) {
        item.classList.remove('active');
        var p = item.dataset.page;
        if (p === pageName || (p === 'legal' && ['disclaimers', 'terms', 'privacy', 'refund'].indexOf(pageName) !== -1)) {
            item.classList.add('active');
        }
    });
    moveNavIndicatorToActive();
}

function getActiveTopNavLink() {
    return document.querySelector('.op-nav-links .op-nav-link.active');
}

function moveNavIndicator(link) {
    var ind = document.getElementById('op-nav-indicator');
    if (!ind || !link) return;
    ind.style.left = link.offsetLeft + 'px';
    ind.style.width = link.offsetWidth + 'px';
    ind.classList.add('show');
}

function moveNavIndicatorToActive() {
    var active = getActiveTopNavLink();
    if (active) {
        moveNavIndicator(active);
    } else {
        var ind = document.getElementById('op-nav-indicator');
        if (ind) ind.classList.remove('show');
    }
}

function initNavIndicator() {
    var nav = document.querySelector('.op-nav-links');
    if (!nav) return;
    nav.querySelectorAll('.op-nav-link').forEach(function(link) {
        link.addEventListener('mouseenter', function() { moveNavIndicator(link); });
    });
    nav.addEventListener('mouseleave', moveNavIndicatorToActive);
    window.addEventListener('resize', moveNavIndicatorToActive);
    window.addEventListener('load', moveNavIndicatorToActive);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(moveNavIndicatorToActive);
    }
    setTimeout(moveNavIndicatorToActive, 400);
    moveNavIndicatorToActive();
}


function updatePageTitle(pageName) {
    var el = document.getElementById('page-title');
    var titles = { home: 'JD Vantage Quant', about: 'About Us', services: 'Our Services', contact: 'Contact Us', legal: 'Legal & Compliance', disclaimers: 'Legal & Compliance', terms: 'Legal & Compliance', privacy: 'Legal & Compliance', refund: 'Legal & Compliance', brochure: 'Company Brochure' };
    if (el) el.textContent = titles[pageName] || 'JD Vantage Quant';
    var doc = { home: 'J&D Vantage Quant - Algo Trading', about: 'About - J&D Vantage Quant', services: 'Services - J&D Vantage Quant', contact: 'Contact - J&D Vantage Quant', legal: 'Legal - J&D Vantage Quant', brochure: 'Brochure - J&D Vantage Quant' };
    document.title = doc[pageName] || 'J&D Vantage Quant';
}

function toggleSidebar() {
    var s = document.getElementById('sidebar');
    var o = document.getElementById('sidebar-overlay');
    s.classList.toggle('open');
    o.classList.toggle('active');
}

function toggleMenu() {
    var d = document.getElementById('op-drawer');
    var b = document.getElementById('op-drawer-backdrop');
    if (d) d.classList.toggle('open');
    if (b) b.classList.toggle('open');
}

function closeMenu() {
    var d = document.getElementById('op-drawer');
    var b = document.getElementById('op-drawer-backdrop');
    if (d) d.classList.remove('open');
    if (b) b.classList.remove('open');
}

function closeSidebar() {
    closeMenu();
}

function collapseSidebar() {
    var d = document.querySelector('.dashboard');
    if (d) {
        d.classList.toggle('collapsed');
        var btn = document.getElementById('sidebar-collapse');
        if (btn) btn.title = d.classList.contains('collapsed') ? 'Expand' : 'Collapse';
    }
}

function handleContactSubmit() {
    var n = document.getElementById('contact-name');
    var e = document.getElementById('contact-email');
    var m = document.getElementById('contact-message');
    if (n && e && m && n.value && e.value && m.value) {
        alert('Thank you! We will get back to you soon.');
        n.value = '';
        e.value = '';
        m.value = '';
        var p = document.getElementById('contact-phone');
        var s = document.getElementById('contact-subject');
        if (p) p.value = '';
        if (s) s.value = '';
    } else { alert('Please fill in all required fields.'); }
}

function switchLegalTab(tabId) {
    document.querySelectorAll('.legal-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.legal-tab-content').forEach(function(c) { c.classList.remove('active'); });
    var tab = document.querySelector('[data-tab="' + tabId + '"]');
    var content = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
}

function buildTicker() {
    var track = document.getElementById('ticker-track');
    if (!track) return;
    var indices = [
        { name: 'NIFTY 50', price: '24,768.30', chg: '+0.62%', up: true },
        { name: 'SENSEX', price: '81,420.15', chg: '+0.54%', up: true },
        { name: 'BANK NIFTY', price: '52,340.80', chg: '-0.18%', up: false },
        { name: 'NIFTY IT', price: '37,915.45', chg: '+1.12%', up: true },
        { name: 'FIN NIFTY', price: '23,610.05', chg: '+0.31%', up: true },
        { name: 'NIFTY MIDCAP', price: '57,284.60', chg: '-0.24%', up: false },
        { name: 'INDIA VIX', price: '13.42', chg: '-2.05%', up: false },
        { name: 'NIFTY AUTO', price: '25,108.90', chg: '+0.88%', up: true },
        { name: 'NIFTY PHARMA', price: '21,950.70', chg: '+0.45%', up: true }
    ];

    function arrow(up) {
        return up ?
            '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 15 12 9 18 15"/></svg>' :
            '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';
    }

    function itemHtml(x) {
        return '<span class="ticker-item ' + (x.up ? 'up' : 'down') + '">' +
            '<span class="t-name">' + x.name + '</span>' +
            '<span class="t-price">' + x.price + '</span>' +
            '<span class="t-chg">' + arrow(x.up) + x.chg + '</span>' +
            '<span class="t-sep">|</span></span>';
    }
    var row = indices.map(itemHtml).join('');
    track.innerHTML = row + row;
}

function initNavScroll() {
    var nav = document.querySelector('.op-nav');
    if (!nav) return;

    function onScroll() {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initApp() {
    buildTicker();
    initNavIndicator();
    initNavScroll();
    var hash = window.location.hash.replace('#', '');
    navigateTo(hash && pageRegistry[hash] ? hash : 'home');
    window.addEventListener('hashchange', function() {
        var h = window.location.hash.replace('#', '');
        if (h && pageRegistry[h] && h !== currentPage) navigateTo(h);
    });
    setTimeout(function() {
        var splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hide');
            setTimeout(function() { splash.remove(); }, 600);
        }
    }, 2400);
}