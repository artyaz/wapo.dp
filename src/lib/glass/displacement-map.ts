/**
 * Runtime displacement-map generation — the kube.io liquid-glass-css-svg
 * technique, implemented exactly as published:
 *
 *   https://kube.io/blog/liquid-glass-css-svg/
 *
 * The field is PRE-CALCULATED along a single radius (the bezel half-slice)
 * by ray-tracing real refraction through a glass surface profile, using
 * Snell–Descartes' law with n(air)=1 and n(glass)=1.5. The per-distance
 * displacement magnitudes are normalized against the maximum, and the
 * maximum itself becomes the <feDisplacementMap scale> — so the 8-bit map
 * stores unit vectors while the filter re-imposes physical pixel scale.
 *
 * Surface functions (kube.io "Equations" section):
 *   convex-circle   y = sqrt(1 - (1-x)^2)        spherical dome
 *   convex-squircle y = (1 - (1-x)^4)^(1/4)      Apple's squircle (default)
 *   concave         y = 1 - Convex(x)            bowl
 *   lip             mix(Convex, Concave, smootherstep)  raised rim
 *
 * Constraints honored from the article:
 *   - one refraction event only (entry; the exit is not simulated)
 *   - incident rays orthogonal to the background plane (no perspective)
 *   - convex profiles keep every sampled texel INSIDE the glass bounds
 *   - 127 samples across the bezel (the 8-bit channel resolution budget)
 *
 * Map encoding (kube.io "Vector to Red-Green values"):
 *   R = 128 + x*127, G = 128 + y*127, B = 128, A = 255 — neutral 128.
 */

export type SurfaceProfile =
  | "convex-squircle"
  | "convex-circle"
  | "concave"
  | "lip";

export interface DisplacementMapSpec {
  width: number;
  height: number;
  /** corner radius in px */
  radius: number;
  /** bezel band width in px (how far refraction reaches inward) */
  bezel?: number;
  /** glass thickness in px (height of the surface above the background) */
  thickness?: number;
  /** refractive index of the glass */
  ior?: number;
  /** surface profile (kube.io equations) */
  profile?: SurfaceProfile;
  /** long-side resolution cap for the generated bitmap */
  maxResolution?: number;
  /** specular highlight parameters (kube.io "Specular Highlight" section) */
  specular?: {
    /** fixed light direction angle in degrees (0 = +X, CCW) */
    angle?: number;
    /** exponent — higher = tighter rim */
    exponent?: number;
  };
}

/* ------------------------------------------------------------------ */
/* Surface profile functions (kube.io equations)                       */
/* ------------------------------------------------------------------ */

