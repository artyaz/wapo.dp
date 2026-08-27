"use client";

/**
 * pair-081 — "Workspace settings" admin screen (light, 1440×900, ltr).
 *
 * A workspace admin reviews the Northwind Studio settings page on the
 * DefaultPageLayout scaffold (header band / two-column body / footer band).
 * The left column holds the settings forms composed from Field parts
 * (FieldSet, FieldLegend, FieldLabel, FieldDescription, FieldError) — the
 * invite-email field is shown in its invalid state. The right column is a
 * "Plan & storage" summary card whose "Usage details" popover is open by
 * default, breaking down what fills the 100 GB plan.
 */

import React from "react";
import { HardDriveIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { DefaultPageLayout } from "@/components/ds/DefaultPageLayout";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const usage = [
  { label: "Session recordings", size: "41.2 GB", share: 66 },
  { label: "Shared uploads", size: "15.6 GB", share: 25 },
  { label: "Transcripts", size: "6.0 GB", share: 9 },
];

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <span className="text-caption font-caption text-neutral-500">{label}</span>
      <span className="text-body-medium font-body-medium text-default-font">
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <DefaultPageLayout>
        <header className="flex w-full shrink-0 items-end justify-between gap-6 border-b border-solid border-default-border px-6 py-4">
          <div className="flex flex-col gap-1">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              Workspace / Settings
            </span>
            <span className="text-heading-3 font-heading-3 text-default-font">
              Workspace settings
            </span>
          </div>
          <span className="text-caption font-caption text-neutral-500">
            Studio plan · 8 of 10 seats in use
          </span>
        </header>

        <div className="flex w-full grow items-start px-6 py-6">
          <div className="mx-auto flex w-full max-w-5xl items-start gap-8">
            {/* Left column — settings forms built from Field parts */}
            <div className="flex min-w-0 grow flex-col gap-6">
              <FieldSet>
                <FieldLegend>Workspace profile</FieldLegend>
                <FieldDescription>
                  How your workspace appears to members and guests.
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="ws-name">Workspace name</FieldLabel>
                    <Input id="ws-name" defaultValue="Northwind Studio" />
                    <FieldDescription>
                      Shown on the workspace switcher and in email invitations.
                    </FieldDescription>
                  </Field>
                  <Field orientation="responsive">
                    <FieldContent className="grow">
                      <FieldLabel htmlFor="ws-retention">
                        Session retention
                      </FieldLabel>
                      <FieldDescription>
                        Recordings older than this are removed automatically.
                      </FieldDescription>
                    </FieldContent>
                    <NativeSelect
                      id="ws-retention"
                      defaultValue="90"
                      className="w-40"
                    >
                      <NativeSelectOption value="30">30 days</NativeSelectOption>
                      <NativeSelectOption value="90">90 days</NativeSelectOption>
                      <NativeSelectOption value="365">1 year</NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSet>
                <FieldLegend>Invite teammates</FieldLegend>
                <FieldDescription>
                  Seats are billed monthly — 2 of 10 seats are still available.
                </FieldDescription>
                <FieldGroup>
                  <Field data-invalid>
                    <FieldLabel htmlFor="invite-email">Work email</FieldLabel>
                    <Input
                      id="invite-email"
                      defaultValue="dana@northwind"
                      aria-invalid
                    />
                    <FieldError>Enter a valid work email address.</FieldError>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="invite-note">
                      Personal note (optional)
                    </FieldLabel>
                    <Input
                      id="invite-note"
                      placeholder="Add a short welcome message…"
                    />
                    <FieldDescription>Sent with the invitation email.</FieldDescription>
                  </Field>
                </FieldGroup>
                <div className="flex items-center gap-2">
                  <Button size="sm">Send invite</Button>
                  <Button size="sm" variant="outline">
                    Copy invite link
                  </Button>
                </div>
              </FieldSet>
            </div>

            {/* Right column — plan & storage summary card */}
            <div className="flex w-80 shrink-0 flex-col gap-4 rounded-lg border border-solid border-default-border p-5">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Plan &amp; storage
              </span>
              <div className="flex flex-col gap-2.5">
                <SummaryRow label="Plan" value="Studio" />
                <SummaryRow label="Seats" value="8 of 10" />
                <SummaryRow label="Renews" value="Sep 1, 2025" />
              </div>
              <div className="h-px w-full bg-default-border" />
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-baseline justify-between gap-4">
                  <span className="text-body-medium font-body-medium text-default-font">
                    Storage
                  </span>
                  <span className="text-caption font-caption text-neutral-500">
                    62.8 GB of 100 GB
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[63%] rounded-full bg-primary" />
                </div>
                <span className="text-caption font-caption text-neutral-500">
                  63% used · 37.2 GB free
                </span>
              </div>
              <Popover defaultOpen>
                <PopoverTrigger
                  render={
                    <Button variant="outline" size="sm" className="w-full">
                      <HardDriveIcon /> Usage details
                    </Button>
                  }
                />
                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="flex w-80 flex-col gap-4"
                >
                  <PopoverHeader>
                    <PopoverTitle>Storage usage</PopoverTitle>
                    <PopoverDescription>
                      What counts toward the 100 GB on the Studio plan.
                    </PopoverDescription>
                  </PopoverHeader>
                  <div className="flex flex-col gap-3">
                    {usage.map(({ label, size, share }) => (
                      <div key={label} className="flex flex-col gap-1.5">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-sm text-default-font">{label}</span>
                          <span className="text-caption font-caption text-neutral-500">
                            {size}
                          </span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <PopoverFooter>
                    <span className="text-caption font-caption text-neutral-500">
                      Measured Aug 14, 2025
                    </span>
                    <Button variant="ghost" size="xs">
                      Manage storage
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <footer className="mt-auto flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 border-t border-solid border-default-border px-6 py-3">
          <span className="text-caption font-caption text-neutral-500">
            Northwind Studio · Workspace settings
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            autosaved 14:02
          </span>
        </footer>
      </DefaultPageLayout>
    </EvalShell>
  );
}
