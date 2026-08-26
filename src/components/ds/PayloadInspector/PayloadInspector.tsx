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
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

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
  const KEY = "text-[#d78ad6]";         // magenta keys
  const STR = "text-[#8ecde0]";         // cyan strings
  const NUM = "text-neutral-200";       // numbers / booleans / null
  const PUNC = "text-neutral-400";      // delimiters — near-white on dark
  const COMMENT = "text-neutral-600 italic";

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
  return (
    <div
      className={SubframeUtils.twClassNames(
        "w-full min-w-0 overflow-hidden rounded-lg bg-neutral-950",
        "border border-neutral-800",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {/* language identifier label — top left */}
      <div className="flex items-center gap-2 border-b border-neutral-800 px-3 py-1.5">
        <span className="font-code text-[10px] font-medium tracking-[0.12em] text-neutral-500 lowercase">
          {language}
        </span>
        {filename ? (
          <>
            <span className="text-neutral-700">·</span>
            <span className="min-w-0 truncate font-code text-[10px] text-neutral-600">
              {filename}
            </span>
          </>
        ) : null}
      </div>
      <div className={SubframeUtils.twClassNames("overflow-auto", maxHeightClass)}>
        <pre className="p-3 whitespace-pre-wrap break-words">
          <code className="font-code text-[12px] leading-[18px] text-neutral-400">
            {highlightPayload(code)}
          </code>
        </pre>
      </div>
    </div>
  );
});

export const PayloadInspector = PayloadInspectorRoot;
