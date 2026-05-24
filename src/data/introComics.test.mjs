import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import { INTRO_COMICS, getIntroComic } from "./introComics.js";

const REQUIRED_KEYS = [
  "thought-experiments",
  "thought-experiments/k-5",
  "thought-experiments/kindergarten",
  "thought-experiments/grade-1",
  "thought-experiments/grade-2",
  "thought-experiments/grade-3",
  "thought-experiments/grade-4",
  "thought-experiments/grade-5",
  "thought-experiments/6-8",
  "thought-experiments/9-12",
];

test("student thought experiment intro comics exist for every planned page", () => {
  assert.deepEqual(
    INTRO_COMICS.map((comic) => comic.key),
    REQUIRED_KEYS,
  );

  for (const key of REQUIRED_KEYS) {
    assert.equal(getIntroComic(key)?.key, key);
  }
  assert.equal(getIntroComic("thought-experiments/educators"), null);
});

test("intro comics expose accessible 5-6 panel scripts with real text", () => {
  for (const comic of INTRO_COMICS) {
    assert.match(comic.id, /^[a-z0-9-]+$/);
    assert.ok(comic.heading.length > 10);
    assert.ok(["teal", "coral", "gold", "ocean", "sky"].includes(comic.accent));
    assert.ok(comic.readAloudText.includes("Ari"));
    assert.ok(comic.panels.length >= 5 && comic.panels.length <= 6);

    for (const [index, panel] of comic.panels.entries()) {
      assert.equal(panel.image.src, `/experiment-scenes/intro-comics/${comic.id}/panel-${String(index + 1).padStart(2, "0")}.webp`);
      assert.match(panel.image.src, /\.webp$/);
      assert.ok(panel.image.alt.length > 20);
      assert.ok(panel.caption.length > 8);
      assert.ok(panel.line.length > 8);
    }
  }
});

test("intro comic panel art files exist in public assets", () => {
  for (const comic of INTRO_COMICS) {
    for (const panel of comic.panels) {
      assert.ok(
        existsSync(`public${panel.image.src}`),
        `missing panel art: public${panel.image.src}`,
      );
    }
  }
});

test("intro comics expose text-free launcher art for the invitation card", () => {
  for (const comic of INTRO_COMICS) {
    assert.equal(
      comic.launcherImage.src,
      `/experiment-scenes/intro-comics/${comic.id}/launcher.webp`,
    );
    assert.match(comic.launcherImage.src, /\.webp$/);
    assert.ok(comic.launcherImage.alt.length > 20);
    assert.ok(
      existsSync(`public${comic.launcherImage.src}`),
      `missing launcher art: public${comic.launcherImage.src}`,
    );
  }
});

test("intro comics end by welcoming students to start exploring", () => {
  for (const comic of INTRO_COMICS) {
    const finalPanel = comic.panels.at(-1);

    assert.match(
      finalPanel.line,
      /\b(welcome|start|try|explore|choose)\b/i,
      `${comic.key} final panel should invite students into the thought experiments`,
    );
  }
});
