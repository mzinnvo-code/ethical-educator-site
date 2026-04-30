import { C } from "../theme.js";
import { CharacterScene } from "./sceneBases.jsx";

export default function WinningGameScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const honest = lens === "authenticity" || lens === "growth";
  return (
    <CharacterScene
      ariaLabel="A game controller surrounded by confetti; the ribbon says 'YOU WIN' but is partially hidden"
      halo={honest ? C.gold : C.teal}
      mood={honest ? "thoughtful" : "happy"}
      label={stage === 0 ? "You win!" : stage === 1 ? "But..." : "Real win?"}
      sublabel={stage === 0 ? "The AI lets you." : null}
      body={
        <g>
          {/* controller */}
          <g transform="translate(0 10)">
            <rect x="-50" y="-18" width="100" height="32" rx="14" fill={`${C.midnight}`} stroke={C.gold} strokeWidth="2" />
            {/* d-pad */}
            <rect x="-38" y="-6" width="14" height="4" fill={C.gold} />
            <rect x="-33" y="-11" width="4" height="14" fill={C.gold} />
            {/* buttons */}
            <circle cx="32" cy="-2" r="4" fill={C.coral} />
            <circle cx="22" cy="-8" r="4" fill={C.gold} />
            <circle cx="22" cy="4" r="4" fill={C.teal} />
            <circle cx="42" cy="-8" r="4" fill={C.sand} />
          </g>

          {/* confetti */}
          {[
            [-60, -50, C.gold],
            [-30, -70, C.coral],
            [10, -60, C.teal],
            [50, -52, C.gold],
            [70, -36, C.coral],
            [-70, -20, C.teal],
          ].map(([x, y, c], i) => (
            <rect key={i} x={x} y={y} width="6" height="3" rx="1" fill={c} transform={`rotate(${i * 23} ${x + 3} ${y + 1})`}>
              <animateTransform attributeName="transform" type="rotate" from={`${i * 23} ${x + 3} ${y + 1}`} to={`${i * 23 + 360} ${x + 3} ${y + 1}`} dur="6s" repeatCount="indefinite" />
            </rect>
          ))}

          {/* "YOU WIN" ribbon — partially obscured */}
          <g transform="translate(0 -28)">
            <rect x="-44" y="-10" width="88" height="20" rx="10" fill={`${C.gold}25`} stroke={C.gold} strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fontWeight="700" fill={C.gold}>YOU WIN ✦</text>
          </g>

          {/* asterisk note in stage 1+ */}
          {stage >= 1 && (
            <text x="0" y="60" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.textMuted} fontStyle="italic">* the AI made it easier</text>
          )}
        </g>
      }
    />
  );
}
