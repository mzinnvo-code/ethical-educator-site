import { C } from "../theme.js";
import { FadeIn, SectionLabel, SectionTitle, PageContainer, Narrow, Divider } from "../components/shared.jsx";

export default function Privacy({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle>Privacy Policy</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", marginTop: 8 }}>Last updated: May 2026</p>
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
              <Divider label="Hosting and Server Logs" />
              <p>The site is hosted on GitHub Pages. GitHub, as the hosting provider, may process basic technical information about visitors (such as IP address, user agent, and request timestamps) in its standard server logs. This data is processed by GitHub, not by us, and we do not receive or retain it. For GitHub's data practices, see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's Privacy Statement</a>.</p>
              <p style={{ marginTop: 10 }}>No third-party analytics, advertising, or tracking services are embedded on this site.</p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <Divider label="Children's Privacy" />
              <p>The site includes content designed for use with children — including thought experiments tagged for kindergarten through grade five — but is intended to be presented to children by a parent, teacher, or other supervising adult, not for independent use by children.</p>
              <p style={{ marginTop: 10 }}>We do not knowingly collect personal information from any visitor, including children under 13. The optional Decision Journal feature stores entries only in the user's own browser via <code>localStorage</code> and never transmits them. If you believe a child has provided information through any future feature in a way that conflicts with this policy, please contact <a href="mailto:hello@examinedclassroom.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@examinedclassroom.com</a>.</p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <Divider label="Your Rights" />
              <p>Because the site does not collect or retain personal information about visitors, most data-subject rights under privacy laws (such as the EU General Data Protection Regulation and the California Consumer Privacy Act / California Privacy Rights Act) have no records to apply to. For completeness:</p>
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li><strong style={{ color: C.textPrimary }}>Right to know / access:</strong> we do not hold personal data about you.</li>
                <li><strong style={{ color: C.textPrimary }}>Right to delete / erasure:</strong> you can clear your browser's site data to erase any locally stored Decision Journal entries.</li>
                <li><strong style={{ color: C.textPrimary }}>Right to opt out of sale or sharing:</strong> we do not sell or share personal information.</li>
                <li><strong style={{ color: C.textPrimary }}>Right to non-discrimination:</strong> we will not deny service for exercising any of these rights.</li>
              </ul>
              <p style={{ marginTop: 10 }}>Questions or requests may be sent to <a href="mailto:hello@examinedclassroom.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@examinedclassroom.com</a>.</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Divider label="International Visitors" />
              <p>The site is operated from the United States and hosted on infrastructure located in the United States. By using the site from outside the United States, you understand that any information processed in connection with your visit (such as GitHub's server logs) may be processed in the United States.</p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <Divider label="Changes to This Policy" />
              <p>If this policy is updated, the "Last updated" date at the top of this page will be revised. Substantive changes will be summarized at the top of the page for at least 30 days.</p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <Divider label="Contact" />
              <p>Questions about this Privacy Policy may be sent to <a href="mailto:hello@examinedclassroom.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@examinedclassroom.com</a>.</p>
            </FadeIn>

            <FadeIn delay={0.26}>
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
