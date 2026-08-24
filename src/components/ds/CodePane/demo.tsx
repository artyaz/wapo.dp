"use client";

/**
 * Demo — a read-only ledger service snippet with the cursor resting on the
 * createLedgerEntry signature, which the pane's hover doc card describes.
 * Fixed content; the card is mounted by the root as authored.
 */

import React from "react";
import { CodePane } from "@/components/ds/CodePane";

export default function Demo() {
  return (
    <div className="w-full max-w-[520px]">
      <CodePane>
        <CodePane.CodeLine lineNumber="1">
          {'import { validateEntry } from "./validate";'}
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="2">
          {'import type { CreateEntryInput, LedgerEntry } from "./types";'}
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="3" />
        <CodePane.CodeLine lineNumber="4" currentLine={true}>
          export async function createLedgerEntry(
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="5">
          <span className="pl-4">input: CreateEntryInput</span>
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="6">{'): Promise<LedgerEntry> {'}</CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="7">
          <span className="pl-4">validateEntry(input);</span>
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="8">
          <span className="pl-4">
            const entry = {"{ ...input, id: nextId() }"};
          </span>
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="9">
          <span className="pl-4">await wal.append(entry);</span>
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="10">
          <span className="pl-4">return entry;</span>
        </CodePane.CodeLine>
        <CodePane.CodeLine lineNumber="11">{'}'}</CodePane.CodeLine>
      </CodePane>
    </div>
  );
}

export const demoSource = `<CodePane>
  <CodePane.CodeLine lineNumber="1">
    {'import { validateEntry } from "./validate";'}
  </CodePane.CodeLine>
  <CodePane.CodeLine lineNumber="2">
    {'import type { CreateEntryInput, LedgerEntry } from "./types";'}
  </CodePane.CodeLine>
  <CodePane.CodeLine lineNumber="3" />
  <CodePane.CodeLine lineNumber="4" currentLine>
    export async function createLedgerEntry(
  </CodePane.CodeLine>
  <CodePane.CodeLine lineNumber="5">
    <span className="pl-4">input: CreateEntryInput</span>
  </CodePane.CodeLine>
  {/* … remaining lines of the snippet … */}
</CodePane>`;
