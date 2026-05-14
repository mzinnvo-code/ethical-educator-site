import { C } from "../../theme.js";
import {
  FadeIn, Expandable, EducatorHero,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";
import EducatorResourceNav from "../../components/EducatorResourceNav.jsx";
import { EDUCATOR_RESOURCES, educatorLink } from "../../data/educatorResources.js";

export default function HighPerformingSchools({ navigate }) {
  const resource = EDUCATOR_RESOURCES["high-performing-schools"];
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

            <Divider label="The Core Insight" />

            <FadeIn delay={0.06}>
              <Expandable title="Performance Is a Culture, Not a Cram" defaultOpen tag="Foundation">
                <BodyText>
                  Schools that consistently perform at the top of state assessments are rarely doing anything dramatically different in the two months before the test. They're doing different things across the entire year — and the test result is the visible artifact of work that happened nine months earlier.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  Four practices recur across high-performing K–12 schools regardless of size, demographics, or budget: data-driven decision making, rigorous instruction with embedded test prep, intensive teacher training, and an extended-learning culture grounded in student wellbeing. The four are mutually reinforcing — strength in one tends to pull the others up; weakness in one pulls the others down.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Data-Driven Decisions" />

            <FadeIn delay={0.06}>
              <Expandable title="Continuous Assessment, Personalized Response" color={C.teal} tag="Practice">
                <BodyText>
                  High-performing schools treat assessment as a steering wheel, not a report card. Data is collected often, used quickly, and acted on visibly.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Formative Assessments" color={C.teal} items={[
                    "Short-cycle assessments and benchmark tests",
                    "Monitor student progress in real time",
                    "Data informs instruction the same week",
                  ]} />
                  <ComparisonCard title="Personalized Interventions" color={C.gold} items={[
                    "Differentiate instruction based on assessment data",
                    "Targeted tutoring for students who need it",
                    "Enrichment for students ready to move on",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  The discipline isn't more testing — it's faster response. A school that benchmarks every six weeks and adjusts instruction within seven days outperforms a school that benchmarks every nine weeks and changes nothing in response.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Teacher Development" />

            <FadeIn delay={0.06}>
              <Expandable title="Intensive Training and Improvement-Focused Leadership" color={C.gold} tag="People">
                <BodyText>
                  Schools whose performance keeps climbing usually have teachers whose practice keeps climbing. That's not luck — it's structured investment.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 12 }}><strong>Intensive training.</strong> Teachers receive extensive training, often using evidence-based models like direct instruction and data-driven instruction. The investment is in the practice, not just the policy memo.</li>
                  <li><strong>Leadership focused on improvement.</strong> Principals set high expectations and actively coach teachers — using data, adjusting strategies, aligning to standards. The principal is in classrooms regularly, not just at the end-of-year evaluation conference.</li>
                </ol>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  The pattern that fails: training as a one-day workshop with no follow-up. The pattern that works: training, then coaching, then observation, then more training — a continuous loop where each round builds on the last.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Rigorous Instruction" />

            <FadeIn delay={0.06}>
              <Expandable title="Structured Teaching with Test Prep Integrated, Not Bolted On" color={C.ocean} tag="Instruction">
                <BodyText>
                  Top-performing schools don't choose between rigorous instruction and test preparation — they design instruction so the test format becomes a natural artifact of the underlying mastery.
                </BodyText>
                <ul style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Explicit teaching strategies.</strong> Structured or direct instruction models that ensure core content mastery. Not endless discovery learning — deliberate, sequenced exposure to the foundational concepts students need.</li>
                  <li><strong>Test-prep integrated into daily learning.</strong> Practice tests, timed quizzes, and review sessions are part of the regular weekly rhythm — familiarizing students with format so the test itself contains no surprises beyond the content.</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 14 }}>
                  The distinction matters. "Test prep" as a separate two-week unit treats the test as a hurdle. "Test prep" integrated daily treats the test as a check on practice that's already mastered. Students experience the second as routine, not as crisis.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Time & Culture" />

            <FadeIn delay={0.06}>
              <Expandable title="Extended Learning Time and a Culture of Excellence" color={C.coral} tag="Culture">
                <BodyText>
                  The two least-flashy practices on this list are also two of the highest-impact: extending the time available for learning, and building a culture where students arrive ready to use it.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Extended Learning Opportunities" color={C.teal} items={[
                    "Restructured day or year for additional instruction",
                    "Small-group instruction for students who need it",
                    "Targeted tutoring built into the schedule",
                  ]} />
                  <ComparisonCard title="Culture of Excellence" color={C.gold} items={[
                    "Academic rigor paired with social-emotional learning",
                    "Students mentally and physically ready to learn",
                    "Excellence as default, not as exception",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  A student in burnout doesn't benefit from more instructional time. A student well-rested, fed, and connected to their school benefits enormously. The culture of excellence is what makes extended learning time pay off — without it, more hours produce more attrition, not more achievement.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Synthesis" />

            <FadeIn delay={0.06}>
              <Expandable title="The Four Levers, Working Together" color={C.gold} tag="Summary">
                <BodyText>
                  Each of the four practices has visible impact alone. Schools at the top combine them — and the combination is more than the sum.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { lever: "Data-Driven", color: C.teal, desc: "Continuous assessment + personalized intervention. Steers the work week to week." },
                    { lever: "Rigorous Instruction", color: C.gold, desc: "Structured teaching + test-prep integration. Removes test-day surprises." },
                    { lever: "Intensive Training", color: C.ocean, desc: "Strong leadership + evidence-based PD. Improves the people doing the work." },
                    { lever: "Supportive Culture", color: C.coral, desc: "Extended learning + student wellbeing. Sustains everything else." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", margin: "6px 0",
                      background: `${row.color}08`, border: `1px solid ${row.color}25`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: row.color, fontSize: "0.92rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.lever}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginTop: 4 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 8 }}>
                  Schools that try to install all four at once usually fail. Schools that pick one, build it well, then add the next, usually succeed. The order is a leadership decision — but starting with culture and data tends to make the others easier.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                educatorLink("quality-leadership", { desc: "Leadership styles and instructional pillars" }),
                educatorLink("rti", { desc: "Tiered intervention for struggling students" }),
                educatorLink("for-educators", { desc: "All professional development resources" }),
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
