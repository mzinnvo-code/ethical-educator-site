import assert from "node:assert/strict";
import test from "node:test";

import { AI_CONSCIOUSNESS_LESSON_PACKETS } from "./aiConsciousnessLessonPackets.js";

test("consciousness lesson packets cover the planned grade bands", () => {
  assert.deepEqual(
    AI_CONSCIOUSNESS_LESSON_PACKETS.map((packet) => packet.gradeBand),
    ["6-8", "9-12"],
  );
});

test("each consciousness lesson packet is classroom complete", () => {
  for (const packet of AI_CONSCIOUSNESS_LESSON_PACKETS) {
    assert.ok(packet.title.length > 20);
    assert.ok(packet.teacherOverview.length > 100);
    assert.ok(packet.essentialQuestion.endsWith("?"));
    assert.ok(packet.objectives.length >= 3);
    assert.ok(packet.materials.length >= 4);
    assert.ok(packet.vocabulary.length >= 8);
    assert.ok(packet.beforeReading.length >= 2);
    assert.ok(packet.lessonFlow.length >= 4);
    assert.ok(packet.formativeChecks.length >= 3);
    assert.ok(packet.summativeAssessment.prompt.length > 80);
    assert.ok(packet.rubric.criteria.length >= 4);
    assert.ok(packet.differentiation.length >= 3);
    assert.ok(packet.extension.length > 80);
    assert.ok(packet.teacherNotes.length >= 3);
    assert.ok(packet.leveledText.sections.length >= 5);
    assert.ok(packet.leveledText.sections.every((section) => section.body.length > 120));
  }
});

test("standards use portable official families and no placeholder philosophy codes", () => {
  const allStandards = AI_CONSCIOUSNESS_LESSON_PACKETS.flatMap((packet) => packet.standards);

  assert.ok(allStandards.some((standard) => standard.code.startsWith("CCSS.")));
  assert.ok(allStandards.some((standard) => standard.code.startsWith("C3 D1.")));
  assert.ok(allStandards.some((standard) => standard.code.startsWith("C3 D2.Civ.")));
  assert.ok(allStandards.some((standard) => standard.code.startsWith("C3 D3.")));
  assert.ok(allStandards.some((standard) => standard.code.startsWith("C3 D4.")));
  assert.ok(allStandards.some((standard) => standard.code.startsWith("ISTE ")));
  assert.ok(allStandards.some((standard) => standard.code.startsWith("AI4K12 ")));
  assert.ok(!allStandards.some((standard) => standard.code.includes("D2.Phi")));
});

test("sources include official standards pages and article research anchors", () => {
  const urls = AI_CONSCIOUSNESS_LESSON_PACKETS.flatMap((packet) => packet.sources.map((source) => source.href));

  assert.ok(urls.some((url) => url.includes("corestandards.org")));
  assert.ok(urls.some((url) => url.includes("socialstudies.org")));
  assert.ok(urls.some((url) => url.includes("iste.org")));
  assert.ok(urls.some((url) => url.includes("ai4k12.org")));
  assert.ok(urls.some((url) => url.includes("consc.net")));
  assert.ok(urls.some((url) => url.includes("arxiv.org")));
});
