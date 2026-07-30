/* ============================================================
   Trader AI — Runtime Configuration
   Values are read from window.TRADERAI_CONFIG.
   In production, inject this from server-side environment.
   ============================================================ */

window.TRADERAI_CONFIG = window.TRADERAI_CONFIG || {
  // Lead form API endpoint — set via server-side env or build step
  leadApiEndpoint: '',

  // Base URL for canonical links
  baseUrl: 'https://traderai.com',

  // Market data configuration
  marketData: {
    // Provider: 'demo' uses built-in illustrative data
    // Set to 'live' and provide endpoint for real data
    provider: 'demo',
    endpoint: '',
    symbols: null, // null = use defaults
  },

  // Analytics
  gaMeasurementId: '',

  // Feature flags
  features: {
    liveMarketData: false,
    liveAIQueries: false,
    liveBacktesting: false,
    livePaperTrading: false,
    userAccounts: false,
  },

  // Environment
  environment: 'development', // 'development' | 'staging' | 'production'
};
