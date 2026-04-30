import { C } from "../theme.js";
import { HorizontalStage, Stickfigure } from "./sceneBases.jsx";

// Stages:
// 0 setup        — trolley approaching fork, 5 figures left, 1 right
// 1 footbridge   — same trolley, but a single stranger on a bridge above; pushing them stops it
// 2 synthesis    — both diagrams side-by-side annotated
export default function TrolleyScene({ stage = 0, chose = [], mode }) {
  if (stage === 1) return <FootbridgeStage chose={chose} />;
  if (stage === 2) return <ComparisonStage chose={chose} />;
  return <ForkStage chose={chose} />;
}

function ForkStage({ chose }) {
  const choiceA = chose[0]?.lens === "utilitarian"; // pulled lever
  const choiceB = chose[0]?.lens === "deontological"; // didn't pull
  return (
    <HorizontalStage
      ariaLabel="A trolley moves down a track toward five figures; a side track has one figure"
      caption="Stage 1 · The fork"
      sky={
        <g>
          <line x1="0" y1="170" x2="600" y2="170" stroke={C.border} strokeWidth="1" strokeDasharray="3 4" />
        </g>
      }
      ground={
        <g>
          {/* main track */}
          <line x1="40" y1="240" x2={choiceA ? 400 : 560} y2={choiceA ? 240 : 240} stroke={C.textMuted} strokeWidth="3" opacity="0.4" />
          <line x1="40" y1="246" x2={choiceA ? 400 : 560} y2={choiceA ? 246 : 246} stroke={C.textMuted} strokeWidth="3" opacity="0.4" />
          {/* fork */}
          <line x1="380" y1="240" x2="560" y2="200" stroke={choiceA ? C.coral : C.textMuted} strokeWidth="3" opacity={choiceA ? "0.95" : "0.4"} />
          <line x1="380" y1="246" x2="560" y2="206" stroke={choiceA ? C.coral : C.textMuted} strokeWidth="3" opacity={choiceA ? "0.95" : "0.4"} />
          {/* lever */}
          <g transform={`translate(330 200) rotate(${choiceA ? 30 : -20})`}>
            <line x1="0" y1="0" x2="0" y2="-30" stroke={C.gold} strokeWidth="3" />
            <circle cx="0" cy="-32" r="4" fill={C.gold} />
          </g>
          <text x="330" y="218" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold} textAnchor="middle">lever</text>
        </g>
      }
      actors={
        <g>
          {/* trolley */}
          <g transform={`translate(${choiceA || choiceB ? 320 : 130} 210)`}>
            <rect x="-26" y="-22" width="52" height="22" rx="4" fill={C.coral} opacity="0.85" />
            <rect x="-22" y="-18" width="14" height="10" rx="1" fill={`${C.midnight}cc`} />
            <rect x="-2" y="-18" width="14" height="10" rx="1" fill={`${C.midnight}cc`} />
            <circle cx="-16" cy="6" r="5" fill={C.midnight} stroke={C.coral} strokeWidth="1.5" />
            <circle cx="16" cy="6" r="5" fill={C.midnight} stroke={C.coral} strokeWidth="1.5" />
          </g>

          {/* five figures (main track) */}
          {[0, 1, 2, 3, 4].map(i => (
            <Stickfigure key={i} x={460 + i * 18} y={224} scale={0.9} color={choiceA ? C.textSecondary : C.coral} />
          ))}

          {/* one figure (side track) */}
          <Stickfigure x={530} y={184} scale={0.9} color={choiceA ? C.coral : C.textSecondary} />

          {/* labels */}
          <text x="500" y="280" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={choiceA ? C.textSecondary : C.coral} textAnchor="middle">5 workers</text>
          <text x="540" y="172" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={choiceA ? C.coral : C.textSecondary} textAnchor="middle">1 worker</text>
        </g>
      }
    />
  );
}

