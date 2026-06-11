// Shelf geometry + remembered-room helpers for the Wonder Workshop modal.
// Pure data/functions: safe under node tests and prerender.
//
// The 24 story mementos live on three shelf strips that stay clear of the
// seven trophy slots (those sit between 31% and 64% of the stage height):
// two high shelf rows hugging the side walls, and one floor row. Slots are
// paired with stories by index — K5.jsx passes the stories in grade order
// (K -> 5), so the shelves fill in reading order as students play.
const SHELF_XS = [7, 14.5, 22, 29.5, 70.5, 78, 85.5, 93];
const FLOOR_XS = [9, 20, 31, 42, 53, 64, 75, 86];

export const K5_MEMENTO_SLOTS = [
  ...SHELF_XS.map((x) => ({ left: `${x}%`, top: "11.5%" })),
  ...SHELF_XS.map((x) => ({ left: `${x}%`, top: "22%" })),
  ...FLOOR_XS.map((x) => ({ left: `${x}%`, top: "85%" })),
];

// Where the stage inspector card sits relative to a clicked slot. Pure so
// node tests can exercise the flip/clamp logic without a DOM. Slots above
// 48% of the stage height open the card below themselves; lower slots open
// it above. The card clamps inside the stage while the caret keeps pointing
// at the true anchor. Stages narrower than 520px get a centered card.
// anchorHalf = half the rendered size of the clicked slot, so the caret tip
// always sits a constant gap off the slot edge whether the anchor is a small
// memento or a large trophy mount.
export function computeInspectorPlacement(slot, stageWidth, anchorHalf = 26) {
  const top = Number.parseFloat(slot.top);
  const left = Number.parseFloat(slot.left);
  if (!stageWidth || stageWidth < 520) {
    return { centered: true, width: Math.min(320, Math.round((stageWidth || 360) * 0.88)) };
  }
  const width = Math.min(320, Math.round(stageWidth * 0.88));
  const halfPct = ((width / 2) / stageWidth) * 100;
  const clampedLeft = Math.min(98 - halfPct, Math.max(2 + halfPct, left));
  const caretLeftPct = Math.min(94, Math.max(6, ((left - (clampedLeft - halfPct)) / (halfPct * 2)) * 100));
  const opensBelow = top < 48;
  const offsetPx = Math.round(anchorHalf + 14); // caret (8px) + 6px breathing room
  return { centered: false, width, leftPct: clampedLeft, caretLeftPct, opensBelow, slotTopPct: top, offsetPx };
}

// Rendered slot sizes are proportional to the stage so fixed pixel minimums
// can never collide on the %-spaced shelves; these mirror the CSS clamps.
export function slotHalfSize(type, stageWidth) {
  const width = stageWidth || 1000;
  return type === "badge"
    ? Math.min(92, Math.max(44, width * 0.088)) / 2
    : Math.min(42, Math.max(22, width * 0.062)) / 2;
}

export const ROOM_SEEN_KEY = "ee:wonder-room-seen:v1";

export function readRoomSeen() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ROOM_SEEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeRoomSeen(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ROOM_SEEN_KEY, JSON.stringify(state));
  } catch {
    // Storage may be full or blocked; the room simply replays its entrance.
  }
}

// Diff the live room against the last remembered visit so the modal knows
// whether to play the "lights coming on" entrance and which mementos to pop.
export function diffRoomEntrance({ seen, roomTier, completedIds, badgeCount }) {
  const prevTier = typeof seen?.tier === "number" ? seen.tier : 0;
  const prevIds = new Set(Array.isArray(seen?.completedIds) ? seen.completedIds : []);
  const newIds = completedIds.filter((id) => !prevIds.has(id));
  const grewBadges = badgeCount > (seen?.badgeCount || 0);
  return {
    prevTier: Math.min(prevTier, roomTier),
    newIds,
    shouldAnimate: roomTier > prevTier || newIds.length > 0 || grewBadges,
  };
}
