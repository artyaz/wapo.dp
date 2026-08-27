"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import {
  ArrowLeft,
  AudioWaveform,
  Check,
  Copy,
  Eye,
  Lock,
  Save,
  Scissors,
  Trash2,
} from "lucide-react";

import { TransportBar } from "@/components/ds/TransportBar";
import { GlassChip } from "@/components/ds/GlassChip";
import { MediaClip } from "@/components/ds/MediaClip";

/**
 * pair-131 — RTL (Hebrew) multi-step "publish episode" wizard, step 2 of 4
 * (Media), on a 1024×768 laptop window, light theme.
 *
 * Layout: header with the episode title + a ds:GlassChip command capsule
 * (save draft / preview / destructive delete); a 4-step wizard rail; the main
 * media card holding a media timeline built from three ds:MediaClip lanes
 * (video · selected, audio · default, text · locked) with in/out markers and a
 * playhead, plus a centered ds:TransportBar at the bottom of the card; an
 * aside with wizard progress and uploaded assets; footer step navigation.
 *
 * The timeline strip is dir="ltr" (standard for media editors even in RTL
 * products) so timecode geometry stays physical; all form chrome is RTL.
 */

const TICKS = ["00:00", "04:40", "09:20", "14:00", "18:40"];

const STEPS = [
  { n: 1, label: "פרטים", status: "הושלם", state: "done" },
  { n: 2, label: "מדיה", status: "שלב נוכחי", state: "current" },
  { n: 3, label: "עטיפה", status: "", state: "todo" },
  { n: 4, label: "פרסום", status: "", state: "todo" },
] as const;

