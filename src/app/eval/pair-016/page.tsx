"use client";

/**
 * EVAL page (pair-016) — ds:MediaClip + ds:TextField + ds:QueryInput
 * Conditions: phone 390x844, light theme, RTL (Arabic), dense content.
 * Scenario: an email inbox — list + one expanded message with media
 * attachments (MediaClip), a saved advanced-search console (QueryInput)
 * and a quick-reply composer (TextField).
 */

import React from "react";
import {
  ArchiveIcon,
  ChevronDownIcon,
  InboxIcon,
  PaperclipIcon,
  PenSquareIcon,
  ReplyIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { MediaClip } from "@/components/ds/MediaClip";
import { TextField } from "@/components/ds/TextField";
import { QueryInput } from "@/components/ds/QueryInput";

const REPLY_DRAFT = [
  "شكراً ميرنا على المحضر المفصل والتسجيل الكامل.",
  "راجعتُ المرفقات الثلاثة، وملاحظاتي المبدئية:",
  "١. موافقة على معايير إمكانية الوصول الجديدة كما هي.",
  "٢. نحتاج جدولاً زمنياً محدّثاً لمكونات الوسائط قبل نهاية الأسبوع.",
  "٣. سأتابع مع فريق البنية التحتية مسألة الاحتفاظ بالمرفقات بعد انتهاء الرابط الآمن.",
].join("\n");

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex w-full max-w-[420px] flex-col bg-default-background">
        {/* ---- top bar ---- */}
        <header className="flex items-center justify-between gap-3 border-b border-solid border-default-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-caption font-caption text-neutral-500">
              praxis-design.io · صندوق بريد مشترك
            </p>
            <h1 className="text-heading-2 font-heading-2 text-default-font">
              البريد الوارد
            </h1>
          </div>
          <div className="flex flex-none items-center gap-3 text-neutral-500">
            <InboxIcon className="h-5 w-5" />
            <PenSquareIcon className="h-5 w-5" />
          </div>
        </header>

        <main className="flex flex-col gap-5 px-4 py-4">
          {/* ---- saved advanced-search console (ds:QueryInput) ---- */}
          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-body text-[13px] font-[600] leading-[19px] text-default-font">
                بحث متقدم محفوظ
              </h2>
              <span className="font-code text-[10px] text-neutral-400">
                saved · inbox-watch
              </span>
            </div>
            <QueryInput />
            <p className="text-caption font-caption leading-[16px] text-neutral-500">
              استعلام محفوظ يبحث في رسائل التنبيه الواردة من خدمة المراقبة
              خلال آخر ٦٠ دقيقة، ويعمل تلقائياً عند كل فتح لصندوق البريد.
            </p>
          </section>

          {/* ---- inbox list ---- */}
          <section className="flex flex-col">
            <div className="flex items-center justify-between gap-2 border-b border-solid border-default-border pb-2">
              <h2 className="font-body text-[13px] font-[600] leading-[19px] text-default-font">
                الرسائل — ٢٧ (٤ غير مقروءة)
              </h2>
              <span className="flex items-center gap-1 text-caption font-caption text-neutral-500">
                الأحدث أولاً
                <ChevronDownIcon className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* -- expanded message: meeting minutes w/ media attachments -- */}
            <article className="border-b border-solid border-default-border py-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-neutral-100 text-caption font-caption font-[600] text-neutral-600">
                  م
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-body text-[13px] font-[600] text-default-font">
                      ميرنا عبد الرحمن — فريق التصميم
                    </span>
                    <span className="flex flex-none items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand-primary" />
                      <span className="text-caption font-caption text-neutral-400">
                        ٩:٤١ ص
                      </span>
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-caption font-caption text-neutral-500">
                    إلى: فريق التصميم، إدارة المنتج، البنية التحتية
                  </p>
                </div>
              </div>

              <h3 className="mt-2 font-body text-[13px] font-[600] leading-[19px] text-default-font">
                محضر اجتماع مراجعة نظام التصميم: تحديث مكونات الوسائط والصوت
                للربع الثاني ٢٠٢٥
              </h3>
              <p className="mt-1.5 text-body font-body leading-[20px] text-neutral-600">
                مرحباً جميعاً، أرفقت لكم محضر اجتماع مراجعة نظام التصميم مع
                التسجيل الصوتي الكامل والعرض التقديمي. تغطي المرفقات القرارات
                المتعلقة بمعايير إمكانية الوصول، والجدول الزمني المحدّث
                لمكونات الوسائط، وملاحظات المتابعة على سياسة الاحتفاظ
                بالمرفقات. نرجو مراجعتها وإضافة أي تعليقات قبل اجتماع الخميس.
              </p>

              {/* attachments (ds:MediaClip × 3 kinds/states) */}
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-caption font-caption text-neutral-500">
                    <PaperclipIcon className="h-3.5 w-3.5" />
                    المرفقات (٣)
                  </span>
                  <span className="font-code text-[10px] text-neutral-400">
                    48.2 MB
                  </span>
                </div>
                <div className="h-14">
                  <MediaClip
                    kind="audio"
                    state="selected"
                    label="تسجيل-الاجتماع-الشهري-نسخة-كاملة.m4a"
                    duration="01:12:04"
                  />
                </div>
                <div className="h-14">
                  <MediaClip
                    kind="video"
                    label="عرض-مراجعة-الربع-الثاني.mp4"
                    duration="04:38"
                  />
                </div>
                <div className="h-9">
                  <MediaClip
                    kind="text"
                    state="locked"
                    label="محضر.txt"
                    caption="محضر الاجتماع: القرارات والمعالم الرئيسية للربع القادم وملاحظات المتابعة"
                  />
                </div>
                <p className="text-caption font-caption leading-[16px] text-neutral-400">
                  المرفق الثالث محميّ برابط آمن منتهٍ — يلزم تسجيل الدخول
                  لإعادة تنزيله.
                </p>
              </div>

              {/* quick reply composer (ds:TextField) */}
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-solid border-default-border bg-panel p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-body text-[13px] font-[600] leading-[19px] text-default-font">
                    <ReplyIcon className="h-4 w-4 text-neutral-500" />
                    الرد السريع
                  </span>
                  <span className="text-caption font-caption text-neutral-400">
                    ١٢ مستلماً
                  </span>
                </div>

                <TextField
                  label="إلى"
                  helpText="سيُرسَل الرد إلى قائمة «فريق-التصميم» كاملة."
                >
                  <TextField.Input defaultValue="ميرنا عبد الرحمن، د. سليم حداد، ليلى منصور، فريق-التصميم@praxis-design.io، إدارة-المنتج" />
                </TextField>

                <TextField
                  label="مسودة الرد"
                  helpText="يُضاف التوقيع الافتراضي تلقائياً في نهاية الرسالة."
                >
                  <TextField.TextArea defaultValue={REPLY_DRAFT} />
                </TextField>

                <TextField
                  label="نسخة إلى (اختياري)"
                  error
                  helpText="أدخل عنوان بريد صالحاً — الرمز # غير مقبول في أسماء النطاقات."
                >
                  <TextField.Input defaultValue="laila.mansour#praxis-design.io" />
                </TextField>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-4 text-neutral-500">
                    <PaperclipIcon className="h-4 w-4" />
                    <StarIcon className="h-4 w-4" />
                    <ArchiveIcon className="h-4 w-4" />
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-sm bg-brand-primary px-4 py-2 font-body text-[13px] font-[600] leading-[16px] text-brand-primary-foreground"
                  >
                    <SendIcon className="h-4 w-4" />
                    إرسال الرد
                  </button>
                </div>
              </div>
            </article>

            {/* -- collapsed row: ops alert (unread) -- */}
            <article className="flex items-start gap-3 border-b border-solid border-default-border py-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-neutral-100 text-caption font-caption font-[600] text-neutral-600">
                ع
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-body text-[13px] font-[600] text-default-font">
                    منصة المراقبة — تنبيهات الإنتاج
                  </span>
                  <span className="flex flex-none items-center gap-1.5">
                    <PaperclipIcon className="h-3.5 w-3.5 text-neutral-400" />
                    <span className="h-2 w-2 rounded-full bg-brand-primary" />
                    <span className="text-caption font-caption text-neutral-400">
                      ٨:٠٢ ص
                    </span>
                  </span>
                </div>
                <p className="mt-0.5 truncate font-body text-[13px] leading-[19px] text-default-font">
                  تنبيه: تجاوز معدل الأخطاء ٥٪ من الطلبات في واجهة بريد الويب
                </p>
                <p className="mt-0.5 line-clamp-2 text-caption font-caption leading-[16px] text-neutral-500">
                  تم فتح حادث تلقائي وتعيينه لفريق الاستجابة الأولى. تجاوز
                  معدل الأخطاء الحدَّ المسموح في آخر ١٥ دقيقة، ويُطلب تأكيد
                  التحديث قبل الساعة ١٢:٠٠ ظهراً لتفادي التصعيد…
                </p>
              </div>
            </article>

            {/* -- collapsed row: retention policy (read) -- */}
            <article className="flex items-start gap-3 border-b border-solid border-default-border py-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-neutral-100 text-caption font-caption font-[600] text-neutral-600">
                س
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-body text-[13px] font-[600] text-default-font">
                    د. سليم حداد — إدارة العمليات
                  </span>
                  <span className="flex-none text-caption font-caption text-neutral-400">
                    أمس
                  </span>
                </div>
                <p className="mt-0.5 truncate font-body text-[13px] leading-[19px] text-default-font">
                  تحديث سياسة الاحتفاظ بالرسائل والمرفقات — إجراء مطلوب من
                  جميع الفرق
                </p>
                <p className="mt-0.5 line-clamp-2 text-caption font-caption leading-[16px] text-neutral-500">
                  بناءً على متطلبات الامتثال الجديدة، سيتم تطبيق سياسة احتفاظ
                  مدتها ٩٠ يوماً على جميع صناديق البريد المشتركة اعتباراً من
                  بداية الشهر القادم. يرجى مراجعة المرفقات المؤرشفة ونقل ما
                  يلزم قبل الموعد النهائي…
                </p>
              </div>
            </article>

            {/* -- collapsed row: design feedback (read) -- */}
            <article className="flex items-start gap-3 py-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-neutral-100 text-caption font-caption font-[600] text-neutral-600">
                ل
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-body text-[13px] font-[600] text-default-font">
                    ليلى منصور
                  </span>
                  <span className="flex-none text-caption font-caption text-neutral-400">
                    أمس
                  </span>
                </div>
                <p className="mt-0.5 truncate font-body text-[13px] leading-[19px] text-default-font">
                  ملاحظات سريعة على نماذج البحث الجديدة في لوحة التحكم
                </p>
                <p className="mt-0.5 line-clamp-2 text-caption font-caption leading-[16px] text-neutral-500">
                  شكراً على النموذج الأولي! لديّ تعليقان صغيران: حالة التركيز
                  في حقل البحث تبدو باهتة قليلاً على الجوال، والتباعد بين
                  الحقول المتجاورة ضيق في عرض الهاتف…
                </p>
              </div>
            </article>
          </section>

          <footer className="flex items-center justify-between gap-2 border-t border-solid border-default-border pt-3">
            <span className="text-caption font-caption text-neutral-500">
              آخر مزامنة: قبل ٣ دقائق · ٢٧ رسالة
            </span>
            <span className="font-code text-[10px] text-neutral-400">
              praxis-mail 4.2.1
            </span>
          </footer>
        </main>
      </div>
    </EvalShell>
  );
}
