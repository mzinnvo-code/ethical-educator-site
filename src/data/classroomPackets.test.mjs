import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getClassroomPacket } from "./classroomPackets.js";

test("paperclip maximizer packet has the premium classroom packet structure", () => {
  const packet = getClassroomPacket("paperclip-maximizer");

  assert.equal(packet.slug, "paperclip-maximizer");
  assert.equal(packet.experimentId, "paperclip-maximizer");
  assert.equal(packet.visualStyle.body, "premium-curriculum");
  assert.equal(packet.visualStyle.openers, "editorial-philosophy");
  assert.ok(packet.pages.length >= 6, "packet should not be constrained to a cramped two-page handout");

  const pageKinds = new Set(packet.pages.map(page => page.kind));
  assert.ok(pageKinds.has("cover"), "packet should include a polished cover");
  assert.ok(pageKinds.has("teacher-guide"), "packet should include teacher-facing guidance");
  assert.ok(pageKinds.has("section-opener"), "packet should include editorial section openers");
  assert.ok(pageKinds.has("student-worksheet"), "packet should include photocopy-ready student pages");
  assert.ok(pageKinds.has("teacher-support"), "packet should include support notes");
  assert.ok(pageKinds.has("extension"), "packet should include extension material");
});

test("paperclip packet route and teacher-kit entry point are wired", () => {
  const appSource = readFileSync("src/App.jsx", "utf8");
  const teacherKitSource = readFileSync("src/components/TeacherKit.jsx", "utf8");
  const highSchoolSource = readFileSync("src/data/highSchoolScenarioCopy.js", "utf8");

  assert.match(appSource, /thought-experiments\/packet\/paperclip-maximizer/);
  assert.match(teacherKitSource, /Open classroom packet/);
  assert.match(teacherKitSource, /kit\.packetSlug/);
  assert.match(highSchoolSource, /packetSlug:\s*"paperclip-maximizer"/);
});
