"use client";

import React from "react";
import type { PropDoc } from "@/lib/docs/types";
import { twClassNames } from "@/lib/subframe/utils";

export function PropTable({ props }: { props: PropDoc[] }) {
  if (!props || props.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-lg border border-default-border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-default-border bg-neutral-100">
            <th className="px-4 py-2.5 font-code text-[11px] font-medium tracking-[0.1em] text-neutral-500 uppercase">
              Prop
            </th>
            <th className="hidden px-4 py-2.5 font-code text-[11px] font-medium tracking-[0.1em] text-neutral-500 uppercase sm:table-cell">
              Type
            </th>
            <th className="hidden px-4 py-2.5 font-code text-[11px] font-medium tracking-[0.1em] text-neutral-500 uppercase md:table-cell">
              Default
            </th>
            <th className="px-4 py-2.5 font-code text-[11px] font-medium tracking-[0.1em] text-neutral-500 uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-default-border/60 last:border-0"
            >
              <td className="px-4 py-3 align-top">
                <code className="font-code text-[12.5px] font-medium text-default-font">
                  {prop.name}
                </code>
              </td>
              <td className="hidden px-4 py-3 align-top sm:table-cell">
                <code className="font-code text-[12px] text-neutral-500">
                  {prop.type}
                </code>
              </td>
              <td className="hidden px-4 py-3 align-top md:table-cell">
                <code className="font-code text-[12px] text-neutral-500">
                  {prop.default ?? "—"}
                </code>
              </td>
              <td className="px-4 py-3 align-top text-body-medium text-neutral-600 dark:text-neutral-500">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
