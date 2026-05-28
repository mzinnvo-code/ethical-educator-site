import { C } from "../theme.js";
import { FadeIn, SectionLabel, SectionTitle, PageContainer, Narrow, Divider } from "../components/shared.jsx";

export default function Credits({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Colophon</SectionLabel>
          <SectionTitle>Credits & AI Disclosures</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", marginTop: 8 }}>Last updated: May 2026</p>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 32, color: C.textSecondary, lineHeight: 1.8, fontSize: "0.94rem" }}>

            <FadeIn delay={0.06}>
              <p>The Examined Classroom is built and maintained by Matthew A. Zinn. This page documents how the site is made, what tools it relies on, and where its visual and audio assets come from. Transparency about AI use is core to the site's purpose — a resource about AI ethics should be honest about its own use of AI.</p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Divider label="Illustrations" />
              <p>All original illustrations on this site — across the Thought Experiments cards, hero art, educator resources, and AI-in-Education pages — were created using <a href="https://openai.com/dall-e-3/" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: "underline" }}>OpenAI's DALL·E</a> image-generation model. They are used under OpenAI's terms of service, which assign ownership of generated outputs to the creating account.</p>
              <p style={{ marginTop: 10 }}>The visual direction follows the style guide in the site's repository (warm, painterly, symbolic rather than literal; no identifiable faces; muted palette drawn from the site's theme tokens).</p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Divider label="Audio Narration" />
              <p>Read-aloud audio for K–2 and K–5 thought experiments was generated using <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: "underline" }}>ElevenLabs</a> text-to-speech under a paid commercial-use plan. Voices were selected for warmth and clarity at the relevant grade level; classroom scenes use multiple voices to distinguish characters.</p>
              <p style={{ marginTop: 10 }}>No human voice samples were cloned. All audio is synthesized from text scripts written for this site.</p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Divider label="Typography" />
              <p>The site uses three open-source typefaces, served via <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: "underline" }}>Google Fonts</a>:</p>
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li><strong style={{ color: C.textPrimary }}>Source Serif 4</strong> — Frank Grießhammer (SIL Open Font License)</li>
                <li><strong style={{ color: C.textPrimary }}>DM Sans</strong> — Colophon Foundry & Indian Type Foundry (SIL Open Font License)</li>
                <li><strong style={{ color: C.textPrimary }}>JetBrains Mono</strong> — JetBrains (SIL Open Font License)</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Divider label="Technology" />
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li><strong style={{ color: C.textPrimary }}>React</strong> and <strong style={{ color: C.textPrimary }}>Vite</strong> — the SPA framework and build tool.</li>
                <li><strong style={{ color: C.textPrimary }}>Browserless static prerender script</strong> — writes crawlable route HTML at build time for SEO and accessibility without launching Chrome or Chromium.</li>
                <li><strong style={{ color: C.textPrimary }}>GitHub Pages</strong> — static hosting.</li>
              </ul>
              <p style={{ marginTop: 10 }}>The site uses privacy-preserving Cloudflare Web Analytics for aggregate traffic and performance measurement. It uses no advertising networks, behavioral ad trackers, or cookies. See the <a href="/privacy" onClick={e => { e.preventDefault(); navigate("privacy"); }} style={{ color: C.gold, textDecoration: "underline" }}>Privacy Policy</a> for details.</p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <Divider label="How This Site Was Built" />
              <p>The site's code and content scaffolding were authored by Matthew A. Zinn with substantial AI-assisted development from two coding tools: <strong style={{ color: C.textPrimary }}>Anthropic's Claude</strong> (via Claude Code) and <strong style={{ color: C.textPrimary }}>OpenAI's Codex</strong>. All architectural decisions, scenarios, prose, pedagogy, and final review are the author's; AI assisted with code generation, refactoring, and iteration.</p>
              <p style={{ marginTop: 10 }}>The same transparency the site asks of educators applies to its own construction: AI was a tool in the workflow, not a substitute for editorial judgment.</p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <Divider label="Sources, Citations, and Embedded Media" />
              <p>The site references academic publications, research articles, policy documents, and journalism throughout. A curated reading list and source bibliography is maintained on the <a href="/resources" onClick={e => { e.preventDefault(); navigate("resources"); }} style={{ color: C.gold, textDecoration: "underline" }}>Resources</a> page.</p>
              <p style={{ marginTop: 10 }}>Quoted material from copyrighted works is included for educational commentary under fair use, with attribution to the original author and publication. Embedded videos use YouTube's standard iframe player and remain the property of their respective creators and rights holders.</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Divider label="Permissions and Reuse" />
              <p>Unless otherwise noted, the original educational content on this site is offered under the <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: "underline" }}>Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license</a> — share and adapt freely for non-commercial use with attribution. For commercial licensing or other permissions, contact <a href="mailto:hello@examinedclassroom.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@examinedclassroom.com</a>. Full terms are in the <a href="/terms" onClick={e => { e.preventDefault(); navigate("terms"); }} style={{ color: C.gold, textDecoration: "underline" }}>Terms of Use</a>.</p>
            </FadeIn>

            <FadeIn delay={0.22}>
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
