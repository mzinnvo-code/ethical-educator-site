import { C } from "../../theme.js";
import useThoughtProgress from "../../hooks/useThoughtProgress.js";
import { getSceneIllustration } from "../../data/sceneIllustrations.js";
import { PixelText, PIXEL_CLIP_SM, PIXEL_FONT } from "./PixelFrame.jsx";
import { firstIncompleteId, nodeProgressState, zoneCompletedCount } from "./mapLayout.js";

// Two views of the same adventure, structured like a classic platformer:
//
// variant="overworld" (hub) — six grade islands on a winding trail, each
// wearing its own story artwork. Click an island to travel to that grade.
//
// variant="path" (grade page) — that grade's lateral level path: the four
// stories left to right as scene-art tiles, a "you are here" marker on the
// next unfinished story, and an exit gate that leads to the next grade
// (or back to the Wonder Workshop after Grade 5).
//
// Nothing is ever locked — the lights are a record of where you've
// wondered, not a gate.

function nodeArt(experiment) {
  const firstStage = experiment.stages?.[0];
  return getSceneIllustration(experiment, {
    stageId: firstStage?.id,
    stageTitle: firstStage?.title || firstStage?.kicker,
    stageIndex: 0,
    visualVariant: "k-5",
  });
}

function SkipLink() {
  return (
    <>
      <a className="wonder-map-skip" href="#wonder-map-end">Skip the adventure map</a>
      <style>{`
        .wonder-map-skip { position: absolute; left: -9999px; }
        .wonder-map-skip:focus { position: static; display: inline-block; padding: 6px 10px; color: ${C.gold}; }
      `}</style>
    </>
  );
}

// ──────────────── Overworld (hub) ────────────────

