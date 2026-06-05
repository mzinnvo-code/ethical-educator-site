import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { EDUCATOR_RESOURCE_GROUPS, EDUCATOR_RESOURCES } from "../../data/educatorResources.js";
import { OG_PAGES_BY_ID } from "../../data/ogPages.js";

test("gamification article is registered in the educator engagement pathway", () => {
  const resource = EDUCATOR_RESOURCES["gamification-in-education"];
  const engagementGroup = EDUCATOR_RESOURCE_GROUPS.find((group) => group.label === "Student Engagement");

  assert.equal(resource.title, "Gamification in Education");
  assert.match(resource.desc, /attention spans/i);
  assert.match(resource.desc, /Thought Experiments/i);
  assert.ok(engagementGroup.ids.includes("gamification-in-education"));
});

test("gamification article route is wired for rendering, metadata, search, prerendering, and crawlability", () => {
  const app = readFileSync("src/App.jsx", "utf8");
  const searchDocs = readFileSync("src/lib/searchDocs.js", "utf8");
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.match(app, /GamificationInEducation/);
  assert.match(app, /"gamification-in-education": GamificationInEducation/);
  assert.match(app, /Gamification in Education - The Examined Classroom/);
  assert.match(searchDocs, /"gamification-in-education": "For Educators"/);
  assert.ok(pkg.prerender.include.includes("/gamification-in-education"));
  assert.match(sitemap, /https:\/\/examinedclassroom\.com\/gamification-in-education/);
  assert.equal(OG_PAGES_BY_ID["gamification-in-education"].title, "Gamification in Education");
});
