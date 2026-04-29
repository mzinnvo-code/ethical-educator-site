import { C } from "../../theme.js";
import {
  FadeIn, Expandable, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";

export default function AsyncEngagement({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>For Educators · Student Engagement</SectionLabel>
          <SectionTitle>Asynchronous Learning Engagement</SectionTitle>
          <Subtitle>Strategies specific to online and asynchronous contexts — where engagement requires different tools and approaches than in-person instruction. Course design, instructor facilitation, isolation, and the trends shaping the next phase of online learning.</Subtitle>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 40 }}>

            <Divider label="Start With Reflection" />

            <FadeIn delay={0.06}>
              <Expandable title="Three Questions Before You Redesign Anything" defaultOpen tag="Reflection">
                <BodyText>
                  Before adding tools or restructuring modules, three questions surface where async engagement actually breaks down:
                </BodyText>
                <ul style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Self-assessment.</strong> Are students provided frequent opportunities to self-assess their progress toward learning goals — quizzes, reflective journals, progress trackers? Or do they only get evaluated by you, after the fact?</li>
                  <li style={{ marginBottom: 10 }}><strong>Self-reflection.</strong> Are students encouraged to reflect on their learning process — challenges faced, strategies that worked, strategies that didn't? Or is reflection something that happens only at the end of a unit?</li>
                  <li><strong>Engagement expectations.</strong> Have you set clear guidelines for expected participation — discussion forum contributions, project milestones, regular check-ins? Or are students inferring norms from absence?</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  When the answer to any of these is "no" or "not really," that's where to start.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Five Key Components" />

            <FadeIn delay={0.06}>
              <Expandable title="What Drives Engagement in Async Settings" color={C.teal} tag="Framework">
                <BodyText>
                  Effective asynchronous engagement rests on five interconnected components. Strength in one cannot fully compensate for weakness in another.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { item: "Course Content Relevance", color: C.teal, desc: "Content that connects to students' interests, aspirations, and lived contexts. Async learners drift fastest when content feels arbitrary." },
                    { item: "Instructor Facilitation", color: C.gold, desc: "Consistent communication and timely feedback. The instructor's visible presence is what distinguishes a course from a self-paced video library." },
                    { item: "Flexibility in Participation", color: C.ocean, desc: "Multiple participation formats — written, recorded, live optional. Students contribute through the channel that fits their rhythm." },
                    { item: "Customizable Learning Pathways", color: C.coral, desc: "Optional branches for depth, alternative resources for different learners. Learners take ownership when the course adapts to them, not the reverse." },
                    { item: "Dimensions of Engagement", color: C.gold, desc: "Behavioral, cognitive, and emotional dimensions — all three need targeting in async settings, where emotional connection is hardest to build." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", margin: "8px 0",
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${row.color}`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: row.color, fontSize: "0.92rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.item}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65, marginTop: 4 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Course Design" />

            <FadeIn delay={0.06}>
              <Expandable title="Three Course Design Principles That Reduce Drop-Off" color={C.gold} tag="Design">
                <BodyText>
                  Most async drop-off happens not because the content is bad, but because students can't navigate it. Three design principles address that directly.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 12 }}><strong>Structured modules.</strong> Organize content into clear, manageable modules focused on relevant topics with real-world application. Students should be able to predict what's next without guessing.</li>
                  <li style={{ marginBottom: 12 }}><strong>Transparent expectations.</strong> Define course expectations, deadlines, and grading criteria up front. Show students how each assignment connects to practical scenarios — not just course objectives.</li>
                  <li><strong>Consistency in layout.</strong> Maintain a consistent layout across modules. Reduce cognitive load. Mirror professional online environments students will encounter outside school. Every minute spent figuring out "how this module is organized" is a minute not spent learning.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="Engagement Strategies" />

            <FadeIn delay={0.06}>
              <Expandable title="Five Strategies for Active Async Engagement" color={C.ocean} tag="Practice">
                <BodyText>
                  Five tactics raise async engagement reliably. They work better in combination than alone.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Interactive Elements" color={C.teal} items={[
                    "Videos, quizzes, polls, multimedia",
                    "Discussion forums with prompts",
                    "Force regular interaction with content",
                  ]} />
                  <ComparisonCard title="Peer Collaboration" color={C.gold} items={[
                    "Group projects with structured roles",
                    "Discussion forums beyond Q&A",
                    "Build community across the cohort",
                  ]} />
                  <ComparisonCard title="Timely Feedback" color={C.coral} items={[
                    "Constructive and personalized",
                    "Within 1–2 days where possible",
                    "Keeps students from drifting",
                  ]} />
                  <ComparisonCard title="Independent Research" color={C.ocean} items={[
                    "Self-paced exploration paths",
                    "Student-chosen extension projects",
                    "Cultivates intrinsic motivation",
                  ]} />
                  <ComparisonCard title="Gamification" color={C.gold} items={[
                    "Points, badges, level-ups",
                    "Use as scaffold, not substitute",
                    "Best for short-term boosts",
                  ]} />
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Challenges & Solutions" />

            <FadeIn delay={0.06}>
              <Expandable title="The Three Async Failure Modes — and How to Counter Them" color={C.coral} tag="Caution">
                <BodyText>
                  Async settings produce three predictable challenges. Each has a known counter — but only if you build it in deliberately.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { problem: "Lack of Real-Time Interaction", color: C.coral,
                      desc: "The absence of immediate feedback can lead to frustration and disengagement. Students post, hear nothing for days, and stop trying.",
                      solution: "Implement interactive elements (polls, low-stakes quizzes) and structure content into digestible micro-sessions. Build feedback loops with short cycles, even if the feedback is automated." },
                    { problem: "Feelings of Isolation", color: C.gold,
                      desc: "Students may feel disconnected from peers and instructors — and disconnection precedes disengagement.",
                      solution: "Create deliberate opportunities for collaboration. Make instructor availability visible (office hours, clear response-time commitments). Organize cohort events and clubs to build real-time community even within an async structure." },
                    { problem: "Time Management Difficulties", color: C.ocean,
                      desc: "Flexibility, paradoxically, is async's most consistent failure point. Without structure, deadlines drift and procrastination compounds.",
                      solution: "Provide structured weekly schedules and clear deadlines. Use scaffolded due dates (rough draft → peer review → final) to break large tasks into completable steps." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${item.color}`, borderRadius: 10,
                      padding: "14px 18px", marginBottom: 10,
                    }}>
                      <strong style={{ color: item.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{item.problem}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 6 }}>{item.desc}</p>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 8 }}><strong>Solution:</strong> {item.solution}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Reflection & Measurement" />

            <FadeIn delay={0.06}>
              <Expandable title="Reflective Practices and Engagement Metrics" color={C.teal} tag="Tools">
                <BodyText>
                  Async settings give you more data than in-person settings — and almost no nonverbal cues. Two practical concerns follow: how to teach reflection, and how to measure engagement when you can't see students' faces.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12, marginBottom: 8 }}>
                  <strong>Reflective practices to build into the course:</strong>
                </p>
                <ul style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <li><strong>Self-assessment.</strong> Regular opportunities for students to evaluate their own work against the rubric before submitting.</li>
                  <li><strong>Peer feedback.</strong> Structured peer review sessions develop critical thinking on both sides of the exchange.</li>
                  <li><strong>Learning journals.</strong> Digital journals that promote continuous reflection and metacognition across the course — not just a one-time end-of-unit reflection.</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 14, marginBottom: 8 }}>
                  <strong>Engagement indicators worth tracking:</strong>
                </p>
                <ul style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <li>Task completion rates</li>
                  <li>Login frequency and session duration</li>
                  <li>Participation in collaborative activities (forum posts, peer reviews)</li>
                  <li>Quality of contributions, not just quantity — measured against the same dimensions as in-person engagement (behavioral, cognitive, emotional)</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  Individual differences in engagement style mean no single metric tells the whole story. A student who lurks but absorbs is still engaged; a student who posts constantly but skims is not. Multiple indicators, read together, give a more honest picture than any one.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Where Async Is Heading" />

            <FadeIn delay={0.06}>
              <Expandable title="Four Trends Shaping the Next Phase" color={C.gold} tag="Horizon">
                <BodyText>
                  Four trends are visibly reshaping async engagement over the next three to five years.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="AI Integration" color={C.teal} items={[
                    "Personalized content recommendations",
                    "On-demand tutoring at scale",
                    "Risk: bypassing the productive struggle",
                  ]} />
                  <ComparisonCard title="Enhanced Flexibility" color={C.gold} items={[
                    "Cross-time-zone access",
                    "Modular re-entry for working learners",
                    "Lowers the cost of a missed week",
                  ]} />
                  <ComparisonCard title="Authentic Learning" color={C.ocean} items={[
                    "Real-world projects over canned exercises",
                    "Portfolio over multiple-choice",
                    "Engagement follows authenticity",
                  ]} />
                  <ComparisonCard title="Data-Driven Design" color={C.coral} items={[
                    "Analytics revise course design",
                    "Identify drop-off points and rebuild",
                    "Risk: optimizing for completion, not learning",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 8 }}>
                  Each trend has both a promise and a failure mode. The teachers who use these trends well are the ones who keep the original goal — student learning — visible underneath all the new tools.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                { id: "enhancing-engagement", icon: "🧠", title: "Enhancing Student Engagement", desc: "Foundational engagement frameworks", color: C.teal },
                { id: "av-resources", icon: "🎬", title: "AV Resources for Online Teaching", desc: "Audio/video tools for online instruction", color: C.gold },
                { id: "for-educators", icon: "📋", title: "For Educators", desc: "All professional development resources", color: C.ocean },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
