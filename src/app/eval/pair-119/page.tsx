"use client";

import React from "react";
import Link from "next/link";
import { BotIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { cn } from "@/lib/utils";
import * as SubframeCore from "@/lib/subframe/core";

import { AgentActivity } from "@/components/ds/AgentActivity";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Drawer } from "@/components/ds/Drawer";

/* Reasoning-log line — ThoughtHeader demo pattern, retuned for the light canvas. */
function LogLine({
  state,
  children,
}: {
  state: "done" | "active";
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-2.5">
      <span
        aria-hidden="true"
        className={
          state === "done"
            ? "mt-[7px] h-[5px] w-[5px] flex-none rounded-full bg-neutral-400"
            : "mt-[6px] h-[7px] w-[7px] flex-none animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-neutral-600 motion-reduce:animate-none"
        }
      />
      <p
        className={
          state === "done"
            ? "min-w-0 text-[13px] leading-[20px] text-neutral-500"
            : "min-w-0 text-[13px] leading-[20px] text-neutral-800"
        }
      >
        {children}
      </p>
    </div>
  );
}

const SESSION_ROWS = [
  { label: "الحالة", value: "مكتمل · 42 دقيقة" },
  { label: "المشاركون", value: "مايا، يونس، بريا، سام" },
  { label: "الاحتفاظ", value: "90 يومًا · ينتهي 12 نوفمبر" },
];

/**
 * pair-119 — mobile (360×640) RTL Arabic "agent run review" screen:
 * section nav (ui:navigation-menu) over an agent run report with an expanded
 * reasoning trace (ds:ThoughtHeader), plus an open session-details side sheet
 * (ds:Drawer) sliding over the transcript card.
 */
export default function Page() {
  // vaul's Drawer.Content reads `document` during render — mount it
  // client-side only so prerender doesn't throw.
  const [mounted, setMounted] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <EvalShell theme="light" dir="rtl">
      <div
        lang="ar"
        className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col text-foreground"
      >
        {/* ---- app header ---- */}
        <header className="flex items-center gap-3 border-b border-border px-4 pb-3 pt-3.5">
          <div className="flex size-9 flex-none items-center justify-center rounded-lg border border-border bg-card">
            <BotIcon className="size-4 text-neutral-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Praxis QA
            </p>
            <p className="truncate text-[13.5px] font-semibold text-neutral-900">
              مراجعة تشغيل الوكيل رقم 417
            </p>
          </div>
          <span className="flex-none rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-neutral-600">
            قيد المراجعة
          </span>
        </header>

        {/* ---- section nav · ui:navigation-menu ---- */}
        <div className="border-b border-border px-4 py-2">
          <NavigationMenu dir="rtl" className="w-full max-w-full justify-start">
            <NavigationMenuList className="justify-start gap-1.5">
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#report" />}
                  aria-current="page"
                  className={cn(navigationMenuTriggerStyle(), "bg-muted")}
                >
                  التقرير
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#transcript" />}
                  className={navigationMenuTriggerStyle()}
                >
                  المحادثة
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>المزيد</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <main id="report" className="flex flex-col gap-4 p-4">
          {/* ---- run summary + reasoning trace · ds:ThoughtHeader ---- */}
          <section className="rounded-xl border border-border bg-card p-4">
            <p className="text-[10px] font-medium text-muted-foreground">
              ملخص التشغيل · فحص التباين
            </p>
            <p className="mt-2 text-[13.5px] leading-[22px] text-neutral-700">
              فحص الوكيل 50 مكونًا مسجلًا ووجد 12 عقدة نص منخفضة التباين، ثم
              رقّع التسميات وأعاد التدقيق للتأكد.
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <AgentActivity
                label="عمل الوكيل لمدة 3 دقائق و51 ثانية"
                defaultOpen
              >
                <div className="flex flex-col gap-2.5">
                  <LogLine state="done">
                    فحص 50 مكونًا مسجلًا — 12 عقدة نص منخفضة التباين
                  </LogLine>
                  <LogLine state="done">
                    رقّع التسميات من neutral-400 إلى neutral-500
                  </LogLine>
                  <LogLine state="active">
                    يعيد تشغيل التدقيق البصري للتأكد من الإصلاحات
                  </LogLine>
                </div>
              </AgentActivity>
              <AgentActivity label="تحقّق من التبعيات · 22 ثانية" />
            </div>
          </section>

          {/* ---- transcript card with open session-details sheet · ds:Drawer ---- */}
          <section
            id="transcript"
            className="relative h-[300px] overflow-hidden rounded-xl border border-border bg-white"
          >
            <div className="absolute inset-0 flex flex-col gap-3 p-5">
              <p className="text-[10px] font-medium text-muted-foreground">
                النسخة · جلسة تخطيط الربع الثالث
              </p>
              <p className="text-[13px] leading-[21px] text-neutral-700/80">
                ننقل نافذة الاحتفاظ إلى تسعين يومًا اعتبارًا من الأول من أكتوبر.
              </p>
              <p className="text-[13px] leading-[21px] text-neutral-700/80">
                اتفقنا — سأحدّث مهمة التصدير قبل المراجعة.
              </p>
              <p className="text-[13px] leading-[21px] text-neutral-700/80">
                الملاحظات وبنود العمل مرفقة بدعوة التقويم.
              </p>
            </div>

            {mounted && (
              <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                direction="right"
                modal={false}
              >
                <Drawer.Content aria-describedby={undefined}>
                <div className="flex w-[240px] max-w-full flex-col items-start gap-5 p-5">
                  <div className="flex w-full flex-col items-start gap-1">
                    <SubframeCore.Drawer.Title className="text-heading-3 font-heading-3 text-default-font">
                      تفاصيل الجلسة
                    </SubframeCore.Drawer.Title>
                    <span className="text-caption font-caption text-neutral-500">
                      جلسة تخطيط الربع الثالث
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    {SESSION_ROWS.map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-2.5 first:border-t-0 first:pt-0 last:pb-0"
                      >
                        <span className="text-caption font-caption text-neutral-500">
                          {label}
                        </span>
                        <span className="text-body font-body text-default-font">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Drawer.Content>
              </Drawer>
            )}
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
