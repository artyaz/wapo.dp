"use client";

/**
 * ComponentPreview — live demo + source + props tabs, the workhorse of the
 * component detail pages.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { CodeBlock } from "./CodeBlock";
import { PropTable } from "./PropTable";
import { DemoStage, type DemoStageVariant } from "./DemoStage";
import type { PropDoc } from "@/lib/docs/types";

type Tab = "preview" | "code" | "props";

export interface ComponentPreviewProps {
  title?: string;
  /** JSX source shown in the Code tab */
  source?: string;
  props?: PropDoc[];
  /** render inside a DemoStage over busy content */
  stage?: false | DemoStageVariant;
  stageHeight?: string;
  dark?: boolean;
  /** transparent background for in-flow components */
  frame?: "stage" | "plain" | "none";
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  title,
  source,
  props,
  stage = "plain",
  stageHeight = "h-64",
  dark = false,
  frame = "stage",
  children,
  className,
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<Tab>("preview");

  const tabs: Array<{ id: Tab; label: string; disabled?: boolean }> = [
    { id: "preview", label: "Preview" },
    { id: "code", label: "Code", disabled: !source },
    { id: "props", label: "Props", disabled: !props || props.length === 0 },
  ];

  return (
    <div className={twClassNames("w-full", className)}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-[9999px] border border-default-border bg-panel p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={t.disabled}
              onClick={() => setTab(t.id)}
              className={twClassNames(
                "cursor-pointer rounded-[9999px] px-3 py-1.5 text-[13px] font-medium transition-colors",
                tab === t.id
                  ? "bg-default-font/[0.06] text-default-font"
                  : "text-neutral-500 hover:text-default-font",
                t.disabled && "cursor-not-allowed opacity-40 hover:text-neutral-500"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        {title ? (
          <span className="font-code text-[11px] tracking-[0.08em] text-neutral-400 uppercase">
            {title}
          </span>
        ) : null}
      </div>

      {tab === "preview" ? (
        frame === "stage" ? (
          <DemoStage variant={stage === false ? "plain" : stage} height={stageHeight} dark={dark}>
            {children}
          </DemoStage>
        ) : frame === "plain" ? (
          <div className="rounded-lg border border-default-border bg-default-background p-6">
            {children}
          </div>
        ) : (
          children
        )
      ) : null}

      {tab === "code" && source ? <CodeBlock code={source} /> : null}
      {tab === "props" && props ? <PropTable props={props} /> : null}
    </div>
  );
}
