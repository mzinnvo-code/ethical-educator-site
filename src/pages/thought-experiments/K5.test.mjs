import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("K-5 hub introduces Ari's Wonder Workshop after the intro comic and before grade cards", () => {
  const source = readFileSync("src/pages/thought-experiments/K5.jsx", "utf8");

  const introIndex = source.indexOf("<IntroComicStrip comic={getIntroComic(\"thought-experiments/k-5\")} />");
  const trackerIndex = source.indexOf("trackerTheme=\"k5\"");
  const narrowIndex = source.indexOf("<Narrow>");
  const gradeIndex = source.indexOf("<Divider label=\"Choose a grade\" />");

  assert.match(source, /ThoughtProgressPanel/);
  assert.match(source, /Ari's Wonder Workshop/);
  assert.match(source, /badgeSetId="k5"/);
  assert.match(source, /achievementIds=\{\[\]\}/);
  assert.match(source, /trackerExperimentIds/);
  assert.match(source, /!\s*experiment\.customLayout/);
  assert.match(source, /maxWidth: 1080/);
  assert.ok(trackerIndex > introIndex, "Wonder Workshop should appear after Ari's K-5 comic.");
  assert.ok(trackerIndex < narrowIndex, "Wonder Workshop should render at comic width.");
  assert.ok(trackerIndex < gradeIndex, "Wonder Workshop should appear before the grade card bank.");
});
