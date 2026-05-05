// Mary's Room — animated scenes (v2: polished, more detailed, playful late tone)

const M = {
  ink:    '#070a0f',
  paper:  '#ece8dc',
  gray0:  '#0d1118',
  gray1:  '#15191f',
  gray2:  '#22272f',
  gray3:  '#363c46',
  gray4:  '#5a616c',
  gray5:  '#8a909a',
  gray6:  '#bdc3cb',
  rose:   '#c0432a',
  roseGlow:'#e0593a',
  roseDark:'#7a1a08',
  gold:   '#e0b848',
  goldDeep:'#c89830',
  sky:    '#7ab8d8',
  skyHigh:'#9fcae0',
  green:  '#5a9854',
  meadow: '#8ab050',
  warm:   '#f0c878',
  lavender:'#c8a8d8',
  pink:   '#e8a098',
};

// ───────────────── BACKDROP ─────────────────
function Backdrop() {
  const t = useTime();
  const warmth = clamp((t - 64) / 15, 0, 1);
  const eased = Easing.easeInOutCubic(warmth);
  // Late warmth: shift toward warmer, more curious palette
  const r = 6 + eased * 24;
  const g = 8 + eased * 18;
  const b = 14 - eased * 4;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 50% 60%, rgb(${r+18},${g+14},${b+8}) 0%, rgb(${r},${g},${b}) 75%)`,
    }} />
  );
}

// ───────────────── SCENE 1: TITLE ─────────────────
function SceneTitle() {
  return (
    <Sprite start={0} end={5}>
      {({ progress, localTime }) => {
        const titleOp = interpolate([0, 0.18, 0.85, 1], [0, 1, 1, 0], Easing.easeInOutCubic)(progress);
        const subOp   = interpolate([0.22, 0.42, 0.85, 1], [0, 1, 1, 0])(progress);
        const lineW   = interpolate([0.15, 0.55], [0, 520], Easing.easeOutCubic)(progress);
        const eyebrowOp = interpolate([0.05, 0.2, 0.85, 1], [0, 0.7, 0.7, 0])(progress);
        // Subtle ornament dots fade in
        return (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: M.paper }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase',
              color: M.gold, opacity: eyebrowOp, marginBottom: 28,
            }}>A Thought Experiment</div>
            <div style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 110, fontWeight: 600,
              letterSpacing: '-0.025em',
              opacity: titleOp,
              transform: `translateY(${(1 - titleOp) * 14}px)`,
              textShadow: '0 4px 60px rgba(0,0,0,0.6)',
            }}>Mary's Room</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 28, marginBottom: 22, opacity: subOp }}>
              <div style={{ height: 1, width: lineW / 2, background: `linear-gradient(90deg, transparent, ${M.gray4})` }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: M.gold }} />
              <div style={{ height: 1, width: lineW / 2, background: `linear-gradient(90deg, ${M.gray4}, transparent)` }} />
            </div>
            <div style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 22, color: M.gray5,
              opacity: subOp,
              letterSpacing: '0.02em',
            }}>Frank Jackson · 1982</div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ───────────────── SCENE 2: THE STUDY ─────────────────
function SceneStudy() {
  return (
    <Sprite start={4} end={27}>
      {({ progress, localTime }) => {
        const pan = interpolate([0, 1], [0, -480], Easing.easeInOutCubic)(progress);
        const fadeIn = interpolate([0, 0.08], [0, 1], Easing.easeOutCubic)(progress);
        const fadeOut = interpolate([0.92, 1], [1, 0], Easing.easeInCubic)(progress);
        const op = Math.min(fadeIn, fadeOut);

        // Lamp flicker (subtle)
        const flicker = 1 + Math.sin(localTime * 6) * 0.03 + Math.sin(localTime * 13) * 0.02;

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: op, filter: 'grayscale(1) contrast(1.08)' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: 2600, height: '100%',
              transform: `translateX(${pan}px)`,
            }}>
              {/* Wall — wallpaper texture */}
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${M.gray1} 0%, ${M.gray2} 60%, ${M.gray0} 100%)` }} />
              {/* Wallpaper pattern */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.06,
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0 38px, ${M.gray5} 38px 39px), repeating-linear-gradient(90deg, transparent 0 38px, ${M.gray5} 38px 39px)`,
              }} />
              {/* Crown molding */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: 70, height: 6, background: `linear-gradient(180deg, ${M.gray3}, ${M.gray2})`, borderTop: `1px solid ${M.gray4}` }} />
              {/* Floor */}
              <div style={{
                position: 'absolute', left: 0, right: 0, top: '70%', height: '30%',
                background: `linear-gradient(180deg, ${M.gray2} 0%, ${M.gray1} 80%)`,
              }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * 22, height: 1, background: 'rgba(0,0,0,0.5)' }} />
                ))}
              </div>
              {/* Baseboard */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(70% - 8px)', height: 8, background: M.gray3, borderTop: `1px solid ${M.gray4}` }} />

              {/* Bookshelf left — taller, more detailed */}
              <Bookshelf x={60} y={90} h={580} />

              {/* Framed art on wall */}
              <FrameArt x={350} y={140} title="V4" />

              {/* Desk + lamp + mountains-of-paper */}
              <Desk x={680} y={420} />
              <Lamp x={760} y={150} t={localTime} flicker={flicker} />

              {/* Stack of papers + open book */}
              <PapersOnDesk x={780} y={395} />

              {/* Globe */}
              <Globe x={1080} y={420} />

              {/* Chalkboard */}
              <Chalkboard x={1240} y={120} t={localTime} />

              {/* Microscope + slides */}
              <Microscope x={1700} y={420} />
              <SlideTray x={1810} y={530} />

              {/* Telescope */}
              <Telescope x={1980} y={300} />

              {/* Anatomy chart on wall */}
              <BrainDiagram x={2160} y={130} />

              {/* Door (just visible at far right) */}
              <DoorClosed x={2440} y={120} />

              {/* Dust motes */}
              <DustField count={36} t={localTime} />

              {/* God-ray from lamp */}
              <div style={{
                position: 'absolute', left: 700, top: 180,
                width: 200, height: 360,
                background: `radial-gradient(ellipse at 50% 0%, rgba(232,230,220,${0.14 * flicker}), transparent 70%)`,
                pointerEvents: 'none',
                filter: 'blur(2px)',
              }} />
            </div>

            {/* Vignette */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }} />

            {/* Caption: "Mary" with tiny arrow indicator */}
            {progress > 0.4 && progress < 0.85 && (
              <div style={{
                position: 'absolute', left: 60, bottom: 30,
                opacity: interpolate([0.4, 0.5, 0.78, 0.85], [0, 1, 1, 0])(progress),
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                color: M.gray5, letterSpacing: '0.25em', textTransform: 'uppercase',
              }}>scene one — the room</div>
            )}
          </div>
        );
      }}
    </Sprite>
  );
}

function Bookshelf({ x, y, h }) {
  const shelves = 6;
  const w = 240;
  const sh = h / shelves;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: M.gray0, border: `2px solid ${M.gray3}`, boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>
      {Array.from({ length: shelves }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * sh, height: sh, borderBottom: `2px solid ${M.gray3}`, display: 'flex', alignItems: 'flex-end', padding: '0 6px', gap: 1.5 }}>
          {Array.from({ length: 11 + (i % 4) }).map((_, j) => {
            const bh = 50 + ((i * 7 + j * 13) % 28);
            const bw = 12 + ((i * 5 + j * 11) % 9);
            const tone = [M.gray2, M.gray3, M.gray4, M.gray3][((i + j) % 4)];
            const tilt = (i + j) % 7 === 0 ? -8 : 0;
            return <div key={j} style={{ width: bw, height: bh, background: tone, borderTop: `1px solid ${M.gray5}`, borderLeft: `1px solid rgba(0,0,0,0.4)`, transform: `rotate(${tilt}deg)`, transformOrigin: 'bottom' }} />;
          })}
          {/* Some lying flat */}
          {i % 2 === 1 && <div style={{ position: 'absolute', right: 14, bottom: 0, width: 50, height: 12, background: M.gray3, border: `1px solid ${M.gray5}` }} />}
        </div>
      ))}
    </div>
  );
}

function FrameArt({ x, y, title }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 220, height: 280, background: M.gray2, border: `8px solid ${M.gray3}`, boxShadow: '0 4px 14px rgba(0,0,0,0.5)' }}>
      <div style={{ position: 'absolute', inset: 6, background: `radial-gradient(ellipse at 30% 30%, ${M.gray3}, ${M.gray1})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="140" height="180" viewBox="0 0 140 180">
          {/* Abstract — eye/iris */}
          <circle cx="70" cy="90" r="60" fill="none" stroke={M.gray5} strokeWidth="1.5" />
          <circle cx="70" cy="90" r="38" fill="none" stroke={M.gray5} strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="70" cy="90" r="14" fill={M.gray5} />
          <circle cx="74" cy="86" r="4" fill={M.gray6} />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, textAlign: 'center', fontFamily: 'monospace', fontSize: 9, color: M.gray5, letterSpacing: '0.2em' }}>{title}</div>
    </div>
  );
}

