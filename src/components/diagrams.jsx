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

// ─── EXPERIMENT SCENE ILLUSTRATIONS ───────────────────────────────────────────

export function ShortcutScene() {
  return (
    <svg viewBox="0 0 420 148" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto 20px" }}
      role="img" aria-label="A fork in the road: the long winding path of traditional learning versus a direct shortcut">
      <rect width="420" height="148" rx="12" fill={C.bg} />

      {/* Road fork: common base */}
      <path d="M210 140 L210 100" stroke={C.textMuted} strokeWidth="14" strokeLinecap="round" opacity="0.18" />

      {/* Left branch: winding traditional path */}
      <path d="M210 100 Q160 88 130 72 Q100 56 110 38 Q120 22 150 24"
        fill="none" stroke={C.sand} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* Waypoints on long path */}
      {[
        { cx: 152, cy: 88, label: "Confusion" },
        { cx: 112, cy: 56, label: "Practice" },
        { cx: 140, cy: 28, label: "Mastery" },
      ].map((pt, i) => (
        <g key={i}>
          <circle cx={pt.cx} cy={pt.cy} r="5" fill={C.sand} opacity="0.6" />
          <text x={pt.cx - 22} y={pt.cy - 8} fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.textMuted}>{pt.label}</text>
        </g>
      ))}
      <text x="92" y="108" fontFamily="'Source Serif 4', Georgia, serif" fontSize="10" fill={C.sand} opacity="0.9">The long way</text>

      {/* Right branch: straight shortcut */}
      <path d="M210 100 L285 28" fill="none" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
      {/* Lightning bolt on shortcut */}
      <polygon points="275,70 265,82 272,82 262,96 278,78 270,78" fill={C.teal} opacity="0.9" />
      <text x="288" y="40" fontFamily="'Source Serif 4', Georgia, serif" fontSize="10" fill={C.teal}>Shortcut</text>
      <text x="288" y="52" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.textMuted}>instant mastery</text>

      {/* Figure at fork */}
      <circle cx="210" cy="112" r="7" fill="none" stroke={C.textSecondary} strokeWidth="1.5" />
      <line x1="210" y1="119" x2="210" y2="134" stroke={C.textSecondary} strokeWidth="1.5" />
      <line x1="204" y1="124" x2="216" y2="124" stroke={C.textSecondary} strokeWidth="1.5" />
      <line x1="210" y1="134" x2="204" y2="144" stroke={C.textSecondary} strokeWidth="1.5" />
      <line x1="210" y1="134" x2="216" y2="144" stroke={C.textSecondary} strokeWidth="1.5" />

      {/* Question mark above figure */}
      <text x="217" y="108" fontFamily="'Source Serif 4', Georgia, serif" fontSize="12" fill={C.gold} fontWeight="700">?</text>
    </svg>
  );
}

export function AuthorshipScene() {
  return (
    <svg viewBox="0 0 420 148" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto 20px" }}
      role="img" aria-label="A student, an AI chat interface, and an essay — the question of authorship">
      <rect width="420" height="148" rx="12" fill={C.bg} />

      {/* Student silhouette — left */}
      <circle cx="80" cy="42" r="14" fill="none" stroke={C.teal} strokeWidth="2" />
      <path d="M66 70 Q80 58 94 70 L98 110 L62 110 Z" fill={`${C.teal}20`} stroke={C.teal} strokeWidth="1.5" />
      <text x="80" y="130" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.teal}>Student</text>

      {/* Arrow: student → AI */}
      <line x1="100" y1="80" x2="148" y2="80" stroke={C.teal} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.6" />
      <polygon points="148,76 156,80 148,84" fill={C.teal} opacity="0.6" />

      {/* AI screen — center */}
      <rect x="158" y="28" width="104" height="88" rx="8" fill={`${C.sky}12`} stroke={C.sky} strokeWidth="1.5" />
      <rect x="158" y="28" width="104" height="16" rx="8" fill={`${C.sky}30`} />
      <text x="210" y="40" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={C.sky} fontWeight="600">AI</text>
      {/* Chat lines */}
      {[52, 64, 76, 88, 100].map((y, i) => (
        <rect key={i} x={i % 2 === 0 ? 168 : 186} y={y} width={i % 2 === 0 ? 56 : 44} height="6" rx="3"
          fill={i % 2 === 0 ? `${C.sky}40` : `${C.teal}30`} />
      ))}
      <text x="210" y="128" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.sky}>AI Chat</text>

      {/* Arrow: AI → essay */}
      <line x1="264" y1="80" x2="308" y2="80" stroke={C.gold} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.6" />
      <polygon points="308,76 316,80 308,84" fill={C.gold} opacity="0.6" />

      {/* Essay — right */}
      <rect x="318" y="28" width="74" height="96" rx="5" fill={`${C.gold}10`} stroke={C.gold} strokeWidth="1.5" />
      {[44, 54, 64, 74, 84, 94, 104].map((y, i) => (
        <rect key={i} x="328" y={y} width={i === 0 ? 54 : 44} height="5" rx="2" fill={`${C.gold}30`} />
      ))}
      {/* Big question mark on essay */}
      <text x="355" y="36" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="22" fill={C.gold} fontWeight="700" opacity="0.5">?</text>
      <text x="355" y="130" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold}>Essay</text>

      {/* Authorship label */}
      <text x="210" y="16" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.textMuted} fontStyle="italic">Who is the author?</text>
    </svg>
  );
}

