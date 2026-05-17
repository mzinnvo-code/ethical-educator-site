import { C } from "../theme.js";
import { FadeIn, SectionLabel, SectionTitle, PageContainer, Narrow, Divider } from "../components/shared.jsx";

export default function Terms({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle>Terms of Use</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", marginTop: 8 }}>Last updated: May 2026</p>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 32, color: C.textSecondary, lineHeight: 1.8, fontSize: "0.94rem" }}>

            <FadeIn delay={0.04}>
              <div style={{ marginTop: 8, padding: "14px 18px", border: `1px solid ${C.coral}`, borderRadius: 8, background: "rgba(192,112,64,0.06)" }}>
                <p style={{ color: C.coral, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>
                  Draft — Pending Attorney Review
                </p>
                <p style={{ color: C.textSecondary, fontSize: "0.85rem", margin: 0 }}>
                  These terms are an initial draft prepared as a starting point for review by a licensed attorney in the applicable jurisdiction. They have not been reviewed by counsel and should not be relied upon as final legal terms.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <Divider label="1. Agreement" />
              <p>These Terms of Use ("Terms") govern your access to and use of the website located at theethicaleducator.com and any related subdomains and pages (the "Site"). The Site is operated by Matthew A. Zinn ("we," "us," or "the operator"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.</p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Divider label="2. Educational and Informational Use Only — No Professional Advice" />
              <p>The Site provides educational and informational content about moral psychology, philosophy, AI ethics, and the practice of teaching. <strong style={{ color: C.textPrimary }}>Nothing on this Site constitutes legal, medical, psychological, special-education, or other professional advice.</strong> The Site does not create a professional or fiduciary relationship of any kind between you and the operator.</p>
              <p style={{ marginTop: 10 }}>Frameworks, thought experiments, scenarios, lesson plans, teacher kits, and policy guidance are offered for reflection, discussion, and classroom exploration. They are not substitutes for the judgment of qualified professionals, the policies of your school or district, or the laws and regulations that apply to your specific context. Always consult appropriate professionals before acting in any specific situation.</p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Divider label="3. Eligibility and Audiences" />
              <p>The Site is designed for use by educators, school leaders, parents, and other adults. Content tagged for kindergarten through grade five ("K–5") is designed to be presented to children by a parent, teacher, or other supervising adult, not for independent use by children.</p>
              <p style={{ marginTop: 10 }}>The Site does not knowingly collect personal information from any visitor, including children under 13. See the <a href="/privacy" onClick={e => { e.preventDefault(); navigate("privacy"); }} style={{ color: C.gold, textDecoration: "underline" }}>Privacy Policy</a> for details.</p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Divider label="4. Intellectual Property" />
              <p>Except where otherwise noted, all original text, structure, visual design, illustrations, audio narration, code, and other materials on the Site are the intellectual property of the operator, protected by copyright and other applicable laws.</p>
              <p style={{ marginTop: 10 }}><strong style={{ color: C.textPrimary }}>License to you.</strong> Unless a specific item is marked with a different license, the operator licenses the educational content of the Site to you under the <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: "underline" }}>Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license</a>. You may share, adapt, and remix the content for any non-commercial purpose, provided that you give appropriate credit, indicate any changes, and do not suggest the operator endorses you or your use.</p>
              <p style={{ marginTop: 10 }}>This license does not extend to: (a) the site's name, logo, branding, or "The Ethical Educator" mark; (b) third-party content reproduced under fair use, license, or other permissions, which remain governed by their own terms; or (c) any use that misrepresents authorship, removes attribution, or implies endorsement.</p>
              <p style={{ marginTop: 10 }}>For permissions beyond this license — including commercial use, paid distribution, or institutional licensing — please contact <a href="mailto:hello@theethicaleducator.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@theethicaleducator.com</a>.</p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Divider label="5. AI-Generated Content Disclosure" />
              <p>In the interest of transparency: illustrations on the Site were generated using OpenAI's DALL·E. Read-aloud audio narration was generated using ElevenLabs under a paid commercial-use plan. See the <a href="/credits" onClick={e => { e.preventDefault(); navigate("credits"); }} style={{ color: C.gold, textDecoration: "underline" }}>Credits page</a> for full attribution.</p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <Divider label="6. Acceptable Use" />
              <p>You agree not to use the Site to:</p>
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li>violate any applicable law, regulation, or third-party right;</li>
                <li>attempt to gain unauthorized access to any portion of the Site or any related system;</li>
                <li>scrape, mass-download, or systematically harvest the Site's content other than for personal or classroom reference, except in a manner consistent with the CC BY-NC 4.0 license set out above;</li>
                <li>frame or mirror the Site in a way that misrepresents its origin or authorship;</li>
                <li>misrepresent your identity or affiliation;</li>
                <li>interfere with the normal operation of the Site, including by introducing malware, automated abuse, or excessive request volume.</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.18}>
              <Divider label="7. Third-Party Links and Embedded Content" />
              <p>The Site links to and embeds content from third parties, including academic publishers, YouTube, Google Fonts, the Stanford Encyclopedia of Philosophy, news organizations, and others. Those resources are governed by their own terms and privacy practices, and the operator does not endorse, control, or assume responsibility for their content or conduct.</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Divider label="8. Copyright Complaints (DMCA)" />
              <p>The operator respects the intellectual property rights of others. If you believe that material on the Site infringes a copyright you own or control, please send a written notice to <a href="mailto:hello@theethicaleducator.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@theethicaleducator.com</a> that includes:</p>
              <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li>identification of the copyrighted work claimed to have been infringed;</li>
                <li>identification of the material on the Site you claim is infringing, with enough detail to locate it (a URL is best);</li>
                <li>your contact information (name, address, telephone, email);</li>
                <li>a statement that you have a good-faith belief that the use is not authorized by the copyright owner, its agent, or the law;</li>
                <li>a statement, under penalty of perjury, that the information in the notice is accurate and that you are authorized to act on behalf of the copyright owner;</li>
                <li>your physical or electronic signature.</li>
              </ul>
              <p style={{ marginTop: 10 }}>Notices that do not substantially comply with these requirements may not be actionable.</p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <Divider label="9. Disclaimer of Warranties" />
              <p>THE SITE AND ALL CONTENT, MATERIALS, AND FEATURES ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY. THE OPERATOR DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY CONTENT IS COMPLETE, CURRENT, OR FREE OF ERRORS.</p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <Divider label="10. Limitation of Liability" />
              <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL THE OPERATOR BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE OPERATOR'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100). Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.</p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <Divider label="11. Indemnification" />
              <p>You agree to defend, indemnify, and hold harmless the operator from and against any claims, damages, liabilities, costs, or expenses (including reasonable attorney fees) arising out of or relating to (a) your use of the Site in violation of these Terms, (b) your violation of any law or third-party right, or (c) any content you submit, transmit, or otherwise make available in connection with the Site.</p>
            </FadeIn>

            <FadeIn delay={0.28}>
              <Divider label="12. Governing Law and Venue" />
              <p>These Terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-laws principles. The exclusive venue for any dispute arising out of or relating to these Terms or the Site will be the state or federal courts located in the State of New Jersey, and you consent to the personal jurisdiction of those courts.</p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Divider label="13. Changes to These Terms" />
              <p>The operator may update these Terms from time to time. When changes are made, the "Last updated" date at the top of this page will be revised. Continued use of the Site after changes become effective constitutes acceptance of the updated Terms.</p>
            </FadeIn>

            <FadeIn delay={0.32}>
              <Divider label="14. Severability and Entire Agreement" />
              <p>If any provision of these Terms is found to be unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect. These Terms, together with the <a href="/privacy" onClick={e => { e.preventDefault(); navigate("privacy"); }} style={{ color: C.gold, textDecoration: "underline" }}>Privacy Policy</a> and the <a href="/accessibility" onClick={e => { e.preventDefault(); navigate("accessibility"); }} style={{ color: C.gold, textDecoration: "underline" }}>Accessibility Statement</a>, constitute the entire agreement between you and the operator regarding your use of the Site.</p>
            </FadeIn>

            <FadeIn delay={0.34}>
              <Divider label="15. Contact" />
              <p>Questions about these Terms may be sent to <a href="mailto:hello@theethicaleducator.com" style={{ color: C.gold, textDecoration: "underline" }}>hello@theethicaleducator.com</a>.</p>
            </FadeIn>

            <FadeIn delay={0.36}>
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