function Desk({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 380, height: 200 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 16, background: `linear-gradient(180deg, ${M.gray4}, ${M.gray3})`, borderTop: `1px solid ${M.gray5}`, boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'absolute', left: 12, top: 16, width: 110, height: 184, background: `linear-gradient(90deg, ${M.gray2}, ${M.gray3})`, border: `1px solid ${M.gray4}` }}>
        <div style={{ position: 'absolute', left: 8, top: 14, right: 8, height: 36, background: M.gray1, border: `1px solid ${M.gray4}`, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'absolute', left: 8, top: 60, right: 8, height: 36, background: M.gray1, border: `1px solid ${M.gray4}`, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'absolute', left: 50, top: 32, width: 8, height: 2, background: M.gray5 }} />
        <div style={{ position: 'absolute', left: 50, top: 78, width: 8, height: 2, background: M.gray5 }} />
      </div>
      {/* Right pedestal */}
      <div style={{ position: 'absolute', right: 12, top: 16, width: 110, height: 184, background: `linear-gradient(90deg, ${M.gray3}, ${M.gray2})`, border: `1px solid ${M.gray4}` }}>
        <div style={{ position: 'absolute', left: 8, top: 14, right: 8, height: 156, background: M.gray1, border: `1px solid ${M.gray4}` }} />
      </div>
    </div>
  );
}

function PapersOnDesk({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      {/* Stack of papers */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 90, height: 12, background: M.gray6, transform: 'rotate(-2deg)', boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', left: 4, top: -8, width: 88, height: 12, background: M.gray6, transform: 'rotate(1deg)' }} />
      <div style={{ position: 'absolute', left: 2, top: -16, width: 90, height: 12, background: M.gray5, transform: 'rotate(-1deg)' }}>
        <div style={{ position: 'absolute', top: 4, left: 6, right: 6, height: 1, background: M.gray3 }} />
        <div style={{ position: 'absolute', top: 8, left: 6, right: 30, height: 1, background: M.gray3 }} />
      </div>
      {/* Open book */}
      <div style={{ position: 'absolute', left: 110, top: -28, width: 130, height: 22, background: M.gray6, transform: 'rotate(-3deg)', borderTop: `1px solid ${M.gray4}` }}>
        <div style={{ position: 'absolute', top: 4, left: 6, right: 6, height: 1, background: M.gray3 }} />
        <div style={{ position: 'absolute', top: 9, left: 6, right: 14, height: 1, background: M.gray3 }} />
        <div style={{ position: 'absolute', top: 14, left: 6, right: 30, height: 1, background: M.gray3 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: M.gray4 }} />
      </div>
      {/* Coffee mug */}
      <div style={{ position: 'absolute', left: 260, top: -32, width: 28, height: 32, background: M.gray3, border: `1px solid ${M.gray5}`, borderRadius: '2px 2px 4px 4px' }}>
        <div style={{ position: 'absolute', right: -10, top: 6, width: 10, height: 16, border: `2px solid ${M.gray5}`, borderLeft: 'none', borderRadius: '0 50% 50% 0' }} />
        <div style={{ position: 'absolute', top: 2, left: 2, right: 2, height: 4, background: M.gray2 }} />
      </div>
    </div>
  );
}

function Lamp({ x, y, t, flicker }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <div style={{ position: 'absolute', left: 30, top: 0, width: 2, height: 240, background: M.gray4 }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 70, height: 36, background: `linear-gradient(180deg, ${M.gray4}, ${M.gray2})`, borderRadius: '50% 50% 8px 8px / 100% 100% 12px 12px', border: `1px solid ${M.gray5}` }} />
      <div style={{
        position: 'absolute', left: 0, top: 32,
        width: 0, height: 0,
        borderLeft: '70px solid transparent',
        borderRight: '70px solid transparent',
        borderTop: `340px solid rgba(232, 230, 220, ${0.13 * flicker})`,
        filter: 'blur(3px)',
        transform: 'translateX(-35px)',
      }} />
      <div style={{ position: 'absolute', left: 22, top: 22, width: 18, height: 18, borderRadius: '50%', background: M.paper, boxShadow: `0 0 ${30 * flicker}px ${10 * flicker}px rgba(232,230,220,0.35)`, opacity: flicker }} />
    </div>
  );
}

