#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist");
const SITE = "https://examinedclassroom.com";
const packageJson = JSON.parse(await readFile("package.json", "utf8"));

const priorityRoutes = [
  { route: "/", file: "index.html", text: "The Examined Classroom", canonical: `${SITE}/` },
  { route: "/about", file: "about/index.html", text: "Matthew A. Zinn", canonical: `${SITE}/about` },
  { route: "/thought-experiments", file: "thought-experiments/index.html", text: "Interactive Thought Experiments", canonical: `${SITE}/thought-experiments` },
  { route: "/tools", file: "tools/index.html", text: "Interactive Tools", canonical: `${SITE}/tools` },
  { route: "/ai-education", file: "ai-education/index.html", text: "AI in Education", canonical: `${SITE}/ai-education` },
  { route: "/ai-ethics-lesson-plans", file: "ai-ethics-lesson-plans/index.html", text: "AI ethics lesson plans", canonical: `${SITE}/ai-ethics-lesson-plans` },
  { route: "/thought-experiments-for-kids", file: "thought-experiments-for-kids/index.html", text: "Thought Experiments for Kids", canonical: `${SITE}/thought-experiments-for-kids` },
  { route: "/ai-literacy-activities", file: "ai-literacy-activities/index.html", text: "AI Literacy Activities", canonical: `${SITE}/ai-literacy-activities` },
  { route: "/school-ai-policy-tools", file: "school-ai-policy-tools/index.html", text: "School AI Policy Tools", canonical: `${SITE}/school-ai-policy-tools` },
  { route: "/teaching-resources/paperclip-maximizer", file: "teaching-resources/paperclip-maximizer/index.html", text: "Paperclip Maximizer Classroom Packet", canonical: `${SITE}/teaching-resources/paperclip-maximizer` },
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

async function readDistFile(file) {
  const fullPath = path.join(DIST, file);
  try {
    return await readFile(fullPath, "utf8");
  } catch (error) {
    throw new Error(`Missing ${file}. Run the production build with prerendering before this check. ${error.message}`);
  }
}

for (const page of priorityRoutes) {
  const html = await readDistFile(page.file);
  mustContain(html, page.text, `${page.route} static HTML`);
  mustMatch(
    html,
    new RegExp(`<link[^>]+href="${page.canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]+rel="canonical"|<link[^>]+rel="canonical"[^>]+href="${page.canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`),
    `${page.route} canonical`
  );
  mustContain(html, "<script", `${page.route} static HTML`);
  mustNotContain(html, 'role="dialog"', `${page.route} static HTML`);
  mustNotContain(html, "Bring one thought experiment to class next week", `${page.route} static HTML`);
}

const homeHtml = await readDistFile("index.html");
mustMatch(homeHtml, /"@type"\s*:\s*"WebSite"/, "home structured data");
mustContain(homeHtml, '"Organization"', "home structured data");
mustMatch(homeHtml, /"@type"\s*:\s*"Person"/, "home structured data");
mustContain(homeHtml, "hello@examinedclassroom.com", "home identity schema");

const llms = await readDistFile("llms.txt");
mustContain(llms, "# The Examined Classroom", "llms.txt");
mustContain(llms, `${SITE}/about`, "llms.txt");
mustContain(llms, `${SITE}/thought-experiments`, "llms.txt");

const about = await readDistFile("about-this-site.txt");
mustContain(about, "Official site:", "about-this-site.txt");
mustContain(about, "Matthew A. Zinn", "about-this-site.txt");

const sitemap = await readDistFile("sitemap.xml");
const prerenderRoutes = packageJson.prerender?.include || [];

for (const route of prerenderRoutes) {
  const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
  await readDistFile(file);
  const canonical = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  mustContain(sitemap, `<loc>${canonical}</loc>`, "sitemap.xml");
}

for (const page of priorityRoutes) {
  mustContain(sitemap, `<loc>${page.canonical}</loc>`, "sitemap.xml");
}

const robots = await readDistFile("robots.txt");
mustContain(robots, `Sitemap: ${SITE}/sitemap.xml`, "robots.txt");

console.log(`Crawlability check passed for ${priorityRoutes.length} priority routes and ${prerenderRoutes.length} prerendered routes.`);
