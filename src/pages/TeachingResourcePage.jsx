import { C } from "../theme.js";
import {
  FadeIn,
  PageContainer,
  SectionLabel,
  SectionTitle,
  Subtitle,
} from "../components/shared.jsx";
import { getExperimentIllustration, getFeatureIllustration } from "../data/illustrations.js";
import { TEACHING_RESOURCE_PAGE_BY_ROUTE } from "../data/growthPages.js";
import { track } from "../lib/analytics.js";

function currentRoute() {
  if (typeof window === "undefined") return "teaching-resources/paperclip-maximizer";
  return window.location.pathname.replace(/^\/+|\/+$/g, "") || "teaching-resources/paperclip-maximizer";
}

function internalPageId(href) {
  if (!href || !href.startsWith("/") || href.startsWith("//")) return null;
  return href.replace(/^\/+/, "") || "home";
}

function handleInternalClick(event, href, navigate, properties = {}) {
  const pageId = internalPageId(href);
  if (!pageId || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  track("teaching_resource_click", {
    ...properties,
    href,
    targetPage: pageId,
  });
  event.preventDefault();
  navigate?.(pageId);
}

function Detail({ label, value }) {
  return (
    <div className="resource-detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TextList({ title, items, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <section className="resource-block">
      <h2>{title}</h2>
      <Tag>
        {items.map((item) => <li key={item}>{item}</li>)}
      </Tag>
    </section>
  );
}

export default function TeachingResourcePage({ navigate, routeId }) {
  const page = TEACHING_RESOURCE_PAGE_BY_ROUTE[routeId || currentRoute()];
  if (!page) return null;

  const sourcePage = page.route;
  const image = getFeatureIllustration(page.imageKey)
    || getExperimentIllustration(page.imageKey)
    || getFeatureIllustration("dialogue-toolkit");

  return (
    <div className="teacher-resource-page" style={{ background: C.bg }}>
      <style>{`
        .teacher-resource-page{padding:clamp(48px,7vw,78px) 0 88px}
        .resource-hero{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(280px,.92fr);gap:clamp(28px,5vw,54px);align-items:center;margin-bottom:42px}
        .resource-hero figure{margin:0;border-radius:8px;overflow:hidden;border:1px solid color-mix(in srgb,var(--resource-accent) 30%,transparent);background:${C.surface};box-shadow:0 28px 80px rgba(0,0,0,.26)}
        .resource-hero img{display:block;width:100%;min-height:320px;height:100%;object-fit:cover}
        .resource-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
        .resource-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 18px;border-radius:8px;font-weight:800;font-size:.9rem;border:1px solid ${C.borderHover};font-family:inherit;line-height:1.2}
        .resource-button.primary{background:linear-gradient(135deg,var(--resource-accent),${C.ocean});border-color:transparent;color:#fff;box-shadow:0 16px 38px rgba(0,0,0,.18)}
        .resource-button.secondary{background:rgba(255,255,255,.03);color:${C.textPrimary}}
        .resource-details{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:42px}
        .resource-detail{padding:16px 18px;background:${C.surface};border:1px solid ${C.border};border-radius:8px;border-top:3px solid var(--resource-accent)}
        .resource-detail span{display:block;color:${C.textMuted};font-size:.7rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;margin-bottom:7px}
        .resource-detail strong{display:block;color:${C.textPrimary};font-family:'Source Serif 4',Georgia,serif;font-size:1.08rem;line-height:1.25}
        .resource-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,330px);gap:32px;align-items:start}
        .resource-main{display:grid;gap:22px}
        .resource-block{padding-bottom:22px;border-bottom:1px solid ${C.border}}
        .resource-block h2{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:clamp(1.32rem,2.5vw,1.75rem);line-height:1.18;margin-bottom:12px}
        .resource-block p{color:${C.textSecondary};font-size:.95rem;line-height:1.72;max-width:760px}
        .resource-block ul,.resource-block ol{margin-left:20px;color:${C.textSecondary};font-size:.93rem;line-height:1.7}
        .resource-block li{padding-left:4px;margin-bottom:8px}
        .resource-sidebar{position:sticky;top:86px;display:grid;gap:16px}
        .resource-panel{padding:20px;background:${C.surface};border:1px solid ${C.border};border-radius:8px}
        .resource-panel h2{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:1.12rem;line-height:1.2;margin-bottom:10px}
        .resource-panel p{color:${C.textMuted};font-size:.84rem;line-height:1.58;margin-bottom:12px}
        .resource-related{display:grid;gap:9px}
        .resource-related a{display:block;padding:11px 12px;border:1px solid ${C.border};border-radius:8px;color:${C.textSecondary};font-size:.84rem;line-height:1.35;background:rgba(255,255,255,.02)}
        .resource-related a:hover{border-color:color-mix(in srgb,var(--resource-accent) 46%,transparent);background:rgba(255,255,255,.04);opacity:1}
        .resource-topic-row{display:flex;gap:8px;flex-wrap:wrap}
        .resource-topic{border:1px solid ${C.border};border-radius:999px;color:${C.textSecondary};font-size:.74rem;padding:6px 10px;background:rgba(255,255,255,.02)}
        @media(max-width:940px){.resource-hero,.resource-layout{grid-template-columns:1fr}.resource-sidebar{position:static}.resource-details{grid-template-columns:1fr}}
        @media(max-width:640px){.resource-button{width:100%}}
      `}</style>
      <PageContainer>
        <div style={{ "--resource-accent": page.accent }}>
          <FadeIn>
            <section className="resource-hero">
              <div>
                <SectionLabel>{page.label}</SectionLabel>
                <SectionTitle>{page.title}</SectionTitle>
                <Subtitle>{page.overview}</Subtitle>
                <div className="resource-actions">
                  <a
                    className="resource-button primary"
                    href={page.primaryAction.href}
                    onClick={(event) => handleInternalClick(event, page.primaryAction.href, navigate, {
                      page: sourcePage,
                      sourcePage,
                      placement: "hero_primary",
                      label: page.primaryAction.label,
                    })}
                  >
                    {page.primaryAction.label}
                  </a>
                  <a
                    className="resource-button secondary"
                    href="/ai-ethics-lesson-plans"
                    onClick={(event) => handleInternalClick(event, "/ai-ethics-lesson-plans", navigate, {
                      page: sourcePage,
                      sourcePage,
                      placement: "hero_secondary",
                      label: "Browse all lesson plans",
                    })}
                  >
                    Browse all lesson plans
                  </a>
                </div>
              </div>
              <figure>
                <img src={image.src} alt={image.alt} loading="eager" />
              </figure>
            </section>
          </FadeIn>

          <section className="resource-details" aria-label="Resource details">
            <Detail label="Grade band" value={page.gradeBand} />
            <Detail label="Time required" value={page.time} />
            <Detail label="Format" value="Discussion resource" />
          </section>

          <div className="resource-layout">
            <div className="resource-main">
              <section className="resource-block">
                <h2>Essential Question</h2>
                <p>{page.essentialQuestion}</p>
              </section>
              <TextList title="Learning Objectives" items={page.objectives} />
              <TextList title="Materials" items={page.materials} />
              <TextList title="Discussion Flow" items={page.flow} ordered />
              <TextList title="Teacher Notes" items={page.teacherNotes} />
            </div>

            <aside className="resource-sidebar" aria-label="Related resources">
              <section className="resource-panel">
                <h2>Related Resources</h2>
                <p>Keep the next click inside the classroom workflow.</p>
                <div className="resource-related">
                  {page.relatedLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(event) => handleInternalClick(event, link.href, navigate, {
                        page: sourcePage,
                        sourcePage,
                        placement: "related_resources",
                        label: link.label,
                      })}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
              <section className="resource-panel">
                <h2>Topics</h2>
                <div className="resource-topic-row">
                  {page.topics.map((topic) => <span key={topic} className="resource-topic">{topic}</span>)}
                </div>
              </section>
              <section className="resource-panel">
                <h2>Teacher-Friendly Use</h2>
                <p>
                  This page is built as a crawlable overview. Use the primary action to open the full packet,
                  interactive scenario, or tool when you are ready to teach it.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
