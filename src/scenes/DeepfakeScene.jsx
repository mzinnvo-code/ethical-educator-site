import { C } from "../theme.js";
import { HorizontalStage } from "./sceneBases.jsx";

export default function DeepfakeScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const flagged = stage >= 1 && (lens === "free-speech" || lens === "civic-literacy");
  const removed = stage >= 1 && lens === "precautionary";
  return (
    <HorizontalStage
      ariaLabel="Two faces of a candidate side by side; the right one is subtly distorted"
      caption={stage === 0 ? "Stage 1 · Two videos" : stage === 1 ? "Stage 2 · Election eve" : "Reflection"}
      sky={null}
      ground={null}
      actors={
        <g>
          {/* two faces */}
          {[
            { x: 200, real: true },
            { x: 400, real: false },
          ].map(({ x, real }, i) => (
            <g key={i} transform={`translate(${x} 130)`}>
              <rect x="-60" y="-44" width="120" height="100" rx="6" fill={C.surface} stroke={real ? C.teal : (removed ? C.coral : flagged ? C.gold : C.coral)} strokeWidth={real ? 2 : 2.5} />
              {/* face */}
              <circle cx="0" cy="0" r="22" fill={`${C.sand}40`} />
              <circle cx="-7" cy="-3" r="2" fill={C.midnight} />
              <circle cx={real ? 7 : 8} cy="-3" r="2" fill={C.midnight} />
              <path d={real ? "M -7 8 Q 0 14 7 8" : "M -7 12 Q 0 6 7 12"} fill="none" stroke={C.midnight} strokeWidth="1.4" />
              {!real && (
                <line x1="-22" y1="-22" x2="22" y2="22" stroke={C.coral} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.7" />
              )}
              <text x="0" y="46" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={real ? C.teal : C.coral}>{real ? "REAL" : "FAKE"}</text>

              {/* label / overlay */}
              {!real && (
                <g transform="translate(0 -56)">
                  <rect x="-46" y="-10" width="92" height="20" rx="10" fill={removed ? C.coral : flagged ? C.gold : C.surface} stroke={removed ? C.coral : flagged ? C.gold : C.coral} strokeWidth="1.5" />
                  <text x="0" y="4" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="700" fill={removed ? "#fff" : flagged ? C.midnight : C.coral}>
                    {removed ? "REMOVED" : flagged ? "FLAGGED" : "VIRAL"}
                  </text>
                </g>
              )}
            </g>
          ))}
          {/* clock — election eve */}
          {stage === 1 && (
            <g transform="translate(300 250)">
              <circle cx="0" cy="0" r="20" fill="none" stroke={C.gold} strokeWidth="2" />
              <line x1="0" y1="0" x2="0" y2="-12" stroke={C.gold} strokeWidth="2" />
              <line x1="0" y1="0" x2="-9" y2="0" stroke={C.gold} strokeWidth="2" />
              <text x="0" y="38" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.gold} fontStyle="italic">election in 24h</text>
            </g>
          )}
        </g>
      }
    />
  );
}
