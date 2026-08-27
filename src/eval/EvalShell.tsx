"use client";

/**
 * EvalShell — wrapper for automated QA evaluation pages (/eval/<pair-id>).
 *
 * Provides:
 *  - the GlassRuntime provider the glass components rely on
 *  - theme via a `.dark` class on the wrapper (the capture script also mirrors
 *    the class onto <html> so portaled content inherits the same tokens)
 *  - text direction (ltr/rtl)
 *
 * This file exists only to support the automated visual QA pipeline; it is not
 * part of the public docs site.
 */

import React from "react";
import { GlassRuntime } from "@/lib/glass";

export function EvalShell({
  theme = "light",
  dir = "ltr",
  children,
}: {
  theme?: "light" | "dark";
  dir?: "ltr" | "rtl";
  children: React.ReactNode;
}) {
  return (
    <GlassRuntime level="regular">
      <div
        dir={dir}
        data-eval="true"
        data-eval-theme={theme}
        className={theme === "dark" ? "dark" : undefined}
        style={{
          minHeight: "100vh",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {children}
      </div>
    </GlassRuntime>
  );
}
