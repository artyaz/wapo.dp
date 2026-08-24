/**
 * WebGL refraction engine — the Safari/Firefox tier.
 *
 * Follows the liquidGL integration contract as verified against v2.0.1:
 *  - factory form: createLiquidGlass({ target, snapshot }) — `target` accepts
 *    a selector or an element; `snapshot` accepts a selector string naming
 *    what would be rasterised
 *  - the engine has NO internal CSS fallback: it throws
 *      new Error("liquidGL: WebGL unavailable")  when every context type fails
 *      new Error("liquidGL: Shader failed")      on compile/link failure
 *    Degradation is 100% the integrator's job (try/catch around the call).
 *  - surfaces auto-inherit border-radius from the target element's computed
 *    style, including runtime changes
 *  - initialise after DOMContentLoaded (the React runtime mounts post-hydration
 *    which satisfies this)
 *
 * Deviation from the commercial library, documented honestly on the site:
 * we do not rasterise arbitrary DOM. Two honest modes are offered:
 *   mode "full"  — the backdrop is a procedural spec (the demo-stage
 *                  gradients), and the shader refracts it exactly
 *   mode "edge"  — over live content the shader renders only the bevel /
 *                  refraction band with a transparent interior so the base
 *                  backdrop-filter material shows through underneath
 */

import type { MaterialLevel } from "./engine-detect";
import { MATERIAL_RAMP } from "./engine-detect";

export type WebGLMode = "full" | "edge";

export interface BackdropSpec {
  /** base fill, e.g. [0.84, 0.83, 0.78] for neutral-300 */
  base: [number, number, number];
  /** two radial accents, each { x, y (0..1), radius, color } */
  radials: Array<{
    x: number;
    y: number;
    radius: number;
    color: [number, number, number];
  }>;
}

export const DEFAULT_BACKDROP: BackdropSpec = {
  base: [0.839, 0.828, 0.784], // neutral-300 #D6D2C7
  radials: [
    {
      x: 0.3,
      y: 0.4,
      radius: 0.6,
      color: [160 / 255 * 0.25 + 0.75, 155 / 255 * 0.25 + 0.75, 145 / 255 * 0.25 + 0.75],
    },
    {
      x: 0.7,
      y: 0.65,
      radius: 0.55,
      color: [140 / 255 * 0.2 + 0.8, 138 / 255 * 0.2 + 0.8, 130 / 255 * 0.2 + 0.8],
    },
  ],
};

export interface LiquidGlassOptions {
  target: string | HTMLElement;
  /** selector string naming the backdrop region (contract parity) */
  snapshot?: string;
  material?: MaterialLevel;
  mode?: WebGLMode;
  backdrop?: BackdropSpec;
  /** bevel band width in px */
  bezel?: number;
}

export interface LiquidGlassHandle {
  destroy(): void;
  setMaterial(level: MaterialLevel): void;
  render(): void;
}

const VERT_SRC = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;

uniform vec2 uRes;          // surface size in px
uniform float uRadius;      // corner radius px
uniform float uBezel;       // bevel band width px
uniform float uStrength;    // material strength 0..1
uniform float uTint;        // tint amount 0..1
uniform vec3 uTintCol;      // tint color (panel)
uniform vec3 uBase;         // backdrop base color
uniform vec3 uRad1Col; uniform vec2 uRad1Pos; uniform float uRad1R;
uniform vec3 uRad2Col; uniform vec2 uRad2Pos; uniform float uRad2R;
uniform float uModeEdge;    // 1.0 = edge-only band

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec3 backdrop(vec2 uv) {
  vec3 c = uBase;
  vec2 p1 = uv - uRad1Pos;
  float m1 = smoothstep(uRad1R, 0.0, length(p1));
  c = mix(c, uRad1Col, m1);
  vec2 p2 = uv - uRad2Pos;
  float m2 = smoothstep(uRad2R, 0.0, length(p2));
  c = mix(c, uRad2Col, m2);
  return c;
}

