import { useState } from "react";
import { C } from "../theme.js";
import { useSpeech } from "../hooks/useSpeech.js";

// Speaker-icon button that reads `text` aloud via Web Speech API.
// Variants:
//   "primary" — teal pill with label, used on K-5 prompts (auto-prominent)
//   "icon"    — circular icon, used on 6-8 / 9-12 prompts (opt-in)
export default function ReadAloudButton({ text, variant = "icon", rate = 0.95, label = "Read aloud" }) {
  const { supported, state, speak, stop } = useSpeech();
  const [hover, setHover] = useState(false);

  if (!supported) return null;

  const speaking = state === "speaking";
  const onClick = () => speaking ? stop() : speak(text, { rate });

  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={speaking ? "Stop reading aloud" : label}
        aria-pressed={speaking}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 18px",
          background: speaking
            ? `linear-gradient(135deg, ${C.coral}, ${C.gold})`
            : hover
              ? `linear-gradient(135deg, ${C.teal}, ${C.ocean})`
              : `linear-gradient(135deg, ${C.teal}cc, ${C.ocean}cc)`,
          color: "#fff", border: "none", borderRadius: 999,
          fontSize: "0.86rem", fontWeight: 600, letterSpacing: "0.02em",
          cursor: "pointer", transition: "all 0.25s",
          boxShadow: hover ? `0 6px 18px ${C.teal}40` : `0 3px 10px ${C.teal}25`,
          transform: hover ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "1.05rem" }}>{speaking ? "⏸" : "🔊"}</span>
        {speaking ? "Stop" : label}
      </button>
    );
  }

  // icon variant
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={speaking ? "Stop reading aloud" : label}
      aria-pressed={speaking}
      title={speaking ? "Stop reading aloud" : "Read aloud"}
      style={{
        width: 36, height: 36, borderRadius: "50%",
        background: speaking
          ? `${C.coral}25`
          : hover ? `${C.teal}20` : `${C.teal}10`,
        border: `1px solid ${speaking ? C.coral + "60" : C.teal + (hover ? "50" : "25")}`,
        color: speaking ? C.coral : C.teal,
        cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.95rem", transition: "all 0.2s", flexShrink: 0,
      }}
    >
      <span aria-hidden="true">{speaking ? "⏸" : "🔊"}</span>
    </button>
  );
}
