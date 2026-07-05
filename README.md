# Manifest — Ecommerce Ops Dashboard

A SaaS-style analytics dashboard for an ecommerce operation, built with React,
React Router, Tailwind CSS, and Recharts. Data is pulled live from
[DummyJSON](https://dummyjson.com/), a free fake REST API, so the app runs
with zero backend setup.

## Why this project

Built as a portfolio piece to demonstrate:
- Real async data fetching with proper loading / error / empty states (not
  just the happy path)
- Deriving dashboard-shaped data (revenue by category, top customers, order
  sorting) from a raw, non-dashboard-shaped API
- Client-side search, filtering, and sorting
- A distinct, non-templated visual identity (see Design notes below)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/            DummyJSON client + generic useFetch hook
  components/     Sidebar, Topbar, StatCard, shared loading/error states
  pages/          Overview, Products (Inventory), Orders, Customers
  utils/          Data transforms (revenue aggregation, currency formatting)
```

## A note on the data

DummyJSON's `/carts` endpoint (used here to represent orders) has no order
timestamp field. Rather than inventing fake dates and presenting them as
real, the revenue trend chart on the Overview page deterministically
distributes carts across a 14-day window and is explicitly labeled
"Simulated timeline" in the UI. Everything else (prices, stock levels,
categories, customer info) is real data returned by the API.

## Design notes

The visual direction leans into a "shipping manifest / logistics ledger"
concept rather than a generic SaaS template:
- Ink navy background with paper-white text and an amber "shipping label"
  accent
- Space Grotesk for headings, Inter for body text, JetBrains Mono for all
  numeric data (prices, IDs, stats) — so the data reads like a manifest
- Stat cards are styled as tear-off tickets with a perforated edge

## Possible extensions

- Swap DummyJSON for a real backend (the `api/dummyjson.js` client is a thin
  wrapper that's easy to replace)
- Add date-range filtering once a real order-date field exists
- Add a product detail drawer / order detail modal
- Persist filters in the URL query string
