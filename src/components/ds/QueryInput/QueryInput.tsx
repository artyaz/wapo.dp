"use client";

/**
 * QueryInput — a read-only query field for search and observability consoles.
 * Shows the focused state (a syntax-highlighted expression with a live run
 * affordance) above the resting placeholder state.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface QueryInputRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const QueryInputRoot = React.forwardRef<HTMLDivElement, QueryInputRootProps>(
  function QueryInputRoot(
    { className, ...otherProps }: QueryInputRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-5",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-1.5">
          <span className="font-body text-[13px] font-[700] leading-[19px] tracking-[0.14em] text-neutral-400 uppercase select-none">
            FOCUSED
          </span>
          <div className="flex w-full overflow-hidden rounded-[3px] border-2 border-solid border-neutral-500 bg-panel items-stretch">
            {/* Query code is inherently LTR — isolate the line from the RTL
                page direction so tokens neither mirror nor reorder, and let
                the spans flow inline so inter-token spaces render and
                wrapping happens on word boundaries. */}
            <div
              dir="ltr"
              className="text-code font-code min-w-0 flex-1 px-3 py-2 text-start"
            >
              <span className="text-code font-code text-neutral-500">rate</span>
              <span className="text-code font-code text-default-font">
                (errors_total{" "}
              </span>
              <span className="font-code text-[13px] font-[600] leading-[20px] text-default-font">
                where
              </span>
              <span className="text-code font-code text-default-font">
                {" "}
                env=
              </span>
              <span className="text-code font-code text-success-700">
                &quot;prod&quot;
              </span>
              <span className="text-code font-code text-default-font"> </span>
              <span className="font-code text-[13px] font-[600] leading-[20px] text-default-font">
                and
              </span>
              <span className="text-code font-code text-default-font">
                {" "}
                tier=
              </span>
              <span className="text-code font-code text-success-700">
                &quot;edge&quot;
              </span>
              <span className="text-code font-code text-default-font">) </span>
              <span className="font-code text-[13px] font-[600] leading-[20px] text-default-font">
                by
              </span>
              <span className="text-code font-code text-default-font">
                {" "}
                (service) / 60
              </span>
            </div>
            <div className="flex w-10 flex-none items-center justify-center self-stretch bg-brand-primary shrink-0">
              <span className="font-body text-[11px] font-[400] leading-[11px] text-brand-primary-foreground">
                ▶
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-1.5">
          <span className="font-body text-[13px] font-[700] leading-[19px] tracking-[0.14em] text-neutral-400 uppercase select-none">
            PLACEHOLDER
          </span>
          <div className="flex w-full overflow-hidden rounded-[3px] border-2 border-solid border-default-border bg-panel items-stretch">
            <div dir="ltr" className="flex min-w-0 flex-1 items-start px-3 py-2 text-start">
              <span className="text-code font-code text-neutral-400">
                query metrics, logs, traces…
              </span>
            </div>
            <div className="flex w-10 flex-none items-center justify-center self-stretch bg-brand-primary shrink-0 opacity-40">
              <span className="font-body text-[11px] font-[400] leading-[11px] text-brand-primary-foreground">
                ▶
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export const QueryInput = QueryInputRoot;
