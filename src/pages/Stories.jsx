import { C } from "../theme.js";
import {
  PageContainer,
  Narrow,
  SectionLabel,
  SectionTitle,
  Subtitle,
  FadeIn,
} from "../components/shared.jsx";
import Testimonial from "../components/Testimonial.jsx";
import { TESTIMONIALS, STORIES, hasAnyRealStories } from "../data/testimonials.js";

/**
 * /stories — classroom case studies + short testimonials.
 *
 * Until real stories arrive, the page shows a clearly-marked placeholder
 * banner explaining the gathering phase and inviting submissions. Each
 * sample testimonial and story renders with a "Sample · placeholder"
 * pill so there's no ambiguity.
 */
export default function Stories({ navigate }) {
  const showingOnlySamples = !hasAnyRealStories();

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>From the classroom</SectionLabel>
            <SectionTitle>How educators are using The Ethical Educator</SectionTitle>
            <Subtitle>
              Short quotes and longer classroom stories from teachers, administrators, and parents who have used resources here. The point isn't testimonials in the marketing sense — it's other educators showing what worked, what surprised them, and what they'd do differently.
            </Subtitle>
          </FadeIn>

          {showingOnlySamples && (
            <FadeIn delay={0.04}>
              <PlaceholderBanner navigate={navigate} />
            </FadeIn>
          )}

          {STORIES.length > 0 && (
            <FadeIn delay={0.08}>
              <h2 style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: C.textPrimary,
                fontSize: "1.4rem",
                fontWeight: 600,
                marginTop: 32,
                marginBottom: 14,
              }}>Classroom stories</h2>
              <div style={{ display: "grid", gap: 18 }}>
                {STORIES.map((story) => (
                  <StoryCard key={story.id} story={story} navigate={navigate} />
                ))}
              </div>
            </FadeIn>
          )}

          {TESTIMONIALS.length > 0 && (
            <FadeIn delay={0.12}>
              <h2 style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: C.textPrimary,
                fontSize: "1.4rem",
                fontWeight: 600,
                marginTop: 40,
                marginBottom: 6,
              }}>Short notes from the field</h2>
              <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 16 }}>
                Quick one-or-two-sentence reactions from people who've used a specific resource.
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {TESTIMONIALS.map((t) => (
                  <Testimonial key={t.id} t={t} onNavigate={navigate} />
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.16}>
            <SubmitCta />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}

function PlaceholderBanner({ navigate }) {
  return (
    <section
      aria-label="Stories page is in placeholder mode"
      style={{
        marginTop: 28,
        padding: "20px 22px",
        background: `repeating-linear-gradient(45deg, rgba(255,255,255,0.012), rgba(255,255,255,0.012) 12px, transparent 12px, transparent 24px), ${C.surface}`,
        border: `1px dashed ${C.gold}66`,
        borderRadius: 12,
      }}
    >
      <p style={{
        fontSize: "0.66rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.gold,
        marginBottom: 8,
      }}>
        This page is in placeholder mode
      </p>
      <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.65, marginBottom: 8 }}>
        Every story and quote below is currently a sample, marked with a dashed border and a <em>Sample · placeholder</em> pill. They show the pattern; they aren't real teachers.
      </p>
      <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.65 }}>
        If you've used a resource here in your classroom and would be willing to share a short note or a longer story,{" "}
        <a
          href="mailto:hello@theethicaleducator.com?subject=From%20the%20classroom"
          style={{ color: C.gold, fontWeight: 600 }}
        >we'd love to feature you</a>. Real stories replace the samples on the next deploy.
      </p>
    </section>
  );
}

