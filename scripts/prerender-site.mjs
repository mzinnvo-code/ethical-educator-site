#!/usr/bin/env node
import { existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { run } = require("react-snap");
const { reactSnap = {}, homepage } = require("../package.json");

const chromeCandidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].filter(Boolean);

const executablePath = chromeCandidates.find((candidate) => existsSync(candidate));
const publicPath = homepage ? new URL(homepage).pathname : "/";

const options = {
  publicPath,
  ...reactSnap,
  ...(executablePath ? { puppeteerExecutablePath: executablePath } : {}),
};

if (executablePath) {
  console.log(`Using Chrome for prerendering: ${executablePath}`);
} else {
  console.log("Using Puppeteer's bundled Chromium for prerendering.");
}

run(options).catch((error) => {
  console.error(error);
  process.exit(1);
});
