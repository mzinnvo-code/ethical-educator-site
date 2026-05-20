// Lightweight analytics wrapper.
//
// Cloudflare Web Analytics handles pageviews, top pages, referrers, and Core
// Web Vitals automatically through the beacon in index.html. CWA does not
// expose a public JS API for custom events, so app-specific events (scroll
// depth, newsletter clicks, PDF downloads) go to a tiny Cloudflare Worker
// (workers/events/) that writes to a Workers Analytics Engine dataset.
//
// To enable real reporting:
//   1. Deploy the Worker — see workers/events/README.md.
//   2. Replace REPLACE_WITH_WORKER_URL below with the deployed URL.
// Until then, events buffer to window.__teeEvents for DevTools inspection.

const ANALYTICS_ENDPOINT = "REPLACE_WITH_WORKER_URL";
const BUFFER_KEY = "__teeEvents";

function buffer() {
  if (typeof window === "undefined") return null;
  if (!window[BUFFER_KEY]) window[BUFFER_KEY] = [];
  return window[BUFFER_KEY];
}

function isConfigured() {
  return typeof ANALYTICS_ENDPOINT === "string"
    && ANALYTICS_ENDPOINT.startsWith("http")
    && !ANALYTICS_ENDPOINT.includes("REPLACE_WITH");
}

export function track(name, properties = {}) {
  if (typeof window === "undefined") return;
  const event = {
    name,
    properties,
    path: location.pathname,
    ts: Date.now(),
  };

  const buf = buffer();
  if (buf) {
    buf.push(event);
    if (buf.length > 200) buf.splice(0, buf.length - 200);
  }
  if (import.meta.env?.DEV) {
    console.debug("[analytics]", name, properties);
  }

  if (!isConfigured()) return;

  // keepalive ensures the request survives page unload (matters for
  // scroll_depth=100 and outbound-click events that fire as the user leaves).
  // Errors are swallowed — analytics must never break the page.
  try {
    fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
      mode: "cors",
      credentials: "omit",
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export function getBufferedEvents() {
  return buffer()?.slice() ?? [];
}
