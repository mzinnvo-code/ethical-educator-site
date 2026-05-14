import { C } from "../../theme.js";
import {
  FadeIn, Expandable, EducatorHero,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";
import EducatorResourceNav from "../../components/EducatorResourceNav.jsx";
import { EDUCATOR_RESOURCES, educatorLink } from "../../data/educatorResources.js";

export default function EnhancingEngagement({ navigate }) {
  const resource = EDUCATOR_RESOURCES["enhancing-engagement"];
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

            <Divider label="What Engagement Actually Is" />

            <FadeIn delay={0.06}>
              <Expandable title="Beyond Attendance: A Definition That Does Work" defaultOpen tag="Foundation">
                <BodyText>
                  "Engagement" is one of the most overused words in education — usually as a substitute for "attendance" or "looks busy." Neither captures it. Real engagement is a deep psychological investment in learning. It involves thinking, not just sitting; caring, not just complying.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  Three reasons it matters operationally:
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 8, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li><strong>Improved learning.</strong> Engaged students show better comprehension, retention, and application of knowledge.</li>
                  <li><strong>Increased persistence.</strong> Engaged students push through difficulty rather than disengaging at the first obstacle.</li>
                  <li><strong>Positive climate.</strong> Engaged classrooms are easier to teach in. The work is mutually reinforcing.</li>
                </ul>
              </Expandable>
            </FadeIn>

            <Divider label="The Three Dimensions" />

            <FadeIn delay={0.06}>
              <Expandable title="Behavioral, Cognitive, and Emotional — The Engagement Triangle" color={C.teal} tag="Framework">
                <BodyText>
                  Engagement is multidimensional. A student can be behaviorally engaged (turning work in, raising hands) but cognitively disengaged (going through the motions). Another can be emotionally engaged (loves the class) but behaviorally inconsistent. The teachers who move all three at once get the most durable results.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Behavioral" color={C.teal} items={[
                    "Active participation",
                    "Task completion and consistent effort",
                    "Visible from outside; the easiest to measure",
                  ]} />
                  <ComparisonCard title="Cognitive" color={C.gold} items={[
                    "Deep thinking and critical analysis",
                    "Self-directed learning",
                    "Hardest to see; usually inferred from work product",
                  ]} />
                  <ComparisonCard title="Emotional" color={C.coral} items={[
                    "Enthusiasm and curiosity",
                    "Sense of belonging in the classroom",
                    "Drives the other two but rarely measured directly",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  Designing a lesson that activates all three dimensions is not about doing three separate things — it's about designing tasks that are inherently interesting (emotional), genuinely demanding (cognitive), and built around active student moves (behavioral).
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="The 4Cs Model" />

            <FadeIn delay={0.06}>
              <Expandable title="Clarity, Connection, Challenge, Control" color={C.gold} tag="Model">
                <BodyText>
                  When engagement falters, one of four conditions is usually missing. The 4Cs model gives you a fast diagnostic.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Clarity" color={C.teal} items={[
                    "Clear expectations",
                    "Visible learning objectives",
                    "Students know what success looks like",
                  ]} />
                  <ComparisonCard title="Connection" color={C.gold} items={[
                    "Relevant content",
                    "Real-world applications",
                    "Students see why this matters to them",
                  ]} />
                  <ComparisonCard title="Challenge" color={C.ocean} items={[
                    "Appropriate level of difficulty",
                    "Productive struggle, not frustration",
                    "Opportunities for growth",
                  ]} />
                  <ComparisonCard title="Control" color={C.coral} items={[
                    "Student choice and agency",
                    "Voice in how learning happens",
                    "Authorship of the work",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  When a student says "I don't get this" — that's a Clarity failure. "When am I ever going to use this?" — Connection. "This is too easy / too hard" — Challenge. "I don't care" — usually Control. Naming the missing C tells you what to fix.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Active Learning Strategies" />

            <FadeIn delay={0.06}>
              <Expandable title="Three Active Learning Patterns That Always Work" color={C.teal} tag="Practice">
                <BodyText>
                  The shift from passive to active learning is the highest-leverage move available to most teachers. Three patterns are robust enough to use almost anywhere:
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 12 }}><strong>Think-Pair-Share.</strong> Individual reflection, then paired discussion, then whole-class share. The structure forces every student to commit to a thought before hearing what others said. The shy student gets to test their thinking with one person before going public.</li>
                  <li style={{ marginBottom: 12 }}><strong>Group discussions with structured roles.</strong> Not just "talk among yourselves" — assigned roles (questioner, summarizer, devil's advocate, recorder) so the discussion has shape and every student has a job. Without roles, group work collapses into the most-talkative student's monologue.</li>
                  <li><strong>Problem-based learning.</strong> Real-world scenarios where students apply knowledge to develop a solution collaboratively. The problem comes first; the content emerges as students discover what they need to know.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="Motivation" />

            <FadeIn delay={0.06}>
              <Expandable title="Five Levers for Student Motivation" color={C.ocean} tag="Framework">
                <BodyText>
                  Motivation isn't a single thing. Five distinct levers drive whether a student leans in or checks out:
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { lever: "Intrinsic", color: C.teal, desc: "Motivation from internal factors — curiosity, the desire to learn, the satisfaction of mastery. The most durable form. Hardest to manufacture, but the easiest to suffocate with over-control." },
                    { lever: "Extrinsic", color: C.gold, desc: "Motivation from external rewards or consequences — grades, praise, points. Useful in the short term, but over-reliance can crowd out intrinsic motivation. Use as a scaffold, not a substitute." },
                    { lever: "Autonomy", color: C.ocean, desc: "Students feel in control of their learning and have meaningful choices in how they learn. Autonomy is intrinsic motivation's most reliable on-ramp." },
                    { lever: "Relevance", color: C.coral, desc: "Students see the value of what they're learning and how it applies to their lives. The 'when will I ever use this?' question, answered before it gets asked." },
                    { lever: "Feedback", color: C.gold, desc: "Structured feedback provides guidance, support, and encouragement. Without feedback, motivation withers — students stop investing when they can't tell if their effort is paying off." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", margin: "8px 0",
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${item.color}`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: item.color, fontSize: "0.92rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{item.lever}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65, marginTop: 4 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Innovative Approaches" />

            <FadeIn delay={0.06}>
              <Expandable title="Gamification, Team-Based Learning, and Digital Tools" color={C.gold} tag="Innovation">
                <BodyText>
                  Three approaches show up repeatedly in research on engagement gains. Each has a sweet spot and a failure mode.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Gamification" color={C.teal} items={[
                    "Game mechanics — points, levels, challenges",
                    "Best for short-term motivation boosts",
                    "Failure mode: replaces intrinsic motivation with chasing badges",
                  ]} />
                  <ComparisonCard title="Team-Based Learning" color={C.gold} items={[
                    "Sustained collaboration with individual accountability",
                    "Best when teams persist over a unit",
                    "Failure mode: free riders without accountability mechanisms",
                  ]} />
                  <ComparisonCard title="Digital Tools" color={C.ocean} items={[
                    "Audience response systems, online platforms",
                    "Best for instant formative checks",
                    "Failure mode: novelty wears off; tools without pedagogy add noise",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  None of these are silver bullets. They work when the underlying lesson design is sound, and they fail when teachers reach for them as a substitute for sound design.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Practical Implementation" />

            <FadeIn delay={0.06}>
              <Expandable title="A Four-Layer Implementation Plan" color={C.coral} tag="Action">
                <BodyText>
                  A practical engagement plan stacks four layers — each one supporting the next.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Interactive activities.</strong> Short, focused activities to break up lectures. The 10–15 minute lecture chunk before activity is the rough rule of thumb.</li>
                  <li style={{ marginBottom: 10 }}><strong>Group work and peer feedback.</strong> Collaborative tasks structured so peer feedback becomes a teaching mechanism, not just a worksheet.</li>
                  <li style={{ marginBottom: 10 }}><strong>Clear goals and timely feedback.</strong> Students engage with tasks they understand the purpose of and disengage from tasks that feel arbitrary.</li>
                  <li><strong>Digital resources.</strong> Online platforms that extend learning beyond class — but only when the digital component connects clearly to the in-class work, not as a parallel track.</li>
                </ol>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  The recap is short: engagement is multifaceted, active learning is non-negotiable, motivation is plural (autonomy + relevance + feedback), and the tactics are simple — interactive activities, structured group work, clear goals.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                educatorLink("async-engagement", { desc: "Engagement strategies for online and async contexts" }),
                educatorLink("av-resources", { desc: "Audio/video tools that support engagement" }),
                educatorLink("for-educators", { desc: "All professional development resources" }),
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
