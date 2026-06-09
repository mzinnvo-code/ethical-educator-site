#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import dns from "node:dns/promises";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = {
  brand: "The Examined Classroom",
  domain: "examinedclassroom.com",
  origin: "https://examinedclassroom.com",
  workerHealth: "https://examined-classroom-events.theethicaleducator.workers.dev/events",
  wordpress: "https://ethicalaiedu.wordpress.com",
  innovate: "https://innovateedai.com",
  indexNowKey: "6a7ee777-5ff8-42b6-af77-abed93f2db29",
};

const argv = parseArgs(process.argv.slice(2));
const outputDir = path.resolve(ROOT, argv.outputDir || process.env.SITE_REVIEW_OUTPUT_DIR || "output/site-review");
const inputDir = argv.inputDir
  ? path.resolve(ROOT, argv.inputDir)
  : process.env.SITE_REVIEW_INPUT_DIR
    ? path.resolve(ROOT, process.env.SITE_REVIEW_INPUT_DIR)
    : null;
const skipLocal = Boolean(argv.skipLocal);
const offline = Boolean(argv.offline || argv.skipLive);
const skipBuild = Boolean(argv.skipBuild);
const skipPageSpeed = Boolean(argv.skipPageSpeed || offline);
const generatedAt = new Date();
const dueByNextReport = addDays(generatedAt, 14);
const stamp = formatStamp(generatedAt);

const report = {
  generatedAt: generatedAt.toISOString(),
  site: SITE,
  reviewWindow: {
    days: 14,
    start: addDays(generatedAt, -14).toISOString(),
    end: generatedAt.toISOString(),
    nextReportDue: dueByNextReport.toISOString(),
  },
  mode: {
    offline,
    skipLocal,
    skipBuild,
    skipPageSpeed,
    inputDir,
  },
  checks: [],
  inputs: {},
  sections: [],
  actions: [],
  artifacts: {},
};

const actionKeys = new Set();

await mkdir(outputDir, { recursive: true });

const repoFacts = await inspectRepo();
report.inputs.repo = repoFacts;

if (!skipLocal) {
  await runLocalChecks();
} else {
  addCheck("Operations/workspace hygiene", "Local command gates", "skipped", "Skipped by --skip-local.");
}

const privateData = await loadPrivateInputs(inputDir);
report.inputs.privateData = summarizePrivateInputs(privateData);

if (!offline) {
  await runLiveChecks();
} else {
  addCheck("SEO, crawlability, sitemap, metadata, backlinks, and search visibility", "Live public checks", "skipped", "Skipped by --offline/--skip-live.");
  addAction({
    area: "Traffic and engagement breakdown",
    priority: "P2",
    evidence: "Live checks were skipped for this run.",
    recommended_action: "Run the next review without --offline so sitemap, redirects, backlinks, headers, DNS, and Worker availability can be verified.",
    outcome_goal: "Restore live public evidence in the next biweekly report.",
    proposed_agent_or_automation: "Biweekly site review automation",
    requires_approval: false,
  });
}

if (!skipPageSpeed) {
  await runPageSpeed();
}

buildSections(privateData);

const markdown = renderMarkdown(report);
const jsonPath = path.join(outputDir, `${stamp}.json`);
const mdPath = path.join(outputDir, `${stamp}.md`);
const latestJsonPath = path.join(outputDir, "latest.json");
const latestMdPath = path.join(outputDir, "latest.md");
report.artifacts = {
  markdown: path.relative(ROOT, mdPath),
  json: path.relative(ROOT, jsonPath),
  latestMarkdown: path.relative(ROOT, latestMdPath),
  latestJson: path.relative(ROOT, latestJsonPath),
};

await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(mdPath, markdown, "utf8");
await writeFile(latestJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(latestMdPath, markdown, "utf8");

if (argv.printMarkdown) {
  console.log(markdown);
} else {
  printConciseSummary(report);
}

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2).replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      parsed[key] = next;
      index += 1;
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

