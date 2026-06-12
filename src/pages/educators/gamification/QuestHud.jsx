import { useEffect, useState } from "react";

// Diegetic quest HUD: one compact bar — exit, location, progress lights,
// badge collection, sound, and a gear menu for the slower settings. No raw
// state ids ever render here; everything speaks the game's language.
export default function QuestHud({
  progress,
  progressNotSaved,
  rooms,
  totalChallenges,
  completedCount,
  locationLabel,
  onToggleSound,
  onToggleMusic,
  onSetTextSpeed,
  onToggleCalmMode,
  onReset,
  onExit,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const playableRooms = rooms.filter((room) => room.kind !== "home");
  const earned = new Set(progress.collectedBadgeIds || []);
  const textSpeed = progress.textSpeed || "normal";

  useEffect(() => {
    if (!menuOpen) {
      setConfirmingReset(false);
      return undefined;
    }
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <aside data-testid="gamification-pixel-hud" className="gamification-pixel-hud" aria-label="Quest HUD">
      <div className="gamification-hud-bar">
        <button
          type="button"
          className="gamification-hud-exit"
          onClick={onExit}
          aria-label="Back to Educator Resources"
          title="Back to Educator Resources"
        >
          <span aria-hidden="true">{"←"}</span>
          <span className="gamification-hud-exit-label">Exit</span>
        </button>
        <div className="gamification-hud-title">
          <span className="gamification-hud-eyebrow">Gameful Learning Lab</span>
          <strong className="gamification-hud-location">{locationLabel}</strong>
        </div>
        <div
          className="gamification-hud-progress"
          role="img"
          aria-label={`${completedCount} of ${totalChallenges} badges earned`}
        >
          <div className="gamification-hud-cells" aria-hidden="true">
            {Array.from({ length: totalChallenges }, (_, index) => {
              const lit = index < completedCount;
              const newest = lit && index === completedCount - 1;
              return <span key={index} className={`${lit ? "is-lit" : ""} ${newest ? "is-newest" : ""}`.trim()} />;
            })}
          </div>
          <span className="gamification-hud-count" aria-hidden="true">{completedCount}/{totalChallenges}</span>
        </div>
        <div className="gamification-badge-grid" role="list" aria-label="Badge collection">
          {playableRooms.map((room) => {
            const isEarned = earned.has(room.id);
            const badgeName = room.badge?.label || room.label;
            const badgeHabit = room.badge?.habit || "";
            return (
              <div
                key={room.id}
                role="listitem"
                className={`gamification-badge-slot ${isEarned ? "is-earned" : ""}`}
                title={isEarned ? `${badgeName} — ${badgeHabit}` : `Locked badge — complete ${room.label}`}
                aria-label={isEarned ? `${badgeName} badge earned. ${badgeHabit}` : `Badge not yet earned: ${room.label}`}
              >
                {isEarned ? <img src={room.badge?.icon} alt="" aria-hidden="true" /> : <span aria-hidden="true" />}
              </div>
            );
          })}
        </div>
        <div className="gamification-hud-actions">
          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={progress.soundMuted}
          >
            {progress.soundMuted ? "Unmute" : "Mute"}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            Menu
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <button
            type="button"
            className="gamification-hud-menu-backdrop"
            aria-label="Close quest menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="gamification-hud-menu" role="group" aria-label="Quest settings">
            <div className="gamification-menu-row">
              <h2>Text speed</h2>
              <div className="gamification-menu-options">
                {[
                  { id: "slow", label: "Slow" },
                  { id: "normal", label: "Normal" },
                  { id: "instant", label: "Instant" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={textSpeed === option.id}
                    onClick={() => onSetTextSpeed?.(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="gamification-menu-row">
              <h2>Motion</h2>
              <button
                type="button"
                aria-pressed={progress.reducedMotion === true}
                onClick={() => onToggleCalmMode?.()}
              >
                Calm mode (less motion)
              </button>
            </div>
            <div className="gamification-menu-row">
              <h2>Music</h2>
              <button
                type="button"
                aria-pressed={progress.musicMuted !== true}
                onClick={() => onToggleMusic?.()}
              >
                {progress.musicMuted ? "Ambient music: off" : "Ambient music: on"}
              </button>
            </div>
            <div className="gamification-menu-row">
              <h2>Progress</h2>
              {confirmingReset ? (
                <div className="gamification-menu-confirm">
                  <p>Erase all quest progress and badges from this browser?</p>
                  <div className="gamification-menu-options">
                    <button
                      type="button"
                      className="gamification-menu-danger"
                      onClick={() => {
                        setConfirmingReset(false);
                        setMenuOpen(false);
                        onReset?.();
                      }}
                    >
                      Erase
                    </button>
                    <button type="button" onClick={() => setConfirmingReset(false)}>
                      Keep playing
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="gamification-menu-danger"
                  onClick={() => setConfirmingReset(true)}
                >
                  Reset quest
                </button>
              )}
            </div>
            {progressNotSaved && (
              <p className="gamification-storage-warning" role="status">
                Progress is working for this visit, but this browser is blocking saves.
              </p>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
