import assert from "node:assert/strict";
import test from "node:test";

import {
  BOOK_RESOURCES,
  RESOURCE_CATEGORIES,
  getResourcesForCategory,
  openLibraryBookUrl,
} from "./resourcesLibrary.js";

test("book resources include safe cover and Open Library link metadata", () => {
  assert.equal(BOOK_RESOURCES.length, 20);

  for (const book of BOOK_RESOURCES) {
    assert.ok(book.coverSrc === null || /^https:\/\//.test(book.coverSrc));
    assert.equal(book.url, openLibraryBookUrl(book.isbn));
    assert.equal(book.imageAlt, `Cover of ${book.title}`);
    assert.ok(book.tags.length > 0);
  }
});

test("known-mismatched Open Library covers are not displayed", () => {
  const moralTribes = BOOK_RESOURCES.find((book) => book.id === "moral-tribes-communities");
  const aiMirror = BOOK_RESOURCES.find((book) => book.id === "the-ai-mirror");
  const allMoralTribes = BOOK_RESOURCES.filter((book) => book.title === "Moral Tribes");

  assert.equal(moralTribes.coverSrc, "https://images1.penguinrandomhouse.com/cover/9780143126058");
  assert.ok(allMoralTribes.every((book) => book.coverSrc === "https://images1.penguinrandomhouse.com/cover/9780143126058"));
  assert.ok(![moralTribes.coverSrc, ...moralTribes.fallbackCoverSrcs].some((src) => src?.includes("9780143126058-M.jpg")));
  assert.equal(aiMirror.coverSrc, null);
  assert.deepEqual(aiMirror.fallbackCoverSrcs, []);
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
