"use client";

/**
 * EVAL page (pair-053) — ui:slider + ds:PlayerBar + ui:sidebar
 * Conditions: desktop 1280x800, dark theme, ltr, dense-content.
 *
 * Scenario: "Aurora Listening Studio" — an audiobook production workspace
 * during a review pass on Episode 12. The ui:sidebar (expanded, left) carries
 * the episode scene list with duration badges and library references, all with
 * realistic long labels so truncation behavior is visible. The main area is
 * headed by the ds:PlayerBar review player (live scene playback with a long
 * two-line excerpt) above a mix panel with three ui:slider controls —
 * narration level (single thumb), ambient-bed ducking window (dual-thumb
 * range) and review playback rate.
 */

import React from "react";
import {
  AudioLines,
  BookOpen,
  CircleUserRound,
  Headphones,
  Library,
  Mic,
  Music4,
  Plus,
  Waves,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { PlayerBar } from "@/components/ds/PlayerBar";
import { Slider } from "@/components/ui/slider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const scenes = [
  {
    title: "Scene 01 — Foghorn across the shallows (rough mix)",
    duration: "4:12",
    icon: Waves,
    active: false,
  },
  {
    title: "Scene 02 — The keeper reads the tide ledger",
    duration: "6:48",
    icon: BookOpen,
    active: true,
  },
  {
    title: "Scene 03 — Confession by lamplight, part one",
    duration: "8:05",
    icon: Mic,
    active: false,
  },
  {
    title: "Scene 04 — Gulls carry the letter away",
    duration: "5:37",
    icon: Waves,
    active: false,
  },
];

const library = [
  {
    title: "Field recordings — North Atlantic, spring 2024",
    icon: AudioLines,
  },
  {
    title: "Music bed — “Salt & Cedar” by Iris Marrow",
    icon: Music4,
  },
  {
    title: "Archive interviews — lighthouse decommissioned 1998",
    icon: Library,
  },
];

function MixRow({
  id,
  label,
  readout,
  children,
}: {
  id: string;
  label: string;
  readout: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-medium text-default-font">
          {label}
        </label>
        <span className="flex-none text-xs text-muted-foreground tabular-nums">
          {readout}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function Page() {
  const [narration, setNarration] = React.useState([72]);
  const [ducking, setDucking] = React.useState([-14, -5]);
  const [rate, setRate] = React.useState([1.25]);

  return (
    <EvalShell theme="dark" dir="ltr">
      <SidebarProvider>
        {/* Episode navigation — dense long labels + duration badges */}
        <Sidebar>
          <SidebarHeader className="px-3 pb-1 pt-3">
            <div className="flex items-center gap-2.5 px-1">
              <div className="flex size-8 flex-none items-center justify-center rounded-lg border border-sidebar-border bg-background">
                <Headphones className="size-4 text-sidebar-foreground" />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                <span className="truncate text-sm font-semibold text-sidebar-foreground">
                  Aurora Listening Studio
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Audiobook production workspace
                </span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                Ep. 12 · The Lighthouse Keeper’s Confession
              </SidebarGroupLabel>
              <SidebarGroupAction title="Add scene">
                <Plus />
                <span className="sr-only">Add scene</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {scenes.map((scene) => (
                    <SidebarMenuItem key={scene.title}>
                      <SidebarMenuButton isActive={scene.active}>
                        <scene.icon />
                        <span>{scene.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>{scene.duration}</SidebarMenuBadge>
                      {scene.active ? (
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton isActive>
                              <span>Take 4 — sync locked to picture</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>
                              <span>Take 3 — trimmed at 06:02</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Library &amp; reference audio</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {library.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <CircleUserRound />
                  <span className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Marisol Vega</span>
                    <span className="text-xs text-muted-foreground">
                      m.vega@aurora.studio
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Review workspace */}
        <SidebarInset>
          <header className="flex items-center gap-3 border-b border-solid border-default-border px-5 py-3">
            <SidebarTrigger />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-sm font-semibold text-default-font">
                Scene 02 — The keeper reads the tide ledger
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Review pass · narration sync &amp; ambient ducking check
              </p>
            </div>
            <span className="hidden flex-none items-center gap-1.5 rounded-full border border-solid border-default-border px-2.5 py-1 text-[11px] leading-none text-muted-foreground md:inline-flex">
              Draft v4 · 24:42 remaining
            </span>
          </header>

          <div className="mx-auto flex w-full max-w-[880px] flex-col gap-5 px-6 py-6">
            {/* Live review player for the active scene */}
            <PlayerBar
              className="max-w-[720px]"
              position="04:12 / 06:48"
              explainLabel="Explain this take"
              excerpt="We are at the part where the keeper finally admits he let the lamp go dark on purpose — the night the Argenta went aground — and I want the room tone to almost disappear beneath him, so the confession feels as though it is happening inside the listener’s own head rather than out on the water."
            />

            {/* Mix controls — applied to the preview only */}
            <section className="rounded-2xl border border-solid border-default-border bg-panel/50 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-sm font-semibold text-default-font">
                  Review mix
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Preview routing · not exported
                </span>
              </div>
              <p className="mt-1 max-w-[68ch] text-xs leading-relaxed text-muted-foreground">
                These settings shape what plays back during the review pass only.
                Narration rides bus A, the ambient bed rides bus B, and the
                ducking window follows the confession passage between the second
                and third paragraph of the script.
              </p>

              <div className="mt-5 flex flex-col gap-5">
                <MixRow
                  id="mix-narration"
                  label="Narration level — keeper’s confession, take 4"
                  readout={`${narration[0]}%`}
                >
                  <Slider
                    id="mix-narration"
                    value={narration}
                    onValueChange={(v) => setNarration(v as number[])}
                    min={0}
                    max={100}
                    step={1}
                    aria-label="Narration level"
                  />
                </MixRow>

                <MixRow
                  id="mix-ducking"
                  label="Ambient bed ducking window under the narration"
                  readout={`${ducking[0]} dB … ${ducking[1]} dB`}
                >
                  <Slider
                    id="mix-ducking"
                    value={ducking}
                    onValueChange={(v) => setDucking(v as number[])}
                    min={-24}
                    max={0}
                    step={1}
                    aria-label="Ambient bed ducking window"
                  />
                </MixRow>

                <MixRow
                  id="mix-rate"
                  label="Playback rate for long review passes"
                  readout={`${rate[0].toFixed(2)}×`}
                >
                  <Slider
                    id="mix-rate"
                    value={rate}
                    onValueChange={(v) => setRate(v as number[])}
                    min={0.5}
                    max={2}
                    step={0.05}
                    aria-label="Playback rate"
                  />
                </MixRow>
              </div>
            </section>

            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Preview routing: narration → bus A, ambient bed → bus B. Mastering
              and loudness targets live in the export tab and are not affected by
              this panel.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </EvalShell>
  );
}
