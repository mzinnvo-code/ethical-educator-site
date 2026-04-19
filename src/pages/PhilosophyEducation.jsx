import { useState } from "react";
import { C } from "../theme.js";
import {
  FadeIn, Expandable, SectionLabel, SectionTitle, Subtitle, Narrow, PageContainer,
  BodyText, ResearchCallout, QuoteBlock, StatCounter, ComparisonCard, Divider, FigureCard, RefItem
} from "../components/shared.jsx";

// ─── Interactive Schedule Viewer ───
function ScheduleViewer({ level }) {
  const schedules = {
    elementary: {
      title: "Elementary (K–5)",
      subtitle: "2 hours daily, Monday–Thursday",
      days: [
        { day: "Monday", title: "Story & Big Question", activities: [
          "Read a thought-provoking story (folk tale, fable, picture book)",
          "Guided discussion: 'What should the character have done? Why?'",
          "Students draw or act out their interpretation",
          "Example: Read The Giving Tree → 'Can a tree be a friend? What makes someone a friend?'",
        ]},
        { day: "Tuesday", title: "Thinking Games & Circle", activities: [
          "'Two Truths and a Tall Tale' — teacher presents facts + one AI-generated falsehood",
          "Students guess which is false, then discuss how they knew",
          "Circle talk on honesty, truth, and how we decide what's real",
          "Tie-in to AI awareness: 'Alexa listens with a microphone, like a human ear'",
        ]},
        { day: "Wednesday", title: "Ethics Lab Jr.", activities: [
          "Present a simple moral scenario with puppets or skit",
          "Students vote, split into small groups, then share reasoning",
          "Example: 'Someone finds a lost toy — should they keep it or find the owner?'",
          "Emphasize multiple valid perspectives and feelings",
        ]},
        { day: "Thursday", title: "Create & Share", activities: [
          "Hands-on project: draw a 'helper robot,' build with blocks, use drawing app",
          "Each student presents their creation to practice communication",
          "Connect to the week's theme: 'What problem does your robot solve? Is it fair?'",
          "End with reflection: 'What's one new question you have?'",
        ]},
      ],
    },
    middle: {
      title: "Middle School (6–8)",
      subtitle: "2 hours daily, Monday–Thursday",
      days: [
        { day: "Monday", title: "Philosophy & Inquiry Circle", activities: [
          "Socratic seminar on a provocative question or scenario",
          "Students prep by reading a short article or watching a clip beforehand",
          "Teacher uses Socratic questions to probe deeper reasoning",
          "Example: 'Should AI robots have the same rights as pets? As humans?'",
        ]},
        { day: "Tuesday", title: "Tech Exploration & AI Literacy", activities: [
          "Hands-on: train a simple ML model (e.g. distinguishing doodles)",
          "Learn concepts: dataset, bias, accuracy — through experimentation",
          "Group discussion: 'What mistakes did the AI make? Why?'",
          "Connects to AI4K12 Big Idea 3: Learning from Data",
        ]},
        { day: "Wednesday", title: "Ethics Lab", activities: [
          "Scenario-based case study with stakeholder role-play",
          "Example: 'Should schools use AI surveillance cameras for security?'",
          "Students split into stakeholders (students, parents, admin, ACLU lawyer)",
          "Mock school board meeting → class vote → debrief on values and trade-offs",
        ]},
        { day: "Thursday", title: "Creative / Project Day", activities: [
          "Work on unit projects (PSA video, short story, AI ethics poster campaign)",
          "'Philosophy Café' — students bring their own questions for small group inquiry",
          "Ethics Bowl mini-match: new case, 15-min prep, friendly debate",
          "End with reflective journaling on the week's insights",
        ]},
      ],
    },
    high: {
      title: "High School (9–12)",
      subtitle: "2 hours daily, Monday–Thursday",
      days: [
        { day: "Monday", title: "Seminar on Readings", activities: [
          "Students read assigned text over weekend (philosophy essay, AI ethics article, excerpt)",
          "Example: Chapter from Weapons of Math Destruction or article from Philosophy Now",
          "Student-led roundtable: one team opens with summary + reaction, then discussion",
          "Teacher intervenes only to deepen inquiry or maintain focus",
        ]},
        { day: "Tuesday", title: "Ethics Bowl Prep / Debate", activities: [
          "If tournament upcoming: team practice — formulating arguments, anticipating counterarguments",
          "Otherwise: class debate on a resolution (e.g. 'Should deepfake technology be banned?')",
          "Two teams present formal arguments; student panel judges persuasiveness and ethical rigor",
          "Builds rhetorical skill, spontaneous reasoning, and comfort with ambiguity",
        ]},
        { day: "Wednesday", title: "Project / Research Workshop", activities: [
          "Students work on independent or small-group capstone projects",
          "Teacher circulates as advisor: challenging assumptions, providing resources",
          "Mid-session: one student shares a progress update for peer feedback",
          "Examples: white paper on algorithmic bias, AI ethics app prototype, community workshop design",
        ]},
        { day: "Thursday", title: "Cross-Grade Collaboration / Current Events", activities: [
          "Seniors co-facilitate a discussion with middle schoolers (mentorship)",
          "Or: lightning round — each student brings an AI/ethics article from this week's news",
          "Connect current events to frameworks studied throughout the year",
          "Reflective journaling: 'What new question am I still pondering?'",
        ]},
      ],
    },
  };

  const s = schedules[level];
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginTop: 14 }}>
      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1rem", marginBottom: 4 }}>{s.title}</h4>
      <p style={{ color: C.textMuted, fontSize: "0.78rem", marginBottom: 14 }}>{s.subtitle}</p>
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {s.days.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)} style={{
            flex: 1, padding: "10px 6px", background: activeDay === i ? C.gold : "transparent",
            border: `1px solid ${activeDay === i ? C.gold : C.border}`, borderRadius: 8,
            color: activeDay === i ? C.midnight : C.textMuted, cursor: "pointer",
            fontSize: "0.72rem", fontWeight: 600, transition: "all 0.2s", textAlign: "center",
          }}>
            <div>{d.day}</div>
            <div style={{ fontSize: "0.62rem", fontWeight: 400, marginTop: 2, opacity: 0.8 }}>{d.title}</div>
          </button>
        ))}
      </div>
      <div style={{ background: `${C.gold}06`, border: `1px solid ${C.gold}12`, borderRadius: 10, padding: 16 }}>
        <h5 style={{ color: C.gold, fontSize: "0.85rem", fontWeight: 600, marginBottom: 10 }}>
          {s.days[activeDay].day}: {s.days[activeDay].title}
        </h5>
        {s.days[activeDay].activities.map((a, i) => (
          <p key={i} style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginBottom: 6, paddingLeft: 14, borderLeft: `2px solid ${C.border}` }}>{a}</p>
        ))}
      </div>
    </div>
  );
}

