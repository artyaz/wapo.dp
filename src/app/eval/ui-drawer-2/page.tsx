"use client";

/**
 * EVAL page — drawer p2 — podcast recording studio console — 1280x800 light
 *
 * Scenario: "Holloway Audio" Studio B console while recording Ep. 47 of
 * "The Quiet Hours". Header + transport bar + channel strip list with
 * segmented meters and M/S/R states (ui:Card/Button/Badge), master bus row,
 * status footer (ui:Separator). A right-side Drawer is open at initial
 * render (defaultOpen) with the channel-01 input sheet: gain Slider, HPF /
 * pad / phase Switches, input-level Progress, gate + compressor Sliders and
 * footer actions — the sheet floats over the dimmed console.
 */

import {
  BookmarkPlus,
  GripVertical,
  Mic,
  Play,
  SkipBack,
  SkipForward,
  Square,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const SEGMENTS = 12;

type Channel = {
  num: string;
  name: string;
  source: string;
  peak: string;
  level: number; // 0-100
  mute: boolean;
  solo: boolean;
  armed: boolean;
};

const CHANNELS: Channel[] = [
  {
    num: "01", name: "Shure SM7B — Iris Kwan", source: "XLR 1 · preamp A · host",
    peak: "−3.2", level: 82, mute: false, solo: true, armed: true,
  },
  {
    num: "02", name: "Neumann U87 — Desmond Cole", source: "XLR 2 · preamp A · guest",
    peak: "−9.8", level: 58, mute: false, solo: false, armed: true,
  },
  {
    num: "03", name: "Rode NT5 pair — room", source: "XLR 3–4 · ambience",
    peak: "−22.6", level: 28, mute: false, solo: false, armed: true,
  },
  {
    num: "04", name: "Phone hybrid — caller", source: "AES 1 · line in",
    peak: "−16.4", level: 40, mute: false, solo: false, armed: true,
  },
  {
    num: "05", name: "Sound FX — laptop send", source: "USB 3 · stereo",
    peak: "−11.2", level: 52, mute: true, solo: false, armed: false,
  },
  {
    num: "06", name: "Music bed — Ableton return", source: "USB 4 · stereo",
    peak: "−14.0", level: 46, mute: false, solo: false, armed: false,
  },
];

function Meter({ level }: { level: number }) {
  const filled = Math.round((level / 100) * SEGMENTS);
  return (
    <span className="flex items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: SEGMENTS }, (_, i) => {
        const isFilled = i < filled;
        const isHot = i >= SEGMENTS - 3;
        return (
          <span
            key={i}
            className={`h-3 w-[5px] rounded-[1px] ${
              isFilled
                ? isHot
                  ? "bg-destructive-500"
                  : "bg-foreground/70"
                : "bg-muted-foreground/15"
            }`}
          />
        );
      })}
    </span>
  );
}

