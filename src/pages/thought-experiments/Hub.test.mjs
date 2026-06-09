import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("thought experiments hub does not render Ari's Goal Tracker before the shared tools", () => {
  const source = readFileSync("src/pages/thought-experiments/Hub.jsx", "utf8");

  assert.doesNotMatch(source, /ThoughtProgressPanel/);
  assert.doesNotMatch(source, /trackerExperimentIds/);

  const pathwayIndex = source.indexOf("<PathwayCardStrip navigate={navigate} />");
  const toolsIndex = source.indexOf("<Divider label=\"Tools for discussion\" />");

  assert.notEqual(pathwayIndex, -1);
  assert.notEqual(toolsIndex, -1);
  assert.ok(pathwayIndex < toolsIndex, "The hub should move directly from the pathway cards into the shared tools section.");
});
