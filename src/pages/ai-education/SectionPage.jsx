import { C } from "../../theme.js";
import {
  FadeIn,
  Expandable,
  EducatorHero,
  Narrow,
  PageContainer,
  BodyText,
  ComparisonCard,
  Divider,
  ReadingTime,
  ResearchCallout,
  ContinueExploring,
} from "../../components/shared.jsx";
import {
  AI_EDUCATION_CONTINUE_LINKS,
  AI_EDUCATION_PAGES,
  AI_EDUCATION_TOPICS,
} from "../../data/aiEducationResources.js";

function ResourceLink({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        padding: "11px 13px",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        color: C.textSecondary,
        textDecoration: "none",
        fontSize: "0.84rem",
        lineHeight: 1.45,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {link.label} <span aria-hidden="true" style={{ color: C.gold }}>↗</span>
    </a>
  );
}

function PageNav({ currentId, navigate }) {
  return (
    <FadeIn delay={0.06}>
      <nav aria-label="AI in Education sections" style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        margin: "26px 0 8px",
      }}>
        {AI_EDUCATION_TOPICS.map((page) => {
          const active = page.id === currentId;
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => navigate(page.id)}
              style={{
                border: `1px solid ${active ? page.accent : C.border}`,
                borderRadius: 999,
                padding: "8px 12px",
                background: active ? `${page.accent}16` : "rgba(255,255,255,0.02)",
                color: active ? page.accent : C.textMuted,
                fontFamily: "inherit",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {page.shortTitle}
            </button>
          );
        })}
      </nav>
    </FadeIn>
  );
}

function ToolGroups({ groups }) {
  if (!groups?.length) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
      {groups.map((group) => (
        <div key={group.title} style={{
          background: `${group.color}08`,
          border: `1px solid ${group.color}30`,
          borderRadius: 12,
          padding: "16px 18px",
        }}>
          <h4 style={{ color: group.color, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.98rem", marginBottom: 10 }}>
            {group.title}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {group.items.map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const href = typeof item === "object" ? item.href : null;
              return (
                <li key={label} style={{ color: C.textSecondary, fontSize: "0.83rem", lineHeight: 1.6, padding: "4px 0" }}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: C.textSecondary, textDecoration: "none" }}
                    >
                      {label}
                      <span aria-hidden="true" style={{ color: group.color, marginLeft: 4, fontSize: "0.85em" }}>↗</span>
                    </a>
                  ) : label}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SectionBlock({ section, index, navigate }) {
  return (
    <FadeIn delay={0.06 + index * 0.03}>
      <Expandable title={section.title} color={section.color || C.gold} tag={section.tag} defaultOpen={index === 0}>
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph} style={{ marginTop: 12 }}>{paragraph}</p>
        ))}

        {section.list?.length > 0 && (
          <div style={{ margin: "16px 0" }}>
            {section.listTitle && <p style={{ color: C.textPrimary, fontWeight: 700, marginBottom: 8 }}>{section.listTitle}</p>}
            <ul style={{ paddingLeft: 20, color: C.textSecondary, lineHeight: 1.8 }}>
              {section.list.map((item) => {
                if (typeof item === "string") return <li key={item}>{item}</li>;
                const { label, href, desc } = item;
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.gold, textDecoration: "none", fontWeight: 600 }}
                      >
                        {label}
                        <span aria-hidden="true" style={{ color: C.gold, marginLeft: 3, fontSize: "0.85em" }}>↗</span>
                      </a>
                    ) : (
                      <strong style={{ color: C.textPrimary }}>{label}</strong>
                    )}
                    {desc ? <> — {desc}</> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {section.cards?.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10, margin: "16px 0" }}>
            {section.cards.map((card) => (
              <ComparisonCard key={card.title} title={card.title} color={card.color || section.color || C.gold} items={card.items} />
            ))}
          </div>
        )}

        <ToolGroups groups={section.toolGroups} />

        {section.evidenceCallouts?.length > 0 && (
          <div style={{ display: "grid", gap: 12, margin: "18px 0" }}>
            {section.evidenceCallouts.map((cb) => (
              <ResearchCallout
                key={`${cb.year}-${cb.title}`}
                year={cb.year}
                title={cb.title}
                finding={cb.finding}
                citation={cb.citation}
                color={cb.color || section.color || C.gold}
              />
            ))}
          </div>
        )}

        {section.relatedExperiments?.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, margin: "18px 0" }}>
            {section.relatedExperiments.map((exp) => (
              <button
                key={exp.route}
                type="button"
                onClick={() => navigate(exp.route)}
                style={{
                  textAlign: "left",
                  background: `${section.color || C.gold}08`,
                  border: `1px solid ${section.color || C.gold}40`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  color: C.textSecondary,
                  font: "inherit",
                }}
              >
                <strong style={{ display: "block", color: section.color || C.gold, marginBottom: 6, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {exp.title}
                </strong>
                <span style={{ fontSize: "0.86rem", lineHeight: 1.55 }}>{exp.framing}</span>
              </button>
            ))}
          </div>
        )}

        {section.sources?.length > 0 && (
          <div style={{ margin: "18px 0 4px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {section.sources.map((source) => <ResourceLink key={source.href} link={source} />)}
          </div>
        )}
      </Expandable>
    </FadeIn>
  );
}

