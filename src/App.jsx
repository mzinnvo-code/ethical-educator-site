import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// COLOR PALETTE — Derived from impressionist beach paintings
// ═══════════════════════════════════════════════════════
const C = {
  bg: "#0b1622",        // Deep midnight blue (night painting)
  bgAlt: "#0e1e30",     // Slightly lighter midnight
  surface: "#12253d",   // Panel background
  surfaceHover: "#163050", 
  midnight: "#081220",  // Darkest tone
  ocean: "#1a5a8a",     // Mid ocean blue
  teal: "#1a8a7a",      // Turquoise water
  sky: "#2a88c0",       // Daytime sky blue  
  gold: "#c89830",      // Golden sand/sunset amber
  goldLight: "#e0b848", // Light gold highlight
  goldMuted: "#8a7028", // Muted gold
  sand: "#d4b868",      // Warm sand
  green: "#2a6a38",     // Palm frond green
  greenLight: "#48884a",// Light leaf green
  coral: "#c07040",     // Warm coral/orange from sunset
  textPrimary: "#e0dcd0", // Warm cream (cloud white)
  textSecondary: "#90a0b0", // Muted blue-gray
  textMuted: "#607080", // Faded text
  border: "rgba(200,152,48,0.12)",
  borderHover: "rgba(200,152,48,0.3)",
  glow: "rgba(200,152,48,0.06)",
};

// ═══════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════
const PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "moral-psych", label: "Moral Psychology" },
  { id: "ai-ethics", label: "AI & Ethics" },
  { id: "ai-education", label: "AI in Education" },
  { id: "learning-pill", label: "✦ The Learning Pill" },
  { id: "resources", label: "Resources" },
];

// ═══════════════════════════════════════════════════════
// HOOKS & UTILITIES
// ═══════════════════════════════════════════════════════
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// Synthesize simple sounds using Web Audio API
function useAudio() {
  const ctxRef = useRef(null);
  const getCtx = () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  };
  const playTone = useCallback((freq, duration = 0.3, type = "sine", vol = 0.15) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }, []);

  const playChime = useCallback(() => {
    playTone(523, 0.4, "sine", 0.1);
    setTimeout(() => playTone(659, 0.3, "sine", 0.08), 150);
    setTimeout(() => playTone(784, 0.5, "sine", 0.06), 300);
  }, [playTone]);

  const playDeep = useCallback(() => {
    playTone(180, 0.8, "sine", 0.12);
    setTimeout(() => playTone(220, 0.6, "sine", 0.08), 200);
  }, [playTone]);

  const playReveal = useCallback(() => {
    [392, 440, 494, 523, 587, 659].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.5, "sine", 0.06), i * 100);
    });
  }, [playTone]);

  const playClick = useCallback(() => playTone(800, 0.08, "square", 0.05), [playTone]);

  return { playChime, playDeep, playReveal, playClick, playTone };
}

// ═══════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════
function Expandable({ title, children, color = C.gold }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? color : C.border}`,
      borderRadius: 12, marginBottom: 14,
      background: open ? C.glow : "rgba(255,255,255,0.01)",
      transition: "all 0.3s", overflow: "hidden",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "16px 22px", background: "none", border: "none",
        color: C.textPrimary, fontSize: "1.02rem", fontFamily: "'Source Serif 4', Georgia, serif",
        fontWeight: 600, textAlign: "left", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {title}
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", color }}>▾</span>
      </button>
      <div style={{ maxHeight: open ? 3000 : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
        <div style={{ padding: "0 22px 18px", color: C.textSecondary, lineHeight: 1.78, fontSize: "0.93rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function VideoEmbed({ id, title }) {
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", margin: "16px 0", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <iframe src={`https://www.youtube.com/embed/${id}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} />
    </div>
  );
}