function Globe({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <div style={{ width: 130, height: 130, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${M.gray4}, ${M.gray2} 60%, ${M.ink})`, border: `1px solid ${M.gray5}`, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
        <div style={{ position: 'absolute', left: 22, top: 32, width: 36, height: 26, background: M.gray3, borderRadius: '60% 40% 50% 50%' }} />
        <div style={{ position: 'absolute', left: 64, top: 56, width: 42, height: 32, background: M.gray3, borderRadius: '40% 60% 50% 50%' }} />
        <div style={{ position: 'absolute', left: 36, top: 80, width: 30, height: 18, background: M.gray3, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'rgba(232,230,220,0.15)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(232,230,220,0.15)' }} />
        {/* Tilted axis */}
        <div style={{ position: 'absolute', top: -6, bottom: -6, left: '50%', width: 2, background: M.gray5, transform: 'rotate(15deg) translateX(-50%)', transformOrigin: 'center' }} />
      </div>
      <div style={{ width: 4, height: 36, background: M.gray4, marginLeft: 63 }} />
      <div style={{ width: 60, height: 8, background: M.gray3, marginLeft: 35, borderRadius: 4 }} />
    </div>
  );
}

function Chalkboard({ x, y, t }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 420, height: 260, background: '#0a0e12', border: `6px solid ${M.gray3}`, padding: 18, fontFamily: 'Caveat, cursive', color: M.paper, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 4px 14px rgba(0,0,0,0.5)' }}>
      <div style={{ fontSize: 26, opacity: 0.9 }}>λ = c / ν</div>
      <div style={{ fontSize: 20, opacity: 0.8, marginTop: 4 }}>E = hν</div>
      <div style={{ fontSize: 16, opacity: 0.6, marginTop: 6, fontFamily: "'Source Serif 4', serif", fontStyle: 'italic' }}>red ≈ 700 nm</div>
      <svg width="380" height="80" style={{ marginTop: 10 }}>
        <path d={`M 0 40 ${Array.from({length: 40}).map((_, i) => `L ${i * 10} ${40 + Math.sin((i + t * 0.4) * 0.55) * 22}`).join(' ')}`} fill="none" stroke={M.paper} strokeWidth="1.5" opacity="0.8" />
      </svg>
      <div style={{ position: 'absolute', right: 18, bottom: 14, fontSize: 16, color: M.gray5, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
        ║║║║ ║║║║ ║║║║ ║║║║ │║║║║║
      </div>
      {/* Smudges */}
      <div style={{ position: 'absolute', left: 30, bottom: 60, width: 60, height: 12, background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(4px)' }} />
    </div>
  );
}

function Microscope({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 100, height: 220 }}>
      <div style={{ position: 'absolute', left: 40, top: 0, width: 22, height: 70, background: `linear-gradient(90deg, ${M.gray3}, ${M.gray2})`, border: `1px solid ${M.gray5}`, borderRadius: 6 }} />
      <div style={{ position: 'absolute', left: 30, top: 60, width: 40, height: 60, background: M.gray2, border: `1px solid ${M.gray5}`, borderRadius: 4 }} />
      <div style={{ position: 'absolute', left: 18, top: 116, width: 64, height: 14, background: M.gray3, border: `1px solid ${M.gray5}` }} />
      <div style={{ position: 'absolute', left: 0, top: 128, width: 100, height: 32, background: M.gray2, border: `1px solid ${M.gray5}`, borderRadius: 6 }} />
      <div style={{ position: 'absolute', left: 24, top: 162, width: 52, height: 50, background: M.gray3, border: `1px solid ${M.gray5}` }} />
      {/* Eyepiece reflection */}
      <div style={{ position: 'absolute', left: 44, top: 6, width: 12, height: 20, background: M.gray5, borderRadius: 4 }} />
    </div>
  );
}

function SlideTray({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 100, height: 60, background: M.gray2, border: `1px solid ${M.gray4}` }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: 6 + (i % 3) * 30, top: 8 + Math.floor(i / 3) * 24, width: 22, height: 16, background: M.gray5, border: `1px solid ${M.gray6}` }} />
      ))}
    </div>
  );
}

function Telescope({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 220, height: 300, transform: 'rotate(-22deg)', transformOrigin: 'bottom left' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 200, height: 32, background: `linear-gradient(180deg, ${M.gray3}, ${M.gray2})`, border: `1px solid ${M.gray5}`, borderRadius: 4, boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'absolute', left: -14, top: -6, width: 44, height: 44, background: `radial-gradient(circle at 30% 30%, ${M.gray4}, ${M.gray2})`, border: `2px solid ${M.gray5}`, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', left: 174, top: 4, width: 32, height: 24, background: M.gray3, border: `1px solid ${M.gray5}`, borderRadius: 4 }} />
      <div style={{ position: 'absolute', left: 90, top: 30, width: 4, height: 90, background: M.gray3 }} />
      <div style={{ position: 'absolute', left: 50, top: 110, width: 4, height: 160, background: M.gray3, transform: 'rotate(15deg)' }} />
      <div style={{ position: 'absolute', left: 130, top: 110, width: 4, height: 160, background: M.gray3, transform: 'rotate(-15deg)' }} />
      <div style={{ position: 'absolute', left: 88, top: 110, width: 4, height: 160, background: M.gray3 }} />
    </div>
  );
}

function BrainDiagram({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 260, height: 280, background: M.gray1, border: `8px solid ${M.gray3}`, padding: 16, boxShadow: '0 4px 14px rgba(0,0,0,0.5)' }}>
      <svg width="100%" height="100%" viewBox="0 0 220 240">
        <path d="M 50 110 C 30 75 55 38 95 38 C 140 30 185 55 180 105 C 195 130 175 175 140 175 C 105 185 60 165 55 140 Z"
              fill={M.gray2} stroke={M.gray5} strokeWidth="1.5" />
        <path d="M 80 65 C 90 88 85 110 100 122" fill="none" stroke={M.gray4} strokeWidth="1" />
        <path d="M 115 50 C 128 75 122 105 138 110" fill="none" stroke={M.gray4} strokeWidth="1" />
        <path d="M 150 80 C 158 105 145 130 158 155" fill="none" stroke={M.gray4} strokeWidth="1" />
        <path d="M 75 130 C 85 138 90 150 100 155" fill="none" stroke={M.gray4} strokeWidth="1" />
        <circle cx="148" cy="125" r="5" fill={M.paper} />
        <line x1="148" y1="125" x2="200" y2="200" stroke={M.gray5} strokeWidth="0.5" />
        <text x="200" y="215" fill={M.gray6} fontSize="10" fontFamily="monospace">V4</text>
        <circle cx="100" cy="150" r="4" fill={M.paper} />
        <line x1="100" y1="150" x2="20" y2="210" stroke={M.gray5} strokeWidth="0.5" />
        <text x="6" y="222" fill={M.gray6} fontSize="10" fontFamily="monospace">retina</text>
      </svg>
    </div>
  );
}

function DustField({ count, t }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137) % 2600;
        const baseY = (i * 89) % 600 + 60;
        const dy = Math.sin((t + i * 0.7) * 0.4) * 14;
        const dx = Math.cos((t + i * 0.5) * 0.3) * 10;
        const op = 0.18 + ((i * 13) % 30) / 100;
        return <div key={i} style={{
          position: 'absolute', left: baseX + dx, top: baseY + dy,
          width: 2, height: 2, borderRadius: '50%',
          background: M.paper, opacity: op,
          boxShadow: `0 0 5px rgba(232,230,220,${op})`,
        }} />;
      })}
    </div>
  );
}

function DoorClosed({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 180, height: 460, background: `linear-gradient(180deg, ${M.gray3}, ${M.gray1})`, border: `6px solid ${M.gray2}` }}>
      <div style={{ position: 'absolute', left: 16, top: 24, right: 16, height: 160, border: `2px solid ${M.gray4}` }} />
      <div style={{ position: 'absolute', left: 16, top: 220, right: 16, height: 200, border: `2px solid ${M.gray4}` }} />
      <div style={{ position: 'absolute', right: 18, top: '50%', width: 12, height: 12, borderRadius: '50%', background: M.gray5 }} />
      {/* Faint warm light leaking under door */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: -4, height: 3, background: 'rgba(240,200,120,0.5)', boxShadow: '0 4px 12px rgba(240,200,120,0.4)' }} />
    </div>
  );
}

// ───────────────── SCENE 3: KNOWLEDGE MONTAGE ─────────────────
function SceneKnowledge() {
  return (
    <Sprite start={26} end={47}>
      {({ progress, localTime }) => {
        const op = interpolate([0, 0.08, 0.92, 1], [0, 1, 1, 0])(progress);
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: op, filter: 'grayscale(1)' }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 50,
              textAlign: 'center', color: M.gray5,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
              letterSpacing: '0.4em', textTransform: 'uppercase',
              opacity: interpolate([0, 0.1, 0.85, 1], [0, 1, 1, 0])(progress),
            }}>everything physical</div>

            <KnowledgePanel x={120} y={120} w={460} h={240} delay={0.05} progress={progress}>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15, color: M.gray5, marginBottom: 10, fontStyle: 'italic' }}>visible spectrum (nm)</div>
              <svg width="100%" height="140" viewBox="0 0 420 140">
                <defs>
                  <linearGradient id="grayspec" x1="0" x2="1">
                    <stop offset="0" stopColor={M.gray2} />
                    <stop offset="0.5" stopColor={M.gray5} />
                    <stop offset="1" stopColor={M.gray3} />
                  </linearGradient>
                </defs>
                <rect x="20" y="40" width="380" height="50" fill="url(#grayspec)" stroke={M.gray4} />
                {[400, 500, 600, 700].map((nm, i) => (
                  <g key={nm}>
                    <line x1={20 + i * 127} y1="40" x2={20 + i * 127} y2="100" stroke={M.gray6} strokeWidth="1" />
                    <text x={20 + i * 127} y="116" textAnchor="middle" fill={M.gray5} fontSize="12" fontFamily="monospace">{nm}</text>
                  </g>
                ))}
                <text x="375" y="35" fill={M.paper} fontSize="11" fontFamily="monospace" textAnchor="end">700 nm "red"</text>
                <line x1="380" y1="38" x2="380" y2="46" stroke={M.paper} strokeWidth="1.5" />
              </svg>
              <div style={{ fontSize: 12, color: M.gray4, fontFamily: 'monospace', marginTop: 8 }}>// memorized: every wavelength → photoreceptor response</div>
            </KnowledgePanel>

            <KnowledgePanel x={620} y={120} w={320} h={240} delay={0.15} progress={progress}>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15, color: M.gray5, marginBottom: 10, fontStyle: 'italic' }}>retinal cones</div>
              <svg width="100%" height="160" viewBox="0 0 280 160">
                {['L', 'M', 'S'].map((label, i) => (
                  <g key={label}>
                    <rect x={28 + i * 80} y={20} width="44" height="90" fill={M.gray3} stroke={M.gray5} />
                    <ellipse cx={50 + i * 80} cy="20" rx="22" ry="11" fill={M.gray4} />
                    <text x={50 + i * 80} y="132" textAnchor="middle" fill={M.paper} fontSize="16" fontFamily="serif" fontStyle="italic">{label}</text>
                  </g>
                ))}
                <text x="50" y="148" textAnchor="middle" fill={M.gray4} fontSize="10" fontFamily="monospace">long</text>
                <text x="130" y="148" textAnchor="middle" fill={M.gray4} fontSize="10" fontFamily="monospace">medium</text>
                <text x="210" y="148" textAnchor="middle" fill={M.gray4} fontSize="10" fontFamily="monospace">short</text>
              </svg>
            </KnowledgePanel>

            <KnowledgePanel x={980} y={120} w={320} h={240} delay={0.25} progress={progress}>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15, color: M.gray5, marginBottom: 10, fontStyle: 'italic' }}>V4 neuron response</div>
              <svg width="100%" height="160" viewBox="0 0 280 160">
                <path d={`M 0 80 ${Array.from({length: 140}).map((_, i) => {
                  const spike = Math.sin((i + localTime * 8) * 0.3) * 10 + (i % 13 === 0 ? -28 : 0) + (i % 17 === 0 ? 24 : 0);
                  return `L ${i * 2} ${80 + spike}`;
                }).join(' ')}`} fill="none" stroke={M.paper} strokeWidth="1" />
                <line x1="0" y1="80" x2="280" y2="80" stroke={M.gray3} strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
              <div style={{ fontSize: 11, color: M.gray4, fontFamily: 'monospace', marginTop: 8 }}>// firing rate when shown 'red'</div>
            </KnowledgePanel>

            <div style={{
              position: 'absolute', left: 120, right: 120, top: 400,
              display: 'flex', justifyContent: 'space-around', alignItems: 'center',
              fontFamily: "'Source Serif 4', serif", color: M.gray5,
              opacity: interpolate([0.3, 0.5, 0.85, 1], [0, 1, 1, 0])(progress),
            }}>
              {['λ = c / ν', 'I(λ) = ∫ S(λ) R(λ) dλ', 'V₄ → IT cortex', 'opponent process'].map((eq, i) => (
                <div key={i} style={{ fontSize: 22, fontStyle: 'italic' }}>{eq}</div>
              ))}
            </div>

            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 100,
              textAlign: 'center', color: M.paper,
              fontFamily: "'Source Serif 4', serif", fontSize: 34,
              fontStyle: 'italic',
              opacity: interpolate([0.45, 0.6, 0.92, 1], [0, 1, 1, 0])(progress),
            }}>
              She knows everything there is to know about color.
            </div>
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 60,
              textAlign: 'center', color: M.gray5,
              fontFamily: "'Source Serif 4', serif", fontSize: 22,
              fontStyle: 'italic',
              opacity: interpolate([0.65, 0.78, 0.92, 1], [0, 1, 1, 0])(progress),
            }}>
              Except one thing.
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function KnowledgePanel({ x, y, w, h, delay, progress, children }) {
  const localProgress = clamp((progress - delay) / 0.15, 0, 1);
  const op = interpolate([0, 1], [0, 1], Easing.easeOutCubic)(localProgress);
  const ty = (1 - localProgress) * 14;
  const exitOp = interpolate([0.85, 1], [1, 0])(progress);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      background: 'rgba(12, 16, 22, 0.95)',
      border: `1px solid ${M.gray3}`,
      padding: 18,
      opacity: op * exitOp,
      transform: `translateY(${ty}px)`,
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
    }}>
      {children}
    </div>
  );
}

// ───────────────── SCENE 4: THE DOOR ─────────────────
function SceneDoor() {
  return (
    <Sprite start={46} end={69}>
      {({ progress, localTime }) => {
        const sceneOp = interpolate([0, 0.08, 0.94, 1], [0, 1, 1, 0])(progress);
        const lightWidth = interpolate([0, 0.45, 0.9], [0, 5, 90], Easing.easeInOutCubic)(progress);
        const lightGlow  = interpolate([0, 0.45, 0.9], [0, 0.25, 1], Easing.easeInCubic)(progress);
        const zoom = interpolate([0, 1], [1, 1.42], Easing.easeInOutQuad)(progress);
        const handleHover = progress > 0.6 && progress < 0.85;
        const handGlow = handleHover ? interpolate([0.6, 0.7, 0.85], [0, 1, 0])(progress) : 0;

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: sceneOp, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: 'center 65%' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${M.gray2} 0%, ${M.gray1} 50%, ${M.ink} 100%)`, filter: 'grayscale(1)' }} />

              {/* Floor planks with perspective */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: '70%', height: '30%', background: `linear-gradient(180deg, ${M.gray2}, ${M.ink})`, perspective: '600px' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * 24 + 4, height: 1, background: 'rgba(0,0,0,0.5)' }} />
                ))}
              </div>

              {/* Wall framing */}
              <div style={{ position: 'absolute', left: '50%', top: '15%', width: 320, height: 580, marginLeft: -160, background: M.gray2, border: `1px solid ${M.gray3}`, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)' }} />

              {/* Door frame */}
              <div style={{
                position: 'absolute',
                left: '50%', top: '17%',
                width: 280, height: 540,
                marginLeft: -140,
                background: M.ink,
                border: `10px solid ${M.gray3}`,
                boxSizing: 'border-box',
                filter: 'grayscale(1)',
                boxShadow: '0 0 80px rgba(0,0,0,0.8)',
              }}>
                <div style={{ position: 'absolute', left: 24, top: 32, right: 24, height: 180, border: `2px solid ${M.gray4}`, background: 'rgba(0,0,0,0.3)' }} />
                <div style={{ position: 'absolute', left: 24, top: 240, right: 24, height: 240, border: `2px solid ${M.gray4}`, background: 'rgba(0,0,0,0.3)' }} />
                {/* Handle */}
                <div style={{
                  position: 'absolute', right: 24, top: '50%',
                  width: 16, height: 16, borderRadius: '50%',
                  background: `radial-gradient(circle at 30% 30%, ${M.gray6}, ${M.gray4})`,
                  boxShadow: `0 0 ${8 + handGlow * 16}px rgba(240,200,120,${0.3 + handGlow * 0.6})`,
                }} />
              </div>

              {/* The crack of warm light */}
              <div style={{
                position: 'absolute',
                left: 'calc(50% + 130px)',
                top: '17%',
                width: lightWidth, height: 540,
                background: `linear-gradient(90deg, transparent, ${M.warm} 30%, ${M.gold} 70%, ${M.paper})`,
                boxShadow: `0 0 ${50 * lightGlow}px ${25 * lightGlow}px rgba(240, 200, 120, ${lightGlow * 0.7})`,
                filter: 'blur(0.5px)',
              }} />
              {/* Spilled light on floor */}
              <div style={{
                position: 'absolute',
                left: 'calc(50% + 100px)',
                top: '70%',
                width: 280 + lightWidth * 4, height: 240,
                background: `radial-gradient(ellipse at 0% 0%, rgba(240, 200, 120, ${lightGlow * 0.55}) 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />
              {/* Light catching on Mary's silhouette */}
              {progress > 0.5 && (
                <div style={{
                  position: 'absolute',
                  left: 'calc(50% + 30px)', top: '56%',
                  width: 6, height: 100,
                  background: `linear-gradient(180deg, transparent, rgba(240,200,120,${lightGlow * 0.7}), transparent)`,
                  filter: 'blur(2px)',
                  opacity: lightGlow,
                }} />
              )}

              {/* Mary's silhouette */}
              <Silhouette x={'calc(50% - 40px)'} y={'48%'} progress={progress} />

              {/* Vignette */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 55%, transparent 28%, rgba(0,0,0,0.75) 100%)' }} />
            </div>

            {/* Caption */}
            <div style={{
              position: 'absolute', left: 60, bottom: 30,
              opacity: interpolate([0.05, 0.18, 0.85, 0.92], [0, 1, 1, 0])(progress),
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: M.gray5, letterSpacing: '0.25em', textTransform: 'uppercase',
            }}>scene three — the door</div>
          </div>
        );
      }}
    </Sprite>
  );
}

function Silhouette({ x, y, progress }) {
  const lean = interpolate([0, 1], [0, 5])(progress);
  const handReach = interpolate([0.55, 0.78], [0, 1], Easing.easeInOutCubic)(progress);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, 0) rotate(${lean}deg)`, transformOrigin: 'bottom center' }}>
      {/* Hair tuft */}
      <div style={{ width: 44, height: 14, background: M.ink, margin: '0 auto', borderRadius: '50% 50% 0 0', position: 'relative', top: 4 }} />
      <div style={{ width: 38, height: 46, background: M.ink, borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%', margin: '-6px auto 0', border: `1px solid rgba(0,0,0,0.9)` }} />
      <div style={{ width: 90, height: 180, background: M.ink, borderRadius: '40% 40% 8px 8px / 30% 30% 8px 8px', margin: '-2px auto 0', border: `1px solid rgba(0,0,0,0.9)`, position: 'relative' }}>
        {/* Reaching arm */}
        <div style={{
          position: 'absolute',
          right: -10 - handReach * 30, top: 30,
          width: 14 + handReach * 38,
          height: 8,
          background: M.ink,
          borderRadius: 4,
          transform: `rotate(${-handReach * 8}deg)`,
          transformOrigin: 'left center',
        }} />
      </div>
    </div>
  );
}

// ───────────────── SCENE 5: COLOR REVEAL ─────────────────
function SceneColorReveal() {
  return (
    <Sprite start={68} end={97}>
      {({ progress, localTime }) => {
        const sceneOp = interpolate([0, 0.06, 0.94, 1], [0, 1, 1, 0])(progress);
        const doorRot = interpolate([0, 0.25], [0, -88], Easing.easeOutCubic)(progress);
        const flood = interpolate([0.1, 0.5], [0, 1], Easing.easeOutCubic)(progress);
        const grayscale = interpolate([0.1, 0.5], [1, 0], Easing.easeOutCubic)(progress);
        const zoom = interpolate([0, 0.7, 1], [1.42, 2.6, 2.8], Easing.easeInOutCubic)(progress);
        const roseOp = interpolate([0.55, 0.78], [0, 1], Easing.easeOutCubic)(progress);
        const cloudShift = localTime * 4;
        const butterflyOp = interpolate([0.7, 0.85, 0.95], [0, 1, 0.7])(progress);

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: sceneOp, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              transform: `scale(${zoom})`,
              transformOrigin: 'center 60%',
              filter: `grayscale(${grayscale})`,
            }}>
              {/* Sky gradient — richer */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg, ${M.skyHigh} 0%, ${M.sky} 30%, #d8e0ec 55%, ${M.warm} 78%, ${M.gold} 100%)`,
                opacity: flood,
              }} />
              {/* Clouds */}
              <Cloud x={120 + cloudShift} y={80} w={280} flood={flood} />
              <Cloud x={680 + cloudShift * 0.7} y={140} w={220} flood={flood} />
              <Cloud x={1180 + cloudShift * 0.5} y={50} w={320} flood={flood} />
              {/* Sun */}
              <div style={{
                position: 'absolute', left: '62%', top: '24%',
                width: 160, height: 160, borderRadius: '50%',
                background: `radial-gradient(circle, ${M.paper}, ${M.warm} 50%, ${M.gold} 75%, transparent 85%)`,
                boxShadow: `0 0 140px 50px rgba(240,200,120,0.55)`,
                opacity: flood * 0.95,
              }} />
              {/* Distant mountains */}
              <div style={{
                position: 'absolute', left: 0, right: 0, top: '46%', height: '22%',
                background: `linear-gradient(180deg, #8a9eb4 0%, #5a6e84 100%)`,
                clipPath: 'polygon(0 100%, 0 65%, 8% 50%, 14% 30%, 22% 55%, 32% 22%, 42% 48%, 52% 18%, 60% 45%, 70% 25%, 80% 50%, 90% 30%, 100% 55%, 100% 100%)',
                opacity: flood * 0.75,
              }} />
              {/* Mid hills */}
              <div style={{
                position: 'absolute', left: 0, right: 0, top: '52%', height: '20%',
                background: `linear-gradient(180deg, #6e8a64 0%, #4a6648 100%)`,
                clipPath: 'polygon(0 100%, 0 60%, 12% 38%, 28% 50%, 45% 28%, 62% 42%, 78% 25%, 92% 45%, 100% 35%, 100% 100%)',
                opacity: flood * 0.85,
              }} />
              {/* Front meadow */}
              <div style={{
                position: 'absolute', left: 0, right: 0, top: '62%', height: '38%',
                background: `linear-gradient(180deg, ${M.meadow} 0%, ${M.green} 50%, #3a6238 100%)`,
                clipPath: 'polygon(0 100%, 0 18%, 18% 8%, 38% 16%, 58% 6%, 78% 14%, 100% 8%, 100% 100%)',
                opacity: flood,
              }} />
              {/* Wildflower field */}
              <FlowerField progress={progress} flood={flood} />
              {/* Trees on horizon */}
              <Tree x={'8%'} y={'58%'} h={70} flood={flood} />
              <Tree x={'72%'} y={'56%'} h={86} flood={flood} />
              <Tree x={'88%'} y={'60%'} h={60} flood={flood} />

              {/* Butterflies */}
              {butterflyOp > 0 && (
                <>
                  <Butterfly x={'30%'} y={'70%'} t={localTime} delay={0} flood={butterflyOp} color={M.lavender} />
                  <Butterfly x={'65%'} y={'74%'} t={localTime} delay={0.6} flood={butterflyOp} color={M.gold} />
                </>
              )}

              {/* Doorway frame fading out */}
              <div style={{
                position: 'absolute',
                left: '50%', top: '17%',
                width: 280, height: 540,
                marginLeft: -140,
                background: 'transparent',
                border: `10px solid ${M.gray2}`,
                boxSizing: 'border-box',
                opacity: interpolate([0, 0.7], [1, 0])(progress),
              }} />
              <div style={{
                position: 'absolute',
                left: 'calc(50% + 130px)', top: '17%',
                width: 14, height: 540,
                background: M.gray3,
                transformOrigin: 'left center',
                transform: `rotateY(${doorRot}deg)`,
                opacity: interpolate([0, 0.7], [1, 0])(progress),
              }} />

              {/* Single red rose */}
              <div style={{
                position: 'absolute', left: '50%', top: '64%',
                transform: `translate(-50%, 0) scale(${interpolate([0.55, 0.85], [0.4, 1.1], Easing.easeOutBack)(progress)})`,
                opacity: roseOp,
                filter: `drop-shadow(0 8px 20px rgba(122,26,8,0.5))`,
              }}>
                <Rose />
              </div>
            </div>

            {/* The word "RED" */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: '32%',
              textAlign: 'center',
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 200, fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.04em',
              color: M.rose,
              textShadow: `0 0 80px rgba(192,67,42,0.7), 0 4px 30px rgba(0,0,0,0.4)`,
              opacity: interpolate([0.7, 0.82, 0.93, 1], [0, 1, 1, 0])(progress),
              transform: `scale(${interpolate([0.7, 0.88], [0.85, 1], Easing.easeOutBack)(progress)})`,
            }}>red</div>
          </div>
        );
      }}
    </Sprite>
  );
}

