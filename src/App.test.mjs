import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("global page styles leave the document root vertically scrollable", () => {
  const source = readFileSync("src/App.jsx", "utf8");

  assert.match(source, /html\{scroll-behavior:smooth;overflow-y:auto\}/);
  assert.match(source, /body\{font-family:'DM Sans',sans-serif;background:\$\{C\.bg\};color:\$\{C\.textSecondary\}\}/);
  assert.doesNotMatch(source, /body\{[^}]*overflow-x/);
  assert.doesNotMatch(source, /html\{[^}]*overflow-x/);
  assert.doesNotMatch(source, /overflow-x:(hidden|clip)/);
});
