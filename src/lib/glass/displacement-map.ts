/**
 * Runtime displacement-map generation (the kube.io liquid-glass-css-svg
 * technique, upgraded past the review findings):
 *
 *  F2/R1 fixed — the field is computed from a rounded-rect SDF, so corners
 *  receive true radial vectors instead of axis-aligned strips overwriting
 *  each other.
 *
 *  F2/R2 fixed — maps are generated per element size and per border radius at
 *  runtime, so the map geometry always matches the surface geometry
 *  (the Subframe export baked a fixed 200×200 / rx-24 map).
 *
 * Encoding (verified against the re-review math):
 *   feDisplacementMap samples P(x + s·(R/255 − ½), y + s·(G/255 − ½))
 *   → neutral interior is 127.5/127.5 (#7f7f7f)
 *   → left edge #ff7f7f (+X), right #007f7f (−X),
 *     top #7fff7f (+Y), bottom #7f007f (−Y)
 *   → inward compression on all four edges = convex lens.
 *
 * The profile is a smoothstep across the bezel band — an approximation of
 * Snell's-law bending (n≈1.5) that kube.io ray-traces per element; smooth,
 * monotonic, and neutral exactly outside the band.
 */

export interface DisplacementMapSpec {
  width: number;
  height: number;
  /** corner radius in px */
  radius: number;
  /** bezel band width in px (how far refraction reaches inward) */
  bezel?: number;
  /** long-side resolution cap for the generated bitmap */
  maxResolution?: number;
}

const mapCache = new Map<string, string>();

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Rounded-rect signed distance field, negative inside.
 * p relative to center, b half-extents, r corner radius.
 */
function sdRoundedRect(px: number, py: number, bx: number, by: number, r: number): number {
  const qx = Math.abs(px) - bx + r;
  const qy = Math.abs(py) - by + r;
  const ax = Math.max(qx, 0);
  const ay = Math.max(qy, 0);
  return Math.min(Math.max(qx, qy), 0) + Math.sqrt(ax * ax + ay * ay) - r;
}

export function displacementMapKey(spec: DisplacementMapSpec): string {
  const bezel = spec.bezel ?? 24;
  return `${Math.round(spec.width)}x${Math.round(spec.height)}r${Math.round(spec.radius)}b${bezel}`;
}

/**
 * Generates the displacement map as a PNG data-URL sized to the element.
 * Results are cached by geometry key.
 */
export function generateDisplacementMap(spec: DisplacementMapSpec): string {
  const bezel = spec.bezel ?? 24;
  const maxRes = spec.maxResolution ?? 340;
  const key = displacementMapKey(spec);
  const cached = mapCache.get(key);
  if (cached) return cached;

  const w0 = Math.max(2, Math.round(spec.width));
  const h0 = Math.max(2, Math.round(spec.height));
  // Downsample for cost; feImage stretches with preserveAspectRatio="none".
  const scale = Math.min(1, maxRes / Math.max(w0, h0));
  const w = Math.max(8, Math.round(w0 * scale));
  const h = Math.max(8, Math.round(h0 * scale));
  const radius = Math.min(spec.radius * scale, Math.min(w, h) / 2);
  const bz = Math.max(2, bezel * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(w, h);
  const data = img.data;
  const cx = w / 2;
  const cy = h / 2;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Pixel-center sample coordinates
      const px = x + 0.5 - cx;
      const py = y + 0.5 - cy;
      const d = sdRoundedRect(px, py, w / 2, h / 2, radius);

      // Distance to the boundary from inside the shape (d ≤ 0 inside).
      // Profile ramps from 1 at the edge to 0 at the bezel depth.
      let profile = 0;
      if (d < 0) {
        const depth = -d; // 0 at edge, growing inward
        if (depth < bz) {
          profile = smoothstep(1 - depth / bz);
        }
      }

      // Inward normal from the SDF gradient (numeric, central differences).
      // Outside the band it does not matter (profile = 0).
      let nx = 0;
      let ny = 0;
      if (profile > 0) {
        const eps = 1;
        const gx =
          sdRoundedRect(px + eps, py, w / 2, h / 2, radius) -
          sdRoundedRect(px - eps, py, w / 2, h / 2, radius);
        const gy =
          sdRoundedRect(px, py + eps, w / 2, h / 2, radius) -
          sdRoundedRect(px, py - eps, w / 2, h / 2, radius);
        const len = Math.sqrt(gx * gx + gy * gy);
        if (len > 1e-6) {
          // gradient points outward (toward increasing distance) — invert.
          nx = -gx / len;
          ny = -gy / len;
        }
      }

      const i = (y * w + x) * 4;
      data[i] = Math.round(127.5 + nx * profile * 127.5); // R → X displacement
      data[i + 1] = Math.round(127.5 + ny * profile * 127.5); // G → Y displacement
      data[i + 2] = 127; // B unused by the channel selectors
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL("image/png");
  if (url) mapCache.set(key, url);
  return url;
}

/** Estimated number of cached maps (diagnostics for the docs site). */
export function displacementMapCacheSize(): number {
  return mapCache.size;
}

/**
 * Human-readable summary of the vector field at a probe point — used by the
 * live map visualizer on the Materials page.
 */
export function probeField(
  spec: DisplacementMapSpec,
  x: number,
  y: number
): { nx: number; ny: number; profile: number } {
  const bezel = spec.bezel ?? 24;
  const px = x - spec.width / 2;
  const py = y - spec.height / 2;
  const d = sdRoundedRect(px, py, spec.width / 2, spec.height / 2, spec.radius);
  let profile = 0;
  if (d < 0 && -d < bezel) profile = smoothstep(1 + d / bezel);
  let nx = 0;
  let ny = 0;
  if (profile > 0) {
    const eps = 1;
    const gx =
      sdRoundedRect(px + eps, py, spec.width / 2, spec.height / 2, spec.radius) -
      sdRoundedRect(px - eps, py, spec.width / 2, spec.height / 2, spec.radius);
    const gy =
      sdRoundedRect(px, py + eps, spec.width / 2, spec.height / 2, spec.radius) -
      sdRoundedRect(px, py - eps, spec.width / 2, spec.height / 2, spec.radius);
    const len = Math.sqrt(gx * gx + gy * gy);
    if (len > 1e-6) {
      nx = -gx / len;
      ny = -gy / len;
    }
  }
  return { nx, ny, profile };
}
