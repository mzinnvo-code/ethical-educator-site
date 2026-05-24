import assert from "node:assert/strict";
import test from "node:test";

import { getElementaryExperimentRoute } from "./elementaryRouting.js";

test("custom elementary experiments open their standalone route", () => {
  assert.equal(
    getElementaryExperimentRoute({
      id: "explaining-red-k-2",
      customRoute: "thought-experiments/explaining-red-k-2",
    }),
    "thought-experiments/explaining-red-k-2",
  );
});

test("standard elementary experiments stay in the grade page", () => {
  assert.equal(getElementaryExperimentRoute({ id: "rude-toy" }), null);
});
