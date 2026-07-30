/* ============================================================
   Trader AI — Reusable Components
   Renders cards, sections, and other reusable UI blocks.
   ============================================================ */

const T = window.TraderAI;

(function(ns) {
  'use strict';

  /* --- PageHero ------------------------------------------- */
  ns.PageHero = (opts = {}) => `
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-content">
          <h1>${opts.title || ''}</h1>
          ${opts.subtitle ? `<p>${opts.subtitle}</p>` : ''}
          ${opts.ctas ? `<div class="page-hero-actions">${opts.ctas}</div>` : ''}
        </div>
      </div>
    </section>`;

  /* --- FeatureGrid ---------------------------------------- */
  ns.FeatureGrid = (features = []) => `
    <div class="grid grid-3">
      ${features.map(f => `
        <div class="feature-card">
          <div class="feature-card-icon">${f.icon || '◆'}</div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
          ${f.link ? `<a href="${f.link}" class="btn btn-sm btn-secondary mt">${f.linkText || 'Learn more'}</a>` : ''}
        </div>
      `).join('')}
    </div>`;

  /* --- CTASection ----------------------------------------- */
  ns.CTASection = (opts = {}) => `
    <section class="cta-section">
      <div class="container">
        <h2>${opts.title || 'Ready to Explore Trader AI?'}</h2>
        <p>${opts.desc || 'Explore AI-assisted market research, strategy testing and risk tools in one platform.'}</p>
        <div class="hero-actions" style="justify-content:center;">
          ${opts.ctas || '<a href="/demo/" class="btn btn-primary" style="background:var(--white);color:var(--deep-navy);">Explore the Demo</a>'}
        </div>
      </div>
    </section>`;

  /* --- TrustBar ------------------------------------------- */
  ns.TrustBar = () => `
    <div class="trust-bar">
      <div class="container">
        <span class="trust-item"><span class="trust-icon">🔒</span> AI analysis, not financial advice</span>
        <span class="trust-item"><span class="trust-icon">📊</span> Transparent data labelling</span>
        <span class="trust-item"><span class="trust-icon">⚡</span> Real-time market context</span>
        <span class="trust-item"><span class="trust-icon">🛡️</span> Built-in risk controls</span>
      </div>
    </div>`;

  /* --- MarketTicker placeholder --------------------------- */
  ns.MarketTickerHTML = () => `
    <div class="market-ticker-wrap" id="market-ticker-wrap">
      <div class="market-ticker" id="market-ticker"></div>
    </div>`;

  /* --- RiskDisclaimer ------------------------------------- */
  ns.RiskDisclaimer = () => `
    <div class="risk-disclaimer">
      <strong>Risk Warning:</strong> Trading and investing involve risk. AI-generated information can be incorrect. Backtested and simulated results do not guarantee future performance. Trader AI does not provide personalised financial advice. Always conduct your own research.
    </div>`;

  /* --- DataStatusBadge ------------------------------------ */
  ns.DataStatusBadge = (type = 'illustrative', label = '') => `
    <span class="badge badge-${type}">${label || type}</span>`;

  /* --- PerformanceCard ------------------------------------ */
  ns.PerformanceCard = (data = {}) => `
    <div class="perf-card">
      <div class="perf-card-header">
        <div>
          <h4 style="margin:0;">${data.name || 'Strategy Performance'}</h4>
          <span style="font-size:0.75rem;color:var(--muted);">${data.period || ''}</span>
        </div>
        ${ns.DataStatusBadge(data.status || 'illustrative')}
      </div>
      <div class="perf-metrics">
        <div><div class="perf-metric-label">Return</div><div class="perf-metric-value">${ns.formatPercent(data.return)}</div></div>
        <div><div class="perf-metric-label">Max Drawdown</div><div class="perf-metric-value">${ns.formatPercent(data.maxDrawdown)}</div></div>
        <div><div class="perf-metric-label">Win Rate</div><div class="perf-metric-value">${ns.formatPercent(data.winRate)}</div></div>
        <div><div class="perf-metric-label">Trades</div><div class="perf-metric-value">${data.trades || '—'}</div></div>
      </div>
      <div class="perf-chart" aria-label="Performance chart — illustrative">${data.chartNote || 'Equity curve — illustrative data'}</div>
    </div>`;

  /* --- PricingCard ---------------------------------------- */
  ns.PricingCard = (plan = {}) => `
    <div class="pricing-card ${plan.featured ? 'featured' : ''}">
      <h3 class="pricing-name">${plan.name}</h3>
      <div class="pricing-price">${plan.price}<span>${plan.period || ''}</span></div>
      <p class="pricing-desc">${plan.desc}</p>
      <ul class="pricing-features">
        ${(plan.features || []).map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="${plan.ctaLink || '/demo/'}" class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}">${plan.cta || 'Get Started'}</a>
    </div>`;

  /* --- FAQSection ----------------------------------------- */
  ns.FAQSection = (faqs = []) => `
    <div class="faq-list">
      ${faqs.map((faq, i) => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-${i}">
            <span>${faq.q}</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-${i}" role="region" aria-labelledby="faq-q-${i}">
            <p>${faq.a}</p>
          </div>
        </div>
      `).join('')}
    </div>`;

  /* --- WorkflowSteps -------------------------------------- */
  ns.WorkflowSteps = (steps = []) => `
    <div class="workflow-steps">
      ${steps.map((s, i) => `
        <div class="workflow-step">
          <div class="workflow-step-number">${i + 1}</div>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      `).join('')}
    </div>`;

  /* --- ComparisonTable ------------------------------------ */
  ns.ComparisonTable = (headers = [], rows = []) => `
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${rows.map(row => `<tr>${row.map((cell, i) => `<td>${i === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  /* --- SignalCard ----------------------------------------- */
  ns.SignalCard = (signal = {}) => `
    <div class="signal-card">
      <div class="signal-card-header">
        <div>
          <strong>${signal.market || ''}</strong>
          <div style="font-size:0.75rem;color:var(--muted);">${signal.instrument || ''} · ${signal.timeframe || ''}</div>
        </div>
        ${ns.DataStatusBadge(signal.status || 'illustrative')}
      </div>
      <div class="signal-card-body">
        <div><div class="signal-stat-label">Scenario</div><div class="signal-stat-value">${signal.scenario || '—'}</div></div>
        <div><div class="signal-stat-label">Entry Area</div><div class="signal-stat-value">${signal.entry || '—'}</div></div>
        <div><div class="signal-stat-label">Target</div><div class="signal-stat-value">${signal.target || '—'}</div></div>
        <div><div class="signal-stat-label">Invalidation</div><div class="signal-stat-value">${signal.invalidation || '—'}</div></div>
        <div><div class="signal-stat-label">Risk Category</div><div class="signal-stat-value">${signal.risk || '—'}</div></div>
        <div><div class="signal-stat-label">Generated</div><div class="signal-stat-value">${ns.formatDateTime(signal.generatedAt) || '—'}</div></div>
      </div>
      <div class="signal-card-footer">
        <span style="font-size:0.75rem;color:var(--muted);">${signal.dataSource || ''}</span>
        ${ns.DataStatusBadge(signal.signalStatus || 'active', signal.signalStatus || 'active')}
      </div>
    </div>`;

  /* --- AITraderCard --------------------------------------- */
  ns.AITraderCard = (trader = {}) => `
    <div class="trader-card">
      <div class="trader-card-header">
        <div>
          <h4 style="margin:0;">${trader.name || ''}</h4>
          <div style="font-size:0.75rem;color:var(--muted);">${trader.market || ''} · ${trader.strategy || ''}</div>
        </div>
        ${ns.DataStatusBadge(trader.status || 'illustrative')}
      </div>
      <div class="trader-card-meta">
        <div><div class="trader-card-stat-label">Return</div><div class="trader-card-stat-value">${ns.formatPercent(trader.return)}</div></div>
        <div><div class="trader-card-stat-label">Max Drawdown</div><div class="trader-card-stat-value">${ns.formatPercent(trader.maxDrawdown)}</div></div>
        <div><div class="trader-card-stat-label">Win Rate</div><div class="trader-card-stat-value">${ns.formatPercent(trader.winRate)}</div></div>
        <div><div class="trader-card-stat-label">Trades</div><div class="trader-card-stat-value">${trader.trades || '—'}</div></div>
      </div>
      <p class="trader-card-desc">${trader.desc || ''}</p>
      <a href="${trader.link || '#'}" class="btn btn-sm btn-secondary" style="width:100%;">View Profile</a>
    </div>`;

  /* --- TrustInformationBlock ------------------------------ */
  ns.TrustBlock = (opts = {}) => `
    <div class="info-block">
      <h4>${opts.icon || '📋'} ${opts.title}</h4>
      ${opts.content ? `<p>${opts.content}</p>` : ''}
      ${opts.placeholder ? `<span class="trust-placeholder">${opts.placeholder}</span>` : ''}
    </div>`;

  /* --- Alert ---------------------------------------------- */
  ns.Alert = (type = 'info', message = '') => `
    <div class="alert alert-${type}" role="alert">${message}</div>`;

  /* --- EmptyState ----------------------------------------- */
  ns.EmptyState = (opts = {}) => `
    <div class="empty-state">
      <div class="empty-state-icon">${opts.icon || '📭'}</div>
      <h4>${opts.title || 'Nothing here yet'}</h4>
      <p>${opts.desc || ''}</p>
      ${opts.action || ''}
    </div>`;

  /* --- ErrorState ----------------------------------------- */
  ns.ErrorState = (opts = {}) => `
    <div class="error-state">
      <div class="error-state-icon">⚠️</div>
      <h4>${opts.title || 'Something went wrong'}</h4>
      <p>${opts.desc || 'Please try again or contact support if the problem persists.'}</p>
      ${opts.action || '<button class="btn btn-sm btn-secondary" onclick="location.reload()">Try Again</button>'}
    </div>`;

  /* --- LoadingState --------------------------------------- */
  ns.LoadingState = (type = 'card') => {
    if (type === 'chart') return '<div class="skeleton skeleton-chart"></div>';
    if (type === 'ticker') return '<div class="skeleton skeleton-ticker"></div>';
    if (type === 'text') return `<div class="skeleton skeleton-heading"></div>${'<div class="skeleton skeleton-text"></div>'.repeat(3)}`;
    return '<div class="skeleton skeleton-card"></div>';
  };

  /* --- Breadcrumbs (inline) ------------------------------- */
  ns.BreadcrumbsHTML = () => '<nav class="breadcrumbs" id="breadcrumbs" aria-label="Breadcrumb"></nav>';

})(T);
