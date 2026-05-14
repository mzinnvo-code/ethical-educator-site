import { C } from "../theme.js";
import {
  FadeIn, TopicCard, EducatorHero, Narrow, PageContainer
} from "../components/shared.jsx";
import EducatorResourceNav from "../components/EducatorResourceNav.jsx";
import { EDUCATOR_HUB, EDUCATOR_RESOURCE_GROUPS, EDUCATOR_RESOURCES } from "../data/educatorResources.js";

function PathwayHeader({ group, index }) {
  return (
    <FadeIn delay={0.04}>
      <div style={{
        marginTop: index === 0 ? 36 : 48,
        paddingTop: 28,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
        alignItems: "flex-end",
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span aria-hidden="true" style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: group.accent,
            background: `${group.accent}12`,
            border: `1px solid ${group.accent}38`,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "0.74rem",
          }}>{index + 1}</span>
          <div>
            <p style={{
              color: group.accent,
              fontSize: "0.64rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}>{group.kicker}</p>
            <h2 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: C.textPrimary,
              fontSize: "clamp(1.25rem, 3vw, 1.65rem)",
              lineHeight: 1.2,
              marginBottom: 8,
            }}>{group.label}</h2>
            <p style={{
              color: C.textMuted,
              fontSize: "0.9rem",
              lineHeight: 1.65,
              maxWidth: 620,
            }}>{group.desc}</p>
          </div>
        </div>
        <span style={{
          color: C.textMuted,
          fontSize: "0.72rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          paddingBottom: 6,
          whiteSpace: "nowrap",
        }}>{group.ids.length} resources</span>
      </div>
    </FadeIn>
  );
}

export default function ForEducators({ navigate }) {
  return (
    <div style={{ padding: "0 0 80px", background: C.bg }}>
      <EducatorHero
        label={EDUCATOR_HUB.sectionLabel}
        title={EDUCATOR_HUB.title}
        subtitle={EDUCATOR_HUB.desc}
        image={EDUCATOR_HUB.image}
        imageAlt={EDUCATOR_HUB.imageAlt}
        accent={EDUCATOR_HUB.accent}
        variant="background"
      />

      <PageContainer>
        <EducatorResourceNav navigate={navigate} title="Choose a professional learning focus" />

        {EDUCATOR_RESOURCE_GROUPS.map((group, groupIndex) => (
          <div key={group.label}>
            <PathwayHeader group={group} index={groupIndex} />
            <div
              className="grid-3"
              style={{
                marginTop: 18,
                gridTemplateColumns: group.ids.length === 2
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(3, minmax(0, 1fr))",
              }}
            >
              {group.ids.map((id, index) => {
                const resource = EDUCATOR_RESOURCES[id];
                return (
                  <TopicCard
                    key={resource.id}
                    image={resource.image}
                    imageAlt={resource.imageAlt}
                    title={resource.title}
                    desc={resource.shortDesc}
                    delay={0.06 + index * 0.04}
                    accent={resource.accent}
                    onClick={() => navigate(resource.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <Narrow>
          <FadeIn delay={0.1}>
            <div style={{ marginTop: 48, padding: "24px 28px", background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, textAlign: "center" }}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.05rem", fontWeight: 600, marginBottom: 8 }}>Built from the field</p>
              <p style={{ color: C.textMuted, fontSize: "0.88rem", lineHeight: 1.65 }}>
                Each page above draws on a professional development workshop or session originally delivered to K–12 educators and adapted here for self-paced reading. Use them in your own PD work, in coaching conversations, or as starting points for your own practice.
              </p>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
