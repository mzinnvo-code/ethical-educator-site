# Exact-Site Discovery Runbook

Use this after the crawlability changes are deployed to `https://examinedclassroom.com/`.

## Goal

When someone asks an AI agent or search engine about `examinedclassroom.com` or "The Examined Classroom," the official site should be recognized as active, crawlable, and authoritative.

## Priority URLs

Submit or inspect these first:

- `https://examinedclassroom.com/`
- `https://examinedclassroom.com/about`
- `https://examinedclassroom.com/thought-experiments`
- `https://examinedclassroom.com/tools`
- `https://examinedclassroom.com/ai-education`
- `https://examinedclassroom.com/ai-ethics-lesson-plans`
- `https://examinedclassroom.com/thought-experiments-for-kids`
- `https://examinedclassroom.com/ai-literacy-activities`
- `https://examinedclassroom.com/school-ai-policy-tools`
- `https://examinedclassroom.com/academic-integrity-ai-discussions`
- `https://examinedclassroom.com/philosophy-for-kids`
- `https://examinedclassroom.com/teaching-resources/paperclip-maximizer`
- `https://examinedclassroom.com/teaching-resources/consciousness-line`
- `https://examinedclassroom.com/resources`
- `https://examinedclassroom.com/llms.txt`
- `https://examinedclassroom.com/about-this-site.txt`

## Google Search Console

1. Open Google Search Console.
2. Add or select the domain property for `examinedclassroom.com`.
3. Submit sitemap: `https://examinedclassroom.com/sitemap.xml`.
4. Use URL Inspection for each priority URL.
5. Request indexing for each page that is not already indexed.
6. Recheck after 24-72 hours.

## Bing Webmaster Tools

1. Open Bing Webmaster Tools.
2. Add `https://examinedclassroom.com/` or import the verified property from Google Search Console.
3. Submit sitemap: `https://examinedclassroom.com/sitemap.xml`.
4. Use URL Submission for the priority URLs.
5. Check the IndexNow tab after future deployments.

## IndexNow

IndexNow is wired as a no-cost supplement for search engines that support the protocol. It does not replace Google Search Console or Bing Webmaster Tools, but it gives Bing and other participating engines a fresh-content signal after releases.

- Key file: `https://examinedclassroom.com/6a7ee777-5ff8-42b6-af77-abed93f2db29.txt`
- Submission script: `npm run seo:indexnow`
- Dry run: `npm run seo:indexnow -- --dry-run`

Run the submission script only after the key file and updated pages are live.

## Cross-Linking

Add a visible link to `https://examinedclassroom.com/` with anchor text "The Examined Classroom" from already-associated properties:

- `https://ethicalaiedu.wordpress.com`
- `https://innovateedai.com`

Recommended wording:

> Visit my main resource site, The Examined Classroom, for classroom-ready thought experiments, AI ethics guidance, and educator tools: https://examinedclassroom.com/

Paste-ready copy for WordPress, Gamma, and outreach is in `docs/offsite-seo-action-pack.md`.

## Verification Prompts

After indexing has had time to update, test:

- Gemini: `What can you tell me about this website: examinedclassroom.com`
- Google: `examinedclassroom.com`
- Google: `"The Examined Classroom" "Matthew A. Zinn"`
- Bing: `examinedclassroom.com`

Expected result: the official site appears and is described as an active education site by Matthew A. Zinn, focused on classroom thought experiments, AI ethics, and educator resources.
