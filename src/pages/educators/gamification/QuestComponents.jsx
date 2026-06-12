import { useEffect, useRef, useState } from "react";

import { C } from "../../../theme.js";
import {
  GAMIFICATION_GAME_ROOMS,
  GAMIFICATION_PHASER_ASSETS,
  GAMIFICATION_QUEST_ASSETS,
  GAMIFICATION_WORLD_MAP,
} from "../../../data/gamificationQuest.js";
import useImagePreload from "../../../components/wonder/useImagePreload.js";
import { playQuestSound } from "./questAudio.js";

const DOOR_TRANSITION_MS = 1280;

// Everything the Phaser stage will request in its preload step. Warming these
// during the door scene (the player spends seconds knocking) means the
// overworld appears the moment the door finishes opening — no black frame.
const PHASER_WARM_LIST = [
  GAMIFICATION_PHASER_ASSETS.worldMap.background,
  ...Object.values(GAMIFICATION_PHASER_ASSETS.worldMap.nodes),
  ...Object.values(GAMIFICATION_PHASER_ASSETS.rooms),
  ...Object.values(GAMIFICATION_PHASER_ASSETS.hud),
  GAMIFICATION_PHASER_ASSETS.ari.world.sheet,
  GAMIFICATION_PHASER_ASSETS.ari.room.sheet,
  ...GAMIFICATION_GAME_ROOMS.map((room) => room.badge?.icon).filter(Boolean),
];

