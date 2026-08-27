"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { EntityTabs } from "@/components/ds/EntityTabs";
import { Dialog } from "@/components/ds/Dialog";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";
import {
  FileArchive,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* data — أرشيف الجلسات (recordings archive)                           */
/* ------------------------------------------------------------------ */

const DETAILS: Array<[string, React.ReactNode]> = [
  ["المسجِّل", <span key="owner" dir="ltr" className="font-code text-[12px]">m.ohara</span>],
  ["آخر تحديث", <span key="updated">قبل ساعتين</span>],
  ["الحالة", <span key="state">مفهرسة</span>],
  ["المدة", <span key="duration" dir="ltr" className="font-code text-[12px]">01:47:22</span>],
];

const ATTACHMENTS = [
  { name: "محضر_الجلسة.pdf", meta: "412 KB · PDF", icon: FileText },
  { name: "العرض_التقديمي.pptx", meta: "8.4 MB · slides", icon: FileText },
  { name: "الميزانية_المحدثة.xlsx", meta: "220 KB · sheet", icon: FileSpreadsheet },
  { name: "تسجيل_الفيديو.mp4", meta: "148 MB · video", icon: FileVideo },
  { name: "المرفقات_المضغوطة.zip", meta: "8.1 MB · archive", icon: FileArchive },
  { name: "لوحة_المعارض.png", meta: "12.8 MB · image", icon: ImageIcon },
];

const TRANSCRIPT: string[] = [
  "سننقل نافذة الاستبقاء إلى تسعين يومًا اعتبارًا من الأول من أكتوبر.",
  "اتفقنا — سأحدّث مهمة التصدير قبل المراجعة الأسبوعية.",
  "الملاحظات وبنود العمل مرفقة بدعوة التقويم.",
];

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [deleteOpen, setDeleteOpen] = React.useState(true);
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <EvalShell theme="dark" dir="rtl">
      <main className="mx-auto flex w-full max-w-[640px] flex-col gap-7 px-6 py-8">
        {/* ---------------- header ---------------- */}
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-caption font-caption text-neutral-500">
              الأرشيف / الجلسات المسجَّلة
            </span>
            <span
              dir="ltr"
              className="font-code text-[11px] leading-[14px] text-neutral-400"
            >
              REC-0042
            </span>
          </div>
          <h1 className="font-heading-2 text-heading-2 text-default-font">
            جلسة تخطيط الربع الثالث
          </h1>
        </header>

        {/* ---------------- record tabs + details (ds:EntityTabs) ---------------- */}
        <section className="flex w-full flex-col">
          <EntityTabs />
          <div className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-2.5 px-1 pt-4">
            {DETAILS.map(([label, value]) => (
              <React.Fragment key={String(label)}>
                <span className="text-[13px] leading-[18px] text-neutral-500">
                  {label}
                </span>
                <span className="text-[13px] leading-[18px] text-default-font">
                  {value}
                </span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ---------------- attachments (ui:carousel) ---------------- */}
        <section className="flex w-full flex-col gap-3">
          <div className="flex items-baseline justify-between px-1">
            <span className="text-caption font-caption text-neutral-500">
              المرفقات ({ATTACHMENTS.length})
            </span>
            <span className="text-caption font-caption text-neutral-400">
              شريحة {current} من {count}
            </span>
          </div>
          <div className="px-14">
            <Carousel
              setApi={setApi}
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent>
                {ATTACHMENTS.map((file) => (
                  <CarouselItem key={file.name} className="basis-1/3">
                    <Card className="h-[140px] w-full gap-0 rounded-lg py-0">
                      <CardContent className="flex h-full w-full flex-col items-start gap-2 p-3.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-[6px] border border-default-border bg-default-background text-neutral-500">
                          <file.icon size={16} />
                        </span>
                        <span className="block w-full truncate font-body text-[13px] font-[500] leading-[18px] text-default-font">
                          {file.name}
                        </span>
                        <span
                          dir="ltr"
                          className="font-code text-[11px] leading-[14px] text-neutral-400"
                        >
                          {file.meta}
                        </span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* ---------------- transcript + delete confirmation (ds:Dialog) ---------------- */}
        <section className="flex w-full flex-col gap-3">
          <div className="flex items-baseline justify-between px-1">
            <span className="text-caption font-caption text-neutral-500">
              التفريغ النصي
            </span>
            <span className="text-caption font-caption text-neutral-400">
              نافذة تأكيد الحذف
            </span>
          </div>
          <div
            ref={frameRef}
            className="relative h-72 w-full overflow-hidden rounded-lg border border-default-border bg-default-background"
          >
            {/* transcript sitting under the scrim */}
            <div className="absolute inset-0 flex flex-col gap-3 p-6">
              <span className="text-caption font-caption text-neutral-400">
                تفريغ تلقائي · 12 مشاركًا
              </span>
              {TRANSCRIPT.map((line, i) => (
                <p
                  key={i}
                  className="font-body text-body text-default-font/60"
                >
                  {line}
                </p>
              ))}
            </div>

            <Dialog
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              modal={false}
              className="absolute inset-0"
            >
              <Dialog.Content
                aria-describedby={undefined}
                onOpenAutoFocus={(event: Event) => event.preventDefault()}
                onPointerDownOutside={(event) => {
                  // non-modal: only dismiss for interactions inside the frame
                  if (!frameRef.current?.contains(event.target as Node)) {
                    event.preventDefault();
                  }
                }}
              >
                <div className="flex w-[400px] max-w-full flex-col items-start gap-5 p-6">
                  <div className="flex w-full flex-col items-start gap-1.5">
                    <SubframeCore.Dialog.Title className="font-heading-2 text-heading-2 text-default-font">
                      حذف المرفق؟
                    </SubframeCore.Dialog.Title>
                    <SubframeCore.Dialog.Description className="font-body text-body text-neutral-500">
                      سيُحذف «العرض_التقديمي.pptx» مع 14 تعليقًا مرتبطًا به
                      نهائيًا. لا يمكن التراجع عن هذا الإجراء.
                    </SubframeCore.Dialog.Description>
                  </div>
                  <div className="flex w-full items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setDeleteOpen(false)}
                    >
                      إلغاء
                    </Button>
                    <Button
                      variant="danger"
                      icon={<Trash2 size={14} />}
                      onClick={() => setDeleteOpen(false)}
                    >
                      حذف المرفق
                    </Button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="small"
              onClick={() => setDeleteOpen(true)}
            >
              إعادة فتح نافذة التأكيد
            </Button>
            <span className="font-caption text-caption text-neutral-500">
              انقر الخلفية أو اضغط Esc للإغلاق.
            </span>
          </div>
        </section>
      </main>
    </EvalShell>
  );
}
