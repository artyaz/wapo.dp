"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { JumpToLatest } from "@/components/ds/JumpToLatest";
import { DialogLayout } from "@/components/ds/DialogLayout";
import { Dialog } from "@/components/ds/Dialog";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";
import {
  ArrowUpDown,
  Check,
  ChevronRight,
  Clock,
  Download,
  FileArchive,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  FolderInput,
  FolderOpen,
  FolderPlus,
  HardDrive,
  Image as ImageIcon,
  LayoutGrid,
  MessageSquare,
  Pencil,
  Plus,
  RotateCcw,
  Rows3,
  Search,
  Share2,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

const FILE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  pdf: FileText,
  image: ImageIcon,
  text: FileText,
  sheet: FileSpreadsheet,
  archive: FileArchive,
  video: FileVideo,
};

const FILES = [
  { name: "Brand guidelines.pdf", kind: "pdf", size: "4.2 MB", modified: "Mar 14, 2025", owner: "MC", selected: true },
  { name: "hero-illustration-v3.png", kind: "image", size: "12.8 MB", modified: "Mar 12, 2025", owner: "JR" },
  { name: "pricing-page-copy.md", kind: "text", size: "46 KB", modified: "Mar 11, 2025", owner: "MC" },
  { name: "launch-budget.xlsx", kind: "sheet", size: "220 KB", modified: "Mar 9, 2025", owner: "AL" },
  { name: "app-icons.zip", kind: "archive", size: "8.1 MB", modified: "Mar 7, 2025", owner: "JR" },
  { name: "onboarding-walkthrough.mp4", kind: "video", size: "148 MB", modified: "Mar 5, 2025", owner: "MC" },
  { name: "og-images.zip", kind: "archive", size: "3.4 MB", modified: "Mar 3, 2025", owner: "AL" },
  { name: "press-kit.pdf", kind: "pdf", size: "9.6 MB", modified: "Feb 28, 2025", owner: "JR" },
];

const FAVORITES = [
  { icon: Clock, label: "Recents" },
  { icon: Star, label: "Starred" },
  { icon: Users, label: "Shared with me" },
  { icon: Trash2, label: "Trash", count: "24" },
];

const FOLDERS = [
  { icon: FolderOpen, label: "Design", active: true },
  { icon: Folder, label: "Logos", child: true },
  { icon: Folder, label: "Presentations", child: true },
  { icon: Folder, label: "Engineering" },
  { icon: Folder, label: "Marketing" },
  { icon: Folder, label: "Brand assets" },
];

const EVENTS = [
  { icon: Upload, actor: "Maya Chen", action: "uploaded", target: "hero-illustration-v3.png", suffix: "", time: "2 min ago" },
  { icon: FolderInput, actor: "Jonah Ruiz", action: "moved 4 files to", target: "Archive", suffix: "", time: "14 min ago" },
  { icon: Share2, actor: "Maya Chen", action: "shared", target: "Brand guidelines.pdf", suffix: "with Amara Liu", time: "32 min ago" },
  { icon: Pencil, actor: "You", action: "renamed", target: "og-images-final.zip", suffix: "to og-images.zip", time: "1 hr ago" },
  { icon: MessageSquare, actor: "Amara Liu", action: "commented on", target: "launch-budget.xlsx", suffix: "", time: "2 hr ago" },
  { icon: RotateCcw, actor: "Jonah Ruiz", action: "restored", target: "press-kit.pdf", suffix: "from trash", time: "3 hr ago" },
  { icon: FolderPlus, actor: "Maya Chen", action: "created", target: "Logos", suffix: "in Design", time: "Yesterday" },
  { icon: Upload, actor: "Amara Liu", action: "uploaded", target: "app-icons.zip", suffix: "", time: "Yesterday" },
  { icon: Users, actor: "Maya Chen", action: "added", target: "Jonah Ruiz", suffix: "to Design", time: "2 days ago" },
];

