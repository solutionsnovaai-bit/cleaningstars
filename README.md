# Cleaning Stars

Vite + React site for Cleaning Stars (London cleaning & property services).

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Deploy to Vercel

Push this folder to a GitHub repo and import it in Vercel — `vercel.json` already sets the
Vite framework, build command and output directory, so no extra configuration is needed.

## Structure

- `src/App.jsx` — the whole page (header, hero, services, sections, contact form, footer).
- `src/behaviors.js` — scroll reveals, sticky-media crossfade, magnetic buttons, WhatsApp
  float, loader, marquee speed, rotating word, and the generic hover/focus style handler
  (elements carry `data-hover`/`data-focus`/`data-active` raw-CSS attributes).
- `src/utils.js` — `css()`, a tiny inline-CSS-string → React style object helper.
- `public/assets` — brand and gallery imagery.

## Tunable props

`App` accepts `accentPink`, `loopSpeed`, `showLoader`, `sparkleHover` — pass them from
`main.jsx` to retheme without touching markup.
