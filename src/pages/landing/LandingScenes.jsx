import { C } from "../../theme.js";
import Image from "../../components/Image.jsx";
import {
  SCENE_VOID,
  SCENE_DILEMMA,
  SCENE_CHOICE,
  SCENE_LIBRARY,
  SCENE_DOORWAYS,
  SCENE_TOOLS,
  SCENE_HANDOFF,
} from "./sceneCopy.js";

// Scene order drives the engine's timeline labels and analytics names.
export const SCENES = [
  SCENE_VOID.id,
  SCENE_DILEMMA.id,
  SCENE_CHOICE.id,
  SCENE_LIBRARY.id,
  SCENE_DOORWAYS.id,
  SCENE_TOOLS.id,
  SCENE_HANDOFF.id,
];

// Doorway/stream colors — locked to the particle palette (teal/gold/sky/coral).
export const ROLE_COLORS = {
  students: C.teal,
  teachers: C.gold,
  administrators: C.sky,
  parents: C.coral,
};

export function LandingStyles() {
  return (
    <style>{`
      .landing{background:${C.bg};position:relative}
      .landing-canvas{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:0}
      .landing-backdrop{position:fixed;inset:0;z-index:2;pointer-events:none}
      .landing-backdrop span{position:absolute;inset:0;opacity:0}
      .landing-scroll{position:relative;z-index:3}
      .landing #home-content{position:relative;z-index:1;background:${C.bg}}
      .landing-stage{position:relative}

      .lscene{display:flex;align-items:center;justify-content:center;padding:84px 24px 64px}
      .lscene-inner{width:min(1060px,100%);margin:0 auto;text-align:center}
      .lscene-kicker{font-family:'JetBrains Mono',monospace;font-size:0.7rem;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;color:${C.sand};margin-bottom:18px}
      .lscene-headline{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:clamp(2rem,4.6vw,3.6rem);line-height:1.08;margin:0 auto 20px;max-width:18em}
      .lscene-body{color:${C.textSecondary};font-size:clamp(0.96rem,1.4vw,1.12rem);line-height:1.74;max-width:620px;margin:0 auto}

      /* Scene 1 — void. Also the pre-enhancement loading state. */
      .lscene-void{min-height:100vh;min-height:100svh;flex-direction:column}
      .lscene-void .lscene-headline{font-size:clamp(2.5rem,6.4vw,5rem);max-width:13em;margin-bottom:30px}
      .void-spark{width:7px;height:7px;border-radius:50%;margin:0 auto 34px;background:${C.goldLight};box-shadow:0 0 18px 5px rgba(224,184,72,0.55),0 0 60px 18px rgba(200,152,48,0.25);animation:voidSpark 3.2s ease-in-out infinite}
      @keyframes voidSpark{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.45);opacity:0.7}}
      .void-hint{display:inline-flex;flex-direction:column;align-items:center;gap:8px;color:${C.textMuted};font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase}
      .void-hint::after{content:"";width:1px;height:42px;background:linear-gradient(${C.gold},transparent);animation:voidDrip 2.2s ease-in-out infinite}
      @keyframes voidDrip{0%{transform:scaleY(0);transform-origin:top}55%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(1);opacity:0}}

      /* Scene 2 — dilemma gallery wall (Phantom-style faceted 3D grid).
         The text stack sits above; the wall and its scrims sit behind it. */
      .lscene-dilemma .lscene-inner{position:relative;z-index:2}
      .dilemma-gallery{position:absolute;inset:-14%;z-index:0;perspective:1200px;pointer-events:none;overflow:hidden}
      .dgallery-plane{display:flex;justify-content:center;align-items:center;gap:clamp(14px,1.9vw,30px);height:100%;transform-style:preserve-3d}
      .dgallery-col{display:flex;flex-direction:column;gap:clamp(16px,2.1vw,32px);flex:none;width:clamp(150px,16.5vw,250px);transform-style:preserve-3d;will-change:transform}
      .dgallery-col:nth-child(odd){margin-top:-7vh}
      .dgallery-col:nth-child(2){margin-top:9vh}
      .dgallery-col:nth-child(4){margin-top:4vh}
      .dgallery-tile{margin:0}
      .dgallery-tile picture{display:block}
      .dgallery-tile img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;border:1px solid ${C.border};background:${C.surface};filter:brightness(0.8) saturate(0.92)}
      .dgallery-tile figcaption{display:flex;justify-content:space-between;gap:10px;padding:7px 2px 0;font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:0.12em;text-transform:uppercase;color:${C.textMuted}}
      .dgallery-tile .dg-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .dgallery-tile .dg-grades{flex:none;color:rgba(224,220,208,0.42)}
      .dgallery-vignette{position:absolute;inset:0;z-index:1;background:radial-gradient(ellipse 72% 64% at 50% 46%,transparent 50%,rgba(11,22,34,0.9) 97%)}
      .dilemma-scrim{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 56% 46% at 50% 44%,rgba(11,22,34,0.93) 0%,rgba(11,22,34,0.5) 58%,transparent 100%)}

      /* Scene 3 — the choice */
      .choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:30px auto 0;max-width:720px}
      .choice-card{appearance:none;font:inherit;text-align:left;cursor:pointer;background:${C.surface};border:1px solid ${C.border};border-radius:14px;padding:20px 22px;color:${C.textSecondary};transition:transform 0.24s ease,border-color 0.24s ease,box-shadow 0.24s ease}
      .choice-card:hover,.choice-card:focus-visible{transform:translateY(-3px);border-color:${C.borderHover};box-shadow:0 14px 44px rgba(0,0,0,0.4)}
      .choice-card[aria-pressed="true"]{border-color:${C.goldLight};box-shadow:inset 0 0 0 1px rgba(224,184,72,0.4),0 14px 44px rgba(0,0,0,0.4)}
      .choice-card .cc-label{display:block;font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:1.18rem;font-weight:600;margin-bottom:6px}
      .choice-card .cc-detail{font-size:0.88rem;line-height:1.6;color:${C.textMuted}}
      .choice-reflection{min-height:5.2em;max-width:640px;margin:26px auto 0;display:flex;flex-direction:column;justify-content:flex-start;gap:10px}
      .choice-reflection .cr-text{color:${C.sand};font-family:'Source Serif 4',Georgia,serif;font-style:italic;font-size:clamp(0.98rem,1.5vw,1.14rem);line-height:1.65}
      .choice-reflection .cr-closing{color:${C.textMuted};font-size:0.86rem}

      /* Scene 4 — library stats */
      .library-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin:40px auto 0;max-width:880px}
      .lstat .ls-value{font-family:'Source Serif 4',Georgia,serif;color:${C.goldLight};font-size:clamp(2rem,4.4vw,3.4rem);line-height:1;font-weight:600}
      .lstat .ls-label{margin-top:8px;font-family:'JetBrains Mono',monospace;color:${C.textMuted};font-size:0.66rem;letter-spacing:0.14em;text-transform:uppercase;line-height:1.6}

      /* Scene 5 — doorways */
      .doorway-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:34px auto 0;max-width:760px;text-align:left}
      .doorway{background:${C.surface};border:1px solid ${C.border};border-left:3px solid var(--accent,${C.gold});border-radius:12px;padding:18px 20px}
      .doorway .dw-label{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:1.06rem;font-weight:600;margin-bottom:6px}
      .doorway .dw-desc{color:${C.textMuted};font-size:0.88rem;line-height:1.62}

      /* Scene 6 — tools */
      .toolbelt-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:34px auto 0;max-width:760px;text-align:left}
      .toolbelt-card{background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:18px 20px}
      .toolbelt-card .tb-name{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:1.04rem;font-weight:600;margin-bottom:6px}
      .toolbelt-card .tb-desc{color:${C.textMuted};font-size:0.88rem;line-height:1.62}

      /* Scene 7 — handoff */
      .lscene-handoff .lscene-headline{font-size:clamp(2.3rem,5.4vw,4.2rem)}

      /* Skip control */
      .landing-skip{position:fixed;right:18px;bottom:18px;z-index:1100;appearance:none;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.16em;text-transform:uppercase;color:${C.textPrimary};background:rgba(11,22,34,0.72);border:1px solid ${C.borderHover};border-radius:999px;padding:10px 18px;backdrop-filter:blur(10px);transition:border-color 0.24s ease,color 0.24s ease}
      .landing-skip:hover,.landing-skip:focus-visible{border-color:${C.goldLight};color:${C.goldLight}}

      /* ---- Cinematic mode (pre-enhancement): scene 1 is the document, the
         rest wait for the engine so reading flow is scene 1 -> home. ---- */
      .landing[data-mode="cinematic"] .lscene{position:absolute;inset:0;visibility:hidden}
      .landing[data-mode="cinematic"] .lscene-void{position:relative;visibility:visible}

      /* ---- Cinematic mode (engine live): stage pinned, scenes stacked,
         GSAP owns opacity/transforms via inline styles. ---- */
      .landing--live .landing-scroll{height:calc(var(--landing-scenes,7.6) * 100vh);height:calc(var(--landing-scenes,7.6) * 100svh)}
      .landing--live .landing-stage{height:100vh;height:100svh;overflow:hidden}
      .landing--live .lscene{position:absolute;inset:0;visibility:visible;opacity:0;pointer-events:none}
      .landing--live .lscene.is-active{pointer-events:auto}
      .landing--live .lscene-void{opacity:1}
      .landing--live .void-spark{animation:none;opacity:0}

      /* ---- Static mode: designed normal-flow bands (reduced motion /
         enhancement aborted). ---- */
      .landing[data-mode="static"] .lscene{position:static;visibility:visible;padding:clamp(56px,9vh,104px) 24px}
      .landing[data-mode="static"] .lscene-void{min-height:calc(100svh - 120px);justify-content:center}
      .static-mark{font-family:'Source Serif 4',Georgia,serif;color:rgba(224,184,72,0.16);font-size:clamp(7rem,18vw,13rem);line-height:0.8;user-select:none;margin-bottom:-0.35em}
      .landing[data-mode="static"] .void-spark{animation:none}
      .landing[data-mode="static"] .void-hint{display:none}
      /* Static dilemma: the wall flattens to a 3x2 grid below the text. */
      .landing[data-mode="static"] .lscene-dilemma{flex-direction:column}
      .landing[data-mode="static"] .lscene-dilemma .lscene-inner{z-index:auto}
      .landing[data-mode="static"] .dilemma-gallery{position:static;inset:auto;perspective:none;overflow:visible;margin:34px auto 0;max-width:880px}
      .landing[data-mode="static"] .dgallery-plane{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start;height:auto}
      .landing[data-mode="static"] .dgallery-col{width:auto;margin-top:0;gap:18px;will-change:auto}
      .landing[data-mode="static"] .dgallery-col:nth-child(n+4){display:none}
      .landing[data-mode="static"] .dgallery-col > .dgallery-tile:nth-child(n+3){display:none}
      .landing[data-mode="static"] .dgallery-tile img{filter:none}
      .landing[data-mode="static"] .dgallery-vignette,.landing[data-mode="static"] .dilemma-scrim{display:none}

      @media(max-width:680px){
        .lscene{padding:76px 18px 56px}
        .lscene-headline{font-size:clamp(1.7rem,7.4vw,2.4rem)}
        .lscene-void .lscene-headline{font-size:clamp(2.1rem,9.6vw,3rem)}
        .lscene-body{font-size:0.92rem;line-height:1.66}
        .dilemma-gallery{inset:-10%}
        .dgallery-col{width:31vw}
        .landing[data-mode="cinematic"] .dgallery-col:nth-child(1),.landing[data-mode="cinematic"] .dgallery-col:nth-child(5){display:none}
        .dgallery-tile figcaption{font-size:0.47rem;letter-spacing:0.08em}
        .landing[data-mode="static"] .dgallery-plane{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .landing[data-mode="static"] .dgallery-col:nth-child(n+3){display:none}
        .landing[data-mode="static"] .dgallery-col{width:auto}
        .choice-grid{grid-template-columns:1fr;gap:12px;margin-top:22px}
        .choice-card{padding:14px 16px}
        .choice-card .cc-label{font-size:1.02rem}
        .choice-reflection{min-height:6.4em;margin-top:18px}
        .library-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:30px}
        .doorway-grid,.toolbelt-grid{grid-template-columns:1fr;gap:10px;margin-top:24px}
        .doorway,.toolbelt-card{padding:13px 16px}
        .doorway .dw-desc,.toolbelt-card .tb-desc{font-size:0.82rem}
        .landing-skip{right:12px;bottom:14px;padding:9px 15px}
      }
    `}</style>
  );
}

