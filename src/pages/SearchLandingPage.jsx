import { C } from "../theme.js";
import {
  FadeIn,
  PageContainer,
  SectionLabel,
  SectionTitle,
  Subtitle,
} from "../components/shared.jsx";
import { getFeatureIllustration } from "../data/illustrations.js";
import { SEARCH_LANDING_PAGE_BY_ROUTE } from "../data/growthPages.js";
import { track } from "../lib/analytics.js";

function currentRoute() {
  if (typeof window === "undefined") return "ai-ethics-lesson-plans";
  return window.location.pathname.replace(/^\/+|\/+$/g, "") || "ai-ethics-lesson-plans";
}

function internalPageId(href) {
  if (!href || !href.startsWith("/") || href.startsWith("//")) return null;
  return href.replace(/^\/+/, "") || "home";
}

function handleInternalClick(event, href, navigate, properties = {}) {
  const pageId = internalPageId(href);
  if (!pageId || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  track("seo_landing_click", {
    ...properties,
    href,
    targetPage: pageId,
  });
  event.preventDefault();
  navigate?.(pageId);
}

function ResourceLink({ item, navigate, sourcePage }) {
  return (
    <a
      href={item.href}
      onClick={(event) => handleInternalClick(event, item.href, navigate, {
        page: sourcePage,
        sourcePage,
        placement: "curated_resources",
        label: item.label,
      })}
      className="growth-link"
    >
      <span className="growth-link-title">{item.label}</span>
      {item.note && <span className="growth-link-note">{item.note}</span>}
    </a>
  );
}

export default function SearchLandingPage({ navigate, routeId }) {
  const page = SEARCH_LANDING_PAGE_BY_ROUTE[routeId || currentRoute()];
  if (!page) return null;

  const sourcePage = page.route;
  const heroImage = getFeatureIllustration(page.imageKey) || getFeatureIllustration("dialogue-toolkit");
  const topicList = page.topics || [];

  return (
    <div className="growth-page" style={{ background: C.bg }}>
      <style>{`
        .growth-page{padding:clamp(48px,7vw,78px) 0 86px}
        .growth-hero{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(280px,0.92fr);gap:clamp(28px,5vw,56px);align-items:center;margin-bottom:clamp(42px,6vw,64px)}
        .growth-hero-copy{min-width:0}
        .growth-hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
        .growth-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 18px;border-radius:8px;font-weight:800;font-size:0.9rem;border:1px solid ${C.borderHover};font-family:inherit;line-height:1.2}
        .growth-button.primary{background:linear-gradient(135deg,var(--growth-accent),${C.ocean});border-color:transparent;color:#fff;box-shadow:0 16px 38px rgba(0,0,0,0.18)}
        .growth-button.secondary{background:rgba(255,255,255,0.03);color:${C.textPrimary}}
        .growth-hero-figure{margin:0;border-radius:8px;overflow:hidden;border:1px solid color-mix(in srgb,var(--growth-accent) 28%,transparent);background:${C.surface};box-shadow:0 28px 80px rgba(0,0,0,0.26)}
        .growth-hero-figure img{display:block;width:100%;min-height:320px;height:100%;object-fit:cover}
        .growth-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:42px}
        .growth-card{display:block;height:100%;padding:20px;background:${C.surface};border:1px solid ${C.border};border-top:3px solid var(--growth-accent);border-radius:8px;color:${C.textSecondary};transition:transform .22s ease,border-color .22s ease,background .22s ease}
        .growth-card:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--growth-accent) 46%,transparent);background:${C.surfaceHover};opacity:1}
        .growth-card-label{display:block;color:var(--growth-accent);font-size:.68rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
        .growth-card-title{display:block;color:${C.textPrimary};font-family:'Source Serif 4',Georgia,serif;font-size:1.08rem;font-weight:700;line-height:1.2;margin-bottom:8px}
        .growth-card-text{display:block;font-size:.86rem;line-height:1.58;color:${C.textSecondary}}
        .growth-section{margin-top:42px}
        .growth-split{display:grid;grid-template-columns:minmax(260px,.82fr) minmax(0,1.18fr);gap:28px;align-items:start}
        .growth-kicker{color:var(--growth-accent);font-size:.7rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;margin-bottom:10px}
        .growth-heading{color:${C.textPrimary};font-family:'Source Serif 4',Georgia,serif;font-size:clamp(1.55rem,3vw,2.15rem);line-height:1.15;margin-bottom:12px}
        .growth-copy{color:${C.textSecondary};font-size:.94rem;line-height:1.72;max-width:680px}
        .growth-link-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .growth-link{display:block;padding:17px 18px;background:rgba(255,255,255,.02);border:1px solid ${C.border};border-radius:8px;color:${C.textSecondary};transition:border-color .2s ease,background .2s ease,transform .2s ease}
        .growth-link:hover{border-color:color-mix(in srgb,var(--growth-accent) 46%,transparent);background:rgba(255,255,255,.04);transform:translateY(-1px);opacity:1}
        .growth-link-title{display:block;color:${C.textPrimary};font-family:'Source Serif 4',Georgia,serif;font-weight:700;font-size:1rem;line-height:1.25;margin-bottom:5px}
        .growth-link-note{display:block;color:${C.textMuted};font-size:.84rem;line-height:1.52}
        .growth-topic-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}
        .growth-topic{border:1px solid ${C.border};border-radius:999px;color:${C.textSecondary};font-size:.76rem;padding:6px 10px;background:rgba(255,255,255,.02)}
        .growth-next{margin-top:46px;padding:26px;border:1px solid color-mix(in srgb,var(--growth-accent) 32%,transparent);border-radius:8px;background:linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01));display:flex;justify-content:space-between;gap:24px;align-items:center}
        .growth-next p{color:${C.textSecondary};line-height:1.65;font-size:.92rem;max-width:620px}
        @media(max-width:940px){.growth-hero,.growth-split{grid-template-columns:1fr}.growth-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:640px){.growth-grid,.growth-link-list{grid-template-columns:1fr}.growth-next{display:block}.growth-next .growth-button{margin-top:18px;width:100%}}
      `}</style>
      <PageContainer>
        <div style={{ "--growth-accent": page.accent }}>
          <FadeIn>
            <section className="growth-hero">
              <div className="growth-hero-copy">
                <SectionLabel>{page.label}</SectionLabel>
                <SectionTitle>{page.title}</SectionTitle>
                <Subtitle>{page.intro}</Subtitle>
                <div className="growth-hero-actions">
                  <a
                    href={page.primaryAction.href}
                    onClick={(event) => handleInternalClick(event, page.primaryAction.href, navigate, {
                      page: sourcePage,
                      sourcePage,
                      placement: "hero_primary",
                      label: page.primaryAction.label,
                    })}
                    className="growth-button primary"
                  >
                    {page.primaryAction.label}
                  </a>
                  <a
                    href={page.secondaryAction.href}
                    onClick={(event) => handleInternalClick(event, page.secondaryAction.href, navigate, {
                      page: sourcePage,
                      sourcePage,
                      placement: "hero_secondary",
                      label: page.secondaryAction.label,
                    })}
                    className="growth-button secondary"
                  >
                    {page.secondaryAction.label}
                  </a>
                </div>
              </div>
              <figure className="growth-hero-figure">
                <img src={heroImage.src} alt={heroImage.alt} loading="eager" />
              </figure>
            </section>
          </FadeIn>

          <section aria-labelledby="start-here-heading">
            <p className="growth-kicker">Start here</p>
            <h2 id="start-here-heading" className="growth-heading">Choose the route that matches the classroom job.</h2>
            <div className="growth-grid">
              {page.startHere.map((item, index) => (
                <FadeIn key={item.href} delay={index * 0.03}>
                  <a
                    href={item.href}
                    onClick={(event) => handleInternalClick(event, item.href, navigate, {
                      page: sourcePage,
                      sourcePage,
                      placement: "start_here",
                      label: item.title,
                    })}
                    className="growth-card"
                  >
                    <span className="growth-card-label">{item.label}</span>
                    <span className="growth-card-title">{item.title}</span>
                    <span className="growth-card-text">{item.text}</span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </section>

          <section className="growth-section growth-split" aria-labelledby="why-heading">
            <div>
              <p className="growth-kicker">Why this matters</p>
              <h2 id="why-heading" className="growth-heading">Useful search traffic should land on something teachers can actually use.</h2>
              <p className="growth-copy">{page.why}</p>
              <div className="growth-topic-row" aria-label="Topics covered">
                {topicList.map((topic) => <span key={topic} className="growth-topic">{topic}</span>)}
              </div>
            </div>
            <div>
              <p className="growth-kicker">Related classroom resources</p>
              <div className="growth-link-list">
                {page.curatedLinks.map((item) => (
                  <ResourceLink key={item.href} item={item} navigate={navigate} sourcePage={sourcePage} />
                ))}
              </div>
            </div>
          </section>

          <section className="growth-next" aria-label="Newsletter and next action">
            <div>
              <p className="growth-kicker">Retention engine</p>
              <h2 className="growth-heading" style={{ marginBottom: 8 }}>Keep the next useful resource close.</h2>
              <p>{page.newsletterAngle}</p>
            </div>
            <a
              href="/newsletter"
              onClick={(event) => handleInternalClick(event, "/newsletter", navigate, {
                page: sourcePage,
                sourcePage,
                placement: "newsletter_cta",
                label: "Subscribe to Sunday Dilemma",
              })}
              className="growth-button secondary"
            >
              Subscribe to Sunday Dilemma
            </a>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
