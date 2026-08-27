"use client";

import React from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";
import { EvalShell } from "@/eval/EvalShell";
import { GlassRefraction } from "@/components/ds/GlassRefraction";
import { PlayerBar } from "@/components/ds/PlayerBar";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

/**
 * pair-167 — AI chat interface (dark, RTL, 768×1024 portrait tablet, no-scroll).
 * Scenario: "Praxis Copilot" — an Arabic RTL design-system assistant chat.
 * The user asks to see the liquid-glass material (→ GlassRefraction specimens
 * rendered as the assistant's artifact card), then asks for a spoken
 * explanation (→ PlayerBar rendered as the assistant's voice memo). The model
 * picker in the header is a NativeSelect.
 */
export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="flex h-screen w-full flex-col overflow-hidden">
        {/* ---------- Header ---------- */}
        <header className="relative flex h-14 flex-none items-center gap-3 border-b border-default-border px-5">
          <div className="flex size-9 flex-none items-center justify-center rounded-xl border border-default-border bg-panel/70">
            <Sparkles className="size-4 text-default-font/80" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-body text-sm font-semibold leading-5 text-default-font">
              براكسيس كوبايلوت
            </span>
            <span className="font-body text-[11px] leading-4 text-default-font/55">
              مساعد نظام التصميم · متصل الآن
            </span>
          </div>
          {/* model picker — NativeSelect */}
          <div className="ms-auto flex items-center gap-2.5">
            <span className="hidden font-body text-[11px] leading-4 text-default-font/55 sm:inline">
              النموذج
            </span>
            <div className="w-40">
              <NativeSelect
                dir="rtl"
                defaultValue="praxis-4o"
                aria-label="اختيار النموذج"
              >
                <NativeSelectOption value="praxis-4o">Praxis 4o</NativeSelectOption>
                <NativeSelectOption value="praxis-4o-mini">
                  Praxis 4o mini
                </NativeSelectOption>
                <NativeSelectOption value="praxis-turbo">
                  Praxis Turbo
                </NativeSelectOption>
              </NativeSelect>
            </div>
          </div>
        </header>

        {/* ---------- Conversation ---------- */}
        <main className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 py-4">
          {/* faint warm glow so the glass cards have a backdrop to refract */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(160,155,145,0.10)_0%,transparent_55%)]" />

          <span className="mb-auto self-center rounded-full border border-default-border bg-panel/40 px-3 py-1 font-body text-[11px] leading-4 text-default-font/60">
            اليوم
          </span>

          {/* user asks about the glass material */}
          <div className="relative max-w-[78%] self-end rounded-2xl rounded-ee-md border border-default-border bg-panel/70 px-4 py-2.5">
            <p className="m-0 font-body text-[13px] leading-5 text-default-font">
              أرني طبقات الزجاج السائل — كيف يتغيّر المظهر بين طبقة رقيقة وأخرى سميكة؟
            </p>
          </div>

          {/* assistant replies with the specimen artifact (GlassRefraction ×2) */}
          <div className="relative flex items-start gap-2.5">
            <div className="mt-0.5 flex size-7 flex-none items-center justify-center rounded-lg border border-default-border bg-panel/60">
              <Sparkles className="size-3.5 text-default-font/75" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="m-0 max-w-[560px] font-body text-[13px] leading-5 text-default-font/90">
                بالتأكيد — هاتان عيّنتان من العدسة الزجاجية على خلفية رمادية دافئة.
                لاحظ كيف يقوى انكسار الحافة مع سماكة المادة، بينما يبقى اللمعان
                هادئاً عبر الجسم.
              </p>
              <div className="w-full max-w-[460px] rounded-2xl border border-default-border bg-panel/40 p-2">
                <div className="flex items-center justify-between px-3 pb-1 pt-1.5">
                  <span className="font-body text-[11px] font-medium leading-4 text-default-font/70">
                    عيّنة المواد · glass specimen
                  </span>
                  <span className="font-code text-[10px] leading-4 text-default-font/50">
                    thin · thick
                  </span>
                </div>
                <div className="grid grid-cols-2 justify-items-center">
                  <GlassRefraction material="thin">
                    <span className="w-full text-center font-code text-[11px] uppercase tracking-[0.1em] text-default-font/80">
                      thin
                    </span>
                  </GlassRefraction>
                  <GlassRefraction material="thick">
                    <span className="w-full text-center font-code text-[11px] uppercase tracking-[0.1em] text-default-font/80">
                      thick
                    </span>
                  </GlassRefraction>
                </div>
              </div>
            </div>
          </div>

          {/* user asks for a spoken explanation */}
          <div className="relative max-w-[78%] self-end rounded-2xl rounded-ee-md border border-default-border bg-panel/70 px-4 py-2.5">
            <p className="m-0 font-body text-[13px] leading-5 text-default-font">
              ممتاز. اشرح لي نظام المواد صوتياً — أفضّل الاستماع أثناء التنقّل.
            </p>
          </div>

          {/* assistant answers with a voice memo (PlayerBar) */}
          <div className="relative flex items-start gap-2.5">
            <div className="mt-0.5 flex size-7 flex-none items-center justify-center rounded-lg border border-default-border bg-panel/60">
              <Sparkles className="size-3.5 text-default-font/75" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="m-0 max-w-[560px] font-body text-[13px] leading-5 text-default-font/90">
                تفضّل — سجّلت لك قراءة صوتية قصيرة تشرح كيف يكتسب الزجاج ارتفاعه
                البصري من الضوء لا من الظلال.
              </p>
              <PlayerBar
                className="w-full max-w-[560px]"
                position="03:12 / 18:40"
                explainLabel="شرح"
                previousDisabled
                excerpt="يكتسب نظام المواد ارتفاعه البصري من الضوء — انكسارٌ عند الحافة، ولمعانٌ هادئ عبر الجسم — فلا يُلقي أي عنصر بظلٍّ قاسٍ على الصفحة."
              />
            </div>
          </div>
        </main>

        {/* ---------- Composer ---------- */}
        <footer className="flex-none border-t border-default-border px-5 py-4">
          <div className="flex h-12 items-center gap-3 rounded-2xl border border-default-border bg-panel/60 px-4">
            <Paperclip className="size-4 flex-none text-default-font/50" />
            <span className="flex-1 truncate font-body text-[13px] leading-5 text-default-font/50">
              اسأل كوبايلوت عن أي مكوّن في نظام التصميم…
            </span>
            <div className="flex size-9 flex-none items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground">
              <ArrowUp className="size-4" />
            </div>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
