# Search Visibility Baseline

Updated: 2026-05-28

This is the baseline immediately after the first organic-growth implementation and deployment.

## Current Site-Controlled Evidence

- Live sitemap returns `200`: `https://examinedclassroom.com/sitemap.xml`
- IndexNow key file is live: `https://examinedclassroom.com/6a7ee777-5ff8-42b6-af77-abed93f2db29.txt`
- IndexNow submission returned `202 Accepted` for 20 priority URLs on 2026-05-28.
- Priority landing pages and standalone teaching-resource pages are in the sitemap and prerendered HTML.
- Homepage structured data names the main search-intent collections and standalone `LearningResource` pages.
- Custom analytics Worker accepted a live test event with `204`.
- Repeatable public check: `npm run seo:offsite-check`

## Current External Evidence

- A fresh fetch of `https://ethicalaiedu.wordpress.com` did not expose `examinedclassroom.com` or `The Examined Classroom` in homepage HTML.
- A fresh fetch of `https://innovateedai.com` did not expose `examinedclassroom.com` or `The Examined Classroom` in homepage HTML.
- `https://innovateedai.com` response headers show `server: gamma`, so backlink edits require Gamma site editor access unless the live source moves.
- Connected GitHub access currently exposes the main Examined Classroom site repository, `mzinnvo-code/boricua-flashcards`, and `mzinnvo-code/soxl-soxs-agent`; it does not expose a WordPress or InnovateEdAI deployment repo.
- Available connectors in this Codex session do not include Google Search Console, Bing Webmaster Tools, WordPress, or Gamma.

## Search Baseline

General web search checks for target terms did not return `examinedclassroom.com` in the first returned result set for:

- `examinedclassroom.com "AI Ethics Lesson Plans"`
- `examinedclassroom.com "Paperclip Maximizer Classroom Packet"`
- `examinedclassroom.com "The Examined Classroom"`

This is expected immediately after launch. Use Google Search Console and Bing Webmaster Tools as the authoritative measurement sources once account access is available.

## Next Account-Access Actions

See `docs/offsite-seo-action-pack.md` for exact paste-ready steps:

- Submit sitemap and inspect priority URLs in Google Search Console.
- Add/import the property in Bing Webmaster Tools and submit sitemap.
- Add visible backlinks from `ethicalaiedu.wordpress.com` and `innovateedai.com`.
