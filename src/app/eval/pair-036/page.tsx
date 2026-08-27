"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { MaterialTokens } from "@/components/ds/MaterialTokens";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { TerminalLine } from "@/components/ds/TerminalLine";
import {
  Eye,
  FileText,
  GitBranch,
  Layers,
  Search,
  Terminal,
} from "lucide-react";

function SectionHeading({
  icon,
  children,
  aside,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex h-6 flex-none items-center gap-2">
      <span className="flex size-3.5 items-center justify-center text-muted-foreground">
        {icon}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {children}
      </span>
      {aside ? (
        <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground">
          {aside}
        </span>
      ) : null}
    </div>
  );
}

function HeaderChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* faint monochrome ambient light so the glass panels have something
            to refract — calm, no hue */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_18%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_12%_85%,rgba(255,255,255,0.03),transparent_70%)]" />
        </div>

        {/* ── Top bar ──────────────────────────────────────────────── */}
        <header className="relative z-10 flex h-12 flex-none items-center gap-3 border-b border-border bg-card px-4">
          <div className="flex size-8 flex-none items-center justify-center rounded-md bg-foreground text-background">
            <Layers className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-semibold leading-none">
              Surface Lab
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              Material console · praxis/ds
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <HeaderChip>
              <GitBranch className="size-3" />
              feat/glass-ramp-v4
            </HeaderChip>
            <HeaderChip>
              <span className="size-1.5 rounded-full bg-success-500" />
              watch on
            </HeaderChip>
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              build #4f2a
            </span>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="relative z-10 flex min-h-0 flex-1">
          {/* Left: the live material reference (ds:MaterialTokens) */}
          <aside className="flex w-[500px] flex-none flex-col gap-4 overflow-y-auto border-r border-border bg-card/40 px-6 py-5">
            <SectionHeading
              icon={<Layers className="size-3.5" />}
              aside="ramp v4"
            >
              Material reference
            </SectionHeading>

            <div className="w-full max-w-[464px]">
              <MaterialTokens />
            </div>

            <p className="max-w-[464px] text-xs leading-relaxed text-muted-foreground">
              Live ramp for laid-object surfaces — one substance, graded by
              tint · blur · saturate. Keep it beside the console while the
              build runs to eyeball each level against real output.
            </p>

            {/* ui:marker — border variant, inspector status chip */}
            <Marker variant="border" className="w-auto max-w-[464px]">
              <MarkerIcon>
                <Eye className="size-3.5" />
              </MarkerIcon>
              <MarkerContent>Preview 1× · DPR 2 · sRGB</MarkerContent>
            </Marker>
          </aside>

          {/* Right: build console (ds:TerminalLine + ui:marker) */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 px-6 py-5">
            <SectionHeading
              icon={<Terminal className="size-3.5" />}
              aside="zsh · praxis-cli 3.1"
            >
              Build console
            </SectionHeading>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-solid border-default-border bg-panel px-4 py-3">
              {/* terminal toolbar */}
              <div className="mb-3 flex flex-none items-center gap-2 border-b border-default-border pb-2.5">
                <span className="size-2.5 rounded-full bg-neutral-400/60" />
                <span className="size-2.5 rounded-full bg-neutral-500/50" />
                <span className="size-2.5 rounded-full bg-neutral-600/50" />
                <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">
                  praxis — materials build --watch
                </span>
                <span className="ml-auto flex flex-none items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-success-500" />
                  watching
                </span>
              </div>

              {/* transcript */}
              <div className="flex min-h-0 flex-1 flex-col gap-0.5">
                <TerminalLine
                  variant="prompt"
                  path="~/praxis"
                  command="praxis materials build --watch"
                />
                <TerminalLine
                  variant="stdout"
                  text="resolving tokens · packages/ds/tokens.json"
                />
                <TerminalLine
                  variant="stdout"
                  text="4 surfaces · 24 variants · 1 deprecation warning"
                />

                {/* ui:marker — separator variant, build-phase divider */}
                <div className="my-2.5">
                  <Marker variant="separator">
                    <MarkerIcon>
                      <Search className="size-3.5" />
                    </MarkerIcon>
                    <MarkerContent>
                      phase 2 — validate · contrast AA
                    </MarkerContent>
                  </Marker>
                </div>

                <TerminalLine
                  variant="spinner"
                  text="diffing backdrop-filter support matrix"
                />
                <TerminalLine
                  variant="success"
                  text="AA pass — regular + thick over neutral-900"
                />
                <TerminalLine
                  variant="stderr"
                  text="error: ultrathin fails AA over image backdrops — add scrim"
                />
                <TerminalLine
                  variant="success"
                  text="rebuild complete · 4 surfaces · 12 token files"
                />
                <TerminalLine
                  variant="spinner"
                  text="watching packages/ds/tokens.json for changes"
                />
              </div>
            </div>

            {/* ui:marker — default variant as an accessible link */}
            <div className="flex flex-none items-center gap-4">
              <Marker render={<a href="#build-report" />}>
                <MarkerIcon>
                  <FileText className="size-3.5" />
                </MarkerIcon>
                <MarkerContent>
                  Wrote 12 token files — open build report
                </MarkerContent>
              </Marker>
              <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground">
                exit 0 · 12.4s
              </span>
            </div>
          </main>
        </div>

        {/* ── Status bar ───────────────────────────────────────────── */}
        <footer className="relative z-10 flex h-9 flex-none items-center justify-between border-t border-border bg-card px-4 text-[11px] text-muted-foreground">
          <span>Surface Lab v4.2.0 · local</span>
          <span>last build 12s ago · 1 open warning (ultrathin scrim)</span>
        </footer>
      </div>
    </EvalShell>
  );
}
