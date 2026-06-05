import { useState, useEffect, useRef } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider, BodyText, ContinueExploring, ImagePageHeader,
} from "../../components/shared.jsx";
import ExperimentGrid from "../../components/ExperimentGrid.jsx";
import IntroComicStrip from "../../components/IntroComicStrip.jsx";
import ScenarioCard from "../../components/ScenarioCard.jsx";
import TopicFilter from "../../components/TopicFilter.jsx";
import ReasoningProfile from "../../components/ReasoningProfile.jsx";
import ThoughtProgressPanel from "../../components/ThoughtProgressPanel.jsx";
import { useExperimentFilter } from "../../hooks/useExperimentFilter.js";
import { getExperimentsByGrade, getTopicIdsForGrade } from "../../data/experiments.js";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { getIntroComic } from "../../data/introComics.js";
import { audioBus } from "../../lib/audioBus.js";

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

function experimentIdFromHash() {
  if (typeof window === "undefined") return null;
  const query = window.location.search.slice(1) || "";
  return new URLSearchParams(query).get("experiment");
}

const TOOLKIT_LINK = withImage({ id: "thought-experiments/toolkit", icon: "🛠", title: "Dialogue Toolkit", desc: "Norms, protocols, decision tree", color: C.teal });

const SIBLING_LINKS = {
  "educators": [
    withImage({ id: "thought-experiments", icon: "📚", title: "Hub & explainer", desc: "What thought experiments are, why they matter", color: C.teal }),
    withImage({ id: "thought-experiments/k-5", icon: "🧸", title: "K–5", desc: "Grade-by-grade stories", color: C.coral }),
    withImage({ id: "thought-experiments/6-8", icon: "🚋", title: "6–8", desc: "Story-based dilemmas", color: C.gold }),
    withImage({ id: "thought-experiments/9-12", icon: "🕳️", title: "9–12", desc: "The philosophical canon", color: C.ocean }),
    TOOLKIT_LINK,
  ],
  "k-5": [
    withImage({ id: "thought-experiments", icon: "📚", title: "Hub & explainer", desc: "What thought experiments are", color: C.teal }),
    withImage({ id: "thought-experiments/educators", icon: "🍎", title: "For Educators", desc: "Adult AI dilemmas", color: C.gold }),
    withImage({ id: "thought-experiments/6-8", icon: "🚋", title: "6–8", desc: "Story-based dilemmas", color: C.gold }),
    withImage({ id: "thought-experiments/9-12", icon: "🕳️", title: "9–12", desc: "The canon", color: C.ocean }),
    TOOLKIT_LINK,
  ],
  "6-8": [
    withImage({ id: "thought-experiments", icon: "📚", title: "Hub & explainer", desc: "What thought experiments are", color: C.teal }),
    withImage({ id: "thought-experiments/educators", icon: "🍎", title: "For Educators", desc: "Adult AI dilemmas", color: C.gold }),
    withImage({ id: "thought-experiments/k-5", icon: "🧸", title: "K–5", desc: "Grade-by-grade stories", color: C.coral }),
    withImage({ id: "thought-experiments/9-12", icon: "🕳️", title: "9–12", desc: "The canon", color: C.ocean }),
    TOOLKIT_LINK,
  ],
  "9-12": [
    withImage({ id: "thought-experiments", icon: "📚", title: "Hub & explainer", desc: "What thought experiments are", color: C.teal }),
    withImage({ id: "thought-experiments/educators", icon: "🍎", title: "For Educators", desc: "Adult AI dilemmas", color: C.gold }),
    withImage({ id: "thought-experiments/k-5", icon: "🧸", title: "K–5", desc: "Grade-by-grade stories", color: C.coral }),
    withImage({ id: "thought-experiments/6-8", icon: "🚋", title: "6–8", desc: "Story-based dilemmas", color: C.gold }),
    TOOLKIT_LINK,
  ],
};

