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
  float, loader, marquee speed and on-demand loading, before/after carousel, rotating word, and the generic hover/focus style handler
  (elements carry `data-hover`/`data-focus`/`data-active` raw-CSS attributes).
- `src/utils.js` — `css()`, a tiny inline-CSS-string → React style object helper.
- `public/assets` — the imagery the site actually serves, already resized and saved as WebP:
  - `brand/` — logos, favicon and the social-share image.
  - `hero/` — `hero-mobile-*` (logo on white, shown above the copy up to 1020px wide) and
    `hero-desktop-*` (full-bleed background above that).
  - `gallery/` — each photo in three widths (`g1-480.webp`, `g1-800.webp`, `g1-1200.webp`).
  - `before-after/` — one `-before` and one `-after` crop per job, in 320 and 600px widths.
- `originals/` — the full-size source files. Not deployed; keep them for future re-exports.

## Adding photos

- Gallery photo: export 480 / 800 / 1200px-wide WebP files into `public/assets/gallery`, add its
  pixel size to `GAL` at the top of `src/App.jsx`, then add it to the `gal` list.
- Before / after: export both halves at 4:5 (320 and 600px wide) into
  `public/assets/before-after` as `<name>-before-600.webp` etc. and add a line to `results` in
  `src/App.jsx`.
- When replacing a photo, give the new file a new name — browsers cache `/assets` for an hour.

## Tunable props

`App` accepts `accentPink`, `loopSpeed`, `showLoader`, `sparkleHover` — pass them from
`main.jsx` to retheme without touching markup.
