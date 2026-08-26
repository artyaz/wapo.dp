"use client";

/**
 * MaterialTokens demo — the component rendered directly; it is itself the
 * live reference card for the four-level glass ramp.
 */

import React from "react";
import { MaterialTokens } from "@/components/ds/MaterialTokens";

export default function Demo() {
  return (
    // definite width — the stage's content wrapper is a flex container whose
    // width depends on its children, so w-full would collapse to min-content
    <div className="w-[min(480px,calc(100vw-112px))]">
      <MaterialTokens />
    </div>
  );
}

export const demoSource = `<MaterialTokens />`;
