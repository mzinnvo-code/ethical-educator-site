#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { SITE } from "../src/siteConfig.js";
import { GROWTH_PAGE_META, SEARCH_LANDING_PAGE_BY_ROUTE, TEACHING_RESOURCE_PAGE_BY_ROUTE } from "../src/data/growthPages.js";
import { OG_PAGES_BY_ID } from "../src/data/ogPages.js";
import { GAMIFICATION_GAME_LEVELS, GAMIFICATION_QUEST_SOURCES } from "../src/data/gamificationQuest.js";
import { buildRouteSchema, cleanTitle, ogTypeFor } from "../src/lib/seoSchema.js";
import { LANDING_SEO_TEXT } from "../src/pages/landing/sceneCopy.js";

const DIST = path.resolve("dist");
const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const routes = packageJson.prerender?.include || ["/"];

const STATIC_ROUTE_META = {
  home: {
    title: SITE.brandName,
    description: "Classroom-ready thought experiments, educator resources, and research-backed AI ethics guidance for teachers and school leaders navigating AI in education.",
    // First two entries are load-bearing for test:crawlability; the rest is
    // the landing cinematic's copy so "/" stays fully crawlable without JS.
    text: [
      "The Examined Classroom",
      "Classroom-ready thought experiments, educator resources, and research-backed AI ethics guidance.",
      ...LANDING_SEO_TEXT,
    ],
    links: [
      { label: "Interactive Thought Experiments", href: "/thought-experiments" },
      { label: "AI Ethics Lesson Plans", href: "/ai-ethics-lesson-plans" },
      { label: "Interactive Tools", href: "/tools" },
    ],
  },
  about: {
    title: "About Matthew A. Zinn - The Examined Classroom",
    description: "Philosopher, educator, and researcher at the intersection of moral psychology, AI ethics, and educational technology.",
    text: ["Matthew A. Zinn", "Philosopher, educator, and researcher."],
  },
  "thought-experiments": {
    title: "Interactive Thought Experiments - The Examined Classroom",
    description: "Forty interactive scenarios for K-12 and educators, from Plato's Cave to AI policy dilemmas.",
    text: ["Interactive Thought Experiments", "Classroom-ready scenarios for K-12 students and educators."],
  },
  tools: {
    title: "Interactive Tools - The Examined Classroom",
    description: "The Thought Experiment Picker, AI Use Rubric, AI Policy Builder, and Family Conversation Generator.",
    text: ["Interactive Tools", "Short, focused tools for teachers, leaders, and families."],
  },
  "ai-education": {
    title: "AI in Education - The Examined Classroom",
    description: "A practical hub for teachers and school leaders covering AI foundations, classroom practice, student tools, policy, ethics, future readiness, and resources.",
    text: ["AI in Education", "A practical research hub for teachers and school leaders."],
  },
  "ai-ethics": {
    title: "AI Ethics in Education - The Examined Classroom",
    description: "Ethical frameworks for educators navigating AI, school policy, academic integrity, and classroom judgment.",
    text: ["AI Ethics in Education", "Frameworks for navigating AI in schools."],
  },
  "gamification-in-education": {
    title: "Gamification in Education - The Examined Classroom",
    description: "A playable, research-informed guide to gamification, contested attention, student engagement, mastery badges, and browser-only Thought Experiments progress.",
    text: [
      "Gamification in Education",
      "Attention is now contested. Students have not simply lost attention biologically, but the learning environment now competes with faster rewards, constant novelty, notifications, and easier escape.",
      "Good gameful design earns attention so students stay with slower, harder learning long enough to revise, explain, and transfer what they know.",
      ...GAMIFICATION_GAME_LEVELS.flatMap((level) => [
        level.title,
        level.summary,
        ...(level.dialogueBeats || []).slice(0, 2),
      ]),
    ],
    links: GAMIFICATION_QUEST_SOURCES.map((item) => ({ label: `${item.label}: ${item.title}`, href: item.href })),
  },
  resources: {
    title: "Research Resources & Reading List - The Examined Classroom",
    description: "Curated books, academic papers, policy documents, organizations, and podcasts on moral psychology, AI ethics, and philosophy of education.",
    text: ["Research Resources", "Books, papers, policy documents, organizations, and podcasts."],
  },
};

