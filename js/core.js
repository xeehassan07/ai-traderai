/* ============================================================
   Trader AI — Core Component Loader
   Mounts header, footer, ticker, breadcrumbs on page load.
   ============================================================ */

(function() {
  'use strict';

  const T = TraderAI;

  /* --- Mount shared elements ------------------------------ */
  function mountAll() {
    detectHomepage();
    mountHeader();
    mountFooter();
    mountFAQAccordions();
    mountSmoothScroll();
    mountCurrentYear();
    setupMobileMenuToggle();
    setupHeaderScroll();
    setupSectionReveal();
  }

  /* --- Header --------------------------------------------- */
  function mountHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML = buildHeader();
    setupDropdowns(el);
    // Render mobile nav outside header (to avoid height clip)
    const existingMobile = document.getElementById('mobile-nav');
    if (!existingMobile) {
      const mobileNav = document.createElement('div');
      mobileNav.id = 'mobile-nav';
      mobileNav.className = 'mobile-nav';
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.innerHTML = buildMobileNav();
      el.parentNode.insertBefore(mobileNav, el.nextSibling);
    }
  }

  function buildHeader() {
    return `
      <div class="container">
        <a href="/" class="header-logo" aria-label="Trader AI Home">
          <span class="header-logo-icon"><img src="/assets/images/logo.png" alt="Trader AI" style="height:32px;width:auto;" fetchpriority="high"></span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          <div class="nav-dropdown">
            <button aria-haspopup="true" aria-expanded="false">Platform <span aria-hidden="true">▾</span></button>
            <div class="nav-dropdown-menu">
              <span class="dropdown-label">Platform</span>
              <a href="/ai-trading-platform/">AI Trading Platform</a>
              <a href="/ai-trading-assistant/">AI Trading Assistant</a>
              <a href="/ai-strategy-builder/">AI Strategy Builder</a>
              <a href="/paper-trading/">Paper Trading</a>
              <a href="/risk-management/">Risk Management</a>
            </div>
          </div>
          <div class="nav-dropdown">
            <button aria-haspopup="true" aria-expanded="false">AI Tools <span aria-hidden="true">▾</span></button>
            <div class="nav-dropdown-menu">
              <span class="dropdown-label">AI Tools</span>
              <a href="/tools/ai-chart-analyser/">AI Chart Analyser</a>
              <a href="/backtesting/">Backtesting</a>
              <a href="/ai-trading-signals/">AI Trading Signals</a>
            </div>
          </div>
          <div class="nav-dropdown">
            <button aria-haspopup="true" aria-expanded="false">AI Traders <span aria-hidden="true">▾</span></button>
            <div class="nav-dropdown-menu">
              <span class="dropdown-label">AI Traders</span>
              <a href="/ai-trader-leaderboard/">Leaderboard</a>
              <a href="/ai-traders/">AI Traders Directory</a>
              <a href="/performance-methodology/">Performance Methodology</a>
            </div>
          </div>
          <a href="/blog/">Blog</a>
          <a href="/trust-centre/">Trust Centre</a>
        </nav>
        <div class="header-actions">
          <a href="https://apexaiactivation.com/login" class="btn-signin" target="_blank" rel="noopener">Sign In</a>
          <a href="/register/" class="btn-primary-sm">Get Free Account</a>
          <button class="mobile-nav-toggle" aria-label="Toggle mobile navigation" aria-expanded="false">
            <span></span>
          </button>
        </div>
      </div>`;
  }

  function buildMobileNav() {
    return `
        <details class="mobile-nav-section" open>
          <summary>Platform</summary>
          <a href="/ai-trading-platform/">AI Trading Platform</a>
          <a href="/ai-trading-assistant/">AI Trading Assistant</a>
          <a href="/ai-strategy-builder/">AI Strategy Builder</a>
          <a href="/paper-trading/">Paper Trading</a>
          <a href="/risk-management/">Risk Management</a>
        </details>
        <details class="mobile-nav-section">
          <summary>AI Tools</summary>
          <a href="/tools/ai-chart-analyser/">AI Chart Analyser</a>
          <a href="/backtesting/">Backtesting</a>
          <a href="/ai-trading-signals/">AI Trading Signals</a>
        </details>
        <details class="mobile-nav-section">
          <summary>AI Traders</summary>
          <a href="/ai-trader-leaderboard/">Leaderboard</a>
          <a href="/ai-traders/">AI Traders Directory</a>
          <a href="/performance-methodology/">Performance Methodology</a>
        </details>
        <a href="/trust-centre/" class="mobile-nav-section" style="display:block;padding:16px 0;font-weight:600;white-space:nowrap;">Trust Centre</a>
        <details class="mobile-nav-section">
          <summary>Blog</summary>
          <a href="/blog/">All Articles</a>
          <a href="/blog/what-is-ai-trading/">What Is AI Trading?</a>
          <a href="/blog/backtest-without-coding/">Backtest Without Coding</a>
          <a href="/blog/is-ai-trading-safe/">Is AI Trading Safe?</a>
          <a href="/blog/best-ai-trading-platforms-uk/">Best AI Platforms UK</a>
          <a href="/blog/ai-trading-australia-guide/">AI Trading Australia</a>
        </details>
        <div class="mobile-nav-actions">
          <a href="/register/" style="display:block;width:100%;text-align:center;padding:16px;font-size:1rem;font-weight:600;color:#fff;background:var(--blue);border:none;border-radius:10px;text-decoration:none;">Get Free Account</a>
        </div>`;
  }

  function setupDropdowns(header) {
    const dropdowns = header.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
      const btn = dd.querySelector('button');
      const menu = dd.querySelector('.nav-dropdown-menu');
      if (!btn || !menu) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = menu.style.display === 'block';
        closeAllDropdowns(dropdowns);
        menu.style.display = isOpen ? '' : 'block';
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });

      dd.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) menu.style.display = 'block';
      });
      dd.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) menu.style.display = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) closeAllDropdowns(dropdowns);
    });
  }

  function closeAllDropdowns(dropdowns) {
    dropdowns.forEach(dd => {
      const menu = dd.querySelector('.nav-dropdown-menu');
      const btn = dd.querySelector('button');
      if (menu) menu.style.display = '';
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  /* --- Mobile Menu Toggle --------------------------------- */
  function setupMobileMenuToggle() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.getElementById('mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      nav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* --- Footer --------------------------------------------- */
  function mountFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = buildFooter();
  }

  function buildFooter() {
    return `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" class="header-logo" style="color:#fff;">
              <span class="header-logo-icon" style="background:none;width:auto;"><img src="/assets/images/logo.png" alt="Trader AI" style="height:28px;width:auto;"></span>
            </a>
            <p>AI-assisted market research, chart analysis, strategy testing and risk tools for traders.</p>
            <p style="font-size:0.8125rem;color:rgba(255,255,255,0.7);margin-top:12px;line-height:1.8;">
              📞 UK +44 20 3927 2999<br>
              📞 AU +61 2 8488 9800<br>
              ✉️ info@thetraderai.net
            </p>
          </div>
          <div class="footer-column">
            <h3>Platform</h3>
            <ul>
              <li><a href="/ai-trading-platform/">AI Trading Platform</a></li>
              <li><a href="/ai-trading-assistant/">AI Trading Assistant</a></li>
              <li><a href="/ai-strategy-builder/">AI Strategy Builder</a></li>
              <li><a href="/paper-trading/">Paper Trading</a></li>
              <li><a href="/risk-management/">Risk Management</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>AI Tools</h3>
            <ul>
              <li><a href="/tools/ai-chart-analyser/">AI Chart Analyser</a></li>
              <li><a href="/backtesting/">Backtesting</a></li>
              <li><a href="/ai-trading-signals/">AI Trading Signals</a></li>
              <li><a href="/ai-trader-leaderboard/">Leaderboard</a></li>
              <li><a href="/ai-traders/">AI Traders Directory</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="/about-us/">About Us</a></li>
              <li><a href="/contact-us/">Contact Us</a></li>
              <li><a href="/trust-centre/">Trust Centre</a></li>
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/performance-methodology/">Performance Methodology</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Legal</h3>
            <ul>
              <li><a href="/privacy-policy/">Privacy Policy</a></li>
              <li><a href="/terms-of-service/">Terms of Service</a></li>
              <li><a href="/cookie-policy/">Cookie Policy</a></li>
              <li><a href="/risk-disclosure/">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-risk"><strong>Risk Warning:</strong> Trading and investing involve risk. AI-generated analysis, historical results, simulated results and backtested performance do not guarantee future outcomes. Trader AI does not provide personalised financial advice. Always conduct your own research and consider your financial situation before trading.</p>
          <p class="footer-copyright">© <span class="current-year">2026</span> Trader AI. All rights reserved.</p>
        </div>
      </div>`;
  }

  /* --- Breadcrumbs ---------------------------------------- */
  function mountBreadcrumbs() {
    const el = document.getElementById('breadcrumbs');
    if (!el) return;
    const path = window.location.pathname;
    const crumbs = buildBreadcrumbs(path);
    if (!crumbs.length) { el.style.display = 'none'; return; }
    el.innerHTML = `<div class="container"><nav aria-label="Breadcrumb"><ol>${crumbs.map((c, i) => {
      if (i === crumbs.length - 1) return `<li aria-current="page">${c.label}</li>`;
      return `<li><a href="${c.href}">${c.label}</a></li>`;
    }).join('')}</ol></nav></div>`;
  }

  function buildBreadcrumbs(path) {
    const crumbs = [{ label: 'Home', href: '/' }];
    if (path === '/') return [];

    const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
    const labelMap = {
      'tools': 'Tools',
      'ai-chart-analyser': 'AI Chart Analyser',
      'ai-trading-assistant': 'AI Trading Assistant',
      'ai-strategy-builder': 'AI Strategy Builder',
      'ai-trader-leaderboard': 'AI Trader Leaderboard',
      'ai-traders': 'AI Traders Directory',
      'backtesting': 'Backtesting',
      'paper-trading': 'Paper Trading',
      'risk-management': 'Risk Management',
      'performance-methodology': 'Performance Methodology',
      'trust-centre': 'Trust Centre',
      'ai-trading-platform': 'AI Trading Platform',
      'ai-trading-signals': 'AI Trading Signals',
    };

    let href = '';
    parts.forEach(p => {
      href += '/' + p;
      crumbs.push({ label: labelMap[p] || p.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), href: href + '/' });
    });

    return crumbs;
  }

  /* --- FAQ Accordions ------------------------------------- */
  function mountFAQAccordions() {
    T.$$('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = answer.classList.contains('open');
        // Close others in same list
        const list = btn.closest('.faq-list');
        if (list) {
          list.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
          list.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
        if (!isOpen) {
          answer.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* --- Smooth Scroll -------------------------------------- */
  function mountSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* --- Current Year --------------------------------------- */
  function mountCurrentYear() {
    T.$$('.current-year').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* --- Homepage Detection --------------------------------- */
  function detectHomepage() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      document.body.classList.add('home');
    }
  }

  /* --- Header Scroll Transition --------------------------- */
  function setupHeaderScroll() {
    if (!document.body.classList.contains('home')) return;
    const header = document.getElementById('site-header');
    if (!header) return;

    var ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) header.classList.add('scrolled');
          else header.classList.remove('scrolled');
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Section Reveal Animation --------------------------- */
  function setupSectionReveal() {
    if (!document.body.classList.contains('home')) return;

    const sections = document.querySelectorAll('.reveal');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observe all reveal sections first, THEN hide them
    sections.forEach(el => observer.observe(el));
    // Small delay to let observer fire for in-view sections before hiding
    requestAnimationFrame(() => {
      document.body.classList.add('js-reveal');
    });
  }

  /* --- Init on DOM ready ---------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }

})();
