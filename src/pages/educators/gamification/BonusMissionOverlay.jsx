import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { C } from "../../../theme.js";
import {
  GAMEFUL_BONUS_VIDEO,
  GAMEFUL_DO_TOMORROW,
  GAMEFUL_REFLECTION_PROMPTS,
  GAMEFUL_RESOURCE_GROUPS,
  GAMEFUL_TAKEAWAYS,
  source,
} from "../../../data/gamificationQuest.js";
import { VideoEmbed } from "../../../components/shared.jsx";
import { playQuestSound } from "./questAudio.js";

const railLabel = {
  display: "block",
  // tealText (#2fae9a) clears AA 4.5:1 on the dark section card; base C.teal does not.
  color: C.tealText,
  fontSize: "0.66rem",
  fontWeight: 900,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  margin: "0 0 10px",
};

const sectionCard = {
  border: `1px solid ${C.gold}26`,
  borderRadius: 12,
  background: "rgba(15,32,52,0.55)",
  padding: "clamp(14px, 2.4vw, 20px)",
};

// A click-to-load facade: the YouTube iframe only mounts once the educator
// starts the talk, so nothing loads from youtube.com until they choose to watch.
function WatchAndReflect({ muted }) {
  const [playing, setPlaying] = useState(false);
  const video = GAMEFUL_BONUS_VIDEO;
  const cited = source(video.sourceId);

  return (
    <section style={sectionCard} data-testid="gamification-bonus-watch">
      <span style={railLabel}>Watch &amp; Reflect</span>
      <h3 style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(1.25rem, 2.4vw, 1.7rem)", lineHeight: 1.2, margin: "0 0 8px" }}>
        {video.speaker}: {video.title}
      </h3>
      <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 14px" }}>
        {video.framing}
      </p>

      {playing ? (
        <VideoEmbed id={video.id} title={`${video.speaker}: ${video.title} (${video.event})`} />
      ) : (
        <button
          type="button"
          className="gamification-bonus-facade"
          onClick={() => {
            setPlaying(true);
            playQuestSound("ui-tap", muted);
          }}
          aria-label={`Play the talk: ${video.speaker}, ${video.title}`}
        >
          <span className="gamification-bonus-play" aria-hidden="true">▶</span>
          <span>
            <strong>Start the talk</strong>
            <em>{video.speaker} · {video.event} · {video.durationLabel}</em>
          </span>
        </button>
      )}

      <div style={{ marginTop: 16 }}>
        <span style={railLabel}>Reflect as you watch</span>
        <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
          {GAMEFUL_REFLECTION_PROMPTS.map((prompt) => (
            <li key={prompt} style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.6 }}>{prompt}</li>
          ))}
        </ol>
      </div>

      {cited && (
        <p style={{ marginTop: 14, fontSize: "0.82rem", color: C.textMuted }}>
          Cited resource:{" "}
          <a href={cited.href} target="_blank" rel="noreferrer" style={{ color: C.gold }}>
            {cited.title}
          </a>
        </p>
      )}
    </section>
  );
}

