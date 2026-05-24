#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist");
const SITE = "https://examinedclassroom.com";
const OLD_DOMAIN_STEM = ["the", "ethical", "educator"].join("");
const OLD_DOMAIN = `${OLD_DOMAIN_STEM}.com`;
const OLD_PUBLIC_STRINGS = [
  ["The", "Ethical", "Educator"].join(" "),
  OLD_DOMAIN,
  `hello@${OLD_DOMAIN}`,
];
const packageJson = JSON.parse(await readFile("package.json", "utf8"));

const priorityRoutes = [
  { route: "/", file: "index.html", text: "The Examined Classroom", canonical: `${SITE}/` },
  { route: "/about", file: "about/index.html", text: "Matthew A. Zinn", canonical: `${SITE}/about` },
  { route: "/thought-experiments", file: "thought-experiments/index.html", text: "Interactive Thought Experiments", canonical: `${SITE}/thought-experiments` },
  { route: "/tools", file: "tools/index.html", text: "Interactive Tools", canonical: `${SITE}/tools` },
  { route: "/ai-education", file: "ai-education/index.html", text: "AI in Education", canonical: `${SITE}/ai-education` },
  { route: "/resources", file: "resources/index.html", text: "Research Resources", canonical: `${SITE}/resources` },
];

const mustContain = (haystack, needle, label) => {
  if (!haystack.includes(needle)) {
    throw new Error(`${label} missing expected text: ${needle}`);
  }
};

const mustMatch = (haystack, pattern, label) => {
  if (!pattern.test(haystack)) {
    throw new Error(`${label} missing expected pattern: ${pattern}`);
  }
};