function TopicCard({ icon, title, desc, delay = 0 }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        background: hover ? C.surfaceHover : C.surface,
        border: `1px solid ${hover ? C.borderHover : C.border}`,
        borderRadius: 14, padding: "28px 24px", cursor: "default",
        transition: "all 0.35s",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover ? `0 12px 40px rgba(26,90,138,0.1)` : "none",
      }}>
        <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{icon}</div>
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.12rem", marginBottom: 6, fontWeight: 600 }}>{title}</h3>
        <p style={{ color: C.textMuted, fontSize: "0.88rem", lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>{children}</div>;
}

function SectionTitle({ children }) {
  return <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(1.7rem, 4vw, 2.5rem)", color: C.textPrimary, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>{children}</h2>;
}

function Subtitle({ children }) {
  return <p style={{ color: C.textMuted, fontSize: "1.02rem", lineHeight: 1.7, maxWidth: 640 }}>{children}</p>;
}

function BodyText({ children }) {
  return <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}

function PageSection({ id, children, alt = false }) {
  return (
    <section id={id} style={{ padding: "90px 0", borderTop: `1px solid ${C.border}`, background: alt ? C.bgAlt : C.bg }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>{children}</div>
    </section>
  );
}

function Narrow({ children }) {
  return <div style={{ maxWidth: 740, margin: "0 auto" }}>{children}</div>;
}

function RefItem({ children }) {
  return <p style={{ padding: "8px 0", borderBottom: `1px solid rgba(255,255,255,0.03)`, color: C.textMuted, fontSize: "0.84rem", lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace" }}>{children}</p>;
}

// ═══════════════════════════════════════════════════════
// INTERACTIVE: TROLLEY EXPERIMENT
// ═══════════════════════════════════════════════════════
function TrolleyExperiment() {
  const [choice, setChoice] = useState(null);
  const [scenario, setScenario] = useState(0);
  const audio = useAudio();
  const scenarios = [
    { title: "The Trolley Problem", desc: "A runaway trolley is heading toward five people. You can pull a lever to divert it to a side track, where it will kill one person instead. Do you pull the lever?", options: ["Pull the lever", "Do nothing"],
      analysis: ["You chose the utilitarian response — sacrificing one to save five. Most people agree. But why does the next scenario feel different?", "You chose not to intervene. Some argue that actively causing harm is worse than allowing it, even if more die. This aligns with certain deontological intuitions."] },
    { title: "The Footbridge Dilemma", desc: "Same trolley, same five people. But now you're on a footbridge. The only way to stop it is to push a large person off the bridge onto the tracks. Do you push?", options: ["Push the person", "Don't push"],
      analysis: ["The math is identical (one for five), yet most find this harder. Greene's fMRI research shows this activates emotional brain regions the lever scenario doesn't.", "Most people share your intuition. The philosophical puzzle: if the outcome is identical, why does this feel so different? Greene argues evolved emotional responses to 'up close and personal' harm explain the discrepancy."] },
    { title: "The AI Classroom Dilemma", desc: "An AI tutor can provide every student with perfectly personalized education, outperforming human teachers on every measurable outcome. Should schools replace human teachers with AI?", options: ["Replace with AI", "Keep human teachers"],
      analysis: ["You prioritized outcomes — a utilitarian perspective. But what about the intrinsic value of human connection and the shared experience of learning? This is the is/ought problem at its most urgent.", "You valued the human element over raw outcomes. Education as communal, human activity. But are you sure that intuition isn't another evolved emotional response that may not serve students best?"] },
  ];
  const s = scenarios[scenario];
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.glow}, rgba(26,90,138,0.06))`, border: `1px solid ${C.borderHover}`, borderRadius: 16, padding: 28, margin: "28px 0" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {scenarios.map((_, i) => (<div key={i} style={{ width: 28, height: 3, borderRadius: 2, background: i <= scenario ? C.gold : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />))}
      </div>
      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.1rem", marginBottom: 6 }}>Thought Experiment {scenario + 1}: {s.title}</h4>
      <p style={{ color: C.textSecondary, lineHeight: 1.7, marginBottom: 18, fontSize: "0.93rem" }}>{s.desc}</p>
      {choice === null ? (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {s.options.map((opt, i) => (
            <button key={i} onClick={() => { setChoice(i); audio.playClick(); }} style={{ padding: "11px 26px", background: "rgba(200,152,48,0.08)", border: `1px solid rgba(200,152,48,0.25)`, borderRadius: 8, color: C.textPrimary, cursor: "pointer", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.93rem", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.target.style.background = "rgba(200,152,48,0.18)"; }}
              onMouseOut={(e) => { e.target.style.background = "rgba(200,152,48,0.08)"; }}
            >{opt}</button>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ background: "rgba(200,152,48,0.06)", border: `1px solid rgba(200,152,48,0.15)`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
            <p style={{ color: C.sand, lineHeight: 1.7, fontSize: "0.91rem", fontStyle: "italic" }}>{s.analysis[choice]}</p>
          </div>
          {scenario < scenarios.length - 1 ? (
            <button onClick={() => { setScenario(scenario + 1); setChoice(null); audio.playChime(); }} style={{ padding: "9px 22px", background: C.gold, border: "none", borderRadius: 6, color: C.midnight, cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}>Next Scenario →</button>
          ) : (
            <div>
              <p style={{ color: C.textMuted, fontSize: "0.86rem", marginTop: 8, lineHeight: 1.7 }}>These dilemmas illustrate the core tension: our moral intuitions feel authoritative, but neuroscience reveals they're shaped by evolutionary pressures and emotional responses. Understanding this doesn't tell us what's right — but it helps us reason more clearly.</p>
              <button onClick={() => { setScenario(0); setChoice(null); }} style={{ padding: "9px 22px", marginTop: 10, background: "rgba(200,152,48,0.12)", border: `1px solid rgba(200,152,48,0.25)`, borderRadius: 6, color: C.gold, cursor: "pointer", fontSize: "0.86rem" }}>↺ Start Over</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// INTERACTIVE: ETHICS QUIZ
// ═══════════════════════════════════════════════════════
function EthicsQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const audio = useAudio();
  const questions = [
    { q: "A student uses AI to summarize a lesson and then studies the summary deeply. Is this ethical?", opts: ["Yes — AI enhanced learning", "No — the student didn't do the work", "It depends on school policy", "Only if the teacher knows"],
      explanation: "This aligns with using AI as a learning tool. The student engaged with material — AI served as a scaffold, not a replacement for thinking. But the answer depends on what values your school has explicitly committed to." },
    { q: "AI grading gives faster, more consistent feedback than a human teacher. Should schools mandate its use?", opts: ["Yes — students benefit from speed", "No — human judgment is irreplaceable", "Use both in parallel", "Let teachers decide"],
      explanation: "Each option reflects different values: efficiency (utilitarian), irreplaceable human connection (deontological), comprehensiveness, or teacher autonomy (virtue ethics). There's no single right answer — which is exactly why explicit value frameworks matter." },
    { q: "An AI perfectly replicates a teacher's personality and teaching style. Should it replace the teacher?", opts: ["Yes — if outcomes are equal", "Never — humans are irreplaceable", "Only for specific tasks", "This is the wrong question"],
      explanation: "As Matthew argues, the question isn't CAN AI replace teachers, but SHOULD it. Even if AI matches every capability, the value of shared humanity in education may transcend measurable outcomes. This is the is/ought distinction at its most important." },
  ];
  const handleAnswer = (i) => { audio.playClick(); setAnswers([...answers, i]); if (current < questions.length - 1) setCurrent(current + 1); else setShowResult(true); };
  if (showResult) {
    return (
      <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, margin: "20px 0" }}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, marginBottom: 14 }}>Reflection</h4>
        {questions.map((q, i) => (<div key={i} style={{ marginBottom: 18 }}><p style={{ color: C.textPrimary, fontSize: "0.88rem", fontWeight: 600, marginBottom: 4 }}>{q.q}</p><p style={{ color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.6, fontStyle: "italic" }}>{q.explanation}</p></div>))}
        <button onClick={() => { setCurrent(0); setAnswers([]); setShowResult(false); }} style={{ padding: "9px 22px", background: C.gold, border: "none", borderRadius: 6, color: C.midnight, cursor: "pointer", fontWeight: 600 }}>Try Again</button>
      </div>
    );
  }
  const q = questions[current];
  return (
    <div style={{ background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, margin: "20px 0" }}>
      <div style={{ fontSize: "0.72rem", color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Question {current + 1} of {questions.length}</div>
      <p style={{ color: C.textPrimary, fontSize: "1.02rem", lineHeight: 1.6, marginBottom: 18, fontFamily: "'Source Serif 4', Georgia, serif" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} style={{ padding: "11px 18px", textAlign: "left", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textSecondary, cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s" }}
            onMouseOver={(e) => { e.target.style.borderColor = C.gold; e.target.style.color = C.textPrimary; }}
            onMouseOut={(e) => { e.target.style.borderColor = C.border; e.target.style.color = C.textSecondary; }}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// THE LEARNING PILL — Interactive Thought Experiment
// ═══════════════════════════════════════════════════════
function LearningPillExperiment() {
  const [stage, setStage] = useState(0);
  const [choices, setChoices] = useState({});
  const [animating, setAnimating] = useState(false);
  const audio = useAudio();

  const advance = (choiceKey, choiceVal) => {
    audio.playChime();
    setAnimating(true);
    setChoices({ ...choices, [choiceKey]: choiceVal });
    setTimeout(() => { setStage(stage + 1); setAnimating(false); }, 600);
  };

  const stages = [
    // Stage 0: Introduction
    () => (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
          <div className="pill-glow" style={{
            width: 100, height: 44, borderRadius: 22, margin: "0 auto",
            background: `linear-gradient(135deg, ${C.teal}, ${C.sky})`,
            boxShadow: `0 0 40px rgba(26,138,122,0.4), 0 0 80px rgba(26,138,122,0.2)`,
            animation: "pillFloat 3s ease-in-out infinite",
          }} />
        </div>
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.6rem", marginBottom: 12 }}>The Learning Pill</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
          A new thought experiment for the age of AI. Consider carefully — your answers will shape the philosophical landscape that follows.
        </p>
        <button onClick={() => { audio.playDeep(); setStage(1); }} style={{
          padding: "14px 36px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8,
          color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem",
          boxShadow: `0 4px 20px rgba(26,138,122,0.3)`,
        }}>Begin the Experiment</button>
      </div>
    ),

    // Stage 1: The Basic Scenario
    () => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>1</div>
          <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.teal, fontSize: "1.15rem" }}>The Premise</h4>
        </div>
        <div style={{ background: "rgba(26,138,122,0.06)", border: `1px solid rgba(26,138,122,0.15)`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <p style={{ color: C.textPrimary, lineHeight: 1.8, fontSize: "0.95rem" }}>
            Imagine a pill that allows a person to <strong style={{ color: C.teal }}>instantly acquire complete understanding</strong> of any subject. It produces no pain, no cognitive damage, and no harmful side effects. A person who takes the pill does not merely memorize information — they <em>fully understand</em> the field in question, as deeply as any expert who spent decades mastering it.
          </p>
        </div>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", marginBottom: 24 }}>
          The knowledge is genuine. A person who takes a physics pill could advance the field. A person who takes a music pill could compose at the level of a virtuoso. The understanding is indistinguishable from knowledge acquired through years of study.
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.05rem", marginBottom: 20 }}>Should you take the pill?</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => advance("basic", "yes")} className="pill-btn" style={pillBtnStyle}>Yes — take it</button>
          <button onClick={() => advance("basic", "no")} className="pill-btn" style={pillBtnStyle}>No — refuse it</button>
          <button onClick={() => advance("basic", "depends")} className="pill-btn" style={pillBtnStyle}>It depends</button>
        </div>
      </div>
    ),

    // Stage 2: Scarcity Variation
    () => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.ocean, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>2</div>
          <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.sky, fontSize: "1.15rem" }}>The Scarcity Condition</h4>
        </div>
        {choices.basic && (
          <div style={{ background: "rgba(42,136,192,0.06)", border: `1px solid rgba(42,136,192,0.12)`, borderRadius: 10, padding: 16, marginBottom: 20, fontSize: "0.86rem", color: C.textMuted, fontStyle: "italic" }}>
            You chose to {choices.basic === "yes" ? "take" : choices.basic === "no" ? "refuse" : "consider"} the pill. Now the conditions change.
          </div>
        )}
        <div style={{ background: "rgba(42,136,192,0.06)", border: `1px solid rgba(42,136,192,0.15)`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <p style={{ color: C.textPrimary, lineHeight: 1.8, fontSize: "0.95rem" }}>
            Now suppose the pill is <strong style={{ color: C.sky }}>available only to a small number of people</strong>. Perhaps it's expensive, or the supply is limited. Your child has the opportunity to take it — but most children will not have access.
          </p>
        </div>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", marginBottom: 12 }}>
          Those who take the pill will possess deep expertise in any field they choose. Those who don't will learn the traditional way — through years of study, practice, and gradual mastery. The gap between the two groups could be enormous.
        </p>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", marginBottom: 24 }}>
          Would refusing the pill for your child, on principle, amount to choosing <strong style={{ color: C.textPrimary }}>disadvantage</strong>? Is it ethical to deprive your child of an opportunity that others will seize?
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.05rem", marginBottom: 20 }}>Would you give your child the pill?</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => advance("scarcity", "yes")} className="pill-btn" style={pillBtnStyle}>Yes — I can't let them fall behind</button>
          <button onClick={() => advance("scarcity", "no")} className="pill-btn" style={pillBtnStyle}>No — even at the cost of disadvantage</button>
        </div>
      </div>
    ),

    // Stage 3: Universal Availability
    () => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", color: C.midnight, fontWeight: 700, fontSize: "0.85rem" }}>3</div>
          <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.15rem" }}>Universal Availability</h4>
        </div>
        <div style={{ background: "rgba(200,152,48,0.06)", border: `1px solid rgba(200,152,48,0.15)`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <p style={{ color: C.textPrimary, lineHeight: 1.8, fontSize: "0.95rem" }}>
            Now suppose the pill is <strong style={{ color: C.gold }}>universally available, free, and safe for everyone</strong>. Anyone can take it at any time. Knowledge acquisition is no longer scarce.
          </p>
        </div>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", marginBottom: 24 }}>
          If everyone has instant access to expertise, what happens to schools? To universities? To the years of study, the late nights, the struggle to understand? Would education as we know it still have a purpose — or would most of its familiar structures be <strong style={{ color: C.textPrimary }}>exposed as merely instrumental</strong>, valuable only because they were historically the only path to knowledge?
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.05rem", marginBottom: 20 }}>In this world, should schools still exist?</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => advance("universal", "yes")} className="pill-btn" style={pillBtnStyle}>Yes — education is more than knowledge</button>
          <button onClick={() => advance("universal", "no")} className="pill-btn" style={pillBtnStyle}>No — their main purpose would be gone</button>
          <button onClick={() => advance("universal", "different")} className="pill-btn" style={pillBtnStyle}>They'd need to become something different</button>
        </div>
      </div>
    ),

    // Stage 4: The Child Question
    () => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.coral, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>4</div>
          <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.coral, fontSize: "1.15rem" }}>The Developmental Question</h4>
        </div>
        <div style={{ background: "rgba(192,112,64,0.06)", border: `1px solid rgba(192,112,64,0.15)`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <p style={{ color: C.textPrimary, lineHeight: 1.8, fontSize: "0.95rem" }}>
            Even if the pill is universally safe, <strong style={{ color: C.coral }}>should access be limited by age?</strong> Should a toddler be permitted to take a pill that yields mastery of physics, history, or mathematics? Or would such acceleration deprive the child of something essential to childhood and human development?
          </p>
        </div>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", marginBottom: 12 }}>
          Consider what a child gains from the <em>process</em> of learning to read: not just literacy, but patience, persistence, the experience of confusion giving way to clarity, the social bond with a teacher who cares. Consider the playground arguments that teach negotiation, the failed science projects that teach resilience.
        </p>
        <p style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: "0.93rem", marginBottom: 24 }}>
          If a three-year-old can understand quantum mechanics, does childhood lose something? Or is the resistance to this idea just another evolved intuition — like the resistance to pushing the man off the footbridge?
        </p>
        <p style={{ color: C.gold, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.05rem", marginBottom: 20 }}>Should there be an age limit on the Learning Pill?</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => advance("age", "yes")} className="pill-btn" style={pillBtnStyle}>Yes — development matters</button>
          <button onClick={() => advance("age", "no")} className="pill-btn" style={pillBtnStyle}>No — why withhold knowledge?</button>
        </div>
      </div>
    ),

    // Stage 5: The AI Connection + Reflection
    () => {
      audio.playReveal();
      return (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>✦</div>
            <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.15rem" }}>The Point of the Experiment</h4>
          </div>
          <div style={{ background: `linear-gradient(135deg, rgba(26,138,122,0.08), rgba(200,152,48,0.08))`, border: `1px solid rgba(200,152,48,0.2)`, borderRadius: 14, padding: 28, marginBottom: 24 }}>
            <p style={{ color: C.textPrimary, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 16 }}>
              <strong style={{ color: C.gold }}>The pill is not really about pharmacology.</strong> It stands in for any tool that radically compresses the process of learning — including advanced AI systems.
            </p>
            <p style={{ color: C.textSecondary, lineHeight: 1.8, fontSize: "0.93rem", marginBottom: 16 }}>
              When a student asks ChatGPT to explain quantum mechanics and receives a clear, personalized, infinitely patient explanation — when Khanmigo adapts to a student's interests and learning pace in real time — when AI can generate a semester's worth of practice problems calibrated to the precise edge of a student's understanding — we are already partway to the Learning Pill.
            </p>
            <p style={{ color: C.textSecondary, lineHeight: 1.8, fontSize: "0.93rem" }}>
              The thought experiment isolates a central philosophical question: <strong style={{ color: C.teal }}>Is education valuable mainly because of what it produces, or because of the process it requires us to undergo?</strong> If knowledge can be acquired without effort, delay, practice, frustration, or instruction — what, if anything, is lost?
            </p>
          </div>

          <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.05rem", marginBottom: 14 }}>Your Choices Revealed</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Take the pill?", val: choices.basic },
              { label: "Give it to your child (scarce)?", val: choices.scarcity },
              { label: "Should schools still exist?", val: choices.universal },
              { label: "Age limit?", val: choices.age },
            ].map((c, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px" }}>
                <p style={{ color: C.textMuted, fontSize: "0.78rem", marginBottom: 4 }}>{c.label}</p>
                <p style={{ color: C.gold, fontSize: "0.9rem", fontWeight: 600, textTransform: "capitalize" }}>{c.val || "—"}</p>
              </div>
            ))}
          </div>

          <Expandable title="What This Framework Reveals" color={C.teal}>
            <p>By removing cost, risk, and inefficiency, the Learning Pill forces a clearer account of <strong>what education is for</strong>. Is the aim knowledge? Competence? Socialization? Character formation? Human flourishing? Some combination?</p>
            <p style={{ marginTop: 12 }}>If you said schools should still exist even with universal pills, you're asserting that education's value transcends knowledge transfer — that struggle, formation, discipline, discovery, and developmental sequence are <em>intrinsic goods</em>, not merely necessary means to intellectual attainment.</p>
            <p style={{ marginTop: 12 }}>If you said the pill should have an age limit, you're claiming that the <em>process</em> of growing up — with all its confusion, frustration, and gradual discovery — is constitutive of becoming a fully realized person, not just an unfortunate delay on the way to competence.</p>
            <p style={{ marginTop: 12 }}>These are the same questions AI forces us to confront. And they cannot be answered by technology. They require philosophy.</p>
          </Expandable>

          <Expandable title="Philosophical Parallels" color={C.ocean}>
            <p><strong>Nozick's Experience Machine (1974):</strong> Robert Nozick asked whether you'd plug into a machine that simulates a perfect life. Most people refuse — suggesting we value authenticity over mere experience. The Learning Pill poses a similar question about knowledge: do we value knowing, or the authentic <em>process</em> of coming to know?</p>
            <p style={{ marginTop: 12 }}><strong>Jackson's Mary's Room (1982):</strong> Mary knows every physical fact about color but has never seen it. When she finally sees red, she learns something new — experiential knowledge that no amount of information could provide. Does the pill give you Mary's clinical knowledge, or her lived experience of seeing red for the first time?</p>
            <p style={{ marginTop: 12 }}><strong>Plato's Allegory of the Cave:</strong> The prisoners must walk out of the cave themselves — the journey is part of the enlightenment. Can the pill transport you outside the cave without the walk? And if so, is something lost?</p>
            <p style={{ marginTop: 12 }}><strong>Lemire's Learning Pill (2012):</strong> Computer scientist Daniel Lemire proposed a similar thought experiment, predicting that even with a perfect learning pill, colleges would persist because degrees signal character and dedication — the willingness to learn "the hard way" would itself become a valued credential.</p>
          </Expandable>

          <Expandable title="Further Reading & Research" color={C.gold}>
            <p>• Nozick, R. <em>Anarchy, State, and Utopia</em> (1974) — The Experience Machine thought experiment</p>
            <p>• Jackson, F. "Epiphenomenal Qualia." <em>Philosophical Quarterly</em> 32 (1982) — Mary's Room</p>
            <p>• Plato. <em>Republic</em>, Book VII — The Allegory of the Cave</p>
            <p>• Lemire, D. "The Learning Pill." (2012) — lemire.me/blog</p>
            <p>• Dewey, J. <em>Experience and Education</em> (1938) — On process vs. product in learning</p>
            <p>• Khan, S. <em>Brave New Words</em> (2024) — AI as partial learning pill</p>
            <p>• Aristotle. <em>Nicomachean Ethics</em> — On virtues requiring practice and habituation</p>
            <p>• UNESCO. "Guidance for Generative AI in Education and Research" (2023)</p>
            <p>• Greene, J.D. <em>Moral Tribes</em> (2013) — On evolved moral intuitions</p>
          </Expandable>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => { setStage(0); setChoices({}); }} style={{ padding: "10px 24px", background: "rgba(200,152,48,0.12)", border: `1px solid ${C.borderHover}`, borderRadius: 6, color: C.gold, cursor: "pointer", fontSize: "0.88rem" }}>↺ Restart the Experiment</button>
          </div>
        </div>
      );
    },
  ];

  const pillBtnStyle = {
    padding: "11px 24px", background: "rgba(26,138,122,0.08)",
    border: `1px solid rgba(26,138,122,0.25)`, borderRadius: 8,
    color: C.textPrimary, cursor: "pointer", fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: "0.91rem", transition: "all 0.2s",
  };

  return (
    <div style={{
      background: `linear-gradient(180deg, ${C.bgAlt}, ${C.bg})`,
      border: `1px solid rgba(26,138,122,0.15)`,
      borderRadius: 20, padding: "32px 28px",
      opacity: animating ? 0.5 : 1,
      transform: animating ? "scale(0.98)" : "scale(1)",
      transition: "all 0.4s ease",
    }}>
      {stages[stage]()}
      <style>{`
        @keyframes pillFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .pill-btn:hover { background: rgba(26,138,122,0.18) !important; border-color: ${C.teal} !important; }
      `}</style>
    </div>
  );
}

const pillBtnStyle = {
  padding: "11px 24px", background: "rgba(26,138,122,0.08)",
  border: "1px solid rgba(26,138,122,0.25)", borderRadius: 8,
  color: C.textPrimary, cursor: "pointer", fontFamily: "'Source Serif 4', Georgia, serif",
  fontSize: "0.91rem", transition: "all 0.2s",
};


// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = PAGES.map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.offsetTop - 100 } : null; }).filter(Boolean);
      const current = sections.filter(s => window.scrollY >= s.top).pop();
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.textSecondary};overflow-x:hidden}
        ::selection{background:${C.gold};color:${C.midnight}}
        a{color:${C.gold};text-decoration:none;transition:opacity 0.2s}
        a:hover{opacity:0.8}
        strong{color:${C.textPrimary}}
        .grain{position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .topbar{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;background:rgba(11,22,34,0.85);backdrop-filter:blur(16px);border-bottom:1px solid ${C.border};transition:background 0.3s}
        .topbar-logo{font-family:'Source Serif 4',Georgia,serif;font-size:0.95rem;font-weight:700;color:${C.textPrimary};cursor:pointer}
        .topbar-nav{display:flex;gap:22px;list-style:none}
        .topbar-nav li a{font-size:0.78rem;font-weight:500;color:${C.textMuted};text-decoration:none;transition:color 0.2s;letter-spacing:0.02em}
        .topbar-nav li a:hover,.topbar-nav li a.active{color:${C.gold}}
        .hamburger{display:none;background:none;border:none;cursor:pointer;width:26px;height:18px;position:relative}
        .hamburger span{position:absolute;left:0;width:100%;height:2px;background:${C.textPrimary};transition:all 0.3s}
        .hamburger span:nth-child(1){top:0}.hamburger span:nth-child(2){top:8px}.hamburger span:nth-child(3){top:16px}
        .mobile-menu{display:none;position:fixed;top:56px;left:0;right:0;background:rgba(11,22,34,0.95);backdrop-filter:blur(20px);padding:20px;border-bottom:1px solid ${C.border};z-index:999}
        .mobile-menu.open{display:block}
        .mobile-menu a{display:block;padding:10px 0;color:${C.textSecondary};font-size:0.95rem;border-bottom:1px solid rgba(255,255,255,0.04)}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        @media(max-width:768px){.topbar-nav{display:none}.hamburger{display:block}.grid-2,.grid-3{grid-template-columns:1fr !important}}
      `}</style>
      <div className="grain" />

      {/* NAV */}
      <header className="topbar" style={{ background: scrollY > 50 ? "rgba(11,22,34,0.92)" : "rgba(11,22,34,0.6)" }}>
        <div className="topbar-logo" onClick={() => scrollTo("home")}>Matthew A. Zinn</div>
        <ul className="topbar-nav">
          {PAGES.map(s => (<li key={s.id}><a href={`#${s.id}`} className={activeSection === s.id ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}>{s.label}</a></li>))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {PAGES.map(s => (<a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}>{s.label}</a>))}
      </div>

      {/* ═══ HERO ═══ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 50% 30%, rgba(26,90,138,0.08) 0%, transparent 70%), ${C.bg}` }}>
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(26,138,122,0.05) 0%, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 22 }}>Philosophy · Ethics · Education · AI</div>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(2.2rem, 6vw, 4rem)", color: C.textPrimary, fontWeight: 700, lineHeight: 1.1, marginBottom: 18, maxWidth: 780 }}>
            Where Moral Philosophy<br /><span style={{ color: C.gold }}>Meets the Age of AI</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: C.textMuted, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px" }}>
            Exploring the foundations of moral judgment, the ethics of artificial intelligence, and what it all means for education — by Matthew A. Zinn
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("learning-pill")} style={{ padding: "13px 30px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", boxShadow: `0 4px 20px rgba(26,138,122,0.25)` }}>✦ New: The Learning Pill</button>
            <button onClick={() => scrollTo("moral-psych")} style={{ padding: "13px 30px", background: "transparent", border: `1px solid ${C.borderHover}`, borderRadius: 8, color: C.gold, cursor: "pointer", fontSize: "0.9rem" }}>Explore the Research →</button>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <PageSection id="about">
        <FadeIn><SectionLabel>About</SectionLabel><SectionTitle>Matthew A. Zinn</SectionTitle></FadeIn>
        <div className="grid-2" style={{ marginTop: 28, alignItems: "start" }}>
          <FadeIn delay={0.1}>
            <div style={{ background: `linear-gradient(135deg, rgba(26,138,122,0.06), rgba(200,152,48,0.04))`, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ width: 85, height: 85, borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.8rem", color: "#fff", fontWeight: 700, margin: "0 auto 14px" }}>MZ</div>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem" }}>Matthew A. Zinn</h3>
              <p style={{ color: C.teal, fontSize: "0.78rem", marginTop: 3 }}>Philosopher · Educator · Technologist</p>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "18px 0" }} />
              <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.6 }}>MA Ethics & Applied Philosophy<br />UNC Charlotte, 2013</p>
              <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "center" }}>
                <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, fontSize: "0.76rem", border: `1px solid rgba(26,138,122,0.2)`, padding: "5px 12px", borderRadius: 6 }}>Blog</a>
                <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, fontSize: "0.76rem", border: `1px solid rgba(200,152,48,0.2)`, padding: "5px 12px", borderRadius: 6 }}>AI in Ed</a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <BodyText><strong>I study how humans make moral judgments</strong> — and what that means for the way we build, teach, and govern artificial intelligence. My work sits at the intersection of moral psychology, normative ethics, philosophy of mind, and educational technology.</BodyText>
            <BodyText>My journey began with a thesis on <strong>Joshua Greene's dual-process theory of moral judgment</strong> and F.M. Kamm's objections to it — asking whether neuroscience can tell us anything about which moral theories are correct. That question about the relationship between descriptive facts and normative claims has only grown more urgent in the age of AI.</BodyText>
            <BodyText>As an educator, I've spent years in classrooms working with students from elementary through graduate school. I started my career working with students with special needs, developing a deep appreciation for individualized education. Today, I focus on helping educators navigate the ethical complexities of AI integration — moving beyond vague appeals to "uphold ethics" toward concrete, philosophically grounded frameworks for decision-making.</BodyText>
            <BodyText>This site brings together my academic research, practical writing, and educational resources. Whether you're a philosopher, teacher, administrator, or simply curious about the moral dimensions of our technological moment — I'm glad you're here.</BodyText>
          </FadeIn>
        </div>
      </PageSection>

      {/* ═══ MORAL PSYCHOLOGY ═══ */}
      <PageSection id="moral-psych" alt>
        <FadeIn><SectionLabel>Thesis Research</SectionLabel><SectionTitle>Moral Psychology & Normative Ethics</SectionTitle><Subtitle>Can neuroscience tell us what's morally right? My thesis explores how brain imaging research on moral judgment challenges — and illuminates — traditional ethical theories.</Subtitle></FadeIn>
        <div style={{ marginTop: 36 }}><FadeIn delay={0.1}><TrolleyExperiment /></FadeIn></div>
        <Narrow>
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.1}><Expandable title="The Core Question: Can Science Inform Ethics?">
              <p>Philosophers have debated the nature of morality for millennia. Utilitarians say the right action maximizes well-being. Deontologists say certain actions are inherently right or wrong regardless of consequences. Virtue ethicists focus on character.</p>
              <p style={{ marginTop: 12 }}>But what if the intuitions that ground these theories are themselves products of morally irrelevant evolutionary pressures? This is the question raised by research in moral psychology — and it's the central question of my thesis.</p>
              <p style={{ marginTop: 12 }}>The implications are profound. If our most deeply held moral convictions are shown to be products of evolutionary contingency rather than rational insight, what happens to the philosophical frameworks built upon them? This doesn't necessarily mean our moral intuitions are wrong — but it does mean we need to scrutinize them more carefully.</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.12}><Expandable title="Greene's Dual-Process Theory">
              <p>Joshua Greene's fMRI research at Harvard revealed something striking: when people face moral dilemmas, different brain regions activate depending on the type of dilemma. "Personal" dilemmas (like pushing someone off a footbridge) engage emotional brain areas — the amygdala, ventromedial prefrontal cortex, and posterior cingulate cortex. "Impersonal" dilemmas (like pulling a lever) engage cognitive regions including the dorsolateral prefrontal cortex.</p>
              <p style={{ marginTop: 12 }}>Greene argues this reveals a "dual-process" model: our deontological intuitions ("don't push!") are driven by automatic emotional responses, while utilitarian judgments ("save the most lives") are driven by controlled cognitive processes. The provocative implication: deontological moral theories may be sophisticated rationalizations of gut reactions shaped by our evolutionary past.</p>
              <p style={{ marginTop: 12 }}>When viewed from an evolutionary standpoint, our aversion to "up close and personal" violence makes sense — this response likely regulated behavior among ancestors whose survival depended on cooperation and restraint within small groups (de Waal, 1996; Haidt, 2001).</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.14}><Expandable title="Kamm's Objections & My Analysis">
              <p><strong>Objection 1 — Permissibility vs. Duty:</strong> F.M. Kamm argues Greene frames his trolley problems in terms of "permissibility" rather than "duty." Saying it's permissible to turn the trolley doesn't mean there's a duty to do so — and only a judgment of <em>duty</em> would count as genuinely consequentialist. I show this objection overlooks the diversity of consequentialist positions, particularly Michael Slote's satisficing consequentialism (1984), which explicitly denies a duty to maximize good. Consider Slote's hotel manager who gives a stranded family a room but not the best room — she has acted in a morally acceptable way without maximizing utility.</p>
              <p style={{ marginTop: 12 }}><strong>Objection 2 — The Trapdoor Case:</strong> Kamm modifies the footbridge scenario: the large man stands on a trapdoor, and you press a remote button to drop him. Despite it not being "up close and personal," philosophers still judge it wrong. This successfully broadens the triggers for emotional response — but I argue it doesn't undermine Greene's core claim. Greene's primary point is that deontological responses are rooted in morally irrelevant emotional reactions, <em>no matter what causes</em> the emotional reaction. What produced these reactions is "a matter of evolutionary speculation" (Greene, p. 63).</p>
              <p style={{ marginTop: 12 }}><strong>My Proposed Argument for Kamm:</strong> I suggest Kamm could construct a stronger argument. If fMRI data on the trapdoor case showed the deontological judgment was generated by <em>cognitive</em> (not emotional) centers, this would directly challenge Greene's foundation — demonstrating that deontological judgments need not be products of morally irrelevant emotional features.</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.16}><Expandable title="The Is–Ought Gap: Where Philosophy Meets Neuroscience">
              <p>The deepest challenge remains Hume's is–ought gap: can descriptive facts about how moral judgments are generated ever determine which moral judgments are correct? Greene's critics argue neuroscience can only describe, not prescribe.</p>
              <p style={{ marginTop: 12 }}>There are two responses available to the defender of normative ethics. First, argue that no normative theory requires or presupposes any particular claim about human psychology — deontology doesn't require that moral actions be produced by cognitive processes exclusively. Second, argue that empirical claims have no effect on abstract moral theories — all the evidence shows is that we often fail to follow the requirements of a normative theory, which says nothing about the theory's validity.</p>
              <p style={{ marginTop: 12 }}>I suggest the value of moral psychology lies not in closing the is–ought gap, but in <strong>illuminating it</strong> — helping us see where our normative theories are rationalizations of unreliable intuitions, and where they genuinely track something worth caring about. This insight becomes critically important as AI forces us to confront entirely novel moral situations where our evolved intuitions may be especially unreliable guides.</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.18}><Expandable title="Recent Developments (2023–2026)" color={C.teal}>
              <p><strong>Greene's Own Revision (2023):</strong> In a major piece in <em>Behavioral and Brain Sciences</em>, Greene acknowledged that sacrificial moral dilemmas may not simply elicit competing "fast and slow" processes — responding to De Neys's critique. However, he maintained that strong evidence, particularly from lesion studies (Koenigs et al., 2007), supports distinct cognitive processes generating conflicting emotional and rational responses. The dual-process theory "gets much right, but needs revision."</p>
              <p style={{ marginTop: 12 }}><strong>Bammel's Modularity Critique (2024):</strong> Moritz Bammel argued in <em>Philosophical Psychology</em> that Greene's theory relies on a modular account of cognition increasingly challenged by dynamical systems approaches. Rather than two independent modules, morality may emerge from relative, context-sensitive differences in interconnected brain networks. This doesn't reject the distinction between processes, but demands we "reconsider the types of explanations we can expect from empirically informed ethics."</p>
              <p style={{ marginTop: 12 }}><strong>Cosmides et al. (2023):</strong> Leda Cosmides and colleagues published in <em>PNAS</em> showing the dual-process model cannot explain "compromise judgments" — choices that sacrifice <em>some</em> but not all civilians to save <em>more</em> but not the most soldiers. These rational intermediate choices respect axioms like the Generalized Axiom of Revealed Preferences (GARP), which neither pure emotional nor pure cognitive processing predicts.</p>
              <p style={{ marginTop: 12 }}><strong>Fair & Fasko (2025):</strong> Published in <em>Journal of Intelligence</em>, this review connects moral development to intelligence research, charting new interdisciplinary territory that extends Greene's work.</p>
            </Expandable></FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", marginBottom: 14, textAlign: "center" }}>Key Videos</h3>
              <div className="grid-2">
                <div><VideoEmbed id="yg16u_bzjPE" title="Joshua Greene - Moral Tribes" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Joshua Greene on dual-process theory and "Moral Tribes"</p></div>
                <div><VideoEmbed id="XgCHZ1G93iA" title="Scott Aaronson - Human Specialness" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Scott Aaronson — "Human Specialness in the Age of AI"</p></div>
              </div>
            </div>
          </FadeIn>
        </Narrow>
      </PageSection>

      {/* ═══ AI & ETHICS ═══ */}
      <PageSection id="ai-ethics">
        <FadeIn><SectionLabel>Blog & Analysis</SectionLabel><SectionTitle>AI Ethics in Education</SectionTitle><Subtitle>Moving from vague ethical aspirations to actionable philosophical frameworks. From the is/ought problem to AI use policies.</Subtitle></FadeIn>
        <div className="grid-3" style={{ marginTop: 36 }}>
          <TopicCard icon="⚖️" title="From Ambiguity to Action" desc="Why saying 'uphold ethics' isn't enough. A deep dive into normative ethics frameworks — utilitarianism, deontology, virtue ethics — with thought experiments designed for educators." delay={0.08} />
          <TopicCard icon="🤖" title="The Paradox of AI in Education" desc="Even if AI could perfectly replicate human teachers, should it? Shared humanity, communal learning, and the is/ought distinction at its most urgent." delay={0.12} />
          <TopicCard icon="📝" title="The AI Authorship Quandary" desc="When a student submits AI-written work and the parent defends it — what do you do? A thought experiment for navigating academic integrity." delay={0.16} />
        </div>
        <Narrow>
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.08}><EthicsQuiz /></FadeIn>
            <FadeIn delay={0.1}><Expandable title="The Is/Ought Problem in AI Education">
              <p>One of the most important philosophical distinctions in the AI debate is the difference between what AI <em>can</em> do and what it <em>ought</em> to do. David Hume identified this gap centuries ago: you cannot derive a moral "ought" from a factual "is."</p>
              <p style={{ marginTop: 12 }}>In education, this means that even if AI can grade papers faster, teach concepts more efficiently, and personalize learning better than any human teacher — it doesn't follow that schools should replace teachers with AI. The question requires engaging with values, not just capabilities.</p>
              <p style={{ marginTop: 12 }}>As Socrates reminds us in Plato's <em>Republic</em>: "We are discussing no small matter, but how we ought to live." The integration of AI into education is precisely such a matter — and it deserves the same philosophical rigor we would give to any question about how we ought to live together.</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.12}><Expandable title="Building Ethical AI Policies That Actually Work">
              <p>I argue that effective AI use policies must start with <strong>explicit value judgments grounded in normative ethical theory</strong> — not vague appeals to "responsibility." Here's the process I recommend:</p>
              <p style={{ marginTop: 12 }}>1. <strong>Define your values</strong> using normative ethics (e.g., "We ought to foster educational growth in our students")</p>
              <p>2. <strong>Test those values</strong> with thought experiments specific to your context</p>
              <p>3. <strong>Accept imperfection</strong> — like the English language, your policy will never be perfect, and that's okay</p>
              <p>4. <strong>Involve stakeholders</strong> — educators, students, parents, and technology experts</p>
              <p>5. <strong>Review continuously</strong> — technology evolves faster than policy</p>
              <p style={{ marginTop: 12 }}>The approach must also play out consequences of value judgments. If you declare you value equity and fairness, you must ensure AI tools are accessible to <em>all</em> students. If you value privacy, you must protect student data and ensure AI systems comply with FERPA and COPPA.</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.14}><Expandable title="UNESCO & Global AI Ethics Frameworks (2024–2026)" color={C.teal}>
              <p>UNESCO's Recommendation on the Ethics of AI (adopted by 193 member states in 2021) remains the most comprehensive global framework. Key developments since 2024:</p>
              <p style={{ marginTop: 12 }}><strong>2025:</strong> UNESCO released "AI and Education: Protecting the Rights of Learners," analyzing how AI impacts access, equity, quality, and governance. They also published AI competency frameworks for both teachers and students, and supported 58 countries in designing or improving digital and AI competency curricula.</p>
              <p style={{ marginTop: 12 }}><strong>April 2026:</strong> UNESCO launched an Observatory on Artificial Intelligence in Education for Latin America and the Caribbean, expanding their global monitoring capacity.</p>
              <p style={{ marginTop: 12 }}><strong>Critical Analysis (2025):</strong> A paper in the <em>British Journal of Sociology of Education</em> examined UNESCO's policy documents through discourse analysis, raising important questions about whether these frameworks adequately contest the alignment of government and BigTech interests — a vital concern for educators working to maintain genuine ethical autonomy.</p>
            </Expandable></FadeIn>
          </div>
        </Narrow>
      </PageSection>

      {/* ═══ AI IN EDUCATION ═══ */}
      <PageSection id="ai-education" alt>
        <FadeIn><SectionLabel>Practical Applications</SectionLabel><SectionTitle>AI in the Classroom</SectionTitle><Subtitle>From personalized learning and IEP support to custom GPTs and lesson review tools — how AI is transforming education, and how to use it responsibly.</Subtitle></FadeIn>
        <div className="grid-3" style={{ marginTop: 36 }}>
          <TopicCard icon="🎯" title="Personalized Learning" desc="AI tutors like Khanmigo remember interests and adapt in real time. A soccer fan learns polynomials through game statistics. Every student gets a personalized path." delay={0.08} />
          <TopicCard icon="♿" title="IEP & Special Education" desc="AI tools generate IEP drafts, suggest accommodations, and level text — saving teachers hours while helping meet every student's unique needs." delay={0.12} />
          <TopicCard icon="🎵" title="Creative AI Tools" desc="ReviewSongGPT turns lessons into songs. Students' narratives become children's books. AI remixes student work across genres." delay={0.16} />
          <TopicCard icon="📊" title="AI-Powered Grading" desc="Tools like AutoMark provide fast, consistent feedback. But should AI grade essays? Deep questions about the human element in evaluation." delay={0.2} />
          <TopicCard icon="🧠" title="Custom GPTs for PD" desc="RigorGPT, BackwardDesignGPT, OutcomesGPT, SoRGPT — specialized AI assistants built for professional development." delay={0.24} />
          <TopicCard icon="🔮" title="The Future" desc="Predictive analytics, AI tutoring 24/7, virtual learning communities, administrative automation. The transformation is accelerating." delay={0.28} />
        </div>
        <Narrow>
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.08}><Expandable title="Why AI Detection Doesn't Work (and What to Do Instead)">
              <p>OpenAI itself has stated that AI detection tools are not reliable enough for educators to make consequential judgments about students. New York City banned ChatGPT in January 2023, then reversed the ban months later when they realized prohibition was neither effective nor productive.</p>
              <p style={{ marginTop: 12 }}>Rather than policing AI use, the productive approach is to reframe the question: <strong>What do we actually want from and for our students?</strong> If the answer is critical thinking, creativity, and genuine understanding, then assessments should be redesigned to measure those things in ways that make AI assistance visible rather than hidden.</p>
              <p style={{ marginTop: 12 }}>As Salman Khan writes in <em>Brave New Words</em>: "To cheat or not to cheat is no longer the question; the semantics of cheating misses the larger picture of what this means for the pedagogical process."</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.1}><Expandable title="Thought Experiments for Your School">
              <p><strong>The AI Authorship Quandary:</strong> A student submits AI-written work. The teacher wants it redone. The parent says AI use wasn't prohibited. What's your policy? What values guide it?</p>
              <p style={{ marginTop: 12 }}><strong>The Reluctant Educator:</strong> Mr. Jennings refuses AI grading tools. His class falls behind AI-assisted classes on measurable outcomes. What does the administration do? How do you balance teaching philosophy with student outcomes?</p>
              <p style={{ marginTop: 12 }}><strong>The Digital Doppelgänger:</strong> A student sends an AI avatar to attend class. It participates, asks questions, and is indistinguishable from the real student. Leo says he reviews all interactions. How does the school define attendance and participation?</p>
              <p style={{ marginTop: 12 }}>These aren't hypothetical anymore. They're happening. Use them as discussion starters with your team.</p>
            </Expandable></FadeIn>
            <FadeIn delay={0.12}><Expandable title="Essential Tools for Educators" color={C.teal}>
              <p><strong>ChatGPT / Copilot / Gemini</strong> — General-purpose AI assistants for lesson planning, content creation, and professional development</p>
              <p style={{ marginTop: 6 }}><strong>Khan Academy's Khanmigo</strong> — AI tutor that personalizes learning, adapts to interests, and reports the collaborative process to teachers</p>
              <p style={{ marginTop: 6 }}><strong>MagicSchool AI</strong> — 60+ tools for educators including IEP generators, choice board creators, and rubric builders</p>
              <p style={{ marginTop: 6 }}><strong>Amira Learning</strong> — AI reading tutor that listens to children read aloud and provides real-time assistance, doubling reading growth rates for ages 5–10</p>
              <p style={{ marginTop: 6 }}><strong>Duolingo</strong> — Gamified AI-powered language learning</p>
              <p style={{ marginTop: 6 }}><strong>Learning Ally</strong> — Audiobook solution for struggling readers, focusing on dyslexia and brain-based literacy</p>
              <p style={{ marginTop: 6 }}><strong>PeerTeach</strong> — AI-powered peer tutoring matching based on learning styles and academic needs</p>
            </Expandable></FadeIn>
          </div>
          <FadeIn delay={0.14}>
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", marginBottom: 14, textAlign: "center" }}>Featured Videos</h3>
              <div className="grid-2">
                <div><VideoEmbed id="hJP5GqnTrNo" title="Sal Khan on AI in Education" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Sal Khan — How AI Could Save Education (TED)</p></div>
                <div><VideoEmbed id="e5dQ5zEuE9Q" title="Tristan Harris - AI Dilemma" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Tristan Harris & Aza Raskin — The AI Dilemma</p></div>
              </div>
            </div>
          </FadeIn>
        </Narrow>
      </PageSection>

      {/* ═══ THE LEARNING PILL ═══ */}
      <PageSection id="learning-pill">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span style={{ display: "inline-block", padding: "5px 16px", background: `linear-gradient(135deg, rgba(26,138,122,0.15), rgba(26,90,138,0.15))`, border: `1px solid rgba(26,138,122,0.25)`, borderRadius: 20, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal }}>✦ New Thought Experiment</span>
          </div>
          <SectionTitle><span style={{ color: C.teal }}>The Learning Pill</span></SectionTitle>
          <Subtitle>A thought experiment for the age of AI. If knowledge could be acquired without effort, delay, or instruction — what, if anything, is lost?</Subtitle>
        </FadeIn>
        <Narrow>
          <FadeIn delay={0.15}>
            <div style={{ marginTop: 36 }}>
              <LearningPillExperiment />
            </div>
          </FadeIn>
        </Narrow>
      </PageSection>

      {/* ═══ RESOURCES ═══ */}
      <PageSection id="resources" alt>
        <FadeIn><SectionLabel>Library</SectionLabel><SectionTitle>Essential Reading & Resources</SectionTitle></FadeIn>
        <Narrow>
          <div style={{ marginTop: 28 }}>
            <FadeIn delay={0.08}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.05rem", marginBottom: 14 }}>Books</h3>
              {[
                { title: "Moral Tribes", author: "Joshua D. Greene (2013)", desc: "The definitive book on dual-process moral psychology and its implications for a global ethic." },
                { title: "Brave New Words", author: "Salman Khan (2024)", desc: "How AI will revolutionize education — from the founder of Khan Academy." },
                { title: "The Coming Wave", author: "Mustafa Suleyman (2023)", desc: "Technology, power, and the greatest dilemma of the 21st century." },
                { title: "The Singularity is Nearer", author: "Ray Kurzweil (2024)", desc: "Updated predictions on the convergence of human and artificial intelligence." },
                { title: "AI for Educators", author: "Matt Miller (2023)", desc: "Practical guide to using AI in the classroom." },
                { title: "Experience and Education", author: "John Dewey (1938)", desc: "Foundational work on the value of process in learning — essential context for the Learning Pill." },
                { title: "Anarchy, State, and Utopia", author: "Robert Nozick (1974)", desc: "Contains the Experience Machine — a key philosophical parallel to the Learning Pill." },
              ].map((b, i) => (
                <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                  <h4 style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.98rem" }}>{b.title}</h4>
                  <p style={{ color: C.teal, fontSize: "0.78rem", marginTop: 2 }}>{b.author}</p>
                  <p style={{ color: C.textMuted, fontSize: "0.83rem", marginTop: 3, lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.12}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.05rem", marginTop: 36, marginBottom: 14 }}>Academic Papers & Key References</h3>
              {[
                'Greene, J.D. "The Secret Joke of Kant\'s Soul." Moral Psychology, Vol. 3. MIT Press, 2008.',
                'Greene, J.D. "Dual-process moral judgment beyond fast and slow." Behavioral and Brain Sciences, 2023.',
                'Bammel, M. "Greene\'s dual-process moral psychology and the modularity of mind." Philosophical Psychology, 2024.',
                'Kamm, F.M. "Neuroscience and Moral Reasoning: A Note on Recent Research." Philosophy & Public Affairs, 2009.',
                'Cosmides, L. et al. "Reply to Greene: No version of the dual process model can explain compromise judgments." PNAS, 2023.',
                'Kahane, G. "On the Wrong Track: Process and Content in Moral Psychology." Mind & Language, 2012.',
                'Haidt, J. "The Emotional Dog and Its Rational Tail." Psychological Review 108.4, 2001.',
                'Jackson, F. "Epiphenomenal Qualia." Philosophical Quarterly 32, 1982.',
                'Nozick, R. Anarchy, State, and Utopia. 1974. (The Experience Machine)',
                'UNESCO. "AI and Education: Protecting the Rights of Learners." 2025.',
                'UNESCO. "Guidance for Generative AI in Education and Research." 2023.',
                'UNESCO. "AI Competency Frameworks for Teachers and Students." 2024–2025.',
                'Fair, F. & Fasko, D. "Intelligence and Moral Development." Journal of Intelligence 13.7, 2025.',
              ].map((ref, i) => <RefItem key={i}>{ref}</RefItem>)}
            </FadeIn>
            <FadeIn delay={0.16}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.05rem", marginTop: 36, marginBottom: 14 }}>Organizations & Frameworks</h3>
              <div className="grid-2">
                {[
                  { name: "UNESCO AI Ethics", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" },
                  { name: "Center for AI Safety", url: "https://www.safe.ai" },
                  { name: "IEEE Ethics of AI", url: "https://standards.ieee.org" },
                  { name: "MIT AI + Ethics Curriculum", url: "https://www.media.mit.edu" },
                  { name: "Khan Academy / Khanmigo", url: "https://www.khanmigo.ai" },
                  { name: "MagicSchool AI", url: "https://app.magicschool.ai" },
                ].map((org, i) => (
                  <a key={i} href={org.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.textSecondary, fontSize: "0.86rem", transition: "all 0.2s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.color = C.textPrimary; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>{org.name} ↗</a>
                ))}
              </div>
            </FadeIn>
          </div>
        </Narrow>
      </PageSection>

      {/* ═══ FOOTER ═══ */}
      <section style={{ padding: "60px 0", background: C.midnight, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", marginBottom: 12 }}>Let's Continue the Conversation</p>
            <p style={{ color: C.textMuted, fontSize: "0.9rem", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.6 }}>Whether you're an educator navigating AI policy, a philosopher interested in moral psychology, or a leader shaping the future of education.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 28px", background: C.teal, borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Read the Blog</a>
              <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 28px", border: `1px solid ${C.borderHover}`, borderRadius: 8, color: C.gold, fontSize: "0.88rem" }}>AI in Education Resource</a>
            </div>
          </FadeIn>
          <p style={{ marginTop: 40, color: C.textMuted, fontSize: "0.78rem", opacity: 0.5 }}>© {new Date().getFullYear()} Matthew A. Zinn · All Rights Reserved</p>
        </div>
      </section>
    </>
  );
}
