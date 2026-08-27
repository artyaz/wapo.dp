/**
 * Glass strategy negotiation — engine detection with a safe fail direction.
 *
 * Chain (per MaterialTokens / integration review):
 *   ① svg-displacement  — Chromium engines (Chrome, Edge, Opera, Brave…)
 *   ② webgl-refraction  — Safari and Firefox primary; universal middle tier
 *   ③ backdrop-filter   — last resort everywhere
 *
 * Rules learned from the review rounds:
 *  - Never gate on `CSS.supports('backdrop-filter', 'url(#f)')` — it tests
 *    parsing, not renderability, and reports true on engines that will not
 *    render SVG-referenced backdrop filters (Safari).
 *  - Never gate on `window.__liquidGLNoWebGL__` — that global does not exist
 *    in the library.
 *  - Undetected engines fall through to the universal tiers (fail direction:
 *    always ends on a tier that renders).
 */

export type GlassStrategy = "svg-displacement" | "webgl-refraction" | "backdrop-filter";

export type MaterialLevel = "ultrathin" | "thin" | "regular" | "thick";

export type GlassShape = "capsule" | "card" | "free";

export type RefractionIntensity = "subtle" | "medium" | "strong";

/* ------------------------------------------------------------------ */
/* Engine sniffing                                                     */
/* ------------------------------------------------------------------ */

interface NavigatorUABrandVersion {
  brand: string;
  version: string;
}

interface NavigatorUAData {
  brands?: NavigatorUABrandVersion[];
  isChromium?: boolean;
}

function navUAData(): NavigatorUAData | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { userAgentData?: NavigatorUAData })
    .userAgentData;
}

/** Chromium-family engine: Chrome, Edge, Opera, Brave, Arc, Dia… */
export function isChromium(): boolean {
  const uaData = navUAData();
  if (uaData) {
    if (typeof uaData.isChromium === "boolean") return uaData.isChromium;
    const brands = uaData.brands ?? [];
    const chromiumBrand = brands.find(
      (b) => b.brand === "Chromium" || b.brand === "Google Chrome"
    );
    if (chromiumBrand) return true;
    // Not-A.Brand spoofs present on non-Chromium engines
    if (brands.some((b) => /Not.?A.?Brand/i.test(b.brand))) return false;
  }
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // Edge/Opera/Brave all carry Chrome in the UA; Safari does not.
  if (/Chrome|Chromium|Edg|OPR|Opera|Brave/i.test(ua) && !/Safari\/(?!.*Chrome)/.test(ua + " " + (ua.match(/Chrome\/[\d.]+/)?.[0] ?? ""))) {
    // Crude but safe: anything advertising Chrome outside a Safari-only UA
    return /Chrome|Chromium|Edg|OPR|Opera|Brave/i.test(ua);
  }
  return false;
}

/** WebKit Safari, including desktop-mode iPad (fails UA-CH entirely). */
export function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" &&
      typeof navigator.maxTouchPoints === "number" &&
      navigator.maxTouchPoints > 1);
  const safariOnly = /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR|Opera|Brave|FxiOS/i.test(ua);
  return safariOnly || (isIOS && !/CriOS|FxiOS|EdgiOS/i.test(ua));
}

export function isFirefox(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Firefox|FxiOS/i.test(navigator.userAgent);
}

/* ------------------------------------------------------------------ */
/* WebGL capability probe (cached once)                                */
/* ------------------------------------------------------------------ */

let webglProbe: boolean | null = null;

/**
 * Chained context acquisition exactly like liquidGL: webgl2 → webgl →
 * experimental-webgl. Returns false when all fail — the CALLER decides how to
 * degrade (the library itself throws; we probe here so the React runtime can
 * pick a tier without exceptions).
 */
export function webglAvailable(): boolean {
  if (webglProbe !== null) return webglProbe;
  if (typeof document === "undefined") {
    webglProbe = false;
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    for (const type of ["webgl2", "webgl", "experimental-webgl"] as const) {
      const gl = canvas.getContext(type, {
        alpha: true,
        antialias: true,
      }) as WebGLRenderingContext | null;
      if (gl) {
        // Lose the probe context immediately — real surfaces create their own.
        const lose = gl.getExtension("WEBGL_lose_context");
        lose?.loseContext();
        webglProbe = true;
        return true;
      }
    }
  } catch {
    /* fallthrough */
  }
  webglProbe = false;
  return false;
}

