import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { EDUCATOR_RESOURCE_GROUPS, EDUCATOR_RESOURCES } from "../../data/educatorResources.js";
import { OG_PAGES_BY_ID } from "../../data/ogPages.js";

// The game experience is split across focused modules; string-coupled
// assertions read the joined sources so refactors inside the directory
// don't silently drop load-bearing markup.
const GAME_SOURCE_FILES = [
  "src/pages/educators/gamification/GamificationGameExperience.jsx",
  "src/pages/educators/gamification/QuestHud.jsx",
  "src/pages/educators/gamification/RoomOverlay.jsx",
  "src/pages/educators/gamification/QuestLoadingScreen.jsx",
  "src/pages/educators/gamification/QuestCelebrationOverlay.jsx",
  "src/pages/educators/gamification/questStyles.js",
  "src/pages/educators/gamification/questAudio.js",
  "src/pages/educators/gamification/useQuestReducedMotion.js",
  "src/pages/educators/gamification/phaser/GamefulLearningScene.js",
];

function readGameSources() {
  return GAME_SOURCE_FILES.map((file) => readFileSync(file, "utf8")).join("\n");
}

test("gamification article is registered in the educator engagement pathway", () => {
  const resource = EDUCATOR_RESOURCES["gamification-in-education"];
  const engagementGroup = EDUCATOR_RESOURCE_GROUPS.find((group) => group.label === "Student Engagement");

  assert.equal(resource.title, "Gamification in Education");
  assert.match(resource.desc, /contested attention/i);
  assert.doesNotMatch(resource.desc, /attention spans/i);
  assert.match(resource.desc, /Thought Experiments/i);
  assert.ok(engagementGroup.ids.includes("gamification-in-education"));
});

