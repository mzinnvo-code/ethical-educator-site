import { useState } from "react";
import { C } from "../theme.js";
import {
  FadeIn, Expandable, TopicCard, useAudio, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ResearchCallout, QuoteBlock, StatCounter,
  Timeline, ComparisonCard, Divider, ReadingTime, ContinueExploring
} from "../components/shared.jsx";
import { PolicyTimelineDiagram } from "../components/diagrams.jsx";

function EthicsQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const audio = useAudio();
  const questions = [
    {
      q: "A student uses AI to summarize a lesson and then studies the summary deeply. Is this ethical?",
      opts: ["Yes — AI enhanced learning", "No — the student didn't do the work", "It depends on school policy", "Only if the teacher knows"],
      explanation: "This aligns with using AI as a learning scaffold. The student engaged with material — AI served as a tool, not a replacement for thinking. But the answer depends on what values your school has explicitly committed to. A utilitarian perspective would focus on learning outcomes; a deontological perspective might emphasize the duty of transparency; virtue ethics would ask whether this cultivates intellectual honesty."
    },
    {
      q: "AI grading gives faster, more consistent feedback than a human teacher. Should schools mandate its use?",
      opts: ["Yes — students benefit from speed", "No — human judgment is irreplaceable", "Use both in parallel", "Let teachers decide"],
      explanation: "A 2025 meta-analysis found moderate positive effects from AI-supported feedback (SMD = 0.45), but Microsoft Research (Oct 2025) cautioned that 'productivity gains from GenAI ≠ learning gains.' NYC's 2026 AI policy prohibits AI-driven decisions on grading (Red zone), while allowing AI as a feedback co-pilot (Green zone with review). Each option above reflects different values: efficiency, irreplaceable human connection, comprehensiveness, or teacher autonomy."
    },
    {
      q: "An AI perfectly replicates a teacher's personality and teaching style. Should it replace the teacher?",
      opts: ["Yes — if outcomes are equal", "Never — humans are irreplaceable", "Only for specific tasks", "This is the wrong question"],
      explanation: "The question isn't CAN AI replace teachers, but SHOULD it. Biesta's framework distinguishes qualification, socialization, and subjectification. AI might deliver qualification — but subjectification (becoming an autonomous moral agent) requires irreducibly human encounter. Sparrow and Flenady (2025, AI & Society) warn that economic pressures may override normative arguments: 'money talks.'"
    },
  ];
  const handleAnswer = (i) => {
    audio.playClick();
    setAnswers([...answers, i]);
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };
  if (showResult) {
    return (
      <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, margin: "20px 0" }}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, marginBottom: 12 }}>Reflection</h4>
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <p style={{ color: C.textPrimary, fontSize: "0.87rem", fontWeight: 600, marginBottom: 4 }}>{q.q}</p>
            <p style={{ color: C.textMuted, fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>{q.explanation}</p>
          </div>
        ))}
        <button onClick={() => { setCurrent(0); setAnswers([]); setShowResult(false); }}
          style={{ padding: "8px 20px", background: C.gold, border: "none", borderRadius: 6, color: C.midnight, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>Try Again</button>
      </div>
    );
  }
  const q = questions[current];
  return (
    <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, margin: "20px 0" }}>
      <div style={{ fontSize: "0.7rem", color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Question {current + 1} of {questions.length}</div>
      <p style={{ color: C.textPrimary, fontSize: "1rem", lineHeight: 1.6, marginBottom: 16, fontFamily: "'Source Serif 4', Georgia, serif" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)}
            style={{ padding: "10px 16px", textAlign: "left", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textSecondary, cursor: "pointer", fontSize: "0.88rem", transition: "all 0.2s" }}
            onMouseOver={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.textPrimary; }}
            onMouseOut={e => { e.target.style.borderColor = C.border; e.target.style.color = C.textSecondary; }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

/* ─── Ethical Matrix Interactive ─── */
function EthicalMatrix() {
  const [cells, setCells] = useState({});
  const stakeholders = ["Students", "Teachers", "Parents / Community"];
  const principles = ["Wellbeing", "Autonomy", "Fairness"];

  const prompts = {
    "Students-Wellbeing": "How does this AI tool affect student mental health, engagement, and growth?",
    "Students-Autonomy": "Can students still make independent learning choices, or does the AI decide for them?",
    "Students-Fairness": "Does every student benefit equally, or does the tool advantage some over others?",
    "Teachers-Wellbeing": "Does this tool reduce burnout or add to it? Does it threaten job security?",
    "Teachers-Autonomy": "Can teachers override or customize the AI, or must they accept its outputs?",
    "Teachers-Fairness": "Do all teachers have equal access and equal training to use the tool?",
    "Parents / Community-Wellbeing": "Does the tool build trust between school and home, or erode it?",
    "Parents / Community-Autonomy": "Do parents have meaningful say in whether and how AI is used?",
    "Parents / Community-Fairness": "Are the costs and risks distributed equitably across the community?",
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 14 }}>
        Think of a specific AI tool you're considering for your classroom. For each cell, reflect on how the tool affects that stakeholder along that ethical dimension. Tap any cell to see a guiding question.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 12px", borderBottom: `2px solid ${C.gold}40`, color: C.textMuted, textAlign: "left", fontWeight: 600, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}></th>
              {principles.map(p => (
                <th key={p} style={{ padding: "10px 12px", borderBottom: `2px solid ${C.gold}40`, color: C.gold, textAlign: "left", fontWeight: 600, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stakeholders.map(s => (
              <tr key={s}>
                <td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}`, color: C.textPrimary, fontWeight: 600, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.88rem" }}>{s}</td>
                {principles.map(p => {
                  const key = `${s}-${p}`;
                  const isOpen = cells[key];
                  return (
                    <td key={p}
                      onClick={() => setCells(prev => ({ ...prev, [key]: !prev[key] }))}
                      style={{
                        padding: "10px 12px", borderBottom: `1px solid ${C.border}`,
                        cursor: "pointer", transition: "background 0.2s",
                        background: isOpen ? `${C.teal}0c` : "transparent",
                      }}>
                      {isOpen
                        ? <span style={{ color: C.textSecondary, fontSize: "0.82rem", lineHeight: 1.5 }}>{prompts[key]}</span>
                        : <span style={{ color: C.textMuted, fontSize: "0.78rem" }}>tap to reflect ›</span>
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ color: C.textMuted, fontSize: "0.76rem", marginTop: 10, fontStyle: "italic" }}>
        Adapted from the ethical matrix approach described in "Navigating the AI Frontier in Education" (Zinn). The original framework draws on Mepham's ethical matrix for applied ethics.
      </p>
    </div>
  );
}

export default function AIEthics({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Policy · Philosophy · Evidence</SectionLabel>
          <SectionTitle>AI Ethics in Education</SectionTitle>
          <Subtitle>Moving from vague ethical aspirations to actionable philosophical frameworks. The landscape has shifted dramatically since 2024 — with UNESCO's first global competency framework, the EU AI Act classifying education as high-risk, NYC's traffic-light policy, and mounting evidence that both automation and detection tools have significant limits.</Subtitle>
          <ReadingTime minutes={12} />
        </FadeIn>

        {/* Key stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 32 }}>
          <FadeIn delay={0.05}><StatCounter value={92} suffix="%" label="UK undergraduates using AI tools" subtitle="HEPI 2025 (up from 66% in 2024)" color={C.teal} /></FadeIn>
          <FadeIn delay={0.08}><StatCounter value={86} suffix="%" label="Students globally using AI in studies" subtitle="Digital Education Council, 2024" color={C.gold} /></FadeIn>
          <FadeIn delay={0.11}><StatCounter value={33} suffix="+" label="U.S. states with official AI guidance" subtitle="as of late 2025" color={C.ocean} /></FadeIn>
          <FadeIn delay={0.14}><StatCounter value={35} suffix="M €" label="Maximum EU AI Act fine" subtitle="or 7% of global turnover" color={C.coral} /></FadeIn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 32 }}>
          <TopicCard icon="⚖️" title="From Ambiguity to Action" desc="Why 'uphold ethics' isn't a policy. Utilitarianism, deontology, virtue ethics, and thought experiments as policy tools — the funnel from value to practice." delay={0.06} accent={C.gold} onClick={() => navigate("ai-ambiguity-to-action")} />
          <TopicCard icon="🤖" title="The Paradox of AI in Education" desc="Assume the harder version: AI has matched human teachers. The interesting question isn't whether the machine can teach — it's what schools are for if it can." delay={0.1} accent={C.gold} onClick={() => navigate("ai-paradox")} />
          <TopicCard icon="📝" title="The AI Authorship Quandary" desc="A student turns in AI-assisted work. The teacher flags it. The parent defends it. The syllabus is silent. What good policy looks like — and the interactive scenario at the heart of it." delay={0.14} accent={C.gold} onClick={() => navigate("ai-authorship-quandary")} />
          <TopicCard icon="🧠" title="The Consciousness Line" desc="Current AI is probably not conscious, but fuzzy boundaries, organoids, and synthetic biology make ethical humility worth teaching." delay={0.18} accent={C.ocean} onClick={() => navigate("ai-consciousness")} />
          <TopicCard icon="👩‍🏫" title="Why AI Won't Replace Teachers — A Response" desc="A friendly disagreement with the standard defense. The conclusion is right, but capability arguments keep losing. The argument that survives the next iteration of the technology is values-based." delay={0.22} accent={C.gold} onClick={() => navigate("ai-replace-teachers")} />
        </div>

        <Narrow>
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.06}><EthicsQuiz /></FadeIn>

            <Divider label="The Core Philosophical Problem" />

            <FadeIn delay={0.06}>
              <Expandable title="The Is/Ought Problem in AI Education" defaultOpen tag="Foundation">
                <p>One of the most important philosophical distinctions in the AI debate is the difference between what AI <em>can</em> do and what it <em>ought</em> to do. David Hume identified this gap centuries ago: you cannot derive a moral "ought" from a factual "is."</p>
                <p style={{ marginTop: 12 }}>In education, this means that even if AI can grade papers faster, teach concepts more efficiently, and personalize learning better than any human teacher — it doesn't follow that schools should replace teachers with AI. The question requires engaging with values, not just capabilities.</p>
                <QuoteBlock
                  quote="We are discussing no small matter, but how we ought to live."
                  attribution="Socrates"
                  source="Plato, Republic"
                  color={C.gold}
                />
                <p>The integration of AI into education is precisely such a matter. When someone argues "AI is better at teaching math, so we should use AI to teach math," they are committing Hume's error — leaping from a descriptive claim to a normative one without justifying the values that bridge the gap.</p>
                <p style={{ marginTop: 12 }}>Sparrow and Flenady's 2025 paper "Bullshit Universities" (<em>AI & Society</em> 40, 5285–5296) articulates this clearly. Drawing on Harry Frankfurt's concept of "bullshit" — content produced without concern for truth — they argue:</p>
                <ol style={{ paddingLeft: 20, marginTop: 10, color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75 }}>
                  <li style={{ marginBottom: 8 }}>It would be misguided to replace teachers with AI that generates text without understanding.</li>
                  <li style={{ marginBottom: 8 }}>The history of automation in other industries shows it is naïve to think AI can assist teachers without eventually replacing them, because <strong>"money talks"</strong> — economic pressures will push institutions to cut costs.</li>
                  <li>The dream of AI teaching neglects three essential features: the importance of "learning how" for "learning that," teachers as role models, and the social nature of education.</li>
                </ol>
                <p style={{ marginTop: 12 }}>The paper explicitly invokes the is/ought distinction, acknowledging it <em>is possible</em> for computers to replace teachers but arguing they <em>ought not</em>. <a href="https://ethicalaiedu.wordpress.com/2024/02/14/response-to-why-ai-wont-replace-teachers/" target="_blank" rel="noopener noreferrer">My related blog post →</a></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Biesta's Three Purposes — What AI Cannot Deliver" color={C.ocean} tag="Framework">
                <p>Gert Biesta's framework (2010, 2014, 2020, 2022, 2024) identifies three purposes of education:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "14px 0" }}>
                  <ComparisonCard title="Qualification" color={C.teal} items={["Knowledge and skills", "Competencies for work and life", "What AI is best positioned to deliver"]} />
                  <ComparisonCard title="Socialization" color={C.gold} items={["Communicating norms and values", "Induction into communities of practice", "Requires shared human context"]} />
                  <ComparisonCard title="Subjectification" color={C.coral} items={["Becoming an autonomous subject of one's own life", "Freedom, ethical agency, 'beautiful risk'", "AI cannot provide this"]} />
                </div>
                <p>Biesta argues that if education serves only qualification and socialization, it risks becoming training or indoctrination. <strong>Subjectification</strong> — involving freedom, ethical agency, and the "beautiful risk" of education — requires interruption, existential confrontation, and irreducibly human encounter.</p>
                <p style={{ marginTop: 12 }}>Coelho et al. (2025, <em>British Educational Research Journal</em>) applied this directly to generative AI, arguing AI creates:</p>
                <ul style={{ marginTop: 8, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <li><strong>A "placebo effect"</strong> — the illusion of subjectification without authentic effort</li>
                  <li><strong>A "nocebo effect"</strong> — students' retreat from becoming autonomous subjects due to offloaded responsibility</li>
                </ul>
                <p style={{ marginTop: 12 }}>Subjectification is the "most misunderstood yet foundational dimension" — and it's exactly what's missing when AI bypasses the struggle of learning.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Global Policy Frameworks (2024–2026)" />

            <FadeIn delay={0.04}><PolicyTimelineDiagram /></FadeIn>

            <FadeIn delay={0.06}>
              <Expandable title="UNESCO's 2024–2025 Frameworks Crystallize" color={C.teal} tag="Global Standard">
                <p>UNESCO released a suite of foundational documents at <strong>Digital Learning Week 2025</strong> (September 2–5, Paris):</p>
                <ResearchCallout
                  year="Sept 2025"
                  title="AI and the Future of Education: Disruptions, Dilemmas and Directions"
                  finding="A 160+ page report identifying seven areas for action, from defining AI futures to tackling inequality. Argues AI adoption should be a deliberate choice, not treated as inevitable. Teachers are called 'the backbone of education.' Warns against hyper-personalization and excessive automation."
                  citation="UNESCO (2025)"
                  color={C.teal}
                />
                <QuoteBlock
                  quote="AI must recognize the incomputable nature of human learning."
                  attribution="UNESCO, AI and the Future of Education"
                  source="September 2025, 160+ pages"
                  color={C.teal}
                />
                <QuoteBlock
                  quote="Until we know, we're effectively experimenting on children."
                  attribution="Wayne Holmes"
                  source="Cited in UNESCO 2025 report"
                  color={C.coral}
                />
                <ResearchCallout
                  year="Sept 2025"
                  title="AI and Education: Protecting the Rights of Learners"
                  finding="Adopts a human-rights-based approach using UNESCO's 5C framework. Notes ~2.6 billion people still lack internet access; only 40% of primary schools globally have internet. Without safeguards — data protection, ethical frameworks, transparent governance — the right to education is at risk."
                  citation="UNESCO, UNESDOC: ark:/48223/pf0000395373"
                  color={C.teal}
                />
                <ResearchCallout
                  year="Sept 2024"
                  title="AI Competency Framework for Teachers (First Ever)"
                  finding="Authored by Fengchun Miao and Mutlu Cukurova (UCL), defines 15 competencies across 5 dimensions (human-centred mindset, ethics of AI, AI foundations, AI pedagogy, professional development) with three progression levels: Acquire → Deepen → Create. A parallel framework for students covers 4 domains."
                  citation="UNESDOC: ark:/48223/pf0000391104"
                  color={C.gold}
                />
                <ResearchCallout
                  year="April 2026"
                  title="AI Education Observatory Launched"
                  finding="UNESCO launched an Observatory on Artificial Intelligence in Education for Latin America and the Caribbean, expanding global monitoring capacity."
                  color={C.ocean}
                />
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="NYC's Traffic Light Framework — The U.S. Template" color={C.gold} tag="District Policy">
                <p>NYC Public Schools (March 24, 2026) released the most detailed U.S. district AI policy after 25 rounds of feedback with 1,000+ stakeholders. The framework uses traffic-light categories:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="🔴 RED — Prohibited" color={C.coral} items={["AI-driven decisions on placement, discipline, graduation", "IEP determinations", "Student surveillance", "Replacing educator judgment in high-stakes contexts"]} />
                  <ComparisonCard title="🟡 YELLOW — Conditional" color={C.gold} items={["Use with active educator judgment", "Requires training and awareness of limitations", "Must pass 10-step data privacy review (ERMA)"]} />
                  <ComparisonCard title="🟢 GREEN — Approved" color={C.teal} items={["Lesson planning support", "Text leveling for accessibility", "Initial drafts that educators then refine", "Data privacy review still required"]} />
                </div>
                <p>All AI tools must pass a 10-step data privacy review (ERMA). The explicit principle throughout: AI cannot do a teacher's job — it can support it.</p>
                <p style={{ marginTop: 12 }}><strong>The broader state landscape:</strong></p>
                <ul style={{ marginTop: 8, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.75 }}>
                  <li><strong>Ohio (HB 96, August 2025)</strong> — Mandated formal AI policies for every public district by July 1, 2026</li>
                  <li><strong>Tennessee (March 2024)</strong> — First state to legally require all districts to publicly post AI use policies</li>
                  <li><strong>LAUSD (January 2026)</strong> — Introduced AI literacy curriculum in grades 6–12; adopted cautious stance after AllHere vendor collapse</li>
                  <li><strong>Chicago Public Schools</strong> — Designated 2024–25 as a "learning year"; full integration planned 2025–26</li>
                  <li><strong>White House (April 2025)</strong> — Executive Order "Advancing Artificial Intelligence Education for American Youth" established White House Task Force; "Pledge to America's Youth" secured 200+ tech company commitments</li>
                </ul>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="The EU AI Act Makes Education High-Risk" color={C.ocean} tag="Regulation">
                <p>The EU AI Act (Regulation (EU) 2024/1689, in force August 1, 2024) classifies education as a <strong>high-risk domain</strong> under Annex III. Four specific use cases are regulated:</p>
                <ol style={{ paddingLeft: 20, marginTop: 10, color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75 }}>
                  <li style={{ marginBottom: 6 }}>AI systems determining access/admission to educational institutions</li>
                  <li style={{ marginBottom: 6 }}>Evaluating learning outcomes</li>
                  <li style={{ marginBottom: 6 }}>Assessing appropriate education level</li>
                  <li>Monitoring/detecting prohibited behavior during tests</li>
                </ol>
                <p style={{ marginTop: 14 }}><strong>Key provisions:</strong></p>
                <ul style={{ marginTop: 6, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <li>Requirements include risk management, data governance, human oversight, and accuracy standards</li>
                  <li>Fines up to <strong>€35 million or 7% of global turnover</strong></li>
                  <li><strong>Emotion recognition systems banned in educational institutions</strong> (effective February 2, 2025) — classified as "unacceptable risk"</li>
                  <li>Article 4 mandates AI literacy for all staff deploying AI systems</li>
                </ul>
                <ResearchCallout
                  year="2025"
                  title="The Act Converts Ethical Aspirations to Enforceable Obligations"
                  finding="Saarela, Gunaserka, and Karimov (DESRIST 2025, Springer LNCS, pp. 36–50) argue the Act establishes education as a 'special-protection domain' similar to healthcare — shifting the conversation from voluntary ethics to regulated compliance."
                  citation="Saarela et al., 'The EU AI Act: Implications for Ethical AI in Education' (2025)"
                  color={C.ocean}
                />
                <p style={{ marginTop: 12 }}>For U.S. educators, the EU Act foreshadows the direction global regulation is heading. Even where it doesn't directly apply, it provides the most mature regulatory framework worth studying.</p>
              </Expandable>
            </FadeIn>

            <Divider label="The Evidence" />

            <FadeIn delay={0.06}>
              <Expandable title="What the Research Actually Says (2024–2026)" color={C.teal} tag="Evidence">
                <p>The evidence is simultaneously encouraging and cautionary:</p>
                <ResearchCallout
                  year="2025"
                  title="Moderate Positive Effects Overall"
                  finding="A meta-analysis in Educational Research Review (68 studies, 337 effect sizes, PRISMA guidelines) found a moderate positive overall effect (SMD = 0.45, 95% CI [0.43, 0.47]) for GenAI-supported interventions. But effects vary significantly by discipline, level, and instructional context."
                  color={C.teal}
                />
                <ResearchCallout
                  year="Oct 2025"
                  title="Productivity Gains ≠ Learning Gains"
                  finding="Microsoft Research (Walker & Vorvoreanu) warned that GenAI can boost task completion without boosting learning. Students became overconfident about mastery. GenAI impaired memory formation when used without scaffolding."
                  color={C.coral}
                />
                <ResearchCallout
                  year="2024"
                  title="High School Math Scores Dropped 17%"
                  finding="Bastani et al. found high school math students scored 17% lower after using GenAI — suggesting AI use without careful integration can actively harm learning, not merely fail to help it."
                  color={C.coral}
                />
                <ResearchCallout
                  year="2026"
                  title="Mixed Evidence Confirmed"
                  finding="A systematic review by Hon (Journal of Educational Technology Systems, SAGE) confirmed mixed evidence: increased engagement in some contexts but over-reliance and variable effectiveness in others. The context of use matters more than the tool itself."
                  color={C.gold}
                />
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="AI Detection Is Fundamentally Unreliable — and Biased" color={C.coral} tag="Urgent">
                <p>Multiple rigorous studies confirm AI detection tools have structural limitations that should make anyone uneasy about punitive use:</p>
                <ResearchCallout
                  year="2023"
                  title="Detectors Are Biased Against Non-Native English Writers"
                  finding="A Stanford study by Liang et al. (Patterns) found detectors misclassified 61% of non-native English writing as AI-generated. ESL submissions were up to 30% more likely to be falsely flagged in 2024 follow-up studies. Neurodivergent students (autism, ADHD, dyslexia) face disproportionate flagging."
                  citation="Liang, W. et al. (2023). Patterns."
                  color={C.coral}
                />
                <ResearchCallout
                  year="2025"
                  title="Paraphrasing Defeats Detection by >20%"
                  finding="The JISC 2025 assessment found mainstream paid tools (Turnitin, CopyLeaks) report false positive rates of ~1–2% for unmodified AI text, but paraphrasing reduces detection accuracy by more than 20%. Students who cheat most effectively are least likely to be caught."
                  color={C.coral}
                />
                <p style={{ marginTop: 14 }}><strong>Institutional response:</strong></p>
                <ul style={{ marginTop: 6, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <li>At least <strong>12 major universities</strong> (Yale, Johns Hopkins, Vanderbilt, Waterloo) have disabled Turnitin's AI detection</li>
                  <li>Education Week reported Black students are disproportionately falsely accused</li>
                  <li>New York City reversed its ChatGPT ban after recognizing prohibition was neither effective nor productive</li>
                  <li>OpenAI itself stated detection tools are "not reliable enough given that educators could be making judgments about students with potentially lasting consequences"</li>
                </ul>
                <QuoteBlock
                  quote="To cheat or not to cheat is no longer the question; the semantics of cheating misses the larger picture of what this means for the pedagogical process."
                  attribution="Salman Khan"
                  source="Brave New Words (2024)"
                  color={C.gold}
                />
                <p>The productive approach: reframe the question. Not "how do we catch cheaters?" but <strong>"what do we actually want from and for our students?"</strong> That's a question about values — which means it belongs to philosophy, not software.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="Student AI Use Is Near-Universal" color={C.gold} tag="Scale">
                <p>Any policy built around prohibition is fighting a losing battle. The numbers are overwhelming:</p>
                <ResearchCallout
                  year="2025"
                  title="UK Undergraduates: 92% Using AI"
                  finding="The HEPI Student Generative AI Survey 2025 found 92% of UK undergraduates use AI tools (up from 66% in 2024), with 88% using GenAI for assessment preparation (up from 53%)."
                  color={C.teal}
                />
                <ResearchCallout
                  year="2024"
                  title="Global: 86% of Students Use AI"
                  finding="The Digital Education Council Global Survey reported 86% of students globally use AI in studies, with 54% using it weekly."
                  color={C.teal}
                />
                <ResearchCallout
                  year="Dec 2025"
                  title="AI Homework Use Grew 48% → 62% in 7 Months"
                  finding="A RAND study found student AI homework use grew from 48% to 62% in seven months — but 60% expressed concern about AI's impact on their own critical thinking. Students themselves are worried."
                  color={C.gold}
                />
                <ResearchCallout
                  year="July 2025"
                  title="Why Students Violate AI Policies"
                  finding="The Inside Higher Ed/Generation Lab survey (1,047 students, 166 institutions) found top reasons for policy-violating AI use: grade pressure (37%), time pressure (27%), and indifference to policies (26%). The drivers are structural — policies alone won't fix them."
                  color={C.ocean}
                />
                <p style={{ marginTop: 12 }}>The implication is clear: policies must help students use AI well, not pretend they won't use it at all.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Building Policy That Works" />

            <FadeIn delay={0.06}>
              <Expandable title="Building Ethical AI Policies That Actually Work" color={C.gold} defaultOpen>
                <p>Effective AI use policies must start with <strong>explicit value judgments grounded in normative ethical theory</strong> — not vague appeals to "responsibility." Here is the process I recommend:</p>
                <p style={{ marginTop: 12 }}><strong>1. Define your values using normative ethics.</strong> For example: "We ought to foster educational growth in our students." This is a value judgment — it requires philosophical justification. Which framework supports it? Utilitarianism (maximizing good outcomes)? Virtue ethics (cultivating character)? Deontological duty?</p>
                <p style={{ marginTop: 12 }}><strong>2. Test those values with thought experiments</strong> specific to your context. If you value transparency, does that mean students must disclose all AI use? What about spell-check? Grammar suggestions? Where is the line, and why? (<a href="#" onClick={(e) => { e.preventDefault(); navigate("thought-experiments"); }} style={{ color: C.teal }}>See my thought experiments page for worked examples →</a>)</p>
                <p style={{ marginTop: 12 }}><strong>3. Accept imperfection.</strong> Like the English language, your policy will never be perfect. Let go of the illusion that achieving perfection is possible and begin working with your team on common goals. As I tell my students: "We made it all up and we never have been and likely never will be perfect."</p>
                <p style={{ marginTop: 12 }}><strong>4. Involve stakeholders</strong> — educators, students, parents, and technology experts. NYC's 2026 AI policy went through 25 rounds of feedback with 1,000+ stakeholders. Multiple perspectives strengthen the framework.</p>
                <p style={{ marginTop: 12 }}><strong>5. Review continuously.</strong> Technology evolves faster than policy. Your policy must keep pace.</p>
                <p style={{ marginTop: 12 }}><a href="https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/" target="_blank" rel="noopener noreferrer">Read my full analysis on The Ethical Educator →</a></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Timeline of Key Policy Developments" color={C.ocean} tag="Context">
                <Timeline items={[
                  { year: "2021", title: "UNESCO Recommendation on AI Ethics", desc: "Adopted by 193 member states — the first global framework.", color: C.teal },
                  { year: "2023", title: "UNESCO Guidance for Generative AI in Education", desc: "First comprehensive guidance specifically on ChatGPT-era AI in classrooms.", color: C.teal },
                  { year: "March 2024", title: "Tennessee First State to Mandate AI Policies", desc: "First state to legally require all districts to publicly post AI use policies.", color: C.gold },
                  { year: "Aug 2024", title: "EU AI Act Enters Force", desc: "Education classified as high-risk domain. Begins regulatory transformation.", color: C.ocean },
                  { year: "Sept 2024", title: "UNESCO AI Competency Frameworks", desc: "First-ever global frameworks for teachers and students.", color: C.teal },
                  { year: "Feb 2025", title: "Emotion Recognition Banned in Schools (EU)", desc: "EU AI Act ban on emotion recognition systems takes effect.", color: C.coral },
                  { year: "April 2025", title: "U.S. Executive Order", desc: "Advancing Artificial Intelligence Education for American Youth — White House Task Force established.", color: C.gold },
                  { year: "Aug 2025", title: "Ohio HB 96", desc: "Mandated formal AI policies for every Ohio public district by July 2026.", color: C.gold },
                  { year: "Sept 2025", title: "UNESCO Digital Learning Week 2025", desc: "Two landmark reports released in Paris. 'AI must recognize the incomputable nature of human learning.'", color: C.teal },
                  { year: "Jan 2026", title: "LAUSD Cautious Update", desc: "AI literacy curriculum for grades 6–12 after AllHere vendor collapse.", color: C.ocean },
                  { year: "March 2026", title: "NYC Traffic Light Policy", desc: "Most detailed U.S. district AI policy — built through 25 rounds of stakeholder feedback.", color: C.gold },
                  { year: "April 2026", title: "UNESCO Observatory Launched", desc: "Regional observatory for Latin America and the Caribbean begins monitoring.", color: C.teal },
                ]} />
              </Expandable>
            </FadeIn>

            {/* ═══════════════════════════════════════════════════
                Navigating the AI Frontier — from Gamma #5
            ═══════════════════════════════════════════════════ */}

            <Divider label="Navigating the AI Frontier" />

            <FadeIn delay={0.06}>
              <Expandable title="What Educators Are Actually Worried About" color={C.coral} tag="Educator Concerns">
                <p>Surveys and professional development sessions surface the same concerns repeatedly. These aren't abstract anxieties — they represent genuine structural barriers to thoughtful AI adoption. Any ethical framework that ignores them is incomplete.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Professional Identity" color={C.coral} items={[
                    "Fear of being replaced or deskilled",
                    "Pressure to reskill without adequate time or support",
                    "Uncertainty about what 'good teaching' means in an AI-saturated environment",
                  ]} />
                  <ComparisonCard title="Data & Privacy" color={C.ocean} items={[
                    "Student data flowing to third-party platforms",
                    "Lack of transparency about how AI models use classroom interactions",
                    "No clear data governance frameworks at the district level",
                  ]} />
                  <ComparisonCard title="Access & Equity" color={C.gold} items={[
                    "Technology access gaps widening existing inequities",
                    "Digital divide between well-resourced and under-resourced schools",
                    "Students who can't afford home internet fall further behind",
                  ]} />
                </div>
                <p>Two additional concerns surface persistently: <strong>over-dependence</strong> (students losing the capacity for independent thinking) and <strong>deepfakes</strong> (the erosion of trust when any image, audio, or video can be fabricated). Both are fundamentally about the same thing — the relationship between technology and human judgment.</p>
                <p style={{ marginTop: 12 }}>The pattern across these concerns is instructive. None of them can be resolved by technical solutions alone. Each one requires a normative judgment about what education is <em>for</em> — which brings us back to ethical frameworks.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Seven Principles for Ethical AI — Mapped to Philosophical Traditions" color={C.teal} tag="Framework">
                <p>Rather than adopting a single ethical theory and applying it universally, a pluralistic approach maps each principle to the philosophical tradition that grounds it most naturally. This framework emerged from professional development work with K–12 educators and draws on classical and contemporary moral philosophy.</p>

                <div style={{ margin: "16px 0" }}>
                  {[
                    { principle: "Transparency", tradition: "Kantian Ethics", color: C.teal,
                      desc: "AI systems should be explainable and their limitations openly communicated. Kant's categorical imperative demands we treat people as ends, never merely as means — which requires honesty about what AI does with student data and how it reaches its conclusions." },
                    { principle: "Integrity", tradition: "Aristotelian Virtue Ethics", color: C.gold,
                      desc: "AI should be used in ways that cultivate intellectual honesty and good character. Aristotle held that virtues are developed through practice — if AI shortcuts the practice, it may shortcut the virtue. The question is whether AI use builds or erodes the habits of a well-educated person." },
                    { principle: "Equity", tradition: "Rawlsian Justice", color: C.ocean,
                      desc: "AI tools must not deepen existing disparities. Rawls's difference principle holds that inequalities are only justified if they benefit the least advantaged. An AI tool that helps affluent students while leaving others behind fails this test — regardless of how impressive the technology is." },
                    { principle: "Privacy", tradition: "Lockean Rights", color: C.coral,
                      desc: "Students have a right to control their personal data. Locke's natural rights framework — extended to the digital context — means that consent must be informed, data collection must be proportionate, and students (and parents) must understand what is being gathered and why." },
                    { principle: "Critical Thinking", tradition: "Utilitarian Analysis", color: C.teal,
                      desc: "AI should be deployed where it maximizes genuine learning outcomes, not just task completion. A utilitarian lens asks: does this AI tool produce the greatest educational good for the greatest number? The Bastani et al. findings — 48–127% practice boosts but performance fading on tests — suggest the calculus is not straightforward." },
                    { principle: "Human Oversight", tradition: "Existentialist Responsibility (Sartre, de Beauvoir)", color: C.gold,
                      desc: "Humans must retain meaningful decision-making authority over AI. Sartre's insistence that we are 'condemned to be free' — that we cannot abdicate responsibility for our choices — applies directly. Delegating educational judgment to an algorithm is a choice, and educators bear responsibility for making it." },
                    { principle: "Environmental Responsibility", tradition: "Sustainability Ethics", color: C.green || C.teal,
                      desc: "The computational cost of AI — energy consumption, water usage for cooling data centers, electronic waste — must be weighed against its educational benefits. Training a single large language model can emit as much carbon as five cars over their lifetimes. This is an ethical consideration that belongs in the conversation." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: `${item.color}08`, border: `1px solid ${item.color}25`,
                      borderRadius: 12, padding: "14px 18px", marginBottom: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontWeight: 700, fontSize: "0.95rem" }}>{i + 1}. {item.principle}</span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textMuted }}>grounded in {item.tradition}</span>
                      </div>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p>The value of this mapping is that it makes the philosophical commitments explicit. When a school board says "we value transparency," they are implicitly invoking Kant. When they say "we value equity," they are implicitly invoking Rawls. Making these connections visible helps educators reason more clearly about trade-offs — because different traditions sometimes pull in different directions.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="The Ethical Matrix — A Tool for Applied Deliberation" color={C.gold} tag="Activity">
                <p>Abstract principles become actionable when tested against concrete stakeholder impacts. The ethical matrix — adapted from Ben Mepham's work in bioethics — provides a structured way to do this. It cross-references <strong>stakeholder groups</strong> (students, teachers, parents/community) against <strong>ethical dimensions</strong> (wellbeing, autonomy, fairness) to surface tensions that broad principles alone can't capture.</p>
                <p style={{ marginTop: 12 }}>For example, an AI tutoring system might score well on student wellbeing (personalized pacing) but poorly on teacher autonomy (if the system prescribes what gets taught next) and ambiguously on community fairness (if only some families can access it at home).</p>
                <EthicalMatrix />
                <p style={{ marginTop: 10 }}>The matrix doesn't produce a single "right answer." Its purpose is to make hidden trade-offs visible so that the people making decisions — educators, administrators, families — can do so with their eyes open.</p>
              </Expandable>
            </FadeIn>

            <Divider label="AI in the Classroom — What's Working" />

            <FadeIn delay={0.06}>
              <Expandable title="Case Studies: AI Tools Educators Should Know" color={C.ocean} tag="Practice">
                <p>The theoretical frameworks above need grounding in real products that educators encounter. Each of these tools illustrates different ethical trade-offs — and each sits at a different point along the autonomy-versus-automation spectrum.</p>

                <div style={{ margin: "16px 0" }}>
                  {[
                    { name: "Khan Academy / Khanmigo", color: C.teal,
                      what: "AI-powered tutoring assistant built on GPT-4, designed to guide rather than answer. Students interact through Socratic dialogue — the system asks questions rather than providing solutions directly.",
                      ethics: "Represents the strongest available model for AI that preserves student agency. But: access requires a subscription (equity concern), and the effectiveness data is still preliminary. Salman Khan's vision — articulated in Brave New Words — is that AI should provide every student with a personal tutor, but the question of whether a chatbot can replace the human relationship at the heart of tutoring remains open." },
                    { name: "Duolingo Max", color: C.gold,
                      what: "Language learning app using GPT-4 for roleplay conversations and mistake explanations. The AI adapts to individual learner pace and provides context-sensitive feedback.",
                      ethics: "Strong on qualification (language skill building) but operates entirely outside the socialization and subjectification dimensions. Language learning involves cultural context, shared practice, and identity — dimensions AI can support but not deliver independently." },
                    { name: "Amira Learning", color: C.coral,
                      what: "AI-driven reading assistant for K–5 students. Listens to students read aloud, identifies specific decoding errors, and provides targeted intervention. Has demonstrated measurable reading-level gains.",
                      ethics: "One of the clearest cases where AI augments rather than replaces human teaching. The tool handles the repetitive listening work, freeing teachers for higher-order instruction. Equity concern: requires device access and reliable audio input." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${item.color}`, borderRadius: 10,
                      padding: "16px 20px", marginBottom: 12,
                    }}>
                      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{item.name}</h4>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 8 }}><strong>What it does:</strong> {item.what}</p>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}><strong>The ethical picture:</strong> {item.ethics}</p>
                    </div>
                  ))}
                </div>
                <p>The common thread across these tools: the ones that work best ethically are the ones designed to keep the human — student or teacher — in the loop. The ones that raise the most concern are those that optimize for efficiency at the expense of agency.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="The Unrestricted-AI Problem — When More Practice Doesn't Mean More Learning" color={C.coral} tag="Evidence">
                <p>One of the most important findings in recent AI-in-education research comes from Bastani et al., who studied high school math students given access to AI tutoring tools. The results were paradoxical:</p>
                <ResearchCallout
                  year="2024"
                  title="Practice Up, Performance Down"
                  finding="Students using unrestricted AI assistance increased their practice volume by 48–127%. But when tested without AI access, their performance dropped — suggesting the AI was doing the cognitive work, and the students were not building durable understanding."
                  citation="Bastani et al. (2024)"
                  color={C.coral}
                />
                <p style={{ marginTop: 12 }}>This finding challenges the intuition that "more practice = more learning." It matters what kind of practice. If AI removes the productive struggle — the point where genuine learning happens — then the practice is hollow. Students may <em>feel</em> more competent while actually becoming less so.</p>
                <p style={{ marginTop: 12 }}>The implication for educators: AI tools should be designed (or configured) to scaffold thinking rather than replace it. A tutoring system that asks "what do you think the next step is?" before revealing the answer preserves struggle. One that simply shows the solution does not.</p>
                <QuoteBlock
                  quote="What we want is for every student to have access to a personal tutor and for every teacher to have a teaching assistant."
                  attribution="Salman Khan"
                  source="Brave New Words (2024)"
                  color={C.gold}
                />
                <p>Khan's aspiration is the right one. The question is implementation: does the AI actually tutor (ask questions, probe understanding, hold back answers), or does it merely dispense information? The difference matters enormously.</p>
              </Expandable>
            </FadeIn>

            <Divider label="Looking Ahead" />

            <FadeIn delay={0.06}>
              <Expandable title="Five Frontiers — Where AI in Education Is Heading" color={C.ocean} tag="Horizon">
                <p>The trajectory of AI in education is not a single line — it is several concurrent developments, each with distinct ethical implications. Five areas deserve particular attention from educators thinking about the next three to five years.</p>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { area: "Predictive Analytics", icon: "📊", color: C.teal,
                      desc: "AI systems that identify at-risk students before they fail — using attendance patterns, engagement data, and performance trends. Ethically promising (early intervention saves students) but fraught with privacy and labeling concerns. The line between helpful prediction and surveillance is thin." },
                    { area: "Hyper-Personalization", icon: "🎯", color: C.gold,
                      desc: "AI that adapts content, pace, and difficulty to each individual learner in real time. UNESCO has explicitly warned against excessive personalization — arguing it can isolate students from the shared experience of learning and reduce education to content delivery." },
                    { area: "Virtual Learning Environments", icon: "🌐", color: C.ocean,
                      desc: "AI-generated simulations, virtual labs, and immersive experiences. Enormous potential for subjects where physical resources are scarce (science labs, field trips, historical reenactments). The equity question: who gets the VR headsets?" },
                    { area: "AI Tutoring at Scale", icon: "🤖", color: C.coral,
                      desc: "The Khanmigo model extended to every subject and grade level. If it works as intended, it represents the most significant democratization of educational access since the public library. If it doesn't — if the tutoring is shallow or the Socratic dialogue is performative — it represents the most significant waste of educational promise." },
                    { area: "Administrative Efficiency", icon: "⚙️", color: C.textMuted,
                      desc: "AI handling scheduling, report generation, parent communication drafts, and compliance paperwork. Ethically the least controversial application — and possibly the most immediately valuable, because it returns time to teachers for actual teaching." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>{item.area}</h4>
                        <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="The Thought Experiments — Pressure-Testing Your Convictions" color={C.gold} tag="Practice">
                <p>Ethical frameworks become real when they encounter hard cases. Three thought experiments from the "Navigating the AI Frontier" presentation are designed to surface disagreements within educator teams — not to resolve them, but to make the underlying values visible.</p>
                <div style={{ margin: "16px 0" }}>
                  <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 10 }}>
                    <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "0.95rem", fontWeight: 600, marginBottom: 6 }}>The AI Authorship Quandary</h4>
                    <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>A student submits an essay entirely written by AI. The parent defends it, arguing the student "directed" the AI. The essay is the best work the student has ever produced. What do you do — and more importantly, <em>why</em>?</p>
                  </div>
                  <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 10 }}>
                    <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.teal, fontSize: "0.95rem", fontWeight: 600, marginBottom: 6 }}>The Reluctant Educator</h4>
                    <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>A veteran teacher with 25 years of experience refuses to use any AI tools. Student outcomes in their class are strong. The administration mandates AI adoption for all teachers. Should the veteran be exempted — and on what grounds?</p>
                  </div>
                  <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
                    <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.ocean, fontSize: "0.95rem", fontWeight: 600, marginBottom: 6 }}>The Digital Doppelgänger</h4>
                    <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>An AI is trained on a beloved retired teacher's lectures, mannerisms, and grading style. Students love the AI version. The retired teacher is uncomfortable. Who has the stronger claim — the students who benefit, or the teacher whose identity was used?</p>
                  </div>
                </div>
                <p>These thought experiments are available in full on the <a href="#" onClick={(e) => { e.preventDefault(); navigate("thought-experiments"); }} style={{ color: C.teal }}>Thought Experiments page</a>, where each includes structured discussion prompts and connections to specific ethical frameworks.</p>
              </Expandable>
            </FadeIn>

            {/* ═══════════════════════════════════════════════════
                Foundations for Leadership Discussion — from Gamma #20 + #35
            ═══════════════════════════════════════════════════ */}

            <Divider label="Foundations for Leadership Discussion" />

            <FadeIn delay={0.06}>
              <Expandable title="Why Ethics, Not Just Compliance" color={C.teal} tag="Foundation">
                <p>Compliance asks "Is this allowed?" Ethics asks "Is this right?" The two questions overlap, but they are not the same — and educational leaders who treat them as identical end up reactive instead of principled. Ethics goes beyond legality: something can be permitted and still corrode the educational mission.</p>
                <p style={{ marginTop: 12 }}>Ethics provides a toolkit for evaluating AI implementation decisions. Three traditions show up most often in education debates:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "14px 0" }}>
                  <ComparisonCard title="Consequentialism" color={C.teal} items={[
                    "Evaluates outcomes — does the AI produce more good than harm?",
                    "Useful when assessing AI grading's impact on student motivation, confidence, or growth.",
                  ]} />
                  <ComparisonCard title="Rights-Based Approaches" color={C.gold} items={[
                    "Centers privacy, autonomy, and informed consent in AI interactions.",
                    "Asks what students and parents have a right to — independent of outcomes.",
                  ]} />
                  <ComparisonCard title="Justice & Fairness" color={C.ocean} items={[
                    "Addresses algorithmic bias and equity of access.",
                    "Asks whether benefits and burdens are distributed fairly across the community.",
                  ]} />
                </div>
                <p>The <strong>Jisc Ethical Framework</strong> offers guidance tailored to AI applications in education — applying these traditions to concrete deployment questions like data governance, classroom transparency, and stakeholder consultation. It is one of the more usable starting points for leaders who want a structured ethics toolkit rather than a list of slogans.</p>
                <p style={{ marginTop: 12 }}>The practical implication: "applied tech ethics" — fairness, transparency, accountability — is not a checklist but a system of trade-offs. A tool may score well on transparency and poorly on equity. Leaders need a framework that lets them name those trade-offs honestly, not just resolve them with a rubber stamp.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Why AI Is Different from Prior Technological Transitions" color={C.gold} tag="Context">
                <p>One of the most common arguments for calm in the AI conversation is that prior technological transitions also looked alarming and ultimately reshaped — rather than eliminated — work. The Industrial Revolution, agricultural mechanization, and the digital transformation are all cited as evidence that adaptation is possible.</p>
                <Timeline items={[
                  { year: "Industrial Revolution", title: "Mechanical Looms", desc: "Replaced an estimated 98% of manual weaving work — but textile employment overall persisted in different forms.", color: C.ocean },
                  { year: "200-Year Arc", title: "Agricultural Automation", desc: "Farming workforce shrank from roughly 83% of laborers to 2%. The economy reorganized around higher-order activities, but the transition spanned generations.", color: C.gold },
                  { year: "Late 20th Century", title: "Digital Transformation", desc: "Word processors and spreadsheets transformed administrative roles without eliminating them — clerical work moved up the cognitive ladder.", color: C.teal },
                ]} />
                <p style={{ marginTop: 12 }}>The complacent reading is that AI is "just another transition." But four features distinguish it:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "14px 0" }}>
                  <ComparisonCard title="Implementation Speed" color={C.coral} items={[
                    "Months versus decades for previous technologies.",
                    "Educators who started 2024 with no AI policy entered 2026 inside one — without time to deliberate.",
                  ]} />
                  <ComparisonCard title="Cognitive Automation" color={C.gold} items={[
                    "Prior waves automated muscle and routine.",
                    "AI affects analysis, writing, and judgment — the work education is meant to develop.",
                  ]} />
                  <ComparisonCard title="Democratized Access" color={C.teal} items={[
                    "Powerful tools available to almost anyone with a browser.",
                    "The tool is in the student's pocket; school policy applies only on paper.",
                  ]} />
                  <ComparisonCard title="Educational Impact" color={C.ocean} items={[
                    "An estimated 27% of teaching tasks are potentially automatable.",
                    "The question isn't whether AI touches teaching — it's which 27%, and who decides.",
                  ]} />
                </div>
                <p>Historical parallels are useful as cautionary tales — they remind us that transitions can be managed and that doom-saying is rarely accurate. But the speed, scope, and target of the AI transition are genuinely new. Treating it as ordinary risks under-preparing for the actual shift.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="Discussion Prompts for Leadership Teams" color={C.ocean} tag="Practice">
                <p>Translating principles into practice requires structured conversation. The following four prompts — designed for use in leadership PD sessions — have surfaced productive disagreement across multiple cohorts of school administrators. Used well, they reveal the values a team holds without realizing it.</p>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { num: "1", title: "AI's Impact on Academic Integrity", prompt: "How is AI currently being used by students in ways that might compromise academic integrity — and what should each school's first response be: prohibition, integration, or something else?", color: C.coral },
                    { num: "2", title: "Challenges to Traditional Assessment", prompt: "What specific challenges does AI pose to traditional methods of assessing student learning and performance? Which existing assessments still produce useful evidence of learning, and which need to be rebuilt?", color: C.gold },
                    { num: "3", title: "Detection and Prevention Strategies", prompt: "What strategies or technologies can be implemented to detect or prevent AI-assisted cheating — and given the limits of detection tools, where should the locus of effort actually sit (assessment design, classroom culture, policy, something else)?", color: C.ocean },
                    { num: "4", title: "Balancing Benefits with Integrity", prompt: "How can educators balance the benefits of AI tools for learning with the need to maintain academic integrity? What does a policy that does both — rather than choosing one — look like in practice?", color: C.teal },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{
                        flexShrink: 0,
                        width: 28, height: 28, borderRadius: "50%",
                        background: `${item.color}20`, border: `1px solid ${item.color}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: item.color, fontWeight: 700, fontSize: "0.85rem",
                      }}>{item.num}</span>
                      <div>
                        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>{item.title}</h4>
                        <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65 }}>{item.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>A leadership group that agrees on policy language but disagrees on Prompt 3 ("where should the locus of effort actually sit") doesn't actually agree on policy. The prompts are designed to expose those disagreements before they become operational problems.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.06}>
              <Expandable title="Case Study: Alex, Jordan, and Taylor" color={C.gold} tag="Case Study">
                <p>The following case is designed for leadership discussion. It deliberately leaves the moral evaluation underspecified — different ethical frameworks will yield different verdicts, and that is the point. Three students each submitted excellent work, but their approaches to learning varied:</p>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { name: "Alex", color: C.teal,
                      desc: "Used AI as a brainstorming partner early in the process — generating prompts, surfacing counterarguments — but did the writing and analysis themselves. Discloses AI use. Can explain every choice in the work when asked." },
                    { name: "Jordan", color: C.gold,
                      desc: "Used AI to draft each section, then edited and personalized the output. Discloses AI use. Cannot reliably explain key choices when asked, because the choices originated with the model." },
                    { name: "Taylor", color: C.coral,
                      desc: "Generated the work almost entirely by AI with minimal review. Does not disclose AI use. The submission passes detection tools." },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${item.color}`, borderRadius: 10,
                      padding: "12px 16px", marginBottom: 10,
                    }}>
                      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color, fontSize: "0.95rem", fontWeight: 600, marginBottom: 6 }}>{item.name}</h4>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p>Three structured questions for discussion:</p>
                <ol style={{ paddingLeft: 20, marginTop: 8, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <li style={{ marginBottom: 8 }}><strong>Assessing true understanding.</strong> What assessment strategies — beyond the submitted artifact — would surface the difference between Alex, Jordan, and Taylor? Oral defenses? In-class follow-ups? Process journals?</li>
                  <li style={{ marginBottom: 8 }}><strong>Adapting policies.</strong> A single policy must be fair to all three. Is "disclosed AI use is acceptable" enough, or does the policy also need to address depth of engagement?</li>
                  <li><strong>Building trust.</strong> What role does transparency about AI use play in building trust between students and staff — and how does the policy signal that trust, not enforcement, is the goal?</li>
                </ol>
                <p style={{ marginTop: 12 }}>The case has no single right answer. It is designed to make the team's actual operating values visible — including the ones the team did not realize it held.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="The Reflection That Matters Most" color={C.gold} tag="Closing">
                <QuoteBlock
                  quote='What would it take to confidently say, "This student has truly learned the material"?'
                  attribution="Closing reflection"
                  source="Academic Integrity in the Age of AI (discussion hub)"
                  color={C.gold}
                />
                <p>This is the question every other AI-in-education question eventually reduces to. Detection, policy, assessment design, professional development — all of these are means. The end is being able to say, with justification, that learning has happened.</p>
                <p style={{ marginTop: 12 }}>The honest answer is uncomfortable: in many traditional assessments, we never could say it confidently. AI didn't break the assessment system; it exposed assessments that were always proxying for learning rather than measuring it. Multiple-choice tests, formulaic essays, and book reports were vulnerable to substitution long before generative AI existed.</p>
                <p style={{ marginTop: 12 }}>What changes the answer:</p>
                <ul style={{ paddingLeft: 20, marginTop: 8, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.75 }}>
                  <li style={{ marginBottom: 6 }}><strong>Process visible alongside product.</strong> If the only artifact is the final draft, you cannot tell who learned what.</li>
                  <li style={{ marginBottom: 6 }}><strong>Performance under variation.</strong> A student who has truly learned can apply a concept in a new context, not just reproduce it in the original one.</li>
                  <li style={{ marginBottom: 6 }}><strong>Conversation, not just paperwork.</strong> A two-minute exchange about the work reveals more than a dozen pages of submitted text.</li>
                  <li><strong>Honesty about the question itself.</strong> "This student learned the material" is a value-laden judgment. AI hasn't made it harder to make — it has made it harder to avoid making.</li>
                </ul>
                <p style={{ marginTop: 12 }}>The action plan that follows from this reflection is unglamorous: revise policies, organize teacher training to adapt assessment practices, evaluate tools that address AI challenges. None of these are individually novel. What is novel is doing them with a coherent ethical framework underneath — so that the policies, assessments, and training all answer to the same value commitments.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                { id: "ai-consciousness", icon: "🧠", title: "The Consciousness Line", desc: "AI consciousness, organoids, and moral caution", color: C.coral },
                { id: "thought-experiments", icon: "🧪", title: "Thought Experiments", desc: "Work through the ethical dilemmas", color: C.gold },
                { id: "ai-education", icon: "🤖", title: "AI in Education", desc: "Tools, evidence, and practice", color: C.teal },
                { id: "for-educators", icon: "📋", title: "For Educators", desc: "Professional development resources", color: C.ocean },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