export function QuestStyles() {
  return (
    <style>{`
      .gamification-quest-shell {
        --quest-max: 1120px;
      }

      .gamification-crawlable-fallback:focus-within {
        position: fixed !important;
        inset: auto 16px 16px auto !important;
        z-index: 90 !important;
        width: min(620px, calc(100vw - 32px)) !important;
        height: auto !important;
        max-height: min(70vh, 640px) !important;
        margin: 0 !important;
        padding: 18px !important;
        overflow: auto !important;
        clip: auto !important;
        clip-path: none !important;
        white-space: normal !important;
        border: 1px solid rgba(224,184,72,0.72) !important;
        border-radius: 10px !important;
        color: ${C.textPrimary};
        background: rgba(5,14,26,0.96);
        box-shadow: 0 24px 72px rgba(0,0,0,0.52), inset 0 0 0 1px rgba(255,255,255,0.05);
        font-size: 0.86rem;
        line-height: 1.7;
      }

      .gamification-crawlable-fallback:focus-within h1,
      .gamification-crawlable-fallback:focus-within h2 {
        color: ${C.gold};
        margin: 0 0 10px;
      }

      .gamification-crawlable-fallback:focus-within p {
        margin: 0 0 10px;
      }

      .gamification-crawlable-fallback:focus-within a {
        color: ${C.teal};
        text-decoration: underline;
      }

      .gamification-door-hotspot:hover,
      .gamification-door-hotspot:focus-visible,
      .gamification-reward-button:hover,
      .gamification-reward-button:focus-visible,
      .gamification-rule-card:hover,
      .gamification-rule-card:focus-visible {
        transform: translateY(-2px);
        border-color: rgba(224,184,72,0.72);
        box-shadow: 0 0 0 3px rgba(200,152,48,0.16), 0 14px 34px rgba(0,0,0,0.24);
        outline: none;
      }

      .gamification-level-frame {
        scroll-margin-top: 92px;
      }

      .gamification-level-frame::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.04);
        pointer-events: none;
      }

      .gamification-pulse {
        animation: gamificationPulse 1.6s ease-in-out infinite;
      }

      @keyframes gamificationPulse {
        0%, 100% { filter: drop-shadow(0 0 12px rgba(200,152,48,0.22)); }
        50% { filter: drop-shadow(0 0 26px rgba(224,184,72,0.48)); }
      }

      .gamification-door-hotspot {
        position: relative;
        display: block;
        width: 100%;
        min-height: 440px;
        aspect-ratio: 16 / 11;
        border: 1px solid rgba(200,152,48,0.3);
        border-radius: 10px;
        overflow: hidden;
        background:
          radial-gradient(circle at 72% 38%, rgba(42,189,193,0.18), transparent 30%),
          linear-gradient(180deg, rgba(8,18,32,0.58), rgba(8,18,32,0.96));
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
      }

      .gamification-door-hotspot::before {
        content: "";
        position: absolute;
        inset: auto 0 0;
        height: 30%;
        background: linear-gradient(180deg, transparent, rgba(0,0,0,0.32));
        pointer-events: none;
        z-index: 4;
      }

      .gamification-door-hotspot::after {
        content: "Try the door";
        position: absolute;
        left: 18px;
        bottom: 16px;
        z-index: 7;
        padding: 7px 10px;
        border: 1px solid rgba(224,184,72,0.38);
        border-radius: 8px;
        color: ${C.gold};
        background: rgba(8,18,32,0.74);
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .gamification-door-opened::after {
        content: "The lab is open";
      }

      .gamification-door-image {
        position: absolute;
        right: clamp(8px, 5%, 34px);
        bottom: clamp(12px, 5%, 30px);
        z-index: 2;
        width: min(68%, 500px);
        height: 88%;
        object-fit: contain;
        image-rendering: pixelated;
        filter: drop-shadow(0 18px 28px rgba(0,0,0,0.44));
        transition: transform 0.28s ease, filter 0.28s ease;
      }

      .gamification-ari-sprite {
        position: absolute;
        left: clamp(12px, 7%, 48px);
        bottom: clamp(18px, 8%, 48px);
        z-index: 5;
        width: min(31%, 218px);
        max-height: 68%;
        object-fit: contain;
        image-rendering: pixelated;
        filter: drop-shadow(0 16px 22px rgba(0,0,0,0.42));
        transform-origin: 70% 100%;
      }

      .gamification-door-knock .gamification-ari-sprite {
        animation: ariDoorKnock 0.42s steps(2, end);
      }

      .gamification-door-knock .gamification-door-image {
        animation: doorKnockJolt 0.38s steps(2, end);
      }

      .gamification-door-strong-knock .gamification-ari-sprite {
        animation: ariDoorKnock 0.52s steps(3, end);
      }

      .gamification-door-strong-knock .gamification-door-image {
        animation: doorStrongKnockJolt 0.52s steps(3, end);
      }

      .gamification-door-cracked .gamification-door-image {
        filter: drop-shadow(0 0 22px rgba(224,184,72,0.28)) drop-shadow(0 18px 28px rgba(0,0,0,0.44));
      }

      .gamification-door-opening .gamification-door-image {
        animation: doorOpeningGlow 1.1s steps(4, end);
      }

      .gamification-ari-walk-through .gamification-ari-sprite {
        animation: ariWalkThrough ${DOOR_TRANSITION_MS}ms ease-in forwards;
      }

      .gamification-door-spark {
        position: absolute;
        right: 29%;
        top: 33%;
        z-index: 6;
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: ${C.gold};
        box-shadow: 0 0 18px ${C.goldLight}, 18px 10px 0 rgba(42,189,193,0.76), -16px 15px 0 rgba(224,184,72,0.7);
        opacity: 0;
      }

      .gamification-door-knock .gamification-door-spark,
      .gamification-door-opening .gamification-door-spark {
        animation: doorSpark 0.7s ease-out;
      }

      @keyframes ariDoorKnock {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        45% { transform: translateX(18px) rotate(3deg); }
        62% { transform: translateX(12px) rotate(-2deg); }
      }

      @keyframes doorKnockJolt {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(5px); }
      }

      @keyframes doorStrongKnockJolt {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        36% { transform: translateX(7px) rotate(1deg); }
        64% { transform: translateX(-3px) rotate(-1deg); }
      }

      @keyframes doorOpeningGlow {
        0% { transform: scale(1); filter: drop-shadow(0 18px 28px rgba(0,0,0,0.44)); }
        35% { transform: scale(1.018); filter: drop-shadow(0 0 18px rgba(224,184,72,0.32)); }
        100% { transform: scale(1.03); filter: drop-shadow(0 0 34px rgba(42,189,193,0.36)); }
      }

      @keyframes ariWalkThrough {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        58% { transform: translate(82%, -10%) scale(0.9); opacity: 1; }
        100% { transform: translate(142%, -18%) scale(0.52); opacity: 0; }
      }

      @keyframes doorSpark {
        0% { opacity: 0; transform: scale(0.35); }
        25% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.8); }
      }

      @media (max-width: 820px) {
        .gamification-door-stage,
        .gamification-article-intro,
        .gamification-level-layout,
        .gamification-finale-layout {
          grid-template-columns: 1fr !important;
        }

        .gamification-door-hotspot {
          min-height: 330px;
        }

        .gamification-door-image {
          right: -2%;
          width: 76%;
        }

        .gamification-ari-sprite {
          left: 4%;
          width: 34%;
        }

        .gamification-quest-hud {
          position: static !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .gamification-locked-shell *,
        .gamification-locked-shell *::before,
        .gamification-locked-shell *::after,
        .gamification-quest-shell *,
        .gamification-quest-shell *::before,
        .gamification-quest-shell *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }

        .gamification-ari-walk-through .gamification-ari-sprite {
          opacity: 0.72;
          transform: translate(86%, -10%) scale(0.62);
        }
      }
    `}</style>
  );
}

