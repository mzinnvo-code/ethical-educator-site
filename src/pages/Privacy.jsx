import { C } from "../theme.js";
import { FadeIn, SectionLabel, SectionTitle, PageContainer, Narrow, Divider } from "../components/shared.jsx";

export default function Privacy({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle>Privacy Policy</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", marginTop: 8 }}>Last updated: April 2026</p>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 32, color: C.textSecondary, lineHeight: 1.8, fontSize: "0.94rem" }}>

            <FadeIn delay={0.06}>
              <Divider label="What We Collect" />
              <p>This site collects no personal data. There are no accounts, no forms that submit data to a server, and no analytics services embedded on any page.</p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Divider label="Cookies" />
              <p>No cookies are set by this site. No tracking pixels, session tokens, or persistent identifiers are stored in your browser.</p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Divider label="Interactive Features" />
              <p>By default, the interactive thought experiments on this site store your in-session choices in browser memory only (JavaScript variables). This data is never transmitted anywhere and disappears the moment you close or refresh the page.</p>
              <p style={{ marginTop: 10 }}>If you opt in to the <strong>Decision Journal</strong> by clicking <em>Save to journal</em> at the end of any thought experiment, your saved entries are written to your browser's <code>localStorage</code> on this device only. Nothing is transmitted to any server, and no account is created. You can export your journal as a Markdown file or clear it at any time from the Decision Journal page. Clearing your browser's site data also erases the journal.</p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Divider label="External Links" />
              <p>This site links to external websites — including blog posts, academic papers, organizations, and policy documents. Those sites have their own privacy policies. Visiting an external link is subject to the privacy practices of the destination site, not this one.</p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Divider label="Third-Party Services" />
              <p>No third-party analytics, advertising, or tracking services are embedded on this site. The site is hosted on GitHub Pages. For GitHub's data practices, see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's Privacy Statement</a>.</p>
            </FadeIn>

            <FadeIn delay={0.16}>
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
