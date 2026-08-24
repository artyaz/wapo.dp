"use client";

/**
 * ActivityEvent — one entry of a vertical activity timeline: a 3px rail
 * carrying a marker (filled dot for comments, hairline ring for system events,
 * @ glyph for email) beside author / subject / timestamp and a body line.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface ActivityEventRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "comment" | "system" | "email";
  author?: React.ReactNode;
  timestamp?: React.ReactNode;
  body?: React.ReactNode;
  subject?: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

const ActivityEventRoot = React.forwardRef<
  HTMLDivElement,
  ActivityEventRootProps
>(function ActivityEventRoot(
  {
    variant = "comment",
    author,
    timestamp,
    body,
    subject,
    isLast = false,
    className,
    ...otherProps
  }: ActivityEventRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/f651fa19 flex items-start gap-3 py-3",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-3 flex-none flex-col items-center self-stretch">
        <div className="flex h-5 flex-none items-center justify-center">
          <div
            className={SubframeUtils.twClassNames(
              "flex h-[7px] w-[7px] flex-none items-start rounded-[9999px] bg-neutral-400",
              {
                "h-auto w-auto bg-transparent": variant === "email",
                "border border-solid border-default-border bg-transparent":
                  variant === "system",
              }
            )}
          >
            <span
              className={SubframeUtils.twClassNames(
                "hidden text-code font-code text-neutral-500",
                { inline: variant === "email" }
              )}
            >
              @
            </span>
          </div>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex w-px items-start border-l border-solid border-default-border grow",
            {
              "border-l border-y-0 border-r-0 border-solid border-transparent":
                isLast,
            }
          )}
        />
      </div>
      <div className="flex min-w-[0px] flex-col items-start gap-1 grow">
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full min-w-[0px] gap-2 items-baseline",
            { hidden: variant === "system" }
          )}
        >
          {author ? (
            <span
              className={SubframeUtils.twClassNames(
                "whitespace-nowrap font-body text-[13px] font-[600] leading-[20px] text-default-font",
                { hidden: variant === "email" }
              )}
            >
              {author}
            </span>
          ) : null}
          {subject ? (
            <span
              className={SubframeUtils.twClassNames(
                "hidden min-w-[0px] whitespace-nowrap font-body text-[13px] font-[600] leading-[20px] text-default-font",
                { inline: variant === "email" }
              )}
            >
              {subject}
            </span>
          ) : null}
          {timestamp ? (
            <span className="whitespace-nowrap font-code text-[12px] font-[400] leading-[20px] text-neutral-500 tabular-nums">
              {timestamp}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-full gap-2 items-baseline",
            { flex: variant === "system" }
          )}
        >
          {body ? (
            <span className="font-code text-[12px] font-[400] leading-[20px] text-neutral-500 tabular-nums">
              {body}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full min-w-[0px] items-start",
            { hidden: variant === "system" }
          )}
        >
          {body ? (
            <span
              className={SubframeUtils.twClassNames(
                "self-stretch text-body-medium font-body-medium text-default-font",
                {
                  "whitespace-nowrap text-caption font-caption text-neutral-500":
                    variant === "email",
                }
              )}
            >
              {body}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export const ActivityEvent = ActivityEventRoot;
