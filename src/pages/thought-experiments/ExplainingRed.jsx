import { useEffect, useState } from "react";
import { C } from "../../theme.js";
import { FadeIn, PageContainer, Narrow, SectionTitle, Subtitle, ContinueExploring } from "../../components/shared.jsx";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { EXPERIMENTS } from "../../data/experiments.js";
import TeacherKit from "../../components/TeacherKit.jsx";
import ExplainingRedK2 from "../../experiments/RedK2.jsx";
import { audioBus } from "../../lib/audioBus.js";

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

// Wrapper page for the K-2 classroom-scene version of Explaining Red. The 6-8
// and 9-12 versions now live as regular data scenarios in experiments.js
// (`explaining-red-middle` and the augmented `marys-room` entry), so the only
// surviving wrapper is the K-2 one — its classroom-scene format is too
// different from the standard scenario card to merge into the data registry.

const K2_META = {
  label: "K–2",
  accent: C.coral,
  title: "Explaining Red — K–2",
  blurb: "A new student named Ada joins the class while everyone is learning about colors. Help your classmates share what red is — even with someone who has never seen it.",
  related: [
    { id: "thought-experiments/grade-1", title: "Back to Grade 1", desc: "Other elementary stories", color: C.gold },
    { id: "thought-experiments/k-5", title: "K–5 Hub", desc: "Browse every elementary grade", color: C.coral },
    { id: "thought-experiments/6-8", title: "Grades 6–8", desc: "Explaining Red in the 6–8 catalog", color: C.gold },
  ],
};

const K2_EXPERIMENT = EXPERIMENTS.find((e) => e.id === "explaining-red-k-2");

export function ExplainingRedK_2({ navigate }) {
  const [showTeacherKit, setShowTeacherKit] = useState(false);
  const [, setRefresh] = useState(0);

  useEffect(() => () => audioBus.stop(), []);

  useEffect(() => {
    const sync = () => setRefresh((n) => n + 1);
    window.addEventListener("popstate", sync);
    window.addEventListener("examined-classroom:route", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("examined-classroom:route", sync);
    };
  }, []);

  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <p style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: K2_META.accent, marginBottom: 10,
          }}>
            Thought Experiments · {K2_META.label} · Featured
          </p>
          <SectionTitle>{K2_META.title}</SectionTitle>
          <Subtitle>{K2_META.blurb}</Subtitle>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 28 }}>
            <ExplainingRedK2 />
          </div>

          {K2_EXPERIMENT?.teacherKit && (
            <FadeIn>
              <div style={{ marginTop: 28, textAlign: "center" }}>
                <button
                  className="no-print"
                  onClick={() => setShowTeacherKit((s) => !s)}
                  style={{
                    padding: "10px 22px",
                    background: showTeacherKit ? C.gold : "transparent",
                    color: showTeacherKit ? "#fff" : C.gold,
                    border: `1px solid ${C.gold}`,
                    borderRadius: 999,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {showTeacherKit ? "Hide" : "Show"} For Teachers · Lesson Plan
                </button>
              </div>
              {showTeacherKit && (
                <div style={{ marginTop: 20 }}>
                  <TeacherKit
                    kit={K2_EXPERIMENT.teacherKit}
                    experiment={K2_EXPERIMENT}
                    accent={C.coral}
                  />
                </div>
              )}
            </FadeIn>
          )}

          <FadeIn>
            <div style={{ marginTop: 36 }}>
              <ContinueExploring
                navigate={navigate}
                links={K2_META.related.map(withImage)}
              />
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