const ASSETS = [
  { name: "teaser-reel.mp4", meta: "04:51 · 84 MB", locked: false },
  { name: "intro-theme.wav", meta: "04:06 · 5.2 MB", locked: false },
  { name: "narration.txt", meta: "נעול", locked: true },
] as const;

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="flex min-h-screen flex-col bg-neutral-50">
        {/* ── header — episode title + ds:GlassChip command capsule ── */}
        <header className="flex h-14 flex-none items-center justify-between gap-4 border-b border-solid border-default-border bg-panel px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-brand-primary text-brand-primary-foreground">
              <AudioWaveform className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold leading-5 text-default-font">
                פרק 12 — קולות העיר
              </p>
              <p className="text-caption font-caption leading-4 text-neutral-500">
                אשף פרסום · טיוטה נשמרה לפני 4 דקות
              </p>
            </div>
          </div>
          <GlassChip className="flex-none">
            <GlassChip.Action
              glyph={<Save className="size-[13px]" />}
              label="שמירת טיוטה"
            />
            <GlassChip.Rule />
            <GlassChip.Action
              glyph={<Eye className="size-[13px]" />}
              label="תצוגה מקדימה"
            />
            <GlassChip.Rule />
            <GlassChip.Action
              glyph={<Trash2 className="size-[13px]" />}
              label="מחיקת פרק"
              tone="destructive"
            />
          </GlassChip>
        </header>

        {/* ── wizard rail ─────────────────────────────────────────── */}
        <nav className="flex flex-none items-center gap-2 border-b border-solid border-default-border bg-panel px-8 py-3">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.n}>
              {i > 0 && (
                <span className="mx-1 h-px w-8 flex-none bg-default-border" />
              )}
              <div className="flex items-center gap-2">
                <span
                  className={
                    step.state === "done"
                      ? "flex size-6 flex-none items-center justify-center rounded-full border border-solid border-default-border bg-panel text-default-font"
                      : step.state === "current"
                        ? "flex size-6 flex-none items-center justify-center rounded-full bg-brand-primary font-code text-[11px] text-brand-primary-foreground"
                        : "flex size-6 flex-none items-center justify-center rounded-full border border-solid border-default-border font-code text-[11px] text-neutral-400"
                  }
                >
                  {step.state === "done" ? (
                    <Check className="size-3" />
                  ) : (
                    step.n
                  )}
                </span>
                <span
                  className={
                    step.state === "current"
                      ? "text-[13px] font-semibold text-default-font"
                      : "text-[13px] text-neutral-500"
                  }
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </nav>

        {/* ── main — media card + progress aside ──────────────────── */}
        <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_280px] gap-5 px-8 py-5">
          {/* media card */}
          <section className="flex h-full min-w-0 flex-col rounded-2xl border border-solid border-default-border bg-panel p-5">
            <div className="flex flex-none flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold leading-5 text-default-font">
                  מדיה · ציר הזמן
                </h2>
                <p className="mt-0.5 text-caption font-caption leading-4 text-neutral-500">
                  פרק 12 · סדרה ״סיפורי שוק״ · אורך כולל{" "}
                  <span dir="ltr">18:40</span>
                </p>
              </div>
              <GlassChip className="flex-none">
                <GlassChip.Action
                  glyph={<Scissors className="size-[13px]" />}
                  label="חיתוך"
                />
                <GlassChip.Rule />
                <GlassChip.Action
                  glyph={<Copy className="size-[13px]" />}
                  label="שכפול"
                />
                <GlassChip.Rule />
                <GlassChip.Action
                  glyph={<Trash2 className="size-[13px]" />}
                  label="הסרה"
                  tone="destructive"
                />
              </GlassChip>
            </div>

            {/* timeline strip — dir=ltr like real media editors */}
            <div
              dir="ltr"
              className="mt-4 flex min-h-0 flex-1 flex-col justify-center"
            >
              <div className="relative flex h-4 items-start justify-between border-b border-solid border-default-border">
                {TICKS.map((tick) => (
                  <span
                    key={tick}
                    className="font-code text-[10px] text-neutral-400"
                  >
                    {tick}
                  </span>
                ))}
                <div
                  className="absolute inset-y-0 w-px bg-neutral-700"
                  style={{ left: "8%" }}
                />
                <div
                  className="absolute inset-y-0 w-px bg-neutral-700"
                  style={{ left: "34%" }}
                />
              </div>

              <div className="relative mt-2 flex flex-col gap-1.5">
                <div className="relative h-16 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                  <MediaClip
                    kind="video"
                    state="selected"
                    label="teaser-reel.mp4"
                    duration="04:51"
                    className="absolute"
                    style={{ left: "8%", width: "26%" }}
                  />
                </div>
                <div className="relative h-16 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                  <MediaClip
                    kind="audio"
                    state="default"
                    label="intro-theme.wav"
                    duration="04:06"
                    className="absolute"
                    style={{ left: "38%", width: "22%" }}
                  />
                </div>
                <div className="relative h-16 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                  <MediaClip
                    kind="text"
                    state="locked"
                    label="narration.txt"
                    duration="05:36"
                    caption="Cold-open narration — take 3"
                    className="absolute"
                    style={{ left: "64%", width: "30%" }}
                  />
                </div>
                {/* playhead parked at the selected clip's out point */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-px bg-neutral-700"
                  style={{ left: "34%" }}
                >
                  <div className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-700" />
                </div>
              </div>

              <div className="relative mt-1.5 h-4">
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: "8%" }}
                >
                  in 01:30.000
                </span>
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: "34%" }}
                >
                  out 06:21.000
                </span>
                <span
                  className="absolute font-code text-[10px] text-neutral-400"
                  style={{ left: "64%" }}
                >
                  locked
                </span>
              </div>
            </div>

            {/* transport — ds:TransportBar */}
            <div
              dir="ltr"
              className="mt-5 flex flex-none justify-center border-t border-solid border-default-border pt-4"
            >
              <TransportBar
                currentTime="06:21"
                totalTime="18:40"
                speed="1.0×"
              />
            </div>
          </section>

          {/* aside — wizard progress + uploaded assets */}
          <aside className="flex min-w-0 flex-col gap-4">
            <div className="rounded-2xl border border-solid border-default-border bg-panel p-4">
              <h3 className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                התקדמות באשף
              </h3>
              <ol className="mt-3 flex flex-col gap-2.5">
                {STEPS.map((step) => (
                  <li key={step.n} className="flex items-center gap-2.5">
                    <span
                      className={
                        step.state === "done"
                          ? "flex size-5 flex-none items-center justify-center rounded-full border border-solid border-default-border text-default-font"
                          : step.state === "current"
                            ? "flex size-5 flex-none items-center justify-center rounded-full bg-brand-primary font-code text-[10px] text-brand-primary-foreground"
                            : "flex size-5 flex-none items-center justify-center rounded-full border border-solid border-default-border font-code text-[10px] text-neutral-400"
                      }
                    >
                      {step.state === "done" ? (
                        <Check className="size-3" />
                      ) : (
                        step.n
                      )}
                    </span>
                    <span
                      className={
                        step.state === "current"
                          ? "text-[13px] font-semibold text-default-font"
                          : "text-[13px] text-neutral-500"
                      }
                    >
                      {step.label}
                    </span>
                    {step.status ? (
                      <span className="ms-auto text-[11px] text-neutral-400">
                        {step.status}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex-1 rounded-2xl border border-solid border-default-border bg-panel p-4">
              <h3 className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                נכסים שהועלו
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {ASSETS.map((asset) => (
                  <li key={asset.name} className="flex items-center gap-2.5">
                    <span
                      className={
                        asset.locked
                          ? "size-1.5 flex-none rounded-full bg-neutral-300"
                          : "size-1.5 flex-none rounded-full bg-neutral-600"
                      }
                    />
                    <span
                      dir="ltr"
                      className="min-w-0 truncate font-code text-[12px] text-default-font"
                    >
                      {asset.name}
                    </span>
                    <span className="ms-auto flex flex-none items-center gap-1 text-[11px] text-neutral-400">
                      {asset.locked ? <Lock className="size-3" /> : null}
                      <span dir={asset.locked ? undefined : "ltr"}>
                        {asset.meta}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-neutral-100 px-3 py-2 text-[11px] leading-4 text-neutral-500">
                גררו קטעים בציר הזמן כדי לסדרם מחדש. קטע נעול אינו ניתן להזזה
                עד לשחרורו.
              </p>
            </div>
          </aside>
        </main>

        {/* ── footer — step navigation ────────────────────────────── */}
        <footer className="flex h-16 flex-none items-center justify-between border-t border-solid border-default-border bg-panel px-8">
          <p className="text-caption font-caption text-neutral-500">
            שלב 2 מתוך 4 · מדיה
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="h-9 rounded-full border border-solid border-default-border px-4 text-[13px] font-medium text-default-font transition-colors hover:bg-neutral-100"
            >
              חזרה
            </button>
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-full bg-brand-primary px-5 text-[13px] font-semibold text-brand-primary-foreground transition-colors hover:bg-neutral-700"
            >
              המשך · עטיפה
              <ArrowLeft className="size-4" />
            </button>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