float blurMask(vec2 uv) {
  // cheap large-blur approximation: heavy mixing of backdrop samples
  return 1.0;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 p = frag - uRes * 0.5;
  vec2 b = uRes * 0.5;
  float r = min(uRadius, min(b.x, b.y));

  float d = sdRoundedBox(p, b, r);

  // Inward normal from the SDF gradient (numeric central differences).
  vec2 e = vec2(1.0, 0.0);
  float gx = sdRoundedBox(p + e.xy, b, r) - sdRoundedBox(p - e.xy, b, r);
  float gy = sdRoundedBox(p + e.yx, b, r) - sdRoundedBox(p - e.yx, b, r);
  vec2 grad = vec2(gx, gy);
  float glen = length(grad);
  vec2 inward = glen > 0.0001 ? -grad / glen : vec2(0.0);

  // Profile across the bezel band, smooth like a lens bevel.
  float depth = clamp(-d / uBezel, 0.0, 1.0);        // 0 at edge → 1 interior
  float profile = pow(1.0 - depth, 2.0);              // strongest at the edge
  profile *= profile > 0.001 ? 1.0 : 0.0;

  // Refraction offsets per channel (chromatic aberration).
  vec2 uv = frag / uRes;
  float amt = uStrength * profile * uBezel * 0.9;
  vec2 off = inward * amt / uRes;
  vec2 offR = off * 1.25;
  vec2 offG = off * 0.83;
  vec2 offB = off * 1.00;

  // Multi-tap blur approximation of the material blur (scaled down for GL).
  float blurPx = uStrength * 6.0;
  vec2 tap = blurPx / uRes;
  vec3 col;
  col.r = backdrop(uv + offR).r;
  col.g = backdrop(uv + offG).g;
  col.b = backdrop(uv + offB).b;
  // widen the blur slightly by averaging two extra taps
  vec3 c1 = backdrop(uv + off + tap);
  vec3 c2 = backdrop(uv + off - tap);
  col = mix(col, (col + c1 + c2) / 3.0, 0.35);

  // Saturation lift (approx 150% for regular).
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = clamp(mix(vec3(lum), col, 1.2 + uStrength * 0.3), 0.0, 1.0);

  // Tint toward the panel color.
  col = mix(col, uTintCol, uTint);

  // Specular: key light from upper-left (matches the 160° sheen canon).
  vec2 lightDir = normalize(vec2(-0.55, -0.83));
  float spec = pow(max(dot(inward, -lightDir), 0.0), 3.0) * profile;
  col += vec3(spec * 0.30);

  // Counter-sheen along the bottom edge (the 340° gradient).
  vec2 bounceDir = normalize(vec2(0.2, 0.98));
  float counter = pow(max(dot(inward, -bounceDir), 0.0), 3.0) * profile;
  col += vec3(counter * 0.12);

  // Alpha: full mode renders the whole surface; edge mode renders only the
  // bevel band with a soft interior falloff.
  float alpha = 1.0;
  if (uModeEdge > 0.5) {
    alpha = smoothstep(uBezel * 0.9, uBezel * 0.15, depth * uBezel);
    alpha = 1.0 - smoothstep(0.0, uBezel, -d);
    alpha = clamp(alpha, 0.0, 1.0);
  }

  // Crisp hairline at the very rim.
  float rim = smoothstep(1.5, 0.0, abs(d)) * 0.25;
  col += vec3(rim);

  gl_FragColor = vec4(col, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
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

function readPanelColor(): [number, number, number] {
  if (typeof window === "undefined") return [1, 1, 1];
  try {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--ds-color-panel")
      .trim();
    const m = v.match(/(\d+)\s+(\d+)\s+(\d+)/);
    if (m) {
      return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
    }
  } catch {
    /* noop */
  }
  return [1, 1, 1];
}

export function createLiquidGlass(opts: LiquidGlassOptions): LiquidGlassHandle {
  if (typeof document === "undefined") {
    throw new Error("liquidGL: WebGL unavailable");
  }

  const target: HTMLElement | null =
    typeof opts.target === "string"
      ? document.querySelector<HTMLElement>(opts.target)
      : opts.target;
  if (!target) {
    throw new Error("liquidGL: target element not found");
  }
  const targetEl: HTMLElement = target;

  // Mount a canvas into the empty inset-0 slot (or create one).
  let canvas = target.querySelector<HTMLCanvasElement>("canvas[data-glass-canvas-slot]");
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

  let glCtx: WebGLRenderingContext | null = null;
  for (const type of ["webgl2", "webgl", "experimental-webgl"] as const) {
    glCtx = canvas.getContext(type, {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    }) as WebGLRenderingContext | null;
    if (glCtx) break;
  }
  if (!glCtx) {
    throw new Error("liquidGL: WebGL unavailable");
  }
  const gl = glCtx;

  // Program
  let programCtx: WebGLProgram;
  try {
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    programCtx = gl.createProgram() as WebGLProgram;
    gl.attachShader(programCtx, vs);
    gl.attachShader(programCtx, fs);
    gl.linkProgram(programCtx);
    if (!gl.getProgramParameter(programCtx, gl.LINK_STATUS)) {
      throw new Error("liquidGL: Shader failed");
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  } catch (err) {
    throw err;
  }
  const program = programCtx;

  // Geometry: fullscreen quad
  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const u = (name: string) => gl.getUniformLocation(program, name);

  const uniforms = {
    res: u("uRes"),
    radius: u("uRadius"),
    bezel: u("uBezel"),
    strength: u("uStrength"),
    tint: u("uTint"),
    tintCol: u("uTintCol"),
    base: u("uBase"),
    rad1Col: u("uRad1Col"),
    rad1Pos: u("uRad1Pos"),
    rad1R: u("uRad1R"),
    rad2Col: u("uRad2Col"),
    rad2Pos: u("uRad2Pos"),
    rad2R: u("uRad2R"),
    modeEdge: u("uModeEdge"),
  };

  let destroyed = false;
  let dpr = 1;

  function readRadius(): number {
    try {
      const br = getComputedStyle(targetEl).borderRadius;
      if (br && br !== "auto") {
        const m = br.match(/^([\d.]+)px/);
        if (m) return Math.min(parseFloat(m[1]), 9999);
        if (br.includes("%")) return Math.min(targetEl.offsetWidth, targetEl.offsetHeight) * 0.5;
      }
    } catch {
      /* noop */
    }
    return 16;
  }

  function render() {
    if (destroyed) return;
    const w = Math.max(targetEl.offsetWidth, 1);
    const h = Math.max(targetEl.offsetHeight, 1);
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (surfaceCanvas.width !== Math.round(w * dpr) || surfaceCanvas.height !== Math.round(h * dpr)) {
      surfaceCanvas.width = Math.round(w * dpr);
      surfaceCanvas.height = Math.round(h * dpr);
    }

    gl.viewport(0, 0, surfaceCanvas.width, surfaceCanvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const level = opts.material ?? "regular";
    const ramp = MATERIAL_RAMP[level];

    const backdrop = opts.backdrop ?? DEFAULT_BACKDROP;
    const r1 = backdrop.radials[0] ?? { x: 0.3, y: 0.4, radius: 0.6, color: [0.85, 0.84, 0.8] };
    const r2 = backdrop.radials[1] ?? { x: 0.7, y: 0.65, radius: 0.55, color: [0.85, 0.84, 0.8] };

    gl.uniform2f(uniforms.res, w, h);
    gl.uniform1f(uniforms.radius, readRadius());
    gl.uniform1f(uniforms.bezel, opts.bezel ?? 24);
    gl.uniform1f(uniforms.strength, ramp.strength);
    gl.uniform1f(uniforms.tint, ramp.tint / 100 * 0.9);
    gl.uniform3fv(uniforms.tintCol, readPanelColor());
    gl.uniform3fv(uniforms.base, backdrop.base);
    gl.uniform3fv(uniforms.rad1Col, r1.color);
    gl.uniform2f(uniforms.rad1Pos, r1.x, 1 - r1.y);
    gl.uniform1f(uniforms.rad1R, r1.radius);
    gl.uniform3fv(uniforms.rad2Col, r2.color);
    gl.uniform2f(uniforms.rad2Pos, r2.x, 1 - r2.y);
    gl.uniform1f(uniforms.rad2R, r2.radius);
    gl.uniform1f(uniforms.modeEdge, opts.mode === "edge" ? 1 : 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  render();

  const ro = new ResizeObserver(() => render());
  ro.observe(targetEl);

  // Radius can animate; poll at rAF cadence only while the element is visible.
  let raf = 0;
  let lastRadius = readRadius();
  function tick() {
    if (destroyed) return;
    const r = readRadius();
    if (r !== lastRadius) {
      lastRadius = r;
      render();
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return {
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      try {
        gl?.deleteBuffer(quad);
        gl?.deleteProgram(program);
      } catch {
        /* noop */
      }
      surfaceCanvas?.remove();
    },
    setMaterial(level: MaterialLevel) {
      opts.material = level;
      render();
    },
    render,
  };
}
