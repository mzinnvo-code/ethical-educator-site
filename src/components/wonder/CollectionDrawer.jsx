import { useState } from "react";
import { C } from "../../theme.js";
import { PixelText, PIXEL_CLIP_SM, PIXEL_FONT } from "./PixelFrame.jsx";
import { TEAL_TEXT } from "./trackerThemes.js";

// Tabbed collection shelf under the diorama: big, aligned cards for every
// trophy and memento (no more cramped list + scroll-away detail strip), plus
// the stats row. Clicking a card opens the same StageInspector that clicking
// the item on the stage does — one detail surface, two entry points.
function DrawerStat({ label, value, color, icon, statAssets }) {
  const asset = statAssets?.[icon];
  return (
    <div
      className="progress-room-pixel-stat"
      style={{
        display: "grid",
        gridTemplateColumns: "34px minmax(0, 1fr)",
        gap: 8,
        alignItems: "center",
        padding: "8px 9px",
        border: `2px solid ${color}38`,
        clipPath: PIXEL_CLIP_SM,
        background: `linear-gradient(180deg, rgba(6,16,29,0.9), ${color}10)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 14px ${color}10`,
      }}
    >
      <img
        src={asset}
        alt=""
        aria-hidden="true"
        style={{ width: 34, height: 34, objectFit: "contain", imageRendering: "pixelated", filter: `drop-shadow(0 0 8px ${color}28)` }}
      />
      <div style={{ minWidth: 0 }}>
        <p style={{ color, fontFamily: PIXEL_FONT, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 2 }}>
          {label}
        </p>
        <p style={{ color: C.textPrimary, fontFamily: PIXEL_FONT, fontSize: "1.08rem", lineHeight: 1 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function CollectionDrawer({
  badges = [],
  mementos = [],
  statItems = [],
  statAssets,
  badgeAssets,
  accent = C.gold,
  sfx,
  onInspectBadge,
  onInspectMemento,
}) {
  const tabs = [
    { id: "trophies", label: "Trophies", count: `${badges.filter((badge) => badge.earned).length}/${badges.length}` },
    ...(mementos.length
      ? [{ id: "mementos", label: "Mementos", count: `${mementos.filter((memento) => memento.completed).length}/${mementos.length}` }]
      : []),
    ...(statItems.length ? [{ id: "stats", label: "My Stats", count: null }] : []),
  ];
  const [activeTab, setActiveTab] = useState("trophies");

  const gradeGroups = [];
  for (const memento of mementos) {
    const last = gradeGroups[gradeGroups.length - 1];
    if (last && last.gradeLabel === memento.item.gradeLabel) last.entries.push(memento);
    else gradeGroups.push({ gradeLabel: memento.item.gradeLabel, accent: memento.item.accent, entries: [memento] });
  }

  const cardBase = {
    display: "grid",
    gap: 8,
    alignItems: "center",
    textAlign: "left",
    width: "100%",
    padding: "10px 11px",
    clipPath: PIXEL_CLIP_SM,
    cursor: "pointer",
  };

  return (
    <section className="wonder-collection-drawer" aria-label="Workshop collection" style={{ marginTop: 14 }}>
      <style>{`
        .wonder-drawer-tab {
          clip-path: ${PIXEL_CLIP_SM};
          border: 2px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.035);
          color: ${C.textSecondary};
          padding: 8px 12px;
          cursor: pointer;
          font-family: ${PIXEL_FONT};
          font-weight: 600;
          font-size: 0.78rem;
          transition: border-color 160ms steps(2, end), color 160ms steps(2, end);
        }
        .wonder-drawer-tab:hover {
          border-color: ${C.gold}77;
          color: ${C.textPrimary};
          background: rgba(255,255,255,0.07);
        }
        .wonder-drawer-tab:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: -3px;
        }
        .wonder-drawer-card:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: -3px;
        }
        .wonder-drawer-tab[aria-selected="true"] {
          background: ${C.gold}1c;
          border-color: ${C.gold}88;
          color: ${C.gold};
        }
        .wonder-drawer-card {
          border: 2px solid rgba(255,255,255,0.1);
          background: rgba(10,21,36,0.8);
          transition: transform 140ms steps(2, end), border-color 140ms steps(2, end);
        }
        .wonder-drawer-card:hover,
        .wonder-drawer-card:focus-visible {
          transform: translateY(-2px);
          border-color: ${C.gold};
        }
        .wonder-drawer-card.is-earned {
          border-color: ${C.gold}55;
          background: linear-gradient(180deg, ${C.gold}10, rgba(10,21,36,0.85));
        }
        @media (prefers-reduced-motion: reduce) {
          .wonder-drawer-tab, .wonder-drawer-card { transition: none; }
          .wonder-drawer-card:hover, .wonder-drawer-card:focus-visible { transform: none; }
        }
      `}</style>
      <div role="tablist" aria-label="Collection sections" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`wonder-drawer-tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`wonder-drawer-panel-${tab.id}`}
            className="wonder-drawer-tab"
            onClick={() => {
              sfx?.play("tab");
              setActiveTab(tab.id);
            }}
          >
            {tab.label}{tab.count ? ` · ${tab.count}` : ""}
          </button>
        ))}
      </div>

      {activeTab === "trophies" && (
        <div
          id="wonder-drawer-panel-trophies"
          role="tabpanel"
          aria-labelledby="wonder-drawer-tab-trophies"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}
        >
          {badges.map((badge) => (
            <button
              key={badge.id}
              type="button"
              className={`wonder-drawer-card ${badge.earned ? "is-earned" : ""}`}
              onClick={() => onInspectBadge(badge)}
              onPointerEnter={() => sfx?.play("trophyHover")}
              style={{ ...cardBase, gridTemplateColumns: "56px minmax(0, 1fr)" }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 56,
                  height: 56,
                  clipPath: PIXEL_CLIP_SM,
                  background: badge.earned ? `${C.gold}14` : "rgba(255,255,255,0.03)",
                  border: `2px ${badge.earned ? "solid" : "dotted"} ${badge.earned ? C.gold + "66" : C.textMuted + "66"}`,
                }}
              >
                <img
                  src={badgeAssets?.[badge.id]}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: 44,
                    height: 44,
                    objectFit: "contain",
                    imageRendering: "pixelated",
                    opacity: badge.earned ? 1 : 0.45,
                    filter: badge.earned ? `drop-shadow(0 0 8px ${C.gold}55)` : "grayscale(1) brightness(0.6)",
                  }}
                />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", color: badge.earned ? C.gold : C.textPrimary, fontWeight: 900, fontSize: "0.85rem", lineHeight: 1.25, marginBottom: 2 }}>
                  {badge.label}
                </span>
                <PixelText size="0.66rem" color={badge.isNew ? C.gold : badge.earned ? TEAL_TEXT : C.textSecondary} style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {badge.isNew ? "New trophy" : badge.earned ? "Earned" : "How to earn"}
                </PixelText>
              </span>
            </button>
          ))}
        </div>
      )}

      {activeTab === "mementos" && (
        <div
          id="wonder-drawer-panel-mementos"
          role="tabpanel"
          aria-labelledby="wonder-drawer-tab-mementos"
          style={{ display: "grid", gap: 14 }}
        >
          {gradeGroups.map((group) => (
            <div key={group.gradeLabel}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 12,
                    height: 12,
                    clipPath: PIXEL_CLIP_SM,
                    background: group.accent || accent,
                  }}
                />
                <PixelText size="0.68rem" color={C.textPrimary} style={{ letterSpacing: "0.06em" }}>
                  {group.gradeLabel}
                </PixelText>
                <PixelText size="0.62rem" color={C.textMuted}>
                  {group.entries.filter((entry) => entry.completed).length}/{group.entries.length}
                </PixelText>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8 }}>
                {group.entries.map((memento) => (
                  <button
                    key={memento.item.id}
                    type="button"
                    className={`wonder-drawer-card ${memento.completed ? "is-earned" : ""}`}
                    onClick={() => onInspectMemento(memento)}
                    onPointerEnter={() => sfx?.play("trophyHover")}
                    style={{ ...cardBase, gridTemplateColumns: "40px minmax(0, 1fr)", padding: "8px 10px" }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: 40,
                        height: 40,
                        clipPath: PIXEL_CLIP_SM,
                        background: memento.completed ? `${memento.item.accent || C.gold}18` : "rgba(255,255,255,0.03)",
                        border: `2px ${memento.completed ? "solid" : "dotted"} ${memento.completed ? (memento.item.accent || C.gold) + "77" : C.textMuted + "55"}`,
                        fontSize: 20,
                        filter: memento.completed ? "none" : "grayscale(1) brightness(0.7)",
                        opacity: memento.completed ? 1 : 0.65,
                      }}
                    >
                      {memento.completed ? memento.item.emoji : "?"}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", color: memento.completed ? C.textPrimary : C.textSecondary, fontWeight: 800, fontSize: "0.76rem", lineHeight: 1.3 }}>
                        {memento.item.title}
                      </span>
                      <PixelText size="0.66rem" color={memento.completed ? C.gold : C.textSecondary} style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {memento.completed ? "✓ On the shelf" : "Finish to earn"}
                      </PixelText>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "stats" && (
        <div
          id="wonder-drawer-panel-stats"
          role="tabpanel"
          aria-labelledby="wonder-drawer-tab-stats"
          data-testid="progress-room-stats"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}
        >
          {statItems.map((item) => (
            <DrawerStat
              key={item.label}
              label={item.label}
              value={item.value}
              color={item.color}
              icon={item.icon}
              statAssets={statAssets}
            />
          ))}
        </div>
      )}
    </section>
  );
}
