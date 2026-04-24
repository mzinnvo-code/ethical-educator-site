import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { Expandable } from "../components/shared.jsx";
import { StageHeader, InfoBox, ChoiceBtn, Shell, ResultBox, CounterArgument, DiscussionGuide, PhiloRef, RestartBtn } from "./ExperimentShared.jsx";
import { useAudio } from "../components/shared.jsx";
import { ReluctantScene } from "../components/diagrams.jsx";

export default function ReluctantEducatorExperiment() {
  const [stage, setStage] = useState(0);
  const [week, setWeek] = useState(0);
  const [decision, setDecision] = useState(null);
  const [anim, setAnim] = useState(false);
  const audio = useAudio();
  useEffect(() => () => audio.stopAll(), [audio]);

  const data = [
    { wk: 1, j: { test: 72, think: 85, engage: 90, create: 88 }, c: { test: 74, think: 82, engage: 78, create: 75 } },
    { wk: 4, j: { test: 74, think: 87, engage: 88, create: 90 }, c: { test: 82, think: 78, engage: 72, create: 70 } },
    { wk: 8, j: { test: 76, think: 89, engage: 86, create: 92 }, c: { test: 88, think: 72, engage: 68, create: 65 } },
    { wk: 12, j: { test: 78, think: 91, engage: 85, create: 94 }, c: { test: 92, think: 65, engage: 62, create: 58 } },
  ];

  const narr = [
    "Week 1. Both classrooms are engaged and productive. Mr. Jennings opens with a Socratic question about Fitzgerald's use of color symbolism — students argue passionately for twenty minutes. Ms. Chen's students are excited by the AI tools: Khanmigo adapts practice exercises in real time, and the feedback loop is nearly instantaneous. Both approaches are working. The difference is invisible.",
    "Week 4. Ms. Chen's test scores are pulling ahead — her AI-optimized practice has identified and targeted each student's specific knowledge gaps. But you notice something in her classroom observations: students are answering questions faster but asking fewer of them. The AI provides such thorough explanations that there's nothing left to wonder about. Meanwhile, Mr. Jennings' students spent an entire class period arguing about whether Jay Gatsby is sympathetic — an argument with no 'correct' answer that the AI would have resolved in seconds.",
    "Week 8. The gap has become unmistakable. On standardized assessments, Ms. Chen's class outperforms by 12 points. But on your school's critical thinking rubric — which measures originality, evidence evaluation, and tolerance for ambiguity — Mr. Jennings' students score 17 points higher. His students write essays with unexpected angles; hers produce technically proficient but predictable work. A Microsoft Research report (Walker & Vorvoreanu, October 2025) lands on your desk with the warning: 'productivity gains from GenAI ≠ learning gains.'",
    "Week 12. The semester ends. Ms. Chen's students scored 14 points higher on the district assessment — the metric the school board cares about. Mr. Jennings' students scored 26 points higher on critical thinking, 23 on engagement, and 36 on creative output — metrics that don't appear on the report card. One of Mr. Jennings' students won the regional essay contest. Three of Ms. Chen's students couldn't write a timed essay without AI assistance. The principal needs to make a recommendation for next year.",
  ];

  function Bar({ label, j, c, jColor = C.teal, cColor = C.coral }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: C.textMuted, marginBottom: 4 }}>
          <span>{label}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{j} vs {c}</span>
        </div>
        <div style={{ display: "flex", gap: 2, height: 22, background: "rgba(255,255,255,0.02)", borderRadius: 4 }}>
          <div style={{ width: `${j}%`, background: jColor, borderRadius: "4px 0 0 4px", transition: "width 0.6s ease", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
            <span style={{ fontSize: "0.6rem", color: "#fff", fontWeight: 700 }}>J</span>
          </div>
          <div style={{ width: `${c}%`, background: cColor, borderRadius: "0 4px 4px 0", transition: "width 0.6s ease", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
            <span style={{ fontSize: "0.6rem", color: "#fff", fontWeight: 700 }}>C</span>
          </div>
        </div>
      </div>
    );
  }

  const stages = [
    // ─── INTRO ───
    () => (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <ReluctantScene />
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.4rem", marginBottom: 10 }}>The Reluctant Educator</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 12px" }}>
          Mr. Jennings — 22 years in the classroom, National Board Certified, beloved by students — refuses all AI tools on philosophical grounds. He believes the struggle of learning is inseparable from its value, and that AI shortcuts undermine character formation.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 12px" }}>
          Ms. Chen — 8 years in, Ed.D. in Educational Technology, early adopter — has fully integrated AI into her classroom. She believes AI personalization represents the most significant advance in pedagogy since differentiated instruction.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 24px" }}>
          Both teach AP English Literature. Same school, same student demographics, same curriculum. Watch their classrooms diverge over 12 weeks through a live dashboard — then decide what the principal should do.
        </p>
        <button onClick={() => { audio.playDeep(); setStage(1); }} style={{ padding: "14px 36px", background: `linear-gradient(135deg, ${C.gold}, ${C.coral})`, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.93rem" }}>Open the Dashboard</button>
      </div>
    ),

    // ─── DASHBOARD ───
    () => {
      const d = data[week];
      return (
        <div>
          <StageHeader num="📊" title="Classroom Comparison Dashboard" color={C.gold} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div style={{ background: `${C.teal}0a`, border: `1px solid ${C.teal}20`, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>📖</div>
              <strong style={{ color: C.teal, fontSize: "0.9rem" }}>Mr. Jennings</strong>
              <p style={{ fontSize: "0.76rem", color: C.textMuted, marginTop: 6, lineHeight: 1.5 }}>Socratic dialogue, handwritten drafts, peer workshop, one-on-one conferences, literary analysis through close reading.</p>
            </div>
            <div style={{ background: `${C.coral}0a`, border: `1px solid ${C.coral}20`, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>🤖</div>
              <strong style={{ color: C.coral, fontSize: "0.9rem" }}>Ms. Chen</strong>
              <p style={{ fontSize: "0.76rem", color: C.textMuted, marginTop: 6, lineHeight: 1.5 }}>AI-assisted grading, personalized practice via Khanmigo, chatbot tutoring, automated feedback loops, adaptive assessments.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: "center" }}>
            {data.map((m, i) => (
              <button key={i} onClick={() => { setWeek(i); audio.playClick(); }} style={{
                padding: "9px 18px", background: week === i ? C.gold : "transparent",
                border: `1px solid ${week === i ? C.gold : C.border}`, borderRadius: 6,
                color: week === i ? C.midnight : C.textMuted, cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                transition: "all 0.2s",
              }}>Week {m.wk}</button>
            ))}
          </div>

          <div style={{ background: C.surface, borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <p style={{ fontSize: "0.72rem", color: C.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Week {data[week].wk} Metrics</p>
            <Bar label="Standardized Test Scores" j={d.j.test} c={d.c.test} />
            <Bar label="Critical Thinking (rubric)" j={d.j.think} c={d.c.think} cColor={C.gold} />
            <Bar label="Student Engagement (observed)" j={d.j.engage} c={d.c.engage} cColor={C.ocean} />
            <Bar label="Creative Output (portfolio)" j={d.j.create} c={d.c.create} cColor={C.green} />
          </div>

          <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 16 }}>{narr[week]}</p>

          {week === 3 ? (
            <div>
              <CounterArgument color={C.teal}>
                <p>Before you decide: notice what the dashboard does NOT measure. It doesn't capture the student who found confidence in Mr. Jennings' class — or the student who finally understood Shakespeare thanks to Ms. Chen's AI tools. It doesn't measure the student in Jennings' class who is struggling silently because the pace is too slow, or the student in Chen's class whose writing improved dramatically with AI feedback. <strong>The dashboard is itself a philosophical argument</strong> — it privileges certain outcomes over others. Your decision will partly reflect which metrics you trust.</p>
              </CounterArgument>
              <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "16px 0" }}>You're the principal. What do you recommend for next year?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ChoiceBtn onClick={() => { setDecision("mandate"); setStage(2); audio.playChime(); }} color={C.coral}>Mandate AI tools for all teachers — test scores determine funding and reputation</ChoiceBtn>
                <ChoiceBtn onClick={() => { setDecision("jennings"); setStage(2); audio.playChime(); }} color={C.teal}>Support Mr. Jennings' approach — the unmeasured qualities are what education is really about</ChoiceBtn>
                <ChoiceBtn onClick={() => { setDecision("hybrid"); setStage(2); audio.playChime(); }} color={C.gold}>Require a research-informed hybrid — both teachers incorporate elements of each approach</ChoiceBtn>
                <ChoiceBtn onClick={() => { setDecision("autonomy"); setStage(2); audio.playChime(); }} color={C.ocean}>Preserve teacher autonomy — professional educators should make pedagogical choices</ChoiceBtn>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: C.textMuted, fontSize: "0.84rem" }}>Click through each week to watch the data evolve →</p>
          )}
        </div>
      );
    },

    // ─── REFLECTION ───
    () => {
      const ref = {
        mandate: { text: "You prioritized measurable outcomes — a consequentialist calculation. The school board will be pleased. Parents scanning rankings will approve. But consider: Bastani et al. (2024) found high school math students scored 17% lower after using GenAI without scaffolding. Ms. Chen's approach works because she's a skilled AI integrator. What happens when a less skilled teacher is required to use tools they don't understand? You've mandated the tool, not the expertise.", fw: "consequentialist" },
        jennings: { text: "You prioritized unmeasurable qualities — a virtue ethics stance. Mr. Jennings' students developed capacities that standardized tests cannot capture: intellectual courage, tolerance for ambiguity, the ability to formulate original arguments. But three of his students' parents have already complained about test scores. Can you defend this choice at a school board meeting where the spreadsheet shows Jennings' class 14 points behind? As Sparrow and Flenady warn: 'money talks.'", fw: "virtue ethics" },
        hybrid: { text: "You sought the pragmatic middle — but the devil is in the details. If Mr. Jennings must use AI tools he believes are pedagogically harmful, you're overriding his professional judgment formed through 22 years of experience. If Ms. Chen must reduce AI, you're asking her to abandon the approach that demonstrably improved test performance. A mandate to 'use both' without philosophical grounding is just a compromise disguised as policy.", fw: "pragmatist" },
        autonomy: { text: "You respected professional autonomy — which means accepting that a student's educational philosophy depends on which classroom they're assigned to. Is that equitable? Two students in the same school, same grade, same curriculum — one gets Socratic dialogue and handwritten drafts, the other gets AI-personalized instruction and automated feedback. If both approaches are valid, what does your school actually believe about education?", fw: "liberalism / pluralism" },
      };
      const r = ref[decision];
      return (
        <div>
          <StageHeader num="✦" title="The Tradeoff" color={C.gold} gradient />
          <InfoBox color={C.gold} gradient><p>{r.text}</p></InfoBox>

          <CounterArgument>
            <p>Every option above reveals a deeper question: <strong>what is your school measuring, and why?</strong> The dashboard showed four metrics, but education involves dozens more: resilience, curiosity, collaborative skill, ethical reasoning, aesthetic appreciation, self-knowledge. We measure test scores not because they capture what matters most, but because they're easy to quantify. As <PhiloRef text="Goodhart's Law" url="https://en.wikipedia.org/wiki/Goodhart%27s_law" /> warns: "When a measure becomes a target, it ceases to be a good measure."</p>
          </CounterArgument>

          <Expandable title="What the Research Actually Shows" color={C.teal}>
            <p>The data in this experiment is modeled on real findings:</p>
            <p style={{ marginTop: 10 }}>• A <PhiloRef text="2025 meta-analysis" url="https://www.sciencedirect.com/science/article/abs/pii/S1747938X2500051X" /> in <em>Educational Research Review</em> (68 studies, 337 effect sizes) found a <strong>moderate positive overall effect</strong> (SMD = 0.45) for GenAI-supported interventions on measurable learning outcomes.</p>
            <p style={{ marginTop: 10 }}>• <PhiloRef text="Microsoft Research (October 2025)" url="https://www.microsoft.com/en-us/research/" /> explicitly warned that "productivity gains from GenAI ≠ learning gains." High school math students scored <strong>17% lower</strong> after using GenAI without scaffolding (Bastani et al., 2024).</p>
            <p style={{ marginTop: 10 }}>• <PhiloRef text="Bellwether Education Partners (2025)" url="https://bellwether.org/publications/productive-struggle/" /> synthesized evidence on "Productive Struggle," noting AI's default tendency is to eliminate struggle entirely — threatening the cognitive mechanisms that produce genuine learning.</p>
            <p style={{ marginTop: 10 }}>• <PhiloRef text="Kapur (2024)" url="https://www.goodreads.com/book/show/208444312" /> demonstrated in <em>Productive Failure</em> that learning conditions reducing performance during practice <strong>enhance</strong> long-term retention and transfer.</p>
            <p style={{ marginTop: 10 }}>The evidence doesn't support either pure position. It supports what Mr. Jennings and Ms. Chen both partially understand: <strong>AI works when it scaffolds struggle, and fails when it eliminates it.</strong></p>
          </Expandable>

          <Expandable title="The Philosophical Framework" color={C.gold}>
            <p>Your choice reflects a <strong>{r.fw}</strong> framework. Here's how each maps to educational philosophy:</p>
            <p style={{ marginTop: 10 }}><strong>Consequentialism</strong> (mandate AI): Maximize measured outcomes. The right policy produces the best aggregate results. Risk: optimizing for the measurable at the expense of the meaningful.</p>
            <p style={{ marginTop: 10 }}><strong>Virtue Ethics</strong> (back Jennings): Cultivate character through practice. The right policy develops intellectual virtues — curiosity, persistence, honesty — that standardized tests cannot capture. Risk: romanticism that leaves students unprepared for an AI-saturated world.</p>
            <p style={{ marginTop: 10 }}><strong>Pragmatism</strong> (hybrid): Find what works through experimentation. The right policy evolves through evidence and feedback. Risk: "what works" is defined by whoever controls the metrics.</p>
            <p style={{ marginTop: 10 }}><strong>Liberalism</strong> (autonomy): Respect professional freedom and pluralism. The right policy trusts teachers as experts. Risk: inconsistency becomes inequity when students have no choice of classroom.</p>
          </Expandable>

          <DiscussionGuide questions={[
            "Identify the three most important things you want students to learn in your class. For each one, ask: does AI help or hinder this specific learning goal? The answer may be different for each.",
            "If Mr. Jennings and Ms. Chen were on your faculty, how would you handle a parent who demanded their child be transferred from Jennings' class to Chen's — or vice versa?",
            "Design a metric that captures what Mr. Jennings' classroom produces (intellectual courage, tolerance for ambiguity, original thinking) in a way that could be reported alongside test scores. Is this possible? What does the difficulty tell you?",
          ]} />

          <RestartBtn onClick={() => { setStage(0); setWeek(0); setDecision(null); }} />
        </div>
      );
    },
  ];

  return <Shell animating={anim} color={C.gold}>{stages[stage]()}</Shell>;
}
