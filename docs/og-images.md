# Open Graph (OG) Image Generator

Tier 2 #14. Every page listed in `src/data/ogPages.js` gets its own 1200×630 social-share card emitted at build time. Pages NOT listed fall back to the default site OG image (set in `index.html`).

When someone shares `theethicaleducator.com/moral-psych` on Twitter/X, LinkedIn, Slack, iMessage, or any social tool, the preview now shows a branded card with the page's title and section — not a generic stock image.

## What ships

- **`src/data/ogPages.js`** — Curated list of 25 most-shareable pages with `{ id, title, section, accent }`. Hard-coded color tokens so the build script (running in node) doesn't have to import the React theme module.
- **`scripts/generate-og-images.mjs`** — Reads `OG_PAGES`, renders an SVG card for each page, converts to PNG via `@resvg/resvg-js` (pure JS, no native deps). Outputs to `dist/og/<page-id-with-slashes-flattened>.png`. Runs after `vite build` via `npm run build` (chained in `package.json`). Manual one-off: `npm run og:generate`.
- **`src/App.jsx`** — Per-page meta updater now sets `og:image`, `og:url`, `og:title`, `og:description`, `twitter:image`, `twitter:title`, `twitter:description` based on `currentPage`. Pages in `OG_PAGES_BY_ID` get their custom card; others fall back to the default.

## Card design

- 1200×630 (the canonical Twitter/LinkedIn/Facebook OG size)
- Dark navy background (`#0b1622`) with a subtle accent gradient
- 14px left stripe in the page's accent color
- Brand mark + name in the top-left (Source Serif fallback to Georgia)
- Section eyebrow in uppercase letterspacing
- Big serif title (auto-wrapped to 4 lines max)
- Author byline (italic, bottom-left)
- `theethicaleducator.com` domain in monospace (bottom-right)

Per-card size: ~60–105KB PNG. Total for all 25 cards: ~2MB.

## To add a card for a new page

1. Open `src/data/ogPages.js`.
2. Append:
   ```js
   { id: "your-page-slug", title: "Short title", section: "Eyebrow label", accent: OG_ACCENTS.teal },
   ```
3. Commit; the card regenerates on the next build.

## To verify on social

After deploy, paste a page URL into:

- [Twitter/X Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (works for OG generally)
- [opengraph.xyz](https://www.opengraph.xyz/) (combined check)

These tools cache aggressively. After updating `OG_PAGES`, the per-platform debugger has a "Scrape Again" button to refresh.

## Fonts

The script uses system fonts (Georgia for serif, Helvetica Neue / Arial for sans, JetBrains Mono / Courier for mono). To bundle the actual Source Serif 4 family for closer brand fidelity:

1. Download the TTF files from [Google Fonts](https://fonts.google.com/specimen/Source+Serif+4) into `scripts/fonts/`.
2. Update the Resvg constructor in `scripts/generate-og-images.mjs`:
   ```js
   font: {
     loadSystemFonts: false,
     fontFiles: ["./scripts/fonts/SourceSerif4-Regular.ttf", "./scripts/fonts/SourceSerif4-Bold.ttf"],
     defaultFontFamily: "Source Serif 4",
   }
   ```
3. Update the SVG `font-family` strings to `"Source Serif 4"`.

System fonts are good enough for v1. Bundling the brand font is a polish item.

## Why not Satori?

Satori (Vercel's library) is the popular choice — JSX-like API, great typography. It's also heavier (~200KB), pulls in yoga-layout, and is fussier about font loading. For a card with simple shapes and text, raw SVG + Resvg is smaller, faster, and easier to reason about.
