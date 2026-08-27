"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { MethodChip } from "@/components/ds/MethodChip";
import { PayloadInspector } from "@/components/ds/PayloadInspector";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  Trash2Icon,
} from "lucide-react";

/**
 * pair-117 — phone (390×844), light theme, ltr, dense-content.
 *
 * Scenario: a developer reviews the "order.events" webhook endpoint on their
 * phone — its route table (MethodChip rows), the outgoing event payload
 * (PayloadInspector) — and a destructive confirmation dialog is open over the
 * screen to revoke the endpoint's v2 signing version.
 */

const ROUTES: Array<{
  method: "get" | "post" | "put" | "patch" | "delete";
  disabled?: boolean;
  path: string;
  note: string;
  meta: string;
}> = [
  {
    method: "get",
    path: "/v1/orders",
    note: "List orders with cursor pagination plus status, channel and warehouse filters.",
    meta: "99.7% 2xx",
  },
  {
    method: "post",
    path: "/v1/orders/{orderId}/retry",
    note: "Requeue a failed fulfilment attempt and re-notify the customer by email and SMS.",
    meta: "1.2k/day",
  },
  {
    method: "put",
    path: "/v1/webhooks/order-events/subscriptions/{subscriptionId}",
    note: "Replace the full subscription definition for this endpoint in a single call.",
    meta: "212ms",
  },
  {
    method: "patch",
    path: "/v1/orders/{orderId}/shipping-address",
    note: "Partially update the delivery address before the parcel leaves the warehouse.",
    meta: "88ms",
  },
  {
    method: "delete",
    path: "/v1/orders/{orderId}",
    note: "Permanently delete a draft order together with its uncommitted line items.",
    meta: "410/day",
  },
  {
    method: "get",
    disabled: true,
    path: "/v1/orders/{orderId}/events",
    note: "Audit trail export · deprecated v1 · removed on 31 Mar 2026.",
    meta: "—",
  },
];

const PAYLOAD = `{
  "event": "order.created",
  "id": "evt_01HZX4K9M2P7QW3R8T5V6YB1NC",
  "createdAt": "2026-09-14T08:32:11.482Z",
  "deliveryAttempt": 2,
  "endpoint": "https://fulfilment.acme-partners.example.com/hooks/order-events",
  "order": {
    "number": "ACME-2026-88213",
    "channel": "web-storefront-eu",
    "currency": "EUR",
    "total": 148.5,
    "itemCount": 12,
    "customer": {
      "email": "brianna.osterkamp@acme-partners.example.com",
      "marketingOptIn": true,
      "locale": "en-DE"
    },
    "shippingAddress": {
      "line1": "Torstraße 140, Aufgang B, 3. OG",
      "city": "Berlin",
      "postalCode": "10119",
      "country": "DE"
    }
  },
  "retryPolicy": {
    "strategy": "exponential",
    "maxAttempts": 5,
    "nextAttemptAt": "2026-09-14T08:35:11Z"
  },
  "deduplicationKey": null
}`;

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-background text-foreground">
        {/* top bar */}
        <header className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back"
            className="text-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight">
              order.events
            </p>
            <p className="truncate font-code text-[11px] leading-[15px] text-muted-foreground">
              api.praxis.dev/v1 · webhook
            </p>
          </div>
          <span className="shrink-0 rounded-[4px] border border-border px-1.5 py-0.5 font-code text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            prod
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="More options"
            className="text-muted-foreground"
          >
            <EllipsisVerticalIcon />
          </Button>
        </header>

        {/* body */}
        <main className="flex flex-1 flex-col gap-5 px-4 py-4">
          {/* delivery status line */}
          <div className="flex items-center justify-between gap-3 text-[12px] leading-[16px]">
            <span className="flex min-w-0 items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span className="truncate text-muted-foreground">
                Delivering normally · 99.7% success (24 h)
              </span>
            </span>
            <span className="shrink-0 text-[11px] text-neutral-400">
              last event 2 m ago
            </span>
          </div>

          {/* route table */}
          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Routes
              </h2>
              <span className="font-code text-[11px] text-neutral-400">
                6 of 6
              </span>
            </div>
            <ul className="divide-y divide-border rounded-xl border border-border bg-card">
              {ROUTES.map((route) => (
                <li
                  key={route.path}
                  className="flex flex-col gap-1.5 px-3.5 py-3"
                >
                  <div className="flex items-center gap-2.5">
                    <MethodChip
                      method={route.method}
                      disabled={route.disabled}
                    />
                    <code className="min-w-0 flex-1 truncate font-code text-[12px] leading-[17px] text-foreground">
                      {route.path}
                    </code>
                    <span className="shrink-0 font-code text-[10.5px] text-neutral-400">
                      {route.meta}
                    </span>
                  </div>
                  <p className="text-[12px] leading-[16px] text-muted-foreground">
                    {route.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* outgoing payload */}
          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Outgoing payload
              </h2>
              <span className="truncate font-code text-[11px] text-neutral-400">
                order.created · v2
              </span>
            </div>
            <PayloadInspector
              language="json"
              filename="order.created.json"
              maxHeightClass="max-h-none"
              code={PAYLOAD}
            />
          </section>
        </main>

        {/* danger zone — destructive confirmation dialog open over the screen */}
        <div className="border-t border-border bg-muted/40 px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-tight">
                Endpoint version v2
              </p>
              <p className="mt-0.5 truncate text-[11.5px] leading-[15px] text-muted-foreground">
                Active since 14 Mar 2026 · 1,284 subscriptions
              </p>
            </div>
            <AlertDialog defaultOpen>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="outline"
                    className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2Icon />
                    Revoke
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>
                    Revoke endpoint version v2?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Version 2 of order.events will be revoked immediately.
                    1,284 active subscriptions — including the EU fulfilment
                    automation and the nightly reconciliation job — currently
                    deliver to it. In-flight events will receive a 410 Gone
                    response and will not be retried. This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep version</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Revoke endpoint
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