function MsrButton({
  label,
  active,
  title,
}: {
  label: string;
  active: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={active}
      className={`flex h-6 w-6 items-center justify-center rounded-sm border text-[11px] font-semibold transition-colors ${
        active
          ? "border-transparent bg-foreground text-background"
          : "border-input text-muted-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <Drawer direction="right" defaultOpen>
        <div className="bg-background flex h-screen w-full flex-col overflow-hidden">
          {/* ---------- session header ---------- */}
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b px-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-sm">
                <Mic className="size-4" />
              </span>
              <span className="text-foreground text-sm font-semibold">
                Holloway Audio
              </span>
              <Separator orientation="vertical" className="h-5" />
              <span className="text-muted-foreground min-w-0 truncate text-sm">
                Studio B · The Quiet Hours · Ep. 47
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-md border px-2.5 py-1.5">
                <span className="bg-destructive-500 size-2 rounded-full" />
                <span className="text-foreground text-[11px] font-semibold tracking-wide">
                  REC
                </span>
                <span className="text-muted-foreground font-code text-xs tabular-nums">
                  00:42:17
                </span>
              </span>
              <Button variant="outline" size="sm">
                <BookmarkPlus data-slot="icon" />
                Marker
              </Button>
              <Button variant="ghost" size="sm">
                Session notes
              </Button>
              <Avatar size="sm">
                <AvatarFallback>IK</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* ---------- transport bar ---------- */}
          <div className="flex h-12 shrink-0 items-center justify-between gap-4 border-b px-4">
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon-sm" aria-label="Back 15 seconds">
                <SkipBack />
              </Button>
              <Button size="icon-sm" aria-label="Play / pause">
                <Play />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Forward 15 seconds">
                <SkipForward />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Stop recording">
                <Square />
              </Button>
              <span className="text-muted-foreground ml-2 font-code text-xs tabular-nums">
                00:42:17
              </span>
              <span className="text-muted-foreground/70 font-code text-xs tabular-nums">
                / ~01:15:00
              </span>
              <Badge variant="secondary" className="ml-1 font-code">
                Take 3
              </Badge>
            </div>
            <p className="text-muted-foreground font-code text-xs">
              48 kHz · 24-bit · 128 smp
            </p>
          </div>

          {/* ---------- console ---------- */}
          <main className="flex min-h-0 flex-1 flex-col p-4">
            <Card className="flex min-h-0 flex-1 flex-col gap-0 rounded-lg py-0">
              <CardHeader className="items-center border-b px-5 py-3.5 [.border-b]:pb-3.5">
                <CardTitle className="text-sm">Channels · 6 inputs</CardTitle>
                <span className="text-muted-foreground text-xs">
                  Preamp gain staging · Ultraseries 8P
                </span>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col px-0">
                {CHANNELS.map((ch, i) => (
                  <div
                    key={ch.num}
                    className={`flex flex-1 items-center gap-4 px-5 ${
                      i > 0 ? "border-t" : ""
                    } ${ch.mute ? "opacity-60" : ""}`}
                  >
                    <span className="text-muted-foreground w-6 shrink-0 font-code text-xs">
                      {ch.num}
                    </span>
                    <div className="w-[240px] shrink-0 leading-tight">
                      <p className="text-foreground truncate text-sm font-medium">
                        {ch.name}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {ch.source}
                      </p>
                    </div>
                    <Meter level={ch.level} />
                    <span className="text-muted-foreground w-[72px] shrink-0 text-right font-code text-xs tabular-nums">
                      {ch.peak} dB
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <MsrButton label="M" active={ch.mute} title="Mute" />
                      <MsrButton label="S" active={ch.solo} title="Solo" />
                      <MsrButton label="R" active={ch.armed} title="Record arm" />
                    </div>
                  </div>
                ))}
                {/* master bus */}
                <div className="mt-auto flex items-center gap-4 border-t px-5 py-3">
                  <span className="text-muted-foreground font-code text-xs uppercase tracking-[0.1em]">
                    Master
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    Stereo out · L/R
                  </span>
                  <Progress value={68} className="max-w-[280px] flex-1" />
                  <span className="text-muted-foreground font-code text-xs tabular-nums">
                    −6.8 dBFS
                  </span>
                  <Badge variant="outline" className="ml-auto font-code">
                    −14 LUFS target
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </main>

          {/* ---------- status footer ---------- */}
          <footer className="text-muted-foreground flex h-10 shrink-0 items-center justify-between border-t px-4 font-code text-xs">
            <span className="flex items-center gap-4">
              <span>48 kHz · 24-bit float · 128 samples</span>
              <span>Disk 61% — 312 GB free</span>
              <span>CPU 14%</span>
            </span>
            <span className="flex items-center gap-4">
              <span>Autosaved 14:32</span>
              <span>Console 4.2.1</span>
            </span>
          </footer>

          {/* ---------- right sheet: channel 01 input detail (open at render) ---------- */}
          <DrawerContent className="w-[400px] max-w-[400px] sm:max-w-[400px]">
            <DrawerHeader className="border-b pb-4">
              <DrawerTitle>Shure SM7B · Host</DrawerTitle>
              <DrawerDescription>
                Channel 01 · XLR in 1 · preamp A · Iris Kwan
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col gap-5 px-4 py-5">
              {/* input gain */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gain">Input gain</Label>
                  <span className="text-foreground font-code text-sm tabular-nums">
                    52.0 dB
                  </span>
                </div>
                <Slider
                  aria-label="Input gain"
                  defaultValue={[52]}
                  min={0}
                  max={60}
                  step={0.5}
                />
                <p className="text-muted-foreground text-xs">
                  Cloudlifter CL-1 inline · clean headroom to −6 dBFS
                </p>
              </div>

              <Separator />

              {/* processing switches */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="leading-tight">
                    <Label>48 V phantom power</Label>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Dynamic capsule — keep off
                    </p>
                  </div>
                  <Switch aria-label="48 V phantom power" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="leading-tight">
                    <Label>High-pass filter · 80 Hz</Label>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Rumble and plosive cut
                    </p>
                  </div>
                  <Switch aria-label="High-pass filter 80 hertz" defaultChecked />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="leading-tight">
                    <Label>−20 dB pad</Label>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Engaged only for loud sources
                    </p>
                  </div>
                  <Switch aria-label="Minus 20 decibel pad" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="leading-tight">
                    <Label>Phase invert Ø</Label>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Matched with room pair
                    </p>
                  </div>
                  <Switch aria-label="Phase invert" />
                </div>
              </div>

              <Separator />

              {/* input level */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label>Input level</Label>
                  <span className="text-foreground font-code text-sm tabular-nums">
                    −3.2 dBFS peak
                  </span>
                </div>
                <Progress value={82} aria-label="Channel input level" />
                <p className="text-muted-foreground text-xs">
                  Headroom 12.8 dB · nominal −18 dBFS
                </p>
              </div>

              <Separator />

              {/* dynamics */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gate">Noise gate threshold</Label>
                    <span className="text-foreground font-code text-sm tabular-nums">
                      −48 dB
                    </span>
                  </div>
                  <Slider
                    aria-label="Noise gate threshold"
                    defaultValue={[-48]}
                    min={-80}
                    max={0}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Compressor ratio</Label>
                    <span className="text-foreground font-code text-sm tabular-nums">
                      2.75 : 1
                    </span>
                  </div>
                  <Slider
                    aria-label="Compressor ratio"
                    defaultValue={[2.75]}
                    min={1}
                    max={8}
                    step={0.25}
                  />
                  <p className="text-muted-foreground text-xs">
                    Soft knee · 3 dB reduction on peaks · makeup auto
                  </p>
                </div>
              </div>
            </div>

            <DrawerFooter className="border-t">
              <div className="flex items-center gap-2">
                <Button size="sm">Save preset</Button>
                <DrawerClose render={<Button variant="outline" size="sm">Close sheet</Button>} />
              </div>
              <p className="text-muted-foreground flex items-center justify-center gap-1.5 pt-1 text-xs">
                <GripVertical className="size-3.5" />
                Drag the sheet toward the right edge to dismiss
              </p>
            </DrawerFooter>
          </DrawerContent>
        </div>
      </Drawer>
    </EvalShell>
  );
}