function FootbridgeStage({ chose }) {
  const pushed = chose[1]?.lens === "utilitarian";
  return (
    <HorizontalStage
      ariaLabel="A trolley approaches; a stranger stands on a footbridge above; pushing the stranger would stop the trolley"
      caption="Stage 2 · The footbridge"
      sky={null}
      ground={
        <g>
          <line x1="40" y1="240" x2="560" y2="240" stroke={C.textMuted} strokeWidth="3" opacity="0.5" />
          <line x1="40" y1="246" x2="560" y2="246" stroke={C.textMuted} strokeWidth="3" opacity="0.5" />
          {/* footbridge */}
          <line x1="280" y1="120" x2="420" y2="120" stroke={C.gold} strokeWidth="3" />
          <line x1="280" y1="120" x2="280" y2="240" stroke={C.gold} strokeWidth="2" />
          <line x1="420" y1="120" x2="420" y2="240" stroke={C.gold} strokeWidth="2" />
        </g>
      }
      actors={
        <g>
          {/* trolley */}
          <g transform={`translate(${pushed ? 230 : 120} 210)`}>
            <rect x="-26" y="-22" width="52" height="22" rx="4" fill={C.coral} opacity="0.85" />
            <circle cx="-16" cy="6" r="5" fill={C.midnight} stroke={C.coral} strokeWidth="1.5" />
            <circle cx="16" cy="6" r="5" fill={C.midnight} stroke={C.coral} strokeWidth="1.5" />
          </g>
          {/* stranger on bridge — falls if pushed */}
          {pushed
            ? <Stickfigure x={250} y={200} scale={0.9} color={C.coral} />
            : <Stickfigure x={350} y={92} scale={0.9} color={C.gold} />
          }
          {/* five figures down the line */}
          {[0, 1, 2, 3, 4].map(i => (
            <Stickfigure key={i} x={460 + i * 18} y={224} scale={0.9} color={pushed ? C.textSecondary : C.coral} />
          ))}
          <text x="500" y="280" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={pushed ? C.textSecondary : C.coral} textAnchor="middle">still 5</text>
          <text x="350" y="80" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={pushed ? C.coral : C.gold} textAnchor="middle">{pushed ? "(pushed)" : "stranger"}</text>
        </g>
      }
    />
  );
}

function ComparisonStage({ chose }) {
  const a = chose[0]?.lens;
  const b = chose[1]?.lens;
  const consistent = a === b;
  return (
    <HorizontalStage
      ariaLabel="Side-by-side comparison of the lever choice and the footbridge choice"
      caption={consistent ? "Consistent — same logic both times" : "Your intuition shifted between cases"}
      sky={
        <g>
          <text x="150" y="40" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fill={C.gold} fontWeight="700" textAnchor="middle">The lever</text>
          <text x="450" y="40" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fill={C.gold} fontWeight="700" textAnchor="middle">The footbridge</text>
        </g>
      }
      ground={null}
      actors={
        <g>
          {/* Mini-diagrams */}
          <g transform="translate(150 130)">
            <rect x="-100" y="-40" width="200" height="120" rx="10" fill={`${C.surface}`} stroke={a === "utilitarian" ? C.teal : C.coral} strokeWidth="2" />
            <text x="0" y="-12" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>1 dies</text>
            <text x="0" y="20" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>5 saved</text>
            <text x="0" y="56" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fill={a === "utilitarian" ? C.teal : C.coral} fontWeight="700">
              {a === "utilitarian" ? "Pulled" : a === "deontological" ? "Didn't pull" : "—"}
            </text>
          </g>
          <g transform="translate(450 130)">
            <rect x="-100" y="-40" width="200" height="120" rx="10" fill={`${C.surface}`} stroke={b === "utilitarian" ? C.teal : C.coral} strokeWidth="2" />
            <text x="0" y="-12" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>1 dies</text>
            <text x="0" y="20" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.textSecondary}>5 saved</text>
            <text x="0" y="56" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fill={b === "utilitarian" ? C.teal : C.coral} fontWeight="700">
              {b === "utilitarian" ? "Pushed" : b === "deontological" ? "Didn't push" : "—"}
            </text>
          </g>
          {/* arrow connecting them */}
          <path d="M 250 130 Q 300 100 350 130" fill="none" stroke={consistent ? C.teal : C.coral} strokeWidth="2" strokeDasharray="4 4" />
          <text x="300" y="98" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={consistent ? C.teal : C.coral} fontStyle="italic">
            {consistent ? "same answer" : "different answer"}
          </text>
        </g>
      }
    />
  );
}
