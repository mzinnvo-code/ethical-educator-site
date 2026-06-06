import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider, BodyText, TopicCard, ContinueExploring,
} from "../../components/shared.jsx";
import IntroComicStrip from "../../components/IntroComicStrip.jsx";
import ThoughtProgressPanel from "../../components/ThoughtProgressPanel.jsx";
import { ELEMENTARY_GRADES } from "./ElementaryGrade.jsx";
import { getExperimentsByElementaryGrade } from "../../data/experiments.js";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { getIntroComic } from "../../data/introComics.js";
import { getSceneIllustration } from "../../data/sceneIllustrations.js";
import FeaturedRedBanner from "./FeaturedRedBanner.jsx";

const withImage = (link) => ({ ...link, image: getFeatureIllustration(link.id) });
const needsPunctuation = (text) => !/[.!?]$/.test(text);
const gradeDescription = (grade) => `${grade.title}${needsPunctuation(grade.title) ? "." : ""} ${grade.blurb}`;

function getGradeImage(gradeId) {
  const [firstExperiment] = getExperimentsByElementaryGrade(gradeId);
  return getSceneIllustration(firstExperiment) || getFeatureIllustration("thought-experiments/k-5");
}

const trackerExperimentIds = [
  ...new Set(
    ELEMENTARY_GRADES.flatMap((grade) => getExperimentsByElementaryGrade(grade.id))
      .filter((experiment) => !experiment.customLayout)
      .map((experiment) => experiment.id),
  ),
];

export default function K5({ navigate }) {
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
          />
        </div>

        <Narrow>
          <FadeIn>
            <FeaturedRedBanner navigate={navigate} />
          </FadeIn>

          <Divider label="Choose a grade" />
          <FadeIn>
            <BodyText>
              Younger students begin with concrete feelings and classroom choices. Older elementary students move into richer stories with tradeoffs, evidence, privacy, bias, and human judgment. Each grade has four polished scenarios, read-aloud support, and a teacher kit behind the classroom-facing story.
            </BodyText>
          </FadeIn>

          <div className="grid-2" style={{ marginTop: 20, marginBottom: 28 }}>
            {ELEMENTARY_GRADES.map((grade, index) => (
              <TopicCard
                key={grade.id}
                icon={grade.short}
                iconLabel={grade.label}
                image={getGradeImage(grade.id)}
                title={grade.label}
                desc={gradeDescription(grade)}
                onClick={() => navigate(grade.route)}
                accent={grade.accent}
                delay={index * 0.04}
              />
            ))}
          </div>

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
