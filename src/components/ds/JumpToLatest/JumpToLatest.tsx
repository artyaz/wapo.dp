"use client";

/**
 * JumpToLatest — the floating navigation button of the AI chat canvas.
 *
 * A small circular FAB with a strong monochrome surface, subtle border and
 * shadow, and a centered downward arrow (↓). It appears during long
 * execution traces so users can jump immediately to the latest stream
 * output instead of scrolling through the audit trail.
 *
 * Positioning is left to the parent — the component renders the button
 * itself, so demos can float it in a corner of a tall transcript frame.
 *
 * Legibility contract: because the FAB floats over the feed it belongs to,
 * it ships with a built-in "auto scrim" — a soft radial gradient sampled
 * from the surface it floats over (the composited background of its
 * ancestors), which fades content as it approaches the button so text
 * never runs harshly underneath the control. For scrollable feeds, also
 * reserve a bottom lane in the scroll container (e.g. `pb-16`) so the
 * newest entry can scroll fully clear of the control. Set `scrim={false}`
 * for a plain button.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface JumpToLatestRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button diameter in px. */
  size?: number;
  /** Accessible label for screen readers; also used as the title tooltip. */
  label?: React.ReactNode;
  /** Force visibility regardless of scroll state (for demos). */
  visible?: boolean;
  /**
   * Fade the content underneath with a soft radial scrim sampled from the
   * surface the button floats over, keeping the control legible over busy
   * feeds.
   *
   * @default true
   */
  scrim?: boolean;
  className?: string;
}

let canvasCtx: CanvasRenderingContext2D | null | undefined;

/**
 * Normalize any CSS color string (rgb/rgba, hex, hsl, oklab, oklch,
 * color(srgb …) …) to `[r, g, b, a]`. Uses a 1×1 canvas round-trip —
 * `fillStyle` accepts every modern color format and `getImageData` always
 * reports plain sRGB bytes — so the scrim matches surfaces declared with
 * oklch/color-mix utilities as well as plain tokens. Returns `null` for
 * unparsable values.
 */
function normalizeColor(
  color: string
): [number, number, number, number] | null {
  if (canvasCtx === undefined) {
    canvasCtx =
      typeof document !== "undefined"
        ? document.createElement("canvas").getContext("2d", {
            willReadFrequently: true,
          })
        : null;
  }
  const ctx = canvasCtx;
  if (!ctx) return null;

  // Invalid assignments leave fillStyle untouched — detect via a sentinel.
  const sentinel = "#010203";
  ctx.fillStyle = sentinel;
  try {
    ctx.fillStyle = color;
  } catch {
    return null;
  }
  if (ctx.fillStyle === sentinel) return null;

  try {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 0) return [0, 0, 0, 0];
    return [r, g, b, a / 255];
  } catch {
    return null;
  }
}

/**
 * Composite a chain of ancestor background colors (innermost → outermost)
 * into the effective surface color behind the FAB: each ancestor is painted
 * *under* the layers already collected, stopping once the stack is opaque.
 * Returns the result as an `"r, g, b"` string, or `null` when every layer is
 * transparent.
 */
function compositeBackdrop(colors: string[]): string | null {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 0;

  for (const color of colors) {
    const layer = normalizeColor(color);
    if (!layer || layer[3] <= 0) continue;

    const [or, og, ob, oa] = layer;

    // Paint the accumulated inner composite over this outer layer.
    const outA = a + oa * (1 - a);
    if (outA <= 0) continue;
    r = (r * a + or * oa * (1 - a)) / outA;
    g = (g * a + og * oa * (1 - a)) / outA;
    b = (b * a + ob * oa * (1 - a)) / outA;
    a = outA;

    if (a >= 0.999) break;
  }

  return a > 0 ? `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}` : null;
}

/** Layout effect that is a no-op on the server (avoids the SSR warning). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const JumpToLatestRoot = React.forwardRef<
  HTMLButtonElement,
  JumpToLatestRootProps
>(function JumpToLatestRoot(
  {
    size = 36,
    label = "Jump to latest output",
    visible = true,
    scrim = true,
    className,
    ...otherProps
  }: JumpToLatestRootProps,
  ref
) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [backdrop, setBackdrop] = React.useState<string | null>(null);

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    },
    [ref]
  );

  // Sample the surface the FAB floats over (composited ancestor backgrounds)
  // before first paint so the scrim matches it exactly. Purely cosmetic —
  // if anything fails to parse we simply render without a scrim.
  useIsomorphicLayoutEffect(() => {
    if (!scrim) {
      setBackdrop(null);
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    const colors: string[] = [];
    let el: HTMLElement | null = button.parentElement;
    while (el) {
      colors.push(window.getComputedStyle(el).backgroundColor);
      el = el.parentElement;
    }

    setBackdrop(compositeBackdrop(colors));
  }, [scrim]);

  const scrimStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (!scrim || !backdrop) return undefined;
    return {
      background: `radial-gradient(closest-side, rgba(${backdrop}, 0.95) 0%, rgba(${backdrop}, 0.55) 55%, rgba(${backdrop}, 0) 100%)`,
    };
  }, [scrim, backdrop]);

  return (
    <span
      className={SubframeUtils.twClassNames(
        // positioning wrapper — carries the visibility transition so the
        // scrim fades in/out together with the button
        "relative inline-flex flex-none transition-all duration-200",
        visible
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-90 opacity-0"
      )}
    >
      {scrimStyle ? (
        // soft backdrop-matched vignette that fades content approaching the FAB
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16"
          style={scrimStyle}
        />
      ) : null}

      <button
        ref={setRefs}
        type="button"
        title={typeof label === "string" ? label : undefined}
        aria-label={typeof label === "string" ? label : "Jump to latest output"}
        aria-hidden={!visible || undefined}
        tabIndex={visible ? undefined : -1}
        style={{ width: size, height: size }}
        className={SubframeUtils.twClassNames(
          // small circular button — themed monochrome surface: panel inverts
          // in dark theme (was fixed neutral-700/800 literals, which read as
          // a blinding light FAB after inversion)
          "relative inline-flex flex-none cursor-pointer items-center justify-center",
          "rounded-full border border-default-border bg-panel text-default-font shadow-default",
          "transition-all duration-200",
          "hover:border-neutral-300 hover:bg-neutral-100 hover:text-default-font",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          visible
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0",
          className
        )}
        {...otherProps}
      >
        {/* centered downward arrow ↓ */}
        <svg
          width={Math.round(size * 0.42)}
          height={Math.round(size * 0.42)}
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 2.5v9M3.5 8 7 11.5 10.5 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </span>
  );
});

export const JumpToLatest = JumpToLatestRoot;
