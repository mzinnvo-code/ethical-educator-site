import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("K-5 hub introduces Ari's Wonder Workshop after the intro comic and before the adventure map", () => {
  const source = readFileSync("src/pages/thought-experiments/K5.jsx", "utf8");

  const introIndex = source.indexOf("<IntroComicStrip comic={getIntroComic(\"thought-experiments/k-5\")} />");
  const trackerIndex = source.indexOf("trackerTheme=\"k5\"");
  const mapIndex = source.indexOf("<AdventureMap");

  assert.match(source, /ThoughtProgressPanel/);
  assert.match(source, /Ari's Wonder Workshop/);
  assert.match(source, /badgeSetId="k5"/);
  assert.match(source, /achievementIds=\{\[\]\}/);
  assert.match(source, /trackerExperimentIds/);
  assert.match(source, /!\s*experiment\.customLayout/);
  assert.match(source, /maxWidth: 1080/);
  assert.ok(trackerIndex > introIndex, "Wonder Workshop should appear after Ari's K-5 comic.");
  assert.ok(mapIndex > trackerIndex, "The adventure map should follow the Wonder Workshop dashboard.");
});

test("K-5 hub shows the grade-island overworld plus an accessible list fallback", () => {
  const source = readFileSync("src/pages/thought-experiments/K5.jsx", "utf8");

  assert.match(source, /import AdventureMap from "\.\.\/\.\.\/components\/wonder\/AdventureMap\.jsx"/);
  assert.match(source, /const mapZones = ELEMENTARY_GRADES\.map/);
  assert.match(source, /variant="overworld"/);
  assert.match(source, /Prefer a list\?/);
  assert.match(source, /navigate\(grade\.route\)/);
  assert.doesNotMatch(source, /<TopicCard/);
  assert.doesNotMatch(source, /Divider label="Choose a grade"/);
});

test("Adventure structure: scene-art islands and lateral level paths that never lock", () => {
  const mapSource = readFileSync("src/components/wonder/AdventureMap.jsx", "utf8");
  const layoutSource = readFileSync("src/components/wonder/mapLayout.js", "utf8");

  // The story artwork (not emoji clip art) fronts every node and island.
  assert.match(mapSource, /getSceneIllustration/);
  assert.match(mapSource, /wonder-island-art/);
  assert.match(mapSource, /wonder-path-art/);

  // Lateral grade path: you-are-here marker, lit segments, exit gate onward.
  assert.match(mapSource, /You are here/);
  assert.match(mapSource, /firstIncompleteId/);
  assert.match(mapSource, /wonder-path-gate/);
  assert.match(mapSource, /Visit the Workshop/);

  assert.match(mapSource, /\?experiment=\$\{experiment\.id\}/);
  assert.match(mapSource, /nodeProgressState/);
  assert.match(mapSource, /aria-label=\{`\$\{experiment\.title\}/);
  assert.match(mapSource, /not yet played/);
  assert.doesNotMatch(mapSource, /is-locked|aria-disabled/);
  assert.match(mapSource, /wonder-map-skip/);
  assert.match(mapSource, /prefers-reduced-motion: reduce/);
  assert.match(mapSource, /onSelectExperiment/);
  assert.match(layoutSource, /firstIncompleteId/);
  assert.match(layoutSource, /completionCount/);
});

test("Elementary grade pages show their lateral story path above the story grid", () => {
  const source = readFileSync("src/pages/thought-experiments/ElementaryGrade.jsx", "utf8");

  assert.match(source, /variant="path"/);
  assert.match(source, /onSelectExperiment=\{openExperiment\}/);
  assert.match(source, /nextGrade=\{ELEMENTARY_GRADES\[/);
  const dividerIndex = source.indexOf("<Divider label={`${grade.label} story path`} />");
  const stripIndex = source.indexOf("variant=\"path\"");
  const gridIndex = source.indexOf("<ExperimentGrid");
  assert.ok(dividerIndex !== -1 && dividerIndex < stripIndex, "Path should render under the story-path divider.");
  assert.ok(stripIndex < gridIndex, "Path should render above the story grid.");
});
