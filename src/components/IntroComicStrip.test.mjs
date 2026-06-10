import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("intro comic initially renders as an Ari launcher, not a full panel grid", () => {
  const source = readFileSync("src/components/IntroComicStrip.jsx", "utf8");

  assert.match(source, /Start Ari's intro comic/);
  assert.match(source, /launcherImage/);
  assert.doesNotMatch(source, /String\(index \+ 1\)\.padStart\(2, "0"\)} \/ {panel\.caption}/);
});

test("intro comic launcher does not trap page scroll at the section level", () => {
  const source = readFileSync("src/components/IntroComicStrip.jsx", "utf8");

  assert.match(source, /className="intro-comic-strip"/);
  assert.doesNotMatch(source, /className="intro-comic-strip"[\s\S]{0,420}overflow: "hidden"/);
  assert.match(source, /className="intro-comic-art-frame"/);
  assert.match(source, /overflow: "hidden"/);
});

test("intro comic source includes an accessible pop-out reader contract", () => {
  const source = readFileSync("src/components/IntroComicStrip.jsx", "utf8");

  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /keydown/);
  assert.match(source, /Escape/);
  assert.match(source, /Read this panel aloud/);
  assert.match(source, /<footer/);
  assert.match(source, /Comic panel progress/);
  assert.match(source, /Start exploring/);
  assert.match(source, /activeIndex === panelCount - 1/);
});
