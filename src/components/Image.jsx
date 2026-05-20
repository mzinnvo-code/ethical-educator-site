/**
 * <Image> — picture-element wrapper that serves WebP when available and
 * falls back to the original PNG/JPG.
 *
 * Usage:
 *   <Image src="/illustrations/foo.png" alt="A foo" loading="lazy" />
 *
 * Renders:
 *   <picture>
 *     <source srcset="/illustrations/foo.webp" type="image/webp" />
 *     <img src="/illustrations/foo.png" alt="A foo" loading="lazy" />
 *   </picture>
 *
 * If `/illustrations/foo.webp` doesn't exist on disk yet, the <source> 404s
 * silently and the browser falls back to the <img> — no error, just no
 * WebP savings on that one image until `npm run optimize-images` is run.
 *
 * Pass any standard <img> attributes (alt, loading, width, height, style,
 * className, onLoad, onError, etc.); they're forwarded to the underlying
 * <img>. `pictureStyle` and `pictureClassName` apply to the <picture>
 * wrapper for the (rare) cases you need to style it directly.
 *
 * Pass `disableWebp` to skip the WebP source — useful for SVGs (which are
 * already optimized) or for testing the fallback path. The component still
 * works as a drop-in.
 */
export default function Image({
  src,
  alt = "",
  loading = "lazy",
  decoding = "async",
  pictureStyle,
  pictureClassName,
  disableWebp = false,
  ...imgProps
}) {
  if (!src) return null;
  const webpSrc = disableWebp ? null : toWebpUrl(src);

  return (
    <picture style={pictureStyle} className={pictureClassName}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...imgProps}
      />
    </picture>
  );
}

// Convert /foo/bar.png → /foo/bar.webp. Returns null for URLs we can't safely
// convert (data URIs, non-raster extensions, anything weird).
function toWebpUrl(src) {
  if (typeof src !== "string") return null;
  if (src.startsWith("data:") || src.startsWith("blob:")) return null;
  const lower = src.toLowerCase();
  const queryIdx = lower.indexOf("?");
  const cleanLower = queryIdx >= 0 ? lower.slice(0, queryIdx) : lower;
  const dot = cleanLower.lastIndexOf(".");
  if (dot < 0) return null;
  const ext = cleanLower.slice(dot + 1);
  if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") return null;
  const head = src.slice(0, src.length - (queryIdx >= 0 ? src.length - queryIdx : 0));
  // Replace the extension on the path portion, preserving any query string.
  const pathDot = src.lastIndexOf(".", queryIdx >= 0 ? queryIdx - 1 : src.length - 1);
  if (pathDot < 0) return null;
  return src.slice(0, pathDot) + ".webp" + (queryIdx >= 0 ? src.slice(queryIdx) : "");
}
