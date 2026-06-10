// Sharp helpers for the Wonder Workshop art pipeline. Pure I/O-on-buffers:
// no CLI, no env, so both the generate script and tests can import them.
import sharp from "sharp";

export async function rawRgba(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

export function foregroundBoundsFromRaw(data, info, alphaThreshold = 16) {
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * 4 + 3] > alphaThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX) return null;
  return { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// Mean color + standard deviation of a border ring; used to detect a
// uniform (checkerboard-free) background that can be chroma-keyed out.
export async function borderRingStats(input, ring = 6) {
  const { data, info } = await rawRgba(input);
  const samples = [];
  const pick = (x, y) => {
    const offset = (y * info.width + x) * 4;
    samples.push([data[offset], data[offset + 1], data[offset + 2]]);
  };
  for (let x = 0; x < info.width; x += 2) {
    for (let y = 0; y < ring; y += 2) {
      pick(x, y);
      pick(x, info.height - 1 - y);
    }
  }
  for (let y = 0; y < info.height; y += 2) {
    for (let x = 0; x < ring; x += 2) {
      pick(x, y);
      pick(info.width - 1 - x, y);
    }
  }
  const mean = [0, 1, 2].map((c) => samples.reduce((sum, s) => sum + s[c], 0) / samples.length);
  const variance = samples.reduce(
    (sum, s) => sum + (s[0] - mean[0]) ** 2 + (s[1] - mean[1]) ** 2 + (s[2] - mean[2]) ** 2,
    0,
  ) / (samples.length * 3);
  return { mean, stdev: Math.sqrt(variance) };
}

// Set alpha=0 wherever a pixel is within `tolerance` RGB distance of the
// ring-mean background color. Returns a PNG buffer.
export async function keyOutUniformBackground(input, { tolerance = 26 } = {}) {
  const { mean } = await borderRingStats(input);
  const { data, info } = await rawRgba(input);
  for (let i = 0; i < data.length; i += 4) {
    const distance = Math.sqrt(
      (data[i] - mean[0]) ** 2 + (data[i + 1] - mean[1]) ** 2 + (data[i + 2] - mean[2]) ** 2,
    );
    if (distance <= tolerance) data[i + 3] = 0;
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

// Crop to the alpha foreground. Returns { buffer (png), bounds } or null when
// the image has no foreground at the threshold.
export async function trimToContent(input, { alphaThreshold = 16 } = {}) {
  const { data, info } = await rawRgba(input);
  const bounds = foregroundBoundsFromRaw(data, info, alphaThreshold);
  if (!bounds) return null;
  const buffer = await sharp(input)
    .extract({ left: bounds.minX, top: bounds.minY, width: bounds.width, height: bounds.height })
    .png()
    .toBuffer();
  return { buffer, bounds };
}

// Fit trimmed content inside a w×h transparent canvas with a uniform margin.
// Nearest-neighbor for small sprites keeps pixel edges crisp.
export async function padToCanvas(input, width, height, marginPct = 0.1) {
  const contentW = Math.round(width * (1 - marginPct * 2));
  const contentH = Math.round(height * (1 - marginPct * 2));
  const kernel = Math.max(width, height) <= 128 ? sharp.kernel.nearest : sharp.kernel.lanczos3;
  const resized = await sharp(input)
    .resize(contentW, contentH, { fit: "inside", kernel })
    .png()
    .toBuffer();
  const meta = await sharp(resized).metadata();
  return sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{
      input: resized,
      left: Math.round((width - meta.width) / 2),
      top: Math.round((height - meta.height) / 2),
    }])
    .png()
    .toBuffer();
}

export async function toWebp(input, { quality = 92, lossless = false } = {}) {
  return sharp(input).webp({ quality, lossless }).toBuffer();
}

export async function coverResize(input, width, height) {
  return sharp(input)
    .resize(width, height, { fit: "cover", position: "centre", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
}
