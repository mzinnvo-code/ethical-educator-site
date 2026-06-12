import { track } from "../../../lib/analytics.js";

// Anonymous quest telemetry, same stance as the rest of the site: no ids,
// no durations, nothing personal — just which moments of the funnel were
// reached. Session-scoped dedupe keeps StrictMode replays and re-renders
// from double-counting; pass { once: false } for genuinely repeatable events.
const sentEvents = new Set();

export function trackQuestEvent(name, { placement, slug, once = true } = {}) {
  const key = `${name}|${slug || ""}|${placement || ""}`;
  if (once) {
    if (sentEvents.has(key)) return;
    sentEvents.add(key);
  }
  const properties = {};
  if (placement) properties.placement = placement;
  if (slug) properties.slug = slug;
  track(name, properties);
}
