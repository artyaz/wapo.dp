/**
 * WebGL refraction engine — the Safari/Firefox tier.
 *
 * A verbatim port of archisvaze/liquid-glass `webgl.html`:
 *
 *   https://github.com/archisvaze/liquid-glass
 *
 * What that implementation actually does, decoded line by line from the
 * shipped file (three.js r128, one full-screen quad, orthographic camera,
 * `alpha: true`):
 *
 *  1. Screen space. The quad is drawn with `gl_Position = vec4(position, 1)`,
 *     so the camera is bypassed and `vUv` runs 0..1 across the viewport.
 *     `screenPx = vec2(vUv.x, 1 - vUv.y) * uResolution` — CSS pixels, y down.
 *     `p = screenPx - uGlassCenter`.
 *
 *  2. Shape. `sdRoundedRect(p, halfSize, r)` is the standard rounded-box SDF
 *     (`q = abs(p) - halfSize + r; min(max(q.x, q.y), 0) + length(max(q, 0)) - r`),
 *     negative inside. Where it is positive the shader draws ONLY a shadow:
 *     `alpha = uShadow * exp(-sd*sd/800) * 0.6` over black, and returns.
 *
 *  3. Bezel profile. `bezel = min(uBezel, min(uRadius, min(halfW, halfH)) - 1)`,
 *     `t = clamp(distFromEdge / bezel, 0, 1)`, and the surface height is the
 *     quartic superellipse `h(t) = pow(1 - pow(1 - t, 4), 0.25)` — 0 at the
 *     rim, 1 at the inner edge of the bezel.
 *
 *  4. Refraction. The slope is taken numerically (`dt = 0.001`) and converted
 *     to physical units by `atan(dh * thickness / bezel)`. Snell with n(air)=1:
 *     `thetaR = asin(clamp(sin(slope) / uIOR, -1, 1))`, and the lateral shift
 *     is `displacement = h * uThickness * (tan(slope) - tan(thetaR))` px.
 *     The direction is the SDF gradient by forward differences at eps = 0.5,
 *     normalised; the sample offset is `-grad * displacement / uResolution`
 *     (inward, in viewport UV units).
 *
 *  5. Backdrop. `sampleBg` cover-fits the background texture to the viewport
 *     aspect and flips y. `sampleBgBlurred` averages 16 fixed Poisson taps
 *     scaled by `uBlur / uResolution` (and short-circuits under 0.5).
 *
 *  6. Finish, in order: specular `pow(abs(dot(grad, normalize(vec2(0.5,-0.7))))
 *     * (1 - smoothstep(0, bezel*0.4, d)), 1.5) * uSpecular` added to the
 *     colour; inner shadow `color *= mix(1, 0.7, (1 - smoothstep(0, bezel*0.6,
 *     d)) * 0.3)`; a 2..5px inner rim highlight at `0.15 * uSpecular`;
 *     `color = mix(color, vec3(1), uTint)`; `alpha = smoothstep(0, 1.5, d)`.
 *
 * The fragment body below is that shader, expression for expression. The ONE
 * generalisation: the reference owns a viewport-sized canvas, while a glass
 * surface owns an element-sized one, so `screenPx` is reconstructed from the
 * surface's origin inside the backdrop rect
 *
 *     screenPx = uSurfaceOrigin + vec2(vUv.x, 1 - vUv.y) * uSurfaceSize
 *
 * with `uResolution` staying the BACKDROP rect. When the backdrop is the
 * viewport and the surface is the glass rect, that reduces to the reference's
 * own expression exactly, so every downstream line — offsets, blur taps,
 * aspect fit — is unchanged.
 *
 * What it cannot do: WebGL has no access to live DOM as a texture, in any
 * browser. The reference refracts a background IMAGE, which is why it works
 * everywhere. So this engine refracts the nearest ancestor background image
 * (discovered from computed style, or passed explicitly). With no image there
 * is nothing to refract: the shader still renders the bezel optics, specular,
 * tint and shadow over the flat base colour, and the CSS material underneath
 * carries the blur.
 */

