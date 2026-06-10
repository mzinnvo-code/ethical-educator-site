import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { EDUCATOR_RESOURCE_GROUPS, EDUCATOR_RESOURCES } from "../../data/educatorResources.js";
import { OG_PAGES_BY_ID } from "../../data/ogPages.js";

function webpDimensions(path) {
  const buffer = readFileSync(path);
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;
    if (chunkType === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(chunkStart + 4, 3),
        height: 1 + buffer.readUIntLE(chunkStart + 7, 3),
      };
    }
    if (chunkType === "VP8 ") {
      return {
        width: buffer.readUInt16LE(chunkStart + 6) & 0x3fff,
        height: buffer.readUInt16LE(chunkStart + 8) & 0x3fff,
      };
    }
    if (chunkType === "VP8L") {
      const bits = buffer.readUInt32LE(chunkStart + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    offset = chunkStart + chunkSize + (chunkSize % 2);
  }
  throw new Error(`Could not read WebP dimensions for ${path}`);
}

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

test("gamification article uses dedicated Ari game-learning educator art", () => {
  const resource = EDUCATOR_RESOURCES["gamification-in-education"];
  const assetPath = `public${resource.image}`;

  assert.equal(resource.image, "/illustrations/educators/gamification-in-education.webp");
  assert.notEqual(resource.image, EDUCATOR_RESOURCES["enhancing-engagement"].image);
  assert.doesNotMatch(resource.imageAlt, /discussion cards|puzzle pieces/i);
  assert.match(resource.imageAlt, /Ari/i);
  assert.match(resource.imageAlt, /gameful learning|gamification/i);
  assert.equal(existsSync(assetPath), true, `${assetPath} should exist`);

  const { width, height } = webpDimensions(assetPath);
  assert.equal(width, 1000);
  assert.equal(height, 1000);

  const illustrationsReadme = readFileSync("public/illustrations/README.md", "utf8");
  assert.match(illustrationsReadme, /gamification-in-education\.webp/);
});