async function inspectRepo() {
  const packageJson = await readJson("package.json");
  const sitemap = await readOptionalText("public/sitemap.xml");
  const robots = await readOptionalText("public/robots.txt");
  const llms = await readOptionalText("public/llms.txt");
  const indexHtml = await readOptionalText("index.html");
  const analytics = await readOptionalText("src/lib/analytics.js");
  const worker = await readOptionalText("workers/events/src/index.js");
  const beaconToken = indexHtml.match(/data-cf-beacon=['"][^'"]*"token"\s*:\s*"([^"]+)"/)?.[1] || "";
  const securityTxtExists = existsSync(path.join(ROOT, "public/.well-known/security.txt"))
    || existsSync(path.join(ROOT, "public/security.txt"));
  const prerenderRoutes = packageJson.prerender?.include || [];
  const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1]);

  addCheck(
    "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
    "Prerender route inventory",
    prerenderRoutes.length >= 70 ? "pass" : "warn",
    `${prerenderRoutes.length} routes listed in package.json prerender config.`
  );
  addCheck(
    "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
    "Sitemap inventory",
    sitemapUrls.length >= prerenderRoutes.length ? "pass" : "warn",
    `${sitemapUrls.length} URLs found in public/sitemap.xml.`
  );
  addCheck(
    "Traffic and engagement breakdown",
    "Cloudflare Web Analytics beacon",
    indexHtml.includes("static.cloudflareinsights.com/beacon.min.js") && beaconToken && beaconToken !== "REPLACE_WITH_CLOUDFLARE_TOKEN" ? "pass" : "warn",
    indexHtml.includes("static.cloudflareinsights.com/beacon.min.js")
      ? "Cloudflare Web Analytics beacon is present in index.html."
      : "Cloudflare Web Analytics beacon was not found in index.html."
  );
  addCheck(
    "Backend/Worker, deploy, and CI health",
    "Custom event Worker wiring",
    analytics.includes("examined-classroom-events") && worker.includes("examined_classroom_events") ? "pass" : "warn",
    analytics.includes("examined-classroom-events")
      ? "src/lib/analytics.js points at the examined-classroom-events Worker."
      : "Custom event Worker endpoint was not found in src/lib/analytics.js."
  );
  addCheck(
    "Security, privacy, headers, DNS, and dependency advisories",
    "Committed security.txt",
    securityTxtExists ? "pass" : "warn",
    securityTxtExists
      ? "A security.txt file is present in public assets."
      : "No public security.txt file is present in the repo."
  );

  if (!securityTxtExists) {
    addAction({
      area: "Security, privacy, headers, DNS, and dependency advisories",
      priority: "P1",
      evidence: "No public security.txt file is present in the repo.",
      recommended_action: "Add a no-cost security.txt at public/.well-known/security.txt with Contact, Canonical, Expires, and Preferred-Languages.",
      outcome_goal: "security.txt returns 200 on the live site before the next report.",
      proposed_agent_or_automation: "Security hardening follow-up agent",
      requires_approval: false,
    });
  }

  return {
    packageName: packageJson.name,
    prerenderRouteCount: prerenderRoutes.length,
    sitemapUrlCount: sitemapUrls.length,
    robotsHasSitemap: robots.includes(`${SITE.origin}/sitemap.xml`),
    llmsHasPriorityPages: llms.includes("Priority Pages"),
    cloudflareBeaconPresent: indexHtml.includes("static.cloudflareinsights.com/beacon.min.js"),
    cloudflareBeaconConfigured: Boolean(beaconToken && beaconToken !== "REPLACE_WITH_CLOUDFLARE_TOKEN"),
    analyticsWorkerPresent: analytics.includes("examined-classroom-events"),
    workerDatasetPresent: worker.includes("examined_classroom_events"),
    securityTxtExists,
  };
}

async function runLocalChecks() {
  if (!skipBuild) {
    const build = await runCommand("Production build, prerender, feeds, and OG generation", "npm", ["run", "build"], ROOT);
    addCommandCheck("Frontend, UX, accessibility, and performance", build);
    if (/Some chunks are larger than 500 kB/.test(build.output)) {
      addAction({
        area: "Frontend, UX, accessibility, and performance",
        priority: "P2",
        evidence: "Production build reports chunks larger than 500 kB, including the experiments data bundle.",
        recommended_action: "Code-split experiment data or route-level bundles so the homepage and core hubs ship less JavaScript.",
        outcome_goal: "Reduce initial JavaScript weight and remove the chunk warning before the next report.",
        proposed_agent_or_automation: "Frontend performance follow-up agent",
        requires_approval: false,
      });
    }
  } else {
    addCheck("Frontend, UX, accessibility, and performance", "Production build", "skipped", "Skipped by --skip-build.");
  }

  const crawlability = await runCommand("Crawler-facing HTML check", "npm", ["run", "test:crawlability"], ROOT);
  addCommandCheck("SEO, crawlability, sitemap, metadata, backlinks, and search visibility", crawlability);

  const visuals = await runCommand("Stage visual integrity check", "npm", ["run", "visuals:check"], ROOT);
  addCommandCheck("Frontend, UX, accessibility, and performance", visuals);

  const rootAudit = await runCommand("Root dependency audit", "npm", ["audit", "--audit-level=moderate", "--omit=dev"], ROOT);
  addCommandCheck("Security, privacy, headers, DNS, and dependency advisories", rootAudit, { networkCanFail: true });

  const workerAudit = await runCommand("Worker dependency audit", "npm", ["audit", "--audit-level=moderate"], path.join(ROOT, "workers/events"));
  addCommandCheck("Security, privacy, headers, DNS, and dependency advisories", workerAudit, { networkCanFail: true });

  const rebrand = await runCommand("Workspace rebrand residue check", "npm", ["run", "test:rebrand"], ROOT);
  if (rebrand.ok) {
    addCommandCheck("Operations/workspace hygiene", rebrand);
  } else if (rebrand.output.includes(".claude/worktrees/")) {
    addCheck(
      "Operations/workspace hygiene",
      rebrand.label,
      "warn",
      "Old brand residue is confined to an ignored .claude/worktrees archive.",
      commandEvidence(rebrand)
    );
    addAction({
      area: "Operations/workspace hygiene",
      priority: "P3",
      evidence: "test:rebrand fails on ignored .claude/worktrees archive content, not active app code.",
      recommended_action: "Archive or remove stale nested worktree content after confirming it is not needed.",
      outcome_goal: "test:rebrand passes or explicitly ignores stale workspace archives by the next report.",
      proposed_agent_or_automation: "Workspace hygiene follow-up agent",
      requires_approval: true,
    });
  } else {
    addCommandCheck("Operations/workspace hygiene", rebrand);
    addAction({
      area: "Operations/workspace hygiene",
      priority: "P1",
      evidence: "test:rebrand found old brand residue outside the expected ignored archive case.",
      recommended_action: "Inspect the failing files and remove active old-brand residue.",
      outcome_goal: "Active tracked site files contain only The Examined Classroom branding.",
      proposed_agent_or_automation: "Workspace hygiene follow-up agent",
      requires_approval: false,
    });
  }

  const gitStatus = await runCommand("Git workspace status", "git", ["status", "--short", "--ignored=matching"], ROOT);
  addCommandCheck("Operations/workspace hygiene", gitStatus);
}

async function runLiveChecks() {
  const homeHead = await fetchCheck({
    category: "Security, privacy, headers, DNS, and dependency advisories",
    label: "Live HTTPS homepage",
    url: SITE.origin,
    method: "HEAD",
    expectedStatuses: [200],
  });

  if (homeHead?.headers) {
    const missingHeaders = ["strict-transport-security", "content-security-policy", "x-content-type-options"]
      .filter((header) => !homeHead.headers[header]);
    if (missingHeaders.length) {
      addCheck(
        "Security, privacy, headers, DNS, and dependency advisories",
        "Live security headers",
        "warn",
        `Missing ${missingHeaders.join(", ")} on the live homepage.`
      );
      addAction({
        area: "Security, privacy, headers, DNS, and dependency advisories",
        priority: "P2",
        evidence: `Live homepage headers are missing ${missingHeaders.join(", ")}.`,
        recommended_action: "Evaluate a no-cost Cloudflare proxy/header rule or hosting migration path for HSTS, nosniff, and a conservative CSP.",
        outcome_goal: "Live security headers meet the review contract without breaking GitHub Pages delivery.",
        proposed_agent_or_automation: "Security hardening follow-up agent",
        requires_approval: true,
      });
    } else {
      addCheck(
        "Security, privacy, headers, DNS, and dependency advisories",
        "Live security headers",
        "pass",
        "HSTS, CSP, and x-content-type-options are present on the live homepage."
      );
    }
  }

  await fetchCheck({
    category: "Security, privacy, headers, DNS, and dependency advisories",
    label: "HTTP to HTTPS redirect",
    url: `http://${SITE.domain}`,
    method: "HEAD",
    expectedStatuses: [301, 302, 308],
    redirect: "manual",
    expectedHeader: { name: "location", includes: SITE.origin },
  });

  await fetchCheck({
    category: "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
    label: "www canonical redirect",
    url: `https://www.${SITE.domain}`,
    method: "HEAD",
    expectedStatuses: [301, 302, 308],
    redirect: "manual",
    expectedHeader: { name: "location", includes: SITE.origin },
  });

  await fetchCheck({
    category: "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
    label: "Live sitemap",
    url: `${SITE.origin}/sitemap.xml`,
    method: "GET",
    expectedStatuses: [200],
    expectedText: `${SITE.origin}/ai-ethics-lesson-plans`,
  });

  await fetchCheck({
    category: "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
    label: "IndexNow key file",
    url: `${SITE.origin}/${SITE.indexNowKey}.txt`,
    method: "GET",
    expectedStatuses: [200],
    expectedText: SITE.indexNowKey,
  });

  await fetchCheck({
    category: "Content/product effectiveness and teacher-resource conversion",
    label: "RSS feed",
    url: `${SITE.origin}/feed.xml`,
    method: "GET",
    expectedStatuses: [200],
    expectedText: SITE.brand,
  });

  await fetchCheck({
    category: "Content/product effectiveness and teacher-resource conversion",
    label: "JSON feed",
    url: `${SITE.origin}/feed.json`,
    method: "GET",
    expectedStatuses: [200],
    expectedText: SITE.brand,
  });

  const securityTxt = await fetchCheck({
    category: "Security, privacy, headers, DNS, and dependency advisories",
    label: "Live security.txt",
    url: `${SITE.origin}/.well-known/security.txt`,
    method: "GET",
    expectedStatuses: [200],
    expectedText: "Contact:",
  });
  if (!securityTxt?.ok && report.inputs.repo.securityTxtExists) {
    addAction({
      area: "Security, privacy, headers, DNS, and dependency advisories",
      priority: "P1",
      evidence: "Live /.well-known/security.txt did not return a valid 200 response with Contact metadata.",
      recommended_action: "Publish security.txt from the repo and verify the live URL directly.",
      outcome_goal: "security.txt returns 200 with Contact and Canonical fields before the next report.",
      proposed_agent_or_automation: "Security hardening follow-up agent",
      requires_approval: false,
    });
  }

  await fetchCheck({
    category: "Backend/Worker, deploy, and CI health",
    label: "Analytics Worker health",
    url: SITE.workerHealth,
    method: "GET",
    expectedStatuses: [200],
    expectedText: "examined-classroom-events ok",
  });

  await checkBacklink("WordPress backlink", SITE.wordpress);
  await checkBacklink("InnovateEdAI backlink", SITE.innovate);

  await dnsCheck("Apex A records", SITE.domain, "A");
  await dnsCheck("www CNAME/A records", `www.${SITE.domain}`, "CNAME_OR_A");
}

async function runPageSpeed() {
  const apiKey = process.env.PAGESPEED_API_KEY || "";
  for (const strategy of ["mobile", "desktop"]) {
    const url = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    url.searchParams.set("url", `${SITE.origin}/`);
    url.searchParams.set("strategy", strategy);
    for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
      url.searchParams.append("category", category);
    }
    if (apiKey) url.searchParams.set("key", apiKey);

    try {
      const response = await fetchWithTimeout(url.href, {}, 30000);
      if (!response.ok) {
        addCheck(
          "Frontend, UX, accessibility, and performance",
          `PageSpeed Insights ${strategy}`,
          response.status === 429 ? "warn" : "gap",
          `PageSpeed Insights returned HTTP ${response.status}; treat this as best-effort evidence.`
        );
        continue;
      }
      const json = await response.json();
      const categories = json.lighthouseResult?.categories || {};
      const audits = json.lighthouseResult?.audits || {};
      addCheck(
        "Frontend, UX, accessibility, and performance",
        `PageSpeed Insights ${strategy}`,
        "pass",
        [
          `Performance ${score(categories.performance)}`,
          `Accessibility ${score(categories.accessibility)}`,
          `Best Practices ${score(categories["best-practices"])}`,
          `SEO ${score(categories.seo)}`,
          `LCP ${auditDisplay(audits["largest-contentful-paint"])}`,
          `CLS ${auditDisplay(audits["cumulative-layout-shift"])}`,
        ].join("; "),
        { source: "PageSpeed Insights API" }
      );
    } catch (error) {
      addCheck(
        "Frontend, UX, accessibility, and performance",
        `PageSpeed Insights ${strategy}`,
        "gap",
        `PageSpeed Insights request failed: ${error.message}`
      );
    }
  }
}