function Cloud({ x, y, w, flood }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: w * 0.32, opacity: flood * 0.85 }}>
      <div style={{ position: 'absolute', left: 0, top: '40%', width: '100%', height: '60%', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', filter: 'blur(2px)' }} />
      <div style={{ position: 'absolute', left: '15%', top: '10%', width: '40%', height: '70%', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', filter: 'blur(2px)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '0%', width: '40%', height: '80%', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', filter: 'blur(2px)' }} />
    </div>
  );
}

function Tree({ x, y, h, flood }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: flood }}>
      <div style={{ width: 6, height: h * 0.4, background: '#3a2820', margin: '0 auto', position: 'relative', top: h * 0.65 }} />
      <div style={{ position: 'absolute', left: -h * 0.4, top: 0, width: h * 0.8, height: h * 0.8, background: 'radial-gradient(circle at 35% 35%, #6a9858, #3a6238)', borderRadius: '50%' }} />
    </div>
  );
}

function Butterfly({ x, y, t, delay, flood, color }) {
  const wingFlap = Math.sin((t - delay) * 12) * 0.5 + 0.5;
  const drift = Math.sin((t - delay) * 1.2) * 30;
  const bob = Math.cos((t - delay) * 1.8) * 12;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${drift}px, ${bob}px)`, opacity: flood }}>
      <svg width="40" height="32" viewBox="0 0 40 32">
        <ellipse cx="14" cy="16" rx={10 * wingFlap + 2} ry="12" fill={color} opacity="0.9" />
        <ellipse cx="26" cy="16" rx={10 * wingFlap + 2} ry="12" fill={color} opacity="0.9" />
        <ellipse cx="20" cy="16" rx="2" ry="10" fill="#2a1a18" />
      </svg>
    </div>
  );
}

function FlowerField({ progress, flood }) {
  const colors = [M.rose, M.gold, M.lavender, M.warm, M.pink, '#e8a098', '#c0432a', '#f0c878'];
  const flowers = React.useMemo(() => Array.from({ length: 90 }).map((_, i) => ({
    x: (i * 73) % 1900,
    y: (i * 41) % 240,
    size: 5 + ((i * 7) % 9),
    color: colors[i % colors.length],
    delay: (i % 10) * 0.05,
  })), []);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: '70%', height: '30%', opacity: flood }}>
      {flowers.map((f, i) => {
        const localProg = clamp((progress - 0.4 - f.delay) / 0.3, 0, 1);
        const scale = Easing.easeOutBack(localProg);
        return (
          <div key={i} style={{
            position: 'absolute', left: f.x, top: f.y,
            width: f.size, height: f.size, borderRadius: '50%',
            background: f.color, boxShadow: `0 0 8px ${f.color}`,
            transform: `scale(${scale})`,
            opacity: localProg,
          }} />
        );
      })}
    </div>
  );
}

function Rose() {
  return (
    <svg width="220" height="240" viewBox="0 0 220 240">
      <path d="M 110 240 L 110 130" stroke="#3a6238" strokeWidth="4" />
      <ellipse cx="92" cy="190" rx="18" ry="8" fill="#5a9854" transform="rotate(-30 92 190)" />
      <ellipse cx="128" cy="208" rx="16" ry="7" fill="#5a9854" transform="rotate(40 128 208)" />
      <ellipse cx="100" cy="155" rx="12" ry="5" fill="#6aa864" transform="rotate(-50 100 155)" />
      <g transform="translate(110, 110)">
        {/* Outer petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <ellipse key={'o'+i} cx="0" cy="-30" rx="26" ry="36" fill="#a03520" transform={`rotate(${deg})`} opacity="0.7" />
        ))}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <ellipse key={'b'+i} cx="0" cy="-26" rx="24" ry="34" fill="#c0432a" transform={`rotate(${deg})`} opacity="0.9" />
        ))}
        {[30, 90, 150, 210, 270, 330].map((deg, i) => (
          <ellipse key={'m'+i} cx="0" cy="-18" rx="18" ry="26" fill="#d05530" transform={`rotate(${deg})`} />
        ))}
        {[0, 90, 180, 270].map((deg, i) => (
          <ellipse key={'i'+i} cx="0" cy="-10" rx="12" ry="18" fill="#e0593a" transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r="12" fill="#7a1a08" />
        <circle cx="0" cy="-2" r="6" fill="#3a0a02" />
      </g>
      {/* Highlight */}
      <ellipse cx="92" cy="86" rx="10" ry="6" fill="rgba(255,200,180,0.6)" />
    </svg>
  );
}

// ───────────────── SCENE 6: THE QUESTION ─────────────────
function SceneQuestion() {
  return (
    <Sprite start={96} end={114}>
      {({ progress, localTime }) => {
        const op = interpolate([0, 0.08, 0.92, 1], [0, 1, 1, 0])(progress);
        const pulse = 1 + Math.sin(localTime * 1.5) * 0.04;
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: op, background: 'radial-gradient(ellipse at 50% 50%, #131820 0%, #060a12 80%)' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
              <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
                <div style={{
                  width: 480,
                  opacity: interpolate([0.05, 0.2], [0, 1])(progress),
                  transform: `translateX(${interpolate([0.05, 0.2], [-20, 0], Easing.easeOutCubic)(progress)}px)`,
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: M.gray5, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>before</div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 40, color: M.paper, lineHeight: 1.2, marginBottom: 26, fontWeight: 500 }}>Every fact about red.</div>
                  <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, color: M.gray5, lineHeight: 1.7, listStyle: 'none', padding: 0 }}>
                    <li>— wavelength: 700 nm</li>
                    <li>— L-cone activation</li>
                    <li>— V4 cortical response</li>
                    <li>— linguistic associations</li>
                    <li>— every paper ever written</li>
                  </ul>
                </div>

                <div style={{ width: 1, height: 380, background: `linear-gradient(180deg, transparent, ${M.gray3}, transparent)`, opacity: interpolate([0.15, 0.3], [0, 0.7])(progress) }} />

                <div style={{
                  width: 480,
                  opacity: interpolate([0.3, 0.45], [0, 1])(progress),
                  transform: `translateX(${interpolate([0.3, 0.45], [20, 0], Easing.easeOutCubic)(progress)}px)`,
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: M.rose, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>after</div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 40, color: M.paper, lineHeight: 1.2, marginBottom: 26, fontWeight: 500 }}>The experience of red.</div>
                  <div style={{
                    width: 220, height: 220, borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 35%, ${M.roseGlow}, ${M.rose} 55%, ${M.roseDark})`,
                    boxShadow: `0 0 ${100 * pulse}px rgba(192,67,42,${0.55 * pulse})`,
                    margin: '8px 0',
                    transform: `scale(${pulse})`,
                  }} />
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 20, color: M.gray5, marginTop: 18 }}>— what it is like.</div>
                </div>
              </div>
            </div>

            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 70,
              textAlign: 'center',
              fontFamily: "'Source Serif 4', serif", fontStyle: 'italic',
              fontSize: 44, color: M.gold,
              opacity: interpolate([0.6, 0.78, 0.92, 1], [0, 1, 1, 0])(progress),
              letterSpacing: '0.005em',
            }}>Did Mary learn something new?</div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ───────────────── SCENE 7: OUTRO ─────────────────
