"use client";

/**
 * CodeBlock — a tiny dependency-free TSX highlighter.
 * Monochrome-friendly: comments in neutral-400, keywords darker, strings in
 * the one allowed chromatic accent (destructive-600 is still monochrome-red;
 * we use neutral tones only).
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";

const TOKEN_RULES: Array<{ re: RegExp; cls: string }> = [
  { re: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, cls: "text-neutral-400 italic" },
  { re: /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, cls: "text-neutral-600" },
  {
    // keywords stay color-only (no bold): JSX prose often contains words like
    // "for"/"from" and bolding them mid-sentence reads as a defect
    re: /\b(import|from|export|const|let|var|function|return|interface|type|extends|default|new|if|else|for|of|in|as|null|undefined|true|false)\b/g,
    cls: "text-neutral-800 dark:text-neutral-300",
  },
  { re: /(<\/?[A-Za-z][A-Za-z0-9.]*)/g, cls: "text-neutral-700 dark:text-neutral-300" },
];

function highlight(code: string): React.ReactNode[] {
  type Span = { start: number; end: number; cls: string };
  const spans: Span[] = [];
  const taken: Array<[number, number]> = [];

  for (const rule of TOKEN_RULES) {
    rule.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.re.exec(code))) {
      const start = m.index;
      const end = m.index + m[0].length;
      const overlaps = taken.some(([a, b]) => start < b && end > a);
      if (overlaps) continue;
      taken.push([start, end]);
      spans.push({ start, end, cls: rule.cls });
    }
  }

  spans.sort((a, b) => a.start - b.start);
  const out: React.ReactNode[] = [];
  let pos = 0;
  spans.forEach((span, i) => {
    if (span.start > pos) out.push(code.slice(pos, span.start));
    out.push(
      <span key={i} className={span.cls}>
        {code.slice(span.start, span.end)}
      </span>
    );
    pos = span.end;
  });
  if (pos < code.length) out.push(code.slice(pos));
  return out;
}

export function CodeBlock({
  code,
  className,
  filename,
}: {
  code: string;
  className?: string;
  filename?: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const lineCount = React.useMemo(() => code.split("\n").length, [code]);

  return (
    <div
      className={twClassNames(
        "overflow-hidden rounded-lg border border-default-border bg-neutral-100",
        className
      )}
    >
      {filename ? (
        <div className="flex items-center gap-2 border-b border-default-border px-4 py-2">
          <span className="font-code text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase">
            {filename}
          </span>
        </div>
      ) : null}
      <div
        className={twClassNames(
          "relative",
          !expanded && "max-h-[420px] overflow-hidden"
        )}
      >
        <pre className="overflow-x-auto p-4 max-lg:whitespace-pre-wrap max-lg:break-words">
          <code className="font-code text-[12.5px] leading-[1.7] text-default-font">
            {highlight(code)}
          </code>
        </pre>
        {/* bottom fade while collapsed — signals more content below */}
        {!expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-default-background to-transparent" />
        ) : null}
      </div>
      {lineCount > 12 ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-default-border bg-default-background px-4 py-2 font-code text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase transition-colors hover:text-default-font"
        >
          {expanded
            ? "Show less"
            : `Show all ${lineCount} lines`}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className={twClassNames(
              "transition-transform",
              expanded ? "rotate-180" : undefined
            )}
          >
            <path
              d="M2 3.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
