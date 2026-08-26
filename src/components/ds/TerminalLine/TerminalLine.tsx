"use client";

/**
 * TerminalLine — one monospace line of terminal output, restyled per variant:
 * prompt (path $ command), stdout, spinner (⟳), success (✓) and stderr.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface TerminalLineRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "prompt" | "stdout" | "spinner" | "success" | "stderr";
  path?: React.ReactNode;
  command?: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
}

const TerminalLineRoot = React.forwardRef<
  HTMLDivElement,
  TerminalLineRootProps
>(function TerminalLineRoot(
  {
    variant = "prompt",
    path,
    command,
    text,
    className,
    ...otherProps
  }: TerminalLineRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/2f1a8c2e flex w-full min-w-0 items-start",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div
        className={SubframeUtils.twClassNames(
          "gap-1.5 items-baseline inline-flex",
          {
            hidden:
              variant === "stderr" ||
              variant === "success" ||
              variant === "spinner" ||
              variant === "stdout",
          }
        )}
      >
        {path ? (
          <span className="min-w-0 whitespace-pre-wrap text-code font-code text-success-600 [overflow-wrap:anywhere]">
            {path}
          </span>
        ) : null}
        <span className="flex-none whitespace-pre-wrap text-code font-code text-neutral-400">
          {"$"}
        </span>
      </div>
      {command ? (
        <span
          className={SubframeUtils.twClassNames(
            "min-w-0 whitespace-pre-wrap text-code font-code text-default-font ml-1.5 [overflow-wrap:anywhere]",
            {
              hidden:
                variant === "stderr" ||
                variant === "success" ||
                variant === "spinner" ||
                variant === "stdout",
            }
          )}
        >
          {command}
        </span>
      ) : null}
      <span
        className={SubframeUtils.twClassNames(
          "hidden flex-none whitespace-pre-wrap text-code font-code text-neutral-400 mr-1.5",
          { inline: variant === "spinner" }
        )}
      >
        {"⟳"}
      </span>
      <span
        className={SubframeUtils.twClassNames(
          "hidden flex-none whitespace-pre-wrap text-code font-code text-success-600 mr-1.5",
          { inline: variant === "success" }
        )}
      >
        {"✓"}
      </span>
      {text ? (
        <span
          className={SubframeUtils.twClassNames(
            "hidden min-w-0 whitespace-pre-wrap text-code font-code text-destructive-600 [overflow-wrap:anywhere]",
            {
              inline: variant === "stderr",
              "inline text-success-600": variant === "success",
              "inline text-neutral-500": variant === "spinner",
              "inline text-neutral-600": variant === "stdout",
            }
          )}
        >
          {text}
        </span>
      ) : null}
    </div>
  );
});

export const TerminalLine = TerminalLineRoot;
