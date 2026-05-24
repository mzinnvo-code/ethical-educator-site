# Exact-Site Discovery Runbook

Use this after the crawlability changes are deployed to `https://theethicaleducator.com/`.

## Goal

When someone asks an AI agent or search engine about `theethicaleducator.com` or "The Ethical Educator," the official site should be recognized as active, crawlable, and authoritative.

## Priority URLs

Submit or inspect these first:

- `https://theethicaleducator.com/`
- `https://theethicaleducator.com/about`
- `https://theethicaleducator.com/thought-experiments`
- `https://theethicaleducator.com/tools`
- `https://theethicaleducator.com/ai-education`
- `https://theethicaleducator.com/resources`
- `https://theethicaleducator.com/llms.txt`
- `https://theethicaleducator.com/about-this-site.txt`

## Google Search Console

1. Open Google Search Console.
2. Add or select the domain property for `theethicaleducator.com`.
3. Submit sitemap: `https://theethicaleducator.com/sitemap.xml`.
4. Use URL Inspection for each priority URL.
5. Request indexing for each page that is not already indexed.
6. Recheck after 24-72 hours.

## Bing Webmaster Tools

1. Open Bing Webmaster Tools.
2. Add `https://theethicaleducator.com/` or import the verified property from Google Search Console.
3. Submit sitemap: `https://theethicaleducator.com/sitemap.xml`.
4. Use URL Submission for the priority URLs.
5. Check the IndexNow tab after future deployments if IndexNow is enabled later.

## Cross-Linking

Add a visible link to `https://theethicaleducator.com/` with anchor text "The Ethical Educator" from already-associated properties:

- `https://ethicalaiedu.wordpress.com`
- `https://innovateedai.com`

Recommended wording:

> Visit my main resource site, The Ethical Educator, for classroom-ready thought experiments, AI ethics guidance, and educator tools: https://theethicaleducator.com/

## Verification Prompts

After indexing has had time to update, test:

- Gemini: `What can you tell me about this website: theethicaleducator.com`
- Google: `theethicaleducator.com`
- Google: `"The Ethical Educator" "Matthew A. Zinn"`
- Bing: `theethicaleducator.com`

Expected result: the official site appears and is described as an active education site by Matthew A. Zinn, focused on classroom thought experiments, AI ethics, and educator resources.