// ─── Non-Negotiable Skill Card ───
function SkillCard({ icon, title, desc, rationale, color }) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div onClick={() => setExpanded(!expanded)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: expanded ? `${color}08` : hover ? C.surfaceHover : C.surface,
        border: `1px solid ${expanded ? color + "30" : hover ? C.borderHover : C.border}`,
        borderRadius: 14, padding: "20px 18px", cursor: "pointer", transition: "all 0.3s",
        transform: hover && !expanded ? "translateY(-2px)" : "none",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: "1.4rem" }}>{icon}</span>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.95rem", fontWeight: 600 }}>{title}</h4>
        <span style={{ marginLeft: "auto", color, fontSize: "0.8rem", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▾</span>
      </div>
      <p style={{ color: C.textMuted, fontSize: "0.84rem", lineHeight: 1.55 }}>{desc}</p>
      {expanded && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${color}15` }}>
          <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.7 }}>{rationale}</p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ───
export default function PhilosophyEducation({ navigate }) {
  const [scheduleLevel, setScheduleLevel] = useState("elementary");

  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Research · Proposal · Curriculum</SectionLabel>
          <SectionTitle>Philosophy in K–12 Education</SectionTitle>
          <Subtitle>Philosophy is not an abstract luxury — it is a survival skill for the modern world. The research evidence is clear: teaching philosophical thinking in K–12 produces measurable gains in academic performance, critical reasoning, social-emotional development, and long-term life outcomes. In the age of AI, these skills are more urgent than ever.</Subtitle>
        </FadeIn>

        {/* ─── KEY STATS ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 32 }}>
          <FadeIn delay={0.04}><StatCounter value={0.65} suffix="" label="Overall effect size for P4C programs" subtitle="2025 meta-analysis, 30 studies" color={C.teal} /></FadeIn>
          <FadeIn delay={0.08}><StatCounter value={0.89} suffix="" label="Effect size on critical thinking" subtitle="Largest measured impact" color={C.gold} /></FadeIn>
          <FadeIn delay={0.12}><StatCounter value={2} suffix=" mo" label="Extra reading progress" subtitle="EEF randomized trial, UK" color={C.ocean} /></FadeIn>
          <FadeIn delay={0.16}><StatCounter value={4} suffix=" mo" label="Extra reading for disadvantaged pupils" subtitle="Free school meals cohort" color={C.coral} /></FadeIn>
          <FadeIn delay={0.2}><StatCounter value={7} suffix=" pts" label="IQ gain sustained to age 16" subtitle="Spanish longitudinal study" color={C.teal} /></FadeIn>
        </div>

        <Narrow>
          {/* ═══════════════════════════════════════════ */}
          <Divider label="The Research Evidence" />

          <FadeIn delay={0.04}>
            <BodyText>The case for philosophy in K–12 is not aspirational — it is empirical. Multiple randomized controlled trials, meta-analyses, and longitudinal studies across the UK, Australia, Spain, Iran, Canada, and the United States demonstrate consistent, measurable benefits across academic performance, social-emotional development, higher-order reasoning, and long-term life outcomes.</BodyText>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Expandable title="Academic Performance: Literacy, Numeracy, and Beyond" color={C.teal} tag="Evidence" defaultOpen>
              <ResearchCallout year="2015" title="EEF Randomized Trial — The Landmark Study" finding="The Education Endowment Foundation's randomized trial of Philosophy for Children (P4C) across 48 UK primary schools found that Year 4–5 pupils who participated in weekly philosophy sessions made approximately two months' additional progress in reading and mathematics over one year compared to controls — even though the philosophy sessions did not teach reading or math directly. The effect was especially pronounced for disadvantaged pupils: those on free school meals gained +4 months in reading and +3 months in math." citation="Gorard, Siddiqui, & See (2015). EEF Evaluation Report." color={C.teal} />
              <p style={{ marginTop: 12 }}>Crucially, teachers in the study reported that philosophy sessions had no adverse effect on literacy instruction time — time spent on weekly philosophy did not detract from core subjects. Qualitative feedback suggested that engaging in dialogue (questioning, explaining ideas) likely aided reading comprehension and reasoning across the curriculum.</p>

              <ResearchCallout year="2025" title="Meta-Analysis: 30 Studies, 62 Data Sets" finding="Kilby's comprehensive meta-analysis of Philosophy for/with Children programs found an overall effect size of +0.65 across all measurable outcomes. When the specific outcome was critical thinking development, the effect was very large: approximately 0.89 — indicating substantial gains in higher-order thinking skills. These benefits were observed across age groups (primary through high school) and in multiple countries." citation="Kilby, B. (2025). International Journal of Contemporary Educational Research, 12(1), 1–17." color={C.gold} />

              <ResearchCallout year="2004–2005" title="Earlier Meta-Analyses Confirm the Pattern" finding="Two influential meta-analyses (Trickey & Topping 2004; García-Moriyón, Rebollo, & Colom 2005) concluded that Philosophy for Children has a consistent positive effect on students' academic achievement and cognitive abilities. The evidence base has only strengthened in the two decades since." citation="Research Papers in Education, 19(3); Thinking, 17(4)." color={C.ocean} />

              <ResearchCallout year="2019" title="Reading Comprehension in Australia" finding="An Australian study of Year 6 students found that participants in a year-long philosophical Community of Inquiry program had significantly greater growth in reading comprehension than a comparison group — approximately one additional year of reading progress beyond non-participants. This aligns with earlier trials (Dyfed County 1994; Topping & Trickey 2007) showing group reasoning dialogues boost literacy." citation="Monash University / The Conversation (2019)." color={C.teal} />

              <p style={{ marginTop: 12 }}>Overall, academic gains from K–12 philosophy tend to be modest in absolute terms (a few months' extra progress) but are <strong>consistently positive and do not come at the expense of other learning</strong>. Teaching children to think critically and abstractly appears to support their reading, writing, and problem-solving performance across subjects.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="Social-Emotional Development: Empathy, Confidence, Collaboration" color={C.gold} tag="Evidence">
              <p>Beyond test scores, philosophy programs explicitly cultivate what Matthew Lipman called "caring thinking" alongside critical and creative thinking. The research increasingly measures these outcomes:</p>

              <ResearchCallout year="2023" title="Empathy Gains with Large Effect Size" finding="A 12-session P4C intervention with 9–11 year-olds in Iran produced a significant increase in empathy (η² ≈ 0.54 — a large effect). Students showed greater ability to understand others' feelings after guided philosophical discussions, attributed to practicing 'deep conversation' and reflecting on moral dilemmas." citation="Ghadiri Bidhandi & Mirzamani (2023). Medical Journal of Mashhad University, 66(5)." color={C.gold} />

              <ResearchCallout year="2013" title="Social Competence in Preschoolers" finding="A study of preschool children in Spain and Canada found that one year of philosophically oriented 'Thinking Emotions' sessions led to significant improvements in social competence (peer relationships, cooperation) as well as emotion understanding. Five-year-olds made measurable gains in recognizing and managing emotions compared to controls." citation="Giménez-Dasí, Quintanilla, & Daniel (2013). Childhood & Philosophy, 9(17)." color={C.gold} />

              <p style={{ marginTop: 12 }}><strong>Self-confidence and emotional regulation:</strong> In the EEF trial, teachers noted that regular P4C sessions had a "positive influence on wider outcomes such as pupils' confidence to speak, listening skills, and self-esteem." Students who were shy about speaking up often became more comfortable in the open, respectful forum that philosophy circles provide. One qualitative study of gifted middle-schoolers found that after P4C, many reported feeling less shy and more patient when confronted with differing opinions.</p>

              <p style={{ marginTop: 12 }}><strong>Important caveat:</strong> Not all studies find large social-emotional effects, especially in short interventions. A pilot RCT in Canada (10 classrooms, 8-week program) detected no significant differences in self-reported empathy immediately after the program. Researchers suggested longer duration and more intensive implementation may be needed. This aligns with findings that <strong>consistent, ongoing practice</strong> — weekly sessions throughout the year — is crucial for benefits to manifest in attitudes and behavior.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Higher-Order Thinking: Critical Reasoning, Metacognition, Moral Judgment" color={C.ocean} tag="Evidence">
              <p>The clearest impact of K–12 philosophy education is on higher-order thinking abilities — and these effects appear to be <strong>durable</strong>:</p>

              <ResearchCallout year="2015" title="Gains Persist 3 Years Later" finding="In Texas, children who completed a year of P4C in elementary school still showed elevated cognitive ability scores three years later in middle school — implying the improvements in reasoning are not temporary test effects but lasting cognitive benefits." citation="Fair, F. et al. (2015). 'Socrates in the Schools: Gains at Three-Year Follow-Up.' Journal of Philosophy in Schools, 2(2)." color={C.ocean} />

              <ResearchCallout year="2014" title="Spanish Longitudinal Study: +7 IQ Points by Age 16" finding="Students who participated in philosophy programs from primary school through high school scored approximately 7 points higher in IQ (half a standard deviation) by age 16 compared to non-participants. They also showed stronger problem-solving abilities, creativity, and fewer fell into the low-achievement bracket." citation="Colom, García-Moriyón, Magro, & Morilla (2014). Analytic Teaching and Philosophical Praxis, 35(1)." color={C.ocean} />

              <p style={{ marginTop: 12 }}><strong>Metacognition — thinking about thinking:</strong> Philosophical inquiry teaches students to examine assumptions, construct logical arguments, and consider analogies. Students commonly report growth in independent inquiry: "I now enjoy researching and questioning… it leads to the discovery of new concepts." Another: "I learned to think critically… through reflection and discussion, I arrive at more accurate conclusions."</p>

              <p style={{ marginTop: 12 }}><strong>Moral reasoning:</strong> While large-scale quantitative evidence is still emerging, teachers consistently observe more nuanced moral reasoning over time. Children as young as 6–7 can discuss concepts of fairness or lying in a philosophy class, and Ethics Bowl participants demonstrate sophisticated ethical analysis. Philosophy programs explicitly promote "caring thinking" — valuing others' perspectives and the impact of decisions — alongside critical thinking.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="Long-Term Outcomes: Civic Engagement, Career Readiness, Well-Being" color={C.coral} tag="Evidence">
              <p>Direct longitudinal evidence from K–12 into adulthood is still limited, but initial indications are promising:</p>

              <p style={{ marginTop: 12 }}><strong>Sustained cognitive benefits:</strong> Both the Texas and Spain studies demonstrate that philosophical training may set students up for continued academic success by equipping them with thinking tools that compound over time. The effects don't fade — they persist and potentially grow.</p>

              <QuoteBlock quote="Exposure to philosophy… is vital if we truly want our young people to acquire the capacities they need in preparing for their journey into the world." attribution="President Michael D. Higgins" source="Ireland (which made philosophy a core part of its national curriculum)" color={C.coral} />

              <p style={{ marginTop: 12 }}><strong>Career readiness:</strong> A survey of U.S. employers found that <strong>87% of hiring managers</strong> and 77% of executives view ethical reasoning and integrity as top outcomes for education — exactly what philosophy programs develop. Critical thinking, communication, and teamwork are consistently the most sought-after skills in the workforce. Students who pursue philosophy at the undergraduate level tend to excel on professional and graduate school entrance exams — an indicator that analytical skills carry forward.</p>

              <p style={{ marginTop: 12 }}><strong>Well-being and meaning:</strong> Students who have participated in P4C frequently describe it as a space where they can "make sense of the world and meaning in their lives," rather than just chase grades. Philosophy encourages exploration of identity, purpose, and values — contributing to a stronger sense of self that may support resilience and mental well-being throughout life.</p>
            </Expandable>
          </FadeIn>

          {/* ═══════════════════════════════════════════ */}
          <Divider label="Why Now — Philosophy in the Age of AI" />

          <FadeIn delay={0.06}>
            <Expandable title="The Paradigm Shift Demands Philosophical Thinking" color={C.gold} defaultOpen>
              <p>We stand at the start of the most consequential paradigm shift humanity has ever experienced. AI will soon be capable of performing every task a human worker can perform — including creating text, video, and audio so realistic it cannot be determined to be AI-generated. This reality demands a fundamental rethinking of what education is for.</p>

              <QuoteBlock quote="While AI can do fantastic things, we must ensure it doesn't cause harm to individuals, to communities, to society as a whole." attribution="Sally Kornbluth" source="MIT President" color={C.teal} />

              <p style={{ marginTop: 12 }}>In this new world, the value of uniquely human capacities — ethical reasoning, critical thinking, philosophical inquiry, creative judgment, empathetic leadership — will become paramount. These are precisely the capacities that philosophy has cultivated for 2,500 years. The question is no longer whether to teach philosophy in K–12, but how urgently we can begin.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "16px 0" }}>
                <ComparisonCard title="What AI Can Do" color={C.coral} items={[
                  "Generate convincing text, images, video, audio",
                  "Analyze data and identify patterns",
                  "Optimize processes and automate tasks",
                  "Simulate human conversation and reasoning",
                  "Produce work indistinguishable from human output",
                ]} />
                <ComparisonCard title="What AI Cannot Do" color={C.teal} items={[
                  "Reason ethically about novel dilemmas",
                  "Discern truth from convincing fiction with judgment",
                  "Form authentic relationships and community",
                  "Exercise practical wisdom (phrónēsis)",
                  "Define values, meaning, and purpose",
                ]} />
              </div>

              <p style={{ marginTop: 12 }}>Philosophy addresses every column on the right. It is not a complement to STEM education — it is the <strong>foundation</strong> without which technical education becomes directionless. As MIT's Sloan Management Review argued in 2025, philosophical frameworks — understanding purpose, knowledge, and values — are crucial even in technology leadership, "beyond just technical skills."</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="Four Reasons Philosophy Is Essential Now" color={C.ocean}>
              <p><strong>1. Discernment in a Post-Truth Era.</strong> As AI-generated content becomes indistinguishable from human-created material, distinguishing truth from fiction is no longer a technical challenge but a philosophical one. Epistemology — the study of knowledge — gives students frameworks to reason through conflicting viewpoints, analyze knowledge claims, and ask deeper questions about meaning and truth. <a href="#" onClick={e => { e.preventDefault(); navigate("thought-experiments"); }} style={{ color: C.teal }}>Our thought experiments explore this directly →</a></p>

              <p style={{ marginTop: 12 }}><strong>2. Ethical Reasoning in a High-Stakes World.</strong> AI technologies force decisions about what <em>should</em> be done, not just what <em>can</em> be done. Students must develop moral reasoning grounded in ethical theory — utilitarianism, deontology, virtue ethics — to navigate dilemmas around AI, surveillance, labor displacement, digital identity, and climate change. <a href="#" onClick={e => { e.preventDefault(); navigate("ai-ethics"); }} style={{ color: C.teal }}>See the is/ought distinction in AI ethics →</a></p>

              <p style={{ marginTop: 12 }}><strong>3. Identity, Agency, and the Human Condition.</strong> As AI agents increasingly simulate human behavior, students need to engage with questions philosophy has wrestled with for millennia: What does it mean to be human? What is consciousness? Do we have free will? <a href="#" onClick={e => { e.preventDefault(); navigate("moral-psych"); }} style={{ color: C.teal }}>Explore Greene's research on how we make moral judgments →</a></p>

              <p style={{ marginTop: 12 }}><strong>4. Dialogue and Civil Discourse.</strong> In a society fragmented by algorithmically curated realities, the ability to engage in reasoned, respectful dialogue is critical. Socratic questioning, argument analysis, and collaborative truth-seeking are core philosophical practices that can be cultivated from kindergarten onward. PLATO's research confirms that philosophy discussions foster tolerance for diverse viewpoints, self-confidence, and analytical reasoning.</p>
            </Expandable>
          </FadeIn>

          {/* ═══════════════════════════════════════════ */}
          <Divider label="The Afternoon Collaborative Program" />

          <FadeIn delay={0.04}>
            <BodyText>The following proposal outlines a comprehensive K–12 afternoon program integrating philosophy, ethics, AI literacy, and human collaboration. Each day, after a morning of AI-assisted core academics, students come together for two hours of guided human-centric learning — discussions, projects, and exercises that prepare them for the world they're entering.</BodyText>
          </FadeIn>

          {/* ─── NON-NEGOTIABLE SKILLS ─── */}
          <FadeIn delay={0.06}>
            <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.15rem", marginBottom: 16, marginTop: 8 }}>Non-Negotiable Skills for the AI Era</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <SkillCard icon="🔍" title="Critical Thinking & Truth Discernment" color={C.teal}
                desc="Question and verify information, analyze sources, use logic to separate fact from falsehood. Spot deepfakes, misleading statistics, and persuasive misinformation."
                rationale="AI can generate fake but plausible images, text, and videos. Students must become detectives of truth — continuously asking: 'How do we know this is true? What evidence supports it?' This is not a technical skill but an epistemological one, rooted in philosophy's oldest tradition." />
              <SkillCard icon="⚖️" title="Ethical Reasoning & Moral Decision-Making" color={C.gold}
                desc="Develop a strong ethical framework grounded in normative theory. Apply utilitarianism, deontology, and virtue ethics to real technology dilemmas."
                rationale="AI systems can inherit bias or be used harmfully. Students must make choices aligned with human rights, fairness, and well-being — becoming ethical leaders who ensure technology is developed responsibly. This requires not just knowing what's right, but understanding WHY it's right and being able to defend that reasoning under pressure." />
              <SkillCard icon="❓" title="Philosophical Inquiry & Curiosity" color={C.ocean}
                desc="Nurture deep questioning and intellectual curiosity. Practice asking 'big questions' about technology, consciousness, knowledge, and identity."
                rationale="As PLATO emphasizes, introducing philosophy nurtures young people's curiosity, critical thinking, and desire to explore big questions. These traits produce lifelong learners adaptable to change — the most valuable asset in a world where specific skills may become obsolete within a decade." />
              <SkillCard icon="🤝" title="Collaboration & Dialogue Skills" color={C.coral}
                desc="Master Socratic discussion, active listening, constructive debate, and teamwork on complex problems. Learn to disagree civilly and seek common ground."
                rationale="In a time of algorithm-driven echo chambers, the ability to engage with diverse viewpoints is critical. Philosophy discussions are training grounds for empathy and reasoned debate — producing students who learn to think, not what to think. These afternoon sessions are a microcosm of healthy democratic society." />
              <SkillCard icon="🤖" title="AI Literacy & Technological Adaptability" color={C.teal}
                desc="Understand how AI works at an appropriate level. Learn key concepts (machine learning, algorithms, training data, bias) and develop strategies for using AI tools critically."
                rationale="Following the AI4K12 'Five Big Ideas in AI' framework — from how computers perceive the world to how AI impacts society — students become savvy, adaptable users and potential creators of AI technology. They approach AI with both enthusiasm and informed caution, viewing it as a tool requiring human judgment rather than a magic oracle." />
            </div>
          </FadeIn>

          {/* ─── KEY COMPONENTS ─── */}
          <FadeIn delay={0.08}>
            <Expandable title="Program Components: How It Works" color={C.teal} defaultOpen>
              <p>Each day's two-hour session is interactive and discussion-driven — never a lecture. The program uses six interconnected strategies:</p>

              <p style={{ marginTop: 14 }}><strong>1. Philosophical Inquiry Circles (Socratic Seminars).</strong> At least once weekly, students participate in guided group dialogues on "big questions" or thought experiments. A facilitator uses the Socratic method to probe deeper reasoning. Students learn to support arguments with evidence, question respectfully, and become comfortable with uncertainty. <a href="#" onClick={e => { e.preventDefault(); navigate("thought-experiments"); }} style={{ color: C.teal }}>See our interactive thought experiments for examples →</a></p>

              <p style={{ marginTop: 14 }}><strong>2. Ethics Labs (Case Studies & Dilemmas).</strong> Students work in teams on scenarios drawn from current AI developments — applying ethical frameworks, role-playing stakeholders, debating solutions, and reflecting on values. These align with <a href="https://philosophy.mit.edu/ethicsandai/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>MIT's Responsible AI curriculum</a> and UNESCO AI Ethics guidelines.</p>

              <p style={{ marginTop: 14 }}><strong>3. Philosophy Through Story & Media.</strong> Literature, film, art, and AI-generated media serve as gateways to philosophical discussion. Students ask: Who created this? What values does it reflect? What consequences does it suggest? This develops media literacy alongside philosophical reasoning.</p>

              <p style={{ marginTop: 14 }}><strong>4. Student-Led Thought Experiments & Projects.</strong> Students design their own thought experiments, investigations, and capstone projects. High schoolers might draft a "Bill of AI Rights," middle schoolers might create a public service video on deepfakes, elementary students might design their ideal helper robot. End-of-semester "Philosophy & AI Expos" showcase student work.</p>

              <p style={{ marginTop: 14 }}><strong>5. Integration of AI Tools in Learning.</strong> Rather than ban AI, we teach students to use it critically. Students might prompt an AI to generate two opposing news headlines and analyze how wording influences perception, or train a simple model and interrogate its errors. Every use of AI comes with reflection: How did it reach that result? Is it correct? What data was it trained on?</p>

              <p style={{ marginTop: 14 }}><strong>6. Partnerships and Educator Support.</strong> We partner with <a href="https://www.plato-philosophy.org/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>PLATO (Philosophy Learning and Teaching Organization)</a> for lesson plans, training, and community of practice. We draw on <a href="https://ai4k12.org/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>AI4K12's Five Big Ideas</a> framework for AI literacy content. We use <a href="https://philosophy.mit.edu/ethicsandai/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>MIT's Ethics and AI curriculum</a> for advanced ethics content. High schoolers can participate in the <a href="https://www.plato-philosophy.org/ethics-bowl/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>National High School Ethics Bowl</a>.</p>
            </Expandable>
          </FadeIn>

          {/* ─── GRADE LEVEL CURRICULUM ─── */}
          <FadeIn delay={0.1}>
            <Expandable title="Elementary (K–5): Sparking Curiosity and a Moral Compass" color={C.teal} tag="K–5">
              <p>At the elementary level, the emphasis is on sparking curiosity and building a moral compass through stories, play, and examples from children's daily lives. We introduce philosophical thinking without jargon.</p>

              <p style={{ marginTop: 12 }}><strong>Fall — "Big Questions about Me and My World":</strong> Students explore identity and reality in simple terms. "What makes you <em>you</em>? How are people and robots different?" Activities include learning how computers "see" and "hear" (connecting to AI4K12 Big Idea 1: Perception), sharing personal traits, and reading stories like <em>The Velveteen Rabbit</em> ("Can a toy be alive or real to someone?").</p>

              <p style={{ marginTop: 12 }}><strong>Winter — "Right and Wrong in Our Community":</strong> Focus on ethics and social skills through simple moral scenarios. "What is a rule? Why do we have rules? How do we feel when something is unfair?" Tie-in to AI: "If a robot friend only tells you what you want to hear, is that a good friend?"</p>

              <p style={{ marginTop: 12 }}><strong>Spring — "Imagining and Creating with AI":</strong> Students discover that computers can create things too (show AI-generated animal pictures and guess human vs. computer), use kid-friendly AI drawing tools, and ask: "Can machines be creative? Where do ideas come from?" Close the year by celebrating all the "big questions" the class asked — compiling a "Philosopher's Journal."</p>

              <p style={{ marginTop: 12 }}><strong>By fifth grade:</strong> Students feel comfortable asking questions, can articulate reasons for their opinions ("I think this because…"), and have basic awareness that computers have limits ("Computers don't actually think like us; they follow programs").</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="Middle School (6–8): Strengthening Critical and Ethical Analysis" color={C.gold} tag="6–8">
              <p>Middle schoolers are ready for more complex ideas and are beginning to form their values. The program strengthens critical thinking and ethical analysis through debate, hands-on AI exploration, and emerging moral reasoning.</p>

              <p style={{ marginTop: 12 }}><strong>Unit 1 — Knowledge and Misinformation (Sept–Oct):</strong> How do we know something is true? Critical thinking fundamentals: logical fallacies, evaluating evidence, fact-checking deepfakes and social media posts. Each student creates a "critical thinking checklist" for daily life. The philosophical backbone: epistemology.</p>

              <p style={{ marginTop: 12 }}><strong>Unit 2 — Ethics of Technology and Society (Nov–Dec):</strong> Major ethical theories through relatable scenarios. Technology's impact: privacy, bias, equity, AI in justice. Students explore bias through simplified simulators, debate a fictional "AI Principal" making discipline decisions. Each student writes a short essay or records a presentation taking a stand on an AI ethics issue.</p>

              <p style={{ marginTop: 12 }}><strong>Unit 3 — Identity, Humanity, and AI (Jan–Feb):</strong> What does it mean to be human? Could a machine have feelings or rights? Students read sci-fi excerpts (Asimov, watch <em>Wall-E</em>), reflect on online identity vs. "real" self, participate in Socratic seminars on "Is your online self you?"</p>

              <p style={{ marginTop: 12 }}><strong>Unit 4 — AI Futures & Civic Responsibility (Mar–May):</strong> How can we shape AI for good? Model AI Governance Forum where student groups represent stakeholders to draft rules. Capstone projects: informative video for younger students about fake news, poster campaign on AI ethics, or a "Bill of AI Rights" for their school.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.14}>
            <Expandable title="High School (9–12): Scholar-Leaders for the AI Age" color={C.coral} tag="9–12">
              <p>The high school program serves as the capstone, pushing students to an advanced level of critical, ethical, and creative thinking through seminar-style engagement with primary sources, independent research, and leadership opportunities.</p>

              <p style={{ marginTop: 12 }}><strong>9th Grade — Foundations of Critical Thought and AI Literacy:</strong> Formal and informal logic, identifying fallacies, introduction to philosophy's branches. Hands-on AI: implementing a simple decision tree, understanding algorithms vs. AI. Sample question: "How do we know what's real?" leads into deepfakes and conspiracy theories. Students write a short position paper on an AI ethics topic.</p>

              <p style={{ marginTop: 12 }}><strong>10th Grade — Ethics, Society, and Global Impacts:</strong> Reading excerpts from moral philosophers (Aristotle, Kant, Mill) alongside contemporary tech ethics writers. Data privacy, surveillance, AI in law enforcement, labor automation. Highlight: <a href="https://www.plato-philosophy.org/ethics-bowl/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>Ethics Bowl</a> participation — teams debate real cases involving technology and society. Service project: surveying the community on an AI issue or teaching elders about online scams.</p>

              <p style={{ marginTop: 12 }}><strong>11th Grade — Philosophical Inquiry in Depth:</strong> Seminar-style engagement with challenging texts — Turing's "Computing Machinery and Intelligence," Searle's Chinese Room, articles by AI researchers and futurists. Key questions: consciousness, free will, the nature of intelligence. Philosophy journal throughout the year. Interdisciplinary projects: connect <em>Frankenstein</em> in literature class to questions of creation and responsibility.</p>

              <p style={{ marginTop: 12 }}><strong>12th Grade — Leadership, Synthesis, and Action:</strong> Capstone experience. Students identify an issue at the intersection of AI, ethics, and society and spend the year researching it. Products: white papers, apps with ethical design, community workshops, mentoring younger students. Formal symposium presentation at year's end. Goal: graduates who can enter a college debate on AI ethics or a civic meeting on tech policy and hold their own.</p>
            </Expandable>
          </FadeIn>

          {/* ─── INTERACTIVE SCHEDULES ─── */}
          <FadeIn delay={0.16}>
            <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.15rem", marginBottom: 8, marginTop: 32 }}>Example Weekly Schedules</h3>
            <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 14 }}>Click a grade level to see a sample week. Each day is a 2-hour afternoon session, Monday through Thursday.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
              {[
                { key: "elementary", label: "K–5", color: C.teal },
                { key: "middle", label: "6–8", color: C.gold },
                { key: "high", label: "9–12", color: C.coral },
              ].map(l => (
                <button key={l.key} onClick={() => setScheduleLevel(l.key)} style={{
                  padding: "10px 22px", background: scheduleLevel === l.key ? l.color : "transparent",
                  border: `1px solid ${scheduleLevel === l.key ? l.color : C.border}`, borderRadius: 8,
                  color: scheduleLevel === l.key ? "#fff" : C.textMuted, cursor: "pointer",
                  fontSize: "0.85rem", fontWeight: 600, transition: "all 0.2s",
                }}>{l.label}</button>
              ))}
            </div>
            <ScheduleViewer level={scheduleLevel} />
          </FadeIn>

          {/* ═══════════════════════════════════════════ */}
          <Divider label="Implementation" />

          <FadeIn delay={0.06}>
            <Expandable title="Teacher Training & Support" color={C.gold}>
              <p>Implementing philosophy in K–12 requires teacher professional development — leading an open-ended philosophical dialogue is a specialized skill. Research shows this investment is both critical and affordable:</p>
              <p style={{ marginTop: 12 }}>The EEF trial provided two days of teacher training plus ongoing coaching, at a cost of approximately <strong>£16 per pupil per year</strong> — considered highly cost-effective given the measured outcomes. Experts argue: "Teachers must be prepared to teach critical thinking rather than winging it — this requires grounding in philosophical inquiry methods."</p>
              <p style={{ marginTop: 12 }}><strong>Key partnerships:</strong></p>
              <p style={{ marginTop: 8 }}>• <a href="https://www.plato-philosophy.org/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>PLATO</a> — Lesson plans, webinars, "Philosopher in Residence" programs, and the <a href="https://www.plato-philosophy.org/ethics-bowl/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>High School Ethics Bowl</a> competition network</p>
              <p>• <a href="https://philosophy.mit.edu/ethicsandai/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>MIT Ethics and AI Curriculum</a> — Advanced ethics content and responsible AI modules</p>
              <p>• <a href="https://ai4k12.org/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>AI4K12</a> — "Five Big Ideas in AI" framework for developmentally appropriate AI literacy</p>
              <p>• <a href="https://raise.mit.edu/day-of-ai/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>MIT RAISE "Day of AI"</a> — Free curriculum teaching K–12 students responsible AI use</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="Assessment Strategies" color={C.ocean}>
              <p>Assessing philosophical thinking requires approaches beyond standardized tests. The program uses multiple modalities:</p>
              <p style={{ marginTop: 12 }}><strong>Portfolio-based assessment:</strong> Students maintain philosophy journals and project portfolios throughout the year, documenting their evolving thinking. Teachers assess growth in reasoning quality, not "right answers."</p>
              <p style={{ marginTop: 12 }}><strong>Socratic seminar rubrics:</strong> Evaluate participation quality — not frequency of speaking, but quality of contributions: building on others' ideas, using evidence, asking probing questions, revising positions when presented with new arguments.</p>
              <p style={{ marginTop: 12 }}><strong>Ethics Bowl format:</strong> Structured case analysis where students present arguments, respond to challenges, and demonstrate ethical reasoning under time pressure.</p>
              <p style={{ marginTop: 12 }}><strong>Capstone projects:</strong> Evaluated on depth of inquiry, quality of argument, engagement with counterarguments, and practical applicability.</p>
              <p style={{ marginTop: 12 }}><strong>Reflective self-assessment:</strong> Start-of-year and end-of-year essays: "How has my thinking about technology changed?" This develops metacognition and provides powerful evidence of growth.</p>
              <p style={{ marginTop: 12 }}><strong>Integration with morning AI lessons:</strong> Teachers can assess whether philosophical skills transfer to academic work — do students ask better questions in science? Write more nuanced arguments in English? Approach math problems with more flexible reasoning? The EEF trial demonstrated exactly this kind of transfer.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Integration with Morning AI-Driven Lessons" color={C.teal}>
              <p>The afternoon program is designed to complement, not compete with, morning AI-assisted academics. The integration works in both directions:</p>
              <p style={{ marginTop: 12 }}><strong>Morning → Afternoon:</strong> Content learned through AI tutors in the morning becomes material for philosophical inquiry in the afternoon. If students learn about the American Revolution with Khanmigo, the afternoon session might ask: "Was the revolution justified? By whose ethical framework? Would you have participated?" This deepens understanding while developing critical and ethical reasoning.</p>
              <p style={{ marginTop: 12 }}><strong>Afternoon → Morning:</strong> Critical thinking skills developed through philosophical dialogue transfer to academic work. Students who practice questioning assumptions, evaluating evidence, and constructing arguments become better learners in every subject. The EEF trial demonstrated this: philosophy sessions produced measurable gains in reading and math despite teaching neither directly.</p>
              <p style={{ marginTop: 12 }}><strong>AI as subject matter:</strong> Students use the same AI tools from their morning lessons as objects of philosophical inquiry in the afternoon. "How did Khanmigo know to explain it that way? What data was it trained on? Could it be wrong? How would we know?" This develops AI literacy and critical disposition simultaneously.</p>
            </Expandable>
          </FadeIn>

          {/* ═══════════════════════════════════════════ */}
          <Divider label="The Case for Action" />

          <FadeIn delay={0.06}>
            <Expandable title="Why This Cannot Wait" color={C.gold} defaultOpen>
              <p>The convergence of evidence is unusually clear:</p>
              <p style={{ marginTop: 12 }}>The <strong>research evidence</strong> demonstrates measurable, durable benefits across academic performance, social-emotional development, critical reasoning, and long-term outcomes — with the largest effects precisely in the domains most threatened by AI disruption.</p>
              <p style={{ marginTop: 12 }}>The <strong>technological reality</strong> is accelerating: AI can now generate content indistinguishable from human output, and students are already using these tools without guidance. A <a href="https://www.rand.org/pubs/research_reports/RRA4742-1.html" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>RAND study (2025)</a> found 62% of students use AI for homework, with 60% concerned about its impact on their own critical thinking. Students themselves are asking for help navigating this.</p>
              <p style={{ marginTop: 12 }}>The <strong>philosophical tradition</strong> — from Socrates to Dewey to the contemporary researchers cited throughout this site — provides exactly the tools students need. These are not new skills to invent but ancient practices to redeploy in an unprecedented context.</p>
              <QuoteBlock quote="Philosophy is not an abstract luxury — it is a survival skill for the modern world. While AI may become adept at performing tasks, creating content, and analyzing data, it cannot yet reason ethically, define values, or navigate ambiguity the way a critically trained human can." attribution="Program Rationale" source="" color={C.gold} />
              <p>By implementing this program, we ensure that our graduates carry forward not just knowledge but <strong>wisdom</strong> — the capacity to think critically, reason ethically, collaborate generously, and lead with values in a world that desperately needs all of these things.</p>
            </Expandable>
          </FadeIn>

          {/* ─── REFERENCES ─── */}
          <FadeIn delay={0.08}>
            <Expandable title="Research Sources & Further Reading" color={C.ocean}>
              <RefItem>Gorard, S., Siddiqui, N., & See, B.H. (2015). Philosophy for Children: Evaluation Report and Executive Summary. Education Endowment Foundation.</RefItem>
              <RefItem>Education Endowment Foundation (2014). EEF Project Summary: Philosophy for Children — Efficacy Trial.</RefItem>
              <RefItem>Kilby, B. (2025). "Philosophy for/with Children: A Meta-Analysis." International J. of Contemporary Educational Research, 12(1), 1–17.</RefItem>
              <RefItem>Trickey, S. & Topping, K.J. (2004). "Philosophy for Children: A Systematic Review." Research Papers in Education, 19(3), 365–380.</RefItem>
              <RefItem>García-Moriyón, F., Rebollo, I., & Colom, R. (2005). "Evaluating Philosophy for Children: A Meta-Analysis." Thinking, 17(4), 14–22.</RefItem>
              <RefItem>Fair, F. et al. (2015). "Socrates in the Schools: Gains at Three-Year Follow-Up." Journal of Philosophy in Schools, 2(2), 5–15.</RefItem>
              <RefItem>Colom, R., García-Moriyón, F., Magro, C., & Morilla, E. (2014). "The Long-term Impact of Philosophy for Children: A Longitudinal Study." Analytic Teaching and Philosophical Praxis, 35(1), 50–56.</RefItem>
              <RefItem>Giménez-Dasí, M., Quintanilla, L., & Daniel, M. (2013). "Improving Emotion Comprehension and Social Skills in Early Childhood through P4C." Childhood & Philosophy, 9(17), 303–331.</RefItem>
              <RefItem>Ghadiri Bidhandi, Z. & Mirzamani, S.M. (2023). "Efficacy of Training P4C on Empathy of 9-12-Year-Old Children." Medical J. of Mashhad University, 66(5).</RefItem>
              <RefItem>Asgari, M. et al. (2023). "The Impact of P4C on Middle School Students' Empathy." Analytic Teaching and Philosophical Praxis, 43(1), 26–44.</RefItem>
              <RefItem>Hart Research Associates (2018). "Fulfilling the American Dream: Liberal Education and the Future of Work." (Employer survey: 87% value ethical reasoning).</RefItem>
              <RefItem>UNESCO (2022). K-12 AI Curricula: Mapping of government-endorsed AI curricula.</RefItem>
              <RefItem>MIT RAISE "Day of AI" program — Free K–12 curriculum on responsible AI use.</RefItem>
              <RefItem>MIT Sloan Management Review (2025). "Philosophy Eats AI" — philosophical thinking is crucial in tech leadership.</RefItem>
              <RefItem>PLATO (Philosophy Learning and Teaching Organization) — plato-philosophy.org</RefItem>
              <RefItem>AI4K12 Initiative — ai4k12.org — "Five Big Ideas in AI" framework.</RefItem>
              <RefItem>MIT Department of Linguistics and Philosophy — philosophy.mit.edu/ethicsandai/</RefItem>
              <RefItem>Colletti, G. (2018). "Engaging Philosophy in the Quest for K–12 Deeper Learning." NASBE Policy Update 25(3).</RefItem>
              <RefItem>Monash University (2019). "Who am I? Why children should be taught philosophy." Monash Lens / The Conversation.</RefItem>
            </Expandable>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
