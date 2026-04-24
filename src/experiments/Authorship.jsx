import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { Expandable } from "../components/shared.jsx";
import { StageHeader, InfoBox, ChoiceBtn, Shell, ResultBox, CounterArgument, DiscussionGuide, PhiloRef, RestartBtn } from "./ExperimentShared.jsx";
import { useAudio } from "../components/shared.jsx";
import { AuthorshipScene } from "../components/diagrams.jsx";

export default function AuthorshipExperiment() {
  const [stage, setStage] = useState(0);
  const [role, setRole] = useState(null);
  const [decisions, setDecisions] = useState([]);
  const [anim, setAnim] = useState(false);
  const audio = useAudio();
  const go = (v) => { audio.playClick(); setAnim(true); setDecisions([...decisions, v]); setTimeout(() => { setStage(stage + 1); setAnim(false); }, 400); };
  useEffect(() => () => audio.stopAll(), [audio]);

  const roles = {
    student: { icon: "🎒", color: C.teal,
      brief: "You used ChatGPT to help write your essay on Hamlet's indecision. You didn't paste in a prompt and copy the output — you went back and forth with the AI over two hours, testing ideas, asking it to challenge your thesis, and refining your argument. The final essay is genuinely yours in the sense that every idea was filtered through your judgment. But it's also true that without the AI, you wouldn't have arrived at these ideas. You didn't disclose AI use because the syllabus said nothing about it.",
      context: "You've been struggling in this class all semester. The AI helped you understand the play in a way lectures didn't. For the first time, you feel like you actually GET Shakespeare. The irony: the best learning experience you've had in this class involved a tool your teacher might consider cheating." },
    teacher: { icon: "📚", color: C.gold,
      brief: "You've taught AP English for fourteen years. This student — a consistent B-/C+ performer — submitted an essay with sophisticated rhetorical structure, nuanced character analysis, and a thesis that would be strong in a graduate seminar. The quality gap from their previous work is enormous. You ran it through Turnitin's AI detector: 47% probability of AI involvement. You know from Liang et al.'s Stanford research (2023, Patterns) that these detectors misclassify 61% of non-native English writing as AI-generated. This student is a native English speaker, but the 47% figure still gives you pause.",
      context: "You're torn. If this student genuinely learned something through AI collaboration, punishing them feels wrong. But if you accept this, you're implicitly telling your other students that AI-assisted work is fine — which undermines the hours they spent writing without AI help." },
    parent: { icon: "👨‍👩‍👧", color: C.ocean,
      brief: "Your child came home excited about the essay for the first time all year. They showed you their ChatGPT conversation history — it was genuinely collaborative, not copy-paste. They spent two hours engaging with the material through the AI. Now the teacher is flagging it. The syllabus says nothing about AI. Your child isn't cheating — they're adapting to a world where AI collaboration is the norm in every professional context. You work in marketing where AI tools are used daily.",
      context: "You're also worried about precedent. If schools punish students for using the same tools professionals use, they're preparing students for a world that no longer exists. But you also remember a time when using a calculator on a math test felt like cheating — and now it's mandatory." },
    admin: { icon: "🏫", color: C.coral,
      brief: "The teacher, parent, and student are in your office. The teacher wants the student to redo the assignment with no AI. The parent has brought a printout of the syllabus highlighting the absence of any AI policy. The student is anxious and confused. Your school has no formal AI use policy — you've been meaning to draft one since ChatGPT launched, but other priorities kept intervening. You need to resolve this case today AND begin the policy process.",
      context: "By late 2025, 33+ states had official AI guidance for schools. NYC's 2026 traffic-light policy took 25 rounds of feedback with 1,000+ stakeholders. Tennessee became the first state to legally require all districts to publicly post AI use policies. Ohio House Bill 96 mandates formal AI policies for every public district by July 2026. You're behind." },
  };

  const stages = [
    // ─── INTRO ───
    () => (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <AuthorshipScene />
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.4rem", marginBottom: 10 }}>The AI Authorship Quandary</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 12px" }}>
          A student submits an AI-assisted essay that shows genuine understanding of the material. The teacher flags it. The parent defends it. The syllabus is silent. This scenario — drawn from Matthew's blog post <PhiloRef text="'The AI Authorship Quandary'" url="https://ethicalaiedu.wordpress.com/2024/02/14/the-ai-authorship-quandary/" /> — has played out in thousands of schools since 2023. You'll experience it from one perspective and discover how the same facts produce entirely different moral conclusions depending on where you stand.
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", marginBottom: 16, marginTop: 20 }}>Choose your role:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
          {Object.entries(roles).map(([k, r]) => (
            <button key={k} onClick={() => { setRole(k); audio.playChime(); setStage(1); }} style={{ padding: "18px 12px", background: `${r.color}0a`, border: `1px solid ${r.color}25`, borderRadius: 12, cursor: "pointer", transition: "all 0.25s", textAlign: "center" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}15`; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = r.color + "25"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>{r.icon}</div>
              <div style={{ color: r.color, fontSize: "0.85rem", fontWeight: 600, textTransform: "capitalize" }}>{k}</div>
            </button>
          ))}
        </div>
      </div>
    ),

    // ─── STAGE 1: BRIEF + FIRST DECISION ───
    () => {
      const r = roles[role];
      const qs = {
        student: ["Redo the essay entirely from scratch, without AI", "Show the teacher my full ChatGPT conversation history", "Argue that since the syllabus didn't prohibit AI, I did nothing wrong"],
        teacher: ["Give a zero — academic integrity demands consistency", "Allow a redo with explicit AI disclosure guidelines", "Accept the essay — the understanding demonstrated is genuine"],
        parent: ["Escalate to the principal — the policy gap is the school's failure, not my child's", "Request a three-way meeting to understand the teacher's reasoning", "Support the teacher's judgment, even though the policy was unclear"],
        admin: ["Form a committee to draft AI policy before resolving the case", "Resolve this case with a compromise, then begin the policy process", "Acknowledge the policy gap publicly and grant the student the benefit of the doubt"],
      };
      const prompts = {
        student: "The teacher calls you in after class. She says the essay 'doesn't sound like you' and asks you to redo it. What do you do?",
        teacher: "The parent emails demanding you accept the essay, citing the absence of any AI prohibition in the syllabus. What do you do?",
        parent: "The teacher insists your child redo the essay. Your child is upset and confused. What's your next move?",
        admin: "Three people are in your office with incompatible demands. You have no policy to reference. What do you do first?",
      };
      return (
        <div>
          <StageHeader num="1" title={`Your Perspective: The ${role.charAt(0).toUpperCase() + role.slice(1)}`} color={r.color} />
          <InfoBox color={r.color}><p>{r.brief}</p><p style={{ marginTop: 12, color: C.textMuted, fontSize: "0.88rem" }}><em>{r.context}</em></p></InfoBox>
          <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "16px 0" }}>{prompts[role]}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {qs[role].map((q, i) => (<ChoiceBtn key={i} onClick={() => go(i)} color={r.color}>{q}</ChoiceBtn>))}
          </div>
        </div>
      );
    },

    // ─── STAGE 2: CONSEQUENCE + VALUE QUESTION ───
    () => {
      const r = roles[role];
      const cons = {
        student: [
          "You spend six hours writing a new essay. It's competent but flat — you don't have the AI's ability to challenge your ideas in real time. Paradoxically, the essay you submitted with AI assistance demonstrated deeper understanding. The honest essay earns a B-. You wonder: did 'integrity' produce better learning, or just a worse product?",
          "The teacher studies your conversation history carefully. She's genuinely impressed — it shows a student actively thinking, not passively copying. But she's also unsettled: the AI proposed the thesis structure that made your argument work. She asks, 'Would you have arrived at this argument without the AI?' You're not sure. Neither is she.",
          "The teacher escalates to the department. Your parents get called in. What started as an essay about Hamlet's indecision has become a case study in institutional indecision. The irony is not lost on you.",
        ],
        teacher: [
          "The parent is furious and emails the principal. Your colleagues are divided — some say you're right, others call you rigid. The AI detection tool's 47% confidence haunts you: would you have flagged this essay if the student were a straight-A performer? Are you penalizing improvement?",
          "The student submits a strong revision, this time with a reflection on how they used AI. But now three other students ask: 'Can we also use AI and then redo it?' You realize you've created a loophole. The implicit message: AI use is fine as long as you get caught and redo it.",
          "You accept the essay. The student's confidence grows — they participate more actively in subsequent discussions. But word spreads. Other students feel the implicit permission. By semester's end, AI-assisted submissions have tripled. You never drew the line, and now you can't.",
        ],
        parent: [
          "The principal listens carefully but explains there's no policy to enforce in either direction. They promise to form a committee. Meanwhile, your child sits in a class where the rules are unclear and the teacher mistrusts them. The relationship is damaged.",
          "The meeting is productive. The teacher explains that her concern isn't punishment but development — she wants to know what your child actually understands versus what the AI produced. You begin to see her point. Together you agree on a compromise: the student will present the essay's argument orally, demonstrating understanding in real time.",
          "Your child is disappointed but adapts. They redo the essay without AI and discover they can't reproduce the quality. This is uncomfortable but illuminating — it reveals the gap between AI-assisted performance and independent capability. Your child learns something important, though not what the assignment intended.",
        ],
        admin: [
          "The committee process takes three months. In that time, twelve more AI-related incidents occur. Teachers handle them inconsistently. By the time the policy arrives, it's been shaped more by accumulated precedent than by principle.",
          "You resolve the case with a compromise: the student presents the argument orally, demonstrating understanding. Then you begin drafting policy. The case becomes your best example when explaining why policy matters — you lived the consequences of not having one.",
          "You acknowledge the policy gap at a school assembly, frame it as a learning opportunity, and invite student, parent, and teacher input on the policy draft. The transparency costs you some authority but gains enormous goodwill. The student receives full credit, and the policy-drafting process begins with genuine buy-in.",
        ],
      };
      return (
        <div>
          <StageHeader num="2" title="The Consequence" color={r.color} />
          <ResultBox color={r.color}>{cons[role][decisions[0]]}</ResultBox>
          <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
            Every option produced unintended consequences. This is the nature of ethical dilemmas — they are not puzzles with correct solutions but tensions that must be navigated with wisdom. The question now shifts from <em>what happened</em> to <em>what should guide future decisions</em>. Each option below maps to a distinct normative framework:
          </p>
          <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "16px 0" }}>What value should guide AI policy going forward?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ChoiceBtn onClick={() => go("transparency")} color={C.teal}>Transparency — students must always disclose AI use (deontological: duty-based)</ChoiceBtn>
            <ChoiceBtn onClick={() => go("outcomes")} color={C.gold}>Learning outcomes — what matters is whether genuine understanding occurred (consequentialist)</ChoiceBtn>
            <ChoiceBtn onClick={() => go("process")} color={C.coral}>Process integrity — the intellectual journey matters more than the destination (virtue ethics)</ChoiceBtn>
          </div>
        </div>
      );
    },

    // ─── STAGE 3: REFLECTION ───
    () => {
      const vm = { transparency: ["deontological", "Kant would approve: transparency is a categorical imperative — a rule that must be followed regardless of consequences. If all students disclosed AI use, teachers could assess genuine understanding. But Kant's framework doesn't tell you what to DO with the disclosure. A student who transparently used AI to produce brilliant work still presents the assessment problem."],
        outcomes: ["consequentialist", "A utilitarian would ask: did the student learn? If the AI-assisted process produced genuine understanding (testable through oral examination, follow-up questions, application to new texts), then the method is justified by the result. But this framework struggles with cases like Kai in The Digital Doppelgänger — where the AI's learning doesn't transfer to the student."],
        process: ["virtue ethics", "Aristotle would focus not on the essay but on the student's character. Did the process of writing develop intellectual virtues — patience, persistence, honesty, the capacity to sit with confusion? If AI removed the struggle, it may have removed the very mechanism through which character develops. As Aristotle argued (NE II, 1103a): we learn by doing, and virtue arises through habituation, not shortcuts."],
      };
      const [fw, analysis] = vm[decisions[1]] || ["unknown", ""];
      return (
        <div>
          <StageHeader num="✦" title="What Your Choices Reveal" color={C.gold} gradient />
          <InfoBox color={C.gold} gradient>
            <p>You prioritized <strong style={{ color: C.gold }}>{decisions[1]}</strong> — a <strong>{fw}</strong> framework.</p>
            <p style={{ marginTop: 12 }}>{analysis}</p>
          </InfoBox>
          <CounterArgument>
            <p>All three frameworks are incomplete on their own. Transparency without substance is bureaucratic. Outcomes without process is shallow. Process without outcomes is self-indulgent. The strongest AI policies — like <PhiloRef text="NYC's 2026 traffic-light framework" url="https://www.schools.nyc.gov/about-us/vision-and-mission/guidance-on-artificial-intelligence" /> — implicitly combine all three: prohibited uses (deontological rules), conditional uses (consequentialist assessment), and approved uses (virtue-based trust in educator judgment).</p>
          </CounterArgument>
          <Expandable title="The Other Perspectives" color={C.ocean}>
            {Object.entries(roles).filter(([k]) => k !== role).map(([k, r]) => (
              <div key={k} style={{ padding: "12px 14px", background: C.surface, borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${r.color}` }}>
                <strong style={{ color: r.color, textTransform: "capitalize" }}>{r.icon} The {k}:</strong>
                <p style={{ marginTop: 6, fontSize: "0.88rem", lineHeight: 1.6 }}>{r.brief}</p>
              </div>
            ))}
          </Expandable>
          <DiscussionGuide questions={[
            "Where is the line between 'AI as tool' and 'AI as author'? Is using ChatGPT to brainstorm different from using it to write? What about using it to revise? To structure? The line may not be a line at all — it may be a spectrum.",
            "If you adopted each framework (transparency, outcomes, process) as your school's primary value, what specific policies would follow? Where would they conflict with each other?",
            "Draft three thought experiments specific to YOUR school context that would test the boundaries of your AI policy — scenarios where reasonable people would disagree.",
          ]} />
          <RestartBtn onClick={() => { setStage(0); setRole(null); setDecisions([]); }} />
        </div>
      );
    },
  ];

  return <Shell animating={anim} color={role ? roles[role].color : C.gold}>{stages[stage]()}</Shell>;
}
