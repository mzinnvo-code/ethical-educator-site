# Organic Growth Dashboard

Updated: 2026-05-28

Use this dashboard rhythm for the no-paid-ads SEO plan. The goal is qualified teacher and school-leader traffic that opens classroom resources, tools, packets, or the newsletter.

## Weekly Review

Pull these from Google Search Console, Bing Webmaster Tools, Cloudflare Web Analytics, and the custom event dataset when available.

- Organic clicks and impressions by page.
- Search queries for the target clusters: AI ethics lesson plans, AI literacy activities, thought experiments for kids, school AI policy tools, AI academic integrity, philosophy for kids.
- Pages with average position 8-20, because these are the fastest internal-link and title/meta wins.
- Pages with high impressions but low click-through rate.
- Organic landing pages with second-clicks into tools, packets, thought experiments, or newsletter.
- Newsletter signup clicks by placement.
- Print, download, copy, and tool-open events where available.
- SEO pathway clicks: `seo_landing_click`, `teaching_resource_click`, and `related_resource_rail_click`.
- Mobile Core Web Vitals, especially LCP and INP.

## Monthly Decisions

- Update titles and meta descriptions for pages with impressions but weak click-through.
- Add internal links to pages ranking 8-20 from relevant hubs and articles.
- Expand pages with strong engagement and teacher-use behavior.
- Rewrite introductions on pages with traffic but weak scroll depth.
- Add new resource pages only when the page can provide a concrete teacher action.

## Priority URL Set

Inspect or resubmit these after deployment:

- `https://examinedclassroom.com/ai-ethics-lesson-plans`
- `https://examinedclassroom.com/thought-experiments-for-kids`
- `https://examinedclassroom.com/ai-literacy-activities`
- `https://examinedclassroom.com/school-ai-policy-tools`
- `https://examinedclassroom.com/academic-integrity-ai-discussions`
- `https://examinedclassroom.com/philosophy-for-kids`
- `https://examinedclassroom.com/teaching-resources/paperclip-maximizer`
- `https://examinedclassroom.com/teaching-resources/consciousness-line`
- `https://examinedclassroom.com/teaching-resources/ai-authorship-discussion`
- `https://examinedclassroom.com/teaching-resources/ai-detector-false-positive`

## IndexNow Check

After a deployment that adds or materially changes priority pages:

- Confirm `https://examinedclassroom.com/6a7ee777-5ff8-42b6-af77-abed93f2db29.txt` returns the IndexNow key.
- Run `npm run seo:indexnow`.
- Record the response code. `200` means submitted; `202` means received and key validation is pending.

## No-Cost Distribution

- Add visible links from `ethicalaiedu.wordpress.com` and `innovateedai.com`.
- Share one specific classroom resource at a time in educator communities where sharing is allowed.
- Pitch concrete pages, not the whole site: one packet, one policy tool, one academic-integrity discussion, or one grade-band thought-experiment page.
- Avoid paid links, mass directory submissions, generic AI-news pages, and thin keyword pages.
