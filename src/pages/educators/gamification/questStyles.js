import { C } from "../../../theme.js";

// Quest z-order ladder (keep in sync when adding overlays):
//   page shell (GamificationInEducation portal)  z 1200
//   in-shell layers: loading screen 16, ticker/room overlay 18, HUD 20,
//   HUD menu 22, transcript 25
//   iris wipe (wonder IrisOverlay)               z 10500
//   celebration overlays (portal to body)        z 11000
//   bonus mission overlay (portal to body)       z 11500
export const gameStyles = `
  .gamification-phaser-shell,
  .gamification-phaser-shell * {
    box-sizing: border-box;
    min-width: 0;
  }

  .gamification-phaser-shell {
    --gamification-hud-safe-top: clamp(64px, 9vh, 80px);
    position: relative;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    /* iOS: stop rubber-band scroll from peeking behind the fixed shell. */
    overscroll-behavior: none;
    background: #07111f;
    color: ${C.textPrimary};
    font-family: inherit;
  }

  .gamification-phaser-shell button {
    /* Kill the 300ms double-tap-zoom delay on touch devices. */
    touch-action: manipulation;
  }

  .gamification-stage-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    place-items: center;
    background:
      radial-gradient(circle at 50% 32%, rgba(42,189,193,0.11), transparent 36%),
      linear-gradient(180deg, #07111f, #030812);
  }

  .gamification-phaser-stage {
    position: absolute;
    inset: 0;
    display: grid;
    align-items: start;
    justify-items: center;
    padding-top: var(--gamification-hud-safe-top);
  }

  .gamification-phaser-stage canvas {
    width: min(100vw, calc((100dvh - var(--gamification-hud-safe-top)) * 16 / 9)) !important;
    height: min(calc(100dvh - var(--gamification-hud-safe-top)), calc(100vw * 9 / 16)) !important;
    max-width: 100vw;
    max-height: calc(100dvh - var(--gamification-hud-safe-top));
    image-rendering: pixelated;
  }

  /* ---- Loading screen ------------------------------------------------- */

  .gamification-loading-screen {
    position: absolute;
    inset: 0;
    z-index: 16;
    display: grid;
    place-items: center;
    padding: calc(var(--gamification-hud-safe-top) + 8px) 16px 16px;
    background:
      radial-gradient(circle at 50% 36%, rgba(42,189,193,0.1), transparent 40%),
      linear-gradient(180deg, #07111f, #030812);
    transition: opacity 220ms steps(6, end);
  }

  .gamification-loading-screen.is-leaving {
    opacity: 0;
    pointer-events: none;
  }

  .gamification-loading-inner {
    display: grid;
    justify-items: center;
    gap: 12px;
    padding: 22px 26px;
    min-width: min(380px, calc(100vw - 48px));
  }

  .gamification-loading-inner img {
    width: 84px;
    height: auto;
    image-rendering: pixelated;
    filter: drop-shadow(0 10px 16px rgba(0,0,0,0.4));
  }

  .gamification-loading-screen:not(.is-reduced) .gamification-loading-inner img {
    animation: gamificationLoaderBob 1.1s steps(2, end) infinite;
  }

  @keyframes gamificationLoaderBob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  .gamification-loading-title {
    color: ${C.gold};
    font-size: 0.72rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .gamification-loading-bar {
    width: 100%;
    height: 14px;
    border: 2px solid rgba(224,184,72,0.7);
    background: rgba(8,18,32,0.92);
    overflow: hidden;
  }

  .gamification-loading-bar > span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, ${C.teal}, ${C.gold});
    transition: width 180ms steps(8, end);
  }

  .gamification-loading-tip {
    margin: 0;
    max-width: 360px;
    color: ${C.textSecondary};
    font-size: 0.8rem;
    line-height: 1.5;
    text-align: center;
    min-height: 2.4em;
  }

  .gamification-loading-tip strong {
    color: ${C.tealText};
  }

  /* ---- HUD ------------------------------------------------------------- */

  .gamification-pixel-hud {
    position: absolute;
    top: max(8px, env(safe-area-inset-top));
    left: max(10px, env(safe-area-inset-left));
    right: max(10px, env(safe-area-inset-right));
    z-index: 20;
    max-width: 1180px;
    margin: 0 auto;
  }

  .gamification-hud-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 7px 10px;
    border: 2px solid rgba(200,152,48,0.74);
    background: rgba(7,17,31,0.86);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.26), 0 12px 32px rgba(0,0,0,0.36);
    backdrop-filter: blur(4px);
  }

  .gamification-hud-exit {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border: 1px solid rgba(224,184,72,0.62);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .gamification-hud-title {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 1px;
  }

  .gamification-hud-eyebrow {
    color: ${C.gold};
    font-size: 0.6rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .gamification-hud-location {
    color: ${C.textPrimary};
    font-size: 0.86rem;
    font-weight: 800;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gamification-hud-progress {
    flex: 0 1 220px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .gamification-hud-cells {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 3px;
    height: 14px;
    padding: 2px;
    border: 1px solid rgba(224,184,72,0.55);
    background: rgba(8,18,32,0.92);
  }

  .gamification-hud-cells span {
    background: rgba(255,255,255,0.08);
  }

  .gamification-hud-cells span.is-lit {
    background: linear-gradient(180deg, #ffe9a8, ${C.gold});
    box-shadow: 0 0 7px rgba(224,184,72,0.55);
  }

  .gamification-hud-cells span.is-newest {
    animation: gamificationCellGlow 1.4s steps(3, end) infinite;
  }

  @keyframes gamificationCellGlow {
    0%, 100% { box-shadow: 0 0 5px rgba(224,184,72,0.4); }
    50% { box-shadow: 0 0 12px rgba(255,233,168,0.85); }
  }

  .gamification-hud-count {
    color: ${C.gold};
    font-size: 0.78rem;
    font-weight: 950;
    white-space: nowrap;
  }

  .gamification-badge-grid {
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: repeat(9, 26px);
    gap: 4px;
  }

  .gamification-badge-slot {
    width: 26px;
    height: 26px;
    border: 1px solid rgba(224,184,72,0.4);
    background: rgba(8,18,32,0.88);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .gamification-badge-slot.is-earned {
    border-color: ${C.gold};
    filter: drop-shadow(0 0 7px rgba(224,184,72,0.4));
  }

  .gamification-badge-slot img {
    width: 21px;
    height: 21px;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .gamification-badge-slot > span {
    width: 9px;
    height: 9px;
    background: rgba(255,255,255,0.08);
  }

  .gamification-hud-actions {
    flex: 0 0 auto;
    display: flex;
    gap: 6px;
  }

  .gamification-hud-actions button {
    padding: 7px 10px;
    border: 1px solid rgba(224,184,72,0.62);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1.2;
  }

  .gamification-hud-actions button[aria-expanded="true"] {
    border-color: ${C.gold};
    color: ${C.gold};
  }

  .gamification-hud-menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 21;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: default;
  }

  .gamification-hud-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    z-index: 22;
    width: min(300px, calc(100vw - 24px));
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 2px solid rgba(200,152,48,0.74);
    background: rgba(7,17,31,0.97);
    box-shadow: 0 18px 44px rgba(0,0,0,0.5);
  }

  .gamification-hud-menu h2 {
    margin: 0;
    color: ${C.gold};
    font-size: 0.64rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .gamification-menu-row {
    display: grid;
    gap: 7px;
  }

  .gamification-menu-options {
    display: flex;
    gap: 6px;
  }

  .gamification-menu-options button,
  .gamification-menu-row > button {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid rgba(95,113,136,0.72);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-size: 0.74rem;
    font-weight: 850;
  }

  .gamification-menu-options button[aria-pressed="true"],
  .gamification-menu-row > button[aria-pressed="true"] {
    border-color: ${C.teal};
    color: ${C.tealText};
    box-shadow: inset 0 0 0 1px rgba(42,189,193,0.4);
  }

  .gamification-menu-danger {
    border-color: rgba(240,116,96,0.5) !important;
  }

  .gamification-menu-confirm {
    display: grid;
    gap: 7px;
    padding: 9px;
    border: 1px solid rgba(240,116,96,0.5);
    background: rgba(240,116,96,0.1);
  }

  .gamification-menu-confirm p {
    margin: 0;
    color: ${C.textPrimary};
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .gamification-storage-warning {
    margin: 0;
    padding: 7px 9px;
    border: 1px solid rgba(240,116,96,0.42);
    background: rgba(240,116,96,0.12);
    color: ${C.textPrimary};
    font-size: 0.74rem;
    line-height: 1.35;
  }

  /* ---- Overworld objective ticker -------------------------------------- */

  .gamification-overworld-prompt {
    position: absolute;
    z-index: 18;
    top: calc(var(--gamification-hud-safe-top) + 4px);
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 9px;
    max-width: min(640px, calc(100vw - 24px));
    padding: 7px 13px;
    border: 2px solid rgba(42,189,193,0.58);
    background: rgba(7,17,31,0.88);
    box-shadow: 0 10px 26px rgba(0,0,0,0.36);
    transition: opacity 320ms steps(4, end);
  }

  .gamification-overworld-prompt[data-dimmed="true"] {
    opacity: 0.25;
  }

  .gamification-overworld-prompt > span:first-child {
    color: ${C.tealText};
    font-size: 0.62rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .gamification-overworld-prompt strong {
    color: ${C.textPrimary};
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gamification-ticker-ari {
    width: 26px;
    height: 39px;
    flex: 0 0 auto;
    background-image: url("/experiment-scenes/gamification-article/ari-teacher-sheet.png");
    background-size: 208px 39px;
    background-position: -26px 0;
    image-rendering: pixelated;
  }

  .gamification-overworld-prompt:not([data-reduced="true"]) .gamification-ticker-ari {
    animation: gamificationTickerWalk 0.46s steps(1, end) infinite;
  }

  @keyframes gamificationTickerWalk {
    0%, 100% { background-position: -26px 0; }
    50% { background-position: -52px 0; }
  }

  /* Keyboard/SR travel controls: visually hidden until focused, then a
     readable pixel panel — same reveal pattern as the crawlable fallback. */
  .gamification-sr-controls {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  .gamification-sr-controls:focus-within {
    position: fixed;
    inset: auto auto 18px 50%;
    transform: translateX(-50%);
    z-index: 26;
    width: auto;
    height: auto;
    margin: 0;
    padding: 10px 12px;
    overflow: visible;
    clip: auto;
    clip-path: none;
    white-space: normal;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    border: 2px solid rgba(224,184,72,0.72);
    background: rgba(7,17,31,0.97);
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  }

  .gamification-sr-controls button {
    padding: 7px 10px;
    border: 1px solid rgba(224,184,72,0.52);
    background: rgba(8,18,32,0.9);
    color: ${C.textMuted};
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 900;
  }

  .gamification-sr-controls button:not(:disabled) {
    color: ${C.gold};
    border-color: ${C.gold};
  }

  .gamification-sr-controls button:focus-visible,
  .gamification-return-gate:focus-visible,
  .gamification-hud-exit:focus-visible,
  .gamification-hud-actions button:focus-visible,
  .gamification-menu-options button:focus-visible,
  .gamification-menu-row > button:focus-visible,
  .gamification-answer-grid button:focus-visible,
  .gamification-dialogue-controls button:focus-visible {
    outline: 3px solid rgba(42,189,193,0.72);
    outline-offset: 2px;
  }

  /* ---- Phaser fallback -------------------------------------------------- */

  .gamification-phaser-fallback {
    padding: var(--gamification-hud-safe-top) 16px 16px;
    display: grid;
    place-items: center;
    color: ${C.textPrimary};
  }

  .gamification-phaser-fallback > div {
    max-width: 520px;
    display: grid;
    gap: 8px;
    padding: 16px;
    border: 2px solid rgba(224,184,72,0.58);
    background: rgba(7,17,31,0.9);
    box-shadow: 0 18px 42px rgba(0,0,0,0.36);
  }

  .gamification-phaser-fallback strong {
    color: ${C.gold};
    font-size: 0.88rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-phaser-fallback span {
    color: ${C.textSecondary};
    line-height: 1.55;
  }

  /* ---- Room overlay ------------------------------------------------------ */

  .gamification-room-overlay {
    position: absolute;
    z-index: 18;
    inset: calc(var(--gamification-hud-safe-top) + 10px) 14px 14px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 12px;
    pointer-events: none;
  }

  .gamification-dialogue-overlay {
    pointer-events: auto;
    align-self: end;
    grid-column: 1;
    padding: 14px;
    border: 2px solid rgba(42,189,193,0.58);
    background: rgba(7,17,31,0.86);
    box-shadow: inset 0 0 0 2px rgba(255,255,255,0.03), 0 18px 42px rgba(0,0,0,0.36);
    cursor: pointer;
  }

  .gamification-dialogue-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin: 0 0 8px;
  }

  .gamification-dialogue-header > span:first-child {
    color: ${C.tealText};
    font-size: 0.68rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .gamification-beat-pips {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }

  .gamification-beat-pips i {
    width: 7px;
    height: 7px;
    background: rgba(255,255,255,0.14);
  }

  .gamification-beat-pips i.is-done {
    background: ${C.teal};
    box-shadow: 0 0 5px rgba(42,189,193,0.5);
  }

  .gamification-challenge-card > p,
  .gamification-prompt-recipe > p,
  .gamification-charter-card > p {
    margin: 0 0 8px;
    color: ${C.tealText};
    font-size: 0.68rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .gamification-dialogue-overlay strong.gamification-dialogue-title {
    display: block;
    color: ${C.textPrimary};
    font-size: clamp(0.88rem, 1.3vw, 1.05rem);
    letter-spacing: 0;
    text-transform: none;
  }

  .gamification-dialogue-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
  }

  .gamification-dialogue-controls button {
    padding: 8px 11px;
    border: 1px solid rgba(224,184,72,0.62);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-weight: 900;
    line-height: 1.25;
  }

  .gamification-dialogue-controls button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .gamification-dialogue-hint {
    margin-left: auto;
    color: ${C.textMuted};
    font-size: 0.68rem;
    letter-spacing: 0.04em;
  }

  .gamification-room-side {
    pointer-events: auto;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: end;
    max-height: calc(100dvh - var(--gamification-hud-safe-top) - 34px);
    overflow: auto;
    display: grid;
    gap: 10px;
    padding: 12px;
    border: 2px solid rgba(200,152,48,0.52);
    background: rgba(7,17,31,0.86);
  }

  .gamification-rail-tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }

  .gamification-rail-tabs button {
    padding: 8px 4px;
    border: 1px solid rgba(95,113,136,0.6);
    background: rgba(8,18,32,0.9);
    color: ${C.textMuted};
    cursor: pointer;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .gamification-rail-tabs button[aria-selected="true"] {
    border-color: ${C.gold};
    color: ${C.gold};
    background: rgba(224,184,72,0.1);
  }

  .gamification-rail-tabs button:focus-visible {
    outline: 3px solid rgba(42,189,193,0.72);
    outline-offset: 2px;
  }

  .gamification-rail-panel {
    display: grid;
    gap: 10px;
    content-visibility: auto;
  }

  .gamification-rail-label {
    margin: 0 0 8px;
    color: ${C.tealText};
    font-size: 0.66rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-rail-empty {
    margin: 0;
    color: ${C.textMuted};
    font-size: 0.82rem;
  }

  .gamification-classroom-panel {
    display: grid;
    gap: 10px;
  }

  .gamification-meta-callout,
  .gamification-gradeband-card,
  .gamification-transfer-card,
  .gamification-distinction-card,
  .gamification-evidence-card,
  .gamification-scorecard,
  .gamification-blueprint,
  .gamification-te-link {
    border: 1px solid rgba(42,189,193,0.34);
    background: rgba(15,32,52,0.78);
    padding: 10px;
  }

  .gamification-bonus-cta {
    border: 1px solid rgba(224,184,72,0.55);
    border-radius: 10px;
    background:
      radial-gradient(circle at 14% 30%, rgba(224,184,72,0.16), transparent 44%),
      rgba(15,32,52,0.82);
    padding: 11px 12px;
    display: grid;
    gap: 8px;
  }

  .gamification-bonus-cta p {
    margin: 0;
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .gamification-meta-callout {
    border-color: rgba(42,189,193,0.55);
    background:
      radial-gradient(circle at 12% 30%, rgba(42,189,193,0.14), transparent 42%),
      rgba(15,32,52,0.82);
  }

  .gamification-meta-callout p:last-child,
  .gamification-transfer-card p:last-child,
  .gamification-gradeband-text,
  .gamification-distinction-card p,
  .gamification-caution-card p,
  .gamification-evidence-card p,
  .gamification-te-link p {
    margin: 0;
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .gamification-distinction-card p,
  .gamification-caution-card p,
  .gamification-evidence-card p {
    margin-top: 7px;
  }

  .gamification-distinction-card p:first-of-type,
  .gamification-caution-card p:first-of-type,
  .gamification-evidence-card p:first-of-type {
    margin-top: 0;
  }

  .gamification-distinction-card strong,
  .gamification-caution-card strong,
  .gamification-evidence-card strong,
  .gamification-scorecard strong {
    color: ${C.textPrimary};
  }

  .gamification-distinction-note {
    font-style: italic;
  }

  .gamification-caution-card {
    border: 1px solid rgba(208,138,88,0.5);
    background:
      radial-gradient(circle at 14% 24%, rgba(192,112,64,0.14), transparent 40%),
      rgba(15,32,52,0.82);
    padding: 10px;
  }

  .gamification-evidence-card a {
    color: ${C.gold};
  }

  .gamification-gradeband-switch {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 9px;
  }

  .gamification-gradeband-switch button {
    padding: 7px 4px;
    border: 1px solid rgba(95,113,136,0.6);
    background: rgba(8,18,32,0.9);
    color: ${C.textMuted};
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 900;
  }

  .gamification-gradeband-switch button[aria-pressed="true"] {
    border-color: ${C.teal};
    color: ${C.tealText};
    background: rgba(42,189,193,0.1);
  }

  .gamification-gradeband-switch button:focus-visible {
    outline: 3px solid rgba(42,189,193,0.72);
    outline-offset: 2px;
  }

  .gamification-scorecard-row {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(95,113,136,0.3);
  }

  .gamification-scorecard-row:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
  }

  .gamification-scorecard-row p {
    margin: 3px 0 0;
    color: ${C.textSecondary};
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .gamification-scorecard-row .is-correct {
    color: ${C.tealText};
    font-weight: 900;
  }

  .gamification-scorecard-row .is-wrong {
    color: ${C.coralText};
    font-weight: 900;
  }

  .gamification-blueprint-intro {
    margin: 0 0 8px;
    color: ${C.textSecondary};
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .gamification-blueprint ol {
    margin: 0 0 10px;
    padding-left: 18px;
    display: grid;
    gap: 10px;
  }

  .gamification-blueprint li strong {
    display: block;
    color: ${C.textPrimary};
    font-size: 0.84rem;
  }

  .gamification-blueprint li > span {
    display: block;
    color: ${C.textSecondary};
    font-size: 0.78rem;
    line-height: 1.45;
    margin-top: 2px;
  }

  .gamification-blueprint-example {
    margin-top: 6px;
    padding: 7px 9px;
    border: 1px solid rgba(95,113,136,0.35);
    background: rgba(8,18,32,0.6);
  }

  .gamification-blueprint-example em {
    color: ${C.gold};
    font-size: 0.66rem;
    font-style: normal;
    font-weight: 950;
    letter-spacing: 0.08em;
  }

  .gamification-blueprint-example p {
    margin: 3px 0 0;
    color: ${C.textSecondary};
    font-size: 0.76rem;
    line-height: 1.45;
  }

  .gamification-blueprint-example s {
    color: ${C.textMuted};
  }

  .gamification-bonus-check {
    border-color: rgba(208,138,88,0.45) !important;
  }

  .gamification-trophy-case {
    border: 1px solid rgba(224,184,72,0.55);
    background:
      radial-gradient(circle at 50% 14%, rgba(224,184,72,0.14), transparent 46%),
      rgba(15,32,52,0.82);
    padding: 10px;
    display: grid;
    gap: 9px;
  }

  .gamification-trophy-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 7px;
  }

  .gamification-trophy-list li {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 9px;
    align-items: center;
  }

  .gamification-trophy-list img {
    width: 34px;
    height: 34px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 0 6px rgba(224,184,72,0.3));
  }

  .gamification-trophy-list strong {
    display: block;
    color: ${C.textPrimary};
    font-size: 0.8rem;
  }

  .gamification-trophy-list em {
    display: block;
    color: ${C.textMuted};
    font-size: 0.7rem;
    font-style: normal;
    line-height: 1.3;
  }

  .gamification-challenge-card,
  .gamification-prompt-recipe,
  .gamification-charter-card,
  .gamification-locked-activity,
  .gamification-return-gate-card,
  .gamification-source-drawer,
  .gamification-mission-log,
  .gamification-workshop-cards article {
    border: 1px solid rgba(42,189,193,0.34);
    background: rgba(15,32,52,0.78);
    padding: 10px;
  }

  .gamification-challenge-card h3 {
    margin: 0 0 10px;
    color: ${C.textPrimary};
    font-size: 0.98rem;
    line-height: 1.25;
  }

  .gamification-answer-grid {
    display: grid;
    gap: 8px;
  }

  .gamification-answer-grid button {
    width: 100%;
    text-align: left;
    padding: 10px;
    border: 1px solid rgba(95,113,136,0.72);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-weight: 900;
    line-height: 1.25;
  }

  .gamification-answer-grid button.is-picked {
    border-color: ${C.teal};
  }

  .gamification-answer-grid button.is-wrong {
    border-color: ${C.coral};
  }

  .gamification-challenge-card p.is-correct {
    color: ${C.tealText};
  }

  .gamification-challenge-card p.is-wrong {
    color: ${C.coralText};
  }

  .gamification-reward-card {
    display: grid;
    grid-template-columns: 86px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    padding: 8px;
    border: 1px solid rgba(224,184,72,0.58);
    background: rgba(224,184,72,0.1);
  }

  .gamification-reward-card img {
    width: 86px;
    height: 48px;
    object-fit: cover;
    image-rendering: pixelated;
  }

  .gamification-reward-card span {
    display: block;
    color: ${C.gold};
    font-size: 0.65rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-reward-card strong,
  .gamification-return-gate-card strong {
    display: block;
    color: ${C.textPrimary};
    font-size: 0.95rem;
  }

  .gamification-reward-card em {
    display: block;
    margin-top: 3px;
    color: ${C.textMuted};
    font-size: 0.76rem;
    font-style: normal;
    line-height: 1.35;
  }

  .gamification-return-gate-card {
    display: grid;
    gap: 9px;
    border-color: rgba(224,184,72,0.68);
    background:
      radial-gradient(circle at 18% 45%, rgba(224,184,72,0.18), transparent 34%),
      rgba(15,32,52,0.82);
    box-shadow: 0 0 0 1px rgba(224,184,72,0.12), 0 0 24px rgba(224,184,72,0.14);
  }

  .gamification-return-gate-card > span {
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.42;
  }

  .gamification-return-gate,
  .gamification-primary-action {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid rgba(224,184,72,0.62);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-weight: 900;
    line-height: 1.25;
  }

  .gamification-return-gate {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    text-align: left;
    padding: 10px;
    border: 2px solid ${C.gold};
    background:
      linear-gradient(90deg, rgba(224,184,72,0.16), rgba(42,189,193,0.1)),
      rgba(8,18,32,0.94);
    box-shadow: 0 0 18px rgba(224,184,72,0.28);
    animation: gamificationGatePulse 1.25s steps(4, end) infinite;
  }

  .gamification-return-gate img {
    width: 58px;
    height: 58px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 0 8px rgba(224,184,72,0.38));
  }

  .gamification-return-gate span {
    display: grid;
    gap: 3px;
  }

  .gamification-return-gate strong {
    color: ${C.textPrimary};
    font-size: 0.94rem;
  }

  .gamification-return-gate em {
    color: ${C.gold};
    font-size: 0.72rem;
    font-style: normal;
    line-height: 1.3;
  }

  @keyframes gamificationGatePulse {
    0%, 100% { transform: translateY(0); box-shadow: 0 0 16px rgba(224,184,72,0.22); }
    50% { transform: translateY(-1px); box-shadow: 0 0 26px rgba(224,184,72,0.42); }
  }

  .gamification-source-drawer summary,
  .gamification-mission-log summary,
  .gamification-teacher-transcript summary {
    cursor: pointer;
    color: ${C.gold};
    font-size: 0.72rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-source-drawer div {
    display: grid;
    gap: 7px;
    margin-top: 9px;
  }

  .gamification-source-drawer a {
    display: block;
    color: ${C.textPrimary};
    text-decoration: none;
    font-size: 0.78rem;
    line-height: 1.35;
  }

  .gamification-source-drawer span {
    display: block;
    color: ${C.tealText};
    font-size: 0.64rem;
    font-weight: 950;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .gamification-mission-log p,
  .gamification-prompt-recipe li,
  .gamification-charter-card li,
  .gamification-teacher-transcript p {
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.52;
    margin: 8px 0 0;
  }

  .gamification-prompt-recipe ol,
  .gamification-charter-card ul {
    margin: 0;
    padding-left: 18px;
  }

  .gamification-workshop-cards {
    display: grid;
    gap: 7px;
  }

  .gamification-workshop-cards strong {
    display: block;
    color: ${C.textPrimary};
    font-size: 0.78rem;
  }

  .gamification-workshop-cards span {
    display: block;
    margin-top: 3px;
    color: ${C.textMuted};
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .gamification-locked-activity {
    color: ${C.textMuted};
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .gamification-save-toast {
    position: absolute;
    z-index: 24;
    right: 14px;
    bottom: 14px;
    margin: 0;
    padding: 8px 12px;
    border: 1px solid rgba(42,189,193,0.55);
    background: rgba(7,17,31,0.95);
    color: ${C.tealText};
    font-size: 0.74rem;
    font-weight: 850;
    animation: gamificationToastIn 220ms steps(4, end) both;
  }

  @keyframes gamificationToastIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .gamification-teacher-transcript {
    position: absolute;
    z-index: 25;
    left: 14px;
    bottom: 14px;
    width: min(520px, calc(100vw - 28px));
    max-height: 42dvh;
    overflow: auto;
    border: 1px solid rgba(42,189,193,0.34);
    background: rgba(5,13,24,0.98);
    padding: 10px;
  }

  .gamification-teacher-transcript h2 {
    color: ${C.textPrimary};
    font-size: 1rem;
    margin: 12px 0 0;
  }

  .gamification-teacher-transcript a {
    color: ${C.gold};
  }

  @media (prefers-reduced-motion: reduce) {
    .gamification-loading-bar > span,
    .gamification-overworld-prompt {
      transition: none;
    }

    .gamification-loading-inner img,
    .gamification-ticker-ari,
    .gamification-hud-cells span.is-newest,
    .gamification-save-toast,
    .gamification-return-gate {
      animation: none;
    }
  }

  @media (max-width: 860px) {
    .gamification-phaser-shell {
      --gamification-hud-safe-top: 118px;
    }

    .gamification-hud-bar {
      flex-wrap: wrap;
      gap: 8px;
      padding: 6px 8px;
    }

    .gamification-hud-title {
      flex: 1 1 120px;
    }

    .gamification-hud-progress {
      flex: 1 1 160px;
      order: 4;
    }

    .gamification-badge-grid {
      order: 5;
      grid-template-columns: repeat(9, minmax(18px, 24px));
      gap: 3px;
    }

    .gamification-badge-slot {
      width: 100%;
      height: 22px;
    }

    .gamification-badge-slot img {
      width: 18px;
      height: 18px;
    }

    .gamification-hud-exit .gamification-hud-exit-label {
      display: none;
    }

    .gamification-overworld-prompt {
      /* The canvas is width-limited on small screens, leaving open space
         below it — dock the objective there so the map is never covered. */
      top: calc(var(--gamification-hud-safe-top) + (100vw * 9 / 16) + 10px);
      max-width: calc(100vw - 16px);
      padding: 8px 12px;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
    }

    .gamification-overworld-prompt strong {
      font-size: 0.8rem;
      white-space: normal;
    }

    .gamification-overworld-prompt .gamification-ticker-ari {
      display: none;
    }

    .gamification-room-overlay {
      inset: auto 10px 10px;
      max-height: clamp(260px, 46dvh, 380px);
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto auto;
      overflow: auto;
      pointer-events: auto;
    }

    .gamification-dialogue-overlay {
      grid-column: 1;
      align-self: start;
      padding: 12px;
    }

    .gamification-room-side {
      grid-column: 1;
      grid-row: auto;
      align-self: auto;
      max-height: none;
      border-width: 1px;
      padding: 9px;
    }

    .gamification-teacher-transcript {
      position: fixed;
      z-index: 26;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      max-height: 60dvh;
      border-width: 2px 0 0;
      padding: 12px 14px calc(12px + env(safe-area-inset-bottom));
    }
  }

  @media (max-width: 560px) {
    .gamification-hud-count {
      font-size: 0.7rem;
    }

    .gamification-return-gate {
      grid-template-columns: 46px minmax(0, 1fr);
      gap: 9px;
    }

    .gamification-return-gate img {
      width: 46px;
      height: 46px;
    }
  }
`;
