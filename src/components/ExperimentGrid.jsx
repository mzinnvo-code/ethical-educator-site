import { useState } from "react";
import { C } from "../theme.js";
import { TOPIC_BY_ID } from "../data/topics.js";
import { getExperimentIllustration } from "../data/illustrations.js";
import { getSceneIllustration } from "../data/sceneIllustrations.js";
import { FadeIn, NewBadge } from "./shared.jsx";
import { isNewExperiment } from "../theme.js";

function PreviewArtwork({ experiment, accent }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = getExperimentIllustration(experiment) || getSceneIllustration(experiment);

  if (!image || imageFailed) {
    return (
      <div style={{
        width: 54, height: 54, borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `${accent}12`, border: `1px solid ${accent}24`,
        fontSize: "1.8rem", marginBottom: 14,
      }} aria-hidden="true">
        {experiment.emoji}
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      aspectRatio: "1.18",
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 14,
      border: `1px solid ${accent}24`,
      background: `${accent}10`,
      boxShadow: `inset 0 0 0 1px rgba(224,220,208,0.03)`,
    }}>
      <img
        src={image.src}
        alt=""
        loading="lazy"
        onError={() => setImageFailed(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

// A grid of preview cards. Clicking a card triggers `onSelect(experiment)`.
function PreviewCard({ experiment, onSelect, delay = 0 }) {
  const [hover, setHover] = useState(false);
  const accent = TOPIC_BY_ID[experiment.topics[0]]?.color || C.gold;
  const isNew = isNewExperiment(experiment.id);

  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onSelect(experiment)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(experiment);
          }
        }}
        style={{
          background: `linear-gradient(145deg, ${accent}10, ${accent}04)`,
          border: `1px solid ${hover ? accent + "55" : accent + "20"}`,
          borderRadius: 14, padding: "20px 18px",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          transform: hover ? "translateY(-4px)" : "none",
          boxShadow: hover ? `0 12px 32px ${accent}18` : "none",
          height: "100%", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: -20, right: -20, width: 80, height: 80,
          borderRadius: "50%", background: `radial-gradient(circle, ${accent}20, transparent 70%)`,
          filter: "blur(16px)", transition: "all 0.4s",
          opacity: hover ? 0.9 : 0.4,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {isNew && <div style={{ position: "absolute", top: -4, right: -4 }}><NewBadge /></div>}
          <PreviewArtwork experiment={experiment} accent={accent} />
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary, fontSize: "1.02rem", fontWeight: 700,
            marginBottom: 6, lineHeight: 1.3,
          }}>
            {experiment.title}
          </h3>
          <p style={{
            color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.55,
            marginBottom: 14,
          }}>
            {experiment.tagline}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {experiment.topics.slice(0, 2).map(t => {
              const topic = TOPIC_BY_ID[t];
              if (!topic) return null;
              return (
                <span key={t} style={{
                  padding: "2px 7px",
                  background: `${topic.color}18`,
                  border: `1px solid ${topic.color}30`,
                  borderRadius: 10, fontSize: "0.62rem",
                  fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: topic.color,
                }}>{topic.label}</span>
              );
            })}
            <span style={{
              marginLeft: "auto",
              color: hover ? accent : C.textMuted,
              fontSize: "0.82rem",
              transition: "all 0.3s",
              transform: hover ? "translateX(4px)" : "none",
              display: "inline-block",
            }}>→</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function ExperimentGrid({ experiments, onSelect, emptyMessage = "No experiments match these filters." }) {
  if (!experiments.length) {
    return (
      <div style={{
        textAlign: "center", padding: "48px 20px",
        background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 12, color: C.textMuted,
      }}>
        <p style={{ fontSize: "0.95rem" }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 16,
    }}>
      {experiments.map((e, i) => (
        <PreviewCard key={e.id} experiment={e} onSelect={onSelect} delay={Math.min(i, 8) * 0.04} />
      ))}
    </div>
  );
}