const STORAGE_TILES = [FileText, ImageIcon, FileVideo, FileArchive, FileSpreadsheet, ImageIcon, FileText, FileVideo, FileArchive];

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [previewOpen, setPreviewOpen] = React.useState(true);
  const [storageOpen, setStorageOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-default-background text-default-font font-body">
        {/* ---------------- top bar ---------------- */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-default-border bg-panel px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-neutral-900 text-neutral-100">
              <FolderOpen size={14} />
            </div>
            <span className="text-body-medium font-semibold text-neutral-900">Praxis Files</span>
          </div>
          <nav className="flex items-center gap-1.5 text-body-medium">
            <span className="text-neutral-400">Files</span>
            <ChevronRight size={13} className="text-neutral-300" />
            <span className="font-medium text-neutral-900">Design</span>
          </nav>
          <div className="flex-1" />
          <div className="flex h-9 w-64 items-center gap-2 rounded-[6px] border border-default-border bg-default-background px-3 text-neutral-400">
            <Search size={14} />
            <span className="text-body-medium">Search files…</span>
          </div>
          <Button size="small" icon={<Plus size={14} />}>
            New
          </Button>
          <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-semibold text-neutral-600">
            MC
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ---------------- sidebar ---------------- */}
          <aside className="flex w-[240px] shrink-0 flex-col gap-6 border-r border-default-border bg-panel p-4">
            <div className="flex flex-col">
              <span className="px-2.5 pb-2 font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                Favorites
              </span>
              {FAVORITES.map((f) => (
                <div
                  key={f.label}
                  className="flex h-9 items-center gap-2.5 rounded-[6px] px-2.5 text-body-medium text-neutral-600"
                >
                  <f.icon size={15} className="shrink-0 text-neutral-400" />
                  <span>{f.label}</span>
                  {f.count ? (
                    <span className="ml-auto font-code text-[11px] text-neutral-400">{f.count}</span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <span className="px-2.5 pb-2 font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                Folders
              </span>
              {FOLDERS.map((f) => (
                <div
                  key={f.label}
                  className={[
                    "flex items-center gap-2.5 rounded-[6px] px-2.5 text-body-medium",
                    f.child ? "h-8 pl-9 text-neutral-500" : "h-9",
                    f.active ? "bg-neutral-100 font-medium text-neutral-900" : "text-neutral-600",
                  ].join(" ")}
                >
                  <f.icon
                    size={f.child ? 14 : 15}
                    className={["shrink-0", f.active ? "text-neutral-700" : "text-neutral-400"].join(" ")}
                  />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2 px-2.5">
              <Check size={13} className="shrink-0 text-neutral-400" />
              <span className="text-caption text-neutral-400">All files synced · 2 min ago</span>
            </div>
          </aside>

          {/* ---------------- center: file table + storage alert ---------------- */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-5">
            <div className="flex h-9 shrink-0 items-center gap-3">
              <h1 className="text-heading-3 font-heading-3 text-default-font">Design</h1>
              <span className="text-caption text-neutral-400">8 items</span>
              <div className="flex-1" />
              <div className="flex h-8 items-center gap-1.5 rounded-[6px] border border-default-border px-2.5 text-body-medium text-neutral-500">
                <ArrowUpDown size={13} className="text-neutral-400" />
                Modified
              </div>
              <div className="flex items-center rounded-[6px] border border-default-border">
                <span className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-neutral-100 text-neutral-900">
                  <Rows3 size={14} />
                </span>
                <span className="flex h-8 w-8 items-center justify-center text-neutral-400">
                  <LayoutGrid size={14} />
                </span>
              </div>
            </div>

            {/* file table */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-default-border bg-panel">
              <div className="flex h-10 shrink-0 items-center gap-3 border-b border-default-border px-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="h-4 w-4 shrink-0" />
                  <span className="h-8 w-8 shrink-0" />
                  <span className="text-caption font-medium text-neutral-400">Name</span>
                </div>
                <span className="w-20 shrink-0 text-caption font-medium text-neutral-400">Size</span>
                <span className="w-28 shrink-0 text-caption font-medium text-neutral-400">Modified</span>
                <span className="w-16 shrink-0 text-caption font-medium text-neutral-400">Owner</span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col divide-y divide-default-border overflow-hidden">
                {FILES.map((file) => {
                  const FileIcon = FILE_ICONS[file.kind];
                  return (
                    <div
                      key={file.name}
                      className={["flex h-[52px] shrink-0 items-center gap-3 px-4", file.selected ? "bg-neutral-100/70" : ""].join(" ")}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        {file.selected ? (
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-neutral-900 text-white">
                            <Check size={10} />
                          </span>
                        ) : (
                          <span className="h-4 w-4 shrink-0 rounded-[3px] border border-neutral-300 bg-white" />
                        )}
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-neutral-100 text-neutral-500">
                          <FileIcon size={15} />
                        </span>
                        <span className="truncate text-body-medium font-medium text-neutral-900">{file.name}</span>
                      </div>
                      <span className="w-20 shrink-0 text-body-medium text-neutral-500">{file.size}</span>
                      <span className="w-28 shrink-0 text-body-medium text-neutral-500">{file.modified}</span>
                      <span className="flex w-16 shrink-0 items-center">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-600">
                          {file.owner}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* storage alert — ds:Dialog embedded over the drive-storage panel */}
            <div className="relative h-[260px] shrink-0 overflow-hidden rounded-lg border border-default-border bg-default-background">
              <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-3.5 px-6">
                <div className="h-2 w-full rounded-full bg-neutral-200">
                  <div className="h-2 w-[82%] rounded-full bg-neutral-400" />
                </div>
                <div className="flex gap-2">
                  {STORAGE_TILES.map((TileIcon, i) => (
                    <span
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-default-border bg-panel text-neutral-300"
                    >
                      <TileIcon size={14} />
                    </span>
                  ))}
                </div>
              </div>

              <Dialog open={storageOpen} onOpenChange={setStorageOpen} modal={false} className="absolute inset-0">
                <Dialog.Content
                  onOpenAutoFocus={(event) => event.preventDefault()}
                  onPointerDownOutside={(event) => event.preventDefault()}
                  onFocusOutside={(event) => event.preventDefault()}
                >
                  <div className="flex w-[440px] max-w-full flex-col items-start gap-4 p-6">
                    <div className="flex w-full items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-neutral-100 text-neutral-500">
                        <HardDrive size={18} />
                      </div>
                      <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                        Storage almost full
                      </SubframeCore.Dialog.Title>
                    </div>
                    <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
                      41.2 GB of 50 GB used. Uploads pause when the drive is full — upgrade to keep
                      everything syncing.
                    </SubframeCore.Dialog.Description>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div className="h-1.5 w-[82%] rounded-full bg-neutral-800" />
                    </div>
                    <div className="flex w-full items-center justify-end gap-2">
                      <Button variant="secondary" size="small">
                        Manage storage
                      </Button>
                      <Button size="small">Upgrade plan</Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog>
            </div>
          </main>

          {/* ---------------- right rail: preview + activity ---------------- */}
          <aside className="flex w-[440px] shrink-0 flex-col gap-4 border-l border-default-border bg-panel p-5">
            {/* preview — ds:DialogLayout as the selected file's detail sheet */}
            <div className="flex min-h-0 shrink-0 flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">Preview</span>
                <span className="flex items-center gap-1.5 text-caption text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                  Selected
                </span>
              </div>
              <div className="relative h-[340px] shrink-0 overflow-hidden rounded-lg border border-default-border bg-neutral-100/50">
                {/* faux document sitting under the scrim */}
                <div aria-hidden="true" className="absolute inset-0">
                  <div className="absolute left-1/2 top-1/2 h-[240px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-neutral-200 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                    <div className="mb-3 h-2 w-14 rounded-full bg-neutral-200" />
                    <div className="flex flex-col gap-2">
                      <div className="h-1.5 w-full rounded-full bg-neutral-100" />
                      <div className="h-1.5 w-5/6 rounded-full bg-neutral-100" />
                      <div className="h-1.5 w-4/6 rounded-full bg-neutral-100" />
                      <div className="h-1.5 w-full rounded-full bg-neutral-100" />
                      <div className="h-1.5 w-3/5 rounded-full bg-neutral-100" />
                    </div>
                    <div className="mt-4 h-10 w-full rounded-[3px] bg-neutral-100" />
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="h-1.5 w-full rounded-full bg-neutral-100" />
                      <div className="h-1.5 w-2/3 rounded-full bg-neutral-100" />
                    </div>
                  </div>
                </div>

                <DialogLayout
                  open={previewOpen}
                  onOpenChange={setPreviewOpen}
                  modal={false}
                  className="absolute inset-0"
                >
                  <div className="flex w-[76px] shrink-0 flex-col items-start gap-2 pt-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-neutral-100 text-neutral-500">
                      <FileText size={20} />
                    </div>
                    <span className="font-code text-[11px] text-neutral-400">PDF</span>
                  </div>
                  <div className="flex w-[220px] max-w-full flex-col items-start gap-4">
                    <div className="flex w-full flex-col items-start gap-1.5">
                      <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                        Brand guidelines
                      </SubframeCore.Dialog.Title>
                      <SubframeCore.Dialog.Description className="text-body-medium font-body-medium text-neutral-500">
                        4.2 MB · PDF · Edited Mar 14 by Maya Chen
                      </SubframeCore.Dialog.Description>
                    </div>
                    <div className="flex w-full flex-wrap items-center gap-2">
                      <Button size="small">Open</Button>
                      <Button variant="secondary" size="small" icon={<Download size={14} />}>
                        Download
                      </Button>
                    </div>
                  </div>
                </DialogLayout>
              </div>
            </div>

            {/* activity — ds:JumpToLatest floats over the scrolling feed */}
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">Activity</span>
                <span className="flex items-center gap-1.5 text-caption text-neutral-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                  3 new events
                </span>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-default-border bg-panel">
                <div className="flex h-full flex-col divide-y divide-default-border">
                  {EVENTS.map((event, i) => (
                    <div key={i} className="flex shrink-0 items-start gap-3 px-4 py-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                        <event.icon size={13} />
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-body-medium text-neutral-500">
                          <span className="font-medium text-neutral-900">{event.actor}</span> {event.action}{" "}
                          <span className="font-medium text-neutral-900">{event.target}</span>
                          {event.suffix ? ` ${event.suffix}` : ""}
                        </p>
                        <span className="text-caption text-neutral-400">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute right-4 bottom-4">
                  <JumpToLatest label="Jump to latest activity" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
