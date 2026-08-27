"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { EditorTab } from "@/components/ds/EditorTab";
import { GlassDisplacement } from "@/components/ds/GlassDisplacement";
import { MethodChip } from "@/components/ds/MethodChip";
import { BracesIcon, PlayIcon } from "lucide-react";

/** routes.ts — the file open in the editor pane */
const CODE = [
  'import { forge } from "@praxis/http";',
  "export const client = forge({",
  '  base: "https://api.pxp.dev",',
  "  routes: {",
  '    list:  ["GET", "/v1/records"],',
  '    amend: ["PATCH", "/v1/records/:id"],',
  '    drop:  ["DEL", "/v1/records/:id"],',
  "  },",
  "});",
];

/** routes compiled from the file above */
const ROUTES = [
  {
    method: "get" as const,
    path: "/v1/records",
    note: "List records — cursor pagination",
    status: "200 · 18 ms",
    disabled: false,
  },
  {
    method: "post" as const,
    path: "/v1/records",
    note: "Create record — validates payload",
    status: "201 · 42 ms",
    disabled: false,
  },
  {
    method: "patch" as const,
    path: "/v1/records/:id",
    note: "Update fields — partial merge",
    status: "204 · 26 ms",
    disabled: false,
  },
  {
    method: "get" as const,
    path: "/v1/records/:id/meta",
    note: "Metrics — paused during migration",
    status: "paused",
    disabled: true,
  },
  {
    method: "delete" as const,
    path: "/v1/records/:id",
    note: "Delete record — soft, 30-day hold",
    status: "204 · 31 ms",
    disabled: false,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[360px] flex-col bg-default-background">
        {/* App header */}
        <header className="flex items-center gap-2.5 px-4 pb-2.5 pt-3">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel text-default-font">
            <BracesIcon className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-body text-[14px] font-[500] leading-[18px] text-default-font">
              Pocket Forge
            </span>
            <span className="font-code text-[10px] leading-[14px] text-neutral-500">
              api workbench · staging
            </span>
          </div>
          <span className="ml-auto flex-none font-code text-[10px] uppercase leading-[14px] tracking-[0.08em] text-neutral-400">
            v1
          </span>
        </header>

        {/* Editor: file tabs + code pane + compiled endpoint list */}
        <main className="flex flex-1 flex-col px-4">
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
            {/* Tab strip */}
            <div className="flex w-full items-stretch">
              <EditorTab label="routes.ts" glyph="TS" active dirty />
              <EditorTab label="notes.md" glyph="md" split />
              <div className="h-9 grow border-b border-solid border-default-border" />
            </div>

            {/* Code pane */}
            <div className="flex flex-col gap-0.5 bg-panel px-3 py-2">
              {CODE.map((line, index) => (
                <div key={index} className="flex items-baseline gap-2.5">
                  <span className="w-3.5 flex-none text-right font-code text-[10px] leading-[16px] text-neutral-400 tabular-nums">
                    {index + 1}
                  </span>
                  <span className="whitespace-pre font-code text-[11px] leading-[16px] text-neutral-600">
                    {line || " "}
                  </span>
                </div>
              ))}
            </div>

            {/* Compiled endpoints */}
            <div className="flex items-center justify-between border-t border-solid border-default-border px-4 py-1.5">
              <span className="font-code text-[10px] uppercase leading-[16px] tracking-[0.08em] text-neutral-500">
                compiled endpoints
              </span>
              <span className="font-code text-[10px] leading-[16px] text-neutral-400 tabular-nums">
                5 routes · live
              </span>
            </div>
            <div className="flex flex-1 flex-col divide-y divide-default-border px-4 pb-12">
              {ROUTES.map((route) => (
                <div
                  key={`${route.method}-${route.path}`}
                  className="flex flex-col gap-1 py-1.5"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <MethodChip method={route.method} disabled={route.disabled} />
                    <code className="min-w-0 truncate font-code text-[12px] leading-[16px] text-default-font">
                      {route.path}
                    </code>
                    <span className="ml-auto flex-none font-code text-[10px] leading-[14px] text-neutral-400 tabular-nums">
                      {route.status}
                    </span>
                  </div>
                  <span className="text-[11px] leading-[15px] text-neutral-500">
                    {route.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Floating glass action dock over the endpoint list */}
        <div className="absolute inset-x-4 bottom-3">
          <GlassDisplacement
            radius="lg"
            intensity="strong"
            className="h-14 w-full"
          >
            <div className="flex h-full w-full items-center gap-3 px-4">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-primary">
                <PlayIcon className="size-3.5 text-brand-primary-foreground" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="font-body text-[13px] font-[500] leading-[16px] text-default-font">
                  Send request
                </span>
                <span className="truncate font-code text-[10px] leading-[14px] text-neutral-600">
                  POST /v1/records · last 201 · 42 ms
                </span>
              </div>
              <span className="ml-auto flex-none font-code text-[10px] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
                5 routes
              </span>
            </div>
          </GlassDisplacement>
        </div>
      </div>
    </EvalShell>
  );
}
