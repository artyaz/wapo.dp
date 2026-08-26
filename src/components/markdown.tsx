"use client";

import * as React from "react";
import { InboxIcon } from "lucide-react";

/**
 * Minimal markdown renderer used by chat/bubble demos.
 * Supports: paragraphs, **bold**, *italic*, `code`, ```fences```,
 * [links](url), and line breaks. Deliberately dependency-free.
 */

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      const lm = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      nodes.push(
        <a key={key} href={lm?.[2] ?? "#"} className="underline underline-offset-2">
          {lm?.[1]}
        </a>
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = React.useMemo(() => {
    const lines = content.split("\n");
    const out: React.ReactNode[] = [];
    let para: string[] = [];
    let fence = false;
    let fenceBuf: string[] = [];
    let key = 0;

    const flushPara = () => {
      if (para.length) {
        out.push(
          <p key={`p-${key++}`} className="leading-relaxed">
            {renderInline(para.join(" "), `p${key}`)}
          </p>
        );
        para = [];
      }
    };

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        if (fence) {
          out.push(
            <pre
              key={`pre-${key++}`}
              className="my-2 overflow-x-auto rounded-md bg-black/10 p-3 font-mono text-[0.85em] dark:bg-white/10"
            >
              {fenceBuf.join("\n")}
            </pre>
          );
          fenceBuf = [];
          fence = false;
        } else {
          flushPara();
          fence = true;
        }
        continue;
      }
      if (fence) {
        fenceBuf.push(line);
        continue;
      }
      if (!line.trim()) {
        flushPara();
        continue;
      }
      if (line.trim().startsWith("- ")) {
        flushPara();
        out.push(
          <li key={`li-${key++}`} className="ml-4 list-disc">
            {renderInline(line.trim().slice(2), `li${key}`)}
          </li>
        );
        continue;
      }
      para.push(line);
    }
    flushPara();
    return out;
  }, [content]);

  return (
    <div className={`flex flex-col gap-1 text-sm ${className ?? ""}`}>{blocks}</div>
  );
}

export default Markdown;

// keep icon import referenced for consumers that tree-shake
export const __icon = InboxIcon;
