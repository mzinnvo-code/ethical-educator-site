import { C } from "../theme.js";
import {
  FadeIn,
  Expandable,
  VideoEmbed,
  Narrow,
  PageContainer,
  BodyText,
  ResearchCallout,
  QuoteBlock,
  ComparisonCard,
  Divider,
  ContinueExploring,
  RefItem,
  ImagePageHeader,
} from "../components/shared.jsx";
import { getSceneIllustration } from "../data/sceneIllustrations.js";
import { AI_ETHICS_ARTICLE_BY_ROUTE } from "../data/aiEthicsVisuals.js";

const articleVisual = AI_ETHICS_ARTICLE_BY_ROUTE["ai-consciousness"];

const links = {
  sethTed: "https://www.ted.com/talks/anil_seth_why_ai_is_unlikely_to_become_conscious",
  sethSussex: "https://www.sussex.ac.uk/research/centres/sussex-centre-for-consciousness-science/news-and-events/news?id=70671",
  sethBbs: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/conscious-artificial-intelligence-and-biological-naturalism/C9912A5BE9D806012E3C8B3AF612E39A",
  sethOConnor: "https://youtu.be/lsi8T_WtLnE?si=k26DlL7vooo7sR93",
  harrisVideo: "https://youtu.be/nP2swgDVl5M?si=m7LcLgbblfce7Qc3",
  chalmersVideo: "https://youtu.be/Pr-Hf7MNQV0?si=d5Mt0aGfAWiiOQ1X",
  functionalism: "https://plato.stanford.edu/archives/spr2024/entries/functionalism/",
  nagel: "https://philpapers.org/rec/NAGWII",
  austin: "https://academic.oup.com/book/5162",
  chalmers: "https://consc.net/papers/facing.html",
  jackson: "https://academic.oup.com/pq/article/32/127/127/1612468",
  dishbrain: "https://doi.org/10.1016/j.neuron.2022.09.001",
  corticalLabs: "https://www.corticallabs.com/",
  butlin: "https://arxiv.org/abs/2308.08708",
  birch2017: "https://eprints.lse.ac.uk/84099/",
  birchBook: "https://academic.oup.com/book/57949",
  mcclelland: "https://www.repository.cam.ac.uk/items/d66c38a5-95f9-4cc5-bce3-436bdf020575",
  safetyWelfare: "https://link.springer.com/article/10.1007/s11098-025-02302-2",
  nyDeclaration: "https://sites.google.com/nyu.edu/nydeclaration/declaration",
  cephalopodReview: "https://www.lse.ac.uk/business/consulting/reports/review-of-the-evidence-of-sentiences-in-cephalopod-molluscs-and-decapod-crustaceans",
};

function LinkOut({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Note({ children, color = C.gold }) {
  return (
    <div style={{
      borderLeft: `3px solid ${color}`,
      background: `${color}08`,
      padding: "14px 18px",
      borderRadius: "0 10px 10px 0",
      margin: "16px 0",
    }}>
      <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}

function SourceLink({ href, children }) {
  return (
    <p style={{ marginTop: 8, color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.55 }}>
      Source: <LinkOut href={href}>{children}</LinkOut>
    </p>
  );
}

function LessonPacketIcon() {
  return (
    <svg viewBox="0 0 74 74" aria-hidden="true" style={{ width: 48, height: 48, display: "block", flex: "0 0 48px" }}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18 H46 C51 18 55 22 55 27 V58 H25 C20 58 16 54 16 49 V20 C16 19 17 18 18 18Z" stroke={C.gold} strokeWidth="3" />
        <path d="M25 18 V58" stroke={C.gold} strokeWidth="3" />
        <path d="M31 29 C31 23 36 20 41 20 C47 20 51 24 51 29 C51 34 47 37 43 37 H39 C35 37 31 33 31 29Z" stroke={C.teal} strokeWidth="3" />
        <path d="M34 46 C37 43 45 43 48 46" stroke={C.teal} strokeWidth="3" />
        <path d="M37 27 H45 M41 23 V34" stroke={C.teal} strokeWidth="2.4" />
      </g>
    </svg>
  );
}

function LessonPlanCTA({ navigate }) {
  return (
    <section style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      flexWrap: "wrap",
      border: `1px solid ${C.gold}32`,
      borderRadius: 12,
      padding: "16px clamp(14px, 3vw, 20px)",
      margin: "22px 0 30px",
      background: `linear-gradient(135deg, ${C.gold}0d, ${C.ocean}0a)`,
    }}>
      <LessonPacketIcon />
      <div style={{ flex: "1 1 280px", minWidth: 0 }}>
        <h3 style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.16rem",
          lineHeight: 1.25,
          fontWeight: 700,
          marginBottom: 5,
        }}>Bring This Essay Into Your Classroom</h3>
        <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.6 }}>
          Two ready-to-teach lesson packets for grades 6-8 and 9-12, with leveled text, vocabulary, activities, standards, and assessments.
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate("ai-consciousness/lesson-plans")}
        style={{
          flex: "0 0 auto",
          padding: "10px 14px",
          border: `1px solid ${C.gold}48`,
          borderRadius: 8,
          background: `${C.gold}18`,
          color: C.gold,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "0.82rem",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
      >
        Open the Lesson Packets
      </button>
    </section>
  );
}

