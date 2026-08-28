/**
 * Runtime displacement-map generation — a verbatim port of the kube.io
 * liquid-glass-css-svg generator, decoded from the shipped site:
 *
 *   https://kube.io/blog/liquid-glass-css-svg/
 *
 * What kube.io publishes (and what this file reproduces exactly):
 *
 *  1. The ring renderer (their `Qt` function, decoded from the blog bundle):
 *     a rounded-rect bezel ring selected by distance to the nearest
 *     corner-arc CENTER — pixels whose squared offset from the nearest arc
 *     center lands in [(r - bezel)^2, (r + 1)^2] get displacement, everything
 *     else stays neutral. The direction is the exact per-pixel radial unit
 *     computed from the integer offsets to that arc center, the depth is
 *     r - |offset|, and a 1px antialias fade covers the outermost band.
 *
 *  2. The neutral fill 0xFF008080 — R=128, G=128, B=0, A=255 (little-endian
 *     u32). The 8-bit map stores normalized magnitudes; the filter's
 *     feDisplacementMap scale re-imposes physical pixel scale.
 *
 *  3. The specular rim (their `Yr` function): a semicircular brightness
 *     profile over the outer 2 device pixels of the border, lit by a fixed
 *     light at -60 degrees — s = |n·l| * sqrt(1 - (1 - t/dpr)^2), rgb = 255s,
 *     alpha = 255 s^2 * fade. Byte-verified against the shipped rim pixels.
 *
 *  4. The bezel displacement curves — baked below as normalized tables
 *     measured directly from kube.io's shipped displacement maps (they ship
 *     as 2x bilinear renders; the 1x layer carries the true values). Each
 *     material level reuses one shipped reference component:
 *
 *       ultrathin  switch thumb   146x92  r46   maxDisplacement 55.65
 *       thin       searchbox      420x56  r28   maxDisplacement 78.53
 *       regular    magnifier      210x150 r75   maxDisplacement 122.81
 *       thick      hero circle    150x150 r75   maxDisplacement 133.97
 *
 * The physics the article teaches (Snell refraction through a squircle
 * bezel profile, max = 1.1181 x thickness) produces these same constants;
 * we bake the measured curves so the runtime reproduces the shipped maps
 * themselves, at any element size.
 */

import type { MaterialLevel } from "./engine-detect";

/* ------------------------------------------------------------------ */
/* Baked reference data (measured from the shipped kube.io PNGs)       */
/* ------------------------------------------------------------------ */

/**
 * Normalized bezel profiles at 0.5 element-px steps, border = 1.
 * Index with floor(depth / bezel * length) — kube's exact expression
 * `s[(r/m*s.length)|0] ?? 0` (truncation toward zero, so the 1px outer
 * antialias band reads the border sample).
 */
