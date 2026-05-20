import { C } from "../theme.js";
import { FadeIn } from "./shared.jsx";
import {
  getWhatsNewSorted,
  isFresh,
  getTypeLabel,
  getTypeColorKey,
  formatDateShort,
  hasAnyFresh,
} from "../data/whatsNew.js";

// Above-the-fold "This week" surface on the homepage. Shows the 3 most
// recent items from WHATS_NEW (any age) with a "NEW" pill on items shipped
// in the last 14 days, plus a "See all updates" link to /whats-new.
// If WHATS_NEW is empty, the module renders nothing.
export default function WhatsNewModule({ navigate, count = 3 }) {
  const items = getWhatsNewSorted().slice(0, count);
  if (items.length === 0) return null;

  const eyebrow = hasAnyFresh() ? "This week" : "Latest updates";

  return (
    <section
      aria-label={eyebrow}
      style={{
        background: C.bgAlt,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: "clamp(40px, 6vw, 64px) 24px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
            <div>
              <p style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.gold,
                marginBottom: 6,
              }}>{eyebrow}</p>
              <h2 style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: C.textPrimary,
                fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}>What's new on The Ethical Educator</h2>
            </div>
            <a
              href="/whats-new"
              onClick={(e) => { e.preventDefault(); navigate?.("whats-new"); }}
              style={{
                color: C.gold,
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: `1px solid ${C.gold}66`,
                paddingBottom: 1,
                flexShrink: 0,
              }}
            >See all updates →</a>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gap: 14 }}>
          {items.map((item, i) => (
            <FadeIn key={item.id} delay={0.04 * i}>
              <UpdateRow item={item} navigate={navigate} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpdateRow({ item, navigate }) {
  const colorKey = getTypeColorKey(item.type);
  const color = C[colorKey] || C.gold;
  const isInternal = item.url?.startsWith("/");
  const fresh = isFresh(item);

  function onActivate() {
    if (isInternal && navigate) {
      const pageId = item.url.replace(/^\/+/, "");
      navigate(pageId || "home");
    } else if (typeof window !== "undefined") {
      window.open(item.url, item.external ? "_blank" : "_self");
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  }

  return (
    <a
      href={item.url}
      role="link"
      tabIndex={0}
      onClick={(e) => {
        if (isInternal) {
          e.preventDefault();
          onActivate();
        }
      }}
      onKeyDown={onKeyDown}
      target={isInternal ? "_self" : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 18,
        alignItems: "start",
        padding: "16px 18px",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 12,
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.2s, transform 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}88`;
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.background = C.surfaceHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.background = C.surface;
      }}
    >
      <div style={{ minWidth: 64 }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: C.textMuted,
          letterSpacing: "0.04em",
        }}>{formatDateShort(item.date)}</p>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color,
            background: `${color}18`,
            padding: "2px 7px",
            borderRadius: 4,
          }}>{getTypeLabel(item.type)}</span>
          {fresh && (
            <span style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#0b1622",
              background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`,
              padding: "2px 7px",
              borderRadius: 4,
            }}>New</span>
          )}
        </div>
        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary,
          fontSize: "1.05rem",
          fontWeight: 600,
          lineHeight: 1.35,
          marginBottom: 6,
        }}>{item.title}</h3>
        <p style={{
          color: C.textSecondary,
          fontSize: "0.88rem",
          lineHeight: 1.6,
        }}>{item.blurb}</p>
      </div>
      <span aria-hidden="true" style={{
        color,
        fontSize: "1.2rem",
        alignSelf: "center",
        flexShrink: 0,
      }}>→</span>
    </a>
  );
}
