"use client";

/**
 * EVAL page — textarea p2 — CI/CD pipeline monitor — 834x1112 light (tablet)
 *
 * "Relay CI" on-call tablet view for a failed build of payments-api. Textarea
 * is the spine of the screen: an editable values file that fails YAML
 * validation (invalid state with error message), a frozen read-only config
 * from the last passing build, and an incident-notes field with a live
 * character counter. Co-stars: Card, Badge, Button, Alert, Tabs, Avatar.
 */

import * as React from "react";
import {
  Check,
  GitBranch,
  Minus,
  RotateCw,
  TriangleAlert,
  X,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const STAGES = [
  { name: "checkout", time: "12 s", state: "passed" },
  { name: "install", time: "1 m 48 s", state: "passed" },
  { name: "unit", time: "3 m 02 s", state: "passed" },
  { name: "integration", time: "14 m 32 s", state: "failed" },
  { name: "deploy", time: "blocked", state: "blocked" },
] as const;

const LOG_LINES = [
  { ts: "18:41:07", tone: "fail", text: "payments.core.TransferSpec › settles within 2s" },
  { ts: "18:41:07", tone: "info", text: "expected 2048 ms to be less than 2000 ms" },
  { ts: "18:41:09", tone: "fail", text: "payments.webhooks.RetryPolicy › backs off exponentially" },
  { ts: "18:41:09", tone: "info", text: "mock clock not applied — test waited a real 2 s" },
  { ts: "18:41:12", tone: "muted", text: "2 failed · 148 passed · 3 skipped · 14 m 32 s" },
] as const;

const VALUES_YAML = `replicas: two
region: eu-west-1
strategy: rolling
maxSurge: 1
healthcheck:
  path: /readyz`;

const FROZEN_YAML = `replicas: 2
region: eu-west-1
strategy: rolling
maxSurge: 1`;

const INITIAL_NOTE =
  "Flaky timeout again in TransferSpec.settles — same fingerprint as INC-2148 (28 Jan). RetryPolicy failure looks new: the backoff test waits on a real clock. Proposal: raise the settle budget to 2.5 s behind TRANSFER_SLO_V2 and mock the clock.";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [note, setNote] = React.useState(INITIAL_NOTE);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col gap-3 px-6 py-5">
        {/* Header */}
        <header className="flex flex-none items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-9 flex-none items-center justify-center rounded-sm border border-default-border bg-card">
              <GitBranch className="size-4" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold tracking-tight">
                  Relay CI
                </p>
                <Badge variant="outline" className="font-code text-[10px]">
                  main
                </Badge>
              </div>
              <p className="font-code text-[10px] text-muted-foreground">
                payments-api · build #4821 · commit 4f3a91c
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <RotateCw />
              Re-run failed jobs
            </Button>
          </div>
        </header>

        {/* Failure alert */}
        <Alert variant="destructive" className="flex-none">
          <TriangleAlert />
          <AlertTitle>Build #4821 failed — integration:tests</AlertTitle>
          <AlertDescription>
            Red 14 m 32 s into the run · first failure in 23 days · on-call
            Dana Kim ack&rsquo;d at 18:44 CET.
          </AlertDescription>
        </Alert>

        {/* Stage strip — flat panel, hairline dividers */}
        <Card className="flex-none flex-row divide-x divide-default-border py-3">
          {STAGES.map((s) => (
            <div key={s.name} className="flex flex-1 items-start gap-2 px-3">
              {s.state === "failed" ? (
                <X className="mt-0.5 size-3.5 flex-none text-destructive" />
              ) : s.state === "blocked" ? (
                <Minus className="mt-0.5 size-3.5 flex-none text-muted-foreground" />
              ) : (
                <Check className="mt-0.5 size-3.5 flex-none text-success-600" />
              )}
              <div className="min-w-0 leading-tight">
                <p
                  className={
                    s.state === "failed"
                      ? "font-code text-[11px] text-destructive"
                      : "font-code text-[11px]"
                  }
                >
                  {s.name}
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  {s.time}
                </p>
              </div>
            </div>
          ))}
        </Card>

        {/* Failed step — log excerpt */}
        <Card className="flex-none gap-0 py-4">
          <div className="flex items-center justify-between px-5">
            <CardTitle>integration:tests — 2 failures</CardTitle>
            <CardAction>
              <Button variant="outline" size="xs">
                Full log
              </Button>
            </CardAction>
          </div>
          <div className="px-5">
            <Tabs defaultValue="failures">
              <TabsList className="h-8">
                <TabsTrigger value="failures">Failures</TabsTrigger>
                <TabsTrigger value="jobs">All jobs</TabsTrigger>
              </TabsList>
              <TabsContent value="failures" className="mt-2">
                <div className="rounded-md border border-default-border bg-muted/40 p-3">
                  {LOG_LINES.map((l) => (
                    <p
                      key={l.ts + l.text}
                      className={
                        l.tone === "fail"
                          ? "font-code text-xs leading-relaxed text-destructive"
                          : l.tone === "muted"
                            ? "font-code text-xs leading-relaxed text-muted-foreground"
                            : "font-code text-xs leading-relaxed text-foreground"
                      }
                    >
                      <span className="text-muted-foreground">{l.ts}</span>{" "}
                      {l.tone === "fail" ? "✘" : "·"} {l.text}
                    </p>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="jobs" className="mt-2" />
            </Tabs>
          </div>
        </Card>

        {/* Incident notes — autosizing field with live counter */}
        <Card className="flex-none gap-0 py-4">
          <div className="flex items-center justify-between px-5">
            <CardTitle>Incident notes</CardTitle>
            <CardAction>
              <Badge variant="outline">INC-2291</Badge>
            </CardAction>
          </div>
          <div className="px-5">
            <div className="flex items-baseline justify-between">
              <label htmlFor="incident-note" className="text-sm font-medium">
                What happened?
              </label>
              <span className="font-code text-[10px] text-muted-foreground">
                {note.length} / 800
              </span>
            </div>
            <Textarea
              id="incident-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 800))}
              aria-describedby="incident-note-desc"
              className="mt-2 resize-none"
              placeholder="Root cause, blast radius, mitigation…"
            />
            <p
              id="incident-note-desc"
              className="mt-2 text-xs text-muted-foreground"
            >
              Posted to #payments-incident and pinned to build #4821.
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm">Post note</Button>
              <Button size="sm" variant="ghost">
                Save draft
              </Button>
            </div>
          </div>
        </Card>

        {/* Run configuration — editable invalid file + frozen read-only */}
        <Card className="flex-none gap-0 py-4">
          <div className="flex items-center justify-between px-5">
            <CardTitle>Run configuration</CardTitle>
            <CardAction>
              <Button variant="outline" size="xs" disabled>
                Validate &amp; save
              </Button>
            </CardAction>
          </div>

          <div className="px-5">
            <div className="flex items-baseline justify-between">
              <label htmlFor="values-yaml" className="text-sm font-medium">
                relay.values.yaml
              </label>
              <span className="font-code text-[10px] text-muted-foreground">
                applies at build #4822
              </span>
            </div>
            <Textarea
              id="values-yaml"
              defaultValue={VALUES_YAML}
              aria-invalid
              aria-describedby="values-yaml-error"
              spellCheck={false}
              className="mt-2 max-h-44 resize-none font-code text-xs leading-relaxed"
            />
            <p
              id="values-yaml-error"
              className="mt-2 font-code text-[11px] text-destructive"
            >
              line 1 — replicas: &quot;two&quot; is not a valid integer ·
              expected 0–12
            </p>
          </div>

          <div className="mt-4 border-t border-default-border px-5 pt-4">
            <div className="flex items-baseline justify-between">
              <label htmlFor="frozen-yaml" className="text-sm font-medium">
                deploy.lock · build #4817
              </label>
              <span className="font-code text-[10px] text-muted-foreground">
                last passing · read-only
              </span>
            </div>
            <Textarea
              id="frozen-yaml"
              disabled
              readOnly
              value={FROZEN_YAML}
              spellCheck={false}
              className="mt-2 max-h-28 resize-none font-code text-xs leading-relaxed"
            />
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-auto flex flex-none items-center justify-between pt-1 font-code text-[10px] text-muted-foreground">
          <span>Relay CI 4.8.2 · runner linux-x64-16xl · queue 2 m 11 s</span>
          <span>d.kim@relay.sh · 18:44 CET</span>
        </footer>
      </div>
    </EvalShell>
  );
}
