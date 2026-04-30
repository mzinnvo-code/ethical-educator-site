import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function ChineseRoomScene({ stage = 0, chose = [], mode }) {
  return (
    <ContainerScene
      ariaLabel="A door with Chinese characters slipping under it; a person inside flips through a giant rule book"
      label={stage === 0 ? "The room" : stage === 1 ? "The reply" : "Reflection"}
      sublabel={stage === 0 ? "An English speaker, a rule book, characters under the door." : null}
      exterior={
        <g>
          {/* outsider speaking Chinese */}
          <g transform="translate(540 160)">
            <circle cx="0" cy="-20" r="12" fill="none" stroke={C.gold} strokeWidth="2" />
            <path d="M-10 -8 Q0 -16 10 -8 L12 30 L-12 30 Z" fill={`${C.gold}30`} stroke={C.gold} strokeWidth="1.5" />
          </g>
          {/* speech bubble outside */}
          <g transform="translate(550 90)">
            <ellipse cx="0" cy="0" rx="32" ry="16" fill={C.surface} stroke={C.gold} strokeWidth="1.5" />
            <text x="0" y="6" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="20" fill={C.gold} fontWeight="700">语?</text>
          </g>
        </g>
      }
      boundary={
        <g>
          <rect x="80" y="60" width="380" height="200" rx="6" fill={C.surface} stroke={C.border} strokeWidth="2" />
          {/* door */}
          <rect x="440" y="160" width="44" height="100" fill={C.surface} stroke={C.gold} strokeWidth="2" />
          <line x1="440" y1="220" x2="484" y2="220" stroke={C.gold} strokeWidth="1" />
          {/* slot under door with character coming through */}
          <rect x="440" y="240" width="44" height="6" fill={C.midnight} />
          <text x="462" y="248" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fill={C.coral} fontWeight="700">中</text>
        </g>
      }
      interior={
        <g>
          {/* person inside */}
          <g transform="translate(180 180)">
            <circle cx="0" cy="-20" r="12" fill="none" stroke={C.teal} strokeWidth="2" />
            <path d="M-10 -8 Q0 -16 10 -8 L12 30 L-12 30 Z" fill={`${C.teal}30`} stroke={C.teal} strokeWidth="1.5" />
          </g>
          {/* giant rule book */}
          <g transform="translate(310 200)">
            <rect x="-50" y="-50" width="100" height="60" rx="3" fill={`${C.gold}25`} stroke={C.gold} strokeWidth="2" />
            <rect x="-50" y="-50" width="100" height="6" fill={`${C.gold}50`} />
            {/* table of characters */}
            {[0, 1, 2].map(r => [0, 1, 2, 3].map(c => (
              <text key={`${r}-${c}`}
                x={-40 + c * 22} y={-30 + r * 14}
                fontFamily="'Source Serif 4', Georgia, serif"
                fontSize="9" fill={`${C.midnight}cc`}>
                {["语", "言", "中", "文"][(r * 4 + c) % 4]} → {["A", "B", "C", "D"][(r * 4 + c) % 4]}
              </text>
            )))}
          </g>
          {/* outgoing reply */}
          {stage >= 1 && (
            <g transform="translate(420 180)">
              <text x="0" y="0" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fill={C.coral} fontWeight="700">是</text>
              <line x1="-6" y1="6" x2="14" y2="6" stroke={C.coral} strokeWidth="1.4" strokeDasharray="2 2" />
            </g>
          )}
        </g>
      }
    />
  );
}
