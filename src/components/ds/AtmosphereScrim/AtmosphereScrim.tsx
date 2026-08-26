"use client";

/**
 * AtmosphereScrim — a pure blur field: four stacked, gradient-masked
 * backdrop-blur layers (1 / 4 / 10 / 18px) that progressively defocus
 * content toward the bottom edge. No tint, no content of its own.
 *
 * Structure note (Chromium): the upward gradient mask lives on a WRAPPER
 * while backdrop-filter lives on the CHILD. Chromium drops backdrop-filter
 * entirely when both land on the same element (the blur simply does not
 * render), so the split is load-bearing — keep them separated.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface AtmosphereScrimRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/** upward fade mask — opaque at the bottom edge, transparent at the top */
function fadeMask(fromAlpha: number): React.CSSProperties {
  const gradient = `linear-gradient(to top, rgba(0, 0, 0, ${fromAlpha}) 0%, transparent 100%)`;
  return {
    maskImage: gradient,
    WebkitMaskImage: gradient,
  } as React.CSSProperties;
}

/** one progressive-blur step: masked wrapper + blurred child */
function BlurBand({
  className,
  blur,
  mask,
}: {
  className: string;
  blur: string;
  mask: React.CSSProperties;
}) {
  return (
    <div className={className} style={mask}>
      <div className={`absolute inset-0 ${blur}`} />
    </div>
  );
}

const AtmosphereScrimRoot = React.forwardRef<
  HTMLDivElement,
  AtmosphereScrimRootProps
>(function AtmosphereScrimRoot({ className, ...otherProps }, ref) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-28 items-start pointer-events-none absolute inset-x-0 bottom-0 z-[1] select-none",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <BlurBand
        className="absolute inset-x-0 inset-y-0"
        blur="backdrop-blur-[1px]"
        mask={fadeMask(0.85)}
      />
      <BlurBand
        className="absolute inset-x-0 bottom-0 h-[75%]"
        blur="backdrop-blur-[4px]"
        mask={fadeMask(1)}
      />
      <BlurBand
        className="absolute inset-x-0 bottom-0 h-[50%]"
        blur="backdrop-blur-[10px]"
        mask={fadeMask(1)}
      />
      <BlurBand
        className="absolute inset-x-0 bottom-0 h-[25%]"
        blur="backdrop-blur-[18px]"
        mask={fadeMask(1)}
      />
    </div>
  );
});

export const AtmosphereScrim = AtmosphereScrimRoot;
