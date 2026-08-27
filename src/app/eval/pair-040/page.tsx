"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  FileArchive,
  FileAudio,
  FileSpreadsheet,
  FileText,
  Film,
  FolderPlus,
  GalleryHorizontalEnd,
  Image,
  LayoutGrid,
  List,
  MoreHorizontal,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";

type FileRow = {
  name: string;
  meta: string;
  icon: React.ReactNode;
  size: string;
  modified: string;
  owner: string;
  selected?: boolean;
};

const files: FileRow[] = [
  {
    name: "brand-guidelines.pdf",
    meta: "PDF Document",
    icon: <FileText className="size-4" />,
    size: "4.2 MB",
    modified: "2 hours ago",
    owner: "AR",
    selected: true,
  },
  {
    name: "hero-render-final.png",
    meta: "Image · 2400×1350",
    icon: <Image className="size-4" />,
    size: "12.8 MB",
    modified: "Yesterday",
    owner: "MK",
  },
  {
    name: "launch-teaser.mp4",
    meta: "Video · 00:42",
    icon: <Film className="size-4" />,
    size: "148 MB",
    modified: "2 days ago",
    owner: "AR",
  },
  {
    name: "design-tokens.zip",
    meta: "Archive · 24 files",
    icon: <FileArchive className="size-4" />,
    size: "3.1 MB",
    modified: "Mar 10, 2026",
    owner: "JN",
  },
  {
    name: "q1-roadmap.xlsx",
    meta: "Spreadsheet",
    icon: <FileSpreadsheet className="size-4" />,
    size: "640 KB",
    modified: "Mar 9, 2026",
    owner: "AR",
  },
  {
    name: "podcast-intro.mp3",
    meta: "Audio · 03:12",
    icon: <FileAudio className="size-4" />,
    size: "8.9 MB",
    modified: "Mar 8, 2026",
    owner: "MK",
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="min-h-screen bg-background text-foreground">
        {/* Top bar */}
        <header className="border-b border-border">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-8">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Cloud className="size-4" />
              </div>
              <span className="text-sm font-semibold tracking-tight">
                Praxis Cloud
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild variant="link" size="sm">
                <a href="#docs">Documentation</a>
              </Button>
              <div className="flex size-7 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-semibold text-muted-foreground">
                AK
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb bar */}
        <div className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-8 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Workspaces</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Aurora Website</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Assets</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Main */}
        <main className="mx-auto max-w-6xl px-8 pt-7">
          {/* Title + primary actions */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Assets
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Shared files for the Aurora Website workspace · synced 2 hours
                ago
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost">
                <FolderPlus />
                New folder
              </Button>
              <Button variant="outline">
                <Share2 />
                Share
              </Button>
              <Button>
                <Upload />
                Upload
              </Button>
            </div>
          </div>

          {/* Toolbar: view switcher + search */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <ButtonGroup aria-label="View mode">
              <Button variant="secondary" size="sm" aria-pressed="true">
                <List />
                List
              </Button>
              <Button variant="ghost" size="sm" aria-pressed="false">
                <LayoutGrid />
                Grid
              </Button>
              <Button variant="ghost" size="sm" aria-pressed="false">
                <GalleryHorizontalEnd />
                Gallery
              </Button>
              <ButtonGroupSeparator />
              <ButtonGroupText>142 files</ButtonGroupText>
            </ButtonGroup>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search files…"
                  className="h-8 w-56 rounded-md border border-input bg-background ps-8 pe-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
              <Button variant="outline" size="icon-sm" aria-label="More options">
                <MoreHorizontal />
              </Button>
            </div>
          </div>

          {/* Selection strip */}
          <div className="mt-4 flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                brand-guidelines.pdf
              </span>{" "}
              is selected
            </p>
            <div className="flex items-center gap-2">
              <Button variant="destructive" size="sm">
                <Trash2 />
                Delete
              </Button>
              <Button variant="ghost" size="sm">
                Clear
              </Button>
            </div>
          </div>

          {/* File table */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Name</th>
                  <th className="px-4 py-2.5 font-medium">Size</th>
                  <th className="px-4 py-2.5 font-medium">Modified</th>
                  <th className="px-4 py-2.5 text-end font-medium">Owner</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr
                    key={file.name}
                    className={`border-b border-border last:border-b-0 ${
                      file.selected ? "bg-accent/40" : "bg-background"
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                          {file.icon}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {file.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {file.meta}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {file.size}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {file.modified}
                    </td>
                    <td className="px-4 py-2.5 text-end">
                      <span className="inline-flex size-6 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-semibold text-muted-foreground">
                        {file.owner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer: pagination + density */}
          <div className="mt-6 flex items-center justify-between pb-8">
            <div className="flex items-center gap-3">
              <ButtonGroup aria-label="Pagination">
                <Button variant="ghost" size="icon-sm" aria-label="Previous page">
                  <ChevronLeft />
                </Button>
                <Button variant="secondary" size="sm" aria-current="page">
                  1
                </Button>
                <Button variant="ghost" size="sm">
                  2
                </Button>
                <Button variant="ghost" size="sm">
                  3
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Next page">
                  <ChevronRight />
                </Button>
              </ButtonGroup>
              <span className="text-sm text-muted-foreground">of 24 pages</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Rows per page
              </span>
              <ButtonGroup aria-label="Rows per page">
                <Button variant="ghost" size="sm">
                  25
                </Button>
                <Button variant="secondary" size="sm" aria-pressed="true">
                  50
                </Button>
                <Button variant="ghost" size="sm">
                  100
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
