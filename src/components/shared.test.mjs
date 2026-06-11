import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("EducatorHero keeps image fallback while allowing a custom visual slot", () => {
  const source = readFileSync("src/components/shared.jsx", "utf8");

  assert.match(source, /export function EducatorHero\(\{[^}]*visual = null/);
  assert.match(source, /const visualNode = visual \|\|/);
  assert.match(source, /\{visualNode && \(/);
  assert.match(source, /alt=\{imageAlt \|\| ""\}/);
});