/** x in [0,1] — 0 at the outer edge, 1 at the end of the bezel. */
function surfaceHeight(x: number, profile: SurfaceProfile): number {
  const t = Math.min(1, Math.max(0, x));
  switch (profile) {
    case "convex-circle":
      return Math.sqrt(1 - (1 - t) * (1 - t));
    case "convex-squircle":
      return Math.sqrt(Math.sqrt(1 - Math.pow(1 - t, 4)));
    case "concave":
      return 1 - Math.sqrt(Math.sqrt(1 - Math.pow(1 - t, 4)));
    case "lip": {
      const convex = Math.sqrt(Math.sqrt(1 - Math.pow(1 - t, 4)));
      const concave = 1 - convex;
      // smootherstep blend — raised rim, shallow center dip
      const s = t * t * t * (t * (t * 6 - 15) + 10);
      return convex * (1 - s) + concave * s;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Refraction pre-computation along the bezel radius                   */
/* ------------------------------------------------------------------ */

/**
 * One refracted ray, exactly as the article traces it:
 *
 *   - the incident ray travels straight down (orthogonal to background)
 *   - it enters the glass at height h(x) above the background plane
 *   - the surface normal comes from the height function's derivative,
 *     rotated by -90 degrees
 *   - Snell: n1 sin(θ1) = n2 sin(θ2)
 *   - the ray continues to the background plane; the displacement is the
 *     horizontal distance between entry and landing
 *
 * Returns the displacement magnitude (px, signed: + = inward) sampled at
 * `samples` distances from the border across the bezel.
 */
function refractionDisplacements(
  bezel: number,
  thickness: number,
  ior: number,
  profile: SurfaceProfile,
  samples = 127
): Float64Array {
  const out = new Float64Array(samples);
  const delta = 0.001; // derivative approximation (kube.io uses the same)
  const eta = 1 / ior;

  for (let i = 0; i < samples; i++) {
    // distance from the border, 0 → bezel
    const x = (i / (samples - 1)) * bezel;

    // normalized surface coordinate + derivative (central differences)
    const nx = x / bezel;
    const y1 = surfaceHeight(nx - delta, profile);
    const y2 = surfaceHeight(nx + delta, profile);
    const derivative = (y2 - y1) / (2 * delta);

    // physical height of the entry point above the background plane
    const h = surfaceHeight(nx, profile) * thickness;

    // surface normal: derivative rotated by -90° → (-h', 1), normalized
    const len = Math.sqrt(derivative * derivative + 1);
    const normalX = -derivative / len;
    const normalY = 1 / len;

    // incident direction: straight down
    const dirX = 0;
    const dirY = -1;

    // Snell–Descartes
    const cosTheta1 = -(dirX * normalX + dirY * normalY); // = 1/len
    const sinTheta1 = Math.min(1, Math.abs(derivative) / len);
    const sinTheta2 = (sinTheta1 * 1) / ior;
    const cosTheta2 = Math.sqrt(Math.max(0, 1 - sinTheta2 * sinTheta2));

    // refracted direction (Glasstone formula used by every ray tracer)
    const k = eta * cosTheta1 - cosTheta2;
    const tX = eta * dirX + k * normalX;
    const tY = eta * dirY + k * normalY;

    // travel from the entry point down to the background plane (y = 0)
    if (tY >= -1e-6 || h <= 0) {
      out[i] = 0; // grazing / at the very border — no displacement
      continue;
    }
    const travel = h / -tY;
    const landing = x + travel * tX;
    out[i] = landing - x; // + = displaced inward (convex keeps inside)
  }
  return out;
}

/** Smallest unit the 8-bit map can express (kube.io: 127 samples ≈ 1/127). */
const PROFILE_SAMPLES = 127;

export interface DisplacementField {
  /** normalized displacement magnitudes (0..1) sampled across the bezel */
  profile: Float64Array;
  /** the maximum displacement magnitude in px — reuse directly as filter scale */
  maximumDisplacement: number;
}

const fieldCache = new Map<string, DisplacementField>();

export function displacementFieldKey(spec: DisplacementMapSpec): string {
  const bezel = spec.bezel ?? 24;
  const thickness = spec.thickness ?? 32;
  const ior = spec.ior ?? 1.5;
  const profile = spec.profile ?? "convex-squircle";
  return `f${Math.round(bezel)}t${Math.round(thickness)}n${ior}p${profile}`;
}

/**
 * Pre-calculate (and cache) the normalized displacement profile for one
 * bezel/thickness/IOR/profile combination. The magnitudes are divided by
 * the maximum so the map stores unit vectors; `maximumDisplacement` is
 * returned to feed <feDisplacementMap scale>.
 */
export function computeDisplacementField(
  spec: DisplacementMapSpec
): DisplacementField {
  const bezel = spec.bezel ?? 24;
  const thickness = spec.thickness ?? 32;
  const ior = spec.ior ?? 1.5;
  const profile = spec.profile ?? "convex-squircle";
  const key = displacementFieldKey(spec);
  const cached = fieldCache.get(key);
  if (cached) return cached;

  const mags = refractionDisplacements(bezel, thickness, ior, profile, PROFILE_SAMPLES);
  let max = 0;
  for (let i = 0; i < mags.length; i++) {
    const m = Math.abs(mags[i]);
    if (m > max) max = m;
  }
  const profileNorm = new Float64Array(PROFILE_SAMPLES);
  for (let i = 0; i < PROFILE_SAMPLES; i++) {
    profileNorm[i] = max > 0 ? mags[i] / max : 0;
  }
  const field: DisplacementField = { profile: profileNorm, maximumDisplacement: max };
  if (fieldCache.size > 64) fieldCache.clear();
  fieldCache.set(key, field);
  return field;
}

/* ------------------------------------------------------------------ */
/* Rounded-rect signed distance field                                  */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Map generation                                                      */
/* ------------------------------------------------------------------ */

export interface GeneratedMaps {
  /** displacement map data URL (R = X, G = Y, neutral 128) */
  displacementUrl: string;
  /** specular rim map data URL (grayscale highlight, black elsewhere) */
  specularUrl: string;
  /**
   * progressive-blur mask data URL: the bezel band ramp lives in the ALPHA
   * channel (opaque at the edge → transparent at the bezel end), RGB white.
   * Alpha-based so both mask-image and -webkit-mask-image read the ramp.
   */
  blurMaskUrl: string;
  /** the scale to feed feDisplacementMap (max displacement in px) */
  maximumDisplacement: number;
}

const mapCache = new Map<string, GeneratedMaps>();

export function displacementMapKey(spec: DisplacementMapSpec): string {
  const bezel = spec.bezel ?? 24;
  const thickness = spec.thickness ?? 32;
  const ior = spec.ior ?? 1.5;
  const profile = spec.profile ?? "convex-squircle";
  return `${Math.round(spec.width)}x${Math.round(spec.height)}r${Math.round(
    spec.radius
  )}b${Math.round(bezel)}t${Math.round(thickness)}n${ior}p${profile}`;
}

/**
 * Generates the displacement + specular maps as PNG data-URLs sized to the
 * element (kube.io: "ensure that your filter images fit the size of your
 * elements"). Results are cached by geometry key.
 */
export function generateDisplacementMaps(spec: DisplacementMapSpec): GeneratedMaps | null {
  const key = displacementMapKey(spec);
  const cached = mapCache.get(key);
  if (cached) return cached;

  const w0 = Math.max(2, Math.round(spec.width));
  const h0 = Math.max(2, Math.round(spec.height));
  // Downsample for cost; feImage stretches with preserveAspectRatio="none".
  const maxRes = spec.maxResolution ?? 340;
  const scale = Math.min(1, maxRes / Math.max(w0, h0));
  const w = Math.max(8, Math.round(w0 * scale));
  const h = Math.max(8, Math.round(h0 * scale));
  const radius = Math.min(spec.radius * scale, Math.min(w, h) / 2);

  const bezel = spec.bezel ?? 24;
  const thickness = spec.thickness ?? 32;
  const ior = spec.ior ?? 1.5;
  const profile = spec.profile ?? "convex-squircle";
  const bz = Math.max(2, Math.min(bezel * scale, Math.min(w, h) / 2 - 1));
  const th = Math.max(1, thickness * scale);

  const field = computeDisplacementField({
    ...spec,
    bezel: bz,
    thickness: th,
  });
  const { profile: profileNorm } = field;

  // Fixed light direction for the specular rim (kube.io: angle between the
  // surface normal and a fixed light direction).
  const lightAngle = ((spec.specular?.angle ?? -60) * Math.PI) / 180;
  const lightX = Math.cos(lightAngle);
  const lightY = Math.sin(lightAngle);
  const specExponent = spec.specular?.exponent ?? 8;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dispImg = ctx.createImageData(w, h);
  const specImg = ctx.createImageData(w, h);
  const maskImg = ctx.createImageData(w, h);
  const dData = dispImg.data;
  const sData = specImg.data;
  const mData = maskImg.data;

  const cx = w / 2;
  const cy = h / 2;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Pixel-center sample coordinates
      const px = x + 0.5 - cx;
      const py = y + 0.5 - cy;
      const d = sdRoundedRect(px, py, w / 2, h / 2, radius);

      // Distance to the boundary from inside the shape (d ≤ 0 inside).
      const depth = d < 0 ? -d : 0; // 0 at edge, growing inward

      let mag = 0; // normalized displacement magnitude (0..1)
      let nx = 0;
      let ny = 0;

      if (depth < bz) {
        // Inward normal from the SDF gradient (central differences) —
        // computed for the whole bezel band: both the displacement vector
        // and the specular rim need it, including where mag itself is 0
        // (the outermost edge, where the surface is tilted the most).
        const eps = 1;
        const gx =
          sdRoundedRect(px + eps, py, w / 2, h / 2, radius) -
          sdRoundedRect(px - eps, py, w / 2, h / 2, radius);
        const gy =
          sdRoundedRect(px, py + eps, w / 2, h / 2, radius) -
          sdRoundedRect(px, py - eps, w / 2, h / 2, radius);
        const len = Math.sqrt(gx * gx + gy * gy);
        if (len > 1e-6) {
          // gradient points outward — invert for inward
          nx = -gx / len;
          ny = -gy / len;
        }

        // look up the pre-calculated displacement magnitude
        const t = depth / bz;
        const idx = Math.min(PROFILE_SAMPLES - 1, Math.floor(t * (PROFILE_SAMPLES - 1)));
        mag = profileNorm[idx];
      }

      // Displacement vector → unit vector scaled by normalized magnitude
      const vx = nx * mag;
      const vy = ny * mag;

      const i = (y * w + x) * 4;
      // kube.io encoding: 128 + component * 127
      dData[i] = Math.round(128 + vx * 127);
      dData[i + 1] = Math.round(128 + vy * 127);
      dData[i + 2] = 128;
      dData[i + 3] = 255;

      // Specular (kube.io): rim light whose intensity varies with the angle
      // between the surface normal and a fixed light direction. The bezel
      // normal at this pixel points inward (nx, ny); its horizontal tilt is
      // the surface slope at this depth — flat interior ⇒ no highlight.
      let intensity = 0;
      if (depth < bz && depth > 0) {
        const t = depth / bz;
        const delta = 0.001;
        const y1 = surfaceHeight(t - delta, profile);
        const y2 = surfaceHeight(t + delta, profile);
        const derivative = (y2 - y1) / (2 * delta);
        const slopeLen = Math.sqrt(derivative * derivative + 1);
        const tilt = Math.abs(derivative) / slopeLen; // 0 flat → 1 vertical
        const cosA = nx * lightX + ny * lightY; // bezel normal vs light
        if (cosA > 0) {
          intensity = Math.pow(cosA, specExponent) * tilt;
        }
        // fade the inner end of the band (surface flattens to level)
        intensity *= 1 - t * t;
      }
      const c = Math.round(Math.min(1, intensity) * 255);
      sData[i] = c;
      sData[i + 1] = c;
      sData[i + 2] = c;
      sData[i + 3] = 255;

      // Progressive-blur mask: smoothstep ramp over the bezel band — full
      // strength at the outer edge, zero at the bezel end, so the frost
      // ramps exactly where the refraction bends (kube.io music player's
      // "Progressive Blur"). Carried in ALPHA; RGB stays white.
      let blurT: number;
      if (depth >= bz) {
        blurT = 0;
      } else {
        const u = depth / bz; // 0 at edge → 1 at bezel end
        const sm = u * u * (3 - 2 * u);
        blurT = 1 - sm;
      }
      const m = Math.round(Math.max(0, Math.min(1, blurT)) * 255);
      mData[i] = 255;
      mData[i + 1] = 255;
      mData[i + 2] = 255;
      mData[i + 3] = m;
    }
  }

  // Paint all three maps from one canvas (three passes, three ImageDatas)
  ctx.putImageData(dispImg, 0, 0);
  const displacementUrl = canvas.toDataURL("image/png");
  ctx.putImageData(specImg, 0, 0);
  const specularUrl = canvas.toDataURL("image/png");
  ctx.putImageData(maskImg, 0, 0);
  const blurMaskUrl = canvas.toDataURL("image/png");

  if (!displacementUrl || !specularUrl || !blurMaskUrl) return null;

  const maps: GeneratedMaps = {
    displacementUrl,
    specularUrl,
    blurMaskUrl,
    maximumDisplacement: Math.round(field.maximumDisplacement / scale),
  };
  if (mapCache.size > 48) mapCache.clear(); // transient stretch sizes don't grow it unbounded
  mapCache.set(key, maps);
  return maps;
}

/** Back-compat single-map helper (previous API returned one data URL). */
export function generateDisplacementMap(spec: DisplacementMapSpec): string {
  const maps = generateDisplacementMaps(spec);
  return maps ? maps.displacementUrl : "";
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
  if (d < 0 && -d < bezel) {
    const field = computeDisplacementField(spec);
    const t = -d / bezel;
    const idx = Math.min(PROFILE_SAMPLES - 1, Math.floor(t * (PROFILE_SAMPLES - 1)));
    profile = Math.abs(field.profile[idx]);
  }
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
