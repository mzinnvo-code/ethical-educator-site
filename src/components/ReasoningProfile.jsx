import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { TOPIC_BY_ID } from "../data/topics.js";

const LENS_INFO = {
  utilitarian: { label: "Utilitarian", blurb: "You weigh outcomes — the right action is the one that produces the most good.", suggest: "ethics" },
  deontological: { label: "Deontological", blurb: "You hold that some acts are right or wrong in themselves, regardless of outcome.", suggest: "ethics" },
  virtue: { label: "Virtue ethics", blurb: "You ask what a person of good character would do.", suggest: "moral-psychology" },
  care: { label: "Care ethics", blurb: "Relationships and responsibility for those near you come first.", suggest: "friendship" },
  fairness: { label: "Fairness", blurb: "Equality of treatment is your first instinct.", suggest: "fairness" },
  rawlsian: { label: "Rawlsian", blurb: "You protect the worst-off — even at a cost to the rest.", suggest: "justice" },
  libertarian: { label: "Libertarian", blurb: "Freedom first; outcomes follow from free choice.", suggest: "justice" },
  egalitarian: { label: "Egalitarian", blurb: "Equal shares is the baseline of justice.", suggest: "justice" },
  authenticity: { label: "Authenticity", blurb: "What's earned and real matters more than what merely feels good.", suggest: "authenticity" },
  hedonism: { label: "Hedonism", blurb: "Felt experience is what ultimately matters.", suggest: "authenticity" },
  egoism: { label: "Self-interest", blurb: "You're honest about pursuing your own ends.", suggest: "ethics" },
  pragmatist: { label: "Pragmatist", blurb: "What works in practice is your test for what's true.", suggest: "knowledge" },
  skepticism: { label: "Skeptic", blurb: "You're cautious about claims that go beyond evidence.", suggest: "knowledge" },
  rationalist: { label: "Rationalist", blurb: "Reason settles disputes that intuition can't.", suggest: "logic" },
  realism: { label: "Realist", blurb: "You insist on the difference between how things appear and how they are.", suggest: "knowledge" },
};

export default function ReasoningProfile({ choices = [], onSuggestTopic, onReset, sticky = true }) {
  const [collapsed, setCollapsed] = useState(false);

  const lensCounts = choices.reduce((acc, l) => {
    if (l) acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});
  const distinct = Object.keys(lensCounts).length;
  const top = Object.entries(lensCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // Don't render until 3 distinct lenses recorded
  if (distinct < 3) return null;

  const dominant = top[0]?.[0];
  const dominantInfo = LENS_INFO[dominant];
  const suggestedTopicId = dominantInfo?.suggest;
  const suggestedTopic = TOPIC_BY_ID[suggestedTopicId];

  return (
    <div
      role="complementary"
      aria-live="polite"
      aria-label="Your reasoning profile this session"
      style={{
        position: sticky ? "sticky" : "static",
        bottom: sticky ? 16 : "auto",
        marginTop: 32,
        background: `linear-gradient(135deg, ${C.surface}, ${C.bgAlt})`,
        border: `1px solid ${C.gold}40`,
        borderRadius: 14,
        boxShadow: `0 12px 40px rgba(0,0,0,0.45)`,
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setCollapsed(c => !c)}
        aria-expanded={!collapsed}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px",
          background: "transparent", border: "none",
          color: C.textPrimary, cursor: "pointer", textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <span aria-hidden="true" style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.gold}, ${C.coral})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.95rem",
        }}>🧭</span>
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: C.gold,
          }}>
            Your reasoning this session
          </p>
          <p style={{ color: C.textPrimary, fontSize: "0.92rem", fontWeight: 600, marginTop: 2 }}>
            Leaning {dominantInfo?.label?.toLowerCase() || dominant}
            {top[1] ? ` and ${LENS_INFO[top[1][0]]?.label?.toLowerCase() || top[1][0]}` : ""}
          </p>
        </div>
        <span style={{ color: C.textMuted, fontSize: "0.85rem" }}>{collapsed ? "▾" : "▴"}</span>
      </button>

      {!collapsed && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
          {dominantInfo?.blurb && (
            <p style={{
              color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6,
              marginTop: 12, fontStyle: "italic",
            }}>
              {dominantInfo.blurb}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {top.map(([lens, count]) => {
              const info = LENS_INFO[lens];
              return (
                <span key={lens} style={{
                  padding: "3px 10px",
                  background: `${C.gold}15`, border: `1px solid ${C.gold}30`,
                  borderRadius: 10, fontSize: "0.74rem",
                  color: C.gold, fontWeight: 600,
                }}>
                  {info?.label || lens} <span style={{ opacity: 0.7 }}>×{count}</span>
                </span>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {suggestedTopic && onSuggestTopic && (
              <button
                onClick={() => onSuggestTopic(suggestedTopicId)}
                style={{
                  padding: "8px 14px",
                  background: `${suggestedTopic.color}20`, color: suggestedTopic.color,
                  border: `1px solid ${suggestedTopic.color}50`,
                  borderRadius: 8, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600,
                }}
              >
                Try a "{suggestedTopic.label}" experiment →
              </button>
            )}
            <button
              onClick={onReset}
              style={{
                padding: "8px 14px",
                background: "transparent", color: C.textMuted,
                border: `1px solid ${C.border}`,
                borderRadius: 8, cursor: "pointer", fontSize: "0.78rem",
              }}
            >
              Reset profile
            </button>
          </div>

          <p style={{ color: C.textMuted, fontSize: "0.7rem", marginTop: 10, fontStyle: "italic" }}>
            Tracked only in this browser tab. Refreshing the page resets it.
          </p>
        </div>
      )}
    </div>
  );
}
