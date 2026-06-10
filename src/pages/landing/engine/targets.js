// Target-position generators for the landing particle field. Every generator
// returns a Float32Array(count * 3) in world units, where `width`/`height`
// describe the visible world rectangle at z = 0.

function rand(min, max) {
  return min + Math.random() * (max - min);
}

// Cheap approximate gaussian (sum of three uniforms, centered).
function gauss(scale) {
  return (Math.random() + Math.random() + Math.random() - 1.5) * scale;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function scatterTargets(count, width, height, spread = 1.0) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-width, width) * 0.65 * spread;
    out[i * 3 + 1] = rand(-height, height) * 0.65 * spread;
    out[i * 3 + 2] = rand(-5, 3);
  }
  return out;
}

// Edge-of-frame curtain: keeps the center clear for scene copy.
export function vignetteTargets(count, width, height) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radial = 0.78 + Math.random() * 0.5;
    out[i * 3] = Math.cos(angle) * width * 0.55 * radial;
    out[i * 3 + 1] = Math.sin(angle) * height * 0.58 * radial;
    out[i * 3 + 2] = rand(-3.5, 2.5);
  }
  return out;
}

// Two nebulae flanking the choice cards.
export function forkTargets(count, width, height) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    out[i * 3] = side * width * 0.3 + gauss(width * 0.09);
    out[i * 3 + 1] = height * 0.02 + gauss(height * 0.16);
    out[i * 3 + 2] = gauss(1.6);
  }
  return out;
}

// 109-node library: four grade-band clusters, color-coherent via `groups`
// (0 gold, 1 teal, 2 sky, 3 coral). Dust orbits its cluster center.
export function constellationTargets(count, width, height, groups) {
  const centers = [
    [-0.34, 0.1],
    [-0.115, -0.06],
    [0.115, 0.1],
    [0.34, -0.04],
  ];
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const g = groups[i] & 3;
    out[i * 3] = centers[g][0] * width + gauss(width * 0.062);
    out[i * 3 + 1] = centers[g][1] * height + gauss(height * 0.12);
    out[i * 3 + 2] = gauss(1.4);
  }
  return out;
}

// Four flowing ribbons (one per doorway color), left edge to right edge.
export function streamTargets(count, width, height, groups) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const g = groups[i] & 3;
    const yBase = height * (0.3 - g * 0.195);
    const amp = height * (0.1 + g * 0.02) * (g % 2 === 0 ? 1 : -1);
    const t = Math.random();
    const mt = 1 - t;
    // Cubic Bézier with control points pushing an S-curve through the band.
    const y =
      mt * mt * mt * (yBase + amp * 0.4) +
      3 * mt * mt * t * (yBase + amp) +
      3 * mt * t * t * (yBase - amp) +
      t * t * t * (yBase - amp * 0.4);
    out[i * 3] = (t - 0.5) * width * 1.3;
    out[i * 3 + 1] = y + gauss(height * 0.022);
    out[i * 3 + 2] = gauss(1.1);
  }
  return out;
}

// Sparse far-field for the hero handoff: most particles pushed past the
// frame so on-screen density drops without changing the particle count.
export function ambientTargets(count, width, height) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const overshoot = Math.random() < 0.55 ? 1.55 : 0.95;
    out[i * 3] = rand(-width, width) * 0.85 * overshoot;
    out[i * 3 + 1] = rand(-height, height) * 0.85 * overshoot;
    out[i * 3 + 2] = rand(-7, 1);
  }
  return out;
}

// Map a list of normalized 2D points (centered, y-up, unit = layout height)
// onto a particle array, with jitter so repeats don't stack visibly.
function pointsToTargets(points, count, scale, zSpread) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = points[(Math.random() * points.length) | 0];
    out[i * 3] = p[0] * scale + gauss(scale * 0.006);
    out[i * 3 + 1] = p[1] * scale + gauss(scale * 0.006);
    out[i * 3 + 2] = gauss(zSpread);
  }
  return out;
}

// Alpha-sample a 2D canvas into normalized points.
function sampleCanvas(ctx, w, h, threshold, step) {
  const data = ctx.getImageData(0, 0, w, h).data;
  const points = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > threshold) {
        points.push([(x - w / 2) / h, -(y - h / 2) / h]);
      }
    }
  }
  return points;
}

// The site's question mark, sampled from real glyph pixels.
async function glyphPoints() {
  try {
    await Promise.race([document.fonts?.ready, delay(1500)]);
  } catch {
    // Georgia fallback renders fine
  }
  const w = 360;
  const h = 480;
  const cnv = document.createElement("canvas");
  cnv.width = w;
  cnv.height = h;
  const ctx = cnv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.font = `600 ${Math.round(h * 0.84)}px 'Source Serif 4', Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("?", w / 2, h / 2);
  const points = sampleCanvas(ctx, w, h, 120, 2);
  return points.length > 50 ? points : null;
}

function loadImage(url, timeoutMs) {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => resolve(null), timeoutMs);
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = url;
  });
}

// The site symbol (compass), alpha-sampled. Procedural compass ring fallback
// if the image can't load in time.
async function compassPoints() {
  const img =
    (await loadImage("/illustrations/site-symbol.webp", 2500)) ||
    (await loadImage("/illustrations/site-symbol.png", 2500));
  if (img) {
    const size = 240;
    const cnv = document.createElement("canvas");
    cnv.width = size;
    cnv.height = size;
    const ctx = cnv.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(img, 0, 0, size, size);
      const points = sampleCanvas(ctx, size, size, 110, 2);
      if (points.length > 50) return points;
    }
  }
  // Procedural: ring + needle cross + center.
  const points = [];
  for (let i = 0; i < 900; i++) {
    const a = (i / 900) * Math.PI * 2;
    const r = 0.34 + gauss(0.008);
    points.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  for (let i = 0; i < 260; i++) {
    const t = i / 260 - 0.5;
    points.push([t * 0.56, t * 0.56 + gauss(0.006)]);
    points.push([t * 0.56, -t * 0.56 + gauss(0.006)]);
  }
  for (let i = 0; i < 80; i++) points.push([gauss(0.02), gauss(0.02)]);
  return points;
}

// Build every shape the field morphs through. Async work (fonts, the compass
// image) happens once here, off the first-paint path.
export async function buildTargets({ count, width, height, groups }) {
  const [glyph, compass] = await Promise.all([glyphPoints(), compassPoints()]);

  const question = glyph
    ? pointsToTargets(glyph, count, height * 0.92, 0.7)
    : vignetteTargets(count, width, height); // glyph failed: stay atmospheric

  return {
    scatter: scatterTargets(count, width, height, 1.25),
    question,
    vignette: vignetteTargets(count, width, height),
    fork: forkTargets(count, width, height),
    constellation: constellationTargets(count, width, height, groups),
    streams: streamTargets(count, width, height, groups),
    compass: pointsToTargets(compass, count, height * 0.6, 0.5),
    ambient: ambientTargets(count, width, height),
  };
}