const mustNotContain = (haystack, needle, label) => {
  if (haystack.includes(needle)) {
    throw new Error(`${label} contains unexpected text: ${needle}`);
  }
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function readDistFile(file) {
  const fullPath = path.join(DIST, file);
  try {
    return await readFile(fullPath, "utf8");
  } catch (error) {
    throw new Error(`Missing ${file}. Run the production build with prerendering before this check. ${error.message}`);
  }
}

function fileForRoute(route) {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
}

function routeId(route) {
  return route === "/" ? "home" : route.replace(/^\//, "");
}

function canonicalForRoute(route) {
  return route === "/" ? `${SITE}/` : `${SITE}${route}`;
}

function extractTag(html, selectorRegex, label) {
  const match = html.match(selectorRegex);
  if (!match) throw new Error(`${label} missing expected tag`);
  return match[0];
}

function extractContent(tag, label) {
  const match = tag.match(/\scontent=(?:"([^"]*)"|'([^']*)')/);
  if (!match) throw new Error(`${label} missing content attribute`);
  return match[1] || match[2];
}

function parseJsonLdScripts(html, label) {
  const scripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!scripts.length) throw new Error(`${label} missing JSON-LD`);

  return scripts.map((script, index) => {
    try {
      return JSON.parse(script[1]);
    } catch (error) {
      throw new Error(`${label} has invalid JSON-LD script ${index + 1}: ${error.message}`);
    }
  });
}

function flattenJsonLd(nodes) {
  return nodes.flatMap((node) => Array.isArray(node["@graph"]) ? node["@graph"] : [node]);
}

function nodeTypes(node) {
  return Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
}

function hasType(nodes, type) {
  return flattenJsonLd(nodes).some((node) => nodeTypes(node).includes(type));
}

const ARTICLE_ROUTES = new Set([
  "/moral-psych",
  "/ai-ethics",
  "/ai-consciousness",
  "/ai-authorship-quandary",
  "/ai-ambiguity-to-action",
  "/ai-paradox",
  "/ai-replace-teachers",
  "/phil-education",
  "/teaching-feedback",
  "/enhancing-feedback",
  "/enhancing-engagement",
  "/async-engagement",
  "/av-resources",
  "/quality-leadership",
  "/high-performing-schools",
  "/rti",
  "/whats-new",
]);

const COLLECTION_ROUTES = new Set([
  "/thought-experiments",
  "/thought-experiments/educators",
  "/thought-experiments/k-5",
  "/thought-experiments/6-8",
  "/thought-experiments/9-12",
  "/ai-education",
  "/ai-education/foundations",
  "/ai-education/classroom-practice",
  "/ai-education/student-tools",
  "/ai-education/policy-ethics",
  "/ai-education/future-readiness",
  "/ai-education/tools-resources",
  "/resources",
  "/for-educators",
]);

const LEARNING_ROUTES = new Set([
  "/thought-experiments/kindergarten",
  "/thought-experiments/grade-1",
  "/thought-experiments/grade-2",
  "/thought-experiments/grade-3",
  "/thought-experiments/grade-4",
  "/thought-experiments/grade-5",
  "/thought-experiments/explaining-red-k-2",
  "/thought-experiments/toolkit",
  "/thought-experiments/journal",
]);

const WEB_APP_ROUTES = new Set([
  "/picker",
  "/ai-rubric",
  "/ai-policy",
  "/family-conversations",
  "/tools",
]);

const BREADCRUMB_ROUTES = new Set(
  packageJson.reactSnap.include.filter((route) => route !== "/" && route.replace(/^\//, "").includes("/"))
);

function expectedPrimaryType(route) {
  if (route === "/") return "WebSite";
  if (route === "/about") return "ProfilePage";
  if (ARTICLE_ROUTES.has(route)) return "Article";
  if (COLLECTION_ROUTES.has(route)) return "CollectionPage";
  if (LEARNING_ROUTES.has(route)) return "LearningResource";
  if (WEB_APP_ROUTES.has(route)) return "WebApplication";
  return "WebPage";
}

function validateMetadata(html, route) {
  const label = route || "/";
  const canonical = canonicalForRoute(route);
  const canonicalTag = extractTag(
    html,
    /<link[^>]+rel="canonical"[^>]*>|<link[^>]+href="[^"]+"[^>]+rel="canonical"[^>]*>/,
    `${label} canonical`
  );
  mustContain(canonicalTag, `href="${canonical}"`, `${label} canonical`);

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) throw new Error(`${label} missing title`);
  if (titleMatch[1].length > 65) {
    throw new Error(`${label} title is too long (${titleMatch[1].length} chars): ${titleMatch[1]}`);
  }

  const descTag = extractTag(html, /<meta[^>]+name="description"[^>]*>/, `${label} description`);
  const description = extractContent(descTag, `${label} description`);
  if (description.length > 165) {
    throw new Error(`${label} description is too long (${description.length} chars): ${description}`);
  }

  for (const [name, regex] of [
    ["og:url", /<meta[^>]+property="og:url"[^>]*>/],
    ["og:image", /<meta[^>]+property="og:image"[^>]*>/],
    ["twitter:image", /<meta[^>]+name="twitter:image"[^>]*>/],
  ]) {
    const tag = extractTag(html, regex, `${label} ${name}`);
    const content = extractContent(tag, `${label} ${name}`);
    if (name === "og:url" && content !== canonical) {
      throw new Error(`${label} og:url should be ${canonical}, got ${content}`);
    }
    if (name.endsWith("image") && !content.startsWith(`${SITE}/`)) {
      throw new Error(`${label} ${name} must use an absolute examinedclassroom.com URL, got ${content}`);
    }
  }

  return { title: titleMatch[1], description };
}

function validateSchema(html, route) {
  const label = route || "/";
  const nodes = parseJsonLdScripts(html, `${label} structured data`);
  const expected = expectedPrimaryType(route);
  if (!hasType(nodes, expected)) {
    throw new Error(`${label} structured data missing ${expected}`);
  }
  if (route !== "/" && expected !== "Article" && hasType(nodes, "Article")) {
    throw new Error(`${label} should not use Article schema`);
  }
  if (BREADCRUMB_ROUTES.has(route) && !hasType(nodes, "BreadcrumbList")) {
    throw new Error(`${label} structured data missing BreadcrumbList`);
  }
}

for (const page of priorityRoutes) {
  const html = await readDistFile(page.file);
  mustContain(html, page.text, `${page.route} static HTML`);
  mustMatch(
    html,
    new RegExp(`<link[^>]+href="${escapeRegex(page.canonical)}"[^>]+rel="canonical"|<link[^>]+rel="canonical"[^>]+href="${escapeRegex(page.canonical)}"`),
    `${page.route} canonical`
  );
  mustContain(html, "<script", `${page.route} static HTML`);
  mustNotContain(html, 'role="dialog"', `${page.route} static HTML`);
  mustNotContain(html, "Bring one thought experiment to class next week", `${page.route} static HTML`);
}

const homeHtml = await readDistFile("index.html");
mustMatch(homeHtml, /"@type"\s*:\s*"WebSite"/, "home structured data");
mustNotContain(homeHtml, '"EducationalOrganization"', "home structured data");
mustMatch(homeHtml, /"@type"\s*:\s*"Person"/, "home structured data");
mustContain(homeHtml, "hello@examinedclassroom.com", "home identity schema");

const llms = await readDistFile("llms.txt");
mustContain(llms, "# The Examined Classroom", "llms.txt");
mustMatch(llms, /^> The Examined Classroom/m, "llms.txt");
mustContain(llms, "Canonical domain: https://examinedclassroom.com/", "llms.txt");
mustContain(llms, `${SITE}/about`, "llms.txt");
mustContain(llms, `${SITE}/thought-experiments`, "llms.txt");

const about = await readDistFile("about-this-site.txt");
mustContain(about, "Official site:", "about-this-site.txt");
mustContain(about, "Matthew A. Zinn", "about-this-site.txt");

const sitemap = await readDistFile("sitemap.xml");
const seenTitles = new Set();
const seenDescriptions = new Set();
for (const route of packageJson.reactSnap.include) {
  const file = fileForRoute(route);
  const html = await readDistFile(file);
  const canonical = canonicalForRoute(route);
  mustContain(sitemap, `<loc>${canonical}</loc>`, "sitemap.xml");

  for (const oldString of OLD_PUBLIC_STRINGS) {
    mustNotContain(html, oldString, `${routeId(route)} static HTML`);
  }

  const { title, description } = validateMetadata(html, route);
  if (seenTitles.has(title)) throw new Error(`Duplicate title found: ${title}`);
  if (seenDescriptions.has(description)) throw new Error(`Duplicate description found: ${description}`);
  seenTitles.add(title);
  seenDescriptions.add(description);
  validateSchema(html, route);
}
mustNotContain(sitemap, OLD_DOMAIN, "sitemap.xml");

for (const page of priorityRoutes) {
  mustContain(sitemap, `<loc>${page.canonical}</loc>`, "sitemap.xml");
}

const robots = await readDistFile("robots.txt");
mustContain(robots, `Sitemap: ${SITE}/sitemap.xml`, "robots.txt");
mustNotContain(robots, OLD_DOMAIN, "robots.txt");

const sourceIndex = await readFile("index.html", "utf8");
mustContain(sourceIndex, `content="${SITE}/illustrations/home-hero.png"`, "index.html source social image");

console.log(`Crawlability check passed for ${priorityRoutes.length} priority routes and ${packageJson.reactSnap.include.length} prerendered routes.`);
