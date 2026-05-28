# SEO Plan for examinedclassroom.com

Updated: 2026-05-28

## Principle

Improve organic discovery without paid services, advertising, purchased backlinks, or agency work. The site should rank by being crawlable, useful, clearly structured, and aligned to real teacher and school-leader search intent.

## Primary Search Clusters

- AI ethics lesson plans for teachers
- K-12 AI literacy activities
- classroom thought experiments for kids
- philosophy for children and adolescents
- school AI policy activities
- AI academic integrity classroom discussions
- AI use rubric for teachers and school leaders

## Implemented Slice

- Added `/ai-ethics-lesson-plans` as a search-intent landing page for teachers looking for free classroom resources.
- Added the remaining priority search-intent landing pages:
  - `/thought-experiments-for-kids`
  - `/ai-literacy-activities`
  - `/school-ai-policy-tools`
  - `/academic-integrity-ai-discussions`
  - `/philosophy-for-kids`
- Added standalone, crawlable teacher-resource pages for:
  - `/teaching-resources/paperclip-maximizer`
  - `/teaching-resources/consciousness-line`
  - `/teaching-resources/ai-authorship-discussion`
  - `/teaching-resources/ai-detector-false-positive`
  - `/teaching-resources/biased-classroom-robot`
  - `/teaching-resources/school-surveillance`
  - `/teaching-resources/ai-grading-mistake`
  - `/teaching-resources/ai-policy-design-staff-activity`
- Linked that page from the homepage hero, homepage closing band, footer teaching resources, sitemap, browserless prerender route config, OG card list, search index, and AI-readable site summaries.
- Added a related classroom resources rail to major AI ethics, AI education, philosophy, and thought-experiment pages so long-form content links into teacher-facing landing pages with descriptive anchors.
- Replaced one-size-fits-all non-home `Article` schema with route-aware JSON-LD:
  - `WebPage` or `CollectionPage` for hubs and tools.
  - `Article` only for dated content.
  - `BreadcrumbList` for non-home routes.
  - `LearningResource` where the page is explicitly a teaching resource.
- Preserved existing crawlability checks so sitemap and prerender coverage stay aligned.
- Replaced the old browser-driven prerender dependency with a browserless static prerender script so production builds no longer launch bundled Chromium.
- Added custom event hooks for the new SEO landing-page clicks, standalone teaching-resource clicks, and related-resource rail clicks.
- Deployed the custom event Worker and wired the site to the `examined-classroom-events` Workers endpoint.
- Added a no-cost IndexNow key file and `npm run seo:indexnow` submission script for Bing and other participating search engines.

## Next No-Cost Iterations

- Add visible author/update blocks to long-form AI ethics articles so the on-page content matches the structured data.
- Use Search Console, once available, to identify queries with impressions but weak click-through and tune titles/descriptions around those actual searches.
- Add one new standalone teacher-resource page per month from existing classroom-ready material when the content is already complete.
- Keep internal links descriptive: "AI ethics lesson plans", "thought experiments for kids", "AI policy builder", "AI use rubric", and similar user-language anchors.

## Measurement

- Confirm Google can crawl `/sitemap.xml` and the new landing page.
- Track Search Console impressions/clicks for the target clusters above.
- Watch Cloudflare analytics for organic landing-page traffic and second-click paths into lesson packets, thought experiments, and tools.
- Watch custom events: `seo_landing_click`, `teaching_resource_click`, and `related_resource_rail_click` in the Cloudflare Workers Analytics Engine dataset.
- Run `npm run seo:indexnow` after deployment when priority URLs are added or substantially updated.
- Re-run local build and crawlability checks before deployment.