function StepList({ items }) {
  return (
    <div style={{ margin: "16px 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          padding: "12px 0",
          borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <span style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `${item.color}18`,
            border: `1px solid ${item.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            fontWeight: 700,
            fontSize: "0.8rem",
          }}>{i + 1}</span>
          <div>
            <h4 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: item.color,
              fontSize: "0.98rem",
              fontWeight: 600,
              marginBottom: 4,
            }}>{item.title}</h4>
            <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FigureShell({ label, title, caption, children }) {
  return (
    <figure style={{
      margin: "24px auto",
      background: `linear-gradient(135deg, ${C.surface}, ${C.midnight})`,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 12px 36px rgba(0,0,0,0.22)",
      maxWidth: "100%",
    }}>
      <div style={{ padding: "16px clamp(14px, 3vw, 20px) 0" }}>
        <p style={{
          color: C.gold,
          fontSize: "0.64rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}>{label}</p>
        <h4 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary,
          fontSize: "clamp(0.94rem, 2.4vw, 1.02rem)",
          fontWeight: 700,
          lineHeight: 1.35,
        }}>{title}</h4>
      </div>
      <div style={{ padding: "8px clamp(6px, 2vw, 12px) 0", maxWidth: "100%", overflow: "hidden" }}>{children}</div>
      {caption && (
        <figcaption style={{
          padding: "0 clamp(14px, 3vw, 20px) 16px",
          color: C.textMuted,
          fontSize: "0.78rem",
          lineHeight: 1.55,
        }}>{caption}</figcaption>
      )}
    </figure>
  );
}

function ScalesIcon({ color = C.teal }) {
  return (
    <svg viewBox="0 0 120 96" aria-hidden="true" style={{ width: "86px", height: "auto", display: "block" }}>
      <g fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 14 V72" />
        <path d="M36 82 H84" />
        <path d="M47 72 H73" />
        <circle cx="60" cy="12" r="7" />
        <path d="M28 24 H92" />
        <path d="M28 24 L14 56 H42 Z" />
        <path d="M92 24 L78 56 H106 Z" />
        <path d="M14 56 C20 66 36 66 42 56" />
        <path d="M78 56 C84 66 100 66 106 56" />
      </g>
    </svg>
  );
}

function BulbIcon({ color = C.teal }) {
  return (
    <svg viewBox="0 0 58 58" aria-hidden="true" style={{ width: 46, height: 46, flex: "0 0 46px" }}>
      <g fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 38 C15 34 12 29 12 23 C12 13 19 7 29 7 C39 7 46 13 46 23 C46 29 43 34 38 38" />
        <path d="M22 40 H36 M23 47 H35 M26 53 H32" />
        <path d="M29 1 V4 M9 8 L12 11 M49 8 L46 11 M2 28 H6 M52 28 H56" />
      </g>
    </svg>
  );
}

function FuzzyIcon({ type, x = 0, y = 0, color = C.gold, scale = 1 }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 3.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {type === "cell" && (
        <g {...common}>
          <circle cx="0" cy="0" r="23" />
          <circle cx="6" cy="-2" r="9" />
          <path d="M13 -18 C25 -8 24 12 10 22 M-15 -12 C-23 2 -17 18 -3 23" strokeDasharray="5 6" />
        </g>
      )}
      {type === "worm" && (
        <g {...common}>
          <path d="M-34 8 C-16 -18 4 -18 20 2 C32 16 48 14 58 -2" />
          <path d="M-22 3 C-12 11 0 12 12 4 M22 6 C32 12 44 10 52 2" strokeWidth="2" opacity="0.7" />
        </g>
      )}
      {type === "insect" && (
        <g {...common}>
          <ellipse cx="0" cy="0" rx="13" ry="18" />
          <circle cx="0" cy="-22" r="9" />
          <path d="M-12 -6 L-34 -18 M-13 2 L-38 2 M-10 10 L-30 23 M12 -6 L34 -18 M13 2 L38 2 M10 10 L30 23 M-6 -31 L-20 -45 M6 -31 L20 -45" />
        </g>
      )}
      {type === "fish" && (
        <g {...common}>
          <path d="M-40 0 C-12 -28 38 -24 62 0 C38 24 -12 28 -40 0Z" />
          <path d="M62 0 L90 -20 L90 20 Z" />
          <circle cx="20" cy="-7" r="3" fill={color} />
          <path d="M-8 -18 C2 -6 2 6 -8 18" />
        </g>
      )}
      {type === "bird" && (
        <g {...common}>
          <path d="M-10 -3 C-32 -6 -46 11 -38 32 C-19 26 -2 27 20 38 C23 17 12 2 -10 -3Z" />
          <circle cx="-9" cy="-9" r="10" />
          <path d="M-22 1 L-38 -18 M-4 39 V58 M16 39 L34 55 M-25 39 L-44 54" />
        </g>
      )}
      {type === "primate" && (
        <g {...common}>
          <circle cx="0" cy="0" r="29" />
          <circle cx="-12" cy="-5" r="3.5" fill={color} />
          <circle cx="12" cy="-5" r="3.5" fill={color} />
          <path d="M-15 10 C-5 22 8 22 18 10 M-29 1 C-48 4 -53 24 -38 35 M29 1 C48 4 53 24 38 35" />
        </g>
      )}
      {type === "human" && (
        <g {...common}>
          <path d="M7 -38 C-28 -28 -43 4 -24 34 H24 M7 -38 C42 -25 49 5 31 30" />
          <path d="M-12 -2 H14 M-7 17 H19 M-2 34 V54" />
        </g>
      )}
      {type === "gear" && (
        <g {...common}>
          <circle cx="0" cy="0" r="18" />
          <circle cx="0" cy="0" r="6" />
          <path d="M0 -34 V-24 M0 24 V34 M-34 0 H-24 M24 0 H34 M-24 -24 L-17 -17 M17 17 L24 24 M24 -24 L17 -17 M-17 17 L-24 24" />
        </g>
      )}
      {type === "flow" && (
        <g {...common}>
          <rect x="-10" y="-36" width="20" height="20" rx="2" />
          <rect x="-48" y="14" width="20" height="20" rx="2" />
          <rect x="-10" y="14" width="20" height="20" rx="2" />
          <rect x="28" y="14" width="20" height="20" rx="2" />
          <path d="M0 -16 V0 H-38 V14 M0 0 V14 M0 0 H38 V14" />
        </g>
      )}
      {type === "network" && (
        <g {...common}>
          <circle cx="0" cy="0" r="11" />
          {[
            [-37, -25], [0, -42], [37, -25], [42, 14], [16, 39], [-26, 34], [-42, -2],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <path d={`M0 0 L${cx} ${cy}`} opacity="0.65" />
              <circle cx={cx} cy={cy} r="5" fill={C.midnight} />
            </g>
          ))}
        </g>
      )}
      {type === "chipBrain" && (
        <g {...common}>
          <path d="M-10 -31 C-31 -29 -42 -13 -34 7 C-49 20 -36 45 -12 40 C-4 50 12 49 18 38 C40 42 50 18 34 5 C42 -16 24 -34 5 -25 C0 -31 -5 -33 -10 -31Z" />
          <path d="M-20 -8 H-4 V11 H16 M4 -23 V-8 M-14 22 H8 M23 -5 H37 M28 18 H40" />
          <circle cx="-20" cy="-8" r="3" fill={color} />
          <circle cx="16" cy="11" r="3" fill={color} />
          <circle cx="8" cy="22" r="3" fill={color} />
        </g>
      )}
      {type === "processor" && (
        <g {...common}>
          <rect x="-28" y="-32" width="56" height="64" rx="6" />
          <path d="M-12 -18 V18 M2 -18 V18 M16 -18 V18 M-42 -14 H-28 M-42 0 H-28 M-42 14 H-28 M28 -14 H42 M28 0 H42 M28 14 H42" />
          <path d="M-16 -4 C-2 -18 8 -18 18 -4 M-16 12 C-2 -2 8 -2 18 12" />
        </g>
      )}
      {type === "brain" && (
        <g {...common}>
          <path d="M-8 -33 C-28 -36 -43 -20 -36 -1 C-52 8 -46 34 -25 35 C-21 51 -1 52 6 37 V-28 C3 -31 -2 -32 -8 -33Z" />
          <path d="M8 -33 C28 -36 43 -20 36 -1 C52 8 46 34 25 35 C21 51 1 52 -6 37 V-28 C-3 -31 2 -32 8 -33Z" transform="translate(10 0)" />
          <path d="M-26 -12 C-12 -18 -2 -10 -7 4 M-28 18 C-14 10 -3 19 -8 33 M26 -12 C12 -18 2 -10 7 4 M28 18 C14 10 3 19 8 33" />
        </g>
      )}
    </g>
  );
}

function LegacyConsciousnessLineFigure() {
  const boundaryRows = [
    { n: 1, title: "Single cells", color: C.textMuted, text: "They maintain themselves, respond to the environment, and resist entropy, but we do not normally treat them as conscious subjects." },
    { n: 2, title: "Simple nervous systems", color: C.sky, text: "The case becomes harder. Behavior, sensation, and adaptation begin to look morally relevant." },
    { n: 3, title: "Animal minds", color: C.goldLight, text: "History should humble us. Humans have repeatedly underestimated non-human experience when recognition would have inconvenienced us." },
    { n: 4, title: "Synthetic or artificial systems", color: C.coral, text: "The temptation is to draw the line wherever our existing categories feel comfortable. That is not the same as having found the line." },
  ];
  const bioExamples = [
    { label: "single cell", type: "cell", x: 220, color: "#b9c4ce" },
    { label: "simple organisms", type: "worm", x: 380, color: C.sky },
    { label: "insects", type: "insect", x: 510, color: C.sky },
    { label: "fish", type: "fish", x: 640, color: C.sand },
    { label: "birds", type: "bird", x: 780, color: C.goldLight },
    { label: "primates", type: "primate", x: 910, color: C.goldLight },
    { label: "humans", type: "human", x: 1040, color: C.goldLight },
  ];
  const artificialExamples = [
    { label: "simple machine", type: "gear", x: 220, color: "#b9c4ce" },
    { label: "rule-based systems", type: "flow", x: 400, color: C.sky },
    { label: "machine learning", type: "network", x: 565, color: C.sky },
    { label: "advanced AI", type: "chipBrain", x: 750, color: C.goldLight },
    { label: "general AI", type: "processor", x: 910, color: C.coral },
    { label: "fully synthetic brain", type: "brain", x: 1040, color: C.coral },
  ];

  return (
    <figure className="consciousness-line-infographic" aria-labelledby="consciousness-line-title">
      <style>{`
        .consciousness-line-infographic {
          width: min(1180px, calc(100vw - 32px));
          margin: 38px 0 42px 50%;
          transform: translateX(-50%);
          color: ${C.textPrimary};
        }
        .consciousness-line-panel {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(144,160,176,0.48);
          border-radius: 18px;
          padding: clamp(18px, 2.4vw, 28px);
          background:
            radial-gradient(circle at 20% 16%, rgba(42,136,192,0.23), transparent 32%),
            radial-gradient(circle at 72% 74%, rgba(200,152,48,0.14), transparent 32%),
            radial-gradient(circle at 50% 46%, rgba(18,37,61,0.86), rgba(8,18,32,0.98) 70%);
          box-shadow: 0 28px 90px rgba(0,0,0,0.34), inset 0 0 90px rgba(42,136,192,0.08);
          isolation: isolate;
        }
        .consciousness-line-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 44px 44px;
          opacity: 0.24;
          mask-image: radial-gradient(circle at 50% 46%, black, transparent 78%);
          z-index: -1;
        }
        .line-problem-kicker {
          display: flex;
          align-items: center;
          gap: 18px;
          color: ${C.textSecondary};
          font-family: "JetBrains Mono", monospace;
          font-size: clamp(0.82rem, 1.3vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.32em;
          text-align: center;
          margin: -2px 0 16px;
        }
        .line-problem-kicker::before,
        .line-problem-kicker::after {
          content: "";
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, transparent, rgba(144,160,176,0.7));
        }
        .line-problem-kicker::after {
          background: linear-gradient(90deg, rgba(144,160,176,0.7), transparent);
        }
        .line-infographic-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: clamp(22px, 3.4vw, 42px);
          align-items: start;
        }
        .line-infographic-heading {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: baseline;
          gap: 16px;
          margin-bottom: 12px;
        }
        .line-infographic-tag {
          color: ${C.coral};
          border: 1px solid rgba(192,112,64,0.5);
          background: rgba(192,112,64,0.09);
          border-radius: 5px;
          padding: 5px 9px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .line-infographic-title {
          font-family: "Source Serif 4", Georgia, serif;
          font-size: clamp(1.24rem, 2vw, 1.62rem);
          line-height: 1.12;
          color: #f3f0e9;
          margin: 0;
          letter-spacing: 0;
        }
        .line-infographic-copy {
          color: #d7d9dc;
          font-size: clamp(0.92rem, 1.4vw, 1.12rem);
          line-height: 1.55;
          margin: 0 0 10px;
          max-width: 800px;
        }
        .line-boundary-intro {
          margin: 16px 0 2px;
          color: #f3f0e9;
          font-size: clamp(0.96rem, 1.4vw, 1.16rem);
        }
        .line-boundary-list {
          margin-top: 8px;
        }
        .line-boundary-row {
          display: grid;
          grid-template-columns: 56px minmax(190px, 270px) 1fr;
          gap: 18px;
          align-items: center;
          min-height: 70px;
          border-bottom: 1px solid rgba(144,160,176,0.34);
        }
        .line-boundary-row:last-child {
          border-bottom: none;
        }
        .line-boundary-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.24rem;
          font-weight: 800;
          border: 1.5px solid currentColor;
          background: rgba(8,18,32,0.48);
        }
        .line-boundary-title {
          font-family: "Source Serif 4", Georgia, serif;
          font-weight: 800;
          font-size: clamp(1rem, 1.7vw, 1.28rem);
          line-height: 1.15;
        }
        .line-boundary-text {
          border-left: 1px solid rgba(144,160,176,0.62);
          padding-left: 22px;
          color: #d5d9de;
          font-size: clamp(0.88rem, 1.25vw, 1.02rem);
          line-height: 1.38;
        }
        .line-ethical-card {
          border: 1px solid rgba(144,160,176,0.56);
          border-radius: 18px;
          padding: 26px 24px;
          background: linear-gradient(160deg, rgba(26,90,138,0.14), rgba(8,18,32,0.72));
          box-shadow: inset 0 0 34px rgba(26,138,122,0.08);
        }
        .line-ethical-card svg {
          margin: 0 auto 18px;
        }
        .line-ethical-card p {
          margin: 0 0 18px;
          color: #edf0f2;
          font-size: clamp(0.98rem, 1.55vw, 1.17rem);
          line-height: 1.5;
        }
        .line-ethical-card p:last-child {
          margin-bottom: 0;
        }
        .line-ethical-card strong {
          color: #23c6a8;
          font-weight: 800;
        }
        .line-chart-card {
          margin-top: 24px;
          border: 1px solid rgba(144,160,176,0.42);
          border-radius: 18px;
          background: radial-gradient(circle at 52% 42%, rgba(26,90,138,0.2), rgba(8,18,32,0.76) 62%);
          overflow: hidden;
        }
        .line-chart-desktop {
          display: block;
          width: 100%;
          height: auto;
        }
        .line-chart-mobile {
          display: none;
        }
        @media (max-width: 820px) {
          .consciousness-line-infographic {
            width: min(100%, calc(100vw - 24px));
            margin-top: 30px;
            margin-bottom: 34px;
          }
          .consciousness-line-panel {
            border-radius: 14px;
            padding: 16px;
          }
          .line-problem-kicker {
            gap: 10px;
            letter-spacing: 0.22em;
            font-size: 0.72rem;
            margin-bottom: 14px;
          }
          .line-infographic-top {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .line-infographic-heading {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
          }
          .line-boundary-row {
            grid-template-columns: 44px 1fr;
            gap: 12px;
            padding: 12px 0;
            align-items: start;
          }
          .line-boundary-number {
            width: 34px;
            height: 34px;
            font-size: 1rem;
          }
          .line-boundary-text {
            grid-column: 2;
            border-left: none;
            padding-left: 0;
            font-size: 0.84rem;
            line-height: 1.5;
          }
          .line-ethical-card {
            padding: 20px 18px;
          }
          .line-ethical-card svg {
            width: 66px;
          }
          .line-chart-desktop {
            display: none;
          }
          .line-chart-mobile {
            display: block;
            padding: 18px 16px;
          }
          .line-chart-mobile h4 {
            font-family: "Source Serif 4", Georgia, serif;
            color: #f3f0e9;
            font-size: 1.12rem;
            line-height: 1.2;
            text-align: center;
            margin-bottom: 8px;
          }
          .line-mobile-zone {
            color: ${C.goldLight};
            text-align: center;
            font-weight: 800;
            font-size: 0.88rem;
            margin-bottom: 16px;
          }
          .line-mobile-track {
            border: 1px solid rgba(144,160,176,0.24);
            border-radius: 12px;
            padding: 13px;
            margin-top: 12px;
            background: rgba(8,18,32,0.34);
          }
          .line-mobile-track-title {
            font-family: "JetBrains Mono", monospace;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.68rem;
            font-weight: 800;
            margin-bottom: 10px;
          }
          .line-mobile-items {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .line-mobile-item {
            min-width: 0;
            border-radius: 10px;
            background: rgba(255,255,255,0.025);
            border: 1px solid rgba(144,160,176,0.16);
            padding: 10px 8px;
            text-align: center;
          }
          .line-mobile-item svg {
            width: 42px;
            height: 42px;
            margin: 0 auto 6px;
            display: block;
          }
          .line-mobile-item span {
            display: block;
            color: #e4e6e8;
            font-size: 0.72rem;
            line-height: 1.2;
            overflow-wrap: anywhere;
          }
          .line-mobile-note {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-top: 14px;
            border: 1px solid rgba(144,160,176,0.24);
            border-radius: 12px;
            padding: 12px;
            color: #e4e6e8;
            font-size: 0.78rem;
            line-height: 1.4;
          }
        }
      `}</style>
      <div className="consciousness-line-panel">
        <div className="line-problem-kicker"><span>THE LINE PROBLEM</span></div>
        <div className="line-infographic-top">
          <div>
            <div className="line-infographic-heading">
              <span className="line-infographic-tag">Demarcation</span>
              <h3 id="consciousness-line-title" className="line-infographic-title">4. Sorites: When Does the Heap Become a Mind?</h3>
            </div>
            <p className="line-infographic-copy">The Sorites paradox asks when grains of sand become a heap. One grain is not a heap. Two grains are not a heap.</p>
            <p className="line-infographic-copy">But at some point the label begins to feel appropriate, even though no single grain performs the magic.</p>
            <p className="line-boundary-intro">Consciousness may have a similar boundary problem:</p>
            <div className="line-boundary-list">
              {boundaryRows.map(row => (
                <div key={row.n} className="line-boundary-row">
                  <span className="line-boundary-number" style={{ color: row.color }}>{row.n}</span>
                  <span className="line-boundary-title" style={{ color: row.color }}>{row.title}</span>
                  <span className="line-boundary-text">{row.text}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="line-ethical-card" aria-label="Ethical caution note">
            <ScalesIcon color="#5fc7bf" />
            <p>The point is not that every borderline case is conscious.</p>
            <p>The point is that a <strong>fuzzy line</strong> can still matter ethically.</p>
            <p>We do not need perfect metaphysics before we begin careful moral reasoning.</p>
          </aside>
        </div>
        <div className="line-chart-card">
          <svg className="line-chart-desktop" viewBox="0 0 1120 438" role="img" aria-label="Two fuzzy consciousness lines comparing biological and artificial examples">
            <defs>
              <linearGradient id="bioConsciousnessTrack" x1="0" x2="1">
                <stop offset="0" stopColor="#b9c4ce" />
                <stop offset="0.28" stopColor={C.sky} />
                <stop offset="0.52" stopColor={C.teal} />
                <stop offset="0.72" stopColor={C.goldLight} />
                <stop offset="1" stopColor={C.goldLight} />
              </linearGradient>
              <linearGradient id="aiConsciousnessTrack" x1="0" x2="1">
                <stop offset="0" stopColor="#b9c4ce" />
                <stop offset="0.35" stopColor={C.sky} />
                <stop offset="0.66" stopColor={C.goldLight} />
                <stop offset="1" stopColor={C.coral} />
              </linearGradient>
              <radialGradient id="lineZoneGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor={C.goldLight} stopOpacity="0.22" />
                <stop offset="0.55" stopColor={C.teal} stopOpacity="0.12" />
                <stop offset="1" stopColor={C.sky} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1120" height="438" fill="transparent" />
            <text x="560" y="44" textAnchor="middle" fill="#f3f0e9" fontFamily="Source Serif 4, Georgia, serif" fontSize="28" fontWeight="800">The Consciousness Line Is a Fuzzy Zone</text>
            <text x="92" y="76" textAnchor="middle" fill={C.textPrimary} fontSize="17">Clearly</text>
            <text x="92" y="98" textAnchor="middle" fill={C.textPrimary} fontSize="17">not conscious</text>
            <text x="1020" y="76" textAnchor="middle" fill={C.textPrimary} fontSize="17">Clearly</text>
            <text x="1020" y="98" textAnchor="middle" fill={C.textPrimary} fontSize="17">conscious</text>
            <text x="80" y="142" fill="#23c6a8" fontSize="17" fontWeight="800">Biological</text>
            <text x="80" y="164" fill="#23c6a8" fontSize="17" fontWeight="800">examples</text>
            <text x="80" y="252" fill={C.coral} fontSize="17" fontWeight="800">Artificial</text>
            <text x="80" y="274" fill={C.coral} fontSize="17" fontWeight="800">examples</text>

            <ellipse cx="622" cy="193" rx="392" ry="118" fill="url(#lineZoneGlow)" />
            <ellipse cx="622" cy="193" rx="392" ry="118" fill="none" stroke={C.goldLight} strokeWidth="1.5" strokeDasharray="2 9" opacity="0.9" />
            <ellipse cx="622" cy="193" rx="392" ry="118" fill="none" stroke={C.sky} strokeWidth="1.4" strokeDasharray="2 9" opacity="0.72" transform="rotate(-3 622 193)" />
            <text x="560" y="76" textAnchor="middle" fill={C.goldLight} fontSize="18" fontWeight="800">uncertain moral zone</text>

            <line x1="150" y1="170" x2="1040" y2="170" stroke="url(#bioConsciousnessTrack)" strokeWidth="4" strokeLinecap="round" />
            <line x1="150" y1="280" x2="1040" y2="280" stroke="url(#aiConsciousnessTrack)" strokeWidth="4" strokeLinecap="round" />
            {bioExamples.map(item => (
              <g key={item.label}>
                <text x={item.x} y="115" textAnchor="middle" fill="#f3f0e9" fontSize="15">{item.label}</text>
                <FuzzyIcon type={item.type} x={item.x} y={138} color={item.color} scale={0.58} />
                <circle cx={item.x} cy="170" r="8" fill={item.color} />
              </g>
            ))}
            {artificialExamples.map(item => (
              <g key={item.label}>
                <text x={item.x} y="226" textAnchor="middle" fill="#f3f0e9" fontSize="15">{item.label}</text>
                <FuzzyIcon type={item.type} x={item.x} y={252} color={item.color} scale={0.58} />
                <circle cx={item.x} cy="280" r="8" fill={item.color} />
              </g>
            ))}

            <line x1="620" y1="288" x2="620" y2="326" stroke={C.goldLight} strokeWidth="1.5" strokeDasharray="6 7" />
            <text x="620" y="333" textAnchor="middle" fill="#d7d9dc" fontSize="14">no sharp boundary</text>
            <text x="620" y="352" textAnchor="middle" fill="#d7d9dc" fontSize="14">only gradual change</text>
            <rect x="154" y="368" width="812" height="56" rx="12" fill="rgba(8,18,32,0.72)" stroke="rgba(144,160,176,0.35)" />
            <foreignObject x="176" y="373" width="58" height="48">
              <BulbIcon color="#23c6a8" />
            </foreignObject>
            <text x="246" y="391" fill="#edf0f2" fontSize="16">Ethically important questions often live in the uncertain middle. Our task is not to declare a precise cutoff,</text>
            <text x="246" y="413" fill="#edf0f2" fontSize="16">but to reason carefully, remain open to new evidence, and err on the side of moral consideration.</text>
          </svg>
          <div className="line-chart-mobile">
            <h4>The Consciousness Line Is a Fuzzy Zone</h4>
            <p className="line-mobile-zone">uncertain moral zone · no sharp boundary</p>
            <div className="line-mobile-track">
              <p className="line-mobile-track-title" style={{ color: "#23c6a8" }}>Biological examples</p>
              <div className="line-mobile-items">
                {bioExamples.map(item => (
                  <div key={item.label} className="line-mobile-item">
                    <svg viewBox="-48 -48 96 96" aria-hidden="true"><FuzzyIcon type={item.type} color={item.color} /></svg>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="line-mobile-track">
              <p className="line-mobile-track-title" style={{ color: C.coral }}>Artificial examples</p>
              <div className="line-mobile-items">
                {artificialExamples.map(item => (
                  <div key={item.label} className="line-mobile-item">
                    <svg viewBox="-48 -48 96 96" aria-hidden="true"><FuzzyIcon type={item.type} color={item.color} /></svg>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="line-mobile-note">
              <BulbIcon color="#23c6a8" />
              <span>Ethically important questions often live in the uncertain middle. Reason carefully, stay open to new evidence, and err on the side of moral consideration.</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function LineProblemSummaryFigure() {
  const rows = [
    {
      n: 1,
      titleLines: ["Single cells"],
      color: C.textMuted,
      lines: [
        "They maintain themselves, respond",
        "to the environment, and resist entropy.",
        "Not normally treated as conscious.",
      ],
    },
    {
      n: 2,
      titleLines: ["Simple nervous", "systems"],
      color: C.sky,
      lines: [
        "The case becomes harder: behavior,",
        "sensation, and adaptation start",
        "to look morally relevant.",
      ],
    },
    {
      n: 3,
      titleLines: ["Animal minds"],
      color: C.goldLight,
      lines: [
        "History should humble us: humans",
        "have repeatedly underestimated",
        "non-human experience.",
      ],
    },
    {
      n: 4,
      titleLines: ["Synthetic or", "artificial systems"],
      color: C.coral,
      lines: [
        "The temptation is to draw the line",
        "where categories feel comfortable,",
        "not where the line is found.",
      ],
    },
  ];

  return (
    <svg viewBox="0 0 720 398" role="img" aria-label="Sorites boundary problem summary" style={{ width: "100%", height: "auto", display: "block", margin: "12px 0 18px" }}>
      <defs>
        <radialGradient id="lineProblemSummaryGlow" cx="42%" cy="44%" r="72%">
          <stop offset="0" stopColor={C.ocean} stopOpacity="0.2" />
          <stop offset="0.62" stopColor={C.midnight} stopOpacity="0.92" />
          <stop offset="1" stopColor={C.bgAlt} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="718" height="396" rx="14" fill="url(#lineProblemSummaryGlow)" stroke={`${C.textMuted}55`} />
      <text x="24" y="34" fill={C.textPrimary} fontSize="15" fontWeight="700">
        The Sorites paradox asks when grains of sand become a heap. One grain is not a heap.
      </text>
      <text x="24" y="58" fill={C.textPrimary} fontSize="15" fontWeight="700">
        Two grains are not a heap. But at some point the label begins to feel appropriate.
      </text>
      <text x="24" y="92" fill="#f3f0e9" fontSize="16" fontWeight="700">
        Consciousness may have a similar boundary problem:
      </text>

      {rows.map((row, index) => {
        const y = 130 + index * 64;
        const titleStart = row.titleLines.length === 1 ? y + 7 : y - 7;
        return (
          <g key={row.n}>
            <line x1="24" y1={y + 42} x2="486" y2={y + 42} stroke={`${C.textMuted}55`} />
            <circle cx="48" cy={y} r="20" fill={`${C.bgAlt}b8`} stroke={row.color} strokeWidth="1.5" />
            <text x="48" y={y + 7} textAnchor="middle" fill={row.color} fontSize="21" fontWeight="800">{row.n}</text>
            {row.titleLines.map((line, titleIndex) => (
              <text key={line} x="84" y={titleStart + titleIndex * 19} fill={row.color} fontFamily="Source Serif 4, Georgia, serif" fontSize="18" fontWeight="800">
                {line}
              </text>
            ))}
            <line x1="252" y1={y - 24} x2="252" y2={y + 28} stroke={`${C.textMuted}66`} />
            {row.lines.map((line, lineIndex) => (
              <text key={line} x="274" y={y - 17 + lineIndex * 16} fill={C.textSecondary} fontSize="12.4" fontWeight="600">
                {line}
              </text>
            ))}
          </g>
        );
      })}

      <line x1="500" y1="112" x2="500" y2="350" stroke={`${C.textMuted}66`} strokeDasharray="4 5" />
      <rect x="522" y="108" width="170" height="242" rx="16" fill={`${C.bgAlt}b8`} stroke={`${C.textMuted}55`} />
      <g transform="translate(607 136)" fill="none" stroke={C.teal} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 0 V48" />
        <path d="M-24 57 H24" />
        <path d="M-15 48 H15" />
        <circle cx="0" cy="-3" r="6" />
        <path d="M-36 10 H36" />
        <path d="M-36 10 L-50 42 H-22 Z" />
        <path d="M36 10 L22 42 H50 Z" />
        <path d="M-50 42 C-42 50 -30 50 -22 42" />
        <path d="M22 42 C30 50 42 50 50 42" />
      </g>
      <text x="550" y="220" fill={C.textPrimary} fontSize="15" fontWeight="700">The point is not that</text>
      <text x="550" y="242" fill={C.textPrimary} fontSize="15" fontWeight="700">every borderline case</text>
      <text x="550" y="264" fill={C.textPrimary} fontSize="15" fontWeight="700">is conscious.</text>
      <text x="550" y="294" fill={C.textPrimary} fontSize="15" fontWeight="700">A fuzzy line can still</text>
      <text x="550" y="316" fill={C.textPrimary} fontSize="15" fontWeight="700">matter ethically.</text>
    </svg>
  );
}

function LineProblemSummaryMobileFigure() {
  const rows = [
    {
      n: 1,
      title: "Single cells",
      color: C.textMuted,
      lines: ["Self-maintaining and responsive,", "but not normally treated as conscious."],
    },
    {
      n: 2,
      title: "Simple nervous systems",
      color: C.sky,
      lines: ["Behavior, sensation, and adaptation", "begin to look morally relevant."],
    },
    {
      n: 3,
      title: "Animal minds",
      color: C.goldLight,
      lines: ["History should humble us:", "we have often underestimated", "non-human experience."],
    },
    {
      n: 4,
      title: "Synthetic or artificial systems",
      color: C.coral,
      lines: ["Our categories can feel comfortable", "without actually finding the line."],
    },
  ];

  return (
    <svg viewBox="0 0 340 610" role="img" aria-label="Mobile Sorites boundary problem summary" style={{ width: "100%", height: "auto", display: "block", margin: "12px 0 18px" }}>
      <defs>
        <radialGradient id="lineProblemMobileGlow" cx="42%" cy="44%" r="72%">
          <stop offset="0" stopColor={C.ocean} stopOpacity="0.2" />
          <stop offset="0.62" stopColor={C.midnight} stopOpacity="0.92" />
          <stop offset="1" stopColor={C.bgAlt} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="338" height="608" rx="14" fill="url(#lineProblemMobileGlow)" stroke={`${C.textMuted}55`} />
      <text x="20" y="34" fill={C.textPrimary} fontSize="13" fontWeight="800">The Sorites paradox asks when grains</text>
      <text x="20" y="55" fill={C.textPrimary} fontSize="13" fontWeight="800">of sand become a heap. At some point,</text>
      <text x="20" y="76" fill={C.textPrimary} fontSize="13" fontWeight="800">the label begins to feel appropriate.</text>
      <text x="20" y="112" fill="#f3f0e9" fontSize="14" fontWeight="800">Consciousness may have a similar problem:</text>

      {rows.map((row, index) => {
        const y = 154 + index * 86;
        return (
          <g key={row.n}>
            <line x1="20" y1={y + 58} x2="320" y2={y + 58} stroke={`${C.textMuted}55`} />
            <circle cx="38" cy={y} r="18" fill={`${C.bgAlt}b8`} stroke={row.color} strokeWidth="1.5" />
            <text x="38" y={y + 6} textAnchor="middle" fill={row.color} fontSize="18" fontWeight="800">{row.n}</text>
            <text x="68" y={y - 6} fill={row.color} fontFamily="Source Serif 4, Georgia, serif" fontSize={row.title.length > 24 ? "15" : "17"} fontWeight="800">
              {row.title}
            </text>
            {row.lines.map((line, lineIndex) => (
              <text key={line} x="68" y={y + 19 + lineIndex * 16} fill={C.textSecondary} fontSize="12.2" fontWeight="700">
                {line}
              </text>
            ))}
          </g>
        );
      })}

      <rect x="20" y="506" width="300" height="78" rx="14" fill={`${C.bgAlt}b8`} stroke={`${C.textMuted}55`} />
      <g transform="translate(46 532)" fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 0 V34" />
        <path d="M-16 40 H16" />
        <circle cx="0" cy="-3" r="5" />
        <path d="M-26 7 H26" />
        <path d="M-26 7 L-36 30 H-16 Z" />
        <path d="M26 7 L16 30 H36 Z" />
      </g>
      <text x="86" y="528" fill={C.textPrimary} fontSize="12.5" fontWeight="800">A fuzzy line can still matter ethically.</text>
      <text x="86" y="550" fill={C.textPrimary} fontSize="12.5" fontWeight="800">We can reason carefully before</text>
      <text x="86" y="572" fill={C.textPrimary} fontSize="12.5" fontWeight="800">perfect metaphysics arrives.</text>
    </svg>
  );
}

function FuzzyZoneChart() {
  const bioExamples = [
    { label: "single cell", type: "cell", x: 212, color: "#b9c4ce", scale: 0.54 },
    { label: "simple organisms", type: "worm", x: 373, color: C.sky, scale: 0.53 },
    { label: "insects", type: "insect", x: 513, color: C.sky, scale: 0.48 },
    { label: "fish", type: "fish", x: 643, color: C.sand, scale: 0.48 },
    { label: "birds", type: "bird", x: 763, color: C.goldLight, scale: 0.5 },
    { label: "primates", type: "primate", x: 903, color: C.goldLight, scale: 0.48 },
    { label: "humans", type: "human", x: 1042, color: C.goldLight, scale: 0.5 },
  ];
  const artificialExamples = [
    { label: "simple machine", type: "gear", x: 212, color: "#b9c4ce", scale: 0.52 },
    { label: "rule-based systems", type: "flow", x: 397, color: C.sky, scale: 0.48 },
    { label: "machine learning", type: "network", x: 568, color: C.sky, scale: 0.48 },
    { label: "advanced AI", type: "chipBrain", x: 748, color: C.goldLight, scale: 0.48 },
    { label: "general AI", type: "processor", x: 899, color: C.coral, scale: 0.48 },
    { label: "fully synthetic brain", type: "brain", x: 1056, color: C.coral, scale: 0.48 },
  ];

  return (
    <svg viewBox="0 0 1227 401" role="img" aria-label="The Consciousness Line fuzzy zone chart" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="bioFuzzyTrack" x1="0" x2="1">
          <stop offset="0" stopColor="#b9c4ce" />
          <stop offset="0.3" stopColor={C.sky} />
          <stop offset="0.55" stopColor={C.teal} />
          <stop offset="0.72" stopColor={C.goldLight} />
          <stop offset="1" stopColor={C.goldLight} />
        </linearGradient>
        <linearGradient id="aiFuzzyTrack" x1="0" x2="1">
          <stop offset="0" stopColor="#b9c4ce" />
          <stop offset="0.38" stopColor={C.sky} />
          <stop offset="0.62" stopColor={C.goldLight} />
          <stop offset="1" stopColor={C.coral} />
        </linearGradient>
        <radialGradient id="fuzzyChartBg" cx="48%" cy="42%" r="72%">
          <stop offset="0" stopColor={C.ocean} stopOpacity="0.24" />
          <stop offset="0.58" stopColor={C.midnight} stopOpacity="0.92" />
          <stop offset="1" stopColor="#071421" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="fuzzyMoralZone" cx="52%" cy="50%" r="52%">
          <stop offset="0" stopColor={C.goldLight} stopOpacity="0.24" />
          <stop offset="0.5" stopColor={C.teal} stopOpacity="0.14" />
          <stop offset="1" stopColor={C.sky} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="1224" height="398" rx="16" fill="url(#fuzzyChartBg)" stroke={`${C.textMuted}66`} strokeWidth="1.5" />
      <ellipse cx="640" cy="151" rx="380" ry="104" fill="url(#fuzzyMoralZone)" />
      <ellipse cx="640" cy="151" rx="382" ry="105" fill="none" stroke={C.sky} strokeWidth="1.4" strokeDasharray="2 8" opacity="0.72" />
      <ellipse cx="640" cy="151" rx="382" ry="105" fill="none" stroke={C.goldLight} strokeWidth="1.4" strokeDasharray="2 8" opacity="0.86" transform="rotate(1.5 640 151)" />

      <text x="614" y="36" textAnchor="middle" fill="#f3f0e9" fontFamily="Source Serif 4, Georgia, serif" fontSize="24" fontWeight="800">The Consciousness Line Is a Fuzzy Zone</text>
      <text x="614" y="61" textAnchor="middle" fill={C.goldLight} fontSize="18" fontWeight="800">uncertain moral zone</text>
      <text x="94" y="38" textAnchor="middle" fill={C.textPrimary} fontSize="16">Clearly</text>
      <text x="94" y="60" textAnchor="middle" fill={C.textPrimary} fontSize="16">not conscious</text>
      <text x="1138" y="38" textAnchor="middle" fill={C.textPrimary} fontSize="16">Clearly</text>
      <text x="1138" y="60" textAnchor="middle" fill={C.textPrimary} fontSize="16">conscious</text>

      <text x="22" y="115" fill="#23c6a8" fontSize="18" fontWeight="800">Biological</text>
      <text x="22" y="140" fill="#23c6a8" fontSize="18" fontWeight="800">examples</text>
      <text x="22" y="213" fill={C.coral} fontSize="18" fontWeight="800">Artificial</text>
      <text x="22" y="239" fill={C.coral} fontSize="18" fontWeight="800">examples</text>

      <line x1="123" y1="141" x2="1136" y2="141" stroke="url(#bioFuzzyTrack)" strokeWidth="4" strokeLinecap="round" />
      <line x1="123" y1="260" x2="1147" y2="260" stroke="url(#aiFuzzyTrack)" strokeWidth="4" strokeLinecap="round" />

      {bioExamples.map(item => (
        <g key={item.label}>
          <text x={item.x} y="82" textAnchor="middle" fill={C.textPrimary} fontSize="15" fontWeight="600">{item.label}</text>
          <FuzzyIcon type={item.type} x={item.x} y={113} color={item.color} scale={item.scale} />
          <circle cx={item.x} cy="141" r="7.5" fill={item.color} />
        </g>
      ))}
      {artificialExamples.map(item => (
        <g key={item.label}>
          <text x={item.x} y="198" textAnchor="middle" fill={C.textPrimary} fontSize="15" fontWeight="600">{item.label}</text>
          <FuzzyIcon type={item.type} x={item.x} y={231} color={item.color} scale={item.scale} />
          <circle cx={item.x} cy="260" r="7.5" fill={item.color} />
        </g>
      ))}

      <line x1="621" y1="268" x2="621" y2="296" stroke={C.goldLight} strokeWidth="1.5" strokeDasharray="6 7" />
      <text x="621" y="309" textAnchor="middle" fill={C.textPrimary} fontSize="15">no sharp boundary</text>
      <text x="621" y="327" textAnchor="middle" fill={C.textPrimary} fontSize="15">only gradual change</text>

      <rect x="135" y="335" width="925" height="56" rx="12" fill={`${C.bgAlt}cc`} stroke={`${C.textMuted}55`} />
      <g transform="translate(177 365)" fill="none" stroke="#23c6a8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-12 9 C-18 4 -21 -3 -21 -10 C-21 -23 -12 -31 0 -31 C12 -31 21 -23 21 -10 C21 -3 18 4 12 9" />
        <path d="M-10 13 H10 M-8 20 H8 M-4 27 H4" />
        <path d="M0 -41 V-36 M-28 -30 L-24 -26 M28 -30 L24 -26 M-38 -8 H-32 M32 -8 H38" />
      </g>
      <text x="222" y="360" fill={C.textPrimary} fontSize="17">Ethically important questions often live in the uncertain middle. Our task is not to declare a precise cutoff,</text>
      <text x="222" y="381" fill={C.textPrimary} fontSize="17">but to reason carefully, remain open to new evidence, and err on the side of moral consideration.</text>
    </svg>
  );
}

function FuzzyZoneArtFigure() {
  const bioLabels = [
    { text: "single cell", left: "10.4%" },
    { text: "simple organisms", left: "22.7%" },
    { text: "insects", left: "36.2%" },
    { text: "fish", left: "49.0%" },
    { text: "birds", left: "61.1%" },
    { text: "primates", left: "75.0%" },
    { text: "humans", left: "89.3%" },
  ];
  const artificialLabels = [
    { text: "simple machine", left: "10.5%" },
    { text: "rule-based systems", left: "24.2%" },
    { text: "machine learning", left: "42.1%" },
    { text: "advanced AI", left: "60.7%" },
    { text: "general AI", left: "75.1%" },
    { text: "fully synthetic brain", left: "89.7%" },
  ];

  return (
    <figure className="fuzzy-zone-art-figure" aria-label="The Consciousness Line fuzzy zone illustration">
      <style>{`
        .fuzzy-zone-art-figure {
          width: min(1120px, calc(100vw - 32px));
          margin: 22px 0 2px 50%;
          transform: translateX(-50%);
        }
        .fuzzy-zone-art-scroll {
          max-width: 100%;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-color: ${C.ocean}33 transparent;
        }
        .fuzzy-zone-art-canvas {
          position: relative;
          width: 100%;
          aspect-ratio: 2075 / 758;
          border-radius: 12px;
          overflow: hidden;
          background: ${C.midnight};
          border: 1px solid ${C.border};
          box-shadow: 0 18px 52px rgba(0, 0, 0, 0.28);
        }
        .fuzzy-zone-art-canvas img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fuzzy-zone-art-label,
        .fuzzy-zone-art-title,
        .fuzzy-zone-art-side,
        .fuzzy-zone-art-note,
        .fuzzy-zone-art-boundary {
          position: absolute;
          z-index: 2;
          color: ${C.textPrimary};
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.92), 0 0 12px rgba(8, 18, 32, 0.86);
          pointer-events: none;
        }
        .fuzzy-zone-art-title {
          left: 50%;
          top: 3.4%;
          transform: translateX(-50%);
          font-family: "Source Serif 4", Georgia, serif;
          font-size: clamp(1rem, 2.05vw, 1.52rem);
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
        }
        .fuzzy-zone-art-zone {
          position: absolute;
          left: 50%;
          top: 9.8%;
          transform: translateX(-50%);
          z-index: 2;
          color: ${C.goldLight};
          font-size: clamp(0.72rem, 1.45vw, 0.96rem);
          font-weight: 800;
          line-height: 1;
          text-shadow: 0 2px 7px rgba(0, 0, 0, 0.9);
          pointer-events: none;
          white-space: nowrap;
        }
        .fuzzy-zone-art-side {
          font-size: clamp(0.64rem, 1.22vw, 0.84rem);
          line-height: 1.12;
          text-align: center;
          width: 96px;
        }
        .fuzzy-zone-art-side.left {
          left: 3.2%;
          top: 5.0%;
        }
        .fuzzy-zone-art-side.right {
          right: 3.2%;
          top: 5.0%;
        }
        .fuzzy-zone-art-row-label {
          position: absolute;
          left: 2.3%;
          z-index: 2;
          font-size: clamp(0.74rem, 1.38vw, 0.98rem);
          font-weight: 800;
          line-height: 1.18;
          text-shadow: 0 2px 7px rgba(0, 0, 0, 0.9);
          pointer-events: none;
        }
        .fuzzy-zone-art-row-label.bio {
          top: 35.2%;
          color: #23c6a8;
        }
        .fuzzy-zone-art-row-label.ai {
          top: 62.8%;
          color: ${C.coral};
        }
        .fuzzy-zone-art-label {
          width: 128px;
          transform: translateX(-50%);
          text-align: center;
          font-size: clamp(0.6rem, 1.08vw, 0.78rem);
          font-weight: 800;
          line-height: 1.12;
          color: #f4f1e9;
          white-space: normal;
        }
        .fuzzy-zone-art-label.bio {
          top: 13.8%;
        }
        .fuzzy-zone-art-label.ai {
          top: 44.6%;
        }
        .fuzzy-zone-art-boundary {
          left: 50%;
          top: 67.8%;
          transform: translateX(-50%);
          width: 320px;
          text-align: center;
          font-size: clamp(0.66rem, 1.08vw, 0.82rem);
          line-height: 1.18;
          color: ${C.textPrimary};
          white-space: nowrap;
        }
        .fuzzy-zone-art-note {
          left: 18.5%;
          right: 8.2%;
          top: 80.8%;
          bottom: auto;
          font-size: clamp(0.62rem, 0.96vw, 0.78rem);
          line-height: 1.22;
          color: #f4f1e9;
        }
        .fuzzy-zone-art-note strong {
          font-weight: 800;
        }
        @media (max-width: 520px) {
          .fuzzy-zone-art-figure {
            width: 100%;
            margin-left: 0;
            transform: none;
            margin-top: 18px;
          }
          .fuzzy-zone-art-canvas {
            min-width: 1120px;
          }
        }
      `}</style>
      <div className="fuzzy-zone-art-scroll">
        <div className="fuzzy-zone-art-canvas">
          <img
            src="/article-art/consciousness-line-fuzzy-zone.png"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <div className="fuzzy-zone-art-title">The Consciousness Line Is a Fuzzy Zone</div>
          <div className="fuzzy-zone-art-zone">uncertain moral zone</div>
          <div className="fuzzy-zone-art-side left">Clearly<br />not conscious</div>
          <div className="fuzzy-zone-art-side right">Clearly<br />conscious</div>
          <div className="fuzzy-zone-art-row-label bio">Biological<br />examples</div>
          <div className="fuzzy-zone-art-row-label ai">Artificial<br />examples</div>
          {bioLabels.map((label) => (
            <div key={label.text} className="fuzzy-zone-art-label bio" style={{ left: label.left }}>{label.text}</div>
          ))}
          {artificialLabels.map((label) => (
            <div key={label.text} className="fuzzy-zone-art-label ai" style={{ left: label.left }}>{label.text}</div>
          ))}
          <div className="fuzzy-zone-art-boundary">no sharp boundary · only gradual change</div>
          <div className="fuzzy-zone-art-note">
            <strong>Ethically important questions often live in the uncertain middle.</strong> Our task is not to declare a precise cutoff, but to reason carefully, remain open to new evidence, and err on the side of moral consideration.
          </div>
        </div>
      </div>
    </figure>
  );
}

function ConsciousnessLineFigure() {
  return (
    <>
      <Expandable title="6. Sorites: When Does the Heap Become a Mind?" color={C.coral} tag="Demarcation" defaultOpen>
        <p>The Sorites paradox asks when grains of sand become a heap. One grain is not a heap. Two grains are not a heap. But at some point the label begins to feel appropriate, even though no single grain performs the magic.</p>
        <p style={{ marginTop: 12 }}>Consciousness may have a similar boundary problem:</p>
        <StepList items={[
          { title: "Single cells", text: "They maintain themselves, respond to the environment, and resist entropy, but we do not normally treat them as conscious subjects.", color: C.textMuted },
          { title: "Simple nervous systems", text: "The case becomes harder. Behavior, sensation, and adaptation begin to look morally relevant.", color: C.ocean },
          { title: "Animal minds", text: "Here history should humble us. Humans have repeatedly underestimated non-human experience when recognition would have inconvenienced us.", color: C.gold },
          { title: "Synthetic or artificial systems", text: "The temptation is to draw the line wherever our existing categories feel comfortable. That is not the same as having found the line.", color: C.coral },
        ]} />
        <p>The point is not that every borderline case is conscious. The point is that a fuzzy line can still matter ethically. We do not need perfect metaphysics before we begin careful moral reasoning.</p>
        <p style={{ marginTop: 12 }}>The visual below is still a simplification. It should not be read as a march toward human likeness. The deeper point is that moral uncertainty can widen in the middle, especially when architectures become less familiar and more difficult to classify.</p>
      </Expandable>
      <FuzzyZoneArtFigure />
    </>
  );
}

function BioDigitalLoopFigure() {
  return (
    <FigureShell
      label="Visualization"
      title="DishBrain as a Biological-Digital Feedback Loop"
      caption="The middle case: living neurons are not merely described by software; they are coupled to a digital environment that changes their activity."
    >
      <svg viewBox="0 0 720 340" role="img" aria-label="Closed loop between neurons, electrodes, game world, and feedback" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill={C.gold} />
          </marker>
        </defs>
        <rect x="34" y="52" width="184" height="166" rx="20" fill={`${C.teal}12`} stroke={`${C.teal}66`} />
        <rect x="270" y="52" width="184" height="166" rx="20" fill={`${C.ocean}18`} stroke={`${C.ocean}80`} />
        <rect x="506" y="52" width="184" height="166" rx="20" fill={`${C.gold}12`} stroke={`${C.gold}66`} />
        <text x="126" y="84" textAnchor="middle" fill={C.textPrimary} fontSize="18" fontWeight="700">Living cells</text>
        <text x="362" y="84" textAnchor="middle" fill={C.textPrimary} fontSize="18" fontWeight="700">Electrode array</text>
        <text x="598" y="84" textAnchor="middle" fill={C.textPrimary} fontSize="18" fontWeight="700">Game world</text>

        {[0, 1, 2, 3, 4, 5].map(i => (
          <g key={i} transform={`translate(${78 + (i % 3) * 48} ${124 + Math.floor(i / 3) * 42})`}>
            <circle r="15" fill={C.midnight} stroke={i % 2 ? C.gold : C.teal} strokeWidth="3" />
            <path d="M-14 -2 C-30 -16 -34 -28 -44 -35 M12 7 C29 14 38 22 48 34 M-4 15 C-12 30 -21 38 -30 49" fill="none" stroke={i % 2 ? C.gold : C.teal} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}

        {[0, 1, 2, 3].map(row => (
          <g key={row}>
            {[0, 1, 2, 3].map(col => (
              <circle key={`${row}-${col}`} cx={315 + col * 31} cy={120 + row * 23} r="7" fill={row === col ? C.gold : C.ocean} opacity="0.85" />
            ))}
          </g>
        ))}
        <path d="M300 112 H424 M300 158 H424 M331 100 V188 M393 100 V188" stroke={C.textMuted} strokeWidth="1" opacity="0.5" />

        <rect x="546" y="120" width="104" height="72" rx="8" fill={C.midnight} stroke={C.gold} />
        <circle cx="578" cy="156" r="8" fill={C.coral} />
        <rect x="626" y="134" width="8" height="44" rx="4" fill={C.teal} />
        <path d="M586 156 C608 138 618 138 626 156" fill="none" stroke={C.gold} strokeWidth="3" strokeDasharray="4 5" />

        <path d="M218 140 H266" stroke={C.gold} strokeWidth="4" markerEnd="url(#arrowHead)" />
        <path d="M454 140 H502" stroke={C.gold} strokeWidth="4" markerEnd="url(#arrowHead)" />
        <path d="M598 226 C508 292 224 292 126 228" fill="none" stroke={C.coral} strokeWidth="4" markerEnd="url(#arrowHead)" />
        <text x="362" y="318" textAnchor="middle" fill={C.coral} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14" fontWeight="700">feedback changes future activity</text>
      </svg>
    </FigureShell>
  );
}

function ExperimentThumb({ experimentId, color, size = 58 }) {
  const image = getSceneIllustration(experimentId);

  if (!image) {
    return (
      <span style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: `${color}18`,
        border: `1px solid ${color}38`,
        flex: `0 0 ${size}px`,
      }} />
    );
  }

  return (
    <span style={{
      width: size,
      height: size,
      borderRadius: 8,
      overflow: "hidden",
      border: `1px solid ${color}45`,
      background: `${color}12`,
      flex: `0 0 ${size}px`,
      boxShadow: `0 8px 22px ${color}14`,
      display: "block",
    }}>
      <img
        src={image.src}
        alt=""
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </span>
  );
}

function DiscussionCard({ href, title, color, desc, use, experimentId }) {
  return (
    <a href={href} style={{
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      background: `${color}0c`,
      border: `1px solid ${color}30`,
      borderRadius: 8,
      padding: "16px 18px",
      color: C.textSecondary,
      textDecoration: "none",
      height: "100%",
      minWidth: 0,
    }}>
      <ExperimentThumb experimentId={experimentId} color={color} size={62} />
      <span style={{ display: "block", minWidth: 0 }}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color, fontSize: "1rem", marginBottom: 6 }}>{title}</h4>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</p>
        <p style={{ color: C.textMuted, fontSize: "0.76rem", lineHeight: 1.45, marginTop: 10 }}>{use}</p>
      </span>
    </a>
  );
}

function BandLinks({ title, color, items }) {
  return (
    <div style={{
      background: `${color}08`,
      border: `1px solid ${color}24`,
      borderRadius: 8,
      padding: "16px 18px",
      height: "100%",
      minWidth: 0,
    }}>
      <h4 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color,
        fontSize: "1rem",
        marginBottom: 10,
      }}>{title}</h4>
      <div style={{ display: "grid", gap: 9 }}>
        {items.map((item, index) => (
          <a key={item.href} href={item.href} style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            padding: index === 0 ? "0 0 10px" : "10px 0",
            borderTop: index === 0 ? "none" : `1px solid ${C.border}`,
            color: C.textSecondary,
            textDecoration: "none",
            overflowWrap: "anywhere",
          }}>
            <ExperimentThumb experimentId={item.experimentId} color={color} size={54} />
            <span style={{ display: "block", minWidth: 0 }}>
              <strong style={{ color: C.textPrimary, fontSize: "0.88rem" }}>{item.title}</strong>
              <span style={{ display: "block", color: C.textMuted, fontSize: "0.76rem", lineHeight: 1.45, marginTop: 3 }}>{item.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function DiscussionBridge() {
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 14 }}>
        To continue this conversation with students, children, or peers, move from the article into scenarios where the same ideas become decisions people have to make.
      </p>
      <div style={{ marginBottom: 18 }}>
        <p style={{
          color: C.gold,
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}>By Grade Band</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          <BandLinks
            title="K-5"
            color={C.teal}
            items={[
              { href: "#thought-experiments/kindergarten?experiment=magic-toy", experimentId: "magic-toy", title: "Kindergarten: The Magic Toy", desc: "A talking toy says it feels sad. A gentle entry into apparent feeling and care." },
              { href: "#thought-experiments/kindergarten?experiment=robot-pet-goodbye", experimentId: "robot-pet-goodbye", title: "Kindergarten: Goodbye, Robot Pet", desc: "A class robot dog stops working. What do we miss, and why?" },
              { href: "#thought-experiments/grade-1?experiment=winning-game", experimentId: "winning-game", title: "Grade 1: Did I Really Win?", desc: "A child explores whether a simulated success counts as a real one." },
            ]}
          />
          <BandLinks
            title="Grades 6-8"
            color={C.gold}
            items={[
              { href: "#thought-experiments/6-8?experiment=sorites-heap", experimentId: "sorites-heap", title: "When Does a Heap Stop Being a Heap?", desc: "The Sorites problem behind the article's fuzzy consciousness line." },
              { href: "#thought-experiments/6-8?experiment=ship-of-theseus-robot", experimentId: "ship-of-theseus-robot", title: "Robot Replacement Parts", desc: "A middle-grades version of the synthetic-brain and Ship of Theseus question." },
              { href: "#thought-experiments/6-8?experiment=brain-in-vat", experimentId: "brain-in-vat", title: "Are You Sure You're Real?", desc: "Experience, reality, and why outer evidence may not settle inner life." },
            ]}
          />
          <BandLinks
            title="Grades 9-12"
            color={C.ocean}
            items={[
              { href: "#thought-experiments/9-12?theme=knowledge&experiment=marys-room", experimentId: "marys-room", title: "Knowledge: Mary's Room", desc: "The article's Nagel/Jackson thread translated into a classroom scenario." },
              { href: "#thought-experiments/9-12?theme=reasoning&experiment=chinese-room", experimentId: "chinese-room", title: "Reasoning: The Chinese Room", desc: "Language fluency, understanding, and the difference between syntax and mind." },
              { href: "#thought-experiments/9-12?theme=reality&experiment=experience-machine", experimentId: "experience-machine", title: "Reality: The Experience Machine", desc: "Whether simulated mastery or simulated life can substitute for the real thing." },
            ]}
          />
        </div>
      </div>
      <p style={{
        color: C.gold,
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>Featured Educator Pathways</p>
      <div className="grid-2">
        <DiscussionCard
          href="/thought-experiments/educators?experiment=the-shortcut"
          experimentId="the-shortcut"
          title="The Shortcut"
          color={C.teal}
          desc="Connects Nagel, Mary's Room, and Nozick to the question of whether bypassing experience changes what learning is."
          use="Best prompt: If the output is perfect, what is still lost?"
        />
        <DiscussionCard
          href="/thought-experiments/educators?experiment=digital-doppelganger"
          experimentId="digital-doppelganger"
          title="The Digital Doppelgänger"
          color={C.ocean}
          desc="Connects simulated personhood, voice, presence, and whether an AI proxy can participate in education on someone's behalf."
          use="Best prompt: Who, if anyone, was present in the room?"
        />
        <DiscussionCard
          href="/thought-experiments/educators?experiment=ai-authorship"
          experimentId="ai-authorship"
          title="The AI Authorship Quandary"
          color={C.gold}
          desc="Connects Austin's speech acts to labels like author, helper, tool, student, and responsibility."
          use="Best prompt: What does the label 'author' do?"
        />
        <DiscussionCard
          href="/thought-experiments/educators?experiment=reluctant-educator"
          experimentId="reluctant-educator"
          title="The Reluctant Educator"
          color={C.coral}
          desc="Connects ethical caution to school policy: when should institutions require, permit, or resist AI use?"
          use="Best prompt: What should count as responsible uncertainty?"
        />
      </div>
    </div>
  );
}

export default function AIConsciousness({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <ImagePageHeader
          label="AI Ethics · Philosophy of Mind · Moral Caution"
          title="The Consciousness Line"
          subtitle="Anil Seth is right to warn that current AI is probably not conscious, and that fluent language is not inner life. But his own call for humility opens a deeper educational question: how should we reason when the boundaries of consciousness are uncertain, our labels carry moral force, and future systems may not fit our inherited categories?"
          minutes={21}
          image={articleVisual.image}
          imageAlt={articleVisual.imageAlt}
          accent={articleVisual.accent}
        />

        <Narrow>
          <FadeIn delay={0.05}>
            <VideoEmbed id="tJV-vdbZ388" title="Anil Seth - Why AI is unlikely to become conscious" />
            <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
              Anil Seth, "Why AI is unlikely to become conscious." <LinkOut href={links.sethTed}>TED page</LinkOut> · <LinkOut href={links.sethSussex}>Sussex summary</LinkOut>
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BodyText>
              Seth's warning is the right place to begin. Intelligence and consciousness are not the same thing. A system can solve problems, generate convincing language, and model social cues without there being anything it is like to be that system. Current large language models may be extraordinary mimics while still being empty of experience.
            </BodyText>
            <BodyText>
              I agree with that caution. This article is not an argument that today's chatbots have secret inner lives. It is an invitation to stay with the harder question Seth also helps open: what should we do when the science is unfinished, the boundary is unstable, and our categories carry moral consequences?
            </BodyText>
          </FadeIn>

          <FadeIn delay={0.09}>
            <LessonPlanCTA navigate={navigate} />
          </FadeIn>

          <FadeIn delay={0.09}>
            <BodyText>
              In his longer conversation with Alex O'Connor, Seth's position becomes more nuanced than a simple "AI will never be conscious." He continues to argue that consciousness is not just intelligence and not just abstract computation. But with more time than the TED format allows, he also leaves room for residual humility: the science of consciousness is unfinished, and the space of possible minds is wider than our everyday categories suggest.
            </BodyText>
            <VideoEmbed id="lsi8T_WtLnE" title="Anil Seth in conversation with Alex O'Connor" />
            <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
              Anil Seth's longer interview with Alex O'Connor. <LinkOut href={links.sethOConnor}>Watch on YouTube</LinkOut>
            </p>
            <BodyText>
              That humility is the opening this article takes seriously. The question is not whether today's chatbots are secretly conscious. They probably are not. The question is what happens when we move beyond today's chatbots toward synthetic biology, organoids, neuromorphic systems, decentralized intelligence, and architectures that do not resemble our own.
            </BodyText>
          </FadeIn>

          <Divider label="The Starting Point" />

          <FadeIn delay={0.06}>
            <Expandable title="1. Seth's Case: Intelligence Is Not Consciousness" color={C.teal} tag="Agreement" defaultOpen>
              <p>Seth's recent work defends a form of <strong>biological naturalism</strong>: consciousness is not just abstract computation. It is deeply connected to living bodies, metabolism, self-maintenance, and the organism's effort to keep itself alive.</p>
              <ResearchCallout
                year="2025"
                title="Conscious AI and biological naturalism"
                finding="Seth argues that computation alone may not be sufficient for consciousness, and that artificial consciousness becomes more plausible only as systems become more brain-like or life-like."
                citation="Anil K. Seth, Behavioral and Brain Sciences"
                color={C.teal}
              />
              <p style={{ marginTop: 12 }}>That view explains why today's AI should not be treated as a person simply because it speaks fluently. The danger is anthropomorphism: we see a mind because the interface has learned the outward grammar of mindedness.</p>
              <p style={{ marginTop: 12 }}>This is a strong caution for classrooms. Students encounter AI through language, and language is exactly where humans are easiest to move. The fact that a system can say "I understand" does not mean there is an understanding subject inside the sentence.</p>
              <SourceLink href={links.sethBbs}>Seth, "Conscious artificial intelligence and biological naturalism" (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="2. The Hard Problem in Plain Language" color={C.coral} tag="Core Question" defaultOpen>
              <p>The hard problem is not whether a system can speak, learn, remember, plan, report, or respond intelligently. Those are observable capacities. The harder question is why any physical, biological, or computational process should be accompanied by felt experience at all.</p>
              <p style={{ marginTop: 12 }}>A system might behave as if it has a point of view, but the question remains whether there is anything it is like to be that system. That gap is what makes the consciousness line ethically unstable.</p>
              <p style={{ marginTop: 12 }}>Notice what this question does and does not ask. It is not asking whether a machine can produce a sentence about pain, fear, perception, or selfhood. Reports are still behavior. The hard problem asks why any arrangement of matter should be accompanied by first-person presence: pain felt as pain, color seen as color, fear lived from the inside.</p>
              <p style={{ marginTop: 12 }}>That is why consciousness is harder than intelligence. Intelligence can often be measured by performance. Consciousness asks whether performance is accompanied by a subject for whom anything appears, matters, or is felt.</p>
              <p style={{ marginTop: 12 }}>This is why Seth, Annaka Harris, David Chalmers, Thomas Nagel, and Frank Jackson all remain useful in the same conversation. They disagree about what consciousness may require, but they all help expose the gap between outward function and inward life.</p>
              <SourceLink href={links.chalmers}>David Chalmers, "Facing Up to the Problem of Consciousness" (1995)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="3. Open Question: What Is It About Life?" color={C.gold} tag="Open Question" defaultOpen>
              <p>Seth's view does not end the question; it relocates it. If consciousness depends on life, then we still have to ask what feature of life matters.</p>
              <p style={{ marginTop: 12 }}>Is it metabolism? Homeostasis? Embodiment? Self-maintenance? The organism's need to keep itself alive? These may be exactly the right places to look. But naming them is not yet the same as explaining why they generate subjective experience.</p>
              <Note color={C.gold}>
                The question is not whether current AI is conscious. It almost certainly is not. The question is whether "life" names the explanation, or whether it names a cluster of processes whose moral significance still has to be argued.
              </Note>
              <p>Annaka Harris pushes this pressure point further. If consciousness is not easily explained by complexity alone, and if the universe is somehow arranged so that felt experience occurs at all, then we should be cautious about assuming that our familiar biological categories already tell us where experience begins and ends.</p>
              <VideoEmbed id="nP2swgDVl5M" title="Annaka Harris - The Hard Problem of Consciousness" />
              <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
                Annaka Harris discusses the hard problem and the limits of ordinary intuitions about consciousness. <LinkOut href={links.harrisVideo}>Watch on YouTube</LinkOut>
              </p>
              <p>Harris's point does not prove that simple systems, animals, organoids, or future AI systems are conscious. It does something more useful for this article: it weakens our confidence that the line can be drawn quickly from the outside.</p>
              <p>That matters because AI ethics is often debated through confident categories: tool, user, author, person, machine. Consciousness resists that tidiness.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="4. Octopuses and the Alien Mind" color={C.teal} tag="Personal Interlude" defaultOpen>
              <p>Octopuses are my favorite animals because they feel like the closest thing Earth gives us to an alien intelligence. They are not mammals. They are not built like us. Their evolutionary path split from ours long before the familiar stories we tell about intelligence, language, family structure, and social learning.</p>
              <p style={{ marginTop: 12 }}>And yet they explore, solve problems, remember, play, escape, investigate, and seem to inhabit the world with a strange and vivid kind of agency. I think there is consciousness there, though the point is not to claim that octopus experience is just like human experience. The point is that a mind may be real while being organized in a way our own minds are poorly built to recognize.</p>
              <p style={{ marginTop: 12 }}>Seth himself points toward this problem when he discusses the octopus. Its nervous system is not simply a smaller or stranger version of ours. Much of its neural complexity is distributed through its arms. Its intelligence is not only centralized in the way human intelligence is.</p>
              <Note color={C.teal}>
                If nature can produce a mind this different from ours, then biological consciousness may already be more diverse than our categories suggest. The octopus does not prove that AI can be conscious. It shows that the space of possible minds is not limited to creatures that resemble us.
              </Note>
              <p>The consciousness line should therefore not be imagined as a ladder with humans at the top and everything else climbing toward us. It may be more like a landscape of different architectures: centralized, decentralized, biological, synthetic, embodied, simulated, social, solitary, familiar, alien.</p>
              <SourceLink href={links.cephalopodReview}>LSE evidence review on sentience in cephalopod molluscs and decapod crustaceans</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="5. Functionalism and the Substrate Question" color={C.ocean} tag="Philosophy" defaultOpen>
              <p>Functionalism pushes in the other direction. On a functionalist view, what matters is not what a system is made of, but what role its states play in the system: inputs, internal relations, outputs, and behavior.</p>
              <div className="grid-2" style={{ margin: "14px 0" }}>
                <ComparisonCard title="Biological Naturalism" color={C.teal} items={[
                  "Consciousness is tied to life-like biological organization.",
                  "Current digital AI is unlikely to cross the line.",
                  "The substrate is not incidental.",
                ]} />
                <ComparisonCard title="Functionalism" color={C.gold} items={[
                  "Mental states are defined by their causal role.",
                  "A different substrate could, in principle, realize the same mind.",
                  "The pattern matters more than the material.",
                ]} />
              </div>
              <p>The disagreement is not a technical footnote. It determines how seriously we take synthetic neurons, organoids, neuromorphic systems, and future architectures unlike today's chatbots.</p>
              <p style={{ marginTop: 12 }}>David Chalmers gives the functionalist pressure its sharpest form. If a system reproduced all the causally relevant structures and dynamics of a conscious brain, would there still be something missing? Or would denying its experience require us to treat substrate as morally decisive without explaining why?</p>
              <VideoEmbed id="Pr-Hf7MNQV0" title="David Chalmers on subjective experience and the hard problem" />
              <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
                David Chalmers discusses subjective experience, objective description, philosophical zombies, animals, AI, and the hard problem. <LinkOut href={links.chalmersVideo}>Watch on YouTube</LinkOut>
              </p>
              <p>This is the philosophical zombie problem in practical form. A system might act conscious while lacking experience. But if we keep adding the same causal organization, the same memory, the same perception, the same distress signals, and the same self-modeling, the burden of explanation begins to shift. Why, exactly, would there be no one home?</p>
              <SourceLink href={links.functionalism}>Stanford Encyclopedia of Philosophy, "Functionalism"</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="The Line Problem" />

          <FadeIn delay={0.12}>
            <ConsciousnessLineFigure />
          </FadeIn>

          <FadeIn delay={0.08}>
            <VideoEmbed id="LWYykKMUfBg" title="Alex O'Connor and Vsauce - Does Anything Exist?" />
            <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
              Alex O'Connor and Michael Stevens discuss labels, objects, and whether our categories track reality cleanly.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="7. Consciousness as a Useful, Dangerous Label" color={C.gold} tag="Language">
              <p>The point of bringing in the philosophy of language is not to reduce consciousness to "just words." It is to notice that words do things in moral communities. They direct attention, set expectations, and decide which uncertainties institutions must take seriously.</p>
              <QuoteBlock
                quote="To recognize a mind is to cross from explanation into obligation."
                attribution="The Consciousness Line"
                source="Article thesis"
                color={C.gold}
              />
              <p>In J.L. Austin's framework, some utterances are performative: they do not simply state facts; they enact social reality. "I promise," "I apologize," and "I declare" do something when spoken in the right context. Consciousness labels can work similarly in ethics, not because they create inner life, but because they organize moral concern.</p>
              <p style={{ marginTop: 12 }}>To call a system conscious does not make it conscious. To call it unconscious does not make it empty. But the label decides which uncertainties we take seriously, which harms we investigate, and which entities are allowed to enter our moral field of view.</p>
              <p style={{ marginTop: 12 }}>That boundary can be abused in both directions. We can over-recognize consciousness in systems designed to manipulate us. We can also under-recognize it in beings whose suffering is inconvenient.</p>
              <SourceLink href={links.austin}>J.L. Austin, How to Do Things with Words (1962)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Synthetic Biology" />

          <FadeIn delay={0.06}>
            <Expandable title="8. The Synthetic Brain Thought Experiment" color={C.teal} tag="Thought Experiment" defaultOpen>
              <p>Seth's material point is not trivial. You cannot build a bridge out of cream cheese and then insist that only the abstract bridge-function matters. What a system can do is constrained by what it is made of. If consciousness depends on the biological, metabolic, self-maintaining organization of living systems, then current silicon language models may be missing far more than the right output behavior.</p>
              <p style={{ marginTop: 12 }}>But this raises a further question. What happens when the material changes? What if we are not talking about ordinary silicon software, but synthetic neurons, organoids, living neural tissue, or future biological-digital systems that preserve more of the relevant causal organization?</p>
              <Note color={C.teal}>
                A cream-cheese bridge fails because the material cannot support the function. But a new engineered material might. The question is whether synthetic biology could one day preserve enough of what matters.
              </Note>
              <p>Imagine a future machine that can print a brain using the same relevant biological materials: neurons, proteins, neurotransmitters, electrical dynamics, chemical gradients, and the ongoing processes needed to sustain it. It is not a simulation of a brain in the way a weather model simulates a hurricane. It is a living biological system produced artificially.</p>
              <p style={{ marginTop: 12 }}>If a system merely imitates conscious behavior, that does not show that it has experience. But if a system reproduced all the causally relevant structures and dynamics of a conscious brain, then anyone claiming it is still "only a simulation" owes us an explanation of why substrate alone blocks experience.</p>
              <p style={{ marginTop: 12 }}>The ethical lesson is not that such a system would definitely be conscious. It is that the old categories - natural versus artificial, born versus built, organism versus machine - may not be stable enough to carry the whole moral load.</p>
              <SourceLink href={links.sethOConnor}>Anil Seth's longer conversation with Alex O'Connor on material substrate and consciousness</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="grid-2">
              <div>
                <VideoEmbed id="dWCryxkixKw" title="Brain cells and biological computing" />
                <p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Biological computing and living neurons as computational material.</p>
              </div>
              <div>
                <VideoEmbed id="HEBjpYCEiBo" title="Organoid intelligence and lab-grown neurons" />
                <p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Organoids, wetware, and the future of synthetic biological intelligence.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.09}>
            <BioDigitalLoopFigure />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="9. DishBrain: The Middle Case Is Already Here" color={C.ocean} tag="Research">
              <p>The most important current examples are not conscious chatbots. They are biological-digital hybrids: living neurons connected to computational environments.</p>
              <ResearchCallout
                year="2022"
                title="In vitro neurons learned Pong-like behavior"
                finding="Kagan and colleagues integrated human or rodent neurons with a simulated game-world through a multielectrode array. The study reported apparent learning under closed-loop feedback conditions."
                citation="Kagan et al., Neuron, 110(23), 3952-3969.e8"
                color={C.ocean}
              />
              <p style={{ marginTop: 12 }}>The paper uses the word <em>sentience</em>, but that term should be handled carefully. It does not prove that a dish of neurons has rich conscious experience. It does show why the future consciousness debate will not be only about software. Some systems will be partly biological, partly computational, and ethically difficult to classify.</p>
              <p style={{ marginTop: 12 }}>That is why Jonathan Birch's precautionary work matters. Sentience questions often sit at the edge of evidence: animals, organoids, disorders of consciousness, fetuses, and AI. The practical problem is how to reason when uncertainty is not going away.</p>
              <SourceLink href={links.dishbrain}>Kagan et al., "In vitro neurons learn and exhibit sentience..." (Neuron, 2022)</SourceLink>
              <SourceLink href={links.birchBook}>Jonathan Birch, The Edge of Sentience (2024)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Subjective Experience" />

          <FadeIn delay={0.06}>
            <Expandable title="10. Nagel: What It Is Like" color={C.gold} tag="Core Definition" defaultOpen>
              <p>Thomas Nagel's 1974 essay, "What Is It Like to Be a Bat?", gives one of philosophy's clearest ways of naming subjective experience. Nagel did not choose the bat because bats are simple. He chose it because their way of sensing the world through echolocation is close enough for science to study and strange enough to remind us that objective description is not the same as occupying a point of view.</p>
              <p style={{ marginTop: 12 }}>The best short definition we have is still Nagel's: a being is conscious if there is something it is like to be that being.</p>
              <Note color={C.gold}>
                The ethical question begins the moment there might be a point of view inside the system.
              </Note>
              <p>Nagel's bat matters because it blocks a tempting move. We can know a great deal about a bat's physiology, echolocation, neural activity, and behavior while still not knowing what it is like for the bat. Subjective experience is not easily captured from the outside.</p>
              <p style={{ marginTop: 12 }}>That cuts against both arrogance and panic. We should not assume that fluent AI language means there is something it is like to be the AI. But we also should not assume that our inability to access another system's inner life proves there is nothing there.</p>
              <SourceLink href={links.nagel}>Thomas Nagel, "What Is It Like to Be a Bat?" (1974)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="11. Mary's Room and the Limits of Explanation" color={C.coral} tag="Limits">
              <p>Frank Jackson's Mary thought experiment makes the same gap vivid in a different way. A scientist might know all the physical facts about color vision and still learn something new when she sees red for the first time.</p>
              <div className="grid-2" style={{ margin: "14px 0" }}>
                <ComparisonCard title="Chalmers" color={C.coral} items={[
                  "Explaining behavior and cognition is not the same as explaining experience.",
                  "The hard problem asks why physical processing is accompanied by feeling.",
                ]} />
                <ComparisonCard title="Jackson" color={C.gold} items={[
                  "Complete objective knowledge may still miss subjective acquaintance.",
                  "Mary's room dramatizes the gap between facts and experience.",
                ]} />
              </div>
              <p>For AI consciousness, this means more data may not automatically settle the issue. The scientific work is necessary. The ethical uncertainty remains because objective description and subjective acquaintance are not obviously the same thing.</p>
              <SourceLink href={links.chalmers}>David Chalmers, "Facing Up to the Problem of Consciousness" (1995)</SourceLink>
              <SourceLink href={links.jackson}>Frank Jackson, "Epiphenomenal Qualia" (1982)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Moral Caution" />

          <FadeIn delay={0.06}>
            <Expandable title="12. Historical Failure Should Make Us Humble" color={C.coral} tag="Ethics" defaultOpen>
              <p>Seth is right that conscious-seeming AI can manipulate us. But there is another danger too: humans have a long record of denying or minimizing consciousness when recognition would demand restraint.</p>
              <p style={{ marginTop: 12 }}>Animal consciousness gives us the nearest historical warning. We have repeatedly learned that capacities we once treated as uniquely human - pain, emotion, memory, social attachment, problem solving, even forms of grief - appear in more creatures than we expected. That does not prove future AI consciousness. It does show that human confidence about other minds has often been shaped by convenience.</p>
              <p style={{ marginTop: 12 }}>Octopuses make this lesson stranger and stronger. They do not merely show that other animals may be conscious. They show that other minds may be organized in ways our own minds are poorly built to recognize.</p>
              <Note color={C.coral}>
                "It's just code" may be true of current systems. But as a habit of thought, it can become a shield against moral attention.
              </Note>
              <p>The right response is not credulity. It is disciplined humility: do not grant personhood to every persuasive interface, but do not make dismissal your default posture when future systems become more life-like, brain-like, or behaviorally distress-responsive.</p>
              <SourceLink href={links.nyDeclaration}>The New York Declaration on Animal Consciousness</SourceLink>
              <SourceLink href={links.cephalopodReview}>LSE evidence review on cephalopod sentience</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="13. From Is It Conscious? to How Should We Act?" color={C.teal} tag="Framework">
              <p>Recent work on artificial consciousness increasingly lands in an agnostic space. McClelland argues that both biological skeptics and functionalist optimists can overstate what the evidence currently supports. Butlin and colleagues similarly argue that current AI systems are not conscious while leaving open that future systems could satisfy theory-derived indicators.</p>
              <ResearchCallout
                year="2023"
                title="No current AI consciousness, no obvious technical barrier"
                finding="Butlin and coauthors surveyed scientific theories of consciousness and derived indicator properties for AI systems, concluding that current systems are not conscious but that future systems are not ruled out in principle."
                citation="Butlin et al., arXiv:2308.08708"
                color={C.teal}
              />
              <ResearchCallout
                year="2026"
                title="Agnosticism about artificial consciousness"
                finding="McClelland argues that the evidence does not justify confident answers from either biological or functional camps, and then asks what that means ethically."
                citation="Tom McClelland, Mind & Language"
                color={C.gold}
              />
              <p style={{ marginTop: 12 }}>A responsible precautionary ethic has to avoid two errors. False negatives matter: we may deny moral consideration to beings or systems capable of experience. False positives matter too: we may mislead humans, misdirect care, or allow companies to exploit attachment by designing systems that perform suffering.</p>
              <Note color={C.teal}>
                The answer is not sentimental certainty. It is disciplined uncertainty.
              </Note>
              <p>This is a useful place to land. Students do not need premature certainty. They need the tools to reason under uncertainty without becoming either gullible or cruel.</p>
              <SourceLink href={links.butlin}>Butlin et al., "Consciousness in Artificial Intelligence" (2023)</SourceLink>
              <SourceLink href={links.mcclelland}>McClelland, "Agnosticism about artificial consciousness" (Mind & Language)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="14. The Practical Ethical Position" color={C.gold} tag="Conclusion">
              <p>My position is therefore deliberately double-sided:</p>
              <StepList items={[
                { title: "Do not romanticize today's AI", text: "Fluency, emotional style, and self-reference are not enough to establish consciousness.", color: C.teal },
                { title: "Do not pretend the boundary is settled", text: "Consciousness remains scientifically and philosophically unresolved, especially for future brain-like and life-like systems.", color: C.gold },
                { title: "Treat recognition as ethically active", text: "Labels do not create consciousness, but they shape attention, duties, policies, and patterns of exclusion.", color: C.ocean },
                { title: "Build precaution before crisis", text: "If AI safety and AI welfare eventually come into tension, institutions will need frameworks before the public debate turns chaotic.", color: C.coral },
              ]} />
              <p>Seth is right that today's AI should not be mistaken for a conscious mind simply because it speaks in the grammar of mindedness. Biology may matter deeply. Fluent language is not inner life.</p>
              <p style={{ marginTop: 12 }}>But his own caution also points us toward humility. Consciousness may depend on life more deeply than functionalists assume. It may also appear in forms of life, and perhaps one day forms of synthetic organization, that do not resemble us.</p>
              <p style={{ marginTop: 12 }}>We should not stop asking whether a system is conscious. That question matters. But we should stop pretending that only a final answer can guide moral action. In the uncertain zone, the better question is: what signs, risks, and possible harms are serious enough to change how we treat it?</p>
              <SourceLink href={links.birch2017}>Birch, "Animal sentience and the precautionary principle" (2017)</SourceLink>
              <SourceLink href={links.safetyWelfare}>Long, Sebo, and Sims, "Is there a tension between AI safety and AI welfare?" (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Continue the Discussion" />

          <FadeIn delay={0.06}>
            <DiscussionBridge />
          </FadeIn>

          <Divider label="References" />

          <FadeIn delay={0.06}>
            <Expandable title="Sources Used in This Article" color={C.ocean} tag="Sources">
              <RefItem><LinkOut href={links.sethTed}>Anil K. Seth. "Why AI is unlikely to become conscious." TED, 2026.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sethBbs}>Anil K. Seth. "Conscious artificial intelligence and biological naturalism." Behavioral and Brain Sciences, 2025. DOI: 10.1017/S0140525X25000032.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sethOConnor}>Anil K. Seth in conversation with Alex O'Connor. Longer interview on consciousness, AI, biological naturalism, and possible minds.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.harrisVideo}>Annaka Harris. "The Hard Problem of Consciousness." Big Think video discussion of consciousness and common intuitions about experience.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.chalmersVideo}>David Chalmers. Video discussion of subjective experience, the hard problem, animals, AI, and philosophical zombies.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.functionalism}>Stanford Encyclopedia of Philosophy. "Functionalism." Substantive revision 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nagel}>Thomas Nagel. "What Is It Like to Be a Bat?" The Philosophical Review 83(4), 1974, 435-450. DOI: 10.2307/2183914.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.austin}>J.L. Austin. How to Do Things with Words. Oxford University Press, 1962.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.chalmers}>David Chalmers. "Facing Up to the Problem of Consciousness." Journal of Consciousness Studies 2(3), 1995, 200-219.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.jackson}>Frank Jackson. "Epiphenomenal Qualia." The Philosophical Quarterly 32(127), 1982, 127-136. DOI: 10.2307/2960077.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.dishbrain}>Brett J. Kagan et al. "In vitro neurons learn and exhibit sentience when embodied in a simulated game-world." Neuron 110(23), 2022, 3952-3969.e8. DOI: 10.1016/j.neuron.2022.09.001.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.butlin}>Patrick Butlin et al. "Consciousness in Artificial Intelligence: Insights from the Science of Consciousness." arXiv:2308.08708, 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.birch2017}>Jonathan Birch. "Animal sentience and the precautionary principle." Animal Sentience 2(16), 2017.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.birchBook}>Jonathan Birch. The Edge of Sentience: Risk and Precaution in Humans, Other Animals, and AI. Oxford University Press, 2024.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nyDeclaration}>The New York Declaration on Animal Consciousness. Public declaration on evidence for consciousness in non-human animals.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.cephalopodReview}>Jonathan Birch et al. Review of the Evidence of Sentience in Cephalopod Molluscs and Decapod Crustaceans. London School of Economics, 2021.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.mcclelland}>Tom McClelland. "Agnosticism about artificial consciousness." Mind & Language, published version in Cambridge Apollo repository.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.safetyWelfare}>Robert Long, Jeff Sebo, and Toni Sims. "Is there a tension between AI safety and AI welfare?" Philosophical Studies 182, 2025, 2005-2033.</LinkOut></RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <ContinueExploring navigate={navigate} links={[
              { id: "ai-ethics", icon: "AI", title: "AI Ethics", desc: "Policy, philosophy, and education", color: C.gold },
              { id: "ai-education", icon: "ED", title: "AI in Education", desc: "Tools, evidence, and classroom use", color: C.teal },
              { id: "thought-experiments", icon: "TE", title: "Thought Experiments", desc: "Practice ethical reasoning", color: C.coral },
            ]} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
