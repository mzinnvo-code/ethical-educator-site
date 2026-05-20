# ethed-events — Analytics Engine endpoint

Tiny Cloudflare Worker that receives custom event POSTs from `theethicaleducator.com` and writes them to the `tee_events` Workers Analytics Engine dataset. Cloudflare Web Analytics handles pageviews + Core Web Vitals separately; this Worker only handles app-specific events (scroll depth, newsletter clicks, PDF downloads, etc.) that CWA can't capture.

## Deploy (one-time, ~5 min)

From the repo root:

```bash
cd workers/events
npm install
npx wrangler login         # opens browser; auth once
npm run deploy
```

Wrangler will print a URL like `https://ethed-events.<your-subdomain>.workers.dev`. **Copy that URL.**

## Wire it into the site

Open `src/lib/analytics.js` at the repo root and replace `REPLACE_WITH_WORKER_URL` with the URL from the deploy step above (include the `/events` path):

```js
const ANALYTICS_ENDPOINT = "https://ethed-events.your-subdomain.workers.dev/events";
```

Commit and push. GitHub Actions redeploys the site; events start landing within ~10 seconds of the first user interaction.

## Verify it's working

1. Visit `https://theethicaleducator.com/moral-psych` in an incognito window.
2. Scroll to ~50%.
3. Tail the Worker logs in another terminal: `npm run tail` (in `workers/events/`). You should see request entries.
4. Query the dataset (see `docs/analytics-playbook.md` for SQL examples).

## Costs

Free tier covers up to **10 million writes / month** and **1 million queries / month**. This site won't come close.

## Architecture notes

- **No `await`** on `writeDataPoint` — the runtime flushes in the background. The Worker returns 204 immediately.
- **CORS** is allowlist-based — only `theethicaleducator.com`, `www.theethicaleducator.com`, and local Vite dev ports are accepted.
- **Field clamping** caps each blob to a sane length so a misbehaving client can't blow past Analytics Engine limits.
- **The dataset (`tee_events`) is created automatically** the first time the Worker writes to it — no manual setup in the dashboard.

## Querying

Once you've created an API token (Profile → API Tokens → Create Custom Token → Account Analytics → Read), you can query:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/00cbe989709cb5c738910120b128e8f5/analytics_engine/sql" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  --data "SELECT blob1 AS event, SUM(_sample_interval) AS count FROM tee_events WHERE timestamp > NOW() - INTERVAL '7' DAY GROUP BY event ORDER BY count DESC"
```

That account ID is yours (already verified via MCP). More query examples in `docs/analytics-playbook.md`.
