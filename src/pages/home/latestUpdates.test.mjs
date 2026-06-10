import assert from "node:assert/strict";
import test from "node:test";

import { LATEST_UPDATES } from "./latestUpdates.js";
import { WHATS_NEW } from "../../data/whatsNew.js";

test("home page latest updates are exactly the three newest WHATS_NEW entries", () => {
  const expected = [...WHATS_NEW].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  assert.deepEqual(
    LATEST_UPDATES.map(({ id, date, title, blurb, url }) => ({ id, date, title, blurb, url })),
    expected.map(({ id, date, title, blurb, url }) => ({ id, date, title, blurb, url })),
    "latestUpdates.js is stale — refresh it from the top of src/data/whatsNew.js"
  );
});
