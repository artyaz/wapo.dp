"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { RecordHeader } from "@/components/ds/RecordHeader";

/**
 * Scenario: a support agent reviewing a billing ticket on a small phone.
 * RecordHeader identifies the ticket, the Input filters the thread,
 * the Accordion holds the expandable case details.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-default-background text-default-font">
        <RecordHeader
          breadcrumb="Support / Tickets / Billing"
          title="Refund stuck"
          recordId="TCK-0912"
          meta="Opened Mar 3, 2025 · Priority high · 2 replies"
          secondaryAction="Export"
          primaryAction="Escalate"
        />

        <main className="flex flex-1 flex-col gap-5 px-5 py-5">
          <section className="flex flex-col gap-2">
            <label
              htmlFor="ticket-search"
              className="text-caption font-caption uppercase tracking-[0.08em] text-neutral-500"
            >
              Search ticket
            </label>
            <Input
              id="ticket-search"
              type="search"
              placeholder="Messages, notes and events"
            />
          </section>

          <section className="flex flex-col">
            <span className="mb-1 text-caption font-caption uppercase tracking-[0.08em] text-neutral-500">
              Case details
            </span>
            <Accordion defaultValue={["report"]} className="w-full">
              <AccordionItem value="report">
                <AccordionTrigger>What the customer reported</AccordionTrigger>
                <AccordionContent>
                  Customer ordered a jacket (order #8841) on Feb 28 and
                  returned it on Mar 6. The refund was promised within 5
                  business days, but the payout still shows as “Processing”
                  after 9 days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="events">
                <AccordionTrigger>Payment events</AccordionTrigger>
                <AccordionContent>
                  Mar 6 — Return received at warehouse. Mar 7 — Refund of
                  $128.00 queued to card •••• 4242. Mar 12 — Issuer
                  acknowledged, payout pending reconciliation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="policy">
                <AccordionTrigger>Refund policy</AccordionTrigger>
                <AccordionContent>
                  Card refunds settle within 5–10 business days of the issuer
                  acknowledging the credit. After day 10, escalate to the
                  payments team with the acquirer reference.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </main>

        <footer className="border-t border-solid border-default-border px-5 py-3">
          <p className="text-caption font-caption text-neutral-500">
            SLA reply due in 6h 12m · Assigned to you
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