function pageIdFromRoute(route) {
  return route === "/" ? "home" : route.replace(/^\/+|\/+$/g, "");
}

function titleFromSlug(pageId) {
  return pageId
    .split("/")
    .pop()
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function metaFor(pageId) {
  if (GROWTH_PAGE_META[pageId]) return GROWTH_PAGE_META[pageId];
  if (STATIC_ROUTE_META[pageId]) return STATIC_ROUTE_META[pageId];
  const title = `${titleFromSlug(pageId)} - ${SITE.brandName}`;
  return {
    title,
    description: "A classroom-ready page from The Examined Classroom.",
    text: [cleanTitle(title), "A classroom-ready page from The Examined Classroom."],
  };
}

function routeUrl(pageId) {
  return pageId === "home" ? `${SITE.origin}/` : `${SITE.origin}/${pageId}`;
}

function ogImageFor(pageId) {
  return OG_PAGES_BY_ID[pageId]
    ? `${SITE.origin}/og/${pageId.replace(/\//g, "_")}.png`
    : `${SITE.origin}/illustrations/home-hero.png`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageLinks(pageId) {
  const landing = SEARCH_LANDING_PAGE_BY_ROUTE[pageId];
  if (landing) {
    return [
      landing.primaryAction,
      landing.secondaryAction,
      ...landing.startHere.map(({ title, href }) => ({ label: title, href })),
      ...landing.curatedLinks.map(({ label, href }) => ({ label, href })),
    ];
  }

  const resource = TEACHING_RESOURCE_PAGE_BY_ROUTE[pageId];
  if (resource) {
    return [
      resource.primaryAction,
      { label: "AI ethics lesson plans", href: "/ai-ethics-lesson-plans" },
      ...resource.relatedLinks,
    ];
  }

  return STATIC_ROUTE_META[pageId]?.links || [
    { label: "AI ethics lesson plans", href: "/ai-ethics-lesson-plans" },
    { label: "Thought experiments for kids", href: "/thought-experiments-for-kids" },
    { label: "School AI policy tools", href: "/school-ai-policy-tools" },
  ];
}

function fallbackText(pageId, meta) {
  const landing = SEARCH_LANDING_PAGE_BY_ROUTE[pageId];
  if (landing) return [landing.intro, landing.why, ...landing.topics];

  const resource = TEACHING_RESOURCE_PAGE_BY_ROUTE[pageId];
  if (resource) {
    return [
      resource.overview,
      resource.essentialQuestion,
      resource.gradeBand,
      resource.time,
      ...resource.objectives,
      ...resource.teacherNotes,
    ];
  }

  return meta.text || [meta.description];
}

function staticFallback(pageId, meta) {
  const title = cleanTitle(meta.title);
  const links = pageLinks(pageId).filter(Boolean);
  const text = fallbackText(pageId, meta).filter(Boolean);

  return `<main class="static-prerender" aria-label="${escapeHtml(title)}">
    <p>Static page preview for search engines and no-JavaScript visitors.</p>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(meta.description)}</p>
    ${text.map((item) => `<p>${escapeHtml(item)}</p>`).join("\n    ")}
    <nav aria-label="Related resources">
      <ul>
        ${links.map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`).join("\n        ")}
      </ul>
    </nav>
  </main>`;
}

function replaceOrInsert(html, pattern, replacement, before = "</head>") {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(before, `${replacement}\n${before}`);
}

function renderRoute(template, route) {
  const pageId = pageIdFromRoute(route);
  const meta = metaFor(pageId);
  const canonicalUrl = routeUrl(pageId);
  const imageUrl = ogImageFor(pageId);
  const title = meta.title;
  const description = meta.description;
  const schema = buildRouteSchema({ currentPage: pageId, meta, canonicalUrl, imageUrl });

  let html = template;
  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrInsert(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceOrInsert(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = replaceOrInsert(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = replaceOrInsert(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${imageUrl}" />`);
  html = replaceOrInsert(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = replaceOrInsert(html, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${ogTypeFor(meta)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);
  html = html.replace(
    "</head>",
    `    <script id="route-schema" type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`
  );
  if (route === "/") {
    // The hero illustration is the home page's LCP element; preload only there
    // so other routes don't fetch an image they never show.
    html = html.replace(
      "</head>",
      `    <link rel="preload" as="image" href="/illustrations/home-hero.webp" type="image/webp" fetchpriority="high" />\n  </head>`
    );
  }
  html = html.replace('<div id="root"></div>', `<div id="root">\n${staticFallback(pageId, meta)}\n    </div>`);
  return html;
}

async function writeRoute(route, html) {
  if (route === "/") {
    await writeFile(path.join(DIST, "index.html"), html);
    return;
  }

  const dir = path.join(DIST, route.replace(/^\/+/, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
}

// Content-Security-Policy is injected here (not in source index.html) because
// GitHub Pages can't set HTTP headers, and a static meta CSP in the source
// template would block the inline React Refresh preamble Vite injects during
// `npm run dev`. Prerendered pages are what production serves, so they all get
// the policy. Hashes for executable inline scripts are computed from the built
// template so they never go stale. `frame-ancestors` is unsupported in meta
// CSP and omitted. style-src needs 'unsafe-inline' for React style={{}} attrs
// and the global <style> element in App.jsx. JSON-LD scripts are data blocks
// and are not governed by script-src.
function buildCsp(html) {
  const hashes = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attrs, body] = match;
    if (/\bsrc\s*=/.test(attrs) || /application\/ld\+json/.test(attrs) || !body.trim()) continue;
    hashes.push(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
  return [
    "default-src 'self'",
    `script-src 'self' https://static.cloudflareinsights.com${hashes.length ? " " + hashes.join(" ") : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    // External covers on /resources; data: for the grain overlay; blob: for Phaser texture URLs.
    // archive.org + ia*.us.archive.org are the redirect chain behind
    // covers.openlibrary.org (CSP checks every hop of a redirect).
    "img-src 'self' data: blob: https://covers.openlibrary.org https://archive.org https://*.us.archive.org https://images1.penguinrandomhouse.com https://application.wiley-vch.de",
    "media-src 'self' blob: data:",
    // cloudflareinsights.com receives the Web Analytics RUM beacon POSTs;
    // the workers.dev endpoint receives custom events (src/lib/analytics.js).
    "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com https://examined-classroom-events.theethicaleducator.workers.dev",
    // 'self' covers the Mary's Room animation iframe; YouTube embeds on /ai-consciousness.
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    // Newsletter form posts to Buttondown once enabled.
    "form-action 'self' https://buttondown.com",
  ].join("; ");
}

function injectCsp(html) {
  // Drop any existing tag first so re-running prerender stays idempotent.
  const stripped = html.replace(/\n?\s*<meta http-equiv="Content-Security-Policy"[^>]*>/g, "");
  const tag = `<meta http-equiv="Content-Security-Policy" content="${buildCsp(stripped)}" />`;
  return stripped.replace(/<meta name="viewport"[^>]*>/, (viewport) => `${viewport}\n    ${tag}`);
}

const template = injectCsp(await readFile(path.join(DIST, "index.html"), "utf8"));
for (const route of routes) {
  await writeRoute(route, renderRoute(template, route));
}

console.log(`Browserless prerender wrote ${routes.length} static route files without launching Chrome or Chromium.`);
