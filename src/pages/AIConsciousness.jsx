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

function ConsciousnessLineFigure() {
  const nodes = [
    { x: 84, color: "#9fb0c0" },
    { x: 160, color: "#9fb0c0" },
    { x: 250, color: "#9fb0c0" },
    { x: 390, color: C.sky },
    { x: 530, color: C.teal },
    { x: 700, color: C.greenLight },
    { x: 860, color: C.goldLight },
    { x: 1030, color: C.goldLight },
    { x: 1190, color: C.coral },
    { x: 1340, color: C.coral },
    { x: 1460, color: C.coral },
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
        viewBox="0 0 1560 520"
        role="img"
        aria-label="A fuzzy consciousness line with an uncertain moral zone between clearly not conscious and clearly conscious cases"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <radialGradient id="fuzzyLineBg" cx="50%" cy="52%" r="72%">
            <stop offset="0" stopColor={C.surface} stopOpacity="0.98" />
            <stop offset="0.62" stopColor={C.bgAlt} />
            <stop offset="1" stopColor={C.midnight} />
          </radialGradient>
          <linearGradient id="fuzzyAxis" x1="0" x2="1">
            <stop offset="0" stopColor="#9fb0c0" />
            <stop offset="0.28" stopColor={C.sky} />
            <stop offset="0.44" stopColor={C.teal} />
            <stop offset="0.62" stopColor={C.goldLight} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
          <radialGradient id="moralZoneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={C.goldLight} stopOpacity="0.28" />
            <stop offset="0.55" stopColor={C.teal} stopOpacity="0.14" />
            <stop offset="1" stopColor={C.coral} stopOpacity="0" />
          </radialGradient>
          <filter id="fuzzyIconGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1560" height="520" fill="url(#fuzzyLineBg)" />
        <rect x="36" y="36" width="1488" height="448" rx="20" fill={`${C.midnight}66`} stroke={`${C.textSecondary}55`} />
        <text x="780" y="78" textAnchor="middle" fill="#f3f0e9" fontFamily="Source Serif 4, Georgia, serif" fontSize="34" fontWeight="800">
          The Consciousness Line Is a Fuzzy Zone
        </text>

        <ellipse cx="790" cy="264" rx="490" ry="118" fill="url(#moralZoneGlow)" />
        <ellipse cx="790" cy="264" rx="490" ry="118" fill="none" stroke={C.goldLight} strokeWidth="2" strokeDasharray="2 12" opacity="0.9" />
        <ellipse cx="790" cy="264" rx="490" ry="118" fill="none" stroke={C.sky} strokeWidth="1.5" strokeDasharray="2 12" opacity="0.55" transform="rotate(-4 790 264)" />

        <text x="130" y="154" textAnchor="middle" fill={C.textPrimary} fontSize="22">Clearly</text>
        <text x="130" y="181" textAnchor="middle" fill={C.textPrimary} fontSize="22">not conscious</text>
        <text x="1394" y="154" textAnchor="middle" fill={C.textPrimary} fontSize="22">Clearly</text>
        <text x="1394" y="181" textAnchor="middle" fill={C.textPrimary} fontSize="22">conscious</text>
        <text x="780" y="214" textAnchor="middle" fill={C.goldLight} fontSize="23" fontWeight="800">uncertain moral zone</text>

        <line x1="82" y1="300" x2="1470" y2="300" stroke="url(#fuzzyAxis)" strokeWidth="7" strokeLinecap="round" />
        {nodes.map(node => (
          <circle key={node.x} cx={node.x} cy="300" r="10" fill={node.color} filter="url(#fuzzyIconGlow)" />
        ))}

        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          <g transform="translate(84 232)" stroke="#9fb0c0" strokeWidth="5">
            <circle cx="0" cy="38" r="18" />
            <circle cx="0" cy="38" r="7" />
          </g>
          <g transform="translate(160 230)" stroke="#9fb0c0" strokeWidth="4">
            <ellipse cx="0" cy="38" rx="23" ry="14" transform="rotate(-20)" />
            {[0, 1, 2, 3, 4, 5].map(i => (
              <path key={i} d={`M${-28 + i * 11} ${22 + (i % 2) * 28} l${i % 2 ? -12 : 12} ${i % 2 ? 10 : -10}`} />
            ))}
          </g>
          <g transform="translate(250 226)" stroke="#9fb0c0" strokeWidth="4">
            <circle cx="0" cy="40" r="10" />
            <path d="M-8 34 C-42 18 -48 2 -56 -14 M-6 42 C-40 46 -52 60 -66 78 M8 36 C42 20 48 4 58 -12 M8 44 C38 58 52 66 68 76" />
          </g>
          <g transform="translate(390 250)" stroke={C.sky} strokeWidth="5">
            <path d="M-42 26 C-18 0 10 0 36 26 S86 52 106 26" />
          </g>
          <g transform="translate(530 230)" stroke={C.teal} strokeWidth="4">
            <ellipse cx="0" cy="42" rx="30" ry="18" />
            <circle cx="-16" cy="38" r="5" fill={C.teal} />
            <circle cx="18" cy="38" r="5" fill={C.teal} />
            <path d="M-24 28 L-44 12 M0 24 V2 M24 28 L44 12 M-24 56 L-44 72 M0 60 V82 M24 56 L44 72" />
          </g>
          <g transform="translate(700 232)" stroke={C.greenLight} strokeWidth="5">
            <path d="M-42 38 C-8 4 52 10 74 38 C48 66 -10 72 -42 38Z" />
            <path d="M74 38 L102 20 L102 56 Z" />
            <circle cx="26" cy="33" r="4" fill={C.greenLight} />
          </g>
          <g transform="translate(860 220)" stroke={C.goldLight} strokeWidth="5">
            <path d="M0 34 C-24 34 -40 52 -32 76 C-12 70 6 72 28 82 C28 58 18 42 0 34Z" fill="none" />
            <circle cx="-2" cy="30" r="12" />
            <path d="M-16 42 L-34 22 M-4 84 V104 M18 84 L36 102 M-22 86 L-42 102" />
          </g>
          <g transform="translate(1030 224)" stroke={C.goldLight} strokeWidth="5">
            <circle cx="0" cy="42" r="36" />
            <circle cx="-14" cy="36" r="4" fill={C.goldLight} />
            <circle cx="14" cy="36" r="4" fill={C.goldLight} />
            <path d="M-18 55 C-6 68 10 68 22 55 M-32 46 C-52 48 -58 70 -42 82 M32 46 C52 48 58 70 42 82" />
          </g>
          <g transform="translate(1190 220)" stroke={C.coral} strokeWidth="5">
            <path d="M12 16 C-30 28 -46 66 -20 96 H36 M12 16 C56 28 66 66 44 92" />
            <path d="M-8 52 H22 M-4 72 H28" />
          </g>
          <g transform="translate(1340 222)" stroke={C.coral} strokeWidth="5">
            <rect x="-34" y="20" width="68" height="72" rx="14" />
            <path d="M0 20 V4 M-20 92 V112 M20 92 V112" />
            <circle cx="-13" cy="52" r="4" fill={C.coral} />
            <circle cx="13" cy="52" r="4" fill={C.coral} />
            <path d="M-16 72 H16" />
          </g>
          <g transform="translate(1460 222)" stroke={C.coral} strokeWidth="5">
            <rect x="-32" y="18" width="64" height="64" rx="14" />
            <path d="M-18 0 V18 M0 0 V18 M18 0 V18 M-18 82 V100 M0 82 V100 M18 82 V100 M-50 36 H-32 M-50 62 H-32 M32 36 H50 M32 62 H50" />
            <path d="M-14 48 H14 M0 34 V64" />
          </g>
        </g>

        <line x1="780" y1="318" x2="780" y2="390" stroke={C.goldLight} strokeWidth="2" strokeDasharray="7 8" opacity="0.8" />
        <text x="780" y="398" textAnchor="middle" fill={C.textPrimary} fontSize="18">no sharp boundary</text>
        <text x="780" y="423" textAnchor="middle" fill={C.textPrimary} fontSize="18">only gradual change</text>

        <rect x="194" y="440" width="1172" height="56" rx="14" fill={`${C.midnight}cc`} stroke={`${C.textSecondary}55`} />
        <path d="M250 456 v24 M238 470 h24 M232 460 q18 -20 36 0 q-3 16 -18 22 q-15 -6 -18 -22Z" fill="none" stroke="#23c6a8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="292" y="475" fill={C.textPrimary} fontSize="19">
          Ethically important questions often live in the uncertain middle. The task is careful reasoning, not a premature cutoff.
        </text>
      </svg>
    </figure>
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

function RecognitionFigure() {
  return (
    <FigureShell
      label="Visualization"
      title="Labels Do Ethical Work"
      caption="Austin's point, translated into AI ethics: the words we choose can exclude a system from concern or trigger precautionary duties."
    >
      <svg viewBox="0 0 720 280" role="img" aria-label="Speech acts moving from labels to ethical obligations" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <marker id="speechArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill={C.teal} />
          </marker>
        </defs>
        <rect x="34" y="40" width="652" height="176" rx="20" fill={C.midnight} stroke={C.border} />
        <g transform="translate(64 88)">
          <rect x="0" y="0" width="170" height="70" rx="12" fill={`${C.coral}14`} stroke={`${C.coral}66`} />
          <text x="85" y="30" textAnchor="middle" fill={C.textPrimary} fontSize="18" fontWeight="700">"just code"</text>
          <text x="85" y="53" textAnchor="middle" fill={C.textMuted} fontSize="13">permits dismissal</text>
        </g>
        <g transform="translate(274 76)">
          <circle cx="86" cy="47" r="44" fill={`${C.gold}18`} stroke={C.gold} strokeWidth="3" />
          <text x="86" y="40" textAnchor="middle" fill={C.gold} fontSize="15" fontWeight="700">speech</text>
          <text x="86" y="60" textAnchor="middle" fill={C.gold} fontSize="15" fontWeight="700">act</text>
        </g>
        <g transform="translate(486 88)">
          <rect x="0" y="0" width="170" height="70" rx="12" fill={`${C.teal}14`} stroke={`${C.teal}66`} />
          <text x="85" y="30" textAnchor="middle" fill={C.textPrimary} fontSize="18" fontWeight="700">"possible subject"</text>
          <text x="85" y="53" textAnchor="middle" fill={C.textMuted} fontSize="13">triggers caution</text>
        </g>
        <path d="M238 123 H274" stroke={C.teal} strokeWidth="4" markerEnd="url(#speechArrow)" />
        <path d="M404 123 H482" stroke={C.teal} strokeWidth="4" markerEnd="url(#speechArrow)" />
        <path d="M570 164 C546 216 422 236 360 206 C294 236 172 216 146 164" fill="none" stroke={C.gold} strokeWidth="3" strokeDasharray="6 8" />
        <text x="360" y="236" textAnchor="middle" fill={C.gold} fontSize="14" fontWeight="700">the moral boundary moves with recognition</text>
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

          <FadeIn delay={0.1}>
            <NeuronComparisonFigure />
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

          <FadeIn delay={0.12}>
            <ConsciousnessLineFigure />
          </FadeIn>

          <Divider label="The Line Problem" />

          <FadeIn delay={0.06}>
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

          <FadeIn delay={0.12}>
            <RecognitionFigure />
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
