import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("GamificationAriVisual reuses Ari pixel assets for article-only motion", () => {
  const source = readFileSync("src/components/GamificationAriVisual.jsx", "utf8");
  const article = readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8");
  const hub = readFileSync("src/pages/ForEducators.jsx", "utf8");

  assert.match(source, /DEEPFAKE_GAME_ASSETS\.portraits\.ariIdle/);
  assert.match(source, /DEEPFAKE_GAME_ASSETS\.portraits\.ariTalkA/);
  assert.match(source, /DEEPFAKE_GAME_ASSETS\.portraits\.ariTalkB/);
  assert.match(source, /BRAIN_PROGRESS_ASSETS\[5\]/);
  assert.match(source, /MASTERY_BADGE_ASSETS\["first-dilemma"\]/);
  assert.match(source, /aria-label="Animated pixel scene of Ari learning through gameful feedback"/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /gamification-ari-talk-a/);
  assert.match(source, /gamification-ari-progress-pulse/);
  assert.doesNotMatch(source, /\b(?:leaderboard|XP|points)\b/i);

  assert.match(article, /import GamificationAriVisual/);
  assert.match(article, /visual=\{<GamificationAriVisual/);
  assert.doesNotMatch(hub, /GamificationAriVisual/);
});

test("EducatorHero keeps image fallback while allowing a custom visual slot", () => {
  const source = readFileSync("src/components/shared.jsx", "utf8");

  assert.match(source, /export function EducatorHero\(\{[^}]*visual = null/);
  assert.match(source, /const visualNode = visual \|\|/);
  assert.match(source, /\{visualNode && \(/);
  assert.match(source, /alt=\{imageAlt \|\| ""\}/);
});
