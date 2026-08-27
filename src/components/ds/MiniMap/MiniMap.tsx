"use client";

/**
 * MiniMap — a pocket liquid-glass document map. Renders a fixed 160×100 glass
 * panel with an optional dot grid; compose ContentBlock footprints and a
 * ViewportFrame inside it to mirror the layout of a larger surface.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { GlassSurface, type GlassMaterialControls } from "@/lib/glass";

export interface ContentBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  x?: React.ReactNode;
  y?: React.ReactNode;
  width?: React.ReactNode;
  height?: React.ReactNode;
  className?: string;
}

const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(
  function ContentBlock(
    { x, y, width, height, className, ...otherProps }: ContentBlockProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex items-start rounded-[2px] absolute bg-default-font/[0.10]",
          className
        )}
        ref={ref}
        {...otherProps}
      />
    );
  }
);

export interface ViewportFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ViewportFrame = React.forwardRef<HTMLDivElement, ViewportFrameProps>(
  function ViewportFrame(
    { className, ...otherProps }: ViewportFrameProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/20f18f79 flex items-start rounded-[3px] border-2 border-solid border-default-font absolute cursor-grab active:cursor-grabbing",
          className
        )}
        ref={ref}
        {...otherProps}
      />
    );
  }
);

export interface MiniMapRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlassMaterialControls {
  showGrid?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const MiniMapRoot = React.forwardRef<HTMLDivElement, MiniMapRootProps>(
  function MiniMapRoot(
    {
      showGrid = false,
      children,
      className,
      material,
      intensity,
      stretchable,
      bounce,
      refraction,
      frost,
      finish,
      backdrop,
      ...otherProps
    }: MiniMapRootProps,
    ref
  ) {
    return (
      <GlassSurface
        shape="card"
        material={material}
        intensity={intensity}
        stretchable={stretchable}
        bounce={bounce}
        refraction={refraction}
        frost={frost}
        finish={finish}
        backdrop={backdrop}
        className={SubframeUtils.twClassNames(
          "group/4eeb08ac flex h-[100px] w-40 items-start overflow-hidden group/minimap relative",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "hidden items-start absolute inset-0 bg-[radial-gradient(circle,_var(--color-default-font)_0.5px,_transparent_0.5px)] bg-[length:10px_10px] opacity-[0.06]",
            { flex: showGrid }
          )}
        />
        {children ? (
          <div className="flex items-start absolute inset-0">{children}</div>
        ) : null}
      </GlassSurface>
    );
  }
);

export const MiniMap = Object.assign(MiniMapRoot, {
  ContentBlock,
  ViewportFrame,
});
