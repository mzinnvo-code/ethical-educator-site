import assert from "node:assert/strict";
import test from "node:test";

import { GAMIFICATION_GAME_ROOMS } from "../../../data/gamificationQuest.js";
import {
  createInitialGamificationGameState,
  normalizeGamificationGameState,
  getClickableWorldNodeIds,
  getNextPlayableNodeId,
  getUnlockedRoomIds,
  completeGamificationRoom,
  enterGamificationRoom,
  returnGamificationToJourneyPath,
} from "./gamificationGameState.js";
import {
  writeGamificationProgress,
} from "./useGamificationQuestProgress.js";

test("gamification v4 state starts on the overworld home node with only upshot unlocked", () => {
  const state = createInitialGamificationGameState();

  assert.equal(state.mode, "overworld");
  assert.equal(state.currentRoomId, "home");
  assert.equal(state.currentWorldNodeId, "home");
  assert.deepEqual(state.unlockedRoomIds, ["upshot"]);
  assert.deepEqual(getUnlockedRoomIds(state), ["home", "upshot"]);
  assert.equal(getNextPlayableNodeId(state, GAMIFICATION_GAME_ROOMS), "upshot");
  assert.deepEqual(getClickableWorldNodeIds(state, GAMIFICATION_GAME_ROOMS), ["upshot"]);
});

test("third door click stays in door transition until the walk-through completes", () => {
  const transition = normalizeGamificationGameState({
    ...createInitialGamificationGameState(),
    mode: "door-transition",
    doorClicks: 3,
    currentRoomId: "home",
    currentWorldNodeId: "home",
  }, GAMIFICATION_GAME_ROOMS);

  assert.equal(transition.mode, "door-transition");
  assert.equal(transition.doorClicks, 3);
  assert.deepEqual(getClickableWorldNodeIds(transition, GAMIFICATION_GAME_ROOMS), []);
});

test("entering, completing, and returning from a room unlocks exactly the next world node", () => {
  const initial = createInitialGamificationGameState();
  const entered = enterGamificationRoom(initial, "upshot", GAMIFICATION_GAME_ROOMS);
  const completed = completeGamificationRoom(entered, "upshot", GAMIFICATION_GAME_ROOMS);
  const returned = returnGamificationToJourneyPath(completed);

  assert.equal(entered.mode, "room");
  assert.equal(entered.currentRoomId, "upshot");
  assert.equal(entered.currentWorldNodeId, "upshot");
  assert.equal(completed.mode, "reward");
  assert.deepEqual(completed.completedRoomIds, ["upshot"]);
  assert.deepEqual(completed.collectedBadgeIds, ["upshot"]);
  assert.deepEqual(completed.unlockedRoomIds, ["upshot", "attention-environment"]);
  assert.equal(returned.mode, "overworld");
  assert.equal(returned.currentRoomId, "upshot");
  assert.equal(returned.currentWorldNodeId, "upshot");
  assert.deepEqual(getClickableWorldNodeIds(returned, GAMIFICATION_GAME_ROOMS), ["attention-environment"]);
});

test("completing a room that is not active leaves quest progress unchanged", () => {
  const initial = createInitialGamificationGameState();
  const completed = completeGamificationRoom(initial, "attention-environment", GAMIFICATION_GAME_ROOMS);

  assert.deepEqual(completed, initial);
});

test("only the next uncompleted unlocked world node is clickable", () => {
  const state = {
    ...createInitialGamificationGameState(),
    completedRoomIds: ["upshot", "attention-environment"],
    collectedBadgeIds: ["upshot", "attention-environment"],
    unlockedRoomIds: ["upshot", "attention-environment", "curiosity-hook"],
    currentRoomId: "attention-environment",
    currentWorldNodeId: "attention-environment",
  };

  assert.deepEqual(getClickableWorldNodeIds(state, GAMIFICATION_GAME_ROOMS), ["curiosity-hook"]);
});

test("finale completion sets finale state without account or server progress", () => {
  const roomIds = GAMIFICATION_GAME_ROOMS.filter((room) => room.kind !== "home").map((room) => room.id);
  const previousRoomIds = roomIds.slice(0, -1);
  const state = {
    ...createInitialGamificationGameState(),
    completedRoomIds: previousRoomIds,
    collectedBadgeIds: previousRoomIds,
    unlockedRoomIds: roomIds,
    currentRoomId: "examined-model",
    currentWorldNodeId: "examined-model",
  };
  const completed = completeGamificationRoom(enterGamificationRoom(state, "finale", GAMIFICATION_GAME_ROOMS), "finale", GAMIFICATION_GAME_ROOMS);

  assert.equal(completed.mode, "finale");
  assert.equal(completed.currentWorldNodeId, "finale");
  assert.equal(completed.finaleSeen, true);
  assert.equal("accountId" in completed, false);
  assert.equal("leaderboardId" in completed, false);
  assert.equal("serverSynced" in completed, false);
});

test("full gamification path completes every room in order and opens the finale", () => {
  let state = createInitialGamificationGameState();
  const roomIds = GAMIFICATION_GAME_ROOMS.filter((room) => room.kind !== "home").map((room) => room.id);

  for (const roomId of roomIds) {
    assert.deepEqual(getClickableWorldNodeIds(state, GAMIFICATION_GAME_ROOMS), [roomId], `${roomId} should be the only clickable next stop`);
    state = enterGamificationRoom(state, roomId, GAMIFICATION_GAME_ROOMS);
    state = completeGamificationRoom(state, roomId, GAMIFICATION_GAME_ROOMS);

    if (roomId !== "finale") {
      assert.equal(state.mode, "reward");
      state = returnGamificationToJourneyPath(state);
      assert.equal(state.mode, "overworld");
      assert.equal(state.currentWorldNodeId, roomId);
    }
  }

  assert.equal(state.mode, "finale");
  assert.equal(state.finaleSeen, true);
  assert.deepEqual(state.completedRoomIds, roomIds);
  assert.deepEqual(state.collectedBadgeIds, roomIds);
  assert.deepEqual(getClickableWorldNodeIds(state, GAMIFICATION_GAME_ROOMS), []);
});

test("blocked browser storage does not throw while preserving in-memory progress", () => {
  const previousWindow = globalThis.window;
  globalThis.window = {
    localStorage: {
      setItem() {
        throw new Error("storage blocked");
      },
    },
  };

  try {
    assert.equal(writeGamificationProgress(createInitialGamificationGameState()), false);
  } finally {
    if (previousWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = previousWindow;
    }
  }
});
