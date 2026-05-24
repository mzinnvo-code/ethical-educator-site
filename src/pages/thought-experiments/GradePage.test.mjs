import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("grade-band intro comic renders at the wide page-container level", () => {
  const source = readFileSync("src/pages/thought-experiments/GradePage.jsx", "utf8");

  const introRenderIndex = source.indexOf("<IntroComicStrip comic={introComic} />");
  const narrowWrapperIndex = source.indexOf("<Narrow>");

  assert.notEqual(introRenderIndex, -1);
  assert.notEqual(narrowWrapperIndex, -1);
  assert.ok(
    introRenderIndex < narrowWrapperIndex,
    "Expected the intro comic launcher to render before <Narrow> so it matches the wider hub-page launcher width.",
  );
});
