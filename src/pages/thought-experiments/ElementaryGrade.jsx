import { useEffect, useRef, useState } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider, ContinueExploring,
} from "../../components/shared.jsx";
import ExperimentGrid from "../../components/ExperimentGrid.jsx";
import ScenarioCard from "../../components/ScenarioCard.jsx";
import ReasoningProfile from "../../components/ReasoningProfile.jsx";
import { getExperimentsByElementaryGrade } from "../../data/experiments.js";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { audioBus } from "../../lib/audioBus.js";
import { getElementaryExperimentRoute } from "./elementaryRouting.js";

export const ELEMENTARY_GRADES = [
  {
    id: "k",
    route: "thought-experiments/kindergarten",
    label: "Kindergarten",
    short: "K",
    title: "Tiny Choices, Big Feelings",
    blurb: "Four gentle read-aloud stories about toys, robots, sharing, and caring. Each one asks one clear question students can answer with words, drawings, or a turn-and-talk.",
    accent: C.coral,
  },
  {
    id: "1",
    route: "thought-experiments/grade-1",
    label: "Grade 1",
    short: "1",
    title: "What Kind of Person Am I Becoming?",
    blurb: "Simple classroom dilemmas about truth, loyalty, fairness, and what we do when no one is watching.",
    accent: C.gold,
  },
  {
    id: "2",
    route: "thought-experiments/grade-2",
    label: "Grade 2",
    short: "2",
    title: "Helpful Tools, Honest Choices",
    blurb: "Cause-and-effect stories where students weigh help, friendship, identity, rules, and the first tricky edges of AI.",
    accent: C.teal,
  },
  {
    id: "3",
    route: "thought-experiments/grade-3",
    label: "Grade 3",
    short: "3",
    title: "Who Owns the Choice?",
    blurb: "Longer what-if stories about authorship, privacy, trust, and fairness, written for students ready to notice consequences.",
    accent: C.ocean,
  },
  {
    id: "4",
    route: "thought-experiments/grade-4",
    label: "Grade 4",
    short: "4",
    title: "Rules, Evidence, and Hard Tradeoffs",
    blurb: "Story-driven dilemmas about checking sources, writing wiser rules, designing safer tools, and explaining what counts as real learning.",
    accent: C.sky,
  },
  {
    id: "5",
    route: "thought-experiments/grade-5",
    label: "Grade 5",
    short: "5",
    title: "Trust, Fairness, and Human Judgment",
    blurb: "More mature elementary scenarios about AI friendship, homework help, bias, and grading mistakes, built for careful discussion without easy answers.",
    accent: C.teal,
  },
];

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

function experimentIdFromHash() {
  if (typeof window === "undefined") return null;
  const query = window.location.search.slice(1) || "";
  return new URLSearchParams(query).get("experiment");
}

function gradeLinks(currentId) {
  return [
    withImage({ id: "thought-experiments/k-5", title: "K-5 Hub", desc: "Choose another elementary grade", color: C.coral }),
    ...ELEMENTARY_GRADES
      .filter(grade => grade.id !== currentId)
      .map(grade => withImage({
        id: grade.route,
        title: grade.label,
        desc: grade.title,
        color: grade.accent,
      })),
  ];
}

export function ElementaryGradePage({ navigate, gradeId }) {
  const grade = ELEMENTARY_GRADES.find(item => item.id === gradeId) || ELEMENTARY_GRADES[0];
  const experiments = getExperimentsByElementaryGrade(grade.id);
  const [active, setActive] = useState(null);
  const [lensChoices, setLensChoices] = useState([]);
  const activeWrapperRef = useRef(null);

  useEffect(() => {
    const syncExperimentFromHash = () => {
      audioBus.stop();
      const id = experimentIdFromHash();
      const target = id ? getExperimentsByElementaryGrade(grade.id).find(experiment => experiment.id === id) : null;
      const route = getElementaryExperimentRoute(target);
      if (route) {
        setActive(null);
        setLensChoices([]);
        navigate?.(route);
        return;
      }
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
  }, [grade.id]);

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
  const openExperiment = (experiment) => {
    audioBus.stop();
    const route = getElementaryExperimentRoute(experiment);
    if (route) {
      setActive(null);
      setLensChoices([]);
      navigate?.(route);
      return;
    }
    setActive(experiment);
  };

  const pickRelated = (current, pool) => {
    if (!current || !pool?.length) return null;
    const currentTopics = new Set(current.topics || []);
    return pool.find(e => e.id !== current.id && (e.topics || []).some(t => currentTopics.has(t))) || null;
  };

  const recordChoice = (lens) => setLensChoices(prev => [...prev, lens]);
  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <p style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: grade.accent, marginBottom: 10,
          }}>
            Thought Experiments · K-5 · {grade.label}
          </p>
          <SectionTitle>{grade.title}</SectionTitle>
          <Subtitle>{grade.blurb}</Subtitle>
        </FadeIn>

        <Narrow>
          {!active && (
            <>
              <Divider label={`${grade.label} stories`} />
              <ExperimentGrid
                experiments={experiments}
                onSelect={openExperiment}
                emptyMessage={`No ${grade.label} experiments are ready yet.`}
                visualVariant="k-5"
              />
            </>
          )}

          {active && (
            <div ref={activeWrapperRef} style={{ marginTop: 20, scrollMarginTop: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                <button
                  onClick={closeActive}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "none", color: C.textMuted, cursor: "pointer",
                    fontSize: "0.84rem", padding: 0, transition: "color 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.color = grade.accent}
                  onMouseOut={e => e.currentTarget.style.color = C.textMuted}
                >
                  ← Back to {grade.label} stories
                </button>
                <button
                  onClick={() => { audioBus.stop(); navigate?.("thought-experiments/k-5"); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "none", color: C.textMuted, cursor: "pointer",
                    fontSize: "0.84rem", padding: 0, transition: "color 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.color = grade.accent}
                  onMouseOut={e => e.currentTarget.style.color = C.textMuted}
                >
                  ⌂ K–5 hub
                </button>
              </div>
              <ScenarioCard
                key={active.id}
                experiment={active}
                mode="kid"
                visualVariant="k-5"
                onClose={closeActive}
                onRecordChoice={recordChoice}
                relatedExperiment={pickRelated(active, experiments)}
                onPickRelated={openExperiment}
              />
            </div>
          )}

          <ReasoningProfile
            choices={lensChoices}
            onReset={() => setLensChoices([])}
          />

          {!active && (
            <FadeIn>
              <ContinueExploring navigate={navigate} links={gradeLinks(grade.id)} />
            </FadeIn>
          )}
        </Narrow>
      </PageContainer>
    </div>
  );
}

export const Kindergarten = (props) => <ElementaryGradePage {...props} gradeId="k" />;
export const Grade1 = (props) => <ElementaryGradePage {...props} gradeId="1" />;
export const Grade2 = (props) => <ElementaryGradePage {...props} gradeId="2" />;
export const Grade3 = (props) => <ElementaryGradePage {...props} gradeId="3" />;
export const Grade4 = (props) => <ElementaryGradePage {...props} gradeId="4" />;
export const Grade5 = (props) => <ElementaryGradePage {...props} gradeId="5" />;
