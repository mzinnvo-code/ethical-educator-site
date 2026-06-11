import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("elementary story grids do not render Ari's Goal Tracker before the stories", () => {
  const source = readFileSync("src/pages/thought-experiments/ElementaryGrade.jsx", "utf8");

  assert.doesNotMatch(source, /ThoughtProgressPanel/);

  const comicIndex = source.indexOf("<IntroComicStrip comic={getIntroComic(grade.route)} />");
  const storiesIndex = source.indexOf("<Divider label={`${grade.label} story path`} />");

  assert.notEqual(comicIndex, -1);
  assert.notEqual(storiesIndex, -1);
  assert.ok(comicIndex < storiesIndex, "Elementary pages should move from Ari's intro comic into the story grid.");
});