function resumeStopText(progress) {
  const completed = new Set(progress.completedRoomIds || []);
  const nextRoom = GAMIFICATION_GAME_ROOMS.find(
    (room) => room.kind !== "home" && (progress.unlockedRoomIds || []).includes(room.id) && !completed.has(room.id),
  );
  if (!nextRoom) return "Every stop is complete — the Charter is yours.";
  const node = GAMIFICATION_WORLD_MAP.nodes.find((item) => item.id === nextRoom.id);
  return `Ari is waiting at ${node?.label || nextRoom.label}.`;
}

export function DoorScene({ progress, doorOpen, onStep, onEnter }) {
  const [animationBeat, setAnimationBeat] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const transitionTimerRef = useRef(null);
  const warmedRef = useRef(false);
  const warmGameAssets = useImagePreload(
    Object.values(GAMIFICATION_QUEST_ASSETS.door).concat(Object.values(GAMIFICATION_QUEST_ASSETS.ari)),
    PHASER_WARM_LIST,
  );
  const doorAsset = doorOpen
    ? GAMIFICATION_QUEST_ASSETS.door.open
    : progress.doorClicks === 0
      ? GAMIFICATION_QUEST_ASSETS.door.closed
      : progress.doorClicks === 1
        ? GAMIFICATION_QUEST_ASSETS.door.knock
        : GAMIFICATION_QUEST_ASSETS.door.crack;
  const ariAsset = isEntering
    ? GAMIFICATION_QUEST_ASSETS.ari.walk
    : doorOpen
      ? GAMIFICATION_QUEST_ASSETS.ari.celebrate
      : progress.doorClicks === 0
        ? GAMIFICATION_QUEST_ASSETS.ari.idle
        : GAMIFICATION_QUEST_ASSETS.ari.knock;
  const statusText = doorOpen
    ? "The Gameful Learning Lab is open."
    : progress.doorClicks === 0
      ? "Ari waits beside the lab door."
      : progress.doorClicks === 1
        ? "Ari knocks. Something shifts on the other side."
        : "The door opens a little wider.";
  const stageClassName = [
    "gamification-door-hotspot",
    progress.doorClicks === 1 && !doorOpen ? "gamification-door-knock" : "",
    progress.doorClicks === 2 && !doorOpen ? "gamification-door-strong-knock gamification-door-cracked" : "",
    doorOpen ? "gamification-door-opened gamification-door-opening" : "",
    isEntering ? "gamification-ari-walk-through" : "",
  ].filter(Boolean).join(" ");

  useEffect(() => {
    if (!doorOpen || progress.mode !== "door-transition") {
      if (!doorOpen) setIsEntering(false);
      return undefined;
    }

    setIsEntering(true);
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    transitionTimerRef.current = window.setTimeout(onEnter, reducedMotion ? 120 : DOOR_TRANSITION_MS);
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    };
  }, [doorOpen, onEnter, progress.mode]);

  const handleDoorClick = () => {
    if (isEntering) return;
    // First knock doubles as the warm-up signal: pull the Phaser chunk and
    // every stage texture into the HTTP cache while the player knocks.
    if (!warmedRef.current) {
      warmedRef.current = true;
      warmGameAssets();
      import("phaser").catch(() => {});
    }
    const nextClicks = Math.min(3, progress.doorClicks + 1);
    const finalClick = nextClicks >= 3;
    const secondClick = nextClicks === 2;
    setAnimationBeat((current) => current + 1);
    if (finalClick) setIsEntering(true);
    playQuestSound(finalClick ? "open" : secondClick ? "strong-knock" : "knock", progress.soundMuted);
    onStep();
  };

  return (
    <section
      aria-labelledby="gameful-learning-lab-title"
      style={{
        width: "min(var(--quest-max), calc(100vw - 32px))",
        height: "100dvh",
        margin: "0 auto",
        padding: "clamp(16px, 4vw, 34px)",
        minHeight: 0,
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="gamification-door-stage"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(280px, 0.95fr)",
          gap: "clamp(18px, 4vw, 44px)",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{
            color: C.gold,
            fontSize: "0.72rem",
            fontWeight: 900,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}>
            For educators - playable research guide
          </p>
          <h1
            id="gameful-learning-lab-title"
            style={{
              color: C.textPrimary,
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "clamp(2.35rem, 7vw, 5rem)",
              lineHeight: 1.02,
              marginBottom: 18,
              maxWidth: 760,
            }}
          >
            Gameful Learning Lab
          </h1>
          <p style={{
            color: C.textSecondary,
            fontSize: "clamp(1rem, 2vw, 1.18rem)",
            lineHeight: 1.78,
            maxWidth: 720,
          }}>
            Ari is turning this article into a small quest. Open the door to begin.
          </p>
          <div
            aria-label="What this quest includes"
            style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "18px 0 14px" }}
          >
            {[
              "9 stops · about 30 minutes",
              "Earn 9 badges that name thinking habits",
              "No sign-in — progress stays in this browser",
            ].map((item) => (
              <span
                key={item}
                style={{
                  padding: "6px 11px",
                  border: `1px solid ${C.teal}55`,
                  background: "rgba(15,32,52,0.7)",
                  color: C.textPrimary,
                  fontSize: "0.76rem",
                  fontWeight: 850,
                  letterSpacing: "0.02em",
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <ul
            aria-label="What you will learn"
            style={{
              margin: 0,
              paddingLeft: 18,
              maxWidth: 640,
              display: "grid",
              gap: 4,
            }}
          >
            {[
              "Why attention is a design condition, not a student defect",
              "How to tune rewards so they feed motivation instead of replacing it",
              "How to turn one existing lesson into a hook-choice-feedback loop",
            ].map((item) => (
              <li key={item} style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.6 }}>
                {item}
              </li>
            ))}
          </ul>
          {(progress.completedRoomIds?.length || 0) > 0 && (
            <p
              data-testid="gamification-resume-chip"
              style={{
                display: "inline-block",
                marginTop: 16,
                padding: "8px 12px",
                border: `1px solid ${C.gold}77`,
                background: "rgba(224,184,72,0.1)",
                color: C.goldLight,
                fontSize: "0.82rem",
                fontWeight: 850,
                lineHeight: 1.5,
              }}
            >
              {`Welcome back — ${progress.completedRoomIds.length}/9 badges earned. ${resumeStopText(progress)}`}
            </p>
          )}
        </div>

        <button
          type="button"
          className={stageClassName}
          aria-label="Knock on the Gameful Learning Lab door"
          aria-describedby="gamification-door-status"
          onClick={handleDoorClick}
          disabled={isEntering}
        >
          <img
            key={`ari-${ariAsset}-${animationBeat}`}
            src={ariAsset}
            alt="16-bit adult teacher Ari guiding the gamification article"
            className="gamification-ari-sprite"
          />
          <img
            key={`door-${doorAsset}-${animationBeat}`}
            src={doorAsset}
            alt={doorOpen ? "The Gameful Learning Lab door open" : "The Gameful Learning Lab door waiting to be opened"}
            className="gamification-door-image"
          />
          <span className="gamification-door-spark" aria-hidden="true" />
          <span
            id="gamification-door-status"
            aria-live="polite"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {statusText}
          </span>
        </button>
      </div>
    </section>
  );
}
