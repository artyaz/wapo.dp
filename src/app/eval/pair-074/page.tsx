"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { MiniMap } from "@/components/ds/MiniMap";
import { FileTreeRow } from "@/components/ds/FileTreeRow";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

/**
 * Scenario — "Pocket Studio" on a 360×640 phone: a compact code editor.
 * App menubar on top, file explorer underneath, and a wireframe preview of
 * the open document with its MiniMap below. The document footprints are
 * shared between the preview and the map so the ViewportFrame reads as the
 * visible region. All geometry is fixed — no randomness.
 */

/** Footprint of each document element, as percentages — mirrored 1:1 in the map. */
const DOC_LAYOUT: Array<{
  left: string;
  top: string;
  width: string;
  height: string;
}> = [
  { left: "8%", top: "6%", width: "56%", height: "5%" }, // heading
  { left: "8%", top: "16%", width: "84%", height: "3%" }, // paragraph lines
  { left: "8%", top: "22%", width: "84%", height: "3%" },
  { left: "8%", top: "29%", width: "84%", height: "3%" },
  { left: "8%", top: "35%", width: "84%", height: "3%" },
  { left: "8%", top: "42%", width: "84%", height: "3%" },
  { left: "8%", top: "51%", width: "84%", height: "22%" }, // figure
  { left: "8%", top: "78%", width: "84%", height: "3%" }, // closing lines
  { left: "8%", top: "84%", width: "84%", height: "3%" },
  { left: "8%", top: "90%", width: "52%", height: "3%" },
];

/** The region of the document currently in view. */
const VIEWPORT = { left: "36%", top: "33%", width: "56%", height: "40%" };

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[360px] flex-col gap-3 p-3">
        {/* App header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md border border-solid border-default-border bg-panel">
              <span className="font-code text-[11px] leading-none text-default-font">
                ps
              </span>
            </div>
            <span className="font-body text-sm font-medium text-default-font">
              Pocket Studio
            </span>
          </div>
          <span className="font-code text-[10px] text-neutral-400">
            praxis · main
          </span>
        </header>

        {/* App menu */}
        <Menubar className="w-full">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent className="w-56">
              <MenubarItem inset>
                New File <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem inset>
                Open… <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Save <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Close Tab <MenubarShortcut>⌘W</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent className="w-56">
              <MenubarCheckboxItem checked>Show Minimap</MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Word Wrap</MenubarCheckboxItem>
              <MenubarCheckboxItem>Line Numbers</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Format</MenubarTrigger>
            <MenubarContent className="w-48">
              <MenubarCheckboxItem checked>Strikethrough</MenubarCheckboxItem>
              <MenubarCheckboxItem>Code</MenubarCheckboxItem>
              <MenubarCheckboxItem>Superscript</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Explorer */}
        <section className="flex flex-col gap-1.5">
          <span className="font-body text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-400">
            Explorer
          </span>
          <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            <FileTreeRow name="src" nodeType="folder" depth="0" expanded />
            <FileTreeRow name="components" nodeType="folder" depth="1" expanded />
            <FileTreeRow name="MiniMap.tsx" nodeType="ts" depth="2" dirty />
            <FileTreeRow name="menubar.tsx" nodeType="ts" depth="2" gitStatus="modified" />
            <FileTreeRow name="report-draft.md" nodeType="md" depth="1" selected dirty />
            <FileTreeRow name="deploy.yml" nodeType="yml" depth="1" gitStatus="added" />
            <FileTreeRow name="package.json" nodeType="json" depth="0" />
          </div>
        </section>

        {/* Editor preview + document map */}
        <section className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <span className="font-code text-[11px] tracking-[0.04em] text-default-font">
              report-draft.md
            </span>
            <span className="font-code text-[10px] text-neutral-400">
              line 24 · 62%
            </span>
          </div>
          <div className="relative h-[168px] w-full overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            {DOC_LAYOUT.map((region, i) => (
              <div
                key={i}
                className="absolute rounded-[2px] bg-default-font/[0.07]"
                style={region}
              />
            ))}
            <div
              className="absolute rounded-[3px] border-2 border-solid border-default-font"
              style={VIEWPORT}
            />
          </div>
          <div className="flex items-center justify-between gap-3 pt-0.5">
            <MiniMap showGrid>
              {DOC_LAYOUT.map((region, i) => (
                <MiniMap.ContentBlock key={i} style={region} />
              ))}
              <MiniMap.ViewportFrame style={VIEWPORT} />
            </MiniMap>
            <div className="flex flex-col items-end gap-1">
              <span className="font-code text-[10px] text-neutral-400">
                viewport 56×40%
              </span>
              <span className="font-code text-[10px] text-neutral-400">
                10 blocks mapped
              </span>
              <span className="font-code text-[10px] text-neutral-400">
                drag to navigate
              </span>
            </div>
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