function PracticalNotes({ page }) {
  return (
    <FadeIn delay={0.08}>
      <section style={{
        margin: "32px 0",
        padding: "24px clamp(18px, 3vw, 28px)",
        background: `linear-gradient(135deg, ${page.accent}0c, ${C.gold}06)`,
        border: `1px solid ${page.accent}2f`,
        borderRadius: 14,
      }}>
        <p style={{
          color: page.accent,
          fontSize: "0.66rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}>
          What this means for teachers and leaders
        </p>
        <ul style={{ paddingLeft: 20, color: C.textSecondary, lineHeight: 1.75, fontSize: "0.92rem" }}>
          {page.teacherLeaderMoves.map((move) => <li key={move}>{move}</li>)}
        </ul>
      </section>
    </FadeIn>
  );
}

function CautionNote({ page }) {
  return (
    <FadeIn delay={0.1}>
      <div style={{
        margin: "22px 0 34px",
        padding: "16px 18px",
        borderLeft: `3px solid ${C.coral}`,
        borderRadius: "0 10px 10px 0",
        background: `${C.coral}08`,
      }}>
        <p style={{ color: C.coral, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
          Use with caution
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>{page.useWithCaution}</p>
      </div>
    </FadeIn>
  );
}

function References({ links }) {
  if (!links?.length) return null;
  return (
    <FadeIn delay={0.08}>
      <div style={{ marginTop: 28 }}>
        <Divider label="Resources" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {links.map((link) => <ResourceLink key={link.href} link={link} />)}
        </div>
      </div>
    </FadeIn>
  );
}

function RelatedInternal({ page, navigate }) {
  if (!page.relatedInternal?.length) return null;
  const links = page.relatedInternal.map((link) => ({
    id: link.id,
    title: link.label,
    desc: link.blurb,
    color: page.accent,
    image: page.image,
    imageAlt: page.imageAlt,
  }));
  return <ContinueExploring links={links} navigate={navigate} />;
}

function AIEducationSectionPage({ pageId, navigate }) {
  const page = AI_EDUCATION_PAGES[pageId];

  if (!page) return null;

  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <EducatorHero
          label={page.sectionLabel}
          title={page.title}
          subtitle={page.desc}
          image={page.image}
          imageAlt={page.imageAlt}
          accent={page.accent}
        />
        <PageNav currentId={page.id} navigate={navigate} />

        <Narrow>
          <FadeIn delay={0.04}>
            <ReadingTime minutes={page.readingMinutes} />
          </FadeIn>
          <FadeIn delay={0.06}>
            <BodyText>{page.bigIdea}</BodyText>
          </FadeIn>
          <CautionNote page={page} />

          <Divider label="Core Sections" />
          {page.sections.map((section, index) => (
            <SectionBlock key={section.title} section={section} index={index} navigate={navigate} />
          ))}

          <PracticalNotes page={page} />
          <References links={page.resourceLinks} />
          <RelatedInternal page={page} navigate={navigate} />
          {!page.relatedInternal?.length && <ContinueExploring navigate={navigate} links={AI_EDUCATION_CONTINUE_LINKS} />}
        </Narrow>
      </PageContainer>
    </div>
  );
}

export function AIEducationFoundations(props) {
  return <AIEducationSectionPage pageId="ai-education/foundations" {...props} />;
}

export function AIEducationClassroomPractice(props) {
  return <AIEducationSectionPage pageId="ai-education/classroom-practice" {...props} />;
}

export function AIEducationStudentTools(props) {
  return <AIEducationSectionPage pageId="ai-education/student-tools" {...props} />;
}

export function AIEducationPolicyEthics(props) {
  return <AIEducationSectionPage pageId="ai-education/policy-ethics" {...props} />;
}

export function AIEducationFutureReadiness(props) {
  return <AIEducationSectionPage pageId="ai-education/future-readiness" {...props} />;
}

export function AIEducationToolsResources(props) {
  return <AIEducationSectionPage pageId="ai-education/tools-resources" {...props} />;
}
