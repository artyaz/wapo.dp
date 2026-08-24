"use client";

/**
 * Demo — the related-records grid exactly as authored: seven linked records
 * around one incident, with the current record checked and brand-tinted.
 * The wrapper is wider than the usual demo budget because the grid carries
 * 536px of source-fixed columns (checkbox, expander, ID, status, priority,
 * updated) plus the flexible title column.
 */

import React from "react";
import { RelationshipGrid } from "@/components/ds/RelationshipGrid";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[800px] flex-col">
      <RelationshipGrid />
    </div>
  );
}

export const demoSource = `<RelationshipGrid />`;