export function SceneVoid({ mode }) {
  return (
    <section className="lscene lscene-void" data-scene={SCENE_VOID.id}>
      <div className="lscene-inner">
        {mode === "static" && <div className="static-mark" aria-hidden="true">?</div>}
        <div className="void-spark" aria-hidden="true" />
        <p className="lscene-kicker lreveal">{SCENE_VOID.eyebrow}</p>
        <h1 className="lscene-headline lreveal">{SCENE_VOID.headline}</h1>
        {mode !== "static" && <p className="void-hint lreveal">{SCENE_VOID.hint}</p>}
      </div>
    </section>
  );
}

// The gallery wall: SCENE_DILEMMA.gallery dealt round-robin into columns so
// marquee titles (trolley, Mary's Room, paperclip…) land on the top row.
const GALLERY_COLS = 5;
const GALLERY_COLUMNS = Array.from({ length: GALLERY_COLS }, (_, c) =>
  SCENE_DILEMMA.gallery.filter((_, i) => i % GALLERY_COLS === c)
);
// Per-column scrub drift (px): alternating directions, outer columns travel
// farther — the counter-scrolling-columns effect. Read by the engine.
const GALLERY_DRIFT = [120, -85, 60, -85, 120];

// `wall` gates the gallery markup itself: in cinematic mode HomeLanding flips
// it on only once the engine module has loaded, deferring the image fetches
// past first paint (a CSS display:none gate would NOT stop Chrome from
// fetching boxless lazy images). Static mode renders it from the start.
export function SceneDilemma({ wall = true }) {
  return (
    <section className="lscene lscene-dilemma" data-scene={SCENE_DILEMMA.id}>
      <div className="lscene-inner">
        <p className="lscene-kicker lreveal">{SCENE_DILEMMA.kicker}</p>
        <h2 className="lscene-headline lreveal">{SCENE_DILEMMA.headline}</h2>
        <p className="lscene-body lreveal">{SCENE_DILEMMA.body}</p>
      </div>
      {wall && (
      <div className="dilemma-gallery" aria-hidden="true">
        <div className="dgallery-plane">
          {GALLERY_COLUMNS.map((items, c) => (
            <div
              key={c}
              className="dgallery-col"
              data-gcol={c - (GALLERY_COLS - 1) / 2}
              data-gdrift={GALLERY_DRIFT[c]}
            >
              {items.map((item) => (
                <figure key={item.slug} className="dgallery-tile">
                  <Image src={item.image} alt="" loading="lazy" />
                  <figcaption>
                    <span className="dg-title">{item.title}</span>
                    <span className="dg-grades">{item.grades}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <span className="dgallery-vignette" />
      </div>
      )}
      <div className="dilemma-scrim" aria-hidden="true" />
    </section>
  );
}

export function SceneChoice({ chosen, onChoose, onHoverChoice }) {
  const reflection = SCENE_CHOICE.choices.find((c) => c.key === chosen)?.reflection;
  return (
    <section className="lscene lscene-choice" data-scene={SCENE_CHOICE.id}>
      <div className="lscene-inner">
        <p className="lscene-kicker lreveal">{SCENE_CHOICE.kicker}</p>
        <h2 className="lscene-headline lreveal">{SCENE_CHOICE.headline}</h2>
        <p className="lscene-body lreveal">{SCENE_CHOICE.prompt}</p>
        <div className="choice-grid lreveal">
          {SCENE_CHOICE.choices.map((choice, i) => {
            const bias = i === 0 ? -1 : 1;
            return (
              <button
                key={choice.key}
                type="button"
                className="choice-card"
                aria-pressed={chosen === choice.key}
                onClick={() => onChoose?.(choice.key)}
                onMouseEnter={() => onHoverChoice?.(bias)}
                onMouseLeave={() => onHoverChoice?.(0)}
                onFocus={() => onHoverChoice?.(bias)}
                onBlur={() => onHoverChoice?.(0)}
              >
                <span className="cc-label">{choice.label}</span>
                <span className="cc-detail">{choice.detail}</span>
              </button>
            );
          })}
        </div>
        <div className="choice-reflection" aria-live="polite">
          {reflection && <p className="cr-text">{reflection}</p>}
          {reflection && <p className="cr-closing">{SCENE_CHOICE.closing}</p>}
        </div>
      </div>
    </section>
  );
}

export function SceneLibrary({ mode }) {
  return (
    <section className="lscene lscene-library" data-scene={SCENE_LIBRARY.id}>
      <div className="lscene-inner">
        <p className="lscene-kicker lreveal">{SCENE_LIBRARY.kicker}</p>
        <h2 className="lscene-headline lreveal">{SCENE_LIBRARY.headline}</h2>
        <p className="lscene-body lreveal">{SCENE_LIBRARY.body}</p>
        <div className="library-stats">
          {SCENE_LIBRARY.stats.map((stat) => (
            <div key={stat.label} className="lstat lreveal">
              <div className="ls-value">
                {stat.value === null ? (
                  stat.text
                ) : (
                  <>
                    {/* In cinematic mode the engine scrubs this from 0. */}
                    <span data-count-to={stat.value}>{mode === "static" ? stat.value : 0}</span>
                    {stat.suffix}
                  </>
                )}
              </div>
              <div className="ls-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SceneDoorways() {
  return (
    <section className="lscene lscene-doorways" data-scene={SCENE_DOORWAYS.id}>
      <div className="lscene-inner">
        <p className="lscene-kicker lreveal">{SCENE_DOORWAYS.kicker}</p>
        <h2 className="lscene-headline lreveal">{SCENE_DOORWAYS.headline}</h2>
        <div className="doorway-grid">
          {SCENE_DOORWAYS.roles.map((role) => (
            <div key={role.key} className="doorway lreveal" style={{ "--accent": ROLE_COLORS[role.key] }}>
              <p className="dw-label">{role.label}</p>
              <p className="dw-desc">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SceneTools() {
  return (
    <section className="lscene lscene-tools" data-scene={SCENE_TOOLS.id}>
      <div className="lscene-inner">
        <p className="lscene-kicker lreveal">{SCENE_TOOLS.kicker}</p>
        <h2 className="lscene-headline lreveal">{SCENE_TOOLS.headline}</h2>
        <div className="toolbelt-grid">
          {SCENE_TOOLS.tools.map((tool) => (
            <div key={tool.name} className="toolbelt-card lreveal">
              <p className="tb-name">{tool.name}</p>
              <p className="tb-desc">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SceneHandoff() {
  return (
    <section className="lscene lscene-handoff" data-scene={SCENE_HANDOFF.id}>
      <div className="lscene-inner">
        <p className="lscene-kicker lreveal">{SCENE_HANDOFF.kicker}</p>
        <h2 className="lscene-headline lreveal">{SCENE_HANDOFF.headline}</h2>
        <p className="lscene-body lreveal">{SCENE_HANDOFF.body}</p>
      </div>
    </section>
  );
}
