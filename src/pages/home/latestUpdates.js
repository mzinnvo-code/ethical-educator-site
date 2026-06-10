// The three most recent entries from src/data/whatsNew.js, duplicated as a
// slim module so the home page's eager chunk doesn't pin the entire (and
// growing) WHATS_NEW archive. latestUpdates.test.mjs asserts these are
// exactly the top three by date — adding a newer entry to whatsNew.js fails
// the test until this file is refreshed, so the home page can't go stale.

export const LATEST_UPDATES = [
  {
    id: "organic-growth-resource-library",
    date: "2026-05-28",
    title: "New resource pages for AI ethics lesson planning",
    blurb: "The site now has search-friendly teacher entry pages for AI ethics lesson plans, thought experiments for kids, AI literacy activities, school AI policy tools, academic integrity discussions, and philosophy for kids.",
    url: "/ai-ethics-lesson-plans",
  },
  {
    id: "standalone-teacher-resources",
    date: "2026-05-28",
    title: "Eight standalone teacher-resource pages are now live",
    blurb: "Classroom-ready pages now exist for the Paperclip Maximizer, The Consciousness Line, AI authorship, detector false positives, biased classroom robots, school surveillance, AI grading mistakes, and AI policy design.",
    url: "/teaching-resources/paperclip-maximizer",
  },
  {
    id: "tools-hub",
    date: "2026-05-22",
    title: "New hub: all four interactive tools in one place",
    blurb: "The Picker, the AI Use Rubric, the AI Policy Builder, and the Family Conversation Generator now live together at /tools — with a clear note on who each one is for and when to reach for it. The 'Tools' link in the topbar nav is the new entry point.",
    url: "/tools",
  },
];
