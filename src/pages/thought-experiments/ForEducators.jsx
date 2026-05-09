import { useEffect, useState } from "react";
import { C, isNewExperiment } from "../../theme.js";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { FadeIn, Narrow, NewBadge } from "../../components/shared.jsx";
import GradePage from "./GradePage.jsx";
import TheShortcutExperiment from "../../experiments/TheShortcut.jsx";
import AuthorshipExperiment from "../../experiments/Authorship.jsx";
import ReluctantEducatorExperiment from "../../experiments/ReluctantEducator.jsx";
import DoppelgangerExperiment from "../../experiments/Doppelganger.jsx";

const FLAGSHIPS = [
  { id: "the-shortcut", icon: "⚡", iconLabel: "Lightning bolt", image: getFeatureIllustration("the-shortcut"), title: "The Shortcut", tagline: "If you could bypass the entire process of learning and arrive at mastery instantly — should you?", color: C.teal, gf: "rgba(26,138,122,0.12)", gt: "rgba(26,90,138,0.06)", Comp: TheShortcutExperiment },
  { id: "ai-authorship", icon: "📝", iconLabel: "Memo", image: getFeatureIllustration("ai-authorship"), title: "The AI Authorship Quandary", tagline: "Same essay. Same AI. Four people. Four completely different truths.", color: C.gold, gf: "rgba(200,152,48,0.12)", gt: "rgba(192,112,64,0.06)", Comp: AuthorshipExperiment },
  { id: "reluctant-educator", icon: "📊", iconLabel: "Bar chart", image: getFeatureIllustration("reluctant-educator"), title: "The Reluctant Educator", tagline: "When test scores and critical thinking pull in opposite directions — make the call.", color: C.coral, gf: "rgba(192,112,64,0.12)", gt: "rgba(200,152,48,0.06)", Comp: ReluctantEducatorExperiment },
  { id: "digital-doppelganger", icon: "👤", iconLabel: "Silhouette", image: getFeatureIllustration("digital-doppelganger"), title: "The Digital Doppelgänger", tagline: "A five-act semester. Voice clones. AI proxies. Who was educated?", color: C.ocean, gf: "rgba(26,90,138,0.12)", gt: "rgba(26,138,122,0.06)", Comp: DoppelgangerExperiment },
];

function experimentIdFromHash() {
  if (typeof window === "undefined") return null;
  const query = window.location.hash.split("?")[1] || "";
  return new URLSearchParams(query).get("experiment");
}

function FlagshipArtwork({ f, animDelay }) {
  const [failed, setFailed] = useState(false);

  if (!f.image || failed) {
    return (
      <div style={{ fontSize: "2.2rem", marginBottom: 12, animation: `flagshipFloat 3s ease-in-out infinite`, animationDelay: animDelay }}>
        <span role="img" aria-label={f.iconLabel}>{f.icon}</span>
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: "1.28",
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 16,
      border: `1px solid ${f.color}24`,
      background: `${f.color}10`,
      boxShadow: `0 12px 34px ${f.color}12`,
    }}>
      <img
        src={f.image.src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function FlagshipCard({ f, onClick, animDelay = "0s" }) {
  const [h, setH] = useState(false);
  const isNew = isNewExperiment(f.id);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: `linear-gradient(145deg, ${f.gf}, ${f.gt})`,
      border: `1px solid ${h ? f.color + "55" : f.color + "22"}`,
      borderRadius: 16, padding: "28px 22px",
      cursor: "pointer", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      position: "relative", overflow: "hidden",
      transform: h ? "translateY(-6px) scale(1.02)" : "translateY(0)",
      boxShadow: h ? `0 16px 48px ${f.color}20` : "none",
      height: "100%",
    }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${f.color}15, transparent 70%)`, filter: "blur(20px)", transition: "all 0.5s", opacity: h ? 0.9 : 0.4 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {isNew && <div style={{ position: "absolute", top: -4, right: -4 }}><NewBadge /></div>}
        <FlagshipArtwork f={f} animDelay={animDelay} />
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
          {f.title}
        </h3>
        <p style={{ color: C.textMuted, fontSize: "0.84rem", lineHeight: 1.55, marginBottom: 14 }}>
          {f.tagline}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ padding: "3px 10px", background: `${f.color}18`, border: `1px solid ${f.color}30`, borderRadius: 12, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: f.color }}>Flagship</span>
          <span style={{ color: h ? f.color : C.textMuted, fontSize: "0.84rem", transition: "all 0.3s", transform: h ? "translateX(4px)" : "none", display: "inline-block" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function FlagshipsBlock() {
  const [activeId, setActiveId] = useState(null);
  const active = FLAGSHIPS.find(f => f.id === activeId);

  useEffect(() => {
    const syncFlagshipFromHash = () => {
      const id = experimentIdFromHash();
      setActiveId(FLAGSHIPS.some(f => f.id === id) ? id : null);
    };

    syncFlagshipFromHash();
    window.addEventListener("hashchange", syncFlagshipFromHash);
    return () => window.removeEventListener("hashchange", syncFlagshipFromHash);
  }, []);

  return (
    <>
      <style>{`@keyframes flagshipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      <FadeIn>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginTop: 28, marginBottom: 18 }}>
          Four original interactive experiments — multi-stage scenarios designed for the questions
          educators face right now: about authorship, about test scores vs. critical thinking, about
          AI proxies, about what mastery means. Each one takes 5–15 minutes and ends with a discussion
          guide for your school.
        </p>
      </FadeIn>

      {!active && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
          {FLAGSHIPS.map((f, i) => (
            <FadeIn key={f.id} delay={i * 0.06}>
              <FlagshipCard f={f} onClick={() => { setActiveId(f.id); window.scrollTo({ top: 220, behavior: "smooth" }); }} animDelay={`${i * 0.5}s`} />
            </FadeIn>
          ))}
        </div>
      )}

      {active && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => setActiveId(null)} style={{
            display: "flex", alignItems: "center", gap: 6, marginBottom: 12,
            background: "none", border: "none", color: C.textMuted, cursor: "pointer",
            fontSize: "0.84rem", padding: 0,
          }}>← Back to all flagships</button>
          <active.Comp />
        </div>
      )}
    </>
  );
}

export default function ForEducators({ navigate }) {
  return (
    <GradePage
      navigate={navigate}
      band="educators"
      mode="canon"
      label="For Educators"
      title="Adult Dilemmas, Practical Decisions"
      blurb="The AI policy in your classroom is a values statement. So is the absence of one. These experiments are designed for staff meetings, leadership retreats, and the conversation you wish you'd had before the vendor demo. Start with a flagship, or browse the bank below for a specific dilemma you're already living."
      preExperiments={
        <Narrow>
          <FlagshipsBlock />
        </Narrow>
      }
      emptyMessage="No experiments match these filters yet."
    />
  );
}
