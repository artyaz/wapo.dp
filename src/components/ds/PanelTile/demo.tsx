"use client";

/**
 * PanelTile demo — two windowed tiles of label/value rows; the second uses the
 * focused variant to show the top accent rail.
 */

import { PanelTile } from "@/components/ds/PanelTile";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-baseline justify-between gap-4">
      <span className="min-w-0 truncate text-caption font-caption text-neutral-500">
        {label}
      </span>
      <span className="min-w-0 truncate font-code text-[13px] text-default-font tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="grid w-full max-w-[520px] grid-cols-1 gap-4 sm:grid-cols-2">
      <PanelTile title="Upstream · api-gateway">
        <div className="flex w-full flex-col gap-2.5">
          <Row label="Region" value="us-east-1" />
          <Row label="Instances" value="6" />
          <Row label="p99 latency" value="42.1ms" />
          <Row label="Error rate" value="0.12%" />
        </div>
      </PanelTile>
      <PanelTile variant="focused" title="Replica set · primary">
        <div className="flex w-full flex-col gap-2.5">
          <Row label="Replicas" value="3 / 3" />
          <Row label="Lag" value="0.4s" />
          <Row label="Storage" value="18.2 GB" />
          <Row label="Uptime" value="31d 04h" />
        </div>
      </PanelTile>
    </div>
  );
}

export const demoSource = `<PanelTile title="Upstream · api-gateway">
  <div className="flex w-full flex-col gap-2.5">
    <div className="flex w-full items-baseline justify-between gap-4">
      <span className="text-caption font-caption text-neutral-500">
        Region
      </span>
      <span className="font-code text-[13px] text-default-font tabular-nums">
        us-east-1
      </span>
    </div>
    <div className="flex w-full items-baseline justify-between gap-4">
      <span className="text-caption font-caption text-neutral-500">
        p99 latency
      </span>
      <span className="font-code text-[13px] text-default-font tabular-nums">
        42.1ms
      </span>
    </div>
  </div>
</PanelTile>`;
