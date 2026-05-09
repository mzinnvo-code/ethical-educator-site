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
  return (
    <FigureShell
      label="Visualization"
      title="Biological and Artificial Neurons Are Related Metaphors, Not Equivalents"
      caption="The artificial neuron borrows language from biology, but it abstracts away metabolism, cellular repair, chemical signaling, and embodiment."
    >
      <svg viewBox="0 0 720 440" role="img" aria-label="Comparison of a biological neuron and an artificial neuron" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="neuronPanel" x1="0" x2="1">
            <stop offset="0" stopColor={C.ocean} stopOpacity="0.16" />
            <stop offset="1" stopColor={C.teal} stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="axonGlow" x1="0" x2="1">
            <stop offset="0" stopColor={C.gold} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="22" y="24" width="676" height="188" rx="18" fill="url(#neuronPanel)" stroke={C.border} />
        <rect x="22" y="226" width="676" height="190" rx="18" fill="url(#neuronPanel)" stroke={C.border} />

        <text x="360" y="54" textAnchor="middle" fill={C.textPrimary} fontFamily="Source Serif 4, Georgia, serif" fontSize="22" fontWeight="700">Biological Neuron</text>
        <text x="360" y="256" textAnchor="middle" fill={C.textPrimary} fontFamily="Source Serif 4, Georgia, serif" fontSize="22" fontWeight="700">Artificial Neuron</text>

        <g transform="translate(72 76)" strokeLinecap="round" strokeLinejoin="round">
          <path d="M83 56 C51 28 28 18 12 8 M83 56 C48 61 27 79 10 104 M83 56 C53 45 33 48 17 55 M83 56 C61 76 55 101 46 132 M83 56 C82 31 78 14 71 -2" fill="none" stroke={C.teal} strokeWidth="8" />
          <circle cx="100" cy="66" r="28" fill={C.midnight} stroke={C.gold} strokeWidth="4" />
          <circle cx="100" cy="66" r="12" fill={C.coral} filter="url(#softGlow)" />
          <path d="M127 66 C176 42 220 45 259 68 C300 92 338 88 376 67" fill="none" stroke="url(#axonGlow)" strokeWidth="14" />
          {[164, 201, 238, 278, 318].map((x, i) => (
            <rect key={x} x={x} y={52 + (i % 2) * 7} width="33" height="26" rx="12" fill={i % 2 ? C.coral : C.gold} opacity="0.82" />
          ))}
          <path d="M376 67 C404 50 421 38 444 26 M376 67 C405 80 424 96 450 113" fill="none" stroke={C.teal} strokeWidth="5" />
          {[0, 1, 2, 3, 4].map(i => (
            <circle key={i} cx={492 + i * 17} cy={38 + (i % 2) * 42} r="5" fill={C.gold} opacity="0.9" />
          ))}
          <text x="76" y="136" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">dendrites</text>
          <text x="184" y="126" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">axon</text>
          <text x="438" y="142" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">signals</text>
        </g>

        <g transform="translate(76 286)" strokeLinecap="round" strokeLinejoin="round">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="28" cy={14 + i * 47} r="20" fill={C.midnight} stroke={C.ocean} strokeWidth="4" />
              <text x="28" y={20 + i * 47} textAnchor="middle" fill={C.textPrimary} fontSize="15" fontWeight="700">x{i === 2 ? "n" : i + 1}</text>
              <path d={`M49 ${14 + i * 47} L215 61`} stroke={C.teal} strokeWidth="5" />
              <text x="88" y={10 + i * 47} fill={C.gold} fontSize="14" fontWeight="700">w{i === 2 ? "n" : i + 1}</text>
            </g>
          ))}
          <circle cx="244" cy="61" r="35" fill={C.midnight} stroke={C.gold} strokeWidth="5" />
          <text x="244" y="73" textAnchor="middle" fill={C.goldLight} fontSize="38" fontWeight="700">Σ</text>
          <path d="M279 61 L342 61" stroke={C.teal} strokeWidth="6" />
          <circle cx="384" cy="61" r="28" fill={C.midnight} stroke={C.coral} strokeWidth="5" />
          <text x="384" y="70" textAnchor="middle" fill={C.coral} fontSize="27" fontWeight="700">φ</text>
          <path d="M412 61 L540 61" stroke={C.ocean} strokeWidth="8" />
          <path d="M540 61 L515 43 M540 61 L515 79" stroke={C.ocean} strokeWidth="8" />
          <circle cx="244" cy="128" r="14" fill={C.midnight} stroke={C.gold} strokeWidth="4" />
          <text x="244" y="133" textAnchor="middle" fill={C.goldLight} fontSize="13" fontWeight="700">b</text>
          <path d="M244 114 L244 98" stroke={C.gold} strokeWidth="4" />
          <text x="202" y="119" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">bias</text>
          <text x="204" y="21" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">weighted sum</text>
          <text x="338" y="21" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">activation</text>
          <text x="552" y="67" fill={C.textMuted} stroke={C.midnight} strokeWidth="5" paintOrder="stroke" fontSize="14">output</text>
        </g>
      </svg>
    </FigureShell>
  );
}

function ConsciousnessLineFigure() {
  const nodes = [
    { x: 78, y: 112, label: "cell", color: C.textMuted },
    { x: 196, y: 92, label: "organism", color: C.ocean },
    { x: 316, y: 78, label: "animal mind", color: C.teal },
    { x: 442, y: 104, label: "organoid", color: C.gold },
    { x: 570, y: 80, label: "synthetic brain", color: C.coral },
  ];
  return (
    <FigureShell
      label="Visualization"
      title="The Consciousness Line Is More Like a Fuzzy Zone"
      caption="The article's demarcation claim: a boundary can be ethically important even when it is not sharp enough to locate with one decisive test."
    >
      <svg viewBox="0 0 720 230" role="img" aria-label="A fuzzy consciousness boundary from cells to synthetic brains" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="1">
            <stop offset="0" stopColor={C.textMuted} />
            <stop offset="0.38" stopColor={C.teal} />
            <stop offset="0.7" stopColor={C.gold} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
          <radialGradient id="fuzzyZone">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.3" />
            <stop offset="1" stopColor={C.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="28" y="28" width="664" height="164" rx="18" fill={`${C.midnight}`} stroke={C.border} />
        <ellipse cx="440" cy="104" rx="190" ry="72" fill="url(#fuzzyZone)" />
        <path d="M78 112 C180 63 268 86 360 88 C459 90 522 115 618 70" fill="none" stroke="url(#lineGradient)" strokeWidth="7" strokeLinecap="round" />
        <path d="M258 160 L592 160" stroke={C.gold} strokeWidth="2" strokeDasharray="6 8" opacity="0.8" />
        <text x="425" y="181" textAnchor="middle" fill={C.gold} fontSize="14" fontWeight="700">uncertain moral zone</text>
        {nodes.map(node => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="18" fill={C.midnight} stroke={node.color} strokeWidth="4" />
            <circle cx={node.x} cy={node.y} r="6" fill={node.color} />
            <text x={node.x} y={node.y + 38} textAnchor="middle" fill={C.textSecondary} fontSize="13">{node.label}</text>
          </g>
        ))}
        <text x="74" y="66" fill={C.textMuted} fontSize="13">not enough</text>
        <text x="604" y="42" fill={C.textMuted} fontSize="13">harder to dismiss</text>
      </svg>
    </FigureShell>
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