async function loadPrivateInputs(baseDir) {
  const datasets = {
    searchConsole: await readInputDataset(baseDir, ["search-console", "google-search-console", "gsc"]),
    bingWebmaster: await readInputDataset(baseDir, ["bing-webmaster", "bing"]),
    cloudflareWebAnalytics: await readInputDataset(baseDir, ["cloudflare-web-analytics", "cloudflare-analytics", "cwa"]),
    customEvents: await readInputDataset(baseDir, ["custom-events", "analytics-events", "events"]),
  };

  if (process.env.CF_API_TOKEN && process.env.CF_ACCOUNT_ID && !offline) {
    datasets.cloudflareCustomEventSql = await queryCloudflareEvents();
  } else {
    datasets.cloudflareCustomEventSql = {
      status: "missing",
      detail: "CF_API_TOKEN and CF_ACCOUNT_ID are not both configured.",
      rows: [],
    };
  }

  return datasets;
}

async function queryCloudflareEvents() {
  const account = process.env.CF_ACCOUNT_ID;
  const token = process.env.CF_API_TOKEN;
  const dataset = process.env.CF_ANALYTICS_DATASET || "examined_classroom_events";
  const sql = `SELECT blob1 AS event, blob2 AS page, blob3 AS placement, blob4 AS resource, SUM(_sample_interval * double2) AS count FROM ${dataset} WHERE timestamp > NOW() - INTERVAL '14' DAY GROUP BY event, page, placement, resource ORDER BY count DESC LIMIT 50`;
  try {
    const response = await fetchWithTimeout(
      `https://api.cloudflare.com/client/v4/accounts/${account}/analytics_engine/sql`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: sql,
      },
      30000
    );
    const text = await response.text();
    if (!response.ok) {
      return { status: "gap", detail: `Cloudflare SQL returned HTTP ${response.status}.`, rows: [], raw: text.slice(0, 500) };
    }
    const rows = text.trim().startsWith("[") || text.trim().startsWith("{")
      ? rowsFromJson(JSON.parse(text))
      : parseCsv(text);
    return { status: "loaded", detail: "Loaded custom-event rows from Cloudflare Analytics Engine SQL.", rows };
  } catch (error) {
    return { status: "gap", detail: `Cloudflare SQL request failed: ${error.message}`, rows: [] };
  }
}

