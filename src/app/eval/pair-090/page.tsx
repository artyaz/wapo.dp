"use client";

import React from "react";
import {
  ClipboardCopyIcon,
  ClockIcon,
  CopyIcon,
  MessageSquarePlusIcon,
  MicIcon,
  MousePointerClickIcon,
  PlusIcon,
  RadioTowerIcon,
  StickyNoteIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { EditorTab } from "@/components/ds/EditorTab";
import { AskBar } from "@/components/ds/AskBar";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

/** Transcript of incident IR-2417, as typed by the field crew + reviewer. */
const LINES: string[] = [
  "# IR-2417 — rail sensor 12 · intermittent signal loss",
  "[06:41:52] Trigger: sensor 12 lost signal for 400 ms, self-recovered.",
  "[06:42:07] Dispatch created incident IR-2417 · severity high.",
  "[06:43:15] Field crew Alpha dispatched — ETA 12 min, light rain.",
  "[06:46:58] Crew on site. Housing lid shows water ingress at gasket.",
  "[06:48:21] Reseated connector C-12 — signal stable at 96%.",
  "[06:50:44] Monitoring 10 min for recurrence. None observed.",
  "[06:52:10] Cleared sensor 12 for service; follow-up OPS-8891.",
  "[06:53:38] Root-cause draft: worn gasket, housing lid batch B-7.",
  "[06:55:00] Crew Alpha released. Incident closed pending review.",
  "[06:56:12] Reviewer: attach housing photo set to the record.",
  "[06:57:40] Photo set P-118 attached · 6 images, 2 close-ups.",
  "[06:58:03] Autosaved transcript draft to the incident record.",
  "[06:58:31] Reviewer: cross-check remaining batch B-7 gaskets.",
  "[06:59:05] Linked OPS-8890 — inspect remaining batch B-7 units.",
  "[07:00:00] Transcript locked for review · 3 follow-ups open.",
];

/** The reviewer right-clicked this line (also the highlighted line). */
const ANCHOR_LINE = 7;

type FollowUp = {
  id: string;
  title: string;
  status: string;
  dot: string;
  chip: string;
};

const FOLLOW_UPS: FollowUp[] = [
  {
    id: "OPS-8891",
    title: "Replace housing gasket — sensor 12",
    status: "Scheduled · Thu 09:00",
    dot: "bg-warning-500",
    chip: "border-warning-200 bg-warning-50 text-warning-700",
  },
  {
    id: "OPS-8890",
    title: "Inspect gasket batch B-7 · 12 units",
    status: "Open · unassigned",
    dot: "bg-neutral-400",
    chip: "border-border bg-muted/40 text-muted-foreground",
  },
  {
    id: "OPS-8886",
    title: "Reseat connector C-12 — checklist",
    status: "Done · verified 06:58",
    dot: "bg-success-500",
    chip: "border-success-200 bg-success-50 text-success-700",
  },
];

export default function Page() {
  const anchorRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * Open the context menu once on mount — as if the reviewer had just
   * right-clicked the highlighted transcript line — so the menu (not just the
   * trigger) is visible in the capture. Deterministic, client-side only.
   */
  React.useEffect(() => {
    const open = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(24, Math.min(rect.left + 320, window.innerWidth - 264));
      const y = Math.max(24, Math.min(rect.bottom + 6, window.innerHeight - 368));
      el.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y,
          button: 2,
        })
      );
    };
    const timer = window.setTimeout(open, 700);
    // prefer opening right after fonts settle so the anchor position is final
    document.fonts?.ready
      ?.then(() => {
        window.clearTimeout(timer);
        open();
      })
      .catch(() => {});
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col">
        {/* ---- desk chrome ---- */}
        <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
              <RadioTowerIcon className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Praxis Field Desk
              </p>
              <p className="truncate text-[13.5px] font-medium">
                Incident IR-2417 · Rail sensor 12
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning-200 bg-warning-50 px-2.5 py-1 text-[11px] font-medium text-warning-700">
              <span className="size-1.5 rounded-full bg-warning-500" aria-hidden="true" />
              Severity · High
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground">
              In review
            </span>
          </div>
        </header>

        {/* ---- transcript editor + follow-ups ---- */}
        <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-6 pt-6">
          <section className="overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
            {/* tab strip */}
            <div className="flex w-full items-stretch">
              <EditorTab
                label="transcript.md"
                glyph="¶"
                active
                trailing={<XIcon className="size-3 text-neutral-400" />}
              />
              <EditorTab label="notes.md" glyph="md" dirty />
              <EditorTab label="timeline.log" glyph="log" split />
              <EditorTab
                label="evidence.png"
                glyph="img"
                trailing={<XIcon className="size-3 text-neutral-400" />}
              />
              <div className="h-9 grow border-b border-solid border-default-border" />
            </div>

            {/* editor body — right-click surface */}
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div className="flex flex-col gap-1 bg-panel px-4 py-3">
                  {LINES.map((line, index) => {
                    const isAnchor = index + 1 === ANCHOR_LINE;
                    return (
                      <div
                        key={index}
                        ref={isAnchor ? anchorRef : undefined}
                        className={`flex items-baseline gap-3 rounded-sm px-2 -mx-2 ${
                          isAnchor ? "bg-neutral-100" : ""
                        }`}
                      >
                        <span
                          className={`w-4 flex-none text-right font-code text-[10px] leading-[18px] tabular-nums ${
                            isAnchor ? "text-neutral-500" : "text-neutral-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span
                          className={`font-code text-[12px] leading-[18px] ${
                            isAnchor ? "text-neutral-800" : "text-neutral-600"
                          }`}
                        >
                          {line}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-60">
                <ContextMenuLabel>
                  Line {ANCHOR_LINE} · transcript.md
                </ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>
                    <ClipboardCopyIcon />
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <CopyIcon />
                    Copy with timestamps
                    <ContextMenuShortcut>⇧⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <MessageSquarePlusIcon />
                    Comment on line…
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <PlusIcon />
                    Insert
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-44">
                    <ContextMenuItem>
                      <ClockIcon />
                      Timestamp
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <MicIcon />
                      Speaker tag
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <StickyNoteIcon />
                      Reviewer note
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem defaultChecked>
                  Show line numbers
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>
                  Wrap long lines
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete line
                  <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* editor status strip */}
            <div className="flex items-center justify-between gap-3 border-t border-solid border-default-border bg-default-background px-4 py-2">
              <p className="font-code text-[10.5px] text-neutral-500">
                transcript.md · 16 lines · autosaved 07:00
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <MousePointerClickIcon className="size-3.5" />
                Right-click a line for actions
              </p>
            </div>
          </section>

          {/* follow-ups pulled from this incident */}
          <section className="mt-5 rounded-lg border border-solid border-default-border bg-default-background">
            <div className="flex items-center justify-between gap-3 border-b border-solid border-default-border px-4 py-2.5">
              <h2 className="text-[13px] font-semibold">Follow-ups from IR-2417</h2>
              <span className="text-[11px] text-muted-foreground">
                2 open · 1 scheduled
              </span>
            </div>
            <ul className="divide-y divide-border">
              {FOLLOW_UPS.map((f) => (
                <li key={f.id} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={`size-2 shrink-0 rounded-full ${f.dot}`}
                    aria-hidden="true"
                  />
                  <span className="w-[76px] shrink-0 font-code text-[12px] text-neutral-500">
                    {f.id}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[13px]">{f.title}</p>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${f.chip}`}
                  >
                    {f.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>

        {/* ---- assistant dock ---- */}
        <div className="mt-auto w-full">
          <AskBar
            placeholder="Ask about IR-2417 — e.g. draft the OPS-8891 work order…"
            statusText="The assistant cites this transcript and the linked ops tickets."
          />
        </div>
      </div>
    </EvalShell>
  );
}
