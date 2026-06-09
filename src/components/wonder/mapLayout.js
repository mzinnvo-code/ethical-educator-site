// Geometry for the K-5 adventure map. Pure constants/functions: imported by
// node tests and shared by every map variant so nodes, rails, and connectors
// agree on one coordinate system.

// Full hub map: each grade is a horizontal band; stories stagger above and
// below a walking rail. Odd zones run right-to-left (boustrophedon) so the
// whole map reads as one winding path.
export const MAP_BAND = {
  full: { height: 238, nodeXs: [12, 38, 62, 88], nodeYs: [50, 126], railY: 120, tile: 64 },
  strip: { height: 198, nodeXs: [12, 38, 62, 88], nodeYs: [28, 102], railY: 96, tile: 56 },
};

// Edge inset (in %) where the inter-zone connector drops to the next band.
export const MAP_EDGE_X = 4;

export function getZoneNodePositions(zoneIndex, count, variant = "full") {
  const band = MAP_BAND[variant] || MAP_BAND.full;
  const reversed = variant === "full" && zoneIndex % 2 === 1;
  return Array.from({ length: count }, (_, index) => {
    const xs = reversed ? [...band.nodeXs].reverse() : band.nodeXs;
    return {
      x: xs[index % xs.length],
      y: band.nodeYs[index % band.nodeYs.length],
    };
  });
}

// Returns whether the connector that drops from zoneIndex to zoneIndex + 1
// sits on the right edge (even zones travel left -> right) or the left.
export function zoneExitEdge(zoneIndex) {
  return zoneIndex % 2 === 0 ? "right" : "left";
}

export function nodeProgressState(progressEntry) {
  const completed = Boolean(progressEntry?.completed);
  const replayed = completed && ((progressEntry?.completionCount || 0) > 1 || (progressEntry?.restarts || 0) > 0);
  return { completed, replayed };
}
