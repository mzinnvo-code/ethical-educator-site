import { useEffect, useState } from "react";
import { C } from "../../theme.js";
import { FadeIn, PageContainer, Narrow, SectionTitle, Subtitle, ContinueExploring } from "../../components/shared.jsx";
import { getFeatureIllustration } from "../../data/illustrations.js";
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

export function ExplainingRedK_2({ navigate }) {
  const [, setRefresh] = useState(0);

  useEffect(() => () => audioBus.stop(), []);

  useEffect(() => {
    const sync = () => setRefresh((n) => n + 1);
    window.addEventListener("popstate", sync);
    window.addEventListener("ethed:route", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("ethed:route", sync);
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
