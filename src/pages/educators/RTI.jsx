import { C } from "../../theme.js";
import {
  FadeIn, Expandable, EducatorHero,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";
import EducatorResourceNav from "../../components/EducatorResourceNav.jsx";
import { EDUCATOR_RESOURCES, educatorLink } from "../../data/educatorResources.js";

export default function RTI({ navigate }) {
  const resource = EDUCATOR_RESOURCES["rti"];
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

            <Divider label="What RTI Is" />

            <FadeIn delay={0.06}>
              <Expandable title="A Multi-Tiered Approach to Early Identification and Support" defaultOpen tag="Foundation">
                <BodyText>
                  Response to Intervention (RTI) is a multi-tiered framework for identifying students who are struggling academically or behaviorally and providing increasingly intensive support before those students fall too far behind. The premise is preventive: catch the gap early, intervene with evidence-based instruction, and only escalate to special education evaluation when tiered support hasn't closed the gap.
                </BodyText>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  RTI emerged from federal special education law (IDEA 2004) as an alternative to the older "wait-to-fail" model, where students were referred to special education only after they had visibly fallen behind. RTI's design principle: support should be available before failure, not after.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="The Three Tiers" />

            <FadeIn delay={0.06}>
              <Expandable title="Tier 1, 2, and 3 — Increasing Intensity, Decreasing Numbers" color={C.teal} tag="Structure">
                <BodyText>
                  RTI's signature is its tiered structure. Each tier serves a smaller percentage of students with more intensive support.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { tier: "Tier 1 — Universal", color: C.teal,
                      pct: "≈ 80% of students",
                      desc: "Universal screening and high-quality core instruction delivered to all students in the general classroom. Evidence-based curriculum, differentiated as needed, with periodic universal screening (typically 3× per year) to catch students who aren't responding to core instruction." },
                    { tier: "Tier 2 — Targeted", color: C.gold,
                      pct: "≈ 15% of students",
                      desc: "Targeted small-group interventions for students whose universal screening flags concern. Typically 20–30 minutes, 3–5 times per week, in addition to core instruction. Progress monitored every 1–2 weeks. Most students respond to Tier 2 and return to Tier 1 as their primary support." },
                    { tier: "Tier 3 — Intensive", color: C.coral,
                      pct: "≈ 5% of students",
                      desc: "Intensive, individualized intervention for students who haven't responded to Tier 2. Smaller groups (often 1:1 or 1:3), more time, higher-frequency progress monitoring, and a more specialist-led delivery. If a student doesn't respond at Tier 3, the data informs a special education referral — this time with a documented track record of intervention and response." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${row.color}`, borderRadius: 10,
                      padding: "14px 18px", marginBottom: 10,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                        <strong style={{ color: row.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.tier}</strong>
                        <span style={{ color: C.textMuted, fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.pct}</span>
                      </div>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 8 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  The percentages are rough national benchmarks, not targets. A school with 30% of students at Tier 2 has a Tier 1 problem — its core instruction isn't working for enough students. Inverting the pyramid is itself a diagnostic.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Key Components" />

            <FadeIn delay={0.06}>
              <Expandable title="The Four Operating Components of RTI" color={C.gold} tag="Components">
                <BodyText>
                  Stripped to its essentials, RTI consists of four operating components. Skip any one and the framework breaks.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Universal Screening" color={C.teal} items={[
                    "All students screened periodically",
                    "Catches the gap before failure shows on a report card",
                    "Brief, low-stakes, high-frequency",
                  ]} />
                  <ComparisonCard title="Progress Monitoring" color={C.gold} items={[
                    "Frequent measurement at Tier 2 and Tier 3",
                    "Tracks whether the intervention is working",
                    "Drives the decision to continue, intensify, or step down",
                  ]} />
                  <ComparisonCard title="Evidence-Based Interventions" color={C.ocean} items={[
                    "Tier 2 and Tier 3 use research-validated approaches",
                    "Not whatever the team has on hand",
                    "Match intervention to student need",
                  ]} />
                  <ComparisonCard title="Data-Based Decisions" color={C.coral} items={[
                    "Move students between tiers based on data",
                    "Refer to special education with documentation",
                    "Avoid bias by anchoring decisions in evidence",
                  ]} />
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="What RTI Achieves" />

            <FadeIn delay={0.06}>
              <Expandable title="Four Benefits of RTI Done Well" color={C.teal} tag="Outcomes">
                <BodyText>
                  When RTI is implemented with fidelity, four benefits show up consistently in the research and in well-run schools.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Early identification.</strong> Students who would otherwise have fallen further behind are caught at the earliest sign of struggle, not after a year of accumulated gaps.</li>
                  <li style={{ marginBottom: 10 }}><strong>Reduced inappropriate referrals to special education.</strong> Some students don't need an IEP — they need targeted Tier 2 support. RTI separates the two cases by giving every flagged student a chance to respond to high-quality intervention before evaluation.</li>
                  <li style={{ marginBottom: 10 }}><strong>Improved student outcomes.</strong> The combination of early intervention and evidence-based instruction consistently outperforms wait-to-fail in reading and math achievement.</li>
                  <li><strong>Data-driven decisions.</strong> Decisions about a student's instructional path are anchored in evidence, not in a single teacher's intuition. This reduces bias in referrals and creates a defensible record if special education evaluation does become appropriate.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="Where RTI Breaks Down" />

            <FadeIn delay={0.06}>
              <Expandable title="Four Implementation Challenges" color={C.coral} tag="Caution">
                <BodyText>
                  RTI is harder to implement than it is to describe. Four challenges account for most failed implementations.
                </BodyText>
                <ul style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Resource constraints.</strong> Tier 2 and Tier 3 interventions require time, staff, and physical space. A school without intervention blocks built into the schedule cannot run RTI as designed — only as a paperwork process.</li>
                  <li style={{ marginBottom: 10 }}><strong>Training needs.</strong> RTI assumes teachers can deliver evidence-based interventions and interpret progress-monitoring data. Both are skills that require sustained PD, not a one-day rollout.</li>
                  <li style={{ marginBottom: 10 }}><strong>Fidelity of implementation.</strong> An intervention only works when delivered as designed. "Tier 2" that's actually 10 minutes, twice a week, with a different teacher each session is not Tier 2. The most common failure mode is dilution.</li>
                  <li><strong>Coordination across tiers.</strong> A student moving between Tier 1, 2, and 3 needs the receiving teacher to know what's already been tried. Without coordinated systems — common data, common language, regular team meetings — students fall through the cracks between tiers.</li>
                </ul>
              </Expandable>
            </FadeIn>

            <Divider label="What Implementation Requires" />

            <FadeIn delay={0.06}>
              <Expandable title="Best Practices for RTI That Actually Works" color={C.ocean} tag="Practice">
                <BodyText>
                  Schools whose RTI delivers on its promise share four implementation practices.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Leadership Support" color={C.teal} items={[
                    "Principal champions the framework",
                    "Schedule protects intervention time",
                    "Resources allocated, not aspirational",
                  ]} />
                  <ComparisonCard title="Professional Development" color={C.gold} items={[
                    "Sustained training in evidence-based interventions",
                    "Coaching to support fidelity",
                    "Data literacy across the staff",
                  ]} />
                  <ComparisonCard title="Collaborative Teams" color={C.ocean} items={[
                    "Grade-level teams meet regularly",
                    "Shared data, shared decisions",
                    "Specialists embedded with teachers",
                  ]} />
                  <ComparisonCard title="Consistent Progress Monitoring" color={C.coral} items={[
                    "Same measure, same cadence",
                    "Data reviewed in real time",
                    "Adjustments made within weeks, not months",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 }}>
                  None of these practices are exotic. What separates schools that implement RTI well from those that don't is usually not knowledge of what to do — it's organizational discipline in actually doing it, week after week, when other priorities compete for the same time.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Getting Started" />

            <FadeIn delay={0.06}>
              <Expandable title="Where to Begin" color={C.gold} tag="Action">
                <BodyText>
                  RTI is a system, not a single program. Schools that try to install all of it in one semester usually fail. Schools that take it in deliberate steps usually succeed.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Audit Tier 1.</strong> If core instruction isn't working for at least 75–80% of students, RTI cannot fix the school — it will only formalize the existing failure. Strengthen Tier 1 first.</li>
                  <li style={{ marginBottom: 10 }}><strong>Implement universal screening.</strong> A brief, valid screener three times a year is enough to begin. The point is to identify the right students, not to generate paperwork.</li>
                  <li style={{ marginBottom: 10 }}><strong>Build Tier 2 with fidelity.</strong> Pick one or two evidence-based interventions, train the staff who will deliver them, and protect the schedule that allows them to happen. Better one Tier 2 program done well than three done badly.</li>
                  <li style={{ marginBottom: 10 }}><strong>Monitor progress consistently.</strong> Same measure, same cadence, data reviewed at least monthly by collaborative teams.</li>
                  <li><strong>Add Tier 3 only when Tier 2 is stable.</strong> Tier 3 demands specialist-level delivery and the highest fidelity. Don't add it until Tier 2 is operating well.</li>
                </ol>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  RTI's promise is simple: every student gets the support they need before failure becomes the diagnostic. The promise is real — but the work to deliver it is unglamorous, sustained, and dependent on a school culture that takes prevention as seriously as it takes remediation.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                educatorLink("high-performing-schools", { desc: "Data-driven decisions and supportive culture" }),
                educatorLink("quality-leadership", { desc: "Leadership styles and instructional pillars" }),
                educatorLink("for-educators", { desc: "All professional development resources" }),
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
