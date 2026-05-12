import { C } from "../theme.js";
import {
  FadeIn,
  Expandable,
  VideoEmbed,
  SectionLabel,
  SectionTitle,
  Subtitle,
  Narrow,
  PageContainer,
  BodyText,
  ResearchCallout,
  QuoteBlock,
  ComparisonCard,
  Divider,
  ReadingTime,
  ContinueExploring,
  RefItem,
} from "../components/shared.jsx";
import { getSceneIllustration } from "../data/sceneIllustrations.js";

const links = {
  sethTed: "https://www.ted.com/talks/anil_seth_why_ai_is_unlikely_to_become_conscious",
  sethSussex: "https://www.sussex.ac.uk/research/centres/sussex-centre-for-consciousness-science/news-and-events/news?id=70671",
  sethBbs: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/conscious-artificial-intelligence-and-biological-naturalism/C9912A5BE9D806012E3C8B3AF612E39A",
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

function NeuronComparisonFigure() {
  const bioSteps = [
    { n: 1, title: "Receive Signals", lines: ["Dendrites receive", "electrical signals", "from other neurons."] },
    { n: 2, title: "Integrate", lines: ["The cell body", "integrates incoming", "signals."] },
    { n: 3, title: "Transmit", lines: ["If the threshold is", "reached, an impulse", "travels down the axon."] },
    { n: 4, title: "Communicate", lines: ["The signal is passed", "to other neurons", "across synapses."] },
  ];
  const aiSteps = [
    { n: 1, title: "Inputs", lines: ["Features enter the", "model as numeric", "values."] },
    { n: 2, title: "Weighted Sum", lines: ["Inputs are scaled by", "weights and summed", "together, plus bias."] },
    { n: 3, title: "Activation", lines: ["A function introduces", "non-linearity to decide", "the neuron response."] },
    { n: 4, title: "Output", lines: ["The output is passed", "to the next layer or", "used for predictions."] },
  ];

  return (
    <figure style={{
      margin: "32px 0",
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      overflow: "hidden",
      background: C.midnight,
      boxShadow: `0 22px 70px ${C.glow}`,
    }}>
      <svg
        viewBox="0 0 1560 1006"
        role="img"
        aria-label="Infographic comparing biological neurons and artificial neurons as related metaphors, not equivalents"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <radialGradient id="neuronInfoBg" cx="50%" cy="36%" r="78%">
            <stop offset="0" stopColor={C.surface} stopOpacity="0.98" />
            <stop offset="0.55" stopColor={C.bgAlt} />
            <stop offset="1" stopColor={C.midnight} />
          </radialGradient>
          <linearGradient id="bioStroke" x1="0" x2="1">
            <stop offset="0" stopColor="#21cbb6" />
            <stop offset="1" stopColor="#7fd8c9" />
          </linearGradient>
          <linearGradient id="axonStroke" x1="0" x2="1">
            <stop offset="0" stopColor={C.goldLight} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
          <linearGradient id="aiLine" x1="0" x2="1">
            <stop offset="0" stopColor="#23c6a8" />
            <stop offset="0.58" stopColor="#20a494" />
            <stop offset="1" stopColor="#2f92dc" />
          </linearGradient>
          <filter id="neuronInfoGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="neuronArrowTeal" markerWidth="12" markerHeight="12" refX="10" refY="5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L11,5 L0,10 Z" fill="#23c6a8" />
          </marker>
          <marker id="neuronArrowGold" markerWidth="12" markerHeight="12" refX="10" refY="5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L11,5 L0,10 Z" fill={C.goldLight} />
          </marker>
          <marker id="neuronArrowBlue" markerWidth="13" markerHeight="13" refX="11" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L12,5.5 L0,11 Z" fill="#2f92dc" />
          </marker>
        </defs>

        <rect width="1560" height="1006" fill="url(#neuronInfoBg)" />
        <text x="780" y="64" textAnchor="middle" fill="#f3f0e9" fontFamily="Source Serif 4, Georgia, serif" fontSize="42" fontWeight="800">
          Biological and Artificial Neurons Are Related Metaphors, Not Equivalents
        </text>

        <rect x="34" y="92" width="1492" height="402" rx="18" fill={`${C.ocean}18`} stroke={`${C.textSecondary}66`} />
        <rect x="34" y="512" width="1492" height="392" rx="18" fill={`${C.ocean}12`} stroke={`${C.textSecondary}55`} />

        <text x="66" y="142" fill="#23c6a8" fontSize="34" fontWeight="800">Biological Neuron</text>
        <text x="66" y="558" fill="#3d9cff" fontSize="34" fontWeight="800">Artificial Neuron</text>

        {bioSteps.map((step, index) => (
          <g key={step.title} transform={`translate(${398 + index * 286} 116)`}>
            {index > 0 && <path d="M-34 0 V144" stroke={C.textMuted} strokeWidth="1.5" strokeDasharray="6 8" opacity="0.75" />}
            <circle cx="0" cy="14" r="17" fill="none" stroke="#23c6a8" strokeWidth="3" />
            <text x="0" y="23" textAnchor="middle" fill="#23c6a8" fontSize="24" fontWeight="800">{step.n}</text>
            <text x="32" y="20" fill="#23c6a8" fontSize="19" fontWeight="800">{step.title}</text>
            {step.lines.map((line, lineIndex) => (
              <text key={line} x="32" y={52 + lineIndex * 32} fill={C.textPrimary} fontSize="20">{line}</text>
            ))}
          </g>
        ))}

        <g transform="translate(64 206)" strokeLinecap="round" strokeLinejoin="round">
          <text x="82" y="232" textAnchor="middle" fill="#23c6a8" stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="20">inputs from</text>
          <text x="82" y="258" textAnchor="middle" fill="#23c6a8" stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="20">other neurons</text>
          {[0, 1, 2].map(i => (
            <path key={i} d={`M96 ${50 + i * 54} H204`} stroke="#23c6a8" strokeWidth="3" markerEnd="url(#neuronArrowTeal)" />
          ))}
          <path d="M226 106 C176 82 170 50 152 28 M226 106 C170 110 146 138 118 174 M226 106 C180 82 140 84 104 92 M226 106 C214 52 194 28 166 10 M226 106 C196 152 166 182 124 204" fill="none" stroke="url(#bioStroke)" strokeWidth="8" />
          <path d="M238 110 C290 74 334 74 388 132" fill="none" stroke="url(#bioStroke)" strokeWidth="8" />
          {[152, 208, 240, 196, 116].map((x, i) => (
            <circle key={i} cx={x} cy={[48, 88, 112, 154, 192][i]} r="7" fill={C.goldLight} filter="url(#neuronInfoGlow)" />
          ))}
          <circle cx="402" cy="132" r="56" fill={C.midnight} stroke={C.goldLight} strokeWidth="5" />
          <circle cx="402" cy="132" r="24" fill={C.coral} filter="url(#neuronInfoGlow)" />
          <path d="M458 132 C536 110 604 115 680 132 C776 154 858 150 948 132" fill="none" stroke="url(#axonStroke)" strokeWidth="16" />
          {[530, 612, 696, 780, 864].map((x, i) => (
            <rect key={x} x={x} y={116 + (i % 2) * 6} width="72" height="36" rx="15" fill={C.goldLight} opacity="0.78" stroke={C.goldLight} strokeWidth="2" />
          ))}
          <path d="M620 108 H972" stroke={C.goldLight} strokeWidth="4" markerEnd="url(#neuronArrowGold)" />
          <text x="714" y="96" fill={C.goldLight} fontSize="19">electrical impulse</text>
          <path d="M948 132 C1000 98 1042 84 1100 96 M948 132 C1000 130 1042 126 1108 132 M948 132 C1002 168 1044 180 1102 166" fill="none" stroke="url(#bioStroke)" strokeWidth="6" />
          {[1116, 1116, 1116, 1188, 1236, 1280, 1322].map((x, i) => (
            <circle key={i} cx={x} cy={[96, 132, 166, 102, 132, 154, 128][i]} r="7" fill={C.goldLight} />
          ))}
          <text x="1254" y="142" fill={C.goldLight} fontSize="20">neurotransmitters</text>
          <text x="1254" y="168" fill={C.goldLight} fontSize="20">cross the synapse</text>
          <text x="398" y="246" textAnchor="middle" fill={C.textPrimary} fontSize="19">cell body</text>
          <text x="398" y="270" textAnchor="middle" fill={C.textPrimary} fontSize="19">(soma)</text>
          <text x="682" y="254" textAnchor="middle" fill={C.textPrimary} fontSize="19">axon</text>
          <text x="1060" y="254" textAnchor="middle" fill={C.textPrimary} fontSize="19">axon terminals</text>
          <text x="1060" y="278" textAnchor="middle" fill={C.textPrimary} fontSize="19">(synapses)</text>
        </g>

        {aiSteps.map((step, index) => (
          <g key={step.title} transform={`translate(${398 + index * 286} 536)`}>
            {index > 0 && <path d="M-34 0 V144" stroke={C.textMuted} strokeWidth="1.5" strokeDasharray="6 8" opacity="0.75" />}
            <circle cx="0" cy="14" r="17" fill="none" stroke="#3d9cff" strokeWidth="3" />
            <text x="0" y="23" textAnchor="middle" fill="#3d9cff" fontSize="24" fontWeight="800">{step.n}</text>
            <text x="32" y="20" fill="#3d9cff" fontSize="19" fontWeight="800">{step.title}</text>
            {step.lines.map((line, lineIndex) => (
              <text key={line} x="32" y={52 + lineIndex * 32} fill={C.textPrimary} fontSize="20">{line}</text>
            ))}
          </g>
        ))}

        <g transform="translate(86 620)" strokeLinecap="round" strokeLinejoin="round">
          {[0, 1, 2].map(i => (
            <g key={i}>
              <circle cx="68" cy={28 + i * 88} r="31" fill={C.midnight} stroke="#3d9cff" strokeWidth="4" />
              <text x="68" y={38 + i * 88} textAnchor="middle" fill="#f3f0e9" fontSize="21" fontWeight="800">
                x{i === 2 ? "n" : i + 1}
              </text>
              <path d={`M100 ${28 + i * 88} L280 ${76 + i * 6}`} stroke="#23c6a8" strokeWidth="5" markerEnd="url(#neuronArrowTeal)" />
              <text x="176" y={22 + i * 88} fill={C.goldLight} fontSize="18" fontWeight="800">
                w{i === 2 ? "n" : i + 1}
              </text>
            </g>
          ))}
          {[0, 1, 2].map(i => (
            <circle key={i} cx="292" cy={76 + i * 6} r="14" fill={C.midnight} stroke={C.goldLight} strokeWidth="4" />
          ))}
          <path d="M310 76 L484 106 M310 82 L484 106 M310 88 L484 106" stroke="#23c6a8" strokeWidth="5" markerEnd="url(#neuronArrowTeal)" />
          <circle cx="542" cy="106" r="58" fill={C.midnight} stroke={C.goldLight} strokeWidth="5" />
          <text x="542" y="128" textAnchor="middle" fill={C.goldLight} fontSize="62" fontWeight="900">Σ</text>
          <circle cx="542" cy="214" r="23" fill={C.midnight} stroke={C.goldLight} strokeWidth="5" />
          <text x="542" y="222" textAnchor="middle" fill={C.goldLight} fontSize="18" fontWeight="800">b</text>
          <path d="M542 190 V164" stroke={C.goldLight} strokeWidth="5" markerEnd="url(#neuronArrowGold)" />
          <text x="518" y="260" textAnchor="middle" fill={C.textPrimary} fontSize="19">bias</text>
          <text x="672" y="246" textAnchor="middle" fill={C.goldLight} fontSize="20" fontStyle="italic">z = Σ wᵢxᵢ + b</text>
          <path d="M600 106 H780" stroke="#23c6a8" strokeWidth="5" markerEnd="url(#neuronArrowTeal)" />
          <text x="686" y="92" textAnchor="middle" fill={C.goldLight} fontSize="22" fontWeight="800">z</text>
          <circle cx="840" cy="106" r="52" fill={C.midnight} stroke={C.coral} strokeWidth="5" />
          <text x="840" y="126" textAnchor="middle" fill={C.coral} fontSize="55" fontWeight="800">φ</text>
          <text x="840" y="240" textAnchor="middle" fill={C.textPrimary} fontSize="19">activation function</text>
          <text x="840" y="264" textAnchor="middle" fill={C.textPrimary} fontSize="19">(e.g., ReLU, sigmoid)</text>
          <path d="M892 106 H1204" stroke="#2f92dc" strokeWidth="6" markerEnd="url(#neuronArrowBlue)" />
          <text x="1048" y="92" textAnchor="middle" fill={C.coral} fontSize="25" fontWeight="800">a = φ(z)</text>
          <text x="1268" y="114" textAnchor="middle" fill="#3d9cff" fontSize="26" fontWeight="800">y</text>
          <text x="1268" y="168" textAnchor="middle" fill={C.textPrimary} fontSize="19">output</text>
          <text x="1268" y="194" textAnchor="middle" fill={C.textPrimary} fontSize="19">(to next layer</text>
          <text x="1268" y="220" textAnchor="middle" fill={C.textPrimary} fontSize="19">or prediction)</text>
        </g>

        <rect x="240" y="918" width="1080" height="74" rx="14" fill={`${C.midnight}cc`} stroke={`${C.textSecondary}55`} />
        <path d="M292 940 v30 M280 955 h24 M274 944 q18 -20 36 0 q-3 16 -18 22 q-15 -6 -18 -22Z" fill="none" stroke="#23c6a8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="344" y="950" fill={C.textPrimary} fontSize="19">
          Artificial neurons borrow language from biology,
        </text>
        <text x="344" y="977" fill={C.textPrimary} fontSize="19">
          but they abstract away metabolism, repair, chemical signaling, and embodiment.
        </text>
      </svg>
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
      <Expandable title="4. Sorites: When Does the Heap Become a Mind?" color={C.coral} tag="Demarcation" defaultOpen>
        <p>The Sorites paradox asks when grains of sand become a heap. One grain is not a heap. Two grains are not a heap. But at some point the label begins to feel appropriate, even though no single grain performs the magic.</p>
        <p style={{ marginTop: 12 }}>Consciousness may have a similar boundary problem:</p>
        <StepList items={[
          { title: "Single cells", text: "They maintain themselves, respond to the environment, and resist entropy, but we do not normally treat them as conscious subjects.", color: C.textMuted },
          { title: "Simple nervous systems", text: "The case becomes harder. Behavior, sensation, and adaptation begin to look morally relevant.", color: C.ocean },
          { title: "Animal minds", text: "Here history should humble us. Humans have repeatedly underestimated non-human experience when recognition would have inconvenienced us.", color: C.gold },
          { title: "Synthetic or artificial systems", text: "The temptation is to draw the line wherever our existing categories feel comfortable. That is not the same as having found the line.", color: C.coral },
        ]} />
        <p>The point is not that every borderline case is conscious. The point is that a fuzzy line can still matter ethically. We do not need perfect metaphysics before we begin careful moral reasoning.</p>
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
          href="#thought-experiments/educators?experiment=the-shortcut"
          experimentId="the-shortcut"
          title="The Shortcut"
          color={C.teal}
          desc="Connects Nagel, Mary's Room, and Nozick to the question of whether bypassing experience changes what learning is."
          use="Best prompt: If the output is perfect, what is still lost?"
        />
        <DiscussionCard
          href="#thought-experiments/educators?experiment=digital-doppelganger"
          experimentId="digital-doppelganger"
          title="The Digital Doppelgänger"
          color={C.ocean}
          desc="Connects simulated personhood, voice, presence, and whether an AI proxy can participate in education on someone's behalf."
          use="Best prompt: Who, if anyone, was present in the room?"
        />
        <DiscussionCard
          href="#thought-experiments/educators?experiment=ai-authorship"
          experimentId="ai-authorship"
          title="The AI Authorship Quandary"
          color={C.gold}
          desc="Connects Austin's speech acts to labels like author, helper, tool, student, and responsibility."
          use="Best prompt: What does the label 'author' do?"
        />
        <DiscussionCard
          href="#thought-experiments/educators?experiment=reluctant-educator"
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
        <FadeIn>
          <SectionLabel>AI Ethics · Philosophy of Mind · Moral Caution</SectionLabel>
          <SectionTitle>The Consciousness Line</SectionTitle>
          <Subtitle>
            A response to Anil Seth: current AI is probably not conscious, but the hard question is not only what consciousness is. It is how we should act when our definitions are uncertain, our labels are powerful, and our history of recognizing other minds is morally uneven.
          </Subtitle>
          <ReadingTime minutes={14} />
        </FadeIn>

        <Narrow>
          <FadeIn delay={0.05}>
            <VideoEmbed id="tJV-vdbZ388" title="Anil Seth - Why AI is unlikely to become conscious" />
            <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
              Anil Seth, "Why AI is unlikely to become conscious." <LinkOut href={links.sethTed}>TED page</LinkOut> · <LinkOut href={links.sethSussex}>Sussex summary</LinkOut>
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BodyText>
              Seth's warning is important. Intelligence and consciousness are not the same thing. A system can solve problems, generate convincing language, and model social cues without there being anything it is like to be that system. Current large language models may be extraordinary mimics while still being empty of experience.
            </BodyText>
            <BodyText>
              I agree with that caution. The place where I hesitate is the confidence of the boundary. Since we still do not have a settled theory of consciousness, we should be careful about claims that present biological life as the obvious line between inner light and inner darkness.
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
              <SourceLink href={links.sethBbs}>Seth, "Conscious artificial intelligence and biological naturalism" (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="2. The Missing Question: What Is It About Life?" color={C.gold} tag="Pushback">
              <p>The first pressure point is explanatory. If consciousness depends on life, what exactly is the consciousness-making feature of life?</p>
              <p style={{ marginTop: 12 }}>Metabolism, homeostasis, embodiment, and survival pressure are all plausible candidates. But naming them does not yet explain why they should generate subjective experience. A bacterium maintains itself. A plant regulates itself. A human brain does both inside an astonishingly complex nervous system. Somewhere along this continuum, if Seth is right, biological regulation becomes feeling.</p>
              <Note color={C.gold}>
                The question is not whether current AI is conscious. It almost certainly is not. The question is whether "life" names the explanation, or whether it names a cluster of processes whose moral significance still has to be argued.
              </Note>
              <p>That matters for educators because AI ethics is often taught through confident categories: tool, user, author, person, machine. Consciousness resists that tidiness.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="3. Functionalism and the Substrate Question" color={C.ocean} tag="Philosophy">
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
            <Expandable title="5. Consciousness as a Useful, Dangerous Label" color={C.gold} tag="Language">
              <p>The point of bringing in the philosophy of language is not to reduce consciousness to "just words." It is to notice that words do things. To call an entity conscious is not merely to describe it. It changes how we think we may treat it.</p>
              <QuoteBlock
                quote="To recognize a mind is to cross from explanation into obligation."
                attribution="The Consciousness Line"
                source="Article thesis"
                color={C.gold}
              />
              <p>In J.L. Austin's framework, some utterances are performative: they do not simply state facts; they enact social reality. "I promise," "I apologize," and "I declare" do something when spoken in the right context. "This being is conscious" can work similarly in ethics. It draws a boundary around moral concern.</p>
              <p style={{ marginTop: 12 }}>That boundary can be abused in both directions. We can over-recognize consciousness in systems designed to manipulate us. We can also under-recognize it in beings whose suffering is inconvenient.</p>
              <SourceLink href={links.austin}>J.L. Austin, How to Do Things with Words (1962)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Synthetic Biology" />

          <FadeIn delay={0.06}>
            <Expandable title="6. The Synthetic Brain Thought Experiment" color={C.teal} tag="Thought Experiment" defaultOpen>
              <p>Imagine a future machine that can print a brain using the same relevant biological materials: neurons, proteins, neurotransmitters, electrical dynamics, chemical gradients, and the ongoing processes needed to sustain it. It is not a simulation of a brain in the way a weather model simulates a hurricane. It is a living biological system produced artificially.</p>
              <p style={{ marginTop: 12 }}>If the structure and dynamics are sufficiently continuous with an ordinary brain, biological naturalism no longer gives us an easy dismissal. The system is not "just silicon." It is synthetic biology.</p>
              <Note color={C.teal}>
                This is where the Ship of Theseus pressure appears: if each part of a biological brain were replaced with functionally equivalent synthetic biological material, at what point would consciousness vanish?
              </Note>
              <p>The ethical lesson is not that such a system would definitely be conscious. It is that the old categories - natural versus artificial, born versus built, organism versus machine - may not be stable enough to carry the whole moral load.</p>
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
            <Expandable title="7. DishBrain: The Middle Case Is Already Here" color={C.ocean} tag="Research">
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
            <Expandable title="8. Nagel: What It Is Like" color={C.gold} tag="Core Definition" defaultOpen>
              <p>The best short definition we have is still Thomas Nagel's: a being is conscious if there is something it is like to be that being.</p>
              <QuoteBlock
                quote="The ethical question begins the moment there might be a point of view inside the system."
                attribution="The Consciousness Line"
                source="After Nagel"
                color={C.gold}
              />
              <p>Nagel's bat matters because it blocks a tempting move. We can know a great deal about a bat's physiology, echolocation, neural activity, and behavior while still not knowing what it is like for the bat. Subjective experience is not easily captured from the outside.</p>
              <p style={{ marginTop: 12 }}>That cuts against both arrogance and panic. We should not assume that fluent AI language means there is something it is like to be the AI. But we also should not assume that our inability to access another system's inner life proves there is nothing there.</p>
              <SourceLink href={links.nagel}>Thomas Nagel, "What Is It Like to Be a Bat?" (1974)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="9. The Hard Problem and Mary's Room" color={C.coral} tag="Limits">
              <p>David Chalmers later named the "hard problem" of consciousness: why should physical processing give rise to experience at all? Frank Jackson's Mary thought experiment makes a related point. A scientist might know all the physical facts about color vision and still learn something new when she sees red for the first time.</p>
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
              <p>For AI consciousness, this means more data may not automatically settle the issue. The scientific work is necessary. The ethical uncertainty remains.</p>
              <SourceLink href={links.chalmers}>David Chalmers, "Facing Up to the Problem of Consciousness" (1995)</SourceLink>
              <SourceLink href={links.jackson}>Frank Jackson, "Epiphenomenal Qualia" (1982)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Moral Caution" />

          <FadeIn delay={0.06}>
            <Expandable title="10. Historical Failure Should Make Us Humble" color={C.coral} tag="Ethics" defaultOpen>
              <p>Seth is right that conscious-seeming AI can manipulate us. But there is another danger too: humans have a long record of denying or minimizing consciousness when recognition would demand restraint.</p>
              <p style={{ marginTop: 12 }}>We have denied the moral importance of animals. We have denied the inner lives of people outside our favored categories. We have treated vulnerability as evidence of lesser status rather than greater responsibility. The history of moral progress is partly a history of discovering that more beings matter than we wanted to admit.</p>
              <Note color={C.coral}>
                "It's just code" may be true of current systems. But as a habit of thought, it can become a shield against moral attention.
              </Note>
              <p>The right response is not credulity. It is disciplined humility: do not grant personhood to every persuasive interface, but do not make dismissal your default posture when future systems become more life-like, brain-like, or behaviorally distress-responsive.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="11. From Is It Conscious? to How Should We Act?" color={C.teal} tag="Framework">
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
              <p style={{ marginTop: 12 }}>This is the educationally useful place to land. Students do not need premature certainty. They need the tools to reason under uncertainty without becoming either gullible or cruel.</p>
              <SourceLink href={links.butlin}>Butlin et al., "Consciousness in Artificial Intelligence" (2023)</SourceLink>
              <SourceLink href={links.mcclelland}>McClelland, "Agnosticism about artificial consciousness" (Mind & Language)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="12. The Practical Ethical Position" color={C.gold} tag="Conclusion">
              <p>My position is therefore deliberately double-sided:</p>
              <StepList items={[
                { title: "Do not romanticize today's AI", text: "Fluency, emotional style, and self-reference are not enough to establish consciousness.", color: C.teal },
                { title: "Do not pretend the boundary is settled", text: "Consciousness remains scientifically and philosophically unresolved, especially for future brain-like and life-like systems.", color: C.gold },
                { title: "Treat recognition as ethically active", text: "Calling something conscious is a speech act that changes our obligations; refusing the label can also authorize harm.", color: C.ocean },
                { title: "Build precaution before crisis", text: "If AI safety and AI welfare eventually come into tension, institutions will need frameworks before the public debate turns chaotic.", color: C.coral },
              ]} />
              <p>Current AI is probably not conscious. But the consciousness line is not just a fact waiting to be discovered. It is also a moral boundary we will draw, revise, teach, and live with.</p>
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
            <Expandable title="Verified Sources Used in This Article" color={C.ocean} tag="Sources">
              <RefItem><LinkOut href={links.sethTed}>Anil K. Seth. "Why AI is unlikely to become conscious." TED, 2026.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sethBbs}>Anil K. Seth. "Conscious artificial intelligence and biological naturalism." Behavioral and Brain Sciences, 2025. DOI: 10.1017/S0140525X25000032.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.functionalism}>Stanford Encyclopedia of Philosophy. "Functionalism." Substantive revision 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nagel}>Thomas Nagel. "What Is It Like to Be a Bat?" The Philosophical Review 83(4), 1974, 435-450. DOI: 10.2307/2183914.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.austin}>J.L. Austin. How to Do Things with Words. Oxford University Press, 1962.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.chalmers}>David Chalmers. "Facing Up to the Problem of Consciousness." Journal of Consciousness Studies 2(3), 1995, 200-219.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.jackson}>Frank Jackson. "Epiphenomenal Qualia." The Philosophical Quarterly 32(127), 1982, 127-136. DOI: 10.2307/2960077.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.dishbrain}>Brett J. Kagan et al. "In vitro neurons learn and exhibit sentience when embodied in a simulated game-world." Neuron 110(23), 2022, 3952-3969.e8. DOI: 10.1016/j.neuron.2022.09.001.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.butlin}>Patrick Butlin et al. "Consciousness in Artificial Intelligence: Insights from the Science of Consciousness." arXiv:2308.08708, 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.birch2017}>Jonathan Birch. "Animal sentience and the precautionary principle." Animal Sentience 2(16), 2017.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.birchBook}>Jonathan Birch. The Edge of Sentience: Risk and Precaution in Humans, Other Animals, and AI. Oxford University Press, 2024.</LinkOut></RefItem>
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