function SceneOutro() {
  return (
    <Sprite start={113} end={132}>
      {({ progress }) => {
        const op = interpolate([0, 0.1, 0.92, 1], [0, 1, 1, 1])(progress);
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: op, background: 'radial-gradient(ellipse at 50% 50%, #1a1a14 0%, #0a0a08 80%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 80 }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: M.gold,
              letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 30,
              opacity: interpolate([0, 0.15], [0, 1])(progress),
            }}>The Knowledge Argument</div>

            <div style={{
              fontFamily: "'Source Serif 4', serif", fontSize: 52, color: M.paper,
              lineHeight: 1.25, maxWidth: 1100, marginBottom: 32,
              opacity: interpolate([0.1, 0.3], [0, 1])(progress),
              fontWeight: 500,
            }}>
              If Mary <em style={{ color: M.gold }}>did</em> learn something,
              <br />then not everything about the mind is physical.
            </div>

            <div style={{
              fontFamily: "'Source Serif 4', serif", fontSize: 22, color: M.gray5,
              fontStyle: 'italic', maxWidth: 880, lineHeight: 1.6, marginBottom: 50,
              opacity: interpolate([0.3, 0.5], [0, 1])(progress),
            }}>
              Some philosophers say yes — there are facts science cannot capture.
              <br />Others say no — she gained an ability, not a new fact.
            </div>

            <div style={{
              display: 'flex', gap: 24, alignItems: 'center',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
              color: M.gray4, letterSpacing: '0.25em', textTransform: 'uppercase',
              opacity: interpolate([0.55, 0.75], [0, 1])(progress),
            }}>
              <span>Frank Jackson</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: M.gold }} />
              <span>Epiphenomenal Qualia</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: M.gold }} />
              <span>1982</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ───────────────── EXPORT ─────────────────
function MarysRoomScenes() {
  return (
    <>
      <Backdrop />
      <SceneTitle />
      <SceneStudy />
      <SceneKnowledge />
      <SceneDoor />
      <SceneColorReveal />
      <SceneQuestion />
      <SceneOutro />
    </>
  );
}

window.MarysRoomScenes = MarysRoomScenes;
