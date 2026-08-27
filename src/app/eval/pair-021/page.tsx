"use client";

/**
 * EVAL page (pair-021) — ui:Item + ds:Sheet + ds:CrosshairTag
 * Conditions: laptop 1024x768, dark theme, RTL (Arabic), no constraint.
 *
 * Scenario: "منصة أفق" — an Arabic RTL market terminal (educational trading
 * desk). A watchlist of instruments (ui:Item rows) sits beside an inspected
 * instrument card whose mini chart carries a crosshair value tag
 * (ds:CrosshairTag); an open bottom sheet asks the trader to confirm a
 * buy order for the selected instrument (ds:Sheet), with the order line
 * itself rendered as an ui:Item row.
 */

import React from "react";
import {
  ArrowLeftRight,
  Bell,
  Bitcoin,
  Coins,
  Fuel,
  Gem,
  Settings,
  TrendingUp,
} from "lucide-react";
import * as SubframeCore from "@/lib/subframe/core";

import { EvalShell } from "@/eval/EvalShell";
import { Sheet } from "@/components/ds/Sheet";
import { CrosshairTag } from "@/components/ds/CrosshairTag";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

type Trend = "up" | "down";

interface Instrument {
  id: string;
  name: string;
  detail: string;
  price: string;
  change: string;
  trend: Trend;
  icon: React.ComponentType<{ className?: string }>;
  selected?: boolean;
}

const WATCHLIST: Instrument[] = [
  {
    id: "xau",
    name: "الذهب الفوري",
    detail: "XAU/USD · أونصة تروي",
    price: "2,341.20",
    change: "+0.79%",
    trend: "up",
    icon: Coins,
    selected: true,
  },
  {
    id: "brn",
    name: "خام برنت",
    detail: "BRN · عقود شهرية",
    price: "84.63",
    change: "-0.42%",
    trend: "down",
    icon: Fuel,
  },
  {
    id: "tasi",
    name: "مؤشر تاسي",
    detail: "TASI · السوق السعودية",
    price: "11,842.70",
    change: "+1.12%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    id: "btc",
    name: "البيتكوين",
    detail: "BTC/USD · صرف فوري",
    price: "67,412",
    change: "+2.31%",
    trend: "up",
    icon: Bitcoin,
  },
  {
    id: "eur",
    name: "اليورو/دولار",
    detail: "EUR/USD · صرف فوري",
    price: "1.0872",
    change: "-0.08%",
    trend: "down",
    icon: ArrowLeftRight,
  },
];

const STATS: { label: string; value: string }[] = [
  { label: "الافتتاح", value: "2,328.90" },
  { label: "الأعلى", value: "2,347.10" },
  { label: "الأدنى", value: "2,321.45" },
  { label: "الحجم", value: "128.4K" },
];

