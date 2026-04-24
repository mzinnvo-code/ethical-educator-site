import { useState } from "react";
import { C, isNewExperiment } from "../theme.js";
import { FadeIn, Expandable, SectionTitle, Subtitle, Narrow, PageContainer, NewBadge, BodyText, Divider } from "../components/shared.jsx";
import { PhiloRef } from "../experiments/ExperimentShared.jsx";
import { ConvergenceDiagram } from "../components/diagrams.jsx";
import TheShortcutExperiment from "../experiments/TheShortcut.jsx";
import AuthorshipExperiment from "../experiments/Authorship.jsx";
import ReluctantEducatorExperiment from "../experiments/ReluctantEducator.jsx";
import DoppelgangerExperiment from "../experiments/Doppelganger.jsx";

function ExperimentCard({ icon, iconLabel, title, tagline, color, gradientFrom, gradientTo, isNew, onClick, animDelay = "0s" }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: `linear-gradient(145deg, ${gradientFrom || color + "12"}, ${gradientTo || color + "06"})`,
      border: `1px solid ${h ? color + "40" : color + "18"}`, borderRadius: 16, padding: "32px 22px",
      cursor: "pointer", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", position: "relative", overflow: "hidden",
      transform: h ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      boxShadow: h ? `0 16px 48px ${color}15, 0 0 0 1px ${color}20` : "none", height: "100%",
    }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${color}12, transparent 70%)`, filter: "blur(20px)", transition: "all 0.5s", opacity: h ? 0.8 : 0.3 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "2.4rem", marginBottom: 14, animation: `cardFloat 3s ease-in-out infinite`, animationDelay: animDelay }}>
          {iconLabel ? <span role="img" aria-label={iconLabel}>{icon}</span> : <span aria-hidden="true">{icon}</span>}
        </div>
        {isNew && <div style={{ position: "absolute", top: 0, right: 0 }}><NewBadge /></div>}
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.05rem", fontWeight: 700, marginBottom: 6 }}>{title}</h3>
        <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.55, marginBottom: 14 }}>{tagline}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ padding: "3px 10px", background: `${color}15`, border: `1px solid ${color}25`, borderRadius: 12, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color }}>Interactive</span>
          <span style={{ color: h ? color : C.textMuted, fontSize: "0.82rem", transition: "all 0.3s", transform: h ? "translateX(4px)" : "none", display: "inline-block" }}>→</span>
        </div>
      </div>
    </div>
  );
}

const experiments = [
  { id: "the-shortcut", icon: "⚡", iconLabel: "Lightning bolt", title: "The Shortcut", tagline: "If you could bypass the entire process of learning and arrive at mastery instantly — should you? Four escalating scenarios. No right answers.", color: C.teal, gf: "rgba(26,138,122,0.12)", gt: "rgba(26,90,138,0.06)", Comp: TheShortcutExperiment },
  { id: "ai-authorship", icon: "📝", iconLabel: "Memo", title: "The AI Authorship Quandary", tagline: "Same essay. Same AI. Four people. Four completely different truths. Choose a role and navigate the fallout.", color: C.gold, gf: "rgba(200,152,48,0.12)", gt: "rgba(192,112,64,0.06)", Comp: AuthorshipExperiment },
  { id: "reluctant-educator", icon: "📊", iconLabel: "Bar chart", title: "The Reluctant Educator", tagline: "When test scores and critical thinking pull in opposite directions — watch the data diverge, then make the call.", color: C.coral, gf: "rgba(192,112,64,0.12)", gt: "rgba(200,152,48,0.06)", Comp: ReluctantEducatorExperiment },
  { id: "digital-doppelganger", icon: "👤", iconLabel: "Silhouette", title: "The Digital Doppelgänger", tagline: "A five-act semester. Voice clones. AI proxies. An exam that exposes everything. Who was educated?", color: C.ocean, gf: "rgba(26,90,138,0.12)", gt: "rgba(26,138,122,0.06)", Comp: DoppelgangerExperiment },
];

export default function ThoughtExperiments({ navigate }) {
  const [active, setActive] = useState(null);

  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <style>{`@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      <PageContainer>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{ display: "inline-block", padding: "4px 14px", background: `linear-gradient(135deg, rgba(26,138,122,0.12), rgba(26,90,138,0.12))`, border: `1px solid rgba(26,138,122,0.2)`, borderRadius: 16, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal }}>
              Interactive Thought Experiments
            </span>
          </div>
          <SectionTitle>Thought Experiments</SectionTitle>
          <Subtitle>Hypothetical scenarios designed to isolate philosophical questions about education, morality, and AI. Each is fully interactive — your choices shape the philosophical landscape, counter-arguments challenge your reasoning, and discussion guides help you bring these conversations to your school. Written for philosophical rigor. Built for engagement.</Subtitle>
        </FadeIn>

        {/* CARD GRID */}
        {!active && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 36 }}>
            {experiments.map((e, i) => (
              <FadeIn key={e.id} delay={i * 0.08}>
                <ExperimentCard icon={e.icon} iconLabel={e.iconLabel} title={e.title} tagline={e.tagline} color={e.color} gradientFrom={e.gf} gradientTo={e.gt} isNew={isNewExperiment(e.id)} animDelay={`${i * 0.5}s`}
                  onClick={() => { setActive(e.id); window.scrollTo({ top: 300, behavior: "smooth" }); }} />
              </FadeIn>
            ))}
          </div>
        )}

        {/* ACTIVE EXPERIMENT */}
        {active && (
          <Narrow>
            <div style={{ marginTop: 32 }}>
              <button onClick={() => setActive(null)} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: "0.84rem", padding: 0, transition: "color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.color = C.gold} onMouseOut={e => e.currentTarget.style.color = C.textMuted}>
                ← Back to all experiments
              </button>
              {experiments.map(e => active === e.id ? <e.Comp key={e.id} /> : null)}
            </div>
          </Narrow>
        )}

        {/* PHILOSOPHICAL CANON */}
        {!active && (
          <Narrow>
            <Divider label="The Philosophical Canon" />
            <FadeIn delay={0.06}><BodyText>The four interactive experiments above are original scenarios. But they draw on a rich tradition of philosophical thought experiments — each illuminating a different dimension of the same question: <strong>can the process of learning be separated from its value?</strong></BodyText></FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Nozick's Experience Machine (1974)" color={C.teal} tag="Authenticity">
                <p>Would you plug into a machine simulating a perfect life? Most refuse — suggesting we value <strong>authentic engagement with reality</strong> beyond subjective experience. <PhiloRef text="A 2024 paper" url="https://annalsphilosophy-ub.org/2024/10/re-examining-nozicks-experience-machine-in-view-of-emerging-ai-companions/" /> re-examined this for AI companions, finding what matters is not what people <em>say</em> they'd choose but what they actually choose. <PhiloRef text="Hindriks & Douven (2019)" /> showed the less invasive the intervention, the more willing people are to accept — and <PhiloRef text="De Brigard (2010)" /> demonstrated responses are confounded by status quo bias.</p>
                <p style={{ marginTop: 10 }}><strong>For AI in education:</strong> If AI provides simulated mastery experiences — the student <em>feels</em> they understand but hasn't struggled — are we offering an educational Experience Machine?</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="Jackson's Mary's Room (1982)" color={C.ocean} tag="Experience">
                <p>Mary knows every physical fact about color but has never seen it. When she sees red, she learns something new — proving phenomenal experience delivers knowledge that propositional information cannot. <PhiloRef text="Brock & Hay (2019)" url="https://link.springer.com/article/10.1007/s11191-019-00060-2" /> applied this directly to science education in <em>Science & Education</em>, arguing students without direct experience possess "Mary's knowledge" — complete in theory, incomplete in understanding.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Expandable title="Plato's Cave · Searle's Chinese Room · The Matrix" color={C.gold} tag="Process">
                <p><strong><PhiloRef text="Plato" url="https://en.wikipedia.org/wiki/Allegory_of_the_cave" /> (c. 380 BCE):</strong> The prisoner must walk out of the cave themselves. <PhiloRef text="Waitzman (2025)" url="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5707094" /> developed a four-stage AI literacy framework from this: Exposure → Interrogation → Comparison → Reflection.</p>
                <p style={{ marginTop: 10 }}><strong><PhiloRef text="Searle (1980)" url="https://plato.stanford.edu/entries/chinese-room/" />:</strong> Syntax without semantics is not understanding. A <PhiloRef text="January 2025 paper in Inquiry" url="https://www.tandfonline.com/doi/full/10.1080/0020174X.2024.2446241" /> challenged this, arguing LLM outputs should be viewed as "genuinely meaningful" even without original intentionality.</p>
                <p style={{ marginTop: 10 }}><strong>The Matrix (1999):</strong> Neo gets kung fu downloaded — but still needs to spar with Morpheus. The <PhiloRef text="British Educational Research Association" url="https://www.bera.ac.uk/blog/i-know-kung-fu-rethinking-education-in-the-metaverse" /> used this to argue education's value lies in transformation, not transfer.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Expandable title="Dewey & Aristotle: Process as Value" color={C.coral} tag="Foundation">
                <p><strong><PhiloRef text="Dewey" url="https://en.wikipedia.org/wiki/Experience_and_Education_(book)" /> (1938):</strong> Education is life itself, not preparation for it. His principles of continuity and interaction require temporal process that cannot be compressed. <PhiloRef text="Lemire (2025)" url="https://lemire.me/blog/" /> reinforces this: practice and understanding are intertwined, not sequential.</p>
                <p style={{ marginTop: 10 }}><strong><PhiloRef text="Aristotle" url="https://iep.utm.edu/aristotle-ethics/" /> (c. 340 BCE):</strong> "For the things we have to learn before we can do them, we learn by doing them — men become builders by building and lyre players by playing the lyre" (<em>NE</em> II, 1103a). Virtue requires habituation through practice. As <PhiloRef text="Shannon Vallor" url="https://www.shannonvallor.net/books.html" /> argues in <em>The AI Mirror</em> (2024), AI lacks Aristotelian <em>phrónēsis</em> — practical wisdom that can only develop through lived experience.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.14}><ConvergenceDiagram /></FadeIn>

            <FadeIn delay={0.16}>
              <Expandable title="The Convergence" color={C.gold} tag="Synthesis" defaultOpen>
                <p style={{ padding: "16px 20px", background: `linear-gradient(135deg, rgba(200,152,48,0.08), rgba(26,138,122,0.06))`, borderRadius: 12, border: `1px solid rgba(200,152,48,0.15)`, fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.02rem", lineHeight: 1.7 }}>
                  <strong>The process of learning is constitutive of its value, not merely instrumental to it.</strong>
                </p>
                <p style={{ marginTop: 14 }}>Eight thinkers across 2,400 years — Plato, Aristotle, Dewey, Nozick, Jackson, Searle, Huxley, Lemire — working independently across vastly different traditions, arrived at compatible conclusions. The convergence suggests this insight reflects something deep about the nature of knowledge, learning, and human development. The debate about AI in education is not about whether AI is useful (it demonstrably is). It's about whether the efficiency gains it offers are worth the developmental losses it risks.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.18}>
              <Expandable title="Why Thought Experiments Matter for AI Policy" color={C.teal}>
                <p>Thought experiments <strong>force explicit engagement with values</strong>. When a school leader says "we uphold the highest ethical standards," thought experiments reveal what that commitment actually entails by presenting concrete scenarios where values compete. They are not abstract philosophical exercises — they are the most powerful tool available for moving AI policy discussions from vague aspiration to principled decision-making.</p>
                <p style={{ marginTop: 12 }}>As Matthew argues in <PhiloRef text="'From Ambiguity to Action'" url="https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/" />, creating thought experiments based on your specific school context is one of the most powerful steps toward developing AI policies that are genuinely meaningful. The four interactive experiments above can be used directly in professional development — each includes a discussion guide designed for school-level conversations.</p>
              </Expandable>
            </FadeIn>
          </Narrow>
        )}
      </PageContainer>
    </div>
  );
}
