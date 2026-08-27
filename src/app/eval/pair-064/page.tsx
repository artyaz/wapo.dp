"use client";

/**
 * EVAL page (pair-064) — "relay.config.ts · pending change" review sheet.
 * Components: ds:InspectorRow, ds:DiffRow, ds:GlassMaterialProvider.
 * Conditions: 390x420 (phone-half), dark theme, ltr, no-scroll.
 *
 * Story: the bottom half of a phone in the Praxis relay console, showing a
 * pending config change. A glass dock heads the sheet — GlassMaterialProvider
 * supplies the "thick" material level that GlassSurfaceSubtle inherits, and
 * its StrategyBadge reports the live rendering engine. Below it, DiffRow
 * shows the one-line change under review, and an InspectorRow panel lists
 * the proposed values that change produces (retention 90d → 180d).
 */

import React from "react";
import { useGlassRuntime } from "@/lib/glass";

import { EvalShell } from "@/eval/EvalShell";
import { InspectorRow } from "@/components/ds/InspectorRow";
import { DiffRow } from "@/components/ds/DiffRow";
import { GlassMaterialProvider } from "@/components/ds/GlassMaterialProvider";
import { GlassSurfaceSubtle } from "@/components/ds/GlassDisplacement/GlassSurfaceSubtle";

export default function Page() {
  const liveStrategy = useGlassRuntime((s) => s.strategy);

  return (
    <EvalShell theme="dark" dir="ltr">
      <GlassMaterialProvider level="thick" className="w-full">
        <div className="flex w-full flex-col gap-2.5 p-3">
          {/* glass dock — the surface inherits material="thick" from
              GlassMaterialProvider; the StrategyBadge shows the live engine tier */}
          <GlassSurfaceSubtle shape="capsule" className="h-11 w-full shrink-0">
            <div className="flex w-full items-center justify-between gap-3 px-4">
              <div className="flex min-w-0 items-baseline gap-1.5">
                <span className="truncate font-caption text-caption text-default-font">
                  relay.config.ts
                </span>
                <span className="shrink-0 font-caption text-caption text-neutral-500">
                  · pending
                </span>
              </div>
              <GlassMaterialProvider.StrategyBadge
                strategy={liveStrategy}
                active
                className="shrink-0"
              />
            </div>
          </GlassSurfaceSubtle>

          {/* the change under review */}
          <DiffRow className="w-full">
            <DiffRow.DiffLine
              lineType="hunk-header"
              code="@@ -12,3 +12,3 @@ relay"
            />
            <DiffRow.DiffLine
              lineType="context"
              oldNumber="12"
              newNumber="12"
              code="export const relay = {"
            />
            <DiffRow.DiffLine
              lineType="removed"
              oldNumber="13"
              code={<span className="pl-4">retentionDays: 90,</span>}
            />
            <DiffRow.DiffLine
              lineType="added"
              newNumber="13"
              code={<span className="pl-4">retentionDays: 180,</span>}
            />
            <DiffRow.DiffLine
              lineType="context"
              oldNumber="14"
              newNumber="14"
              code="}"
            />
          </DiffRow>

          {/* proposed values — the inspector reflects the diff above */}
          <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            <InspectorRow label="retention" variant="number" value="180d" />
            <InspectorRow label="host" variant="select" value="api.internal" />
            <InspectorRow label="visible" variant="toggle" checked />
            <InspectorRow label="accent" variant="color" value="#737373" />
          </div>
        </div>
      </GlassMaterialProvider>
    </EvalShell>
  );
}
