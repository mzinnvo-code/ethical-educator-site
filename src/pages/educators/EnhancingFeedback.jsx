import { C } from "../../theme.js";
import {
  FadeIn, Expandable, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";

export default function EnhancingFeedback({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>For Educators · Teaching & Feedback</SectionLabel>
          <SectionTitle>Enhancing Academic Feedback</SectionTitle>
          <Subtitle>An advanced complement to the foundational feedback page. Performance levels, multimodal delivery, assessment integrity, and the personal action plan that takes feedback from "best effort" to genuinely effective.</Subtitle>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 40 }}>

            <Divider label="Why It Matters" />

            <FadeIn delay={0.06}>
              <Expandable title="What High-Quality Feedback Actually Does" defaultOpen tag="Foundation">
                <BodyText>
                  Two functions distinguish high-quality feedback from feedback-as-grading-justification. The first is internal: high-quality feedback boosts content mastery and fosters self-regulation — students learn to monitor their own work. The second is positional: high-quality feedback bridges the gap between current performance and future learning goals.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  Comments that name a deficiency without bridging the gap leave students stuck. Comments that name the gap and provide a route across it move students forward. The difference is often a single sentence — but it's the sentence that determines whether the feedback was useful or merely received.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="The Four-Pillar Feedback Framework" />

            <FadeIn delay={0.06}>
              <Expandable title="The Four Pillars of Effective Feedback" color={C.teal} tag="Framework">
                <BodyText>
                  Effective feedback rests on four pillars. Weakness in any one undermines the others.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Personalized Feedback" color={C.teal} items={[
                    "Tailored to the individual student",
                    "Includes specific details from their work",
                    "Multimedia elements where appropriate",
                  ]} />
                  <ComparisonCard title="Instructional Growth" color={C.gold} items={[
                    "Provides actionable next steps",
                    "Links to relevant resources",
                    "Encourages improvement, not just compliance",
                  ]} />
                  <ComparisonCard title="Feedback Standards" color={C.ocean} items={[
                    "Uses varied formats (written, audio, video)",
                    "Communicates at the right register",
                    "Accessible to every student",
                  ]} />
                  <ComparisonCard title="Assessment Integrity" color={C.coral} items={[
                    "Scores accurately reflect submitted work",
                    "Feedback aligns with the rubric",
                    "Transparent about how grades are derived",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  These pillars are interdependent. Personalized feedback without actionable next steps leaves students moved but not improving. Multimedia delivery without scoring integrity feels engaging but trains students to discount the substance. The framework only works as a unit.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Performance Levels" />

            <FadeIn delay={0.06}>
              <Expandable title="From Partially Performing to Excelling — A Self-Assessment Tool" color={C.gold} tag="Rubric">
                <BodyText>
                  Most teachers self-rate their feedback practice as "performing." A more honest look — using the same three-level rubric we ask students to internalize — usually reveals room to grow.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { level: "Partially Performing", color: C.coral,
                      desc: "Feedback exists, but it's inconsistent or lacks depth. Comments may be terse, generic ('good job,' 'try harder'), or focused on surface features (mechanics, formatting) rather than the criteria that actually drove the grade. Students cannot reliably reconstruct why they earned the score they did." },
                    { level: "Performing", color: C.gold,
                      desc: "Feedback meets objectives in a clear and consistent manner. Comments address the rubric, are specific to the student's work, and indicate at least one direction for improvement. The standard a competent professional should hit on every assignment, every time." },
                    { level: "Excelling", color: C.teal,
                      desc: "Feedback is exemplary — highly personalized, actionable, and delivered in formats that fit the student. Multimedia elements (audio comments, brief screencasts) are used where they add value. Students reference the feedback in their next submission. Other teachers ask to see it." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: "12px 16px", margin: "8px 0",
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${item.color}`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: item.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{item.level}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 6 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  The path from performing to excelling is rarely about working harder. It's about working differently — using formats students actually open, naming criteria explicitly, and treating each feedback cycle as a teaching moment rather than a documentation requirement.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Personalization in Depth" />

            <FadeIn delay={0.06}>
              <Expandable title="Three Practices That Make Feedback Personal" color={C.teal} tag="Practice">
                <BodyText>
                  "Personalized" is one of the most-claimed and least-delivered words in education. Three concrete practices distinguish actually-personalized feedback from form-letter feedback with the student's name dropped in.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 12 }}><strong>Focus on the individual.</strong> Address the student's work directly, with specific examples drawn from this submission. "Your thesis in paragraph 2 promises X but paragraphs 4–5 argue Y" beats "your argument is unclear" every time.</li>
                  <li style={{ marginBottom: 12 }}><strong>Move beyond generic praise.</strong> "Good job" is the cousin of no feedback at all — it tells the student you read it, but not what was good or why. Detailed comments that identify the specific moves a student made well give them something to repeat.</li>
                  <li><strong>Incorporate multimedia where it adds value.</strong> A 90-second audio comment can carry tone, emphasis, and warmth that text can't. A brief screencast walking through a paragraph can show the editing thinking that a margin note can only describe.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="Multimodal Delivery & Accessibility" />

            <FadeIn delay={0.06}>
              <Expandable title="Meeting Feedback Standards Across Formats" color={C.ocean} tag="Standards">
                <BodyText>
                  Different feedback fits different formats. The teachers whose feedback students actually use are usually the ones who match the format to the message.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Written" color={C.teal} items={[
                    "Best for line-level edits and citations",
                    "Searchable; students can return to it",
                    "Risk: tone gets misread without voice",
                  ]} />
                  <ComparisonCard title="Audio" color={C.gold} items={[
                    "Best for substantive global comments",
                    "Carries warmth and emphasis",
                    "Faster to record than to type",
                  ]} />
                  <ComparisonCard title="Video / Screencast" color={C.ocean} items={[
                    "Best for showing a process",
                    "Walks through revision in real time",
                    "Highest cost; reserve for high-leverage cases",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 8 }}>
                  Whatever the format, accessibility is non-negotiable. Audio without a transcript fails students with hearing differences. Video without captions fails the same students plus anyone in a noisy environment. The rule of thumb: every audio or video comment should be paired with a written summary, even a brief one.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Assessment Integrity" />

            <FadeIn delay={0.06}>
              <Expandable title="Scoring, Balance, and Transparency" color={C.coral} tag="Integrity">
                <BodyText>
                  Feedback and grades are a single instrument. When they don't align, students stop trusting both.
                </BodyText>
                <ul style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Align scores with feedback.</strong> If the rubric weights argument 40% and mechanics 10%, the bulk of the comments should be about argument. A grade dragged down by mechanics with comments only about argument is incoherent — it teaches students that you grade one thing and tell them about another.</li>
                  <li style={{ marginBottom: 10 }}><strong>Balance positive and corrective feedback.</strong> Both are needed. Pure praise misses what to fix; pure correction misses what to repeat. The teachers who get the most uptake usually lead with what's working before naming what isn't.</li>
                  <li><strong>Maintain transparency.</strong> Show the math. If a paper lost six points, students should be able to see — from the rubric, the comments, or both — exactly which six points and why. Opaque scoring breeds appeals; transparent scoring closes the conversation.</li>
                </ul>
              </Expandable>
            </FadeIn>

            <Divider label="Action Feedback & Reflection" />

            <FadeIn delay={0.06}>
              <Expandable title="The 5Rs and the 4C Model — Quick Reference" color={C.gold} tag="Tool">
                <BodyText>
                  Both frameworks are covered in depth on the foundational <a onClick={(e) => { e.preventDefault(); navigate("teaching-feedback"); }} href="/teaching-feedback" style={{ color: C.gold, cursor: "pointer" }}>Effective Academic Feedback page</a>. Quick reminder of the structure:
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, margin: "16px 0" }}>
                  <div style={{ background: `${C.teal}08`, border: `1px solid ${C.teal}25`, borderRadius: 10, padding: "14px 16px" }}>
                    <h4 style={{ color: C.teal, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, marginBottom: 8 }}>The 5Rs of Action Feedback</h4>
                    <ul style={{ paddingLeft: 18, color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.7 }}>
                      <li><strong>Recall</strong> — remind students of key concepts</li>
                      <li><strong>Recognize</strong> — what was done well, what needs work</li>
                      <li><strong>Reframe</strong> — alternative perspectives or strategies</li>
                      <li><strong>Revisit</strong> — encourage reviewing previous work</li>
                      <li><strong>Reinforce</strong> — confirm progress, outline next steps</li>
                    </ul>
                  </div>
                  <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 10, padding: "14px 16px" }}>
                    <h4 style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, marginBottom: 8 }}>The 4C Reflection Model</h4>
                    <ul style={{ paddingLeft: 18, color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.7 }}>
                      <li><strong>Confirmed</strong> — what affirmed your understanding?</li>
                      <li><strong>Changed</strong> — what new insights shifted your perspective?</li>
                      <li><strong>Challenged</strong> — what forced you to rethink?</li>
                      <li><strong>Construct</strong> — how will you apply this?</li>
                    </ul>
                  </div>
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  In 1:1 conferencing, both frameworks come alive. Live formative tools — polls, digital whiteboards, shared docs — make the 5Rs and 4C visible in real time. The conference becomes a live revision rather than a debrief on a finished product.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Building Your Personal Action Plan" />

            <FadeIn delay={0.06}>
              <Expandable title="From Workshop to Practice — A Two-Step Plan" color={C.teal} tag="Action">
                <BodyText>
                  The gap between knowing what good feedback looks like and consistently producing it is closed by a structured action plan, not by goodwill.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 12 }}><strong>Reflect honestly.</strong> Identify one or two specific areas for improvement. Don't try to overhaul everything. "I will start including one piece of audio feedback per major essay" is far more likely to stick than "I will improve all my feedback."</li>
                  <li><strong>Write SMART goals.</strong> Specific, Measurable, Achievable, Relevant, Time-bound. "Within the next grading cycle, 100% of essay feedback will reference the rubric criterion that drove the grade" is testable. "I'll be more specific" is not.</li>
                </ol>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  Pair the goal with a check-in date. The single biggest predictor of whether a workshop changes practice is whether the practitioner returns to their plan after the workshop ends.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                { id: "teaching-feedback", icon: "💬", title: "Effective Academic Feedback", desc: "Foundations: the 5Rs, 4C reflection, and 1:1 conferencing", color: C.teal },
                { id: "for-educators", icon: "📋", title: "For Educators", desc: "All professional development resources", color: C.ocean },
                { id: "ai-education", icon: "🤖", title: "AI in Education", desc: "How AI tools intersect with feedback practice", color: C.gold },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