export default function GradePage({
  navigate,
  band,             // "educators" | "k-5" | "6-8" | "9-12"
  mode,             // "kid" | "story" | "canon"
  label,            // breadcrumb text
  title,            // h2
  blurb,            // intro paragraph
  preExperiments = null,  // optional content before the grid (e.g. flagship cards on educators)
  renderResults = null,   // optional ({experiments, filterApi, all, onSelect, emptyMessage}) => JSX,
                          // used to override the default flat ExperimentGrid (e.g. themed grouping at 9-12)
  introComicKey = null,
  emptyMessage,
  heroImage = null,
  heroImageAlt = "",
  heroAccent = C.gold,
}) {
  const all = getExperimentsByGrade(band);
  const filterApi = useExperimentFilter(all);
  const [active, setActive] = useState(null);
  const [lensChoices, setLensChoices] = useState([]); // session-only
  const activeWrapperRef = useRef(null);

  // Reset selection/profile when the band changes, and honour article deep links.
  useEffect(() => {
    const syncExperimentFromHash = () => {
      audioBus.stop();
      const id = experimentIdFromHash();
      const target = id ? getExperimentsByGrade(band).find(experiment => experiment.id === id) : null;
      setActive(target || null);
      setLensChoices([]);
    };

    syncExperimentFromHash();
    window.addEventListener("popstate", syncExperimentFromHash);
    window.addEventListener("examined-classroom:route", syncExperimentFromHash);
    return () => {
      window.removeEventListener("popstate", syncExperimentFromHash);
      window.removeEventListener("examined-classroom:route", syncExperimentFromHash);
    };
  }, [band]);

  // Stop in-flight narration when the page unmounts (e.g. user navigates away).
  useEffect(() => () => audioBus.stop(), []);

  // Smoothly scroll the active card into view after it mounts.
  useEffect(() => {
    if (!active) return;
    requestAnimationFrame(() => {
      activeWrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [active]);

  const closeActive = () => { audioBus.stop(); setActive(null); };

  const pickRelated = (current, pool) => {
    if (!current || !pool?.length) return null;
    const currentTopics = new Set(current.topics || []);
    return pool.find(e => e.id !== current.id && (e.topics || []).some(t => currentTopics.has(t))) || null;
  };
  const handlePickRelated = (next) => { audioBus.stop(); setActive(next); };

  const recordChoice = (lens) => setLensChoices(prev => [...prev, lens]);
  const resetProfile = () => setLensChoices([]);
  const visualVariant = band;
  const suggestTopic = (topicId) => {
    filterApi.setSelectedTopics([topicId]);
    closeActive();
  };

  const availableTopicIds = getTopicIdsForGrade(band);
  const preExperimentContent = typeof preExperiments === "function"
    ? preExperiments({ experiments: all, filterApi })
    : preExperiments;
  const introComic = introComicKey ? getIntroComic(introComicKey) : null;
  const isDeepfakeActive = active?.id === "deepfake-election" && mode === "story";

  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        {heroImage ? (
          <ImagePageHeader
            label={`Thought Experiments · ${label}`}
            title={title}
            subtitle={blurb}
            image={heroImage}
            imageAlt={heroImageAlt}
            accent={heroAccent}
          />
        ) : (
          <FadeIn>
            <p style={{
              fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", color: C.gold, marginBottom: 10,
            }}>
              Thought Experiments · {label}
            </p>
            <SectionTitle>{title}</SectionTitle>
            {blurb && <Subtitle>{blurb}</Subtitle>}
          </FadeIn>
        )}

        {!active && introComic && (
          <IntroComicStrip comic={introComic} />
        )}

        {!active && (
          <div
            className="thought-progress-wide-wrap"
            style={{
              maxWidth: 1080,
              margin: "18px auto 28px",
            }}
          >
            <ThoughtProgressPanel
              variant="intro"
              navigate={navigate}
              accent={heroAccent}
              title="Ari's Goal Tracker"
              experimentIds={all.map((experiment) => experiment.id)}
            />
          </div>
        )}

        <Narrow>
          {/* Optional pre-content (e.g. flagships block) */}
          {!active && preExperimentContent}

          {!active && (
            <>
              <Divider label="Browse the bank" />
              <TopicFilter
                availableTopicIds={availableTopicIds}
                selectedTopics={filterApi.selectedTopics}
                onToggleTopic={filterApi.toggleTopic}
                query={filterApi.query}
                onQueryChange={filterApi.setQuery}
                onClear={filterApi.clearFilters}
                resultCount={filterApi.filtered.length}
                totalCount={all.length}
                extraActiveCount={filterApi.selectedThemes?.length || 0}
              />
              {renderResults ? renderResults({
                experiments: filterApi.filtered,
                all,
                filterApi,
                onSelect: (e) => setActive(e),
                emptyMessage,
              }) : (
                <ExperimentGrid
                  experiments={filterApi.filtered}
                  onSelect={(e) => setActive(e)}
                  emptyMessage={emptyMessage}
                  visualVariant={visualVariant}
                />
              )}
            </>
          )}

          {active && (
            <div
              ref={activeWrapperRef}
              style={{
                marginTop: 20,
                scrollMarginTop: 80,
                width: isDeepfakeActive ? "min(1040px, calc(100vw - 48px))" : "100%",
                maxWidth: isDeepfakeActive ? 1040 : 740,
                marginLeft: isDeepfakeActive ? "50%" : 0,
                transform: isDeepfakeActive ? "translateX(-50%)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                <button
                  onClick={closeActive}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "none", color: C.textMuted, cursor: "pointer",
                    fontSize: "0.84rem", padding: 0, transition: "color 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.color = C.gold}
                  onMouseOut={e => e.currentTarget.style.color = C.textMuted}
                >
                  ← Back to all {label} experiments
                </button>
                <button
                  onClick={() => { audioBus.stop(); navigate?.("thought-experiments"); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "none", color: C.textMuted, cursor: "pointer",
                    fontSize: "0.84rem", padding: 0, transition: "color 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.color = C.gold}
                  onMouseOut={e => e.currentTarget.style.color = C.textMuted}
                >
                  ⌂ Thought Experiments hub
                </button>
              </div>
              <ScenarioCard
                key={active.id}
                experiment={active}
                experimentIds={all.map((experiment) => experiment.id)}
                mode={mode}
                visualVariant={visualVariant}
                onClose={closeActive}
                onRecordChoice={recordChoice}
                relatedExperiment={pickRelated(active, all)}
                onPickRelated={handlePickRelated}
              />
            </div>
          )}

          <ReasoningProfile
            choices={lensChoices}
            onSuggestTopic={suggestTopic}
            onReset={resetProfile}
            sticky={!isDeepfakeActive}
          />

          {!active && SIBLING_LINKS[band] && (
            <FadeIn>
              <ContinueExploring navigate={navigate} links={SIBLING_LINKS[band]} />
            </FadeIn>
          )}
        </Narrow>
      </PageContainer>
    </div>
  );
}
