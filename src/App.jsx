import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "moral-psych", label: "Moral Psychology" },
  { id: "ai-ethics", label: "AI & Ethics" },
  { id: "ai-education", label: "AI in Education" },
  { id: "resources", label: "Resources" },
  { id: "contact", label: "Connect" },
];

// ─── Intersection Observer Hook ───
function useInView(threshold = 0.15) {
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

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Expandable Card ───
function Expandable({ title, children, accent = "#c8a864" }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? accent : "rgba(255,255,255,0.08)"}`,
      borderRadius: 12,
      marginBottom: 16,
      background: open ? "rgba(200,168,100,0.04)" : "rgba(255,255,255,0.02)",
      transition: "all 0.3s",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "18px 24px",
          background: "none",
          border: "none",
          color: "#e8e0d0",
          fontSize: "1.05rem",
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontWeight: 600,
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <span style={{
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.3s",
          fontSize: "1.2rem",
          color: accent,
        }}>▾</span>
      </button>
      <div style={{
        maxHeight: open ? 2000 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s ease",
      }}>
        <div style={{ padding: "0 24px 20px", color: "#b0a898", lineHeight: 1.75, fontSize: "0.95rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Video Embed ───
function VideoEmbed({ id, title }) {
  return (
    <div style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      borderRadius: 12,
      overflow: "hidden",
      margin: "20px 0",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}

// ─── Topic Card ───
function TopicCard({ icon, title, desc, color = "#c8a864", delay = 0 }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? "rgba(200,168,100,0.06)" : "rgba(255,255,255,0.025)",
          border: `1px solid ${hover ? color : "rgba(255,255,255,0.06)"}`,
          borderRadius: 16,
          padding: "32px 28px",
          cursor: "default",
          transition: "all 0.35s",
          transform: hover ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hover ? `0 12px 40px rgba(200,168,100,0.08)` : "none",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>{icon}</div>
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#e8e0d0", fontSize: "1.2rem", marginBottom: 8, fontWeight: 600 }}>{title}</h3>
        <p style={{ color: "#8a8070", fontSize: "0.9rem", lineHeight: 1.65 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

// ─── Interactive Trolley Thought Experiment ───
function TrolleyExperiment() {
  const [choice, setChoice] = useState(null);
  const [scenario, setScenario] = useState(0);
  const scenarios = [
    {
      title: "The Trolley Problem",
      desc: "A runaway trolley is heading toward five people. You can pull a lever to divert it to a side track, where it will kill one person instead. Do you pull the lever?",
      options: ["Pull the lever", "Do nothing"],
      analysis: [
        "You chose the utilitarian response — sacrificing one to save five. Most people agree with this choice. But why does the next scenario feel different?",
        "You chose not to intervene. Some argue that actively causing harm is worse than allowing it, even if more people die. This aligns with certain deontological intuitions."
      ]
    },
    {
      title: "The Footbridge Dilemma",
      desc: "Same trolley, same five people in danger. But now you're on a footbridge. The only way to stop the trolley is to push a large person off the bridge onto the tracks. Do you push?",
      options: ["Push the person", "Don't push"],
      analysis: [
        "Interesting — the math is the same (one life for five), yet most people find this choice much harder. Greene's research shows this activates emotional brain regions that the lever scenario doesn't.",
        "Most people share your intuition. But here's the philosophical puzzle: if the outcome is identical to pulling the lever, why does this feel so different? Greene argues it's because 'up close and personal' harm triggers evolved emotional responses."
      ]
    },
    {
      title: "The AI Classroom Dilemma",
      desc: "An AI tutor can provide every student with a perfectly personalized education, outperforming human teachers on every measurable outcome. Should schools replace human teachers with AI?",
      options: ["Replace with AI", "Keep human teachers"],
      analysis: [
        "You prioritized outcomes — the utilitarian perspective. But what about the intrinsic value of human connection, mentorship, and the shared experience of learning? This is the is/ought problem: even if AI CAN replace teachers, SHOULD it?",
        "You valued the human element over raw outcomes. This reflects a deeply held intuition about education as more than knowledge transfer — it's a communal, human activity. But are you sure that intuition isn't just another evolved emotional response?"
      ]
    }
  ];

  const s = scenarios[scenario];

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(200,168,100,0.06), rgba(100,80,50,0.08))",
      border: "1px solid rgba(200,168,100,0.15)",
      borderRadius: 16,
      padding: 32,
      margin: "32px 0",
    }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {scenarios.map((_, i) => (
          <div key={i} style={{
            width: 32, height: 4, borderRadius: 2,
            background: i <= scenario ? "#c8a864" : "rgba(255,255,255,0.1)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#c8a864", fontSize: "1.15rem", marginBottom: 8 }}>
        Thought Experiment {scenario + 1}: {s.title}
      </h4>
      <p style={{ color: "#b0a898", lineHeight: 1.7, marginBottom: 20, fontSize: "0.95rem" }}>{s.desc}</p>

      {choice === null ? (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {s.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setChoice(i)}
              style={{
                padding: "12px 28px",
                background: "rgba(200,168,100,0.1)",
                border: "1px solid rgba(200,168,100,0.3)",
                borderRadius: 8,
                color: "#e8e0d0",
                cursor: "pointer",
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "0.95rem",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.target.style.background = "rgba(200,168,100,0.2)"; e.target.style.borderColor = "#c8a864"; }}
              onMouseOut={(e) => { e.target.style.background = "rgba(200,168,100,0.1)"; e.target.style.borderColor = "rgba(200,168,100,0.3)"; }}
            >{opt}</button>
          ))}
        </div>
      ) : (
        <div>
          <div style={{
            background: "rgba(200,168,100,0.08)",
            border: "1px solid rgba(200,168,100,0.2)",
            borderRadius: 10,
            padding: 20,
            marginBottom: 16,
          }}>
            <p style={{ color: "#d4c8a8", lineHeight: 1.7, fontSize: "0.93rem", fontStyle: "italic" }}>
              {s.analysis[choice]}
            </p>
          </div>
          {scenario < scenarios.length - 1 ? (
            <button
              onClick={() => { setScenario(scenario + 1); setChoice(null); }}
              style={{
                padding: "10px 24px",
                background: "#c8a864",
                border: "none",
                borderRadius: 6,
                color: "#1a1612",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >Next Scenario →</button>
          ) : (
            <div>
              <p style={{ color: "#8a8070", fontSize: "0.88rem", marginTop: 8 }}>
                These dilemmas illustrate the core tension Matthew explores: our moral intuitions feel authoritative, but neuroscience reveals they're shaped by evolutionary pressures, emotional responses, and cognitive biases. Understanding this doesn't tell us what's right — but it helps us see our moral reasoning more clearly.
              </p>
              <button
                onClick={() => { setScenario(0); setChoice(null); }}
                style={{
                  padding: "10px 24px",
                  marginTop: 12,
                  background: "rgba(200,168,100,0.15)",
                  border: "1px solid rgba(200,168,100,0.3)",
                  borderRadius: 6,
                  color: "#c8a864",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                }}
              >↺ Start Over</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quiz Component ───
function EthicsQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "A student uses AI to summarize a lesson and then studies the summary deeply. Is this ethical?",
      opts: ["Yes — AI enhanced learning", "No — the student didn't do the work", "It depends on school policy", "Only if the teacher knows"],
      explanation: "This aligns with using AI as a learning tool. The student engaged with the material — AI served as a scaffold, not a replacement for thinking."
    },
    {
      q: "AI grading gives faster, more consistent feedback than a human teacher. Should schools mandate its use?",
      opts: ["Yes — students benefit from speed", "No — human judgment is irreplaceable", "Use both in parallel", "Let teachers decide"],
      explanation: "There's no single right answer here. Each option reflects different values: efficiency, human connection, comprehensiveness, or teacher autonomy."
    },
    {
      q: "An AI can perfectly replicate a teacher's personality and teaching style. Should it replace the teacher?",
      opts: ["Yes — if outcomes are equal", "Never — humans are irreplaceable", "Only for specific tasks", "This is the wrong question"],
      explanation: "As Matthew argues, the question isn't CAN AI replace teachers, but SHOULD it. Even if AI matches every capability, the value of shared humanity in education may transcend measurable outcomes."
    },
  ];

  const handleAnswer = (i) => {
    setAnswers([...answers, i]);
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  if (showResult) {
    return (
      <div style={{
        background: "rgba(200,168,100,0.06)",
        border: "1px solid rgba(200,168,100,0.15)",
        borderRadius: 16, padding: 32, margin: "24px 0",
      }}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#c8a864", marginBottom: 16 }}>Reflection</h4>
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <p style={{ color: "#e8e0d0", fontSize: "0.9rem", fontWeight: 600, marginBottom: 6 }}>{q.q}</p>
            <p style={{ color: "#8a8070", fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic" }}>{q.explanation}</p>
          </div>
        ))}
        <button onClick={() => { setCurrent(0); setAnswers([]); setShowResult(false); }}
          style={{ padding: "10px 24px", background: "#c8a864", border: "none", borderRadius: 6, color: "#1a1612", cursor: "pointer", fontWeight: 600 }}
        >Try Again</button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div style={{
      background: "rgba(200,168,100,0.06)",
      border: "1px solid rgba(200,168,100,0.15)",
      borderRadius: 16, padding: 32, margin: "24px 0",
    }}>
      <div style={{ fontSize: "0.75rem", color: "#8a8070", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Question {current + 1} of {questions.length}
      </div>
      <p style={{ color: "#e8e0d0", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 20, fontFamily: "'Source Serif 4', Georgia, serif" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)}
            style={{
              padding: "12px 20px", textAlign: "left",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, color: "#b0a898", cursor: "pointer", fontSize: "0.9rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.target.style.borderColor = "#c8a864"; e.target.style.color = "#e8e0d0"; }}
            onMouseOut={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "#b0a898"; }}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        return el ? { id: s.id, top: el.offsetTop - 100 } : null;
      }).filter(Boolean);
      const current = sections.filter(s => window.scrollY >= s.top).pop();
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { 
      font-family: 'DM Sans', sans-serif;
      background: #0f0d0a;
      color: #b0a898;
      overflow-x: hidden;
    }
    ::selection { background: #c8a864; color: #0f0d0a; }
    a { color: #c8a864; text-decoration: none; transition: opacity 0.2s; }
    a:hover { opacity: 0.8; }

    .grain {
      position: fixed; inset: 0; z-index: 9999; pointer-events: none;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
    .narrow { max-width: 760px; margin: 0 auto; }

    .section-label {
      font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em;
      text-transform: uppercase; color: #c8a864; margin-bottom: 12px;
    }
    .section-title {
      font-family: 'Source Serif 4', Georgia, serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      color: #e8e0d0; font-weight: 700; line-height: 1.2;
      margin-bottom: 20px;
    }
    .section-subtitle {
      color: #8a8070; font-size: 1.05rem; line-height: 1.7; max-width: 640px;
    }
    .body-text {
      color: #9a9080; font-size: 0.95rem; line-height: 1.8; margin-bottom: 16px;
    }
    .body-text strong { color: #d4c8a8; }

    .topbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 24px; height: 60px;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(15,13,10,0.85); backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(200,168,100,0.08);
      transition: background 0.3s;
    }
    .topbar-logo {
      font-family: 'Source Serif 4', Georgia, serif;
      font-size: 1rem; font-weight: 700; color: #e8e0d0;
      letter-spacing: -0.01em; cursor: pointer;
    }
    .topbar-nav { display: flex; gap: 28px; list-style: none; }
    .topbar-nav li a {
      font-size: 0.8rem; font-weight: 500; color: #8a8070;
      text-decoration: none; transition: color 0.2s; letter-spacing: 0.02em;
    }
    .topbar-nav li a:hover, .topbar-nav li a.active { color: #c8a864; }

    .hamburger {
      display: none; background: none; border: none; cursor: pointer;
      width: 28px; height: 20px; position: relative;
    }
    .hamburger span {
      position: absolute; left: 0; width: 100%; height: 2px;
      background: #e8e0d0; transition: all 0.3s;
    }
    .hamburger span:nth-child(1) { top: 0; }
    .hamburger span:nth-child(2) { top: 9px; }
    .hamburger span:nth-child(3) { top: 18px; }

    .mobile-menu {
      display: none; position: fixed; top: 60px; left: 0; right: 0;
      background: rgba(15,13,10,0.95); backdrop-filter: blur(20px);
      padding: 24px; border-bottom: 1px solid rgba(200,168,100,0.1);
      z-index: 999;
    }
    .mobile-menu.open { display: block; }
    .mobile-menu a {
      display: block; padding: 12px 0; color: #b0a898;
      font-size: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    @media (max-width: 768px) {
      .topbar-nav { display: none; }
      .hamburger { display: block; }
      .grid-2 { grid-template-columns: 1fr !important; }
      .grid-3 { grid-template-columns: 1fr !important; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="grain" />

      {/* ── NAV ── */}
      <header className="topbar" style={{ background: scrollY > 60 ? "rgba(15,13,10,0.92)" : "rgba(15,13,10,0.6)" }}>
        <div className="topbar-logo" onClick={() => scrollTo("home")}>Matthew A. Zinn</div>
        <ul className="topbar-nav">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={activeSection === s.id ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}>{s.label}</a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 30%, rgba(200,168,100,0.06) 0%, transparent 70%), #0f0d0a",
      }}>
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,168,100,0.04) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
          <div style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#c8a864", marginBottom: 24,
          }}>Philosophy · Ethics · Education · AI</div>
          <h1 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            color: "#e8e0d0", fontWeight: 700, lineHeight: 1.1,
            marginBottom: 20, maxWidth: 800,
          }}>
            Where Moral Philosophy<br />
            <span style={{ color: "#c8a864" }}>Meets the Age of AI</span>
          </h1>
          <p style={{
            fontSize: "1.1rem", color: "#8a8070", lineHeight: 1.7,
            maxWidth: 560, margin: "0 auto 40px",
          }}>
            Exploring the foundations of moral judgment, the ethics of artificial intelligence, and what it all means for education — by Matthew A. Zinn
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("moral-psych")} style={{
              padding: "14px 32px", background: "#c8a864", border: "none",
              borderRadius: 8, color: "#1a1612", fontWeight: 600, cursor: "pointer",
              fontSize: "0.9rem", transition: "transform 0.2s",
            }} onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
               onMouseOut={e => e.target.style.transform = "translateY(0)"}>
              Explore the Research
            </button>
            <button onClick={() => scrollTo("ai-ethics")} style={{
              padding: "14px 32px", background: "transparent",
              border: "1px solid rgba(200,168,100,0.3)", borderRadius: 8,
              color: "#c8a864", cursor: "pointer", fontSize: "0.9rem",
            }}>AI & Ethics →</button>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          animation: "bounce 2s infinite",
        }}>
          <div style={{ width: 24, height: 40, border: "2px solid rgba(200,168,100,0.3)", borderRadius: 12, position: "relative" }}>
            <div style={{
              width: 4, height: 8, background: "#c8a864", borderRadius: 2,
              position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
              animation: "scrollDot 2s infinite",
            }} />
          </div>
        </div>
        <style>{`
          @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
          @keyframes scrollDot { 0% { opacity:1; top:6px; } 100% { opacity:0; top:20px; } }
        `}</style>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 0", borderTop: "1px solid rgba(200,168,100,0.06)" }}>
        <div className="container">
          <FadeIn>
            <div className="section-label">About</div>
            <h2 className="section-title">Matthew A. Zinn</h2>
          </FadeIn>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, marginTop: 32, alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <div style={{
                background: "linear-gradient(135deg, rgba(200,168,100,0.08), rgba(200,168,100,0.02))",
                border: "1px solid rgba(200,168,100,0.12)",
                borderRadius: 16, padding: 32, textAlign: "center",
              }}>
                <div style={{
                  width: 90, height: 90, borderRadius: "50%",
                  background: "linear-gradient(135deg, #c8a864, #8a6d3b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: "2rem", color: "#1a1612", fontWeight: 700,
                  margin: "0 auto 16px",
                }}>MZ</div>
                <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#e8e0d0", fontSize: "1.15rem" }}>Matthew A. Zinn</h3>
                <p style={{ color: "#c8a864", fontSize: "0.8rem", marginTop: 4 }}>Philosopher · Educator · Technologist</p>
                <hr style={{ border: "none", borderTop: "1px solid rgba(200,168,100,0.1)", margin: "20px 0" }} />
                <p style={{ color: "#8a8070", fontSize: "0.8rem", lineHeight: 1.6 }}>
                  MA Ethics & Applied Philosophy<br />
                  UNC Charlotte, 2013
                </p>
                <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "center" }}>
                  <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a864", fontSize: "0.78rem", border: "1px solid rgba(200,168,100,0.2)", padding: "6px 14px", borderRadius: 6 }}>Blog</a>
                  <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a864", fontSize: "0.78rem", border: "1px solid rgba(200,168,100,0.2)", padding: "6px 14px", borderRadius: 6 }}>AI in Ed</a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <p className="body-text">
                  <strong>I study how humans make moral judgments</strong> — and what that means for the way we build, teach, and govern artificial intelligence. My work sits at the intersection of moral psychology, normative ethics, philosophy of mind, and educational technology.
                </p>
                <p className="body-text">
                  My journey began with a thesis on <strong>Joshua Greene's dual-process theory of moral judgment</strong> and F.M. Kamm's objections to it — asking whether neuroscience can tell us anything about which moral theories are correct. That question, about the relationship between descriptive facts and normative claims, has only grown more urgent in the age of AI.
                </p>
                <p className="body-text">
                  As an educator, I've spent years in classrooms working with students from elementary through graduate school. I started my career working with students with special needs, which gave me a deep appreciation for individualized education. Today, I focus on helping educators navigate the ethical complexities of AI integration — moving beyond vague appeals to "uphold ethics" toward concrete, philosophically grounded frameworks for decision-making.
                </p>
                <p className="body-text">
                  This site brings together my academic research, practical writing, and educational resources into one place. Whether you're a philosopher, teacher, administrator, or simply curious about the moral dimensions of our technological moment — I'm glad you're here.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MORAL PSYCHOLOGY ── */}
      <section id="moral-psych" style={{ padding: "100px 0", background: "rgba(200,168,100,0.015)", borderTop: "1px solid rgba(200,168,100,0.06)" }}>
        <div className="container">
          <FadeIn>
            <div className="section-label">Thesis Research</div>
            <h2 className="section-title">Moral Psychology & Normative Ethics</h2>
            <p className="section-subtitle">
              Can neuroscience tell us what's morally right? My thesis explores how brain imaging research on moral judgment challenges — and illuminates — traditional ethical theories.
            </p>
          </FadeIn>

          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.1}>
              <TrolleyExperiment />
            </FadeIn>
          </div>

          <div className="narrow" style={{ marginTop: 48 }}>
            <FadeIn delay={0.1}>
              <Expandable title="The Core Question: Can Science Inform Ethics?">
                <p>Philosophers have debated the nature of morality for millennia. Utilitarians say the right action maximizes well-being. Deontologists say certain actions are inherently right or wrong regardless of consequences. Virtue ethicists focus on character.</p>
                <p style={{marginTop:12}}>But what if the intuitions that ground these theories are themselves products of morally irrelevant evolutionary pressures? This is the question raised by research in moral psychology — and it's the central question of my thesis.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Expandable title="Greene's Dual-Process Theory">
                <p>Joshua Greene's fMRI research at Harvard revealed something striking: when people face moral dilemmas, different brain regions activate depending on the type of dilemma. "Personal" dilemmas (like pushing someone off a footbridge) engage emotional brain areas like the amygdala and ventromedial prefrontal cortex. "Impersonal" dilemmas (like pulling a lever) engage cognitive regions.</p>
                <p style={{marginTop:12}}>Greene argues this reveals a "dual-process" model: our deontological intuitions ("don't push!") are driven by automatic emotional responses, while utilitarian judgments ("save the most lives") are driven by controlled cognitive processes. The provocative implication: deontological moral theories may be sophisticated rationalizations of gut reactions.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Expandable title="Kamm's Objections & My Analysis">
                <p><strong>Objection 1 — Permissibility vs. Duty:</strong> F.M. Kamm argues that Greene frames his trolley problems in terms of "permissibility" rather than "duty." Saying it's permissible to turn the trolley doesn't mean there's a duty to do so. I show that this objection overlooks positions like satisficing consequentialism, which explicitly deny a duty to maximize good.</p>
                <p style={{marginTop:12}}><strong>Objection 2 — The Trapdoor Case:</strong> Kamm modifies the footbridge scenario so you press a remote button (not push directly). Philosophers still judge it wrong, despite it not being "up close and personal." While this broadens the triggers for emotional response, I argue it doesn't undermine Greene's core claim that deontological judgments are rooted in morally irrelevant emotional reactions — regardless of what triggers them.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.25}>
              <Expandable title="The Is–Ought Gap: Where Philosophy Meets Neuroscience">
                <p>The deepest challenge remains Hume's is–ought gap: can descriptive facts about how moral judgments are generated ever determine which moral judgments are correct? Greene's critics argue neuroscience can only describe, not prescribe.</p>
                <p style={{marginTop:12}}>I suggest the value of moral psychology lies not in closing that gap, but in illuminating it — helping us see where our normative theories are rationalizations of unreliable intuitions, and where they track something genuinely worth caring about. This insight becomes critically important when we turn to AI ethics, where our moral intuitions are being tested by entirely novel situations.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Expandable title="Recent Developments (2023–2026)">
                <p><strong>Greene's Own Revision (2023):</strong> In a major piece in Behavioral and Brain Sciences, Greene acknowledged that sacrificial moral dilemmas may not simply elicit competing "fast and slow" processes, but maintained that lesion studies provide strong evidence for distinct cognitive processes generating conflicting emotional and rational responses.</p>
                <p style={{marginTop:12}}><strong>Bammel's Modularity Critique (2024):</strong> Moritz Bammel argued in Philosophical Psychology that Greene's dual-process theory relies on a modular account of cognition increasingly challenged by dynamical systems approaches in cognitive science — suggesting we may need to reconceive the relationship between moral processes.</p>
                <p style={{marginTop:12}}><strong>Cosmides et al. (2023):</strong> Leda Cosmides and colleagues published in PNAS showing that the dual-process model cannot explain "compromise judgments" in trolley-like dilemmas — choices that sacrifice some but not all to save more but not the most — challenging the binary framing of Greene's model.</p>
              </Expandable>
            </FadeIn>
          </div>

          <FadeIn delay={0.35}>
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#e8e0d0", fontSize: "1.2rem", marginBottom: 16, textAlign: "center" }}>Key Videos</h3>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <VideoEmbed id="yg16u_bzjPE" title="Joshua Greene - Moral Tribes" />
                  <p style={{ fontSize: "0.82rem", color: "#8a8070", marginTop: 8 }}>Joshua Greene on the dual-process theory and "Moral Tribes"</p>
                </div>
                <div>
                  <VideoEmbed id="XgCHZ1G93iA" title="Scott Aaronson - Human Specialness" />
                  <p style={{ fontSize: "0.82rem", color: "#8a8070", marginTop: 8 }}>Scott Aaronson — "The Problem with Human Specialness in the Age of AI"</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AI & ETHICS ── */}
      <section id="ai-ethics" style={{ padding: "100px 0", borderTop: "1px solid rgba(200,168,100,0.06)" }}>
        <div className="container">
          <FadeIn>
            <div className="section-label">Blog & Analysis</div>
            <h2 className="section-title">AI Ethics in Education</h2>
            <p className="section-subtitle">
              Moving from vague ethical aspirations to actionable philosophical frameworks. From the is/ought problem to AI use policies — here's how philosophy can guide educators.
            </p>
          </FadeIn>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
            <TopicCard icon="⚖️" title="From Ambiguity to Action" desc="Why saying 'uphold ethics' isn't enough. A deep dive into normative ethics frameworks for AI policy — utilitarianism, deontology, virtue ethics — with thought experiments designed for educators." delay={0.1} />
            <TopicCard icon="🤖" title="The Paradox of AI in Education" desc="Even if AI could perfectly replicate human teachers, should it? An exploration of shared humanity, communal learning, and the is/ought distinction that may be the most important question of our era." delay={0.15} />
            <TopicCard icon="📝" title="The AI Authorship Quandary" desc="When a student submits AI-written work and the parent defends it — what do you do? A thought experiment exploring academic integrity, technology, and the values that should guide policy." delay={0.2} />
          </div>

          <div className="narrow" style={{ marginTop: 48 }}>
            <FadeIn delay={0.1}>
              <EthicsQuiz />
            </FadeIn>

            <FadeIn delay={0.15}>
              <Expandable title="The Is/Ought Problem in AI Education">
                <p>One of the most important philosophical distinctions in the AI debate is the difference between what AI <em>can</em> do and what it <em>ought</em> to do. David Hume identified this gap centuries ago: you cannot derive a moral "ought" from a factual "is."</p>
                <p style={{marginTop:12}}>In education, this means that even if AI can grade papers faster, teach concepts more efficiently, and personalize learning better than any human teacher — it doesn't follow that schools should replace teachers with AI. The question requires engaging with values, not just capabilities. My blog explores this distinction through practical scenarios educators face every day.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Expandable title="Building Ethical AI Policies That Actually Work">
                <p>I argue that effective AI use policies must start with explicit value judgments grounded in normative ethical theory — not vague appeals to "responsibility." Here's the process:</p>
                <p style={{marginTop:12}}>1. <strong>Define your values</strong> using normative ethics (e.g., "We ought to foster educational growth")<br/>
                2. <strong>Test those values</strong> with thought experiments specific to your context<br/>
                3. <strong>Accept imperfection</strong> — like the English language, your policy will never be perfect, and that's okay<br/>
                4. <strong>Involve stakeholders</strong> — educators, students, parents, and technology experts<br/>
                5. <strong>Review continuously</strong> — technology evolves faster than policy</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.25}>
              <Expandable title="UNESCO & Global AI Ethics Frameworks (2025–2026)">
                <p>UNESCO's Recommendation on the Ethics of AI (adopted by 193 member states in 2021) remains the most comprehensive global framework. Key updates since your original materials:</p>
                <p style={{marginTop:12}}>In 2025, UNESCO released a major report titled "AI and Education: Protecting the Rights of Learners," which analyzes how AI impacts access, equity, quality, and governance in education. UNESCO has also supported 58 countries in designing AI competency frameworks for educators, and launched an Observatory on Artificial Intelligence in Education for Latin America and the Caribbean in April 2026.</p>
                <p style={{marginTop:12}}>A critical 2025 academic analysis in the British Journal of Sociology of Education examined UNESCO's policy documents through the lens of discourse analysis, raising questions about whether these frameworks adequately contest the alignment of government and BigTech interests — a vital concern for educators working to maintain genuine ethical standards.</p>
              </Expandable>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── AI IN EDUCATION ── */}
      <section id="ai-education" style={{ padding: "100px 0", background: "rgba(200,168,100,0.015)", borderTop: "1px solid rgba(200,168,100,0.06)" }}>
        <div className="container">
          <FadeIn>
            <div className="section-label">Practical Applications</div>
            <h2 className="section-title">AI in the Classroom</h2>
            <p className="section-subtitle">
              From personalized learning and IEP support to custom GPTs and lesson review tools — here's how AI is transforming education right now, and how to use it responsibly.
            </p>
          </FadeIn>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
            <TopicCard icon="🎯" title="Personalized Learning" desc="AI tutors like Khanmigo remember your interests and adapt. A soccer fan learns polynomials through game statistics. Every student gets a personalized path." delay={0.1} />
            <TopicCard icon="♿" title="IEP & Special Education" desc="AI tools can generate IEP drafts, suggest accommodations, and level text — saving teachers hours while helping meet every student's unique needs." delay={0.15} />
            <TopicCard icon="🎵" title="Creative AI Tools" desc="ReviewSongGPT turns lessons into songs. Students' narratives become children's books. AI remixes student work across genres, opening new doors to creativity." delay={0.2} />
            <TopicCard icon="📊" title="AI-Powered Grading" desc="Tools like AutoMark provide fast, consistent feedback. But should AI grade essays? The debate touches deep questions about the human element in evaluation." delay={0.25} />
            <TopicCard icon="🧠" title="Custom GPTs for PD" desc="RigorGPT, BackwardDesignGPT, OutcomesGPT, and SoRGPT — specialized AI assistants built to support professional development across key teaching domains." delay={0.3} />
            <TopicCard icon="🔮" title="The Future" desc="Predictive analytics, AI tutoring 24/7, virtual learning communities, and administrative automation. The transformation is accelerating — are we ready?" delay={0.35} />
          </div>

          <div className="narrow" style={{ marginTop: 48 }}>
            <FadeIn delay={0.1}>
              <Expandable title="Why AI Detection Doesn't Work (and What to Do Instead)">
                <p>OpenAI itself has stated that AI detection tools are not reliable enough for educators to make consequential judgments about students. New York City banned ChatGPT from schools in January 2023 — then reversed the ban months later.</p>
                <p style={{marginTop:12}}>Rather than policing AI use, the more productive approach is to reframe the question: What do we actually want from and for our students? If the answer is critical thinking, creativity, and genuine understanding, then assessments should be redesigned to measure those things in ways that make AI assistance visible rather than hidden.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Expandable title="Thought Experiments for Your School">
                <p><strong>The AI Authorship Quandary:</strong> A student submits AI-written work. The teacher wants it redone. The parent says AI use wasn't prohibited. What's your policy?</p>
                <p style={{marginTop:12}}><strong>The Reluctant Educator:</strong> Mr. Jennings refuses AI grading tools. His class falls behind AI-assisted classes. What does the administration do?</p>
                <p style={{marginTop:12}}><strong>The Digital Doppelgänger:</strong> A student sends an AI avatar to attend class. It participates, asks questions, and is indistinguishable from the real student. Leo says he reviews all interactions. What's the policy?</p>
                <p style={{marginTop:12}}>These aren't hypothetical anymore. They're happening. Use them as discussion starters with your team.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Expandable title="Essential Tools for Educators">
                <p><strong>ChatGPT / Copilot / Gemini</strong> — General-purpose AI assistants for lesson planning, content creation, and professional development</p>
                <p style={{marginTop:8}}><strong>Khan Academy's Khanmigo</strong> — AI tutor that personalizes learning and reports the process to teachers</p>
                <p style={{marginTop:8}}><strong>MagicSchool AI</strong> — 60+ tools for educators including IEP generators, choice board creators, and rubric builders</p>
                <p style={{marginTop:8}}><strong>Amira Learning</strong> — AI reading tutor that listens to children read aloud and provides real-time assistance</p>
                <p style={{marginTop:8}}><strong>Duolingo</strong> — Gamified AI-powered language learning</p>
                <p style={{marginTop:8}}><strong>Learning Ally</strong> — Audiobook solution for struggling readers, focusing on dyslexia and brain-based literacy</p>
              </Expandable>
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#e8e0d0", fontSize: "1.2rem", marginBottom: 16, textAlign: "center" }}>Featured Videos</h3>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <VideoEmbed id="hJP5GqnTrNo" title="Sal Khan on AI in Education" />
                  <p style={{ fontSize: "0.82rem", color: "#8a8070", marginTop: 8 }}>Sal Khan — How AI Could Save Education (TED)</p>
                </div>
                <div>
                  <VideoEmbed id="e5dQ5zEuE9Q" title="Tristan Harris - AI Dilemma" />
                  <p style={{ fontSize: "0.82rem", color: "#8a8070", marginTop: 8 }}>Tristan Harris & Aza Raskin — The AI Dilemma</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section id="resources" style={{ padding: "100px 0", borderTop: "1px solid rgba(200,168,100,0.06)" }}>
        <div className="container">
          <FadeIn>
            <div className="section-label">Library</div>
            <h2 className="section-title">Essential Reading & Resources</h2>
          </FadeIn>

          <div className="narrow" style={{ marginTop: 32 }}>
            <FadeIn delay={0.1}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#c8a864", fontSize: "1.1rem", marginBottom: 16 }}>Books</h3>
              {[
                { title: "Moral Tribes", author: "Joshua D. Greene (2013)", desc: "The definitive book on dual-process moral psychology and its implications for a global ethic." },
                { title: "Brave New Words", author: "Salman Khan (2024)", desc: "How AI will revolutionize education — from the founder of Khan Academy." },
                { title: "The Coming Wave", author: "Mustafa Suleyman (2023)", desc: "Technology, power, and the greatest dilemma of the 21st century — with essential insights on AI containment." },
                { title: "The Singularity is Nearer", author: "Ray Kurzweil (2024)", desc: "Updated predictions on the convergence of human and artificial intelligence." },
                { title: "AI for Educators", author: "Matt Miller (2023)", desc: "Practical guide to using AI in the classroom, with exercises like remixing student work across genres." },
              ].map((book, i) => (
                <div key={i} style={{
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(200,168,100,0.08)",
                }}>
                  <h4 style={{ color: "#e8e0d0", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem" }}>{book.title}</h4>
                  <p style={{ color: "#c8a864", fontSize: "0.8rem", marginTop: 2 }}>{book.author}</p>
                  <p style={{ color: "#8a8070", fontSize: "0.85rem", marginTop: 4, lineHeight: 1.6 }}>{book.desc}</p>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.15}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#c8a864", fontSize: "1.1rem", marginTop: 40, marginBottom: 16 }}>Academic Papers & Key References</h3>
              {[
                'Greene, J.D. "The Secret Joke of Kant\'s Soul." Moral Psychology, Vol. 3 (MIT Press, 2008).',
                'Greene, J.D. "Dual-process moral judgment beyond fast and slow." Behavioral and Brain Sciences (2023).',
                'Bammel, M. "Greene\'s dual-process moral psychology and the modularity of mind." Philosophical Psychology (2024).',
                'Kamm, F.M. "Neuroscience and Moral Reasoning: A Note on Recent Research." Philosophy & Public Affairs (2009).',
                'Kahane, G. "On the Wrong Track: Process and Content in Moral Psychology." Mind & Language (2012).',
                'Cosmides, L. et al. "Reply to Greene: No version of the dual process model can explain compromise judgments." PNAS (2023).',
                'Haidt, J. "The Emotional Dog and Its Rational Tail." Psychological Review (2001).',
                'UNESCO. "AI and Education: Protecting the Rights of Learners." (2025).',
                'UNESCO. "Guidance for Generative AI in Education and Research." (2023).',
                'UNESCO. "AI Competency Frameworks for Teachers and Students." (2024–2025).',
              ].map((ref, i) => (
                <p key={i} style={{
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  color: "#8a8070",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{ref}</p>
              ))}
            </FadeIn>

            <FadeIn delay={0.2}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#c8a864", fontSize: "1.1rem", marginTop: 40, marginBottom: 16 }}>Organizations & Frameworks</h3>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { name: "UNESCO AI Ethics", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" },
                  { name: "Center for AI Safety", url: "https://www.safe.ai" },
                  { name: "IEEE Ethics of AI", url: "https://standards.ieee.org" },
                  { name: "MIT AI + Ethics Curriculum", url: "https://www.media.mit.edu" },
                  { name: "Khan Academy / Khanmigo", url: "https://www.khanmigo.ai" },
                  { name: "MagicSchool AI", url: "https://app.magicschool.ai" },
                ].map((org, i) => (
                  <a key={i} href={org.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "block",
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(200,168,100,0.08)",
                    borderRadius: 10,
                    color: "#b0a898",
                    fontSize: "0.88rem",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "#c8a864"; e.currentTarget.style.color = "#e8e0d0"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(200,168,100,0.08)"; e.currentTarget.style.color = "#b0a898"; }}
                  >
                    {org.name} ↗
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CONNECT ── */}
      <section id="contact" style={{
        padding: "100px 0",
        background: "radial-gradient(ellipse at 50% 80%, rgba(200,168,100,0.06), transparent 70%)",
        borderTop: "1px solid rgba(200,168,100,0.06)",
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeIn>
            <div className="section-label">Connect</div>
            <h2 className="section-title">Let's Continue the Conversation</h2>
            <p className="section-subtitle" style={{ margin: "0 auto 32px" }}>
              Whether you're an educator navigating AI policy, a philosopher interested in moral psychology, or a leader shaping the future of education — I'd love to connect.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{
                padding: "14px 32px",
                background: "#c8a864",
                borderRadius: 8,
                color: "#1a1612",
                fontWeight: 600,
                fontSize: "0.9rem",
                display: "inline-block",
              }}>Read the Blog</a>
              <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{
                padding: "14px 32px",
                background: "transparent",
                border: "1px solid rgba(200,168,100,0.3)",
                borderRadius: 8,
                color: "#c8a864",
                fontSize: "0.9rem",
                display: "inline-block",
              }}>AI in Education Resource</a>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ marginTop: 48, color: "#5a5040", fontSize: "0.82rem" }}>
              © {new Date().getFullYear()} Matthew A. Zinn · All Rights Reserved
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