function Overworld({ zones, navigate, celebrateExperimentId, progress }) {
  return (
    <nav className="wonder-overworld" aria-label="Adventure map: pick a grade island">
      <style>{`
        .wonder-overworld ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 26px minmax(0, 1fr) 26px minmax(0, 1fr);
          grid-template-rows: auto 24px auto;
          align-items: stretch;
        }
        /* Snake order: K, 1, 2 across the top; drop down on the right; 3, 4, 5 back across the bottom. */
        .wonder-overworld ol > li:nth-child(1) { grid-area: 1 / 1; }
        .wonder-overworld ol > li:nth-child(2) { grid-area: 1 / 2; }
        .wonder-overworld ol > li:nth-child(3) { grid-area: 1 / 3; }
        .wonder-overworld ol > li:nth-child(4) { grid-area: 1 / 4; }
        .wonder-overworld ol > li:nth-child(5) { grid-area: 1 / 5; }
        .wonder-overworld ol > li:nth-child(6) { grid-area: 2 / 5; }
        .wonder-overworld ol > li:nth-child(7) { grid-area: 3 / 5; }
        .wonder-overworld ol > li:nth-child(8) { grid-area: 3 / 4; }
        .wonder-overworld ol > li:nth-child(9) { grid-area: 3 / 3; }
        .wonder-overworld ol > li:nth-child(10) { grid-area: 3 / 2; }
        .wonder-overworld ol > li:nth-child(11) { grid-area: 3 / 1; }
        .wonder-overworld-connector {
          display: grid;
          place-items: center;
        }
        .wonder-overworld-connector span {
          background: repeating-linear-gradient(90deg, rgba(224,220,208,0.28) 0 6px, transparent 6px 12px);
          width: 100%;
          height: 5px;
          border-radius: 2px;
        }
        .wonder-overworld-connector.is-vertical span {
          background: repeating-linear-gradient(180deg, rgba(224,220,208,0.28) 0 6px, transparent 6px 12px);
          width: 5px;
          height: 100%;
        }
        .wonder-overworld-connector.is-lit span {
          background: linear-gradient(90deg, #ffe9a8, ${C.gold});
          box-shadow: 0 0 10px ${C.gold}55;
        }
        .wonder-overworld-connector.is-vertical.is-lit span {
          background: linear-gradient(180deg, #ffe9a8, ${C.gold});
        }
        .wonder-island {
          position: relative;
          display: block;
          text-decoration: none;
          clip-path: ${PIXEL_CLIP_SM};
          border: 3px solid rgba(255,255,255,0.14);
          background: rgba(8,18,32,0.92);
          overflow: hidden;
          transition: transform 140ms steps(2, end), border-color 140ms steps(2, end);
        }
        .wonder-island:hover,
        .wonder-island:focus-visible {
          transform: translateY(-3px);
          border-color: ${C.gold};
        }
        .wonder-island:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: -5px;
        }
        .wonder-island.is-complete {
          border-color: ${C.gold}aa;
        }
        li:has(> .wonder-island.is-complete) {
          filter: drop-shadow(0 0 10px ${C.gold}44);
        }
        @keyframes wonder-island-celebrate {
          0%, 100% { filter: drop-shadow(0 0 8px ${C.gold}44); }
          50% { filter: drop-shadow(0 0 22px ${C.gold}); }
        }
        li:has(> .wonder-island-celebrate) {
          animation: wonder-island-celebrate 1.2s steps(3, end) 4;
        }
        .wonder-island-art {
          position: relative;
          display: block;
          aspect-ratio: 16 / 8.5;
        }
        .wonder-island-art img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .wonder-island-art::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(8,18,32,0.92) 96%);
        }
        .wonder-island-body {
          position: relative;
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr) auto;
          gap: 8px;
          align-items: center;
          padding: 8px 10px 10px;
          margin-top: -26px;
        }
        .wonder-island-chip {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          clip-path: ${PIXEL_CLIP_SM};
          color: #0b1622;
          font-family: ${PIXEL_FONT};
          font-size: 0.95rem;
        }
        .wonder-island-pips {
          display: flex;
          gap: 3px;
          margin-top: 3px;
        }
        .wonder-island-pips span {
          width: 9px;
          height: 9px;
          clip-path: ${PIXEL_CLIP_SM};
          background: rgba(255,255,255,0.12);
        }
        .wonder-island-pips span.is-lit {
          background: linear-gradient(180deg, #ffe9a8, ${C.gold});
          box-shadow: 0 0 6px ${C.gold}66;
        }
        @media (max-width: 640px) {
          .wonder-overworld ol {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: none;
          }
          .wonder-overworld ol > li { grid-area: auto !important; }
          .wonder-overworld-connector { height: 22px; }
          .wonder-overworld-connector span,
          .wonder-overworld-connector.is-lit span {
            width: 5px;
            height: 100%;
            background: repeating-linear-gradient(180deg, rgba(224,220,208,0.28) 0 6px, transparent 6px 12px);
          }
          .wonder-overworld-connector.is-lit span {
            background: linear-gradient(180deg, #ffe9a8, ${C.gold});
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wonder-island { transition: none; }
          .wonder-island:hover, .wonder-island:focus-visible { transform: none; }
          li:has(> .wonder-island-celebrate) { animation: none; }
        }
      `}</style>
      <SkipLink />
      <ol>
        {zones.map((zone, index) => {
          const done = zoneCompletedCount(zone.experiments, progress);
          const total = zone.experiments.length;
          const art = nodeArt(zone.experiments[0]);
          const celebrate = zone.experiments.some((experiment) => experiment.id === celebrateExperimentId);
          const prevZone = index > 0 ? zones[index - 1] : null;
          const connectorLit = prevZone
            ? zoneCompletedCount(prevZone.experiments, progress) === prevZone.experiments.length
            : false;
          const isVerticalConnector = index === 3; // the drop between Grade 2 and Grade 3
          return [
            index > 0 && (
              <li
                key={`conn-${zone.grade.id}`}
                aria-hidden="true"
                className={`wonder-overworld-connector ${isVerticalConnector ? "is-vertical" : ""} ${connectorLit ? "is-lit" : ""}`}
              >
                <span />
              </li>
            ),
            <li key={zone.grade.id}>
              <a
                className={`wonder-island ${done === total ? "is-complete" : ""} ${celebrate ? "wonder-island-celebrate" : ""}`}
                style={{ "--island-accent": zone.grade.accent }}
                href={`/${zone.grade.route}`}
                onClick={(event) => {
                  if (!navigate) return;
                  event.preventDefault();
                  navigate(zone.grade.route);
                }}
                aria-label={`${zone.grade.label} island: ${done} of ${total} stories finished. ${zone.grade.title}`}
              >
                <span className="wonder-island-art" aria-hidden="true">
                  {art?.src && <img src={art.src} alt="" loading="lazy" />}
                </span>
                <span className="wonder-island-body">
                  <span className="wonder-island-chip" style={{ background: zone.grade.accent, color: zone.grade.accent === C.ocean ? C.textPrimary : "#0b1622" }} aria-hidden="true">
                    {zone.grade.short}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", color: C.textPrimary, fontWeight: 800, fontSize: "0.92rem", lineHeight: 1.2 }}>
                      {zone.grade.label}
                    </span>
                    <span className="wonder-island-pips" aria-hidden="true">
                      {zone.experiments.map((experiment) => (
                        <span
                          key={experiment.id}
                          className={progress?.experiments?.[experiment.id]?.completed ? "is-lit" : ""}
                        />
                      ))}
                    </span>
                  </span>
                  <PixelText size="0.8rem" color={done === total ? C.gold : C.textSecondary} style={{ whiteSpace: "nowrap" }}>
                    {done}/{total}
                  </PixelText>
                </span>
              </a>
            </li>,
          ];
        })}
      </ol>
      <span id="wonder-map-end" />
    </nav>
  );
}

