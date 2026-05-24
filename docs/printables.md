# Printables — print + Save as PDF

Phase C v1 of the roadmap: any page can be printed (or "Save as PDF") with site chrome hidden and prose reformatted for paper. Teacher kits get a one-click button. The full puppeteer pre-generation path (so each kit has its own static `.pdf` URL) is documented at the bottom as the v2 follow-up.

## What v1 ships

- **`src/styles/print.css`** — loaded globally via `src/main.jsx`. Applies a `@media print` ruleset that:
  - Hides nav, footer, the third-visit modal, the grain overlay, the skip link, all `<button>`s, audio/video/iframe embeds.
  - Resets every color to black on white (anything readable on dark theme stays readable on paper).
  - Reformats links to show their full URL after the visible text, for outbound links only.
  - Keeps cards, blockquotes, and sections from breaking awkwardly across pages.
  - Caps `<img>` height so a wide illustration can't blow out a single page.
  - Forces expandable content open so nothing gets hidden behind a closed accordion.
  - Sets `@page` margins to 0.6in × 0.7in (US Letter / A4 friendly).
- **`TeacherKit` "Print this kit" button** — already existed; now fires `track("pdf_download", { slug, type: "kit", placement: "teacher_kit" })` before opening the print dialog, so we can see *which* kits teachers are actually printing.
- **Every other page** prints cleanly via `Cmd+P` (Mac) / `Ctrl+P` (Windows/Linux) using the same global stylesheet.

## How a teacher uses it

1. Open the lesson on the site (e.g. `/thought-experiments/explaining-red-k-2`).
2. Scroll to the teacher kit at the bottom.
3. Click **🖨 Print this kit**.
4. The print dialog opens with the page rendered for paper.
5. Choose a physical printer to print, or **"Save as PDF"** as the destination to get a file they can email/share/store.

The same Cmd+P shortcut works on any page — research articles, hub pages, the dialogue toolkit, etc. — for teachers who want a paper or PDF copy of something other than a kit.

## Tracking

Every "Print this kit" click fires:

```js
track("pdf_download", {
  slug: experiment.id,
  type: "kit",
  placement: "teacher_kit"
})
```

Once the `examined-classroom-events` Worker is deployed (PR #54), these events land in the `examined_classroom_events` Workers Analytics Engine dataset. Query the most-printed kits:

```sql
SELECT blob4 AS kit_slug, SUM(_sample_interval) AS prints
FROM examined_classroom_events
WHERE blob1 = 'pdf_download' AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY kit_slug ORDER BY prints DESC LIMIT 20
```

That number tells you which lessons are actually getting into classrooms, which informs what to feature in the Sunday Dilemma newsletter and what to invest in deepening.

## What v2 will add (deferred)

The plan called for pre-generated PDFs (each kit as a static `.pdf` file in `public/printables/`, downloadable without invoking the browser print dialog). That's a more polished UX but a bigger lift:

- A `scripts/generate-printables.mjs` script that uses Puppeteer to load each kit URL in headless Chrome and call `page.pdf()`.
- Output to `public/printables/<slug>.pdf`, ~5–15MB per kit (illustrations + fonts embedded).
- Wired into `package.json`'s build chain so a fresh build emits the latest PDFs.
- A "Download PDF" button alongside the existing "Print this kit" button on each TeacherKit.
- Storage cost: dozens of multi-MB PDFs in the repo — eventually we should host them on Cloudflare R2 instead of committing them, since they're regeneratable artifacts.

Estimated effort for v2: half a day. Recommend doing it after we have data from v1 showing which kits are actually getting printed (no point pre-generating PDFs for kits nobody prints).

## Limitations of v1

- **Color illustrations print as grayscale.** Most home/school printers are mono; the print stylesheet is paper-first, not glossy. If a teacher wants color, the "Save as PDF" path preserves it for digital sharing.
- **Long kits may span multiple pages.** That's fine for paper; not ideal for a single-page PDF. v2's puppeteer pipeline can paginate more deliberately.
- **The whole article around the kit also prints.** A teacher on a scenario page who clicks "Print this kit" gets the kit *plus* the scenario context above it. That's usually fine (more context = more useful), but if you want the kit alone, the v1 workaround is: open the kit in a new tab via the scenario URL, scroll past the scenario to the kit, then Cmd+P. v2 scoped-print fixes this.
- **Tracking only fires for the "Print this kit" button**, not for general Cmd+P prints. We can't reliably hook the browser's print event from JS, so general Cmd+P prints are invisible in analytics. That's fine — the kit button is the canonical "I want this resource" signal.
