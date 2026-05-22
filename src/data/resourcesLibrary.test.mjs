import assert from "node:assert/strict";
import test from "node:test";

import {
  BOOK_RESOURCES,
  RESOURCE_CATEGORIES,
  getResourcesForCategory,
  openLibraryBookUrl,
} from "./resourcesLibrary.js";

test("book resources include Open Library cover and link metadata", () => {
  assert.equal(BOOK_RESOURCES.length, 20);

  for (const book of BOOK_RESOURCES) {
    assert.match(book.coverSrc, /^https:\/\/covers\.openlibrary\.org\/b\/ISBN\/[0-9X]+-M\.jpg\?default=false$/);
    assert.equal(book.url, openLibraryBookUrl(book.isbn));
    assert.equal(book.imageAlt, `Cover of ${book.title}`);
    assert.ok(book.tags.length > 0);
  }
});

test("guided categories expose the expected resource buckets", () => {
  assert.deepEqual(
    RESOURCE_CATEGORIES.map((category) => category.id),
    ["books", "research", "policy", "organizations", "media"],
  );
});

test("theme filtering keeps research and policy items discoverable", () => {
  const aiEducationItems = getResourcesForCategory("research", "ai-education");
  const moralPsychItems = getResourcesForCategory("research", "moral-psychology");

  assert.ok(aiEducationItems.some((item) => item.title.includes("UNESCO")));
  assert.ok(moralPsychItems.some((item) => item.title.includes("Greene")));
});