export default function Page() {
  const [sheetOpen, setSheetOpen] = React.useState(true);

  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-default-background">
        {/* ---- top bar ---- */}
        <header className="flex flex-none items-center justify-between gap-4 border-b border-solid border-default-border px-6 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 flex-none items-center justify-center rounded-md bg-default-font font-body text-body font-[600] text-default-background">
              أ
            </div>
            <div className="min-w-0">
              <p className="font-body-medium text-body-medium leading-[18px] text-default-font">
                منصة أفق للأسواق
              </p>
              <p className="font-caption text-caption text-neutral-500">
                وحدة التداول · محاكاة تعليمية
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-solid border-default-border px-3 py-1">
              <span className="size-1.5 rounded-full bg-success-500" />
              <span className="font-caption text-caption text-neutral-500">
                جلسة لندن · مفتوحة
              </span>
            </span>
            <Bell className="h-4 w-4 text-neutral-500" />
            <Settings className="h-4 w-4 text-neutral-500" />
          </div>
        </header>

        {/* ---- terminal: instrument card + watchlist ---- */}
        <main className="mx-auto grid w-full max-w-[976px] grid-cols-[minmax(0,1fr)_320px] gap-5 px-6 pt-5">
          {/* inspected instrument — chart with crosshair value tag */}
          <section className="flex min-w-0 flex-col gap-3.5 rounded-lg border border-solid border-default-border bg-panel p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="font-heading-3 text-heading-3 text-default-font">
                  الذهب الفوري
                </h1>
                <p className="font-caption text-caption text-neutral-500">
                  XAU/USD · أونصة تروي · مؤشر 60 دقيقة
                </p>
              </div>
              <div dir="ltr" className="flex flex-none flex-col items-start gap-0.5 pt-0.5">
                <span className="font-code text-[22px] font-[600] leading-none text-default-font tabular-nums">
                  2,341.20
                </span>
                <span className="font-code text-[11px] leading-none text-success-600 tabular-nums">
                  +18.40 (+0.79%)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              {/* chart stays LTR — time axis reads left→right even in RTL apps */}
              <div dir="ltr" className="flex-none">
                <CrosshairTag
                  value="2341.20"
                  glyph="+0.79%"
                  timestamp="2025-06-11 14:32:05"
                />
              </div>
              <dl className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-3.5 pt-1">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex min-w-0 flex-col gap-1">
                    <dt className="font-caption text-caption text-neutral-500">
                      {stat.label}
                    </dt>
                    <dd
                      dir="ltr"
                      className="font-code text-[14px] font-[500] leading-[18px] text-default-font tabular-nums"
                    >
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-solid border-default-border pt-3">
              <span className="font-caption text-caption text-neutral-500">
                نطاق الرسم: آخر 60 دقيقة · بيانات مؤجلة 15 دقيقة
              </span>
              <span className="flex-none font-caption text-caption text-neutral-500">
                الفارق السعري: <span dir="ltr">0.25 USD</span>
              </span>
            </div>
          </section>

          {/* watchlist — ui:Item rows */}
          <aside className="flex min-w-0 flex-col rounded-lg border border-solid border-default-border bg-panel p-4">
            <div className="flex items-baseline justify-between gap-2 pb-3">
              <h2 className="font-body-medium text-body-medium text-default-font">
                قائمة المراقبة
              </h2>
              <span className="font-caption text-caption text-neutral-400">
                5 أدوات
              </span>
            </div>

            <ItemGroup>
              {WATCHLIST.map((instrument, index) => {
                const Icon = instrument.icon;
                return (
                  <React.Fragment key={instrument.id}>
                    {index > 0 ? <ItemSeparator /> : null}
                    <Item
                      size="sm"
                      className={
                        instrument.selected ? "bg-neutral-200/50" : undefined
                      }
                    >
                      <ItemMedia variant="icon">
                        <Icon className="text-neutral-500" />
                      </ItemMedia>
                      <ItemContent className="gap-0.5">
                        <ItemTitle className="text-[13px]">
                          {instrument.name}
                        </ItemTitle>
                        <ItemDescription className="text-[11px] leading-[15px]">
                          {instrument.detail}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions className="flex-col items-end gap-0">
                        <span
                          dir="ltr"
                          className="font-code text-[13px] font-[600] leading-[16px] text-default-font tabular-nums"
                        >
                          {instrument.price}
                        </span>
                        <span
                          dir="ltr"
                          className={`font-code text-[11px] leading-[14px] tabular-nums ${
                            instrument.trend === "up"
                              ? "text-success-600"
                              : "text-destructive-500"
                          }`}
                        >
                          {instrument.change}
                        </span>
                      </ItemActions>
                    </Item>
                  </React.Fragment>
                );
              })}
            </ItemGroup>

            <p className="mt-auto border-t border-solid border-default-border pt-3 font-caption text-caption text-neutral-400">
              آخر تحديث: <span dir="ltr">14:32:05</span> بتوقيت غرينتش
            </p>
          </aside>
        </main>

        {/* ---- confirm-buy sheet (open by default) ---- */}
        {sheetOpen ? (
          <Sheet
            open
            onOpenChange={setSheetOpen}
            modal={false}
            className="absolute inset-0"
          >
            <Sheet.Content
              aria-describedby={undefined}
              onPointerDownOutside={(event: Event) => event.preventDefault()}
            >
              <SubframeCore.Dialog.Title className="w-full font-body-medium text-body-medium text-default-font">
                تأكيد أمر الشراء
              </SubframeCore.Dialog.Title>
              <p className="w-full font-body text-body text-neutral-500">
                سيُنفَّذ أمر سوق لشراء 0.50 أونصة من الذهب الفوري بأفضل سعر
                متاح. محفظة تجريبية — لا أموال حقيقية.
              </p>

              {/* order line — ui:Item inside the sheet */}
              <Item variant="outline" size="sm" className="w-full">
                <ItemMedia variant="icon">
                  <Gem className="text-neutral-500" />
                </ItemMedia>
                <ItemContent className="gap-0.5">
                  <ItemTitle className="text-[13px]">
                    الذهب الفوري · <span dir="ltr">XAU/USD</span>
                  </ItemTitle>
                  <ItemDescription className="text-[11px] leading-[15px]">
                    أمر سوق · 0.50 أونصة · تنفيذ فوري
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="flex-col items-end gap-0">
                  <span
                    dir="ltr"
                    className="font-code text-[13px] font-[600] leading-[16px] text-default-font tabular-nums"
                  >
                    1,170.60
                  </span>
                  <span
                    dir="ltr"
                    className="font-code text-[11px] leading-[14px] text-neutral-500 tabular-nums"
                  >
                    0.50 × 2,341.20
                  </span>
                </ItemActions>
              </Item>

              <div className="flex w-full flex-col gap-1.5 border-t border-solid border-default-border pt-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-caption text-caption text-neutral-500">
                    العمولة والرسوم
                  </span>
                  <span
                    dir="ltr"
                    className="font-code text-code text-neutral-500 tabular-nums"
                  >
                    2.95 USD
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-body-medium text-body-medium text-default-font">
                    الإجمالي المستحق
                  </span>
                  <span
                    dir="ltr"
                    className="font-code text-code text-default-font tabular-nums"
                  >
                    1,173.55 USD
                  </span>
                </div>
              </div>

              <div className="flex w-full items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="cursor-pointer rounded-md px-3 py-1.5 font-caption text-caption text-default-font hover:bg-neutral-100"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="cursor-pointer rounded-md border border-solid border-default-border bg-default-font px-3 py-1.5 font-caption text-caption text-default-background hover:opacity-90"
                >
                  تأكيد الشراء
                </button>
              </div>
            </Sheet.Content>
          </Sheet>
        ) : null}
      </div>
    </EvalShell>
  );
}
