"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { TimelineRuler } from "@/components/ds/TimelineRuler";
import { AskBar } from "@/components/ds/AskBar";
import { Check, ChevronRight, Clock3 } from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col">
        {/* ---- App header ---- */}
        <header className="flex items-center gap-3 px-4 pb-3 pt-4">
          <Button
            variant="outline"
            size="icon"
            aria-label="חזרה לשלב הקודם"
            className="shrink-0"
          >
            <ChevronRight className="size-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-semibold leading-snug text-default-font">
              דיווח על תקלה בשירות התשלומים
            </h1>
            <p className="mt-0.5 font-code text-[10px] tracking-[0.04em] text-neutral-500">
              INC-2417 · שלב 2 מתוך 4 · מועד וזמן ההתרחשות
            </p>
          </div>
        </header>
        <div className="h-1 w-full bg-muted">
          <div className="h-full w-1/2 bg-primary" />
        </div>

        {/* ---- Stepper ---- */}
        <nav aria-label="שלבי הטופס" className="px-4 pt-4">
          <ol className="flex items-start">
            <li className="flex w-1/4 flex-col items-center gap-1.5 text-center">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[10px] leading-[1.35] text-neutral-500">
                פרטי האירוע הכלליים
              </span>
            </li>
            <li className="flex w-1/4 flex-col items-center gap-1.5 text-center">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground ring-4 ring-primary/15">
                2
              </span>
              <span className="text-[10px] font-medium leading-[1.35] text-default-font">
                מועד וזמן ההתרחשות
              </span>
            </li>
            <li className="flex w-1/4 flex-col items-center gap-1.5 text-center">
              <span className="flex size-6 items-center justify-center rounded-full border border-solid border-default-border text-[11px] font-medium text-neutral-400">
                3
              </span>
              <span className="text-[10px] leading-[1.35] text-neutral-400">
                תיאור מפורט והשפעה על הלקוחות
              </span>
            </li>
            <li className="flex w-1/4 flex-col items-center gap-1.5 text-center">
              <span className="flex size-6 items-center justify-center rounded-full border border-solid border-default-border text-[11px] font-medium text-neutral-400">
                4
              </span>
              <span className="text-[10px] leading-[1.35] text-neutral-400">
                אישור, סקירה ושליחה למשמרת
              </span>
            </li>
          </ol>
        </nav>

        {/* ---- Step 2: mark the incident moment on the recording timeline ---- */}
        <section className="px-4 pt-5">
          <h2 className="flex items-center gap-1.5 text-[13px] font-semibold text-default-font">
            <Clock3 className="size-3.5 text-neutral-400" />
            מתי החלה התקלה להופיע ברישום?
          </h2>
          <p className="mt-1.5 text-[11.5px] leading-[1.65] text-neutral-500">
            גררו את נקודת הסימון לאורך ציר הזמן של הרישום החי וסמנו את הרגע
            המדויק שבו הופיעה הודעת השגיאה הראשונה אצל הלקוחות. הציר מכסה שתי
            דקות של ניטור רציף ברזולוציה של 24 פיקסלים לשנייה.
          </p>

          <div className="mt-3 rounded-lg border border-solid border-default-border bg-panel p-3">
            <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-destructive-50 px-2 py-1 text-[10.5px] font-medium text-destructive-600">
                <span className="size-1.5 rounded-full bg-destructive-500" />
                נקודת סימון · 01:55
              </span>
              <span className="inline-flex items-center rounded-sm border border-solid border-default-border px-2 py-1 font-code text-[10px] tabular-nums text-neutral-500">
                טווח נבחר 01:51 – 01:57
              </span>
              <span className="inline-flex items-center gap-1 rounded-sm border border-solid border-default-border px-2 py-1 text-[10px] text-neutral-500">
                ◆ 12 אירועים מתועדים ביומן
              </span>
            </div>

            <div className="relative">
              <div className="overflow-x-auto">
                <div className="relative h-[34px] w-[2880px]">
                  <TimelineRuler />
                  <div className="absolute bottom-0 left-[2664px] top-0 w-[144px] border-x border-solid border-brand-primary/50 bg-brand-primary/10" />
                  <div className="absolute bottom-0 left-[2759px] top-0 w-0.5 bg-destructive-500" />
                  <span className="absolute bottom-[3px] left-[2754px] size-[9px] rotate-45 bg-destructive-500" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-panel to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-panel to-transparent" />
            </div>

            <p className="mt-2 font-code text-[10px] text-neutral-400">
              00:00 – 02:00 · פס גדול כל 10 שניות · גרירה שמאלה חושפת את תחילת
              הרישום
            </p>
          </div>
        </section>

        {/* ---- Recap of the previous step ---- */}
        <section className="px-4 pt-4">
          <div className="rounded-lg border border-solid border-default-border bg-panel p-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-[12px] font-semibold text-default-font">
                סיכום השלב הקודם · פרטי האירוע
              </h3>
              <Button
                variant="link"
                size="xs"
                className="h-auto shrink-0 p-0 text-[11px]"
              >
                עריכה
              </Button>
            </div>
            <dl className="mt-2 space-y-1.5">
              <div className="flex gap-2">
                <dt className="w-[70px] shrink-0 text-[10.5px] leading-[1.5] text-neutral-400">
                  שירות מושפע
                </dt>
                <dd className="min-w-0 flex-1 text-[11px] leading-[1.5] text-neutral-700">
                  api-payments · סביבת הייצור prod-eu-west-1
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[70px] shrink-0 text-[10.5px] leading-[1.5] text-neutral-400">
                  חומרה ראשונית
                </dt>
                <dd className="min-w-0 flex-1 text-[11px] leading-[1.5] text-neutral-700">
                  גבוהה — כ-100% מעסקאות האשראי נדחו במשך 4 דקות רצופות
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[70px] shrink-0 text-[10.5px] leading-[1.5] text-neutral-400">
                  מדווח התקלה
                </dt>
                <dd className="min-w-0 flex-1 text-[11px] leading-[1.5] text-neutral-700">
                  דנה לוי · צוות אמינות התשתית (SRE), משמרת בוקר
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---- Form actions + keyboard shortcuts ---- */}
        <section className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <Button className="h-10 flex-1 text-[13px]">
              המשך לשלב 3
              <Kbd data-icon="inline-end" className="translate-x-0.5">
                ⏎
              </Kbd>
            </Button>
            <Button variant="outline" className="h-10 text-[13px]">
              שמירת טיוטה
              <Kbd data-icon="inline-end" className="translate-x-0.5">
                ⌘S
              </Kbd>
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] text-neutral-400">
            <span>קיצורי מקלדת למקלדת חיצונית:</span>
            <KbdGroup>
              <Kbd>⇧</Kbd>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <span>פתיחת העוזר החכם בתוך הטופס</span>
          </div>
        </section>

        {/* ---- In-form assistant (persistent) ---- */}
        <footer className="mt-auto">
          <div className="border-t border-solid border-default-border" />
          <AskBar
            placeholder="שאלו את העוזר על ציר הזמן או על שלבי הטופס…"
            statusText="העוזר מפנה ליומן הרשומה ול-12 האירועים המסומנים בציר הזמן של הרישום החי."
          />
        </footer>
      </main>
    </EvalShell>
  );
}
