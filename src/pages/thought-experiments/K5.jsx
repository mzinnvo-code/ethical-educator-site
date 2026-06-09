import { useState } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider, BodyText, ContinueExploring,
} from "../../components/shared.jsx";
import IntroComicStrip from "../../components/IntroComicStrip.jsx";
import ThoughtProgressPanel from "../../components/ThoughtProgressPanel.jsx";
import AdventureMap from "../../components/wonder/AdventureMap.jsx";
import { readAndClearCelebration } from "../../components/wonder/useCelebration.js";
import { ELEMENTARY_GRADES } from "./ElementaryGrade.jsx";
import { getExperimentsByElementaryGrade } from "../../data/experiments.js";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { getIntroComic } from "../../data/introComics.js";
import FeaturedRedBanner from "./FeaturedRedBanner.jsx";

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });

const mapZones = ELEMENTARY_GRADES.map((grade) => ({
  grade,
  experiments: getExperimentsByElementaryGrade(grade.id).filter((experiment) => !experiment.customLayout),
}));

const trackerExperimentIds = [
  ...new Set(mapZones.flatMap((zone) => zone.experiments.map((experiment) => experiment.id))),
];

// Shelf order for the Wonder Workshop mementos: K -> 5, story by story.
const mementoItems = mapZones.flatMap((zone) => zone.experiments.map((experiment) => ({
  id: experiment.id,
  title: experiment.title,
  emoji: experiment.emoji,
  gradeLabel: zone.grade.label,
  accent: zone.grade.accent,
})));

export default function K5({ navigate }) {
  // One-time "+1 wonder light" moment: a story page leaves a short-lived
  // note when a story is first finished; consume it here so the meter and
  // the matching map node light up exactly once on return.
  const [celebration] = useState(() => readAndClearCelebration());
  const celebrateExperimentId = celebration?.experimentId || null;
  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <p style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: C.coral, marginBottom: 10,
          }}>
            Thought Experiments · Elementary Hub
          </p>
          <SectionTitle>K–5 Thought Experiments</SectionTitle>
          <Subtitle>
            Twenty-four grade-specific stories that turn ethics, AI, friendship, fairness, and knowledge into moments students can picture, discuss, and revisit.
          </Subtitle>
        </FadeIn>

        <IntroComicStrip comic={getIntroComic("thought-experiments/k-5")} />

        <div
          className="thought-progress-wide-wrap"
          style={{ maxWidth: 1080, margin: "18px auto 28px" }}
        >
          <ThoughtProgressPanel
            variant="intro"
            trackerTheme="k5"
            badgeSetId="k5"
            title="Ari's Wonder Workshop"
            accent={C.coral}
            experimentIds={trackerExperimentIds}
            achievementIds={[]}
            mementoItems={mementoItems}
            celebrateExperimentId={celebrateExperimentId}
          />
        </div>

        <Narrow>
          <FadeIn>
            <FeaturedRedBanner navigate={navigate} />
          </FadeIn>
        </Narrow>

        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Divider label="Pick your next story" />
          <FadeIn>
            <BodyText>
              Follow the trail! Every story you finish turns its tile gold and lights another wonder light. Start anywhere — younger grades begin with feelings and sharing, older grades wrestle with evidence, fairness, and tricky tools.
            </BodyText>
          </FadeIn>
          <div style={{ marginTop: 18, marginBottom: 10 }}>
            <AdventureMap zones={mapZones} variant="full" navigate={navigate} celebrateExperimentId={celebrateExperimentId} />
          </div>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", lineHeight: 1.6, margin: "10px 0 28px" }}>
            Prefer a list? Jump straight to{" "}
            {ELEMENTARY_GRADES.map((grade, index) => (
              <span key={grade.id}>
                <a
                  href={`/${grade.route}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(grade.route);
                  }}
                  style={{ color: grade.accent, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  {grade.label}
                </a>
                {index < ELEMENTARY_GRADES.length - 1 ? " · " : "."}
              </span>
            ))}
          </p>
        </div>

        <Narrow>
          <FadeIn>
            <ContinueExploring
              navigate={navigate}
              links={[
                withImage({ id: "thought-experiments", title: "Thought Experiments Hub", desc: "Return to the full library", color: C.teal }),
                withImage({ id: "thought-experiments/6-8", title: "Grades 6-8", desc: "Move into middle school dilemmas", color: C.gold }),
                withImage({ id: "thought-experiments/9-12", title: "Grades 9-12", desc: "Explore canonical and advanced cases", color: C.ocean }),
                withImage({ id: "thought-experiments/toolkit", title: "Dialogue Toolkit", desc: "Protocols and discussion moves", color: C.teal }),
              ]}
            />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