export const BAKED_PROFILES: Record<MaterialLevel, number[]> = {
  // switch thumb: bezel 4 el px, 9 samples
  ultrathin: [
    1.0, 0.9403, 0.791, 0.597, 0.4776, 0.3582, 0.209, 0.0896, 0.0,
  ],
  // searchbox: bezel 21 el px, 43 samples
  thin: [
    1.0, 0.9394, 0.8283, 0.697, 0.6263, 0.5556, 0.4848, 0.4444, 0.404,
    0.3535, 0.3232, 0.2828, 0.2626, 0.2424, 0.2121, 0.1919, 0.1818,
    0.1616, 0.1414, 0.1313, 0.1212, 0.1111, 0.0909, 0.0909, 0.0808,
    0.0707, 0.0606, 0.0505, 0.0505, 0.0404, 0.0404, 0.0303, 0.0303,
    0.0202, 0.0202, 0.0202, 0.0202, 0.0101, 0.0101, 0.0101, 0.0101,
    0.0101, 0.0,
  ],
  // magnifier: bezel 20 el px, 41 samples
  regular: [
    1.0, 1.0, 0.874, 0.7795, 0.6614, 0.5906, 0.5118, 0.4646, 0.4016,
    0.3543, 0.3228, 0.2835, 0.2598, 0.2283, 0.2126, 0.189, 0.1732,
    0.1496, 0.1339, 0.126, 0.1102, 0.0945, 0.0866, 0.0787, 0.0709,
    0.0551, 0.0551, 0.0472, 0.0394, 0.0315, 0.0315, 0.0236, 0.0236,
    0.0157, 0.0157, 0.0157, 0.0079, 0.0079, 0.0079, 0.0079, 0.0,
  ],
  // hero circle: bezel 32.5 el px, 66 samples
  thick: [
    1.0, 1.0, 1.0, 1.0, 0.9528, 0.8504, 0.8031, 0.7244, 0.6929, 0.622,
    0.5669, 0.5433, 0.4961, 0.4724, 0.4331, 0.3937, 0.378, 0.3465,
    0.3386, 0.3071, 0.2835, 0.2677, 0.252, 0.2362, 0.2205, 0.2047,
    0.1969, 0.1811, 0.1732, 0.1575, 0.1417, 0.1417, 0.126, 0.1181,
    0.1102, 0.1024, 0.0945, 0.0866, 0.0866, 0.0787, 0.0709, 0.063,
    0.063, 0.0551, 0.0472, 0.0472, 0.0394, 0.0394, 0.0394, 0.0315,
    0.0315, 0.0236, 0.0236, 0.0236, 0.0157, 0.0157, 0.0157, 0.0157,
    0.0157, 0.0079, 0.0079, 0.0079, 0.0079, 0.0079, 0.0079, 0.0,
  ],
};

/** Bezel band widths measured from the shipped maps (element px). */
export const BAKED_BEZEL: Record<MaterialLevel, number> = {
  ultrathin: 4,
  thin: 21,
  regular: 20,
  thick: 32.5,
};

/**
 * The shipped maxDisplacement constants, verbatim — feDisplacementMap
 * scale = maxDisplacement x scaleRatio (kube animates scaleRatio with a
 * spring: resting refractionLevel x 0.8, held refractionLevel x 1.0).
 */
export const MAX_DISPLACEMENT: Record<MaterialLevel, number> = {
  ultrathin: 55.65161904498752,
  thin: 78.53293977771185,
  regular: 122.80891678834695,
  thick: 133.9733637691058,
};

/* ------------------------------------------------------------------ */
/* Spec                                                                */
/* ------------------------------------------------------------------ */

export interface DisplacementMapSpec {
  width: number;
  height: number;
  /** corner radius in px */
  radius: number;
  /** bezel band width in px — defaults to the level's baked bezel */
  bezel?: number;
  /** material level whose baked curve + constant to use (runtime path) */
  material?: MaterialLevel;
  /** fixed light direction for the specular rim, degrees (default -60) */
  specularAngle?: number;
  /** total map pixel budget before the render downsamples (default 1.1M) */
  pixelBudget?: number;
}

/* ------------------------------------------------------------------ */
/* Displacement map — kube.io's Qt ring renderer, verbatim            */
/* ------------------------------------------------------------------ */

/**
 * Renders the displacement map into an ImageData of w*dpr x h*dpr px.
 *
 * Ring mechanics (decoded from the shipped `Qt`): for every pixel, the
 * offset to the nearest corner-arc center (0 on the straight spans) gives
 * both the exact radial direction and the border depth; pixels with
 * dist in [r - bezel, r + 1] (map px) are displaced inward along the
 * radial by profile(depth) — the baked curve — with a 1px outer fade.
 */
