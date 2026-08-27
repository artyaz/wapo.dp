"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { JsonTreeNode } from "@/components/ds/JsonTreeNode";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/ds/TextField";
import { Rocket, Search, Zap } from "lucide-react";

/**
 * pair-056 — command palette overlay (half-phone surface, light, rtl).
 * An ops-console quick-actions palette dropped over a dimmed page: the
 * ui:Label captions the ds:TextField query bar, matched actions sit beneath
 * it, and the payload of the highlighted action is inspected as a
 * ds:JsonTreeNode tree in the preview pane. Compact 390×420 surface — the
 * palette is the whole screen, scrim behind it.
 */

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-sm border border-solid border-default-border bg-neutral-50 px-1 py-px font-code text-[10px] font-[400] leading-[14px] text-neutral-400 select-none">
      {children}
    </kbd>
  );
}

const actions = [
  {
    icon: Rocket,
    title: "Deploy hook",
    hint: "evt_9f2 · production",
    key: "D",
    selected: true,
  },
  {
    icon: Zap,
    title: "Replay failed deliveries",
    hint: "last 24 h · 3 events",
    key: "R",
    selected: false,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* dimmed scrim behind the palette, like ⌘K over the console */}
        <div className="absolute inset-0 bg-neutral-900/25" />

        {/* the palette overlay */}
        <div className="relative mx-auto flex h-full w-full max-w-[366px] flex-col px-3 pt-4 pb-3">
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-solid border-default-border bg-panel p-3 shadow-2xl">
            {/* header */}
            <div className="flex flex-none items-center justify-between">
              <span className="font-body text-[11px] font-[500] leading-[14px] text-default-font">
                Praxis · Quick actions
              </span>
              <Kbd>esc</Kbd>
            </div>

            {/* query bar — ui:Label captions the ds:TextField search input */}
            <Label
              htmlFor="palette-query"
              className="mt-2 flex-none text-neutral-500"
            >
              Filter commands
              <Kbd>⌘K</Kbd>
            </Label>
            <TextField
              className="mt-1 flex-none"
              leading={<Search className="size-3.5" />}
              trailing={<Kbd>↵</Kbd>}
            >
              <TextField.Input
                id="palette-query"
                placeholder="Search commands and events…"
              />
            </TextField>

            {/* matched actions */}
            <div className="mt-2 flex flex-none flex-col gap-1">
              {actions.map((action) => (
                <div
                  key={action.title}
                  className={[
                    "flex items-center gap-2.5 rounded-md px-2 py-1",
                    action.selected ? "bg-neutral-100" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <action.icon className="size-3.5 flex-none text-neutral-500" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-body text-[12px] font-[500] leading-[16px] text-default-font">
                      {action.title}
                    </span>
                    <span className="truncate font-code text-[10px] font-[400] leading-[13px] text-neutral-400">
                      {action.hint}
                    </span>
                  </div>
                  <Kbd>{action.key}</Kbd>
                </div>
              ))}
            </div>

            {/* payload preview of the highlighted action */}
            <div className="mt-2 flex min-h-0 flex-1 flex-col">
              <span className="flex-none font-body text-[10px] font-[500] uppercase leading-[13px] tracking-[0.14em] text-neutral-400">
                Payload · evt_9f2
              </span>
              <div className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-lg border border-solid border-default-border bg-panel px-3 py-1">
                <JsonTreeNode.JsonTreeNodeBranch
                  keyName={'"evt_9f2"'}
                  braceType="object"
                  expanded={true}
                  collapsedBadge="{…} 4 keys"
                >
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"command"'}
                    valueType="string"
                    value={'"deploy"'}
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"retries"'}
                    valueType="number"
                    value="3"
                  />
                  <JsonTreeNode.JsonTreeNodeBranch
                    keyName={'"params"'}
                    braceType="object"
                    expanded={false}
                    collapsedBadge="{…} 3 keys"
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"dry_run"'}
                    valueType="boolean"
                    value="false"
                  />
                </JsonTreeNode.JsonTreeNodeBranch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
