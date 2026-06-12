const MAX_DOOR_CLICKS = 3;
const HOME_ROOM_ID = "home";
const FIRST_ROOM_ID = "upshot";
const VALID_MODES = new Set(["door", "door-transition", "overworld", "room", "reward", "finale"]);
const VALID_TEXT_SPEEDS = new Set(["slow", "normal", "instant"]);
const VALID_GRADE_BANDS = new Set(["k-2", "3-5", "6-8", "9-12"]);

function uniqueStrings(value) {
  return Array.isArray(value)
    ? [...new Set(value.filter((item) => typeof item === "string" && item.length > 0))]
    : [];
}

function playableRooms(rooms) {
  return rooms.filter((room) => room.kind !== "home");
}

function roomIds(rooms) {
  return playableRooms(rooms).map((room) => room.id);
}

function nextRoomId(roomId, rooms) {
  const ids = roomIds(rooms);
  const index = ids.indexOf(roomId);
  return index >= 0 ? ids[index + 1] : undefined;
}

function normalizeRoomIds(ids, rooms) {
  const valid = new Set(roomIds(rooms));
  return uniqueStrings(ids).filter((id) => valid.has(id));
}

export function createInitialGamificationGameState() {
  return {
    doorClicks: 0,
    mode: "overworld",
    currentRoomId: HOME_ROOM_ID,
    currentWorldNodeId: HOME_ROOM_ID,
    activeRoomId: null,
    unlockedRoomIds: [FIRST_ROOM_ID],
    completedRoomIds: [],
    collectedBadgeIds: [],
    soundMuted: false,
    musicMuted: false,
    reducedMotion: false,
    textSpeed: "normal",
    gradeBand: "6-8",
    finaleSeen: false,
  };
}

export function normalizeGamificationGameState(value, rooms) {
  const input = value && typeof value === "object" ? value : {};
  const validPlayableIds = roomIds(rooms);
  const validAllIds = new Set([HOME_ROOM_ID, ...validPlayableIds]);
  const completedRoomIds = normalizeRoomIds(input.completedRoomIds, rooms);
  const collectedBadgeIds = uniqueStrings([
    ...normalizeRoomIds(input.collectedBadgeIds, rooms),
    ...completedRoomIds,
  ]);
  const highestCompletedIndex = completedRoomIds.reduce(
    (highest, roomId) => Math.max(highest, validPlayableIds.indexOf(roomId)),
    -1,
  );
  const sequentialUnlocks = validPlayableIds.slice(0, Math.min(validPlayableIds.length, highestCompletedIndex + 2));
  const unlockedRoomIds = uniqueStrings([
    FIRST_ROOM_ID,
    ...normalizeRoomIds(input.unlockedRoomIds, rooms),
    ...sequentialUnlocks,
  ]);
  const requestedMode = input.mode === "hub" ? "overworld" : input.mode;
  const rawMode = typeof requestedMode === "string" && VALID_MODES.has(requestedMode) ? requestedMode : "overworld";
  const requestedCurrentRoomId = typeof input.currentRoomId === "string" && validAllIds.has(input.currentRoomId)
    ? input.currentRoomId
    : HOME_ROOM_ID;
  const requestedWorldNodeId = typeof input.currentWorldNodeId === "string" && validAllIds.has(input.currentWorldNodeId)
    ? input.currentWorldNodeId
    : requestedCurrentRoomId;
  const currentRoomId = requestedCurrentRoomId === HOME_ROOM_ID || unlockedRoomIds.includes(requestedCurrentRoomId)
    ? requestedCurrentRoomId
    : HOME_ROOM_ID;
  const currentWorldNodeId = requestedWorldNodeId === HOME_ROOM_ID || unlockedRoomIds.includes(requestedWorldNodeId) || completedRoomIds.includes(requestedWorldNodeId)
    ? requestedWorldNodeId
    : HOME_ROOM_ID;
  const requestedActiveRoomId = typeof input.activeRoomId === "string" && unlockedRoomIds.includes(input.activeRoomId)
    ? input.activeRoomId
    : null;
  const doorClicks = Math.max(0, Math.min(MAX_DOOR_CLICKS, Number.isFinite(input.doorClicks) ? input.doorClicks : 0));
  const mode = rawMode === "door" || rawMode === "door-transition"
    ? (doorClicks >= MAX_DOOR_CLICKS ? "door-transition" : "door")
    : (rawMode === "room" || rawMode === "reward") && !requestedActiveRoomId
      ? "overworld"
      : rawMode;
  const visibleWorldNodeId = mode === "room" || mode === "reward" || mode === "finale"
    ? requestedActiveRoomId || currentWorldNodeId
    : currentWorldNodeId;

  return {
    doorClicks,
    mode,
    currentRoomId: mode === "overworld" ? visibleWorldNodeId : currentRoomId,
    currentWorldNodeId: visibleWorldNodeId,
    activeRoomId: mode === "room" || mode === "reward" ? requestedActiveRoomId : null,
    unlockedRoomIds,
    completedRoomIds,
    collectedBadgeIds,
    soundMuted: input.soundMuted === true,
    musicMuted: input.musicMuted === true,
    reducedMotion: input.reducedMotion === true,
    textSpeed: VALID_TEXT_SPEEDS.has(input.textSpeed) ? input.textSpeed : "normal",
    gradeBand: VALID_GRADE_BANDS.has(input.gradeBand) ? input.gradeBand : "6-8",
    finaleSeen: input.finaleSeen === true || mode === "finale",
  };
}

