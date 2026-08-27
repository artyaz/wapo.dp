"use client";

/**
 * EVAL page (pair-051) — Components: ds:DiffRow, ui:button-group, ui:bubble
 * Conditions: phone 390x844, light theme, ltr.
 * Scenario: a file browser — viewing a synced file's pending change and its
 * review thread.
 */

import React from "react";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FileCode2Icon,
  SearchIcon,
  Share2Icon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { DiffRow } from "@/components/ds/DiffRow";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-5 p-4">
        {/* App bar */}
        <header className="flex items-center gap-2">
          <Button variant="ghost" size="icon-lg" aria-label="Back to files">
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-caption font-caption text-muted-foreground">
              Ledger sync · Files
            </p>
            <h1 className="truncate text-heading-3 font-heading-3 text-foreground">
              src / ledger / retention.ts
            </h1>
          </div>
          <div
            className="flex size-10 flex-none items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
            aria-label="Signed in as Avery Lane"
          >
            AL
          </div>
        </header>

        {/* Search — ButtonGroup joining an Input and a submit Button */}
        <ButtonGroup
          className="[--radius:9999rem] w-full"
          aria-label="Search files"
        >
          <Input
            type="search"
            placeholder="Search files and folders"
            className="h-10"
            aria-label="Search files and folders"
          />
          <Button variant="outline" size="icon-lg" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>

        {/* View switch + file actions */}
        <div className="flex items-center justify-between gap-3">
          <ButtonGroup aria-label="File view mode">
            <Button variant="secondary" size="lg">
              Preview
            </Button>
            <Button size="lg" aria-pressed="true">
              Changes
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="File actions">
            <Button
              variant="secondary"
              size="icon-lg"
              aria-label="Download file"
            >
              <DownloadIcon />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="icon-lg" aria-label="Share file">
              <Share2Icon />
            </Button>
          </ButtonGroup>
        </div>

        {/* File meta */}
        <div className="flex items-center gap-3 rounded-lg border border-solid border-default-border bg-default-background p-3">
          <div className="flex size-10 flex-none items-center justify-center rounded-md bg-muted text-muted-foreground">
            <FileCode2Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-medium font-body-medium font-medium text-foreground">
              retention.ts
            </p>
            <p className="truncate text-caption font-caption text-muted-foreground">
              Modified 2 min ago · TypeScript · 1.4 KB
            </p>
          </div>
          <div className="flex flex-none items-center gap-1.5 text-caption font-caption">
            <span className="font-medium text-success-700">+2</span>
            <span className="font-medium text-destructive-700">−1</span>
          </div>
        </div>

        {/* Pending change — ds:DiffRow */}
        <DiffRow className="w-full">
          <DiffRow.DiffLine
            lineType="hunk-header"
            code="@@ -12,4 +12,4 @@ shouldArchive"
          />
          <DiffRow.DiffLine
            lineType="context"
            oldNumber="12"
            newNumber="12"
            code="const RETENTION_DAYS = 90;"
          />
          <DiffRow.DiffLine
            lineType="context"
            oldNumber="13"
            newNumber="13"
            code="export function shouldArchive(rec) {"
          />
          <DiffRow.DiffLine
            lineType="removed"
            oldNumber="14"
            code={
              <span className="pl-4">return rec.age &gt; RETENTION_DAYS;</span>
            }
          />
          <DiffRow.DiffLine
            lineType="added"
            newNumber="14"
            code={
              <span className="pl-4">
                return rec.age &gt;= RETENTION_DAYS;
              </span>
            }
          />
          <DiffRow.DiffLine
            lineType="context"
            oldNumber="15"
            newNumber="15"
            code="}"
          />
        </DiffRow>

        {/* Review thread — ui:bubble */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-body-medium font-body-medium font-medium text-foreground">
              Review thread
            </h2>
            <span className="text-caption font-caption text-muted-foreground">
              3 messages
            </span>
          </div>

          <Bubble variant="muted">
            <BubbleContent>
              Does this archive records on day 90, or the day after?
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <Bubble align="end">
              <BubbleContent>
                Day 90 exactly — settled records archive the same day now.
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>Rolling it out once CI passes.</BubbleContent>
              <BubbleReactions
                align="start"
                role="img"
                aria-label="Reactions: eyes"
              >
                <span>👀</span>
              </BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </section>

        <footer className="mt-auto flex items-center justify-between border-t border-solid border-default-border pt-3">
          <span className="text-caption font-caption text-muted-foreground">
            Synced just now
          </span>
          <span className="text-caption font-caption text-muted-foreground">
            Vault · 3 files changed
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
