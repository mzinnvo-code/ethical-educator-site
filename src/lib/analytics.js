// Lightweight analytics wrapper.
//
// Cloudflare Web Analytics handles pageviews, top pages, referrers, and Core
// Web Vitals automatically through the beacon in index.html. It does NOT
// currently expose a JS API for custom events (per their FAQ, May 2026).
//
// For custom events (scroll depth, newsletter clicks, PDF downloads) we buffer
// them on window.__teeEvents for now. A follow-up will add a tiny Cloudflare
// Worker bound to Workers Analytics Engine that accepts POST /events and
// stores them queryable via SQL. When that endpoint lands, swap the buffer
// for a fetch() call here — no other code in the app needs to change.

const BUFFER_KEY = "__teeEvents";

function buffer() {
  if (typeof window === "undefined") return null;
  if (!window[BUFFER_KEY]) window[BUFFER_KEY] = [];
  return window[BUFFER_KEY];
}

export function track(name, properties = {}) {
  const buf = buffer();
  if (!buf) return;
  const event = {
    name,
    properties,
    path: typeof location !== "undefined" ? location.pathname : null,
    ts: Date.now(),
  };
  buf.push(event);
  if (buf.length > 200) buf.splice(0, buf.length - 200);
  if (typeof console !== "undefined" && import.meta.env?.DEV) {
    console.debug("[analytics]", name, properties);
  }
}

export function getBufferedEvents() {
  return buffer()?.slice() ?? [];
}
