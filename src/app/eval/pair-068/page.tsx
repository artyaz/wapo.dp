"use client";

/**
 * EVAL page (pair-068) — "image gallery with metadata" on the bottom half of
 * a phone. Components: ds:Sheet, ds:InspectorRow, ui:tooltip.
 * Conditions: 390x420 (phone-half), dark theme, ltr.
 *
 * Story: a monochrome photo roll ("Field Studies · Roll 12") in the Praxis
 * gallery. The top bar and filmstrip of five frames sit behind the 34%-ink
 * scrim of an open bottom Sheet — the metadata inspector for the selected
 * frame (IMG_2841.heic): album, star rating, favorite and tint are edited
 * through InspectorRow variants. The sync-status icon in the sheet header
 * carries a default-open Tooltip explaining that edits apply once the
 * original HEIF finishes syncing.
 */

import React from "react";
import { ChevronLeftIcon, InfoIcon } from "lucide-react";
import * as SubframeCore from "@/lib/subframe/core";

import { EvalShell } from "@/eval/EvalShell";
import { Sheet } from "@/components/ds/Sheet";
import { InspectorRow } from "@/components/ds/InspectorRow";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

/** Monochrome "frames" of the roll — the third one is selected. */
const TILES = [
  "bg-gradient-to-tl from-neutral-700 via-neutral-800 to-neutral-900",
  "bg-gradient-to-t from-neutral-600 to-neutral-800",
  "bg-gradient-to-br from-neutral-500 via-neutral-700 to-neutral-900",
  "bg-gradient-to-t from-neutral-700 to-neutral-500",
  "bg-gradient-to-tr from-neutral-800 via-neutral-600 to-neutral-400",
];
const SELECTED = 2;

export default function Page() {
  const [sheetOpen, setSheetOpen] = React.useState(true);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="relative h-screen w-full overflow-hidden">
        {/* ---- gallery chrome (behind the sheet scrim) ---- */}
        <div className="flex h-12 items-center gap-2 px-4">
          <div className="-ml-2 flex h-10 w-10 flex-none cursor-pointer items-center justify-center text-default-font">
            <ChevronLeftIcon className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="truncate font-body-medium text-body-medium text-default-font">
              Field Studies
            </span>
            <span className="flex-none font-caption text-caption text-neutral-500">
              Roll 12
            </span>
          </div>
          <span className="ml-auto font-code text-caption text-neutral-500 tabular-nums">
            3 / 128
          </span>
        </div>

        {/* filmstrip of the roll */}
        <div className="flex items-center gap-2 px-3 pb-2 pt-1">
          {TILES.map((tile, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={`h-16 w-16 flex-none rounded-md ${tile} ${
                i === SELECTED
                  ? "border-2 border-default-font/80"
                  : "border-2 border-default-border/40"
              }`}
            />
          ))}
        </div>

        {/* ---- metadata sheet for the selected frame ---- */}
        {sheetOpen ? (
          <Sheet
            open
            onOpenChange={setSheetOpen}
            modal={false}
            className="absolute inset-0"
          >
            <Sheet.Content
              aria-describedby={undefined}
              onPointerDownOutside={(event: Event) => event.preventDefault()}
            >
              <div className="flex w-full items-center gap-3">
                <div className="h-10 w-10 flex-none rounded-md border border-solid border-default-border bg-gradient-to-br from-neutral-500 via-neutral-700 to-neutral-900" />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <SubframeCore.Dialog.Title className="w-full truncate font-body-medium text-body-medium text-default-font">
                    IMG_2841.heic
                  </SubframeCore.Dialog.Title>
                  <p className="w-full truncate font-caption text-caption text-neutral-500">
                    4032 × 3024 · HEIF · 12.4 MB
                  </p>
                </div>

                {/* sync status — tooltip rendered open for the audit */}
                <Tooltip defaultOpen>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Sync status"
                        className="ml-auto flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-md border border-solid border-default-border bg-default-background text-neutral-500 hover:text-default-font"
                      >
                        <InfoIcon className="h-4 w-4" />
                      </button>
                    }
                  />
                  <TooltipContent side="top" sideOffset={6}>
                    <p>Original still syncing · edits apply on arrival</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* metadata inspector */}
              <div className="flex w-full flex-col overflow-hidden rounded-md border border-solid border-default-border">
                <InspectorRow
                  label="album"
                  variant="select"
                  value="Dune series"
                />
                <InspectorRow label="rating" variant="number" value="5" />
                <InspectorRow label="favorite" variant="toggle" checked />
                <InspectorRow
                  label="tint"
                  variant="color"
                  value="#8F8C84"
                />
              </div>
            </Sheet.Content>
          </Sheet>
        ) : null}
      </div>
    </EvalShell>
  );
}
