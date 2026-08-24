"use client";

/**
 * AtmosphereScrim — a pure blur field: four stacked, gradient-masked
 * backdrop-blur layers (1 / 4 / 10 / 18px) that progressively defocus
 * content toward the bottom edge. No tint, no content of its own.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface AtmosphereScrimRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const AtmosphereScrimRoot = React.forwardRef<
  HTMLDivElement,
  AtmosphereScrimRootProps
>(function AtmosphereScrimRoot(
  { className, ...otherProps }: AtmosphereScrimRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-28 items-start pointer-events-none absolute inset-x-0 bottom-0 select-none",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex items-start absolute inset-x-0 inset-y-0 backdrop-blur-[1px] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.85)_0%,transparent_100%)]" />
      <div className="flex items-start absolute inset-x-0 bottom-0 h-[75%] backdrop-blur-[4px] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_100%)]" />
      <div className="flex items-start absolute inset-x-0 bottom-0 h-[50%] backdrop-blur-[10px] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_100%)]" />
      <div className="flex items-start absolute inset-x-0 bottom-0 h-[25%] backdrop-blur-[18px] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_100%)]" />
    </div>
  );
});

export const AtmosphereScrim = AtmosphereScrimRoot;
