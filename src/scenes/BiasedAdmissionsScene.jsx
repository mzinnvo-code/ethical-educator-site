import { C } from "../theme.js";
import { HorizontalStage } from "./sceneBases.jsx";

export default function BiasedAdmissionsScene({ stage = 0, chose = [], mode }) {
  return (
    <HorizontalStage
      ariaLabel="A graduation cap on top of a sorting algorithm flowchart"
      caption={stage === 0 ? "Stage 1 · The pattern" : stage === 1 ? "Stage 2 · Whose 'fit'?" : "Reflection"}
      sky={
        <g transform="translate(300 60)">
          {/* graduation cap */}
          <polygon points="-30,0 0,-12 30,0 0,12" fill={C.midnight} stroke={C.gold} strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="14" stroke={C.gold} strokeWidth="1.5" />
          <line x1="0" y1="14" x2="14" y2="20" stroke={C.gold} strokeWidth="1.5" />
          <circle cx="14" cy="20" r="3" fill={C.gold} />
        </g>
      }
      ground={null}
      actors={
        <g>
          {/* funnel */}
          <path d="M 100 130 L 500 130 L 350 220 L 250 220 Z" fill={`${C.surface}`} stroke={C.gold} strokeWidth="2" />
          {/* applicants on top */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const x = 130 + i * 50;
            const color = i % 3 === 0 ? C.coral : C.teal;
            return (
              <circle key={i} cx={x} cy="120" r="8" fill={`${color}50`} stroke={color} strokeWidth="1.5" />
            );
          })}
          {/* accepted at bottom — pattern is biased */}
          {[0, 1, 2, 3].map(i => (
            <circle key={i} cx={270 + i * 22} cy="240" r="8" fill={`${C.teal}50`} stroke={C.teal} strokeWidth="1.5" />
          ))}
          {/* "fit" label inside funnel */}
          <text x="300" y="180" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fontWeight="700" fill={C.gold}>"fit"</text>
          {stage >= 1 && (
            <text x="300" y="196" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral} fontStyle="italic">whose definition?</text>
          )}
        </g>
      }
    />
  );
}
