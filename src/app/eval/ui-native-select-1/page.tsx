"use client";

/**
 * EVAL page — native-select p1 — veterinary clinic patient records — 390x844 light.
 * Hero: NativeSelect (filter bar + exam form). Supporting: Card, Badge, Button,
 * Input, Label, Avatar.
 */

import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PawPrintIcon,
  StethoscopeIcon,
  SyringeIcon,
  ClipboardListIcon,
  DogIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/ui/native-select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const records = [
  {
    date: "AUG 18 2026",
    type: "Wellness exam",
    staff: "Dr. A. Osei",
    note: "dental Sep 12",
    icon: StethoscopeIcon,
    status: "Complete",
    badge: "secondary" as const,
  },
  {
    date: "JUL 02 2026",
    type: "Bordetella booster",
    staff: "Dr. J. Feld",
    note: "lot BRD-2417",
    icon: SyringeIcon,
    status: "Complete",
    badge: "secondary" as const,
  },
  {
    date: "MAY 30 2026",
    type: "Dermatology consult",
    staff: "Dr. J. Feld",
    note: "recheck due",
    icon: ClipboardListIcon,
    status: "Follow-up due",
    badge: "outline" as const,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-background text-foreground">
        {/* App bar */}
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-3 py-2.5">
          <Button variant="ghost" size="icon-sm" aria-label="Back to schedule">
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="font-code text-[10px] uppercase tracking-wide text-muted-foreground">
              Cedar &amp; Paw Veterinary · Records
            </p>
            <h1 className="truncate text-sm font-semibold">Patient record</h1>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="More patient actions"
          >
            <EllipsisVerticalIcon />
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-4 px-4 py-4">
          {/* Patient identity */}
          <section className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>
                <DogIcon className="size-4" aria-hidden="true" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-base font-semibold">Biscuit</h2>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                Golden Retriever · 4 y · MN · 28.4 kg
              </p>
              <p className="font-code text-xs text-muted-foreground">
                chip 985·113·004·721 · owner M. Delgado
              </p>
            </div>
          </section>

          {/* Filter bar — native controls are the right call on mobile (OS picker) */}
          <section aria-label="Record filters" className="grid grid-cols-2 gap-2">
            <NativeSelect aria-label="Filter by record type" className="h-8 text-xs">
              <NativeSelectOption value="">All records</NativeSelectOption>
              <NativeSelectOption value="exam">Exams</NativeSelectOption>
              <NativeSelectOption value="vaccination">Vaccinations</NativeSelectOption>
              <NativeSelectOption value="lab">Lab results</NativeSelectOption>
              <NativeSelectOption value="rx">Prescriptions</NativeSelectOption>
            </NativeSelect>
            <NativeSelect aria-label="Filter by time range" className="h-8 text-xs">
              <NativeSelectOption value="6m">Last 6 months</NativeSelectOption>
              <NativeSelectOption value="12m">Last 12 months</NativeSelectOption>
              <NativeSelectOption value="all">All time</NativeSelectOption>
            </NativeSelect>
          </section>

          {/* Record history */}
          <Card className="gap-0 py-0">
            <CardHeader className="border-b py-3 [.border-b]:pb-3">
              <CardTitle className="text-sm">Visit history</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <ul className="divide-y">
                {records.map((r) => (
                  <li key={r.date} className="flex items-center gap-3 py-3">
                    <r.icon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.type}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.staff} · {r.note}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="font-code text-[10px] text-muted-foreground">
                        {r.date}
                      </span>
                      <Badge variant={r.badge}>{r.status}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* New exam form — the hero zone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <PawPrintIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                Log exam — Biscuit
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="exam-type">Exam type</Label>
                <NativeSelect id="exam-type" defaultValue="wellness">
                  <NativeSelectOption value="wellness">General wellness</NativeSelectOption>
                  <NativeSelectOption value="vax">Vaccination</NativeSelectOption>
                  <NativeSelectOption value="derm">Dermatology recheck</NativeSelectOption>
                  <NativeSelectOption value="dental">Dental</NativeSelectOption>
                  <NativeSelectOption value="weight">Weight check</NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="exam-staff">Attending staff</Label>
                <NativeSelect id="exam-staff" defaultValue="osei">
                  <NativeSelectOptGroup label="Veterinarians">
                    <NativeSelectOption value="osei">Dr. Amara Osei</NativeSelectOption>
                    <NativeSelectOption value="feld">Dr. Jonah Feld</NativeSelectOption>
                    <NativeSelectOption value="petrov">Dr. Lena Petrov</NativeSelectOption>
                  </NativeSelectOptGroup>
                  <NativeSelectOptGroup label="Technicians">
                    <NativeSelectOption value="raman">Priya Raman, RVT</NativeSelectOption>
                    <NativeSelectOption value="whitlock">Tom Whitlock, RVT</NativeSelectOption>
                  </NativeSelectOptGroup>
                </NativeSelect>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="exam-weight">Weight (kg)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="exam-weight"
                    type="number"
                    defaultValue="28.4"
                    step="0.1"
                    inputMode="decimal"
                    className="max-w-[120px]"
                  />
                  <span className="font-code text-xs text-muted-foreground">
                    last 28.4 · Δ +0.3
                  </span>
                </div>
              </div>
              <Button className="w-full">Save to record</Button>
            </CardContent>
          </Card>
        </main>

        <footer className="border-t px-4 py-2.5">
          <p className="font-code text-[10px] text-muted-foreground">
            synced 14:02 · rvc-2901 · 2 of 3 open notes signed
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
