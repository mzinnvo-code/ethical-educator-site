# Analytics Playbook

What to look at in Cloudflare Web Analytics each week, and what we can and cannot measure today.

## What ships in Session 1

**Live as soon as you create the Web Analytics site in the Cloudflare dashboard and paste the token into `index.html`:**

- Pageviews per URL (including SPA route changes)
- Top pages by visits
- Top referrers (where traffic comes from)
- Visitor counts (unique by IP+UA hash, no cookies)
- Core Web Vitals (LCP, FID, CLS, INP) per page
- Device class (mobile / tablet / desktop) and browser breakdown

**Cookieless, no consent banner required, no PII collected.** Cloudflare Web Analytics is GDPR/CCPA-clean by design.

## What does NOT ship today (and why)

Cloudflare Web Analytics has no public custom-events API yet (per their FAQ as of May 2026). So these four metrics from the original plan are *captured in code* but *not visible in a dashboard yet*:

- Scroll depth on long-form articles (25/50/75/100% milestones)
- Outbound clicks on newsletter signup buttons (by placement: footer/inline/modal)
- PDF downloads (by resource slug)
- Any other custom events we want to add

The instrumentation is live — every `track()` call in the app pushes an event to `window.__teeEvents` (visible in DevTools console). They will be flushed to a real backend once we add the Workers Analytics Engine follow-up (see below).

## How to verify the instrumentation is wired up

1. Open the live site in a Chrome incognito window.
2. Open DevTools → Console.
3. Scroll a long-form page (e.g., `/moral-psych`) to 50%.
4. Type `window.__teeEvents` in the console and press Enter.
5. You should see an array including `{ name: "scroll_depth", properties: { page: "moral-psych", milestone: 50 }, ... }`.

If events show up there, the wiring is correct. When the Worker endpoint lands, those events will start appearing in the Cloudflare dashboard.

## The follow-up: Workers Analytics Engine for custom events

When you're ready (Session 2 or 3), here's the small lift to get custom events into a queryable dashboard:

1. Create a Worker (e.g., `ethed-events`) with an Analytics Engine binding:
   ```toml
   [[analytics_engine_datasets]]
   binding = "EVENTS"
   dataset = "tee_events"
   ```
2. The Worker accepts `POST /events` with a JSON body and calls `env.EVENTS.writeDataPoint({ blobs: [name, path], doubles: [milestone] })`.
3. Replace the buffer in `src/lib/analytics.js` with a `fetch("/events", { method: "POST", body: JSON.stringify(event) })` call. The function signature stays the same, so no other code changes.
4. Query the dataset via the Analytics Engine SQL API or hook it up to Grafana.

Cost: Workers Analytics Engine is free for the first 10M data points/month — far above what this site will use.

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

### Once Workers Analytics Engine is live
- Scroll completion rate on long-form pages (% of visitors who reach 75%+)
- Newsletter signup click-through by placement — which converts best: footer, inline, or modal?
- Top downloaded PDFs — which printables are teachers actually using?

## When to act on what you see

- **Page jumped to #1 traffic this week** → consider promoting via newsletter or social, write a follow-up piece on the same topic
- **Long-form page has high views but low scroll completion** → opening 2–3 paragraphs may need work; add a section TOC or pull-quotes
- **Referrer surge from a single domain** → reach out to whoever linked you and thank them; consider a guest piece
- **Mobile traffic >50% but a page has poor LCP on mobile** → that page's images need optimization (Tier 1 #7 in the roadmap)
