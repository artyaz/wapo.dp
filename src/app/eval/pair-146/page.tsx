"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { RelationshipGrid } from "@/components/ds/RelationshipGrid";
import { Bell, Link2 } from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col px-6 py-5">
        {/* Top bar — incident identity */}
        <header className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Network Operations · Incidents
            </p>
            <h1 className="mt-1.5 text-xl font-semibold tracking-tight">
              INC-40221 — Latency spike on us-west-2 cluster
            </h1>
          </div>
          <div className="text-right text-xs leading-relaxed text-muted-foreground">
            <p>P1 · In Progress · 4 watchers</p>
            <p>Updated 2026-08-20 17:42 UTC</p>
          </div>
        </header>

        {/* Body — brief on the left, linked records + alert rules on the right */}
        <div className="my-auto grid grid-cols-[minmax(0,5fr)_minmax(0,8fr)] items-stretch gap-6 py-6">
          <section className="flex h-full min-h-0 flex-col rounded-lg border border-border bg-card p-4">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Incident brief
            </p>
            <Typography variant="docs">
              <h4>Summary</h4>
              <p>
                Latency on the us-west-2 ingest path climbed from 41 ms to
                1.2 s at p99 between 16:58 and 17:31 UTC, tracking the BGP
                flap on eu-edge-03.
              </p>
              <h4>Response so far</h4>
              <ul>
                <li>Traffic shifted to us-west-1 at 17:04 UTC.</li>
                <li>
                  Temporary firewall rule provisioned under RITM-5540.
                </li>
                <li>Rollback procedure verified by the netops on-call.</li>
              </ul>
              <h4>Open questions</h4>
              <p>
                Root cause is tracked in <code>PRB-0087</code>; the parent{" "}
                <code>INC-39880</code> remains the source of truth for
                customer comms.
              </p>
              <blockquote>
                Do not close until the eu-edge-03 BGP session has held stable
                for two consecutive maintenance windows.
              </blockquote>
            </Typography>
          </section>

          <div className="flex min-h-0 flex-col">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Link2 className="size-3.5 text-muted-foreground" />
                Linked records
              </h2>
              <span className="text-xs text-muted-foreground">
                7 records · sorted by updated
              </span>
            </div>
            <RelationshipGrid />
            <p className="mt-3 text-xs text-muted-foreground">
              INC-40221 is the record open in this view — parent incident,
              changes and follow-up tasks stay one click away.
            </p>

            <section className="mt-auto rounded-lg border border-border bg-card p-4">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                <Bell className="size-3.5" />
                Notification rules
              </p>
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="eval-146-page-oncall"
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox id="eval-146-page-oncall" defaultChecked />
                  <span className="text-sm">
                    Page the on-call SRE when status changes
                  </span>
                </label>
                <label
                  htmlFor="eval-146-autolink"
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox id="eval-146-autolink" />
                  <span className="text-sm">
                    Auto-link new child incidents to this record
                  </span>
                </label>
                <label
                  htmlFor="eval-146-comms"
                  className="flex items-center gap-2.5"
                >
                  <Checkbox id="eval-146-comms" defaultChecked disabled />
                  <span className="text-sm">
                    Send customer comms from the parent incident
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (managed)
                  </span>
                </label>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Rules apply to INC-40221 and every record linked above.
              </p>
            </section>
          </div>
        </div>

        {/* Status bar */}
        <footer className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <p>Auto-refresh every 60 s · Last synced 09:41 UTC</p>
          <p>Praxis ITSM · workspace network-ops</p>
        </footer>
      </div>
    </EvalShell>
  );
}
