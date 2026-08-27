"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueryInput } from "@/components/ds/QueryInput";
import { Activity, Send, Sparkles } from "lucide-react";

const models = [
  { label: "Praxis 4o", value: "praxis-4o" },
  { label: "Praxis 4o mini", value: "praxis-4o-mini" },
  { label: "Praxis Sonnet", value: "praxis-sonnet" },
  { label: "Praxis Ops (legacy)", value: "praxis-ops", disabled: true },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 flex-none items-center justify-between border-b px-5">
          <div className="flex items-center gap-2.5">
            <span className="bg-muted flex size-7 items-center justify-center rounded-md border">
              <Sparkles className="text-muted-foreground size-4" />
            </span>
            <span className="text-sm font-medium">Praxis Copilot</span>
            <span className="text-muted-foreground text-xs">
              incidents · edge fleet
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
            session&nbsp;#8421 · connected
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Chat column */}
          <main className="flex min-w-0 flex-1 flex-col">
            {/* Messages */}
            <div className="flex min-h-0 flex-1 flex-col justify-end gap-4 px-6 py-5">
              <div className="flex justify-end">
                <div className="bg-muted max-w-[75%] rounded-lg px-3.5 py-2.5 text-sm">
                  Error rate on the edge fleet jumped 20 minutes ago — can you
                  pull the query you used to check it?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg border px-3.5 py-2.5 text-sm">
                  <p>
                    I isolated the spike to two edge services. The query I ran
                    is pinned to the diagnostics panel on the right — it groups
                    the error rate by service over a 60s window.
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    4.2 req/s errors · p95 latency 218ms · no deploys in the
                    window
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-muted max-w-[75%] rounded-lg px-3.5 py-2.5 text-sm">
                  Great — keep watching it and re-run every 5 minutes.
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="flex-none border-t px-6 py-4">
              <div className="mb-2.5 flex items-center gap-3">
                <Label
                  htmlFor="pair-164-model"
                  className="text-muted-foreground"
                >
                  Model
                </Label>
                <Select items={models} defaultValue="praxis-4o">
                  <SelectTrigger id="pair-164-model" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Recommended</SelectLabel>
                      <SelectItem value="praxis-4o">Praxis 4o</SelectItem>
                      <SelectItem value="praxis-4o-mini">
                        Praxis 4o mini
                      </SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Other</SelectLabel>
                      <SelectItem value="praxis-sonnet">
                        Praxis Sonnet
                      </SelectItem>
                      <SelectItem value="praxis-ops" disabled>
                        Praxis Ops (legacy)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground ml-auto text-xs">
                  ⏎ to send · shift+⏎ for a new line
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border px-3.5 py-3">
                <span className="text-muted-foreground flex-1 text-sm">
                  Ask about errors, latency, deploys…
                </span>
                <span className="bg-primary text-primary-foreground flex size-7 flex-none items-center justify-center rounded-md">
                  <Send className="size-3.5" />
                </span>
              </div>
            </div>
          </main>

          {/* Diagnostics sidebar */}
          <aside className="bg-muted/30 flex w-[320px] flex-none flex-col border-l">
            <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 py-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pair-164-query" className="gap-2">
                  <Activity className="text-muted-foreground size-3.5" />
                  Telemetry query
                </Label>
                <p className="text-muted-foreground text-xs leading-snug">
                  Pinned by the assistant — grouped error rate across the edge
                  fleet.
                </p>
              </div>

              <QueryInput />

              <div className="flex flex-col gap-2.5">
                <span className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                  Live signals
                </span>
                {[
                  ["edge-gateway", "1.8 err/s", "spike"],
                  ["edge-auth", "0.4 err/s", "steady"],
                  ["edge-cache", "0.1 err/s", "steady"],
                ].map(([service, rate, trend]) => (
                  <div
                    key={service}
                    className="flex items-center justify-between rounded-md border bg-transparent px-3 py-2 text-xs"
                  >
                    <span className="font-mono">{service}</span>
                    <span className="text-muted-foreground">{rate}</span>
                    <span
                      className={
                        trend === "spike"
                          ? "text-amber-500 text-[11px]"
                          : "text-muted-foreground text-[11px]"
                      }
                    >
                      {trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