export function getUnlockedRoomIds(state) {
  return uniqueStrings([HOME_ROOM_ID, ...uniqueStrings(state.unlockedRoomIds)]);
}

export function getNextPlayableNodeId(state, rooms) {
  const completed = new Set(uniqueStrings(state.completedRoomIds));
  const unlocked = new Set(uniqueStrings(state.unlockedRoomIds));
  return playableRooms(rooms).find((room) => unlocked.has(room.id) && !completed.has(room.id))?.id;
}

export function getClickableWorldNodeIds(state, rooms) {
  const normalized = normalizeGamificationGameState(state, rooms);
  if (normalized.mode !== "overworld") return [];
  const next = getNextPlayableNodeId(normalized, rooms);
  return next ? [next] : [];
}

export function enterGamificationRoom(state, roomId, rooms) {
  const normalized = normalizeGamificationGameState(state, rooms);
  if (!getClickableWorldNodeIds(normalized, rooms).includes(roomId)) return normalized;
  return {
    ...normalized,
    mode: "room",
    currentRoomId: roomId,
    currentWorldNodeId: roomId,
    activeRoomId: roomId,
  };
}

export function completeGamificationRoom(state, roomId, rooms) {
  const normalized = normalizeGamificationGameState(state, rooms);
  const playableRoomIds = roomIds(rooms);
  const canComplete = playableRoomIds.includes(roomId)
    && normalized.unlockedRoomIds.includes(roomId)
    && normalized.activeRoomId === roomId
    && (normalized.mode === "room" || normalized.mode === "reward");
  if (!canComplete) return normalized;

  const next = nextRoomId(roomId, rooms);
  const completedRoomIds = uniqueStrings([...normalized.completedRoomIds, roomId]);
  const collectedBadgeIds = uniqueStrings([...normalized.collectedBadgeIds, roomId]);
  const unlockedRoomIds = uniqueStrings([
    ...normalized.unlockedRoomIds,
    ...(next ? [next] : []),
  ]);
  const finaleSeen = normalized.finaleSeen || roomId === "finale";

  return {
    ...normalized,
    mode: roomId === "finale" ? "finale" : "reward",
    currentRoomId: roomId,
    currentWorldNodeId: roomId,
    activeRoomId: roomId,
    completedRoomIds,
    collectedBadgeIds,
    unlockedRoomIds,
    finaleSeen,
  };
}

export function returnGamificationToJourneyPath(state) {
  const currentWorldNodeId = state.currentWorldNodeId || state.currentRoomId || HOME_ROOM_ID;
  return {
    ...state,
    mode: "overworld",
    currentRoomId: currentWorldNodeId,
    currentWorldNodeId,
    activeRoomId: null,
  };
}

export { HOME_ROOM_ID, FIRST_ROOM_ID, MAX_DOOR_CLICKS };
