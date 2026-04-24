import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { Expandable } from "../components/shared.jsx";
import { StageHeader, InfoBox, ChoiceBtn, Shell, ResultBox, CounterArgument, DiscussionGuide, PhiloRef, RestartBtn } from "./ExperimentShared.jsx";
import { useAudio } from "../components/shared.jsx";
import { DoppelgangerScene } from "../components/diagrams.jsx";

export default function DoppelgangerExperiment() {
  const [act, setAct] = useState(0);
  const [choices, setChoices] = useState({});
  const [guess, setGuess] = useState(null);
  const [anim, setAnim] = useState(false);
  const audio = useAudio();

  const go = (key, val, nextAct) => {
    audio.playChime();
    setAnim(true);
    setChoices({ ...choices, [key]: val });
    setTimeout(() => { setAct(nextAct !== undefined ? nextAct : act + 1); setAnim(false); }, 500);
  };

  useEffect(() => () => audio.stopAll(), [audio]);

  const responses = [
    { name: "Alex", text: "I think Kafka is showing how alienation changes identity at the biological level. Gregor doesn't just feel different — he IS different. The transformation is literal because Kafka wants us to stop treating alienation as metaphor. It's real, physical, devastating.", av: "🟦", style: "casual" },
    { name: "Jordan", text: "The metamorphosis operates on three registers simultaneously: the somatic (Gregor's body), the social (the family's response), and the existential (the question of whether identity persists through radical transformation). Kafka's genius is that he refuses to privilege any one reading — the literal and metaphorical coexist without resolution, which mirrors the fundamental ambiguity of human self-understanding.", av: "🟪", style: "polished" },
    { name: "Sam", text: "ok this might be a weird take but I kept thinking about how his family adjusts? Like at first they're horrified but then they just... adapt? And by the end Grete is the one who says they need to get rid of him. That's the real horror — not the bug thing, but how fast people can normalize abandoning someone they supposedly love.", av: "🟩", style: "raw" },
    { name: "Riley", text: "Building on Sam's point — Kafka wrote this in 1915, right when industrialization was turning workers into interchangeable parts. Gregor was already a bug metaphorically: he was a traveling salesman who existed only to produce income for his family. The physical transformation just made the economic truth visible. When he can't work, he's discarded.", av: "🟧", style: "contextual" },
    { name: "Casey", text: "I want to push back on the purely economic reading. Kafka's diaries from this period show he was terrified of his father and felt physically diminished by him. The metamorphosis is also deeply personal — it's about what happens to the self when you've internalized someone else's contempt. Gregor becomes what his father always made him feel like.", av: "🟥", style: "researched" },
  ];
  const AI_IDX = 1; // Jordan — too comprehensive, too balanced, no vulnerability

  const acts = [
    // ─── ACT 0: INTRO ───
    () => (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <DoppelgangerScene />
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.5rem", marginBottom: 12 }}>The Digital Doppelgänger</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 12px" }}>
          You are <strong style={{ color: C.textPrimary }}>Mr. Torres</strong>, an AP Literature teacher at a suburban high school. It's September 2026. Over the course of one semester, you will confront a question that no generation of educators has ever faced:
        </p>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.08rem", lineHeight: 1.5, maxWidth: 480, margin: "0 auto 24px" }}>
          When a student's AI agent — indistinguishable from the student themselves — attends class, participates, and learns... who was educated?
        </p>
        <p style={{ color: C.textMuted, fontSize: "0.82rem", maxWidth: 420, margin: "0 auto 24px" }}>
          This experiment unfolds across five acts. Your choices at each stage will cascade into the next. There are no resets between acts — just as there are none in a real semester.
        </p>
        <button onClick={() => { audio.playDeep(); setAct(1); }} style={{ padding: "14px 40px", background: `linear-gradient(135deg, ${C.coral}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem", boxShadow: `0 4px 24px rgba(192,112,64,0.25)` }}>
          Begin the Semester
        </button>
      </div>
    ),

    // ─── ACT 1: THE TEXT DISCUSSION ───
    () => (
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.coral, marginBottom: 8 }}>Act I · September</div>
        <StageHeader num="1" title="The Discussion Board" color={C.coral} />
        <InfoBox color={C.ocean}>
          <p>Monday morning. You open the class discussion board for your AP Literature seminar on Kafka's <em>The Metamorphosis</em>. Twenty-two students were assigned to post initial responses over the weekend.</p>
          <p style={{ marginTop: 12 }}>You received an email Friday evening from Kai Nakamura's parent: <em>"Kai is recovering from a concussion and won't be in class this week. Their AI study partner will be participating in their place to keep up with coursework. Kai will review all interactions during recovery."</em></p>
          <p style={{ marginTop: 12 }}>You weren't sure how to respond, so you didn't. Now, looking at the discussion board, five responses catch your eye. <strong style={{ color: C.coral }}>One of them was written by Kai's AI agent.</strong></p>
        </InfoBox>

        <p style={{ color: C.textMuted, fontSize: "0.82rem", marginBottom: 6, fontStyle: "italic" }}>Discussion prompt: "What does Gregor Samsa's transformation reveal about the relationship between identity and the body?"</p>

        {responses.map((r, i) => (
          <button key={i}
            onClick={() => { if (guess === null) { setGuess(i); audio.playClick(); } }}
            onMouseOver={e => { if (guess === null) { e.currentTarget.style.borderColor = C.gold + "50"; e.currentTarget.style.transform = "translateX(3px)"; } }}
            onMouseOut={e => { if (guess === null) { e.currentTarget.style.borderColor = guess === i ? (i === AI_IDX ? C.coral : C.teal) : C.border; e.currentTarget.style.transform = "none"; } }}
            disabled={guess !== null}
            aria-label={`Select ${r.name}'s response as the AI-written one`}
            style={{
              display: "block", width: "100%", textAlign: "left",
              background: guess === i ? (i === AI_IDX ? `${C.coral}12` : `${C.teal}10`) : C.surface,
              border: `1px solid ${guess === i ? (i === AI_IDX ? C.coral : C.teal) : C.border}`,
              borderRadius: 12, padding: "14px 18px", marginBottom: 10,
              cursor: guess === null ? "pointer" : "default", transition: "all 0.3s",
              opacity: guess !== null && guess !== i ? 0.45 : 1,
              font: "inherit",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: "1.1rem" }} aria-hidden="true">{r.av}</span>
              <strong style={{ color: C.textPrimary, fontSize: "0.9rem" }}>{r.name}</strong>
              {guess === i && <span style={{ fontSize: "0.68rem", padding: "2px 10px", borderRadius: 4, background: i === AI_IDX ? C.coral : `${C.teal}30`, color: i === AI_IDX ? "#fff" : C.teal, fontWeight: 700, marginLeft: 4 }}>{i === AI_IDX ? "✓ AI AGENT" : "✗ HUMAN"}</span>}
            </div>
            <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>{r.text}</p>
          </button>
        ))}
        {guess === null && <p style={{ textAlign: "center", color: C.gold, fontSize: "0.84rem", marginTop: 8 }}>Click the response you believe was written by the AI agent ↑</p>}

        {guess !== null && (
          <div style={{ marginTop: 16 }}>
            <ResultBox color={guess === AI_IDX ? C.teal : C.coral}>
              {guess === AI_IDX
                ? "You identified Jordan's response as the AI agent. The tells were subtle: comprehensive coverage of multiple interpretive registers, a perfectly balanced conclusion acknowledging ambiguity, and — critically — no intellectual risk. Every other student took a position and defended it. The AI hedged."
                : `You identified ${responses[guess].name}'s response, but the AI was actually Jordan. What made Jordan's response suspicious: it covered three analytical frameworks simultaneously without committing to any of them, referenced 'fundamental ambiguity' as a catch-all, and never took a genuine intellectual risk. The other students — including the one you flagged — all had a recognizable human quality: conviction, confusion, or vulnerability.`}
            </ResultBox>

            <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginTop: 14 }}>
              The philosophy underlying this moment is deceptively deep. <PhiloRef text="John Searle's Chinese Room argument" url="https://plato.stanford.edu/entries/chinese-room/" /> (1980) posits that a system can manipulate symbols perfectly without understanding their meaning. Jordan's response is syntactically sophisticated and semantically plausible — but it wasn't generated through the process of <em>encountering</em> Kafka. No AI agent has read <em>The Metamorphosis</em> in the way Sam has — staying up too late, feeling disturbed, bringing that unresolved feeling into class. The question isn't whether the output is good. It's whether the process that produced it constitutes <em>learning</em>.
            </p>

            <CounterArgument color={C.teal}>
              <p>But consider: if Kai reviews this discussion thread during recovery and engages deeply with all five responses — including the AI's — Kai may learn <em>more</em> than a student who participated in real time but only skimmed others' posts. The <PhiloRef text="flipped classroom model" url="https://en.wikipedia.org/wiki/Flipped_classroom" /> already separates content delivery from active engagement. Perhaps the AI proxy is just an extension of that logic.</p>
            </CounterArgument>

            <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "16px 0" }}>How do you respond to Kai's parent?</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <ChoiceBtn onClick={() => go("act1", "allow", 2)} color={C.teal}>Allow it — Kai's recovering, and the AI participation was substantive</ChoiceBtn>
              <ChoiceBtn onClick={() => go("act1", "flag", 2)} color={C.gold}>Allow it this time, but flag it for department discussion</ChoiceBtn>
              <ChoiceBtn onClick={() => go("act1", "prohibit", 2)} color={C.coral}>Prohibit it — students must participate personally or not at all</ChoiceBtn>
            </div>
          </div>
        )}
      </div>
    ),

    // ─── ACT 2: THE VOICE CLONE ───
    () => (
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.coral, marginBottom: 8 }}>Act II · November</div>
        <StageHeader num="2" title="The Voice Clone" color={C.ocean} />

        <ResultBox>
          {choices.act1 === "allow" && "You allowed Kai's AI participation. Word spread. Other students took notice."}
          {choices.act1 === "flag" && "You flagged the issue. Your department discussed it inconclusively for two meetings. No policy emerged."}
          {choices.act1 === "prohibit" && "You prohibited AI proxies. Kai's parent filed a complaint with the principal, arguing you discriminated against a student with a medical condition. The complaint is still pending."}
        </ResultBox>

        <InfoBox color={C.ocean}>
          <p>Two months later. Your school has adopted a hybrid model — students attend in person three days a week and via Zoom on Tuesdays and Thursdays.</p>
          <p style={{ marginTop: 12 }}>On a Thursday Zoom session, you're leading a Socratic seminar on <em>Beloved</em> by Toni Morrison. Twenty minutes in, you call on Kai to respond to a peer's comment about Sethe's relationship with memory.</p>
          <p style={{ marginTop: 12 }}>"Kai" responds immediately. The voice is Kai's — the same cadence, the same slight hesitation before complex thoughts, even the ambient sound of Kai's bedroom. The response is thoughtful and specific: it references a passage from Chapter 15 and connects it to <PhiloRef text="Paul Ricoeur's theory of narrative identity" url="https://plato.stanford.edu/entries/ricoeur/" />.</p>
          <p style={{ marginTop: 12 }}>But something nags at you. Kai has never referenced Ricoeur before. And the response was <em>too</em> ready — no "um," no pause to gather thoughts, no half-formed idea revised mid-sentence. You check Kai's camera: it's off, as it often is for Zoom students.</p>
          <p style={{ marginTop: 12 }}><strong style={{ color: C.coral }}>You suspect you are talking to Kai's AI agent using a voice clone.</strong></p>
        </InfoBox>

        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          The technology enabling this is already available. Voice cloning services like ElevenLabs can produce convincing replicas from minutes of sample audio. AI agent platforms can be instructed to adopt a persona, reference course materials, and participate in real-time conversations. A student with moderate technical skill could configure this in an afternoon.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          The philosophical stakes have escalated. In Act I, the AI produced text — a medium where polish is common and impersonation relatively easy. Now it has crossed into <em>voice</em> — a medium we instinctively associate with presence, authenticity, and personhood. As <PhiloRef text="Emmanuel Levinas" url="https://plato.stanford.edu/entries/levinas/" /> argued, the voice is where ethical encounter begins: the "face-to-face" (even on Zoom) is the origin of moral obligation. When the face and voice are synthetic, what happens to that obligation?
        </p>

        <CounterArgument>
          <p>Students already participate inauthentically in class discussions — reading from prepared notes, saying what they think the teacher wants to hear, staying silent because of anxiety rather than ignorance. If Kai reviews the AI's contributions and learns from the discussion, the <em>outcome</em> may be equivalent. <PhiloRef text="Peter Singer" url="https://www.utilitarianism.net/peter-singer" /> would argue that what matters is whether learning occurred, not the process by which it occurred. The voice clone is unsettling but perhaps morally irrelevant.</p>
        </CounterArgument>

        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "20px 0 16px" }}>What do you do in the moment?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("act2", "confront", 3)} color={C.coral}>Ask directly: "Kai, is this actually you speaking right now?"</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act2", "test", 3)} color={C.gold}>Test it subtly — ask about something personal only Kai would know</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act2", "continue", 3)} color={C.teal}>Continue the discussion — address it privately later</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act2", "ignore", 3)} color={C.ocean}>Let it go — the contribution was valuable regardless</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── ACT 3: THE PROLIFERATION ───
    () => (
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.coral, marginBottom: 8 }}>Act III · January</div>
        <StageHeader num="3" title="The Proliferation" color={C.gold} />

        <ResultBox>
          {choices.act2 === "confront" && "You asked directly. There was a long pause, then: 'Yeah, Mr. Torres, it's me. I was just using some notes.' You couldn't prove otherwise. The class felt the tension. Trust frayed."}
          {choices.act2 === "test" && "You asked about last Tuesday's in-class activity. The response was vague but plausible. You couldn't prove anything conclusively, and the attempt felt uncomfortable — like interrogating a student for learning too well."}
          {choices.act2 === "continue" && "You raised the concern with Kai privately. Kai's response: 'I was there, Mr. Torres. I just prepared really well.' You have no policy that defines what 'being there' means on Zoom."}
          {choices.act2 === "ignore" && "You let it go. The contribution WAS valuable — it elevated the entire discussion. Other students engaged with 'Kai's' ideas productively. But you can't shake the feeling that something fundamental shifted."}
        </ResultBox>

        <InfoBox color={C.gold}>
          <p>January. The semester is half over. You've noticed a pattern.</p>
          <p style={{ marginTop: 12 }}>On Zoom days, <strong style={{ color: C.gold }}>four of your twenty-two students</strong> now display the same telltale signs: cameras off, responses that are articulate but frictionless, references to scholarship slightly beyond what you'd expect. You can't prove any of them are using AI proxies. The line between "well-prepared student" and "AI agent" has become essentially invisible.</p>
          <p style={{ marginTop: 12 }}>Here's what disturbs you most: <strong style={{ color: C.coral }}>discussion quality has measurably improved</strong>. The AI contributions are raising the intellectual floor. Students who previously lurked are engaging more because the discussion threads are richer. Your department chair visited a Zoom session and praised the "exceptional level of discourse."</p>
          <p style={{ marginTop: 12 }}>But Sam Chen — your most intellectually honest student, the one who always takes risks and sometimes fails beautifully — has gone quiet. After class, Sam tells you: <em>"Why should I spend an hour crafting a response when an AI can do it in ten seconds and sound smarter than I ever will? I feel like I'm competing against something I can't beat."</em></p>
        </InfoBox>

        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          This is the <strong>displacement effect</strong> that <PhiloRef text="Rose Luckin" url="https://www.educateventures.com" /> warned about in her February 2026 newsletter: a "Jevons Paradox for cognitive effort." When AI makes intellectual performance cheap and easy, the students who invested genuine effort feel devalued. The <PhiloRef text="APA's June 2025 health advisory" url="https://www.apa.org" /> on AI companions noted that AI systems may "displace or interfere with development of healthy real-world relationships" — but in the classroom, they may also displace the <em>willingness to think</em>.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          <PhiloRef text="Gert Biesta" url="https://www.gertbiesta.com" /> would identify what's being lost: <em>subjectification</em>. Education's highest purpose isn't qualification (knowledge transfer) or even socialization (learning norms) — it's the formation of students as autonomous subjects who can think, risk, and act in the world on their own terms. Sam's discouragement isn't just about grades or competition. It's about the erosion of a space where authentic intellectual struggle was valued. When AI proxies make perfect performance effortless, the struggle that produces genuine growth becomes pointless — or worse, a competitive disadvantage.
        </p>

        <CounterArgument>
          <p>Consider a different framing: perhaps Sam's discouragement is temporary — the same discomfort calculators caused math students in the 1970s. Students eventually learned to use calculators as tools while developing deeper mathematical reasoning. AI proxies might follow the same trajectory: initially threatening, eventually integrated. The key question, as <PhiloRef text="Ethan Mollick argues" url="https://www.oneusefulthing.org" />, is whether we help students learn <em>with</em> AI rather than letting them learn to <em>avoid thinking</em> because of AI.</p>
        </CounterArgument>

        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "20px 0 16px" }}>How do you respond to Sam — and to the class?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("act3", "ban", 4)} color={C.coral}>Ban AI proxies entirely — require cameras-on and real-time verification</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act3", "redesign", 4)} color={C.gold}>Redesign assessments to make AI proxies irrelevant — prioritize in-person, oral, spontaneous work</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act3", "integrate", 4)} color={C.teal}>Integrate AI explicitly — require students to use AI AND explain how their thinking differs from it</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act3", "conversation", 4)} color={C.ocean}>Have an honest conversation with the class about what's happening and co-create norms together</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── ACT 4: THE EXAM ───
    () => (
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.coral, marginBottom: 8 }}>Act IV · May</div>
        <StageHeader num="4" title="The Exam" color={C.coral} />

        <ResultBox>
          {choices.act3 === "ban" && "You required cameras-on and real-time verification. Three students' parents complained this was invasive. One student with social anxiety had a panic attack on camera. The AI proxies mostly stopped — but you suspect some students now use real-time AI earpieces instead."}
          {choices.act3 === "redesign" && "You shifted to in-person Socratic seminars, oral exams, and handwritten timed essays. Discussion quality dipped as students lost the AI scaffolding they'd come to depend on. But over time, authentic voices re-emerged. Sam started participating again."}
          {choices.act3 === "integrate" && "You required students to submit both their AI-generated response and a reflection explaining where they agree, disagree, or build beyond the AI. Some students produced brilliant metacognitive work. Others treated the reflection as a formality. The gap between genuine engagement and compliance widened."}
          {choices.act3 === "conversation" && "The class conversation was revelatory. Students admitted to feeling pressure, confusion, and guilt. Two admitted to using AI proxies. The class co-created norms: AI assistance is welcome, AI impersonation is not. The distinction between 'tool' and 'proxy' became the class's central philosophical question."}
        </ResultBox>

        <InfoBox color={C.coral}>
          <p>May. Final exam week. AP Literature. In-person, supervised, no devices.</p>
          <p style={{ marginTop: 12 }}>The prompt: "In a well-developed essay, analyze how one author we studied this year uses a specific literary technique to explore the theme of transformation. Support your argument with close textual analysis."</p>
          <p style={{ marginTop: 12 }}>You grade the exams blind. When you match names to papers, something stops you cold.</p>
          <p style={{ marginTop: 12 }}><strong style={{ color: C.coral }}>Kai Nakamura's exam is competent but generic.</strong> It addresses transformation in <em>The Metamorphosis</em> using correct but surface-level observations — the kind of response you'd expect from a student who read the SparkNotes but never wrestled with the text. There's nothing wrong with it. There's also nothing of "Kai" in it — none of the sophisticated multi-register analysis, the Ricoeur references, the elegant prose that "Kai" contributed all semester.</p>
          <p style={{ marginTop: 12 }}>The AI agent learned Kafka. Kai did not.</p>
          <p style={{ marginTop: 12 }}>You look at Kai's semester record: brilliant discussion contributions, thoughtful peer responses, a participation grade that would be among the highest in the class. And a final exam that suggests none of that learning actually transferred to the student.</p>
        </InfoBox>

        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          This is the most philosophically consequential moment of the semester. It reveals the gap between <em>performance</em> and <em>learning</em> — between what <PhiloRef text="Microsoft Research (October 2025)" url="https://www.microsoft.com/en-us/research/" /> called the distinction between "productivity gains" and "learning gains." The AI proxy produced excellent educational outputs. But the educational <em>inputs</em> — the struggle, the confusion, the gradual construction of understanding — never happened for Kai.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          <PhiloRef text="Robert Pondiscio (AEI, 2025)" url="https://www.aei.org/op-eds/the-illusion-of-learning-the-danger-of-artificial-intelligence-to-education/" /> framed this precisely: "AI can perform education's outputs — essays, analyses, answers — without any of its inputs." The Learning Pill thought experiment (<a href="#" onClick={e => { e.preventDefault(); }} style={{ color: C.teal }}>The Shortcut</a>) asks this abstractly. Kai's exam answers it concretely: <strong>the shortcut produced the appearance of learning without the reality of it.</strong>
        </p>

        <CounterArgument>
          <p>Is this really different from a student who had an excellent tutor? Or who collaborated with brilliant classmates and absorbed their ideas? Learning is always social and scaffolded. Perhaps Kai DID learn from reviewing the AI's contributions — just not enough to perform independently under exam conditions. The exam format itself may be the problem: it privileges isolated recall over collaborative understanding, which is <em>not</em> how knowledge works in the real world. As <PhiloRef text="Sal Khan acknowledged in 2026" url="https://www.chalkbeat.org/2026/04/09/sal-khan-reflects-on-ai-in-schools-and-khanmigo/" />, even Khanmigo found that 80–85% of students couldn't formulate questions independently — suggesting the capacity for self-directed learning is itself a skill that must be taught.</p>
        </CounterArgument>

        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", margin: "20px 0 16px" }}>What grade does Kai receive for the semester?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("act4", "exam-weight", 5)} color={C.coral}>Weight the exam heavily — it's the only verified measure of Kai's actual learning</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act4", "participation", 5)} color={C.teal}>Average participation and exam — the semester's work has value even if AI-assisted</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act4", "investigate", 5)} color={C.gold}>Investigate first — meet with Kai to understand what actually happened</ChoiceBtn>
          <ChoiceBtn onClick={() => go("act4", "pass-flag", 5)} color={C.ocean}>Pass Kai but flag the discrepancy for the student's record and future teachers</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── ACT 5: THE POLICY ───
    () => (
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.coral, marginBottom: 8 }}>Act V · June</div>
        <StageHeader num="✦" title="The Policy Committee" color={C.gold} gradient />

        <ResultBox>
          {choices.act4 === "exam-weight" && "Kai received a C+. The parent filed a formal grade appeal, arguing the semester-long contributions were genuine participation regardless of method. The appeal is pending."}
          {choices.act4 === "participation" && "Kai received a B+. You feel uneasy — rewarding performance you suspect was artificial. But you couldn't prove it, and the participation was technically real, even if the participant wasn't."}
          {choices.act4 === "investigate" && "You met with Kai. Kai admitted to using the AI proxy on most Zoom days but insisted they 'reviewed everything afterward.' Kai seemed genuinely surprised by the exam gap — they thought the learning had stuck. It hadn't."}
          {choices.act4 === "pass-flag" && "You passed Kai and added a note to the file. Next year's teacher will see it. But you wonder: is this fair to Kai? To the next teacher? Is it even legal to flag suspected AI use without proof?"}
        </ResultBox>

        <InfoBox color={C.gold} gradient>
          <p>Summer. Your principal asks you to join the school's AI Policy Committee. You're drafting guidelines for the 2027–28 school year. The committee includes teachers, parents, students, an IT specialist, and a school board representative.</p>
          <p style={{ marginTop: 12 }}>After your semester-long experience, you understand the stakes better than anyone in the room. The committee needs to define three things:</p>
        </InfoBox>

        <div style={{ display: "grid", gap: 12, margin: "16px 0" }}>
          {[
            { q: "What constitutes 'presence' in education?", detail: "If a student's AI agent attends via Zoom with their voice, is the student 'present'? What about a student who is physically in the room but mentally disengaged? Which is more present?", color: C.teal },
            { q: "What constitutes 'participation'?", detail: "If an AI generates a discussion response that other students engage with productively, has 'participation' occurred? Does it matter who — or what — initiated the ideas that advanced the class's understanding?", color: C.gold },
            { q: "What is education for?", detail: "This is Biesta's question, and it's the one that determines everything else. If education is primarily about qualification (knowledge and skills), AI proxies are a feature. If it's about subjectification (becoming an autonomous thinker), AI proxies are a fundamental threat.", color: C.coral },
          ].map((item, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${item.color}20`, borderRadius: 12, padding: 16 }}>
              <p style={{ color: item.color, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, marginBottom: 6 }}>{item.q}</p>
              <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          <PhiloRef text="NYC Public Schools' March 2026 policy" url="https://www.schools.nyc.gov/about-us/vision-and-mission/guidance-on-artificial-intelligence" /> places AI proxies firmly in the "Red" zone (prohibited). <PhiloRef text="Ohio House Bill 96" /> mandates every public district adopt formal AI policies by July 2026. <PhiloRef text="Tennessee" /> was the first state to require public posting of AI policies. But none of these frameworks anticipated voice-cloned AI agents attending class in real time. The technology has outpaced the policy.
        </p>

        <Expandable title="Your Semester at a Glance" color={C.ocean}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { l: "Act I: Discussion board", v: choices.act1 || "—" },
              { l: "Act II: Voice clone", v: choices.act2 || "—" },
              { l: "Act III: Proliferation", v: choices.act3 || "—" },
              { l: "Act IV: The exam", v: choices.act4 || "—" },
            ].map((c, i) => (
              <div key={i} style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
                <p style={{ color: C.textMuted, fontSize: "0.72rem" }}>{c.l}</p>
                <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, textTransform: "capitalize" }}>{c.v}</p>
              </div>
            ))}
          </div>
        </Expandable>

        <Expandable title="What This Experiment Reveals" color={C.gold} defaultOpen>
          <p>The Digital Doppelgänger is not science fiction. Every component — text-based AI participation, voice cloning, AI agents with persona instructions, real-time conversational AI — exists today in consumer-grade products. The only thing preventing this scenario is the gap between what's technically possible and what students have thought to do. That gap is closing rapidly.</p>
          <p style={{ marginTop: 12 }}>The experiment isolates a question that no previous generation of educators has faced: <strong>when AI can perfectly simulate a student's presence, what does "being educated" actually mean?</strong></p>
          <p style={{ marginTop: 12 }}>Your choices across five acts reveal your implicit theory of education. If you prioritized outcomes (allowing proxies when contributions were valuable), you hold a broadly consequentialist view. If you prioritized authenticity (prohibiting proxies regardless of quality), you hold a deontological or virtue-ethics view. If you sought to redesign rather than prohibit, you recognize that the technology won't go away and the challenge is pedagogical, not disciplinary.</p>
          <p style={{ marginTop: 12 }}>All three positions are philosophically defensible. None is complete. The task ahead is not choosing between them but building institutions wise enough to hold the tension.</p>
        </Expandable>

        <Expandable title="The Philosophical Stakes" color={C.teal}>
          <p><strong><PhiloRef text="Biesta's subjectification" url="https://www.gertbiesta.com" />:</strong> If education's highest purpose is the formation of autonomous subjects who can think, risk, and act independently — AI proxies are not a tool but a threat. They remove the very conditions (struggle, vulnerability, authentic encounter) that produce independent thinkers.</p>
          <p style={{ marginTop: 12 }}><strong><PhiloRef text="Levinas on the face" url="https://plato.stanford.edu/entries/levinas/" />:</strong> Ethical obligation arises from encountering another person's face — their vulnerability, their demand on us. A voice clone has no face. An AI proxy makes no ethical demand. The classroom becomes a space of exchange without encounter.</p>
          <p style={{ marginTop: 12 }}><strong><PhiloRef text="Aristotle on hexis" />:</strong> Virtue is an active disposition formed through repeated practice (<em>NE</em> II, 1103a–1105b). You don't become a thinker by having an AI think for you, any more than you become courageous by having someone else face your fears. The shortcut produces knowledge without character.</p>
          <p style={{ marginTop: 12 }}><strong><PhiloRef text="Sparrow & Flenady (2025)" url="https://link.springer.com/article/10.1007/s00146-025-02340-8" />:</strong> Even if the normative arguments succeed — even if we demonstrate philosophically that AI proxies undermine education — economic and institutional pressures may override them. "Money talks." The history of automation in other industries shows it is naïve to think AI can <em>assist</em> teachers without eventually being used to <em>replace</em> them.</p>
        </Expandable>

        <DiscussionGuide questions={[
          "If a student's AI agent contributes a brilliant insight that advances the class's understanding, should the student receive participation credit? Why or why not — and which ethical framework does your answer reflect?",
          "How would you define 'authentic presence' in a way that distinguishes between a disengaged student physically in the room and an AI proxy that actively enriches discussion? Is your definition about the student's experience or the class's?",
          "Kai's exam revealed a gap between AI-generated performance and actual learning. Design an assessment approach that makes this gap visible BEFORE the final exam — without prohibiting AI entirely.",
        ]} />

        <RestartBtn onClick={() => { setAct(0); setChoices({}); setGuess(null); }} />
      </div>
    ),
  ];

  return <Shell animating={anim} color={C.coral}>{acts[act]()}</Shell>;
}