import type { MaterialLevel } from "./engine-detect";

export type WebGLMode = "full" | "edge";

/* ------------------------------------------------------------------ */
/* Parameters — the reference's own control set                        */
/* ------------------------------------------------------------------ */

export interface RefractionParams {
  /** glass thickness in px — reference slider 10..200, default 50 */
  thickness: number;
  /** bezel band width in px — reference slider 2..60, default 60 */
  bezel: number;
  /** index of refraction — reference slider 1..3, default 3 */
  ior: number;
  /** in-glass backdrop blur radius in px — reference slider 0..12, default 1.5 */
  blur: number;
  /** specular rim strength 0..1 — reference default 0.55 */
  specular: number;
  /** white tint 0..1 — reference default 0.08 (the 8% slider) */
  tint: number;
  /** outer shadow strength 0..1 — reference default 0.5 */
  shadow: number;
}

/** The reference's shipped defaults, verbatim — this is `regular`. */
export const REFERENCE_PARAMS: RefractionParams = {
  thickness: 50,
  bezel: 60,
  ior: 3.0,
  blur: 1.5,
  specular: 0.55,
  tint: 0.08,
  shadow: 0.5,
};

/**
 * Per-level parameters. `regular` IS the reference default set; the other
 * levels scale thickness, bezel and blur off it so the ramp stays a ramp,
 * and `thick` takes the heavier thickness the demo reaches for.
 */
export const MATERIAL_PARAMS: Record<MaterialLevel, RefractionParams> = {
  ultrathin: { thickness: 20, bezel: 24, ior: 3.0, blur: 0.75, specular: 0.4, tint: 0.05, shadow: 0.35 },
  thin: { thickness: 35, bezel: 42, ior: 3.0, blur: 1.2, specular: 0.5, tint: 0.05, shadow: 0.42 },
  regular: { ...REFERENCE_PARAMS },
  thick: { thickness: 108, bezel: 60, ior: 3.0, blur: 3.0, specular: 0.5, tint: 0.08, shadow: 0.55 },
};

/* ------------------------------------------------------------------ */
/* Backdrop source                                                     */
/* ------------------------------------------------------------------ */

export interface BackdropSpec {
  /**
   * Image sampled as the refracted backdrop, cover-fitted to the backdrop
   * rect exactly like the reference cover-fits to the viewport. When absent
   * the engine discovers the nearest ancestor background image.
   */
  imageUrl?: string;
  /**
   * Element whose box is the backdrop rect (the reference's viewport).
   * Defaults to the element the discovered image belongs to.
   */
  element?: HTMLElement | null;
  /** flat colour sampled when there is no image at all, 0..1 rgb */
  base?: [number, number, number];
}

export const DEFAULT_BACKDROP: BackdropSpec = {
  base: [0.984, 0.984, 0.976], // rgb(251 251 249) — the page base
};

export interface LiquidGlassOptions {
  target: string | HTMLElement;
  material?: MaterialLevel;
  mode?: WebGLMode;
  backdrop?: BackdropSpec;
  /** overrides on top of the material's parameter set */
  params?: Partial<RefractionParams>;
  /**
   * Fires after the first render and again once the backdrop image lands.
   * `true` means the shader is refracting a real texture and owns the whole
   * surface; `false` means there was no image to refract, so the CSS
   * material underneath should stay visible.
   */
  onBackdropReady?: (hasTexture: boolean) => void;
}

export interface LiquidGlassHandle {
  /** true once a backdrop image is uploaded and being refracted */
  hasTexture(): boolean;
  destroy(): void;
  setMaterial(level: MaterialLevel): void;
  setParams(params: Partial<RefractionParams>): void;
  render(): void;
}

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const VERT_SRC = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision highp float;
varying vec2 vUv;

