"use client";

/**
 * PILOT page (pair-000) — pipeline validation only, not part of the 180 pairs.
 * Components: ds:Button, ds:StatTile, ui:Alert
 * Conditions: phone 390x844, dark theme, ltr.
 */

import React from "react";
import { CheckCircle2Icon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ds/Button";
import { StatTile } from "@/components/ds/StatTile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-4 p-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-caption font-caption text-neutral-400">Production · us-east-1</p>
            <h1 className="text-title font-title text-foreground">System status</h1>
          </div>
          <Button variant="secondary" size="small">Refresh</Button>
        </header>

        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>All systems operational</AlertTitle>
          <AlertDescription>
            Last incident resolved 14 days ago. Uptime for the last 90 days is 99.98%.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-3">
          <StatTile label="P99 latency" value="42.1ms" delta="+1.2" sign="negative" footer="last 24 hours" />
          <StatTile label="Error rate" value="0.12%" delta="-0.03" sign="positive" footer="5xx + timeouts" />
          <StatTile label="Requests" value="1,204" delta="+8.1%" sign="positive" footer="last 24 hours" />
          <StatTile label="Uptime" value="99.98%" footer="rolling 90 days" />
        </div>

        <footer className="mt-auto flex items-center justify-between border-t border-neutral-800 pt-3">
          <span className="text-caption font-caption text-neutral-500">Updated 12 seconds ago</span>
          <Button variant="ghost" size="small">View history</Button>
        </footer>
      </div>
    </EvalShell>
  );
}
