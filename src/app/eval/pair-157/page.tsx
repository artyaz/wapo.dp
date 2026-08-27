"use client";

import React from "react";
import {
  CheckIcon,
  EyeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitPullRequestIcon,
  ShareIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import { DiffRow } from "@/components/ds/DiffRow";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

const choiceCardClass =
  "rounded-xl border border-border p-3.5 transition-colors hover:bg-accent/40 " +
  "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent/30";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Pull request header */}
        <header className="flex h-14 flex-none items-center justify-between gap-4 border-b border-border px-6">
          <div className="flex min-w-0 items-center gap-3">
            <GitPullRequestIcon className="size-4 shrink-0 text-muted-foreground" />
            <h1 className="truncate text-sm font-semibold">
              Tighten archive retention policy
            </h1>
            <span className="flex-none rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              ledger-core · #482
            </span>
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground lg:flex">
              <span className="size-1.5 rounded-full bg-success-500" />
              checks passing
            </span>
          </div>
          <div className="flex flex-none items-center gap-2">
            <Button variant="ghost" size="sm">
              <EyeIcon />
              Watch
            </Button>
            <Button variant="outline" size="sm">
              <ShareIcon />
              Share
            </Button>
          </div>
        </header>

        <div className="flex flex-1 items-stretch gap-6 px-6 py-6">
          {/* Files changed */}
          <main className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-semibold">Files changed</h2>
              <p className="text-xs text-muted-foreground">2 files · +3 −2</p>
            </div>

            {/* src/policies/archive.ts */}
            <section className="mt-4">
              <div className="flex items-center justify-between gap-4">
                <p className="truncate font-code text-xs text-muted-foreground">
                  src/policies/archive.ts
                </p>
                <p className="flex-none font-code text-[11px]">
                  <span className="text-success-700">+1</span>{" "}
                  <span className="text-destructive-700">−1</span>
                </p>
              </div>
              <DiffRow className="mt-2.5 max-w-none">
                <DiffRow.DiffLine
                  lineType="hunk-header"
                  code="@@ -41,3 +41,3 @@ export function shouldArchive"
                />
                <DiffRow.DiffLine
                  lineType="context"
                  oldNumber="41"
                  newNumber="41"
                  code="const RETENTION_DAYS = 90;"
                />
                <DiffRow.DiffLine
                  lineType="context"
                  oldNumber="42"
                  newNumber="42"
                  code="export function shouldArchive(record: LedgerRecord) {"
                />
                <DiffRow.DiffLine
                  lineType="removed"
                  oldNumber="43"
                  code={
                    <span className="pl-4">return record.age &gt; RETENTION_DAYS;</span>
                  }
                />
                <DiffRow.DiffLine
                  lineType="added"
                  newNumber="43"
                  code={
                    <span className="pl-4">
                      return record.age &gt;= RETENTION_DAYS || record.isSettled;
                    </span>
                  }
                />
                <DiffRow.DiffLine
                  lineType="context"
                  oldNumber="44"
                  newNumber="44"
                  code="}"
                />
              </DiffRow>
              <div className="mt-3 flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <FileTextIcon />
                  View file
                </Button>
                <Button variant="link" size="sm">
                  <ExternalLinkIcon />
                  Open full diff
                </Button>
              </div>
            </section>

            {/* src/policies/archive.test.ts */}
            <section className="mt-5">
              <div className="flex items-center justify-between gap-4">
                <p className="truncate font-code text-xs text-muted-foreground">
                  src/policies/archive.test.ts
                </p>
                <p className="flex-none font-code text-[11px]">
                  <span className="text-success-700">+2</span>{" "}
                  <span className="text-destructive-700">−1</span>
                </p>
              </div>
              <DiffRow className="mt-2.5 max-w-none">
                <DiffRow.DiffLine
                  lineType="hunk-header"
                  code={'@@ -18,4 +18,5 @@ describe("shouldArchive", () => {'}
                />
                <DiffRow.DiffLine
                  lineType="context"
                  oldNumber="18"
                  newNumber="18"
                  code={
                    <span className="pl-4">
                      {'it("archives records at the boundary", () => {'}
                    </span>
                  }
                />
                <DiffRow.DiffLine
                  lineType="removed"
                  oldNumber="19"
                  code={
                    <span className="pl-6">
                      {"expect(shouldArchive({ age: 90 })).toBe(false);"}
                    </span>
                  }
                />
                <DiffRow.DiffLine
                  lineType="added"
                  newNumber="19"
                  code={
                    <span className="pl-6">
                      {"expect(shouldArchive({ age: 90 })).toBe(true);"}
                    </span>
                  }
                />
                <DiffRow.DiffLine
                  lineType="added"
                  newNumber="20"
                  code={
                    <span className="pl-6">
                      {"expect(shouldArchive({ age: 1, isSettled: true })).toBe(true);"}
                    </span>
                  }
                />
                <DiffRow.DiffLine
                  lineType="context"
                  oldNumber="20"
                  newNumber="21"
                  code={<span className="pl-4">{"});"}</span>}
                />
                <DiffRow.DiffLine
                  lineType="context"
                  oldNumber="21"
                  newNumber="22"
                  code="});"
                />
              </DiffRow>
            </section>
          </main>

          {/* Review decision panel */}
          <aside className="flex w-[320px] flex-none flex-col rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="text-sm font-semibold">Submit review</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Decide whether this change can merge into main.
            </p>

            <RadioGroup defaultValue="approve" className="mt-4">
              <FieldLabel htmlFor="decision-approve" className={choiceCardClass}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Approve</FieldTitle>
                    <FieldDescription>
                      The retention change looks safe to ship.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="approve" id="decision-approve" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="decision-changes" className={choiceCardClass}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Request changes</FieldTitle>
                    <FieldDescription>
                      Ask for fixes before this merges.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="changes" id="decision-changes" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="decision-comment" className={choiceCardClass}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Comment</FieldTitle>
                    <FieldDescription>
                      Leave feedback without blocking the merge.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="comment" id="decision-comment" />
                </Field>
              </FieldLabel>
            </RadioGroup>

            <div className="mt-auto pt-5">
              <p className="mb-3 text-[11px] text-muted-foreground">
                1 of 2 required approvals received.
              </p>
              <div className="flex flex-col gap-2">
                <Button>
                  <CheckIcon />
                  Submit review
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
