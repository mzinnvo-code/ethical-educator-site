#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { SITE } from "../src/siteConfig.js";
import { GROWTH_PAGE_META, SEARCH_LANDING_PAGE_BY_ROUTE, TEACHING_RESOURCE_PAGE_BY_ROUTE } from "../src/data/growthPages.js";
import { OG_PAGES_BY_ID } from "../src/data/ogPages.js";
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

const template = await readFile(path.join(DIST, "index.html"), "utf8");
for (const route of routes) {
  await writeRoute(route, renderRoute(template, route));
}

console.log(`Browserless prerender wrote ${routes.length} static route files without launching Chrome or Chromium.`);
