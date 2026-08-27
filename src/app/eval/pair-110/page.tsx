"use client";

/**
 * EVAL page (pair-110) — components: ui:textarea, ds:ToolSummaryRow, ui:input
 * Conditions: laptop 1024x768, light theme, ltr, no constraint.
 * Scenario: sign-in screen for the Praxis agent console — credential form
 * (email + password inputs, backup recovery-code textarea) beside a live
 * sign-in assistant activity feed (ToolSummaryRow).
 */

import React from "react";
import { Hexagon, ShieldCheck } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AgentActivity } from "@/components/ds/AgentActivity";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-10 py-8">
        <div className="flex w-full max-w-[880px] items-center gap-10">
          {/* ── Sign-in form ─────────────────────────────────────────── */}
          <section className="flex w-[430px] flex-none flex-col">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <Hexagon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Praxis Console</p>
                <p className="text-xs text-neutral-500">Agent operations workspace</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                Sign in to resume your agent sessions and review overnight runs.
              </p>
            </div>

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium text-neutral-700"
                >
                  Work email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-neutral-500 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                />
              </div>

              <button
                type="submit"
                className="mt-1 h-9 rounded-md bg-neutral-900 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Sign in
              </button>

              <div className="my-1 flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-xs uppercase tracking-wide text-neutral-400">or</span>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-recovery"
                  className="text-sm font-medium text-neutral-700"
                >
                  Use a recovery code
                </label>
                <Textarea
                  id="login-recovery"
                  placeholder={
                    "Paste one of your 10 backup codes, one per line\n4F2A-9KDM-7QPZ"
                  }
                />
                <p className="text-xs text-neutral-400">
                  Issued when you enabled two-factor authentication.
                </p>
              </div>
            </form>
          </section>

          {/* ── Sign-in assistant activity ───────────────────────────── */}
          <aside className="flex w-[380px] flex-none flex-col">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                <ShieldCheck className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
                <p className="text-sm font-medium text-neutral-900">Sign-in assistant</p>
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  live
                </span>
              </div>

              <p className="pt-3 text-xs text-neutral-500">
                Preparing your session — recent tool activity:
              </p>

              <div className="mt-1.5 flex flex-col">
                <AgentActivity.Step
                  kind="integration"
                  summary="Verified SSO identity and fetched your workspace sign-in policy"
                  traces={[
                    {
                      kind: "api",
                      label: "GET /v1/auth/session-policy — 200 OK (118ms)",
                    },
                    {
                      kind: "command",
                      label: "ssoctl verify --idp okta --silent",
                    },
                  ]}
                />

                <AgentActivity.Step
                  kind="api"
                  summary="Checked trusted devices — 1 new device in Lisbon, PT"
                />

                <AgentActivity.Step
                  kind="command"
                  summary="Ran login anomaly scan — 0 suspicious attempts in 30 days"
                />

                <AgentActivity.Step
                  kind="skill"
                  summary="Loaded security skill: phishing heuristics v3"
                />
              </div>

              <p className="border-t border-neutral-100 pt-3 text-xs text-neutral-400">
                Activity is recorded in your workspace audit log.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </EvalShell>
  );
}
