import { C } from "../../theme.js";
import {
  FadeIn, Expandable, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";

export default function QualityLeadership({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>For Educators · School Leadership</SectionLabel>
          <SectionTitle>Quality Leadership & Instruction</SectionTitle>
          <Subtitle>What distinguishes high-performing school leaders, and how leadership practices translate to classroom outcomes. Theoretical frameworks for leadership style, the components of quality instruction, and five reflection scenarios drawn from situations real principals face.</Subtitle>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 40 }}>

            <Divider label="Defining Quality Leadership" />

            <FadeIn delay={0.06}>
              <Expandable title="Five Attributes of Effective Educational Leaders" defaultOpen tag="Foundation">
                <BodyText>
                  Effective educational leadership is plural — no single attribute carries the work. Five recur across the research on schools that consistently improve.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { attr: "Instructional Leadership Mindset", color: C.teal, desc: "A strong moral purpose to enhance student learning. Effective instructional leaders build trust, seek evidence of impact, foster professional inquiry, and create a safe environment for educators to take risks — while still handling daily management." },
                    { attr: "Empowerment & Collaboration", color: C.gold, desc: "Successful leaders empower their team by delegating responsibilities and promoting autonomy. The result is a collaborative environment where staff feel motivated and accountable, unlocking creativity and innovation rather than compliance." },
                    { attr: "Visionary Leadership", color: C.ocean, desc: "Visionary leaders set a clear vision, communicate it effectively, and unite diverse perspectives toward it. They lead by example — demonstrating commitment to core values rather than just naming them." },
                    { attr: "Emotional Intelligence", color: C.coral, desc: "High emotional intelligence enables leaders to create supportive, empathetic environments. Strong relationships and recognition of achievement boost morale and motivation in ways structural changes cannot." },
                    { attr: "Resilience", color: C.gold, desc: "Adaptability is non-negotiable in today's education landscape. Leaders must pivot in response to new challenges without abandoning the throughline of the school's mission." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "12px 16px", margin: "8px 0",
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${row.color}`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: row.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.attr}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 6 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Theoretical Frameworks" />

            <FadeIn delay={0.06}>
              <Expandable title="Seven Leadership Styles, Mapped to Educational Contexts" color={C.teal} tag="Framework">
                <BodyText>
                  Educational leadership is not a single discipline — it draws on management theory, social psychology, and education research. Seven frameworks describe most of the productive variation in leadership style.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { style: "Servant Leadership", color: C.teal, desc: "Emphasizes the leader's commitment to serving others. Prioritizes the team's needs and creates a supportive, ethical environment. Strong fit for school cultures where teacher autonomy is high." },
                    { style: "Transactional Leadership", color: C.gold, desc: "Structured tasks and a system of rewards and consequences. Effective for short-term, well-defined objectives — but typically falls short on innovation and engagement." },
                    { style: "Instructional Leadership", color: C.ocean, desc: "Centers the principal's role in managing curriculum and instruction to improve student achievement. Sets educational goals, supervises teaching, fosters a positive learning climate. The most education-specific of the styles." },
                    { style: "Situational Leadership", color: C.coral, desc: "Effective leaders adapt their style based on context and team needs. Acknowledges that personality, career history, and organizational culture all shape what kind of leadership works in a given moment." },
                    { style: "Transformational Leadership", color: C.teal, desc: "Inspiring and motivating followers through idealized influence, inspirational motivation, intellectual stimulation, and individualized consideration. Fosters innovation and empowerment." },
                    { style: "Transformative Leadership", color: C.gold, desc: "Distinct from transformational. Focuses on addressing social injustices and promoting equity within the school system. Inclusive environments that cater to diverse student needs are the explicit goal, not a side effect." },
                    { style: "Distributed Leadership", color: C.ocean, desc: "Shared leadership responsibilities across the school community — teachers, staff, sometimes students and families. Recognizes that leadership is collective and leverages multiple strengths to achieve school goals." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", margin: "6px 0",
                      background: `${row.color}08`, border: `1px solid ${row.color}25`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: row.color, fontSize: "0.92rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.style}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginTop: 4 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 8 }}>
                  Most effective leaders blend two or three of these. The discipline isn't picking one — it's knowing which one a given situation calls for.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Instructional Leadership in Practice" />

            <FadeIn delay={0.06}>
              <Expandable title="The Principal as Instructional Leader" color={C.gold} tag="Practice">
                <BodyText>
                  Of all the leadership styles, instructional leadership has the most direct line to student outcomes — but only when it's practiced as more than classroom observation.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Principal's Role" color={C.teal} items={[
                    "Direct influence on teaching and learning",
                    "Set high academic standards",
                    "Support educators with time and resources",
                  ]} />
                  <ComparisonCard title="Data-Driven Decisions" color={C.gold} items={[
                    "Use student performance metrics",
                    "Guide instructional improvements",
                    "Inform resource allocation",
                  ]} />
                  <ComparisonCard title="Support Systems" color={C.ocean} items={[
                    "Balance data with teacher support",
                    "Coaching and feedback loops",
                    "Celebrate gains, not just identify gaps",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  The failure mode: data-driven without support becomes surveillance. Support without data becomes feel-good. Both together create the conditions where teachers actually grow.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="School Culture & Well-being" />

            <FadeIn delay={0.06}>
              <Expandable title="Building a Positive School Culture" color={C.ocean} tag="Culture">
                <BodyText>
                  School culture is the air everyone in the building breathes. Three culture moves and three well-being moves — both stacks matter.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12, marginBottom: 8 }}>
                  <strong>Culture moves:</strong>
                </p>
                <ul style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li><strong>Collaborative environment.</strong> Regular communication and team-building foster productive relationships among teachers, staff, and students. Isolation breeds cynicism; collaboration breeds trust.</li>
                  <li><strong>Equity and inclusion.</strong> Diversity and inclusive policies create a safe environment for all community members. The work is structural, not just rhetorical.</li>
                  <li><strong>Implementation.</strong> Address challenges respectfully while maintaining focus on equity-focused policies. The hardest cultural work is staying on course when the practice gets uncomfortable.</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 14, marginBottom: 8 }}>
                  <strong>Well-being moves:</strong>
                </p>
                <ul style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li><strong>Principal well-being.</strong> Leaders who model self-care and work-life balance license their staff to do the same. The opposite is also true.</li>
                  <li><strong>Staff support.</strong> Wellness programs, recognition, and environments where teachers feel valued are not extras. They are the precondition for retention.</li>
                  <li><strong>Mental health resources.</strong> Provide resources and visible support — for staff and students alike. Burnout cultures don't produce sustained academic gains.</li>
                </ul>
              </Expandable>
            </FadeIn>

            <Divider label="Quality Instruction" />

            <FadeIn delay={0.06}>
              <Expandable title="The Three Pillars of Quality Instruction" color={C.teal} tag="Pillars">
                <BodyText>
                  Quality instruction rests on three interlocking pillars. Each is necessary; none is sufficient on its own.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { pillar: "Content Knowledge", color: C.teal, desc: "Educators need an in-depth understanding of the subject matter and educational standards. Without it, instruction defaults to procedure — students learn to follow steps rather than reason about content." },
                    { pillar: "Pedagogical Skills", color: C.gold, desc: "Effective teaching methods — targeted direct instruction, scaffolding, differentiated approaches — create inclusive environments that promote active participation and critical thinking." },
                    { pillar: "Instructional Strategies", color: C.ocean, desc: "Strategies that foster metacognition and monitor student learning improve outcomes and develop the study skills and self-regulation students need to learn independently." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "12px 16px", margin: "8px 0",
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${row.color}`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: row.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.pillar}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 6 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 8 }}>
                  Curriculum design, assessment practices, and equitable access are the structural complement: <em>what</em> gets taught, <em>how</em> it's measured, and <em>who</em> can actually access it. All three pillars work better when these alignments are in place.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Change & Communication" />

            <FadeIn delay={0.06}>
              <Expandable title="Change Management and Communication Discipline" color={C.coral} tag="Operations">
                <BodyText>
                  Most school improvement initiatives fail not because the idea was wrong, but because the change management was. Two stacks matter — change and communication — and they reinforce each other.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12, marginBottom: 8 }}>
                  <strong>Change management:</strong>
                </p>
                <ol style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <li><strong>Lead change.</strong> Proactive management of curriculum updates, policy shifts, and technology integration — rather than reactive firefighting.</li>
                  <li><strong>Create vision.</strong> Set clear goals and communicate purpose to stakeholders. People accept change they understand the reason for.</li>
                  <li><strong>Manage resistance.</strong> Address concerns and provide support to foster adaptability. Resistance is data — listen to it before overriding it.</li>
                </ol>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 14, marginBottom: 8 }}>
                  <strong>Effective communication:</strong>
                </p>
                <ol style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <li><strong>Clear messaging.</strong> Transparent communication sets expectations and builds trust. Ambiguity breeds anxiety.</li>
                  <li><strong>Feedback systems.</strong> Structured feedback through performance reviews and check-ins — bidirectional, not just downward.</li>
                  <li><strong>Open dialogue.</strong> Respectful communication channels for all stakeholders — staff, families, students. Voice matters.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="Five Leadership Scenarios" />

            <FadeIn delay={0.06}>
              <Expandable title="Thought Experiments for Leadership Reflection" color={C.gold} tag="Practice">
                <BodyText>
                  Five scenarios drawn from real situations educational leaders face. Each is deliberately under-resolved — there is no single correct answer. Use them in PD sessions or aspiring-leader cohorts to surface the leadership style each participant defaults to under pressure.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { who: "Alex (Veteran Teacher Frustration)", color: C.coral,
                      scenario: "Alex feels new initiatives are constantly being added without taking older responsibilities away. Frustration is showing in team meetings. School leader Jamie needs to address Alex's concerns while still moving change forward.",
                      questions: "What leadership style fits this situation? How should Jamie balance stability and adaptability without dismissing either?" },
                    { who: "Chris (New Teacher Drowning)", color: C.gold,
                      scenario: "Chris, a new teacher, is struggling with grading and lesson planning. Chris's mentor is also overloaded. School leader Jordan notices Chris staying late and stressed.",
                      questions: "How can Jordan support Chris without overburdening the mentor? What proactive systems would prevent this pattern from repeating?" },
                    { who: "Pat (Cross-Department Innovation)", color: C.teal,
                      scenario: "Pat, a science teacher, proposes an interdisciplinary project requiring cross-department collaboration. Some teachers are enthusiastic; others cite time and curriculum-alignment concerns. School leader Taylor must decide whether to implement and how to address the resistance.",
                      questions: "How does Taylor balance innovation with respect for teachers' time and constraints? What strategies might gain buy-in from resistant staff without overriding their concerns?" },
                    { who: "Casey (Persistent Performance Gap)", color: C.ocean,
                      scenario: "Casey, an assistant principal, has noticed certain student groups consistently underperforming in math. Tutoring hasn't closed the gap. Casey suggests a more personalized approach but worries about teacher workload. Principal Morgan must weigh student needs against staff capacity.",
                      questions: "How does Morgan approach this without creating a false choice between students and staff? How might teachers be involved in the decision-making process rather than handed the workload?" },
                    { who: "Dana (Tech Resistance)", color: C.coral,
                      scenario: "Dana, an experienced teacher, resists a new digital learning platform from the district. Dana prefers traditional methods and is vocal about it. School leader Riley must support Dana's transition while still moving the platform forward.",
                      questions: "What approach addresses Dana's resistance respectfully? How does Riley provide concrete support to teachers hesitant about new technologies — beyond a one-day training?" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${item.color}`, borderRadius: 10,
                      padding: "14px 18px", marginBottom: 10,
                    }}>
                      <strong style={{ color: item.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>Scenario: {item.who}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 6 }}>{item.scenario}</p>
                      <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65, marginTop: 8, fontStyle: "italic" }}><strong>For discussion:</strong> {item.questions}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Future Directions" />

            <FadeIn delay={0.06}>
              <Expandable title="Where Educational Leadership Is Heading" color={C.ocean} tag="Horizon">
                <BodyText>
                  Three trends will define the next phase of educational leadership work — and each is already visible in schools that are improving fastest.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Embracing Technology" color={C.teal} items={[
                    "AI, VR/AR, and digital tools",
                    "More engaging and personalized experiences",
                    "Risk: technology adoption without pedagogy",
                  ]} />
                  <ComparisonCard title="Collaborative Approaches" color={C.gold} items={[
                    "Educators, administrators, community",
                    "Identify and address challenges together",
                    "Drive continuous improvement at scale",
                  ]} />
                  <ComparisonCard title="Adaptability & Resilience" color={C.coral} items={[
                    "Pivot quickly to new challenges",
                    "Build a growth mindset across the team",
                    "Sustain mission through change",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  Action planning closes the loop: group reflection on what was learned, Q&A to address specific concerns, and concrete steps for implementation. A leadership PD session that ends without an action plan ends without effect.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                { id: "high-performing-schools", icon: "📈", title: "High-Performing K-12 Schools", desc: "What distinguishes consistently excellent schools", color: C.teal },
                { id: "rti", icon: "🔄", title: "Response to Intervention (RTI)", desc: "Tiered intervention for struggling students", color: C.coral },
                { id: "for-educators", icon: "📋", title: "For Educators", desc: "All professional development resources", color: C.ocean },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
