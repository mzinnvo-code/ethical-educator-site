# Chromium Crash Prevention

The build should not launch Chrome or Chromium.

## Why Chromium Was Launching

The old prerender step used `react-snap`, which depends on Puppeteer and a bundled Chromium browser. That browser was not chosen because Chromium is better than Safari for this site; it was an inherited implementation detail of the prerendering tool.

The crash report showed Chromium 78 running as x86 code under Rosetta on an Apple Silicon Mac. That is an old browser/runtime combination for modern macOS, so repeated crashes during prerender are unsurprising.

## Why Not Safari

Safari is fine for human QA, but it is not a drop-in replacement for `react-snap`/Puppeteer. Safari automation uses a different WebDriver stack, and Playwright WebKit is a testing browser engine rather than the user's Safari app. For this SEO use case, the better fix is to avoid browser-driven prerendering entirely.

## Current Rule

- `npm run build` uses `scripts/prerender-site.mjs`, a browserless static renderer.
- Do not add Puppeteer, `react-snap`, or a bundled Chromium dependency back into the build.
- For local verification, prefer `npm run build`, `npm run test:crawlability`, route/static inspection, and `curl`.
- If visual QA is needed in Codex, use the in-app Browser backend only. Do not launch the user's Google Chrome browser or a local Chromium app.

