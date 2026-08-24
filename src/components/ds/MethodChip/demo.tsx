"use client";

/**
 * MethodChip demo — the five verbs in a row, then chips in a quiet endpoint
 * listing and a disabled state.
 */

import React from "react";
import { MethodChip } from "@/components/ds/MethodChip";

const methods = ["get", "post", "put", "patch", "delete"] as const;

const endpoints = [
  { method: "get" as const, path: "/v1/records", note: "List records" },
  { method: "post" as const, path: "/v1/records", note: "Create record" },
  { method: "delete" as const, path: "/v1/records/{id}", note: "Delete record" },
];

export default function Demo() {
  return (
    <div className="flex w-fit flex-col gap-6">
      <div className="flex items-center gap-2">
        {methods.map((method) => (
          <MethodChip key={method} method={method} />
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {endpoints.map(({ method, path, note }) => (
          <div key={`${method} ${path}`} className="flex items-center gap-3">
            <MethodChip method={method} />
            <code className="font-code text-[13px] leading-[18px] text-default-font">
              {path}
            </code>
            <span className="text-[13px] leading-[18px] text-neutral-500">
              {note}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <MethodChip method="get" disabled />
        <span className="text-[12px] leading-[18px] text-neutral-400">
          route disabled
        </span>
      </div>
    </div>
  );
}

export const demoSource = `<MethodChip method="get" />
<MethodChip method="post" />
<MethodChip method="put" />
<MethodChip method="patch" />
<MethodChip method="delete" />

<MethodChip method="get" disabled />`;
