const SITE_ORIGIN = "https://examinedclassroom.com";
const INDEXNOW_KEY = "6a7ee777-5ff8-42b6-af77-abed93f2db29";
const WORKER_ACCOUNT_PARTS = ["the", "ethical", "educator"];
const WORKER_ORIGIN = `https://examined-classroom-events.${WORKER_ACCOUNT_PARTS.join("")}.workers.dev`;
const TIMEOUT_MS = Number(process.env.SEO_CHECK_TIMEOUT_MS || 30000);

const strictBacklinks = process.argv.includes("--strict-backlinks");

function withTimeout() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  return { controller, done: () => clearTimeout(timeout) };
}

async function fetchText(url, options = {}) {
  const { controller, done } = withTimeout();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      ...options,
    });
    const text = await response.text();
    return { ok: response.ok, status: response.status, headers: response.headers, text };
  } finally {
    done();
  }
}

function pass(label, detail = "") {
  console.log(`PASS ${label}${detail ? ` - ${detail}` : ""}`);
}

function warn(label, detail = "") {
  console.log(`TODO ${label}${detail ? ` - ${detail}` : ""}`);
}

function fail(label, detail = "") {
  console.error(`FAIL ${label}${detail ? ` - ${detail}` : ""}`);
}

const failures = [];
const backlinkTodos = [];

async function checkRequiredUrl(label, url, expectedText) {
  try {
    const result = await fetchText(url);
    if (!result.ok) {
      failures.push(`${label} returned ${result.status}`);
      fail(label, `${url} returned ${result.status}`);
      return;
    }
    if (expectedText && !result.text.includes(expectedText)) {
      failures.push(`${label} missing expected text`);
      fail(label, "missing expected text");
      return;
    }
    pass(label, `${url} returned ${result.status}`);
  } catch (error) {
    failures.push(`${label} errored: ${error.message}`);
    fail(label, error.message);
  }
}

async function checkBacklink(label, url) {
  try {
    const result = await fetchText(url);
    if (!result.ok) {
      const message = `${url} returned ${result.status}`;
      backlinkTodos.push(`${label}: ${message}`);
      warn(label, message);
      return;
    }
    const hasDomain = result.text.includes("examinedclassroom.com");
    const hasBrand = result.text.includes("The Examined Classroom");
    if (hasDomain || hasBrand) {
      pass(label, "backlink/brand mention found");
    } else {
      const message = "no examinedclassroom.com backlink or brand mention found";
      backlinkTodos.push(`${label}: ${message}`);
      warn(label, message);
    }
  } catch (error) {
    const message = error.message;
    backlinkTodos.push(`${label}: ${message}`);
    warn(label, message);
  }
}

async function checkHeader(label, url, headerName, expectedValue) {
  try {
    const result = await fetchText(url, { method: "GET" });
    const value = result.headers.get(headerName);
    if (value && value.toLowerCase().includes(expectedValue.toLowerCase())) {
      pass(label, `${headerName}: ${value}`);
    } else {
      warn(label, `${headerName}: ${value || "missing"}`);
    }
  } catch (error) {
    warn(label, error.message);
  }
}

await checkRequiredUrl("sitemap", `${SITE_ORIGIN}/sitemap.xml`, `${SITE_ORIGIN}/ai-ethics-lesson-plans`);
await checkRequiredUrl("IndexNow key", `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
await checkRequiredUrl("analytics Worker", `${WORKER_ORIGIN}/events`, "examined-classroom-events ok");
await checkBacklink("WordPress backlink", "https://ethicalaiedu.wordpress.com");
await checkBacklink("InnovateEdAI backlink", "https://innovateedai.com");
await checkHeader("InnovateEdAI hosting", "https://innovateedai.com", "server", "gamma");

if (backlinkTodos.length) {
  console.log("");
  console.log("Backlink tasks still require account/editor access:");
  for (const item of backlinkTodos) console.log(`- ${item}`);
}

if (failures.length || (strictBacklinks && backlinkTodos.length)) {
  console.log("");
  for (const failure of failures) console.error(`Required check failed: ${failure}`);
  if (strictBacklinks) {
    for (const todo of backlinkTodos) console.error(`Strict backlink check failed: ${todo}`);
  }
  process.exit(1);
}
