/* ============================================================
   Trader AI — Market Ticker
   Displays live/delayed market data with fallback states.
   ============================================================ */

const T = window.TraderAI;

(function(ns) {
  'use strict';

  const TICKER_CONFIG = (window.TRADERAI_CONFIG && window.TRADERAI_CONFIG.marketData) || {};

  // Default ticker symbols — illustrative data
  const DEFAULT_SYMBOLS = [
    { symbol: 'SPX', name: 'S&P 500', price: '5,432.10', change: '+0.84%', direction: 'up', status: 'delayed' },
    { symbol: 'NDX', name: 'Nasdaq 100', price: '18,976.50', change: '+1.22%', direction: 'up', status: 'delayed' },
    { symbol: 'DJI', name: 'Dow Jones', price: '38,210.45', change: '-0.31%', direction: 'down', status: 'delayed' },
    { symbol: 'EUR/USD', name: 'Euro / USD', price: '1.0842', change: '+0.15%', direction: 'up', status: 'live' },
    { symbol: 'GBP/USD', name: 'Pound / USD', price: '1.2638', change: '-0.08%', direction: 'down', status: 'live' },
    { symbol: 'USD/JPY', name: 'Dollar / Yen', price: '154.72', change: '+0.42%', direction: 'up', status: 'live' },
    { symbol: 'BTC/USD', name: 'Bitcoin', price: '62,450.00', change: '+2.18%', direction: 'up', status: 'live' },
    { symbol: 'ETH/USD', name: 'Ethereum', price: '3,210.50', change: '+1.45%', direction: 'up', status: 'live' },
    { symbol: 'XAU/USD', name: 'Gold', price: '2,318.40', change: '-0.52%', direction: 'down', status: 'live' },
    { symbol: 'CL', name: 'Crude Oil', price: '78.25', change: '+0.93%', direction: 'up', status: 'delayed' },
    { symbol: 'VIX', name: 'Volatility', price: '15.80', change: '-3.12%', direction: 'down', status: 'delayed' },
    { symbol: 'DAX', name: 'DAX 40', price: '18,234.60', change: '+0.67%', direction: 'up', status: 'delayed' },
  ];

  let tickerInterval = null;

  /* --- Initialize ticker ---------------------------------- */
  ns.initMarketTicker = (containerId = 'market-ticker') => {
    const container = document.getElementById(containerId);
    if (!container) return;

    renderTicker(container);
    if (tickerInterval) clearInterval(tickerInterval);
    tickerInterval = setInterval(() => updateTicker(container), 15000);
  };

  function renderTicker(container) {
    const symbols = TICKER_CONFIG.symbols || DEFAULT_SYMBOLS;
    // Duplicate for seamless loop
    const items = [...symbols, ...symbols];
    container.innerHTML = items.map(s => `
      <span class="ticker-item">
        <span class="ticker-symbol">${s.symbol}</span>
        <span class="ticker-price">${s.price}</span>
        <span class="ticker-change ${s.direction}">${s.change}</span>
        <span class="ticker-status">${s.status}</span>
      </span>
    `).join('');
  }

  function updateTicker(container) {
    // Simulate minor price fluctuations for display
    const items = container.querySelectorAll('.ticker-item');
    items.forEach(item => {
      const priceEl = item.querySelector('.ticker-price');
      if (!priceEl) return;
      // Minimal visual update — in production, fetch real data
    });
  }

  /* --- Ticker error fallback ------------------------------ */
  ns.tickerError = (containerId = 'market-ticker-wrap') => {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.innerHTML = `<div class="ticker-error">⚠️ Market data temporarily unavailable. <button class="btn btn-sm btn-secondary" onclick="TraderAI.initMarketTicker()">Retry</button></div>`;
  };

  /* --- Auto-init if ticker container present -------------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('market-ticker')) {
      ns.initMarketTicker();
    }
  });

})(T);
