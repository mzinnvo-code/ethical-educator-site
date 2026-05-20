import { C } from "../theme.js";

/**
 * <Testimonial> — single educator quote with attribution.
 *
 * Pass either:
 *   <Testimonial t={testimonialObject} />    (preferred — uses src/data/testimonials.js shape)
 *   <Testimonial quote="..." name="..." ... /> (inline ad-hoc usage)
 *
 * Sample placeholders carry a `placeholder: true` flag and render with a
 * dashed left border + a "Sample" pill so a visitor can immediately tell
 * which quotes are real and which are scaffolding.
 *
 * onNavigate, when provided, makes the resource link route via the SPA
 * instead of doing a full page load.
 */
export default function Testimonial({
  t,
  quote = t?.quote,
  name = t?.name,
  role = t?.role,
  school = t?.school,
  location = t?.location,
  resource = t?.resource,
  accent = t?.accent || C.gold,
  placeholder = t?.placeholder,
  onNavigate,
}) {
  if (!quote) return null;

  const isInternal = resource?.url?.startsWith("/");

  return (
    <figure
      style={{
        margin: "16px 0",
        padding: "20px 22px",
        background: placeholder
          ? `repeating-linear-gradient(45deg, rgba(255,255,255,0.012), rgba(255,255,255,0.012) 12px, transparent 12px, transparent 24px), ${C.surface}`
          : C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: placeholder
          ? `3px dashed ${accent}88`
          : `3px solid ${accent}`,
        borderRadius: 12,
      }}
    >
      {placeholder && (
        <span
          style={{
            display: "inline-block",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            background: `${accent}1c`,
            padding: "3px 8px",
            borderRadius: 4,
            marginBottom: 12,
          }}
        >
          Sample · placeholder
        </span>
      )}

      <blockquote
        style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.04rem",
          fontStyle: "italic",
          color: C.textPrimary,
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption style={{ marginTop: 12, color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.55 }}>
        <span style={{ color: C.textPrimary, fontWeight: 600 }}>— {name}</span>
        {role && <span style={{ color: C.textMuted }}>, {role}</span>}
        {school && <span style={{ color: C.textMuted }}> · {school}</span>}
        {location && <span style={{ color: C.textMuted }}> · {location}</span>}
        {resource?.url && (
          <span style={{ display: "block", marginTop: 6, fontSize: "0.8rem" }}>
            Used:{" "}
            {isInternal ? (
              <a
                href={resource.url}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(resource.url.replace(/^\/+/, ""));
                  }
                }}
                style={{ color: accent, textDecoration: "none", borderBottom: `1px solid ${accent}66` }}
              >{resource.label} →</a>
            ) : (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent, textDecoration: "none", borderBottom: `1px solid ${accent}66` }}
              >{resource.label} ↗</a>
            )}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
