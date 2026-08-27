"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ds/Button";

/**
 * pair-085 — release-rollout status screen on a tiny 320×480 phone (dark, ltr,
 * no-scroll). Scenario: the "Ship" app just finished deploying release v2.4.1;
 * a persistent toast announces it at the top, the environment list below uses
 * badges for rollout state, and ds:Button drives the rollout actions at the
 * bottom.
 */

const ENVIRONMENTS = [
  {
    name: "Production",
    detail: "us-east-1",
    status: "live",
    variant: "default" as const,
    badgeClass: "border-transparent bg-success-500/15 text-success-600",
  },
  {
    name: "Canary",
    detail: "10 pods",
    status: "5% traffic",
    variant: "default" as const,
    badgeClass: "border-transparent bg-warning-500/15 text-warning-600",
  },
  {
    name: "Staging",
    detail: "build #4820",
    status: "synced",
    variant: "secondary" as const,
    badgeClass: "",
  },
];

export default function Page() {
  // Announce the finished deploy once the screen is up. Dispatched slightly
  // after mount so the app-level <Toaster /> has subscribed its store listener;
  // kept open (duration: Infinity) so the notification persists on screen.
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      toast.add({
        title: "Release v2.4.1 shipped",
        description: "128 checks passed · 2m ago",
        type: "success",
        duration: Infinity,
      });
    }, 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden px-4 pb-4 pt-[112px]">
        <header className="shrink-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Deployments
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <h1 className="text-[20px] font-semibold leading-6 tracking-tight text-foreground">
              Release v2.4.1
            </h1>
            <Badge variant="outline" className="leading-none">
              stable
            </Badge>
          </div>
          <p className="mt-1.5 text-xs leading-4 text-muted-foreground">
            web-dashboard · main @ 9f3c2e1
          </p>
        </header>

        <section
          aria-label="Environments"
          className="mt-3 shrink-0 overflow-hidden rounded-lg border border-solid border-default-border bg-panel"
        >
          {ENVIRONMENTS.map((env, index) => (
            <div
              key={env.name}
              className={[
                "flex h-11 items-center justify-between gap-2 px-3",
                index > 0 ? "border-t border-solid border-default-border" : "",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="shrink-0 text-sm font-medium text-foreground">
                  {env.name}
                </span>
                <span className="truncate text-[11px] leading-4 text-muted-foreground">
                  {env.detail}
                </span>
              </div>
              <Badge variant={env.variant} className={env.badgeClass}>
                {env.status}
              </Badge>
            </div>
          ))}
        </section>

        <div className="mt-auto shrink-0">
          <div className="flex items-stretch gap-2">
            <Button className="min-w-0 flex-1">Roll out to 100%</Button>
            <Button
              variant="secondary"
              icon={<Terminal size={16} />}
              iconOnly
              aria-label="View rollout logs"
            />
          </div>
          <Button variant="ghost" className="mt-2 w-full">
            Pause rollout
          </Button>
        </div>
      </div>
    </EvalShell>
  );
}
