import { C } from "../theme.js";
import {
  PageContainer,
  Narrow,
  SectionLabel,
  SectionTitle,
  Subtitle,
  FadeIn,
} from "../components/shared.jsx";
import { track } from "../lib/analytics.js";

/**
 * /tools — Interactive Tools hub
 *
 * Single index for the four decision tools. The tools themselves are
 * standalone pages (Picker, AI Use Rubric, AI Policy Builder, Family
 * Conversations); this page exists so they're discoverable from the
 * topbar and not only via Cmd+K, What's New, or direct URL.
 *
 * Each card names the audience explicitly so a teacher landing here
 * doesn't accidentally start the parent-facing tool.
 */
const TOOLS = [
  {
    id: "picker",
    path: "picker",
    accent: C.coral,
    eyebrow: "For teachers",
    title: "Thought Experiment Picker",
    description: "Three quick questions about grade, time, and topic — three classroom-ready thought experiments that fit. Designed for the Sunday-night planning block.",
    inputs: "Grade band · Depth · Topic",
    output: "3 ranked experiments + direct links to the scene",
    time: "~90 seconds",
  },
  {
    id: "ai-rubric",
    path: "ai-rubric",
    accent: C.teal,
    eyebrow: "For teachers & school leaders",
    title: "AI Use Rubric",
    description: "Score a proposed AI use across six dimensions — cognitive substitution, bias, privacy, authorship, equity, oversight — and get a go / discuss / redesign recommendation with the rationale.",
    inputs: "One AI use case + six 0–2 scores",
    output: "Verdict + rationale you can take into a leadership conversation",
    time: "~5 minutes",
  },
  {
    id: "ai-policy",
    path: "ai-policy",
    accent: C.ocean,
    eyebrow: "For school leaders",
    title: "AI Policy Builder",
    description: "Nine questions about your school's stance on AI yield a 1–2 page draft policy. A structured starting point for a board-ready document — not a finished policy.",
    inputs: "School name + 8 stance questions",
    output: "Markdown draft (copy or download .md)",
    time: "~10 minutes",
  },
  {
    id: "family-conversations",
    path: "family-conversations",
    accent: C.coral,
    eyebrow: "For parents & caregivers",
    title: "Family Conversation Generator",
    description: "Pick your child's age and a topic about AI — homework, deepfakes, AI friends, privacy, creativity, the future of work. Get five short prompts that work at dinner or in the car.",
    inputs: "Age band + topic",
    output: "5 conversation prompts (copy-friendly)",
    time: "~30 seconds",
  },
];

export default function Tools({ navigate }) {
  function openTool(tool) {
    track("tools_hub_card_clicked", {
      page: "tools",
      placement: tool.id,
      slug: tool.id,
    });
    navigate?.(tool.path);
  }

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>Interactive Tools</SectionLabel>
            <SectionTitle>Four tools that do something specific, well.</SectionTitle>
            <Subtitle>
              Most of this site is for reading and discussing. These four pages are for doing — short, focused interactives that hand you a usable artifact in under ten minutes. Three are for educators; one is for parents. All are free, no login, no data collected beyond cookieless event counts.
            </Subtitle>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 18,
              marginTop: 32,
            }}>
              {TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onOpen={() => openTool(tool)} />
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <HowWeUse navigate={navigate} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}

function ToolCard({ tool, onOpen }) {
  return (
    <article style={{
      padding: "26px 26px 22px",
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      borderLeft: `4px solid ${tool.accent}`,
      transition: "all 0.2s",
    }}>
      <p style={{
        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: tool.accent, marginBottom: 6,
      }}>{tool.eyebrow}</p>
      <h2 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary, fontSize: "1.42rem", fontWeight: 700,
        lineHeight: 1.2, marginBottom: 10,
      }}>{tool.title}</h2>
      <p style={{
        color: C.textSecondary, fontSize: "0.96rem", lineHeight: 1.65,
        marginBottom: 14,
      }}>{tool.description}</p>

      <dl style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        rowGap: 6, columnGap: 16,
        margin: "0 0 18px",
        fontSize: "0.82rem",
        lineHeight: 1.55,
      }}>
        <dt style={{ color: C.textMuted, fontWeight: 600 }}>Inputs</dt>
        <dd style={{ color: C.textSecondary, margin: 0 }}>{tool.inputs}</dd>
        <dt style={{ color: C.textMuted, fontWeight: 600 }}>Output</dt>
        <dd style={{ color: C.textSecondary, margin: 0 }}>{tool.output}</dd>
        <dt style={{ color: C.textMuted, fontWeight: 600 }}>Time</dt>
        <dd style={{ color: C.textSecondary, margin: 0 }}>{tool.time}</dd>
      </dl>

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${tool.title}`}
        style={{
          padding: "10px 20px",
          background: `linear-gradient(135deg, ${tool.accent}, ${C.gold})`,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "0.88rem",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >Open {tool.title} →</button>
    </article>
  );
}

function HowWeUse({ navigate }) {
  return (
    <div style={{
      marginTop: 40,
      padding: "22px 24px",
      background: `${C.gold}08`,
      border: `1px solid ${C.gold}30`,
      borderRadius: 14,
    }}>
      <p style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: C.gold, marginBottom: 10,
      }}>How these fit together</p>
      <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 8 }}>
        Use the <strong style={{ color: C.coral }}>Picker</strong> when you have 20 minutes of class time and want a discussion-ready scenario. Use the <strong style={{ color: C.teal }}>Rubric</strong> when you're evaluating one specific AI use — a tool a vendor pitched, a workflow a teacher proposed, a use case a student asked about. Use the <strong style={{ color: C.ocean }}>Policy Builder</strong> when your school needs an overall position, not a one-off decision. Use <strong style={{ color: C.coral }}>Family Conversations</strong> when you want your kid to talk first.
      </p>
      <p style={{ color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.65, fontStyle: "italic", marginBottom: 0 }}>
        These four don't replace each other — they answer different questions. The Rubric ("should we?") feeds the Policy Builder ("what's our overall stance?"). The Picker ("what should I teach tomorrow?") sits upstream of the family conversation ("what does my kid think about what they learned?"). Most of this site supports them — they don't replace the reading; they're what comes next.
      </p>
      <div style={{ marginTop: 14 }}>
        <button
          type="button"
          onClick={() => navigate?.("newsletter")}
          style={{
            padding: "9px 16px",
            background: "transparent",
            color: C.gold,
            border: `1px solid ${C.gold}88`,
            borderRadius: 8,
            fontSize: "0.84rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >Get one of these in your inbox each week →</button>
      </div>
    </div>
  );
}
