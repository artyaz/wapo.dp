"use client";

/**
 * InspectorRow — a key/value row for IDE properties panels: a fixed-width
 * label plus a variant-controlled value control (text field, number stepper,
 * toggle, color swatch or select).
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface InspectorRowRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  label?: React.ReactNode;
  variant?: "text" | "number" | "toggle" | "color" | "select";
  value?: React.ReactNode;
  checked?: boolean;
  color?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const InspectorRowRoot = React.forwardRef<
  HTMLDivElement,
  InspectorRowRootProps
>(function InspectorRowRoot(
  {
    label,
    variant = "text",
    value,
    checked = false,
    color,
    children,
    className,
    ...otherProps
  }: InspectorRowRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/4f1d3bcc flex w-full items-center gap-3 px-3 py-2.5 border-b border-solid border-default-border/50",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {label ? (
        <span className="w-24 flex-none whitespace-nowrap text-caption font-caption text-neutral-500 overflow-hidden text-ellipsis">
          {label}
        </span>
      ) : null}
      <div className="flex grow shrink-0 basis-0 items-center justify-end">
        {children ? <div className="flex items-center">{children}</div> : null}
        <div
          className={SubframeUtils.twClassNames(
            "flex grow shrink-0 basis-0 items-start",
            {
              hidden:
                variant === "select" ||
                variant === "color" ||
                variant === "toggle" ||
                variant === "number",
            }
          )}
        >
          <input
            className="h-7 grow shrink-0 basis-0 rounded-sm border-2 border-solid border-default-border bg-panel px-2 text-caption font-caption text-default-font outline-none placeholder:text-neutral-400 focus:border-neutral-600"
            placeholder=""
            value=""
            type="text"
          />
        </div>
        <div
          className={SubframeUtils.twClassNames("hidden items-center", {
            flex: variant === "number",
          })}
        >
          <div className="flex h-6 w-6 flex-none items-center justify-center border-2 border-solid border-default-border cursor-pointer text-default-font hover:bg-neutral-100 active:bg-neutral-200">
            <span className="text-caption font-caption text-default-font">
              −
            </span>
          </div>
          {value ? (
            <span className="min-w-[36px] text-caption font-caption text-default-font text-center tabular-nums">
              {value}
            </span>
          ) : null}
          <div className="flex h-6 w-6 flex-none items-center justify-center border-2 border-solid border-default-border cursor-pointer text-default-font hover:bg-neutral-100 active:bg-neutral-200">
            <span className="text-caption font-caption text-default-font">
              +
            </span>
          </div>
        </div>
        <div
          className={SubframeUtils.twClassNames("hidden items-center", {
            flex: variant === "toggle",
          })}
        >
          <div
            className={SubframeUtils.twClassNames(
              "flex h-5 w-8 flex-none items-center rounded-sm border-2 border-solid border-default-border bg-neutral-200 px-0.5 cursor-pointer",
              {
                "border-2 border-solid border-brand-primary bg-brand-primary":
                  checked,
              }
            )}
          >
            <div
              className={SubframeUtils.twClassNames(
                "flex h-3 w-3 flex-none items-start rounded-[2px] bg-panel",
                { "ml-auto": checked }
              )}
            />
          </div>
        </div>
        <div
          className={SubframeUtils.twClassNames("hidden items-center gap-2", {
            flex: variant === "color",
          })}
        >
          <div className="flex h-3 w-3 flex-none items-start border-2 border-solid border-default-border bg-neutral-500" />
          {value ? (
            <span className="text-code font-code text-default-font tabular-nums">
              {value}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden grow shrink-0 basis-0 items-start",
            { flex: variant === "select" }
          )}
        >
          <div className="flex h-7 grow shrink-0 basis-0 items-center gap-1 rounded-sm border-2 border-solid border-default-border bg-panel px-2 cursor-pointer hover:border-neutral-400 focus-within:border-neutral-600">
            {value ? (
              <span className="grow shrink-0 basis-0 whitespace-nowrap text-caption font-caption text-default-font">
                {value}
              </span>
            ) : null}
            <svg
              className="text-caption font-caption text-neutral-500 flex-none"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                d="m6 9 6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

export const InspectorRow = InspectorRowRoot;
