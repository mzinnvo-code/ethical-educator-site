# Syndication Feeds — `/feed.xml` and `/feed.json`

The site publishes two feeds of the "What's New" changelog so teachers using readers (Feedly, Inoreader, NetNewsWire, etc.) can subscribe and get updates without remembering to visit the site.

| Format | URL | Spec |
|---|---|---|
| RSS 2.0 | `https://theethicaleducator.com/feed.xml` | [rss-specifications.com](https://www.rssboard.org/rss-specification) |
| JSON Feed 1.1 | `https://theethicaleducator.com/feed.json` | [jsonfeed.org/version/1.1](https://www.jsonfeed.org/version/1.1/) |

Both are advertised via `<link rel="alternate">` tags in `index.html` so reader apps and browser extensions discover them automatically when a visitor lands on any page.

## How they're generated

Source of truth is `src/data/whatsNew.js` (the same array that powers the homepage "What's new" module and the `/whats-new` archive page). At build time, `scripts/generate-feeds.mjs` reads that array, sorts reverse-chron, and writes:

- `dist/feed.xml` — RSS 2.0 with Dublin Core (`dc:creator`) and Atom (`atom:link rel="self"`) extensions
- `dist/feed.json` — JSON Feed 1.1 with author block, tags, and ISO 8601 dates

The script runs after `vite build` (chained in `package.json`'s `build` script), so every deploy emits fresh feeds.

## To add an entry

Append a new object to `WHATS_NEW` in `src/data/whatsNew.js`. The homepage module, the `/whats-new` archive page, `feed.xml`, and `feed.json` all update on the next deploy.

## To test locally

```bash
npm run build
ls dist/feed.*           # confirms both files emitted
cat dist/feed.xml | head -25
cat dist/feed.json | jq '.items[0]'   # if you have jq installed
```

Validate the RSS feed externally with [validator.w3.org/feed](https://validator.w3.org/feed/) after deploy. Validate JSON Feed with [validator.jsonfeed.org](https://validator.jsonfeed.org/).

## Auto-discovery test

```bash
curl -s https://theethicaleducator.com | grep -E 'alternate.*(rss|feed\+json)'
```

Should return both `<link>` tags.

## Why both formats

- **RSS 2.0** is the legacy standard. Every reader app supports it. Required for discoverability in the broader ecosystem.
- **JSON Feed 1.1** is the modern alternative — cleaner spec, easier to consume from a script, no XML parsing footguns. Many newer readers prefer it.

Cost: ~3KB total per build. The script runs in <100ms.

## Future enhancements

- **Per-section feeds** (e.g., `/feed-thought-experiments.xml`) if subscribers want to filter. Defer until we see actual subscriber traffic patterns.
- **Atom 1.0** as a third format — most readers handle both RSS 2.0 and JSON Feed, so Atom is rarely missed. Skip unless a specific subscriber needs it.
- **WebSub / PubSubHubbub** for push notifications to subscribed readers. Overkill for weekly cadence.