uniform vec2 uResolution;      // backdrop rect size in px (reference: viewport)
uniform vec2 uSurfaceOrigin;   // this canvas's top-left inside that rect, y down
uniform vec2 uSurfaceSize;     // this canvas's size in px
uniform vec2 uGlassCenter;
uniform vec2 uGlassSize;
uniform float uRadius;
uniform float uBezel;
uniform float uThickness;
uniform float uIOR;
uniform float uBlur;
uniform float uSpecular;
uniform float uTint;
uniform float uShadow;
uniform sampler2D uBgTex;
uniform float uBgAspect;
uniform float uHasTex;
uniform vec3 uBase;

float sdRoundedRect(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - halfSize + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float surfaceHeight(float t) {
  float s = 1.0 - t;
  return pow(1.0 - s*s*s*s, 0.25);
}

vec3 sampleBg(vec2 screenUV) {
  if (uHasTex < 0.5) return uBase;
  float screenAspect = uResolution.x / uResolution.y;
  vec2 uv = screenUV;
  if (uBgAspect > screenAspect) {
    float s = screenAspect / uBgAspect;
    uv.x = uv.x * s + (1.0 - s) * 0.5;
  } else {
    float s = uBgAspect / screenAspect;
    uv.y = uv.y * s + (1.0 - s) * 0.5;
  }
  uv.y = 1.0 - uv.y;
  return texture2D(uBgTex, uv).rgb;
}

vec3 sampleBgBlurred(vec2 uv, float radius) {
  if (radius < 0.5) return sampleBg(uv);
  vec3 sum = vec3(0.0);
  vec2 px = 1.0 / uResolution;
  vec2 offsets[16];
  offsets[0]  = vec2(-0.94201, -0.39906);
  offsets[1]  = vec2( 0.94558, -0.76890);
  offsets[2]  = vec2(-0.09418, -0.92938);
  offsets[3]  = vec2( 0.34495,  0.29387);
  offsets[4]  = vec2(-0.91588, -0.45771);
  offsets[5]  = vec2(-0.81544,  0.48568);
  offsets[6]  = vec2(-0.38277, -0.56071);
  offsets[7]  = vec2(-0.12675,  0.84686);
  offsets[8]  = vec2( 0.89642,  0.41254);
  offsets[9]  = vec2( 0.18150, -0.30020);
  offsets[10] = vec2(-0.01445, -0.16001);
  offsets[11] = vec2( 0.59614,  0.71118);
  offsets[12] = vec2( 0.49742, -0.47280);
  offsets[13] = vec2( 0.80685,  0.04588);
  offsets[14] = vec2(-0.32490, -0.03965);
  offsets[15] = vec2(-0.60975,  0.06566);
  for (int i = 0; i < 16; i++) {
    sum += sampleBg(uv + offsets[i] * radius * px);
  }
  return sum / 16.0;
}

void main() {
  vec2 screenPx = uSurfaceOrigin + vec2(vUv.x, 1.0 - vUv.y) * uSurfaceSize;
  vec2 p = screenPx - uGlassCenter;
  vec2 halfSize = uGlassSize * 0.5;

  float sd = sdRoundedRect(p, halfSize, uRadius);

  if (sd > 0.0) {
    float shadowFalloff = exp(-sd * sd / 800.0);
    float shadowAlpha = uShadow * shadowFalloff * 0.6;
    gl_FragColor = vec4(0.0, 0.0, 0.0, shadowAlpha);
    return;
  }

  float distFromEdge = -sd;
  float bezel = min(uBezel, min(uRadius, min(halfSize.x, halfSize.y)) - 1.0);
  float t = clamp(distFromEdge / bezel, 0.0, 1.0);

  float h = surfaceHeight(t);
  float dt = 0.001;
  float h2 = surfaceHeight(min(t + dt, 1.0));
  float dh = (h2 - h) / dt;

  float slopeAngle = atan(dh * (uThickness / bezel));
  float sinR = sin(slopeAngle) / uIOR;
  sinR = clamp(sinR, -1.0, 1.0);
  float thetaR = asin(sinR);
  float displacement = h * uThickness * (tan(slopeAngle) - tan(thetaR));

  vec2 grad;
  float eps = 0.5;
  grad.x = sdRoundedRect(p + vec2(eps, 0.0), halfSize, uRadius) - sd;
  grad.y = sdRoundedRect(p + vec2(0.0, eps), halfSize, uRadius) - sd;
  grad = normalize(grad);

  vec2 offset = -grad * displacement / uResolution;

  vec2 screenUV = screenPx / uResolution;
  vec2 refractedUV = screenUV + offset;

  vec3 color = sampleBgBlurred(refractedUV, uBlur);

  vec2 lightDir = normalize(vec2(0.5, -0.7));
  float rimDot = abs(dot(grad, lightDir));
  float rimFalloff = 1.0 - smoothstep(0.0, bezel * 0.4, distFromEdge);
  float specHighlight = pow(rimDot * rimFalloff, 1.5);
  color += vec3(specHighlight * uSpecular);

  float innerShadow = 1.0 - smoothstep(0.0, bezel * 0.6, distFromEdge);
  color *= mix(1.0, 0.7, innerShadow * 0.3);

  float innerRim = smoothstep(0.0, 2.0, distFromEdge) * (1.0 - smoothstep(2.0, 5.0, distFromEdge));
  color += vec3(innerRim * 0.15 * uSpecular);

  color = mix(color, vec3(1.0), uTint);

  float alpha = smoothstep(0.0, 1.5, distFromEdge);
  gl_FragColor = vec4(color, alpha);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("liquidGL: Shader failed");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error("liquidGL: Shader failed");
  }
  return shader;
}