test("gamification article route is wired for rendering, metadata, search, prerendering, and crawlability", () => {
  const app = readFileSync("src/App.jsx", "utf8");
  const searchDocs = readFileSync("src/lib/searchDocs.js", "utf8");
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const prerender = readFileSync("scripts/prerender-site.mjs", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.match(app, /GamificationInEducation/);
  assert.match(app, /"gamification-in-education": GamificationInEducation/);
  assert.match(app, /Gamification in Education - The Examined Classroom/);
  assert.match(searchDocs, /"gamification-in-education": "For Educators"/);
  assert.ok(pkg.prerender.include.includes("/gamification-in-education"));
  assert.match(sitemap, /https:\/\/examinedclassroom\.com\/gamification-in-education/);
  assert.equal(OG_PAGES_BY_ID["gamification-in-education"].title, "Gamification in Education");
  assert.match(prerender, /"gamification-in-education": \{/);
  assert.match(prerender, /Attention is now contested/);
  assert.match(prerender, /GAMIFICATION_GAME_LEVELS/);
  assert.match(prerender, /GAMIFICATION_QUEST_SOURCES/);
});

test("production CSP allows Phaser image blobs for gamification textures", () => {
  const prerender = readFileSync("scripts/prerender-site.mjs", "utf8");

  assert.match(prerender, /img-src 'self' data: blob:/);
});

test("gamification article is a playable quest with local browser-only progress", () => {
  const page = [
    readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8"),
    readFileSync("src/pages/educators/gamification/QuestComponents.jsx", "utf8"),
    readGameSources(),
  ].join("\n");

  assert.match(page, /Gameful Learning Lab/);
  assert.match(page, /GAMIFICATION_QUEST_STORAGE_KEY/);
  assert.match(page, /doorClicks/);
  assert.doesNotMatch(page, /Skip the intro/);
  assert.match(page, /aria-label="Knock on the Gameful Learning Lab door"/);
  assert.match(page, /progress\.mode === "door-transition"/);
});

test("gamification page uses a locked fullscreen game shell instead of a scroll article", () => {
  const app = readFileSync("src/App.jsx", "utf8");
  const page = readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8");
  const game = readGameSources();

  assert.match(app, /IMMERSIVE_PAGE_IDS/);
  assert.match(app, /isImmersivePage/);
  assert.match(app, /!isImmersivePage && <TeachingResourceRail/);
  assert.match(app, /!isImmersivePage && <footer/);
  assert.match(app, /!isImmersivePage && <header className="topbar"/);
  assert.match(page, /GamificationGameExperience/);
  assert.match(page, /Back to Educator Resources/);
  assert.match(page, /className="gamification-crawlable-fallback"/);
  assert.doesNotMatch(page, /aria-hidden="true"/);
  assert.doesNotMatch(page, /tabIndex=\{-1\}/);
  assert.doesNotMatch(page, /GamificationAriVisual/);
  assert.doesNotMatch(page, /LevelCard/);
  assert.doesNotMatch(page, /QuestNav/);
  assert.doesNotMatch(page, /EducatorResourceNav/);
  assert.doesNotMatch(page, /ContinueExploring/);
  assert.doesNotMatch(page, /gamification-article-intro/);
  assert.match(page, /gamification-locked-shell/);
  assert.match(page, /overflow: "hidden"/);
  assert.match(game, /data-testid="gamification-game-frame"/);
  assert.match(game, /data-testid="gamification-phaser-stage"/);
  assert.match(game, /GamificationPhaserGame/);
  assert.match(game, /data-testid="gamification-dialogue-overlay"/);
  assert.match(game, /data-testid="gamification-pixel-hud"/);
  assert.match(game, /data-testid="gamification-mission-log"/);
  assert.match(game, /Ari's full briefing/);
  assert.match(game, /className="gamification-phaser-shell"/);
  assert.match(game, /className="gamification-overworld-prompt"/);
  assert.match(game, /className="gamification-room-overlay"/);
  assert.match(game, /--gamification-hud-safe-top/);
  assert.match(game, /calc\(100dvh - var\(--gamification-hud-safe-top\)\)/);
  assert.match(game, /TYPEWRITER_CHARACTER_MS/);
  assert.match(game, /prefers-reduced-motion/);
  assert.match(game, /Ready to continue your journey/);
  assert.match(game, /Return to Journey Path/);
  assert.match(game, /gamification-return-gate/);
  assert.match(game, /returnGate/);
  assert.doesNotMatch(game, /gamification-floating-return/);
  assert.doesNotMatch(game, /gamification-rail-map/);
  assert.doesNotMatch(game, /gamification-room-door-grid/);
  assert.doesNotMatch(game, /Return to hub/);
  assert.doesNotMatch(game, /SceneWindow/);
  assert.doesNotMatch(game, />\s*Move Ari\s*</);
  assert.match(game, /Mute/);
});

test("gamification transcript stays visually hidden but accessibility-readable before finale", () => {
  const page = readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8");
  const components = readFileSync("src/pages/educators/gamification/QuestComponents.jsx", "utf8");

  assert.match(page, /aria-label="Gamification in Education transcript"/);
  assert.match(page, /className="gamification-crawlable-fallback"/);
  assert.doesNotMatch(page, /aria-hidden/);
  assert.doesNotMatch(page, /tabIndex=\{-1\}/);
  assert.match(components, /\.gamification-crawlable-fallback:focus-within/);
  assert.match(components, /clip-path: none !important/);
});

test("privacy copy discloses gamification quest localStorage use", () => {
  const privacy = readFileSync("src/pages/Privacy.jsx", "utf8");

  assert.match(privacy, /Gamification in Education playable quest stores local-only progress/);
  assert.match(privacy, /door progress, completed rooms, earned badges, mute preference, and finale state/);
  assert.match(privacy, /reset the Gamification in Education quest from its in-game controls/);
  assert.match(privacy, /Gamification in Education quest store entries and progress only in the user's own browser/);
});

test("gamification article door scene is animated instead of an enter-article button", () => {
  const components = readFileSync("src/pages/educators/gamification/QuestComponents.jsx", "utf8");

  assert.match(components, /gamification-door-hotspot/);
  assert.match(components, /playQuestSound/);
  assert.match(components, /gamification-door-knock/);
  assert.match(components, /gamification-door-strong-knock/);
  assert.match(components, /gamification-door-cracked/);
  assert.match(components, /gamification-door-opening/);
  assert.match(components, /gamification-ari-walk-through/);
  assert.doesNotMatch(components, /Enter the article/);
  assert.doesNotMatch(components, /Knock \$\{progress\.doorClicks \+ 1\}\/3/);
});

test("gamification game has explicit map and level modes with a home start", () => {
  const game = readGameSources();
  const hook = readFileSync("src/pages/educators/gamification/useGamificationQuestProgress.js", "utf8");

  assert.match(hook, /mode: "door"/);
  assert.match(hook, /door-transition/);
  assert.match(hook, /currentRoomId: "home"/);
  assert.match(hook, /unlockedRoomIds: \["upshot"\]/);
  assert.match(hook, /currentWorldNodeId: "home"/);
  assert.match(game, /mode === "overworld"/);
  assert.match(game, /mode === "room"/);
  assert.match(hook, /returnGamificationToJourneyPath/);
  assert.match(hook, /enterGamificationRoom/);
});

test("gamification typewriter and Ari choreography are stable game-state bridges", () => {
  const game = readGameSources();

  assert.match(game, /onDoneRef/);
  assert.match(game, /onTalkingChangeRef/);
  assert.match(game, /completedRef/);
  assert.match(game, /setAriTalking\(ariTalking\)/);
  assert.match(game, /ariExitTarget/);
  assert.match(game, /exitRoom/);
  assert.match(game, /return-gate/);
  assert.match(game, /travelFallbackRef/);
  assert.match(game, /this\.traveling = false/);
  assert.doesNotMatch(game, /\[forceRevealed,\s*muted,\s*onDone,\s*reduced,\s*replayToken,\s*text\]/);
  assert.doesNotMatch(game, /onTalkingChange=\{\(\) => \{\}\}/);
});

test("gamification badge and finale completions trigger guarded celebrations", () => {
  const game = readGameSources();

  assert.match(game, /data-testid=\{finale \? "gamification-finale-celebration" : "gamification-celebration"\}/);
  assert.match(game, /QuestCelebrationOverlay/);
  assert.match(game, /prevCompletedCountRef/);
  assert.match(game, /GAMEFUL_CHARTER/);
  assert.match(game, /gamification-finale-charter/);
  assert.match(game, /Continue the journey/);
  assert.match(game, /Stay in this room/);
  assert.match(game, /Replay the quest/);
  assert.match(game, /gamification-save-toast/);
});

test("gamification door scene sells the quest and offers resume", () => {
  const components = readFileSync("src/pages/educators/gamification/QuestComponents.jsx", "utf8");
  const page = readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8");

  assert.match(components, /9 stops · about 30 minutes/);
  assert.match(components, /No sign-in — progress stays in this browser/);
  assert.match(components, /What you will learn/);
  assert.match(components, /gamification-resume-chip/);
  assert.match(components, /Welcome back/);
  assert.match(page, /Gameful Learning Charter/);
  assert.match(page, /GAMEFUL_CHARTER/);
});

test("gamification room rail is tabbed with classroom guidance", () => {
  const game = readGameSources();

  assert.match(game, /gamification-rail-tabs/);
  assert.match(game, /role="tablist"/);
  assert.match(game, /gamification-gradeband-card/);
  assert.match(game, /gamification-meta-callout/);
  assert.match(game, /gamification-caution-card/);
  assert.match(game, /gamification-pilot-scorecard/);
  assert.match(game, /gamification-lesson-blueprint/);
  assert.match(game, /Copy my loop draft/);
  assert.match(game, /gamification-te-link/);
  assert.match(game, /gamification-bonus-check/);
});

test("gamification quest is cross-linked from the engagement resource", () => {
  const engagement = readFileSync("src/pages/educators/EnhancingEngagement.jsx", "utf8");

  assert.match(engagement, /gamification-in-education/);
});

test("gamification teacher kit route is registered and single-sourced from quest data", () => {
  const app = readFileSync("src/App.jsx", "utf8");
  const searchDocs = readFileSync("src/lib/searchDocs.js", "utf8");
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const prerender = readFileSync("scripts/prerender-site.mjs", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const kit = readFileSync("src/pages/educators/GamificationTeacherKit.jsx", "utf8");
  const game = readGameSources();

  assert.match(app, /"gamification-teacher-kit": GamificationTeacherKit/);
  assert.match(searchDocs, /"gamification-teacher-kit": "For Educators"/);
  assert.ok(pkg.prerender.include.includes("/gamification-teacher-kit"));
  assert.match(sitemap, /https:\/\/examinedclassroom\.com\/gamification-teacher-kit/);
  assert.equal(OG_PAGES_BY_ID["gamification-teacher-kit"].title, "Gameful Learning Teacher Kit");
  assert.match(prerender, /"gamification-teacher-kit": \{/);
  assert.match(kit, /GAMEFUL_CHARTER/);
  assert.match(kit, /GAMEFUL_RULES/);
  assert.match(kit, /lessonBlueprint/);
  assert.match(kit, /pilotScorecard/);
  assert.match(kit, /promptRecipe/);
  assert.match(kit, /window\.print\(\)/);
  assert.match(kit, /no-print/);
  assert.match(kit, /quest_kit_open/);
  assert.match(kit, /quest_kit_print/);
  assert.match(game, /gamification-teacher-kit/);
});

test("gamification quest reports anonymous funnel events with session dedupe", () => {
  const game = readGameSources();
  const page = readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8");
  const analytics = readFileSync("src/pages/educators/gamification/questAnalytics.js", "utf8");

  assert.match(analytics, /sentEvents/);
  assert.doesNotMatch(analytics, /userId|sessionId|email|localStorage|Date\.now/);
  assert.match(game, /quest_room_start/);
  assert.match(game, /quest_room_complete/);
  assert.match(game, /quest_finale_complete/);
  assert.match(game, /first-try/);
  assert.match(page, /quest_door_opened/);
  assert.match(page, /quest_resume/);
  assert.match(page, /quest_reset/);
});

test("gamification quest layers sampled audio over synth fallbacks with ambient music", () => {
  const audio = readFileSync("src/pages/educators/gamification/questAudio.js", "utf8");
  const game = readGameSources();
  const hud = readFileSync("src/pages/educators/gamification/QuestHud.jsx", "utf8");
  const manifest = JSON.parse(readFileSync("src/data/gamificationAudioManifest.json", "utf8"));
  const script = readFileSync("scripts/generate-gamification-audio.mjs", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.match(audio, /SAMPLE_BY_CUE/);
  assert.match(audio, /playSample/);
  assert.match(audio, /questMusic/);
  assert.match(audio, /primeQuestAudio/);
  assert.match(game, /quest-theme/);
  assert.match(game, /room-theme/);
  assert.match(game, /musicMuted/);
  assert.match(hud, /Ambient music/);
  assert.ok(typeof manifest.items === "object");
  assert.match(script, /GAMIFICATION_AUDIO_CATALOG/);
  assert.match(script, /public\/audio\/gamification/);
  assert.equal(pkg.scripts["audio:gamification"], "node --env-file=.env.local scripts/generate-gamification-audio.mjs");
});

test("gamification article keeps attention claims careful and source-linked", () => {
  const page = [
    readFileSync("src/pages/educators/GamificationInEducation.jsx", "utf8"),
    readFileSync("src/data/gamificationQuest.js", "utf8"),
  ].join("\n");

  assert.match(page, /students have not simply lost attention biologically/i);
  assert.match(page, /environment now competes with faster rewards/i);
  assert.match(page, /The Anxious Generation/i);
  assert.match(page, /Mark Rober/i);
  assert.doesNotMatch(page, /goldfish myth as fact/i);
});
