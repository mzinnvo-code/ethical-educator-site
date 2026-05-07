import { useState, useEffect } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider, BodyText, ContinueExploring,
} from "../../components/shared.jsx";
import ExperimentGrid from "../../components/ExperimentGrid.jsx";
import ScenarioCard from "../../components/ScenarioCard.jsx";
import TopicFilter from "../../components/TopicFilter.jsx";
import ReasoningProfile from "../../components/ReasoningProfile.jsx";
import { useExperimentFilter } from "../../hooks/useExperimentFilter.js";
import { getExperimentsByGrade, getTopicIdsForGrade } from "../../data/experiments.js";
import { getFeatureIllustration } from "../../data/illustrations.js";

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

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
  emptyMessage,
}) {
  const all = getExperimentsByGrade(band);
  const filterApi = useExperimentFilter(all);
  const [active, setActive] = useState(null);
  const [lensChoices, setLensChoices] = useState([]); // session-only

  // Reset selection AND profile when band changes
  useEffect(() => { setActive(null); setLensChoices([]); }, [band]);

  const recordChoice = (lens) => setLensChoices(prev => [...prev, lens]);
  const resetProfile = () => setLensChoices([]);
  const suggestTopic = (topicId) => {
    filterApi.setSelectedTopics([topicId]);
    setActive(null);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const availableTopicIds = getTopicIdsForGrade(band);
  const preExperimentContent = typeof preExperiments === "function"
    ? preExperiments({ experiments: all, filterApi })
    : preExperiments;

  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
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
              <ExperimentGrid
                experiments={filterApi.filtered}
                onSelect={(e) => { setActive(e); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                emptyMessage={emptyMessage}
              />
            </>
          )}

          {active && (
            <div style={{ marginTop: 20 }}>
              <button
                onClick={() => setActive(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 16,
                  background: "none", border: "none", color: C.textMuted, cursor: "pointer",
                  fontSize: "0.84rem", padding: 0, transition: "color 0.2s",
                }}
                onMouseOver={e => e.currentTarget.style.color = C.gold}
                onMouseOut={e => e.currentTarget.style.color = C.textMuted}
              >
                ← Back to all {label} experiments
              </button>
              <ScenarioCard
                experiment={active}
                mode={mode}
                onClose={() => setActive(null)}
                onRecordChoice={recordChoice}
              />
            </div>
          )}

          <ReasoningProfile
            choices={lensChoices}
            onSuggestTopic={suggestTopic}
            onReset={resetProfile}
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
