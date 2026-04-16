import { useState } from "react";
import { C } from "../theme.js";
import {
  FadeIn, Expandable, TopicCard, useAudio, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ResearchCallout, QuoteBlock, StatCounter,
  Timeline, ComparisonCard, Divider
} from "../components/shared.jsx";

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

export default function AIEthics({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Policy · Philosophy · Evidence</SectionLabel>
          <SectionTitle>AI Ethics in Education</SectionTitle>
          <Subtitle>Moving from vague ethical aspirations to actionable philosophical frameworks. The landscape has shifted dramatically since 2024 — with UNESCO's first global competency framework, the EU AI Act classifying education as high-risk, NYC's traffic-light policy, and mounting evidence that both automation and detection tools have significant limits.</Subtitle>
        </FadeIn>

        {/* Key stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 32 }}>
          <FadeIn delay={0.05}><StatCounter value={92} suffix="%" label="UK undergraduates using AI tools" subtitle="HEPI 2025 (up from 66% in 2024)" color={C.teal} /></FadeIn>
          <FadeIn delay={0.08}><StatCounter value={86} suffix="%" label="Students globally using AI in studies" subtitle="Digital Education Council, 2024" color={C.gold} /></FadeIn>
          <FadeIn delay={0.11}><StatCounter value={33} suffix="+" label="U.S. states with official AI guidance" subtitle="as of late 2025" color={C.ocean} /></FadeIn>
          <FadeIn delay={0.14}><StatCounter value={35} suffix="M €" label="Maximum EU AI Act fine" subtitle="or 7% of global turnover" color={C.coral} /></FadeIn>
        </div>

        <div className="grid-3" style={{ marginTop: 32 }}>
          <TopicCard icon="⚖️" title="From Ambiguity to Action" desc="Why saying 'uphold ethics' isn't enough. Normative frameworks — utilitarianism, deontology, virtue ethics — with thought experiments designed for educators." delay={0.06} onClick={() => window.open("https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/", "_blank")} />
          <TopicCard icon="🤖" title="The Paradox of AI in Education" desc="Even if AI could perfectly replicate human teachers, should it? Shared humanity, communal learning, and the is/ought distinction at its most urgent." delay={0.1} onClick={() => window.open("https://ethicalaiedu.wordpress.com/2024/02/13/the-paradox-of-ai-in-education/", "_blank")} />
          <TopicCard icon="📝" title="The AI Authorship Quandary" desc="When a student submits AI-written work and the parent defends it — a thought experiment for navigating academic integrity in the age of AI." delay={0.14} onClick={() => navigate("thought-experiments")} />
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
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
