import { useState } from "react";
import { C } from "../theme.js";
import ReadAloudButton from "../components/ReadAloudButton.jsx";

// SceneShared — primitives for multi-character classroom scenes (K-2 format).
// Different from the choice-stage pattern used by The Shortcut: here the user is
// a character in a room with named speakers, and progresses by choosing what to
// say or do as a classmate.

const SPEAKER_PALETTE = {
  teacher: { color: C.teal, label: "Ms. Park", glyph: "🍎" },
  ada: { color: C.coral, label: "Ada", glyph: "✨" },
  noor: { color: C.gold, label: "Noor", glyph: "🌻" },
  sam: { color: C.ocean, label: "Sam", glyph: "🌊" },
  class: { color: C.sand, label: "The Class", glyph: "👥" },
  narrator: { color: C.textMuted, label: "Narrator", glyph: "·" },
};

export function SceneSpeaker({ id = "narrator", line, className, audioKey }) {
  const persona = SPEAKER_PALETTE[id] || SPEAKER_PALETTE.narrator;
  const isNarrator = id === "narrator";
  // For narrator lines, only render the listen button when audioKey is supplied
  // — otherwise the italic descriptive text reads cleaner without UI chrome.
  // Non-narrator lines always get a button (falls back to Web Speech if no MP3).
  const showButton = !isNarrator || Boolean(audioKey);
  return (
    <div className={className} style={{
      display: "grid",
      gridTemplateColumns: isNarrator
        ? (showButton ? "1fr auto" : "1fr")
        : "auto 1fr auto",
      gap: 12,
      alignItems: "start",
      marginBottom: 12,
    }}>
      {!isNarrator && (
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `${persona.color}18`,
          border: `1px solid ${persona.color}45`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: persona.color, fontSize: "1rem", flexShrink: 0,
        }} aria-hidden="true">{persona.glyph}</div>
      )}
      <div>
        {!isNarrator && (
          <p style={{
            color: persona.color,
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}>{persona.label}</p>
        )}
        <p style={{
          color: isNarrator ? C.textMuted : C.textPrimary,
          fontSize: isNarrator ? "0.9rem" : "1rem",
          lineHeight: 1.7,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontStyle: isNarrator ? "italic" : "normal",
        }}>{line}</p>
      </div>
      {showButton && (
        <ReadAloudButton text={line} audioKey={audioKey} variant="icon" label={`Hear ${persona.label}`} />
      )}
    </div>
  );
}

export function SceneAction({ children, onClick, color = C.teal, audioKey, audioText }) {
  const [h, setH] = useState(false);
  // The audio button is rendered as a sibling (not a child) of the choice
  // button to keep clicks separate — tapping the speaker plays the line,
  // tapping the body advances the scene. Buttons-in-buttons aren't valid HTML.
  const button = (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        textAlign: "left",
        padding: "13px 18px",
        background: h ? `${color}1c` : `${color}0c`,
        border: `1px solid ${h ? color + "55" : color + "26"}`,
        borderRadius: 10,
        color: C.textPrimary,
        cursor: "pointer",
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "0.93rem",
        lineHeight: 1.5,
        transition: "all 0.22s",
        transform: h ? "translateY(-1px)" : "none",
        display: "block",
        width: "100%",
      }}
    >
      <span style={{
        color, fontSize: "0.66rem", fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        display: "block", marginBottom: 4,
      }}>You say</span>
      {children}
    </button>
  );
  if (!audioKey) return button;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "start" }}>
      {button}
      <div style={{ paddingTop: 6 }}>
        <ReadAloudButton text={audioText} audioKey={audioKey} variant="icon" label="Hear this choice" />
      </div>
    </div>
  );
}

export function SceneBeat({ title, color = C.teal, children }) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${color}28`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "0 12px 12px 0",
      padding: "20px 22px",
      marginBottom: 20,
    }}>
      {title && (
        <p style={{
          color,
          fontSize: "0.7rem",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 14,
        }}>{title}</p>
      )}
      {children}
    </div>
  );
}

export function SceneChoices({ children }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 10,
      marginTop: 16,
    }}>{children}</div>
  );
}