// ──────────────── Grade level path ────────────────

function GradePath({ zone, navigate, onSelectExperiment, nextGrade, progress }) {
  const experiments = zone.experiments;
  const grade = zone.grade;
  const hereId = firstIncompleteId(experiments, progress);
  const allDone = hereId === null;
  const gateRoute = nextGrade ? nextGrade.route : "thought-experiments/k-5";
  const gateLabel = nextGrade ? `On to ${nextGrade.label}` : "Visit the Workshop";

  const handleNode = (event, experiment) => {
    if (onSelectExperiment) {
      event.preventDefault();
      onSelectExperiment(experiment);
      return;
    }
    if (navigate) {
      event.preventDefault();
      navigate(`${grade.route}?experiment=${experiment.id}`);
    }
  };

  return (
    <nav className="wonder-grade-path" aria-label={`${grade.label} story path`}>
      <style>{`
        .wonder-grade-path {
          position: relative;
        }
        .wonder-grade-path-scroller {
          overflow-x: auto;
          padding: 40px 4px 6px;
          scrollbar-width: thin;
        }
        @media (max-width: 700px) {
          .wonder-grade-path::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 34px;
            background: linear-gradient(270deg, rgba(11,22,34,0.92), transparent);
            pointer-events: none;
          }
        }
        .wonder-grade-path ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(${experiments.length}, minmax(132px, 1fr) 20px) minmax(108px, 0.8fr);
          align-items: start;
          min-width: ${experiments.length * 152 + 108}px;
        }
        .wonder-path-seg {
          display: grid;
          place-items: center;
          height: 96px;
        }
        .wonder-path-seg span {
          width: 100%;
          height: 5px;
          border-radius: 2px;
          background: repeating-linear-gradient(90deg, rgba(224,220,208,0.28) 0 6px, transparent 6px 12px);
        }
        .wonder-path-seg.is-lit span {
          background: linear-gradient(90deg, #ffe9a8, ${C.gold});
          box-shadow: 0 0 10px ${C.gold}55;
        }
        .wonder-path-node {
          position: relative;
          display: grid;
          justify-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .wonder-path-node:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: 3px;
        }
        .wonder-path-art {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          clip-path: ${PIXEL_CLIP_SM};
          border: 3px solid rgba(255,255,255,0.16);
          background: rgba(10,21,36,0.9);
          overflow: hidden;
          transition: transform 140ms steps(2, end), border-color 140ms steps(2, end);
        }
        .wonder-path-art img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .wonder-path-node:hover .wonder-path-art,
        .wonder-path-node:focus-visible .wonder-path-art {
          transform: scale(1.04);
          border-color: ${grade.accent};
        }
        .wonder-path-node.is-done .wonder-path-art {
          border-color: ${C.gold};
          box-shadow: 0 0 14px ${C.gold}44;
        }
        .wonder-path-node:not(.is-done) .wonder-path-art img {
          filter: saturate(0.7) brightness(0.85);
        }
        .wonder-path-pip {
          position: absolute;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 20px;
          height: 20px;
          font-size: 13px;
          line-height: 1;
          clip-path: ${PIXEL_CLIP_SM};
        }
        .wonder-path-pip-star { top: -8px; right: -7px; background: ${C.gold}; color: #0b1622; }
        .wonder-path-pip-replay { top: -8px; left: -7px; background: ${C.teal}; color: #0b1622; font-size: 12px; }
        .wonder-path-title {
          max-width: 140px;
          font-size: 0.68rem;
          font-weight: 700;
          line-height: 1.3;
          text-align: center;
          color: ${C.textSecondary};
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .wonder-path-node.is-done .wonder-path-title { color: ${C.gold}; }
        .wonder-path-here {
          position: absolute;
          top: -36px;
          left: 50%;
          transform: translateX(-50%);
          display: grid;
          justify-items: center;
          gap: 1px;
          white-space: nowrap;
          z-index: 3;
        }
        .wonder-path-here-arrow {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 7px solid ${C.gold};
        }
        @keyframes wonder-path-here-bob {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 3px); }
        }
        .wonder-path-here { animation: wonder-path-here-bob 1.4s steps(2, end) infinite; }
        .wonder-path-gate {
          display: grid;
          justify-items: center;
          gap: 6px;
          text-decoration: none;
          position: relative;
        }
        .wonder-path-gate-arch {
          display: grid;
          place-items: center;
          width: 76px;
          height: 84px;
          clip-path: polygon(0 34%, 14% 14%, 32% 4%, 50% 0, 68% 4%, 86% 14%, 100% 34%, 100% 100%, 0 100%);
          border: 3px solid ${C.gold}88;
          background: linear-gradient(180deg, ${(nextGrade?.accent || C.gold)}33, rgba(8,18,32,0.95));
          color: ${C.gold};
          font-family: ${PIXEL_FONT};
          font-size: 1.5rem;
          transition: transform 140ms steps(2, end);
        }
        .wonder-path-gate:hover .wonder-path-gate-arch,
        .wonder-path-gate:focus-visible .wonder-path-gate-arch {
          transform: translateY(-3px);
        }
        .wonder-path-gate:focus-visible { outline: 3px solid ${C.gold}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .wonder-path-art, .wonder-path-gate-arch { transition: none; }
          .wonder-path-node:hover .wonder-path-art { transform: none; }
          .wonder-path-here { animation: none; }
        }
      `}</style>
      <SkipLink />
      <div className="wonder-grade-path-scroller">
        <ol>
          {experiments.map((experiment, index) => {
            const state = nodeProgressState(progress?.experiments?.[experiment.id]);
            const art = nodeArt(experiment);
            const prevDone = index === 0
              ? true
              : Boolean(progress?.experiments?.[experiments[index - 1].id]?.completed);
            return [
              index > 0 && (
                <li key={`seg-${experiment.id}`} aria-hidden="true" className={`wonder-path-seg ${prevDone && state.completed ? "is-lit" : ""}`}>
                  <span />
                </li>
              ),
              <li key={experiment.id}>
                <a
                  className={`wonder-path-node ${state.completed ? "is-done" : ""}`}
                  href={`/${grade.route}?experiment=${experiment.id}`}
                  onClick={(event) => handleNode(event, experiment)}
                  aria-label={`${experiment.title}, story ${index + 1} of ${experiments.length}, ${state.completed ? "finished" : "not yet played"}${state.replayed ? ", played more than once" : ""}${experiment.id === hereId ? ". You are here" : ""}`}
                >
                  {experiment.id === hereId && (
                    <span className="wonder-path-here" aria-hidden="true">
                      <PixelText size="0.7rem" color={C.gold} style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        You are here
                      </PixelText>
                      <span className="wonder-path-here-arrow" />
                    </span>
                  )}
                  <span className="wonder-path-art">
                    {art?.src && <img src={art.src} alt="" loading="lazy" />}
                    {state.completed && <span className="wonder-path-pip wonder-path-pip-star" aria-hidden="true">★</span>}
                    {state.replayed && <span className="wonder-path-pip wonder-path-pip-replay" aria-hidden="true">↻</span>}
                  </span>
                  <span className="wonder-path-title">{experiment.title}</span>
                </a>
              </li>,
            ];
          })}
          <li key="seg-gate" aria-hidden="true" className={`wonder-path-seg ${allDone ? "is-lit" : ""}`}>
            <span />
          </li>
          <li key="gate">
            <a
              className="wonder-path-gate"
              href={`/${gateRoute}`}
              onClick={(event) => {
                if (!navigate) return;
                event.preventDefault();
                navigate(gateRoute);
              }}
              aria-label={allDone ? `All ${grade.label} stories finished! ${gateLabel}` : gateLabel}
            >
              {allDone && (
                <span className="wonder-path-here" aria-hidden="true">
                  <PixelText size="0.7rem" color={C.gold} style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Next stop!
                  </PixelText>
                  <span className="wonder-path-here-arrow" />
                </span>
              )}
              <span className="wonder-path-gate-arch" aria-hidden="true">
                {nextGrade ? nextGrade.short : "🚪"}
              </span>
              <span className="wonder-path-title" style={{ color: C.gold }}>{gateLabel} →</span>
            </a>
          </li>
        </ol>
      </div>
      <span id="wonder-map-end" />
    </nav>
  );
}

export default function AdventureMap({
  zones,
  variant = "overworld",
  navigate,
  onSelectExperiment,
  celebrateExperimentId = null,
  nextGrade = null,
}) {
  const { progress } = useThoughtProgress();
  if (variant === "path") {
    return (
      <GradePath
        zone={zones[0]}
        navigate={navigate}
        onSelectExperiment={onSelectExperiment}
        nextGrade={nextGrade}
        progress={progress}
      />
    );
  }
  return (
    <Overworld
      zones={zones}
      navigate={navigate}
      celebrateExperimentId={celebrateExperimentId}
      progress={progress}
    />
  );
}
