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

test("K-5 hub replaces grade cards with the adventure map plus an accessible list fallback", () => {
  const source = readFileSync("src/pages/thought-experiments/K5.jsx", "utf8");

  assert.match(source, /import AdventureMap from "\.\.\/\.\.\/components\/wonder\/AdventureMap\.jsx"/);
  assert.match(source, /const mapZones = ELEMENTARY_GRADES\.map/);
  assert.match(source, /variant="full"/);
  assert.match(source, /Prefer a list\?/);
  assert.match(source, /navigate\(grade\.route\)/);
  assert.doesNotMatch(source, /<TopicCard/);
  assert.doesNotMatch(source, /Divider label="Choose a grade"/);
});

test("Adventure map nodes deep-link stories, mark progress states, and never lock", () => {
  const mapSource = readFileSync("src/components/wonder/AdventureMap.jsx", "utf8");
  const layoutSource = readFileSync("src/components/wonder/mapLayout.js", "utf8");

  assert.match(mapSource, /\?experiment=\$\{experiment\.id\}/);
  assert.match(mapSource, /nodeProgressState/);
  assert.match(mapSource, /aria-label=\{`\$\{experiment\.title\}/);
  assert.match(mapSource, /not yet played/);
  assert.doesNotMatch(mapSource, /is-locked|aria-disabled/);
  assert.match(mapSource, /wonder-map-skip/);
  assert.match(mapSource, /prefers-reduced-motion: reduce/);
  assert.match(mapSource, /onSelectExperiment/);
  assert.match(layoutSource, /zoneIndex % 2 === 1/);
  assert.match(layoutSource, /completionCount/);
});

test("Elementary grade pages show a single-zone progress strip above the story grid", () => {
  const source = readFileSync("src/pages/thought-experiments/ElementaryGrade.jsx", "utf8");

  assert.match(source, /variant="strip"/);
  assert.match(source, /onSelectExperiment=\{openExperiment\}/);
  assert.match(source, /showZoneHeaders=\{false\}/);
  const dividerIndex = source.indexOf("<Divider label={`${grade.label} stories`} />");
  const stripIndex = source.indexOf("variant=\"strip\"");
  const gridIndex = source.indexOf("<ExperimentGrid");
  assert.ok(dividerIndex < stripIndex, "Strip should render under the stories divider.");
  assert.ok(stripIndex < gridIndex, "Strip should render above the story grid.");
});
