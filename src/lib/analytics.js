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
// Until then, events buffer to window.__examinedClassroomEvents for DevTools inspection.

const ANALYTICS_ENDPOINT = "REPLACE_WITH_WORKER_URL";
const BUFFER_KEY = "__examinedClassroomEvents";

// Eager-init the buffer at module load so `window.__examinedClassroomEvents` is always an
// array (even before the first track() call). This avoids a confusing "null"
// result when smoke-checking telemetry from DevTools immediately after page
// load.
if (typeof window !== "undefined" && !window[BUFFER_KEY]) {
  window[BUFFER_KEY] = [];
}

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

  // Diagnostic globals — survive even if something elsewhere reassigns the
  // buffer array. `window.__examinedClassroomLastTrack` always carries the most recent
  // event so DevTools can confirm a track() call ran end-to-end.
  window.__examinedClassroomLastTrack = event;
  window.__examinedClassroomTrackCount = (window.__examinedClassroomTrackCount || 0) + 1;

  const buf = buffer();
  if (buf) {
    buf.push(event);
    if (buf.length > 200) buf.splice(0, buf.length - 200);
  }
  // Always log via console.debug (hidden by default in DevTools, surfaces
  // when verbose logging is enabled). Helps remote debugging without
  // adding production noise.
  if (typeof console !== "undefined" && console.debug) {
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
