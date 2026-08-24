"use client";

/**
 * ScrimTop — the top-anchored mirror of AtmosphereScrim.
 *
 * Progressive blur for content scrolling up into a header: four nested layers
 * (nominal 1/4/10/18px) with extents 100/75/50/25% anchored to the top edge,
 * each masked to fade from full strength at the top to zero at its bottom
 * extent. The composite is strictly monotonic — no seams at any boundary.
 *
 * Docked beneath a fixed header bar; pointer-events pass through.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";

export interface ScrimTopProps extends React.HTMLAttributes<HTMLDivElement> {
  /** total scrim height, default h-28 */
  height?: string;
}

export function ScrimTop({ height = "h-28", className, ...rest }: ScrimTopProps) {
  return (
    <div
      aria-hidden="true"
      className={twClassNames(
        "pointer-events-none absolute inset-x-0 top-0 select-none",
        height,
        className
      )}
      {...rest}
    >
      <div className="absolute inset-x-0 top-0 h-full backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85)_0%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[75%] backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[50%] backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[25%] backdrop-blur-[18px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,transparent_100%)]" />
    </div>
  );
}
