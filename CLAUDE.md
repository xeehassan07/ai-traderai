# Trader AI — Project Context

## Overview
Trader AI is a premium fintech website for an AI-assisted trading platform. It provides market research, chart analysis, strategy building, backtesting, paper trading and risk management tools. The site is lead-generation-focused with 15 SEO-optimised pages.

## Tech Stack
- Static HTML/CSS/JS (no framework)
- Vanilla JS component system (see `js/core.js` and `js/components.js`)
- CSS custom properties in `css/main.css`
- Content data in `content/data.js`
- Google Fonts: Manrope

## Architecture

```
css/main.css          — Single comprehensive stylesheet
js/utils.js           — Utility functions (TraderAI namespace)
js/config.js          — Runtime configuration (window.TRADERAI_CONFIG)
js/core.js            — Component loader: mounts header, footer, breadcrumbs, mobile nav, FAQ accordions
js/components.js      — Reusable HTML generators (PageHero, FeatureGrid, CTASection, etc.)
js/forms.js           — Lead capture form with validation, UTM capture, loading/success/error states
js/market-ticker.js   — Market ticker with fallback states
content/data.js       — Structured content: FAQs, pricing plans, leaderboard data, trader profiles, signals, risk profiles
```

## Design System

### Colours
- Primary: White `#FFFFFF`, Off-white `#F6F8FB`, Light surface `#EEF2F7`
- Navy: Deep `#081D36`, Navy `#0B284B`, Medium `#173B63`
- Muted: `#64748B`
- Accent: `#2F75D6` (sparingly, interactive states only)

### Typography
- Font: Manrope, Inter, Arial, sans-serif
- Hero H1: 38-56px, H2: 28-44px, H3: 20-28px, Body: 16px

### Principles
- Premium fintech, not crypto landing page
- No fake profit claims, testimonials, urgency, or fabricated stats
- All data clearly labelled: Live, Delayed, Paper, Backtested, Illustrative
- Risk warnings on every page
- Accessible, WCAG-friendly

## Pages (15 routes)
1. `/` — Home
2. `/demo/` — Interactive Demo
3. `/tools/ai-chart-analyser/` — AI Chart Analyser
4. `/ai-trading-assistant/` — AI Trading Assistant
5. `/ai-strategy-builder/` — AI Strategy Builder
6. `/ai-trader-leaderboard/` — AI Trader Leaderboard
7. `/ai-traders/` — AI Traders Directory
8. `/backtesting/` — Backtesting
9. `/paper-trading/` — Paper Trading
10. `/risk-management/` — Risk Management
11. `/performance-methodology/` — Performance Methodology
12. `/trust-centre/` — Trust Centre
13. `/pricing/` — Pricing
14. `/ai-trading-platform/` — AI Trading Platform
15. `/ai-trading-signals/` — AI Trading Signals

## Adding a New Page
1. Create the HTML file in the appropriate directory
2. Include the standard `<head>` with SEO meta, canonical, OG, Twitter card
3. Add `<header id="site-header">` and `<footer id="site-footer">` placeholders
4. Add `<nav class="breadcrumbs" id="breadcrumbs">` for breadcrumbs
5. Include all JS scripts at bottom: utils.js, components.js, data.js, ticker.js, forms.js, core.js
6. Add JSON-LD structured data
7. Add page-specific JS in a `<script>` tag at bottom if needed
8. Add to sitemap.xml
9. Update navigation if needed (in `js/core.js` buildHeader function)

## Lead Forms
Use `TraderAI.renderLeadForm(containerSelector, options)` — see `js/forms.js`
- Fields: first_name, email, primary_market, trading_experience
- Never require phone number on first step
- Includes UTM capture, privacy checkbox, loading/success/error states

## Placeholders
Legal/regulatory information uses `[placeholder text]` — do not invent:
- Legal entity names, registration numbers, addresses
- Regulatory statements
- Execution providers, market data providers
- Support emails, security contacts
- Final paid pricing

## Content Rules
- NO: guaranteed profit, risk-free, fake testimonials, fake urgency, fake user counts
- YES: risk disclaimers, data labelling, methodology transparency, clear limitations
