"use client";

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { GripVerticalIcon, MapPinIcon, XIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { MiniMap } from "@/components/ds/MiniMap";
import { Drawer } from "@/components/ds/Drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * Scenario: mobile field-survey document reader. A survey log is open on a
 * phone; the "Outline" side sheet is pulled over the document. The sheet
 * carries a MiniMap of the whole document (with the region currently in view
 * framed) and the section list, which is long enough to scroll inside a
 * ui:scroll-area. The document surface under the sheet scrim uses the same
 * footprints as the map, so the two read as one system.
 */

/** Footprints of the document's elements, as percentages — mirrored 1:1 in the MiniMap. */
const DOC_LAYOUT: Array<{
  left: string;
  top: string;
  width: string;
  height: string;
}> = [
  { left: "8%", top: "6%", width: "56%", height: "5%" }, // title
  { left: "8%", top: "16%", width: "84%", height: "3%" }, // body lines
  { left: "8%", top: "22%", width: "84%", height: "3%" },
  { left: "8%", top: "29%", width: "84%", height: "3%" },
  { left: "8%", top: "35%", width: "84%", height: "3%" },
  { left: "8%", top: "42%", width: "84%", height: "3%" },
  { left: "8%", top: "51%", width: "84%", height: "22%" }, // plate figure
  { left: "8%", top: "78%", width: "84%", height: "3%" }, // closing lines
  { left: "8%", top: "84%", width: "84%", height: "3%" },
  { left: "8%", top: "90%", width: "52%", height: "3%" },
];

/** The region of the document currently being read (sections 04–06, ~41% through). */
const VIEWPORT = { left: "8%", top: "34%", width: "84%", height: "30%" };

const SECTIONS = [
  { n: "01", title: "Approach & methods", page: "1" },
  { n: "02", title: "Site selection", page: "2" },
  { n: "03", title: "Weather log", page: "3" },
  { n: "04", title: "Meadow transects", page: "4", active: true },
  { n: "05", title: "Quadrat sampling", page: "5" },
  { n: "06", title: "Pollinator counts", page: "6" },
  { n: "07", title: "Soil cores & moisture", page: "6" },
  { n: "08", title: "Night audio transects", page: "7" },
  { n: "09", title: "Camera trap summary", page: "7" },
  { n: "10", title: "Species checklist", page: "8" },
  { n: "11", title: "Field notes", page: "9" },
  { n: "12", title: "Appendices & data", page: "10" },
];

export default function Page() {
  const [open, setOpen] = React.useState(true);

  // vaul's Drawer.Content touches `document` during render — mount the
  // sheet client-side only so prerender doesn't throw.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-default-background">
        {/* ---------- app bar ---------- */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-solid border-default-border px-4">
          <div className="min-w-0">
            <p className="font-code text-[10px] uppercase tracking-[0.12em] text-neutral-500">
              Field studies / Survey 12
            </p>
            <h1 className="truncate font-body text-sm font-semibold text-default-font">
              Alpine meadow — survey log
            </h1>
          </div>
          <span className="flex flex-none items-center gap-1.5 rounded-full border border-solid border-default-border px-2.5 py-1.5 font-code text-[11px] text-neutral-600">
            <MapPinIcon className="size-3.5 text-neutral-500" />
            46.52°N · 9.80°E
          </span>
        </header>

        {/* ---------- workspace: document surface + outline sheet ---------- */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {/* the mapped surface, sitting under the sheet scrim */}
          <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-2.5 p-4">
            <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
              alpine-meadow-survey.md
            </span>
            <div className="relative grow overflow-hidden rounded-xl border border-solid border-default-border bg-default-background">
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
          </div>

          {/* the outline sheet, anchored to the right edge */}
          {mounted && (
            <Drawer
              open={open}
              onOpenChange={setOpen}
              direction="right"
              modal={false}
            >
            <Drawer.Content>
              <div className="flex h-full w-[292px] max-w-full flex-col gap-4 p-5">
                {/* sheet header */}
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    <SubframeCore.Drawer.Title className="font-heading-2 text-heading-2 text-default-font">
                      Outline
                    </SubframeCore.Drawer.Title>
                    <SubframeCore.Drawer.Description className="font-caption text-caption text-neutral-500">
                      alpine-meadow-survey.md · 12 sections
                    </SubframeCore.Drawer.Description>
                  </div>
                  <button
                    type="button"
                    aria-label="Close outline"
                    onClick={() => setOpen(false)}
                    className="flex size-10 flex-none items-center justify-center rounded-lg border border-solid border-default-border text-neutral-600"
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>

                {/* document map — same footprints as the surface behind the sheet */}
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption uppercase tracking-[0.1em] text-neutral-500">
                      Document map
                    </span>
                    <span className="font-code text-[11px] text-neutral-500">
                      41% read
                    </span>
                  </div>
                  <MiniMap showGrid className="w-full">
                    {DOC_LAYOUT.map((region, i) => (
                      <MiniMap.ContentBlock key={i} style={region} />
                    ))}
                    <MiniMap.ViewportFrame style={VIEWPORT} />
                  </MiniMap>
                </div>

                {/* section list — scrolls inside the sheet */}
                <ScrollArea className="min-h-0 w-full flex-1 rounded-lg border border-solid border-default-border bg-default-background">
                  <div className="flex flex-col py-1">
                    {SECTIONS.map((section) => (
                      <button
                        key={section.n}
                        type="button"
                        className={`flex min-h-10 w-full items-center gap-2.5 border-b border-solid border-default-border px-3 text-left last:border-b-0 ${
                          section.active ? "bg-default-font/[0.05]" : ""
                        }`}
                      >
                        <span
                          className={`w-5 shrink-0 font-code text-[11px] ${
                            section.active
                              ? "text-default-font"
                              : "text-neutral-500"
                          }`}
                        >
                          {section.n}
                        </span>
                        <span
                          className={`min-w-0 flex-1 truncate font-caption text-caption ${
                            section.active
                              ? "font-medium text-default-font"
                              : "text-neutral-600"
                          }`}
                        >
                          {section.title}
                        </span>
                        <span className="shrink-0 font-code text-[11px] text-neutral-500">
                          p.{section.page}
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                {/* sheet hint */}
                <div className="flex w-full items-center gap-1.5 font-caption text-caption text-neutral-500">
                  <GripVerticalIcon className="size-3.5" />
                  Drag the sheet left or press Esc to dismiss
                </div>
              </div>
              </Drawer.Content>
            </Drawer>
          )}
        </div>

        {/* ---------- reading status bar ---------- */}
        <footer className="flex h-11 shrink-0 items-center justify-between gap-3 border-t border-solid border-default-border px-4">
          <span className="truncate font-caption text-caption text-neutral-500">
            Section 04 · Meadow transects
          </span>
          <div className="flex flex-none items-center gap-2">
            <div className="h-1 w-20 overflow-hidden rounded-full bg-default-font/10">
              <div className="h-full w-[41%] rounded-full bg-default-font/50" />
            </div>
            <span className="font-code text-[11px] text-neutral-500">41%</span>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
