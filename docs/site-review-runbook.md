# Biweekly Site Review Runbook

This repo includes a read-only website review runner for `examinedclassroom.com`.
It produces a Markdown and JSON report under ignored `output/site-review/`.

## Run

```bash
npm run report:site
```

Useful options:

```bash
npm run report:site -- --print-markdown
npm run report:site -- --offline
npm run report:site -- --skip-local
npm run report:site -- --input-dir scripts/fixtures/site-review --offline --skip-local --print-markdown
```

The runner may write `dist/` through `npm run build` and report files under
`output/site-review/`. Both are ignored build/report outputs.

## What The Report Covers

Each section is organized as Data, Insights, Actions, and Outcome Goals:

- Frontend, UX, accessibility, and performance.
- Backend/Worker, deploy, and CI health.
- Security, privacy, headers, DNS, and dependency advisories.
- SEO, crawlability, sitemap, metadata, backlinks, and search visibility.
- Traffic and engagement breakdown.
- Content/product effectiveness and teacher-resource conversion.
- Operations/workspace hygiene.

The action queue uses this schema:

```json
{
  "area": "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
  "priority": "P1",
  "evidence": "Observed fact from a check or input row.",
  "recommended_action": "Specific next action.",
  "outcome_goal": "Measurable result expected by the next report.",
  "due_by_next_report": "2026-06-20",
  "proposed_agent_or_automation": "Follow-up owner proposal.",
  "requires_approval": true
}
```

## Optional Private Inputs

The report never invents traffic or ranking metrics. If private data is not
available, it records an access gap.

Set an input folder with CSV or JSON exports:

```bash
SITE_REVIEW_INPUT_DIR=/path/to/site-review-inputs npm run report:site
```

Recognized files:

- `search-console.csv` or `google-search-console.csv`
- `bing-webmaster.csv` or `bing.csv`
- `cloudflare-web-analytics.csv` or `cloudflare-analytics.csv`
- `custom-events.csv` or `analytics-events.csv`

Expected columns are flexible, but these work best:

- Search exports: `query`, `page`, `clicks`, `impressions`, `ctr`, `position`
- Web analytics exports: `page`, `visits`, `referrer`, `country`, `device`
- Custom events: `event`, `page`, `placement`, `resource`, `count`

## Optional Cloudflare Analytics Engine API

For custom-event SQL, keep credentials local in `.env.local` or your shell.
Do not commit tokens or exports.

```bash
export CF_ACCOUNT_ID=...
export CF_API_TOKEN=...
export CF_ANALYTICS_DATASET=examined_classroom_events
npm run report:site
```

The token only needs read access for Cloudflare Analytics Engine SQL.

## Automation Contract

The Codex automation should run every other Saturday morning at 9:00 AM
America/Puerto_Rico and use:

```bash
npm run report:site -- --print-markdown
```

The automation should report the Markdown output in the thread and treat all
follow-up work as task proposals. It should not create PRs, edit tracked files,
or make external dashboard/DNS changes without approval.
