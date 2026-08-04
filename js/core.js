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
          <span class="header-logo-icon"><img src="data:image/png;base64,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" alt="Trader AI" style="height:32px;width:auto;"></span>
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
          <div class="nav-dropdown">
            <button aria-haspopup="true" aria-expanded="false">Blog <span aria-hidden="true">▾</span></button>
            <div class="nav-dropdown-menu">
              <span class="dropdown-label">Blog</span>
              <a href="/blog/what-is-ai-trading/">What Is AI Trading?</a>
              <a href="/blog/backtest-without-coding/">Backtest Without Coding</a>
              <a href="/blog/is-ai-trading-safe/">Is AI Trading Safe?</a>
              <a href="/blog/best-ai-trading-platforms-uk/">Best AI Platforms UK</a>
              <a href="/blog/ai-trading-australia-guide/">AI Trading Australia</a>
            </div>
          </div>
          <a href="/pricing/">Pricing</a>
          <a href="/trust-centre/">Trust Centre</a>
        </nav>
        <div class="header-actions">
          <button class="btn-signin" onclick="window.location.href='/register/'">Sign In</button>
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
        <a href="/pricing/" class="mobile-nav-section" style="display:block;padding:16px 0;font-weight:600;">Pricing</a>
        <a href="/trust-centre/" class="mobile-nav-section" style="display:block;padding:16px 0;font-weight:600;white-space:nowrap;">Trust Centre</a>
        <details class="mobile-nav-section">
          <summary>Blog</summary>
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
              <span class="header-logo-icon" style="background:none;width:auto;"><img src="data:image/png;base64,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" alt="Trader AI" style="height:28px;width:auto;"></span>
            </a>
            <p>AI-assisted market research, chart analysis, strategy testing and risk tools for traders.</p>
            <p style="font-size:0.8125rem;color:rgba(255,255,255,0.7);margin-top:12px;line-height:1.8;">
              📞 UK +44 20 3927 2999<br>
              📞 AU +61 2 8488 9800<br>
              ✉️ info@traderai.ai
            </p>
          </div>
          <div class="footer-column">
            <h4>Platform</h4>
            <ul>
              <li><a href="/ai-trading-platform/">AI Trading Platform</a></li>
              <li><a href="/ai-trading-assistant/">AI Trading Assistant</a></li>
              <li><a href="/ai-strategy-builder/">AI Strategy Builder</a></li>
              <li><a href="/paper-trading/">Paper Trading</a></li>
              <li><a href="/risk-management/">Risk Management</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>AI Tools</h4>
            <ul>
              <li><a href="/tools/ai-chart-analyser/">AI Chart Analyser</a></li>
              <li><a href="/backtesting/">Backtesting</a></li>
              <li><a href="/ai-trading-signals/">AI Trading Signals</a></li>
              <li><a href="/ai-trader-leaderboard/">Leaderboard</a></li>
              <li><a href="/ai-traders/">AI Traders Directory</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/trust-centre/">Trust Centre</a></li>
              <li><a href="/blog/what-is-ai-trading/">Blog</a></li>
              <li><a href="/performance-methodology/">Performance Methodology</a></li>
              <li><a href="/pricing/">Pricing</a></li>
              <li><a href="/demo/">Interactive Demo</a></li>
              <li><a href="/register/">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Risk Disclosure</a></li>
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
      'demo': 'Interactive Demo',
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
      'pricing': 'Pricing',
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
