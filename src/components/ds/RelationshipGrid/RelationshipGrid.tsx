"use client";

/**
 * RelationshipGrid — a related-records grid for entity detail pages: a sticky
 * panel header (ID / Title / Status / Priority / Updated), a monospace filter
 * row, and the linked records around the current one. It composes StatusBadge
 * from the indicators family for row status.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { StatusBadge } from "@/components/ds/StatusBadge";

export interface RelationshipGridRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const RelationshipGridRoot = React.forwardRef<
  HTMLDivElement,
  RelationshipGridRootProps
>(function RelationshipGridRoot(
  { className, ...otherProps }: RelationshipGridRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start overflow-hidden rounded-lg border border-solid border-default-border bg-default-background",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center border-b border-solid border-default-border bg-panel sticky top-0 z-10">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-neutral-500 uppercase select-none">
            {" "}
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="font-body text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-neutral-500 uppercase select-none">
            ID
          </span>
        </div>
        <div className="flex items-center self-stretch px-3 flex-1">
          <span className="font-body text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-neutral-500 uppercase select-none">
            Title
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <span className="font-body text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-neutral-500 uppercase select-none">
            Status
          </span>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="font-body text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-neutral-500 uppercase select-none">
            Priority ▾
          </span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3 py-2.5">
          <span className="font-body text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-neutral-500 uppercase select-none">
            Updated ▲
          </span>
        </div>
      </div>
      <div className="flex w-full items-center border-b border-solid border-default-border bg-default-background">
        <div className="flex w-10 flex-none items-center justify-center self-stretch" />
        <div className="flex w-9 flex-none items-center justify-center self-stretch" />
        <div className="flex w-[100px] flex-none items-center self-stretch px-3 py-1">
          <div className="flex h-[26px] grow shrink-0 basis-0 items-center rounded-[3px] border border-solid border-default-border px-2">
            <span className="text-code font-code text-neutral-400">Filter</span>
          </div>
        </div>
        <div className="flex items-center self-stretch px-3 py-1 flex-1">
          <div className="flex h-[26px] grow shrink-0 basis-0 items-center rounded-[3px] border border-solid border-default-border px-2">
            <span className="text-code font-code text-neutral-400">Filter</span>
          </div>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3 py-1">
          <div className="flex h-[26px] grow shrink-0 basis-0 items-center rounded-[3px] border border-solid border-default-border px-2">
            <span className="text-code font-code text-neutral-400">= open</span>
          </div>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3 py-1">
          <div className="flex h-[26px] grow shrink-0 basis-0 items-center rounded-[3px] border border-solid border-default-border px-2">
            <span className="text-code font-code text-neutral-400">Filter</span>
          </div>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch" />
      </div>
      <div className="flex h-9 w-full flex-none items-center border-b border-solid border-default-border">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▸
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            CHG-1189
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font">
            Replace BGP session on eu-edge-03
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="success">Open</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P1</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-21 09:14
          </span>
        </div>
      </div>
      <div className="flex h-9 w-full flex-none items-center border-b border-solid border-default-border bg-brand-50">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-center justify-center rounded-[3px] bg-brand-primary">
            <span className="font-body text-[10px] font-[700] leading-[10px] text-brand-primary-foreground">
              ✓
            </span>
          </div>
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▸
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            INC-40221
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font">
            Latency spike on us-west-2 cluster
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="live">In Progress</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P1</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-20 17:42
          </span>
        </div>
      </div>
      <div className="flex h-9 w-full flex-none items-center border-b border-solid border-default-border">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▾
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            PRB-0087
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font">
            Root cause analysis — BGP flap pattern
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="warning">Blocked</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P2</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-19 11:03
          </span>
        </div>
      </div>
      <div className="flex h-9 w-full flex-none items-center border-b border-solid border-default-border">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▸
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            RITM-5540
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font">
            Provision temp firewall rule for vendor
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="success">Open</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P2</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-18 14:27
          </span>
        </div>
      </div>
      <div className="flex h-9 w-full flex-none items-center border-b border-solid border-default-border">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▸
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            INC-39880
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font underline underline-offset-2 cursor-pointer">
            Parent INC-39880
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="live">In Progress</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P1</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-17 08:55
          </span>
        </div>
      </div>
      <div className="flex h-9 w-full flex-none items-center border-b border-solid border-default-border">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▸
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            CHG-1190
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font">
            Schedule maintenance window for patch
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="idle">Closed</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P2</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-16 22:10
          </span>
        </div>
      </div>
      <div className="flex h-9 w-full flex-none items-center">
        <div className="flex w-10 flex-none items-center justify-center self-stretch">
          <div className="flex h-3.5 w-3.5 flex-none items-start rounded-[3px] border border-solid border-default-border" />
        </div>
        <div className="flex w-9 flex-none items-center justify-center self-stretch">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▸
          </span>
        </div>
        <div className="flex w-[100px] flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">
            TASK-8812
          </span>
        </div>
        <div className="flex items-center self-stretch overflow-hidden px-3 flex-1">
          <span className="whitespace-nowrap text-body-medium font-body-medium text-default-font">
            Verify rollback procedure documented
          </span>
        </div>
        <div className="flex w-[120px] flex-none items-center self-stretch px-3">
          <StatusBadge tone="success">Open</StatusBadge>
        </div>
        <div className="flex w-20 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-default-font">P2</span>
        </div>
        <div className="flex w-40 flex-none items-center self-stretch px-3">
          <span className="text-code font-code text-neutral-500 tabular-nums">
            2026-08-15 06:33
          </span>
        </div>
      </div>
    </div>
  );
});

export const RelationshipGrid = RelationshipGridRoot;
