"use client";

/**
 * pair-098 — RTL ops console ("Sahab Platform" production monitoring).
 * Stars: ui:command (inline quick-action palette), ui:context-menu
 * (right-click actions on a service row), ds:StatTile (metrics row).
 * The context menu is opened programmatically (synthetic `contextmenu`
 * event at a service row) so the screenshot shows it in its open state.
 */

import React from "react";
import {
  ActivityIcon,
  BellIcon,
  CloudIcon,
  EraserIcon,
  LayoutDashboardIcon,
  RotateCwIcon,
  ScrollTextIcon,
  ServerIcon,
  SettingsIcon,
  TrashIcon,
  UserPlusIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { StatTile } from "@/components/ds/StatTile";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const latencySparkline = (
  <svg
    viewBox="0 0 120 24"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="h-6 w-full text-neutral-400"
  >
    <polyline
      points="0,18 12,17 24,19 36,14 48,15 60,10 72,12 84,8 96,9 108,5 120,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

type ServiceTone = "healthy" | "degraded";

const services: {
  name: string;
  endpoint: string;
  latency: string;
  tone: ServiceTone;
  statusLabel: string;
}[] = [
  { name: "بوابة الدفع", endpoint: "api/payments", latency: "42ms", tone: "healthy", statusLabel: "سليم" },
  { name: "خدمة الطلبات", endpoint: "api/orders", latency: "51ms", tone: "healthy", statusLabel: "سليم" },
  { name: "محرك البحث", endpoint: "search/engine", latency: "210ms", tone: "degraded", statusLabel: "تدهور جزئي" },
  { name: "خدمة الإشعارات", endpoint: "notify/push", latency: "88ms", tone: "healthy", statusLabel: "سليم" },
  { name: "ربط الويب", endpoint: "hooks/webhook", latency: "34ms", tone: "healthy", statusLabel: "سليم" },
];

function StatusDot({ tone }: { tone: ServiceTone }) {
  return (
    <span
      aria-hidden="true"
      className={
        tone === "degraded"
          ? "size-2 shrink-0 rounded-full bg-warning-400"
          : "size-2 shrink-0 rounded-full bg-success-400"
      }
    />
  );
}

const sectionLabel =
  "text-caption font-caption uppercase tracking-[0.1em] text-neutral-500";

export default function Page() {
  const servicesRef = React.useRef<HTMLDivElement>(null);

  // Radix's ContextMenu opens on the `contextmenu` event at the pointer
  // coordinates — synthesize one on the third service row so the menu is
  // deterministically open in the captured screenshot.
  React.useEffect(() => {
    const el = servicesRef.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      el.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          button: 2,
          buttons: 2,
          clientX: rect.left + rect.width * 0.38,
          clientY: rect.top + rect.height * 0.5,
        })
      );
    }, 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col gap-7 px-10 py-9">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg border border-default-border bg-panel text-neutral-700 shadow-default">
              <CloudIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-heading-3 text-heading-3 text-default-font">
                منصة سَحاب · مركز العمليات
              </h1>
              <p className={sectionLabel}>مراقبة بيئة الإنتاج — آخر 24 ساعة</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-default-border bg-panel px-3.5 py-1.5 shadow-default">
            <StatusDot tone="degraded" />
            <span className="text-caption font-caption text-neutral-600">
              بيئة الإنتاج
            </span>
            <span dir="ltr" className="font-code text-caption text-neutral-400">
              us-east-1
            </span>
          </div>
        </header>

        {/* Metrics — ds:StatTile */}
        <section className="grid grid-cols-3 gap-4">
          <StatTile
            label="زمن الاستجابة P99"
            value="42.1ms"
            footer="مقارنة بالـ 24 ساعة السابقة"
            sparkline={latencySparkline}
          />
          <StatTile
            label="حجم الطلبات"
            value="1,204"
            delta="+8.1%"
            sign="positive"
            footer="آخر 24 ساعة"
          />
          <StatTile
            label="معدل الأخطاء"
            value="0.12%"
            delta="+0.04"
            sign="negative"
            footer="أخطاء 5xx وانتهاء المهلة"
          />
        </section>

        {/* Main split: services (context menu) + quick actions (command) */}
        <section className="grid flex-1 grid-cols-12 items-start gap-6">
          {/* Services list — ui:context-menu */}
          <div className="col-span-7 flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className={sectionLabel}>الخدمات المراقَبة</h2>
              <span className="text-caption font-caption text-neutral-400">
                انقر بالزر الأيمن على أي خدمة لعرض الإجراءات
              </span>
            </div>
            <ContextMenu dir="rtl">
              <ContextMenuTrigger asChild>
                <div
                  ref={servicesRef}
                  className="overflow-hidden rounded-xl border border-default-border bg-panel shadow-default"
                >
                  <ul>
                    {services.map((service) => (
                      <li
                        key={service.endpoint}
                        className="flex items-center gap-3 border-b border-default-border px-4 py-3 last:border-b-0"
                      >
                        <StatusDot tone={service.tone} />
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="font-body text-body-medium text-default-font">
                            {service.name}
                          </span>
                          <span
                            dir="ltr"
                            className="font-code text-caption text-neutral-400"
                          >
                            {service.endpoint}
                          </span>
                        </div>
                        <div className="ms-auto flex items-center gap-4">
                          <span className="flex w-14 justify-end">
                            <span
                              dir="ltr"
                              className="font-code text-code tabular-nums text-neutral-600"
                            >
                              {service.latency}
                            </span>
                          </span>
                          <span
                            className={`flex w-24 justify-end text-caption font-caption ${
                              service.tone === "degraded"
                                ? "text-warning-700"
                                : "text-neutral-500"
                            }`}
                          >
                            {service.statusLabel}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-60">
                <ContextMenuLabel>
                  محرك البحث · <span dir="ltr">search/engine</span>
                </ContextMenuLabel>
                <ContextMenuGroup>
                  <ContextMenuItem>
                    <ActivityIcon />
                    فحص الحالة
                    <ContextMenuShortcut>⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <RotateCwIcon />
                    إعادة التشغيل
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <ScrollTextIcon />
                    عرض السجلات
                    <ContextMenuShortcut>⌘L</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem defaultChecked>
                  التوسيع التلقائي
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem defaultChecked>
                  التنبيهات النشطة
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">
                  <TrashIcon />
                  إيقاف الخدمة
                  <ContextMenuShortcut>⇧⌘D</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          {/* Quick actions — ui:command */}
          <div className="col-span-5 flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className={sectionLabel}>لوحة الأوامر</h2>
              <span
                dir="ltr"
                className="rounded border border-default-border bg-panel px-1.5 py-0.5 font-code text-caption text-neutral-500"
              >
                ⌘K
              </span>
            </div>
            <Command
              dir="rtl"
              className="rounded-xl border border-default-border bg-panel shadow-default"
            >
              <CommandInput dir="rtl" placeholder="اكتب أمرًا أو ابحث..." />
              <CommandList className="max-h-[360px]">
                <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
                <CommandGroup heading="إجراءات سريعة">
                  <CommandItem>
                    <RotateCwIcon />
                    <span>إعادة تشغيل محرك البحث</span>
                    <CommandShortcut>⌘R</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <ServerIcon />
                    <span>زيادة النسخ المتماثلة</span>
                    <CommandShortcut>⌘↑</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <EraserIcon />
                    <span>تفريغ الذاكرة المؤقتة</span>
                    <CommandShortcut>⌘K</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="التنقل">
                  <CommandItem>
                    <LayoutDashboardIcon />
                    <span>لوحات المعلومات</span>
                    <CommandShortcut>⌘D</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <ScrollTextIcon />
                    <span>السجلات المباشرة</span>
                    <CommandShortcut>⌘L</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <BellIcon />
                    <span>التنبيهات</span>
                    <CommandShortcut>⌘A</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="الفريق">
                  <CommandItem>
                    <UserPlusIcon />
                    <span>دعوة مهندس للفريق</span>
                    <CommandShortcut>⌘I</CommandShortcut>
                  </CommandItem>
                  <CommandItem disabled>
                    <SettingsIcon />
                    <span>إعدادات المشروع</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            <p className="text-caption font-caption text-neutral-400">
              نفّذ إجراءً سريعًا أو انتقل إلى أي قسم — النتائج تتحدث أثناء الكتابة.
            </p>
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
