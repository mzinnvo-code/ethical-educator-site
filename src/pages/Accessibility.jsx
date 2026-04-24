import { C } from "../theme.js";
import { FadeIn, SectionLabel, SectionTitle, PageContainer, Narrow, Divider } from "../components/shared.jsx";

export default function Accessibility({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle>Accessibility Statement</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", marginTop: 8 }}>Last updated: April 2026</p>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 32, color: C.textSecondary, lineHeight: 1.8, fontSize: "0.94rem" }}>

            <FadeIn delay={0.06}>
              <p>The Ethical Educator is committed to making this site accessible to everyone, including people with disabilities. We target <strong style={{ color: C.textPrimary }}>WCAG 2.1 Level AA</strong> conformance.</p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Divider label="Supported Features" />
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li><strong style={{ color: C.textPrimary }}>Keyboard navigation</strong> — All interactive elements (expandable sections, thought experiment buttons, nav links) are reachable and operable via keyboard alone.</li>
                <li><strong style={{ color: C.textPrimary }}>Screen reader support</strong> — Semantic HTML, ARIA labels on icon-only elements, and descriptive alt text on SVG diagrams are used throughout the site.</li>
                <li><strong style={{ color: C.textPrimary }}>Reduced motion</strong> — A <code style={{ color: C.sand, fontSize: "0.88em" }}>prefers-reduced-motion</code> media query disables page-entry animations, counter animations, and CSS transitions for users who request it.</li>
                <li><strong style={{ color: C.textPrimary }}>Colour contrast</strong> — Text is rendered against dark backgrounds with sufficient contrast ratios for primary and secondary text levels.</li>
                <li><strong style={{ color: C.textPrimary }}>Responsive layout</strong> — The site is usable at all viewport widths, with grid layouts collapsing to single-column on narrow screens.</li>
                <li><strong style={{ color: C.textPrimary }}>Focus indicators</strong> — Interactive elements retain browser-default focus rings; no focus styles have been suppressed.</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Divider label="Known Limitations" />
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li>Embedded YouTube videos (on the Moral Psychology page) are served by a third-party player. Caption availability depends on the individual video's settings on YouTube.</li>
                <li>Some complex SVG diagrams include <code style={{ color: C.sand, fontSize: "0.88em" }}>aria-label</code> descriptions but may not convey every detail to screen reader users. The information in each diagram is also described in surrounding text.</li>
                <li>The interactive thought experiments include audio feedback (click and chime sounds). Audio is supplementary — all information and choices are also conveyed visually, and no interaction requires audio.</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Divider label="Reporting Issues" />
              <p>If you encounter an accessibility barrier on this site, please describe the issue and the page or feature where you found it. Contact details will be added here shortly.</p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div style={{ marginTop: 36 }}>
                <button
                  onClick={() => navigate("home")}
                  style={{ padding: "10px 24px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}
                >
                  ← Back to Home
                </button>
              </div>
            </FadeIn>

          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
