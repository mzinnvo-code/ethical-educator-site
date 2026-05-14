import { useState } from "react";
import { C } from "../../theme.js";

// Featured banner that surfaces the K-2 classroom-scene version of Explaining
// Red. The 6-8 and 9-12 versions now live as regular data scenarios in
// experiments.js, so this banner is K-2 only.

const K2_CONFIG = {
  eyebrow: "Featured · K–2",
  title: "Explaining Red",
  tagline: "A new student named Ada joins your class while everyone is learning about colors. Help your classmates share what red is.",
  cta: "Open the scene",
  accent: C.coral,
  route: "thought-experiments/explaining-red-k-2",
};

export default function FeaturedRedBanner({ navigate }) {
  const [hover, setHover] = useState(false);
  if (!navigate) return null;
  const config = K2_CONFIG;

  return (
    <button
      onClick={() => navigate(config.route)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: `linear-gradient(135deg, ${config.accent}18, ${config.accent}06)`,
        border: `1px solid ${hover ? config.accent + "60" : config.accent + "28"}`,
        borderLeft: `4px solid ${config.accent}`,
        borderRadius: 14,
        padding: "22px 26px",
        margin: "20px 0 4px",
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hover ? "translateY(-2px)" : "none",
        boxShadow: hover ? `0 14px 32px ${config.accent}25` : "none",
      }}
    >
      <p style={{
        color: config.accent,
        fontSize: "0.68rem",
        fontWeight: 800,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: 8,
      }}>
        {config.eyebrow}
      </p>
      <h3 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary,
        fontSize: "1.3rem",
        fontWeight: 700,
        marginBottom: 8,
        lineHeight: 1.25,
      }}>
        {config.title}
      </h3>
      <p style={{
        color: C.textSecondary,
        fontSize: "0.92rem",
        lineHeight: 1.6,
        marginBottom: 14,
        maxWidth: 640,
      }}>
        {config.tagline}
      </p>
      <span style={{
        color: config.accent,
        fontSize: "0.84rem",
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "transform 0.2s",
        transform: hover ? "translateX(3px)" : "none",
      }}>
        {config.cta} <span aria-hidden="true">→</span>
      </span>
    </button>
  );
}
