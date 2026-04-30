import { C } from "../theme.js";
import { CharacterScene, FaceMood } from "./sceneBases.jsx";

export default function RulesVsHelpingScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  return (
    <CharacterScene
      ariaLabel="A finger-to-lips silhouette beside a friend struggling with a puzzle"
      halo={lens === "consequentialist" || lens === "humility" ? C.gold : C.teal}
      mood={lens === "rule-following" ? "neutral" : lens === "creative" ? "happy" : "thoughtful"}
      label={stage === 0 ? "Quiet time" : "After your choice"}
      sublabel={stage === 0 ? "Your friend is about to cry." : null}
      body={
        <g>
          {/* a finger-to-lips ssh shape on the left */}
          <g transform="translate(-60 -10)">
            <circle cx="0" cy="0" r="22" fill="none" stroke={C.teal} strokeWidth="2" />
            <FaceMood cx={0} cy={-2} r={20} mood="neutral" color={C.teal} />
            {/* finger */}
            <line x1="0" y1="14" x2="0" y2="32" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* puzzle pieces on right */}
          <g transform="translate(40 0)">
            <rect x="-20" y="-20" width="40" height="40" rx="3" fill={C.surface} stroke={C.gold} strokeWidth="1.5" />
            <line x1="-20" y1="0" x2="20" y2="0" stroke={C.gold} strokeWidth="1" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke={C.gold} strokeWidth="1" />
            <circle cx="0" cy="0" r="6" fill={`${C.gold}30`} />
            {/* friend silhouette tearful */}
            <g transform="translate(0 -50)">
              <circle cx="0" cy="0" r="12" fill="none" stroke={C.coral} strokeWidth="2" />
              <FaceMood cx={0} cy={0} mood="sad" color={C.coral} />
              {stage === 0 && <line x1="-3" y1="6" x2="-5" y2="14" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round" />}
            </g>
          </g>
        </g>
      }
    />
  );
}
