"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { CanvasNode } from "@/components/ds/CanvasNode";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, WorkflowIcon } from "lucide-react";

type RunStatus = "succeeded" | "degraded" | "failed";

const runs: {
  id: string;
  trigger: string;
  duration: string;
  rows: string;
  status: RunStatus;
}[] = [
  { id: "run_8253", trigger: "schedule · 30m", duration: "2m 14s", rows: "1.24M", status: "succeeded" },
  { id: "run_8252", trigger: "schedule · 30m", duration: "2m 02s", rows: "1.21M", status: "succeeded" },
  { id: "run_8251", trigger: "manual · retry", duration: "3m 41s", rows: "1.19M", status: "degraded" },
  { id: "run_8250", trigger: "schedule · 30m", duration: "0m 48s", rows: "412K", status: "succeeded" },
  { id: "run_8249", trigger: "webhook · alert", duration: "—", rows: "12K", status: "failed" },
  { id: "run_8248", trigger: "schedule · 30m", duration: "1m 57s", rows: "1.18M", status: "succeeded" },
  { id: "run_8247", trigger: "schedule · 30m", duration: "2m 21s", rows: "1.22M", status: "succeeded" },
  { id: "run_8246", trigger: "manual · backfill", duration: "6m 03s", rows: "3.10M", status: "succeeded" },
  { id: "run_8245", trigger: "schedule · 30m", duration: "2m 09s", rows: "1.20M", status: "degraded" },
  { id: "run_8244", trigger: "schedule · 30m", duration: "1m 44s", rows: "986K", status: "succeeded" },
];

const statusTone: Record<RunStatus, string> = {
  succeeded: "bg-success-500",
  degraded: "bg-warning-500",
  failed: "bg-destructive-500",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-border bg-card px-5">
          <div className="flex size-8 flex-none items-center justify-center rounded-md bg-foreground text-background">
            <WorkflowIcon className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-semibold leading-none">Flowline</span>
            <span className="truncate text-[11px] text-muted-foreground">
              shop-analytics · nightly etl
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              last run · 2m ago
            </span>
            <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              prod · us-east
            </span>
          </div>
        </header>

        {/* ── Pipeline flow canvas (CanvasNode) ────────────────────── */}
        <section className="flex min-h-0 flex-1 flex-col px-5 pt-4">
          <div className="flex flex-none items-center justify-between pb-2">
            <SectionHeading>Pipeline flow</SectionHeading>
            <span className="text-[11px] text-muted-foreground">
              last deploy · 2h ago · v128
            </span>
          </div>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg border border-solid border-default-border bg-default-background"
            style={{
              backgroundImage:
                "radial-gradient(rgb(214 210 199) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            <span className="pointer-events-none absolute left-3 top-2.5 font-code text-[11px] tracking-[0.04em] text-neutral-500">
              flow · production
            </span>
            <span className="pointer-events-none absolute right-3 top-2.5 font-code text-[10px] text-neutral-400">
              3 stages · zoom 100%
            </span>
            <span className="pointer-events-none absolute bottom-2.5 left-3 font-code text-[10px] text-neutral-400">
              drag to pan · scroll to zoom
            </span>

            <div className="flex items-center">
              <CanvasNode
                title="shop feed"
                statusTone="live"
                footer={
                  <span className="font-code text-[11px] text-neutral-400">
                    src/shop-events
                  </span>
                }
              >
                <span className="text-code font-code text-default-font">
                  p99 · 42ms
                </span>
                <span className="text-code font-code text-neutral-500">
                  rps · 1,204
                </span>
              </CanvasNode>
              <div className="h-px w-6 flex-none bg-neutral-300" />
              <CanvasNode
                variant="selected"
                title="normalize"
                statusTone="warning"
                footer={
                  <span className="font-code text-[11px] text-neutral-400">
                    fn/normalize-v2
                  </span>
                }
              >
                <span className="text-code font-code text-default-font">
                  p99 · 312ms
                </span>
                <span className="text-code font-code text-neutral-500">
                  rps · 1,198
                </span>
              </CanvasNode>
              <div className="h-px w-6 flex-none bg-neutral-300" />
              <CanvasNode
                title="warehouse sync"
                statusTone="success"
                footer={
                  <span className="font-code text-[11px] text-neutral-400">
                    dst/warehouse
                  </span>
                }
              >
                <span className="text-code font-code text-default-font">
                  p99 · 88ms
                </span>
                <span className="text-code font-code text-neutral-500">
                  rps · 412
                </span>
              </CanvasNode>
            </div>
          </div>
        </section>

        {/* ── Recent runs (Table) ──────────────────────────────────── */}
        <section className="flex-none px-5 pt-4">
          <div className="flex items-center justify-between pb-2">
            <SectionHeading>Recent runs</SectionHeading>
            <span className="text-[11px] text-muted-foreground">
              auto-refresh · 30s
            </span>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Run</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead className="text-right">Rows</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="font-code text-[13px]">
                      {run.id}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {run.trigger}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {run.duration}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">
                      {run.rows}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          className={`size-1.5 flex-none rounded-full ${statusTone[run.status]}`}
                        />
                        {run.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open run menu</span>
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View logs</DropdownMenuItem>
                          <DropdownMenuItem>Rerun from stage</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            Delete run
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* ── Runs pagination (Pagination) ─────────────────────────── */}
        <footer className="mt-4 flex h-14 flex-none items-center justify-between gap-4 border-t border-border px-5">
          <span className="flex-none text-xs text-muted-foreground">
            Showing 31–40 of 318 runs
          </span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">32</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      </div>
    </EvalShell>
  );
}