function renderDisplacementMap(
  w: number,
  h: number,
  radius: number,
  bezel: number,
  profile: number[],
  dpr: number
): ImageData | null {
  const mw = Math.max(2, Math.round(w * dpr));
  const mh = Math.max(2, Math.round(h * dpr));
  const canvas = document.createElement("canvas");
  canvas.width = mw;
  canvas.height = mh;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const img = ctx.createImageData(mw, mh);
  // Neutral fill 0xFF008080 little-endian: R=128 G=128 B=0 A=255.
  new Uint32Array(img.data.buffer).fill(0xff008080);

  const r = Math.min(radius, Math.min(w, h) / 2) * dpr; // p — arc radius
  const m = Math.max(1, bezel * dpr); // ring width in map px
  const inner2 = (r - m) * (r - m);
  const border2 = r * r;
  const outer2 = (r + 1) * (r + 1);
  const spanX = mw - 2 * r; // b — straight-run length between arc centers
  const spanY = mh - 2 * r; // ee
  const n = profile.length;

  for (let e = 0; e < mh; e++) {
    const bottom = e >= mh - r;
    const d = e < r ? e - r : bottom ? e - r - spanY : 0;
    for (let t = 0; t < mw; t++) {
      const right = t >= mw - r;
      const l = t < r ? t - r : right ? t - r - spanX : 0;
      const s = l * l + d * d;
      if (s > outer2 || s < inner2) continue;

      const dist = Math.sqrt(s);
      // 1px antialias fade across the outer band [r, r+1]
      const fade = s < border2 ? 1 : 1 - (dist - r);
      const depth = r - dist; // map px from the border, inward
      const inv = 1 / dist;
      const nx = l * inv; // outward radial unit (exact per pixel)
      const ny = d * inv;
      // kube: c = s[(depth/m * len)|0] ?? 0 — truncation toward zero
      const c = profile[(depth / m) * n | 0] ?? 0;
      const k = c * 127 * fade;
      const rr = Math.max(0, Math.min(255, Math.round(128 - nx * k)));
      const gg = Math.max(0, Math.min(255, Math.round(128 - ny * k)));
      const i = (e * mw + t) * 4;
      img.data[i] = rr;
      img.data[i + 1] = gg;
      img.data[i + 2] = 0;
      img.data[i + 3] = 255;
    }
  }
  return img;
}

/* ------------------------------------------------------------------ */
/* Specular map — kube.io's Yr rim renderer, verbatim                 */
/* ------------------------------------------------------------------ */

/**
 * Renders the specular rim into an ImageData of w*dpr x h*dpr px.
 *
 * Ring [r - rimW*dpr, r + dpr] around the arc centers; brightness is a
 * semicircle profile over the outermost 2 device pixels, gated by the
 * border normal's alignment with the light:
 *   s = |n·l| * sqrt(1 - (1 - t/dpr)^2), rgb = 255s, alpha = 255 s^2 fade
 * (light at -60 degrees with the y-negated normal, exactly as shipped —
 * byte-verified: left rim alpha 48/64, top rim 143/191).
 */
function renderSpecularMap(
  w: number,
  h: number,
  radius: number,
  rimWidth: number,
  lightAngle: number,
  dpr: number
): ImageData | null {
  const mw = Math.max(2, Math.round(w * dpr));
  const mh = Math.max(2, Math.round(h * dpr));
  const canvas = document.createElement("canvas");
  canvas.width = mw;
  canvas.height = mh;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const img = ctx.createImageData(mw, mh);
  new Uint32Array(img.data.buffer).fill(0); // transparent

  const u = Math.min(radius, Math.min(w, h) / 2) * dpr;
  const rim = Math.max(2, rimWidth) * dpr;
  const lightX = Math.cos(lightAngle);
  const lightY = Math.sin(lightAngle);
  const border2 = u * u;
  const outer2 = (u + dpr) * (u + dpr);
  const inner2 = (u - rim) * (u - rim);
  const spanX = mw - 2 * u;
  const spanY = mh - 2 * u;

  for (let e = 0; e < mh; e++) {
    const bottom = e >= mh - u;
    const dy = e < u ? e - u : bottom ? e - u - spanY : 0;
    for (let t = 0; t < mw; t++) {
      const right = t >= mw - u;
      const dx = t < u ? t - u : right ? t - u - spanX : 0;
      const b = dx * dx + dy * dy;
      if (b > outer2 || b < inner2) continue;

      const dist = Math.sqrt(b);
      const depth = u - dist; // t — map px from the border
      const fade = b < border2 ? 1 : 1 - (dist - u) / dpr;
      const inv = 1 / dist;
      const nx = dx * inv;
      const ny = -dy * inv; // y negated — light coordinate system
      const arc = Math.sqrt(Math.max(0, 1 - (1 - depth / dpr) ** 2));
      const s = Math.abs(nx * lightX + ny * lightY) * arc;
      const c = 255 * s;
      const alpha = c * s * fade;
      const i = (e * mw + t) * 4;
      const cc = Math.round(Math.min(255, c));
      img.data[i] = cc;
      img.data[i + 1] = cc;
      img.data[i + 2] = cc;
      img.data[i + 3] = Math.round(Math.min(255, Math.max(0, alpha)));
    }
  }
  return img;
}

