import { C } from "../theme.js";
import {
  PageContainer,
  Narrow,
  SectionLabel,
  SectionTitle,
  Subtitle,
  FadeIn,
} from "../components/shared.jsx";
import {
  getWhatsNewSorted,
  groupByMonth,
  isFresh,
  getTypeLabel,
  getTypeColorKey,
  formatDateLong,
} from "../data/whatsNew.js";

// /whats-new — reverse-chron archive of every entry in WHATS_NEW, grouped
// by month. Pairs with the WhatsNewModule on the homepage (which only
// surfaces the 3 most recent items).
export default function WhatsNew({ navigate }) {
  const items = getWhatsNewSorted();
  const months = groupByMonth(items);

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>Changelog</SectionLabel>
            <SectionTitle>What's new on The Ethical Educator</SectionTitle>
            <Subtitle>
              Every meaningful update to the site — new thought experiments, new research, new tools — in reverse-chronological order. New items in the last 14 days carry a "NEW" pill.
            </Subtitle>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p style={{ color: C.textMuted, fontSize: "0.85rem", marginTop: 18, lineHeight: 1.7 }}>
              Want the highlights in your inbox each week?{" "}
              <a
                href="/newsletter"
                onClick={(e) => { e.preventDefault(); navigate?.("newsletter"); }}
                style={{ color: C.gold, fontWeight: 600 }}
              >Subscribe to the Sunday Dilemma →</a>
            </p>
          </FadeIn>

          <div style={{ marginTop: 36 }}>
            {months.map(({ monthKey, label, items: monthItems }) => (
              <MonthSection key={monthKey} label={label} items={monthItems} navigate={navigate} />
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div style={{
              marginTop: 36,
              padding: "20px 22px",
              background: `${C.gold}06`,
              border: `1px solid ${C.gold}22`,
              borderRadius: 12,
              color: C.textSecondary,
              fontSize: "0.88rem",
              lineHeight: 1.7,
            }}>
              <p>
                Looking for something specific? Press <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78em", padding: "1px 6px", border: `1px solid ${C.border}`, borderRadius: 3 }}>⌘K</kbd> from anywhere on the site to search.
              </p>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}

function MonthSection({ label, items, navigate }) {
  return (
    <FadeIn>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary,
          fontSize: "1.1rem",
          fontWeight: 600,
          marginBottom: 12,
          paddingBottom: 6,
          borderBottom: `1px solid ${C.border}`,
        }}>{label}</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {items.map(item => (
            <ArchiveRow key={item.id} item={item} navigate={navigate} />
          ))}
        </ul>
      </section>
    </FadeIn>
  );
}

function ArchiveRow({ item, navigate }) {
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

  return (
    <li>
      <a
        href={item.url}
        onClick={(e) => {
          if (isInternal) {
            e.preventDefault();
            onActivate();
          }
        }}
        target={isInternal ? "_self" : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        style={{
          display: "block",
          padding: "14px 16px",
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderLeft: `3px solid ${color}`,
          borderRadius: 10,
          textDecoration: "none",
          color: "inherit",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}88`;
          e.currentTarget.style.background = C.surfaceHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.background = C.surface;
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
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
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: C.textMuted,
            marginLeft: "auto",
          }}>{formatDateLong(item.date)}</span>
        </div>
        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary,
          fontSize: "1rem",
          fontWeight: 600,
          lineHeight: 1.4,
          marginBottom: 4,
        }}>{item.title}</h3>
        <p style={{
          color: C.textSecondary,
          fontSize: "0.86rem",
          lineHeight: 1.6,
        }}>{item.blurb}</p>
      </a>
    </li>
  );
}
