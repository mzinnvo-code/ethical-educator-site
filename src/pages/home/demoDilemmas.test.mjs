import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { DEMO_DILEMMAS, DEMO_ROLES } from "./demoDilemmas.js";

const here = path.dirname(fileURLToPath(import.meta.url));
// Source compared as text (not imported) — experiments.js pulls in JSX scenes
// that node can't load. Unescape \" so quoted dialogue matches the literal.
const source = readFileSync(path.join(here, "../../data/experiments.js"), "utf8").replaceAll('\\"', '"');

// Slice out one experiment's block so asserts can't accidentally match text
// from a different experiment elsewhere in the 2,000-line file.
function experimentBlock(sourceId) {
  const start = source.indexOf(`id: "${sourceId}"`);
  assert.ok(start >= 0, `source experiment ${sourceId} missing`);
  const nextTopLevelId = source.slice(start + 1).search(/\n    id: "/);
  return nextTopLevelId === -1 ? source.slice(start) : source.slice(start, start + 1 + nextTopLevelId);
}

test("demo roles cover the three home page audiences", () => {
  assert.deepEqual(DEMO_ROLES, ["teacher", "leader", "family"]);
  assert.deepEqual(Object.keys(DEMO_DILEMMAS).sort(), [...DEMO_ROLES].sort());
});

for (const [role, dilemma] of Object.entries(DEMO_DILEMMAS)) {
  test(`demo dilemma "${role}" stays verbatim with src/data/experiments.js`, () => {
    const block = experimentBlock(dilemma.sourceId);
    assert.ok(block.includes(dilemma.title), `title drifted: ${dilemma.title}`);
    assert.ok(block.includes(dilemma.prompt), `prompt drifted for ${role}`);
    for (const option of dilemma.options) {
      assert.ok(block.includes(option.text), `option drifted: ${option.text}`);
      assert.ok(block.includes(option.reflection), `reflection drifted: ${option.reflection}`);
    }
    // The turn line is the tail of a template-literal prompt in the source;
    // assert on the verbatim tail after the choice interpolation.
    const turnTail = dilemma.turn.text.replace(/^(You notice|A quiz)/, (m) => m.toLowerCase());
    assert.ok(
      block.includes(dilemma.turn.text) || block.includes(turnTail),
      `turn text drifted for ${role}`
    );
  });
}

test("demo option counts match the source dilemmas (no silently trimmed lenses)", () => {
  assert.equal(DEMO_DILEMMAS.teacher.options.length, 4);
  assert.equal(DEMO_DILEMMAS.leader.options.length, 4);
  assert.equal(DEMO_DILEMMAS.family.options.length, 3);
});
