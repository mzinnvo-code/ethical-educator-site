# Analytics Playbook

What to look at in Cloudflare Web Analytics each week, and what we can and cannot measure today.

For the organic search program, pair this with `docs/organic-growth-dashboard.md`.

## What ships in Session 1

**Live as soon as you create the Web Analytics site in the Cloudflare dashboard and paste the token into `index.html`:**

- Pageviews per URL (including SPA route changes)
- Top pages by visits
- Top referrers (where traffic comes from)
- Visitor counts (unique by IP+UA hash, no cookies)
- Core Web Vitals (LCP, FID, CLS, INP) per page
- Device class (mobile / tablet / desktop) and browser breakdown

**Cookieless, no consent banner required, no PII collected.** Cloudflare Web Analytics is GDPR/CCPA-clean by design.

## Custom events (via the `examined-classroom-events` Worker)

For events Cloudflare Web Analytics can't capture — scroll depth, newsletter clicks, PDF downloads — we use a small Cloudflare Worker (`workers/events/`) that writes to the `examined_classroom_events` Workers Analytics Engine dataset. Cost: free up to 10M writes/month + 1M queries/month.

**Setup is one-time, ~5 min.** See `workers/events/README.md` for the full deploy steps. The short version:

```bash
cd workers/events
npm install
npx wrangler login
npm run deploy
```

Copy the printed `*.workers.dev` URL into `src/lib/analytics.js` (replace `REPLACE_WITH_WORKER_URL`), commit, push. Done.

## Verifying the instrumentation works

**Before Worker deploy (buffer-only mode):**

1. Open the site in a private browser window, the Codex in-app Browser, or use local `curl`/static checks when browser automation is not needed.
2. Open DevTools → Console.
3. Scroll a long-form page (e.g., `/moral-psych`) to 50%.
4. Type `window.__examinedClassroomEvents` and Enter — you should see an array with `scroll_depth` events.

**After Worker deploy (live mode):**

5. Same scroll test. In the Network tab, you should see POSTs to the Worker URL returning 204.
6. Run `npm run tail` in `workers/events/` to see real-time Worker logs.
7. After ~30 seconds (Analytics Engine flush delay), query the dataset via SQL (examples below).

## Dataset schema

Each event written to `examined_classroom_events` looks like:

| Field | Meaning |
|---|---|
| `index` | Event name (sampling key) |
| `blob1` | Event name |
| `blob2` | URL pathname |
| `blob3` | `placement` (e.g. `"footer"`, `"inline"`, `"modal"` for newsletter) |
| `blob4` | `page` / `slug` (e.g. `"moral-psych"` or a PDF slug) |
| `blob5` | Country code (from `cf-ipcountry`) |
| `double1` | Milestone percent (for `scroll_depth`) |
| `double2` | `1` (count — use with `SUM(_sample_interval * double2)`) |
| `timestamp` | Automatic |

## Useful SQL queries

You'll need an API token (Profile → API Tokens → Create Custom Token → Account Analytics → Read). Account ID is `00cbe989709cb5c738910120b128e8f5`.

```bash
export CF_ACCT=00cbe989709cb5c738910120b128e8f5
export CF_TOKEN=…   # your read token

cf_sql() {
  curl -s "https://api.cloudflare.com/client/v4/accounts/$CF_ACCT/analytics_engine/sql" \
    -H "Authorization: Bearer $CF_TOKEN" --data "$1"
}
```

**Top events by volume, last 7 days:**

```sql
SELECT blob1 AS event, SUM(_sample_interval) AS count
FROM examined_classroom_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY event ORDER BY count DESC
```

**Scroll completion rate by page (last 7 days):**

```sql
SELECT blob4 AS page,
       SUM(IF(double1 >= 75, _sample_interval, 0)) AS reached_75,
       SUM(_sample_interval) AS total
FROM examined_classroom_events
WHERE blob1 = 'scroll_depth' AND timestamp > NOW() - INTERVAL '7' DAY
GROUP BY page ORDER BY total DESC
```

**Newsletter signup clicks by placement (last 28 days):**

```sql
SELECT blob3 AS placement, SUM(_sample_interval) AS clicks
FROM examined_classroom_events
WHERE blob1 = 'newsletter_signup_click' AND timestamp > NOW() - INTERVAL '28' DAY
GROUP BY placement ORDER BY clicks DESC
```

**SEO resource pathway clicks (last 28 days):**

```sql
SELECT blob1 AS event, blob3 AS placement, blob4 AS page, SUM(_sample_interval) AS clicks
FROM examined_classroom_events
WHERE blob1 IN ('seo_landing_click', 'teaching_resource_click', 'related_resource_rail_click')
  AND timestamp > NOW() - INTERVAL '28' DAY
GROUP BY event, placement, page ORDER BY clicks DESC
```

**Top downloaded PDFs (last 30 days):**

```sql
SELECT blob4 AS resource, SUM(_sample_interval) AS downloads
FROM examined_classroom_events
WHERE blob1 = 'pdf_download' AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY resource ORDER BY downloads DESC LIMIT 20
```

## Weekly review checklist

Open `https://dash.cloudflare.com/?to=/:account/web-analytics`, pick the site, and scan:

### Volume & growth
- Total pageviews this week vs. prior week
- Unique visitors this week vs. prior week
- Trend over 28 days — is the line going up?

### What's resonating
- Top 10 pages by visits — are the thought experiments and AI ethics pages the leaders?
- Top 10 referrers — where is new traffic coming from? (Twitter/X, Reddit education subs, Hacker News, Google?)
- Country breakdown — US-heavy is expected; surprise traffic from EU/Asia is interesting

### Performance
- Largest Contentful Paint (LCP) — under 2.5s on 75th percentile is "good"
- Cumulative Layout Shift (CLS) — under 0.1 on 75th percentile is "good"
- INP (Interaction to Next Paint) — under 200ms on 75th percentile is "good"
- Any page with LCP > 4s deserves an image-optimization look

### Custom events (via `cf_sql`, see above)
- Scroll completion rate on long-form pages (% of visitors who reach 75%+)
- Newsletter signup click-through by placement — which converts best: footer, inline, or modal?
- Top downloaded PDFs — which printables are teachers actually using?

## When to act on what you see

- **Page jumped to #1 traffic this week** → consider promoting via newsletter or social, write a follow-up piece on the same topic
- **Long-form page has high views but low scroll completion** → opening 2–3 paragraphs may need work; add a section TOC or pull-quotes
- **Referrer surge from a single domain** → reach out to whoever linked you and thank them; consider a guest piece
- **Mobile traffic >50% but a page has poor LCP on mobile** → that page's images need optimization (Tier 1 #7 in the roadmap)
