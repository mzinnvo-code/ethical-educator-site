import { C } from "../../theme.js";
import useThoughtProgress from "../../hooks/useThoughtProgress.js";
import { PixelText, PIXEL_CLIP_SM, PIXEL_FONT } from "./PixelFrame.jsx";
import { MAP_BAND, MAP_EDGE_X, getZoneNodePositions, nodeProgressState, zoneExitEdge } from "./mapLayout.js";

// Level-select adventure map for the K-5 stories. Every story is a node on a
// winding trail through six grade zones; finished stories light up gold and
// the trail fills in behind them. Nothing is ever locked — the lights are a
// record of where you've wondered, not a gate.
//
// variant="full"  → six boustrophedon bands on the hub, zone headers link to
//                   each grade page, nodes deep-link via ?experiment=.
// variant="strip" → one band on a grade page; nodes call onSelectExperiment
//                   to open the story inline (matching ExperimentGrid).
export default function AdventureMap({
  zones,
  variant = "full",
  navigate,
  onSelectExperiment,
  showZoneHeaders = variant === "full",
}) {
  const { progress } = useThoughtProgress();
  const band = MAP_BAND[variant] || MAP_BAND.full;
  const isFull = variant === "full";

  const zoneCompleted = (experiments) =>
    experiments.filter((experiment) => progress.experiments[experiment.id]?.completed).length;

  const handleNodeClick = (event, zone, experiment) => {
    if (onSelectExperiment) {
      event.preventDefault();
      onSelectExperiment(experiment);
      return;
    }
    if (navigate) {
      event.preventDefault();
      navigate(`${zone.grade.route}?experiment=${experiment.id}`);
    }
  };

  return (
    <nav className="wonder-map" aria-label="Adventure map: pick a story to play">
      <style>{`
        .wonder-map ol {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .wonder-map-zone {
          position: relative;
          margin: 0 0 14px;
        }
        .wonder-map-zone-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 4px;
          text-decoration: none;
          color: inherit;
        }
        .wonder-map-zone-header:hover .wonder-map-zone-name,
        .wonder-map-zone-header:focus-visible .wonder-map-zone-name {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .wonder-map-zone-chip {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          clip-path: ${PIXEL_CLIP_SM};
          font-family: ${PIXEL_FONT};
          font-weight: 600;
          font-size: 1rem;
          color: #0b1622;
          flex-shrink: 0;
        }
        .wonder-map-band {
          position: relative;
          height: ${band.height}px;
          clip-path: ${PIXEL_CLIP_SM};
          border: 2px solid rgba(255,255,255,0.09);
        }
        .wonder-map-rail {
          position: absolute;
          left: ${MAP_EDGE_X}%;
          right: ${MAP_EDGE_X}%;
          top: ${band.railY}px;
          height: 6px;
          background: repeating-linear-gradient(90deg, rgba(224,220,208,0.22) 0 10px, transparent 10px 20px);
          border-radius: 2px;
        }
        .wonder-map-rail-lit {
          position: absolute;
          top: ${band.railY}px;
          height: 6px;
          background: linear-gradient(180deg, #ffe9a8, ${C.gold});
          box-shadow: 0 0 10px ${C.gold}50;
          border-radius: 2px;
          z-index: 1;
        }
        .wonder-map-connector {
          position: absolute;
          width: 6px;
          background: repeating-linear-gradient(180deg, rgba(224,220,208,0.2) 0 10px, transparent 10px 20px);
          border-radius: 2px;
          z-index: 0;
        }
        .wonder-map-connector-exit {
          top: ${band.railY}px;
          height: calc(100% - ${band.railY}px);
        }
        .wonder-map-connector-entry {
          top: 0;
          height: ${band.railY + 6}px;
        }
        .wonder-map-connector.is-lit {
          background: linear-gradient(180deg, ${C.gold}, ${C.gold}88);
          box-shadow: 0 0 12px ${C.gold}44;
        }
        .wonder-map-node-stem {
          position: absolute;
          width: 4px;
          background: rgba(224,220,208,0.16);
          z-index: 1;
        }
        .wonder-map-node-stem.is-lit {
          background: ${C.gold}aa;
          box-shadow: 0 0 8px ${C.gold}44;
        }
        .wonder-map-node {
          position: absolute;
          transform: translateX(-50%);
          display: grid;
          justify-items: center;
          gap: 5px;
          width: 96px;
          text-decoration: none;
          z-index: 2;
        }
        .wonder-map-node.is-top {
          transform: translate(-50%, -100%);
        }
        .wonder-map-node.is-top .wonder-map-caption {
          order: -1;
        }
        .wonder-map-node:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: 3px;
        }
        .wonder-map-tile {
          position: relative;
          display: grid;
          place-items: center;
          width: ${band.tile}px;
          height: ${band.tile}px;
          clip-path: ${PIXEL_CLIP_SM};
          border: 3px solid rgba(255,255,255,0.16);
          background: linear-gradient(180deg, rgba(14,30,48,0.92), rgba(8,18,32,0.94));
          transition: transform 140ms steps(2, end);
        }
        .wonder-map-node:hover .wonder-map-tile {
          transform: scale(1.07);
          border-color: rgba(255,255,255,0.4);
        }
        .wonder-map-node.is-done .wonder-map-tile {
          border-color: ${C.gold};
          background: linear-gradient(180deg, ${C.gold}26, rgba(10,20,34,0.95));
          box-shadow: 0 0 14px ${C.gold}44, inset 0 0 0 1px ${C.gold}33;
          animation: wonder-node-glow 2.6s steps(2, end) infinite;
        }
        @keyframes wonder-node-glow {
          0%, 100% { box-shadow: 0 0 10px ${C.gold}33, inset 0 0 0 1px ${C.gold}22; }
          50% { box-shadow: 0 0 20px ${C.gold}66, inset 0 0 0 1px ${C.gold}44; }
        }
        .wonder-map-emoji {
          font-size: ${Math.round(band.tile * 0.46)}px;
          line-height: 1;
          filter: saturate(1.1) drop-shadow(0 2px 0 rgba(0,0,0,0.35));
        }
        .wonder-map-node:not(.is-done) .wonder-map-emoji {
          opacity: 0.82;
        }
        .wonder-map-pip {
          position: absolute;
          display: grid;
          place-items: center;
          width: 17px;
          height: 17px;
          font-size: 11px;
          line-height: 1;
          clip-path: ${PIXEL_CLIP_SM};
        }
        .wonder-map-pip-star {
          top: -7px;
          right: -7px;
          background: ${C.gold};
          color: #0b1622;
        }
        .wonder-map-pip-replay {
          top: -7px;
          left: -7px;
          background: ${C.teal};
          color: #0b1622;
          font-size: 10px;
        }
        .wonder-map-caption {
          font-size: 0.62rem;
          font-weight: 700;
          line-height: 1.25;
          text-align: center;
          color: ${C.textSecondary};
          max-width: 96px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .wonder-map-node.is-done .wonder-map-caption {
          color: ${C.gold};
        }
        .wonder-map-skip {
          position: absolute;
          left: -9999px;
        }
        .wonder-map-skip:focus {
          position: static;
          display: inline-block;
          padding: 6px 10px;
          color: ${C.gold};
        }
        @media (max-width: 620px) {
          .wonder-map-node { width: 78px; }
          .wonder-map-caption { max-width: 78px; font-size: 0.56rem; }
          .wonder-map-tile { width: ${Math.max(46, band.tile - 12)}px; height: ${Math.max(46, band.tile - 12)}px; }
          .wonder-map-emoji { font-size: ${Math.round((band.tile - 12) * 0.46)}px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wonder-map-node.is-done .wonder-map-tile { animation: none; }
          .wonder-map-tile { transition: none; }
          .wonder-map-node:hover .wonder-map-tile { transform: none; }
        }
      `}</style>
      <a className="wonder-map-skip" href="#wonder-map-end">Skip the adventure map</a>
      <ol>
        {zones.map((zone, zoneIndex) => {
          const positions = getZoneNodePositions(zoneIndex, zone.experiments.length, variant);
          const states = zone.experiments.map((experiment) => nodeProgressState(progress.experiments[experiment.id]));
          const completedCount = zoneCompleted(zone.experiments);
          const linkLit = (fromZone, toZone) => Boolean(
            fromZone && toZone
            && progress.experiments[fromZone.experiments[fromZone.experiments.length - 1]?.id]?.completed
            && progress.experiments[toZone.experiments[0]?.id]?.completed,
          );
          const showExit = isFull && zoneIndex < zones.length - 1;
          const showEntry = isFull && zoneIndex > 0;
          const exitLit = showExit && linkLit(zone, zones[zoneIndex + 1]);
          const entryLit = showEntry && linkLit(zones[zoneIndex - 1], zone);
          const exitEdge = zoneExitEdge(zoneIndex);
          const entryEdge = zoneExitEdge(zoneIndex - 1);
          return (
            <li key={zone.grade.id} className="wonder-map-zone">
              {showZoneHeaders && (
                <a
                  className="wonder-map-zone-header"
                  href={`/${zone.grade.route}`}
                  onClick={(event) => {
                    if (!navigate) return;
                    event.preventDefault();
                    navigate(zone.grade.route);
                  }}
                >
                  <span className="wonder-map-zone-chip" style={{ background: zone.grade.accent }}>
                    {zone.grade.short}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="wonder-map-zone-name" style={{ display: "block", color: C.textPrimary, fontWeight: 800, fontSize: "0.92rem", lineHeight: 1.2 }}>
                      {zone.grade.label}
                    </span>
                    <span style={{ display: "block", color: C.textSecondary, fontSize: "0.72rem", lineHeight: 1.3 }}>
                      {zone.grade.title}
                    </span>
                  </span>
                  <PixelText size="0.78rem" color={completedCount === zone.experiments.length ? C.gold : C.textSecondary} style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>
                    {completedCount}/{zone.experiments.length}
                  </PixelText>
                </a>
              )}
              <div
                className="wonder-map-band"
                style={{ background: `linear-gradient(180deg, ${zone.grade.accent}10, rgba(8,18,32,0.5) 70%)` }}
              >
                <span className="wonder-map-rail" aria-hidden="true" />
                {positions.slice(0, -1).map((position, index) => {
                  const next = positions[index + 1];
                  if (!states[index]?.completed || !states[index + 1]?.completed) return null;
                  const left = Math.min(position.x, next.x);
                  const width = Math.abs(next.x - position.x);
                  return (
                    <span
                      key={`lit-${index}`}
                      className="wonder-map-rail-lit"
                      aria-hidden="true"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  );
                })}
                {entryLit && (
                  <span
                    className="wonder-map-rail-lit"
                    aria-hidden="true"
                    style={entryEdge === "right"
                      ? { left: `${positions[0].x}%`, width: `${100 - MAP_EDGE_X - positions[0].x}%` }
                      : { left: `${MAP_EDGE_X}%`, width: `${positions[0].x - MAP_EDGE_X}%` }}
                  />
                )}
                {exitLit && (
                  <span
                    className="wonder-map-rail-lit"
                    aria-hidden="true"
                    style={exitEdge === "right"
                      ? { left: `${positions[positions.length - 1].x}%`, width: `${100 - MAP_EDGE_X - positions[positions.length - 1].x}%` }
                      : { left: `${MAP_EDGE_X}%`, width: `${positions[positions.length - 1].x - MAP_EDGE_X}%` }}
                  />
                )}
                {showEntry && (
                  <span
                    className={`wonder-map-connector wonder-map-connector-entry ${entryLit ? "is-lit" : ""}`}
                    aria-hidden="true"
                    style={entryEdge === "right" ? { right: `calc(${MAP_EDGE_X}% - 3px)` } : { left: `calc(${MAP_EDGE_X}% - 3px)` }}
                  />
                )}
                {showExit && (
                  <span
                    className={`wonder-map-connector wonder-map-connector-exit ${exitLit ? "is-lit" : ""}`}
                    aria-hidden="true"
                    style={exitEdge === "right" ? { right: `calc(${MAP_EDGE_X}% - 3px)` } : { left: `calc(${MAP_EDGE_X}% - 3px)` }}
                  />
                )}
                <ol aria-label={`${zone.grade.label} stories`}>
                  {zone.experiments.map((experiment, index) => {
                    const position = positions[index];
                    const { completed, replayed } = states[index];
                    const isTopRow = position.y === band.nodeYs[0];
                    const tileTop = position.y;
                    const tileCenter = tileTop + band.tile / 2;
                    const stemTop = Math.min(band.railY + 3, tileCenter);
                    const stemHeight = Math.abs(tileCenter - (band.railY + 3));
                    return (
                      <li key={experiment.id} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                        <span
                          className={`wonder-map-node-stem ${completed ? "is-lit" : ""}`}
                          aria-hidden="true"
                          style={{ left: `calc(${position.x}% - 2px)`, top: stemTop, height: stemHeight }}
                        />
                        <a
                          className={`wonder-map-node ${completed ? "is-done" : ""} ${isTopRow ? "is-top" : ""}`}
                          style={{ left: `${position.x}%`, top: isTopRow ? tileTop + band.tile : tileTop, pointerEvents: "auto" }}
                          href={`/${zone.grade.route}?experiment=${experiment.id}`}
                          onClick={(event) => handleNodeClick(event, zone, experiment)}
                          aria-label={`${experiment.title}, ${zone.grade.label} story ${index + 1} of ${zone.experiments.length}, ${completed ? "finished" : "not yet played"}${replayed ? ", played more than once" : ""}`}
                        >
                          <span className="wonder-map-tile">
                            <span className="wonder-map-emoji" aria-hidden="true">{experiment.emoji}</span>
                            {completed && <span className="wonder-map-pip wonder-map-pip-star" aria-hidden="true">★</span>}
                            {replayed && <span className="wonder-map-pip wonder-map-pip-replay" aria-hidden="true">↻</span>}
                          </span>
                          <span className="wonder-map-caption">{experiment.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </li>
          );
        })}
      </ol>
      <span id="wonder-map-end" />
    </nav>
  );
}
