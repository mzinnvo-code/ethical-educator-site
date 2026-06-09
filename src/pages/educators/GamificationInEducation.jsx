import { C } from "../../theme.js";
import {
  FadeIn, Expandable, EducatorHero,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring,
} from "../../components/shared.jsx";
import EducatorResourceNav from "../../components/EducatorResourceNav.jsx";
import GamificationAriVisual from "../../components/GamificationAriVisual.jsx";
import ThoughtProgressPanel from "../../components/ThoughtProgressPanel.jsx";
import { EDUCATOR_RESOURCES, educatorLink } from "../../data/educatorResources.js";
import { getExperimentsByGrade } from "../../data/experiments.js";

const STUDENT_EXPERIMENT_IDS = [
  ...getExperimentsByGrade("k-5"),
  ...getExperimentsByGrade("6-8"),
  ...getExperimentsByGrade("9-12"),
].map((experiment) => experiment.id);

function SourceLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: C.gold, textDecoration: "underline", textUnderlineOffset: 3 }}
    >
      {children}
    </a>
  );
}

function ResearchNote({ label, title, children, color = C.gold }) {
  return (
    <div style={{
      padding: "13px 15px",
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: 8,
      margin: "10px 0",
    }}>
      <p style={{
        color,
        fontSize: "0.64rem",
        fontWeight: 800,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 5,
      }}>
        {label}
      </p>
      <p style={{
        color: C.textPrimary,
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: 1.35,
        marginBottom: 5,
      }}>
        {title}
      </p>
      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>
        {children}
      </p>
    </div>
  );
}

