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

test("grade-band Ari intro hands off to Ari's Goal Tracker before browsing experiments", () => {
  const source = readFileSync("src/pages/thought-experiments/GradePage.jsx", "utf8");

  const introRenderIndex = source.indexOf("<IntroComicStrip comic={introComic} />");
  const trackerRenderIndex = source.indexOf("variant=\"intro\"");
  const narrowWrapperIndex = source.indexOf("<Narrow>");
  const browseDividerIndex = source.indexOf("<Divider label=\"Browse the bank\" />");

  assert.ok(trackerRenderIndex > introRenderIndex, "Goal tracker should be introduced after Ari's comic.");
  assert.ok(trackerRenderIndex < narrowWrapperIndex, "Goal tracker should render at comic width before the narrow experiment-bank wrapper.");
  assert.ok(trackerRenderIndex < browseDividerIndex, "Goal tracker should appear before the experiment bank.");
  assert.match(source, /experimentIds=\{all\.map\(\(experiment\) => experiment\.id\)\}/);
  assert.match(source, /className="thought-progress-wide-wrap"/);
  assert.match(source, /maxWidth: 1080/);
});

test("Deepfake pilot disables the page-level sticky reasoning overlay", () => {
  const source = readFileSync("src/pages/thought-experiments/GradePage.jsx", "utf8");
  const profileSource = readFileSync("src/components/ReasoningProfile.jsx", "utf8");

  assert.match(source, /const isDeepfakeActive = active\?\.id === "deepfake-election" && mode === "story"/);
  assert.match(source, /sticky=\{!isDeepfakeActive\}/);
  assert.match(profileSource, /sticky = true/);
  assert.match(profileSource, /position: sticky \? "sticky" : "static"/);
});
