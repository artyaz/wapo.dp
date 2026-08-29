"use client";

// EVAL page — attachment p1 — CI/CD pipeline monitor — 430x932 dark (phone)

import {
  CheckIcon,
  ChevronLeftIcon,
  ClockIcon,
  DownloadIcon,
  FileTextIcon,
  FileWarningIcon,
  GitBranchIcon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";

const failureShot =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80";

const stages = [
  { name: "Checkout", detail: "8s", status: "passed" as const },
  { name: "Build · docker", detail: "3m 12s", status: "passed" as const },
  { name: "Test · vitest", detail: "67 failed", status: "failed" as const },
  { name: "Deploy · staging", detail: "skipped", status: "pending" as const },
];

const logLines = [
  { time: "12:46:33", text: "PASS  test/runner.spec.ts (42 tests)", tone: "ok" },
  { time: "12:46:41", text: "PASS  test/scheduler.spec.ts (18 tests)", tone: "ok" },
  { time: "12:46:52", text: "FAIL  test/rollback.spec.ts (7 tests)", tone: "error" },
  { time: "12:46:52", text: "AssertionError: expected 3 retries, received 2", tone: "error" },
  { time: "12:46:53", text: "  at src/lib/pipeline/rollback.ts:118:19", tone: "dim" },
  { time: "12:46:55", text: "Tests  67 failed · 60 passed · 127 total", tone: "error" },
  { time: "12:46:55", text: "exit 1 — artifacts staged for review", tone: "dim" },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-4 pb-4 pt-3">
        {/* Header */}
        <header className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Back to pipelines"
            className="text-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-heading-3 text-heading-3 text-foreground">
              checkout-api · #4821
            </h1>
            <p className="truncate font-code text-xs text-muted-foreground">
              main · a3f9c12 · started 12:41 UTC
            </p>
          </div>
          <Badge variant="destructive">Failed</Badge>
        </header>

        {/* Trigger author */}
        <div className="mt-2.5 flex items-center gap-2 px-1">
          <Avatar size="sm">
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            Dana Whitfield · push to{" "}
            <span className="inline-flex items-center gap-1 font-code text-foreground/80">
              <GitBranchIcon className="size-3" /> main
            </span>
          </span>
          <span className="ms-auto font-code text-xs text-muted-foreground">
            6m 04s
          </span>
        </div>

        {/* Pipeline stages */}
        <section
          aria-labelledby="pipeline-heading"
          className="mt-3 overflow-hidden rounded-lg border border-default-border bg-card"
        >
          <div className="flex items-center justify-between border-b border-default-border px-3 py-2">
            <h2 id="pipeline-heading" className="text-sm font-medium text-foreground">
              Pipeline
            </h2>
            <span className="font-code text-xs text-muted-foreground">
              4 stages
            </span>
          </div>
          <ul className="divide-y divide-default-border">
            {stages.map((stage) => (
              <li key={stage.name} className="flex items-center gap-3 px-3 py-2.5">
                <span
                  className={
                    stage.status === "passed"
                      ? "flex size-6 shrink-0 items-center justify-center rounded-md bg-success-400/10 text-success-400"
                      : stage.status === "failed"
                        ? "flex size-6 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive"
                        : "flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
                  }
                >
                  {stage.status === "passed" ? (
                    <CheckIcon className="size-3.5" />
                  ) : stage.status === "failed" ? (
                    <XIcon className="size-3.5" />
                  ) : (
                    <ClockIcon className="size-3.5" />
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {stage.name}
                </span>
                <span
                  className={
                    stage.status === "failed"
                      ? "font-code text-xs text-destructive"
                      : "font-code text-xs text-muted-foreground"
                  }
                >
                  {stage.detail}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Artifacts — Attachment showcase */}
        <section aria-labelledby="artifacts-heading" className="mt-4">
          <div className="mb-2 flex items-center justify-between px-1">
            <h2
              id="artifacts-heading"
              className="text-sm font-medium text-foreground"
            >
              Artifacts
            </h2>
            <span className="font-code text-xs text-muted-foreground">
              4 files
            </span>
          </div>
          <AttachmentGroup>
            {/* Uploaded build log */}
            <Attachment state="done">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>build-4821.log</AttachmentTitle>
                <AttachmentDescription>
                  Uploaded · TXT · 2.1 MB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions className="opacity-100!">
                <AttachmentAction
                  variant="ghost"
                  aria-label="Download build-4821.log"
                >
                  <DownloadIcon />
                </AttachmentAction>
              </AttachmentActions>
              <AttachmentTrigger
                render={
                  <a href="#build-log" aria-label="Open build-4821.log" />
                }
              />
            </Attachment>

            {/* Failure screenshot — image attachment */}
            <Attachment state="done">
              <AttachmentMedia variant="image">
                <img src={failureShot} alt="Test failure screenshot" />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>test-failure-4821.png</AttachmentTitle>
                <AttachmentDescription>
                  Uploaded · PNG · 840 KB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions className="opacity-100!">
                <AttachmentAction
                  variant="ghost"
                  aria-label="Remove test-failure-4821.png"
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
              <AttachmentTrigger
                render={
                  <a
                    href={failureShot}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Preview test-failure-4821.png"
                  />
                }
              />
            </Attachment>

            {/* Coverage report — uploading */}
            <Attachment state="uploading">
              <AttachmentMedia>
                <Spinner />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>coverage-lcov.info</AttachmentTitle>
                <AttachmentDescription>
                  Uploading · 64% · 3.8 MB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions className="opacity-100!">
                <AttachmentAction
                  variant="ghost"
                  aria-label="Cancel upload of coverage-lcov.info"
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
              {/* Edge-mounted upload progress: out of flow, so the card
                  keeps the exact height/padding rhythm of its siblings */}
              <Progress
                value={64}
                className="absolute inset-x-3 bottom-0 h-0.5! w-auto!"
              />
            </Attachment>

            {/* Bundle stats — error */}
            <Attachment state="error">
              <AttachmentMedia>
                <FileWarningIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>bundle-stats.json</AttachmentTitle>
                <AttachmentDescription>
                  Upload failed · exceeds 25 MB limit
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions className="opacity-100!">
                <AttachmentAction
                  variant="ghost"
                  aria-label="Retry upload of bundle-stats.json"
                >
                  <RefreshCwIcon />
                </AttachmentAction>
                <AttachmentAction
                  variant="ghost"
                  aria-label="Remove bundle-stats.json"
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </AttachmentGroup>
        </section>

        {/* Log tail */}
        <section
          aria-labelledby="log-heading"
          className="mt-4 rounded-lg border border-default-border bg-card"
        >
          <div className="flex items-center justify-between border-b border-default-border px-3 py-2">
            <h2 id="log-heading" className="text-sm font-medium text-foreground">
              Last run output
            </h2>
            <span className="font-code text-xs text-destructive">exit 1</span>
          </div>
          <div className="flex flex-col gap-0.5 p-3 font-code text-xs leading-relaxed">
            {logLines.map((line) => (
              <p
                key={line.time + line.text}
                className={
                  line.tone === "error"
                    ? "text-destructive"
                    : line.tone === "dim"
                      ? "text-muted-foreground/70"
                      : "text-muted-foreground"
                }
              >
                <span className="text-muted-foreground/50">{line.time}</span>{" "}
                {line.text}
              </p>
            ))}
          </div>
        </section>

        {/* Bottom actions */}
        <div className="mt-auto flex gap-2 pt-4">
          <Button className="flex-1" size="sm">
            <RefreshCwIcon />
            Re-run failed jobs
          </Button>
          <Button variant="outline" size="sm">
            <FileTextIcon />
            Full logs
          </Button>
        </div>
      </div>
    </EvalShell>
  );
}
