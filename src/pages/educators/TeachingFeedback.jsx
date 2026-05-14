import { useState } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, Expandable, EducatorHero,
  Narrow, PageContainer, BodyText, ResearchCallout, QuoteBlock, StatCounter,
  ComparisonCard, Divider, ContinueExploring
} from "../../components/shared.jsx";
import EducatorResourceNav from "../../components/EducatorResourceNav.jsx";
import { EDUCATOR_RESOURCES, educatorLink } from "../../data/educatorResources.js";

/* ─── 4C Reflection Interactive ─── */
function FourCReflection() {
  const [active, setActive] = useState(null);
  const quadrants = [
    { key: "confirmed", label: "Confirmed", color: C.teal, num: "1",
      prompt: "What confirmed your existing thinking about academic feedback? Which practices you already use were validated today?" },
    { key: "changed", label: "Changed", color: C.gold, num: "2",
      prompt: "What shifted in your understanding? Did any strategy challenge an assumption you held about how feedback works?" },
    { key: "challenged", label: "Challenged", color: C.coral, num: "3",
      prompt: "What made you uncomfortable or uncertain? Where do you feel tension between what you currently do and what effective feedback requires?" },
    { key: "construct", label: "Construct", color: C.ocean, num: "4",
      prompt: "How will you build more intentional feedback practices — in both written assignments and live sessions? What is one concrete change you will make this week?" },
  ];

  return (
    <div style={{ margin: "16px 0" }}>
      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 14 }}>
        The 4C model is a structured reflection tool. Tap each quadrant to see the guiding question, then use it to process what you've read here and plan your next steps.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {quadrants.map(q => (
          <div key={q.key}
            onClick={() => setActive(active === q.key ? null : q.key)}
            style={{
              background: active === q.key ? `${q.color}10` : C.surface,
              border: `1px solid ${active === q.key ? q.color + "40" : C.border}`,
              borderRadius: 12, padding: "16px 18px", cursor: "pointer",
              transition: "all 0.3s", minHeight: 100,
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{
                width: 24, height: 24, borderRadius: "50%",
                background: `${q.color}20`, color: q.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700,
              }}>{q.num}</span>
              <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: q.color, fontWeight: 600, fontSize: "0.95rem" }}>{q.label}</span>
            </div>
            {active === q.key
              ? <p style={{ color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.6 }}>{q.prompt}</p>
              : <p style={{ color: C.textMuted, fontSize: "0.78rem" }}>tap to reflect ›</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeachingFeedback({ navigate }) {
  const resource = EDUCATOR_RESOURCES["teaching-feedback"];
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <EducatorHero
          label={resource.sectionLabel}
          title={resource.title}
          subtitle={resource.desc}
          image={resource.image}
          imageAlt={resource.imageAlt}
          accent={resource.accent}
        />
        <EducatorResourceNav currentId={resource.id} navigate={navigate} />

        <Narrow>
          <div style={{ marginTop: 40 }}>

            <Divider label="What the Standard Expects" />

            <FadeIn delay={0.06}>
              <Expandable title="A Standard of Excellence for Academic Feedback" defaultOpen tag="Foundation">
                <p>Across contemporary teacher evaluation rubrics, the same picture of accomplished feedback recurs: an accomplished teacher provides <strong>personalized growth feedback</strong> to each student and points to <strong>specific academic supports</strong> found in the course. That standard has four dimensions:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Personalized Growth" color={C.teal} items={[
                    "Tailored to the individual student",
                    "References specific details from their work",
                    "Addresses the student by name",
                  ]} />
                  <ComparisonCard title="Specific Supports" color={C.gold} items={[
                    "Points to resources in the course",
                    "Links to sample essays, mini-lessons, or tutorials",
                    "Connects critique to further learning opportunities",
                  ]} />
                  <ComparisonCard title="Balanced Approach" color={C.ocean} items={[
                    "Includes positives — what was right, interesting, well-done",
                    "Includes constructive critique — what was wrong, missing, or incomplete",
                    "Neither all praise nor all correction",
                  ]} />
                  <ComparisonCard title="Detailed Comments" color={C.coral} items={[
                    "Shows thorough reading of student work",
                    "Comments are specific, not generic",
                    "Highlights a particular skill to focus on next",
                  ]} />
                </div>
                <p>The gap between "Good job!" and a genuinely useful comment is the difference between performing and excelling on this rubric. A comment that says "Your thesis is clear, but your second body paragraph relies on summary rather than analysis — review the analytical writing mini-lesson in Module 3" is doing all four things at once: it's personalized, specific, balanced, and detailed.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Making Feedback Personal" />

            <FadeIn delay={0.06}>
              <Expandable title="Personalized Feedback — Beyond 'Good Job'" color={C.teal} tag="Strategy">
                <p>Personalized feedback starts with the basics — addressing the student by name and referencing specific details from their work — but the real leverage comes from going beyond generic praise to provide comments that only apply to <em>this</em> student's <em>this</em> submission.</p>
                <p style={{ marginTop: 12 }}><strong>What this looks like in practice:</strong></p>
                <ul style={{ marginTop: 8, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.75 }}>
                  <li>Instead of "Nice work on the essay," try: "Maya, your use of the primary source in paragraph two was exactly the kind of evidence-based argument we're building toward. For your next essay, focus on connecting that evidence back to your thesis — the link is implied but not stated."</li>
                  <li>Instead of "Needs improvement," try: "Jordan, I can see you understand the concept of supply and demand from your diagram, but the written explanation doesn't yet match that understanding. Try explaining it as if you were teaching a younger student."</li>
                </ul>
                <p style={{ marginTop: 12 }}><strong>Multimedia feedback:</strong> Consider incorporating audio snippets or short video comments for assignments where tone and nuance matter. A 60-second audio comment can communicate warmth and specificity that's difficult to achieve in text alone. Tools like ScreenPal or Loom make this practical at scale.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Instructional Growth Feedback — Telling Them How to Fix It" color={C.gold} tag="Strategy">
                <p>Identifying what's wrong is only half the job. Instructional growth feedback closes the loop by explaining <em>how to improve</em> and connecting the student to specific resources that can help.</p>
                <p style={{ marginTop: 12 }}>This has three components:</p>
                <div style={{ margin: "14px 0" }}>
                  {[
                    { label: "Provide Actionable Advice", color: C.teal,
                      desc: "Explain not only what is wrong, but how to fix it. Instead of 'Your grammar needs work,' specify: 'You're consistently confusing there/their/they're — review the grammar checkpoint in Unit 2 and resubmit paragraph three.'" },
                    { label: "Link to Specific Resources", color: C.gold,
                      desc: "Connect your feedback to sample essays, mini-lessons, or video tutorials that illustrate how to improve. The student should never leave your feedback wondering 'okay, but what do I do now?'" },
                    { label: "Guide Toward Mastery", color: C.ocean,
                      desc: "Use feedback as an instructional tool — not just an evaluation tool. The goal is to help the student master a specific objective or skill, not just to assign a score." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      padding: "10px 0",
                      borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                    }}>
                      <div style={{ width: 4, minHeight: 40, borderRadius: 2, background: item.color, flexShrink: 0, marginTop: 4 }} />
                      <div>
                        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "0.92rem", fontWeight: 600, marginBottom: 4 }}>{item.label}</h4>
                        <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>The shift from evaluative to instructional feedback is the single highest-leverage change most teachers can make. When feedback becomes a teaching tool, every assignment becomes a learning opportunity — not just an assessment event.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Feedback Standards & Scoring Integrity" />

            <FadeIn delay={0.06}>
              <Expandable title="Feedback Standards — Strengths, Growth Areas, and Mixed Formats" color={C.ocean} tag="Standard">
                <p>Effective feedback follows consistent standards that students can learn to expect and trust. Three standards matter most:</p>
                <p style={{ marginTop: 12 }}><strong>Include both strengths and areas for improvement.</strong> Students need to know what they're doing well (so they keep doing it) and what needs work (so they can grow). Feedback that's exclusively positive is encouraging but not instructive; feedback that's exclusively corrective is instructive but demoralizing.</p>
                <p style={{ marginTop: 12 }}><strong>Use mixed formats.</strong> Written comments, audio feedback, video walkthroughs, and rubric annotations each serve different purposes. Varying your format keeps feedback from becoming invisible — students stop reading comments when they all look the same.</p>
                <p style={{ marginTop: 12 }}><strong>Ensure clarity and accessibility.</strong> Feedback should be written at a level the student can understand. Avoid jargon. Be direct. If a student needs to read your comment three times to understand what you mean, the comment isn't doing its job.</p>
                <p style={{ marginTop: 14 }}>A useful self-check: review your last five pieces of feedback and classify each as "Partially Performing," "Performing," or "Excelling" against these standards. Where do you see patterns?</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Assessment Scoring & Integrity Monitoring" color={C.coral} tag="Trust">
                <p>Trust in feedback starts with trust in scoring. Students (and parents) disengage from feedback when they perceive scores as arbitrary or inconsistent. Building that trust requires deliberate transparency:</p>
                <ul style={{ marginTop: 10, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.75 }}>
                  <li><strong>Align comments to work.</strong> Every comment and score should be traceable to something the student actually submitted. If you deduct points, show exactly where and why.</li>
                  <li><strong>Provide detailed justification.</strong> Instead of "-5 for grammar," specify which errors, where they appear, and what the correct form would be.</li>
                  <li><strong>Use clear, consistent scoring language.</strong> Develop a vocabulary that students learn to decode — when you say "developing," they should know exactly what that means on your rubric.</li>
                  <li><strong>Document your feedback.</strong> This protects both you and the student. When a parent or administrator asks why a student received a particular score, well-documented feedback provides the answer.</li>
                </ul>
                <p style={{ marginTop: 12 }}>A reflection exercise: think about a recent assignment where you provided feedback. How would you justify every point you awarded or deducted? If you can't trace each decision to specific student work, that's a signal to add more detail to your scoring approach.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Action Feedback — The 5 R's" />

            <FadeIn delay={0.06}>
              <Expandable title="The 5 R's of Action Feedback" color={C.gold} tag="Framework" defaultOpen>
                <p>The 5 R's framework transforms feedback from a one-way evaluation into a set of actionable steps students can take. Rather than ending with a grade, feedback becomes a starting point for further learning.</p>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { r: "Redraft or Re-do", icon: "✏️", color: C.teal,
                      desc: "Encourage students to edit or improve their existing work based on your feedback. This works best when feedback is specific enough that the student knows exactly what to change. The revision process itself is where much of the learning happens." },
                    { r: "Rehearse or Repeat", icon: "🔄", color: C.gold,
                      desc: "Prompt students to practice specific skills until they achieve mastery. If a student struggles with thesis statements, the action isn't just 'fix this one' — it's 'write three more thesis statements on different topics and bring them to our next conference.'" },
                    { r: "Revisit and Respond", icon: "🔍", color: C.ocean,
                      desc: "Ask students to answer similar questions or tackle related problems to reinforce learning. This is particularly powerful in math and science, where the same concept appears in different forms. The student isn't correcting an error — they're building fluency." },
                    { r: "Re-learn and Re-test", icon: "📖", color: C.coral,
                      desc: "Guide students to review previous material and assess their understanding through a follow-up assessment. This works best when the re-test is structured differently from the original — same concepts, different format — so the student demonstrates genuine understanding rather than memorization." },
                    { r: "Research and Record", icon: "🔬", color: C.teal,
                      desc: "Encourage students to go deeper into topics and document their findings. This extends learning beyond the original assignment and builds research skills. A student who struggled with the causes of the Civil War might research one cause in depth and present findings to the class." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "0.92rem", fontWeight: 600, marginBottom: 4 }}>{item.r}</h4>
                        <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>The power of this framework is that it shifts the student's relationship with feedback from passive reception to active response. When students know that feedback always comes with a "what to do next," they begin to see evaluation as part of learning rather than the end of it.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Live Feedback — 1:1 Conferencing" />

            <FadeIn delay={0.06}>
              <Expandable title="Feedback in Live Sessions — Beyond the Written Comment" color={C.teal} tag="Practice">
                <p>Written feedback is essential but incomplete. Live sessions — whether 1:1 conferences, small group discussions, or whole-class formative assessment — create opportunities for feedback that is immediate, conversational, and adaptive.</p>
                <p style={{ marginTop: 12 }}>Four moves for effective live feedback:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="1. Use Multiple Formative Tools" color={C.teal} items={[
                    "Quick polls to check understanding",
                    "On-mic responses for verbal processing",
                    "Whiteboard problems for real-time work",
                    "Apps like Nearpod or Kahoot for engagement data",
                  ]} />
                  <ComparisonCard title="2. Explore Student Thinking" color={C.gold} items={[
                    "When a student doesn't answer correctly, ask them to explain their reasoning",
                    "The error is less important than the logic behind it",
                    "Understanding the misconception is the first step to addressing it",
                  ]} />
                  <ComparisonCard title="3. Provide Alternative Approaches" color={C.ocean} items={[
                    "Model how you would answer a similar problem",
                    "Show your thinking process, not just the answer",
                    "Demonstrate that struggle is a normal part of learning",
                  ]} />
                  <ComparisonCard title="4. Discuss Mastery & Next Steps" color={C.coral} items={[
                    "Offer specific steps toward mastery of the objective",
                    "Make the path forward concrete and achievable",
                    "End every conference with a clear action item",
                  ]} />
                </div>
                <p>The key insight: live feedback is not a miniature lecture. It's a conversation where the teacher listens first, diagnoses second, and advises third. The order matters — advice without diagnosis is guesswork.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Building Reflection into Practice" />

            <FadeIn delay={0.06}>
              <Expandable title="Including Reflection in Assignments" color={C.ocean} tag="Strategy">
                <p>Feedback works best when students actively process it. Building reflection into your assignment workflow ensures that feedback is not just delivered but received, considered, and applied.</p>
                <p style={{ marginTop: 12 }}><strong>Practical reflection methods:</strong></p>
                <ul style={{ marginTop: 8, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.75 }}>
                  <li><strong>Flipgrid or video response:</strong> Ask students to record a short video explaining how they used feedback to improve their work. The act of articulating the change reinforces the learning.</li>
                  <li><strong>Written response attached to final task:</strong> Require a brief reflection paragraph alongside the revised submission — "Here's what I changed and why."</li>
                  <li><strong>Comments in the learning platform:</strong> Use threaded comments to create a dialogue about feedback, not just a one-way delivery.</li>
                  <li><strong>Reflection question at the end of a test:</strong> After the final question, add: "Which question was most difficult for you, and what would you study differently next time?" This builds metacognitive awareness.</li>
                </ul>
                <p style={{ marginTop: 12 }}>The goal is to make reflection habitual rather than exceptional. When students routinely ask themselves "How did I use feedback to get better?", the feedback loop closes — and learning accelerates.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="The 4C Reflection Model" color={C.gold} tag="Tool">
                <p>The 4C model provides a structured framework for processing any professional learning experience — including your own engagement with this material. The four quadrants (Confirmed, Changed, Challenged, Construct) move from recognition through dissonance to action planning.</p>
                <FourCReflection />
                <p style={{ marginTop: 10 }}>This model works equally well for student reflection. After returning graded work, ask students to complete a 4C reflection: What did the feedback confirm about their understanding? What surprised them? What challenged their approach? And what will they construct differently in their next submission?</p>
              </Expandable>
            </FadeIn>

            <Divider label="Resources" />

            <FadeIn delay={0.06}>
              <Expandable title="Further Reading and Research" color={C.ocean} tag="Resources">
                <p>The strategies on this page draw from several well-established lines of research. For deeper exploration:</p>
                <div style={{ margin: "14px 0" }}>
                  {[
                    { title: "Hattie & Timperley — \"The Power of Feedback\"", color: C.teal,
                      desc: "The foundational research on feedback's impact on learning. Hattie's meta-analyses consistently rank feedback among the highest-impact teaching strategies — but only when it meets specific quality criteria. This paper defines the conditions under which feedback accelerates learning versus when it has no effect or even harms it." },
                    { title: "Edutopia — \"5 Research-Based Tips for Providing Students with Meaningful Feedback\"", color: C.gold,
                      desc: "A practitioner-friendly summary of evidence-based feedback strategies. Useful as a quick reference and for sharing with colleagues who are new to the research." },
                    { title: "Center for Educational Effectiveness — UC Davis", color: C.ocean,
                      desc: "Comprehensive resources for improving educational practices, including detailed guides on feedback, assessment, and instructional quality. Particularly useful for the standards and rubric alignment work." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: `${item.color}08`, border: `1px solid ${item.color}25`,
                      borderRadius: 12, padding: "14px 18px", marginBottom: 10,
                    }}>
                      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "0.92rem", fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                      <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <ContinueExploring navigate={navigate} links={[
                educatorLink("for-educators", { desc: "All professional development resources" }),
                { id: "ai-ethics", icon: "⚖️", title: "AI & Ethics", desc: "Ethical frameworks for education", color: C.gold },
                { id: "ai-education", icon: "🤖", title: "AI in Education", desc: "Tools and evidence", color: C.teal },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
