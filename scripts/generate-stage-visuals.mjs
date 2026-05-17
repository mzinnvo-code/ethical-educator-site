import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createServer } from "vite";

const root = process.cwd();
const stageSetRoot = path.join(root, "public", "experiment-scenes", "stage-sets");
const manifestPath = path.join(root, "src", "data", "stageSceneManifest.js");
const planPath = path.join(root, "public", "experiment-scenes", "stage-sets", "visual-bible.json");

const bespokeStageSets = [
  {
    experimentId: "explaining-red-k-2",
    visualVariant: "k-2",
    title: "Explaining Red - K-2",
    tone: "young",
    stages: [
      ["intro", "Explaining Red"],
      ["arrival", "A new student arrives"],
      ["ada-responds", "Ada thinks about it"],
      ["reflection", "What the class learned today"],
    ],
  },
  {
    experimentId: "the-shortcut",
    visualVariant: "flagship",
    title: "The Shortcut",
    tone: "educator",
    stages: [
      ["intro", "The Shortcut"],
      ["premise", "The Premise"],
      ["scarcity", "The Scarcity Condition"],
      ["universal", "Universal Availability"],
      ["developmental", "The Developmental Question"],
      ["reflection", "What The Shortcut Reveals"],
    ],
  },
  {
    experimentId: "ai-authorship",
    visualVariant: "flagship",
    title: "The AI Authorship Quandary",
    tone: "educator",
    stages: [
      ["intro", "The AI Authorship Quandary"],
      ["perspective", "Your Perspective"],
      ["consequence", "The Consequence"],
      ["reflection", "What Your Choices Reveal"],
    ],
  },
  {
    experimentId: "reluctant-educator",
    visualVariant: "flagship",
    title: "The Reluctant Educator",
    tone: "educator",
    stages: [
      ["intro", "The Reluctant Educator"],
      ["dashboard-week-1", "Week 1 Metrics"],
      ["dashboard-week-4", "Week 4 Metrics"],
      ["dashboard-week-8", "Week 8 Metrics"],
      ["dashboard-week-12", "Week 12 Metrics"],
      ["reflection", "The Tradeoff"],
    ],
  },
  {
    experimentId: "digital-doppelganger",
    visualVariant: "flagship",
    title: "The Digital Doppelganger",
    tone: "educator",
    stages: [
      ["intro", "The Digital Doppelganger"],
      ["discussion-board", "The Discussion Board"],
      ["voice-clone", "The Voice Clone"],
      ["proliferation", "The Proliferation"],
      ["exam", "The Exam"],
      ["policy", "The Policy Committee"],
    ],
  },
];

function toneForVariant(variant) {
  if (variant === "k-5" || variant === "k-2") return "young";
  if (variant === "6-8") return "middle";
  if (variant === "9-12") return "high";
  return "educator";
}

function motionForStage(stageId, fallback = "subtle") {
  if (/synthesis|reflection|policy|reveal|return/.test(stageId)) return "reveal";
  if (/mirror|same|voice|clone|doppel/.test(stageId)) return "mirror";
  if (/trolley|car|road|shortcut|switch|path|route/.test(stageId)) return "switch";
  if (/warning|detector|grading|score|mistake|exam/.test(stageId)) return "warning";
  if (/scan|surveillance|ai|robot|box|screen|dashboard/.test(stageId)) return "glow";
  if (/split|source|proof|liar|deepfake/.test(stageId)) return "split";
  return fallback;
}

function publicFileFor(src) {
  if (!src?.startsWith("/")) return null;
  return path.join(root, "public", src.slice(1));
}

function collectScenarioSets(experiments, visualVariant, baseScenes) {
  return experiments
    .filter((experiment) => Array.isArray(experiment.stages) && experiment.stages.length)
    .map((experiment) => {
      const base = baseScenes[experiment.id] || {};
      return {
        experimentId: experiment.id,
        visualVariant,
        title: experiment.title,
        tone: toneForVariant(visualVariant),
        motion: base.motion || "subtle",
        baseSrc: base.src || null,
        baseFile: publicFileFor(base.src),
        characterNotes: `${experiment.title} keeps recurring characters, props, and classroom context visually consistent across stages.`,
        styleNotes: "Cinematic educational storybook panel, no text, midnight background with teal, gold, coral, and ocean accents.",
        stages: experiment.stages.map((stage) => [
          stage.id,
          stage.title || stage.kicker || stage.id,
          motionForStage(stage.id, base.motion),
        ]),
      };
    });
}

