import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { Expandable } from "../components/shared.jsx";
import { StageHeader, InfoBox, ChoiceBtn, Shell, ResultBox, CounterArgument, DiscussionGuide, PhiloRef, RestartBtn } from "./ExperimentShared.jsx";
import { useAudio } from "../components/shared.jsx";
import { ShortcutScene } from "../components/diagrams.jsx";

export default function TheShortcutExperiment() {
  const [stage, setStage] = useState(0);
  const [choices, setChoices] = useState({});
  const [anim, setAnim] = useState(false);
  const audio = useAudio();
  const go = (k, v) => { audio.playChime(); setAnim(true); setChoices({ ...choices, [k]: v }); setTimeout(() => { setStage(stage + 1); setAnim(false); }, 500); };
  useEffect(() => () => audio.stopAll(), [audio]);

  const stages = [
    // ─── INTRO ───
    () => (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <ShortcutScene />
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.5rem", marginBottom: 10 }}>The Shortcut</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 12px" }}>
          Computer scientist <PhiloRef text="Daniel Lemire" url="https://lemire.me/blog/2012/11/16/the-learning-pill/" /> posed a version of this question in 2012: imagine a pill granting instant expert knowledge. He predicted the pill would be made illegal, educators would insist knowledge is "just one component," and degrees would persist because they signal character. A decade later, AI is testing every one of those predictions.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.93rem", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 24px" }}>
          This experiment asks you to confront four escalating versions of the same question. Your answers will map onto real philosophical frameworks — and real policy positions.
        </p>
        <button onClick={() => { audio.playDeep(); setStage(1); }} style={{ padding: "14px 36px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.93rem", boxShadow: `0 4px 20px rgba(26,138,122,0.25)` }}>Begin the Experiment</button>
      </div>
    ),

    // ─── STAGE 1: THE PREMISE ───
    () => (
      <div>
        <StageHeader num="1" title="The Premise" color={C.teal} />
        <InfoBox color={C.teal}>
          <p>Imagine a technology — call it a pill, a neural implant, a download — that grants <strong style={{ color: C.teal }}>instant, complete mastery</strong> of any subject. Not mere memorization: genuine, deep understanding. A physicist who takes it could advance the field. A musician could compose as a virtuoso. The knowledge is indistinguishable from expertise acquired through decades of study.</p>
          <p style={{ marginTop: 12 }}>The shortcut is painless, produces no cognitive damage, and carries no side effects. The understanding is real. It is free.</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          This scenario deliberately removes every practical objection — cost, safety, reliability — to isolate the purely philosophical question. If every barrier is removed, does something still feel wrong about bypassing the process of learning? <PhiloRef text="Robert Nozick" url="https://en.wikipedia.org/wiki/Experience_machine" /> used the same technique with his Experience Machine: by making the machine perfect, he forced us to confront what we actually value beyond subjective experience.
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>Should you take the shortcut?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("basic", "yes")}>Yes — take it</ChoiceBtn>
          <ChoiceBtn onClick={() => go("basic", "no")}>No — refuse it</ChoiceBtn>
          <ChoiceBtn onClick={() => go("basic", "depends")}>It depends on what I'm learning</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── STAGE 2: SCARCITY ───
    () => (
      <div>
        <StageHeader num="2" title="The Scarcity Condition" color={C.ocean} />
        <ResultBox>You chose to {choices.basic === "yes" ? "take" : choices.basic === "no" ? "refuse" : "conditionally consider"} the shortcut. Now the conditions change — and your principles face their first real test.</ResultBox>
        {choices.basic === "yes" && <CounterArgument><p><PhiloRef text="Aristotle" url="https://iep.utm.edu/aristotle-ethics/" /> would argue you've confused knowledge with wisdom. In the <em>Nicomachean Ethics</em> (Book II, 1103a), he insists virtue arises through habituation: "We learn by doing them — men become builders by building." A shortcut produces <em>episteme</em> (theoretical knowledge) but not <em>phrónēsis</em> (practical wisdom) — the capacity to apply knowledge wisely in particular circumstances. You know physics, but you haven't become a physicist.</p></CounterArgument>}
        {choices.basic === "no" && <CounterArgument><p>A <PhiloRef text="utilitarian" url="https://www.utilitarianism.net/" /> would ask: at what cost? If refusing the shortcut means years of struggle that could be spent actually applying knowledge to reduce suffering, your refusal becomes a form of self-indulgence. The person who takes the medical shortcut and spends those saved years curing diseases has arguably done more good than the one who spent a decade in medical school "the hard way."</p></CounterArgument>}
        {choices.basic === "depends" && <CounterArgument><p>Your instinct to differentiate is philosophically astute — <PhiloRef text="Gilbert Ryle" url="https://plato.stanford.edu/entries/ryle/" /> distinguished "knowing that" from "knowing how." Perhaps the shortcut works for propositional knowledge (history, physics) but not for procedural knowledge (surgery, teaching, parenting). But where exactly is the line? And who decides?</p></CounterArgument>}
        <InfoBox color={C.sky}>
          <p>Now suppose the shortcut is <strong style={{ color: C.sky }}>available only to some</strong>. It's expensive, or the supply is limited. Your child could take it — but most children in their school cannot.</p>
          <p style={{ marginTop: 12 }}>Those who take it will possess expert-level knowledge across multiple fields. Those who don't will learn traditionally — through years of study, confusion, practice, and gradual mastery. The gap between the two groups could be enormous. This is not hypothetical: a <PhiloRef text="RAND study (2025)" url="https://www.rand.org/pubs/research_reports/RRA4742-1.html" /> found AI homework use grew from 48% to 62% in seven months, and access correlates strongly with socioeconomic status.</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          This stage transforms an individual philosophical question into a political one. <PhiloRef text="John Rawls" url="https://plato.stanford.edu/entries/rawls/" /> would ask: behind a "veil of ignorance" — not knowing whether you'd be rich or poor — would you design a society where this shortcut exists? If unequal access to the shortcut deepens existing inequality, perhaps equity demands universal access. But if universal access undermines the developmental value of learning, perhaps equity demands prohibition.
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>Would you give your child the shortcut?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("scarcity", "yes")} color={C.ocean}>Yes — I can't let them fall behind</ChoiceBtn>
          <ChoiceBtn onClick={() => go("scarcity", "no")} color={C.ocean}>No — even at the cost of disadvantage</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── STAGE 3: UNIVERSAL ───
    () => (
      <div>
        <StageHeader num="3" title="Universal Availability" color={C.gold} />
        {choices.scarcity === "yes" && <CounterArgument><p>You chose competitive advantage over principle. Most parents would. But notice: you're now in a position where you've conceded that the shortcut is acceptable <em>when the stakes are personal</em>. This is precisely how <PhiloRef text="Sparrow and Flenady (2025)" url="https://link.springer.com/article/10.1007/s00146-025-02340-8" /> predict AI will erode educational standards — not through ideology but through individual rational decisions that aggregate into systemic change. "Money talks."</p></CounterArgument>}
        {choices.scarcity === "no" && <CounterArgument><p>You chose principle over advantage. Admirable — but your child may struggle while peers surge ahead. <PhiloRef text="The Inside Higher Ed/Generation Lab survey (2025)" url="https://www.insidehighered.com/news/students/academics/2025/08/29/survey-college-students-views-ai" /> found 37% of students violate AI policies due to grade pressure. At what point does principled refusal become harmful to your child? And who are you to make that choice for them?</p></CounterArgument>}
        <InfoBox color={C.gold}>
          <p>Now the shortcut is <strong style={{ color: C.gold }}>universally available, free, and safe for everyone</strong>. Anyone can take it at any time. Knowledge acquisition is no longer scarce.</p>
          <p style={{ marginTop: 12 }}>What happens to schools? To universities? To the years of study, the late nights, the struggle to understand?</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          <PhiloRef text="Gert Biesta" url="https://www.gertbiesta.com" /> argues education serves three irreducible purposes: <em>qualification</em> (knowledge and skills), <em>socialization</em> (communicating norms and values), and <em>subjectification</em> (becoming an autonomous subject of one's own life). The shortcut might deliver qualification — perhaps even elements of socialization if the knowledge includes cultural competence. But subjectification requires something no shortcut can provide: the experience of encountering difficulty, risking failure, and emerging changed. As Biesta writes, education involves a "beautiful risk" — the possibility that the student will become someone <em>the educator did not anticipate</em>.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          Lemire predicted in 2012 that even a perfect shortcut would not disrupt colleges, because education serves social, signaling, and character-building functions beyond knowledge. <PhiloRef text="His blog post" url="https://lemire.me/blog/2012/11/16/the-learning-pill/" /> generated a telling comment: "I predict we would have much more radical changes than the ones you speculate" — suggesting institutions would transform rather than simply persist.
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>In this world, should schools still exist?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("universal", "yes")} color={C.gold}>Yes — education is more than knowledge</ChoiceBtn>
          <ChoiceBtn onClick={() => go("universal", "no")} color={C.gold}>No — their main purpose would be gone</ChoiceBtn>
          <ChoiceBtn onClick={() => go("universal", "different")} color={C.gold}>They'd need to become something fundamentally different</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── STAGE 4: DEVELOPMENTAL ───
    () => (
      <div>
        <StageHeader num="4" title="The Developmental Question" color={C.coral} />
        {choices.universal === "yes" && <CounterArgument><p>If schools exist only for socialization and character formation, they become something closer to summer camp than to institutions of learning. Is that sustainable politically? Would taxpayers fund institutions whose primary purpose is intangible? <PhiloRef text="Sparrow and Flenady" url="https://link.springer.com/article/10.1007/s00146-025-02340-8" /> argue it is "naïve to think AI can assist teachers without eventually replacing them" because economic logic inevitably favors automation.</p></CounterArgument>}
        {choices.universal === "no" && <CounterArgument><p>But what about the non-academic purposes of school? Socialization, physical activity, emotional development, community belonging, the discovery of talents and interests through exposure — these are not knowledge transfer, and they have enormous value. Even if qualification becomes obsolete, the other purposes don't.</p></CounterArgument>}
        {choices.universal === "different" && <CounterArgument><p>This is pragmatically wise but philosophically incomplete. What would schools become? If they focus on character, creativity, and community — can those qualities be assessed? Funded? Credentialed? The current educational system is built on the assumption that knowledge acquisition is hard and valuable. Remove that assumption and the entire institutional structure loses its foundation.</p></CounterArgument>}
        <InfoBox color={C.coral}>
          <p>Even if the shortcut is universally safe, <strong style={{ color: C.coral }}>should access be limited by age?</strong> Should a three-year-old receive instant mastery of quantum mechanics? Should a ten-year-old bypass learning to read — with all the patience, frustration, and triumph that entails?</p>
        </InfoBox>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          This is where Aristotle's argument becomes most powerful. In the <em>Nicomachean Ethics</em> (<PhiloRef text="Book II, 1103a–1105b" url="https://www.usna.edu/CoreEthics/Essays/Aristotle_-_Habits_and_virtue.pdf" />), he argues that virtue arises through habituation (<em>ethos</em>): we become courageous by acting courageously, just by acting justly, temperate by exercising temperance. His concept of <em>hexis</em> is not passive habit but an active disposition formed through repeated, deliberate engagement with difficulty.
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 14 }}>
          <PhiloRef text="Manu Kapur's research on 'productive failure'" url="https://www.goodreads.com/book/show/208444312" /> (2024) provides empirical support: learning conditions that reduce performance during practice <em>enhance</em> long-term retention and transfer. <PhiloRef text="Bellwether Education Partners (2025)" url="https://bellwether.org/publications/productive-struggle/" /> synthesized this in "Productive Struggle," noting AI's default tendency is to eliminate struggle entirely — threatening the cognitive mechanisms that produce genuine learning. <PhiloRef text="Hasan (2025)" url="https://pmc.ncbi.nlm.nih.gov/articles/PMC12333830/" /> showed AI tools bypass the brain's dopamine-mediated effort-reward cycle.
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.02rem", margin: "20px 0 16px" }}>Should there be an age limit on the shortcut?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChoiceBtn onClick={() => go("age", "yes")} color={C.coral}>Yes — development requires the process</ChoiceBtn>
          <ChoiceBtn onClick={() => go("age", "no")} color={C.coral}>No — withholding knowledge is paternalistic</ChoiceBtn>
        </div>
      </div>
    ),

    // ─── STAGE 5: REFLECTION ───
    () => (
      <div>
        <StageHeader num="✦" title="What The Shortcut Reveals" color={C.gold} gradient />
        {choices.age === "yes" && <CounterArgument><p>If the process matters for children, doesn't it also matter for adults? If you said "yes" to the shortcut for yourself but "no" for children, you've drawn a line between developmental learning and adult knowledge acquisition. Where exactly does that line fall — and who enforces it? This tension between protecting children and respecting autonomy is one of the oldest problems in political philosophy.</p></CounterArgument>}
        <InfoBox color={C.gold} gradient>
          <p><strong style={{ color: C.gold }}>The shortcut is not hypothetical.</strong> It stands in for any technology that radically compresses the process of learning — including the AI systems already in classrooms worldwide. As <PhiloRef text="Sal Khan acknowledged in 2026" url="https://www.chalkbeat.org/2026/04/09/sal-khan-reflects-on-ai-in-schools-and-khanmigo/" />, even Khanmigo found that 80–85% of students couldn't formulate questions independently, because the capacity for self-directed inquiry is itself a skill that must be developed through practice.</p>
          <p style={{ marginTop: 12 }}>The experiment isolates a question at the heart of every AI education policy: <strong style={{ color: C.teal }}>Is education valuable mainly because of what it produces, or because of the process it requires us to undergo?</strong></p>
        </InfoBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "20px 0" }}>
          {[{ l: "Take the shortcut?", v: choices.basic }, { l: "Give to your child?", v: choices.scarcity }, { l: "Schools still exist?", v: choices.universal }, { l: "Age limit?", v: choices.age }].map((c, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px" }}>
              <p style={{ color: C.textMuted, fontSize: "0.75rem", marginBottom: 3 }}>{c.l}</p>
              <p style={{ color: C.gold, fontSize: "0.88rem", fontWeight: 600, textTransform: "capitalize" }}>{c.v || "—"}</p>
            </div>
          ))}
        </div>
        <Expandable title="Philosophical Parallels" color={C.ocean}>
          <p><strong><PhiloRef text="Nozick's Experience Machine (1974)" url="https://en.wikipedia.org/wiki/Experience_machine" />:</strong> Most refuse to plug in — we want to <em>do</em> things, not just experience doing them. A 2024 paper in <em>Annals of the University of Bucharest</em> re-examined this for AI companions.</p>
          <p style={{ marginTop: 10 }}><strong><PhiloRef text="Jackson's Mary's Room (1982)" url="https://plato.stanford.edu/entries/qualia-knowledge/" />:</strong> Mary knows every fact about color but has never seen it. <PhiloRef text="Brock & Hay (2019)" url="https://link.springer.com/article/10.1007/s11191-019-00060-2" /> applied this to classrooms: propositional knowledge without direct experience is incomplete.</p>
          <p style={{ marginTop: 10 }}><strong><PhiloRef text="Plato's Cave" url="https://en.wikipedia.org/wiki/Allegory_of_the_cave" />:</strong> The prisoner must walk out themselves. <PhiloRef text="Waitzman (2025)" url="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5707094" /> developed a 4-stage AI literacy framework from this.</p>
          <p style={{ marginTop: 10 }}><strong><PhiloRef text="Searle's Chinese Room (1980)" url="https://plato.stanford.edu/entries/chinese-room/" />:</strong> Syntax without semantics is not understanding. If AI tutors manipulate symbols without understanding, can they genuinely teach?</p>
          <p style={{ marginTop: 10 }}><strong><PhiloRef text="Dewey (1938)" url="https://en.wikipedia.org/wiki/Experience_and_Education_(book)" />:</strong> "There is an intimate and necessary relation between the process of actual experience and education." Continuity and interaction require temporal process that cannot be compressed.</p>
        </Expandable>
        <DiscussionGuide questions={[
          "If you could give your students a shortcut to mastering your subject's content knowledge, would you? What would be lost? What would you do with the time that's freed up?",
          "Identify one learning objective in your curriculum where the process of learning is more important than the outcome. How would you protect that process from AI shortcuts?",
          "How would your school's AI policy change if you took seriously the possibility that AI is a partial shortcut — delivering qualification but not socialization or subjectification?",
        ]} />
        <RestartBtn onClick={() => { setStage(0); setChoices({}); }} />
      </div>
    ),
  ];

  return <Shell animating={anim}>{stages[stage]()}</Shell>;
}
