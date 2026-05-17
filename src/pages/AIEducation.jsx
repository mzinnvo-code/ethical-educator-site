import { C } from "../theme.js";
import {
  FadeIn,
  TopicCard,
  EducatorHero,
  Narrow,
  PageContainer,
  BodyText,
  Divider,
  ReadingTime,
  ContinueExploring,
} from "../components/shared.jsx";
import {
  AI_EDUCATION_CONTINUE_LINKS,
  AI_EDUCATION_HUB,
  AI_EDUCATION_SNAPSHOT_STATS,
  AI_EDUCATION_SOURCE_COVERAGE,
  AI_EDUCATION_TOPICS,
} from "../data/aiEducationResources.js";

function SnapshotStrip() {
  return (
    <FadeIn delay={0.08}>
      <section className="ai-hub-snapshot" aria-label="AI in Education snapshot">
        {AI_EDUCATION_SNAPSHOT_STATS.map((stat) => (
          <div key={stat.label} className="ai-hub-stat" style={{ borderColor: `${stat.color}28` }}>
            <strong style={{ color: stat.color }}>{stat.display}</strong>
            <span>{stat.label}</span>
            <em>{stat.subtitle}</em>
          </div>
        ))}
      </section>
    </FadeIn>
  );
}

function CoverageMap({ navigate }) {
  return (
    <FadeIn delay={0.1}>
      <section aria-label="Source coverage map" className="ai-coverage-map">
        <div className="ai-coverage-head">
          <p>Source Coverage</p>
          <h2>Every major section has a home.</h2>
        </div>
        <div className="ai-coverage-list">
          {AI_EDUCATION_SOURCE_COVERAGE.map((item) => (
            <button key={item.source} type="button" onClick={() => navigate(item.route)}>
              <span>{item.source}</span>
              <strong>{item.destination}</strong>
            </button>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}

export default function AIEducation({ navigate }) {
  return (
    <div style={{ padding: "0 0 80px", background: C.bgAlt }}>
      <style>{`
        .ai-hub-grid {
          margin-top: 32px;
        }
        .ai-hub-snapshot {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin: 34px 0 42px;
          padding: clamp(18px, 3vw, 24px);
          background: linear-gradient(135deg, rgba(18,37,61,0.94), rgba(8,18,32,0.76));
          border: 1px solid ${C.border};
          border-radius: 14px;
          box-shadow: 0 18px 60px rgba(0,0,0,0.14);
        }
        .ai-hub-stat {
          min-height: 126px;
          padding: 18px 14px;
          background: rgba(18,37,61,0.72);
          border: 1px solid;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .ai-hub-stat strong {
          display: block;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: clamp(1.75rem, 4vw, 2.35rem);
          line-height: 1;
          font-weight: 700;
        }
        .ai-hub-stat span {
          display: block;
          color: ${C.textSecondary};
          font-size: 0.82rem;
          line-height: 1.45;
          margin-top: 8px;
        }
        .ai-hub-stat em {
          display: block;
          color: ${C.textMuted};
          font-size: 0.72rem;
          line-height: 1.4;
          margin-top: 6px;
          font-style: normal;
        }
        .ai-coverage-map {
          margin: 42px 0 20px;
          padding: clamp(22px, 4vw, 30px);
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 14px;
        }
        .ai-coverage-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 18px;
          margin-bottom: 16px;
        }
        .ai-coverage-head p {
          color: ${C.gold};
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .ai-coverage-head h2 {
          color: ${C.textPrimary};
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: clamp(1.28rem, 3vw, 1.75rem);
          line-height: 1.18;
          text-align: right;
        }
        .ai-coverage-list {
          display: grid;
          gap: 8px;
        }
        .ai-coverage-list button {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(180px, 0.65fr);
          gap: 14px;
          align-items: center;
          border: 1px solid ${C.border};
          border-radius: 10px;
          padding: 12px 14px;
          background: rgba(8,18,32,0.28);
          color: ${C.textSecondary};
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s, background 0.2s;
        }
        .ai-coverage-list button:hover,
        .ai-coverage-list button:focus-visible {
          transform: translateY(-2px);
          border-color: ${C.gold}70;
          background: ${C.glow};
          outline: none;
        }
        .ai-coverage-list span {
          font-size: 0.84rem;
          line-height: 1.55;
        }
        .ai-coverage-list strong {
          color: ${C.gold};
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: right;
        }
        @media (max-width: 860px) {
          .ai-hub-snapshot {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .ai-coverage-list button {
            grid-template-columns: 1fr;
          }
          .ai-coverage-list strong {
            text-align: left;
          }
        }
        @media (max-width: 620px) {
          .ai-hub-snapshot {
            grid-template-columns: 1fr;
          }
          .ai-coverage-head {
            display: block;
          }
          .ai-coverage-head h2 {
            text-align: left;
            margin-top: 8px;
          }
        }
      `}</style>

      <EducatorHero
        label={AI_EDUCATION_HUB.sectionLabel}
        title={AI_EDUCATION_HUB.title}
        subtitle={AI_EDUCATION_HUB.desc}
        image={AI_EDUCATION_HUB.image}
        imageAlt={AI_EDUCATION_HUB.imageAlt}
        accent={AI_EDUCATION_HUB.accent}
        variant="background"
      />

      <PageContainer>
        <FadeIn delay={0.04}>
          <ReadingTime minutes={7} label="7 min hub" />
        </FadeIn>

        <div className="grid-3 ai-hub-grid">
          {AI_EDUCATION_TOPICS.map((topic, index) => (
            <TopicCard
              key={topic.id}
              image={topic.image}
              imageAlt={topic.imageAlt}
              title={topic.title}
              desc={topic.shortDesc}
              delay={0.06 + index * 0.04}
              accent={topic.accent}
              onClick={() => navigate(topic.id)}
            />
          ))}
        </div>

        <SnapshotStrip />

        <Narrow>
          <Divider label="Why this rebuild exists" />
          <FadeIn delay={0.06}>
            <BodyText>
              The old Innovate Ed AI resource was rich, but it lived as a long presentation with several topics folded into one journey. This hub turns that material into navigable sections for teachers and school leaders. Each page keeps the useful depth, updates dated claims, removes organization-specific references, and separates practical classroom help from policy-sensitive decisions.
            </BodyText>
            <BodyText>
              The organizing question is simple: how can AI help educators plan, support, explain, adapt, and reflect while keeping human judgment, student privacy, and real learning at the center?
            </BodyText>
          </FadeIn>

          <CoverageMap navigate={navigate} />

          <FadeIn delay={0.1}>
            <div style={{
              marginTop: 32,
              padding: "22px 24px",
              background: `linear-gradient(135deg, ${C.gold}0d, ${C.teal}08)`,
              border: `1px solid ${C.gold}28`,
              borderRadius: 14,
            }}>
              <p style={{ color: C.gold, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                Terms-aligned reminder
              </p>
              <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                This section is educational and informational. It is not legal, psychological, medical, or special-education advice. Always follow your school or district policy, use approved tools, and consult qualified professionals for decisions involving student data, disability services, grading, placement, or compliance.
              </p>
            </div>
          </FadeIn>

          <ContinueExploring navigate={navigate} links={AI_EDUCATION_CONTINUE_LINKS} />
        </Narrow>
      </PageContainer>
    </div>
  );
}
