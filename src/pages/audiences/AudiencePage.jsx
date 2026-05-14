import { useState } from "react";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider, BodyText, ContinueExploring,
} from "../../components/shared.jsx";
import { C } from "../../theme.js";
import { getFeatureIllustration } from "../../data/illustrations.js";

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

// Audience landing pages route by identity. Each renders as a guided
// sequential journey: optional age-band picker → numbered steps the visitor
// can take, in order → "If you want to go further" tail. The structure
// replaces the earlier card-dump layout to actually guide each visitor.

function AgeBandTile({ tile, navigate, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => navigate(tile.route)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left",
        background: hover
          ? `linear-gradient(135deg, ${tile.color || accent}1f, ${tile.color || accent}08)`
          : `linear-gradient(135deg, ${tile.color || accent}10, ${tile.color || accent}04)`,
        border: `1px solid ${hover ? (tile.color || accent) + "60" : (tile.color || accent) + "28"}`,
        borderRadius: 14,
        padding: "24px 22px",
        cursor: "pointer",
        transition: "all 0.24s",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? `0 14px 32px ${(tile.color || accent)}25` : "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minHeight: 156,
      }}
    >
      <p style={{
        color: tile.color || accent,
        fontSize: "0.66rem",
        fontWeight: 800,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}>{tile.eyebrow}</p>
      <h3 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary,
        fontSize: "1.2rem",
        fontWeight: 700,
        lineHeight: 1.25,
      }}>{tile.title}</h3>
      <p style={{ color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.55 }}>{tile.desc}</p>
      <span style={{
        marginTop: "auto",
        color: tile.color || accent,
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "transform 0.2s",
        transform: hover ? "translateX(3px)" : "none",
      }}>Open <span aria-hidden="true">→</span></span>
    </button>
  );
}

function JourneyStep({ step, index, navigate, accent }) {
  const [hover, setHover] = useState(false);
  const color = step.color || accent;
  return (
    <FadeIn delay={0.05 * index}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(step.route)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(step.route);
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 22,
          alignItems: "start",
          padding: "22px 24px",
          background: C.surface,
          border: `1px solid ${hover ? color + "55" : C.border}`,
          borderRadius: 14,
          marginBottom: 14,
          cursor: "pointer",
          transition: "all 0.22s",
          transform: hover ? "translateY(-2px)" : "none",
          boxShadow: hover ? `0 14px 28px rgba(0,0,0,0.14)` : "none",
          outline: "none",
        }}
      >
        <div style={{
          width: 44, height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}aa)`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontWeight: 700,
          fontSize: "1.18rem",
          flexShrink: 0,
        }} aria-hidden="true">{index + 1}</div>
        <div>
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary,
            fontSize: "1.12rem",
            fontWeight: 700,
            lineHeight: 1.28,
            marginBottom: 6,
          }}>{step.title}</h3>
          <p style={{
            color: C.textSecondary,
            fontSize: "0.94rem",
            lineHeight: 1.65,
            marginBottom: 10,
          }}>{step.copy}</p>
          <span style={{
            color,
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "transform 0.2s",
            transform: hover ? "translateX(3px)" : "none",
          }}>{step.cta || "Open"} <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </FadeIn>
  );
}

export default function AudiencePage({ navigate, config }) {
  if (!config) return null;
  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        {/* HEADER */}
        <FadeIn>
          <p style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: config.accent, marginBottom: 10,
          }}>
            {config.eyebrow}
          </p>
          <SectionTitle>{config.title}</SectionTitle>
          <Subtitle>{config.subtitle}</Subtitle>
        </FadeIn>

        <Narrow>
          {/* Visual separator between the page header and the body content
              — fixes the previous design where the heading butted up against
              the first paragraph with no break. */}
          <Divider />

          {config.intro && (
            <FadeIn>
              <BodyText>{config.intro}</BodyText>
            </FadeIn>
          )}

          {/* Optional age-band picker (used by the Student page) */}
          {config.ageBands?.length > 0 && (
            <FadeIn>
              <Divider label={config.ageBandsLabel || "Choose your age band"} />
              {config.ageBandsBlurb && <BodyText>{config.ageBandsBlurb}</BodyText>}
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${config.ageBands.length}, minmax(0, 1fr))`,
                gap: 14,
                marginTop: 18,
                marginBottom: 12,
              }}>
                {config.ageBands.map((tile) => (
                  <AgeBandTile key={tile.route} tile={tile} navigate={navigate} accent={config.accent} />
                ))}
              </div>
            </FadeIn>
          )}

          {/* Numbered journey */}
          {config.steps?.length > 0 && (
            <>
              <FadeIn>
                <Divider label={config.stepsLabel || "Your journey"} />
                {config.stepsBlurb && <BodyText>{config.stepsBlurb}</BodyText>}
              </FadeIn>
              <div style={{ marginTop: 18, marginBottom: 12 }}>
                {config.steps.map((step, index) => (
                  <JourneyStep
                    key={step.route + ":" + index}
                    step={step}
                    index={index}
                    navigate={navigate}
                    accent={config.accent}
                  />
                ))}
              </div>
            </>
          )}

          {/* Tail */}
          {config.tail?.length > 0 && (
            <FadeIn>
              <Divider label={config.tailLabel || "If you want to go further"} />
              <ContinueExploring
                navigate={navigate}
                links={config.tail.map(withImage)}
              />
            </FadeIn>
          )}
        </Narrow>
      </PageContainer>
    </div>
  );
}
