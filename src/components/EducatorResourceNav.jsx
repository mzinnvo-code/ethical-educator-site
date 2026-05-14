import { C } from "../theme.js";
import { EDUCATOR_RESOURCE_GROUPS, EDUCATOR_RESOURCES } from "../data/educatorResources.js";

const resources = EDUCATOR_RESOURCE_GROUPS.flatMap(group =>
  group.ids.map(id => ({ ...EDUCATOR_RESOURCES[id], group: group.label }))
);

export default function EducatorResourceNav({
  currentId = null,
  navigate,
  title = "Browse professional development resources",
}) {
  return (
    <nav aria-label="For Educators resources" style={{
      marginTop: 30,
      padding: "18px 0 6px",
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 14,
        flexWrap: "wrap",
      }}>
        <p style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.gold,
        }}>{title}</p>
        <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.45 }}>
          Teaching, engagement, and leadership tools in one path.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(178px, 1fr))",
        gap: 10,
      }}>
        {resources.map(resource => {
          const active = resource.id === currentId;
          return (
            <button
              key={resource.id}
              type="button"
              onClick={() => navigate(resource.id)}
              aria-current={active ? "page" : undefined}
              style={{
                display: "grid",
                gridTemplateColumns: "52px 1fr",
                alignItems: "center",
                gap: 10,
                minHeight: 72,
                padding: 10,
                textAlign: "left",
                fontFamily: "inherit",
                color: C.textSecondary,
                background: active ? `${resource.accent}14` : C.surface,
                border: `1px solid ${active ? resource.accent + "65" : C.border}`,
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.22s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = resource.accent + "65";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = active ? resource.accent + "65" : C.border;
                e.currentTarget.style.transform = "none";
              }}
            >
              <img src={resource.image} alt="" loading="lazy" style={{
                width: 52,
                height: 52,
                borderRadius: 8,
                objectFit: "cover",
                border: `1px solid ${resource.accent}30`,
              }} />
              <span>
                <span style={{
                  display: "block",
                  color: resource.accent,
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}>{resource.group}</span>
                <span style={{
                  display: "block",
                  color: C.textPrimary,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}>{resource.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
