import { C } from "../../theme.js";
import { DOOR_OPEN_DELAY_MS } from "./trackerThemes.js";

// Shared keyframes + classes used by the door button, Ari portrait, and brain
// art across every tracker variant. Rendered once by ThoughtProgressPanel.
export const WONDER_CORE_CSS = `
  @keyframes key-glint {
    0%, 70%, 100% { opacity: 0.12; transform: rotate(45deg) scale(0.55); }
    76%, 82% { opacity: 1; transform: rotate(45deg) scale(1.05); }
  }
  @keyframes door-beam {
    0%, 72%, 100% { opacity: 0.2; transform: translateX(0); }
    80% { opacity: 0.8; transform: translateX(10px); }
  }
  @keyframes door-closed-frame {
    0%, 24% { opacity: 1; }
    25%, 100% { opacity: 0; }
  }
  @keyframes door-crack-frame {
    0%, 24% { opacity: 0; }
    25%, 54% { opacity: 1; }
    55%, 100% { opacity: 0; }
  }
  @keyframes door-open-frame {
    0%, 54% { opacity: 0; }
    55%, 82% { opacity: 1; }
    83%, 100% { opacity: 0; }
  }
  @keyframes door-glow-frame {
    0%, 82% { opacity: 0; }
    83%, 100% { opacity: 1; }
  }
  @keyframes brain-node-pulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px ${C.teal}25); }
    50% { transform: scale(1.035); filter: drop-shadow(0 0 18px ${C.teal}55); }
  }
  @keyframes wonder-sparkle-pop {
    0% { opacity: 0; transform: scale(0.4); }
    30% { opacity: 1; transform: scale(1.15); }
    100% { opacity: 0; transform: scale(0.8); }
  }
  .progress-room-key-glint {
    animation: key-glint 6.4s steps(1, end) infinite;
  }
  @keyframes wonder-door-glint {
    0%, 86%, 100% { left: -28%; opacity: 0; }
    88% { opacity: 0.55; }
    96% { left: 110%; opacity: 0.4; }
    97% { opacity: 0; }
  }
  .progress-room-door-frame {
    overflow: hidden;
  }
  .progress-room-door-frame::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -28%;
    width: 16%;
    background: linear-gradient(105deg, transparent, ${C.gold}88, transparent);
    animation: wonder-door-glint 7s steps(6, end) infinite;
    pointer-events: none;
  }
  .progress-room-door-beam {
    animation: door-beam 6.4s steps(1, end) infinite;
  }
  .progress-room-door-button:hover,
  .progress-room-door-button:focus-visible {
    border-color: ${C.gold} !important;
    box-shadow: 0 0 30px ${C.gold}42, inset 0 0 0 1px rgba(255,255,255,0.08) !important;
  }
  .progress-room-door-button:hover .progress-room-door-glow,
  .progress-room-door-button:focus-visible .progress-room-door-glow {
    opacity: 0.28 !important;
  }
  .progress-room-door-button:hover .progress-room-ready-caption,
  .progress-room-door-button:focus-visible .progress-room-ready-caption {
    opacity: 1 !important;
  }
  .progress-room-door-opening .progress-room-door-closed {
    animation: door-closed-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
  }
  .progress-room-door-opening .progress-room-door-crack {
    animation: door-crack-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
  }
  .progress-room-door-opening .progress-room-door-open {
    animation: door-open-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
  }
  .progress-room-door-opening .progress-room-door-glow {
    animation: door-glow-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
  }
  .progress-room-pixel-stat:hover {
    border-color: ${C.gold}66 !important;
    filter: saturate(1.1);
  }
  .thought-progress-brain-frame img {
    animation: brain-node-pulse 3.2s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .progress-room-ari-invite-sprite {
      animation: none !important;
      opacity: 1 !important;
    }
    .progress-room-key-glint,
    .progress-room-ari-portrait-shadow,
    .progress-room-door-beam,
    .progress-room-door-img,
    .progress-room-door-frame::after,
    .thought-progress-brain-frame img {
      animation: none !important;
    }
    .progress-room-door-closed {
      opacity: 1 !important;
    }
    .progress-room-door-crack,
    .progress-room-door-open,
    .progress-room-door-glow {
      opacity: 0 !important;
    }
  }
`;
