import { C, hasAnyNewExperiments } from "../theme.js";
import { FadeIn } from "../components/shared.jsx";

export default function Home({ navigate }) {
  const hasNew = hasAnyNewExperiments();
  return (
    <section style={{ minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 50% 30%, rgba(26,90,138,0.08) 0%, transparent 70%), ${C.bg}` }}>
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(26,138,122,0.05) 0%, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
        <FadeIn>
          <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 22 }}>Philosophy · Ethics · Education · AI</div>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(2.2rem, 6vw, 3.8rem)", color: C.textPrimary, fontWeight: 700, lineHeight: 1.1, marginBottom: 18, maxWidth: 780, margin: "0 auto 18px" }}>
            Where Moral Philosophy<br /><span style={{ color: C.gold }}>Meets the Age of AI</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: C.textMuted, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px" }}>
            Exploring the foundations of moral judgment, the ethics of artificial intelligence, and what it all means for education — by Matthew A. Zinn
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {hasNew && (
              <button onClick={() => navigate("thought-experiments")} style={{ padding: "13px 30px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", boxShadow: `0 4px 20px rgba(26,138,122,0.25)`, animation: "newPulse 2s ease-in-out infinite" }}>
                ✦ New: The Learning Pill
              </button>
            )}
            <button onClick={() => navigate("moral-psych")} style={{ padding: "13px 30px", background: "transparent", border: `1px solid ${C.borderHover}`, borderRadius: 8, color: C.gold, cursor: "pointer", fontSize: "0.9rem" }}>Explore the Research →</button>
            <button onClick={() => navigate("ai-ethics")} style={{ padding: "13px 30px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textSecondary, cursor: "pointer", fontSize: "0.9rem" }}>AI & Ethics →</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