export function ReluctantScene() {
  return (
    <svg viewBox="0 0 420 148" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto 20px" }}
      role="img" aria-label="Two classrooms side by side: Mr. Jennings at a chalkboard on the left, Ms. Chen with AI screens on the right">
      <rect width="420" height="148" rx="12" fill={C.bg} />

      {/* Dividing line */}
      <line x1="210" y1="14" x2="210" y2="138" stroke={C.border} strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="210" y="10" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="7.5" fill={C.textMuted}>same school · same subject</text>

      {/* LEFT: Mr. Jennings — chalkboard */}
      <rect x="20" y="24" width="168" height="90" rx="8" fill={`${C.teal}08`} stroke={C.teal} strokeWidth="1" />
      {/* Chalkboard */}
      <rect x="36" y="34" width="90" height="56" rx="4" fill="rgba(26,90,50,0.3)" stroke={`${C.teal}60`} strokeWidth="1" />
      {/* Chalk text lines */}
      {[46, 54, 62, 70, 78].map((y) => (
        <line key={y} x1="44" x2={y === 46 ? 116 : 108} y1={y} y2={y} stroke={C.textMuted} strokeWidth="1" opacity="0.5" />
      ))}
      {/* Teacher figure */}
      <circle cx="148" cy="46" r="9" fill="none" stroke={C.teal} strokeWidth="1.5" />
      <path d="M140 60 Q148 54 156 60 L158 90 L138 90 Z" fill={`${C.teal}18`} stroke={C.teal} strokeWidth="1.2" />
      <line x1="148" y1="60" x2="130" y2="72" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" />
      <text x="100" y="106" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="9.5" fill={C.teal}>Mr. Jennings</text>
      <text x="100" y="118" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={C.textMuted}>Socratic dialogue</text>

      {/* RIGHT: Ms. Chen — AI screens */}
      <rect x="232" y="24" width="168" height="90" rx="8" fill={`${C.coral}06`} stroke={C.coral} strokeWidth="1" />
      {/* Three small screens */}
      {[240, 290, 340].map((x, i) => (
        <g key={i}>
          <rect x={x} y="34" width="42" height="32" rx="4" fill={`${C.sky}14`} stroke={C.sky} strokeWidth="1" />
          {/* Mini bar chart */}
          {[0, 1, 2, 3].map((b) => (
            <rect key={b} x={x + 6 + b * 8} y={34 + 32 - 6 - (b * 4 + 4 + i * 3)} width="5" height={6 + b * 4 + i * 3}
              rx="1" fill={C.sky} opacity="0.6" />
          ))}
        </g>
      ))}
      {/* Teacher figure */}
      <circle cx="380" cy="80" r="9" fill="none" stroke={C.coral} strokeWidth="1.5" />
      <path d="M372 94 Q380 88 388 94 L390 114 L370 114 Z" fill={`${C.coral}18`} stroke={C.coral} strokeWidth="1.2" />
      <text x="316" y="106" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="9.5" fill={C.coral}>Ms. Chen</text>
      <text x="316" y="118" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={C.textMuted}>AI-integrated</text>

      {/* Score labels bottom */}
      <text x="100" y="134" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={C.teal} opacity="0.8">Critical thinking ↑</text>
      <text x="316" y="134" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={C.coral} opacity="0.8">Test scores ↑</text>
    </svg>
  );
}

export function DoppelgangerScene() {
  return (
    <svg viewBox="0 0 420 148" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto 20px" }}
      role="img" aria-label="Two overlapping human silhouettes — a real teacher and their indistinguishable AI double">
      <rect width="420" height="148" rx="12" fill={C.bg} />

      {/* Glow behind digital copy */}
      <ellipse cx="240" cy="80" rx="48" ry="58" fill={`${C.ocean}14`} />

      {/* Digital copy (right, translucent) */}
      <circle cx="240" cy="38" r="18" fill="none" stroke={C.ocean} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
      <path d="M222 62 Q240 50 258 62 L264 118 L216 118 Z" fill={`${C.ocean}10`} stroke={C.ocean} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
      {/* Circuit lines on digital */}
      <line x1="240" y1="38" x2="252" y2="30" stroke={C.ocean} strokeWidth="1" opacity="0.5" />
      <line x1="252" y1="30" x2="258" y2="22" stroke={C.ocean} strokeWidth="1" opacity="0.5" />
      <circle cx="258" cy="22" r="2" fill={C.ocean} opacity="0.6" />
      <line x1="240" y1="38" x2="228" y2="28" stroke={C.ocean} strokeWidth="1" opacity="0.5" />
      <circle cx="228" cy="28" r="2" fill={C.ocean} opacity="0.6" />
      <text x="240" y="136" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.ocean} opacity="0.8">AI Agent</text>

      {/* Real teacher (left, solid) */}
      <circle cx="188" cy="38" r="18" fill={`${C.textSecondary}18`} stroke={C.textSecondary} strokeWidth="2" />
      <path d="M170 62 Q188 50 206 62 L212 118 L164 118 Z" fill={`${C.textSecondary}14`} stroke={C.textSecondary} strokeWidth="2" />
      <text x="188" y="136" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.textSecondary}>Mr. Torres</text>

      {/* Overlap zone glow */}
      <ellipse cx="214" cy="78" rx="14" ry="38" fill={`${C.gold}08`} />

      {/* Question: who attended? */}
      <text x="340" y="52" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fill={C.gold} fontWeight="600">Who</text>
      <text x="340" y="66" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fill={C.gold} fontWeight="600">attended</text>
      <text x="340" y="80" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fill={C.gold} fontWeight="600">class?</text>
      <line x1="310" y1="68" x2="270" y2="72" stroke={C.gold} strokeWidth="1" opacity="0.4" />

      {/* Identical label */}
      <text x="84" y="72" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={C.textMuted} fontStyle="italic">indistinguishable</text>
      <line x1="120" y1="70" x2="156" y2="68" stroke={C.textMuted} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