async function readInputDataset(baseDir, names) {
  if (!baseDir) {
    return { status: "missing", detail: "No SITE_REVIEW_INPUT_DIR or --input-dir provided.", rows: [] };
  }

  for (const name of names) {
    for (const extension of ["json", "csv"]) {
      const file = path.join(baseDir, `${name}.${extension}`);
      if (!existsSync(file)) continue;
      const text = await readFile(file, "utf8");
      const rows = extension === "json" ? rowsFromJson(JSON.parse(text)) : parseCsv(text);
      return {
        status: "loaded",
        detail: `Loaded ${rows.length} rows from ${path.relative(ROOT, file)}.`,
        source: path.relative(ROOT, file),
        rows,
        sha256: createHash("sha256").update(text).digest("hex"),
      };
    }
  }

  return {
    status: "missing",
    detail: `No input file found for ${names.join(", ")} in ${path.relative(ROOT, baseDir)}.`,
    rows: [],
  };
}

function summarizePrivateInputs(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [
    key,
    {
      status: value.status,
      detail: value.detail,
      source: value.source || null,
      rowCount: value.rows?.length || 0,
      sha256: value.sha256 || null,
    },
  ]));
}

function buildSections(data) {
  const searchSummary = summarizeSearch(data.searchConsole.rows);
  const bingSummary = summarizeSearch(data.bingWebmaster.rows);
  const webSummary = summarizeWebAnalytics(data.cloudflareWebAnalytics.rows);
  const eventRows = [
    ...data.customEvents.rows,
    ...(data.cloudflareCustomEventSql.rows || []),
  ];
  const eventSummary = summarizeEvents(eventRows);

  if (data.searchConsole.status !== "loaded") {
    addAction({
      area: "Traffic and engagement breakdown",
      priority: "P1",
      evidence: "Google Search Console input was not available to the runner.",
      recommended_action: "Provide a Search Console export or configure an API-backed source before the next report.",
      outcome_goal: "Report organic clicks, impressions, CTR, position, and top query/page opportunities next cycle.",
      proposed_agent_or_automation: "Analytics source setup follow-up",
      requires_approval: true,
    });
  }
  if (data.cloudflareWebAnalytics.status !== "loaded") {
    addAction({
      area: "Traffic and engagement breakdown",
      priority: "P1",
      evidence: "Cloudflare Web Analytics export/API data was not available to the runner.",
      recommended_action: "Provide a Cloudflare Web Analytics export or configure API access before the next report.",
      outcome_goal: "Report visits, top pages, referrers, countries, devices, and Web Vitals next cycle.",
      proposed_agent_or_automation: "Analytics source setup follow-up",
      requires_approval: true,
    });
  }
  if (eventRows.length === 0) {
    addAction({
      area: "Content/product effectiveness and teacher-resource conversion",
      priority: "P2",
      evidence: "No custom-event rows were loaded from exports or Cloudflare Analytics Engine.",
      recommended_action: "Provide custom-event exports or configure CF_API_TOKEN/CF_ACCOUNT_ID for read-only Analytics Engine SQL.",
      outcome_goal: "Track scroll depth, newsletter clicks, teaching-resource clicks, and downloads in the next report.",
      proposed_agent_or_automation: "Analytics source setup follow-up",
      requires_approval: true,
    });
  }

  report.sections = [
    section("Frontend, UX, accessibility, and performance", [
      `Prerender inventory: ${report.inputs.repo.prerenderRouteCount} configured routes and ${report.inputs.repo.sitemapUrlCount} sitemap URLs.`,
      checksLine("Frontend, UX, accessibility, and performance"),
      pageSpeedLine(),
    ], [
      insightFromChecks("Frontend, UX, accessibility, and performance", "The frontend gate is healthy when build, visuals, and PageSpeed checks pass or produce only best-effort gaps."),
      hasAction("Frontend, UX, accessibility, and performance")
        ? "The main frontend opportunity is reducing JavaScript weight from the large experiment bundle."
        : "No immediate frontend action was raised beyond continuing the automated checks.",
    ]),
    section("Backend/Worker, deploy, and CI health", [
      `Worker wiring: ${report.inputs.repo.analyticsWorkerPresent ? "present" : "not found"}; dataset binding marker: ${report.inputs.repo.workerDatasetPresent ? "present" : "not found"}.`,
      checksLine("Backend/Worker, deploy, and CI health"),
    ], [
      insightFromChecks("Backend/Worker, deploy, and CI health", "The app backend surface is small: GitHub Pages plus the custom-event Worker."),
      "Worker health should remain a hard public check because it is the bridge between classroom-resource interactions and the engagement report.",
    ]),
    section("Security, privacy, headers, DNS, and dependency advisories", [
      checksLine("Security, privacy, headers, DNS, and dependency advisories"),
      `Root security.txt in repo: ${report.inputs.repo.securityTxtExists ? "yes" : "no"}.`,
    ], [
      insightFromChecks("Security, privacy, headers, DNS, and dependency advisories", "Dependency and public-header checks should be interpreted separately: dependency health can be clean while public trust headers still need hardening."),
      "GitHub Pages delivery limits header control, so header hardening should be planned as a no-cost Cloudflare/DNS decision rather than treated as a code-only fix.",
    ]),
    section("SEO, crawlability, sitemap, metadata, backlinks, and search visibility", [
      checksLine("SEO, crawlability, sitemap, metadata, backlinks, and search visibility"),
      searchSummary.line("Google Search Console"),
      bingSummary.line("Bing Webmaster Tools"),
    ], [
      "Repo-controlled crawlability is measurable locally; query rankings and CTR should come only from Search Console/Bing data.",
      searchSummary.rows ? searchSummary.insight("Google") : "Search Console data is not available in this run, so organic wins and CTR opportunities are intentionally not inferred.",
      bingSummary.rows ? bingSummary.insight("Bing") : "Bing Webmaster data is not available in this run, so Bing-specific discovery remains an access gap.",
    ]),
    section("Traffic and engagement breakdown", [
      webSummary.line(),
      eventSummary.line(),
      sourceStatusLine(data),
    ], [
      webSummary.rows ? webSummary.insight() : "Traffic breakdown is incomplete until Cloudflare Web Analytics data is provided or connected.",
      eventSummary.rows ? eventSummary.insight() : "Engagement outcomes are incomplete until custom-event data is provided or queried.",
    ]),
    section("Content/product effectiveness and teacher-resource conversion", [
      eventSummary.resourceLine(),
      checksLine("Content/product effectiveness and teacher-resource conversion"),
    ], [
      eventSummary.rows
        ? "Custom events can identify which classroom resources produce second-clicks, downloads, or newsletter interest."
        : "The site has the instrumentation hooks, but the report needs event rows to rank teacher-resource conversion.",
      "Feeds and priority resource pages should stay in the live-check set because they are low-cost distribution surfaces.",
    ]),
    section("Operations/workspace hygiene", [
      checksLine("Operations/workspace hygiene"),
      `Ignored output target: ${path.relative(ROOT, outputDir)}.`,
    ], [
      insightFromChecks("Operations/workspace hygiene", "The report runner should keep generated outputs under ignored output/site-review and avoid repo-tracked churn."),
      hasAction("Operations/workspace hygiene")
        ? "Workspace cleanup is useful, but should stay separated from live-site health."
        : "No workspace hygiene action was raised in this run.",
    ]),
  ];
}

