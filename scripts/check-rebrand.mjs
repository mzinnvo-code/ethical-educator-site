import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const NEW_BRAND = "The Examined Classroom";
const NEW_DOMAIN = "examinedclassroom.com";
const NEW_EMAIL = `hello@${NEW_DOMAIN}`;
const OLD_BRAND = ["The", "Ethical", "Educator"].join(" ");
const OLD_DOMAIN_STEM = ["the", "ethical", "educator"].join("");
const OLD_DOMAIN = `${OLD_DOMAIN_STEM}.com`;
const OLD_EMAIL = `hello@${OLD_DOMAIN}`;
const OLD_PACKAGE = ["ethical", "educator", "site"].join("-");
const OLD_WORKER_PREFIX = ["ethed"].join("");
const OLD_STORAGE_PREFIX = ["tee", ":"].join("");
const OLD_BUFFER = ["__", "tee", "Events"].join("");
const OLD_DATASET = ["tee", "events"].join("_");

const requiredFiles = [
  "src/siteConfig.js",
  "index.html",
  "src/App.jsx",
  "src/pages/home/index.jsx",
  "src/pages/Terms.jsx",
  "src/pages/Privacy.jsx",
  "src/pages/Accessibility.jsx",
  "src/pages/Credits.jsx",
  "public/CNAME",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/llms.txt",
  "public/about-this-site.txt",
  "public/favicon.svg",
  "README.md",
  "package.json",
  "package-lock.json",
];

const ignoredDirs = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  "output",
  "gamma-archive",
]);

const ignoredFiles = new Set([
  "scripts/check-rebrand.mjs",
]);

function read(relativePath) {
  return readFileSync(path.join(ROOT, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function walk(dir = ROOT, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(ROOT, fullPath);
    if (ignoredDirs.has(entry) || ignoredFiles.has(relativePath)) continue;

    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, files);
    } else if (stats.isFile()) {
      files.push(relativePath);
    }
  }
  return files;
}

for (const file of requiredFiles) {
  assert(existsSync(path.join(ROOT, file)), `${file} should exist`);
}

const siteConfig = read("src/siteConfig.js");
assert(siteConfig.includes(NEW_BRAND), "site config should define the new brand name");
assert(siteConfig.includes(NEW_DOMAIN), "site config should define the new domain");
assert(siteConfig.includes(NEW_EMAIL), "site config should define the new public email");

const html = read("index.html");
assert(html.includes(`<title>${NEW_BRAND}</title>`), "index.html should use the new title");
assert(html.includes(`https://${NEW_DOMAIN}/`), "index.html should use the new canonical origin");
assert(html.includes(NEW_EMAIL), "index.html should use the new public email");

const cname = read("public/CNAME").trim();
assert(cname === NEW_DOMAIN, "public/CNAME should contain the new apex domain only");

const robots = read("public/robots.txt");
assert(robots.includes(`Sitemap: https://${NEW_DOMAIN}/sitemap.xml`), "robots.txt should point at the new sitemap");

const sitemap = read("public/sitemap.xml");
assert(sitemap.includes(`https://${NEW_DOMAIN}/`), "sitemap should use the new domain");
assert(!sitemap.includes(OLD_DOMAIN), "sitemap should not include the old domain");

const allTextFiles = walk().filter((relativePath) => {
  const ext = path.extname(relativePath).toLowerCase();
  return ["", ".html", ".js", ".jsx", ".json", ".md", ".svg", ".txt", ".xml", ".mjs", ".cjs"].includes(ext);
});

const forbidden = [
  OLD_BRAND,
  OLD_EMAIL,
  OLD_DOMAIN,
  OLD_DOMAIN_STEM,
  OLD_PACKAGE,
  OLD_WORKER_PREFIX,
  OLD_STORAGE_PREFIX,
  OLD_BUFFER,
  OLD_DATASET,
];
const offenders = [];
for (const file of allTextFiles) {
  const body = read(file);
  for (const term of forbidden) {
    if (body.includes(term)) {
      offenders.push(`${file}: ${term}`);
    }
  }
}

assert(
  offenders.length === 0,
  `old brand residue remains outside ignored archives/generated output:\n${offenders.join("\n")}`,
);

console.log(`Rebrand check passed for ${NEW_BRAND} at ${NEW_DOMAIN}.`);
