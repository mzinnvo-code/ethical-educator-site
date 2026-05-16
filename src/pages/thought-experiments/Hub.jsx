import { useState } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, Expandable, SectionTitle, Subtitle, Narrow, PageContainer,
  BodyText, Divider, TopicCard, ContinueExploring,
} from "../../components/shared.jsx";
import { PhiloRef } from "../../experiments/ExperimentShared.jsx";
import { ConvergenceDiagram } from "../../components/diagrams.jsx";
import ExperimentGrid from "../../components/ExperimentGrid.jsx";
import ScenarioCard from "../../components/ScenarioCard.jsx";
import { EXPERIMENTS, getExperimentsByGrade } from "../../data/experiments.js";
import { getFeatureIllustration } from "../../data/illustrations.js";

// Pick three "featured this week" — rotates by ISO week, deterministic.
function featuredThisWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
  const pool = EXPERIMENTS.filter(e => e.tier === "scenario");
  const out = [];
  for (let i = 0; i < 3 && i < pool.length; i++) {
    out.push(pool[(week * 3 + i) % pool.length]);
  }
  return out;
}

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

export default function Hub({ navigate }) {
  const [active, setActive] = useState(null);
  const middleSchoolById = new Map(getExperimentsByGrade("6-8").map(experiment => [experiment.id, experiment]));
  const featured = featuredThisWeek().map(experiment =>
    experiment.gradeBands.includes("6-8") ? middleSchoolById.get(experiment.id) || experiment : experiment
  );
  const educatorFeature = getFeatureIllustration("thought-experiments/educators");

  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        {/* HERO */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <span style={{
              display: "inline-block", padding: "5px 14px",
              background: `linear-gradient(135deg, rgba(26,138,122,0.14), rgba(26,90,138,0.14))`,
              border: `1px solid rgba(26,138,122,0.25)`,
              borderRadius: 18, fontSize: "0.7rem", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal,
            }}>
              An Interactive Library
            </span>
          </div>
          <SectionTitle>Thought Experiments</SectionTitle>
          <Subtitle>
            A growing library of interactive scenarios — for kindergartners, eighth-graders, AP Philosophy
            students, and the educators teaching them all. Some are 2,400 years old. Some are about your classroom.
            None have right answers. All of them help us think.
          </Subtitle>
        </FadeIn>

        <Narrow>
          {/* K-12 AUDIENCE TILES — three-up grid for the student-facing grade bands, separated from the For Educators section below. */}
          <Divider label="Pick a grade band" />
          <FadeIn>
            <BodyText>
              The student-facing material is organised by grade. K-5 leans on stories and read-aloud.
              6-8 leans on dilemmas. 9-12 is the philosophical canon alongside the AI questions of our age.
            </BodyText>
          </FadeIn>
          <div className="grid-3" style={{ marginTop: 18, marginBottom: 18 }}>
            <TopicCard
              icon="🧸" iconLabel="Teddy bear"
              image={getFeatureIllustration("thought-experiments/k-5")}
              title="K–5"
              desc="A grade-by-grade elementary hub with storylike dilemmas, read-aloud support, and teacher kits."
              onClick={() => navigate("thought-experiments/k-5")}
              accent={C.coral} delay={0}
            />
            <TopicCard
              icon="🚋" iconLabel="Trolley"
              image={getFeatureIllustration("thought-experiments/6-8")}
              title="Grades 6–8"
              desc="Story-based dilemmas that connect AI ethics to identity, fairness, and the big questions."
              onClick={() => navigate("thought-experiments/6-8")}
              accent={C.gold} delay={0.05}
            />
            <TopicCard
              icon="🕳️" iconLabel="Cave"
              image={getFeatureIllustration("thought-experiments/9-12")}
              title="Grades 9–12"
              desc="The philosophical canon — Plato's Cave, Mary's Room, the Chinese Room — alongside the AI questions of our age."
              onClick={() => navigate("thought-experiments/9-12")}
              accent={C.ocean} delay={0.1}
            />
          </div>

          {/* TOOLKIT + DECISION JOURNAL — two-up callout that lives between the grade picker and For Educators. */}
          <div className="grid-2" style={{ marginBottom: 32 }}>
            <TopicCard
              icon="🛠" iconLabel="Toolkit"
              image={getFeatureIllustration("thought-experiments/toolkit")}
              title="Dialogue Toolkit"
              desc="Norms, sentence stems, twelve protocols, five Socratic moves, a 'what do I do when…' decision tree, and a parallel global canon."
              onClick={() => navigate("thought-experiments/toolkit")}
              accent={C.teal} delay={0}
            />
            <TopicCard
              icon="📓" iconLabel="Notebook"
              image={getFeatureIllustration("thought-experiments/journal")}
              title="Decision Journal"
              desc="A private, browser-only record of your reasoning across thought experiments. Notes, paths, and a Markdown export. Nothing leaves your device."
              onClick={() => navigate("thought-experiments/journal")}
              accent={C.gold} delay={0.05}
            />
          </div>

          {/* FOR EDUCATORS — its own dedicated section, not in the K-12 audience grid. */}
          <Divider label="For Educators" />
          <FadeIn>
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate("thought-experiments/educators")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("thought-experiments/educators");
                }
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 22,
                alignItems: "center",
                padding: "26px 28px",
                marginTop: 14,
                marginBottom: 28,
                background: `linear-gradient(135deg, ${C.teal}14, ${C.ocean}08)`,
                border: `1px solid ${C.teal}30`,
                borderLeft: `4px solid ${C.teal}`,
                borderRadius: 14,
                cursor: "pointer",
                outline: "none",
                transition: "all 0.24s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 32px ${C.teal}22`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div>
                <p style={{
                  color: C.teal,
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}>Adult dilemmas · For Staff PD</p>
                <h3 style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  color: C.textPrimary,
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  lineHeight: 1.22,
                  marginBottom: 8,
                }}>For Educators</h3>
                <p style={{
                  color: C.textSecondary,
                  fontSize: "0.94rem",
                  lineHeight: 1.6,
                  marginBottom: 12,
                  maxWidth: 660,
                }}>
                  Four flagship multi-stage scenarios designed for the conversations you wish you'd had before
                  the vendor demo. The Shortcut, the AI Authorship Quandary, the Reluctant Educator, the Digital
                  Doppelgänger. Built for staff meetings, leadership retreats, and policy work.
                </p>
                <span style={{
                  color: C.teal,
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}>Open the educator flagships <span aria-hidden="true">→</span></span>
              </div>
              <figure style={{
                width: "clamp(92px, 16vw, 124px)",
                aspectRatio: "1 / 1",
                borderRadius: 18,
                overflow: "hidden",
                background: `linear-gradient(135deg, ${C.teal}30, ${C.ocean}18)`,
                border: `1px solid ${C.teal}45`,
                boxShadow: `0 16px 44px rgba(0,0,0,0.24), 0 0 28px ${C.teal}14`,
                flexShrink: 0,
                margin: 0,
              }}>
                <img
                  src={educatorFeature?.src}
                  alt={educatorFeature?.alt || ""}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </figure>
            </div>
          </FadeIn>

          {/* WHAT IS A THOUGHT EXPERIMENT? — moved below the picker so it doesn't front-load text before the visitor's most useful first action. */}
          <Divider label="What is a thought experiment?" />
          <FadeIn>
            <BodyText>
              A thought experiment is a <strong>device of the imagination</strong> used to investigate the nature
              of things. When real experiments would be impossible, dangerous, or impractical — when the question
              is about consciousness, identity, justice, or a future we haven't lived yet — philosophers and
              scientists set up an imagined scenario to isolate one variable and test our intuitions against it.{" "}
              <PhiloRef text="The Stanford Encyclopedia of Philosophy" url="https://plato.stanford.edu/entries/thought-experiment/" />{" "}
              describes them as the most powerful intuition pumps we have.
            </BodyText>
            <BodyText>
              Galileo dropped two cannonballs of different weights — but only in his head — and reasoned that
              Aristotle had been wrong about gravity for two thousand years. Einstein imagined himself riding
              alongside a beam of light, and out fell special relativity. Plato imagined prisoners watching
              shadows in a cave, and educators have wrestled with what real understanding means ever since.
              The thought experiment is older than the laboratory. It works because thinking, done carefully,
              is itself a way of finding things out.
            </BodyText>
          </FadeIn>

          {/* WHY THEY MATTER NOW */}
          <Divider label="Why they matter now" />
          <FadeIn>
            <BodyText>
              We are running a real-time experiment with artificial intelligence in our classrooms, our courts,
              our news feeds, and our friendships. We have no precedent. We have no track record. We have many
              very confident vendors. What we do have is <strong>2,400 years of careful imagined scenarios</strong> that
              already framed most of the questions: What makes a mind? What do we owe each other? When is a
              choice authentic? Who counts? Whose work is this?
            </BodyText>
            <BodyText>
              The Trolley Problem is now being programmed into self-driving cars. Plato's Ring of Gyges is
              the design brief for every anonymous account. Mary's Room is what happens when a student
              arrives at fluency without ever having struggled. Thought experiments give a teacher and a
              fourteen-year-old a shared language for things neither of them has lived through yet.
            </BodyText>
          </FadeIn>

          {/* HOW TO USE THEM */}
          <Divider label="Using them in your classroom" />
          <FadeIn>
            <Expandable title="The four norms" color={C.teal} defaultOpen>
              <p><strong>1. There are no right answers.</strong> A thought experiment that ends in a verdict has been
              misunderstood. The point is the conversation it makes possible.</p>
              <p style={{ marginTop: 10 }}><strong>2. Steelman the option you didn't choose.</strong> Before you defend yours,
              try to argue the opposite as well as you can. This is the single most underused move in classroom dialogue.</p>
              <p style={{ marginTop: 10 }}><strong>3. Probe assumptions, not people.</strong> The Socratic move isn't "you're wrong" —
              it's "what would have to be true for that to be right?" That keeps the room safe and the thinking sharp.</p>
              <p style={{ marginTop: 10 }}><strong>4. Pair with writing.</strong> Speaking and writing exercise different muscles.
              A short reflection after a discussion ("Which option still bothers you, and why?") locks in the learning.</p>
            </Expandable>
            <Expandable title="A simple Socratic move set" color={C.gold}>
              <p><strong>Clarify:</strong> "Can you say that another way?"</p>
              <p style={{ marginTop: 8 }}><strong>Probe assumption:</strong> "What does that depend on?"</p>
              <p style={{ marginTop: 8 }}><strong>Counter-example:</strong> "What if instead of A, it were B — does your answer change?"</p>
              <p style={{ marginTop: 8 }}><strong>Implication:</strong> "If that's true, then what else has to be true?"</p>
              <p style={{ marginTop: 8 }}><strong>Meta:</strong> "Why is this question hard?"</p>
            </Expandable>
            <Expandable title="By age band" color={C.coral} defaultOpen>
              <p><strong>K–5:</strong> Choose the grade page first. Kindergarten stories are short and concrete; Grade 5 stories are longer,
              more layered, and ready for competing values. The read-aloud button on every K–5 prompt is built in for non-readers and early readers.</p>
              <p style={{ marginTop: 10 }}><strong>6–8:</strong> Two scenarios, paired with a quick written reflection. Have students
              defend the option they didn't pick. Magic happens when they realize they can.</p>
              <p style={{ marginTop: 10 }}><strong>9–12 / AP Philosophy:</strong> One scenario in depth. Read the original source. Compare ethical
              lenses (utilitarian, deontological, virtue, care). Connect it to a current AI story in the news that morning.</p>
              <p style={{ marginTop: 10 }}><strong>For educators (PD, leadership team, board meetings):</strong> The four flagship interactive
              experiments under <em>For Educators</em> are designed for adult professional dialogue — your AI policy depends on
              decisions it's better to make through scenario than through abstraction.</p>
            </Expandable>
          </FadeIn>

          {/* FEATURED THIS WEEK */}
          {!active && (
            <>
              <Divider label="Featured this week" />
              <FadeIn>
                <BodyText style={{ marginBottom: 18 }}>
                  Three experiments to start with — one for younger students, one for middle school, one for the philosophical canon.
                </BodyText>
              </FadeIn>
              <ExperimentGrid experiments={featured} onSelect={(e) => setActive(e)} />
            </>
          )}

          {active && (
            <>
              <Divider label={active.title} />
              <button
                onClick={() => setActive(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 12,
                  background: "none", border: "none", color: C.textMuted, cursor: "pointer",
                  fontSize: "0.84rem", padding: 0,
                }}
              >
                ← Back to featured
              </button>
              <ScenarioCard
                experiment={active}
                mode={active.gradeBands.includes("k-5") ? "kid" : active.gradeBands.includes("6-8") ? "story" : "canon"}
                onClose={() => setActive(null)}
              />
            </>
          )}

          {/* PHILOSOPHICAL CANON */}
          <Divider label="The Philosophical Canon" />
          <FadeIn delay={0.06}><BodyText>The four flagship interactive experiments under <em>For Educators</em> are
            original scenarios. But they draw on a rich tradition of thought experiments — each illuminating a
            different dimension of the same question: <strong>can the process of learning be separated from its value?</strong></BodyText></FadeIn>

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
              <p><strong><PhiloRef text="Dewey" url="https://en.wikipedia.org/wiki/Experience_and_Education_(book)" /> (1938):</strong> Education is life itself, not preparation for it. His principles of continuity and interaction require temporal process that cannot be compressed.</p>
              <p style={{ marginTop: 10 }}><strong><PhiloRef text="Aristotle" url="https://iep.utm.edu/aristotle-ethics/" /> (c. 340 BCE):</strong> "For the things we have to learn before we can do them, we learn by doing them." Virtue requires habituation through practice. As <PhiloRef text="Shannon Vallor" url="https://www.shannonvallor.net/books.html" /> argues in <em>The AI Mirror</em> (2024), AI lacks Aristotelian <em>phrónēsis</em> — practical wisdom that can only develop through lived experience.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.14}><ConvergenceDiagram /></FadeIn>

          <FadeIn delay={0.16}>
            <Expandable title="The Convergence" color={C.gold} tag="Synthesis" defaultOpen>
              <p style={{ padding: "16px 20px", background: `linear-gradient(135deg, rgba(200,152,48,0.08), rgba(26,138,122,0.06))`, borderRadius: 12, border: `1px solid rgba(200,152,48,0.15)`, fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.02rem", lineHeight: 1.7 }}>
                <strong>The process of learning is constitutive of its value, not merely instrumental to it.</strong>
              </p>
              <p style={{ marginTop: 14 }}>Eight thinkers across 2,400 years — Plato, Aristotle, Dewey, Nozick, Jackson, Searle, Huxley, Lemire — working independently across vastly different traditions, arrived at compatible conclusions. The convergence suggests this insight reflects something deep about the nature of knowledge, learning, and human development.</p>
            </Expandable>
          </FadeIn>

          <Divider />
          <FadeIn>
            <ContinueExploring
              navigate={navigate}
              links={[
                withImage({ id: "thought-experiments/educators", icon: "🍎", title: "For Educators", desc: "Flagship dilemmas for adults", color: C.teal }),
                withImage({ id: "thought-experiments/k-5", icon: "🧸", title: "K–5", desc: "Read-aloud, illustrated", color: C.coral }),
                withImage({ id: "thought-experiments/6-8", icon: "🚋", title: "6–8", desc: "Story-based AI ethics", color: C.gold }),
                withImage({ id: "thought-experiments/9-12", icon: "🕳️", title: "9–12", desc: "The philosophical canon", color: C.ocean }),
                withImage({ id: "thought-experiments/toolkit", icon: "🛠", title: "Dialogue Toolkit", desc: "Norms, protocols, global canon", color: C.teal }),
              ]}
            />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
