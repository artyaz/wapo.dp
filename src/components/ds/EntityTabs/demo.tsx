"use client";

/**
 * EntityTabs demo — the tab strip over a quiet record detail panel.
 */

import React from "react";
import { EntityTabs } from "@/components/ds/EntityTabs";

const details: Array<[string, string]> = [
  ["Record", "REC-0042"],
  ["Owner", "m.ohara"],
  ["Updated", "2 hours ago"],
  ["State", "Indexed"],
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-[520px] flex-col">
      <EntityTabs />
      <div className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-2.5 px-1 pt-4">
        {details.map(([label, value]) => (
          <React.Fragment key={label}>
            <span className="text-[13px] leading-[18px] text-neutral-500">
              {label}
            </span>
            <span className="text-[13px] leading-[18px] text-default-font">
              {value}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export const demoSource = `<EntityTabs />

{/* TabItem is exported for composition inside custom strips */}
<EntityTabs.TabItem label="Activity" count="47" active />`;
