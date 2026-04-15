import { useState } from "react";
import { C } from "../theme.js";
import { FadeIn, Expandable, TopicCard, useAudio, SectionLabel, SectionTitle, Subtitle, Narrow, PageContainer, BodyText } from "../components/shared.jsx";

function EthicsQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const audio = useAudio();
  const questions = [
    { q: "A student uses AI to summarize a lesson and then studies the summary deeply. Is this ethical?", opts: ["Yes — AI enhanced learning", "No — the student didn't do the work", "It depends on school policy", "Only if the teacher knows"],
      explanation: "This aligns with using AI as a learning scaffold. The student engaged with material — AI served as a tool, not a replacement for thinking. But the answer depends on what values your school has explicitly committed to. A utilitarian perspective would focus on learning outcomes; a deontological perspective might emphasize the duty of transparency; virtue ethics would ask whether this cultivates intellectual honesty." },
    { q: "AI grading gives faster, more consistent feedback than a human teacher. Should schools mandate its use?", opts: ["Yes — students benefit from speed", "No — human judgment is irreplaceable", "Use both in parallel", "Let teachers decide"],
      explanation: "Each option reflects different values: efficiency (utilitarian), irreplaceable human connection (deontological), comprehensiveness, or teacher autonomy (virtue ethics). A 2025 meta-analysis found moderate positive effects from AI-supported feedback (SMD = 0.45), but Microsoft Research cautioned that 'productivity gains from GenAI ≠ learning gains.' NYC's 2026 AI policy prohibits AI-driven decisions on grading, placing this firmly in the 'Red' zone." },
    { q: "An AI perfectly replicates a teacher's personality and teaching style. Should it replace the teacher?", opts: ["Yes — if outcomes are equal", "Never — humans are irreplaceable", "Only for specific tasks", "This is the wrong question"],
      explanation: "As Matthew argues, the question isn't CAN AI replace teachers, but SHOULD it. Gert Biesta's framework distinguishes three purposes of education: qualification, socialization, and subjectification. AI might deliver qualification — but subjectification (becoming an autonomous moral agent) requires irreducibly human encounter. Sparrow and Flenady (2025) warn that economic pressures may override these normative arguments, making the philosophical case urgently practical." },
  ];
  const handleAnswer = (i) => { audio.playClick(); setAnswers([...answers, i]); if (current < questions.length - 1) setCurrent(current + 1); else setShowResult(true); };
  
  if (showResult) {
    return (
      <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, margin: "20px 0" }}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, marginBottom: 12 }}>Reflection</h4>
        {questions.map((q, i) => (<div key={i} style={{ marginBottom: 16 }}><p style={{ color: C.textPrimary, fontSize: "0.87rem", fontWeight: 600, marginBottom: 4 }}>{q.q}</p><p style={{ color: C.textMuted, fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>{q.explanation}</p></div>))}
        <button onClick={() => { setCurrent(0); setAnswers([]); setShowResult(false); }} style={{ padding: "8px 20px", background: C.gold, border: "none", borderRadius: 6, color: C.midnight, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>Try Again</button>
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
          <button key={i} onClick={() => handleAnswer(i)} style={{ padding: "10px 16px", textAlign: "left", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textSecondary, cursor: "pointer", fontSize: "0.88rem", transition: "all 0.2s" }}
            onMouseOver={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.textPrimary; }}
            onMouseOut={e => { e.target.style.borderColor = C.border; e.target.style.color = C.textSecondary; }}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

export default function AIEthics({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn><SectionLabel>Blog & Analysis</SectionLabel><SectionTitle>AI Ethics in Education</SectionTitle><Subtitle>Moving from vague ethical aspirations to actionable philosophical frameworks. From the is/ought problem to AI use policies — how philosophy can guide educators navigating the most consequential technological shift in the history of education.</Subtitle></FadeIn>

        <div className="grid-3" style={{ marginTop: 32 }}>
          <TopicCard icon="⚖️" title="From Ambiguity to Action" desc="Why saying 'uphold ethics' isn't enough. Normative frameworks — utilitarianism, deontology, virtue ethics — with thought experiments designed for educators." delay={0.06} onClick={() => window.open("https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/", "_blank")} />
          <TopicCard icon="🤖" title="The Paradox of AI in Education" desc="Even if AI could perfectly replicate human teachers, should it? Shared humanity, communal learning, and the is/ought distinction at its most urgent." delay={0.1} onClick={() => window.open("https://ethicalaiedu.wordpress.com/2024/02/13/the-paradox-of-ai-in-education/", "_blank")} />
          <TopicCard icon="📝" title="The AI Authorship Quandary" desc="When a student submits AI-written work and the parent defends it — a thought experiment for navigating academic integrity in the age of AI." delay={0.14} onClick={() => navigate("thought-experiments")} />
        </div>

        <Narrow>
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.06}><EthicsQuiz /></FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="The Is/Ought Problem in AI Education" defaultOpen>
                <p>One of the most important philosophical distinctions in the AI debate is the difference between what AI <em>can</em> do and what it <em>ought</em> to do. David Hume identified this gap centuries ago: you cannot derive a moral "ought" from a factual "is."</p>
                <p style={{ marginTop: 12 }}>In education, this means that even if AI can grade papers faster, teach concepts more efficiently, and personalize learning better than any human teacher — it doesn't follow that schools should replace teachers with AI. The question requires engaging with values, not just capabilities.</p>
                <p style={{ marginTop: 12 }}>As Socrates reminds us in Plato's <em>Republic</em>: "We are discussing no small matter, but how we ought to live." The integration of AI into education is precisely such a matter. When someone argues "AI is better at teaching math, so we should use AI to teach math," they are committing Hume's error — leaping from a descriptive claim to a normative one without justifying the values that bridge the gap.</p>
                <p style={{ marginTop: 12 }}>Matthew's blog post "Response to Why AI Won't Replace Teachers" examines this distinction in detail, arguing that the strongest case for keeping human teachers isn't that AI <em>can't</em> replace them (it increasingly can), but that it <em>shouldn't</em> — even when it is demonstrably capable. <a href="https://ethicalaiedu.wordpress.com/2024/02/14/response-to-why-ai-wont-replace-teachers/" target="_blank" rel="noopener noreferrer">Read the full post →</a></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="Building Ethical AI Policies That Actually Work">
                <p>Effective AI use policies must start with <strong>explicit value judgments grounded in normative ethical theory</strong> — not vague appeals to "responsibility." Here is the process Matthew recommends, drawing from normative ethics and real-world experience:</p>
                <p style={{ marginTop: 12 }}><strong>1. Define your values</strong> using normative ethics. For example: "We ought to foster educational growth in our students." This is a value judgment — it requires philosophical justification, not merely assertion. Which ethical framework supports it? Utilitarianism (maximizing good outcomes)? Virtue ethics (cultivating character)? Deontological duty?</p>
                <p style={{ marginTop: 12 }}><strong>2. Test those values with thought experiments</strong> specific to your context. If you value transparency, does that mean students must disclose all AI use? What about spell-check? Grammar suggestions? Where is the line, and why?</p>
                <p style={{ marginTop: 12 }}><strong>3. Accept imperfection.</strong> Like the English language, your policy will never be perfect. Let go of the illusion that achieving perfection is possible and begin working with your team on common goals. As Matthew tells his students: "We made it all up and we never have been and likely never will be perfect."</p>
                <p style={{ marginTop: 12 }}><strong>4. Involve stakeholders</strong> — educators, students, parents, and technology experts. NYC's 2026 AI policy went through 25 rounds of feedback with 1,000+ stakeholders. Multiple perspectives strengthen the framework.</p>
                <p style={{ marginTop: 12 }}><strong>5. Review continuously.</strong> Technology evolves faster than policy. Ohio's House Bill 96 (August 2025) now mandates formal AI policies for every public district by July 2026. Tennessee was the first state to legally require all districts to publicly post AI use policies. By late 2025, 33+ states had official AI guidance. Your policy must keep pace.</p>
                <p style={{ marginTop: 12 }}><a href="https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/" target="_blank" rel="noopener noreferrer">Read the full analysis on The Ethical Educator →</a></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Expandable title="UNESCO & Global AI Ethics Frameworks (2024–2026)" color={C.teal}>
                <p>UNESCO's Recommendation on the Ethics of AI (adopted by 193 member states in 2021) remains the most comprehensive global framework. Key developments since 2024:</p>
                <p style={{ marginTop: 12 }}><strong>AI Competency Framework for Teachers (September 2024):</strong> The first-ever global framework, authored by Fengchun Miao and Mutlu Cukurova (UCL), defines 15 competencies across 5 dimensions (human-centred mindset, ethics of AI, AI foundations, AI pedagogy, professional development) with three progression levels (Acquire → Deepen → Create). A parallel framework for students covers 4 domains.</p>
                <p style={{ marginTop: 12 }}><strong>"AI and Education: Protecting the Rights of Learners" (September 2025):</strong> Released at Digital Learning Week in Paris, this report adopts a human-rights-based approach noting that ~2.6 billion people still lack internet access and only 40% of primary schools globally have internet. Without safeguards, the right to education is at risk.</p>
                <p style={{ marginTop: 12 }}><strong>"AI and the Future of Education" (September 2025):</strong> A 160+ page report identifying seven areas for action. Key warning: AI adoption should be a deliberate choice, not treated as inevitable. Wayne Holmes cautioned: "Until we know, we're effectively experimenting on children." The report stresses that <strong>"AI must recognize the incomputable nature of human learning."</strong></p>
                <p style={{ marginTop: 12 }}><strong>Observatory Launch (April 2026):</strong> UNESCO launched an Observatory on Artificial Intelligence in Education for Latin America and the Caribbean, expanding global monitoring capacity.</p>
                <p style={{ marginTop: 12 }}><strong>Critical Analysis (2025):</strong> A paper in the <em>British Journal of Sociology of Education</em> examined UNESCO's policy documents through discourse analysis, raising important questions about whether these frameworks adequately contest the alignment of government and BigTech interests — or inadvertently legitimate it.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Expandable title="The EU AI Act & Education (2024–2026)" color={C.ocean}>
                <p>The EU AI Act (Regulation (EU) 2024/1689, in force August 1, 2024) classifies education as a <strong>high-risk domain</strong>. Four specific use cases are regulated: AI systems determining access/admission, evaluating learning outcomes, assessing appropriate education level, and monitoring/detecting prohibited behavior during tests.</p>
                <p style={{ marginTop: 12 }}>Requirements include risk management, data governance, human oversight, and accuracy standards, with fines up to €35 million or 7% of global turnover. Critically, the Act <strong>bans emotion recognition systems</strong> in educational institutions (effective February 2, 2025), classified as "unacceptable risk." Article 4 mandates AI literacy for all staff deploying AI systems.</p>
                <p style={{ marginTop: 12 }}>Saarela, Gunaserka, and Karimov (2025, DESRIST conference) argue the Act converts earlier ethical aspirations into enforceable obligations, establishing education as a "special-protection domain" similar to healthcare. For U.S. educators, the EU Act foreshadows the direction global regulation is heading and provides a framework worth studying even where it doesn't directly apply.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.16}>
              <Expandable title="What the Research Says About AI Detection" color={C.coral}>
                <p>Multiple studies confirm that AI detection tools have fundamental structural limitations. OpenAI itself stated that detection tools are "not reliable enough given that educators could be making judgments about students with potentially lasting consequences."</p>
                <p style={{ marginTop: 12 }}><strong>Bias against non-native speakers:</strong> A Stanford study by Liang et al. (2023, <em>Patterns</em>) found detectors misclassified 61% of non-native English writing as AI-generated. ESL submissions were up to 30% more likely to be falsely flagged in 2024 follow-ups.</p>
                <p style={{ marginTop: 12 }}><strong>Paraphrasing defeats detection:</strong> The JISC 2025 assessment found mainstream paid tools (Turnitin, CopyLeaks) report false positive rates of ~1–2% for unmodified AI text, but paraphrasing reduces detection accuracy by over 20%.</p>
                <p style={{ marginTop: 12 }}><strong>Institutional response:</strong> At least 12 major universities (Yale, Johns Hopkins, Vanderbilt, Waterloo) have disabled Turnitin's AI detection. Education Week reported that Black students are disproportionately falsely accused. New York City reversed its ChatGPT ban after recognizing prohibition was neither effective nor productive.</p>
                <p style={{ marginTop: 12 }}>Rather than policing AI use, the productive approach is to reframe the question: <strong>What do we actually want from and for our students?</strong> As Salman Khan writes: "To cheat or not to cheat is no longer the question; the semantics of cheating misses the larger picture of what this means for the pedagogical process."</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.18}>
              <Expandable title="Student AI Use: The Numbers (2025–2026)" color={C.teal}>
                <p>Student AI adoption is now near-universal:</p>
                <p style={{ marginTop: 12 }}>The HEPI Student Generative AI Survey 2025 found <strong>92% of UK undergraduates</strong> use AI tools (up from 66% in 2024), with 88% using GenAI for assessment preparation (up from 53%). The Digital Education Council Global Survey (2024) reported <strong>86% of students globally</strong> use AI in studies, with 54% using it weekly.</p>
                <p style={{ marginTop: 12 }}>A RAND study (December 2025) found student AI homework use grew from 48% to <strong>62%</strong> in seven months, with 60% expressing concern about AI's impact on their own critical thinking. The Inside Higher Ed/Generation Lab survey (July 2025) found the top reasons for policy-violating AI use were grade pressure (37%), time pressure (27%), and indifference to policies (26%).</p>
                <p style={{ marginTop: 12 }}>These numbers suggest that any AI policy built around prohibition is fighting a losing battle. The question is not whether students will use AI, but whether they will use it in ways that actually support learning.</p>
              </Expandable>
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