/* ------------------------------------------------------------------ */
/* Strategy negotiation                                                */
/* ------------------------------------------------------------------ */

let negotiated: GlassStrategy | null = null;

export function negotiateStrategy(): GlassStrategy {
  if (negotiated) return negotiated;
  if (typeof window === "undefined") return "backdrop-filter";

  // ① Chromium → SVG displacement renders natively via backdrop-filter:url()
  if (isChromium()) {
    negotiated = "svg-displacement";
    return negotiated;
  }

  // ② Safari / Firefox (and anything WebKit/Gecko) → WebGL refraction when
  //    the GPU can give us a context; degrades to ③ on throw/no-context.
  if (isSafari() || isFirefox()) {
    negotiated = webglAvailable() ? "webgl-refraction" : "backdrop-filter";
    return negotiated;
  }

  // Unknown engine — universal middle tier if WebGL exists, else base.
  negotiated = webglAvailable() ? "webgl-refraction" : "backdrop-filter";
  return negotiated;
}

/** Test seam — reset cached negotiation. */
export function resetStrategyCache(): void {
  negotiated = null;
  webglProbe = null;
}

/* ------------------------------------------------------------------ */
/* Material ramp — the canonical values (MaterialTokens §1)            */
/* ------------------------------------------------------------------ */

export interface MaterialRampEntry {
  /**
   * PROGRESSIVE BLUR ceiling (px). Blur is edge-only (masked so the center
   * stays crisp) — the kube.io music-player look. The old global 16–56px
   * blur frosted the whole surface and read as bloom.
   */
  blur: number;
  /** global saturation boost (applied unmasked, keeps content vibrant) */
  saturate: number;
  /** panel tint, percent */
  tint: number;
  /** WebGL refraction strength on liquidGL's 0–1 scale */
  strength: number;
  /**
   * refraction level (kube.io "Refraction Level" parameter) — multiplies
   * the physical maximum displacement fed to feDisplacementMap.
   */
  refraction: number;
  /** bezel band width in px — how far the refraction reaches inward */
  bezel: number;
  /** glass thickness in px (surface height above the background) */
  thickness: number;
}

export const MATERIAL_RAMP: Record<MaterialLevel, MaterialRampEntry> = {
  ultrathin: { blur: 0, saturate: 1.2, tint: 24, strength: 0.35, refraction: 0.7, bezel: 14, thickness: 20 },
  thin: { blur: 2, saturate: 1.3, tint: 32, strength: 0.5, refraction: 0.9, bezel: 18, thickness: 28 },
  regular: { blur: 4, saturate: 1.45, tint: 38, strength: 0.65, refraction: 1.0, bezel: 24, thickness: 36 },
  thick: { blur: 8, saturate: 1.6, tint: 46, strength: 0.85, refraction: 1.15, bezel: 32, thickness: 48 },
};

/**
 * Chromatic aberration multipliers per color channel (spec §4).
 *
 * The kube.io reference filter carries NO chromatic aberration — a single
 * displacement map displaces the backdrop once. Kept as an exported token
 * for the WebGL tier and docs, but the SVG tier now follows the reference
 * exactly: one map, one scale, monochrome rim.
 */
export const CHROMATIC = { r: 1.0, g: 1.0, b: 1.0 } as const;

/** Intensity forks — refraction level multipliers per fork (kube.io scale). */
export const INTENSITY_BASE_SCALE: Record<RefractionIntensity, number> = {
  subtle: 0.55,
  medium: 1.0,
  strong: 1.6,
};

/** Default specular highlight opacity (kube.io "Specular Opacity" slider). */
export const SPECULAR_DEFAULTS = { opacity: 0.5, saturation: 6, angle: -60 } as const;

export const SHAPE_RADIUS: Record<GlassShape, number | null> = {
  capsule: 9999,
  card: 16,
  free: null,
};

export function describeStrategy(strategy: GlassStrategy): string {
  switch (strategy) {
    case "svg-displacement":
      return "SVG displacement — Chromium tier, edge-bending via feDisplacementMap";
    case "webgl-refraction":
      return "WebGL refraction — Safari/Firefox tier, shader-based lens";
    default:
      return "Backdrop filter — universal base tier, blur + saturation";
  }
}