function section(title, dataLines, insightLines) {
  const actions = report.actions.filter((action) => action.area === title);
  return {
    title,
    data: dataLines.filter(Boolean),
    insights: insightLines.filter(Boolean),
    actions: actions.length
      ? actions.map((action) => action.recommended_action)
      : ["Continue monitoring; no new action proposal in this area."],
    outcomeGoals: actions.length
      ? actions.map((action) => action.outcome_goal)
      : ["Keep this area green or explicitly report any new gap in the next cycle."],
  };
}

function checksLine(category) {
  const checks = report.checks.filter((check) => check.category === category);
  if (!checks.length) return "No checks recorded for this area.";
  const counts = countStatuses(checks);
  return `Checks: ${counts.pass} pass, ${counts.warn} warn, ${counts.fail} fail, ${counts.gap} gap, ${counts.skipped} skipped.`;
}

function pageSpeedLine() {
  const psi = report.checks.filter((check) => check.label.startsWith("PageSpeed Insights"));
  if (!psi.length) return "PageSpeed Insights: not run.";
  return `PageSpeed Insights: ${psi.map((check) => `${check.label.replace("PageSpeed Insights ", "")} ${check.status}`).join(", ")}.`;
}

function sourceStatusLine(data) {
  const statuses = [
    `Search Console: ${data.searchConsole.status}`,
    `Bing: ${data.bingWebmaster.status}`,
    `Cloudflare Web Analytics: ${data.cloudflareWebAnalytics.status}`,
    `Custom events: ${data.customEvents.status}`,
    `Cloudflare SQL: ${data.cloudflareCustomEventSql.status}`,
  ];
  return statuses.join("; ");
}