function Takeaways() {
  return (
    <section style={sectionCard} data-testid="gamification-bonus-takeaways">
      <h3 style={railLabel}>What you learned</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {GAMEFUL_TAKEAWAYS.map((item, index) => (
          <div key={item.title} style={{ border: `1px solid ${C.border}`, borderRadius: 10, background: "rgba(255,255,255,0.025)", padding: "12px 13px" }}>
            <p style={{ color: C.gold, fontSize: "0.66rem", fontWeight: 900, letterSpacing: "0.1em", marginBottom: 6 }}>{String(index + 1).padStart(2, "0")}</p>
            <p style={{ color: C.textPrimary, fontWeight: 800, fontSize: "0.92rem", margin: "0 0 5px", lineHeight: 1.3 }}>{item.title}</p>
            <p style={{ color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DoTomorrow() {
  return (
    <section style={sectionCard} data-testid="gamification-bonus-do-tomorrow">
      <h3 style={railLabel}>Do this tomorrow</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 9 }}>
        {GAMEFUL_DO_TOMORROW.map((item) => (
          <li key={item} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 10, alignItems: "start", color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.6 }}>
            <span aria-hidden="true" style={{ color: C.teal, fontWeight: 900 }}>▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function KeepLearning() {
  return (
    <section style={sectionCard} data-testid="gamification-bonus-resources">
      <h3 style={railLabel}>Keep learning</h3>
      <div style={{ display: "grid", gap: 14 }}>
        {GAMEFUL_RESOURCE_GROUPS.map((group) => (
          <div key={group.label}>
            <p style={{ color: C.textPrimary, fontWeight: 800, fontSize: "0.86rem", margin: "0 0 7px" }}>{group.label}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
              {group.sourceIds.map(source).filter(Boolean).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", border: `1px solid ${C.gold}24`, borderRadius: 8, padding: "8px 10px", background: "rgba(255,255,255,0.02)", textDecoration: "none" }}
                >
                  <span style={{ display: "block", color: C.gold, fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{item.label}</span>
                  <span style={{ color: C.textSecondary, fontSize: "0.78rem", lineHeight: 1.4 }}>{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Full-surface "Bonus Mission" debrief, unlocked at the finale. Portaled to
// <body> above the quest shell (z 1200) and the celebration layer (z 11000).
const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, iframe, [tabindex]:not([tabindex="-1"])';

export default function BonusMissionOverlay({ open, onClose, muted = false }) {
  const closeRef = useRef(null);
  const cardRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    // Capture focus to restore on close. Ignore <body> (happens when the bonus
    // is opened from the celebration overlay, which unmounts its own focused
    // button in the same commit) so we can fall back to the finale CTA instead.
    const prev = typeof document !== "undefined" ? document.activeElement : null;
    previousFocusRef.current = prev && prev !== document.body ? prev : null;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      window.setTimeout(() => {
        const fallback = typeof document !== "undefined"
          ? document.querySelector('[data-testid="gamification-bonus-cta"] button')
          : null;
        (previousFocusRef.current || fallback)?.focus?.();
      }, 0);
    };
  }, [open]);

  // Modal focus trap: aria-modal="true" promises modality, so keyboard focus must
  // stay inside the dialog (the page is forbidden from using aria-hidden; the
  // background is made inert by the parent). Querying live handles the facade ->
  // iframe swap changing the focusable set.
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose?.();
      return;
    }
    if (event.key !== "Tab") return;
    const root = cardRef.current;
    if (!root) return;
    const focusables = [...root.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || !root.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || !root.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      data-testid="gamification-bonus-mission"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gamification-bonus-title"
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 11500,
        display: "grid",
        placeItems: "start center",
        padding: "clamp(10px, 3vw, 28px)",
        overflowY: "auto",
        background: "rgba(2,8,16,0.82)",
        backdropFilter: "blur(8px)",
      }}
    >
      <style>{`
        .gamification-bonus-facade {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          text-align: left;
          cursor: pointer;
          border: 1px solid ${C.teal}55;
          border-radius: 12px;
          padding: clamp(18px, 5vw, 34px) 18px;
          color: ${C.textPrimary};
          background:
            radial-gradient(circle at 18% 50%, ${C.teal}22, transparent 42%),
            linear-gradient(180deg, rgba(10,29,48,0.95), rgba(7,16,29,0.95));
          transition: border-color 0.18s ease, transform 0.18s ease;
        }
        .gamification-bonus-facade:hover,
        .gamification-bonus-facade:focus-visible {
          border-color: ${C.gold};
          transform: translateY(-1px);
          outline: none;
        }
        .gamification-bonus-play {
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 999px;
          background: ${C.gold};
          color: #0b1622;
          font-size: 1.2rem;
        }
        .gamification-bonus-facade em { display: block; margin-top: 3px; color: ${C.textMuted}; font-style: normal; font-size: 0.8rem; }
        .gamification-bonus-close:hover { filter: brightness(1.15); }
        @media (prefers-reduced-motion: reduce) {
          .gamification-bonus-facade { transition: none; }
        }
      `}</style>

      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "min(820px, 100%)",
          borderRadius: 16,
          border: `1px solid ${C.gold}44`,
          background: "linear-gradient(180deg, rgba(16,33,55,0.98), rgba(7,16,29,0.98))",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          padding: "clamp(16px, 3vw, 26px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 14, marginBottom: 16 }}>
          <div>
            <p style={{ color: C.gold, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
              Bonus Mission · unlocked
            </p>
            <h2
              id="gamification-bonus-title"
              style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.1, margin: 0 }}
            >
              Watch, Reflect, Reconcile
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="gamification-bonus-close"
            onClick={onClose}
            aria-label="Close the bonus mission"
            style={{
              flex: "0 0 auto",
              border: `1px solid ${C.gold}66`,
              borderRadius: 8,
              padding: "8px 12px",
              color: C.textPrimary,
              background: "rgba(8,18,32,0.8)",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Close ✕
          </button>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <WatchAndReflect muted={muted} />
          <Takeaways />
          <DoTomorrow />
          <KeepLearning />
        </div>
      </div>
    </div>,
    document.body,
  );
}
