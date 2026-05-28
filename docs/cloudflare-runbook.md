# Cloudflare Setup Runbook — Session 1

What *you* (Matt) need to do in the Cloudflare dashboard to finish Session 1. Estimated time: 10–15 minutes. None of this requires the orange-cloud proxy or any DNS surgery — your site stays on GitHub Pages.

Once you've done this, the analytics beacon is live and pageviews/Core Web Vitals start collecting immediately.

---

## Step 1 — Add the site in Web Analytics (5 min)

1. Go to https://dash.cloudflare.com and log in.
2. In the left sidebar (or top nav, depending on dashboard version), open **Analytics & Logs → Web Analytics**.
3. Click **Add a site**.
4. **Hostname**: `examinedclassroom.com`
5. **Automatic setup** options will appear. Since GitHub Pages is the actual origin (we're DNS-only, not proxied), choose **"Enable, with JS Snippet installation"** — this gives you a manual snippet to paste into our HTML.
   - (If Cloudflare only offers Automatic for proxied sites and you're DNS-only, you'll just be asked for a hostname and given the snippet directly — that's expected.)
6. Click **Done**.

Cloudflare will display a snippet that looks like:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "abc123def456..."}'></script>
```

**Copy the `token` value** (the long alphanumeric string). That's all we need.

---

## Step 2 — Paste the token into the repo (2 min)

Open `index.html` at the repo root. Find this block I left ready for you near the bottom of `<head>`:

```html
<!-- Cloudflare Web Analytics -->
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "REPLACE_WITH_CLOUDFLARE_TOKEN", "spa": true}'></script>
```

Replace `REPLACE_WITH_CLOUDFLARE_TOKEN` with the token from Step 1. Save, commit, push — GitHub Actions will redeploy in 1–2 minutes.

> **Why `"spa": true`?** This site is a single-page application; the SPA flag tells the beacon to send a pageview on every client-side route change, not just the initial load. Without it, you'd only see pageviews for the entry page each visit.

---

## Step 3 — Verify it's working (3 min)

After the deploy finishes:

1. Visit https://examinedclassroom.com in a fresh incognito window.
2. Click through 2–3 pages.
3. Open https://dash.cloudflare.com/?to=/:account/web-analytics → select your site.
4. Within 1–2 minutes, you should see pageviews tick up. Wait 24 hours for the full dashboard (referrers, top pages, Core Web Vitals) to populate meaningfully.

---

---

## Step 4 — Deploy the `examined-classroom-events` Worker (5 min)

This custom event Worker is deployed at the `examined-classroom-events` `workers.dev` URL printed by Wrangler. It unlocks the custom events (scroll depth, newsletter clicks, PDF downloads, SEO pathway clicks) that Cloudflare Web Analytics can't capture on its own. Full details in `workers/events/README.md`.

For future redeploys, the short version is:

```bash
cd workers/events
npm install
npx wrangler login        # opens browser; auth once
npm run deploy
```

Wrangler prints something like:
```
Published examined-classroom-events
  https://examined-classroom-events.<your-subdomain>.workers.dev
```

If the Worker URL changes, update `src/lib/analytics.js` at the repo root. The current value is built from the Worker name and Cloudflare account subdomain parts:

```js
const WORKER_ACCOUNT_PARTS = ["the", "ethical", "educator"];
const ANALYTICS_ENDPOINT = `https://examined-classroom-events.${WORKER_ACCOUNT_PARTS.join("")}.workers.dev/events`;
```

Commit, push, GitHub Actions redeploys. Custom events start landing in the `examined_classroom_events` Analytics Engine dataset within a few seconds of the first user interaction.

To verify: run `npm run tail` in `workers/events/`, then visit the live site and scroll a long-form page — you'll see request entries stream into the terminal. Query the dataset with SQL examples in `docs/analytics-playbook.md`.

---

## What's intentionally NOT in this runbook

- **Orange-cloud proxy** — not needed for analytics; not enabling it avoids any GitHub Pages SSL cert renewal complications. Revisit if/when we want Cloudflare cache rules, WAF, or edge security headers.
- **Cache rules and security headers** — deferred along with the proxy decision above.

---

## Troubleshooting

**"I don't see the Web Analytics option in my dashboard."**  
Make sure you're in the account named `Mzinnvo@icloud.com's Account` (the one Claude can see via MCP). Top-right account switcher.

**"The token format doesn't match the example."**  
That's fine — Cloudflare may update the snippet format. Just copy whatever string appears after `"token":` in their snippet and paste it into the same spot in our `index.html`. Don't paste the full Cloudflare snippet — keep the one I left in `index.html` so the SPA flag is preserved.

**"Pageviews aren't showing up after deploy."**  
1. View source on the live site and confirm the beacon script tag is present in `<head>`.
2. Open DevTools → Network → reload → look for a request to `static.cloudflareinsights.com/beacon.min.js`. If 404 or blocked, the snippet didn't load.
3. Also look for a request to `cloudflareinsights.com/cdn-cgi/rum` on page interaction — that's the beacon reporting in.

**"I'm seeing duplicate or inflated pageviews."**  
Probably the SPA flag is causing it to count the initial pageview twice (once as the entry, once as the first SPA "navigation"). Open an issue and we'll add a guard in `App.jsx`.