function insightFromChecks(category, fallback) {
  const checks = report.checks.filter((check) => check.category === category);
  const failures = checks.filter((check) => ["fail", "warn", "gap"].includes(check.status));
  if (!failures.length) return fallback;
  return `${failures.length} item(s) need attention: ${failures.slice(0, 3).map((check) => check.label).join(", ")}.`;
}

function hasAction(area) {
  return report.actions.some((action) => action.area === area);
}

function summarizeSearch(rows = []) {
  if (!rows.length) {
    return {
      rows: 0,
      line: (label) => `${label}: no export/API rows loaded.`,
      insight: () => "No search data loaded.",
    };
  }
  const clicks = sum(rows, ["clicks", "organic clicks"]);
  const impressions = sum(rows, ["impressions"]);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const opportunities = rows
    .map((row) => ({
      query: value(row, ["query", "search query", "keyword"]) || "(unknown query)",
      page: value(row, ["page", "url", "landing page"]) || "(unknown page)",
      impressions: numberValue(row, ["impressions"]),
      ctr: percentValue(row, ["ctr", "average ctr"]),
      position: numberValue(row, ["position", "avg position", "average position"]),
    }))
    .filter((row) => row.impressions >= 10 && (row.ctr === null || row.ctr < 0.03 || (row.position >= 8 && row.position <= 20)))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5);

  return {
    rows: rows.length,
    clicks,
    impressions,
    ctr,
    opportunities,
    line: (label) => `${label}: ${rows.length} rows, ${formatNumber(clicks)} clicks, ${formatNumber(impressions)} impressions, ${formatPercent(ctr)} aggregate CTR.`,
    insight: (label) => opportunities.length
      ? `${label} has ${opportunities.length} visible CTR/ranking opportunity rows; top opportunity: ${opportunities[0].query} -> ${opportunities[0].page}.`
      : `${label} data loaded without a clear high-impression weak-CTR opportunity in the sample.`,
  };
}

function summarizeWebAnalytics(rows = []) {
  if (!rows.length) {
    return {
      rows: 0,
      line: () => "Cloudflare Web Analytics: no export/API rows loaded.",
      insight: () => "No web analytics data loaded.",
    };
  }
  const visits = sum(rows, ["visits", "pageviews", "views", "value"]);
  const topPages = rows
    .map((row) => ({
      page: value(row, ["page", "path", "url", "landing page", "metric"]) || "(unknown)",
      visits: numberValue(row, ["visits", "pageviews", "views", "value"]) || 0,
      referrer: value(row, ["referrer", "source"]) || "",
    }))
    .filter((row) => row.visits > 0)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);
  return {
    rows: rows.length,
    visits,
    topPages,
    line: () => `Cloudflare Web Analytics: ${rows.length} rows, ${formatNumber(visits)} counted visits/pageviews in loaded data.`,
    insight: () => topPages.length
      ? `Top loaded page/source row is ${topPages[0].page} with ${formatNumber(topPages[0].visits)} visits/pageviews.`
      : "Web Analytics rows loaded, but no pageview/visit column was recognized.",
  };
}