/* ------------------------------------------------------------------ */
/* Backdrop discovery + texture loading                                */
/* ------------------------------------------------------------------ */

interface DiscoveredBackdrop {
  imageUrl: string | null;
  element: HTMLElement | null;
}

/** First ancestor carrying a background-image url(), nearest first. */
function discoverBackdrop(from: HTMLElement): DiscoveredBackdrop {
  let node: HTMLElement | null = from;
  while (node) {
    const value = getComputedStyle(node).backgroundImage;
    const match = value.match(/url\((['"]?)([^'")]+)\1\)/);
    if (match) return { imageUrl: match[2], element: node };
    node = node.parentElement;
  }
  const bodyValue = getComputedStyle(document.body).backgroundImage;
  const bodyMatch = bodyValue.match(/url\((['"]?)([^'")]+)\1\)/);
  if (bodyMatch) return { imageUrl: bodyMatch[2], element: document.body };
  return { imageUrl: null, element: null };
}

/** One Image per URL — textures themselves are per-context and cannot share. */
const imageCache = new Map<string, HTMLImageElement>();

function loadBackdropImage(
  url: string,
  onReady: (image: HTMLImageElement) => void
): void {
  const cached = imageCache.get(url);
  if (cached) {
    if (cached.complete && cached.naturalWidth > 0) {
      onReady(cached);
    } else {
      cached.addEventListener("load", () => onReady(cached), { once: true });
    }
    return;
  }
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.addEventListener("load", () => onReady(image), { once: true });
  image.addEventListener(
    "error",
    () => {
      imageCache.delete(url);
    },
    { once: true }
  );
  imageCache.set(url, image);
  image.src = url;
}

function readRadius(el: HTMLElement): number {
  const br = getComputedStyle(el).borderRadius;
  if (br && br !== "auto") {
    const px = br.match(/^([\d.]+)px/);
    if (px) return parseFloat(px[1]);
    if (br.includes("%")) return Math.min(el.offsetWidth, el.offsetHeight) * 0.5;
    if (br.includes("9999")) return Math.min(el.offsetWidth, el.offsetHeight) * 0.5;
  }
  return 16;
}

function parseBaseColor(): [number, number, number] {
  for (const el of [document.body, document.documentElement]) {
    if (!el) continue;
    const m = getComputedStyle(el).backgroundColor.match(
      /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+))?/
    );
    if (!m) continue;
    if (m[4] !== undefined && Number(m[4]) < 0.99) continue;
    return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
  }
  return DEFAULT_BACKDROP.base ?? [1, 1, 1];
}

/* ------------------------------------------------------------------ */
/* Engine                                                             */
/* ------------------------------------------------------------------ */

export function createLiquidGlass(opts: LiquidGlassOptions): LiquidGlassHandle {
  if (typeof document === "undefined") {
    throw new Error("liquidGL: WebGL unavailable");
  }

  const resolved: HTMLElement | null =
    typeof opts.target === "string"
      ? document.querySelector<HTMLElement>(opts.target)
      : opts.target;
  if (!resolved) throw new Error("liquidGL: target element not found");
  const targetEl: HTMLElement = resolved;

  let canvas = targetEl.querySelector<HTMLCanvasElement>(
    "canvas[data-glass-canvas-slot]"
  );
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.setAttribute("data-glass-canvas-slot", "");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    targetEl.appendChild(canvas);
  }
  const surfaceCanvas: HTMLCanvasElement = canvas;

  // three.js's WebGLRenderer({ alpha: true }) leaves antialias off and
  // premultipliedAlpha on — matched here so the composite is the same.
  let context: WebGLRenderingContext | null = null;
  for (const type of ["webgl2", "webgl", "experimental-webgl"] as const) {
    context = surfaceCanvas.getContext(type, {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    }) as WebGLRenderingContext | null;
    if (context) break;
  }
  if (!context) throw new Error("liquidGL: WebGL unavailable");
  const gl = context;

  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  const program = gl.createProgram();
  if (!program) throw new Error("liquidGL: Shader failed");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error("liquidGL: Shader failed");
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const posLoc = gl.getAttribLocation(program, "aPos");

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    resolution: u("uResolution"),
    surfaceOrigin: u("uSurfaceOrigin"),
    surfaceSize: u("uSurfaceSize"),
    glassCenter: u("uGlassCenter"),
    glassSize: u("uGlassSize"),
    radius: u("uRadius"),
    bezel: u("uBezel"),
    thickness: u("uThickness"),
    ior: u("uIOR"),
    blur: u("uBlur"),
    specular: u("uSpecular"),
    tint: u("uTint"),
    shadow: u("uShadow"),
    bgTex: u("uBgTex"),
    bgAspect: u("uBgAspect"),
    hasTex: u("uHasTex"),
    base: u("uBase"),
  };

  let destroyed = false;
  let texture: WebGLTexture | null = null;
  let textureAspect = 1;
  let level: MaterialLevel = opts.material ?? "regular";
  let overrides: Partial<RefractionParams> = { ...opts.params };

  /* ---- backdrop resolution ---- */
  const declared = opts.backdrop ?? {};
  const discovered = declared.imageUrl
    ? { imageUrl: declared.imageUrl, element: declared.element ?? null }
    : discoverBackdrop(targetEl);
  const backdropElement = declared.element ?? discovered.element;
  const baseColor = declared.base ?? parseBaseColor();

  function uploadTexture(image: HTMLImageElement) {
    if (destroyed) return;
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // three.js uploads with Texture.flipY = true by default, which is why the
    // shader's sampleBg ends in `uv.y = 1.0 - uv.y`. Without the same unpack
    // flip the backdrop samples vertically mirrored (measured: mean channel
    // error 28.85/255 against the reference, 89% of pixels off).
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    try {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
    } catch {
      // cross-origin without CORS headers — refract the flat base instead
      gl.deleteTexture(texture);
      texture = null;
      return;
    }
    textureAspect = image.naturalWidth / image.naturalHeight;
    render();
    opts.onBackdropReady?.(true);
  }

  if (discovered.imageUrl) loadBackdropImage(discovered.imageUrl, uploadTexture);

  /** The rect the shader treats as "the viewport" — the reference's uResolution. */
  function backdropRect(): { left: number; top: number; width: number; height: number } {
    if (backdropElement) {
      const box = backdropElement.getBoundingClientRect();
      if (box.width > 1 && box.height > 1) {
        return { left: box.left, top: box.top, width: box.width, height: box.height };
      }
    }
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  }

  function params(): RefractionParams {
    return { ...MATERIAL_PARAMS[level], ...overrides };
  }

  function render() {
    if (destroyed) return;
    const width = Math.max(targetEl.offsetWidth, 1);
    const height = Math.max(targetEl.offsetHeight, 1);
    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (surfaceCanvas.width !== pixelWidth || surfaceCanvas.height !== pixelHeight) {
      surfaceCanvas.width = pixelWidth;
      surfaceCanvas.height = pixelHeight;
    }

    const rect = backdropRect();
    const box = targetEl.getBoundingClientRect();
    const originX = box.left - rect.left;
    const originY = box.top - rect.top;

    const p = params();

    gl.viewport(0, 0, surfaceCanvas.width, surfaceCanvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(uniforms.resolution, rect.width, rect.height);
    gl.uniform2f(uniforms.surfaceOrigin, originX, originY);
    gl.uniform2f(uniforms.surfaceSize, width, height);
    gl.uniform2f(uniforms.glassCenter, originX + width * 0.5, originY + height * 0.5);
    gl.uniform2f(uniforms.glassSize, width, height);
    gl.uniform1f(uniforms.radius, Math.min(readRadius(targetEl), Math.min(width, height) * 0.5));
    gl.uniform1f(uniforms.bezel, p.bezel);
    gl.uniform1f(uniforms.thickness, p.thickness);
    gl.uniform1f(uniforms.ior, p.ior);
    gl.uniform1f(uniforms.blur, p.blur);
    gl.uniform1f(uniforms.specular, p.specular);
    gl.uniform1f(uniforms.tint, p.tint);
    gl.uniform1f(uniforms.shadow, p.shadow);
    gl.uniform3fv(uniforms.base, baseColor);
    gl.uniform1f(uniforms.bgAspect, textureAspect);
    gl.uniform1f(uniforms.hasTex, texture ? 1 : 0);
    if (texture) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.bgTex, 0);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  render();
  opts.onBackdropReady?.(texture !== null);

  /* ---- invalidation: geometry, scroll (the sampled region moves), radius ---- */
  const resizeObserver = new ResizeObserver(() => render());
  resizeObserver.observe(targetEl);

  let visible = true;
  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    if (visible) render();
  });
  intersectionObserver.observe(targetEl);

  const onScrollOrResize = () => {
    if (visible) render();
  };
  window.addEventListener("scroll", onScrollOrResize, { passive: true, capture: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });

  let raf = 0;
  let lastRadius = readRadius(targetEl);
  function tick() {
    if (destroyed) return;
    if (visible) {
      const radius = readRadius(targetEl);
      if (radius !== lastRadius) {
        lastRadius = radius;
        render();
      }
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return {
    hasTexture() {
      return texture !== null;
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", onScrollOrResize, { capture: true });
      window.removeEventListener("resize", onScrollOrResize);
      try {
        if (texture) gl.deleteTexture(texture);
        gl.deleteBuffer(quad);
        gl.deleteProgram(program);
      } catch {
        /* context already lost */
      }
      surfaceCanvas.remove();
    },
    setMaterial(next: MaterialLevel) {
      level = next;
      render();
    },
    setParams(next: Partial<RefractionParams>) {
      overrides = { ...overrides, ...next };
      render();
    },
    render,
  };
}
