# Manifest — Ecommerce Ops Dashboard

A SaaS-style analytics dashboard for ecommerce operations, built with React, React Router, Tailwind CSS, and Recharts. To keep the application running with zero backend overhead, I integrated live data pulling directly from DummyJSON.

## Why this project

I built this dashboard as a portfolio piece to tackle and demonstrate real-world frontend challenges, specifically focusing on:
- Robust Async Lifecycle: I implemented real data fetching architectures that gracefully handle not just the "happy path," but also proper loading spinners, network errors, and empty UI states.
- Complex Data Transformation: Because raw REST APIs rarely return data shaped for analytics, I wrote utility functions to derive dashboard metrics—like calculating aggregate revenue by product categories and ranking top-spending customers—entirely on the client side.
- Client-Side Interactivity: I built fast, responsive client-side search, multi-attribute filtering, and columns-sorting systems across the inventory and order management views.
- Custom Design Execution: I bypassed standard UI kits to build a distinct, highly deliberate visual identity from scratch (detailed below).

## Technical Architecture & Structure
The repository is organized cleanly by concern to make it scalable and easy to maintain:
```
src/
  ├── api/         # DummyJSON API client + a generic, reusable useFetch hook
  ├── components/  # Core layout (Sidebar, Topbar), StatCards, and reusable UI states
  ├── pages/       # View layers: Overview, Products (Inventory), Orders, Customers
  └── utils/       # Pure functions for data aggregation, sorting, and currency formatting
```

The Data Challenge (Handling /carts)
While integrating the API, I ran into a real-world constraint: DummyJSON's /carts endpoint (which I use to populate the Orders dashboard) doesn't include order timestamps.

Instead of generating arbitrary fake dates that could mislead users, I chose to handle this transparently. I wrote a utility that deterministically distributes the incoming carts across a 14-day window. I also explicitly labeled the revenue trend chart on the Overview page as a "Simulated timeline" in the UI. Every other metric—prices, stock levels, categories, and customer profiles—is driven entirely by real, live API data.

## Design System

The visual direction rejects generic SaaS templates, leaning heavily into a "shipping manifest / logistics ledger" aesthetic:

- Color Palette: Built around an ink-navy background, high-contrast paper-white text, and a distinct amber accent inspired by industrial shipping labels.

- Typography Hierarchy: I paired Space Grotesk for headings with Inter for clean body readability. For data integrity, I set all numeric values (prices, IDs, stats) in JetBrains Mono so they line up perfectly like a printed manifest.

- UI Accents: Stat cards are styled custom using Tailwind utilities to mimic tear-off logistics tickets with a perforated edge.

## Getting started

To run this project locally, clone the repository and run the following commands in your terminal:

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

## Future Roadmap

Things I plan to add to the application next:
- [ ] Backend Swap: Transition the api/dummyjson.js wrapper to connect to a live production database.

- [ ] URL State Persistence: Sync active search filters and sorting configurations into URL query strings so dashboard views are easily shareable.

- [ ] Detail Overlays: Implement slick sliding detail drawers for product management and dedicated modal overlays for individual order histories.