"use client";

import React from "react";
import {
  AudioLines,
  ChevronsUpDown,
  Mic,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Square,
  Trash2,
  Volume2,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";

/* ------------------------------------------------------------------ data */

const microphones = [
  { value: "shure", label: "Shure MV7", detail: "USB · מיקרופון קרוב" },
  { value: "macbook", label: "מיקרופון MacBook Pro", detail: "מובנה · כניסה פנימית" },
  { value: "airpods", label: "AirPods Pro", detail: "Bluetooth · כיסוי רעש" },
  { value: "scarlett", label: "Scarlett 2i2", detail: "USB · כניסת ליין" },
];

const qualities = [
  "אולפן · WAV 48kHz/24bit",
  "גבוהה · AAC 256kbps",
  "סטנדרטית · AAC 128kbps",
  "קולית · Opus 32kbps",
] as const;

const recordings = [
  {
    id: "live",
    title: "הקלטה חדשה — פיילוט פרק 1",
    meta: "מקליט עכשיו · 00:42",
    live: true,
  },
  {
    id: "r1",
    title: "פגישת צוות — סיכום רבעון",
    meta: "היום 10:24 · 12:36",
  },
  { id: "r2", title: "רעיונות לפודקאסט", meta: "אתמול 18:02 · 04:58" },
  { id: "r3", title: "הערה קולית — רשימת קניות", meta: "אתמול 09:41 · 01:12" },
  { id: "r4", title: "ראיון עם דנה — טיוטה", meta: "לפני 3 ימים · 32:40" },
  { id: "r5", title: "סקירת עיצוב גרסה 2", meta: "לפני שבוע · 08:03" },
];

const transcript = [
  { t: "00:00", text: "יש לי רעיון לפרק הבא של הפודקאסט —" },
  { t: "00:07", text: "משהו בסגנון של ראיונות קצרים, עשר דקות לכל אורח." },
  { t: "00:15", text: "ננסה להקליט פיילוט עם דנה בשבוע הבא," },
  { t: "00:23", text: "ואז נשמע איך זה מרגיש עם מוזיקת פתיחה קצרה." },
  { t: "00:31", text: "פתק לעצמי: לבדוק את המיקרופון החדש לפני ההקלטה." },
  { t: "00:38", text: "בוא נרשום גם את רשימת השאלות למפגש ההכנה…" },
];

/** deterministic live-input "waveform" (no randomness) */
const WAVE = Array.from({ length: 96 }, (_, i) => {
  const a = Math.abs(Math.sin(i * 0.55));
  const b = Math.abs(Math.sin(i * 0.21 + 1.3));
  const c = Math.abs(Math.sin(i * 1.7 + 0.4)) * 0.35;
  return Math.round(Math.min(1, Math.max(0.1, a * 0.45 + b * 0.35 + c)) * 100);
});

const LEVELS = [40, 72, 55, 88, 64, 30];

/* ------------------------------------------------------------------ page */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ------------------------------------------------ app header */}
        <header className="bg-background/60 flex h-14 shrink-0 items-center gap-3 border-b px-5">
          <div className="bg-foreground text-background flex size-8 items-center justify-center rounded-lg">
            <AudioLines className="size-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-sm leading-none font-semibold">פתקי קול</p>
            <p className="text-muted-foreground text-xs leading-none">
              אולפן הקלטות
            </p>
          </div>

          <div className="ms-auto flex items-center gap-4">
            <span className="text-muted-foreground flex items-center gap-2 text-xs">
              <Search className="size-3.5" />
              חיפוש בהקלטות
              <KbdGroup className="ms-1">
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </span>
            <button
              type="button"
              aria-label="הגדרות"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-8 items-center justify-center rounded-md transition-colors"
            >
              <Settings2 className="size-4" />
            </button>
          </div>
        </header>

        {/* ------------------------------------------------ main studio */}
        <main className="min-h-0 flex-1 p-4">
          <ResizablePanelGroup
            direction="horizontal"
            className="bg-card/40 h-full rounded-2xl border shadow-sm"
          >
            {/* recordings library (renders on the right in RTL) */}
            <ResizablePanel defaultSize={27} minSize={20}>
              <div className="flex h-full flex-col">
                <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
                  <p className="text-sm font-semibold">הקלטות</p>
                  <span className="text-muted-foreground rounded-full border px-2 py-0.5 text-xs tabular-nums">
                    {recordings.length}
                  </span>
                </div>

                <ul className="flex-1 divide-y overflow-hidden">
                  {recordings.map((r) => (
                    <li
                      key={r.id}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        r.live ? "bg-accent/40" : ""
                      }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                          r.live
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {r.live ? (
                          <span className="bg-destructive size-2 animate-pulse rounded-full" />
                        ) : (
                          <Play className="size-3.5" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm leading-none font-medium">
                          {r.title}
                        </p>
                        <p className="text-muted-foreground mt-1.5 truncate text-xs leading-none">
                          {r.live ? (
                            <span className="text-destructive font-medium">
                              מקליט ●{" "}
                            </span>
                          ) : null}
                          {r.meta}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="shrink-0 border-t p-3">
                  <Button variant="outline" className="w-full justify-center">
                    <Plus className="size-4" />
                    הקלטה חדשה
                  </Button>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* recorder column */}
            <ResizablePanel defaultSize={73} minSize={40}>
              <ResizablePanelGroup direction="vertical">
                {/* capture deck */}
                <ResizablePanel defaultSize={58} minSize={30}>
                  <div className="flex h-full flex-col justify-between px-6 py-4">
                    {/* input settings row */}
                    <div className="flex flex-wrap items-end gap-4">
                      <div className="flex min-w-0 flex-col gap-1.5">
                        <span className="text-muted-foreground text-xs leading-none">
                          מקלטת קלט
                        </span>
                        <Combobox
                          items={microphones}
                          defaultValue={microphones[0]}
                          autoHighlight
                        >
                          <ComboboxTrigger
                            render={
                              <Button
                                variant="outline"
                                className="h-9 w-72 justify-between gap-2 font-normal"
                              />
                            }
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <Mic className="text-muted-foreground size-4 shrink-0" />
                              <ComboboxValue />
                            </span>
                            <ChevronsUpDown className="text-muted-foreground size-4 shrink-0" />
                          </ComboboxTrigger>
                          <ComboboxContent dir="rtl">
                            <ComboboxInput
                              showTrigger={false}
                              placeholder="חיפוש מקלטת…"
                            />
                            <ComboboxEmpty>לא נמצאו מקלטות.</ComboboxEmpty>
                            <ComboboxList>
                              {(item: (typeof microphones)[number]) => (
                                <ComboboxItem key={item.value} value={item}>
                                  <span className="flex min-w-0 flex-col">
                                    <span className="truncate">
                                      {item.label}
                                    </span>
                                    <span className="text-muted-foreground truncate text-xs">
                                      {item.detail}
                                    </span>
                                  </span>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>

                      <div className="flex min-w-0 flex-col gap-1.5">
                        <span className="text-muted-foreground text-xs leading-none">
                          איכות הקלטה
                        </span>
                        <Combobox
                          items={qualities}
                          defaultValue={qualities[0]}
                          autoHighlight
                        >
                          <ComboboxInput
                            aria-label="איכות הקלטה"
                            className="h-9 w-60 text-sm"
                          />
                          <ComboboxContent dir="rtl">
                            <ComboboxEmpty>לא נמצאו פורמטים.</ComboboxEmpty>
                            <ComboboxList>
                              {(item: (typeof qualities)[number]) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>

                      {/* input level meter */}
                      <div className="ms-auto flex flex-col items-end gap-1.5">
                        <span className="text-muted-foreground text-xs leading-none">
                          עוצמת כניסה · ‎-12 dB
                        </span>
                        <div className="flex h-9 items-end gap-1 border px-3 py-1.5">
                          {LEVELS.map((h, i) => (
                            <span
                              key={i}
                              className={`w-1 rounded-full ${
                                i >= LEVELS.length - 2
                                  ? "bg-foreground/25"
                                  : "bg-foreground/70"
                              }`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* timer + live waveform */}
                    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-destructive size-2.5 animate-pulse rounded-full" />
                        <p className="text-4xl font-light tabular-nums">
                          00:42
                        </p>
                        <span className="text-destructive rounded-full border border-destructive/40 px-2.5 py-1 text-xs font-medium">
                          מקליט
                        </span>
                      </div>

                      <div className="flex h-24 w-full max-w-2xl items-center gap-[3px]">
                        {WAVE.map((h, i) => (
                          <div
                            key={i}
                            className="flex h-full flex-1 items-center"
                          >
                            <span
                              className={`w-full rounded-full ${
                                h > 55
                                  ? "bg-foreground/80"
                                  : h > 25
                                    ? "bg-foreground/50"
                                    : "bg-foreground/25"
                              }`}
                              style={{ height: `${h}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* transport + shortcuts */}
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="התחל מחדש"
                          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-10 items-center justify-center rounded-full transition-colors"
                        >
                          <RotateCcw className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="עצור"
                          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-10 items-center justify-center rounded-full transition-colors"
                        >
                          <Square className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="השהיה"
                          className="bg-foreground text-background hover:bg-foreground/90 mx-2 flex size-14 items-center justify-center rounded-full transition-colors"
                        >
                          <Pause className="size-5" />
                        </button>
                        <button
                          type="button"
                          aria-label="מחיקה"
                          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-10 items-center justify-center rounded-full transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="האזנה חיה"
                          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-10 items-center justify-center rounded-full transition-colors"
                        >
                          <Volume2 className="size-4" />
                        </button>
                      </div>

                      <div className="text-muted-foreground flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Kbd>Space</Kbd> השהיה
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Kbd>R</Kbd> מחדש
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Kbd>M</Kbd> השתקה
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Kbd>Esc</Kbd> ביטול
                        </span>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* live transcript */}
                <ResizablePanel defaultSize={42} minSize={20}>
                  <div className="flex h-full flex-col">
                    <div className="flex h-12 shrink-0 items-center justify-between border-b px-5">
                      <p className="text-sm font-semibold">תמליל אוטומטי</p>
                      <span className="text-muted-foreground flex items-center gap-2 text-xs">
                        עברית · דיוק 96%
                        <span className="bg-foreground/15 rounded-full px-2 py-0.5">
                          מאזין…
                        </span>
                      </span>
                    </div>

                    <ol className="flex-1 space-y-3 overflow-hidden px-5 py-4">
                      {transcript.map((line) => (
                        <li key={line.t} className="flex items-start gap-3">
                          <span className="text-muted-foreground w-10 shrink-0 pt-0.5 font-mono text-xs tabular-nums">
                            {line.t}
                          </span>
                          <p className="text-sm leading-relaxed">
                            {line.text}
                          </p>
                        </li>
                      ))}
                    </ol>

                    <div className="flex shrink-0 items-center justify-between gap-3 border-t px-5 py-3">
                      <p className="text-muted-foreground text-xs">
                        התמליל נשמר אוטומטית עם ההקלטה
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost">מיון לפי רמקול</Button>
                        <Button>
                          שמירת טיוטה
                          <Kbd data-icon="inline-end" className="ms-0.5">
                            ⌘S
                          </Kbd>
                        </Button>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </EvalShell>
  );
}
