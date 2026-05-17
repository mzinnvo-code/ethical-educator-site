import { C } from "../theme.js";
import { getSceneIllustration } from "../data/sceneIllustrations.js";

const TONE_ACCENT = {
  young: C.goldLight,
  middle: C.teal,
  high: C.sky,
  educator: C.gold,
  story: C.teal,
};

const MOTION_CLASS = {
  subtle: "subtle",
  glow: "glow",
  mirror: "mirror",
  sharing: "sharing",
  switch: "switch",
  split: "split",
  spotlight: "spotlight",
  road: "road",
  reveal: "reveal",
  "color-wash": "color-wash",
  box: "box",
  scan: "scan",
  warning: "warning",
};

function SceneStyles() {
  return (
    <style>{`
      .eee-illustrated-scene {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        aspect-ratio: 16 / 9;
        background:
          radial-gradient(circle at 50% 20%, rgba(224, 184, 72, 0.15), transparent 32%),
          linear-gradient(135deg, ${C.midnight}, ${C.bg});
        box-shadow:
          0 18px 56px rgba(0, 0, 0, 0.34),
          inset 0 0 0 1px rgba(224, 184, 72, 0.18);
      }

      .eee-illustrated-scene::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(8, 18, 32, 0.08), transparent 38%, rgba(8, 18, 32, 0.22)),
          radial-gradient(circle at 50% 42%, transparent 46%, rgba(5, 10, 18, 0.34));
      }

      .eee-illustrated-scene img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transform: scale(1.025);
        animation: eeeSceneDrift 18s ease-in-out infinite alternate;
      }

      .eee-illustrated-scene[data-fresh="true"] {
        animation: eeeScenePanelIn 0.38s ease-out both;
      }

      .eee-scene__aura,
      .eee-scene__motion,
      .eee-scene__grain {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
      }

      .eee-scene__aura {
        opacity: var(--scene-aura-low);
        background:
          radial-gradient(circle at var(--scene-focus-x) var(--scene-focus-y), var(--scene-accent-soft), transparent 30%),
          radial-gradient(circle at 82% 18%, rgba(42, 136, 192, 0.14), transparent 26%);
        mix-blend-mode: screen;
        animation: eeeSceneGlow 7s ease-in-out infinite alternate;
      }

      .eee-scene__grain {
        z-index: 4;
        opacity: 0.18;
        background-image:
          linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.08) 48%, transparent 54%),
          radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px);
        background-size: 220% 220%, 9px 9px;
        mix-blend-mode: soft-light;
        animation: eeeSceneShimmer 11s ease-in-out infinite alternate;
      }

      .eee-scene__motion {
        opacity: 0.45;
        mix-blend-mode: screen;
      }

      .eee-scene__motion--subtle {
        background: radial-gradient(circle at 50% 50%, var(--scene-accent-soft), transparent 34%);
        animation: eeeSceneBreath 8s ease-in-out infinite alternate;
      }

      .eee-scene__motion--glow,
      .eee-scene__motion--box {
        background:
          radial-gradient(circle at 50% 52%, rgba(224, 184, 72, 0.34), transparent 22%),
          radial-gradient(circle at 50% 52%, rgba(26, 138, 122, 0.18), transparent 42%);
        animation: eeeScenePulse 4.4s ease-in-out infinite;
      }

      .eee-scene__motion--mirror,
      .eee-scene__motion--color-wash {
        background:
          linear-gradient(105deg, transparent 24%, rgba(224, 184, 72, 0.18) 44%, rgba(42, 136, 192, 0.22) 56%, transparent 76%);
        animation: eeeSceneSweep 8s ease-in-out infinite alternate;
      }

      .eee-scene__motion--sharing {
        background:
          radial-gradient(circle at 33% 55%, rgba(224, 184, 72, 0.2), transparent 20%),
          radial-gradient(circle at 67% 55%, rgba(26, 138, 122, 0.2), transparent 20%),
          radial-gradient(circle at 50% 57%, rgba(255, 255, 255, 0.18), transparent 14%);
        animation: eeeSceneShare 6s ease-in-out infinite alternate;
      }

      .eee-scene__motion--switch,
      .eee-scene__motion--road {
        background:
          linear-gradient(138deg, transparent 18%, rgba(224, 184, 72, 0.3) 48%, transparent 54%),
          linear-gradient(42deg, transparent 36%, rgba(42, 136, 192, 0.2) 50%, transparent 62%);
        animation: eeeScenePath 5.8s ease-in-out infinite alternate;
      }

      .eee-scene__motion--split {
        background:
          linear-gradient(90deg, rgba(26, 138, 122, 0.18), transparent 44%, rgba(192, 112, 64, 0.16)),
          repeating-linear-gradient(0deg, transparent 0 9px, rgba(255, 255, 255, 0.08) 10px);
        animation: eeeSceneGlitch 3.8s steps(4, end) infinite;
      }

      .eee-scene__motion--spotlight,
      .eee-scene__motion--reveal {
        background:
          radial-gradient(ellipse at 50% 56%, rgba(224, 184, 72, 0.3), transparent 24%),
          linear-gradient(115deg, transparent 22%, rgba(224, 184, 72, 0.2) 48%, transparent 68%);
        animation: eeeSceneSpotlight 6.5s ease-in-out infinite alternate;
      }

      .eee-scene__motion--scan {
        background:
          repeating-linear-gradient(180deg, transparent 0 18px, rgba(42, 136, 192, 0.22) 20px, transparent 23px),
          linear-gradient(90deg, transparent, rgba(224, 184, 72, 0.12), transparent);
        animation: eeeSceneScan 5.4s linear infinite;
      }

      .eee-scene__motion--warning {
        background:
          radial-gradient(circle at 50% 52%, rgba(192, 112, 64, 0.28), transparent 22%),
          radial-gradient(circle at 50% 52%, rgba(224, 184, 72, 0.18), transparent 40%);
        animation: eeeSceneWarning 2.7s ease-in-out infinite;
      }

      .eee-scene__choice {
        position: absolute;
        right: 14px;
        bottom: 12px;
        z-index: 5;
        display: flex;
        gap: 6px;
        opacity: 0.76;
      }

      .eee-scene__choice i {
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: var(--scene-accent);
        box-shadow: 0 0 12px var(--scene-accent);
      }

      .eee-scene__progress {
        position: absolute;
        left: 14px;
        top: 12px;
        z-index: 5;
        display: flex;
        gap: 5px;
        padding: 7px 8px;
        border-radius: 999px;
        background: rgba(5, 10, 18, 0.42);
        border: 1px solid rgba(224, 220, 208, 0.12);
        backdrop-filter: blur(8px);
      }

      .eee-scene__progress i {
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: rgba(224, 220, 208, 0.28);
      }

      .eee-scene__progress i.is-active {
        background: var(--scene-accent);
        box-shadow: 0 0 12px var(--scene-accent);
      }

      @keyframes eeeScenePanelIn {
        from { opacity: 0.36; transform: translateY(8px) scale(0.992); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes eeeSceneDrift {
        from { transform: scale(1.025) translate3d(-0.35%, -0.25%, 0); }
        to { transform: scale(1.06) translate3d(0.45%, 0.35%, 0); }
      }

      @keyframes eeeSceneGlow {
        from { opacity: var(--scene-aura-low); }
        to { opacity: var(--scene-aura-high); }
      }

      @keyframes eeeSceneShimmer {
        from { background-position: 0% 0%, 0 0; }
        to { background-position: 100% 100%, 18px 10px; }
      }

      @keyframes eeeSceneBreath {
        from { opacity: 0.24; transform: scale(0.98); }
        to { opacity: 0.5; transform: scale(1.04); }
      }

      @keyframes eeeScenePulse {
        0%, 100% { opacity: 0.38; transform: scale(0.98); }
        50% { opacity: 0.72; transform: scale(1.05); }
      }

      @keyframes eeeSceneSweep {
        from { opacity: 0.2; transform: translateX(-7%); }
        to { opacity: 0.58; transform: translateX(7%); }
      }

      @keyframes eeeSceneShare {
        from { opacity: 0.28; transform: translateX(-1.5%); }
        to { opacity: 0.62; transform: translateX(1.5%); }
      }

      @keyframes eeeScenePath {
        from { opacity: 0.28; background-position: 0 0, 0 0; }
        to { opacity: 0.68; background-position: 34px 0, -28px 0; }
      }

      @keyframes eeeSceneGlitch {
        0%, 100% { opacity: 0.22; transform: translateX(0); }
        40% { opacity: 0.58; transform: translateX(-0.4%); }
        60% { opacity: 0.34; transform: translateX(0.4%); }
      }

      @keyframes eeeSceneSpotlight {
        from { opacity: 0.25; transform: translateY(1%); }
        to { opacity: 0.62; transform: translateY(-1%); }
      }

      @keyframes eeeSceneScan {
        from { opacity: 0.16; background-position: 0 -80px, 0 0; }
        to { opacity: 0.48; background-position: 0 80px, 0 0; }
      }

      @keyframes eeeSceneWarning {
        0%, 100% { opacity: 0.24; transform: scale(0.98); }
        50% { opacity: 0.72; transform: scale(1.03); }
      }

      @media (max-width: 520px) {
        .eee-illustrated-scene {
          border-radius: 12px !important;
          margin-bottom: 18px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .eee-illustrated-scene,
        .eee-illustrated-scene img,
        .eee-scene__aura,
        .eee-scene__motion,
        .eee-scene__grain {
          animation: none !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

export default function IllustratedScene({
  experimentId,
  stage = 0,
  stageId,
  stageTitle,
  stageCount,
  visualVariant,
  chose = [],
  mode = "story",
}) {
  const stageIndex = Number(stage) || 0;
  const illustration = getSceneIllustration(experimentId, {
    stageId,
    stageIndex,
    stageTitle,
    visualVariant,
  });
  if (!illustration?.src) return null;

  const motion = MOTION_CLASS[illustration.motion] || "subtle";
  const tone = illustration.tone || "story";
  const accent = TONE_ACCENT[tone] || C.teal;
  const choiceCount = Array.isArray(chose) ? chose.filter(Boolean).length : 0;
  const maxWidth = mode === "kid" ? 640 : 700;
  const stageDepth = Math.min(stageIndex, 4);
  const progressTotal = Math.max(Number(stageCount) || 0, 0);
  const progressIndex = progressTotal ? Math.min(stageIndex, progressTotal - 1) : -1;

  return (
    <>
      <SceneStyles />
      <figure
        key={`${visualVariant || "default"}:${illustration.src}`}
        className={`eee-illustrated-scene eee-illustrated-scene--${tone}`}
        data-motion={motion}
        data-stage={stage}
        data-stage-id={stageId || stage}
        data-variant={visualVariant || "default"}
        data-fresh="true"
        style={{
          "--scene-accent": accent,
          "--scene-accent-soft": `${accent}44`,
          "--scene-focus-x": mode === "kid" ? "52%" : "50%",
          "--scene-focus-y": stage > 0 ? "52%" : "46%",
          "--scene-stage": stage,
          "--scene-aura-low": 0.2 + stageDepth * 0.025,
          "--scene-aura-high": 0.34 + stageDepth * 0.035,
          width: "100%",
          maxWidth,
          margin: "0 auto 22px",
          borderRadius: 16,
          border: `1px solid ${accent}24`,
        }}
      >
        <img src={illustration.src} alt={illustration.alt} decoding="async" loading="eager" />
        {progressTotal > 1 && (
          <span className="eee-scene__progress" aria-hidden="true">
            {Array.from({ length: Math.min(progressTotal, 6) }).map((_, index) => (
              <i key={index} className={index <= progressIndex ? "is-active" : ""} />
            ))}
          </span>
        )}
        <span className="eee-scene__aura" aria-hidden="true" />
        <span className={`eee-scene__motion eee-scene__motion--${motion}`} aria-hidden="true" />
        <span className="eee-scene__grain" aria-hidden="true" />
        {choiceCount > 0 && (
          <span className="eee-scene__choice" aria-hidden="true">
            {Array.from({ length: Math.min(choiceCount, 3) }).map((_, index) => <i key={index} />)}
          </span>
        )}
      </figure>
    </>
  );
}

export function createIllustratedScene(experimentId) {
  return function ThoughtExperimentIllustration(props) {
    return <IllustratedScene experimentId={experimentId} {...props} />;
  };
}
