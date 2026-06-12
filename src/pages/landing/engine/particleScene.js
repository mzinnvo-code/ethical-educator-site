import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { buildTargets } from "./targets.js";

// Master-progress keyframes: between consecutive entries the shader blends
// aFrom -> aTo; crossing a boundary rebinds the attribute pair. Repeated
// shapes are holds. Aligned with SCENE_WINDOWS in initLandingEngine.js.
const SEGMENTS = [
  { at: 0.0, shape: "scatter" },
  { at: 0.115, shape: "question" },
  // Disperse to the edge curtain as the dilemma gallery wall assembles
  // (0.165–0.30) so the field frames the wall instead of hiding behind it.
  { at: 0.16, shape: "question" },
  { at: 0.22, shape: "vignette" },
  { at: 0.275, shape: "vignette" },
  { at: 0.365, shape: "fork" },
  { at: 0.5, shape: "fork" },
  { at: 0.575, shape: "constellation" },
  { at: 0.655, shape: "constellation" },
  { at: 0.735, shape: "streams" },
  { at: 0.815, shape: "streams" },
  { at: 0.9, shape: "compass" },
  { at: 0.94, shape: "compass" },
  { at: 1.0, shape: "ambient" },
];

// Idle-drift amplitude per shape — tight glyphs barely breathe, dispersed
// fields swim.
const DRIFT = {
  scatter: 1.0,
  question: 0.1,
  vignette: 0.75,
  fork: 0.45,
  constellation: 0.16,
  streams: 0.3,
  compass: 0.08,
  ambient: 1.2,
};

// Brightened for additive blending on the midnight background.
const PALETTE = ["#e0b848", "#2aa890", "#3a98d0", "#d08050"];
const PALETTE_WEIGHTS = [0.42, 0.24, 0.18, 0.16];

const VERTEX = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec4 aSeed; // x phase, y speed, z size, w color index
  uniform float uTime;
  uniform float uMix;
  uniform float uDrift;
  uniform float uChoiceBias;
  uniform float uPointScale;
  uniform vec3 uColors[4];
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    // Per-particle stagger so morphs ripple instead of snapping in unison.
    float t = clamp((uMix - aSeed.x * 0.3) / 0.7, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(aFrom, aTo, t);

    float drift = 0.05 + uDrift * 0.5;
    pos.x += sin(uTime * aSeed.y * 0.7 + aSeed.x * 6.2832) * drift;
    pos.y += cos(uTime * aSeed.y * 0.55 + aSeed.x * 12.566) * drift * 0.85;
    pos.z += sin(uTime * aSeed.y * 0.4 + aSeed.x * 9.4248) * drift * 0.6;

    // Choice-scene lean: the whole field tips toward the hovered branch.
    pos.x += uChoiceBias * (1.2 + aSeed.z * 2.0);
    pos.y += uChoiceBias * sin(aSeed.x * 6.2832) * 0.5;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (0.6 + aSeed.z * 1.7) * uPointScale * (14.0 / -mv.z);
    vColor = uColors[int(aSeed.w + 0.5)];
    vTwinkle = 0.55 + 0.45 * sin(uTime * aSeed.y * 1.7 + aSeed.x * 20.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uGlobalAlpha;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.06, d);
    gl_FragColor = vec4(vColor, a * vTwinkle * uGlobalAlpha);
  }
`;

function pickParticleCount() {
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 8;
  if (cores <= 4 || mem <= 4) return 4000;
  if (coarse) return 7000;
  if (cores >= 8 && mem >= 8) return 22000;
  return 14000;
}

export async function createParticleScene(canvas) {
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  const count = pickParticleCount();

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0); // page background shows through
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 60);
  camera.position.z = 18;

  // Visible world rectangle at z = 0, used by every shape generator.
  const worldHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * 0.82;
  const worldWidth = worldHeight * camera.aspect;

  // Color group per particle — also drives cluster/ribbon membership so the
  // constellation and streams come out color-coherent.
  const groups = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    groups[i] = r < PALETTE_WEIGHTS[0] ? 0 : r < PALETTE_WEIGHTS[0] + PALETTE_WEIGHTS[1] ? 1 : r < 1 - PALETTE_WEIGHTS[3] ? 2 : 3;
  }

  const shapes = await buildTargets({ count, width: worldWidth, height: worldHeight, groups });

  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    seeds[i * 4] = Math.random();
    seeds[i * 4 + 1] = 0.4 + Math.random() * 0.8;
    seeds[i * 4 + 2] = Math.random();
    seeds[i * 4 + 3] = groups[i];
  }

  const geometry = new BufferGeometry();
  // `position` only sets the draw count; actual positions come from aFrom/aTo.
  geometry.setAttribute("position", new BufferAttribute(shapes.scatter.slice(), 3));
  geometry.setAttribute("aFrom", new BufferAttribute(shapes.scatter.slice(), 3));
  geometry.setAttribute("aTo", new BufferAttribute(shapes.question.slice(), 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 4));

  const material = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMix: { value: 0 },
      uDrift: { value: DRIFT.scatter },
      uChoiceBias: { value: 0 },
      uGlobalAlpha: { value: 1 },
      uPointScale: { value: 1 },
      uColors: { value: PALETTE.map((hex) => new Color(hex)) },
    },
  });

  const points = new Points(geometry, material);
  points.frustumCulled = false;
  const scene = new Scene();
  scene.add(points);

  let segment = -1;
  let contextLost = false;

  const onContextLost = (e) => {
    e.preventDefault();
    contextLost = true;
    canvas.style.display = "none"; // engine keeps narrating; field just exits
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  const updatePointScale = () => {
    material.uniforms.uPointScale.value = Math.max(0.7, window.innerHeight / 950) * renderer.getPixelRatio();
  };
  updatePointScale();

  const bindSegment = (idx) => {
    const from = shapes[SEGMENTS[idx].shape];
    const to = shapes[SEGMENTS[Math.min(idx + 1, SEGMENTS.length - 1)].shape];
    geometry.getAttribute("aFrom").copyArray(from);
    geometry.getAttribute("aTo").copyArray(to);
    geometry.getAttribute("aFrom").needsUpdate = true;
    geometry.getAttribute("aTo").needsUpdate = true;
  };

  return {
    // progress in [0,1] — find the segment, rebind on boundary crossings
    // (works in both scrub directions), set the local blend.
    update(progress) {
      let idx = SEGMENTS.length - 2;
      for (let i = 0; i < SEGMENTS.length - 1; i++) {
        if (progress < SEGMENTS[i + 1].at) {
          idx = i;
          break;
        }
      }
      if (idx !== segment) {
        segment = idx;
        bindSegment(idx);
      }
      const a = SEGMENTS[idx];
      const b = SEGMENTS[idx + 1];
      const t = Math.min(1, Math.max(0, (progress - a.at) / (b.at - a.at || 1)));
      material.uniforms.uMix.value = t;
      material.uniforms.uDrift.value = DRIFT[a.shape] + (DRIFT[b.shape] - DRIFT[a.shape]) * t;
    },

    setChoiceBias(value) {
      material.uniforms.uChoiceBias.value = value;
    },

    setGlobalAlpha(value) {
      material.uniforms.uGlobalAlpha.value = value;
    },

    render(time) {
      if (contextLost) return;
      material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
    },

    resize() {
      if (contextLost) return;
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      updatePointScale();
    },

    dispose() {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch {
        // context may already be gone
      }
    },
  };
}
