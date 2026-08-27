"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { PayloadInspector } from "@/components/ds/PayloadInspector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Headset, SendHorizontal } from "lucide-react";

const WEBHOOK_PAYLOAD = `{
  "event": "invoice.paid",
  "id": "evt_9f2ka01x",
  "attempt": 3,
  "maxAttempts": 5,
  "statusCode": 502,
  "endpoint": "https://api.souq-ae.com/pay",
  "receivedAt": "2026-08-26T12:04Z"
}`;

const DELIVERY_ATTEMPTS = [
  { time: "12:04", event: "invoice.paid", ok: false, code: 502 },
  { time: "11:58", event: "invoice.paid", ok: false, code: 504 },
  { time: "11:41", event: "invoice.paid", ok: true, code: 200 },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col">
        {/* app bar */}
        <header className="flex items-center gap-3 border-b px-4 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
            <Headset className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold">دعم التكاملات</h1>
            <p className="truncate text-xs text-muted-foreground">
              تكامل بوابة الدفع · Webhook
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            متصل
          </span>
        </header>

        {/* conversation */}
        <main className="flex flex-1 flex-col px-4 py-4">
          <MessageGroup>
            {/* agent turn — shares the raw webhook payload */}
            <Message>
              <MessageAvatar className="bg-neutral-200 text-[11px] font-semibold text-neutral-700">
                ندى
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>
                  ندى · فريق الدعم
                  <span className="text-xs font-normal text-muted-foreground">
                    12:05 م
                  </span>
                </MessageHeader>
                <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-muted px-3.5 py-2.5 text-sm leading-6">
                  وصلنا بلاغك بخصوص فشل تسليم أحداث الويب هوك. هذه آخر حمولة
                  استقبلناها من بوابتكم:
                </div>
                <PayloadInspector
                  language="json"
                  filename="webhook.json"
                  code={WEBHOOK_PAYLOAD}
                  maxHeightClass="max-h-[260px]"
                  className="max-w-[92%]"
                />
                <MessageFooter className="text-xs">12:05 م</MessageFooter>
              </MessageContent>
            </Message>

            {/* user turn */}
            <Message align="end">
              <MessageContent>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-neutral-900 px-3.5 py-2.5 text-sm leading-6 text-white">
                  شكرًا! كم محاولة تسليم فشلت خلال الساعة الأخيرة؟
                </div>
                <MessageFooter className="text-xs">
                  تم الإرسال · 12:06 م
                </MessageFooter>
              </MessageContent>
            </Message>

            {/* agent turn — delivery attempts table */}
            <Message>
              <MessageAvatar className="bg-neutral-200 text-[11px] font-semibold text-neutral-700">
                ندى
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>
                  ندى · فريق الدعم
                  <span className="text-xs font-normal text-muted-foreground">
                    12:07 م
                  </span>
                </MessageHeader>
                <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-muted px-3.5 py-2.5 text-sm leading-6">
                  ثلاث محاولات خلال الساعة الأخيرة — آخرها قبل دقيقتين:
                </div>
                <div className="max-w-[92%] overflow-hidden rounded-xl border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[64px]">الوقت</TableHead>
                        <TableHead>الحدث</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {DELIVERY_ATTEMPTS.map((attempt) => (
                        <TableRow key={attempt.time}>
                          <TableCell className="font-medium tabular-nums">
                            {attempt.time}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {attempt.event}
                          </TableCell>
                          <TableCell>
                            {attempt.ok ? (
                              <span className="text-emerald-600">
                                نجحت · {attempt.code}
                              </span>
                            ) : (
                              <span className="text-destructive">
                                فشل · {attempt.code}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <MessageFooter className="text-xs">12:07 م</MessageFooter>
              </MessageContent>
            </Message>
          </MessageGroup>
        </main>

        {/* composer */}
        <footer className="border-t px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-11 min-w-0 flex-1 items-center rounded-full border bg-muted/40 px-4 text-sm text-muted-foreground">
              اكتب رسالة…
            </div>
            <button
              type="button"
              aria-label="إرسال"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white"
            >
              <SendHorizontal className="size-4 -scale-x-100" />
            </button>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