/* ------------------------------------------------------------------ */
/* Frost mask — candidate C's rim gradient as an alpha map            */
/* ------------------------------------------------------------------ */

/**
 * Renders the progressive-frost rim mask: white RGB with an alpha ramp
 * that stays 0 over the core and rises to 1 at the rim, on the ELLIPSE
 * inscribed in the element — the canvas twin of the base tier's
 * `radial-gradient(closest-side, transparent 55%, black 85% / 78%..98%)`
 * bands. Inside the SVG displacement filter the rim-blur layer is
 * composited through this mask (feComposite operator="in"), so the
 * Chromium tier gets the same sharp-core / frosted-edge falloff the CSS
 * tier has, while the tuned kube.io centre blur is left untouched.
 *
 * The single ramp (0.55 -> 0.98 of the inscribed ellipse) merges the CSS
 * tier's mid and rim bands into one smooth progression — the stacked-band
 * structure exists in CSS because each band is a separate element; inside
 * one filter chain a smooth mask reads the same and costs one node less.
 */
function renderFrostMask(w: number, h: number, dpr: number): string | null {
  const mw = Math.max(2, Math.round(w * dpr));
  const mh = Math.max(2, Math.round(h * dpr));
  const canvas = document.createElement("canvas");
  canvas.width = mw;
  canvas.height = mh;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Unit circle scaled to the inscribed ellipse: the gradient's percentage
  // stops then measure the closest-side distance per axis, exactly like
  // radial-gradient(closest-side, ...) does in CSS.
  ctx.translate(mw / 2, mh / 2);
  ctx.scale(mw / 2, mh / 2);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0)");
  gradient.addColorStop(0.98, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(-1, -1, 2, 2);
  return canvas.toDataURL("image/png");
}

/* ------------------------------------------------------------------ */
/* Generation + cache                                                  */
/* ------------------------------------------------------------------ */

export interface GeneratedMaps {
  /** displacement map data URL (R = X, G = Y, neutral 128, B = 0) */
  displacementUrl: string;
  /** specular rim map data URL (grayscale rgb, alpha = rim strength) */
  specularUrl: string;
  /** progressive-frost rim mask data URL (white rgb, alpha ramp) */
  frostMaskUrl: string;
  /** the shipped constant for the resolved level — feDisplacementMap
   *  scale = maximumDisplacement x scaleRatio */
  maximumDisplacement: number;
}

interface ResolvedProfile {
  table: number[];
  bezel: number;
  level: MaterialLevel;
}

function resolveProfile(spec: DisplacementMapSpec): ResolvedProfile {
  const levels: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];
  if (spec.material) {
    return {
      table: BAKED_PROFILES[spec.material],
      bezel: spec.bezel ?? BAKED_BEZEL[spec.material],
      level: spec.material,
    };
  }
  // Docs/visualizer path: no material declared — nearest baked bezel.
  const wanted = spec.bezel ?? BAKED_BEZEL.regular;
  let best: MaterialLevel = "regular";
  let bestD = Infinity;
  for (const lv of levels) {
    const d = Math.abs(BAKED_BEZEL[lv] - wanted);
    if (d < bestD) {
      bestD = d;
      best = lv;
    }
  }
  return { table: BAKED_PROFILES[best], bezel: spec.bezel ?? BAKED_BEZEL[best], level: best };
}

const mapCache = new Map<string, GeneratedMaps>();

