/* ============================================================
   Trader AI — Utility Functions
   ============================================================ */

const TraderAI = window.TraderAI || {};

(function(ns) {
  'use strict';

  /* --- DOM Helpers ---------------------------------------- */
  ns.$ = (sel, ctx) => (ctx || document).querySelector(sel);
  ns.$$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  /* --- Templates ------------------------------------------ */
  ns.template = (html) => {
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    return tpl.content.firstChild;
  };

  /* --- Fetch with timeout --------------------------------- */
  ns.fetchJSON = async (url, opts = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), opts.timeout || 10000);
    try {
      const res = await fetch(url, { ...opts, signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timeout);
    }
  };

  /* --- Debounce ------------------------------------------- */
  ns.debounce = (fn, ms = 250) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  /* --- Cookies -------------------------------------------- */
  ns.setCookie = (name, value, days = 30) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  };

  ns.getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  /* --- Formatting ----------------------------------------- */
  ns.formatCurrency = (val, currency = 'USD') => {
    const n = Number(val);
    if (isNaN(n)) return '—';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  };

  ns.formatPercent = (val) => {
    const n = Number(val);
    if (isNaN(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  };

  ns.formatNumber = (val, decimals = 0) => {
    const n = Number(val);
    if (isNaN(n)) return '—';
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
  };

  ns.formatDate = (val) => {
    const d = new Date(val);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  ns.formatDateTime = (val) => {
    const d = new Date(val);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  /* --- Random ID ------------------------------------------ */
  ns.uid = () => 'ta-' + Math.random().toString(36).slice(2, 9);

  /* --- Platform detection --------------------------------- */
  ns.isMobile = () => window.innerWidth < 768;
  ns.isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

  /* --- Local storage helpers ------------------------------ */
  ns.store = (key, val) => { try { localStorage.setItem('traderai_' + key, JSON.stringify(val)); } catch(e) {} };
  ns.load = (key) => { try { return JSON.parse(localStorage.getItem('traderai_' + key)); } catch(e) { return null; } };
  ns.remove = (key) => { try { localStorage.removeItem('traderai_' + key); } catch(e) {} };

  /* --- Init timestamp ------------------------------------- */
  ns.now = () => new Date().toISOString();

  /* --- Accessibility: trap focus -------------------------- */
  ns.trapFocus = (container) => {
    const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    if (first) first.focus();
  };

})(TraderAI);
