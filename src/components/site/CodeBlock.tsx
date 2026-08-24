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
    re: /\b(import|from|export|const|let|var|function|return|interface|type|extends|default|new|if|else|for|of|in|as|null|undefined|true|false)\b/g,
    cls: "font-semibold text-default-font",
  },
  { re: /(<\/?[A-Za-z][A-Za-z0-9.]*)/g, cls: "text-neutral-700" },
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
      <pre className="max-h-[420px] overflow-auto p-4">
        <code className="font-code text-[12.5px] leading-[1.7] text-default-font">
          {highlight(code)}
        </code>
      </pre>
    </div>
  );
}
