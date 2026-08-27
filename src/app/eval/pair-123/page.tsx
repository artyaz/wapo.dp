"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { TransportBar } from "@/components/ds/TransportBar";
import { SlaTimer } from "@/components/ds/SlaTimer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  AudioLinesIcon,
  ChevronLeftIcon,
  ClockIcon,
  FileTextIcon,
  FilmIcon,
  FolderIcon,
  HardDriveIcon,
  ImageIcon,
  Share2Icon,
} from "lucide-react";

const folders = [
  { name: "01_Brand_Guidelines_and_Identity_System", count: "24 عنصرًا" },
  { name: "Photography — Q4 Product Shoot (RAW, unedited)", count: "318 عنصرًا" },
];

const recentFiles = [
  {
    icon: FileTextIcon,
    name: "Q4_Financial_Statements_Consolidated_v3_FINAL_revision.pdf",
    meta: "عُدّل قبل 12 دقيقة · 4.2 MB · أنت",
    type: "PDF",
  },
  {
    icon: ImageIcon,
    name: "Hero_Banner_Background_Gradient_Explorations_v9.png",
    meta: "عُدّل أمس · 18.4 MB · مريم خ.",
    type: "PNG",
  },
];

const sharedFiles = [
  {
    icon: FilmIcon,
    name: "Launch_Telemetry_Review_All-Hands_Recording_Oct-18.mp4",
    meta: "شاركه عمر قبل ساعتين · 812 MB",
    type: "MP4",
  },
  {
    icon: AudioLinesIcon,
    name: "Voice memo — design review notes and action items.m4a",
    meta: "شاركتك ليلى قبل 3 أيام · 18:32 دقيقة",
    type: "M4A",
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="flex h-screen flex-col gap-2.5 p-3">
        {/* Breadcrumb + sync/share SLA clocks */}
        <header className="flex flex-none flex-col gap-1.5">
          <nav className="flex items-center gap-1 overflow-hidden text-caption font-caption text-neutral-400">
            <HardDriveIcon className="size-3.5 flex-none text-neutral-500" />
            <span className="min-w-0 truncate">ملفاتي</span>
            <ChevronLeftIcon className="size-3 flex-none text-neutral-600" />
            <span className="min-w-0 flex-1 truncate">
              إطلاق العلامة التجارية — الربع الرابع
            </span>
            <ChevronLeftIcon className="size-3 flex-none text-neutral-600" />
            <span className="min-w-0 truncate text-default-font">
              التسليمات النهائية
            </span>
          </nav>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex min-w-0 items-center gap-1.5">
              <ClockIcon className="size-3.5 flex-none text-neutral-500" />
              <span className="min-w-0 truncate text-caption font-caption text-neutral-400">
                المزامنة
              </span>
              <SlaTimer tone="warning" timecode="00:04:52" showDot />
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <Share2Icon className="size-3.5 flex-none text-neutral-500" />
              <span className="min-w-0 truncate text-caption font-caption text-neutral-400">
                انتهاء الرابط
              </span>
              <SlaTimer tone="breach" timecode="00:00:18" showDot />
            </div>
          </div>
        </header>

        {/* File quick-switcher / search */}
        <Command className="h-auto min-h-0 flex-1 rounded-2xl border border-solid border-default-border">
          <CommandInput placeholder="ابحث في الملفات والمجلدات…" />
          <CommandList className="max-h-none min-h-0 flex-1">
            <CommandEmpty>لا توجد نتائج مطابقة لبحثك.</CommandEmpty>
            <CommandGroup heading="المجلدات">
              {folders.map((folder) => (
                <CommandItem key={folder.name}>
                  <FolderIcon />
                  <span className="min-w-0 flex-1 truncate">{folder.name}</span>
                  <CommandShortcut>{folder.count}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="الملفات الأخيرة">
              {recentFiles.map((file) => (
                <CommandItem key={file.name} className="items-start">
                  <file.icon className="mt-0.5" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate">{file.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {file.meta}
                    </span>
                  </div>
                  <CommandShortcut className="mt-0.5">{file.type}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="مشارَك معك">
              {sharedFiles.map((file) => (
                <CommandItem key={file.name} className="items-start">
                  <file.icon className="mt-0.5" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate">{file.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {file.meta}
                    </span>
                  </div>
                  <CommandShortcut className="mt-0.5">{file.type}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Voice-memo preview dock */}
        <footer className="flex flex-none flex-col items-center gap-1.5">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-1.5">
              <AudioLinesIcon className="size-3.5 flex-none text-neutral-500" />
              <span className="truncate text-caption font-caption text-neutral-400">
                قيد التشغيل · Voice memo — design review notes and action
                items.m4a
              </span>
            </div>
            <span className="flex-none text-caption font-caption tabular-nums text-neutral-500">
              1.5× · 18:32
            </span>
          </div>
          <TransportBar currentTime="02:41" totalTime="18:32" speed="1.5×" />
        </footer>
      </div>
    </EvalShell>
  );
}
