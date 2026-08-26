"use client";

/**
 * CanvasNode demo — two service nodes on a plain canvas area. The 1px edge
 * runs along the row's shared centerline, which is exactly where both cards'
 * port dots sit, so the wire reads as connected port-to-port. Static data.
 */

import React from "react";
import { CanvasNode } from "@/components/ds/CanvasNode";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[560px] flex-col items-start gap-2">
      <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
        flow · production
      </span>
      <div className="flex min-h-[280px] w-full flex-wrap items-center justify-center overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
        <CanvasNode
          title="checkout"
          statusTone="live"
          footer={
            <span className="font-code text-[11px] text-neutral-400">
              svc/checkout
            </span>
          }
        >
          <span className="text-code font-code text-default-font">
            p99 · 42ms
          </span>
          <span className="text-code font-code text-neutral-500">
            rps · 1,204
          </span>
        </CanvasNode>
        <div className="h-px w-16 flex-none bg-neutral-300" />
        <CanvasNode
          title="payments"
          statusTone="success"
          footer={
            <span className="font-code text-[11px] text-neutral-400">
              svc/payments
            </span>
          }
        >
          <span className="text-code font-code text-default-font">
            p99 · 88ms
          </span>
          <span className="text-code font-code text-neutral-500">
            rps · 412
          </span>
        </CanvasNode>
      </div>
    </div>
  );
}

export const demoSource = `<CanvasNode
  title="checkout"
  statusTone="live"
  footer={<span className="font-code text-[11px] text-neutral-400">svc/checkout</span>}
>
  <span className="text-code font-code text-default-font">p99 · 42ms</span>
  <span className="text-code font-code text-neutral-500">rps · 1,204</span>
</CanvasNode>

<CanvasNode
  title="payments"
  statusTone="success"
  footer={<span className="font-code text-[11px] text-neutral-400">svc/payments</span>}
>
  <span className="text-code font-code text-default-font">p99 · 88ms</span>
  <span className="text-code font-code text-neutral-500">rps · 412</span>
</CanvasNode>`;