function summarizeEvents(rows = []) {
  if (!rows.length) {
    return {
      rows: 0,
      line: () => "Custom events: no export/API rows loaded.",
      resourceLine: () => "Resource conversion events: no export/API rows loaded.",
      insight: () => "No custom event data loaded.",
    };
  }
  const byEvent = new Map();
  for (const row of rows) {
    const event = value(row, ["event", "name", "blob1"]) || "(unknown event)";
    const count = numberValue(row, ["count", "clicks", "events", "value"]) || 1;
    byEvent.set(event, (byEvent.get(event) || 0) + count);
  }
  const topEvents = Array.from(byEvent, ([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const resourceRows = rows
    .map((row) => ({
      event: value(row, ["event", "name", "blob1"]) || "(unknown event)",
      page: value(row, ["page", "path", "blob2"]) || "",
      resource: value(row, ["resource", "slug", "placement", "blob4", "blob3"]) || "",
      count: numberValue(row, ["count", "clicks", "events", "value"]) || 1,
    }))
    .filter((row) => /download|resource|newsletter|seo_landing|teaching/i.test(row.event))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    rows: rows.length,
    topEvents,
    resourceRows,
    line: () => `Custom events: ${rows.length} rows; top events: ${topEvents.map((row) => `${row.event} (${formatNumber(row.count)})`).join(", ")}.`,
    resourceLine: () => resourceRows.length
      ? `Resource conversion events: ${resourceRows.map((row) => `${row.event} ${row.resource || row.page} (${formatNumber(row.count)})`).join(", ")}.`
      : "Resource conversion events: event rows loaded, but no resource/download/newsletter events were recognized.",
    insight: () => topEvents.length
      ? `Top custom event in loaded data is ${topEvents[0].event}.`
      : "Custom event rows loaded without a recognizable event column.",
  };
}

async function checkBacklink(label, url) {
  try {
    const response = await fetchWithTimeout(url, { redirect: "follow" });
    const text = await response.text();
    const found = text.includes(SITE.domain) || text.includes(SITE.brand);
    addCheck(
      "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
      label,
      response.ok && found ? "pass" : "warn",
      response.ok
        ? found
          ? `${label} found a backlink or brand mention.`
          : `${label} did not expose a backlink or brand mention in fetched HTML.`
        : `${label} returned HTTP ${response.status}.`,
      { url, status: response.status }
    );
    if (!found) {
      addAction({
        area: "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
        priority: "P1",
        evidence: `${label} does not currently expose ${SITE.domain} or ${SITE.brand} in fetched HTML.`,
        recommended_action: `Add a visible ${SITE.brand} link from ${url}.`,
        outcome_goal: `${label} passes the public backlink check by the next report.`,
        proposed_agent_or_automation: "Offsite SEO follow-up task proposal",
        requires_approval: true,
      });
    }
  } catch (error) {
    addCheck(
      "SEO, crawlability, sitemap, metadata, backlinks, and search visibility",
      label,
      "gap",
      `${label} fetch failed: ${error.message}`,
      { url }
    );
  }
}

async function dnsCheck(label, host, type) {
  try {
    let records = [];
    if (type === "A") {
      records = await dns.resolve4(host);
    } else {
      const cname = await dns.resolveCname(host).catch(() => []);
      const a = await dns.resolve4(host).catch(() => []);
      records = [...cname, ...a];
    }
    addCheck(
      "Security, privacy, headers, DNS, and dependency advisories",
      label,
      records.length ? "pass" : "warn",
      records.length ? `${host}: ${records.join(", ")}` : `${host}: no records found.`
    );
  } catch (error) {
    addCheck(
      "Security, privacy, headers, DNS, and dependency advisories",
      label,
      "gap",
      `${host} DNS check failed: ${error.message}`
    );
  }
}

async function fetchCheck({ category, label, url, method = "GET", expectedStatuses = [200], expectedText, expectedHeader, redirect = "follow" }) {
  try {
    const response = await fetchWithTimeout(url, { method, redirect });
    const headers = Object.fromEntries(response.headers.entries());
    let text = "";
    if (method !== "HEAD" && expectedText) {
      text = await response.text();
    }
    const statusOk = expectedStatuses.includes(response.status);
    const textOk = expectedText ? text.includes(expectedText) : true;
    const headerOk = expectedHeader
      ? (headers[expectedHeader.name.toLowerCase()] || "").includes(expectedHeader.includes)
      : true;
    const ok = statusOk && textOk && headerOk;
    addCheck(
      category,
      label,
      ok ? "pass" : "warn",
      ok
        ? `${url} returned HTTP ${response.status}.`
        : `${url} returned HTTP ${response.status}; expected status ${expectedStatuses.join("/")} ${expectedText ? `and text ${expectedText}` : ""}${expectedHeader ? ` and header ${expectedHeader.name} containing ${expectedHeader.includes}` : ""}.`,
      { url, status: response.status, headers: pickHeaders(headers) }
    );
    return { ok, status: response.status, headers, text };
  } catch (error) {
    addCheck(category, label, "gap", `${url} request failed: ${error.message}`, { url });
    return { ok: false, error };
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function addCommandCheck(category, result, options = {}) {
  const status = result.ok ? "pass" : options.networkCanFail && /network|fetch|registry|ENOTFOUND|ECONN/i.test(result.output) ? "gap" : "fail";
  addCheck(category, result.label, status, commandSummary(result), commandEvidence(result));
}

function commandSummary(result) {
  if (result.ok) return `${result.label} exited 0 in ${formatDuration(result.durationMs)}.`;
  return `${result.label} exited ${result.exitCode ?? "unknown"} in ${formatDuration(result.durationMs)}.`;
}

function commandEvidence(result) {
  return {
    command: [result.command, ...result.args].join(" "),
    cwd: path.relative(ROOT, result.cwd) || ".",
    exitCode: result.exitCode,
    durationMs: result.durationMs,
    output: truncate(result.output, 4000),
  };
}

async function runCommand(label, command, args, cwd) {
  const started = Date.now();
  return await new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      shell: false,
      env: { ...process.env, CI: "1" },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", (error) => {
      resolve({
        label,
        command,
        args,
        cwd,
        ok: false,
        exitCode: null,
        durationMs: Date.now() - started,
        output: `${stdout}\n${stderr}\n${error.message}`.trim(),
      });
    });
    child.on("close", (exitCode) => {
      resolve({
        label,
        command,
        args,
        cwd,
        ok: exitCode === 0,
        exitCode,
        durationMs: Date.now() - started,
        output: `${stdout}\n${stderr}`.trim(),
      });
    });
  });
}

function addCheck(category, label, status, detail, evidence = null) {
  report.checks.push({
    category,
    label,
    status,
    detail,
    evidence,
  });
}

function addAction(action) {
  const normalized = {
    area: action.area,
    priority: action.priority,
    evidence: action.evidence,
    recommended_action: action.recommended_action,
    outcome_goal: action.outcome_goal,
    due_by_next_report: action.due_by_next_report || formatDate(dueByNextReport),
    proposed_agent_or_automation: action.proposed_agent_or_automation,
    requires_approval: Boolean(action.requires_approval),
  };
  const key = `${normalized.area}|${normalized.priority}|${normalized.recommended_action}`;
  if (actionKeys.has(key)) return;
  actionKeys.add(key);
  report.actions.push(normalized);
}

