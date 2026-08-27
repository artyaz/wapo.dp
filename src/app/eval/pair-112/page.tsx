"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Shapes,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * pair-112 — Praxis onboarding wizard, step 2 of 3 ("Set up your workspace"),
 * on a 768×1024 portrait tablet (light, ltr).
 *
 * The wizard step card on the left holds the workspace-type choice cards
 * (ui:radio-group) and the back/continue nav. The "Workspace details" sheet
 * (ui:sheet, no-close-button variant — dismissed via the footer Cancel action
 * or by clicking the overlay) is open by default on the right and carries the
 * team-size combobox (ui:combobox), rendered open with autoHighlight per its
 * demo. The empty block below the combobox reserves space for the portaled
 * listbox so it never covers in-flow sheet content.
 */

const teamSizes = [
  "Just me",
  "2–10 people",
  "11–50 people",
  "51–200 people",
  "200+ people",
] as const;

const includedFeatures = [
  "Unlimited personal drafts",
  "Version history for 7 days",
  "Community support",
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ── top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-border bg-panel/70 px-6">
          <div className="flex size-7 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel">
            <Shapes className="size-4 text-muted-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Praxis</span>
          <span className="text-xs text-muted-foreground">· Onboarding</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-code text-[11px] text-muted-foreground">
              Step 2 of 3
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-7 rounded-full bg-foreground" />
              <span className="h-1.5 w-7 rounded-full bg-foreground/40" />
              <span className="h-1.5 w-7 rounded-full bg-border" />
            </div>
          </div>
        </header>

        {/* ── wizard step (behind the open sheet overlay) ─────────── */}
        <main className="relative flex min-h-0 flex-1 bg-muted/40">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(28, 27, 23, 0.06) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative my-auto ml-6 flex w-[352px] flex-none flex-col rounded-xl border border-solid border-default-border bg-background p-6 shadow-xs">
            <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-muted-foreground">
              Workspace setup
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              How will you use Praxis?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a workspace type — you can change this later.
            </p>

            {/* workspace type — ui:radio-group as choice cards */}
            <RadioGroup defaultValue="team" className="mt-8">
              <FieldLabel
                htmlFor="ws-personal"
                className="cursor-pointer rounded-lg border border-solid border-default-border p-4 transition-colors hover:bg-accent/40 has-[[data-state=checked]]:border-foreground/30 has-[[data-state=checked]]:bg-accent/30"
              >
                <Field orientation="horizontal">
                  <FieldContent className="flex-1">
                    <FieldTitle>Personal</FieldTitle>
                    <FieldDescription>
                      For solo projects and side work.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="personal" id="ws-personal" />
                </Field>
              </FieldLabel>
              <FieldLabel
                htmlFor="ws-team"
                className="cursor-pointer rounded-lg border border-solid border-default-border p-4 transition-colors hover:bg-accent/40 has-[[data-state=checked]]:border-foreground/30 has-[[data-state=checked]]:bg-accent/30"
              >
                <Field orientation="horizontal">
                  <FieldContent className="flex-1">
                    <FieldTitle>Team</FieldTitle>
                    <FieldDescription>
                      For small teams of up to 10 people.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="team" id="ws-team" />
                </Field>
              </FieldLabel>
              <FieldLabel
                htmlFor="ws-company"
                className="cursor-pointer rounded-lg border border-solid border-default-border p-4 transition-colors hover:bg-accent/40 has-[[data-state=checked]]:border-foreground/30 has-[[data-state=checked]]:bg-accent/30"
              >
                <Field orientation="horizontal">
                  <FieldContent className="flex-1">
                    <FieldTitle>Company</FieldTitle>
                    <FieldDescription>
                      SSO, audit logs, and admin controls.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="company" id="ws-company" />
                </Field>
              </FieldLabel>
            </RadioGroup>

            <ul className="mt-6 flex flex-col gap-2">
              {includedFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Check className="size-3.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {/* ui:sheet — open by default, no-close-button variant */}
              <Sheet defaultOpen>
                <SheetTrigger
                  render={
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal />
                      Advanced options
                    </Button>
                  }
                />
                <SheetContent
                  side="right"
                  showCloseButton={false}
                  className="gap-0"
                >
                  <SheetHeader className="border-b border-border px-6 py-5">
                    <SheetTitle className="text-base">
                      Workspace details
                    </SheetTitle>
                    <SheetDescription>
                      Optional preferences for your team workspace. You can
                      change them anytime in Settings.
                    </SheetDescription>
                  </SheetHeader>

                  {/* team size — ui:combobox, open with autoHighlight */}
                  <div className="px-6 py-5">
                    <label
                      htmlFor="ws-team-size"
                      className="text-sm font-medium"
                    >
                      Team size
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Used to recommend starter templates and workflows.
                    </p>
                    <div className="mt-3">
                      <Combobox
                        items={teamSizes}
                        defaultValue="2–10 people"
                        open
                        autoHighlight
                      >
                        <ComboboxInput
                          id="ws-team-size"
                          placeholder="Search team sizes…"
                          aria-label="Team size"
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No sizes found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                    {/* reserved vertical space for the open listbox */}
                    <div aria-hidden="true" className="h-[184px] shrink-0" />
                  </div>

                  <div className="px-6 pb-5">
                    <div className="rounded-lg border border-solid border-default-border bg-panel p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Data residency
                        </span>
                        <span className="font-code ms-auto text-[11px] text-muted-foreground">
                          eu-central
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Workspace content stays in the EU (Frankfurt). Backups
                        replicate to a second EU region.
                      </p>
                    </div>
                  </div>

                  <SheetFooter className="mt-auto flex-row items-center justify-between gap-2 border-t border-border px-6 py-4">
                    <span className="text-xs text-muted-foreground">
                      Optional · takes about a minute
                    </span>
                    <div className="flex items-center gap-2">
                      <SheetClose
                        render={
                          <Button variant="ghost" size="sm">
                            Cancel
                          </Button>
                        }
                      />
                      <Button size="sm">Save details</Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <span className="text-xs text-muted-foreground">
                Team size · data residency
              </span>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
              <Button variant="ghost" size="sm">
                <ArrowLeft />
                Back
              </Button>
              <Button size="sm">
                Continue
                <ArrowRight />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
