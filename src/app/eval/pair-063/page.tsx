"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { JsonTreeNode } from "@/components/ds/JsonTreeNode";
import { AgentActivity } from "@/components/ds/AgentActivity";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@/components/ui/message-scroller";
import { BotIcon, CheckIcon, FileJsonIcon, SparklesIcon } from "lucide-react";

const captionClass = "font-code text-[11px] tracking-[0.04em] text-neutral-500";

/** Quiet status bar driven by the scroller's scrollable-range hook. */
function TranscriptStatusBar() {
  const { start, end } = useMessageScrollerScrollable();

  const status =
    !start && end
      ? "At the start of the transcript — scroll down for the latest turn."
      : start && end
        ? "You can scroll both ways."
        : start
          ? "You're at the latest message."
          : "All messages fit in the viewport.";

  return (
    <footer className="flex flex-none items-center justify-between border-t border-solid border-default-border px-4 py-2.5">
      <span className="text-xs text-neutral-500">{status}</span>
      <span className={captionClass}>6 messages · 41.2s</span>
    </footer>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-dvh flex-col overflow-hidden">
        {/* Run header */}
        <header className="flex flex-none items-center gap-3 border-b border-solid border-default-border px-4 py-3">
          <div className="flex size-9 flex-none items-center justify-center rounded-lg border border-solid border-default-border bg-panel">
            <BotIcon className="size-4 text-default-font" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold text-default-font">
              Payout reconciliation
            </h1>
            <p className={captionClass}>agent run 4471 · ledger.sync</p>
          </div>
          <span className="flex flex-none items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel px-2.5 py-1 text-[11px] leading-4 text-neutral-500">
            <span className="size-1.5 rounded-full bg-success-500" />
            Run complete
          </span>
        </header>

        {/* Transcript */}
        <main className="flex min-h-0 flex-1 flex-col">
          <MessageScrollerProvider defaultScrollPosition="start">
            <MessageScroller className="min-h-0 flex-1">
              <MessageScrollerViewport>
                <MessageScrollerContent>
                  {/* 1 · the question */}
                  <MessageScrollerItem
                    messageId="q-1"
                    scrollAnchor
                    className="flex justify-end"
                  >
                    <div className="max-w-[560px] rounded-lg border border-solid border-default-border bg-panel px-3.5 py-2.5 text-sm leading-6 text-default-font">
                      Two payouts from Jan 14 don&apos;t line up with the bank
                      statement — one is off by six cents. Pull both records and
                      tell me which side is wrong.
                    </div>
                  </MessageScrollerItem>

                  {/* 2 · the agent's reasoning trace */}
                  <MessageScrollerItem
                    messageId="a-1"
                    className="flex max-w-[640px] flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="size-3.5 flex-none text-neutral-500" />
                      <span className={captionClass}>
                        reasoning trace · run 4471
                      </span>
                    </div>
                    {/* ReasoningLog retired — beats fold into the single
                        expanding AgentActivity object. */}
                    <AgentActivity
                      label="Worked for 1m 47s"
                      defaultOpen
                      steps={[
                        {
                          kind: "api",
                          summary: "Fetch gateway payouts for Jan 14",
                          traces: [
                            {
                              kind: "api",
                              label: "Found two payouts totalling $1,284.35; both reference settlement batch sb_20250114.",
                            },
                          ],
                        },
                        {
                          kind: "command",
                          summary: "Match against the bank statement",
                          traces: [
                            {
                              kind: "command",
                              label: "Statement line 88 settled at $1,284.29 — the six-cent shortfall sits entirely inside payout po_2214.",
                            },
                          ],
                        },
                        {
                          kind: "skill",
                          summary: "Recompute fee rounding",
                          traces: [
                            {
                              kind: "skill",
                              label: "The gateway rounds fees per transfer, the bank rounds per batch. The gap is a rounding artifact, not a lost transfer.",
                            },
                          ],
                        },
                      ]}
                    />
                  </MessageScrollerItem>

                  {/* 3 · inspected tool result */}
                  <MessageScrollerItem
                    messageId="t-1"
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <FileJsonIcon className="size-3.5 flex-none text-neutral-500" />
                      <span className={captionClass}>
                        tool result · ledger.lookup(&quot;po_2214&quot;)
                      </span>
                      <span className="rounded-full border border-solid border-default-border px-2 py-0.5 font-code text-[10px] leading-4 text-neutral-500">
                        200 OK
                      </span>
                    </div>
                    <div className="w-full max-w-[560px] rounded-lg border border-solid border-default-border bg-panel px-3 py-3">
                      <JsonTreeNode.JsonTreeNodeBranch
                        keyName={'"po_2214"'}
                        braceType="object"
                        expanded={true}
                        collapsedBadge="{…} 7 keys"
                      >
                        <JsonTreeNode.JsonTreeNodeLeaf
                          keyName={'"payout_id"'}
                          valueType="string"
                          value={'"po_2214"'}
                        />
                        <JsonTreeNode.JsonTreeNodeLeaf
                          keyName={'"status"'}
                          valueType="string"
                          value={'"settled"'}
                        />
                        <JsonTreeNode.JsonTreeNodeLeaf
                          keyName={'"amount_cents"'}
                          valueType="number"
                          value="64218"
                        />
                        <JsonTreeNode.JsonTreeNodeLeaf
                          keyName={'"fee_cents"'}
                          valueType="number"
                          value="196"
                        />
                        <JsonTreeNode.JsonTreeNodeBranch
                          keyName={'"counterparty"'}
                          braceType="object"
                          expanded={true}
                          collapsedBadge="{…} 4 keys"
                        >
                          <JsonTreeNode.JsonTreeNodeLeaf
                            keyName={'"bank_ref"'}
                            valueType="string"
                            value={'"NST-88410-B"'}
                          />
                          <JsonTreeNode.JsonTreeNodeLeaf
                            keyName={'"route"'}
                            valueType="string"
                            value={'"SEPA_INST"'}
                          />
                          <JsonTreeNode.JsonTreeNodeLeaf
                            keyName={'"verified"'}
                            valueType="boolean"
                            value="true"
                          />
                          <JsonTreeNode.JsonTreeNodeLeaf
                            keyName={'"account_mask"'}
                            valueType="string"
                            value={'"•••• 4417"'}
                          />
                        </JsonTreeNode.JsonTreeNodeBranch>
                        <JsonTreeNode.JsonTreeNodeBranch
                          keyName={'"attempts"'}
                          braceType="array"
                          expanded={false}
                          collapsedBadge="[…] 2 items"
                        >
                          <JsonTreeNode.JsonTreeNodeLeaf
                            isArrayItem
                            arrayIndex="[0]"
                            valueType="string"
                            value={'"2025-01-14T09:31:04Z"'}
                          />
                          <JsonTreeNode.JsonTreeNodeLeaf
                            isArrayItem
                            arrayIndex="[1]"
                            valueType="string"
                            value={'"2025-01-14T09:32:11Z"'}
                          />
                        </JsonTreeNode.JsonTreeNodeBranch>
                        <JsonTreeNode.JsonTreeNodeLeaf
                          keyName={'"memo"'}
                          valueType="null"
                          value="null"
                        />
                      </JsonTreeNode.JsonTreeNodeBranch>
                    </div>
                  </MessageScrollerItem>

                  {/* 4 · the verdict + suggested actions */}
                  <MessageScrollerItem
                    messageId="a-2"
                    className="flex max-w-[640px] flex-col gap-3"
                  >
                    <p className="text-sm leading-6 text-default-font">
                      The gateway is the odd one out. Payout po_2214 booked its
                      fee with per-transfer rounding (196¢) while the statement
                      settles per batch (190¢) — that is the whole six cents.
                      Nothing is missing; I can post a rounding variance to true
                      it up.
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-10 rounded-lg border border-solid border-default-border bg-brand-primary px-4 text-sm font-medium text-brand-primary-foreground"
                      >
                        Post adjustment
                      </button>
                      <button
                        type="button"
                        className="h-10 rounded-lg border border-solid border-default-border bg-panel px-4 text-sm font-medium text-default-font"
                      >
                        Flag only
                      </button>
                    </div>
                  </MessageScrollerItem>

                  {/* 5 · follow-up (below the fold — the scroller's live edge) */}
                  <MessageScrollerItem
                    messageId="q-2"
                    scrollAnchor
                    className="mt-6 flex justify-end"
                  >
                    <div className="max-w-[560px] rounded-lg border border-solid border-default-border bg-panel px-3.5 py-2.5 text-sm leading-6 text-default-font">
                      Post it, and add a note so Finance doesn&apos;t chase it
                      next month.
                    </div>
                  </MessageScrollerItem>

                  {/* 6 · closing system note */}
                  <MessageScrollerItem messageId="a-3">
                    <div className="flex w-full max-w-[560px] items-center gap-2.5 rounded-lg border border-solid border-default-border bg-panel px-3.5 py-2.5">
                      <CheckIcon className="size-4 flex-none text-success-600" />
                      <span className="min-w-0 flex-1 truncate text-sm text-default-font">
                        Journal entry JE-1042 is queued for approval.
                      </span>
                      <span className={captionClass}>12:41</span>
                    </div>
                  </MessageScrollerItem>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
            <TranscriptStatusBar />
          </MessageScrollerProvider>
        </main>
      </div>
    </EvalShell>
  );
}
