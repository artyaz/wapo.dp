"use client";

/**
 * PayloadInspector — a nested block-level code viewer for raw payloads.
 *
 * Dark rounded container (8px), language identifier label pinned top-left,
 * padded monospaced body, and full syntax highlighting: magenta keys, cyan
 * string values, white delimiters. Lets developers inspect payloads and
 * configuration structures directly in the chat thread without leaving it.
 *
 * The chromatic syntax palette (magenta/cyan) is an explicit, contained
 * exception to the monochrome doctrine — the same status the docs syntax
 * highlighter holds — scoped strictly to this inspector's code body.
 *
 * Two rendering invariants:
 *  - The code body is inherently LTR: it is isolated with dir="ltr" so RTL
 *    pages never bidi-reorder brackets, commas or indentation.
 *  - The container surface is near-black in BOTH themes (bg-neutral-950 is a
 *    Tailwind default, not a DS token), so the syntax/neutral palette is
 *    pinned to literal values — DS neutral utilities invert in dark theme
 *    and would render the code nearly invisible on this fixed dark surface.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

/** Language-neutral chevron (ds convention: inline SVG, stroke currentColor). */
function ChevronIcon({ up }: { up?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={up ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface PayloadInspectorRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Language identifier rendered as the top-left label, e.g. "json". */
  language?: string;
  /** Raw payload text — highlighted per language heuristics. */
  code: string;
  /** Optional filename / origin shown after the language label. */
  filename?: string;
  /** Collapse the body to a max height with a scroll. */
  maxHeightClass?: string;
  className?: string;
}

/**
 * Token spans for JSON + JSONC/YAML-ish payloads:
 * keys → magenta, strings → cyan, numbers/bools → warm white, punctuation →
 * neutral, comments → dimmed italic.
 */
function highlightPayload(code: string): React.ReactNode[] {
  // Pinned literals (not DS neutral tokens): the container is near-black in
  // both themes while DS neutrals invert in dark theme — tokens would go
  // dark-on-dark. Values match the light-theme tokens the design used.
  const KEY = "text-[#d78ad6]";         // magenta keys
  const STR = "text-[#8ecde0]";         // cyan strings
  const NUM = "text-[#e9e6df]";         // numbers / booleans / null — near-white
  const PUNC = "text-[#b3afa3]";        // delimiters — light on the dark body
  const COMMENT = "text-[#6e6b62] italic";

  const spans: Array<{ start: number; end: number; cls: string }> = [];
  const taken: Array<[number, number]> = [];
  interface Rule {
    re: RegExp;
    cls: string;
    /** when set, highlight only this capture group instead of the whole match */
    capture?: number;
  }
  const rules: Rule[] = [
    { re: /(\/\/[^\n]*|#[^\n]*)/g, cls: COMMENT },
    // string that is immediately followed by : → a key
    {
      re: /("(?:[^"\\\n]|\\.)*")(\s*:)/g,
      cls: KEY,
      capture: 1,
    },
    { re: /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/g, cls: STR },
    { re: /\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, cls: NUM },
    { re: /\b(true|false|null)\b/g, cls: NUM },
  ];

  for (const rule of rules) {
    rule.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.re.exec(code))) {
      const c = rule.capture ?? 0;
      const start = m.index + (c > 0 ? m[0].indexOf(m[c]) : 0);
      const end = start + (c > 0 ? m[c].length : m[0].length);
      if (taken.some(([a, b]) => start < b && end > a)) continue;
      taken.push([start, end]);
      spans.push({ start, end, cls: rule.cls });
    }
  }

  // delimiters between spans default to PUNC via the wrapper — no spans needed
  spans.sort((a, b) => a.start - b.start);
  const out: React.ReactNode[] = [];
  let pos = 0;
  spans.forEach((span, i) => {
    if (span.start > pos)
      out.push(
        <span key={`p${i}`} className={PUNC}>
          {code.slice(pos, span.start)}
        </span>
      );
    out.push(
      <span key={`s${i}`} className={span.cls}>
        {code.slice(span.start, span.end)}
      </span>
    );
    pos = span.end;
  });
  if (pos < code.length)
    out.push(<span key="tail" className={PUNC}>{code.slice(pos)}</span>);
  return out;
}

const PayloadInspectorRoot = React.forwardRef<
  HTMLDivElement,
  PayloadInspectorRootProps
>(function PayloadInspectorRoot(
  {
    language = "json",
    code,
    filename,
    maxHeightClass = "max-h-[320px]",
    className,
    ...otherProps
  }: PayloadInspectorRootProps,
  ref
) {
  // When maxHeightClass caps the body below its content height, the code is
  // clipped mid-line with no hint that it scrolls. Track whether unscrolled
  // content remains so we can offer an explicit expand control over a fade
  // mask — the standard "there is more below" code-block affordance.
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const update = () =>
      setHasMore(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [code, maxHeightClass]);

  return (
    <div
      className={SubframeUtils.twClassNames(
        "relative w-full min-w-0 overflow-hidden rounded-lg bg-neutral-950",
        "border border-[#2a2926]",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {/* language identifier label — top left */}
      <div className="flex items-center gap-2 border-b border-[#2a2926] px-3 py-1.5">
        <span className="font-code text-[10px] font-medium tracking-[0.12em] text-[#8a877e] lowercase">
          {language}
        </span>
        {filename ? (
          <>
            <span className="text-[#4c4a43]">·</span>
            <span className="min-w-0 truncate font-code text-[10px] text-[#6e6b62]">
              {filename}
            </span>
          </>
        ) : null}
      </div>
      {/* Code is inherently LTR — isolate the body from the page direction so
          RTL contexts never bidi-reorder brackets, commas or indentation. */}
      <div
        ref={bodyRef}
        dir="ltr"
        className={SubframeUtils.twClassNames(
          "overflow-auto text-start",
          maxHeightClass,
          expanded && "max-h-none"
        )}
      >
        <pre className="p-3 whitespace-pre-wrap break-words">
          <code className="font-code text-[12px] leading-[18px] text-[#b3afa3]">
            {highlightPayload(code)}
          </code>
        </pre>
      </div>
      {/* scroll affordance — a full-width expand control rides a fade mask
          over the clipped edge, so truncation reads as intentional */}
      {hasMore && !expanded ? (
        <button
          type="button"
          aria-label="Show full payload"
          onClick={() => setExpanded(true)}
          className="absolute inset-x-0 bottom-0 flex h-10 cursor-pointer items-end justify-center pb-1.5 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent text-[#8a877e] transition-colors hover:text-[#b3afa3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8a877e]/50"
        >
          <span className="mb-0.5 inline-flex items-center rounded-full border border-[#6e6b62] bg-neutral-950/90 px-2.5 py-1">
            <ChevronIcon />
          </span>
        </button>
      ) : null}
      {expanded ? (
        <button
          type="button"
          aria-label="Collapse payload"
          onClick={() => setExpanded(false)}
          className="flex h-9 w-full cursor-pointer items-center justify-center border-t border-[#2a2926] text-[#8a877e] transition-colors hover:text-[#b3afa3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8a877e]/50 focus-visible:ring-inset"
        >
          <ChevronIcon up />
        </button>
      ) : null}
    </div>
  );
});

export const PayloadInspector = PayloadInspectorRoot;
