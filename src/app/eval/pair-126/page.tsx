"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import { Download, Link2, Settings2, Trash2 } from "lucide-react";

import { GlassChip } from "@/components/ds/GlassChip";
import { Button } from "@/components/ds/Button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * pair-126 — compact RTL (Hebrew) "share document" sheet on the bottom half of
 * a phone (390×420, light, dense content).
 *
 * Layout: sheet header with a long dense document name (exercises truncation),
 * a GlassChip quick-action capsule (copy / download / comment / destructive
 * delete), and a bottom action bar whose secondary Button opens the
 * "advanced link settings" popover — rendered OPEN (defaultOpen, side=top,
 * dir=rtl) so its dense settings + footer Buttons are visible in the capture.
 * The middle band is intentionally left as the popover landing area.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="flex h-screen flex-col overflow-hidden border-t border-border bg-muted/50">
        {/* ── sheet header — long dense document title ─────────────── */}
        <header data-qa="header" className="flex-none px-4 pb-3 pt-2">
          <div className="mx-auto h-1 w-10 rounded-full bg-default-border" />
          <div className="mt-2 flex items-center justify-between gap-2">
            <h1 className="text-[15px] font-semibold leading-5 text-foreground">
              שיתוף מסמך
            </h1>
            <span className="text-[11px] leading-4 text-muted-foreground">
              3 מוזמנים · טיוטה
            </span>
          </div>
          <p className="mt-1.5 truncate text-[13px] font-medium leading-5 text-foreground">
            תלקיט הערכת ביצועים למחלקת מחקר ופיתוח — סיכום רבעוני מפורט, גרסה
            14.pdf
          </p>
          <p className="mt-0.5 truncate text-[11px] leading-4 text-muted-foreground">
            נערך לפני 12 דקות · 2.4 מ״ב · מאת ד״ר מרים בן־הרוש
          </p>
        </header>

        {/* ── quick actions — ds:GlassChip command capsule ─────────── */}
        <section
          data-qa="chip"
          className="flex flex-none justify-center px-4 py-2.5"
        >
          <GlassChip className="max-w-full">
            <GlassChip.Action
              glyph={<Link2 className="size-[13px]" />}
              label="העתקת קישור"
            />
            <GlassChip.Rule />
            <GlassChip.Action
              glyph={<Download className="size-[13px]" />}
              label="הורדה"
            />
            <GlassChip.Rule />
            <GlassChip.Action
              glyph={<Trash2 className="size-[13px]" />}
              label="מחיקה"
              tone="destructive"
            />
          </GlassChip>
        </section>

        {/* ── popover landing band (the open popover floats here) ──── */}
        <div data-qa="middle" className="relative min-h-0 flex-1">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(28, 27, 23, 0.05) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        {/* ── action bar — ds:Button + ui:popover ──────────────────── */}
        <footer
          data-qa="footer"
          className="flex flex-none items-center gap-2 border-t border-border bg-panel/80 px-4 py-3 backdrop-blur-xl"
        >
          <Popover defaultOpen>
            <PopoverTrigger
              render={
                <Button
                  variant="secondary"
                  icon={<Settings2 className="size-4" />}
                >
                  אפשרויות שיתוף
                </Button>
              }
            />
            <PopoverContent
              side="top"
              dir="rtl"
              align="start"
              sideOffset={12}
              className="w-[300px] p-3.5"
            >
              <PopoverHeader>
                <PopoverTitle className="text-base font-semibold">
                  הגדרות קישור מתקדמות
                </PopoverTitle>
                <PopoverDescription className="text-[13px] leading-[18px]">
                  כל מי שמחזיק בקישור יוכל לצפות ולהוריד, אלא אם תגבילו את
                  הגישה למוזמנים בלבד.
                </PopoverDescription>
              </PopoverHeader>

              <div className="mt-2.5 flex flex-col gap-1.5 text-[13px] leading-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">תוקף הקישור</span>
                  <span className="font-medium">פג ב־30 ביוני 2025</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">הגנת סיסמה</span>
                  <span className="font-medium">מופעלת · RND-2025</span>
                </div>
              </div>

              <PopoverFooter className="mt-3">
                <Button variant="ghost">ביטול</Button>
                <Button>שמירת הגדרות</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          <Button className="min-w-0 flex-1">שליחת הזמנות</Button>
        </footer>
      </div>
    </EvalShell>
  );
}