export function displacementMapKey(spec: DisplacementMapSpec): string {
  const { bezel, level } = resolveProfile(spec);
  return `${Math.round(spec.width)}x${Math.round(spec.height)}r${Math.round(
    spec.radius
  )}b${Math.round(bezel * 2)}m${level}s${Math.round(spec.specularAngle ?? -60)}`;
}

/**
 * Generates the displacement + specular maps sized to the element, at
 * min(2, devicePixelRatio) like the shipped 2x assets. Very large
 * surfaces downsample proportionally (feImage stretches the map back to
 * element pixels) so a fullscreen sheet never allocates an 8-megapixel
 * canvas. Results are cached by geometry key.
 */
export function generateDisplacementMaps(
  spec: DisplacementMapSpec
): GeneratedMaps | null {
  const key = displacementMapKey(spec);
  const cached = mapCache.get(key);
  if (cached) return cached;

  const dpr = Math.min(
    2,
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  );
  // Pixel budget: cap total map area; scale the dpr proportionally.
  const budget = spec.pixelBudget ?? 1_100_000;
  const rawPx = spec.width * spec.height * dpr * dpr;
  const effDpr = rawPx > budget ? dpr * Math.sqrt(budget / rawPx) : dpr;

  const { table, bezel, level } = resolveProfile(spec);
  const angle = ((spec.specularAngle ?? -60) * Math.PI) / 180;

  const disp = renderDisplacementMap(
    spec.width,
    spec.height,
    spec.radius,
    bezel,
    table,
    effDpr
  );
  if (!disp) return null;
  const specMap = renderSpecularMap(
    spec.width,
    spec.height,
    spec.radius,
    2,
    angle,
    effDpr
  );
  if (!specMap) return null;
  const frostMaskUrl = renderFrostMask(spec.width, spec.height, effDpr);
  if (!frostMaskUrl) return null;

  const canvas = document.createElement("canvas");
  canvas.width = disp.width;
  canvas.height = disp.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.putImageData(disp, 0, 0);
  const displacementUrl = canvas.toDataURL("image/png");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(specMap, 0, 0);
  const specularUrl = canvas.toDataURL("image/png");
  if (!displacementUrl || !specularUrl) return null;

  const maps: GeneratedMaps = {
    displacementUrl,
    specularUrl,
    frostMaskUrl,
    maximumDisplacement: MAX_DISPLACEMENT[level],
  };
  if (mapCache.size > 48) mapCache.clear();
  mapCache.set(key, maps);
  return maps;
}

/** Single-map helper (the docs map visualizer uses this). */
export function generateDisplacementMap(spec: DisplacementMapSpec): string {
  const maps = generateDisplacementMaps(spec);
  return maps ? maps.displacementUrl : "";
}

/** Estimated number of cached maps (diagnostics for the docs site). */
export function displacementMapCacheSize(): number {
  return mapCache.size;
}

/**
 * Human-readable summary of the vector field at a probe point — the docs
 * map visualizer draws these as an arrow grid. Same ring math as the
 * generator: direction is the inward radial, magnitude the baked curve.
 */
export function probeField(
  spec: DisplacementMapSpec,
  x: number,
  y: number
): { nx: number; ny: number; profile: number } {
  const { table, bezel } = resolveProfile(spec);
  const w = spec.width;
  const h = spec.height;
  const p = Math.min(spec.radius, Math.min(w, h) / 2);
  const bottom = y >= h - p;
  const d = y < p ? y - p : bottom ? y - p - (h - 2 * p) : 0;
  const right = x >= w - p;
  const l = x < p ? x - p : right ? x - p - (w - 2 * p) : 0;
  const s = l * l + d * d;
  const outer2 = (p + 1) * (p + 1);
  const inner2 = (p - bezel) * (p - bezel);
  if (s > outer2 || s < inner2) return { nx: 0, ny: 0, profile: 0 };

  const dist = Math.sqrt(s);
  const depth = p - dist;
  const profile = Math.abs(table[(depth / bezel) * table.length | 0] ?? 0);
  if (profile <= 0 || dist < 1e-6) return { nx: 0, ny: 0, profile: 0 };
  return { nx: -l / dist, ny: -d / dist, profile };
}
