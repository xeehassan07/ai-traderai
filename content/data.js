/* ============================================================
   Trader AI — Content Data
   FAQs, Pricing, Navigation, Leaderboard, Traders, Signals
   ============================================================ */

const TraderAIContent = window.TraderAIContent || {};

(function(ns) {
  'use strict';

  /* --- Global FAQs (used across pages) -------------------- */
  ns.globalFAQs = [
    { q: 'What is Trader AI?', a: 'Trader AI is a platform that provides AI-assisted market research, chart analysis, strategy building, backtesting, paper trading and risk management tools. It does not execute trades, manage funds or provide personalised financial advice.' },
    { q: 'Is Trader AI free to use?', a: 'Trader AI offers a free tier with access to the guided demo, limited AI questions, sample strategy builder and public leaderboard. Paid plans with expanded features will be available. See our <a href="/pricing/">Pricing page</a> for details.' },
    { q: 'Does Trader AI predict market prices?', a: 'No. Trader AI analyses market data and provides structured observations, but it does not predict future prices. AI-generated information can be incorrect, incomplete or outdated. All trading decisions remain your responsibility.' },
    { q: 'Does the AI execute trades automatically?', a: 'No. Trader AI does not execute trades, manage funds or place orders. It is a research and analysis platform. Any trading must be done through your own brokerage account.' },
    { q: 'What does "illustrative" data mean?', a: 'Illustrative data is sample data created to demonstrate how the platform works. It is not real trading performance. We clearly label all data as live, delayed, paper-traded, backtested or illustrative so you can understand what you are viewing.' },
    { q: 'How do I start using Trader AI?', a: 'You can explore the <a href="/demo/">interactive demo</a> without creating an account. When you are ready, create an account to access more features. No payment is required to start.' },
    { q: 'What markets does Trader AI cover?', a: 'Trader AI provides analysis tools for forex, indices, commodities, cryptocurrencies, stocks and ETFs. Market coverage may vary depending on data provider availability.' },
    { q: 'Is my data secure?', a: 'We implement industry-standard security practices including encryption in transit and at rest. See our <a href="/trust-centre/">Trust Centre</a> for details on our security measures and privacy practices.' },
  ];

  /* --- Homepage-specific FAQs (10 questions per spec) ------ */
  ns.homepageFAQs = [
    { q: 'What is Trader AI?', a: 'Trader AI is an AI-assisted market research and strategy testing platform. It provides tools for chart analysis, strategy building, backtesting, paper trading, and risk management. It does not execute trades, manage money, or provide regulated financial advice.' },
    { q: 'How does Trader AI work?', a: 'You start by choosing a market and asking a question or uploading a chart. The AI provides structured observations about trends, price zones, and risk. You can then build strategy rules, backtest them against historical data, and practise in a paper trading account — all within one connected platform.' },
    { q: 'Does Trader AI guarantee profits?', a: 'No. Trading and investing always involve risk. AI-generated analysis can be incorrect, incomplete, or outdated. Trader AI does not guarantee profits, predict market movements, or provide risk-free trading. All trading decisions remain your own responsibility.' },
    { q: 'Is Trader AI suitable for beginners?', a: 'Trader AI provides educational risk tools and paper trading that may help beginners learn about markets in a simulated environment. However, trading carries real financial risk, and beginners should fully understand those risks before using real funds. Trader AI does not provide financial advice.' },
    { q: 'Does Trader AI use live market data?', a: 'We aim to use live or appropriately delayed market data where available. All data is clearly labelled as live, delayed, or illustrative. Check the data status indicator on any chart or analysis to understand what you are viewing.' },
    { q: 'What is paper trading?', a: 'Paper trading is a simulated trading environment that uses virtual funds and market data to mimic real trading. It allows you to practise your process without risking real capital. Paper trading does not fully reproduce live execution conditions, including liquidity, slippage, and emotional factors.' },
    { q: 'Are leaderboard results real?', a: 'The AI Trader Leaderboard currently displays illustrative simulations designed to demonstrate how strategies compare across risk and return dimensions. These are not live trading results. Every profile is clearly labelled with its data status.' },
    { q: 'Does Trader AI execute trades?', a: 'No. Trader AI does not execute trades, manage funds, or place orders on your behalf. It is a research and analysis platform only. You must use your own brokerage account for any actual trading.' },
    { q: 'Is Trader AI financial advice?', a: 'No. Trader AI does not provide personalised financial advice, investment recommendations, or regulated advisory services. The platform provides information and tools to support your own research. You remain fully responsible for your trading decisions.' },
    { q: 'How is user data handled?', a: 'We use industry-standard encryption and access controls to protect your data. We do not sell your personal information. For full details, see our <a href="#">Privacy Policy</a> and the <a href="/trust-centre/">Trust Centre</a>.' },
  ];

  /* --- Pricing Plans -------------------------------------- */
  ns.pricingPlans = [
    {
      name: 'Free',
      price: '£0',
      period: '',
      desc: 'Explore the platform and try core features.',
      featured: false,
      cta: 'Start Free',
      ctaLink: '/demo/',
      features: [
        'Guided platform demo',
        'Limited AI questions',
        'Limited chart analysis',
        'Sample strategy builder',
        'Sample backtest',
        'Public leaderboard',
        'Educational risk tools',
      ],
    },
    {
      name: 'Explorer',
      price: '[£XX]',
      period: '/month',
      desc: 'For traders who want deeper analysis and testing tools.',
      featured: true,
      cta: 'Join Explorer',
      ctaLink: '/demo/',
      features: [
        'Increased AI usage',
        'Chart analysis allowance',
        'Strategy Builder',
        'Backtesting',
        'Paper Trading',
        'Watchlists',
        'Risk tools',
        'Saved reports',
        'Standard support',
      ],
    },
    {
      name: 'Advanced',
      price: '[£XX]',
      period: '/month',
      desc: 'For experienced traders who need more power and flexibility.',
      featured: false,
      cta: 'Join Advanced',
      ctaLink: '/demo/',
      features: [
        'Higher AI usage',
        'Advanced strategy conditions',
        'Expanded backtesting',
        'Multiple paper accounts',
        'Advanced risk controls',
        'Alerts',
        'Exports',
        'Priority support',
        'Supported integrations',
      ],
    },
  ];

  /* --- Leaderboard Data (illustrative) -------------------- */
  ns.leaderboardData = [
    { rank: 1, trader: 'Trend Navigator V2', market: 'Forex', strategy: 'Trend Following', model: 'Ensemble LSTM', risk: 'Balanced', return: '+18.42', maxDrawdown: '-8.15', winRate: '58.3%', trades: 342, status: 'illustrative', period: '12 months' },
    { rank: 2, trader: 'Momentum Scout', market: 'Indices', strategy: 'Momentum', model: 'Transformer', risk: 'Active', return: '+22.10', maxDrawdown: '-14.30', winRate: '52.1%', trades: 215, status: 'illustrative', period: '12 months' },
    { rank: 3, trader: 'Mean Reversion Alpha', market: 'Forex', strategy: 'Mean Reversion', model: 'CNN-LSTM', risk: 'Balanced', return: '+12.75', maxDrawdown: '-5.90', winRate: '62.8%', trades: 498, status: 'illustrative', period: '12 months' },
    { rank: 4, trader: 'Breakout Hunter', market: 'Crypto', strategy: 'Breakout', model: 'GRU Ensemble', risk: 'Active', return: '+31.50', maxDrawdown: '-22.40', winRate: '44.6%', trades: 187, status: 'illustrative', period: '12 months' },
    { rank: 5, trader: 'Multi-Factor Select', market: 'Stocks', strategy: 'Multi-Factor', model: 'XGBoost + LSTM', risk: 'Balanced', return: '+15.88', maxDrawdown: '-9.20', winRate: '55.9%', trades: 276, status: 'illustrative', period: '12 months' },
    { rank: 6, trader: 'Range Trader Pro', market: 'Forex', strategy: 'Mean Reversion', model: 'LSTM', risk: 'Conservative', return: '+8.95', maxDrawdown: '-4.10', winRate: '67.4%', trades: 521, status: 'illustrative', period: '12 months' },
    { rank: 7, trader: 'Volatility Edge', market: 'Indices', strategy: 'Momentum', model: 'Transformer', risk: 'Active', return: '+19.60', maxDrawdown: '-16.80', winRate: '49.2%', trades: 198, status: 'illustrative', period: '12 months' },
    { rank: 8, trader: 'Swing Point Focus', market: 'Commodities', strategy: 'Trend Following', model: 'Ensemble', risk: 'Balanced', return: '+11.30', maxDrawdown: '-7.45', winRate: '56.1%', trades: 310, status: 'illustrative', period: '12 months' },
    { rank: 9, trader: 'Pattern Recognition AI', market: 'Crypto', strategy: 'Breakout', model: 'CNN', risk: 'Active', return: '+27.80', maxDrawdown: '-25.10', winRate: '41.3%', trades: 154, status: 'illustrative', period: '12 months' },
    { rank: 10, trader: 'Value Factor Trader', market: 'Stocks', strategy: 'Multi-Factor', model: 'XGBoost', risk: 'Conservative', return: '+9.45', maxDrawdown: '-5.20', winRate: '59.8%', trades: 234, status: 'illustrative', period: '12 months' },
  ];

  /* --- AI Trader Profiles --------------------------------- */
  ns.traderProfiles = [
    { slug: 'trend-navigator-v2', name: 'Trend Navigator V2', market: 'Forex', strategy: 'Trend Following', model: 'Ensemble LSTM', risk: 'Balanced', return: '+18.42', maxDrawdown: '-8.15', winRate: '58.3%', trades: 342, status: 'illustrative', period: 'Jan–Dec 2025', desc: 'Identifies sustained directional moves across major currency pairs using multi-timeframe trend confirmation. Combines moving-average crossovers with volume analysis.' },
    { slug: 'momentum-scout', name: 'Momentum Scout', market: 'Indices', strategy: 'Momentum', model: 'Transformer', risk: 'Active', return: '+22.10', maxDrawdown: '-14.30', winRate: '52.1%', trades: 215, status: 'illustrative', period: 'Jan–Dec 2025', desc: 'Captures short-term momentum bursts in equity indices using transformer-based pattern detection. Focuses on high-volatility sessions.' },
    { slug: 'mean-reversion-alpha', name: 'Mean Reversion Alpha', market: 'Forex', strategy: 'Mean Reversion', model: 'CNN-LSTM', risk: 'Balanced', return: '+12.75', maxDrawdown: '-5.90', winRate: '62.8%', trades: 498, status: 'illustrative', period: 'Jan–Dec 2025', desc: 'Exploits short-term price deviations from statistical means in currency pairs. Uses convolutional and recurrent layers to identify overextended moves.' },
    { slug: 'breakout-hunter', name: 'Breakout Hunter', market: 'Crypto', strategy: 'Breakout', model: 'GRU Ensemble', risk: 'Active', return: '+31.50', maxDrawdown: '-22.40', winRate: '44.6%', trades: 187, status: 'illustrative', period: 'Jan–Dec 2025', desc: 'Detects consolidation breakouts in cryptocurrency markets using volatility-expansion signals and volume confirmation.' },
    { slug: 'multi-factor-select', name: 'Multi-Factor Select', market: 'Stocks', strategy: 'Multi-Factor', model: 'XGBoost + LSTM', risk: 'Balanced', return: '+15.88', maxDrawdown: '-9.20', winRate: '55.9%', trades: 276, status: 'illustrative', period: 'Jan–Dec 2025', desc: 'Combines value, momentum, quality and sentiment factors to generate stock selection signals. Uses gradient-boosted trees with sequential deep learning.' },
    { slug: 'range-trader-pro', name: 'Range Trader Pro', market: 'Forex', strategy: 'Mean Reversion', model: 'LSTM', risk: 'Conservative', return: '+8.95', maxDrawdown: '-4.10', winRate: '67.4%', trades: 521, status: 'illustrative', period: 'Jan–Dec 2025', desc: 'Operates within identified price ranges on major currency pairs. Designed for higher-frequency, smaller-profit trades with tight risk controls.' },
  ];

  /* --- Signal Examples (illustrative) --------------------- */
  ns.signalExamples = [
    { market: 'EUR/USD', instrument: 'Spot FX', timeframe: '4H', scenario: 'Bullish continuation above 1.0820', entry: '1.0820 – 1.0840', target: '1.0920', invalidation: 'Below 1.0780', risk: 'Balanced', confidence: 'Moderate', dataSource: 'Illustrative analysis', generatedAt: '2026-07-27T08:30:00Z', status: 'illustrative', signalStatus: 'active' },
    { market: 'S&P 500', instrument: 'Index', timeframe: 'Daily', scenario: 'Pullback to support at 5,380', entry: '5,380 – 5,400', target: '5,520', invalidation: 'Below 5,340', risk: 'Balanced', confidence: 'Moderate', dataSource: 'Illustrative analysis', generatedAt: '2026-07-27T08:15:00Z', status: 'illustrative', signalStatus: 'active' },
    { market: 'BTC/USD', instrument: 'Spot', timeframe: '1H', scenario: 'Break above 63,200 resistance', entry: '63,200 – 63,500', target: '65,000', invalidation: 'Below 62,000', risk: 'Active', confidence: 'Low', dataSource: 'Illustrative analysis', generatedAt: '2026-07-27T07:45:00Z', status: 'illustrative', signalStatus: 'triggered' },
    { market: 'XAU/USD', instrument: 'Spot', timeframe: 'Daily', scenario: 'Bearish breakdown below 2,300', entry: '2,295 – 2,305', target: '2,250', invalidation: 'Above 2,330', risk: 'Balanced', confidence: 'Moderate', dataSource: 'Illustrative analysis', generatedAt: '2026-07-26T16:00:00Z', status: 'illustrative', signalStatus: 'expired' },
    { market: 'GBP/USD', instrument: 'Spot FX', timeframe: '4H', scenario: 'Range-bound between 1.2600–1.2700', entry: '1.2600 – 1.2620', target: '1.2700', invalidation: 'Below 1.2560', risk: 'Conservative', confidence: 'Moderate', dataSource: 'Illustrative analysis', generatedAt: '2026-07-26T14:20:00Z', status: 'illustrative', signalStatus: 'invalidated' },
    { market: 'DAX 40', instrument: 'Index', timeframe: 'Daily', scenario: 'Trend continuation above 18,200', entry: '18,200 – 18,280', target: '18,600', invalidation: 'Below 18,020', risk: 'Active', confidence: 'Moderate', dataSource: 'Illustrative analysis', generatedAt: '2026-07-25T09:00:00Z', status: 'illustrative', signalStatus: 'closed' },
  ];

  /* --- Risk Profiles -------------------------------------- */
  ns.riskProfiles = {
    conservative: {
      name: 'Conservative',
      positionSizeLimit: '1%',
      riskPerTrade: '0.5%',
      dailyLossLimit: '2%',
      maxOpenPositions: 3,
      totalExposure: '10%',
      leverageLimit: '2:1',
    },
    balanced: {
      name: 'Balanced',
      positionSizeLimit: '2%',
      riskPerTrade: '1%',
      dailyLossLimit: '3%',
      maxOpenPositions: 5,
      totalExposure: '20%',
      leverageLimit: '5:1',
    },
    active: {
      name: 'Active',
      positionSizeLimit: '3%',
      riskPerTrade: '2%',
      dailyLossLimit: '5%',
      maxOpenPositions: 8,
      totalExposure: '30%',
      leverageLimit: '10:1',
    },
  };

  /* --- Workflow Steps (homepage) -------------------------- */
  ns.homepageWorkflow = [
    { title: 'Choose a Market', desc: 'Select from forex, indices, commodities, crypto, stocks or ETFs.' },
    { title: 'Explore the Data', desc: 'Review charts, indicators and market conditions with AI context.' },
    { title: 'Review the Analysis', desc: 'Read AI-generated observations on structure, trend and risk.' },
    { title: 'Test the Idea', desc: 'Build a strategy rule, backtest it, or practise in paper trading.' },
    { title: 'Make Your Decision', desc: 'Use the information to inform your own trading decisions.' },
  ];

  /* --- Platform Features ---------------------------------- */
  ns.platformFeatures = [
    { icon: '🤖', title: 'AI Trading Assistant', desc: 'Ask market questions and receive structured research responses with supporting context, alternative scenarios and identified limitations.', link: '/ai-trading-assistant/', linkText: 'Explore the Assistant' },
    { icon: '📈', title: 'AI Chart Analyser', desc: 'Upload chart screenshots and receive organised analysis of visible trends, price zones, momentum and potential risk scenarios.', link: '/tools/ai-chart-analyser/', linkText: 'Analyse a Chart' },
    { icon: '⚙️', title: 'AI Strategy Builder', desc: 'Describe your strategy in everyday language and turn it into structured, testable trading rules without writing code.', link: '/ai-strategy-builder/', linkText: 'Build a Strategy' },
    { icon: '⏮️', title: 'Backtesting', desc: 'Test your strategy rules against historical data before you consider using them with real funds.', link: '/backtesting/', linkText: 'Run a Backtest' },
    { icon: '📝', title: 'Paper Trading', desc: 'Practise the process in a simulated environment before committing live capital.', link: '/paper-trading/', linkText: 'Start Paper Trading' },
    { icon: '🛡️', title: 'Risk Management', desc: 'Define position sizes, daily loss limits, exposure caps and strategy pause conditions before you trade.', link: '/risk-management/', linkText: 'Configure Risk Controls' },
  ];

  /* --- Navigation structure ------------------------------- */
  ns.navigation = {
    platform: [
      { label: 'AI Trading Platform', href: '/ai-trading-platform/' },
      { label: 'AI Trading Assistant', href: '/ai-trading-assistant/' },
      { label: 'AI Strategy Builder', href: '/ai-strategy-builder/' },
      { label: 'Paper Trading', href: '/paper-trading/' },
      { label: 'Risk Management', href: '/risk-management/' },
    ],
    aiTools: [
      { label: 'AI Chart Analyser', href: '/tools/ai-chart-analyser/' },
      { label: 'Backtesting', href: '/backtesting/' },
      { label: 'AI Trading Signals', href: '/ai-trading-signals/' },
    ],
    aiTraders: [
      { label: 'Leaderboard', href: '/ai-trader-leaderboard/' },
      { label: 'AI Traders Directory', href: '/ai-traders/' },
      { label: 'Performance Methodology', href: '/performance-methodology/' },
    ],
    company: [
      { label: 'Trust Centre', href: '/trust-centre/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Interactive Demo', href: '/demo/' },
      { label: 'Contact', href: '#' },
    ],
  };

})(TraderAIContent);
