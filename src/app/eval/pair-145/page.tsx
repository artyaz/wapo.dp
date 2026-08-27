"use client";

import React from "react";
import {
  ArrowRight,
  CalendarDays,
  Coffee,
  Plane,
  Sparkles,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex h-dvh w-full max-w-md flex-col bg-background text-foreground">
        {/* Top bar — step 2 of a 3-step booking flow */}
        <header className="flex shrink-0 items-center gap-3 border-b border-border/70 px-4 py-2.5">
          <ArrowRight
            className="size-5 shrink-0 text-muted-foreground"
            aria-label="رجوع"
          />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold leading-tight">
              تأكيد الحجز
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              رياض الزيتون · مراكش
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            الخطوة ٢ من ٣
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-3">
          {/* Trip summary */}
          <div className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-muted/30 px-3 py-2.5">
            <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm font-medium">١٢–١٥ مارس</p>
            <span className="text-muted-foreground/60">·</span>
            <p className="text-sm text-muted-foreground">٣ ليالٍ · ضيفان</p>
          </div>

          {/* Stay details — room choice + (locked) airport pickup time */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-muted-foreground">
              تفاصيل الإقامة
            </h2>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="room-type"
                className="text-xs text-muted-foreground"
              >
                نوع الغرفة
              </label>
              <NativeSelect
                dir="rtl"
                id="room-type"
                defaultValue="deluxe"
                aria-label="نوع الغرفة"
              >
                <NativeSelectOption value="standard">
                  غرفة قياسية · سريران
                </NativeSelectOption>
                <NativeSelectOption value="deluxe">
                  غرفة ديلوكس مطلّة على الساحة
                </NativeSelectOption>
                <NativeSelectOption value="suite">
                  جناح العائلة · شرفة خاصة
                </NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="pickup-time"
                className="text-xs text-muted-foreground"
              >
                وقت الاستقبال من المطار
              </label>
              <NativeSelect
                dir="rtl"
                id="pickup-time"
                disabled
                aria-label="وقت الاستقبال من المطار"
              >
                <NativeSelectOption value="">
                  أضف خدمة الاستقبال أولاً
                </NativeSelectOption>
                <NativeSelectOption value="10">١٠:٠٠ صباحاً</NativeSelectOption>
                <NativeSelectOption value="13">١:٠٠ ظهراً</NativeSelectOption>
                <NativeSelectOption value="16">٤:٠٠ عصراً</NativeSelectOption>
              </NativeSelect>
            </div>
          </section>

          {/* Extras — multi-select add-ons */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-muted-foreground">
              خدمات إضافية
            </h2>
            <ToggleGroup
              type="multiple"
              variant="outline"
              dir="rtl"
              defaultValue={["breakfast"]}
              className="w-full"
              aria-label="خدمات إضافية"
            >
              <ToggleGroupItem value="breakfast" className="flex-1" aria-label="إفطار">
                <Coffee /> إفطار
              </ToggleGroupItem>
              <ToggleGroupItem value="pickup" className="flex-1" aria-label="استقبال من المطار">
                <Plane /> استقبال
              </ToggleGroupItem>
              <ToggleGroupItem value="cleaning" className="flex-1" aria-label="تنظيف يومي">
                <Sparkles /> تنظيف
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              يُضاف سعر الخدمات المحددة إلى الإجمالي عند الدفع.
            </p>
          </section>

          {/* Host note — conversation with the riad host */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-muted-foreground">
              ملاحظة من المضيفة
            </h2>
            <MessageGroup className="gap-3">
              <Message>
                <MessageAvatar>
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    ل
                  </div>
                </MessageAvatar>
                <MessageContent className="gap-1.5">
                  <MessageHeader className="text-sm">
                    ليلى · مضيفة الرياض
                  </MessageHeader>
                  <div className="max-w-[85%] rounded-2xl rounded-ss-md bg-muted px-3 py-2 text-sm leading-relaxed">
                    أهلاً! تسجيل الوصول من ٣ عصراً، والرياض على ٧ دقائق سيراً
                    من ساحة الفنا.
                  </div>
                  <MessageFooter className="text-[11px]">
                    قبل ساعتين
                  </MessageFooter>
                </MessageContent>
              </Message>
              <Message align="end">
                <MessageContent className="gap-1.5">
                  <div className="rounded-2xl rounded-se-md bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground">
                    ممكن تسجيل الوصول قبل الظهر؟
                  </div>
                  <MessageFooter className="text-[11px]">
                    أُرسلت · قبل ساعة
                  </MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </section>
        </main>

        {/* Sticky footer — total + continue to payment */}
        <footer className="flex shrink-0 items-center gap-3 border-t border-border/70 bg-background px-4 py-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-muted-foreground">
              الإجمالي · ٣ ليالٍ
            </span>
            <span className="text-lg font-semibold leading-tight">
              1,240 د.م.
            </span>
          </div>
          <button
            type="button"
            className="ms-auto h-10 shrink-0 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            متابعة للدفع
          </button>
        </footer>
      </div>
    </EvalShell>
  );
}
