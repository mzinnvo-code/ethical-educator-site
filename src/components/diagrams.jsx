import { C } from "../theme.js";

export function DualProcessDiagram() {
  const s1 = C.coral;
  const s2 = C.teal;
  const mj = C.gold;

  return (
    <svg
      viewBox="0 0 600 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 600, display: "block", margin: "24px auto" }}
      role="img"
      aria-label="Dual-process theory diagram: System 1 (fast, emotional) and System 2 (slow, deliberative) both feed into Moral Judgment"
    >
      {/* Background */}
      <rect width="600" height="280" rx="12" fill={C.bg} />

      {/* System 1 box */}
      <rect x="16" y="24" width="198" height="168" rx="10" fill={`${s1}18`} stroke={s1} strokeWidth="1.5" />
      <text x="115" y="50" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="15" fontWeight="700" fill={s1}>System 1</text>
      <text x="115" y="68" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10.5" fontWeight="600" fill={s1} letterSpacing="0.06em" textTransform="uppercase">Fast · Emotional</text>
      <line x1="40" y1="78" x2="190" y2="78" stroke={`${s1}40`} strokeWidth="1" />
      <text x="115" y="100" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Intuitive responses</text>
      <text x="115" y="118" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Amygdala · vmPFC</text>
      <text x="115" y="136" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Evolved heuristics</text>
      <text x="115" y="156" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Deontological pull</text>
      <text x="115" y="178" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">Greene (2001, 2004)</text>

      {/* System 2 box */}
      <rect x="386" y="24" width="198" height="168" rx="10" fill={`${s2}18`} stroke={s2} strokeWidth="1.5" />
      <text x="485" y="50" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="15" fontWeight="700" fill={s2}>System 2</text>
      <text x="485" y="68" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10.5" fontWeight="600" fill={s2} letterSpacing="0.06em">Slow · Deliberative</text>
      <line x1="410" y1="78" x2="560" y2="78" stroke={`${s2}40`} strokeWidth="1" />
      <text x="485" y="100" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Rational calculation</text>
      <text x="485" y="118" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Prefrontal cortex</text>
      <text x="485" y="136" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Cost-benefit analysis</text>
      <text x="485" y="156" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>Utilitarian pull</text>
      <text x="485" y="178" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">fMRI evidence</text>

      {/* Moral Judgment box */}
      <rect x="202" y="204" width="196" height="58" rx="10" fill={`${mj}18`} stroke={mj} strokeWidth="1.5" />
      <text x="300" y="228" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={mj}>Moral Judgment</text>
      <text x="300" y="248" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10.5" fill={C.textSecondary}>The output of both systems</text>

      {/* Arrows from S1 → MJ */}
      <defs>
        <marker id="arrowS1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={s1} />
        </marker>
        <marker id="arrowS2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={s2} />
        </marker>
      </defs>
      <line x1="150" y1="193" x2="238" y2="208" stroke={s1} strokeWidth="1.5" markerEnd="url(#arrowS1)" />
      <line x1="450" y1="193" x2="362" y2="208" stroke={s2} strokeWidth="1.5" markerEnd="url(#arrowS2)" />

      {/* Tension label in center */}
      <text x="300" y="150" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">tension</text>
      <line x1="220" y1="108" x2="278" y2="108" stroke={C.textMuted} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="322" y1="108" x2="380" y2="108" stroke={C.textMuted} strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

const TIMELINE_EVENTS = [
  { year: "2021", label: "UNESCO\nRecommendation", color: C.teal, note: "First global AI ethics standard" },
  { year: "2023", label: "UNESCO\nGuidance", color: C.sky, note: "Generative AI in education" },
  { year: "2024", label: "EU AI Act", color: C.coral, note: "Education = high risk" },
  { year: "Sept 2025", label: "UNESCO\nFrameworks", color: C.gold, note: "Teacher & student competencies" },
  { year: "2026", label: "NYC Traffic\nLight Policy", color: C.greenLight, note: "Red · Yellow · Green zones" },
];

export function PolicyTimelineDiagram() {
  const totalWidth = 600;
  const svgHeight = 220;
  const lineY = 100;
  const dotR = 8;
  const count = TIMELINE_EVENTS.length;
  const margin = 56;
  const step = (totalWidth - margin * 2) / (count - 1);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: totalWidth, display: "block", margin: "24px auto" }}
      role="img"
      aria-label="Policy timeline diagram: key AI-in-education milestones from 2021 UNESCO Recommendation through 2026 NYC traffic-light policy"
    >
      <rect width={totalWidth} height={svgHeight} rx="12" fill={C.bg} />

      {/* Spine line */}
      <line x1={margin} y1={lineY} x2={totalWidth - margin} y2={lineY} stroke={C.border} strokeWidth="2" />

      {TIMELINE_EVENTS.map((ev, i) => {
        const x = margin + i * step;
        const isAbove = i % 2 === 0;
        const labelLines = ev.label.split("\n");
        const labelY = isAbove ? lineY - 20 : lineY + 22;
        const noteY = isAbove ? lineY - 20 - labelLines.length * 14 - 6 : lineY + 22 + labelLines.length * 14 + 14;
        const yearY = isAbove ? lineY + 18 : lineY - 10;

        return (
          <g key={i}>
            {/* Tick line */}
            <line
              x1={x} y1={isAbove ? lineY - 14 : lineY + 2}
              x2={x} y2={isAbove ? lineY - 2 : lineY + 14}
              stroke={ev.color} strokeWidth="1.5"
            />
            {/* Dot */}
            <circle cx={x} cy={lineY} r={dotR} fill={`${ev.color}28`} stroke={ev.color} strokeWidth="2" />

            {/* Year label */}
            <text
              x={x} y={yearY}
              textAnchor="middle"
              fontFamily="'DM Sans', sans-serif"
              fontSize="9"
              fontWeight="700"
              fill={ev.color}
              letterSpacing="0.04em"
            >{ev.year}</text>

            {/* Event label (possibly two lines) */}
            {labelLines.map((line, li) => (
              <text
                key={li}
                x={x} y={labelY + li * 14}
                textAnchor="middle"
                fontFamily="'Source Serif 4', Georgia, serif"
                fontSize="11"
                fontWeight="600"
                fill={C.textPrimary}
              >{line}</text>
            ))}

            {/* Note */}
            <text
              x={x} y={noteY}
              textAnchor="middle"
              fontFamily="'DM Sans', sans-serif"
              fontSize="9.5"
              fill={C.textMuted}
              fontStyle="italic"
            >{ev.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

const THINKERS = [
  { name: "Plato",      year: "c. 380 BCE", tradition: "Virtue & Forms" },
  { name: "Aristotle",  year: "c. 340 BCE", tradition: "Habituation" },
  { name: "Dewey",      year: "1938",        tradition: "Pragmatism" },
  { name: "Nozick",     year: "1974",        tradition: "Experience Machine" },
  { name: "Jackson",    year: "1982",        tradition: "Mary's Room" },
  { name: "Searle",     year: "1980",        tradition: "Chinese Room" },
  { name: "Huxley",     year: "1932",        tradition: "Brave New World" },
  { name: "Lemire",     year: "2025",        tradition: "Practice & Understanding" },
];

export function ConvergenceDiagram() {
  const cx = 300;
  const cy = 210;
  const r = 150;
  const svgH = 450;

  return (
    <svg
      viewBox={`0 0 600 ${svgH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 600, display: "block", margin: "24px auto" }}
      role="img"
      aria-label="Convergence diagram: eight thinkers from across 2,400 years all point toward the central thesis that process is constitutive of value"
    >
      <rect width="600" height={svgH} rx="12" fill={C.bg} />

      {/* Spoke lines */}
      {THINKERS.map((t, i) => {
        const angle = (i / THINKERS.length) * 2 * Math.PI - Math.PI / 2;
        const nx = cx + r * Math.cos(angle);
        const ny = cy + r * Math.sin(angle);
        return (
          <line key={i} x1={cx} y1={cy} x2={nx} y2={ny}
            stroke={C.border} strokeWidth="1" strokeDasharray="4 3" />
        );
      })}

      {/* Thinker nodes */}
      {THINKERS.map((t, i) => {
        const angle = (i / THINKERS.length) * 2 * Math.PI - Math.PI / 2;
        const nx = cx + r * Math.cos(angle);
        const ny = cy + r * Math.sin(angle);
        // Label offset outward
        const lx = cx + (r + 46) * Math.cos(angle);
        const ly = cy + (r + 46) * Math.sin(angle);
        const colors = [C.coral, C.coral, C.teal, C.ocean, C.sky, C.gold, C.sand, C.greenLight];
        const col = colors[i % colors.length];

        return (
          <g key={i}>
            <circle cx={nx} cy={ny} r="20" fill={`${col}20`} stroke={col} strokeWidth="1.5" />
            <text x={nx} y={ny - 4} textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="10" fontWeight="700" fill={col}>{t.name}</text>
            <text x={nx} y={ny + 8} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.textMuted}>{t.year}</text>
            {/* Tradition label outside the circle */}
            <text x={lx} y={ly} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.textSecondary} fontStyle="italic">{t.tradition}</text>
          </g>
        );
      })}

      {/* Central thesis */}
      <circle cx={cx} cy={cy} r="58" fill={`${C.gold}14`} stroke={C.gold} strokeWidth="2" />
      <text x={cx} y={cy - 18} textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fontWeight="700" fill={C.gold}>Process is</text>
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fontWeight="700" fill={C.gold}>constitutive</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fontWeight="700" fill={C.gold}>of value</text>
      <text x={cx} y={cy + 28} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.textMuted} fontStyle="italic">The Convergence</text>

      {/* Caption */}
      <text x={cx} y={svgH - 14} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">
        Eight independent traditions across 2,400 years arrive at the same conclusion
      </text>
    </svg>
  );
}