const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true, hmr: false },
});

try {
  const [{ getExperimentsByGrade }, { SCENE_ILLUSTRATIONS }] = await Promise.all([
    server.ssrLoadModule("/src/data/experiments.js"),
    server.ssrLoadModule("/src/data/sceneIllustrations.js"),
  ]);

  const sets = [
    ...collectScenarioSets(getExperimentsByGrade("k-5"), "k-5", SCENE_ILLUSTRATIONS),
    ...collectScenarioSets(getExperimentsByGrade("6-8"), "6-8", SCENE_ILLUSTRATIONS),
    ...collectScenarioSets(getExperimentsByGrade("9-12"), "9-12", SCENE_ILLUSTRATIONS),
    ...collectScenarioSets(getExperimentsByGrade("educators"), "educators", SCENE_ILLUSTRATIONS),
    ...bespokeStageSets.map((set) => {
      const base = SCENE_ILLUSTRATIONS[set.experimentId] || {};
      return {
        ...set,
        motion: base.motion || "subtle",
        baseSrc: base.src || null,
        baseFile: publicFileFor(base.src),
        characterNotes: `${set.title} keeps recurring characters, props, and classroom context visually consistent across stages.`,
        styleNotes: "Cinematic educational storybook panel, no text, midnight background with teal, gold, coral, and ocean accents.",
        stages: set.stages.map(([stageId, stageTitle]) => [stageId, stageTitle, motionForStage(stageId, base.motion)]),
      };
    }),
  ];

  fs.mkdirSync(stageSetRoot, { recursive: true });
  fs.writeFileSync(planPath, JSON.stringify({ generatedAt: new Date().toISOString(), sets }, null, 2));

  const python = String.raw`
import json, math, os, random, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

root = Path(sys.argv[1])
plan_path = Path(sys.argv[2])
out_root = root / "public" / "experiment-scenes" / "stage-sets"
data = json.loads(plan_path.read_text())

W, H = 1280, 720
PALETTES = {
    "young": [(224,184,72), (192,112,64), (26,138,122), (42,136,192)],
    "middle": [(26,138,122), (42,136,192), (200,152,48), (192,112,64)],
    "high": [(42,136,192), (26,90,138), (200,152,48), (224,220,208)],
    "educator": [(200,152,48), (26,138,122), (26,90,138), (192,112,64)],
}

def hash_int(text):
    h = 2166136261
    for ch in text:
        h ^= ord(ch)
        h = (h * 16777619) & 0xffffffff
    return h

def cover_resize(img):
    img = img.convert("RGB")
    scale = max(W / img.width, H / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - W) // 2
    top = (nh - H) // 2
    return img.crop((left, top, left + W, top + H))

def fallback_gradient(seed, tone):
    rnd = random.Random(seed)
    palette = PALETTES.get(tone, PALETTES["middle"])
    base = Image.new("RGB", (W, H), (8, 18, 32))
    px = base.load()
    c1, c2 = palette[0], palette[1]
    for y in range(H):
        for x in range(W):
            t = (x / W * 0.55) + (y / H * 0.45)
            ripple = math.sin((x + seed % 313) / 80.0) * 0.04 + math.cos((y + seed % 197) / 70.0) * 0.04
            t = max(0, min(1, t + ripple))
            px[x, y] = tuple(int((1 - t) * a + t * b) for a, b in zip(c1, c2))
    return base.filter(ImageFilter.GaussianBlur(1.2))

def make_base(base_file, seed, tone):
    if base_file and Path(base_file).exists():
        try:
            return cover_resize(Image.open(base_file))
        except Exception:
            pass
    return fallback_gradient(seed, tone)

def overlay_color(img, color, alpha):
    layer = Image.new("RGB", (W, H), color)
    return Image.blend(img, layer, alpha)

def vignette(img):
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((-180, -110, W + 180, H + 170), fill=220)
    mask = mask.filter(ImageFilter.GaussianBlur(110))
    dark = Image.new("RGB", (W, H), (4, 10, 18))
    return Image.composite(img, dark, mask)

def draw_common(draw, palette, seed, index, total, motion):
    rnd = random.Random(seed)
    accent = palette[index % len(palette)]
    accent2 = palette[(index + 2) % len(palette)]
    # horizon bands
    draw.polygon([(0, H*0.72), (W, H*0.62 + rnd.randint(-30, 30)), (W, H), (0, H)], fill=(7, 16, 28, 170))
    # big story glow
    for r, a in [(260, 42), (170, 54), (88, 70)]:
        cx = int(W * (0.28 + 0.11 * (index % 5))) + rnd.randint(-35, 35)
        cy = int(H * (0.42 + 0.06 * ((index + 1) % 3))) + rnd.randint(-28, 28)
        draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=(*accent, a))
    # path/progress dots
    for i in range(total):
        x = W - 66 - (total - 1 - i) * 22
        y = H - 52
        fill = (*accent, 218) if i <= index else (224, 220, 208, 72)
        draw.ellipse((x-5, y-5, x+5, y+5), fill=fill)
    # stage lens frames
    if motion in ["split", "mirror"]:
        draw.rounded_rectangle((92, 92, 585, 564), radius=30, outline=(*accent, 150), width=5)
        draw.rounded_rectangle((695, 112, 1170, 548), radius=30, outline=(*accent2, 132), width=5)
    elif motion in ["switch", "road"]:
        draw.line((120, 610, 560, 380, 1160, 245), fill=(*accent, 170), width=18)
        draw.line((560, 380, 1060, 590), fill=(*accent2, 118), width=12)
    elif motion in ["warning", "scan"]:
        draw.rounded_rectangle((170, 110, 1110, 590), radius=38, outline=(*accent, 155), width=6)
        for y in range(150, 560, 58):
            draw.line((210, y, 1070, y), fill=(42,136,192,56), width=3)
    else:
        draw.rounded_rectangle((150, 120, 1130, 575), radius=42, outline=(*accent, 126), width=5)
        draw.arc((210, 135, 1070, 650), 200, 340, fill=(*accent2, 92), width=12)

def draw_people_and_props(draw, palette, seed, index, total, key):
    rnd = random.Random(seed)
    accent = palette[index % len(palette)]
    x0 = 270 + (index % 3) * 42
    # consistent recurring silhouettes
    for n, x in enumerate([x0, x0 + 110, x0 + 220]):
        body = palette[(n + 1) % len(palette)]
        h = 130 + (n % 2) * 18
        draw.ellipse((x-24, 255-h//2, x+24, 303-h//2), fill=(224,220,208,210))
        draw.rounded_rectangle((x-33, 306-h//2, x+33, 440), radius=22, fill=(*body, 190))
    # stage object motif
    cx, cy = 820 + rnd.randint(-50, 50), 350 + rnd.randint(-35, 35)
    if any(word in key for word in ["ring", "mirror", "gyges"]):
        draw.ellipse((cx-82, cy-82, cx+82, cy+82), outline=(*accent, 230), width=18)
        draw.ellipse((cx-38, cy-38, cx+38, cy+38), outline=(224,220,208,160), width=6)
    elif any(word in key for word in ["robot", "toy", "pet"]):
        draw.rounded_rectangle((cx-80, cy-58, cx+80, cy+64), radius=32, fill=(18,37,61,230), outline=(*accent,190), width=6)
        draw.ellipse((cx-38, cy-12, cx-18, cy+8), fill=(*accent,230))
        draw.ellipse((cx+18, cy-12, cx+38, cy+8), fill=(*accent,230))
    elif any(word in key for word in ["trolley", "car", "shuttle", "route", "shortcut"]):
        draw.rounded_rectangle((cx-110, cy-48, cx+110, cy+42), radius=20, fill=(18,37,61,230), outline=(*accent,190), width=5)
        draw.ellipse((cx-72, cy+32, cx-38, cy+66), fill=(5,10,18,220))
        draw.ellipse((cx+38, cy+32, cx+72, cy+66), fill=(5,10,18,220))
    elif any(word in key for word in ["ai", "screen", "deepfake", "detector", "grading", "homework", "authorship", "doppelganger"]):
        draw.rounded_rectangle((cx-115, cy-78, cx+115, cy+66), radius=20, fill=(8,18,32,232), outline=(*accent,190), width=5)
        for i in range(5):
            draw.line((cx-82, cy-42+i*23, cx+78-rnd.randint(0, 45), cy-42+i*23), fill=(*accent,92), width=5)
    elif any(word in key for word in ["red", "mary", "color"]):
        for r, color in [(95,(192,112,64)), (66,(224,184,72)), (38,(42,136,192))]:
            draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=(*color, 112))
    else:
        draw.polygon([(cx, cy-105), (cx+92, cy+74), (cx-92, cy+74)], fill=(*accent,132), outline=(224,220,208,92))

for set_data in data["sets"]:
    variant = set_data["visualVariant"]
    exp_id = set_data["experimentId"]
    tone = set_data.get("tone") or "middle"
    palette = PALETTES.get(tone, PALETTES["middle"])
    stages = set_data["stages"]
    total = len(stages)
    base_seed = hash_int(variant + ":" + exp_id)
    base = make_base(set_data.get("baseFile"), base_seed, tone)
    for index, stage in enumerate(stages):
        stage_id, stage_title, motion = stage
        seed = hash_int(variant + ":" + exp_id + ":" + stage_id)
        rnd = random.Random(seed)
        img = base.copy().filter(ImageFilter.GaussianBlur(1.2 + (index % 3) * 0.35))
        img = ImageEnhance.Contrast(img).enhance(0.9)
        img = ImageEnhance.Color(img).enhance(0.82)
        tint = palette[(index + 1) % len(palette)]
        img = overlay_color(img, (8, 18, 32), 0.32)
        img = overlay_color(img, tint, 0.10 + (index % 4) * 0.025)
        img = vignette(img)
        rgba = img.convert("RGBA")
        overlay = Image.new("RGBA", (W, H), (0,0,0,0))
        draw = ImageDraw.Draw(overlay, "RGBA")
        key = (exp_id + " " + stage_id + " " + stage_title).lower()
        draw_common(draw, palette, seed, index, total, motion)
        draw_people_and_props(draw, palette, seed, index, total, key)
        # Fine grain and warm classroom glints.
        for _ in range(140):
            x, y = rnd.randrange(W), rnd.randrange(H)
            a = rnd.randrange(14, 42)
            draw.ellipse((x, y, x+1, y+1), fill=(224,220,208,a))
        rgba = Image.alpha_composite(rgba, overlay)
        out_dir = out_root / variant / exp_id
        out_dir.mkdir(parents=True, exist_ok=True)
        rgba.convert("RGB").save(out_dir / f"{stage_id}.webp", "WEBP", quality=86, method=6)
`;

  const result = spawnSync("python3", ["-c", python, root, planPath], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8,
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }

  const manifest = {};
  sets.forEach((set) => {
    const key = `${set.visualVariant}:${set.experimentId}`;
    manifest[key] = {
      tone: set.tone,
      motion: set.motion,
      characterNotes: set.characterNotes,
      styleNotes: set.styleNotes,
      stages: Object.fromEntries(set.stages.map(([stageId, stageTitle, motion]) => [
        stageId,
        {
          src: `/experiment-scenes/stage-sets/${set.visualVariant}/${set.experimentId}/${stageId}.webp`,
          alt: `${set.title}: ${stageTitle} shown as a cinematic story scene in The Ethical Educator visual style.`,
          motion,
          tone: set.tone,
        },
      ])),
    };
  });

  const content = `// Generated by scripts/generate-stage-visuals.mjs. Edit source data or rerun the script.\nexport const STAGE_SCENE_SETS = ${JSON.stringify(manifest, null, 2)};\n`;
  fs.writeFileSync(manifestPath, content);
  console.log(`Generated ${sets.reduce((n, set) => n + set.stages.length, 0)} stage visuals.`);
} finally {
  await server.close();
}
