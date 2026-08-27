"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { CandleSeries } from "@/components/ds/CandleSeries";
import { MiniMap } from "@/components/ds/MiniMap";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowUpRight,
  CandlestickChart,
  FileText,
  Paperclip,
  Send,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Report geometry — percentages shared 1:1 between the document
 * preview and the MiniMap that maps it (RTL: blocks anchored right).
 * ------------------------------------------------------------------ */
const REPORT_LAYOUT: Array<{
  right: string;
  top: string;
  width: string;
  height: string;
}> = [
  { right: "8%", top: "6%", width: "56%", height: "6%" }, // العنوان
  { right: "8%", top: "17%", width: "84%", height: "3%" }, // فقرات
  { right: "8%", top: "23%", width: "84%", height: "3%" },
  { right: "8%", top: "30%", width: "84%", height: "3%" },
  { right: "8%", top: "38%", width: "84%", height: "26%" }, // الرسم البياني
  { right: "8%", top: "69%", width: "84%", height: "3%" }, // خاتمة
  { right: "8%", top: "75%", width: "84%", height: "3%" },
  { right: "8%", top: "81%", width: "84%", height: "3%" },
  { right: "8%", top: "88%", width: "52%", height: "3%" },
];

/** منطقة القراءة الحالية — القسم الثالث (التحليل الفني). */
const READING_REGION = { right: "8%", top: "35%", width: "84%", height: "33%" };

/** عدّاد رقمي يُعرض دائمًا باتجاه يسار-يمين داخل السياق العربي. */
function Num({ children }: { children: React.ReactNode }) {
  return (
    <span dir="ltr" className="font-code tabular-nums">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-4 px-4 pb-5 pt-5">
        {/* ——— الترويسة ——— */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 flex-none items-center justify-center rounded-lg border border-solid border-default-border bg-panel">
              <CandlestickChart className="size-4 text-neutral-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold leading-tight">
                مكتب السوق
              </span>
              <span className="font-code text-[10px] text-neutral-400">
                براكسيس · الجلسة اليومية
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel px-2.5 py-1 font-code text-[10px] text-neutral-500">
            <span className="size-1.5 flex-none rounded-full bg-success-500" />
            مباشر
          </span>
        </header>

        {/* ——— بطاقة الاقتباس: CandleSeries ——— */}
        <section className="rounded-xl border border-solid border-default-border bg-panel p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                مؤشر براكسيس اليومي · PXN
              </span>
              <div className="flex items-center gap-2">
                <span
                  dir="ltr"
                  className="font-code text-[20px] font-medium leading-6 tabular-nums"
                >
                  104.87
                </span>
                <span className="flex items-center gap-0.5 rounded-full bg-success-500/10 px-1.5 py-0.5 text-[10px] font-medium text-success-600">
                  <ArrowUpRight className="size-3" />
                  <Num>+1.24%</Num>
                </span>
              </div>
            </div>
            <span className="font-code text-[10px] text-neutral-400">
              آخر تحديث <Num>09:40</Num>
            </span>
          </div>
          <CandleSeries />
          <div className="mt-2 flex items-center justify-between">
            <span className="font-code text-[10px] text-neutral-400">
              لقطة · <Num>14</Num> جلسة
            </span>
            <span className="font-code text-[10px] text-neutral-400">
              نطاق <Num>103.5 – 108.0</Num>
            </span>
          </div>
        </section>

        {/* ——— قارئ التقرير: MiniMap ——— */}
        <section className="rounded-xl border border-solid border-default-border bg-panel p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="size-3.5 text-neutral-500" />
              <span className="font-code text-[11px] text-neutral-500">
                تقرير-السوق.md
              </span>
            </div>
            <span className="font-code text-[10px] text-neutral-400">
              <Num>PDF · 8</Num> صفحات
            </span>
          </div>

          {/* معاينة المستند */}
          <div className="relative h-[132px] w-full overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
            {REPORT_LAYOUT.map((region, i) => (
              <div
                key={i}
                className="absolute rounded-[2px] bg-default-font/[0.07]"
                style={region}
              />
            ))}
            <div
              className="absolute rounded-[3px] border-2 border-solid border-default-font"
              style={READING_REGION}
            />
          </div>

          {/* الخريطة + معلومات القراءة */}
          <div className="mt-3 flex items-stretch gap-3">
            <MiniMap showGrid className="flex-none">
              {REPORT_LAYOUT.map((region, i) => (
                <MiniMap.ContentBlock key={i} style={region} />
              ))}
              <MiniMap.ViewportFrame style={READING_REGION} />
            </MiniMap>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
              <span className="font-code text-[9px] uppercase tracking-[0.08em] text-neutral-400">
                خريطة القراءة
              </span>
              <span className="text-[12px] leading-[18px] text-neutral-700">
                القسم الثالث — التحليل الفني ومستويات الدعم
              </span>
              <span className="font-code text-[10px] text-neutral-400">
                صفحة <Num>3</Num> من <Num>8</Num>
              </span>
              <span className="text-[11px] leading-4 text-neutral-400">
                اسحب الإطار على الخريطة للتنقل بين الأقسام
              </span>
            </div>
          </div>
        </section>

        {/* ——— المحادثة: ui:message ——— */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-code text-[9px] uppercase tracking-[0.08em] text-neutral-400">
              المحادثة · محلل السوق
            </span>
            <div className="h-px flex-1 bg-default-border" />
          </div>

          <MessageGroup>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback className="text-[11px]">ل</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader className="gap-1.5">
                  <span className="text-[13px]">ليلى</span>
                  <span className="text-[10px] font-normal text-neutral-400">
                    محللة · <Num>09:41</Num>
                  </span>
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent className="text-[13px] leading-relaxed">
                    أغلق المؤشر عند <Num>104.87</Num> فوق الدعم مباشرة — الزخم
                    يمتد للجلسة الثالثة.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback className="text-[11px]">أ</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent className="text-[13px] leading-relaxed">
                    أين أضع وقف الخسارة؟
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="text-[11px]">
                  <Num>09:42</Num>
                  <span>·</span>
                  <span>تمت القراءة</span>
                </MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback className="text-[11px]">ل</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader className="gap-1.5">
                  <span className="text-[13px]">ليلى</span>
                  <span className="text-[10px] font-normal text-neutral-400">
                    محللة · <Num>09:43</Num>
                  </span>
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent className="text-[13px] leading-relaxed">
                    تحت <Num>103.5</Num> بهامش نصف نقطة — الدعم مبيَّن في القسم
                    الثالث من التقرير أعلاه.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
        </section>

        {/* ——— شريط الكتابة ——— */}
        <div className="mt-auto flex items-center gap-2 rounded-full border border-solid border-default-border bg-panel px-2 py-1.5">
          <span className="flex size-10 flex-none items-center justify-center rounded-full text-neutral-400">
            <Paperclip className="size-4" />
          </span>
          <span className="flex-1 text-[13px] text-neutral-400">
            اكتب رسالة للمحلل…
          </span>
          <span className="flex size-10 flex-none items-center justify-center rounded-full bg-default-font text-default-background">
            <Send className="size-4 -scale-x-100" />
          </span>
        </div>
      </main>
    </EvalShell>
  );
}
