"use client";

/**
 * FileTreeRow demo — a small explorer panel: an expanded, selected folder
 * with children at depths 0–2, one collapsed folder, and file rows covering
 * every glyph type plus git-status and unsaved dots. Static data, no state.
 */

import React from "react";
import { FileTreeRow } from "@/components/ds/FileTreeRow";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col items-start gap-2">
      <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
        explorer · praxis-ui
      </span>
      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
        <FileTreeRow name="src" nodeType="folder" depth="0" expanded selected />
        <FileTreeRow name="components" nodeType="folder" depth="1" />
        <FileTreeRow name="lib" nodeType="folder" depth="1" expanded />
        <FileTreeRow name="utils.ts" nodeType="ts" depth="2" gitStatus="modified" />
        <FileTreeRow name="theme.json" nodeType="json" depth="2" />
        <FileTreeRow name="README.md" nodeType="md" depth="1" />
        <FileTreeRow name="deploy.yml" nodeType="yml" depth="1" gitStatus="added" />
        <FileTreeRow name="package.json" nodeType="json" depth="0" dirty />
      </div>
    </div>
  );
}

export const demoSource = `<FileTreeRow name="src" nodeType="folder" depth="0" expanded selected />
<FileTreeRow name="components" nodeType="folder" depth="1" />
<FileTreeRow name="lib" nodeType="folder" depth="1" expanded />
<FileTreeRow name="utils.ts" nodeType="ts" depth="2" gitStatus="modified" />
<FileTreeRow name="theme.json" nodeType="json" depth="2" />
<FileTreeRow name="README.md" nodeType="md" depth="1" />
<FileTreeRow name="deploy.yml" nodeType="yml" depth="1" gitStatus="added" />
<FileTreeRow name="package.json" nodeType="json" depth="0" dirty />`;
