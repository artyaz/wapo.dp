"use client";

/**
 * InlineChips — inline semantic chips & badges for AI chat prose.
 *
 * Three atoms that embed seamlessly in flowing text without breaking line
 * wrap:
 *   • IntegrationAvatar — a tiny dark square chip with rounded corners and a
 *     white brand glyph (e.g. "S" for Superblocks).
 *   • CodePill — a subtle grey container (#2a2a2a-class) with light
 *     monospaced text, 2–4px corner radius, 2px 6px padding.
 *   • FileRef — a filetype icon (blue TS badge, {} JSON symbol) followed by
 *     colored link text, acting as a navigable code link.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

/* ------------------------------------------------------------------ */
/* IntegrationAvatar                                                   */
/* ------------------------------------------------------------------ */

export interface IntegrationAvatarProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Brand glyph — a single letter or short mark, rendered in white. */
  glyph?: React.ReactNode;
  /** Chip edge length in px. */
  size?: number;
}

const IntegrationAvatar = React.forwardRef<
  HTMLSpanElement,
  IntegrationAvatarProps
>(function IntegrationAvatar(
  { glyph = "S", size = 16, className, ...otherProps },
  ref
) {
  return (
    <span
      ref={ref}
      style={{ width: size, height: size }}
      className={SubframeUtils.twClassNames(
        // tiny dark square chip, rounded corners, white brand glyph —
        // sized to sit on the prose baseline without breaking line height
        "inline-flex flex-none items-center justify-center align-[-3px]",
        "rounded-[4px] bg-neutral-800 text-neutral-100",
        "font-[600] leading-none",
        className
      )}
      {...otherProps}
    >
      <span
        className="select-none"
        style={{ fontSize: Math.max(8, Math.round(size * 0.56)) }}
      >
        {glyph}
      </span>
    </span>
  );
});

/* ------------------------------------------------------------------ */
/* CodePill                                                            */
/* ------------------------------------------------------------------ */

export interface CodePillProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const CodePill = React.forwardRef<HTMLSpanElement, CodePillProps>(
  function CodePill({ children, className, ...otherProps }, ref) {
    return (
      <span
        ref={ref}
        className={SubframeUtils.twClassNames(
          // subtle grey container, light mono text, 2–4px radius, 2px 6px
          "mx-[2px] inline-flex max-w-full items-baseline rounded-[3px]",
          "bg-neutral-800 px-1.5 py-0.5 align-baseline",
          "font-code text-[12px] leading-[16px] text-neutral-300",
          "whitespace-nowrap break-all",
          className
        )}
        {...otherProps}
      >
        {children}
      </span>
    );
  }
);

/* ------------------------------------------------------------------ */
/* FileRef                                                             */
/* ------------------------------------------------------------------ */

export interface FileRefProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Filetype — selects the badge icon and link hue. */
  kind?: "ts" | "tsx" | "json" | "md" | "css" | "generic";
  /** File name rendered as link text. */
  children?: React.ReactNode;
  /** Optional path caption after the name. */
  path?: React.ReactNode;
}

/** 14px filetype badges — compact squares with the type mark. */
function FileTypeBadge({ kind }: { kind: NonNullable<FileRefProps["kind"]> }) {
  const badge = (text: string, classes: string) => (
    <span
      className={SubframeUtils.twClassNames(
        "inline-flex h-[14px] min-w-[18px] flex-none items-center justify-center rounded-[3px] px-[3px] align-[-2px]",
        "font-[600] text-[8px] leading-none tracking-[0.04em] uppercase",
        classes
      )}
    >
      {text}
    </span>
  );
  switch (kind) {
    case "ts":
    case "tsx":
      // blue TS badge
      return badge(kind, "bg-[#3178c6] text-white");
    case "json":
      // {} JSON symbol — neutral square with brace mark
      return badge("{ }", "bg-neutral-700 text-neutral-200");
    case "css":
      return badge("css", "bg-[#663399] text-white");
    case "md":
      return badge("md", "bg-neutral-600 text-neutral-100");
    default:
      return badge("txt", "bg-neutral-700 text-neutral-300");
  }
}

const FileRef = React.forwardRef<HTMLSpanElement, FileRefProps>(
  function FileRef(
    { kind = "generic", children, path, className, ...otherProps },
    ref
  ) {
    return (
      <span
        ref={ref}
        className={SubframeUtils.twClassNames(
          "inline-flex max-w-full items-baseline gap-1.5 align-baseline",
          "cursor-pointer rounded-[3px] transition-colors hover:brightness-110",
          className
        )}
        {...otherProps}
      >
        <FileTypeBadge kind={kind} />
        <span className="min-w-0 truncate font-code text-[12px] leading-[16px] text-[#7aa7ff] underline decoration-[#7aa7ff]/40 underline-offset-[3px]">
          {children}
        </span>
        {path ? (
          <span className="min-w-0 truncate font-code text-[11px] leading-[16px] text-neutral-600">
            {path}
          </span>
        ) : null}
      </span>
    );
  }
);

/* ------------------------------------------------------------------ */
/* Exports — atoms directly, plus the InlineChips namespace            */
/* ------------------------------------------------------------------ */

export { IntegrationAvatar, CodePill, FileRef };

export const InlineChips = {
  IntegrationAvatar,
  CodePill,
  FileRef,
};
