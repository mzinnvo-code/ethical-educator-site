# Off-Site SEO Action Pack

Updated: 2026-05-28

Use this for the account-only parts of the organic growth plan. These tasks require access to Google Search Console, Bing Webmaster Tools, WordPress, and Gamma. No paid services or advertising are needed.

Current live check on 2026-05-28: `ethicalaiedu.wordpress.com` and `innovateedai.com` did not expose a visible `examinedclassroom.com` link in their fetched homepage HTML. `innovateedai.com` is served by Gamma, so edit it in the Gamma site editor unless its source moves to a repository later.

## Google Search Console

Property: `examinedclassroom.com`

1. Add or select the domain property.
2. Submit sitemap: `https://examinedclassroom.com/sitemap.xml`.
3. Use URL Inspection for:
   - `https://examinedclassroom.com/ai-ethics-lesson-plans`
   - `https://examinedclassroom.com/thought-experiments-for-kids`
   - `https://examinedclassroom.com/ai-literacy-activities`
   - `https://examinedclassroom.com/school-ai-policy-tools`
   - `https://examinedclassroom.com/academic-integrity-ai-discussions`
   - `https://examinedclassroom.com/philosophy-for-kids`
   - `https://examinedclassroom.com/teaching-resources/paperclip-maximizer`
   - `https://examinedclassroom.com/teaching-resources/consciousness-line`
4. Request indexing for any page that is not indexed.
5. Recheck after 24-72 hours.

## Bing Webmaster Tools

1. Add `https://examinedclassroom.com/` or import the verified Google Search Console property.
2. Submit sitemap: `https://examinedclassroom.com/sitemap.xml`.
3. Confirm the IndexNow submission appears after the next processing window.

Current IndexNow evidence: `npm run seo:indexnow` returned `202 Accepted` for 20 priority URLs on 2026-05-28.

## WordPress Link

Site: `https://ethicalaiedu.wordpress.com`

Add this as a visible homepage/sidebar/about-page link:

```text
Visit my main resource site, The Examined Classroom, for classroom-ready thought experiments, AI ethics lesson plans, and school AI policy tools:
https://examinedclassroom.com/
```

Preferred anchor text:

```text
The Examined Classroom
```

Optional short post/update:

```text
I have moved my classroom-ready AI ethics resources, thought experiments, and school AI policy tools into a dedicated free resource site: The Examined Classroom.

Start here:
- AI ethics lesson plans: https://examinedclassroom.com/ai-ethics-lesson-plans
- Thought experiments for kids: https://examinedclassroom.com/thought-experiments-for-kids
- School AI policy tools: https://examinedclassroom.com/school-ai-policy-tools
```

## Gamma / InnovateEdAI Link

Site: `https://innovateedai.com`

Add this to the resources/further learning area:

```html
<a href="https://examinedclassroom.com/">The Examined Classroom</a> - free classroom-ready AI ethics lesson plans, thought experiments for kids, AI literacy activities, and school AI policy tools.
```

If Gamma asks for plain text, use:

```text
The Examined Classroom - free classroom-ready AI ethics lesson plans, thought experiments for kids, AI literacy activities, and school AI policy tools:
https://examinedclassroom.com/
```

## Free Outreach Pitch

Use one concrete resource at a time:

```text
I built a free classroom-ready resource for teachers working on AI ethics and AI literacy: [resource title]. It includes grade band, time required, objectives, discussion flow, teacher notes, and related resources. It is free, no ads, and designed for K-12 classroom use:
[resource URL]
```

Best first URLs:

- `https://examinedclassroom.com/ai-ethics-lesson-plans`
- `https://examinedclassroom.com/thought-experiments-for-kids`
- `https://examinedclassroom.com/teaching-resources/paperclip-maximizer`
- `https://examinedclassroom.com/school-ai-policy-tools`
