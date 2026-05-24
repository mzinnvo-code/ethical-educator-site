// examined-classroom-events — receives custom event POSTs from the site and writes them
// to the `examined_classroom_events` Workers Analytics Engine dataset. Pageview/Core Web
// Vitals tracking is handled separately by the Cloudflare Web Analytics
// beacon in index.html — this Worker only handles app-specific events that
// CWA can't capture (scroll depth, newsletter clicks, PDF downloads, etc.).
//
// Dataset schema (created automatically on first write):
//   index  = event name (sampling key)
//   blob1  = event name
//   blob2  = pathname the event fired on
//   blob3  = placement (e.g. "footer" / "inline" / "modal" for newsletter)
//   blob4  = page or resource slug
//   blob5  = country (from cf-ipcountry, "unknown" if absent)
//   double1 = milestone percent (scroll_depth) or 0
//   double2 = 1 (count — useful for SUM(_sample_interval * double2))
//
// Query examples in docs/analytics-playbook.md.

const ALLOWED_ORIGINS = new Set([
  "https://examinedclassroom.com",
  "https://www.examinedclassroom.com",
  "http://localhost:5173",
  "http://localhost:4173",
]);

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://examinedclassroom.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function noContent(origin) {
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

function forbidden(origin) {
  return new Response("Forbidden", { status: 403, headers: corsHeaders(origin) });
}

function badRequest(message, origin) {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

function isAllowedOrigin(origin) {
  return origin === "" || ALLOWED_ORIGINS.has(origin);
}

function clampString(value, max = 256) {
  if (typeof value !== "string") return "";
  return value.length > max ? value.slice(0, max) : value;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") return noContent(origin);
    if (request.method === "GET") {
      return new Response("examined-classroom-events ok", { status: 200, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders(origin) });
    }
    if (!isAllowedOrigin(origin)) return forbidden(origin);
    if (new URL(request.url).pathname !== "/events") {
      return new Response("Not Found", { status: 404, headers: corsHeaders(origin) });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return badRequest("Invalid JSON", origin);
    }
    if (!payload || typeof payload.name !== "string" || payload.name.length === 0) {
      return badRequest("Missing event name", origin);
    }

    const name = clampString(payload.name, 64);
    const path = clampString(payload.path, 256);
    const props = (payload.properties && typeof payload.properties === "object") ? payload.properties : {};
    const placement = clampString(props.placement, 64);
    const slug = clampString(props.page ?? props.slug ?? "", 128);
    const country = clampString(request.headers.get("cf-ipcountry") ?? "unknown", 8);
    const milestone = typeof props.milestone === "number" && Number.isFinite(props.milestone) ? props.milestone : 0;

    // Non-blocking — Workers runtime flushes in the background.
    env.EVENTS.writeDataPoint({
      indexes: [name],
      blobs: [name, path, placement, slug, country],
      doubles: [milestone, 1],
    });

    return noContent(origin);
  },
};
