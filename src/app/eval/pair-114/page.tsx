"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { ActionTraces } from "@/components/ds/ActionTraces";
import { ToolSummaryRow } from "@/components/ds/ToolSummaryRow";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  EyeIcon,
  FingerprintIcon,
  HexagonIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
} from "lucide-react";

/**
 * pair-114 — login screen, light theme, RTL, 1024×768 laptop.
 *
 * Split screen: the sign-in form on the start side (right in RTL), and a
 * "transparency" panel on the end side showing what the auth agent runs during
 * sign-in. The panel's Collapsible (open by default) reveals the macro level
 * (ToolSummaryRow) and micro level (ActionTraces) of the agent's routine.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr_1.1fr]">
        {/* ── Sign-in column (start side — right in RTL) ────────────── */}
        <main className="flex items-center justify-center border-border px-6 py-10 md:border-e md:px-12">
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <HexagonIcon className="size-4" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold tracking-tight">
                  Praxis Cloud
                </span>
                <span className="text-xs text-muted-foreground">
                  Agent Console
                </span>
              </div>
            </div>

            <h1 className="mt-8 text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to continue to your workspace console.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••"
                    autoComplete="current-password"
                    className="pe-9"
                  />
                  <EyeIcon
                    aria-hidden
                    className="pointer-events-none absolute end-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>

              <Button size="lg" className="w-full">
                Sign in
                <ArrowLeftIcon className="size-4" />
              </Button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              {/* Single sign-on — collapsed by default */}
              <Collapsible>
                <CollapsibleTrigger
                  render={
                    <Button variant="outline" className="group w-full">
                      <KeyRoundIcon className="size-4" />
                      Continue with single sign-on
                      <ChevronDownIcon className="ms-auto size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  }
                />
                <CollapsibleContent>
                  <div className="mt-3 flex flex-col gap-2.5 rounded-lg border bg-muted/40 p-3">
                    <Label htmlFor="sso-domain" className="text-xs">
                      Company domain
                    </Label>
                    <Input
                      id="sso-domain"
                      placeholder="acme.okta.com"
                      className="bg-background"
                    />
                    <Button variant="secondary" className="w-full">
                      Continue with provider
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <p className="mt-8 text-xs text-muted-foreground">
              New to Praxis Cloud?{" "}
              <a
                href="#"
                className="text-foreground underline underline-offset-4"
              >
                Request access
              </a>
            </p>
          </div>
        </main>

        {/* ── Transparency panel (end side — left in RTL) ───────────── */}
        <aside className="flex items-center justify-center bg-muted/30 px-6 py-10 md:px-12">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4 text-muted-foreground" />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Transparency by design
              </p>
            </div>

            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              See exactly what happens when you sign in
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Before your session starts, the auth agent runs a short, fully
              logged routine. Expand the live trace to inspect every step —
              nothing runs silently.
            </p>

            {/* Agent routine — open by default */}
            <div className="mt-5 rounded-xl border bg-card p-4 shadow-sm">
              <Collapsible defaultOpen>
                <CollapsibleTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="group -mx-2 w-[calc(100%+1rem)] justify-start gap-2 px-2 text-sm font-medium"
                    >
                      <FingerprintIcon className="size-4 text-muted-foreground" />
                      Live sign-in trace
                      <span className="ms-auto text-xs font-normal text-muted-foreground">
                        last run · 2.4s
                      </span>
                      <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  }
                />
                <CollapsibleContent>
                  <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                    <ToolSummaryRow
                      kind="integration"
                      traces={
                        <ActionTraces
                          items={[
                            {
                              kind: "api",
                              label:
                                "GET /v1/idp/.well-known/openid-configuration — 200 OK (96 ms)",
                            },
                            {
                              kind: "skill",
                              label:
                                "Loaded policy pack: auth/device-posture@2.1",
                            },
                            {
                              kind: "command",
                              label:
                                "devicectl posture --strict — 12 checks passed",
                            },
                            {
                              kind: "api",
                              label:
                                "POST /v1/session/token — 201 Created (218 ms)",
                            },
                          ]}
                        />
                      }
                    >
                      Resolved your identity provider and ran a device posture
                      check
                    </ToolSummaryRow>
                    <ToolSummaryRow kind="command">
                      Ran password policy check — 148 rules passed, 0 failed
                    </ToolSummaryRow>
                    <ToolSummaryRow kind="edits">
                      Updated your last-session record — 2 fields changed
                    </ToolSummaryRow>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Every step is written to your workspace audit log and can be
              exported at any time.
              <span className="mt-1 block text-muted-foreground/80">
                SOC 2 Type II · ISO 27001 · GDPR-ready
              </span>
            </p>
          </div>
        </aside>
      </div>
    </EvalShell>
  );
}
