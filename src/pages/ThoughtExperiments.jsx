import { useState, useEffect } from "react";
import { C, isNewExperiment } from "../theme.js";
import { FadeIn, Expandable, useAudio, SectionLabel, SectionTitle, Subtitle, Narrow, PageContainer, NewBadge, BodyText } from "../components/shared.jsx";

// ─── Learning Pill Interactive Experiment ───
function LearningPillExperiment() {
  const [stage, setStage] = useState(0);
  const [choices, setChoices] = useState({});
  const [animating, setAnimating] = useState(false);
  const audio = useAudio(); // Audio cleanup happens automatically on unmount

  const advance = (choiceKey, choiceVal) => {
    audio.playChime();
    setAnimating(true);
    setChoices({ ...choices, [choiceKey]: choiceVal });
    setTimeout(() => { setStage(stage + 1); setAnimating(false); }, 500);
  };

  // Stop audio when component unmounts (navigating away from page)
  useEffect(() => {
    return () => audio.stopAll();
  }, [audio]);

  const btnStyle = {
    padding: "11px 24px", background: "rgba(26,138,122,0.08)",
    border: "1px solid rgba(26,138,122,0.25)", borderRadius: 8,
    color: C.textPrimary, cursor: "pointer", fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: "0.91rem", transition: "all 0.2s",
  };

  const stages = [
    // Stage 0: Intro
    () => (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ width: 90, height: 40, borderRadius: 20, margin: "0 auto 28px", background: `linear-gradient(135deg, ${C.teal}, ${C.sky})`, boxShadow: `0 0 40px rgba(26,138,122,0.3)`, animation: "pillFloat 3s ease-in-out infinite" }} />
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.5rem", marginBottom: 10 }}>The Learning Pill</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.93rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 24px" }}>
          A thought experiment for the age of AI. Your answers will shape the philosophical landscape that follows. There are no right answers — only clearer questions.
        </p>
        <button onClick={() => { audio.playDeep(); setStage(1); }} style={{ padding: "14px 36px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.93rem", boxShadow: `0 4px 20px rgba(26,138,122,0.25)` }}>
          Begin the Experiment
        </button>
      </div>
    ),
    // Stage 1: The Premise
    () => (
      <div>
        <StageHeader num="1" title="The Premise" color={C.teal} />
        <InfoBox color={C.teal}>
          <p>Imagine a pill that allows a person to <strong style={{ color: C.teal }}>instantly acquire complete understanding</strong> of any subject. It produces no pain, no cognitive damage, and no harmful side effects. The person does not merely memorize information — they <em>fully understand</em> the field, as deeply as any expert who spent decades mastering it.</p>
          <p style={{ marginTop: 12 }}>The knowledge is genuine. A person who takes a physics pill could advance the field. A person who takes a music pill could compose at the level of a virtuoso. The understanding is indistinguishable from knowledge acquired through years of study, practice, and mentorship.</p>
        </InfoBox>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>Should you take the pill?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => advance("basic", "yes")} style={btnStyle}>Yes — take it</button>
          <button onClick={() => advance("basic", "no")} style={btnStyle}>No — refuse it</button>
          <button onClick={() => advance("basic", "depends")} style={btnStyle}>It depends</button>
        </div>
      </div>
    ),
    // Stage 2: Scarcity
    () => (
      <div>
        <StageHeader num="2" title="The Scarcity Condition" color={C.ocean} />
        <ChoiceFeedback choice={choices.basic} text={choices.basic === "yes" ? "take" : choices.basic === "no" ? "refuse" : "consider"} />
        <InfoBox color={C.sky}>
          <p>Now suppose the pill is <strong style={{ color: C.sky }}>available only to a small number of people</strong>. Perhaps it's expensive, or the supply is limited. Your child has the opportunity to take it — but most children will not have access.</p>
          <p style={{ marginTop: 12 }}>Those who take it will possess deep expertise. Those who don't will learn traditionally — through years of study, practice, and gradual mastery. The gap between the two groups could be enormous. This is not hypothetical: access to quality AI tutoring tools already varies dramatically by socioeconomic status, school funding, and geography.</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", margin: "16px 0" }}>Would refusing the pill for your child, on principle, amount to choosing <strong>disadvantage</strong>? Consider: in a 2025 RAND study, students with AI access showed significantly faster learning gains on measurable assessments than those without. Is equity an argument <em>for</em> the pill, or does it expose a deeper problem?</p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>Would you give your child the pill?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => advance("scarcity", "yes")} style={btnStyle}>Yes — I can't let them fall behind</button>
          <button onClick={() => advance("scarcity", "no")} style={btnStyle}>No — even at the cost of disadvantage</button>
        </div>
      </div>
    ),
    // Stage 3: Universal
    () => (
      <div>
        <StageHeader num="3" title="Universal Availability" color={C.gold} />
        <InfoBox color={C.gold}>
          <p>Now suppose the pill is <strong style={{ color: C.gold }}>universally available, free, and safe for everyone</strong>. Anyone can take it at any time. Knowledge acquisition is no longer scarce. What happens to schools? To universities? To the years of study, the late nights, the struggle to understand?</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", margin: "16px 0" }}>Would education as we know it still have a purpose — or would most of its familiar structures be <strong>exposed as merely instrumental</strong>, valuable only because they were historically the only path to knowledge? Computer scientist Daniel Lemire posed a version of this question in 2012, predicting that even with a perfect learning pill, colleges would persist because degrees signal character and dedication — the willingness to learn "the hard way" would itself become a valued credential.</p>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", margin: "16px 0" }}>Philosopher Gert Biesta would argue that education serves three purposes: <em>qualification</em> (knowledge and skills), <em>socialization</em> (norms and values), and <em>subjectification</em> (becoming an autonomous moral agent). The pill might deliver qualification — but can it deliver the other two?</p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>In this world, should schools still exist?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => advance("universal", "yes")} style={btnStyle}>Yes — education is more than knowledge</button>
          <button onClick={() => advance("universal", "no")} style={btnStyle}>No — their main purpose would be gone</button>
          <button onClick={() => advance("universal", "different")} style={btnStyle}>They'd need to become something different</button>
        </div>
      </div>
    ),
    // Stage 4: The Child Question
    () => (
      <div>
        <StageHeader num="4" title="The Developmental Question" color={C.coral} />
        <InfoBox color={C.coral}>
          <p>Even if the pill is universally safe, <strong style={{ color: C.coral }}>should access be limited by age?</strong> Should a toddler be permitted to take a pill that yields mastery of physics, history, or mathematics? Or would such acceleration deprive the child of something essential to childhood and human development?</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", margin: "16px 0" }}>Consider what a child gains from the <em>process</em> of learning to read: not just literacy, but patience, persistence, the experience of confusion giving way to clarity, the social bond with a teacher who cares. Consider the playground arguments that teach negotiation, the failed science projects that teach resilience. Manu Kapur's research on "productive failure" (2024) demonstrates that carefully designed struggle produces deeper conceptual understanding than direct instruction — the struggle <em>is</em> the learning.</p>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", margin: "16px 0" }}>Aristotle argued in the <em>Nicomachean Ethics</em> that virtue arises through habituation: "For the things we have to learn before we can do them, we learn by doing them — men become builders by building and lyre players by playing the lyre." Character cannot be downloaded. If a three-year-old understands quantum mechanics, does childhood lose something? Or is the resistance to this idea just another evolved emotional response?</p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>Should there be an age limit on the Learning Pill?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => advance("age", "yes")} style={btnStyle}>Yes — development matters</button>
          <button onClick={() => advance("age", "no")} style={btnStyle}>No — why withhold knowledge?</button>
        </div>
      </div>
    ),
    // Stage 5: Reflection
    () => (
      <div>
        <StageHeader num="✦" title="The Point of the Experiment" color={C.gold} gradient />
        <InfoBox color={C.gold} gradient>
          <p><strong style={{ color: C.gold }}>The pill is not really about pharmacology.</strong> It stands in for any tool that radically compresses the process of learning — including advanced AI systems.</p>
          <p style={{ marginTop: 12 }}>When a student asks ChatGPT to explain quantum mechanics and receives a clear, personalized, infinitely patient explanation — when Khanmigo adapts to a student's interests and pace in real time — when AI generates practice problems calibrated to the precise edge of a student's understanding — we are already partway to the Learning Pill. As Sal Khan noted in a candid 2026 interview, even Khanmigo found that 80–85% of students didn't know how to initiate questions with a standalone chatbot, because the process of formulating questions is itself a learned skill.</p>
          <p style={{ marginTop: 12 }}>The thought experiment isolates a central philosophical question: <strong style={{ color: C.teal }}>Is education valuable mainly because of what it produces, or because of the process it requires us to undergo?</strong> If knowledge can be acquired without effort, delay, practice, frustration, or instruction — what, if anything, is lost?</p>
        </InfoBox>

        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.02rem", marginTop: 28, marginBottom: 12 }}>Your Choices</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { label: "Take the pill?", val: choices.basic },
            { label: "Give it to your child (scarce)?", val: choices.scarcity },
            { label: "Should schools still exist?", val: choices.universal },
            { label: "Age limit?", val: choices.age },
          ].map((c, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px" }}>
              <p style={{ color: C.textMuted, fontSize: "0.75rem", marginBottom: 3 }}>{c.label}</p>
              <p style={{ color: C.gold, fontSize: "0.88rem", fontWeight: 600, textTransform: "capitalize" }}>{c.val || "—"}</p>
            </div>
          ))}
        </div>

        <Expandable title="What This Framework Reveals" color={C.teal}>
          <p>By removing cost, risk, and inefficiency, the Learning Pill forces a clearer account of <strong>what education is for</strong>. Is the aim knowledge? Competence? Socialization? Character formation? Human flourishing? Some combination?</p>
          <p style={{ marginTop: 12 }}>If you said schools should still exist even with universal pills, you're asserting that education's value transcends knowledge transfer — that struggle, formation, discipline, discovery, and developmental sequence are <em>intrinsic goods</em>, not merely necessary means to intellectual attainment.</p>
          <p style={{ marginTop: 12 }}>A 2025 paper in <em>Annals of Medicine and Surgery</em> (Hasan, "How AI Quietly Undermines the Joy and Effort of Learning") provides neuroscientific grounding: AI tools that offer immediate solutions <strong>bypass the brain's effort-reward cycle</strong> — the dopamine-mediated process where overcoming challenges reinforces motivation. Robert Pondiscio (AEI, 2025) frames it memorably: "Education is not a product to be delivered; it's a transformation that occurs through effort."</p>
          <p style={{ marginTop: 12 }}>Sparrow and Flenady (2025, "Bullshit Universities," <em>AI & Society</em>) warn that even if the normative arguments succeed, economic pressures may override them: "money talks." The history of automation in other industries shows it is naïve to think AI can assist teachers without eventually being used to replace them.</p>
        </Expandable>

        <Expandable title="Philosophical Parallels" color={C.ocean}>
          <p><strong>Nozick's Experience Machine (1974):</strong> Robert Nozick asked whether you'd plug into a machine simulating a perfect life. Most refuse — suggesting we value authenticity over mere experience. A 2024 paper ("Re-Examining Nozick's Experience Machine in View of Emerging AI Companions," <em>Annals of the University of Bucharest</em>) found that what matters is not what people <em>say</em> they'd choose but what they <em>actually choose</em> — highlighting the gap between stated and revealed preferences. Does the pill give you authentic knowledge, or a simulation of knowing?</p>
          <p style={{ marginTop: 12 }}><strong>Jackson's Mary's Room (1982):</strong> Mary knows every physical fact about color but has never seen it. When she sees red, she learns something new. Brock and Hay (2019, <em>Science & Education</em>) applied this directly to classrooms, arguing students need direct sensory experience alongside theoretical knowledge. The pill gives Mary's clinical knowledge — but does it give her the experience of seeing red?</p>
          <p style={{ marginTop: 12 }}><strong>Plato's Allegory of the Cave:</strong> The prisoners must walk out themselves — the journey is part of the enlightenment. Waitzman (2025, SSRN) developed a "Framework for Critical AI Literacy" positioning teachers as philosophical guides helping learners interrogate AI-generated "shadows." The allegory insists that the process of "turning the soul" cannot be shortcut.</p>
          <p style={{ marginTop: 12 }}><strong>Searle's Chinese Room (1980):</strong> A person follows instructions to manipulate Chinese symbols without understanding Chinese. If an AI tutor manipulates symbols without understanding, can it genuinely teach? A 2025 <em>Inquiry</em> paper argued LLM outputs should be viewed as "genuinely meaningful" even without original intentionality — but the distinction between syntactic processing and semantic understanding parallels the difference between surface and deep learning.</p>
          <p style={{ marginTop: 12 }}><strong>Lemire's Learning Pill (2012):</strong> Computer scientist Daniel Lemire predicted even a perfect learning pill would not disrupt colleges, because education serves social, signaling, and character-building functions beyond knowledge. A commenter on his blog made the crucial distinction: "If we had the perfect pill... I predict we would have much more radical changes than the ones you speculate" — suggesting that our institutions would transform rather than simply persist.</p>
        </Expandable>

        <Expandable title="Further Reading & References" color={C.gold}>
          <p>• Nozick, R. <em>Anarchy, State, and Utopia</em> (1974) — The Experience Machine</p>
          <p>• Jackson, F. "Epiphenomenal Qualia." <em>Philosophical Quarterly</em> 32 (1982) — Mary's Room</p>
          <p>• Plato. <em>Republic</em>, Book VII, 514a–520a — Allegory of the Cave</p>
          <p>• Searle, J. "Minds, Brains, and Programs." <em>BBS</em> 3.3 (1980) — Chinese Room</p>
          <p>• Lemire, D. "The Learning Pill." lemire.me/blog (2012)</p>
          <p>• Dewey, J. <em>Experience and Education</em> (1938) — Process vs. product</p>
          <p>• Aristotle. <em>Nicomachean Ethics</em>, Book II — Habituation and virtue</p>
          <p>• Kapur, M. <em>Productive Failure</em> (Wiley, 2024) — The science of learning from struggle</p>
          <p>• Biesta, G. "Risking Ourselves in Education." <em>Educational Theory</em> (2020) — Three purposes of education</p>
          <p>• Sparrow, R. & Flenady, T. "Bullshit Universities." <em>AI & Society</em> 40 (2025) — Against automated education</p>
          <p>• Hasan, N. "How AI Quietly Undermines the Joy and Effort of Learning." <em>Annals of Medicine and Surgery</em> 87.8 (2025)</p>
          <p>• Waitzman, R. "Beyond Shadows: Plato's Cave and AI." SSRN (2025)</p>
          <p>• Brock, R. & Hay, S. "Keeping Students Out of Mary's (Class)room." <em>Science & Education</em> 28 (2019)</p>
          <p>• Khan, S. <em>Brave New Words</em> (Penguin, 2024)</p>
          <p>• UNESCO. "AI and Education: Protecting the Rights of Learners." (2025)</p>
          <p>• Greene, J.D. <em>Moral Tribes</em> (Penguin, 2013)</p>
          <p>• Bellwether Education. "Productive Struggle." (2025)</p>
        </Expandable>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button onClick={() => { setStage(0); setChoices({}); }} style={{ padding: "10px 24px", background: "rgba(200,152,48,0.1)", border: `1px solid ${C.borderHover}`, borderRadius: 6, color: C.gold, cursor: "pointer", fontSize: "0.86rem" }}>↺ Restart the Experiment</button>
        </div>
      </div>
    ),
  ];

  return (
    <div style={{
      background: `linear-gradient(180deg, ${C.bgAlt}, ${C.bg})`,
      border: `1px solid rgba(26,138,122,0.12)`,
      borderRadius: 18, padding: "28px 24px",
      opacity: animating ? 0.4 : 1,
      transform: animating ? "scale(0.98)" : "scale(1)",
      transition: "all 0.3s ease",
    }}>
      {stages[stage]()}
      <style>{`@keyframes pillFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

function StageHeader({ num, title, color, gradient }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: gradient ? `linear-gradient(135deg, ${C.teal}, ${C.gold})` : color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>{num}</div>
      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: color || C.textPrimary, fontSize: "1.1rem" }}>{title}</h4>
    </div>
  );
}

function InfoBox({ children, color, gradient }) {
  const bg = gradient ? `linear-gradient(135deg, rgba(26,138,122,0.06), rgba(200,152,48,0.06))` : `${color}0a`;
  return (
    <div style={{ background: bg, border: `1px solid ${color}20`, borderRadius: 12, padding: 22, marginBottom: 16, color: C.textPrimary, lineHeight: 1.8, fontSize: "0.95rem" }}>
      {children}
    </div>
  );
}

function ChoiceFeedback({ choice, text }) {
  if (!choice) return null;
  return (
    <div style={{ background: "rgba(42,136,192,0.05)", border: `1px solid rgba(42,136,192,0.1)`, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: "0.84rem", color: C.textMuted, fontStyle: "italic" }}>
      You chose to {text} the pill. Now the conditions change.
    </div>
  );
}

// ─── Other Thought Experiments ───
function OtherExperiments({ navigate }) {
  const experiments = [
    {
      id: "trolley-problem",
      title: "The Trolley Problem & Footbridge Dilemma",
      desc: "The foundational moral dilemmas that launched moral psychology. Pull a lever to save five? Push a man off a bridge? Greene's fMRI research revealed why these identical-outcome scenarios feel so different.",
      link: "moral-psych",
    },
    {
      id: "ai-authorship",
      title: "The AI Authorship Quandary",
      desc: "A student submits AI-written work. The teacher wants it redone. The parent says AI use wasn't prohibited. As administrator, what's your policy — and what values ground it?",
    },
    {
      id: "reluctant-educator",
      title: "The Reluctant Educator",
      desc: "Mr. Jennings refuses AI grading tools on principle. His class falls behind AI-assisted classes on every measurable outcome. How does the administration balance teaching philosophy with student performance?",
    },
    {
      id: "digital-doppelganger",
      title: "The Digital Doppelgänger",
      desc: "A student sends an AI avatar — indistinguishable from himself — to attend class, participate in discussions, and ask questions. He reviews all interactions afterward. How does your school define attendance, participation, and presence?",
    },
  ];

  return (
    <div style={{ marginTop: 48 }}>
      <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.2rem", marginBottom: 20 }}>More Thought Experiments</h3>
      {experiments.map((exp, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          <div style={{ marginBottom: 14 }}>
            <Expandable title={<span>{exp.title} {isNewExperiment(exp.id) && <NewBadge />}</span>} color={C.ocean}>
              <p>{exp.desc}</p>
              {exp.id === "ai-authorship" && (
                <div style={{ marginTop: 12 }}>
                  <p><strong>Questions for Consideration:</strong></p>
                  <p style={{ marginTop: 8 }}>1. How do you mediate between the parent's demands, the teacher's concerns, and the student's educational experience?</p>
                  <p>2. What steps ensure a fair resolution that respects both academic integrity and the evolving role of technology?</p>
                  <p>3. How can this guide development of a comprehensive AI policy addressing transparency, authorship, and ethics?</p>
                  <p style={{ marginTop: 12 }}>This scenario is drawn from Matthew's blog post on The Ethical Educator. <a href="https://ethicalaiedu.wordpress.com/2024/02/14/the-ai-authorship-quandary/" target="_blank" rel="noopener noreferrer">Read the full analysis →</a></p>
                </div>
              )}
              {exp.id === "reluctant-educator" && (
                <div style={{ marginTop: 12 }}>
                  <p><strong>Further Exploration:</strong></p>
                  <p style={{ marginTop: 8 }}>Consider a hybrid approach where Mr. Jennings uses AI as supplementary tool rather than primary feedback mechanism. A 2025 meta-analysis in <em>Educational Research Review</em> found a moderate positive effect (SMD = 0.45) for GenAI-supported interventions — but a Microsoft Research report (October 2025) warned that "productivity gains from GenAI ≠ learning gains," with high school math students scoring 17% lower after using GenAI without proper scaffolding.</p>
                </div>
              )}
              {exp.id === "digital-doppelganger" && (
                <div style={{ marginTop: 12 }}>
                  <p><strong>Deeper Questions:</strong></p>
                  <p style={{ marginTop: 8 }}>1. If a student can learn effectively through an AI avatar's interactions, does this challenge traditional notions of classroom presence?</p>
                  <p>2. What ethical and practical guidelines should address AI avatars as student proxies?</p>
                  <p>3. What are the implications for development of social skills in an environment where AI avatars can replace human interaction?</p>
                  <p style={{ marginTop: 12 }}>NYC Public Schools' 2026 AI policy addresses this directly with their traffic light framework: AI proxies for student participation would fall under "Red" (prohibited) — but the question remains open for future policy as the technology advances.</p>
                </div>
              )}
              {exp.link && (
                <p style={{ marginTop: 12 }}><a href="#" onClick={(e) => { e.preventDefault(); navigate(exp.link); }} style={{ color: C.teal }}>Explore the interactive version →</a></p>
              )}
            </Expandable>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// ─── Main Page ───
export default function ThoughtExperiments({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{ display: "inline-block", padding: "4px 14px", background: `linear-gradient(135deg, rgba(26,138,122,0.12), rgba(26,90,138,0.12))`, border: `1px solid rgba(26,138,122,0.2)`, borderRadius: 16, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal }}>
              Thought Experiments {isNewExperiment("learning-pill") && <NewBadge />}
            </span>
          </div>
          <SectionTitle>Thought Experiments</SectionTitle>
          <Subtitle>Hypothetical scenarios designed to isolate philosophical questions about education, morality, and the role of AI. Use these as tools for reflection, discussion, and policy development.</Subtitle>
        </FadeIn>
        <Narrow>
          <FadeIn delay={0.1}>
            <div style={{ marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.teal, fontSize: "1.2rem" }}>✦ The Learning Pill</h3>
                {isNewExperiment("learning-pill") && <NewBadge />}
              </div>
              <BodyText>The newest addition to our collection. This interactive thought experiment asks whether education is valuable because of what it produces — or because of the process it requires us to undergo. Engage with escalating scenarios, then explore the philosophical parallels.</BodyText>
              <LearningPillExperiment />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <OtherExperiments navigate={navigate} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <Expandable title="Why Thought Experiments Matter for AI Policy" color={C.gold}>
              <p>Thought experiments have been central to philosophy since Plato's Cave and have driven breakthroughs in physics (Einstein's elevator, Galileo's balls), ethics (Thomson's violinist, Foot's trolley), and political philosophy (Rawls's veil of ignorance). As the Stanford Encyclopedia of Philosophy notes, they allow us to "learn about reality by virtue of merely thinking" — tapping into what Ernst Mach called "instinctive knowledge" acquired from experience.</p>
              <p style={{ marginTop: 12 }}>For AI in education, thought experiments serve a specific function: they <strong>force explicit engagement with values</strong>. When a school leader says "we uphold the highest ethical standards," thought experiments reveal what that commitment actually entails by presenting concrete scenarios where values compete. They move policy discussions from vague aspiration to principled decision-making.</p>
              <p style={{ marginTop: 12 }}>As Matthew argues in his blog post "From Ambiguity to Action," creating your own thought experiments based on your specific school context is one of the most powerful steps toward developing AI policies that are genuinely meaningful rather than empty words.</p>
            </Expandable>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
