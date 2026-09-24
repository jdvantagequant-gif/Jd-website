/* J&D Vantage Quant — shared front-end.
   Mobile drawer, reading progress, scroll reveals and the contact form.
   No market data, no charts: the site publishes no trading figures. */
(function (global) {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const STILL = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');   // arms the scroll-reveal CSS

  /* Staggered fade-and-rise for anything tagged .rv. The timeout is a backstop,
     not a nicety: in a document the browser never paints (background tab,
     occluded window) IntersectionObserver reports nothing, and content must
     never be left stranded at opacity 0. */
  const FALLBACK = 2200;
  function reveal(root) {
    const items = $$('.rv:not(.rv-in)', root);
    if (!items.length) return;
    const show = e => {
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

  /* Reading progress along the header's lower edge. Two style writes per
     scroll — cheap enough inline; deferring to requestAnimationFrame would
     freeze the bar in any document the browser is not painting. */
  function scrollChrome() {
    const bar = $('#nav-prog');
    if (!bar) return;
    let last = 0;
    const paint = () => {
      last = Date.now();
      const max = document.documentElement.scrollHeight - global.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, global.scrollY / max * 100) : 0) + '%';
    };
    global.addEventListener('scroll', () => { if (Date.now() - last > 16) paint(); }, { passive: true });
    global.addEventListener('resize', paint, { passive: true });
    paint();
  }

  function menu() {
    scrollChrome();
    const btn = $('#burger'), drawer = $('#nav-drawer');
    if (!btn || !drawer) return;
    const close = () => { drawer.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', drawer.classList.toggle('open'));
    });
    // an in-page jump would otherwise leave the drawer covering the target
    drawer.addEventListener('click', e => { if (e.target.tagName === 'A') close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    let rt;
    global.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (global.innerWidth > 980) close(); }, 150);
    });
  }

  /* The site is static, so there is no endpoint to post to — and a form that
     pretends to send is worse than one that does not. This validates, then
     hands the message to the visitor's own mail client where they can see
     exactly what leaves their machine. Nothing is stored or transmitted here. */
  function contactForm(to) {
    const form = $('#contact-form'), status = $('#c-status');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = id => ($(id) ? $(id).value.trim() : '');
      const name = v('#c-name'), email = v('#c-email'), msg = v('#c-msg');
      const phone = v('#c-phone'), topic = $('#c-topic') ? $('#c-topic').value : '';

      if (!name || !email || !msg) {
        status.className = 'form-msg err';
        status.textContent = 'Please fill in your name, email and message.';
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.className = 'form-msg err';
        status.textContent = 'That email address does not look right.';
        return;
      }
      const subject = topic ? topic + ' — ' + name : 'Website enquiry — ' + name;
      const body = [
        'Name:  ' + name,
        'Email: ' + email,
        phone ? 'Phone: ' + phone : null,
        topic ? 'Topic: ' + topic : null,
        '',
        msg,
      ].filter(l => l !== null).join('\n');

      status.className = 'form-msg ok';
      status.textContent = 'Opening your mail app with the message ready to send. '
        + 'If nothing happens, write to ' + to + ' directly.';
      global.location.href = 'mailto:' + to
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  function init(opts) {
    menu();
    reveal();
    contactForm((opts && opts.mailto) || 'jdvantagequant@gmail.com');
  }

  global.JD = { $, $$, STILL, reveal, menu, contactForm, init };
})(window);
