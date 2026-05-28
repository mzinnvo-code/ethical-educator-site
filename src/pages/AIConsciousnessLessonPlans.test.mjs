import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync("src/App.jsx", "utf8");
const articleSource = readFileSync("src/pages/AIConsciousness.jsx", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const sitemap = readFileSync("public/sitemap.xml", "utf8");

test("consciousness lesson plans route is registered for app, prerender, and sitemap", () => {
  assert.match(appSource, /AIConsciousnessLessonPlans/);
  assert.match(appSource, /"ai-consciousness\/lesson-plans"/);
  assert.ok(packageJson.prerender.include.includes("/ai-consciousness/lesson-plans"));
  assert.match(sitemap, /https:\/\/examinedclassroom\.com\/ai-consciousness\/lesson-plans/);
});

test("consciousness article has a teacher-facing lesson packet CTA", () => {
  assert.match(articleSource, /Bring This Essay Into Your Classroom/);
  assert.match(articleSource, /Open the Lesson Packets/);
  assert.match(articleSource, /ai-consciousness\/lesson-plans/);
});
