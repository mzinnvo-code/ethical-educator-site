# Integration Changelog

Append-only log of Gamma → site integration work. One entry per Gamma item. Each entry records what was integrated, where, and what was deliberately omitted (with reason).

---

## 2026-04-28 — Gamma #20: "AI Ethics in Education" + Gamma #35: "Academic Integrity in the Age of AI"

**Target file:** `src/pages/AIEthics.jsx`
**Insertion point:** New `<Divider label="Foundations for Leadership Discussion">` block, placed after the existing "Looking Ahead" / Thought Experiments section and before the `<ContinueExploring>` footer.

### What was integrated

Five new `<Expandable>` panels under one new divider:

1. **"Why Ethics, Not Just Compliance"** — synthesizes Cards 2–3 of #20. Frames consequentialism, rights-based approaches, and justice/fairness as a toolkit, names the **Jisc Ethical Framework** (the only specific source cited in the source PDF) as a starting point. Uses three `ComparisonCard`s.
2. **"Why AI Is Different from Prior Technological Transitions"** — synthesizes Cards 4–5 of #20. Uses a `Timeline` for the Industrial Revolution / agricultural / digital comparisons, then four `ComparisonCard`s for the four distinguishing features (implementation speed, cognitive automation, democratized access, 27% educational impact).
3. **"Discussion Prompts for Leadership Teams"** — direct port of Card 3 of #35. Four numbered prompts in a custom numbered-circle layout, with light authorial commentary reframing them for leadership PD use.
4. **"Case Study: Alex, Jordan, and Taylor"** — port of Card 4 of #35. The original PDF only names the three students and gives a high-level structure; I wrote concrete behavioral descriptions for each (using AI as brainstorming partner / drafting then editing / undisclosed substitution) so the case is actually discussable. The three reflection questions (assessing understanding, adapting policies, building trust) are taken directly from the PDF's pyramid structure.
5. **"The Reflection That Matters Most"** — port of Card 9 of #35's closing reflection question, expanded into a substantive closing argument about why traditional assessment was already vulnerable. Uses the existing `QuoteBlock` component for the closing question.

### Sources cited

Only what appears in the source PDFs:
- **Jisc Ethical Framework** — referenced by name in #20, Card 3.

No other citations were added. The page already cites Bastani, Hattie, Hume, Frankfurt, Sparrow & Flenady, Biesta, UNESCO, Liang et al., RAND, Inside Higher Ed, etc. — those came from earlier integrations and remain untouched.

### What was deliberately omitted

From **#20:**
- **Card 1 statistics ("62% of educators report ethical concerns," "AI adoption growing 34% annually").** The PDF gives no source for these. Adding them as standalone stats would either fabricate a citation or float them unsourced, which conflicts with the page's evidence standard. They are also redundant with the existing `StatCounter` row at the top of the page (HEPI, Digital Education Council, EU AI Act fine size — all sourced).
- **Card 7's "Five key principles" (transparency, fairness, accountability, privacy, human oversight).** Already covered in greater depth by the existing "Seven Principles for Ethical AI" expandable in the "Navigating the AI Frontier" section, which maps each principle to a philosophical tradition. Re-listing the five would be regression.
- **Card 8 ("Moving Forward") four bullets.** The aspirational framing ("balance innovation & ethics," "empower educators," etc.) duplicates content already present in "Building Ethical AI Policies That Actually Work" and the "Looking Ahead" / Five Frontiers section.

From **#35:**
- **Cards 5–7 (Collaboration Corner, Polls and Surveys, Interactive Features).** These describe Gamma-site features (forum, OneNote, file uploads) that don't translate to a static React page. The "share best practices" / "submit policies" CTAs would be dead links here.
- **Card 8 (Action Plan) full timeline image.** The PDF's timeline image rendered as garbled placeholder text in the export ("Actiple onty AI in education timeline" with corrupted body text). The three numbered action items (draft policies, organize training, evaluate tools) survived intact and are folded into the closing paragraph of "The Reflection That Matters Most."
- **Card 1's "Read Academic Integrity in the Age of AI" button link.** No URL is preserved in the export. If the original deck linked to a longer document, it would need to be sourced separately and added as an external `<a>` tag. Skipped pending that source.

### Voice / register

Matched the existing `AIEthics.jsx` academic register: full prose, em-dashes, multi-clause sentences, named frameworks, no exhortation. The "Discussion Prompts" expandable is the closest the new content gets to PD voice, but it remains framed as analysis ("a leadership group that agrees on policy language but disagrees on Prompt 3 doesn't actually agree on policy") rather than instruction.

### Component reuse

No new shared components introduced. Used existing: `Expandable`, `Divider`, `FadeIn`, `Timeline`, `ComparisonCard`, `QuoteBlock`. The numbered-circle layout in "Discussion Prompts" is inline JSX, mirroring the pattern already used in "Five Frontiers" (icon + title + desc rows).

### Build status

Pending verification — to be confirmed by `npm run build` after this commit.