export default function GamificationInEducation({ navigate }) {
  const resource = EDUCATOR_RESOURCES["gamification-in-education"];

  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <EducatorHero
          label={resource.sectionLabel}
          title={resource.title}
          subtitle={resource.desc}
          image={resource.image}
          imageAlt={resource.imageAlt}
          accent={resource.accent}
          visual={<GamificationAriVisual accent={resource.accent} />}
        />
        <EducatorResourceNav currentId={resource.id} navigate={navigate} />

        <Narrow>
          <div style={{ marginTop: 40 }}>
            <Divider label="The claim" />

            <FadeIn delay={0.04}>
              <Expandable title="Are Attention Spans Really Lower Than Ever?" defaultOpen tag="Evidence">
                <BodyText>
                  The honest answer is: not as a simple biological claim. It is tempting to say students have
                  "lower than ever" attention spans, because many teachers are seeing real classroom strain.
                  But the stronger research position is more careful: sustained attention has not been proven
                  to have collapsed across a generation. What has changed is the environment students are
                  learning inside.
                </BodyText>
                <ResearchNote label="Caution" title="Do not build on the goldfish myth" color={C.coral}>
                  Daniel Willingham's 2026 review for the American Federation of Teachers argues that the
                  evidence that digital devices have broadly impaired students' ability to sustain attention is
                  weak. His more useful explanation is motivational: students may still be able to focus, but
                  near-term digital rewards make slow academic rewards feel less compelling.{" "}
                  <SourceLink href="https://www.aft.org/ae/spring2026/willingham">Read Willingham's review.</SourceLink>
                </ResearchNote>
                <ResearchNote label="Public perception" title="People feel the pressure, even when the data is complicated" color={C.ocean}>
                  King's College London's Policy Institute found that many adults believe their attention is
                  shorter than it used to be, while also emphasizing a more nuanced picture than simple
                  technology panic.{" "}
                  <SourceLink href="https://www.kcl.ac.uk/news/are-attention-spans-really-collapsing-data-shows-uk-public-are-worried-but-also-see-benefits-from-technology?+Data+shows+UK+public+are+worried+%E2%80%93+but+also+see+benefits+from+technology=">Read the King's College summary.</SourceLink>
                </ResearchNote>
                <ResearchNote label="Classroom myth" title="The 10-minute lecture rule is shakier than people think" color={C.teal}>
                  Wilson and Korn's review found little support for the familiar claim that student attention
                  reliably drops after 10 to 15 minutes. That does not make long passive lectures a good idea.
                  It means teachers should design from evidence, not folklore.{" "}
                  <SourceLink href="https://www.researchgate.net/publication/234649194_Attention_During_Lectures_Beyond_Ten_Minutes">Read the 2007 review.</SourceLink>
                </ResearchNote>
              </Expandable>
            </FadeIn>

            <Divider label="What engagement needs" />

            <FadeIn delay={0.06}>
              <Expandable title="Engagement Is Not Entertainment" color={C.teal} defaultOpen tag="Framework">
                <BodyText>
                  A good game does not merely entertain. It gives the player a clear goal, quick feedback,
                  visible progress, meaningful choice, appropriate challenge, and a reason to try again after
                  failure. Those same design ingredients map well onto learning when they serve the task
                  instead of replacing it.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Autonomy" color={C.teal} items={[
                    "Students choose a path or strategy",
                    "The activity preserves real agency",
                    "Rewards do not feel controlling",
                  ]} />
                  <ComparisonCard title="Competence" color={C.gold} items={[
                    "Progress is visible",
                    "Feedback tells students what improved",
                    "Challenge stays hard enough to matter",
                  ]} />
                  <ComparisonCard title="Relatedness" color={C.coral} items={[
                    "Students compare ideas, not status",
                    "Class discussion gives the badge meaning",
                    "Reflection connects the activity to identity",
                  ]} />
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Self-Determination Theory names these as autonomy, competence, and relatedness. For classroom
                  gamification, this matters because a badge can either support growth or quietly take over the
                  reason for doing the work.{" "}
                  <SourceLink href="https://selfdeterminationtheory.org/topics/application-education/">Read the SDT education overview.</SourceLink>
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="What research supports" />

            <FadeIn delay={0.06}>
              <Expandable title="Gamification Works Best When It Rewards the Learning Move" color={C.gold} tag="Research">
                <BodyText>
                  Meta-analyses generally find positive effects for gamification in education, but the effects
                  are not magic. They depend on design quality, duration, student age, subject, and what the
                  game elements actually reward.
                </BodyText>
                <ResearchNote label="Learning outcomes" title="A large positive average effect, with design caveats" color={C.gold}>
                  A 2023 meta-analysis in Frontiers in Psychology found a significant positive effect for
                  gamification on educational learning outcomes. The result supports careful use, not a blank
                  check for points and leaderboards.{" "}
                  <SourceLink href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1253549/full">Read the meta-analysis.</SourceLink>
                </ResearchNote>
                <ResearchNote label="Behavior change" title="Short-term systems can initiate better learning behaviors" color={C.teal}>
                  Kim and Castelli's meta-analysis found that gamified reward systems can support behavioral
                  change and learning outcomes, especially when used to initiate productive behaviors rather
                  than permanently replace intrinsic motivation.{" "}
                  <SourceLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8037535/">Read the meta-analysis.</SourceLink>
                </ResearchNote>
                <ResearchNote label="Motivation" title="Badges are safest when they act as feedback" color={C.coral}>
                  A 2024 meta-analysis and review found positive effects on intrinsic motivation, autonomy,
                  and relatedness, while also warning that competence and autonomy are common weak points in
                  gamified classes.{" "}
                  <SourceLink href="https://link.springer.com/article/10.1007/s11423-023-10337-7">Read the motivation review.</SourceLink>
                </ResearchNote>
              </Expandable>
            </FadeIn>

            <Divider label="Design principles" />

            <FadeIn delay={0.06}>
              <Expandable title="Six Rules for Gameful Learning That Does Not Become Shallow" color={C.ocean} defaultOpen tag="Practice">
                <ol style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li><strong>Reward the cognitive move, not mere completion.</strong> A student earns recognition for revising, checking evidence, steelmanning, or trying a new lens.</li>
                  <li><strong>Make progress visible but private by default.</strong> Growth should motivate without turning students into a public ranking.</li>
                  <li><strong>Use badges as language.</strong> A badge should name the kind of thinking a teacher wants students to notice.</li>
                  <li><strong>Build in replays.</strong> Games make failure safe because trying again is part of the loop. Thought experiments should do the same.</li>
                  <li><strong>Protect autonomy.</strong> Students should feel invited into a challenge, not managed by a behavior chart.</li>
                  <li><strong>Connect the reward to discussion.</strong> The real payoff is when students can say why the badge describes their reasoning.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="The Examined Classroom model" />

            <FadeIn delay={0.06}>
              <Expandable title="Gameful Thought Experiments" color={C.coral} defaultOpen tag="Application">
                <BodyText>
                  The Thought Experiments section is a natural fit for gameful learning because it already has
                  what many worksheets lack: branching choices, dilemmas that matter, immediate reflection,
                  and a reason to replay the same scenario from another perspective.
                </BodyText>
                <ThoughtProgressPanel variant="full" accent={C.coral} experimentIds={STUDENT_EXPERIMENT_IDS} />
                <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7, marginTop: 14 }}>
                  In this model, progress is not a score. It is a map of intellectual habits: finishing a
                  dilemma, trying multiple ethical lenses, saving a reflection, writing a steelman, and
                  correcting yourself when the story makes your first answer harder to keep.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                educatorLink("enhancing-engagement", { desc: "Foundational engagement frameworks" }),
                educatorLink("async-engagement", { desc: "Engagement strategies for online and async contexts" }),
                { id: "thought-experiments/6-8", title: "Try the Deepfake Dilemma", desc: "A gameful middle-school pilot about verification, misinformation, and civic integrity", color: C.coral },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
