"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { TimelineRuler } from "@/components/ds/TimelineRuler";
import { GlassRefraction } from "@/components/ds/GlassRefraction";
import { Switch } from "@/components/ui/switch";
import { Clapperboard, Fingerprint, Lock, Mail } from "lucide-react";

/**
 * Scenario: "Praxis Cut" (mobile video-editing suite) sign-in screen — dark,
 * 360×640. The glass lens emblem (ds:GlassRefraction) anchors the brand at the
 * top, sign-in options are ui:Switch rows, and the bottom card previews the
 * reviewer's last edit session on the ds:TimelineRuler time axis
 * (00:00–02:00 @ 24 px/s) with ◆ comment markers and a playhead parked at
 * 00:05 where they stopped watching.
 */

// 24 px/s → the ruler's coordinate space; 120 px = 00:05
const LAST_VIEWED_X = 120;

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-dvh flex-col gap-3.5 bg-background px-5 pb-4 pt-5 text-foreground">
        {/* ── brand hero — glass emblem (ds:GlassRefraction) ─────── */}
        <header className="flex flex-col items-center">
          <GlassRefraction material="regular" className="py-1">
            <Fingerprint
              className="size-4 text-default-font/80"
              strokeWidth={1.75}
            />
          </GlassRefraction>
          <h1 className="mt-1.5 text-lg font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Sign in to your studio to sync cuts across devices
          </p>
        </header>

        {/* ── credentials ───────────────────────────────────────── */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-foreground"
            >
              Work email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                defaultValue="ana@praxis.studio"
                autoComplete="email"
                className="h-9 w-full rounded-md border border-input bg-background pr-3 pl-9 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground"
              >
                Password
              </label>
              <a
                href="#"
                className="text-[11px] text-muted-foreground underline-offset-2 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type="password"
                defaultValue="correct-horse-battery"
                autoComplete="current-password"
                className="h-9 w-full rounded-md border border-input bg-background pr-3 pl-9 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
        </div>

        {/* ── sign-in options (ui:Switch) ───────────────────────── */}
        <div className="overflow-hidden rounded-lg border border-border bg-panel">
          <label
            htmlFor="keep-signed-in"
            className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium leading-none">
                Keep me signed in
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
                Stay authenticated on this device for 30 days
              </span>
            </span>
            <Switch id="keep-signed-in" defaultChecked />
          </label>
          <div className="border-t border-border" />
          <label
            htmlFor="face-id"
            className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium leading-none">
                Unlock with Face ID
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
                Use biometrics instead of your password
              </span>
            </span>
            <Switch id="face-id" />
          </label>
        </div>

        {/* ── primary action ────────────────────────────────────── */}
        <button
          type="button"
          className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
        </button>

        {/* ── last session — edit timeline (ds:TimelineRuler) ───── */}
        <section className="flex flex-col gap-2 rounded-lg border border-border bg-panel p-3">
          <div className="flex items-center gap-2">
            <Clapperboard className="size-3.5 flex-none text-muted-foreground" />
            <span className="truncate text-xs font-medium">
              cut_v3_rough · resume review
            </span>
            <span className="ml-auto flex-none font-code text-[10px] tabular-nums text-muted-foreground">
              00:00–02:00
            </span>
          </div>
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="relative h-[34px] w-[2880px]">
                <TimelineRuler />
                {/* playhead — where the reviewer stopped */}
                <div
                  className="pointer-events-none absolute inset-y-0 w-px bg-default-font/70"
                  style={{ left: LAST_VIEWED_X }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-[3px] bg-default-font px-1 py-0.5 font-code text-[9px] leading-none text-panel tabular-nums">
                    00:05
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-panel to-transparent" />
          </div>
          <p className="font-code text-[10px] text-muted-foreground">
            ◆ 11 review comments · last viewed 00:05 · swipe to pan
          </p>
        </section>
      </div>
    </EvalShell>
  );
}
