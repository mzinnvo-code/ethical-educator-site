const HOST = "examinedclassroom.com";
const ORIGIN = `https://${HOST}`;
const KEY = "6a7ee777-5ff8-42b6-af77-abed93f2db29";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

const priorityPaths = [
  "/",
  "/about",
  "/thought-experiments",
  "/tools",
  "/ai-education",
  "/ai-ethics-lesson-plans",
  "/thought-experiments-for-kids",
  "/ai-literacy-activities",
  "/school-ai-policy-tools",
  "/academic-integrity-ai-discussions",
  "/philosophy-for-kids",
  "/teaching-resources/paperclip-maximizer",
  "/teaching-resources/consciousness-line",
  "/teaching-resources/ai-authorship-discussion",
  "/teaching-resources/ai-detector-false-positive",
  "/teaching-resources/biased-classroom-robot",
  "/teaching-resources/school-surveillance",
  "/teaching-resources/ai-grading-mistake",
  "/teaching-resources/ai-policy-design-staff-activity",
  "/resources",
];

const urlList = priorityPaths.map((path) => new URL(path, ORIGIN).toString());

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ endpoint: ENDPOINT, ...body }, null, 2));
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const responseText = await response.text();
const accepted = response.status === 200 || response.status === 202;

console.log(`IndexNow response: ${response.status} ${response.statusText}`);
if (responseText.trim()) {
  console.log(responseText.trim());
}

if (!accepted) {
  throw new Error("IndexNow submission was not accepted.");
}

console.log(`Submitted ${urlList.length} priority URLs for ${HOST}.`);
