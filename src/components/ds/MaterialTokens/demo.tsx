"use client";

/**
 * MaterialTokens demo — the component rendered directly; it is itself the
 * live reference card for the four-level glass ramp.
 */

import React from "react";
import { MaterialTokens } from "@/components/ds/MaterialTokens";

export default function Demo() {
  return (
    <div className="w-full max-w-[480px]">
      <MaterialTokens />
    </div>
  );
}

export const demoSource = `<MaterialTokens />`;