function renderMarkdown(model) {
  const counts = countStatuses(model.checks);
  const topActions = [...model.actions].sort(prioritySort);
  const lines = [
    `# Biweekly Website Review - ${model.site.brand}`,
    "",
    `Generated: ${formatDateTime(new Date(model.generatedAt))}`,
    `Review window: ${formatDate(new Date(model.reviewWindow.start))} to ${formatDate(new Date(model.reviewWindow.end))}`,
    `Next outcome target date: ${formatDate(new Date(model.reviewWindow.nextReportDue))}`,
    "",
    "## Executive Summary",
    "",
    `- Site-controlled checks recorded ${counts.pass} pass, ${counts.warn} warn, ${counts.fail} fail, ${counts.gap} data/access gap, and ${counts.skipped} skipped result(s).`,
    `- The report produced ${model.actions.length} task proposal(s); none should mutate the site without approval.`,
    `- Private analytics coverage: ${privateCoverageLine(model.inputs.privateData)}.`,
    `- Generated artifacts: ${model.artifacts.latestMarkdown || path.relative(ROOT, path.join(outputDir, "latest.md"))} and ${model.artifacts.latestJson || path.relative(ROOT, path.join(outputDir, "latest.json"))}.`,
    "",
    "## Action Queue",
    "",
  ];

  if (topActions.length) {
    lines.push("| Priority | Area | Action | Outcome Goal | Approval |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const action of topActions) {
      lines.push(`| ${escapeTable(action.priority)} | ${escapeTable(action.area)} | ${escapeTable(action.recommended_action)} | ${escapeTable(action.outcome_goal)} | ${action.requires_approval ? "Yes" : "No"} |`);
    }
  } else {
    lines.push("No task proposals were raised in this run.");
  }

  for (const section of model.sections) {
    lines.push("", `## ${section.title}`, "", "### Data", "");
    for (const item of section.data) lines.push(`- ${item}`);
    lines.push("", "### Insights", "");
    for (const item of section.insights) lines.push(`- ${item}`);
    lines.push("", "### Actions", "");
    for (const item of section.actions) lines.push(`- ${item}`);
    lines.push("", "### Outcome Goals", "");
    for (const item of section.outcomeGoals) lines.push(`- ${item}`);
  }

  lines.push("", "## Source And Access Notes", "");
  lines.push("- Live public checks use fetch, DNS, and public endpoints only.");
  lines.push("- Private traffic/search claims are included only when exports or read-only API credentials are present.");
  lines.push("- Missing dashboards or credentials are recorded as access gaps instead of inferred metrics.");
  lines.push("- The runner writes generated report files under ignored output/site-review.");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function printConciseSummary(model) {
  const counts = countStatuses(model.checks);
  console.log(`Biweekly site review generated for ${SITE.domain}`);
  console.log(`Checks: ${counts.pass} pass, ${counts.warn} warn, ${counts.fail} fail, ${counts.gap} gap, ${counts.skipped} skipped`);
  console.log(`Task proposals: ${model.actions.length}`);
  for (const action of [...model.actions].sort(prioritySort).slice(0, 5)) {
    console.log(`- ${action.priority} ${action.area}: ${action.recommended_action}`);
  }
  console.log(`Markdown: ${model.artifacts.latestMarkdown}`);
  console.log(`JSON: ${model.artifacts.latestJson}`);
  console.log("Use --print-markdown to print the full report body.");
}

function prioritySort(a, b) {
  const rank = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
  return (rank[a.priority] ?? 9) - (rank[b.priority] ?? 9);
}

function countStatuses(checks) {
  const counts = { pass: 0, warn: 0, fail: 0, gap: 0, skipped: 0 };
  for (const check of checks) {
    counts[check.status] = (counts[check.status] || 0) + 1;
  }
  return counts;
}

function privateCoverageLine(privateData) {
  if (!privateData) return "not loaded";
  return Object.entries(privateData)
    .map(([key, value]) => `${key}=${value.status}${value.rowCount ? `(${value.rowCount})` : ""}`)
    .join(", ");
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8"));
}

async function readOptionalText(relativePath) {
  try {
    return await readFile(path.join(ROOT, relativePath), "utf8");
  } catch {
    return "";
  }
}

function rowsFromJson(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.rows)) return json.rows;
  if (Array.isArray(json.data)) return json.data;
  if (json.result && Array.isArray(json.result.rows)) return json.result.rows;
  if (json.result && Array.isArray(json.result.data)) return json.result.data;
  return [];
}

function parseCsv(text) {
  const rows = [];
  const records = [];
  let current = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      current.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      current.push(field);
      records.push(current);
      current = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length || current.length) {
    current.push(field);
    records.push(current);
  }

  const [headers = [], ...body] = records.filter((record) => record.some((cell) => cell.trim() !== ""));
  for (const record of body) {
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = (record[index] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function value(row, candidates) {
  const entries = Object.entries(row || {});
  for (const candidate of candidates) {
    const found = entries.find(([key]) => normalizeKey(key) === normalizeKey(candidate));
    if (found && found[1] !== "") return String(found[1]);
  }
  return "";
}

function numberValue(row, candidates) {
  const raw = value(row, candidates);
  if (raw === "") return null;
  const parsed = Number(String(raw).replace(/[%,$,\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function percentValue(row, candidates) {
  const raw = value(row, candidates);
  if (raw === "") return null;
  const numeric = Number(String(raw).replace(/[%,$,\s]/g, ""));
  if (!Number.isFinite(numeric)) return null;
  return String(raw).includes("%") || numeric > 1 ? numeric / 100 : numeric;
}

function sum(rows, candidates) {
  return rows.reduce((total, row) => total + (numberValue(row, candidates) || 0), 0);
}

function normalizeKey(key) {
  return String(key).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function score(category) {
  return typeof category?.score === "number" ? Math.round(category.score * 100) : "n/a";
}

function auditDisplay(audit) {
  return audit?.displayValue || (typeof audit?.numericValue === "number" ? String(audit.numericValue) : "n/a");
}

function pickHeaders(headers) {
  const keep = ["server", "content-type", "location", "strict-transport-security", "content-security-policy", "x-content-type-options", "cache-control"];
  return Object.fromEntries(keep.filter((key) => headers[key]).map((key) => [key, headers[key]]));
}

function truncate(text, max) {
  if (!text || text.length <= max) return text || "";
  return `${text.slice(0, max)}\n...[truncated ${text.length - max} chars]`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value || 0);
}

function formatPercent(value) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format((value || 0) * 100)}%`;
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatDateTime(date) {
  return date.toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");
}

function formatStamp(date) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function escapeTable(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}
