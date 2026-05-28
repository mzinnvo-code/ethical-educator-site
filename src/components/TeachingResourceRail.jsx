import { C } from "../theme.js";
import { track } from "../lib/analytics.js";

const RAIL_LINKS = [
  {
    label: "AI ethics lesson plans",
    href: "/ai-ethics-lesson-plans",
    note: "Grade-band pathways, packets, tools, and policy activities.",
  },
  {
    label: "Thought experiments for kids",
    href: "/thought-experiments-for-kids",
    note: "Story-based philosophy and AI ethics discussions.",
  },
  {
    label: "AI literacy activities",
    href: "/ai-literacy-activities",
    note: "Discussion prompts, rubrics, and student-use framing.",
  },
  {
    label: "School AI policy tools",
    href: "/school-ai-policy-tools",
    note: "Policy builder, AI use rubric, and staff PD scenarios.",
  },
];

export const RESOURCE_RAIL_PAGES = new Set([
  "ai-ethics",
  "ai-education",
  "ai-education/policy-ethics",
  "ai-education/student-tools",
  "ai-education/future-readiness",
  "ai-consciousness",
  "ai-authorship-quandary",
  "ai-ambiguity-to-action",
  "ai-paradox",
  "ai-replace-teachers",
  "phil-education",
  "moral-psych",
  "thought-experiments",
  "thought-experiments/educators",
  "thought-experiments/k-5",
  "thought-experiments/6-8",
  "thought-experiments/9-12",
]);

function pageIdFromHref(href) {
  return href.replace(/^\/+/, "") || "home";
}

function handleRailClick(event, link, currentPage, navigate) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const targetPage = pageIdFromHref(link.href);
  track("related_resource_rail_click", {
    page: currentPage,
    sourcePage: currentPage,
    placement: "article_resource_rail",
    label: link.label,
    href: link.href,
    targetPage,
  });
  navigate?.(targetPage);
}

export default function TeachingResourceRail({ currentPage, navigate }) {
  if (!RESOURCE_RAIL_PAGES.has(currentPage)) return null;

  return (
    <aside
      className="resource-rail"
      aria-label="Related classroom resources"
      style={{
        background: `linear-gradient(180deg, ${C.bg}, ${C.midnight})`,
        borderTop: `1px solid ${C.border}`,
        padding: "34px 24px",
      }}
    >
      <div style={{ width: "min(1040px, 100%)", margin: "0 auto" }}>
        <p style={{
          color: C.gold,
          fontSize: "0.68rem",
          fontWeight: 800,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}>
          Related classroom resources
        </p>
        <div className="resource-rail-layout" style={{
          display: "grid",
          gridTemplateColumns: "minmax(240px, 0.72fr) minmax(0, 1.28fr)",
          gap: 22,
          alignItems: "start",
        }}>
          <div>
            <h2 style={{
              color: C.textPrimary,
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "clamp(1.35rem, 3vw, 2rem)",
              lineHeight: 1.16,
              marginBottom: 8,
            }}>
              Turn the article into a classroom action.
            </h2>
            <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.65 }}>
              These links use teacher search language and point to resource pages that can be opened, shared, printed, or used in staff discussion.
            </p>
          </div>
          <div className="resource-rail-links" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            {RAIL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleRailClick(event, link, currentPage, navigate)}
                style={{
                  display: "block",
                  padding: "15px 16px",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  color: C.textSecondary,
                }}
              >
                <span style={{
                  display: "block",
                  color: C.textPrimary,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  lineHeight: 1.25,
                  marginBottom: 5,
                }}>{link.label}</span>
                <span style={{ display: "block", color: C.textMuted, fontSize: "0.8rem", lineHeight: 1.45 }}>
                  {link.note}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:780px){
          .resource-rail-layout{grid-template-columns:1fr !important}
          .resource-rail a{min-height:0}
          .resource-rail-links{grid-template-columns:1fr !important}
        }
      `}</style>
    </aside>
  );
}
