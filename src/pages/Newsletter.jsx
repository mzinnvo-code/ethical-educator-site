import { C } from "../theme.js";
import {
  PageContainer,
  Narrow,
  SectionLabel,
  SectionTitle,
  Subtitle,
  FadeIn,
  Expandable,
} from "../components/shared.jsx";
import NewsletterSignup from "../components/NewsletterSignup.jsx";

export default function Newsletter() {
  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>The Sunday Dilemma</SectionLabel>
            <SectionTitle>
              One thought experiment. One printable. One research finding. Every Sunday.
            </SectionTitle>
            <Subtitle>
              The newsletter built for K–12 teachers who want a classroom-ready dilemma in their inbox before Monday — and the discussion guide to run it well.
            </Subtitle>
          </FadeIn>

          <FadeIn delay={0.05}>
            <NewsletterSignup
              variant="inline"
              placement="landing"
              headline="Start with this Sunday's issue"
              subhead="Enter your email below. You'll get a confirmation message, then the next issue arrives Sunday morning."
              buttonLabel="Subscribe — it's free"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: C.textPrimary,
              fontSize: "1.4rem",
              fontWeight: 600,
              marginTop: 40,
              marginBottom: 14,
            }}>What you'll get each Sunday</h2>
            <ul style={{ listStyle: "none", padding: 0, color: C.textSecondary, fontSize: "0.96rem", lineHeight: 1.8 }}>
              <li style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <strong style={{ color: C.textPrimary }}>The Dilemma.</strong> One thought experiment, picked for the week's grade band. Branching scenario, discussion path, the philosophy underneath. Ready to run in a 20-minute block.
              </li>
              <li style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <strong style={{ color: C.textPrimary }}>Try It Monday.</strong> One printable teacher kit. Warm-up, prompts, exit ticket, standards alignment. Print and hand to a class.
              </li>
              <li style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <strong style={{ color: C.textPrimary }}>Five-Minute Read.</strong> One research finding — a 2025 meta-analysis, a policy update, a new tool — distilled to what matters for the classroom.
              </li>
              <li style={{ padding: "10px 0" }}>
                <strong style={{ color: C.textPrimary }}>From the Field.</strong> A short note from a teacher, administrator, or parent who used a resource that week. Send yours — they may appear.
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: C.textPrimary,
              fontSize: "1.4rem",
              fontWeight: 600,
              marginTop: 36,
              marginBottom: 14,
            }}>The fine print</h2>
            <Expandable title="What it costs">
              Nothing. No paid tier, no upsell, no premium-only content. The work is funded by other things; this is the part that should be free.
            </Expandable>
            <Expandable title="How often it arrives">
              One issue per week, Sunday morning your local time. That's it. No drip campaigns, no follow-up sequences, no marketing emails.
            </Expandable>
            <Expandable title="What we do with your email">
              Send you the newsletter. That's the entire list. We don't sell, share, or trade subscriber addresses. Email is stored by Buttondown (a small independent newsletter platform); their privacy policy is at <a href="https://buttondown.email/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.gold }}>buttondown.email/privacy</a>.
            </Expandable>
            <Expandable title="How to unsubscribe">
              Every issue includes a one-click unsubscribe link at the bottom. No questions, no friction.
            </Expandable>
            <Expandable title="Can I read past issues?">
              Once a few weeks of issues exist, an archive will live at <code style={{ color: C.gold, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.88em" }}>buttondown.email/[username]/archive</code> — link will appear here after launch.
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ marginTop: 36, padding: "20px 24px", background: `${C.gold}06`, border: `1px solid ${C.gold}22`, borderRadius: 12 }}>
              <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                Questions or feedback? Reply to any issue — it goes straight to Matt.
              </p>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