function StoryCard({ story, navigate }) {
  const accent = story.accent || C.gold;
  const isInternal = story.resource?.url?.startsWith("/");
  return (
    <article
      style={{
        padding: "22px 24px",
        background: story.placeholder
          ? `repeating-linear-gradient(45deg, rgba(255,255,255,0.012), rgba(255,255,255,0.012) 12px, transparent 12px, transparent 24px), ${C.surface}`
          : C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: story.placeholder
          ? `4px dashed ${accent}88`
          : `4px solid ${accent}`,
        borderRadius: 14,
      }}
    >
      {story.placeholder && (
        <span style={{
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
        }}>
          Sample · placeholder
        </span>
      )}

      <h3 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary,
        fontSize: "1.2rem",
        fontWeight: 700,
        lineHeight: 1.3,
        marginBottom: 10,
      }}>{story.title}</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14, fontSize: "0.78rem", color: C.textMuted }}>
        {story.grade && <span><strong style={{ color: C.textSecondary }}>Grade:</strong> {story.grade}</span>}
        {story.subject && <span><strong style={{ color: C.textSecondary }}>Subject:</strong> {story.subject}</span>}
        {story.resource?.url && (
          <span>
            <strong style={{ color: C.textSecondary }}>Resource:</strong>{" "}
            {isInternal ? (
              <a
                href={story.resource.url}
                onClick={(e) => {
                  if (navigate) {
                    e.preventDefault();
                    navigate(story.resource.url.replace(/^\/+/, ""));
                  }
                }}
                style={{ color: accent, textDecoration: "none", borderBottom: `1px solid ${accent}66` }}
              >{story.resource.label}</a>
            ) : (
              <a
                href={story.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent, textDecoration: "none", borderBottom: `1px solid ${accent}66` }}
              >{story.resource.label} ↗</a>
            )}
          </span>
        )}
      </div>

      {story.summary && (
        <p style={{
          color: C.sand,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontStyle: "italic",
          fontSize: "0.96rem",
          lineHeight: 1.55,
          marginBottom: 14,
          paddingBottom: 14,
          borderBottom: `1px solid ${C.border}`,
        }}>{story.summary}</p>
      )}

      {story.story?.map((paragraph, i) => (
        <p key={i} style={{
          color: C.textSecondary,
          fontSize: "0.95rem",
          lineHeight: 1.75,
          marginBottom: 12,
        }}>{paragraph}</p>
      ))}

      <p style={{ color: C.textMuted, fontSize: "0.82rem", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        — <strong style={{ color: C.textSecondary }}>{story.name}</strong>
        {story.role && <span>, {story.role}</span>}
        {story.school && <span> · {story.school}</span>}
        {story.location && <span> · {story.location}</span>}
      </p>
    </article>
  );
}

function SubmitCta() {
  return (
    <div style={{
      marginTop: 40,
      padding: "24px 26px",
      background: `linear-gradient(135deg, ${C.gold}0c, ${C.teal}06)`,
      border: `1px solid ${C.gold}33`,
      borderRadius: 14,
    }}>
      <p style={{
        fontSize: "0.66rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.gold,
        marginBottom: 8,
      }}>
        Share your story
      </p>
      <h3 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary,
        fontSize: "1.2rem",
        fontWeight: 700,
        marginBottom: 10,
      }}>Used a resource in your classroom?</h3>
      <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 14 }}>
        We're gathering real classroom stories to replace the samples on this page. A short paragraph or a few minutes of a longer story is enough. You retain attribution however you'd like — full name, first name and grade, or fully anonymous.
      </p>
      <a
        href="mailto:hello@theethicaleducator.com?subject=From%20the%20classroom&body=Hi%20Matt%2C%0A%0AI%20used%20%5Bresource%5D%20with%20my%20%5Bgrade%2Fsubject%5D%20class%20and%20...%0A%0A"
        style={{
          display: "inline-block",
          padding: "10px 18px",
          background: `linear-gradient(135deg, ${C.gold}, ${C.coral})`,
          color: C.midnight,
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "0.88rem",
          borderRadius: 8,
        }}
      >Email Matt with your story →</a>
    </div>
  );
}
